import React from 'react';

// Icônes vectorielles génériques (aucun logo de marque tiers).
const P: Record<string, React.ReactNode> = {
  messagerie: (<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>),
  dossier: (<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H9l2 2.2h7.5A2.5 2.5 0 0 1 21 9.7v7.8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />),
  tableur: (<><rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M3.5 9h17M3.5 14h17M9.5 9v11M15 9v11" /></>),
  email: (<><path d="M4 6h16v12H4z" /><path d="M4 6l8 7 8-7" /></>),
  document: (<><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h6" /></>),
  messages: (<><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>),
  recherche: (<><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></>),
  check: (<path d="M5 12.5l4.5 4.5L19 7.5" />),
  croix: (<path d="M7 7l10 10M17 7L7 17" />),
  alerte: (<><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5M12 16.4v.1" /></>),
  calendrier: (<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  equipe: (<><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" /><circle cx="17" cy="8" r="2.5" /><path d="M16 13.2c2.6.2 4.2 1.9 4.6 4.8" /></>),
  historique: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  outil: (<><rect x="3.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.6" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.6" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.6" /></>),
  personneMoins: (<><circle cx="10" cy="8.5" r="3.6" /><path d="M3.5 20c.7-3.6 3.3-5.6 6.5-5.6s5.8 2 6.5 5.6" /><path d="M16.5 10.5h5" /></>),
  trombone: (<path d="M8 12.5l6.4-6.4a3 3 0 0 1 4.2 4.2l-7.8 7.8a4.6 4.6 0 0 1-6.5-6.5L12 4" />),
  envoyer: (<path d="M4 12l16-8-6 16-2.5-6.5z" />),
};

export const Icone: React.FC<{ nom: string; taille?: number; couleur?: string; epaisseur?: number; style?: React.CSSProperties }> = ({
  nom, taille = 24, couleur = 'currentColor', epaisseur = 1.8, style,
}) => (
  <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth={epaisseur}
    strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0, ...style }}>
    {P[nom]}
  </svg>
);
