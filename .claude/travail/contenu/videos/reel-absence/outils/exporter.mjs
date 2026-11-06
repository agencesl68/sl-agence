// Rendu final : maître haute qualité puis encodage compatible Instagram (H.264 yuv420p, son à -14 LUFS).
// Usage : node outils/exporter.mjs   (ou npm run export)
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..');
const avecVoix = JSON.parse(readFileSync(join(RACINE, 'src', 'voix.json'), 'utf8')).segments.length > 0;
const SORTIE = `out/reel-sl-agence-absence${avecVoix ? '-voix' : ''}.mp4`;
const navigateur = process.env.REMOTION_BROWSER ? [`--browser-executable=${process.env.REMOTION_BROWSER}`] : [];
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const lance = (args) => {
  const r = spawnSync(npx, args, { stdio: 'inherit', cwd: RACINE });
  if (r.status !== 0) process.exit(r.status ?? 1);
};
mkdirSync(join(RACINE, 'out', 'apercus'), { recursive: true });

console.log('Rendu de la vidéo (1 à 3 minutes)…');
lance(['remotion', 'render', 'src/index.ts', 'Reel', 'out/apercus/maitre.mp4', '--codec=h264', '--crf=8',
  '--audio-codec=aac', '--audio-bitrate=320k', '--log=error', ...navigateur]);
console.log('Encodage pour Instagram…');
lance(['remotion', 'ffmpeg', '-v', 'error', '-y', '-i', 'out/apercus/maitre.mp4', '-map', '0:v', '-map', '0:a',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-profile:v', 'high', '-level', '4.2', '-pix_fmt', 'yuv420p',
  '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
  '-vf', 'scale=in_range=full:out_range=tv', '-r', '30', '-g', '60',
  '-af', 'loudnorm=I=-14:TP=-1.5:LRA=9', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', SORTIE]);
console.log(`Vidéo prête : ${SORTIE}`);
