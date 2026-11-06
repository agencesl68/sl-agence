import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { C, POLICE, ombre } from '../theme';
import { T } from '../textes';
import { ENTREE, SEC, lerp, melange, ressort, secousse, t } from '../anim';
import { Avatar } from '../ui/Elements';
import { Icone } from '../ui/Icone';

// SCÈNE 1 — L'accroche (0:00 → 0:04)
// Thomas passe de « Disponible » à « Absent aujourd'hui », arrêt sur image,
// la notification surgit, puis la phrase choc ; ses dossiers s'éparpillent sur « personne ».

const MINI = [
  { dx: -262, dy: -92, r: -9, icone: 'dossier' },
  { dx: 262, dy: -96, r: 8, icone: 'calendrier' },
  { dx: -300, dy: 18, r: -4, icone: 'document' },
  { dx: 300, dy: 22, r: 5, icone: 'tableur' },
  { dx: -210, dy: 112, r: -7, icone: 'equipe' },
  { dx: 214, dy: 114, r: 9, icone: 'historique' },
];

export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();

  // carte de Thomas
  const kApp = ressort(f, -3, { damping: 14, stiffness: 230 });
  const cy = lerp(900, 640, t(f, 30, 46));
  const sw = t(f, 15, 23); // bascule du statut
  const coup = Math.sin(Math.PI * t(f, 22, 28, Easing.linear)) * 0.025;
  const pulseDispo = f < 15 ? (f % 15) / 15 : 0;

  // notification
  const kN = ressort(f, 30, { damping: 13, stiffness: 270 });
  const oN = t(f, 30, 35);

  // secousse au « personne »
  const sh = secousse(f, 58, 11, 12);

  // sortie : on plonge dans la notification (zoom traversant)
  const z = t(f, 102, 124, ENTREE);

  return (
    <AbsoluteFill style={{
      transform: `translate(${sh.x}px, ${sh.y}px) scale(${1 + 1.7 * z})`, transformOrigin: '540px 910px',
      opacity: 1 - z, filter: z > 0 ? `blur(${z * 10}px)` : undefined,
    }}>
      {/* ondes d'apparition */}
      {[0, 7].map((d) => {
        const k = t(f, d, d + 26, Easing.out(Easing.quad));
        return (
          <div key={d} style={{
            position: 'absolute', left: 540 - 340, top: cy - 120, width: 680, height: 240, borderRadius: 60,
            border: `2px solid ${C.vertClair}`, opacity: (1 - k) * 0.35 * (k > 0 ? 1 : 0), transform: `scale(${1 + k * 0.35})`,
          }} />
        );
      })}

      {/* petits dossiers rattachés à Thomas, qui s'éparpillent */}
      {MINI.map((m, i) => {
        const sort = t(f, 34 + i * 2, 48 + i * 2);
        const fuite = t(f, 60 + (i % 3), 88, ENTREE);
        const dist = Math.hypot(m.dx, m.dy);
        const vx = m.dx / dist, vy = m.dy / dist;
        const x = 540 + m.dx * sort + vx * 1100 * fuite;
        const y = cy + m.dy * sort + vy * 1100 * fuite;
        return (
          <div key={i} style={{
            position: 'absolute', left: x - 120, top: y - 34, width: 240, height: 68, borderRadius: 16,
            background: C.papier, border: `1px solid ${C.papierBord}`, boxShadow: ombre,
            display: 'flex', alignItems: 'center', gap: 12, padding: '0 18px', fontFamily: POLICE, fontSize: 22, fontWeight: 500, color: C.encre,
            transform: `rotate(${m.r * sort + (i % 2 ? 50 : -50) * fuite}deg) scale(${0.7 + 0.3 * sort})`,
            opacity: sort * (1 - t(f, 70, 88)), filter: fuite > 0 ? `blur(${fuite * 5}px)` : undefined,
          }}>
            <Icone nom={m.icone} taille={24} couleur={C.vert} />
            {T.hook.dossiers[i]}
          </div>
        );
      })}

      {/* carte de Thomas */}
      <div style={{
        position: 'absolute', left: 240, top: cy - 84, width: 600, height: 168, borderRadius: 32,
        background: `linear-gradient(165deg, #4A6148 0%, ${C.vert} 45%, ${C.vertSombre} 100%)`,
        border: '1px solid rgba(201,226,194,0.22)', boxShadow: `${ombre}, inset 0 1px 0 rgba(255,255,255,0.12)`,
        display: 'flex', alignItems: 'center', gap: 28, padding: '0 36px',
        transform: `scale(${(0.84 + 0.16 * kApp) * (1 - coup)})`, opacity: Math.min(1, kApp * 2.2),
        filter: kApp < 0.95 ? `blur(${(1 - kApp) * 10}px)` : undefined,
      }}>
        <div style={{ position: 'relative' }}>
          <Avatar lettre="T" taille={96} fond="linear-gradient(160deg, #EEF3EC, #C9D6C6)" couleur={C.vertSombre} />
          <div style={{
            position: 'absolute', right: 0, bottom: 2, width: 26, height: 26, borderRadius: 26,
            background: melange('#7FD27A', C.gris, sw), border: `4px solid ${C.vert}`,
          }} />
        </div>
        <div style={{ fontFamily: POLICE }}>
          <div style={{ fontSize: 46, fontWeight: 600, color: C.blanc, letterSpacing: '-0.03em' }}>{T.hook.prenom}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
            <span style={{ position: 'relative', width: 14, height: 14 }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: 14, background: melange('#7FD27A', '#A9AFA9', sw) }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: 14, background: '#7FD27A', opacity: 0.6 * (1 - pulseDispo) * (f < 15 ? 1 : 0), transform: `scale(${1 + pulseDispo * 1.8})` }} />
            </span>
            <div style={{ position: 'relative', height: 36, width: 340, overflow: 'hidden', fontSize: 29, fontWeight: 500 }}>
              <div style={{ position: 'absolute', top: 0, color: 'rgba(245,246,242,0.85)', transform: `translateY(${-sw * 110}%)` }}>{T.hook.disponible}</div>
              <div style={{ position: 'absolute', top: 0, color: 'rgba(245,246,242,0.85)', transform: `translateY(${(1 - sw) * 110}%)` }}>{T.hook.absent}</div>
            </div>
          </div>
        </div>
      </div>

      {/* notification */}
      <div style={{
        position: 'absolute', left: 70, top: 810, width: 940, height: 200, borderRadius: 30,
        background: 'rgba(21,25,21,0.96)', border: `1px solid ${C.bordFort}`, boxShadow: ombre,
        display: 'flex', alignItems: 'center', gap: 26, padding: '0 34px',
        transform: `translateY(${(1 - kN) * 90}px) scale(${0.88 + 0.12 * kN})`, opacity: oN,
      }}>
        <div style={{ width: 76, height: 76, borderRadius: 22, background: C.panneau3, border: `1px solid ${C.bord}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icone nom="personneMoins" taille={40} couleur={C.blanc} />
        </div>
        <div style={{ fontFamily: POLICE }}>
          <div style={{ fontSize: 24, color: C.gris, fontWeight: 500 }}>{T.hook.notifEntete}</div>
          <div style={{ fontSize: 54, color: C.blanc, fontWeight: 600, letterSpacing: '-0.035em', marginTop: 4 }}>{T.hook.notif}</div>
        </div>
      </div>

      {/* phrase choc */}
      {[0, 1].map((i) => {
        const s = 52 + i * 6;
        const k = t(f, s, s + 7, SEC);
        return (
          <div key={i} style={{
            position: 'absolute', left: 0, width: 1080, top: 1095 + i * 96, textAlign: 'center',
            fontFamily: POLICE, fontSize: 82, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1,
            transform: `scale(${1.4 - 0.4 * k})`, opacity: k, filter: k < 1 ? `blur(${(1 - k) * 14}px)` : undefined,
          }}>
            {i === 0 ? (<>{T.hook.phrase2a}<span style={{ color: C.rouge }}>{T.hook.phrase2mot}</span>{T.hook.phrase2b}</>) : T.hook.phrase2ligne2}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
