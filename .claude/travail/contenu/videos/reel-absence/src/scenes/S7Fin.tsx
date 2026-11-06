import React from 'react';
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, POLICE } from '../theme';
import { T } from '../textes';
import { DOUX, lerp, t } from '../anim';
import { Revele } from '../ui/Elements';

// SCÈNE 7 — Signature (0:27 → 0:30)
// Fond noir, une ligne lumineuse verte, le vrai logo SL Agence (vectorisé depuis logo.png), la promesse, le site.

const LOGO = { cy: 700, h: 400 };
const LOGO_W = (LOGO.h * 1691) / 1949;

export const S7Fin: React.FC = () => {
  const l = useCurrentFrame();
  const ligne = t(l, 2, 22, DOUX);
  const halo = t(l, 6, 46, Easing.out(Easing.quad));
  const logo = t(l, 12, 34, Easing.bezier(0.2, 0.8, 0.2, 1));
  const derive = lerp(1, 1.025, t(l, 0, 94, Easing.linear));
  const s1 = t(l, 30, 44), s2 = t(l, 36, 50), site = t(l, 50, 62), souligne = t(l, 58, 76, DOUX);

  return (
    <AbsoluteFill style={{ transform: `scale(${derive})` }}>
      {/* halo vert derrière le logo */}
      <div style={{
        position: 'absolute', left: 540 - 520, top: LOGO.cy - 520, width: 1040, height: 1040, borderRadius: 1040,
        background: `radial-gradient(circle, rgba(60,79,59,0.95) 0%, rgba(60,79,59,0.45) 32%, rgba(60,79,59,0) 66%)`,
        transform: `scale(${0.5 + 0.5 * halo})`, opacity: halo,
      }} />
      {/* arcs fins qui tournent lentement */}
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, opacity: halo * 0.8 }}>
        <g transform={`rotate(${l * 0.6} 540 ${LOGO.cy})`}>
          <circle cx={540} cy={LOGO.cy} r={330} fill="none" stroke="rgba(167,198,160,0.35)" strokeWidth={1.5} strokeDasharray="300 1774" />
        </g>
        <g transform={`rotate(${180 - l * 0.4} 540 ${LOGO.cy})`}>
          <circle cx={540} cy={LOGO.cy} r={370} fill="none" stroke="rgba(167,198,160,0.2)" strokeWidth={1.5} strokeDasharray="180 2145" />
        </g>
      </svg>
      {/* ligne lumineuse */}
      <div style={{
        position: 'absolute', left: 540 - 470 * ligne, width: 940 * ligne, top: LOGO.cy - 2, height: 4, borderRadius: 4,
        background: `linear-gradient(90deg, rgba(167,198,160,0) 0%, ${C.vertLumiere} 50%, rgba(167,198,160,0) 100%)`,
        boxShadow: '0 0 24px 4px rgba(167,198,160,0.45)', opacity: lerp(1, 0.35, t(l, 18, 40)),
      }} />
      {/* logo */}
      <div style={{
        position: 'absolute', left: 540 - LOGO_W / 2, top: LOGO.cy - LOGO.h / 2, width: LOGO_W, height: LOGO.h,
        clipPath: `inset(${(1 - logo) * 100}% 0 0 0)`, transform: `translateY(${(1 - logo) * 40}px) scale(${1.06 - 0.06 * logo})`,
      }}>
        <Img src={staticFile('logo-sl-agence.svg')} style={{ width: '100%', height: '100%' }} />
      </div>
      {/* promesse */}
      <div style={{ position: 'absolute', left: 0, width: 1080, top: 1000, textAlign: 'center', fontFamily: POLICE }}>
        <Revele k={s1}><div style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.035em', color: C.blanc, lineHeight: 1.1 }}>{T.fin.signature}</div></Revele>
        <Revele k={s2}><div style={{ fontSize: 60, fontWeight: 600, letterSpacing: '-0.035em', color: C.blanc, lineHeight: 1.1 }}>{T.fin.signature2}</div></Revele>
        <div style={{ marginTop: 56, opacity: site, transform: `translateY(${(1 - site) * 14}px)`, fontSize: 36, color: C.gris }}>
          {T.fin.avantSite}
          <span style={{ position: 'relative', color: C.blanc, fontWeight: 600 }}>
            {T.fin.site}
            <span style={{ position: 'absolute', left: 0, bottom: -8, height: 3, width: `${souligne * 100}%`, background: C.vertClair, borderRadius: 3 }} />
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
