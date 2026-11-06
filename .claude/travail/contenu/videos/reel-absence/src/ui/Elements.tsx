import React from 'react';
import { C, POLICE, ombre } from '../theme';
import { Icone } from './Icone';

/** Fenêtre de logiciel claire (style « outils dispersés » de la première vidéo). */
export const Fenetre: React.FC<{
  titre: string; sous?: string; icone: string; w: number; h: number; style?: React.CSSProperties; children?: React.ReactNode;
}> = ({ titre, sous, icone, w, h, style, children }) => (
  <div style={{
    position: 'absolute', width: w, height: h, background: C.papier, borderRadius: 18, overflow: 'hidden',
    boxShadow: ombre, border: `1px solid ${C.papierBord}`, fontFamily: POLICE, color: C.encre, ...style,
  }}>
    <div style={{ height: 58, display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px', background: C.papier2, borderBottom: `1px solid ${C.papierBord}` }}>
      <div style={{ display: 'flex', gap: 7, marginRight: 6 }}>
        {[0, 1, 2].map((i) => <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: '#C9CCC4' }} />)}
      </div>
      <Icone nom={icone} taille={22} couleur={C.encre} />
      <span style={{ fontSize: 22, fontWeight: 600 }}>{titre}</span>
      {sous && <span style={{ fontSize: 20, color: C.encreGris }}>{sous}</span>}
    </div>
    <div style={{ position: 'relative', height: h - 58 }}>{children}</div>
  </div>
);

/** Ligne grise de remplissage (texte simulé). */
export const Trait: React.FC<{ w: number | string; h?: number; c?: string; style?: React.CSSProperties }> = ({ w, h = 12, c = '#D9DCD4', style }) => (
  <div style={{ width: w, height: h, borderRadius: h, background: c, ...style }} />
);

export const Avatar: React.FC<{ lettre: string; taille: number; fond?: string; couleur?: string; style?: React.CSSProperties }> = ({
  lettre, taille, fond = `linear-gradient(160deg, ${C.vertMoyen}, ${C.vert})`, couleur = C.blanc, style,
}) => (
  <div style={{
    width: taille, height: taille, borderRadius: taille, background: fond, color: couleur, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontFamily: POLICE, fontWeight: 600, fontSize: taille * 0.42,
    flexShrink: 0, ...style,
  }}>{lettre}</div>
);

/** Curseur de souris vectoriel. */
export const Curseur: React.FC<{ x: number; y: number; clic?: number; opacite?: number }> = ({ x, y, clic = 0, opacite = 1 }) => (
  <div style={{ position: 'absolute', left: x, top: y, opacity: opacite, zIndex: 50, pointerEvents: 'none' }}>
    {clic > 0 && clic < 1 && (
      <div style={{
        position: 'absolute', left: -28, top: -28, width: 56, height: 56, borderRadius: 56,
        border: `3px solid rgba(167,198,160,${1 - clic})`, transform: `scale(${0.3 + clic})`,
      }} />
    )}
    <svg width="38" height="46" viewBox="0 0 19 23" style={{ display: 'block', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))', transform: `scale(${1 - 0.12 * Math.sin(Math.PI * Math.min(1, clic * 2))})`, transformOrigin: '0 0' }}>
      <path d="M1 1l16 11.2-7.1 1.1L14 21l-3 1.2-4-7.6L1.5 19z" fill="#FFFFFF" stroke="#111" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  </div>
);

/** Révélation de texte par masque (le texte monte derrière une fente). */
export const Revele: React.FC<{ k: number; children: React.ReactNode; dist?: number; style?: React.CSSProperties }> = ({ k, children, dist = 1, style }) => (
  <div style={{ overflow: 'hidden', paddingBottom: '0.14em', marginBottom: '-0.14em', ...style }}>
    <div style={{ transform: `translateY(${(1 - k) * 105 * dist}%)`, opacity: Math.min(1, k * 1.6) }}>{children}</div>
  </div>
);

export const Titre: React.FC<{ taille?: number; couleur?: string; poids?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  taille = 84, couleur = C.blanc, poids = 600, style, children,
}) => (
  <div style={{ fontFamily: POLICE, fontSize: taille, fontWeight: poids, color: couleur, letterSpacing: '-0.035em', lineHeight: 1.06, ...style }}>{children}</div>
);

export const Puce: React.FC<{ texte: string; couleur: string; fond: string; point?: boolean; taille?: number; style?: React.CSSProperties; pulse?: number }> = ({
  texte, couleur, fond, point = true, taille = 20, style, pulse = 0,
}) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 9, padding: `${taille * 0.35}px ${taille * 0.75}px`, borderRadius: 999,
    background: fond, color: couleur, fontFamily: POLICE, fontSize: taille, fontWeight: 500, whiteSpace: 'nowrap', ...style,
  }}>
    {point && (
      <span style={{ position: 'relative', width: taille * 0.45, height: taille * 0.45 }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: couleur }} />
        {pulse > 0 && <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: couleur, opacity: 0.5 * (1 - pulse), transform: `scale(${1 + pulse * 1.8})` }} />}
      </span>
    )}
    {texte}
  </div>
);
