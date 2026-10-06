# Plan maître SEO & Site — slagence.fr

> Tenu par l'agent `seo-site` (boucle d'amélioration continue, voir `agents/seo-site.md`). **Remplace l'ancien backlog.**
> Créé le 2026-10-06. Mis à jour à chaque `/seo` et `/seo-suivi`.
> Sources des actions : manuel `savoirs/seo.md` (règles, playbook local, plan 90 jours), `audit-2026-10.md`,
> `etat-2026-10-06.md` (inventaire), `positions.md` (relevé de départ), `savoirs/marche-2026.md` (alerte concurrence locale).
>
> **Statuts** : à faire → en cours → en ligne → mesurée (gagné / neutre / perdu).
> **Qui** : Claude = agent `seo-site` (textes, PR) ou `contenu-linkedin` (articles) ; Loïc = actions hors dépôt ;
> Sacha = accueil (`template.html` hors dépôt), formulaire, hébergement.
> **Effort** = temps de travail estimé, pas un délai.
> **Règle de mise en ligne** : rien sur le site tant que Loïc n'a pas autorisé les branches `seo/<sujet>` ; ensuite,
> 1 branche + 1 pull request par action, Loïc fusionne.

## Point de départ (2026-10-06)

- **0 page visible** sur `site:slagence.fr` (WebSearch), **0 requête témoin sur 15** dans les 10 premiers (`positions.md`).
- 13 URL dans le sitemap, base technique saine (1 H1 par page, canonical, données structurées) ; domaine de moins de 6 semaines.
- Aucune fiche Google, aucun avis, aucune mesure d'audience.
- Alerte veille : 7 concurrents dans le top 10 d'une recherche « agence automatisation IA … Haut-Rhin », dont plusieurs
  avec des **pages par ville** (S MEDIA, Quadia : « agence IA Colmar » ; Synapze IA, basée dans le Var : page « Haut-Rhin » ;
  Kolonell : pages « sujet + ville »).

**Objectifs à J+90 (début janvier 2027)** — repris du manuel §8, ce sont des objectifs, pas des promesses :
13 URL indexées + chaque nouvelle page indexée en < 14 jours · fiche Google validée et complète · ≥ 5 avis réels ·
≥ 5 requêtes témoins visibles (position < 30 dans Search Console) · impressions hors marque en hausse chaque mois ·
≥ 5 citations NAP cohérentes · ≥ 2 mentions ou liens locaux · origine de chaque demande entrante connue.

---

## Les 8 premières semaines (1 page ou 1 article par semaine)

Semaine 1 = semaine du 12 octobre 2026 (à décaler si l'autorisation des branches arrive plus tard).

| Sem. | Page / article de la semaine (Claude) | Actions Loïc (hors site) | Mesure |
|---|---|---|---|
| **S1** (12/10) | **C1** — Optimiser `/automatisation-taches-administratives` (prête : `actions/01-automatisation-taches-administratives.md`) | **A1** Search Console : sitemap + indexation (5 min) · **B1** créer la fiche Google (1 h 30) · **G4** demander « Comment nous avez-vous trouvés ? » à chaque contact | Indexation des 13 URL |
| **S2** (19/10) | **C2** — Optimiser `/bon-intervention-numerique` (+ **E4** maillage blog ↔ services restant) | **A3** Bing Webmaster Tools · **F1** Bing Places · **F3** page LinkedIn entreprise · **A4** décider l'outil de mesure d'audience · **B5** 1er post Google | — |
| **S3** (26/10) | **C3** — Optimiser `/logiciel-btp-sur-mesure` (+ **A4** mesure d'audience en PR si décidée) | **B3** demander un avis aux clients des 6 réalisations · **F2** PagesJaunes gratuit, Apple Business Connect, vérif. Annuaire des entreprises | — |
| **S4** (02/11) | **C4** — Optimiser `/facture-electronique-tpe` (+ **E3** auteur nommé et date de mise à jour sur les 3 articles) | **A2** 1er export Search Console (octobre) vers Drive · **F4** profil La Fabrique du Net | 1er relevé mensuel `positions.md` |
| **S5** (09/11) | **E1** — Article « Facture électronique : la checklist d'un artisan du Haut-Rhin avant septembre 2027 » (brief → `contenu-linkedin`) | **F5** contacter la CCI (atelier facture électronique) | **J+28 de C1** (verdict dans `experiences.md`) |
| **S6** (16/11) | **C5** — Optimiser `/logiciel-sur-mesure` (la différencier de l'accueil) + **A6** politique de confidentialité | **E2** valider avec le client les chiffres de l'étude de cas (accord + anonymat) | J+28 de C2 |
| **S7** (23/11) | **E2** — Étude de cas « heures et carburant en terrassement » (page `/realisations/…`) | **B5** post Google tiré de l'étude de cas | J+28 de C3 |
| **S8** (30/11) | **E5** — Article « Pointage des heures sur chantier : papier, application ou sur mesure ? » | **F6** 1 club ou réseau local (coût à vérifier avant) | J+28 de C4 · 2e relevé mensuel · bilan S8 → réordonner le plan |

Chaque semaine : le lundi, `/seo-suivi` (Search Console + fiche Google, 15 min) ; 1 post Google par semaine dès que la fiche est validée.

---

## Lot A — Fondations et mesure

| ID | Action | P | Impact attendu | Effort · Qui | Indicateur de réussite | Statut |
|---|---|---|---|---|---|---|
| A1 | Search Console : vérifier la propriété, soumettre `sitemap.xml`, demander l'indexation de l'accueil + 8 pages de service | P1 | Élevé — sans indexation, aucune autre action ne peut produire d'effet ; `site:` vide aujourd'hui | 5 min · Loïc (checklist prête : `actions/00-loic-fiche-google-et-search-console.md`) | Rapport « Pages » : 13 URL indexées sous 14 jours | à faire |
| A2 | Export Search Console mensuel (Performances : requêtes + pages) déposé dans Drive « SL agence/SEO » | P1 | Élevé — seule source de positions réelles (Ahrefs sans API) | 5 min/mois · Loïc | 1 export par mois, 1re semaine | à faire |
| A3 | Bing Webmaster Tools (import depuis Search Console) | P2 | Moyen — Bing + Copilot, rapport « AI Performance » (citations IA) | 10 min · Loïc | Site importé, sitemap lu | à faire |
| A4 | Mesure d'audience + 4 conversions (formulaire envoyé, clic `tel:`, clic `mailto:`, clic « Réserver un appel ») | P1 | Élevé — sans mesure, toutes les actions de conversion restent des hypothèses | 2 h · Claude (PR, écouteur séparé, sans toucher au script du formulaire) + Sacha (accueil `template.html`) · **décision et éventuel coût : Loïc** | Visites et conversions par page d'entrée visibles chaque semaine | à faire (décision) |
| A5 | Clé API PageSpeed Insights (gratuite) puis mesure mobile de l'accueil + 2 pages de service | P2 | Moyen — vérifier LCP ≤ 2,5 s / CLS ≤ 0,1 / INP ≤ 200 ms | 10 min Loïc (clé) + 30 min Claude | Aucun indicateur « médiocre » | à faire |
| A6 | Politique de confidentialité (données du formulaire, durée, droits) + hébergeur ; lien dans tous les pieds de page et sous le formulaire | P2 | Moyen — obligation RGPD, confiance d'un dirigeant qui confie ses données | 1 h · Claude (PR) ; accueil et formulaire via Sacha | Page en ligne, liée partout | à faire |
| A7 | Tenir `sitemap.xml` à jour (`lastmod`) à chaque PR ; inspection d'URL le jour de chaque mise en ligne | P1 | Moyen — accélère la prise en compte des changements | 5 min par action · Claude (sitemap) + Loïc (inspection) | Nouvelle page indexée < 14 jours | continu |
| A8 | Ahrefs Webmaster Tools (gratuit, site vérifié) : liens et audit technique | P3 | Faible à moyen — liens entrants mesurés gratuitement | 10 min · Loïc | Compte actif | à faire |
| A9 | Test IA mensuel : 5 questions dans ChatGPT, Gemini, Copilot, Perplexity (`positions.md`) | P3 | Faible à court terme — mesure la visibilité IA | 20 min/mois · Claude (questions) + Loïc (si comptes requis) | SL Agence citée au moins 1 fois à J+90 | à faire |

## Lot B — Fiche Google et avis

| ID | Action | P | Impact attendu | Effort · Qui | Indicateur de réussite | Statut |
|---|---|---|---|---|---|---|
| B1 | Créer la fiche Google Business Profile (texte complet prêt : `savoirs/seo.md` §2.2) : nom exact, catégorie principale, adresse masquée + zones desservies, horaires réels, 8 services liés aux 8 pages, photos réelles | P1 | Élevé — premier levier du pack local, recherches de marque, réponses IA ; 0 fiche aujourd'hui | 1 h 30 · Loïc | Fiche validée | à faire |
| B2 | Validation de la fiche (vidéo du lieu de travail + justificatif) | P1 | Condition de B1 | 30 min · Loïc | Statut « validée » | à faire |
| B3 | Demander un avis à **tous** les clients des 6 réalisations (modèle prêt : manuel §2.3), lien court de la fiche, sans contrepartie | P1 | Élevé — avis ≈ 20 % du pack local (Whitespark 2026) et preuve qui manque partout sur le site | 30 min + 15 min/sem · Loïc | ≥ 5 avis à J+90 ; ≥ 1 par mois | à faire |
| B4 | Répondre à chaque avis sous 48 h, réponse personnalisée (modèles manuel §2.3) | P1 | Moyen — confiance, récence | 5 min/avis · Loïc (Claude propose le texte) | 0 avis sans réponse > 48 h | à faire |
| B5 | 1 post Google par semaine (avant/après d'une réalisation, échéance facture électronique, conseil tiré d'un article) | P2 | Moyen — fiche active, trafic vers les pages de service | 10 min/sem · Claude rédige, Loïc publie | 1 post / semaine ; clics vers le site (stats fiche) | à faire |
| B6 | Questions-réponses de la fiche (prix, délai, données, compatibilité Sage/EBP/Pennylane, déplacement) — **si la fonction existe encore dans l'interface** | P3 | Faible | 15 min · Claude rédige, Loïc colle | 5 questions en ligne | à faire |
| B7 | Ajouter l'URL de la fiche (et la page LinkedIn) dans `sameAs` du JSON-LD de l'accueil | P3 | Faible — relie l'entité Google à la fiche | 15 min · Claude (texte) + Sacha (`template.html`) | Rich Results Test sans erreur | à faire (après B2) |

## Lot C — Pages de service (1 par semaine, checklist `savoirs/seo.md` §3.1)

Ce qui est ajouté à chaque page : réalisations réelles liées (tirées de `agence.md`), compatibilité logiciels et propriété
des données, zone écrite en clair (sans liste de villes), réassurance sous le bouton « Réserver un appel de 15 minutes »,
liens vers 2-4 services proches et 1-3 articles, title 40-60 caractères, H2 = questions du dirigeant, JSON-LD conforme au visible.

| ID | Page | P | Pourquoi maintenant (preuve observée) | Effort · Qui | Indicateur de réussite (J+28 après indexation) | Statut |
|---|---|---|---|---|---|---|
| C1 | `/automatisation-taches-administratives` | P1 | Page cœur de la mission (« automatiser son administratif ») ; title 62 car. ; aucune réalisation ; section locale d'une phrase ; H2 local « automatisation d'entreprise » qui attire l'automatisme industriel (requête 3) ; 0 lien vers le blog | 2 h · Claude — **prête** | Impressions GSC sur ≥ 3 requêtes « tâches administratives / automatisation administrative » ; position < 30 sur la requête 6 | à faire (prête) |
| C2 | `/bon-intervention-numerique` | P1 | Différenciateur n° 1 (aucun concurrent du 68 ne montre d'outil terrain) ; 794 mots ; requête 10 | 2 h · Claude | Impressions sur « bon d'intervention » + variantes ; position < 30 | à faire |
| C3 | `/logiciel-btp-sur-mesure` | P1 | 1 seul lien contextuel entrant ; requêtes 8 et 9 sans acteur alsacien ; 2 réalisations terrassement | 2 h · Claude | Impressions sur « logiciel / application chantier » ; position < 30 sur requête 8 | à faire |
| C4 | `/facture-electronique-tpe` | P1 | Actualité (réception obligatoire depuis sept. 2026, émission sept. 2027) ; 732 mots ; 1 lien contextuel ; aucun acteur local (requête 13) | 2 h · Claude | Impressions « facture électronique TPE / artisan » ; clics | à faire |
| C5 | `/logiciel-sur-mesure` | P2 | Chevauchement avec l'accueil sur « logiciel sur mesure Mulhouse » ; 2 liens contextuels | 2 h · Claude | Une seule URL du site sur la requête 2 dans GSC | à faire |
| C6 | `/relance-factures-automatique` | P2 | Concurrence nationale forte (Sellsy, Agicap) ; viser l'angle TPE + modèles du blog | 1 h 30 · Claude | Impressions hors marque | à faire |
| C7 | `/remplacer-excel` | P2 | Title 67 car. ; ne lie pas `/blog/limites-excel-entreprise` | 1 h 30 · Claude | Impressions ; clics vers l'article | à faire |
| C8 | `/agent-ia-pme` | P2 | Requêtes 4, 5, 7 ; concurrents locaux nombreux sur « agence IA » : viser les usages concrets (factures par photo, vocal → compte rendu) | 1 h 30 · Claude | Impressions sur « agent IA + usage » | à faire |
| C9 | `/blog/` (page liste) : 159 mots → une introduction utile + accès par thème | P3 | Page la plus courte du site | 45 min · Claude | — | à faire |

## Lot D — Pages locales (règle du manuel : seulement si le contenu est réellement différent)

**Décision proposée : aucune page « + ville » maintenant.** Les pages « agence IA Colmar / Haut-Rhin » des concurrents
répètent la même offre avec un nom de ville ; Google classe ce schéma comme pages satellites (« doorway abuse »,
règles anti-spam màj 28 août 2026). SL Agence n'a aujourd'hui **aucune réalisation rattachable à une ville précise**
(les réalisations sont présentées « entreprises d'Alsace ») : une page Colmar ou Saint-Louis serait vide de preuve.
La visibilité locale se gagne d'abord par la fiche Google (B), les citations (F) et des pages de service ancrées dans le département (C).

| ID | Action | P | Impact attendu | Effort · Qui | Indicateur de réussite | Statut |
|---|---|---|---|---|---|---|
| D1 | Section « près de chez vous » réellement locale sur chaque page de service (déplacement, échéance facture électronique, réalisations d'Alsace, lien fiche Google) — intégrée à C1-C8 | P1 | Moyen — ancrage local sans page satellite | inclus dans C · Claude | Impressions GSC avec « Mulhouse / Haut-Rhin / Alsace » | en cours (C1 prête) |
| D2 | Page ville (Colmar, Saint-Louis…) **seulement** quand il existe ≥ 2 réalisations ou clients dans cette ville (avec accord) + un contenu propre (contraintes locales, interlocuteurs, témoignage) | P3 | Moyen si la matière existe, nul ou négatif sinon | 3 h/page · Claude + Loïc (matière) | GSC montre des impressions « + ville » sans page dédiée | en attente de matière |
| D3 | Réévaluer à J+90 : si GSC montre des requêtes « + Colmar / Saint-Louis » en position 10-30, enrichir la page de service concernée plutôt que créer une page ville | P3 | — | 30 min · Claude | — | à faire (janv. 2027) |
| D4 | Accueil : H2 « Automatisation d'entreprise à Mulhouse et dans le Haut-Rhin » → « Automatisation administrative et applications métier à Mulhouse et dans le Haut-Rhin » | P3 | Faible à moyen — éviter l'intention « automatisme industriel » | 15 min · Claude (texte) + **Sacha** (`template.html`) | Moins d'impressions « automaticien » sur l'accueil | à faire |

## Lot E — Contenu et blog (brief → `contenu-linkedin` → vérification `seo-site`)

| ID | Contenu | P | Mot-clé / intention | Effort · Qui | Indicateur de réussite (J+56) | Statut |
|---|---|---|---|---|---|---|
| E1 | Article « Facture électronique : la checklist d'un artisan du Haut-Rhin avant septembre 2027 » (pas à pas, sources impots.gouv / economie.gouv ; distinct de la page de service qui présente l'offre) | P1 | « facture électronique artisan », « que faire avant 2027 » — informationnelle d'actualité | 3 h · contenu-linkedin + vérif. Claude | Impressions ; clics vers `/facture-electronique-tpe` | à faire (brief S4) |
| E2 | Étude de cas « heures et carburant en terrassement » (avant / ce qui a été construit / depuis : 11 engins, 12 salariés, 30 s) | P1 | Preuve, secteur prioritaire A ; liens depuis C2 et C3 ; réutilisable en prospection | 3 h · contenu-linkedin + **Loïc (accord client, anonymat)** | Page indexée ; utilisée dans ≥ 3 messages de prospection | à faire (accord S6) |
| E3 | Auteur nommé (Person : Loïc ou Sacha, 1 ligne de bio, lien LinkedIn) + date de mise à jour visible sur les 3 articles | P2 | E-E-A-T (checklist 3.2) ; aujourd'hui auteur = « SL Agence » | 45 min · Claude (PR) ; Loïc choisit l'auteur | 3 articles conformes | à faire |
| E4 | Maillage blog ↔ services : `/remplacer-excel` → `limites-excel-entreprise` ; `/automatisation-taches-administratives` → 2 articles (fait dans C1) ; `/agent-ia-pme` et `/facture-electronique-tpe` → articles liés | P2 | Moyen — `limites-excel-entreprise` n'a que 2 liens entrants | 30 min · Claude | Chaque article ≥ 4 liens contextuels entrants | en cours (C1) |
| E5 | Article « Pointage des heures sur chantier : papier, application ou sur mesure ? » (comparatif honnête, renvoie vers C3) | P2 | Requête 9 : éditeurs et comparateurs, aucun acteur local | 3 h · contenu-linkedin | Impressions sur « pointage chantier » | à faire |
| E6 | Article « Bon d'intervention : mentions utiles et modèle » (renvoie vers C2) — vérifier d'abord les obligations légales réelles et les sourcer | P2 | Informationnelle proche de l'achat | 3 h · contenu-linkedin | Impressions ; clics vers C2 | à faire |
| E7 | Article « Saisir ses factures fournisseurs par photo : comment ça marche ? » (renvoie vers C8) | P3 | Usage concret d'agent IA | 3 h · contenu-linkedin | Impressions | à faire |
| E8 | Reprendre chaque article en post LinkedIn et post Google | P2 | Visibilité + signal de fraîcheur | 20 min/article · contenu-linkedin | 1 post par article | continu |

## Lot F — Liens et citations locales (même nom, même téléphone, même site partout)

| ID | Action | P | Impact attendu | Effort · Qui | Indicateur de réussite | Statut |
|---|---|---|---|---|---|---|
| F0 | **Décider le numéro unique** (site, fiche, annuaires) et l'adresse affichée (adresse masquée ou non) | P1 | Condition de toutes les citations | 5 min · Loïc + Sacha | Décision notée dans `journal.md` | à faire |
| F1 | Bing Places (import depuis la fiche Google) | P2 | Faible à moyen — Bing, Copilot | 15 min · Loïc | Fiche active | à faire |
| F2 | PagesJaunes (fiche gratuite, refuser les options payantes), Apple Business Connect, vérification Annuaire des entreprises / Pappers / Societe.com (activité et nom commercial) | P2 | Moyen — PagesJaunes occupe 3 places sur la requête 2 | 1 h · Loïc | 4 citations cohérentes | à faire |
| F3 | Page LinkedIn entreprise + page Facebook avec le même NAP et le lien du site | P2 | Faible à moyen — mentions de marque (meilleur prédicteur de présence dans les AI Overviews, Ahrefs 2025) | 30 min · Loïc | Pages créées | à faire |
| F4 | Profil La Fabrique du Net (agences automatisation IA / développement, Grand Est) — conditions et coût à vérifier avant | P2 | Moyen — l'annuaire occupe la requête 4 et liste un concurrent | 30 min · Loïc | Profil publié | à faire |
| F5 | CCI Alsace Eurométropole : proposer une intervention « facture électronique pour TPE » | P2 | Moyen — lien et mention d'autorité locale | 1 h · Loïc | 1 mention ou lien | à faire |
| F6 | 1 réseau local (Rhénatic, KM0, CPME 68, club d'entreprises) — **coûts non vérifiés** | P3 | Moyen à long terme — annuaire membres, recommandations | 1 h · Loïc | 1 adhésion ou invitation | à faire |
| F7 | Mention « outil réalisé par SL Agence » sur le site d'un client (avec accord) | P3 | Faible à moyen | 15 min/client · Loïc | 1 lien client | à faire |
| F8 | Proposition à la presse locale (angle facture électronique pour les TPE alsaciennes, cas chiffré anonymisé) | P3 | Moyen si publié | 2 h · Claude (texte) + Loïc (envoi) | 1 article publié | à faire (après E2) |
| F9 | Profils prestataires Malt / Codeur.com | P3 | Faible | 30 min · Loïc | Profils actifs | à faire |

## Lot G — Conversion (hypothèses à mesurer : rien n'est mesuré tant que A4 n'est pas en place)

| ID | Action | P | Hypothèse | Effort · Qui | Indicateur de réussite | Statut |
|---|---|---|---|---|---|---|
| G1 | Réassurance sous le bouton principal de chaque page : « Réponse sous 24 h · Devis gratuit · Prix ferme annoncé avant de commencer » | P2 | Lever le doute au moment du clic augmente les réservations d'appel | inclus dans C · Claude | Taux de clic « Réserver un appel » par page (après A4) | en cours (C1) |
| G2 | Formulaire court sur les pages de service (nom, téléphone ou e-mail, besoin en une phrase), même webhook, sans modifier le script existant | P2 | Le visiteur qui doit changer de page pour écrire abandonne | 1 h · Claude + **Sacha** (formulaire) | Demandes écrites depuis les pages de service | à faire (après A4) |
| G3 | Avis Google repris sur le site (texte réel, lien vers la fiche, sans `aggregateRating` auto-déclaré) | P2 | La preuve sociale manque partout | 1 h · Claude + Sacha (accueil) | Clic vers contact sur les pages avec avis | à faire (après ≥ 3 avis) |
| G4 | Demander « Comment nous avez-vous trouvés ? » à chaque nouveau contact, noter la réponse (Gmail/Drive) | P1 | Seule mesure d'origine disponible dès aujourd'hui | 0 min · Loïc | Origine connue pour 100 % des demandes | à faire |
| G5 | Accueil : bloc « études de cas » relié aux pages de réalisation dès qu'E2 existe | P3 | Mène le visiteur de l'accueil vers la preuve | 30 min · Claude + Sacha | Clics vers l'étude de cas | à faire |
| G6 | Parcours mobile : bouton d'appel visible sans défiler sur chaque page (contrôle PageSpeed + test manuel) | P3 | La majorité des visites B2B locales sur mobile : à vérifier avec A4 | 30 min · Claude | — | à faire |

---

## Ce qui n'est pas dans le plan (et pourquoi)

- Pages « + ville » dupliquées, listes de villes en pied de page, faux avis, achat de liens : interdits (manuel §7).
- `llms.txt`, balisage « spécial IA » : inutile (manuel §5).
- Résultats enrichis FAQ : supprimés par Google le 7 mai 2026 ; les FAQ restent pour les lecteurs et les IA, pas pour l'extrait.
- Ahrefs (API) : inaccessible avec l'abonnement actuel.

## Historique du plan

| Date | Changement |
|---|---|
| 2026-10-06 | Création ; remplace `backlog.md`. Action C1 préparée. Mesures de départ : `positions.md`, `etat-2026-10-06.md`. |
