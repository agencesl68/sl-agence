import React from 'react';
import { C, POLICE } from '../theme';
import { T } from '../textes';
import { Avatar, Puce } from '../ui/Elements';
import { Icone } from '../ui/Icone';

// Application métier fictive (démonstration conceptuelle de ce que SL Agence peut construire).
// Partagée entre la fin de la bascule (scène 4), la solution (scène 5) et le bénéfice (scène 6).

export const APP = { x: 70, y: 470, w: 940, h: 930 };
export const RANG = { x: APP.x + 24, y: APP.y + 230, w: APP.w - 48, h: 86, pas: 96 };
export const rangRect = (i: number) => ({ x: RANG.x, y: RANG.y + i * RANG.pas, w: RANG.w, h: RANG.h });

export const DOSSIERS = [
  { nom: 'Bauer', type: 'Devis', statut: 'Envoyé', maj: '03/11' },
  { nom: 'Roth', type: 'Intervention', statut: 'Planifiée', maj: '04/11' },
  { nom: 'Martin', type: 'Intervention', statut: 'En cours', maj: "Aujourd'hui", cle: true },
  { nom: 'Hoffmann', type: 'Facturation', statut: 'Terminé', maj: '31/10' },
  { nom: 'Kessler', type: 'Devis', statut: 'À valider', maj: '05/11' },
  { nom: 'Weber', type: 'Intervention', statut: 'Planifiée', maj: '07/11' },
];
export const MARTIN = 2;

export const PuceStatut: React.FC<{ statut: string; pulse?: number; taille?: number }> = ({ statut, pulse = 0, taille = 18 }) => {
  const vert = statut === 'En cours';
  return (
    <Puce texte={statut} taille={taille} pulse={pulse}
      couleur={vert ? C.vertClair : '#B9BFB9'} fond={vert ? 'rgba(167,198,160,0.14)' : 'rgba(245,246,242,0.06)'} />
  );
};

/** Une ligne de dossier (contenu seul, le cadre est géré par l'appelant). */
export const ContenuRang: React.FC<{ i: number; pulse?: number }> = ({ i, pulse }) => {
  const d = DOSSIERS[i];
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '0 22px', gap: 18, fontFamily: POLICE }}>
      <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(60,79,59,0.55)', border: '1px solid rgba(167,198,160,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icone nom="dossier" taille={24} couleur={C.vertClair} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 25, fontWeight: 500, color: C.blanc, letterSpacing: '-0.01em' }}>Dossier {d.nom}</div>
        <div style={{ fontSize: 18, color: C.gris, marginTop: 2 }}>{d.type}</div>
      </div>
      <div style={{ width: 190 }}><PuceStatut statut={d.statut} pulse={pulse} /></div>
      <div style={{ width: 130, textAlign: 'right', fontSize: 19, color: d.cle ? C.blanc : C.gris }}>{d.maj}</div>
    </div>
  );
};

export const EnteteApp: React.FC<{ opacite?: number }> = ({ opacite = 1 }) => (
  <div style={{ position: 'absolute', left: 24, right: 24, top: 24, height: 60, display: 'flex', alignItems: 'center', gap: 16, opacity: opacite, fontFamily: POLICE }}>
    <div style={{ width: 54, height: 54, borderRadius: 15, background: C.vert, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }}>
      <Icone nom="outil" taille={26} couleur={C.blanc} />
    </div>
    <div>
      <div style={{ fontSize: 29, fontWeight: 600, color: C.blanc, letterSpacing: '-0.02em' }}>{T.solution.appli}</div>
      <div style={{ fontSize: 18, color: C.gris }}>{T.solution.appliSous}</div>
    </div>
    <div style={{ marginLeft: 'auto', display: 'flex' }}>
      {[['T', true], ['A', false], ['L', false]].map(([l, absent], i) => (
        <div key={i} style={{ position: 'relative', marginLeft: i ? -12 : 0 }}>
          <Avatar lettre={l as string} taille={46} fond={absent ? '#2A302A' : 'linear-gradient(160deg,#EEF3EC,#C9D6C6)'} couleur={absent ? C.gris : C.vertSombre}
            style={{ border: `3px solid ${C.panneau}`, fontSize: 19 }} />
          <div style={{ position: 'absolute', right: 0, bottom: 1, width: 13, height: 13, borderRadius: 13, background: absent ? C.gris : '#7FD27A', border: `2px solid ${C.panneau}` }} />
        </div>
      ))}
    </div>
  </div>
);

export const ChampApp: React.FC<{ texte: string; focus?: boolean; opacite?: number; resultat?: number }> = ({ texte, focus, opacite = 1, resultat = 0 }) => (
  <div style={{
    position: 'absolute', left: 24, right: 24, top: 108, height: 66, borderRadius: 16, background: C.panneau2, opacity: opacite,
    border: `1.5px solid ${focus ? 'rgba(167,198,160,0.6)' : C.bord}`, boxShadow: focus ? '0 0 0 6px rgba(167,198,160,0.10)' : undefined,
    display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', fontFamily: POLICE, fontSize: 24, color: texte ? C.blanc : C.gris,
  }}>
    <Icone nom="recherche" taille={26} couleur={focus ? C.vertClair : C.gris} />
    <span>{texte || T.solution.placeholder}</span>
    {focus && !resultat && <span style={{ width: 2, height: 28, background: C.blanc, marginLeft: -10 }} />}
    {resultat > 0 && (
      <div style={{ marginLeft: 'auto', opacity: resultat, transform: `scale(${0.8 + 0.2 * resultat})` }}>
        <Puce texte="Trouvé" couleur={C.vertClair} fond="rgba(167,198,160,0.14)" taille={18} />
      </div>
    )}
  </div>
);

export const EnTetesColonnes: React.FC<{ opacite?: number }> = ({ opacite = 1 }) => (
  <div style={{ position: 'absolute', left: 24 + 22, right: 24 + 22, top: 196, display: 'flex', fontFamily: POLICE, fontSize: 16, color: C.grisFonce, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: opacite }}>
    <span style={{ flex: 1, paddingLeft: 64 }}>Dossier</span><span style={{ width: 190 }}>Statut</span><span style={{ width: 130, textAlign: 'right' }}>Mise à jour</span>
  </div>
);

export const PiedApp: React.FC<{ opacite?: number }> = ({ opacite = 1 }) => (
  <div style={{ position: 'absolute', left: 24, right: 24, bottom: 26, display: 'flex', alignItems: 'center', gap: 10, fontFamily: POLICE, fontSize: 18, color: C.gris, opacity: opacite }}>
    <Icone nom="check" taille={20} couleur={C.vertClair} epaisseur={2.4} /> Tout est à jour
    <span style={{ marginLeft: 'auto' }}>Accessible à toute l'équipe</span>
  </div>
);

export const styleCadreApp: React.CSSProperties = {
  background: `linear-gradient(180deg, ${C.panneau} 0%, #0C0F0C 100%)`, borderRadius: 34,
  border: '1px solid rgba(167,198,160,0.16)', boxShadow: '0 40px 120px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
};
