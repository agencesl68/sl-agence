# Journal des décisions, actions et résultats

> Ajouter en haut. Jamais de données personnelles (pas de nom de prospect, d'e-mail, de client).
> Format : `## AAAA-MM-JJ — titre` puis 2 à 5 lignes : décision / action / résultat / prochaine étape.

## 2026-10-15 — Refonte de l'accueil : la v9 « vitrine » part en PR

- Refonte menue en maquettes privées (v1 → v7, puis variantes v8 « ville de documents » et v9 « vitrine »
  façon Apple) ; Loïc choisit la **v9** : barre de rubriques, devise centrée, « En savoir plus » / « Décrire
  mon besoin », atelier téléphone → ordinateur sous un mot chromé « SUR MESURE ».
- SEO conservé (title, meta, canonical, H1, FAQ balisée) ; vidéo et son balisage retirés de l'accueil ;
  H2 local dédoublonné (« Logiciel sur mesure et automatisation à Mulhouse, Saint-Louis… ») ; liens vers les
  2 pages ville ajoutés ; 7 pages de service liées depuis le schéma.
- Corrections c012 à c015 (premier écran épuré, sections lisibles en 5 s, chiffres en chiffres, pas de
  défilement bloqué). Maquettes et sources : `travail/site/refonte-accueil/`.
- À faire : Loïc fusionne la PR ; Sacha reporte la v9 dans `template.html` (sinon une régénération l'efface).

## 2026-10-14 — Espace SEO : audit des contenus et 2 pages SEO local

- Audit à la demande de Loïc : 18 URL indexables, aucune page par ville, aucun métier précis cité ; les articles
  n'ont pas de H2 « Conclusion » (gabarit maison à corriger pour les prochains). Benchmark Google : aucune agence
  concurrente visible sur les requêtes locales testées.
- Décisions de Loïc : 2 pages SEO local (Mulhouse, Saint-Louis) ; pas de référence client par ville pour l'instant ;
  déplacement sur place dans tout le 68.
- Pages `/application-metier-mulhouse` et `/application-metier-saint-louis` : VALIDÉ 9,5/10 après 2 passes ;
  PR https://github.com/agencesl68/sl-agence/pull/9. Nouvelle correction c011 (déductions marquées comme hypothèses).
- Prochain : articles par métier (terrassement, plombier-chauffagiste, électricien) ; Colmar après verdict J+28.


## 2026-10-06 — Organisation par modèle, mémoire des corrections, workflows en commandes

- Opus analyse (Manager, Analyste) et contrôle (Contrôle qualité) ; Sonnet exécute (5 équipes).
  Rien n'est présenté à Loïc sans verdict VALIDÉ.
- Mémoire des corrections : 10 corrections de la journée (`memoire/corrections/`), `/correction` pour en ajouter.
- Commandes : `/prospects`, `/relances`, `/brief`, `/bilan`, `/linkedin`, `/seo`, `/seo-suivi`, `/veille`
  enchaînent Gmail, Drive, Sheets, Calendar et Notion ; `/workflow` crée de nouvelles commandes.
- QG : onglet Carte = organigramme (Loïc → Manager + Analyste/Contrôle qualité → 5 équipes).
- Notion à connecter par Loïc (cockpit : tâches, contenus, rapports).

## 2026-10-06 — Manuels métier des agents

- 6 manuels sourcés et datés dans `savoirs/` : seo, emailing, prospection, linkedin-contenu, veille,
  marche-2026 (~35 000 mots, études 2024-2026). Chaque agent les lit avant d'agir et note ses livrables
  avec une grille (seuil 8/10). Boucle d'apprentissage : `memoire/apprentissages.md`.
- Connecteurs gratuits ajoutés : Google Sheets, Google Calendar, Canva.
- Décisions ouvertes : adresse d'envoi sur slagence.fr, offre d'entrée packagée, garantie 30 jours,
  abonnement de suivi, adresse de Friesen masquée ou non sur la fiche Google.

## 2026-10-06 — Premier lot de prospection

- 10 prospects qualifiés (5 chauds, 5 tièdes) depuis la feuille Drive ; 25 candidats écartés après
  vérification (fermés, trop grands, introuvables, sans fait sourcé) ; grands réseaux non traités.
- 5 brouillons Gmail créés (dont 1 relance : entreprise déjà contactée en août sans réponse).
- Apprentissages : la feuille contient beaucoup d'entreprises introuvables ou fermées (~40 %) ;
  peu de BTP vérifiable → enrichir le BTP via l'API Recherche d'entreprises plutôt que la feuille ;
  toujours vérifier l'historique Gmail avant un premier message.

## 2026-10-06 — Validations et séparation du CRM

- Loïc valide le positionnement et les engagements du site comme référence, et les objectifs hebdomadaires.
- Décision : le département IA est **séparé du CRM de Sacha**. Suivi commercial dans Gmail (libellés
  `SL Prospection/…`, relances en brouillons) et Drive. Agent `crm-relances` remplacé par `suivi`.
- Ahrefs et Gmail connectés : SEO sur données réelles ; messages préparés en brouillons Gmail.

## 2026-10-06 — Création du département IA

- Mise en place de SL MANAGER et de 5 agents : prospection (Lead Hunter + Prospection),
  crm-relances, seo-site (SEO + Site & CRO), contenu-linkedin (Content Factory + LinkedIn), veille.
- Choix : tout dans `.claude/` car le dépôt du site est public ; données personnelles uniquement dans Drive / CRM.
- Constats de départ : ~190 entreprises « À contacter » dans la feuille Drive ; CRM et robot de relance
  déjà construits par Sacha ; aucune mesure d'audience sur le site ; Ahrefs et Gmail non connectés.
- À décider par Loïc : positionnement de référence, tarifs à jour, objectifs chiffrés, mode brouillon du robot CRM.
