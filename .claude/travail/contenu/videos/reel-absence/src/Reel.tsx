import React from 'react';
import { AbsoluteFill, Audio, Sequence, continueRender, delayRender, getStaticFiles, staticFile } from 'remotion';
import { C, POLICE } from './theme';
import L from './timeline.json';
import { S1Hook } from './scenes/S1Hook';
import { S2Recherche } from './scenes/S2Recherche';
import { S3Dependance } from './scenes/S3Dependance';
import { S5Solution } from './scenes/S5Solution';
import { S6Benefice } from './scenes/S6Benefice';
import { S7Fin } from './scenes/S7Fin';

// Chargement de la police Geist (celle du site slagence.fr)
const attente = delayRender('Police Geist');
const geist = new FontFace('Geist', `url(${staticFile('fonts/geist-latin.woff2')}) format('woff2')`, { weight: '100 900' });
const geistExt = new FontFace('Geist', `url(${staticFile('fonts/geist-latin-ext.woff2')}) format('woff2')`, {
  weight: '100 900', unicodeRange: 'U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
});
Promise.all([geist.load(), geistExt.load()])
  .then((f) => { f.forEach((x) => document.fonts.add(x)); continueRender(attente); })
  .catch(() => continueRender(attente));

const S = L.scenes;
const seq = (s: { debut: number; fin: number }) => ({ from: s.debut, durationInFrames: s.fin - s.debut });
const bandeSon = getStaticFiles().some((f) => f.name === 'audio/bande-son.wav');

export const Reel: React.FC = () => (
  <AbsoluteFill style={{ background: C.noir, fontFamily: POLICE, overflow: 'hidden' }}>
    {/* fond : très léger halo central pour donner de la profondeur */}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 42%, #111611 0%, #080A08 70%)' }} />
    <Sequence {...seq(S.hook)} name="1 · Accroche"><S1Hook /></Sequence>
    <Sequence {...seq(S.recherche)} name="2 · Le client attend"><S2Recherche /></Sequence>
    <Sequence {...seq(S.dependance)} name="3-4 · Dépendance et bascule"><S3Dependance /></Sequence>
    <Sequence {...seq(S.solution)} name="5 · La solution"><S5Solution /></Sequence>
    <Sequence {...seq(S.benefice)} name="6 · Bénéfice"><S6Benefice /></Sequence>
    <Sequence {...seq(S.fin)} name="7 · Signature"><S7Fin /></Sequence>
    {/* grain très léger, uniforme */}
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />
    {bandeSon && <Audio src={staticFile('audio/bande-son.wav')} />}
  </AbsoluteFill>
);
