# Audit GEO / SEO de slagence.fr — phase 1 : diagnostic et plan (05/11/2026)

> SL MANAGER. Audit demandé explicitement par Loïc. **Aucune modification du site pendant cette phase.**
> Équipe : seo-site (2 missions : technique + contenu ; recherches + mentions + concurrents techniques), veille
> (concurrents), analyste (recherche GEO sourcée, positionnement, études de cas, mesure), contrôle qualité.
> Détail et preuves : `01-technique-contenu.md` + `pages.csv` · `02-serp-mentions-autorite.md` ·
> `03-concurrents.md` · `04-recherche-geo-positionnement-mesure.md` (même dossier).
>
> Étiquettes utilisées pour chaque proposition : **[ANOMALIE]** confirmée techniquement · **[OFFICIEL]**
> recommandation officielle d'un moteur · **[ÉTUDE]** étude sérieuse (préciser le niveau) · **[CONCURRENCE]**
> observation concurrentielle · **[HYPOTHÈSE]** à tester.

---

## 0. La conclusion en 5 lignes

1. **Le site est techniquement sain.** 40 pages en 200, contenu lisible sans JavaScript, canonicals justes, aucun lien interne cassé, JSON-LD valide et conforme sur 39 pages, tous les robots (Google, Bing, OpenAI, Perplexity, Anthropic, Apple) servis. Aucun chantier technique lourd n'est justifié.
2. **Le vrai frein est hors du site : personne d'autre ne parle de SL Agence.** Seule mention tierce trouvée : le registre officiel des entreprises. Le nom « SL Agence » a au moins 4 homonymes. Les études les plus solides disponibles relient la visibilité dans les réponses IA aux **mentions par des tiers** (corrélation, pas causalité).
3. **Le 2e frein : les preuves.** 7 réalisations (dont 1 en cours), 1 seule étude de cas, 2 avis Google affichés, contre 103 avis et 11 cas chiffrés chez DGS Création, 106 avis chez MB Informatique, 27 chez HDKN.
4. **Le 3e : le site est encore jeune dans Google** (création de l'entreprise : 19/05/2026 ; position moyenne 20,4 dans Search Console ; absent des 18 requêtes testées avec notre outil, qui n'est pas Google).
5. **Donc : peu de modifications du site (10 petites corrections réversibles), et l'effort sur les études de cas, les avis réels et les mentions externes.** Les priorités A et B de ta mission sont confirmées ; C est déjà en place ; D se limite à des retouches ; E (nouvelles pages) n'est pas prioritaire.

---

## 1. Cartographie des pages existantes

40 fichiers HTML, tous en ligne et identiques au dépôt (tailles comparées octet par octet le 05/11). Détail complet (40 colonnes : title, meta, H1, H2, canonical, JSON-LD, mots, liens entrants/sortants dans le corps, CTA, intention) : `pages.csv`.

| Groupe | Pages | Intention principale |
|---|---|---|
| Accueil et agence | `/` · `/a-propos` · `/agence-ia-automatisation-haut-rhin` (« Comment choisir son agence… ») · `/realisations` · `/application-bon-epandage-agricole` (étude de cas) | Marque, confiance, choix d'un prestataire |
| Services « socle » | `/logiciel-sur-mesure` · `/application-web-sur-mesure` · `/automatisation-taches-administratives` · `/connecter-logiciels-entreprise` · `/remplacer-excel` · `/crm-sur-mesure` · `/logiciel-gestion-stock-sur-mesure` · `/agent-ia-pme` · `/relance-factures-automatique` · `/facture-electronique-tpe` | Achat d'un service |
| Métiers / terrain | `/logiciel-btp-sur-mesure` · `/logiciel-transport-sur-mesure` · `/logiciel-artisan-sur-mesure` · `/logiciel-entreprise-travaux-agricoles` · `/bon-intervention-numerique` · `/application-pointage-chantier` | Achat, niche métier (national possible) |
| Villes (3 max, décision du 14/10) | `/logiciel-entreprise-mulhouse` · `/logiciel-entreprise-saint-louis` · `/logiciel-entreprise-colmar` | Achat local |
| Ressources | `/modeles-gratuits` · `/blog/` + 11 articles (relance facture, relance devis, limites Excel, transport et parc d'engins, bon d'intervention, feuille d'heures, facture électronique artisan, pointage chantier, terrassement, CRM ou Excel, cahier des charges) | Information, citation par les IA |
| Technique | `/politique-de-confidentialite` · `404.html` · fichier de vérification Google | — |

- Pages orphelines : **aucune** (menu + pied de page = 38 liens entrants partout). Page la plus profonde par les liens du corps : `/application-pointage-chantier` (3 clics).
- Les pages citées dans ta mission existent toutes, sous ces URL exactes. **Aucune page ne doit être recréée sous un autre nom.**

---

## 2. Audit technique SEO / GEO

### 2.1 Ce qui fonctionne (vérifié, ne pas toucher)

| Point | Preuve |
|---|---|
| HTTPS, redirections | `http://` et `www.` → 301 vers `https://slagence.fr/` ; `/blog` → `/blog/` ; URL inexistante → vrai 404 |
| Doublons `/page` et `/page.html` | Les deux répondent 200 (GitHub Pages), mais **les 39 canonicals pointent vers la forme propre** et 100 % des liens internes sont sans `.html`. Pas de problème. |
| Robots | `robots.txt` : `User-agent: * / Allow: /` + sitemap. 9 robots officiels × 6 URL = 54 réponses 200, mêmes octets qu'un navigateur |
| Rendu | Tout le texte est dans le HTML brut (306 à 2 628 mots par page) ; 2 scripts maison en `defer`, aucun script tiers |
| Métadonnées | Titles ≤ 60 caractères, metas de 122 à 154, aucun doublon de title/meta/H1, un seul H1 par page, aucun saut de niveau |
| Données structurées | JSON valide sur 39 pages ; `ProfessionalService` (adresse Friesen, géo, SIRET, `sameAs`, `founder`, `alternateName`, `disambiguatingDescription`), `Service`, `BreadcrumbList`, `BlogPosting` avec auteur `Person` et dates = dates visibles ; FAQPage identique au texte visible sur 33 pages ; **aucun `aggregateRating` ni `Review` auto-déclaré** |
| NAP | Nom, adresse de Friesen, 07 67 08 19 43, e-mail identiques partout ; registre officiel identique (SL AGENCE, 3 rue Principale 68580 Friesen, APE 62.01Z) |
| Liens | 0 lien interne cassé sur 72 cibles ; flux RSS valide (11 articles) ; 32 images de partage en 200 |
| Images, accessibilité de base | 0 `alt` manquant (18 images), dimensions + lazy-loading ; `lang="fr"`, lien d'évitement, 0 bouton/champ sans libellé |
| Poids | Transfert compressé estimé : accueil ≈ 76 Ko, realisations ≈ 137 Ko — léger |
| Exclusions IA | Aucune page en `noarchive` / `nosnippet` (seule la 404 est en `noindex`, normal) |

### 2.2 Anomalies confirmées (toutes petites et réversibles)

| # | Anomalie | Preuve | Gravité |
|---|---|---|---|
| T1 | **3 sources mortes** sur les pages ville : PDF ADIRA en 404 (chiffres d'emploi, nombre de communes) | `logiciel-entreprise-mulhouse.html:771`, `-colmar.html:832`, `-saint-louis.html:772` ; `curl -L` → 404 (revérifié par le Manager) | Moyenne : une affirmation chiffrée dont la source ne s'ouvre plus |
| T2 | **`/facture-electronique-tpe` cite ses sources sans lien** et n'indique aucune zone | ligne 731 : « Source : impots.gouv.fr et economie.gouv.fr » en texte simple ; page en position ~53 (export 02/11) ; l'article sœur a 6 sources officielles liées, toutes en 200 | Moyenne (sujet réglementaire, citation par les IA) |
| T3 | **`lastmod` du sitemap périmé sur 9 pages** et `dateModified` de `/a-propos` | accueil `2026-10-26` alors que `index.html` a changé les 03-05/11 ; `/a-propos` 21/10 alors que modifié le 05/11 | Faible |
| T4 | **Blocs de texte recopiés entre `/crm-sur-mesure` et `/logiciel-gestion-stock-sur-mesure`** (règle c031) | 22 % de similarité (shingles de 5 mots), 27 passages identiques de 12 mots ou plus ; médiane des autres paires : 1,8 % | Moyenne (contenu « commodity » entre deux pages) |
| T5 | `areaServed` hétérogène (règle c032) | 5 pages récentes = France + Haut-Rhin seulement ; BTP, transport, artisan listent Strasbourg/Sélestat/Haguenau dans le JSON-LD, visibles en texte seulement sur la page BTP | Faible (données structurées ≠ texte visible) |
| T6 | 4 articles ouvrent le rendez-vous dans un nouvel onglet | `href="#rendez-vous" target="_blank"` : cahier-des-charges:819, limites-excel:968, logiciel-gestion-transport:999, terrassement:869 | Faible (conversion) |
| T7 | `id="contenu"` en double | bon-intervention-contenu-modele (757, 812), feuille-heures-salaries (759, 818) | Faible (accessibilité) |
| T8 | `/realisations` crée un 2e nœud `WebSite` sans `@id` ; pas de fil d'Ariane JSON-LD sur `/blog/` | JSON-LD de ces pages | Faible |
| T9 | `llms.txt` incomplet | manquent l'accueil, `/blog/`, 2 articles, la confidentialité | Très faible (aucun système IA ne déclare l'utiliser, voir §4) |
| T10 | `pub-sl-agence.mp4` (2,6 Mo) et `.jpg` ne sont plus utilisés par aucune page | grep sur pages, assets, sitemap, flux, llms : 0 | Très faible (fichier mort public) — **suppression seulement avec ton accord** |

### 2.3 Suspecté (à vérifier, avec la méthode)

- **Lien LinkedIn** : le site utilise `linkedin.com/company/sl-agence/` partout (vérifié), alors que la note du 21/10 cite `company/116042975`. Les deux renvoient 403 aux robots → **toi** : ouvre les deux dans un navigateur ; s'ils mènent à la même page, on garde le slug et je corrige la note.
- **Cannibalisation d'intention** sur « agence IA / automatisation Mulhouse » entre `/`, `/agence-ia-automatisation-haut-rhin` et `/logiciel-sur-mesure` (pas de texte dupliqué ; le H1 de l'accueil est encore « …logiciel sur mesure à Mulhouse », décision en attente depuis octobre). À confirmer avec Search Console > Performances > Requêtes, filtre sur la requête, onglet Pages.
- **Identité peu présente dans le corps de 12 pages** (« SL Agence » seulement dans le menu, le pied et le JSON-LD : agent-ia-pme, automatisation, bon-intervention, connecter, facture-électronique, artisan, btp, transport, travaux agricoles, realisations, relance-factures, remplacer-excel). [HYPOTHÈSE] : une phrase « qui construit cet outil » aide le lecteur et l'extraction (« Who created the content » de Google) — à tester sur 2-3 pages, pas partout.
- **6 articles sans bouton de rendez-vous dans le corps**, dont `/blog/relancer-un-devis-sans-reponse` (29 % des impressions du site). [HYPOTHÈSE] conversion.
- Liens externes en 403/429/999 pour les robots (LinkedIn, Facebook, Instagram, PagesJaunes, make.com, 2 Legifrance) : probablement des protections anti-robot, à ouvrir à la main.

### 2.4 Non vérifiable ici (accès manquants)

- **Core Web Vitals / PageSpeed** : l'API sans clé a répondu 429 (quota). Aucun score n'est avancé. Le poids et l'absence de script tiers laissent penser que c'est bon, mais c'est une **hypothèse**. → test manuel sur pagespeed.web.dev, ou clé API gratuite.
- **Rich Results Test / validateur Schema.org** : non appelables ; JSON-LD contrôlé par analyse du code seulement.
- **Indexation réelle, requêtes, positions par page** : seulement via tes exports Search Console (dernier : 02/11).
- **Journaux de visite des robots** : GitHub Pages n'en fournit pas.
- Contrastes, navigation au clavier, lecteur d'écran : non mesurés.

---

## 3. Analyse concurrentielle (synthèse ; fiches complètes dans `03-concurrents.md`)

Consulté le 05/11/2026. Tout chiffre ci-dessous est **affiché par le concurrent lui-même** (non audité).

| Concurrent | Base | Ancienneté / taille affichée | Preuves publiques | Avis affichés | Prix publics | Pages ville | Données structurées |
|---|---|---|---|---|---|---|---|
| S2i Evolution | Didenheim + Strasbourg | 2006, 27 personnes, « +800 projets » | 5 projets sur l'accueil ; CII, Qualiopi | non lisible | non | non | Organization sans sameAs |
| DGS Création | Mulhouse + Strasbourg | 2014, « +1 200 projets » | 11 cas chiffrés, 27 logos | 4,9/5, 103 avis (toutes plateformes) | non | 2 | LocalBusiness + note dans le JSON-LD, FAQ, HowTo |
| 2LE | — | 25 ans et plus, 11 personnes, 425 projets | fiches projet, ~16 clients nommés | non | non | non | aucun JSON-LD |
| Qizuna | Willer-sur-Thur | 20 ans et plus | 2 cas détaillés | non | non | non | LocalBusiness + sameAs |
| MB Informatique | Rixheim | non indiquée | aucune réalisation | 4,6/5, 106 avis | dès 28 € HT/poste/mois | non | pare-feu anti-robot (403) |
| Acronet | Mulhouse | 2009 | 3 sites en vedette ; blog le plus actif (9 articles juil.-nov. 2026) | « 5/5 sur Google » | sites 990-4 990 € HT | 8 | LocalBusiness + sameAs ; page `/applications-metier` qui vise l'automatisation dans le Haut-Rhin |
| S MEDIA | Mulhouse | 2013 | chiffres auto-déclarés | non | dès 5 000 € | — | — |
| SEINSIGHTS | Mulhouse | 2005 | 3 missions anonymisées chiffrées | non | dès 590 € HT (site), 1 200 € HT (automatisation) | 14 | — |
| HDKN | Mulhouse + Montréal | 2015 | ~6 réalisations nommées | 27 avis Google | non | non | — |

**Dans les 18 recherches testées** (outil non-Google, non localisé, 1 tirage par requête), seuls S2i Evolution (3 fois) et 2LE (2 fois) de ta liste apparaissent ; DGS, Qizuna, MB et Acronet n'apparaissent dans aucune. Reviennent surtout des **annuaires et médias** (La Fabrique du Net 6 requêtes, Journal des Entreprises 6, PagesJaunes 4), puis Olwe Développement, Pepperbay, ITDM Group, Alphea net, et Kolonell sur les requêtes nationales. **Aucun acteur du 68 n'apparaît sur « bon d'intervention » ni « logiciel BTP ».**

Non confirmés comme concurrents réels : SmartFlow, IA Agency, Mankova Consulting (cités par ChatGPT/Gemini dans tes captures du 26/10 ; introuvables comme agences de Mulhouse). Il faudrait le lien exact affiché dans la réponse.

---

## 4. Ce que disent les sources sérieuses sur le GEO (synthèse ; 35 sources dans `04-…md`)

| Constat | Source (date) | Type | Confiance | Conséquence pour SL Agence |
|---|---|---|---|---|
| Aucune optimisation spéciale n'est requise pour AI Overviews / AI Mode : être indexable, avec un extrait ; pas de « fichier texte IA » ni de balisage spécial | Google, « AI features and your website » (consulté 05/11/2026, sans date affichée) | Officiel | Élevée | Rien à « ajouter pour l'IA » ; les fondations sont déjà là |
| Contenu original, au-delà de l'évident ; qui l'a écrit, comment, pourquoi ; « trust is most important » | Google, « Creating helpful… content » | Officiel | Élevée | Études de cas réelles, auteurs nommés, pas de production de masse |
| Données structurées = contenu visible ; avis publiés par l'entreprise sur elle-même non éligibles aux étoiles ; FAQ réservées aux sites officiels de santé/État depuis le 08/08/2023, plus affichées depuis le 07/05/2026 | Google Search Central (pages structured data, blog 2023) | Officiel | Élevée | Ne pas copier l'`aggregateRating` de DGS ; ne pas ajouter de FAQ « pour le référencement » |
| OAI-SearchBot = recherche ChatGPT (bloqué = absent des réponses) ; GPTBot = entraînement ; ChatGPT-User = requête d'un utilisateur | OpenAI, « Overview of OpenAI Crawlers » | Officiel | Élevée | Garder autorisé (c'est le cas) |
| Claude-SearchBot = recherche ; ClaudeBot = entraînement ; PerplexityBot = recherche, pas d'entraînement ; Google-Extended = jeton Gemini (entraînement + ancrage dans l'appli Gemini), sans effet sur Google Search ; Applebot-Extended = refus d'entraînement seulement | Docs Anthropic, Perplexity, Google, Apple | Officiel | Élevée | **Ne rien changer à robots.txt.** Bloquer Google-Extended pourrait retirer nos pages des réponses Gemini |
| Bing : le GEO ne garantit ni citation ni classement ; contenu « artificially engineered » et injections de consignes interdits ; rapport « AI Performance » (citations dans Copilot) dans Bing Webmaster Tools | Bing (consignes lues via Search Engine Journal, 27/02/2026 — page Bing inaccessible) ; blog Bing 10/02/2026 | Officiel (de seconde main) | Moyenne / élevée | Relever le rapport AI Performance chaque mois |
| Ajouter citations, statistiques et sources augmente la visibilité « jusqu'à 40 % » | Aggarwal et al., KDD 2024 | Évalué par les pairs | Moyenne | **Moteur simulé** (GPT-3.5 sur 5 résultats Google) ; on modifie une source déjà retenue ; aucune question de recommandation locale. Utile : des faits réels et sourcés. Jamais de chiffres plaqués |
| Les moteurs IA favorisent fortement les sources tierces (« earned media ») et les grandes marques | Chen et al., arXiv 2509.08919 (09/2025) | Préprint (résumé lu) | Moyenne | Les mentions externes sont le levier n°1 |
| Mentions de marque sur le web : corrélation 0,664 avec la présence dans AI Overviews (backlinks 0,218) | Ahrefs (26/05/2025), 75 000 marques à DR > 40 | Étude d'éditeur | Moyenne | Corrélation, pas causalité ; échantillon de gros sites |
| La fiche Google = 28,6 % des citations IA locales ; Yelp très cité par ChatGPT | BrightLocal (26/08/2026), US/UK/AU | Étude d'éditeur | Moyenne | Fiche Google = priorité ; transposition à la France = hypothèse |
| Les listes de recommandation changent presque à chaque tirage (même liste < 1 % du temps) ; la fréquence d'apparition est plus stable que le rang | SparkToro/Gumshoe via SEJ (30/01/2026) ; Żatuchin, arXiv 2609.04047 (10/2026) | Éditeur / préprint | Moyenne | **Un rang isolé ne veut rien dire** : on mesure une fréquence sur plusieurs tirages |
| Des séquences ou consignes cachées manipulent les recommandations des LLM | Kumar & Lakkaraju 2024 ; Pfrommer et al., EMNLP 2024 ; Nestaas et al. 2024 | Recherche | Élevée (sur le risque) | **Interdit** chez nous |
| llms.txt : « no AI system currently uses llms.txt » | John Mueller, 17/06/2025 ; doc Google actuelle | Déclaration officielle | Élevée | On le garde, sans y investir |

**Re-vérification de nos propres chiffres d'octobre** : le « 43,8 % de listes tierces » (Ahrefs) mélange listes de tiers et de marques → mot « tierces » inexact ; le « −30 % des listes » (Seer) porte sur toutes les URL « best/top » pendant que le total baissait de 22,7 % ; le « +40 % » du papier GEO n'est pas « sur un moteur de type Bing Chat » (manuel `savoirs/seo.md` corrigé ce jour).

**Folklore à rejeter** : llms.txt comme levier ; FAQ ajoutées pour l'IA ; bourrage de statistiques ou de mots-clés ; notre propre liste « meilleures agences » ; `aggregateRating` sur nous-mêmes ; texte caché ou consignes adressées aux IA ; pages ville en série.

---

## 5. Tableau des écarts SL Agence ↔ concurrents

| Critère | SL Agence (05/11) | Meilleur concurrent observé | Écart | Rattrapable en 90 j ? |
|---|---|---|---|---|
| Mentions tierces trouvées (ordre de grandeur, même méthode) | 0 hors registre | 2LE ~7-9, S2i ~6-8 | Fort | Partiellement (annuaires, presse, réseaux) |
| Avis visibles | 2 sur l'accueil (total de la fiche : **à me donner**) | DGS 103, MB 106, HDKN 27 | Fort | Partiellement (avis réels de clients réels) |
| Études de cas détaillées | 1 (épandage, sans capture) | DGS 11 cas chiffrés | Fort | Oui : 3-4 de plus |
| Réalisations publiques | 7 (dont 1 en cours), anonymisées | 425 à 1 200 « projets » | Structurel (ancienneté) | Non — ne pas chercher à rivaliser sur le volume |
| Clients nommés / logos | 0 (choix assumé) | DGS 27 logos, 2LE ~16 | Moyen | Seulement avec accord écrit des clients |
| Ancienneté affichée | 2026 | 2005-2015 | Structurel | Non |
| Labels | aucun | Activateur France Num (DGS, Qizuna, Acronet), CII et Qualiopi (S2i) | Moyen | À étudier (France Num : conditions à vérifier) |
| Pages métier terrain (BTP, agricole, bon d'intervention, pointage) | 6 pages + 3 articles | aucune constatée sur les pages lues | **Avantage SL** | À exploiter |
| Délai annoncé | première version en 7 jours, réponse 24 h | SEINSIGHTS 1-2 semaines | Avantage léger, pas exclusif | — |
| Fondations techniques / JSON-LD | complètes | DGS, Acronet, Qizuna comparables ; 2LE et S2i plus faibles | Parité ou avantage | — |
| Prix affichés | non (décision du 27/10) | SEINSIGHTS, Acronet, MB | Choix assumé | Décision maintenue |

---

## 6. Déjà en place — à ne surtout pas dupliquer

robots.txt ouvert + sitemap déclaré · sitemap.xml (38 URL) · canonicals propres · redirections 301 · 404 dédiée · JSON-LD `ProfessionalService` complet (Friesen, géo, SIRET, horaires, `founder`, `sameAs` Google/LinkedIn/PagesJaunes, `alternateName`, `disambiguatingDescription`) · `Service`, `BreadcrumbList`, `BlogPosting` + `Person` · FAQ visibles et balisées sur 33 pages · llms.txt · IndexNow (fichier-clé + soumission après chaque PR) · Search Console vérifiée · fiche Google (localisation Friesen) · LinkedIn entreprise · PagesJaunes · Bing Places (en validation depuis le 21/10) · `/a-propos` (2 associés, méthode, zone) · `/agence-ia-automatisation-haut-rhin` (critères pour choisir) · `/realisations` + étude de cas épandage · `/modeles-gratuits` (6 modèles) · 11 articles signés Loïc · 3 pages ville (maximum décidé) · polices hébergées sur le site · images avec alt et lazy-loading · politique de confidentialité · communiqué de presse facture électronique **déjà rédigé** (`travail/contenu/communique-presse-facture-electronique.md`) · kit annuaires **déjà rédigé** (`travail/contenu/kit-annuaires.md`) · plan SEO 12 semaines adopté le 27/10.

---

## 7. Propositions rejetées (et pourquoi)

| Proposition | Pourquoi on ne la fait pas |
|---|---|
| Ajouter `aggregateRating` / avis dans le JSON-LD (comme DGS) | Google : avis auto-déclarés non éligibles aux étoiles ; risque de non-conformité [OFFICIEL] |
| Ajouter des FAQ « pour le GEO » | Plus aucun affichage enrichi depuis le 07/05/2026 ; Bing vise le contenu « artificially engineered » [OFFICIEL] ; nos FAQ existantes restent car elles servent le lecteur |
| Nouvelles pages ville (Altkirch, Sundgau…) suggérées par la veille | Décision « 3 pages ville au maximum » ; risque de pages satellites ; ta mission les exclut |
| Notre propre classement « meilleures agences » | Effet mesuré faible (≈ 2-3 points) [ÉTUDE d'éditeur], risque de réputation |
| Retravailler llms.txt en profondeur, ajouter Speakable / HowTo | Aucun usage documenté par les systèmes IA [OFFICIEL] |
| Modifier robots.txt (ouvrir ou fermer des robots) | Tout est déjà ouvert ; les jetons d'entraînement sont un choix de principe pour toi, sans effet documenté sur la visibilité |
| Afficher un prix de départ | Observation concurrentielle réelle, mais ta décision du 27/10 est « aucun prix affiché » : maintenue |
| Wikidata | Pas assez de sources publiques indépendantes (règle de notoriété Wikidata) |
| Refaire un audit technique complet ou une refonte | Aucune anomalie lourde ne le justifie |

---

## 8. Plan d'action priorisé — 90 jours (09/11/2026 → 05/02/2027)

Classement : impact attendu × confiance ÷ effort. Les mesures déjà programmées sont respectées : CTR le 16/11, application web + article cahier des charges le 27/11, accueil le 01/12 (règle c033 : pas de changement de title/H1 pendant une mesure).

| # | Action | Problème constaté | Preuve | Étiquette | Priorité | Effort | Risque | KPI |
|---|---|---|---|---|---|---|---|---|
| 1 | **Lot de 9 petites corrections** (T1 à T8 + T9 si tu veux) en une PR | Sources mortes, sources sans lien, dates périmées, JSON-LD hétérogène | §2.2 | [ANOMALIE] | P1 | 2 h équipe + 5 min toi | Très faible (aucun title/H1 touché) | 0 lien externe mort ; JSON-LD = texte visible |
| 2 | **3 études de cas** au modèle en 10 rubriques (ordre proposé : gestion de patrimoine — ton post LinkedIn le plus performant, capture existante ; pointage ; carburant), puis transport à sa livraison | 1 seule étude de cas, sans capture ; aucun chiffre rattaché à une réalisation | §3, §5 ; `04-…md` partie 3 | [OFFICIEL] contenu original + [CONCURRENCE] | P1 | 30 min de questions avec Sacha par cas ; rédaction équipe | Faible si rien n'est inventé (c019, c037) | 1 → 4 études de cas ; impressions des pages cas |
| 3 | **Avis Google réels** : demander à chacun des clients des réalisations un avis qui cite le service et la ville (jamais de faux, jamais de contrepartie) | 2 avis visibles contre 27 à 106 chez les concurrents | §3 | [ÉTUDE d'éditeur] BrightLocal + [CONCURRENCE] | P1 | 1 h toi | Nul | nb d'avis (départ : à me donner) |
| 4 | **Mentions externes** (rien de payant sans ton accord) : finir Bing Places et vérifier le NAP ; Apple Business Connect ; La Fabrique du Net (vérifier le coût d'abord) ; annuaire Grand Est Développement (400 offreurs) ; envoyer le communiqué déjà rédigé au Journal des Entreprises / L'Alsace ; décider FFB 68 (club des partenaires, petit-déjeuner du 12/11 à Mulhouse) et CPME 68 | 0 mention tierce hors registre ; homonymes | `02-…md` §2-§5 | [ÉTUDE] (Chen ; Ahrefs, corrélation) + [HYPOTHÈSE] sur l'effet | P1 | 2-3 h toi sur 4 semaines | Faible | Mentions tierces : 0 → 5 à J+90 |
| 5 | **Relevé IA de départ** (protocole §9), puis toutes les 2 semaines | Seul relevé : 1 tirage le 26/10, conditions non notées | apprentissages.md | [ÉTUDE] variabilité | P1 | 50 min toi par relevé (ou 36 min à 2 tirages) | Nul | Taux d'apparition, part de top 3 |
| 6 | Réécrire les blocs communs `/crm-sur-mesure` ↔ `/logiciel-gestion-stock-sur-mesure` (méthode, facteurs de prix) pour qu'ils soient propres à chaque page | 22 % de texte commun | T4 | [ANOMALIE] + [OFFICIEL] contenu original | P2 — **après le 27/11** | 2 h équipe | Faible | Impressions des 2 pages à J+28 |
| 7 | Ajouter un bouton de rendez-vous dans le corps des 6 articles, en commençant par « relancer un devis » | 29 % des impressions, pas de bouton dans le corps | §2.3 | [HYPOTHÈSE] conversion | P2 | 1 h équipe | Faible | Clics sur le rendez-vous (non mesurable sans outil d'audience : on comptera les demandes qui citent l'article) |
| 8 | Phrase d'identité « qui construit cet outil » sur 3 pages de service (test) | « SL Agence » absent du corps de 12 pages | §2.3 | [HYPOTHÈSE] | P3 | 1 h | Faible | Exactitude de la question L9 (« Que penses-tu de SL Agence ? ») |
| 9 | Décider du H1 de l'accueil (en attente depuis octobre) **après la mesure du 01/12** | Cannibalisation d'intention suspectée | §2.3 | [HYPOTHÈSE] | P3 | 5 min toi | Moyen (page la plus forte) | Requêtes de l'accueil dans Search Console |
| 10 | Rythme des nouvelles pages du plan 12 semaines : passer de 1/semaine à **2/mois** pour libérer du temps pour les études de cas | Les preuves pèsent plus que le volume de pages | §0, §5 | Recommandation du Manager | P2 | — | Faible | — |

**Calendrier**
- **Semaines 1-2 (09 → 22/11)** : PR du lot 1 ; questions à Sacha sur les 3 premières études de cas ; avis Google ; Bing Places, Apple, vérification LinkedIn ; relevé IA de départ ; mesure CTR du 16/11.
- **Semaines 3-6 (23/11 → 20/12)** : 1re et 2e études de cas en ligne ; mesures du 27/11 et du 01/12 ; action 6 ; envoi du communiqué ; décision FFB 68 / CPME 68 / La Fabrique du Net ; relevés IA n°2 et n°3.
- **Semaines 7-13 (21/12 → 05/02)** : 3e et 4e études de cas ; `/realisations` relie chaque cas détaillé ; actions 7 et 8 ; relevés IA n°4 à n°6 ; bilan J+90 le 05/02/2027.

**Ton temps estimé** (règle c027) : ≈ 1 h 30 la 1re semaine, puis ≈ 1 h par semaine (relevé IA ~25 min/semaine en moyenne, avis, annuaires, réponses pour les études de cas).

---

## 9. Indicateurs de progrès (valeurs de départ connues au 05/11)

| Indicateur | Départ | Source | Cible J+90 (proposée, à confirmer après le relevé de départ) |
|---|---|---|---|
| Taux d'apparition de SL Agence dans les réponses IA (questions du noyau, 4 plateformes) | non mesuré proprement (1 tirage le 26/10 : 1er sur « remplacer Excel » ChatGPT, 4e Gemini sur « agence IA Mulhouse », absent sur « épandage ») | Relevé de départ (sem. 1-2) | Hausse sur ≥ 2 plateformes et ≥ 2 questions (convention SL Agence) |
| Part de top 3 | idem | idem | idem |
| Lien vers slagence.fr dans la réponse | idem | idem | — |
| Erreurs factuelles (question « Que penses-tu de SL Agence ? ») | erreur de logo et de lien constatée le 26/10 | idem | 0 erreur sur nom, ville, téléphone, services |
| Citations dans Copilot / Bing | non relevé | Bing Webmaster > AI Performance | à relever |
| Search Console 28 jours | 36 clics · 2 240 impressions · CTR 1,6 % · position 20,4 (au 02/11) | Tes captures | Clics et impressions en hausse ; CTR > 3 % (ton objectif du 30/10) |
| Mentions tierces de SL Agence | 0 hors registre | Recherche répétée, même méthode | ≥ 5 |
| Avis Google | à me donner | Fiche Google | à fixer quand on connaît le départ |
| Études de cas détaillées | 1 | Site | 4 |
| Demandes entrantes qui citent une IA | non suivi | Question « Comment nous avez-vous connus ? » notée dans une feuille Drive | suivi dès maintenant |

**Protocole IA** (détail : `04-…md` partie 4) : 18 questions fixes (6 au noyau à chaque relevé, 12 en rotation mensuelle), ChatGPT avec recherche, Gemini, Perplexity, Copilot (+ AI Overviews si affiché) ; navigation privée, non connecté si possible, même lieu, même plage horaire ; 3 tirages par question du noyau sur ChatGPT et Gemini, 1 sur les autres, premier relevé en pilote à 5 tirages ; captures conservées ; feuille « Suivi IA SL Agence » dans le Drive (accès Restreint, jamais dans le dépôt) ; lecture de tendance sur 4 relevés, jamais de causalité automatique.
Limite : le trafic venu de ChatGPT n'est pas visible sans outil d'audience (refusé le 26/10, on ne le repropose pas) ni journaux GitHub Pages.

---

## 10. Première proposition de modifications, fichier par fichier (lot 1, petites corrections réversibles)

Aucune ne touche un title, une meta ou un H1 (mesures en cours). Une seule PR, contrôle qualité avant ouverture.

| Fichier | Modification | Raison | Étiquette |
|---|---|---|---|
| `logiciel-entreprise-mulhouse.html` (l. 771), `logiciel-entreprise-colmar.html` (l. 832), `logiciel-entreprise-saint-louis.html` (l. 772) | Remplacer le lien ADIRA mort par la nouvelle adresse officielle du même document si elle existe ; sinon retirer le chiffre ou citer une source officielle équivalente (INSEE) en gardant exactement son périmètre (c034) | Affirmation chiffrée dont la source est en 404 | [ANOMALIE] |
| `facture-electronique-tpe.html` (l. 731 + section zone) | Transformer « impots.gouv.fr et economie.gouv.fr » en liens vers les pages officielles déjà citées et vérifiées dans l'article sœur ; ajouter la phrase de zone de référence (c032, rappel en attente) | Source non vérifiable par le lecteur ; zone absente | [ANOMALIE] + [ÉTUDE] (citations, papier GEO) |
| `sitemap.xml` | `lastmod` des 9 pages réellement modifiées = date du dernier commit de la page | Dates fausses | [ANOMALIE] + [OFFICIEL] (Google utilise `lastmod` s'il est exact) |
| `a-propos.html` (l. 28) | `dateModified` → 2026-11-05 | Idem | [ANOMALIE] |
| `application-pointage-chantier.html`, `application-web-sur-mesure.html`, `crm-sur-mesure.html`, `logiciel-gestion-stock-sur-mesure.html`, `logiciel-entreprise-travaux-agricoles.html`, `logiciel-btp-sur-mesure.html`, `logiciel-transport-sur-mesure.html`, `logiciel-artisan-sur-mesure.html` | `areaServed` aligné sur la zone de référence (Haut-Rhin, Alsace, Grand Est ; France à distance) et retrait des villes du Bas-Rhin là où elles ne sont pas dans le texte | JSON-LD ≠ texte visible (c032) | [ANOMALIE] + [OFFICIEL] |
| `blog/cahier-des-charges-application.html`, `blog/limites-excel-entreprise.html`, `blog/logiciel-gestion-transport-parc-engins.html`, `blog/terrassement-heures-engins-carburant.html` | Retirer `target="_blank"` des liens `#rendez-vous` | Le rendez-vous s'ouvre dans un onglet vide | [ANOMALIE] |
| `blog/bon-intervention-contenu-modele.html`, `blog/feuille-heures-salaries.html` | Renommer le 2e `id="contenu"` | id en double | [ANOMALIE] |
| `realisations.html` | Rattacher le nœud `WebSite` à l'`@id` du site | Doublon d'entité | [ANOMALIE] |
| `blog/index.html` | Ajouter le `BreadcrumbList` (Accueil > Blog), comme les autres pages | Cohérence | [ANOMALIE] |
| `llms.txt` (facultatif) | Ajouter les 5 pages manquantes | Inventaire incomplet ; effet IA non documenté | [ANOMALIE], valeur très faible |
| `pub-sl-agence.mp4`, `pub-sl-agence.jpg` | **Suppression seulement si tu dis oui** | Fichiers morts publics | [ANOMALIE] |

---

## 11. Informations et accès dont j'ai besoin

1. **Nombre total d'avis** sur la fiche Google, et les statistiques des 3 derniers mois (vues, appels, clics).
2. **Search Console** : export Requêtes + Pages sur 3 mois (pour la cannibalisation et les positions 8-20).
3. **Bing Webmaster Tools** : la fiche Bing Places est-elle validée ? Que montre le rapport « AI Performance » ?
4. **LinkedIn** : les deux URL (`/company/sl-agence/` et `/company/116042975/`) mènent-elles à la même page ?
5. **Études de cas** : les réponses aux questions fermées (accord du client, taille, date, délai réel, chiffres mesurés, logiciels reliés, capture possible, témoignage) — liste complète dans `04-…md` partie 3, à voir avec Sacha.
6. **D'où viennent les chiffres** « jusqu'à 20 h par semaine », « 6 h » et « 3 h » (quel cas, comment mesurés) : on les garde (décision du 03/11), mais les rattacher à une étude de cas les rendrait citables.
7. **Positionnement** : on garde l'IA dans la phrase de référence ? (l'hypothèse de ta mission la retire ; `agence.md` ne change qu'avec ton accord).
8. **Budget** : accord ou non pour une adhésion (FFB 68, CPME 68), un profil payant (La Fabrique du Net, Codeur 31,90 € HT/mois + 4 %), un label (France Num) — coûts à vérifier avant.
9. **Communiqué facture électronique** : déjà envoyé à la presse ou non ?
10. **PageSpeed** : un test manuel sur pagespeed.web.dev (mobile) de l'accueil, ou une clé API gratuite.
11. **Captures du relevé IA du 26/10** : le lien exact affiché pour SmartFlow, IA Agency et Mankova Consulting.

---

## Positionnement le plus défendable (proposition, `04-…md` partie 2)

> SL Agence, basée à Friesen dans le Haut-Rhin, construit des logiciels sur mesure simples et automatise les tâches répétitives des petites entreprises, des cabinets et des associations : ce qui est noté une fois n'est plus recopié. Vous parlez directement à ceux qui construisent l'outil, et nous nous engageons à une première version à essayer en 7 jours.

Avantage le plus solide (constaté) : **les outils de terrain** (bons signés sur téléphone, heures pointées sur place, carburant, hors réseau) — aucun concurrent du panel n'en montre sur les pages lues. Non différenciants : « proximité », « sur mesure », « intégration aux logiciels existants » (tous les revendiquent ; et aucune réalisation publiée ne montre Sage, EBP, Cegid ou Pennylane). « 7 jours » est un **engagement**, pas une moyenne prouvée ; « plus rapide que les autres » n'est pas prouvé (la mention « souvent plusieurs mois » de `/logiciel-sur-mesure` n'a pas de source : à revoir dans un prochain lot).

## Limites de cet audit

- Aucun assistant IA (ChatGPT, Gemini, Claude.ai, Perplexity, Copilot) n'a été testé par l'équipe : nous n'y avons pas accès en mode recherche. Les tests de recherche ont été faits avec l'outil de recherche des agents (non-Google, non localisé, 1 tirage par requête).
- Pages inaccessibles le 05/11 : FAQ éditeurs OpenAI et aide ChatGPT search (403), consignes Bing (vides, lues via SEJ), LinkedIn, PagesJaunes, CCI, Journal des Entreprises, Sortlist, Malt, pages internes de DGS, accueil de MB Informatique.
- Plusieurs études n'ont été lues qu'en résumé ou de seconde main (Chen et al., SparkToro, Scrunch).
- Avis et chiffres des concurrents : ceux qu'ils affichent eux-mêmes.
- Pas d'Ahrefs (c008), pas de PageSpeed, pas de validateur officiel des données structurées.
