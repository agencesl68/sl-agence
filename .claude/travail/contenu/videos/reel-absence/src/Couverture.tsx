import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { C, POLICE } from './theme';

// Couverture du reel (même modèle que pub-sl-agence.jpg) : fond = image 262 de la vidéo, recadrée sur les logiciels empilés (sans les textes), floutée et teintée.
// Tout l'essentiel tient dans la zone centrale 4:5 (y 285 → 1635) visible dans la grille du profil.
const LOGO_H = 190;
const LOGO_W = (LOGO_H * 1691) / 1949;

export const Couverture: React.FC = () => (
  <AbsoluteFill style={{ background: C.noir, fontFamily: POLICE }}>
    <AbsoluteFill style={{ filter: 'blur(7px) brightness(0.58) saturate(0.5)' }}>
      <Img src={staticFile('couverture-fond.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </AbsoluteFill>
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 85% 60% at 50% 45%, rgba(70,94,68,0.55) 0%, rgba(24,34,23,0.62) 85%)' }} />
    <AbsoluteFill style={{ alignItems: 'center', textAlign: 'center', color: C.blanc }}>
      <div style={{ marginTop: 440, fontSize: 52, fontWeight: 400, color: 'rgba(245,246,242,0.85)', letterSpacing: '-0.01em' }}>Votre entreprise</div>
      <div style={{ marginTop: 6, fontSize: 168, fontWeight: 650, letterSpacing: '-0.055em', lineHeight: 1 }}>s'arrête</div>
      <div style={{ marginTop: 26, fontSize: 82, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1.08 }}>quand un salarié<br />est absent&nbsp;?</div>
      <div style={{ marginTop: 56, fontSize: 46, fontWeight: 400, color: 'rgba(245,246,242,0.78)', lineHeight: 1.3 }}>
        Et personne ne retrouve<br /><span style={{ color: C.blanc, fontWeight: 600 }}>les dossiers</span>.
      </div>
      <div style={{ marginTop: 70, width: 120, height: 2, background: 'rgba(245,246,242,0.7)' }} />
      <Img src={staticFile('logo-sl-agence.svg')} style={{ marginTop: 70, width: LOGO_W, height: LOGO_H }} />
      <div style={{ marginTop: 34, fontSize: 30, color: 'rgba(245,246,242,0.7)', letterSpacing: '0.02em' }}>Automatisation et logiciel sur mesure</div>
    </AbsoluteFill>
  </AbsoluteFill>
);
