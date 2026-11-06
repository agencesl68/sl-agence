import React from 'react';
import { AbsoluteFill, Easing, useCurrentFrame } from 'remotion';
import { C, POLICE, ombre } from '../theme';
import { T } from '../textes';
import { DOUX, lerp, ressort, t, tape } from '../anim';
import { Avatar, Curseur, Puce, Revele } from '../ui/Elements';
import { Icone } from '../ui/Icone';
import { APP, ChampApp, ContenuRang, DOSSIERS, EnTetesColonnes, EnteteApp, MARTIN, PiedApp, PuceStatut, rangRect, styleCadreApp } from './App';

// SCÈNE 5 — La solution SL Agence (0:17 → 0:24)
// Même recherche « Dossier Martin » : cette fois le résultat est immédiat,
// la fiche s'ouvre, les informations s'éclairent, la réponse au client est prête.

export const FICHE = { x: APP.x + 24, y: APP.y + 216, w: APP.w - 48, h: 620 };
export const FIN_SOLUTION = 222;

const Champ: React.FC<{ label: string; k: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ label, k, children, style }) => (
  <div style={{ opacity: k, transform: `translateY(${(1 - k) * 16}px)`, ...style }}>
    <div style={{ fontSize: 16, color: C.gris, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 6, fontSize: 27, fontWeight: 500, color: C.blanc }}>
      {children}
      <div style={{ position: 'absolute', left: 0, bottom: -6, height: 3, borderRadius: 3, width: `${k * 100}%`, background: C.vertClair, opacity: 0.85 * (1 - Math.max(0, (k - 0.7) / 0.3) * 0.6) }} />
    </div>
  </div>
);

/** L'application à l'image l (réutilisée telle quelle par la scène 6). */
export const AppSolution: React.FC<{ l: number; curseur?: boolean }> = ({ l, curseur = true }) => {
  const focus = l >= 42;
  const saisie = tape(T.recherche.recherche, l, 44, 1.1);
  const trouve = t(l, 62, 70);
  const monte = t(l, 64, 78, DOUX);
  const balayage = t(l, 64, 88, Easing.inOut(Easing.quad));
  const ouvre = t(l, 84, 106, DOUX);
  const st = (d: number) => t(l, 96 + d, 110 + d);
  const kCheck = ressort(l, 132, { damping: 11, stiffness: 220 });
  const trait = t(l, 136, 150);
  const kRep = ressort(l, 146, { damping: 17, stiffness: 170 });
  const mots = T.solution.reponse.split(' ');
  const nbMots = Math.floor(lerp(0, mots.length, t(l, 150, 184, Easing.linear)));

  // curseur
  const pts = [{ f: 26, x: 930, y: 1320 }, { f: 42, x: 380, y: APP.y + 141 }, { f: 80, x: 560, y: rangRect(0).y + 43 }];
  let cx = pts[0].x, cy = pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const s0 = Math.max(a.f, b.f - 14);
    if (l >= s0) { const k = t(l, s0, b.f, DOUX); cx = lerp(a.x, b.x, k); cy = lerp(a.y, b.y, k); }
  }
  const clic = [42, 80].map((c) => (l >= c && l < c + 10 ? (l - c) / 10 : 0)).find((v) => v > 0) ?? 0;

  const r0 = rangRect(0), rM = rangRect(MARTIN);
  const box = {
    x: lerp(r0.x, FICHE.x, ouvre), y: lerp(lerp(rM.y, r0.y, monte), FICHE.y, ouvre),
    w: lerp(r0.w, FICHE.w, ouvre), h: lerp(r0.h, FICHE.h, ouvre),
  };

  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: APP.x, top: APP.y, width: APP.w, height: APP.h, ...styleCadreApp }}>
        <EnteteApp />
        <ChampApp texte={saisie} focus={focus} resultat={trouve} />
        <EnTetesColonnes opacite={1 - t(l, 84, 94)} />
        <PiedApp />
      </div>

      {/* autres dossiers : s'effacent au résultat */}
      {DOSSIERS.map((_, i) => {
        if (i === MARTIN) return null;
        const out = t(l, 62 + Math.abs(i - MARTIN), 74 + Math.abs(i - MARTIN), Easing.in(Easing.quad));
        if (out >= 1) return null;
        const r = rangRect(i);
        return (
          <div key={i} style={{
            position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 18, background: C.panneau2,
            border: '1px solid rgba(245,246,242,0.07)', opacity: 1 - out, transform: `translateY(${(i < MARTIN ? -1 : 1) * out * 24}px) scale(${1 - out * 0.04})`,
          }}><ContenuRang i={i} /></div>
        );
      })}

      {/* dossier Martin → fiche client */}
      <div style={{
        position: 'absolute', left: box.x, top: box.y, width: box.w, height: box.h, borderRadius: lerp(18, 26, ouvre), overflow: 'hidden',
        background: C.panneau2, border: `1px solid rgba(167,198,160,${0.07 + 0.35 * Math.max(trouve * (1 - ouvre * 0.4), 0)})`,
        boxShadow: ouvre > 0 ? '0 30px 90px rgba(0,0,0,0.55)' : undefined, fontFamily: POLICE,
      }}>
        {/* balayage lumineux */}
        {balayage > 0 && balayage < 1 && (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${lerp(-40, 110, balayage)}%`, width: '35%', background: 'linear-gradient(90deg, rgba(167,198,160,0) 0%, rgba(167,198,160,0.22) 50%, rgba(167,198,160,0) 100%)' }} />
        )}
        <div style={{ position: 'absolute', left: 0, top: 0, width: r0.w, height: r0.h, opacity: 1 - t(l, 84, 92) }}>
          <ContenuRang i={MARTIN} pulse={(l % 30) / 30} />
        </div>

        {/* contenu de la fiche */}
        {l >= 92 && (
          <div style={{ position: 'absolute', inset: 0, padding: '30px 34px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: st(0), transform: `translateY(${(1 - st(0)) * 14}px)` }}>
              <Avatar lettre="M" taille={68} fond="linear-gradient(160deg,#EEF3EC,#C9D6C6)" couleur={C.vertSombre} style={{ fontSize: 30 }} />
              <div>
                <div style={{ fontSize: 40, fontWeight: 600, color: C.blanc, letterSpacing: '-0.03em' }}>{T.recherche.client}</div>
                <div style={{ fontSize: 20, color: C.gris }}>Fiche client · Dossier intervention</div>
              </div>
              <div style={{ marginLeft: 'auto', marginRight: 70 }}><PuceStatut statut="En cours" taille={21} pulse={(l % 30) / 30} /></div>
            </div>
            <div style={{ height: 1, background: C.bord, margin: '18px 0 16px', transform: `scaleX(${st(2)})`, transformOrigin: 'left' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 18, columnGap: 30 }}>
              <Champ label="Client" k={st(4)}>Martin</Champ>
              <Champ label="Dossier" k={st(7)}>Intervention</Champ>
              <Champ label="Statut" k={st(10)}><span style={{ color: C.vertClair }}>En cours</span></Champ>
              <Champ label="Responsable" k={st(13)}>
                <Avatar lettre="T" taille={34} fond="#2A302A" couleur={C.gris} style={{ fontSize: 15 }} /> Thomas
                <span style={{ fontSize: 18, color: C.gris, fontWeight: 400 }}>· absent aujourd'hui</span>
              </Champ>
              <Champ label="Dernière mise à jour" k={st(16)}>Aujourd'hui</Champ>
            </div>
            <div style={{ marginTop: 20, opacity: st(20), transform: `translateY(${(1 - st(20)) * 14}px)` }}>
              <div style={{ fontSize: 16, color: C.gris, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Documents associés</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                {["Bon d'intervention.pdf", 'Photos du chantier'].map((n) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, background: C.panneau3, border: `1px solid ${C.bord}`, fontSize: 20, color: C.blanc }}>
                    <Icone nom="document" taille={20} couleur={C.vertClair} /> {n}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 18, opacity: st(24), transform: `translateY(${(1 - st(24)) * 14}px)` }}>
              <div style={{ fontSize: 16, color: C.gris, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Historique</div>
              {[['Intervention démarrée', "Aujourd'hui", true], ['Intervention planifiée', '04/11', false], ['Dossier créé', '28/10', false]].map(([a, d, actif], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 9, fontSize: 20, color: actif ? C.blanc : C.gris, opacity: st(26 + i * 3) }}>
                  <div style={{ width: 10, height: 10, borderRadius: 10, background: actif ? C.vertClair : C.grisFonce }} />
                  {a}<span style={{ marginLeft: 'auto' }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* coche de validation */}
      {l >= 132 && (
        <div style={{
          position: 'absolute', left: FICHE.x + FICHE.w - 74, top: FICHE.y + 30, width: 64, height: 64, borderRadius: 64,
          background: C.vertClair, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${kCheck})`, boxShadow: `0 0 0 ${10 * (1 - trait)}px rgba(167,198,160,${0.3 * (1 - trait)}), 0 10px 30px rgba(0,0,0,0.4)`,
        }}>
          <svg width={36} height={36} viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={C.vertSombre} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trait} /></svg>
        </div>
      )}

      {/* réponse préparée */}
      {l >= 146 && (
        <div style={{
          position: 'absolute', left: 120, width: 840, top: FICHE.y + FICHE.h + 14, padding: '20px 26px', borderRadius: 24,
          background: 'rgba(28,33,28,0.98)', border: '1px solid rgba(167,198,160,0.3)', boxShadow: ombre, fontFamily: POLICE,
          opacity: Math.min(1, kRep * 2), transform: `translateY(${(1 - kRep) * 80}px)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 19, color: C.gris }}>
            <Icone nom="envoyer" taille={20} couleur={C.vertClair} /> Réponse à Martin
            <div style={{ marginLeft: 'auto', opacity: t(l, 186, 194) }}><Puce texte="Réponse prête" couleur={C.vertClair} fond="rgba(167,198,160,0.14)" taille={18} /></div>
          </div>
          <div style={{ marginTop: 10, fontSize: 25, lineHeight: 1.35, color: C.blanc, minHeight: 68 }}>
            {mots.map((m, i) => (
              <span key={i} style={{ opacity: i < nbMots ? 1 : 0.0, color: m.startsWith('cours') || (m === 'en' && mots[i + 1]?.startsWith('cours')) ? C.vertClair : undefined }}>{m} </span>
            ))}
          </div>
        </div>
      )}

      {curseur && l >= 26 && <Curseur x={cx} y={cy} clic={clic} opacite={t(l, 26, 32) * (1 - t(l, 96, 106))} />}
    </AbsoluteFill>
  );
};

export const S5Solution: React.FC = () => {
  const l = useCurrentFrame();
  const a = t(l, 16, 28), aOut = t(l, 128, 138);
  const b1 = t(l, 140, 152), b2 = t(l, 150, 162);
  return (
    <AbsoluteFill>
      <AppSolution l={l} />
      <div style={{ position: 'absolute', left: 90, right: 90, top: 270, fontFamily: POLICE }}>
        <div style={{ opacity: 1 - aOut, transform: `translateY(${-aOut * 20}px)`, position: 'absolute', top: 30 }}>
          <Revele k={a}><div style={{ fontSize: 88, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc }}>{T.solution.titre1}</div></Revele>
        </div>
        <Revele k={b1}><div style={{ fontSize: 72, fontWeight: 650, letterSpacing: '-0.04em', color: C.blanc, lineHeight: 1.08 }}>{T.solution.titre2}</div></Revele>
        <Revele k={b2}><div style={{ fontSize: 72, fontWeight: 650, letterSpacing: '-0.04em', color: C.vertClair, lineHeight: 1.08 }}>{T.solution.sous2}</div></Revele>
      </div>
    </AbsoluteFill>
  );
};
