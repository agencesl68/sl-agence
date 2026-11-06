// Voix off du reel « salarié absent » avec ElevenLabs, puis rendu de la vidéo finale.
// Usage (dans le dossier du projet) :  ELEVENLABS_API_KEY=ta_cle node voix/generer-voix.mjs
// Options : --sans-rendu (génère seulement la voix) · ELEVENLABS_VOICE_ID=... pour changer de voix
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const CLE = process.env.ELEVENLABS_API_KEY;
const VOIX = process.env.ELEVENLABS_VOICE_ID || readFileSync(join(RACINE, 'voix', 'voice-id.txt'), 'utf8').trim();
const MODELE = 'eleven_multilingual_v2';
const KBPS = 128; // format mp3_44100_128 (débit constant → durée = taille / débit)

if (!CLE || CLE === 'ta_cle') { console.error('Il manque la clé : ELEVENLABS_API_KEY=ta_cle node voix/generer-voix.mjs'); process.exit(1); }
if (!VOIX || VOIX.startsWith('COLLER')) { console.error("Il manque l'ID de la voix dans voix/voice-id.txt (ou ELEVENLABS_VOICE_ID=...)."); process.exit(1); }

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
      voice_settings: { stability: 0.55, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true, speed: 1.0 },
    }),
  });
  if (!rep.ok) { console.error(`ERREUR ${rep.status} : ${await rep.text()}`); process.exit(1); }
  const fichier = join(RACINE, 'public', 'voix', `${n}.mp3`);
  writeFileSync(fichier, Buffer.from(await rep.arrayBuffer()));
  const duree = (statSync(fichier).size * 8) / (KBPS * 1000);
  const place = (debuts[i + 1] ?? 29.85) - debuts[i];
  console.log(`ok (${duree.toFixed(1)} s pour ${place.toFixed(1)} s disponibles)${duree > place + 0.1 ? '  ⚠ trop long' : ''}`);
  resultat.push({ fichier: `voix/${n}.mp3`, debut: debuts[i], duree: Math.round(duree * 100) / 100 });
}
writeFileSync(join(RACINE, 'src', 'voix.json'), JSON.stringify({ segments: resultat }, null, 2));
console.log('Voix prête.');

if (!process.argv.includes('--sans-rendu')) {
  const r = spawnSync('node', [join(RACINE, 'outils', 'exporter.mjs')], { stdio: 'inherit', cwd: RACINE });
  process.exit(r.status ?? 1);
}
