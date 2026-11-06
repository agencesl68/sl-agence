import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { C, POLICE } from '../theme';
import { T } from '../textes';
import { DOUX, ENTREE, lerp, t } from '../anim';
import { Revele } from '../ui/Elements';
import { Icone } from '../ui/Icone';
import { AppSolution } from './S5Solution';

// SCÈNE 6 — Le bénéfice (0:24 → 0:27)
// La caméra recule : l'application reste organisée et connectée (même sans Thomas).
// « Votre entreprise avance. » — le mot « avance » part vers l'avant.

const DEPART_S5 = 210; // image de la scène 5 au moment où la scène 6 commence
const NOEUDS = [
  { label: 'Dossiers', icone: 'dossier', x: 175, y: 450 },
  { label: 'Interventions', icone: 'calendrier', x: 175, y: 640 },
  { label: 'Documents', icone: 'document', x: 175, y: 830 },
  { label: 'Historique', icone: 'historique', x: 905, y: 450 },
  { label: 'Équipe', icone: 'equipe', x: 905, y: 640 },
  { label: 'Thomas · absent', icone: 'personneMoins', x: 905, y: 830, gris: true },
];

export const S6Benefice: React.FC = () => {
  const l = useCurrentFrame();
  const e = t(l, 0, 38, DOUX);
  const s = lerp(1, 0.46, e);
  const ty = lerp(0, -330, e);
  const ecrase = t(l, 84, 100, ENTREE);

  const kA = t(l, 30, 42), kB = t(l, 38, 52, Easing.bezier(0.2, 0.9, 0.1, 1)), kC = t(l, 56, 68);
  const fleche = t(l, 46, 66, DOUX);
  const sortieTitres = t(l, 0, 12);

  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 42%, #111611 0%, #080A08 70%)' }}>
      <AbsoluteFill style={{ transform: `scaleY(${1 - 0.94 * ecrase}) scaleX(${1 - 0.3 * ecrase})`, transformOrigin: '540px 760px', opacity: 1 - ecrase }}>
        {/* application qui recule */}
        <AbsoluteFill style={{ transform: `translateY(${ty}px) scale(${s})`, transformOrigin: '540px 970px' }}>
          <AppSolution l={DEPART_S5 + l} curseur={false} />
        </AbsoluteFill>

        {/* titres de la scène 5 qui s'effacent */}
        <div style={{ position: 'absolute', left: 90, top: 270, fontFamily: POLICE, opacity: 1 - sortieTitres, transform: `translateY(${-sortieTitres * 30}px)` }}>
          <div style={{ fontSize: 72, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.08 }}>{T.solution.titre2}</div>
          <div style={{ fontSize: 72, fontWeight: 650, letterSpacing: '-0.04em', color: C.vertClair, lineHeight: 1.08 }}>{T.solution.sous2}</div>
        </div>

        {/* modules connectés */}
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
          {NOEUDS.map((n, i) => {
            const k = t(l, 16 + i * 3, 34 + i * 3);
            if (k <= 0) return null;
            const ax = n.x < 540 ? 324 : 756;
            const ay = lerp(520, 830, (n.y - 450) / 380);
            const bx = n.x < 540 ? n.x + 95 : n.x - 95;
            const ex = lerp(ax, bx, k), ey = lerp(ay, n.y, k);
            const flux = ((l * 0.03 + i * 0.21) % 1);
            const coul = n.gris ? 'rgba(146,153,146,0.5)' : 'rgba(167,198,160,0.65)';
            return (
              <g key={i}>
                <path d={`M${ax},${ay} C${lerp(ax, ex, 0.5)},${ay} ${lerp(ax, ex, 0.5)},${ey} ${ex},${ey}`} fill="none" stroke={coul} strokeWidth={2.5} />
                {k >= 1 && !n.gris && (() => {
                  const u = flux, x = lerp(ax, bx, u);
                  const y = lerp(ay, n.y, u * u * (3 - 2 * u));
                  return <circle cx={x} cy={y} r={5} fill={C.vertLumiere} />;
                })()}
              </g>
            );
          })}
        </svg>
        {NOEUDS.map((n, i) => {
          const k = t(l, 26 + i * 3, 38 + i * 3);
          return (
            <div key={i} style={{
              position: 'absolute', left: n.x - 95, top: n.y - 30, width: 190, height: 60, borderRadius: 16,
              background: n.gris ? 'rgba(21,25,21,0.9)' : 'rgba(43,58,42,0.9)', border: `1px solid ${n.gris ? C.bord : 'rgba(167,198,160,0.35)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontFamily: POLICE, fontSize: 19, fontWeight: 500,
              color: n.gris ? C.gris : C.blanc, opacity: k, transform: `scale(${0.85 + 0.15 * k})`,
            }}>
              <Icone nom={n.icone} taille={20} couleur={n.gris ? C.gris : C.vertClair} /> {n.label}
            </div>
          );
        })}

        {/* message */}
        <div style={{ position: 'absolute', left: 0, width: 1080, top: 1010, textAlign: 'center', fontFamily: POLICE }}>
          <Revele k={kA}><div style={{ fontSize: 84, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc }}>{T.benefice.a}</div></Revele>
          <div style={{ position: 'relative', height: 160, marginTop: 4 }}>
            {[0.12, 0.25].map((o, j) => (
              <div key={j} style={{
                position: 'absolute', left: 0, right: 0, fontSize: 150, fontWeight: 700, letterSpacing: '-0.05em', color: C.vertClair,
                opacity: o * kB * (1 - kB) * 4, transform: `translateX(${(-70 - j * 50) * (1 - kB) - (j + 1) * 22 * (1 - kB)}px)`,
              }}>{T.benefice.b}</div>
            ))}
            <div style={{
              position: 'absolute', left: 0, right: 0, fontSize: 150, fontWeight: 700, letterSpacing: '-0.05em', color: C.vertClair,
              opacity: kB, transform: `translateX(${(1 - kB) * -120}px) skewX(${(1 - kB) * -10}deg)`,
              filter: kB < 1 ? `blur(${(1 - kB) * 6}px)` : undefined,
            }}>{T.benefice.b}</div>
          </div>
          {/* trait qui avance */}
          <svg width={600} height={30} style={{ display: 'block', margin: '6px auto 0' }}>
            <line x1={20} y1={15} x2={lerp(20, 560, fleche)} y2={15} stroke={C.vert} strokeWidth={6} strokeLinecap="round" />
            <line x1={20} y1={15} x2={lerp(20, 560, fleche)} y2={15} stroke={C.vertClair} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
            {fleche > 0.05 && <path d={`M${lerp(20, 560, fleche) - 14},5 L${lerp(20, 560, fleche) + 2},15 L${lerp(20, 560, fleche) - 14},25`} fill="none" stroke={C.vertClair} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />}
          </svg>
          <Revele k={kC} style={{ marginTop: 34 }}><div style={{ fontSize: 50, fontWeight: 500, letterSpacing: '-0.03em', color: C.gris }}>{T.benefice.c}</div></Revele>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
