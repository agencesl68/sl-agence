// Voix off du reel « salarié absent » avec ElevenLabs, puis rendu de la vidéo finale.
// Usage (dans le dossier du projet) :  node voix/generer-voix.mjs  → demande la clé sans l'afficher.
// La voix est reprise du projet ~/Desktop/reel-halloween (ou voix/voice-id.txt, ou ELEVENLABS_VOICE_ID=...).
// Options : --sans-rendu (génère seulement la voix) · ELEVENLABS_VOICE_ID=... pour changer de voix
import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const HALLOWEEN = join(homedir(), 'Desktop', 'reel-halloween');
const lire = (f) => { try { return readFileSync(f, 'utf8'); } catch { return ''; } };
const scripts = (dossier, prof = 0) => {
  if (prof > 3 || !existsSync(dossier)) return [];
  return readdirSync(dossier, { withFileTypes: true }).flatMap((e) => {
    if (['node_modules', 'out', 'public'].includes(e.name) || e.name.startsWith('.')) return [];
    const f = join(dossier, e.name);
    return e.isDirectory() ? scripts(f, prof + 1) : /\.(m?js|ts|tsx)$/.test(e.name) ? [f] : [];
  });
};

// Voix : ELEVENLABS_VOICE_ID, sinon voix/voice-id.txt, sinon la même voix que le projet ~/Desktop/reel-halloween
let VOIX = process.env.ELEVENLABS_VOICE_ID && process.env.ELEVENLABS_VOICE_ID !== 'id_de_la_voix' ? process.env.ELEVENLABS_VOICE_ID : lire(join(RACINE, 'voix', 'voice-id.txt')).trim();
if (!VOIX || VOIX.startsWith('COLLER')) {
  VOIX = '';
  for (const f of scripts(HALLOWEEN)) {
    const t = lire(f);
    const m = t.match(/text-to-speech\/([A-Za-z0-9]{18,24})/) || t.match(/(?:voice_?id|voiceId|VOICE_ID|VOIX)\s*[:=]\s*['"`]([A-Za-z0-9]{18,24})['"`]/i);
    if (m) { VOIX = m[1]; break; }
  }
}
if (!VOIX) { console.error("Voix introuvable : lance avec ELEVENLABS_VOICE_ID=id_de_ta_voix devant la commande."); process.exit(1); }

// Clé : ELEVENLABS_API_KEY, sinon demandée à l'écran sans s'afficher (rien dans l'historique ni sur les captures)
const demanderEnSecret = (question) => new Promise((ok) => {
  process.stdout.write(question);
  const entree = process.stdin; let valeur = '';
  entree.setRawMode?.(true); entree.resume(); entree.setEncoding('utf8');
  const lu = (c) => {
    for (const ch of c) {
      if (ch === '\r' || ch === '\n') { entree.setRawMode?.(false); entree.pause(); entree.off('data', lu); process.stdout.write('\n'); return ok(valeur.trim()); }
      if (ch === '\u0003') process.exit(1);
      if (ch === '\u007f') valeur = valeur.slice(0, -1); else valeur += ch;
    }
  };
  entree.on('data', lu);
});
let CLE = process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_API_KEY !== 'ta_cle' ? process.env.ELEVENLABS_API_KEY : '';
if (!CLE) CLE = await demanderEnSecret('Colle ta clé ElevenLabs (sk_…) puis Entrée — elle ne s\'affiche pas, c\'est normal : ');
if (!CLE.startsWith('sk_')) { console.error("Ce n'est pas une clé ElevenLabs : elle doit commencer par sk_"); process.exit(1); }
const MODELE = 'eleven_multilingual_v2';
const KBPS = 128; // format mp3_44100_128 (débit constant → durée = taille / débit)

const { segments } = JSON.parse(readFileSync(join(RACINE, 'voix', 'textes-voix.json'), 'utf8'));
const debuts = JSON.parse(readFileSync(join(RACINE, 'src', 'timeline.json'), 'utf8')).voix.segments;
mkdirSync(join(RACINE, 'public', 'voix'), { recursive: true });

const resultat = [];
for (let i = 0; i < segments.length; i++) {
  const n = i + 1;
  process.stdout.write(`  segment ${n}… `);
  const rep = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOIX}?output_format=mp3_44100_${KBPS}`, {
    method: 'POST',
    headers: { 'xi-api-key': CLE, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text: segments[i], model_id: MODELE,
      // phrases voisines : la voix enchaîne naturellement, comme une seule prise
      previous_text: segments.slice(0, i).join(' ') || undefined,
      next_text: segments.slice(i + 1).join(' ') || undefined,
      // moins de stabilité + un peu de style = intonation plus humaine, moins robotique
      voice_settings: { stability: 0.32, similarity_boost: 0.78, style: 0.35, use_speaker_boost: true, speed: 0.97 },
    }),
  });
  if (!rep.ok) {
    const txt = await rep.text();
    console.error(`ERREUR ${rep.status}`);
    if (/permission/i.test(txt)) console.error("Cette clé n'a pas le droit « Text to Speech » : sur elevenlabs.io > Developers > API Keys, crée une clé avec Text to Speech activé.");
    else if (/api_key|unauthor|invalid/i.test(txt)) console.error("Clé refusée par ElevenLabs : vérifie que tu as collé la clé complète (sk_…).");
    else if (/voice/i.test(txt) || rep.status === 404) console.error(`La voix ${VOIX} n'est pas trouvée sur ce compte (ou la clé n'a pas l'accès « Voix »).`);
    else console.error(txt.replace(/sk_[A-Za-z0-9]+/g, 'sk_***'));
    process.exit(1);
  }
  const fichier = join(RACINE, 'public', 'voix', `${n}.mp3`);
  writeFileSync(fichier, Buffer.from(await rep.arrayBuffer()));
  const duree = (statSync(fichier).size * 8) / (KBPS * 1000);
  const place = (debuts[i + 1] ?? 29.85) - debuts[i];
  console.log(`ok (${duree.toFixed(1)} s pour ${place.toFixed(1)} s disponibles)${duree > place + 0.1 ? '  ⚠ trop long' : ''}`);
  resultat.push({ fichier: `voix/${n}.mp3`, debut: debuts[i], duree: Math.round(duree * 100) / 100 });
}
writeFileSync(join(RACINE, 'src', 'voix.json'), JSON.stringify({ segments: resultat }, null, 2));
console.log('Voix prête.');

if (process.argv.includes('--sans-rendu')) {
  console.log('Fichiers : ' + join(RACINE, 'public', 'voix'));
  spawnSync(process.platform === 'darwin' ? 'open' : 'xdg-open', [join(RACINE, 'public', 'voix')], { stdio: 'ignore' });
} else {
  const r = spawnSync('node', [join(RACINE, 'outils', 'exporter.mjs')], { stdio: 'inherit', cwd: RACINE });
  process.exit(r.status ?? 1);
}
