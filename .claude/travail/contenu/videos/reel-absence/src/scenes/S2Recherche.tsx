import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { C, POLICE, ombre } from '../theme';
import { T } from '../textes';
import { DOUX, lerp, melange, ressort, t, tape } from '../anim';
import { Avatar, Curseur, Fenetre, Puce, Revele, Trait } from '../ui/Elements';
import { Icone } from '../ui/Icone';

// SCÈNE 2 — Le client attend (0:04 → 0:09)
// Un client demande où en est son dossier. On cherche… aucun résultat.
// Les logiciels s'empilent, la caméra recule, les liens entre eux se rompent.

export const FENETRES = [
  { id: 'messagerie', titre: 'Messagerie', sous: 'Boîte de réception', icone: 'messagerie', x: 90, y: 420, w: 900, h: 600, debut: 0 },
  { id: 'dossiers', titre: 'Dossiers', sous: 'Partage commun', icone: 'dossier', x: -60, y: 760, w: 700, h: 500, debut: 92 },
  { id: 'tableur', titre: 'Tableur', sous: 'suivi_clients_v3.xlsx', icone: 'tableur', x: 430, y: 980, w: 720, h: 520, debut: 100 },
  { id: 'emails', titre: 'E-mails', sous: 'Archives', icone: 'email', x: 400, y: 200, w: 660, h: 430, debut: 108 },
  { id: 'documents', titre: 'Documents', sous: 'Téléchargements', icone: 'document', x: -90, y: 1170, w: 640, h: 420, debut: 116 },
  { id: 'messages', titre: 'Messages', sous: "Groupe de l'équipe", icone: 'messages', x: 600, y: 1380, w: 560, h: 320, debut: 124 },
];

const CAM_FIN = { s: 0.64, ty: -150 };
const CENTRE = { x: 540, y: 820 };
const versEcran = (x: number, y: number, s: number, ty: number) => ({ x: CENTRE.x + s * (x - CENTRE.x), y: CENTRE.y + s * (y - CENTRE.y) + ty });

/** Position à l'écran des fenêtres à la fin de la scène (point de départ de la scène 3). */
export const rectsFinaux = () => FENETRES.map((w) => {
  const p = versEcran(w.x, w.y, CAM_FIN.s, CAM_FIN.ty);
  return { x: p.x, y: p.y, w: w.w * CAM_FIN.s, h: w.h * CAM_FIN.s, titre: w.titre, icone: w.icone };
});

const LIENS: [number, number, number][] = [[0, 1, 134], [1, 2, 140], [0, 3, 134], [2, 4, 140], [3, 5, 137], [1, 4, 137]];

const ChampRecherche: React.FC<{ texte: string; focus?: boolean; w: number | string; h?: number; taille?: number }> = ({ texte, focus, w, h = 56, taille = 23 }) => (
  <div style={{
    width: w, height: h, borderRadius: 12, background: '#FFFFFF', border: `2px solid ${focus ? C.vertMoyen : C.papierBord}`,
    display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontSize: taille, color: texte ? C.encre : C.encreGris,
    boxShadow: focus ? '0 0 0 5px rgba(95,125,89,0.18)' : undefined,
  }}>
    <Icone nom="recherche" taille={taille} couleur={C.encreGris} />
    <span>{texte || 'Rechercher'}</span>
    {focus && <span style={{ width: 2, height: taille + 4, background: C.encre, marginLeft: -10 }} />}
  </div>
);

const Aucun: React.FC<{ taille?: number }> = ({ taille = 20 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.rouge, fontSize: taille, fontWeight: 500 }}>
    <Icone nom="croix" taille={taille} couleur={C.rouge} epaisseur={2.4} /> Aucun résultat
  </div>
);

const ContenuSecondaire: React.FC<{ id: string; f: number; debut: number }> = ({ id, f, debut }) => {
  const recherche = tape(T.recherche.client, f, debut + 2, 0.8);
  const echec = f > debut + 9;
  const lignes: Record<string, React.ReactNode> = {
    dossiers: ['Clients 2025', 'Clients_2026', 'Clients (copie)', 'À trier', 'Divers'].map((n) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, padding: '9px 0', borderBottom: `1px solid ${C.papier2}` }}>
        <Icone nom="dossier" taille={22} couleur={C.encreGris} /> {n}
      </div>
    )),
    tableur: (
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 0, fontSize: 18 }}>
        {['Client', 'Statut', 'Date', 'Note'].map((h) => <div key={h} style={{ padding: 8, fontWeight: 600, background: C.papier2, border: `1px solid ${C.papierBord}` }}>{h}</div>)}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ padding: 10, border: `1px solid ${C.papierBord}`, outline: i === 9 ? `2px solid ${C.rouge}` : undefined, outlineOffset: -2 }}>
            <Trait w={`${40 + ((i * 37) % 50)}%`} h={10} />
          </div>
        ))}
      </div>
    ),
    emails: Array.from({ length: 4 }).map((_, i) => (
      <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.papier2}` }}>
        <div style={{ width: 34, height: 34, borderRadius: 34, background: C.papier2 }} />
        <div style={{ flex: 1 }}><Trait w={`${50 + i * 9}%`} /><Trait w={`${30 + i * 7}%`} h={9} style={{ marginTop: 8 }} /></div>
      </div>
    )),
    documents: ['Devis_2026-041.pdf', 'Devis_final_v2.pdf', 'Scan_0034.pdf'].map((n) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 21, padding: '9px 0', borderBottom: `1px solid ${C.papier2}` }}>
        <Icone nom="document" taille={22} couleur={C.encreGris} /> {n}
      </div>
    )),
    messages: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', border: `1px solid ${C.papierBord}`, borderRadius: 14, padding: '10px 14px', fontSize: 20 }}>
          Quelqu'un sait où est le dossier {T.recherche.client} ?
        </div>
        <div style={{ alignSelf: 'flex-end', background: C.papier2, borderRadius: 14, padding: '10px 14px', fontSize: 20, color: C.encreGris }}>Je crois que c'est Thomas qui l'a…</div>
      </div>
    ),
  };
  return (
    <div style={{ padding: '16px 20px', fontFamily: POLICE, color: C.encre }}>
      {id !== 'messages' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
          <ChampRecherche texte={recherche} w={300} h={46} taille={20} />
          {echec && <Aucun />}
        </div>
      )}
      {lignes[id]}
    </div>
  );
};

export const S2Recherche: React.FC = () => {
  const f = useCurrentFrame();

  // caméra
  const recul = t(f, 92, 142, DOUX);
  const entree = t(f, 0, 16);
  const s = lerp(1, CAM_FIN.s, recul) * lerp(0.72, 1, entree);
  const ty = lerp(110, CAM_FIN.ty, recul);
  const sortie = t(f, 150, 162, Easing.in(Easing.quad));

  // messagerie
  const kToast = ressort(f, 16, { damping: 15, stiffness: 240 });
  const toastVersListe = t(f, 30, 40);
  const fil = t(f, 32, 42);
  const msg = t(f, 38, 48);
  const focus = f >= 58;
  const saisie = tape(T.recherche.recherche, f, 60, 1.1);
  const charge = f >= 78 && f < 86;
  const echec = f >= 86;
  const secoue = echec ? Math.sin((f - 86) * 2.4) * 7 * Math.max(0, 1 - (f - 86) / 10) : 0;

  // curseur : messagerie puis chaque nouvelle fenêtre
  const cibles = [
    { f: 46, x: 920, y: 1150 }, { f: 58, x: 470, y: 505 },
    ...FENETRES.slice(1).map((w) => ({ f: w.debut + 4, x: w.x + 230, y: w.y + 90 })),
  ];
  let cx = cibles[0].x, cy = cibles[0].y;
  for (let i = 1; i < cibles.length; i++) {
    const a = cibles[i - 1], b = cibles[i];
    const k = t(f, Math.max(a.f, b.f - 12), b.f, DOUX);
    if (f >= Math.max(a.f, b.f - 12)) { cx = lerp(a.x, b.x, k); cy = lerp(a.y, b.y, k); }
  }
  const clics = [58, ...FENETRES.slice(1).map((w) => w.debut + 4)];
  const clic = clics.map((c) => (f >= c && f < c + 10 ? (f - c) / 10 : 0)).find((v) => v > 0) ?? 0;

  const nbOuvertes = FENETRES.filter((w) => f >= w.debut).length;

  // textes
  const k1 = t(f, 100, 112);
  const k2 = t(f, 128, 140);
  const kBadge = ressort(f, 128, { damping: 12, stiffness: 260 });

  return (
    <AbsoluteFill style={{ opacity: entree * (1 - sortie) }}>
      <AbsoluteFill style={{ transform: `translateY(${ty}px) scale(${s})`, transformOrigin: `${CENTRE.x}px ${CENTRE.y}px` }}>
        {FENETRES.map((w, i) => {
          if (f < w.debut) return null;
          const k = i === 0 ? 1 : ressort(f, w.debut, { damping: 16, stiffness: 210 });
          const plusRecentes = FENETRES.filter((v, j) => j > i && f >= v.debut).length;
          return (
            <Fenetre key={w.id} titre={w.titre} sous={w.sous} icone={w.icone} w={w.w} h={w.h} style={{
              left: w.x, top: w.y, zIndex: i, opacity: Math.min(1, k * 2),
              transform: `translateY(${(1 - k) * 50}px) scale(${0.9 + 0.1 * k})`,
              filter: `brightness(${1 - 0.1 * plusRecentes})`,
            }}>
              {i === 0 ? (
                <div style={{ fontFamily: POLICE }}>
                  <div style={{ padding: 18, transform: `translateX(${secoue}px)` }}>
                    <ChampRecherche texte={saisie} focus={focus && nbOuvertes === 1} w="100%" h={64} taille={29} />
                  </div>
                  <div style={{ display: 'flex', borderTop: `1px solid ${C.papierBord}`, height: 450 }}>
                    <div style={{ width: 320, borderRight: `1px solid ${C.papierBord}` }}>
                      <div style={{ height: 96 * fil, overflow: 'hidden', background: '#E2E8DF' }}>
                        <div style={{ padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'center' }}>
                          <Avatar lettre={T.recherche.client[0]} taille={44} fond="#C9D3C6" couleur={C.vertSombre} />
                          <div>
                            <div style={{ fontSize: 22, fontWeight: 600 }}>{T.recherche.client}</div>
                            <div style={{ fontSize: 16, color: C.encreGris, whiteSpace: 'nowrap' }}>Où en est mon dossier ?</div>
                          </div>
                          <div style={{ width: 11, height: 11, borderRadius: 11, background: C.vertMoyen, marginLeft: 'auto' }} />
                        </div>
                      </div>
                      {[['Fournisseur', 'Livraison prévue mardi'], ['Comptabilité', 'Relevé du mois']].map(([a, b]) => (
                        <div key={a} style={{ padding: '18px 22px', display: 'flex', gap: 14, alignItems: 'center', borderTop: `1px solid ${C.papier2}` }}>
                          <div style={{ width: 44, height: 44, borderRadius: 44, background: C.papier2 }} />
                          <div><div style={{ fontSize: 22, fontWeight: 500 }}>{a}</div><div style={{ fontSize: 18, color: C.encreGris }}>{b}</div></div>
                        </div>
                      ))}
                    </div>
                    <div style={{ flex: 1, padding: 26, opacity: msg, transform: `translateY(${(1 - msg) * 20}px)` }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <span style={{ fontSize: 26, fontWeight: 600 }}>{T.recherche.client}</span>
                        <span style={{ fontSize: 18, color: C.encreGris }}>à l'instant</span>
                      </div>
                      <div style={{ marginTop: 18, background: '#FFFFFF', border: `1px solid ${C.papierBord}`, borderRadius: 18, borderTopLeftRadius: 4, padding: '18px 20px', fontSize: 31, lineHeight: 1.25, fontWeight: 500 }}>
                        {T.recherche.message}
                      </div>
                      <Puce texte="En attente de réponse" couleur={C.rouge} fond="rgba(215,91,85,0.12)" taille={22} pulse={(f % 24) / 24} style={{ marginTop: 18 }} />
                    </div>
                  </div>
                  {/* résultats de recherche */}
                  {f >= 78 && (
                    <div style={{
                      position: 'absolute', left: 18, top: 92, width: 600, padding: '22px 24px', background: '#FFFFFF', borderRadius: 14,
                      border: `1px solid ${C.papierBord}`, boxShadow: '0 16px 40px rgba(0,0,0,0.18)', zIndex: 5, fontSize: 30,
                      transform: `translateX(${secoue}px)`,
                    }}>
                      {charge ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: C.encreGris }}>
                          <div style={{ width: 22, height: 22, borderRadius: 22, border: `3px solid ${C.papierBord}`, borderTopColor: C.encreGris, transform: `rotate(${f * 40}deg)` }} />
                          Recherche…
                        </div>
                      ) : echec && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: C.rouge, fontWeight: 500 }}>
                          <Icone nom="croix" taille={30} couleur={C.rouge} epaisseur={2.6} /> {T.recherche.aucun}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <ContenuSecondaire id={w.id} f={f} debut={w.debut} />
              )}
            </Fenetre>
          );
        })}

        {/* liens entre les logiciels, qui se rompent */}
        <svg width={1080} height={1920} style={{ position: 'absolute', left: 0, top: 0, zIndex: 20, overflow: 'visible' }}>
          {LIENS.map(([a, b, rupture], i) => {
            const A = FENETRES[a], B = FENETRES[b];
            const p = { x: A.x + A.w / 2, y: A.y + A.h / 2 };
            const q = { x: B.x + B.w / 2, y: B.y + B.h / 2 };
            const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
            const trace = t(f, 108 + i * 3, 122 + i * 3);
            if (trace <= 0) return null;
            const r = t(f, rupture, rupture + 11, Easing.out(Easing.cubic));
            const e = (o: { x: number; y: number }, k: number) => ({ x: lerp(o.x, m.x, k), y: lerp(o.y, m.y, k) });
            const fin1 = e(p, Math.min(trace, 1) * (1 - r));
            const fin2 = e(q, Math.min(trace, 1) * (1 - r));
            const etincelle = f >= rupture && f < rupture + 10 ? 1 - (f - rupture) / 10 : 0;
            return (
              <g key={i} opacity={1 - t(f, rupture + 8, rupture + 16)}>
                <line x1={p.x} y1={p.y} x2={fin1.x} y2={fin1.y} stroke="#9AA19A" strokeWidth={3} strokeDasharray="10 8" />
                <line x1={q.x} y1={q.y} x2={fin2.x} y2={fin2.y} stroke="#9AA19A" strokeWidth={3} strokeDasharray="10 8" />
                {r === 0 && <circle cx={m.x} cy={m.y} r={7} fill="#9AA19A" />}
                {etincelle > 0 && <circle cx={m.x} cy={m.y} r={10 + (1 - etincelle) * 26} fill="none" stroke={C.rouge} strokeWidth={4} opacity={etincelle} />}
              </g>
            );
          })}
        </svg>

        {/* curseur */}
        {f >= 46 && <Curseur x={cx} y={cy} clic={clic} opacite={t(f, 46, 52) * (1 - t(f, 136, 144))} />}

        {/* notification du client */}
        <div style={{
          position: 'absolute', left: 60, top: 270, width: 960, height: 140, zIndex: 30, borderRadius: 28,
          background: 'rgba(255,255,255,0.97)', boxShadow: ombre, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px',
          fontFamily: POLICE, color: C.encre,
          opacity: Math.min(1, kToast * 2) * (1 - toastVersListe) * (f >= 16 ? 1 : 0),
          transform: `translateY(${(1 - kToast) * -70 + toastVersListe * 250}px) translateX(${toastVersListe * -220}px) scale(${1 - toastVersListe * 0.45})`,
        }}>
          <Avatar lettre={T.recherche.client[0]} taille={76} fond="#C9D3C6" couleur={C.vertSombre} />
          <div>
            <div style={{ fontSize: 26, color: C.encreGris }}><b style={{ color: C.encre }}>{T.recherche.client}</b> · Nouveau message</div>
            <div style={{ fontSize: 40, fontWeight: 600, marginTop: 2, letterSpacing: '-0.02em' }}>{T.recherche.message}</div>
          </div>
        </div>
      </AbsoluteFill>

      {/* badge */}
      {f >= 128 && (
        <div style={{ position: 'absolute', left: 0, width: 1080, top: 300, display: 'flex', justifyContent: 'center', zIndex: 40 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '18px 30px', borderRadius: 999, background: 'rgba(21,25,21,0.97)',
            border: `2px solid ${C.rouge}`, boxShadow: ombre, color: C.blanc, fontFamily: POLICE, fontSize: 34, fontWeight: 600,
            transform: `scale(${0.6 + 0.4 * kBadge})`, opacity: Math.min(1, kBadge * 2),
          }}>
            <Icone nom="alerte" taille={36} couleur={C.rouge} epaisseur={2.2} /> {T.recherche.introuvable}
          </div>
        </div>
      )}

      {/* textes */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1120, bottom: 0, background: `linear-gradient(180deg, rgba(8,10,8,0) 0%, rgba(8,10,8,0.92) 22%, ${C.noir} 100%)`, opacity: k1 }} />
      <div style={{ position: 'absolute', left: 90, top: 1290, fontFamily: POLICE, transform: `translateY(${-sortie * 30}px)` }}>
        <Revele k={k1}><div style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.035em', color: melange(C.blanc, C.gris, t(f, 128, 138)) }}>{T.recherche.ligne1}</div></Revele>
        <Revele k={k2} style={{ marginTop: 10 }}><div style={{ fontSize: 72, fontWeight: 600, letterSpacing: '-0.035em', color: C.blanc }}>
          Mais <span style={{ fontWeight: 750 }}>personne</span> ne sait où.
        </div></Revele>
      </div>
    </AbsoluteFill>
  );
};
