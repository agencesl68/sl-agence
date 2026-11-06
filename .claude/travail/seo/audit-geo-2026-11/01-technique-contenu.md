# Audit GEO/SEO phase 1 : technique et contenu de slagence.fr (2026-11-05)

> Audit demandé explicitement par Loïc (c001 non applicable). Aucun fichier du site modifié, aucun commit.
> État audité : `main` au commit 80c5118 (PR #38). La version en ligne est identique au dépôt : les 40 pages
> ont la même taille en octets en ligne et en local (`curl -w %{size_download}` vs `wc -c`).
> Méthode : scripts Python (BeautifulSoup) dans le scratchpad de session (`analyse.py`, `weight.py`, `links.py`,
> `sim.py`, `a11y.py`, `csvout.py`), curl pour l'en ligne. Données brutes : `pages.csv` (40 lignes, 40 colonnes).
> Ahrefs non utilisé (c008). Légende : **ANOMALIE CONFIRMÉE** (preuve) / **SUSPECTÉ** (à vérifier, comment) / **OK**.

## Synthèse

Le socle technique est sain : 40 pages en 200, canonicals propres partout, 0 lien interne cassé, JSON-LD valide
sur toutes les pages, contenu complet dans le HTML brut, tous les robots reçoivent un 200. Les vrais défauts sont
des **incohérences de fraîcheur et de sources** : lastmod du sitemap périmé sur 9 pages (dont l'accueil), 3 sources
ADIRA citées sur les pages ville qui répondent 404, une source réglementaire non liée sur `/facture-electronique-tpe`,
et un `llms.txt` incomplet. Le point annoncé « LinkedIn 116042975 dans le JSON-LD » est **faux** : le site utilise
partout `company/sl-agence/`.

## A. Cartographie

Colonnes complètes dans `pages.csv`. Résumé (T/M = longueur title / meta ; « Dernière modif. » = dernier commit git propre à la page,
hors commits de lot qui touchent plus de 12 pages comme le menu du 05/11 ; mots = texte visible de `<main>`, hors menu et pied) :

| URL | HTTP clean/.html | Sitemap lastmod | Dernière modif. de la page (git) | T/M (car.) | H2/H3 | Mots | Corps sortants | Corps entrants | JSON-LD (types clés) |
|---|---|---|---|---|---|---|---|---|---|
| / | 200/200 | 2026-10-26 **périmé** | 2026-11-05 | 60/122 | 9/14 | 1654 | 20 | 38 | AboutPage, FAQPage, Person, ProfessionalService, Service, WebSite |
| /404 | 200/200 | — | 2026-10-12 | 28/124 | 5/0 | 116 | 4 | 0 |  |
| /a-propos | 200/200 | 2026-10-21 **périmé** | 2026-11-05 | 53/144 | 7/10 | 640 | 6 | 1 | AboutPage, BreadcrumbList, Person |
| /agence-ia-automatisation-haut-rhin | 200/200 | 2026-11-02 | 2026-11-02 | 58/148 | 8/24 | 1661 | 11 | 4 | BreadcrumbList, FAQPage, WebPage |
| /agent-ia-pme | 200/200 | 2026-10-19 | 2026-10-19 | 51/142 | 6/13 | 1143 | 5 | 6 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /application-bon-epandage-agricole | 200/200 | 2026-10-23 | 2026-10-23 | 52/145 | 9/16 | 1233 | 6 | 6 | Article, BreadcrumbList, FAQPage, ProfessionalService |
| /application-pointage-chantier | 200/200 | 2026-10-27 | 2026-10-27 | 57/149 | 8/11 | 1394 | 8 | 3 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /application-web-sur-mesure | 200/200 | 2026-10-30 | 2026-10-30 | 58/146 | 10/24 | 1785 | 10 | 4 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /automatisation-taches-administratives | 200/200 | 2026-11-02 | 2026-11-02 | 53/141 | 7/10 | 1244 | 12 | 13 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /blog/bon-intervention-contenu-modele | 200/200 | 2026-11-02 | 2026-11-02 | 60/145 | 8/9 | 1714 | 8 | 13 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/cahier-des-charges-application | 200/200 | 2026-10-30 | 2026-10-30 | 54/145 | 8/4 | 2073 | 9 | 4 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/comment-relancer-une-facture-poliment | 200/200 | 2026-10-26 | 2026-10-26 | 58/140 | 9/13 | 2628 | 9 | 12 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/crm-ou-excel | 200/200 | 2026-11-02 | 2026-11-02 | 56/151 | 7/5 | 2022 | 9 | 5 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/facture-electronique-artisan-ce-qui-change | 200/200 | 2026-10-19 | 2026-10-19 | 56/145 | 7/13 | 2097 | 7 | 2 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/feuille-heures-salaries | 200/200 | 2026-10-26 | 2026-10-26 | 54/143 | 8/5 | 1547 | 11 | 12 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/ | 200/200 | 2026-11-02 | 2026-11-02 | 60/154 | 11/0 | 544 | 14 | 15 | Blog, BlogPosting, Person |
| /blog/limites-excel-entreprise | 200/200 | 2026-11-02 | 2026-11-02 | 51/124 | 7/15 | 2204 | 11 | 15 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/logiciel-gestion-transport-parc-engins | 200/200 | 2026-10-14 **périmé** | 2026-10-23 | 60/150 | 8/23 | 2393 | 13 | 15 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/pointage-chantier-papier-application-sur-mesure | 200/200 | 2026-10-26 | 2026-10-19 | 59/152 | 7/11 | 2385 | 9 | 5 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/relancer-un-devis-sans-reponse | 200/200 | 2026-10-26 | 2026-10-26 | 59/131 | 8/7 | 2104 | 8 | 11 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /blog/terrassement-heures-engins-carburant | 200/200 | 2026-10-23 | 2026-10-23 | 54/150 | 7/8 | 2202 | 10 | 3 | Blog, BlogPosting, BreadcrumbList, FAQPage, Person |
| /bon-intervention-numerique | 200/200 | 2026-10-23 | 2026-10-23 | 60/149 | 6/16 | 1068 | 11 | 20 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /connecter-logiciels-entreprise | 200/200 | 2026-10-26 | 2026-10-26 | 48/147 | 8/18 | 1518 | 12 | 10 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /crm-sur-mesure | 200/200 | 2026-11-02 | 2026-10-27 | 57/147 | 9/27 | 1867 | 11 | 5 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /facture-electronique-tpe | 200/200 | 2026-10-19 | 2026-10-19 | 54/140 | 5/8 | 984 | 9 | 5 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /google51daad5049f3b336 | 200/200 | — | 2026-10-06 | 0/0 | 0/0 | 2 | 0 | 0 |  |
| /logiciel-artisan-sur-mesure | 200/200 | 2026-10-23 **périmé** | 2026-10-30 | 57/152 | 7/17 | 1425 | 14 | 7 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-btp-sur-mesure | 200/200 | 2026-11-02 | 2026-11-02 | 56/151 | 8/22 | 1932 | 16 | 19 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-entreprise-colmar | 200/200 | 2026-10-23 **périmé** | 2026-10-26 | 56/137 | 8/11 | 1552 | 13 | 7 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-entreprise-mulhouse | 200/200 | 2026-10-23 **périmé** | 2026-10-30 | 59/132 | 7/8 | 1640 | 12 | 12 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-entreprise-saint-louis | 200/200 | 2026-10-23 **périmé** | 2026-10-30 | 56/146 | 7/7 | 1496 | 9 | 12 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-entreprise-travaux-agricoles | 200/200 | 2026-11-02 | 2026-11-02 | 58/142 | 8/16 | 1526 | 6 | 8 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-gestion-stock-sur-mesure | 200/200 | 2026-10-27 | 2026-10-27 | 60/148 | 8/27 | 1786 | 7 | 4 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-sur-mesure | 200/200 | 2026-10-26 **périmé** | 2026-10-27 | 58/149 | 7/15 | 1416 | 20 | 19 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /logiciel-transport-sur-mesure | 200/200 | 2026-10-26 **périmé** | 2026-10-30 | 60/152 | 7/17 | 1511 | 16 | 8 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /modeles-gratuits | 200/200 | 2026-11-02 | 2026-11-05 | 54/127 | 6/0 | 306 | 9 | 8 | BreadcrumbList, CollectionPage, DigitalDocument |
| /politique-de-confidentialite | 200/200 | 2026-10-14 | 2026-10-14 | 40/142 | 8/0 | 1273 | 1 | 1 | BreadcrumbList, WebPage, WebSite |
| /realisations | 200/200 | 2026-10-23 | 2026-10-23 | 54/140 | 4/7 | 843 | 14 | 29 | BreadcrumbList, CollectionPage, ProfessionalService, WebSite |
| /relance-factures-automatique | 200/200 | 2026-10-26 | 2026-10-26 | 59/149 | 6/10 | 1177 | 8 | 15 | BreadcrumbList, FAQPage, ProfessionalService, Service |
| /remplacer-excel | 200/200 | 2026-11-02 | 2026-10-26 | 51/141 | 6/10 | 1202 | 11 | 23 | BreadcrumbList, FAQPage, ProfessionalService, Service |

Constats de cartographie :
- **OK** 40 fichiers HTML (39 + vérification Google), 38 URL dans le sitemap, toutes en 200 sur la forme propre ET sur `.html`. Les 2 hors sitemap sont voulues : `404.html` (noindex) et `google51daad5049f3b336.html`.
- **OK** Titles tous ≤ 60 car. (max 60), metas tous entre 122 et 154 car., aucun doublon de title, de meta ni de H1 (script `analyse.py`).
- **OK** 1 seul H1 par page, aucun saut de niveau de titre (H1→H2→H3) sur les 39 pages (`a11y.py`).
- **OK** og:title et og:image présents partout ; les 32 images (og + sitemap) répondent 200. Les og:image sont partagées : `og.png` (4 pages), `logiciel-btp-sur-mesure.png` (5 pages), `og-blog.png` (7 pages) : correct techniquement, sans image dédiée par page. Gravité faible.
- **Pages profondes (liens de corps seulement)** : `application-pointage-chantier` est à 3 clics de l'accueil (accueil → logiciel-sur-mesure ou BTP → page). Toutes les autres sont à 1 ou 2 clics. Grâce au menu visuel, chaque page est à 1 clic de n'importe quelle page (38 liens menu/pied entrants sur chacune).
- **Pages orphelines (aucun lien de corps entrant)** : aucune, hors 404 et fichier Google. **Peu liées dans le corps** : `a-propos` (1), `politique-de-confidentialite` (1), `blog/facture-electronique-artisan-ce-qui-change` (2), `blog/terrassement-heures-engins-carburant` (3), `application-pointage-chantier` (3), `logiciel-gestion-stock-sur-mesure` (4), `application-web-sur-mesure` (4), `agence-ia-automatisation-haut-rhin` (4), `blog/cahier-des-charges-application` (4). Rappel : les pages métier BTP/artisan/transport n'ont plus que le pied de page + `/logiciel-sur-mesure` depuis la PR #35 (mesure prévue le 01/12 : ne pas toucher avant).
- **SUSPECTÉ (faible)** L'accueil n'a pas de lien de corps vers `/realisations` ni `/a-propos` (seulement menu/pied). Vérifier : `python3 analyse.py` → `out_body` de `/`. À arbitrer avec la mesure du 01/12 plutôt que modifier maintenant.

## B. Technique

### B1. Sitemap, robots, flux, llms.txt

- **ANOMALIE CONFIRMÉE · lastmod du sitemap périmé sur 9 pages.** Comparaison lastmod vs dernier commit propre à la page (`gitdates.py`) :
  `/` 2026-10-26 (sitemap.xml:5) alors que `index.html` a été modifié les 03/11 (9b47980, 514ea66), 04/11 (62d7960) et 05/11 (cd68e39, f01ad10) ;
  `/a-propos` 2026-10-21 (sitemap.xml:234) vs 05/11 (f01ad10, texte « pourquoi Loïc et Sacha ») ;
  `/logiciel-entreprise-mulhouse` et `/logiciel-entreprise-saint-louis` 10-23 vs 10-30 ; `/logiciel-artisan-sur-mesure` 10-23 vs 10-30 ; `/logiciel-transport-sur-mesure` 10-26 vs 10-30 ;
  `/logiciel-sur-mesure` 10-26 vs 10-27 ; `/logiciel-entreprise-colmar` 10-23 vs 10-26 ; `/blog/logiciel-gestion-transport-parc-engins` 10-14 vs 10-23.
  Effet : Google ignore les lastmod d'un sitemap dont une partie est fausse ; Bing s'en sert pour planifier les recrawls. L'accueil est la page la plus importante.
  Limite de la méthode : « dernier commit propre à la page » = commits touchant ≤ 12 fichiers HTML ; un lot de 27+ pages (rendez-vous du 28/10, menu du 03 et du 05/11) est traité comme non-contenu.
- **OK (sens inverse, faible)** 3 pages ont un lastmod plus récent que leur dernier commit propre (`/crm-sur-mesure` 11-02, `/remplacer-excel` 11-02, `/blog/pointage-chantier-papier…` 10-26) : explicable par des commits de lot (liens ajoutés), pas faux.
- **OK** Sitemap : 38 URL, 0 doublon, 0 URL sans fichier, toutes les formes propres, 39 balises image (toutes en 200). Toutes les pages indexables du dépôt y figurent. `changefreq`/`priority` sont ignorés par Google (inutiles, pas nuisibles).
- **OK** `robots.txt` (4 lignes) : `User-agent: *`, `Allow: /`, `Sitemap:` en HTTPS. Aucun blocage de robot IA (ni GPTBot, ClaudeBot, PerplexityBot, etc.). Clé IndexNow servie en 200 (`/78093059….txt`).
- **ANOMALIE CONFIRMÉE (faible) · `llms.txt` incomplet.** Absents de la liste : `/` (accueil), `/blog/` (index), `/blog/facture-electronique-artisan-ce-qui-change`, `/blog/pointage-chantier-papier-application-sur-mesure`, `/politique-de-confidentialite` (script de comparaison sitemap vs `llms.txt`). Les 33 autres URL y sont et toutes existent. Structure : la ligne « Auteur des guides » (llms.txt:54) est insérée au milieu de la rubrique Guides, avant la puce « Modèles gratuits » (llms.txt:55). Décision de Loïc : llms.txt pas retravaillé → à signaler seulement.
- **OK** `llms.txt` : zone conforme à c032 (« se déplace en Alsace et dans le Grand Est, … à distance partout en France »), téléphones 07 (Sacha) et 06 (Loïc), e-mail et adresse identiques au JSON-LD et au pied de page ; Facebook et Instagram identiques au `sameAs`.
- **SUSPECTÉ · LinkedIn entreprise : slug vs identifiant numérique.** `llms.txt:6`, le JSON-LD de l'accueil (index.html:275) et le pied de page de 39 pages utilisent `https://www.linkedin.com/company/sl-agence/` (45 occurrences, 0 occurrence de `116042975` dans le site). La décision du 21/10 (`memoire/rappels-seo.md`) cite `https://www.linkedin.com/company/116042975/`. Les deux URL répondent 403 aux robots (anti-bot LinkedIn, `curl`), donc impossible de savoir si le slug `sl-agence` est le slug officiel actuel. À vérifier par Loïc : ouvrir les deux URL dans un navigateur ; si elles mènent à la même page, garder le slug (plus lisible) et corriger la note de mémoire ; sinon aligner le site.
- **OK** `blog/feed.xml` : XML valide, 11 items = les 11 articles du dépôt, jours de la semaine des `pubDate` exacts, 7 enclosures toutes en 200, `Content-Type: application/xml`, déclaré dans le `<head>` de l'accueil et du blog. Faible : pas de `dateModified` dans le flux (les articles mis à jour le 02/11 gardent leur date de publication).

### B2. Doublons d'URL, protocoles

- **OK** `/page` et `/page.html` répondent tous deux 200 (40 pages testées, `fetch.py`), mais **les 39 canonicals pointent vers la forme propre** (`canonical_ok = o` dans `pages.csv` ; 404 sans canonical car noindex). Les liens internes utilisent 100 % la forme propre : 2 747 liens sans extension + 549 liens vers `/` ou `/blog/` (y compris `/#rendez-vous`), 0 lien en `.html` (script `links.py`). Aucun lien interne en URL absolue ou relative.
- **OK** `http://` → 301 `https://` ; `www` → 301 vers l'apex ; `/blog` → 301 `/blog/` ; `/index.html` et `/blog/index.html` répondent 200 mais ont pour canonical `/` et `/blog/`. Casse et slash final : `/Logiciel-sur-mesure` et `/logiciel-sur-mesure/` répondent 404 (pas de duplicat). URL inexistante : vrai statut 404 avec la page `404.html`.
- Le risque résiduel est que Google voie des URL `.html` : aucun lien ne les expose, les canonicals les neutralisent. Rien à faire.

### B3. Accès des robots et rendu

- **OK** 9 User-Agent (Googlebot, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Applebot) × 6 URL (`/`, `/logiciel-sur-mesure`, `/realisations`, `/blog/relancer-un-devis-sans-reponse`, `/llms.txt`, `/robots.txt`) : **54 réponses 200**, tailles identiques à celles d'un navigateur (90 718 / 74 941 / 69 468 / 83 498 / 7 494 / 65 octets). Limite : test depuis une seule adresse IP via un proxy, pas depuis les plages officielles des robots ; GitHub Pages ne filtre pas par User-Agent (en-tête `server: GitHub.com`), donc un blocage est improbable.
- **OK** Contenu dans le HTML brut sans JavaScript : oui sur les 39 pages. Mon analyse lit le HTML brut non exécuté et trouve 306 à 2 628 mots de corps par page (306 pour `/modeles-gratuits`, 116 pour la 404) ; titre, H1, H2, FAQ et JSON-LD y sont. Le JavaScript du site se limite à `menu.min.js` (0,7 Ko compressé) et `rdv.js` (prise de rendez-vous, 5,5 Ko compressé), tous deux `defer`. Le masquage initial (`staged`) n'est posé que par JS et n'affecte pas les robots.
- **OK** Aucun script de mesure d'audience (`gtag|plausible|matomo|clarity|googletagmanager` : 0 résultat dans les pages) : décision de Loïc, ne pas reproposer.

### B4. Données structurées (JSON-LD)

- **OK** JSON valide sur les 39 pages (`jsonld_valide = o` partout). Types : accueil `WebSite` + `ProfessionalService` (`@id #organisation`) avec `address`, `geo`, `openingHours`, `sameAs` ×5 (dont fiche Google kgmid, PagesJaunes), `founder`, `employee`, `logo`, `identifier` SIRET, `contactPoint` ×2 (07 customer service, 06 sales : conforme à la décision) ; 19 pages de service avec `Service` + `FAQPage` + `BreadcrumbList` ; 11 articles avec `BlogPosting` (author Loïc Bitsch, publisher, image, `datePublished`, `dateModified`, `mainEntityOfPage`) + `FAQPage` ; `/application-bon-epandage-agricole` avec `Article` ; `/realisations` `CollectionPage` + `ItemList` (7 cas, correspond aux 7 cas visibles).
- **OK** Règles Google : aucune balise `aggregateRating` ni `Review` dans le site (grep sur `*.html`, 0 résultat) ; sur les 33 pages avec FAQPage, 100 % des questions/réponses sont retrouvées à l'identique dans le texte visible (test début et fin de chaque réponse) ; pas de `offers`/prix dans les `Service` (conforme : aucun prix affiché). Dates des articles : `dateModified` identique à la mention visible « Mis à jour le » sur les 11 articles.
- **OK** NAP : nom `SL Agence`, adresse `3 rue Principale, 68580 Friesen`, `telephone` 07, e-mail Gmail : identiques dans les 23 blocs `ProfessionalService`/`provider` des pages de service, dans le pied de page des 39 pages et dans `llms.txt`. Les blocs `provider` des sous-pages réutilisent le même `@id #organisation` avec des champs partiels (pas de conflit, fusion par `@id`).
- **ANOMALIE CONFIRMÉE (faible) · `dateModified` périmé dans le JSON-LD de `/a-propos`** : `"dateModified":"2026-10-21"` (a-propos.html:28) alors que la page a changé le 05/11 (f01ad10). Même cause que le sitemap. `/politique-de-confidentialite` : 2026-10-14, dernière modif. de contenu 14/10 → OK.
- **ANOMALIE CONFIRMÉE (faible) pour les 5 pages récentes (France + Haut-Rhin seulement, ligne 28 de chaque fichier) ; SUSPECTÉ pour BTP/transport/artisan (villes du Bas-Rhin dans le JSON-LD, visibles en texte seulement sur la page BTP) — statut précisé après contrôle qualité du 05/11 · `areaServed` hétérogène (c032).** Accueil : Mulhouse, Colmar, Saint-Louis, Altkirch, Sundgau, Haut-Rhin, Alsace, Grand Est, France (conforme). Pages de service anciennes : `…, Haut-Rhin, Alsace, Grand Est, France` (conforme). Cinq pages récentes (`application-pointage-chantier`, `application-web-sur-mesure`, `crm-sur-mesure`, `logiciel-gestion-stock-sur-mesure`, `logiciel-entreprise-travaux-agricoles`) : seulement `France` + `Haut-Rhin` (sans Alsace ni Grand Est). `logiciel-btp`, `logiciel-transport`, `logiciel-artisan` : ajoutent `Strasbourg, Sélestat, Haguenau, Bas-Rhin` ; cela n'est visible dans le texte que sur la page BTP (2 occurrences), pas sur transport ni artisan (donnée structurée non visible). Pages ville : zone locale seulement (Ville + agglomération + Haut-Rhin), cohérent avec le sujet. Vérifier : relire `areaServed` de ces 8 pages avec la règle c032 de `memoire/agence.md` (zone) avant de corriger.
- **SUSPECTÉ (faible)** `/realisations` : `isPartOf` déclare un `WebSite` sans `@id` (réalisations : bloc `CollectionPage`), ce qui crée un second nœud `WebSite` anonyme à côté de `#site`. Pas d'erreur Google attendue ; vérifier avec le Rich Results Test (non lancé ici).
- **Non mesuré** : le test officiel Rich Results Test / validateur Schema.org n'a pas été exécuté (pas d'API gratuite appelable ici).
- **OK (absence normale)** `BreadcrumbList` : absent de l'accueil, de `/blog/` et de la 404 (normal), présent sur les 36 autres pages ; le fil d'Ariane de `/blog/` manque (faible).
- **Date de mise à jour visible** : présente sur les 11 articles (« Publié le … · Mis à jour le … »), **absente de toutes les pages de service, de l'accueil, de `/a-propos` et des pages ville sauf mention dans le texte** (voir C).

### B5. Liens

- **OK** Liens internes : 72 cibles internes distinctes (href, src, srcset), **0 cassé** (fichier existant ; 40/40 en 200 en ligne). Les 148 « ancres » signalées par mon script sont toutes `#rendez-vous` : l'élément est créé dynamiquement par `rdv.js` (assets/rdv.js:7, ligne 269) — comportement voulu, pas une erreur. Aucune autre ancre manquante.
- **ANOMALIE CONFIRMÉE · 3 sources externes mortes sur les pages ville.** Les PDF ADIRA répondent 404 (après 301 de `www.adira.com` vers `adira.com`, `curl -L`, re-testé avec 2 formes d'URL) :
  `logiciel-entreprise-mulhouse.html:771` (`…/ca-m2a-2023.pdf`), `logiciel-entreprise-colmar.html:832` (`…/cc-ca-25.pdf`), `logiciel-entreprise-saint-louis.html:772` (`…/ca-saint-louis-agglo-2023.pdf`). Ce sont les sources des chiffres d'emploi et du nombre de communes de chaque page : une source qui ne s'ouvre pas affaiblit la citabilité par les IA et la confiance. Pistes : retrouver les nouveaux PDF sur adira.com, sinon remplacer par la page Insee/Urssaf correspondante (à vérifier en c034/c018 : chaque chiffre doit rester retrouvable dans la source).
- **OK** 40 des 51 URL externes uniques (1 requête chacune) répondent 200, dont toutes les sources officielles (service-public, impots.gouv, code.travail, CNIL, Insee, Telepac, MSA, justice.fr, CAPEB, DRAAF, doi.org, arXiv, MDN, GitHub, Google).
- **SUSPECTÉ (non vérifiable ici)** Réponses d'anti-bot, pas des liens cassés : LinkedIn société 403, LinkedIn Loïc 999, Facebook 400, Instagram 429 (redirige vers login), PagesJaunes 403, Legifrance ×2 403, make.com 403. À vérifier à la main dans un navigateur : les 2 liens Legifrance (`JORFTEXT000054050450`, `…054945438`, articles sur la facture électronique ?) et la page Facebook `profile.php?id=…` (400 = URL à contrôler).
- **NETTOYAGE (très faible, corrigé après contrôle qualité du 05/11) · 4 articles gardent `target="_blank"` sur `href="#rendez-vous"`** : `blog/cahier-des-charges-application.html:819`, `limites-excel-entreprise.html:968`, `logiciel-gestion-transport-parc-engins.html:999`, `terrassement-heures-engins-carburant.html:869`. Sans effet quand le script de rendez-vous est chargé : `assets/rdv.js:283-291` capte le clic (lien commençant par « # ») et ouvre la fenêtre sur place ; un 2e onglet de l'article ne s'ouvre que si le script ne s'est pas chargé.
- **ANOMALIE CONFIRMÉE (faible) · identifiant `contenu` en double** sur `blog/bon-intervention-contenu-modele.html` (`<main id="contenu">` ligne 757 et `<h2 id="contenu">` ligne 812) et `blog/feuille-heures-salaries.html` (759 et 818). Le lien « aller au contenu » (qui vise `#contenu`) peut sauter au titre au lieu du début de la page. HTML invalide, effet minime.

### B6. Images, poids, performance

- **OK** `alt` : 0 image sans `alt` ou avec `alt` vide sur 39 pages (18 `<img>`, tous avec `width` et `height`, `loading="lazy"`). Les images de décor sont en CSS (`background-image`, `role="img"` + `aria-label` dans le menu). Format : `<picture>` WebP + repli JPEG pour la capture (`capture-portefeuille.webp` 96 Ko, 2 926 × 1 738 px servie pour 1 463 × 869 affichés : environ 2× trop grande en pixels, faible) ; articles en WebP 33-45 Ko.
- **ANOMALIE CONFIRMÉE · `pub-sl-agence.mp4` (2,6 Mo) et `pub-sl-agence.jpg` (45 Ko) ne sont référencés par aucune page** (Grep sur tous les `*.html`, `assets/*`, sitemap, flux, `llms.txt` : 0 résultat). L'audit d'octobre les situait sur l'accueil (`preload="none"`) ; la refonte les a retirés. Aucun impact sur la vitesse (rien ne les charge), mais 2,6 Mo de fichier mort servis en public et exposés à une URL directe. À décider : supprimer ou rebrancher.
- **OK** Poids de transfert mesuré en ligne (gzip, `curl --compressed`) : HTML 18,7 à 24,4 Ko ; `accueil.min.css` 13,1 Ko ; `rdv.css` 2,6 Ko ; `rdv.js` 5,5 Ko ; `menu.min.js` 0,7 Ko ; police `geist-latin.woff2` 29,4 Ko préchargée (`font-display:swap`) ; image d'en-tête WebP préchargée `fetchpriority=high` 19-80 Ko. Totaux estimés avant images différées : accueil ≈ 76 Ko ; `/logiciel-sur-mesure` ≈ 89 Ko ; `/realisations` ≈ 137 Ko (+ capture 96 Ko en `lazy`) ; `/blog/relancer-un-devis-sans-reponse` ≈ 73 Ko + 2 images lazy ≈ 78 Ko. Très léger. Aucun script bloquant (tous `defer`), pas de tierce partie, pas de CDN, 2 requêtes de polices au plus.
- **SUSPECTÉ (faible)** Cache : GitHub Pages renvoie `cache-control: max-age=600` pour tous les fichiers, y compris polices et images (non modifiable sans CDN). Les visites répétées retéléchargent après 10 min. Vérifier : `curl -I https://slagence.fr/fonts/geist-latin.woff2`.
- **NON MESURÉ · PageSpeed Insights** : l'API sans clé répond `429 RESOURCE_EXHAUSTED` (« Queries per day », 2 essais sur `/` et `/logiciel-sur-mesure`, `psi_*.json` dans le scratchpad). Aucun score LCP/CLS/INP n'est donc avancé. À faire par Loïc : https://pagespeed.web.dev/ sur les 4 URL, ou fournir une clé API gratuite.

### B7. Accessibilité de base

- **OK** `lang="fr"` sur 39 pages ; `viewport` sans `user-scalable=no` ; un `<main>`, un lien d'évitement, `<nav aria-label>` ; 0 lien ou bouton sans libellé, 0 lien « cliquez ici » ; ordre des titres sans saut ; champs de formulaire tous étiquetés (script `a11y.py`).
- **Non mesurable ici** : contrastes de couleurs (thème sombre vert/noir : à tester avec l'inspecteur Lighthouse ou WebAIM), navigation au clavier du menu visuel et de la fenêtre de rendez-vous (focus, Échap), lecteur d'écran.

## C. Contenu / GEO (par catégorie de page ; indicateurs calculés par `geo.py`)

Questions : qui (SL Agence, Friesen, associés) · quoi (définition en 1-2 phrases) · pour qui · où · preuves · mise à jour.

| Page(s) | Qui | Quoi / pour qui | Où | Preuves | Mise à jour visible | Verdict |
|---|---|---|---|---|---|---|
| `/` | SL Agence, Friesen, Sacha et Loïc dans le texte (4/3/4/3 mentions) | H1 « Automatisation et logiciel sur mesure à Mulhouse », FAQ 11 Q | Alsace, Grand Est, distance | cas réels, avis Google, réalisations | non | OK ; décision H1 en attente (rappels) |
| `/a-propos` | Oui (équipe, SIRET, Friesen) | Définition claire en tête | A+G+D | lien réalisations | **non** | OK ; ajouter une date visible (faible) |
| `/agence-ia-automatisation-haut-rhin` | Oui | Réponse directe (6 critères) | A+G+D | réalisations | non | OK |
| Services anciens (`automatisation-taches-administratives`, `agent-ia-pme`, `bon-intervention-numerique`, `relance-factures-automatique`, `remplacer-excel`, `connecter-logiciels-entreprise`, `logiciel-btp/transport/artisan`, `logiciel-entreprise-travaux-agricoles`) | **« SL Agence » 0 fois dans le corps**, Friesen 0 fois (le pied de page l'indique) ; Sacha/Loïc 1 fois (zone de contact) | Définition en tête (1-2 phrases) correcte | Zone dite en partie (voir B4/c032) | `/realisations` lié (sauf agent-ia, automatisation, relance, facture électronique) | non | **SUSPECTÉ** : une IA qui extrait le corps ne lit pas « SL Agence, Friesen » dans ces pages ; le JSON-LD et le pied de page le disent. À arbitrer |
| Services récents (`application-web`, `crm`, `stock`, `pointage`) | Oui (SL Agence 1×, Friesen 1×, Loïc 4×) | Oui | A+G+D | exemples réels, avis | non | OK |
| Pages ville (3) | Friesen 4 à 5× | « Où » très clair, déplacement depuis Friesen | Ville + Haut-Rhin | sources Urssaf/ADIRA/Insee (**3 liens ADIRA morts**) | 2 sur 3 affichent « mis à jour » | **ANOMALIE** (sources) |
| `/facture-electronique-tpe` | « SL Agence » 0× | Dates 2026-2027 exactes | **aucune zone** (ni Alsace, ni distance) | **« Source : impots.gouv.fr et economie.gouv.fr » en texte simple, aucun lien** (facture-electronique-tpe.html:731) ; 0 lien externe dans le corps | non | **ANOMALIE** GEO |
| Articles (11) | Oui (Loïc auteur, SL Agence 2-5×) | Intro avec réponse + FAQ | zone locale (Alsace, Haut-Rhin ou Mulhouse) citée dans les 11 | 1 à 8 sources liées par article (le plus sourcé : pointage 8, facture électronique 6) | **oui, partout** | OK ; `relancer-un-devis` n'a qu'1 source liée pour 643 impressions |
| `/realisations`, `/application-bon-epandage-agricole` | Oui (via JSON-LD) | Cas anonymisés, résultats chiffrés repris du site | A | résultats = ceux validés (c019) | non | OK |
| `/modeles-gratuits`, `/politique-de-confidentialite` | Oui | Oui | Alsace | 5 sources (CNIL…) pour la politique | non | OK |

Constats :
- **ANOMALIE CONFIRMÉE · source réglementaire non liée sur `/facture-electronique-tpe`** : les dates (réception 01/09/2026, émission 01/09/2027) et la définition sont citées avec « Source : impots.gouv.fr et economie.gouv.fr » mais sans hyperlien (la page est 53,5 en position moyenne selon l'export Search Console du 02/11). L'article de blog sœur a 6 sources liées, dont `impots.gouv.fr/professionnel/je-decouvre-la-facturation-electronique` et `entreprendre.service-public.gouv.fr/actualites/A18953`, toutes deux en 200. Les URL à lier existent déjà sur le site.
- **SUSPECTÉ · date de mise à jour absente des pages de service** (« quand mis à jour ? » : seules les 11 articles l'affichent). Les IA et Google valorisent une date visible, surtout sur la facture électronique (sujet daté) : à proposer comme ajout d'une ligne « Mis à jour le … » (impact moyen, effort faible, à mesurer).
- **SUSPECTÉ · identité absente du corps de 12 pages** (« SL Agence » 0 occurrence dans le `<main>` : agent-ia-pme, automatisation-taches-administratives, bon-intervention-numerique, connecter-logiciels-entreprise, facture-electronique-tpe, logiciel-artisan, logiciel-btp, logiciel-transport, logiciel-entreprise-travaux-agricoles, realisations, relance-factures-automatique, remplacer-excel) : à vérifier en lisant la première section de `automatisation-taches-administratives.html` ; l'identité est dans le pied de page et le JSON-LD.
- **OK** Réponses directes : toutes les pages de service ont un chapeau de 1-2 phrases qui définit l'offre, 33 pages ont une FAQ (4 à 11 questions) dont les réponses commencent par la réponse. Le nom des associés figure sur l'accueil, `/a-propos`, les pages récentes et dans le JSON-LD (`founder`, `employee`, `Person`).
- **ANOMALIE CONFIRMÉE (faible) · 6 articles sans bouton de rendez-vous dans le corps** (`bon-intervention-contenu-modele`, `comment-relancer-une-facture-poliment`, `facture-electronique-artisan`, `feuille-heures-salaries`, `pointage-chantier-papier…`, `relancer-un-devis-sans-reponse`) : seuls CTA = bouton vers une page de service ou un modèle et le 06 de Loïc dans le bloc auteur (relancer-un-devis : `tel:` du 06 seul, ligne 978). Le menu garde « Prendre rendez-vous » sur toutes les pages. Impact conversion à mesurer (hypothèse) : l'article `relancer-un-devis-sans-reponse` concentre 29 % des impressions du site (ctr-2026-11-02).

## D. Cannibalisation

Méthode : mots du texte visible de `<main>` (hors menu/pied), shingles de 5 mots consécutifs ; « partagés » = shingles communs ; Jaccard = partagés / union ; a⊂b = part des shingles de A retrouvée dans B ; `sim.py`. **Référence** : sur les 253 paires de pages de service, médiane Jaccard = 1,8 % ; maximum = 22,0 % ; au-dessus de 10 % : 7 paires seulement (sur 253). Le bruit de fond (bloc contact, méthode en 4 temps, mentions d'engagements) fait 3-6 %.

| Paire | Shingles partagés | Jaccard | A⊂B / B⊂A | FAQ communes | H2 communs | Verdict |
|---|---|---|---|---|---|---|
| `/logiciel-sur-mesure` ↔ `/application-web-sur-mesure` | 103 | 3,6 % | 7,9 % / 6,4 % | 0 | 0 | Faible (titles/H1 distincts : « prix, délais » vs « application web ») |
| `/logiciel-sur-mesure` ↔ `/logiciel-entreprise-mulhouse` | 74 | 2,7 % | 5,6 % / 4,9 % | 0 | 0 | Faible |
| `/logiciel-sur-mesure` ↔ `/` | 72 | 2,6 % | 5,5 % / 4,7 % | 0 | 0 | Faible (texte) ; **risque d'intention** : les deux ciblent « logiciel sur mesure » + Mulhouse (H1 accueil encore « Automatisation et logiciel sur mesure à Mulhouse ») |
| `/application-web-sur-mesure` ↔ `/logiciel-entreprise-mulhouse` | 53 | 1,7 % | 3,3 % / 3,5 % | 0 | 0 | Faible |
| `/logiciel-btp-sur-mesure` ↔ `/application-pointage-chantier` | 75 | 2,5 % | 4,1 % / 6,4 % | 0 | 0 | Faible (pointage = niche distincte) |
| `/logiciel-btp-sur-mesure` ↔ `/bon-intervention-numerique` | 172 | 6,4 % | 9,3 % / 16,9 % | 0 | 0 | **Modéré** : 17 % du texte du bon d'intervention est repris du BTP (blocs de méthode, engagements) ; intentions proches |
| `/logiciel-btp-sur-mesure` ↔ `/logiciel-artisan-sur-mesure` | 158 | 5,2 % | 8,6 % / 11,8 % | 0 (2 questions proches) | 0 | Modéré (public voisin : bâtiment/artisan) |
| `/application-pointage-chantier` ↔ `/bon-intervention-numerique` | 39 | 1,8 % | 3,3 % / 3,8 % | 0 | 0 | Faible |
| `/application-pointage-chantier` ↔ `/logiciel-artisan-sur-mesure` | 15 | 0,6 % | 1,3 % / 1,1 % | 0 | 0 | Faible |
| `/bon-intervention-numerique` ↔ `/logiciel-artisan-sur-mesure` | 25 | 1,1 % | 2,5 % / 1,9 % | 0 | 0 | Faible |
| `/crm-sur-mesure` ↔ `/blog/crm-ou-excel` | 137 | 4,2 % | 8,4 % / 7,8 % | 0 | 0 | Faible en texte ; intentions différentes (CRM sur mesure = commerciale ; article = « CRM ou Excel » informationnelle). Surveiller la requête « CRM Excel » |
| `/remplacer-excel` ↔ `/blog/limites-excel-entreprise` | 90 | 2,9 % | 8,1 % / 4,3 % | 0 | 0 | Faible ; séparation déjà documentée dans ctr-2026-11-02 (ne pas reprendre « 7 signes » dans la page) |
| `/automatisation-taches-administratives` ↔ `/connecter-logiciels-entreprise` | 157 | 6,6 % | 13,6 % / 11,5 % | 0 | 0 | **Modéré** : 13,6 % du texte de la page d'automatisation retrouvé dans « connecter » (+ 1 question de FAQ identique et 1 proche avec `/logiciel-sur-mesure`) ; mots-clés distincts mais promesse voisine |
| `/facture-electronique-tpe` ↔ `/blog/facture-electronique-artisan-ce-qui-change` | 55 | 2,0 % | 6,1 % / 2,8 % | 0 | 0 | Faible ; page de service (« se préparer ») vs article (« ce qui change pour les artisans ») ; title/H1 distincts |
| `/agence-ia-automatisation-haut-rhin` ↔ `/` | 87 | 3,0 % | 5,8 % / 5,7 % | 1 identique, 1 proche | 0 | Faible en texte ; **risque d'intention** « agence IA / automatisation Mulhouse / Haut-Rhin » (accueil + 2 pages) |
| `/agence-ia-automatisation-haut-rhin` ↔ `/agent-ia-pme` | 76 | 3,0 % | 5,1 % / 7,0 % | 0 | 0 | Faible |
| `/` ↔ `/agent-ia-pme` | 47 | 1,8 % | 3,1 % / 4,3 % | 0 | 0 | Faible |
| Mulhouse ↔ Saint-Louis | 86 | 3,0 % | 5,7 % / 6,2 % | 0 | 0 | Faible (contenu local distinct) |
| Mulhouse ↔ Colmar | 49 | 1,7 % | 3,2 % / 3,4 % | 0 | 0 | Faible |
| Saint-Louis ↔ Colmar | 31 | 1,1 % | 2,2 % / 2,2 % | 0 | 0 | Faible |

Autres paires relevées hors liste demandée :
- **ANOMALIE CONFIRMÉE (c031) · `/crm-sur-mesure` ↔ `/logiciel-gestion-stock-sur-mesure` : Jaccard 22,0 %, 567 shingles partagés, 34,9 % / 37,2 %**. 27 passages de 12 mots ou plus identiques, 709 mots au total : bloc « méthode en 4 temps » (étapes 01 à 04 avec la même formule « Devis gratuit sous 24 h avec un prix ferme avant de commencer »), bloc contact, bloc « facteurs de prix » et liens de fin de page. Les FAQ sont distinctes (0 question commune), le cœur (fonctions) aussi. Risque réel moyen de contenu dupliqué partiel sur les deux pages les plus récentes (2 et 4 liens de corps entrants, 0 clic) ; la règle c031 (aucune ligne de tableau/réponse recopiée) est respectée sur les FAQ mais pas sur les blocs de méthode.
- `/application-web-sur-mesure` ↔ `/crm-sur-mesure` 13,2 % et ↔ stock 12,2 % : même cause (blocs communs).
- `/logiciel-sur-mesure` ↔ `/remplacer-excel` 10,3 % (215 mots en 7 passages : zone, engagements, contact, une phrase « un logiciel du marché convient quand… ») : la réponse de zone identique est déjà dans les rappels (c031).
- `/automatisation-taches-administratives` ↔ `/agent-ia-pme` 9,2 % ; ↔ `/relance-factures-automatique` 8,6 % : modéré (engagements communs) mais intentions séparées.

**Verdict global** : cannibalisation de texte = **risque faible** presque partout (médiane 1,8 %). Risque réel limité à 3 points : (1) `/crm-sur-mesure` ↔ `/logiciel-gestion-stock-sur-mesure` (blocs recopiés) ; (2) `/automatisation-taches-administratives` ↔ `/connecter-logiciels-entreprise` (promesse voisine) ; (3) cannibalisation d'**intention** sur « agence automatisation / IA Mulhouse » entre `/`, `/agence-ia-automatisation-haut-rhin` et `/logiciel-sur-mesure` / pages ville (visible par les titles, à confirmer dans Search Console par requête, non mesuré ici).
Titles proches à surveiller (c033, mesures en cours jusqu'au 16/11) : `/logiciel-sur-mesure` « Logiciel sur mesure : prix, délais, devis 24 h », `/logiciel-entreprise-mulhouse` « Logiciel sur mesure à Mulhouse : BTP, transport », `/crm-sur-mesure` « CRM sur mesure PME : développé en Alsace », `/application-web-sur-mesure` : « sur mesure » dans 9 titles, chaque page garde un second terme distinct.

## E. Déjà en place, à ne pas dupliquer (vérifié dans les fichiers)

- **Téléphones** : 07 (Sacha) numéro principal `telephone` du JSON-LD ; 06 (Loïc) en `contactPoint` « sales » et dans le bloc auteur des articles : décision du 26/10, ne pas retirer (accueil, `llms.txt`, 39 pieds de page).
- **Aucun prix affiché** ; aucun `offers` dans les `Service` ; fourchette retirée de `/logiciel-sur-mesure` (27/10).
- **Prénoms des avis Google conservés** sur l'accueil ; cas chiffrés de l'animation (6 h, 3 h) confirmés réels (03/11).
- **FAQPage** sur 33 pages, contenu identique au visible ; **BreadcrumbList** sur 36 pages ; **BlogPosting** complet (auteur, éditeur, image, dates) ; **AboutPage**, **CollectionPage**/`ItemList` sur `/realisations`, **DigitalDocument** sur `/modeles-gratuits`.
- **Profils** dans le `sameAs` : fiche Google (kgmid), LinkedIn, PagesJaunes, Facebook, Instagram + pied de page de 39 pages ; lien « Fiche Google » (`share.google`, 200).
- **Sitemap** (38 URL + images) et **robots.txt** déclarant le sitemap ; **IndexNow** (clé servie) ; fichier de vérification Search Console ; **Bing** (`msvalidate.01` dans l'accueil) ; **flux RSS** déclaré.
- **llms.txt** présent avec zone conforme (c032) et 33 pages listées ; décision : pas retravaillé.
- **hreflang** `fr-FR` + `x-default` auto-référents sur chaque page ; `meta robots` `index, follow, max-image-preview:large, max-snippet:-1` ; `lang="fr"`.
- **Canonicals** propres sur 39 pages ; liens internes tous propres ; redirections www/http/slash OK.
- **Pages ville : 3** (Mulhouse, Saint-Louis, Colmar) : plafond atteint, sources Urssaf/Insee/ADIRA en note de bas de section ; FAQ propres à chaque ville (c023 respecté : 0 question commune dans mes comparaisons).
- **Pages niche et plan 12 semaines** déjà en ligne : stock, CRM, application web, pointage, article CRM ou Excel, article cahier des charges, modèles gratuits (Excel, Word, PDF), `/application-bon-epandage-agricole` (étude de cas).
- **Menu visuel** (PR #38) sur 39 pages, rendez-vous intégré (`rdv.js`, `data-rdv`), politique de confidentialité liée partout.
- **Tests de titles/metas en cours** (CTR) : accueil, feuille d'heures, relancer facture, relancer devis, facture électronique, remplacer Excel, logiciel sur mesure, agent IA, mesure le 16/11 ; mesure pages ville le 11/11 ; mesure accueil sans métiers le 01/12. Ne pas modifier ces titles avant ces dates.
- **Liens externes de source** : 40 URL externes en 200 sur 51 (code du travail, CNIL, service-public, impots.gouv…), articles de blog bien sourcés.
- **Aucune mesure d'audience** : décision de Loïc (pas d'outil tiers) ; pas de GoatCounter.
- **Alt, dimensions, `loading=lazy`, WebP** sur toutes les images ; polices locales préchargées ; JS différé.

## Ce qui n'a pas pu être vérifié

- Scores PageSpeed (429, quota API) : LCP/CLS/INP non mesurés.
- Rich Results Test, validateur Schema.org, rendu Google (URL Inspection) : outils non appelables ici ; la validité des JSON-LD est testée par `json.loads` uniquement.
- Contrastes de couleurs, navigation clavier, lecteur d'écran.
- Indexation réelle (`site:slagence.fr`, Search Console), positions, requêtes en cannibalisation d'intention.
- Slug LinkedIn officiel (403), pages Facebook/Instagram/PagesJaunes/Legifrance/make.com (anti-bot).
- Blocage réel de robots depuis leurs plages d'IP officielles (test depuis un proxy, 1 IP).
- Texte des 3 sources ADIRA mortes : retrouver les nouvelles adresses exigerait une recherche sur adira.com (hors périmètre de cette phase).

## Annexe : preuves principales (commandes)

- Statuts : `python3 fetch.py` (80 requêtes, 40 pages × 2 formes) → 80 × 200 ; `curl -s -o /dev/null -w "%{http_code}" https://slagence.fr/zzz` → 404.
- Sitemap/lastmod : `sitemap.xml:4-5` (accueil 2026-10-26), `git log -- index.html` (03, 04, 05/11).
- Robots : boucle de 9 User-Agent × 6 URL, 54 × 200.
- Sources mortes : `curl -I https://adira.com/wp-content/uploads/ca-m2a-2023.pdf` → 404.
- Fichier mort : `grep -rn "pub-sl-agence" *.html assets` → aucun résultat ; `ls -l pub-sl-agence.mp4` = 2 675 166 octets.
- PageSpeed : `HTTP 429 … Queries per day`.
