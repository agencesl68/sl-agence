import { Easing, interpolate, spring } from 'remotion';

export const FPS = 30;
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Courbes d'accélération
export const SORTIE = Easing.bezier(0.16, 1, 0.3, 1); // arrivée douce
export const DOUX = Easing.bezier(0.65, 0, 0.35, 1); // aller-retour fluide
export const ENTREE = Easing.bezier(0.55, 0, 0.8, 0.2); // départ qui accélère
export const SEC = Easing.bezier(0.05, 0.9, 0.1, 1); // claquement

/** Valeur de 0 à 1 entre deux images, avec courbe. */
export const t = (f: number, a: number, b: number, ease = SORTIE) =>
  interpolate(f, [a, b], [0, 1], { ...CLAMP, easing: ease });

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

export const ressort = (f: number, debut: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) =>
  spring({ frame: f - debut, fps: FPS, config: { damping: 18, stiffness: 170, mass: 1, ...cfg } });

/** Texte tapé au clavier. */
export const tape = (texte: string, f: number, debut: number, imagesParCar = 1.1) =>
  texte.slice(0, Math.max(0, Math.min(texte.length, Math.floor((f - debut) / imagesParCar))));

export const melange = (c1: string, c2: string, k: number) => {
  const p = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const a = p(c1);
  const b = p(c2);
  const m = a.map((v, i) => Math.round(lerp(v, b[i], clamp01(k))));
  return `rgb(${m[0]},${m[1]},${m[2]})`;
};

/** Petit tremblement amorti (impact). */
export const secousse = (f: number, debut: number, force = 8, duree = 10) => {
  const k = f - debut;
  if (k < 0 || k > duree) return { x: 0, y: 0 };
  const amort = 1 - k / duree;
  return { x: Math.sin(k * 2.7) * force * amort, y: Math.cos(k * 3.3) * force * 0.6 * amort };
};
