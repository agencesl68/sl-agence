import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { C, POLICE, ombre } from '../theme';
import { T } from '../textes';
import { DOUX, lerp, melange, ressort, t } from '../anim';
import { Avatar, Puce, Revele, Trait } from '../ui/Elements';
import { Icone } from '../ui/Icone';
import { rectsFinaux } from './S2Recherche';
import { APP, ChampApp, ContenuRang, EnTetesColonnes, EnteteApp, PiedApp, rangRect, styleCadreApp } from './App';

// SCÈNES 3 et 4 — La dépendance (0:09 → 0:13) puis le moment de bascule (0:13 → 0:17)
// Les logiciels gravitent autour de Thomas ; il disparaît, les liens se coupent.
// Une impulsion verte : les cartes se redressent, se rangent, et fusionnent en une seule application.

const CTR = { x: 540, y: 720 };
const RX = 330, RY = 315;
const CARTE = { w: 230, h: 142 };
const GRILLE = { w: 330, h: 108, gx: 175, gy: 128, cy: 760 };

const rotation = (l: number) => {
  if (l <= 64) return 0.5 * l;
  if (l <= 84) { const u = l - 64; return 32 + 0.5 * u - (0.5 * u * u) / 40; }
  return 37;
};

const ALERTES = [
  { texte: 'Aucun résultat', x: 120, y: 470 },
  { texte: 'Client en attente', x: 700, y: 1040 },
  { texte: 'Information introuvable', x: 640, y: 400 },
];

export const S3Dependance: React.FC = () => {
  const l = useCurrentFrame();
  const depart = rectsFinaux();

  // Thomas
  const kT = ressort(l, 6, { damping: 15, stiffness: 180 });
  const disparait = t(l, 62, 86, DOUX);
  const fantome = (1 - t(l, 122, 134)) * disparait;

  // ambiance
  const sombre = 0.4 * t(l, 70, 92) * (1 - t(l, 120, 136));
  const terne = t(l, 70, 92) * (1 - t(l, 122, 140));

  // bascule
  const impulsion = t(l, 122, 160, Easing.out(Easing.cubic));
  const versGrille = t(l, 132, 164, DOUX);
  const cadre = t(l, 166, 214, DOUX);
  const chrome = t(l, 204, 232);

  // positions des cartes
  const cartes = depart.map((d, i) => {
    const ang = ((-90 + i * 60 + rotation(l)) * Math.PI) / 180;
    const bob = l > 84 ? Math.sin((l - 84) * 0.09 + i * 1.3) * 7 : 0;
    const orb = { x: CTR.x + RX * Math.cos(ang), y: CTR.y + RY * Math.sin(ang) + bob };
    const e1 = t(l, 0, 34, DOUX);
    let cx = lerp(d.x + d.w / 2, orb.x, e1);
    let cy = lerp(d.y + d.h / 2, orb.y, e1);
    let w = lerp(d.w, CARTE.w, e1);
    let h = lerp(d.h, CARTE.h, e1);
    // grille
    const col = i % 2, ran = Math.floor(i / 2);
    const g = { x: 540 + (col ? GRILLE.gx : -GRILLE.gx), y: GRILLE.cy + (ran - 1) * GRILLE.gy };
    cx = lerp(cx, g.x, versGrille); cy = lerp(cy, g.y, versGrille);
    w = lerp(w, GRILLE.w, versGrille); h = lerp(h, GRILLE.h, versGrille);
    // rangées de l'application
    const r = rangRect(i);
    const e3 = t(l, 168 + i * 1.5, 214 + i * 1.5, DOUX);
    cx = lerp(cx, r.x + r.w / 2, e3); cy = lerp(cy, r.y + r.h / 2, e3);
    w = lerp(w, r.w, e3); h = lerp(h, r.h, e3);
    return { cx, cy, w, h, e3, titre: d.titre, icone: d.icone };
  });

  // cadre de l'application : de la grille vers le plein écran
  const gb = { x: 540 - GRILLE.gx - GRILLE.w / 2 - 30, y: GRILLE.cy - GRILLE.gy - GRILLE.h / 2 - 30 };
  const gbW = GRILLE.gx * 2 + GRILLE.w + 60, gbH = GRILLE.gy * 2 + GRILLE.h + 60;
  const fr = { x: lerp(gb.x, APP.x, cadre), y: lerp(gb.y, APP.y, cadre), w: lerp(gbW, APP.w, cadre), h: lerp(gbH, APP.h, cadre) };
  const cadreVisible = t(l, 160, 176);

  // textes
  const k1 = t(l, 38, 50), k2 = t(l, 70, 82);
  const kQ = ressort(l, 80, { damping: 9, stiffness: 160 });
  const sortieTextes = t(l, 122, 132);
  const q1 = t(l, 146, 158), q2 = t(l, 152, 164);
  const sortieQ = t(l, 226, 238);

  return (
    <AbsoluteFill style={{ opacity: t(l, 0, 6) }}>
      {/* impulsion verte */}
      {l >= 122 && (
        <>
          <div style={{
            position: 'absolute', left: CTR.x - 600, top: CTR.y - 600, width: 1200, height: 1200, borderRadius: 1200,
            background: `radial-gradient(circle, rgba(95,125,89,0.55) 0%, rgba(60,79,59,0.35) 30%, rgba(60,79,59,0) 65%)`,
            transform: `scale(${0.2 + impulsion * 1.1})`, opacity: (1 - t(l, 150, 200)) * 0.9,
          }} />
          {[0, 10].map((d) => {
            const k = t(l, 122 + d, 152 + d, Easing.out(Easing.quad));
            return <div key={d} style={{ position: 'absolute', left: CTR.x - 150, top: CTR.y - 150, width: 300, height: 300, borderRadius: 300, border: `3px solid ${C.vertClair}`, transform: `scale(${0.3 + k * 3.2})`, opacity: (1 - k) * 0.8 * (k > 0 ? 1 : 0) }} />;
          })}
        </>
      )}

      {/* cadre de l'application qui se forme */}
      {cadreVisible > 0 && (
        <div style={{ position: 'absolute', left: fr.x, top: fr.y, width: fr.w, height: fr.h, ...styleCadreApp, opacity: cadreVisible, transform: `scale(${0.96 + 0.04 * cadreVisible})` }}>
          <EnteteApp opacite={chrome} />
          <ChampApp texte="" opacite={chrome} />
          <EnTetesColonnes opacite={chrome} />
          <PiedApp opacite={chrome} />
        </div>
      )}

      {/* liens vers Thomas (scène 3) */}
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        {cartes.map((c, i) => {
          const trace = t(l, 24 + i * 2, 40 + i * 2);
          if (trace <= 0 || l > 100) return null;
          const dx = c.cx - CTR.x, dy = c.cy - CTR.y, d = Math.hypot(dx, dy);
          const p = { x: CTR.x + (dx / d) * 100, y: CTR.y + (dy / d) * 100 };
          const q = { x: c.cx, y: c.cy };
          const coupe = 66 + i * 2.6;
          const r = t(l, coupe, coupe + 10, Easing.out(Easing.cubic));
          const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
          const a = { x: lerp(p.x, lerp(q.x, m.x, r), trace), y: lerp(p.y, lerp(q.y, m.y, r), trace) };
          const b = { x: lerp(q.x, m.x, r), y: lerp(q.y, m.y, r) };
          const flux = ((l * 0.035 + i * 0.17) % 1);
          const etincelle = l >= coupe && l < coupe + 9 ? 1 - (l - coupe) / 9 : 0;
          return (
            <g key={i} opacity={1 - t(l, coupe + 6, coupe + 18)}>
              <line x1={p.x} y1={p.y} x2={lerp(p.x, m.x, 1 - r)} y2={lerp(p.y, m.y, 1 - r)} stroke="rgba(245,246,242,0.45)" strokeWidth={2.5} />
              <line x1={q.x} y1={q.y} x2={trace < 1 ? a.x : b.x} y2={trace < 1 ? a.y : b.y} stroke="rgba(245,246,242,0.45)" strokeWidth={2.5} />
              {l > 40 && r === 0 && <circle cx={lerp(q.x, p.x, flux)} cy={lerp(q.y, p.y, flux)} r={5} fill={C.blanc} opacity={0.8} />}
              {etincelle > 0 && <circle cx={m.x} cy={m.y} r={8 + (1 - etincelle) * 22} fill="none" stroke={C.rouge} strokeWidth={3} opacity={etincelle} />}
            </g>
          );
        })}
        {/* liens qui se redressent et deviennent verts (scène 4) */}
        {cartes.map((c, i) => {
          const trace = t(l, 124 + i, 138 + i);
          if (trace <= 0 || l > 172) return null;
          const droit = t(l, 128, 152, DOUX);
          const ox = CTR.x, oy = CTR.y;
          const mx = (ox + c.cx) / 2, my = (oy + c.cy) / 2;
          const perp = Math.atan2(c.cy - oy, c.cx - ox) + Math.PI / 2;
          const ondule = (1 - droit) * 140 * Math.sin(i * 2.1 + 1);
          const ctl = { x: mx + Math.cos(perp) * ondule, y: my + Math.sin(perp) * ondule };
          const ex = lerp(ox, c.cx, trace), ey = lerp(oy, c.cy, trace);
          return (
            <path key={`v${i}`} d={`M${ox},${oy} Q${lerp(ox, ctl.x, trace)},${lerp(oy, ctl.y, trace)} ${ex},${ey}`} fill="none"
              stroke={melange('#7A817A', C.vertClair, droit)} strokeWidth={3} opacity={1 - t(l, 156, 170)} />
          );
        })}
      </svg>

      {/* Thomas, au centre */}
      <div style={{
        position: 'absolute', left: CTR.x - 100, top: CTR.y - 100, width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: `scale(${(0.6 + 0.4 * kT) * lerp(1, 0.9, disparait)})`, opacity: Math.min(1, kT * 2) * lerp(1, 0.0, disparait) * (l < 130 ? 1 : 0),
        filter: disparait > 0 ? `blur(${disparait * 6}px) grayscale(1)` : undefined,
      }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 200, border: '2px solid rgba(167,198,160,0.35)' }} />
        <Avatar lettre="T" taille={160} fond={`linear-gradient(160deg, #4A6148, ${C.vert})`} style={{ fontSize: 70, boxShadow: ombre }} />
      </div>
      <div style={{ position: 'absolute', left: CTR.x - 100, top: CTR.y - 100, width: 200, height: 200, borderRadius: 200, border: '3px dashed rgba(146,153,146,0.6)', opacity: fantome }} />
      <div style={{
        position: 'absolute', left: 0, width: 1080, top: CTR.y + 118, textAlign: 'center', fontFamily: POLICE,
        opacity: Math.min(1, kT * 2) * (1 - t(l, 116, 126)),
      }}>
        <div style={{ fontSize: 34, fontWeight: 600, color: melange(C.blanc, C.gris, disparait), letterSpacing: '-0.02em' }}>{T.hook.prenom}</div>
        <div style={{ fontSize: 23, color: C.gris, marginTop: 2 }}>{T.hook.absent}</div>
      </div>

      {/* voile sombre */}
      <AbsoluteFill style={{ background: C.noir, opacity: sombre }} />

      {/* les logiciels (cartes) */}
      {cartes.map((c, i) => {
        const versSombre = t(l, 176 + i * 3, 200 + i * 3);
        const ancien = 1 - t(l, 174 + i * 3, 190 + i * 3);
        const nouveau = t(l, 182 + i * 3, 198 + i * 3);
        return (
          <div key={i} style={{
            position: 'absolute', left: c.cx - c.w / 2, top: c.cy - c.h / 2, width: c.w, height: c.h, overflow: 'hidden',
            borderRadius: lerp(16, 18, versSombre), background: melange(C.papier, C.panneau2, versSombre),
            border: `1px solid ${versSombre > 0.5 ? 'rgba(245,246,242,0.07)' : C.papierBord}`,
            boxShadow: versSombre < 1 ? ombre : undefined,
            filter: `brightness(${1 - 0.45 * terne}) saturate(${1 - terne})`,
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: ancien, fontFamily: POLICE, color: C.encre }}>
              <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', background: C.papier2, borderBottom: `1px solid ${C.papierBord}` }}>
                <Icone nom={c.icone} taille={20} couleur={C.vert} />
                <span style={{ fontSize: 20, fontWeight: 600 }}>{c.titre}</span>
              </div>
              <div style={{ padding: 14 }}>
                <Trait w="80%" h={10} /><Trait w="55%" h={10} style={{ marginTop: 10 }} /><Trait w="68%" h={10} style={{ marginTop: 10 }} />
              </div>
            </div>
            <div style={{ position: 'absolute', left: 0, top: 0, width: rangRect(i).w, height: rangRect(i).h, opacity: nouveau }}>
              <ContenuRang i={i} />
            </div>
          </div>
        );
      })}

      {/* alertes qui disparaissent pendant la bascule */}
      {ALERTES.map((a, i) => {
        const k = t(l, 100 + i * 4, 110 + i * 4);
        const out = t(l, 126 + i * 3, 138 + i * 3, Easing.in(Easing.quad));
        if (k <= 0 || out >= 1) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: a.x, top: a.y, opacity: k * (1 - out), transform: `scale(${(0.8 + 0.2 * k) * (1 - 0.6 * out)})` }}>
            <Puce texte={a.texte} couleur={C.rouge} fond="rgba(30,18,17,0.92)" taille={22} style={{ border: '1px solid rgba(215,91,85,0.5)' }} />
          </div>
        );
      })}

      {/* textes de la scène 3 */}
      <div style={{ position: 'absolute', left: 90, right: 90, top: 1185, fontFamily: POLICE, opacity: 1 - sortieTextes, transform: `translateY(${-sortieTextes * 24}px)` }}>
        <Revele k={k1}><div style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.035em', color: melange(C.blanc, C.gris, t(l, 70, 80)) }}>{T.dependance.ligne1}</div></Revele>
        <Revele k={k2} style={{ marginTop: 18 }}><div style={{ fontSize: 86, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.04 }}>{T.dependance.ligne2a}</div></Revele>
        <Revele k={t(l, 74, 86)}><div style={{ fontSize: 86, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.04 }}>
          {T.dependance.ligne2b}{' '}
          <span style={{ display: 'inline-block', color: C.blanc, transform: `rotate(${(1 - kQ) * -28}deg) scale(${0.4 + 0.6 * kQ})`, transformOrigin: '50% 80%', opacity: Math.min(1, kQ * 2) }}>?</span>
        </div></Revele>
      </div>

      {/* question de la bascule */}
      <div style={{ position: 'absolute', left: 90, right: 90, top: 250, fontFamily: POLICE, opacity: 1 - sortieQ, transform: `translateY(${-sortieQ * 24}px)` }}>
        <Revele k={q1}><div style={{ fontSize: 80, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.05 }}>{T.bascule.ligne1}</div></Revele>
        <Revele k={q2}><div style={{ fontSize: 80, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.05 }}>
          au <span style={{ color: C.vertClair }}>même endroit</span> ?
        </div></Revele>
      </div>
    </AbsoluteFill>
  );
};
