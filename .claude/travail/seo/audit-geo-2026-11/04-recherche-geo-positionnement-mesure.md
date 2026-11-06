# Recherche GEO, positionnement, études de cas et mesure IA — phase 1 (05/11/2026)

Analyste (Opus), pour le Manager. Audit demandé explicitement par Loïc, donc c001 ne s'applique pas. À enregistrer tel quel, par exemple sous `.claude/travail/seo/recherche-geo-2026-11-05.md`.
Corrections appliquées : c002, c004, c007, c008 (aucun appel Ahrefs ; leurs articles de blog publics ont été lus), c011, c019, c021, c022, c027, c028, c034, c037, c038.
Règle de lecture : je ne cite que ce que j'ai ouvert le 05/11/2026 avec WebFetch. Quand une information vient d'un extrait de résultat de recherche, c'est écrit.

---

## PARTIE 1 — Ce que disent vraiment les sources

### a) Documentation officielle

**1. Google, « AI features and your website »** (developers.google.com/search/docs/appearance/ai-features)
- Type : documentation officielle. Aucune date de mise à jour n'apparaît sur la version lue (seo.md indiquait le 10/12/2025, non reconfirmé).
- Ce que dit la page : « There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary. » Il faut être indexé et pouvoir apparaître avec un extrait. La page précise aussi qu'il n'est pas nécessaire d'ajouter de nouveaux fichiers lisibles par les machines, de « AI text files », de balisage ni de schema.org spécial.
- Bonnes pratiques citées : exploration autorisée, maillage interne, contenu important en texte, images et vidéos utiles, données structurées conformes au texte visible, fiche Business Profile à jour.
- AI Overviews et AI Mode lancent plusieurs recherches sur des sous-thèmes (« query fan-out »).
- Le trafic venu de ces fonctions est compté dans Search Console, type « Web », sans rapport séparé.
- Limites : la page ne dit rien des autres moteurs.
- Pour SL Agence : c'est ce qui borne tout le plan côté Google. Confiance élevée.

**2. Google, « Creating helpful, reliable, people-first content »** (developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Type : documentation officielle, sans date affichée.
- Ce que dit la page : des questions sur le contenu original et « beyond the obvious », une grille Qui / Comment / Pourquoi, et « trust is most important ». Générer beaucoup de texte par IA sans relecture « represents little to no effort ». De faux profils d'auteur sont « a form of deception ».
- Pour SL Agence : des auteurs nommés (Sacha, Loïc), des cas réels, aucune production de masse. Confiance élevée.

**3. Google, règles des données structurées**
- Pages lues : sd-policies, review-snippet, organization, faqpage, et le billet du blog Google du 08/08/2023. Documentation officielle.
- Contenu visible : « Don't mark up content that is not visible to readers of the page » ; « must be a true representation of the page content ».
- Avis que l'entreprise publie sur elle-même : une page `LocalBusiness` ou `Organization` dont l'entité contrôle les avis « are ineligible for star review feature ».
- Organization : `alternateName`, `sameAs` et `logo` servent à distinguer l'entreprise des autres. Pour un commerce local, Google recommande le sous-type `LocalBusiness` le plus précis.
- FAQ : réservées dès le 08/08/2023 aux « well-known, authoritative government and health websites ». Plus affichées « starting May 7, 2026 » ; documentation retirée le 15/06/2026.
- Pour SL Agence : notre JSON-LD (`ProfessionalService`, `sameAs`) est le bon choix. Jamais d'`aggregateRating` sur nos propres pages. Le balisage FAQPage n'apporte plus aucun affichage. Confiance élevée.

**4. Google, robots (« Google common crawlers »)**
- Googlebot : « always obey robots.txt ».
- Google-Extended n'est pas un robot séparé, c'est un jeton. Il contrôle l'entraînement des futurs modèles Gemini **et** l'ancrage dans les réponses (« grounding ») dans les Gemini Apps et sur Vertex AI. Il « does not impact a site's inclusion in Google Search nor is it used as a ranking signal ».
- Annonce d'un signal AIPREF pour début 2027.
- Pour SL Agence : bloquer Google-Extended ne changerait rien sur Google Search, mais pourrait priver l'application Gemini de nos pages. Il faut le garder autorisé. Confiance élevée.

**5. Google Search Central Blog, « Top ways to ensure your content performs well in Google's AI experiences »** (21/05/2025)
- « unique, non-commodity content », page facile à utiliser, balisage visible, images et vidéos, fiche Business Profile à jour.
- Google affirme que les clics venus des AI Overviews sont « higher quality » : c'est une affirmation de Google, sans données publiées.
- Confiance élevée pour les consignes, moyenne pour l'affirmation sur les clics.

**6. OpenAI, « Overview of OpenAI Crawlers »** (developers.openai.com/api/docs/bots, sans date)
- OAI-SearchBot « is for search ». Un site bloqué « will not be shown in ChatGPT search answers ». Un changement de robots.txt est pris en compte en « ~24 hours ».
- GPTBot : entraînement. Le bloquer signifie que le contenu ne doit pas servir à entraîner les modèles.
- ChatGPT-User : actions demandées par un utilisateur ; « robots.txt rules may not apply » ; ce robot ne décide pas de l'apparition dans la recherche.
- Confiance élevée.
- La FAQ OpenAI pour les éditeurs (help.openai.com/en/articles/12627856) et la page d'aide « ChatGPT search » étaient **inaccessibles le 05/11/2026 (erreur 403)**. L'extrait de résultat de recherche de cette FAQ indique que ChatGPT ajoute `utm_source=chatgpt.com` aux liens. Ce n'est pas vérifié en lecture directe, donc confiance moyenne.

**7. Bing / Microsoft**
- Les consignes Bing pour les webmasters (bing.com/webmasters/help/webmasters-guidelines-30fba23a) étaient **inaccessibles le 05/11/2026 (page affichée sans texte)**. Source de remplacement : Search Engine Journal, 27/02/2026.
- D'après SEJ : les consignes nomment le GEO et précisent qu'il ne garantit ni citation ni classement. Elles s'étendent à Copilot et à l'ancrage des réponses. NOARCHIVE empêche l'usage dans Copilot ; NOSNIPPET peut dégrader la qualité de la citation.
- Toujours d'après SEJ, une section « Prompt Injection and AI Manipulation » est ajoutée, ainsi que « Keyword Stuffing and Artificially Engineered Language », qui vise le contenu fabriqué pour déclencher des citations.
- Rapport « AI Performance » (blog Bing, 10/02/2026, test public) : nombre de citations dans Copilot et dans les résumés IA de Bing, pages citées, requêtes d'ancrage. Le rapport ne montre ni la place ni le poids d'une citation dans la réponse.
- FAQ IndexNow : moteurs participants Amazon, Bing, Naver, Seznam, Yandex, Yep. « Submitting a URL does not guarantee immediate indexing. » La FAQ ne parle ni de Copilot ni de ChatGPT : tout effet d'IndexNow sur les citations IA est **non vérifié**.
- Confiance : élevée pour le rapport AI Performance et IndexNow, moyenne pour les consignes (lues de seconde main).
- Vérifié par Grep : aucune page du site n'utilise noarchive, nosnippet ni nocache (seule 404.html porte un noindex, ce qui est normal).

**8. Perplexity** (docs.perplexity.ai/guides/bots, sans date)
- PerplexityBot : il sert à faire apparaître et à lier les sites dans les résultats ; « not used to crawl content for AI foundation models » ; changements pris en compte en 24 h au plus.
- Perplexity-User : « generally ignores robots.txt rules », puisque c'est l'utilisateur qui demande la page.
- Confiance élevée.

**9. Anthropic** (support.claude.com, article 8896518, « Updated today »)
- ClaudeBot : entraînement.
- Claude-SearchBot : indexation pour la recherche. Le bloquer « may reduce its visibility ».
- Claude-User : requêtes des utilisateurs.
- Les trois respectent robots.txt. Un signal « no AI training » est reconnu depuis le 30/10/2026.
- Confiance élevée.

**10. Apple** (support.apple.com/en-us/119829, 04/09/2026)
- Applebot sert à Spotlight, Siri et Safari, et ses données « may also be used to help train Apple foundation models ». Si robots.txt ne mentionne pas Applebot, il suit les règles écrites pour Googlebot.
- Applebot-Extended « does not crawl webpages » ; c'est seulement un refus d'entraînement, et il « not considered in ranking ».
- Confiance élevée.

**Tableau des robots** (robots.txt vérifié dans le dépôt et en ligne le 05/11 : `User-agent: * Allow: /`)

| Robot | Service | Usage | robots.txt selon la doc | Recommandation SL Agence |
|---|---|---|---|---|
| Googlebot | Google Search, dont AI Overviews et AI Mode | Recherche et citation | Respecté | Garder autorisé (indispensable) |
| Google-Extended (jeton) | Gemini (entraînement + ancrage dans Gemini Apps) | Entraînement et ancrage | Réglé par robots.txt, sans effet sur Search | Garder autorisé (le bloquer peut retirer nos pages des réponses Gemini) |
| Bingbot | Bing et Copilot | Recherche et citation | Non vérifié (page Bing inaccessible) | Garder autorisé ; ne jamais mettre NOARCHIVE |
| OAI-SearchBot | Recherche ChatGPT | Recherche et citation | Respecté, environ 24 h | Garder autorisé |
| GPTBot | Modèles OpenAI | Entraînement | Respecté | Décision de principe pour Loïc, sans effet documenté sur la recherche ; statu quo |
| ChatGPT-User | Page ouverte à la demande d'un utilisateur | Requête utilisateur | « may not apply » | Rien à faire |
| PerplexityBot | Recherche Perplexity | Recherche, pas d'entraînement | Respecté, 24 h | Garder autorisé |
| Perplexity-User | Requête utilisateur | Requête utilisateur | « generally ignores » | Rien à faire |
| ClaudeBot | Modèles Anthropic | Entraînement | Respecté | Décision pour Loïc ; statu quo |
| Claude-SearchBot | Recherche Claude | Recherche | Respecté | Garder autorisé |
| Claude-User | Requête utilisateur | Requête utilisateur | Respecté | Garder autorisé |
| Applebot | Siri, Spotlight, Safari (et entraînement possible) | Recherche et entraînement | Respecté (suit Googlebot par défaut) | Garder autorisé |
| Applebot-Extended (jeton) | Refus d'entraînement Apple | Entraînement | Réglé par robots.txt, sans effet sur la recherche | Décision pour Loïc ; statu quo |

Conclusion : on ne change rien à robots.txt. Les jetons d'entraînement relèvent d'un choix de principe de Loïc ; aucune doc ne les relie à la visibilité dans les réponses.

### b) Études

**11. Aggarwal et al., « GEO: Generative Engine Optimization »** (arXiv 2311.09735)
- Type : article évalué par les pairs, accepté à KDD 2024. Version 3 du 28/06/2024.
- Méthode :
  - GEO-bench : 10 000 questions, 25 domaines, 9 sources.
  - Moteur **simulé** : les 5 premiers résultats Google, puis GPT-3.5-turbo rédige la réponse (température 0,7, 5 tirages).
  - Mesures : un nombre de mots pondéré par la position, et une impression subjective notée par un LLM.
  - Test complémentaire sur Perplexity.ai : 200 questions, sources envoyées sous forme de fichiers.
- Ce que l'étude démontre :
  - Ajouter des citations, des statistiques, des sources ou rendre le texte plus fluide augmente la visibilité « by up to 40% » dans le moteur simulé (meilleur cas du tableau : 41 %).
  - Le bourrage de mots-clés fait moins bien que le texte non modifié.
  - « Cite Sources » fait gagner +115,1 % à la source classée 5e, mais fait perdre 30,3 % à la source classée 1re.
  - Sur Perplexity : environ +22 % avec des citations, jusqu'à +37 % avec des statistiques (impression subjective).
- Limites (citées par les auteurs) : 2 moteurs seulement ; les moteurs évoluent ; effet sur les classements non mesuré. On modifie le texte d'une source déjà retenue : l'étude ne montre pas comment être retenu au départ. Aucune question de recommandation locale.
- Pour SL Agence : des faits réels et sourcés dans nos pages, oui. Des chiffres inventés ou entassés, jamais. Confiance moyenne : la méthode est solide, mais loin de notre cas.

**12. Chen, Wang, Chen, Koudas, « Generative Engine Optimization: How to Dominate AI Search »** (arXiv 2509.08919, 10/09/2025)
- Type : préprint (non évalué par les pairs). Je n'ai lu que le résumé.
- Ce que dit le résumé : « systematic and overwhelming bias towards Earned media », c'est-à-dire les sources tierces, devant les sites des marques et les réseaux sociaux. Les services d'IA diffèrent entre eux et sont sensibles à la formulation. Les auteurs parlent d'un « big brand bias » qui défavorise les petits acteurs.
- Limites : plan d'expérience non lu ; secteurs de grande consommation.
- Pour SL Agence : cela confirme qu'il faut des mentions tierces (presse, annuaires, comparatifs). Confiance moyenne.

**13. Travaux sur la manipulation : ce qu'il ne faut PAS faire**
- **Kumar & Lakkaraju**, arXiv 2404.07981 (2024) : une « strategic text sequence » ajoutée à une fiche produit fait monter le produit dans les recommandations d'un LLM (catalogue fictif de machines à café).
- **Pfrommer et al.**, EMNLP 2024, arXiv 2406.03589 : des injections de consignes (« prompt injection ») font remonter des produits mal classés, et ces attaques fonctionnent aussi sur perplexity.ai.
- **Nestaas, Debenedetti, Tramèr**, arXiv 2406.18382 (2024) : des « preference manipulation attacks » contre Bing et Perplexity ; les auteurs décrivent un dilemme du prisonnier qui dégrade les réponses pour tout le monde.
- Ce que ça montre : ces techniques marchent en laboratoire. Bing les interdit désormais (consignes, via SEJ), et elles sont contraires à nos règles absolues.
- Pour SL Agence : interdites (texte caché, consignes adressées aux IA, séquences fabriquées). Confiance élevée sur le risque.

**14. Variabilité des recommandations**
- **SparkToro / Gumshoe**, via Search Engine Journal (30/01/2026). Étude d'éditeur d'outil, non évaluée par les pairs, avec un conflit d'intérêts déclaré (Gumshoe vend du suivi IA). Le texte original n'a pas été consulté.
  - Méthode : 2 961 requêtes sur ChatGPT, Claude et Google IA ; 12 questions répétées 60 à 100 fois par plateforme ; réglages non standardisés.
  - ChatGPT et Google IA donnent la même liste « less than 1% » du temps, et la même liste dans le même ordre « less than 0.1% ».
  - L'ensemble des marques citées est plus stable : 55 à 77 % pour les 4 marques en tête sur les casques. La fréquence d'apparition résiste mieux que le rang.
- **Żatuchin**, « The Dice Roll Method » (arXiv 2609.04047, v2 du 14/10/2026). Préprint.
  - Méthode : réanalyse de 5 audits, environ 190 000 observations, 270 marques, 6 langues.
  - Résultat : la v2 « supports no fixed tiers ». Le nombre de répétitions doit sortir d'un essai pilote. G = 0,96 à 5 répétitions sur un jeu de données, mais 0,27 sur un autre.
- **Żatuchin**, arXiv 2609.05059 (v2 du 23/09/2026). Préprint.
  - 15 appels par question : 10 appels retrouvent en médiane environ 90 à 95 % de ce que donnent 15 appels.
  - Il n'existe pas de règle d'arrêt universelle.
- Pour SL Agence : on mesure une **fréquence d'apparition sur plusieurs tirages**, jamais un rang isolé. Confiance moyenne : convergence de plusieurs sources, aucune évaluée par les pairs.

**15. Études d'éditeurs** (« étude d'éditeur, méthodologie partielle », sauf mention contraire)
- **Ahrefs, mentions de marque et AI Overviews** (26/05/2025)
  - Méthode : 75 000 marques, seulement des domaines avec DR > 40, corrélation de Spearman.
  - Résultats : mentions de la marque sur le web 0,664 ; ancres de marque 0,527 ; volume de recherche de marque 0,392 ; backlinks 0,218. L'article écrit lui-même « correlation ≠ causation ».
  - Limite : SL Agence est très loin de DR 40. Confiance moyenne.
- **BrightLocal, « Top sources and directories for local AI search »** (26/08/2026)
  - Méthode : États-Unis, Royaume-Uni, Australie ; 60 970 vérifications ; 1,97 million de citations ; AI Overviews, AI Mode et ChatGPT.
  - Résultats : la fiche Google représente 28,63 % de toutes les citations et apparaît pour 94,17 % des entreprises. Dans ChatGPT, Yelp est cité dans environ 80 % des réponses. Environ 93 % des **domaines** cités sont des sites d'entreprises.
  - Limites : chiffres internes légèrement incohérents (28,63 % contre 28,5 %) ; pas de France ; ni Gemini ni Perplexity.
  - Confiance moyenne. Transposition à la France = hypothèse.
- **Seer Interactive, « The Listicle Window Is Closing »** (25/02/2026)
  - Méthode : 2 millions de citations ChatGPT, novembre 2025 à février 2026. Est classée « liste » toute URL contenant « best » ou « top ».
  - Résultats : le volume de citations des listes passe de 160 000 à 111 000 entre décembre et janvier (environ −30 %), alors que le total des citations ChatGPT baisse de 22,7 % sur la même période. La part des listes passe de 17,2 % à 15,5 %.
  - Limites : un seul mois ; aucune distinction entre listes tierces et listes publiées par la marque sur elle-même. Confiance faible à moyenne.
- **Peec AI** (03/03/2026)
  - Méthode : 232 000 citations, 6 plateformes, logiciels uniquement.
  - Résultats : les listes où une marque se classe elle-même 1re représentent environ 4 % des citations dans ChatGPT (3,6 %), environ 10 % dans AI Mode et Perplexity, environ 11 % en tout. « No evidence of algorithmic correction. »
  - Confiance moyenne.
- **Scrunch, via ppc.land** (25/09/2026). L'étude originale n'a pas été consultée.
  - Méthode : environ 10 000 URL, 7 assistants, mai à juin 2026.
  - Résultat : le taux de recommandation de la marque auteur passe « from about 4% to roughly 7% » quand sa propre liste est citée. Après test placebo, ppc.land estime à environ 2 points l'effet propre de la liste. Analyse causale sur environ 6 % des données seulement.
  - Confiance faible.
- **The Hoth, « AI cites listicles »** (08/09/2026)
  - Méthode : 4 marques américaines, ChatGPT, une seule date ; les auteurs parlent de « a directional read ».
  - Résultat : sur les questions contenant « best », le site de la marque porte 1,3 % des citations.
  - Confiance faible.
- **Kumar (Ranqo), arXiv 2606.20065** (préprint d'éditeur d'outil, 18/06/2026)
  - Résultat : les petites marques de niche apparaissent dans environ 11 % des réponses au premier tirage, contre environ 73 % pour les très grandes marques. Environ 78 % des citations vont aux sites des entreprises.
  - Confiance faible à moyenne.

**Re-vérification des chiffres de `plan-geo-2026-10-21.md`**

| Chiffre du plan | Verdict | Correction |
|---|---|---|
| Ahrefs 43,8 % de « listes tierces » | **Nuancé** | 43,8 % des **types de pages** sources, sur 750 questions d'entrée de parcours (logiciels, produits, agences), listes **de tiers et de marques confondues**. Le mot « tierces » est inexact. |
| Scrunch 4 % → 7 % (via ppc.land) | **Confirmé**, faible | Il s'agit du taux de recommandation de la marque auteur ; environ 2 points attribuables selon ppc.land ; étude d'éditeur. |
| Seer −30 % « de ces listes » | **Nuancé** | La baisse porte sur toutes les URL « best/top », pas sur les listes auto-promotionnelles, sur un seul mois, et pendant que le total baissait de 22,7 %. |
| The Hoth environ 1 % | **Confirmé**, faible | 1,3 %, 4 marques américaines, ChatGPT, questions « best » ; d'autres études (BrightLocal, Ranqo) trouvent l'inverse selon le type de question. |
| Corrélation 0,664 | **Confirmé** | Spearman, AI Overviews, marques avec DR > 40. |
| Mueller sur llms.txt | **Confirmé** | Bluesky, 17/06/2025 : « FWIW no AI system currently uses llms.txt ». La doc Google actuelle va dans le même sens (pas de « AI text files »). |
| « +40 % » du papier GEO | **Nuancé** | « jusqu'à 40 % » dans un moteur simulé (GPT-3.5 sur les 5 premiers résultats Google). Correction à apporter aussi dans `savoirs/seo.md` §5, qui écrit « moteur de type Bing Chat » : c'est inexact. |
| BrightLocal (fiche Google pour Google, Yelp pour ChatGPT) | **Confirmé** hors France | Étude du 26/08/2026, US/UK/AU ; transposition à la France = hypothèse. Le « 58 % » (BrightLocal 2024) de seo.md n'a pas été revérifié. |

### c) Synthèse

**Solidement établi (doc officielle ou plusieurs sources concordantes)**
1. Pour être cité, il faut être accessible et indexé par chaque moteur : Googlebot, Bing, OAI-SearchBot, PerplexityBot, Claude-SearchBot. C'est le cas aujourd'hui.
2. Aucun balisage ni fichier « spécial IA » n'est nécessaire (Google) ; le GEO ne garantit rien (Bing).
3. Les données structurées doivent correspondre au texte visible ; les avis publiés sur soi-même ne donnent pas d'étoiles ; les FAQ n'ont plus d'affichage enrichi.
4. Les réponses changent d'un tirage à l'autre : le rang isolé ne veut rien dire, la fréquence d'apparition est plus stable.
5. Les techniques de manipulation existent, sont interdites par Bing et sont exclues chez nous.

**Plausible (corrélations, préprints, études d'éditeurs)**
- Les mentions par des tiers (presse, annuaires, comparatifs) pèsent sur les questions de recommandation.
- Les listes « meilleurs X » écrites par des tiers comptent dans ChatGPT.
- La fiche Google domine les réponses IA locales de Google.
- Des faits sourcés et des citations aident une page déjà retenue.
- Les petites marques partent avec un handicap.

**Folklore GEO à rejeter**
- llms.txt présenté comme un levier.
- Des FAQ ajoutées artificiellement « pour l'IA » : plus d'affichage enrichi, et Bing vise l'« artificially engineered language ».
- Le bourrage de statistiques ou de mots-clés : le bourrage fait moins bien que le texte de base dans le papier GEO, et un chiffre sans source est interdit chez nous.
- Notre propre liste « meilleures agences » où nous serions 1ers : effet faible (environ 2 à 3 points), risque pour la réputation, décision déjà prise le 21/10.
- Un balisage « IA », un `aggregateRating` publié sur nous-mêmes, du texte caché ou des consignes adressées aux IA.

---

## PARTIE 2 — Test du positionnement

Hypothèse testée : « spécialisée dans les applications métier simples et personnalisées, et l'automatisation des processus administratifs et opérationnels des TPE et PME du Haut-Rhin ».

**Points de vigilance avant de valider**
1. Le positionnement validé dans `agence.md` contient l'**IA**, et l'hypothèse la retire. Changer `agence.md` demande l'accord explicite de Loïc (règle 6).
2. « du Haut-Rhin » entre en conflit avec l'objectif national du 21/10 (plan-geo §6), et `realisations.html` écrit « entreprises d'**Alsace** », sans dire si tous les clients sont haut-rhinois.
3. « processus » et « ressaisies » sont interdits par c038 ; « applications métier » est moins tapé que « logiciel » (décision SEO du 14/10).
4. « Simples » est le seul mot appuyé par un client : l'avis Google de septembre 2026 affiché sur l'accueil dit « L'appli est simple et pratique, exactement ce qu'il me fallait. »

| Avantage | Preuve disponible (citation exacte, page) | Preuve manquante | Formulation défendable |
|---|---|---|---|
| Proximité | « SL Agence est une agence d'automatisation et d'IA basée à Friesen, dans le Sundgau. » et « nous venons voir comment vous travaillez » (index.html, section « Près de chez vous ») ; FAQ « Basés à Friesen, nous nous déplaçons à Mulhouse, Colmar, Saint-Louis, dans tout le Haut-Rhin, en Alsace et dans le Grand Est… » (index.html) | Part des clients haut-rhinois ; déplacements réellement faits | « Basés à Friesen, nous venons chez vous dans tout le Haut-Rhin. » |
| Échange direct | « Vous parlez directement à ceux qui construisent votre outil. » (a-propos.html §01 et index.html) ; « Sacha… Il construit vos outils » (a-propos.html) ; « Au bout du fil, Loïc ou Sacha » (index.html, contact) | Absence de sous-traitance : rien n'est affirmé sur le site (Grep « sous-trait » : aucun résultat) | « Vous parlez directement à Sacha, qui construit votre outil, et à Loïc. » |
| Construit autour de vos méthodes | « Un logiciel construit pour votre façon de travailler, et pas l'inverse. » (logiciel-sur-mesure.html) ; « Vos champs, vos 4 étapes, votre vocabulaire » et « Elle se construit à partir de votre bon actuel » (application-bon-epandage-agricole.html) | La même preuve pour les autres cas | « Nous partons de votre papier ou de votre fichier actuel. » |
| Branché sur vos logiciels | « Rien à jeter. L'outil se branche sur ce que vous utilisez déjà : Excel, Outlook, Gmail, Google Agenda, Microsoft 365, WhatsApp, Sage, EBP, Cegid, Pennylane… » (index.html) ; cas réels : l'agenda (épandage) ; Outlook (transport, **projet en cours**) ; Excel repris (gestion de patrimoine) | **Aucune réalisation publiée** avec Sage, EBP, Cegid, Pennylane, une paie ou une caisse. La liste décrit une capacité, pas une preuve. Condition à garder (c022) : « Quand l'éditeur du logiciel propose un accès à ses données » (connecter-logiciels-entreprise.html) | « Nous partons de vos outils : agenda, Outlook, fichiers Excel. Pour votre logiciel de comptabilité, nous vérifions à l'appel ce qui est possible. » |
| Fait pour les petites structures | Signature « pour les indépendants, TPE, PME, cabinets et associations » (pied de page) ; cas : terrassement 12 salariés, « un cabinet de gestion de patrimoine » (légende de la capture, realisations.html), association | Taille des autres clients | « Nos clients : une entreprise de terrassement de 12 salariés, un cabinet, une association. » |
| Première version rapide | « Un premier outil en 7 jours — Testé par vos équipes avant d'aller plus loin. » et « vous voyez et testez l'outil dès la première semaine » (a-propos.html) | Délai réel, réalisation par réalisation. Attention : le comparatif « Souvent plusieurs mois » pour les autres (logiciel-sur-mesure.html) n'a pas de source, c'est un « plus rapide » non prouvé. | « Nous nous engageons à une première version à essayer en 7 jours. » (présentée comme un engagement, pas comme une moyenne) |
| Moins de choses à recopier | « Plus rien à recopier : le bon est saisi une seule fois, sur place. » (épandage, realisations.html) ; « Chacun saisit sa journée sur place, en 30 secondes » (pointage) ; « Jusqu'à 20 h récupérées chaque semaine chez un client » (realisations.html) ; 6 h (fiche du jour) et 3 h (relances), confirmés par Loïc le 03/11 (rappels-seo.md) | Méthode de mesure et cas d'origine des 20 h, 6 h et 3 h | « Ce qui est noté une fois n'est plus recopié. » (chaque chiffre seul, avec son périmètre : c028, c037) |

**Phrase de positionnement la plus défendable**
> SL Agence, basée à Friesen dans le Haut-Rhin, construit des logiciels sur mesure simples et automatise les tâches répétitives des petites entreprises, des cabinets et des associations : ce qui est noté une fois n'est plus recopié. Vous parlez directement à ceux qui construisent l'outil, et nous nous engageons à une première version à essayer en 7 jours.

**Variante courte, facile à reprendre par une IA**
> SL Agence est une agence d'automatisation et de logiciels sur mesure basée à Friesen (Haut-Rhin). Elle construit des outils simples pour le terrain et le bureau : bons signés sur téléphone, heures pointées sur place, fichiers Excel réunis dans un seul écran.

**Variante nationale (objectif du 21/10)**
> SL Agence construit des logiciels sur mesure simples et automatise les tâches répétitives des petites entreprises. Basée dans le Haut-Rhin, elle se déplace en Alsace et dans le Grand Est, et travaille à distance partout en France, notamment pour les travaux agricoles et le BTP.

---

## PARTIE 3 — Les réalisations

### Inventaire

Sources lues : realisations.html, application-bon-epandage-agricole.html, et les extraits des pages de service (Grep sur tout le site). Légende : ✔ présent · ~ partiel ou implicite · ✗ absent.

| Réalisation | Secteur | Situation de départ | Difficultés | Objectif | Solution | Fonctions | Technologies | Résultat constaté | Captures | Témoignage |
|---|---|---|---|---|---|---|---|---|---|---|
| 1. Carburant | ✔ Terrassement | ✔ pleins sur papier, tickets passés de main en main | ✔ attente | ~ | ✔ application sur téléphone | ✔ photo du compteur avant/après, 11 engins | ✗ | ✔ « voit les pleins du jour, le jour même » (sans chiffre) | ✗ (le visuel du menu est une illustration) | ✗ |
| 2. Épandage (étude de cas) | ✔ Travaux agricoles | ✔ | ✔ travail fait 2 fois | ~ | ✔ | ✔ 4 étapes, rendez-vous pré-rempli par une IA, chronomètre, signature, hors réseau | ~ « installable », « IA » | ✔ « plus rien à recopier » (sans chiffre) | ✗ (Grep `<img` sur la page : aucune) | ✗ |
| 3. Pointage | ✔ Terrassement | ✗ pas de paragraphe « Avant » | ✗ | ✗ | ✔ | ✔ 12 salariés, rappel automatique | ✗ | ✔ 30 s, sur place | ✗ | ✗ |
| 4. Transport (projet en cours) | ✔ | ✔ détaillée | ✔ | ~ | ✔ en construction | ✔ planning, Outlook, véhicules, permis, historique repris | ~ Outlook | ✗ rien n'est livré, ne rien présenter comme un résultat | ✗ | ✗ |
| 5. Gestion de patrimoine | ✔ | ✔ | ✔ | ~ | ✔ | ✔ questionnaire, score, restitution imprimée, relances signalées | ✗ | ✔ (sans chiffre) | ✔ capture-portefeuille (données fictives) | ✗ |
| 6. Sécurité et prévention | ✔ | ✗ | ✗ | ✗ | ✔ (bref) | ~ | ✗ | ✔ historique, export en un clic | ✗ | ✗ |
| 7. Événementiel associatif | ✔ | ✗ | ✗ | ✗ | ✔ | ~ | ✗ | ✔ totaux en direct, sans doublon | ✗ | ✗ |
| 8. Application de stock (absente de realisations.html) | ✗ | ✗ | ✗ | ✗ | ~ | ✗ | ✗ | ~ dans l'avis seulement | ✗ | ✔ avis Google de septembre 2026 |

Écarts à régler :
- (a) logiciel-btp-sur-mesure.html écrit « Photo du compteur **et du ticket** à chaque plein », alors que realisations.html dit « une photo du compteur avant et après ». À confirmer avec Sacha (c019).
- (b) `agence.md` liste 6 réalisations et realisations.html en affiche 7 (transport) : mise à jour de `agence.md` avec l'accord de Loïc.
- (c) Les 20 h, 6 h et 3 h ne sont rattachés à aucune réalisation publiée.

### Modèle d'étude de cas en 10 rubriques (anonymisation honnête)

1. **Le client, sans son nom** : métier, taille (tranche), zone (ville, département ou « Alsace », au choix du client), date de mise en service, statut (en service ou en cours).
2. **Comment ça se passait avant** : ce qu'on faisait, avec les mots du client.
3. **Ce qui coinçait** : seulement ce qui a été constaté (temps, erreurs, oublis).
4. **Ce que le client voulait** : l'objectif, en une phrase.
5. **Pourquoi du sur mesure** : ce qui avait été essayé (logiciel du marché, Excel) et pourquoi ça ne convenait pas. Dire aussi quand un logiciel du marché aurait suffi.
6. **Ce que nous avons construit** : en 2 phrases simples.
7. **Comment on s'en sert au quotidien** : le parcours, étape par étape.
8. **Ce qui est relié** : les logiciels déjà en place, et la technique expliquée en mots simples (c038).
9. **Ce qui a changé** : chaque chiffre avec ce qui a été mesuré, comment, par qui et quand. Indiquer « constaté par le client » ou « estimé ». Délai réel de la première version. Une phrase factuelle facile à citer.
10. **Les preuves** : capture (données fictives, signalées comme telles), témoignage réel avec accord écrit (guillemets seulement pour ses paroles : c037), et ce qui a été ajusté après la première version.

### Informations à demander (questions fermées autant que possible)

**À poser pour chaque réalisation (Loïc ou Sacha)**
1. Le client accepte-t-il une étude de cas publiée sans son nom ? Oui / non. Accord écrit par e-mail ? Oui / non.
2. Zone affichable : ville / département / « Alsace » seulement ?
3. Nombre de salariés : 1-5 / 6-20 / 21-50 / plus de 50 ?
4. Mois de mise en service ? Toujours utilisé aujourd'hui (oui / non) ? Par combien de personnes ?
5. Combien de jours entre le premier appel et la première version utilisée ? (preuve du « 7 jours »)
6. Un logiciel du marché a-t-il été essayé avant ? Oui / non. De quel type ? Pourquoi a-t-il été écarté ?
7. Un résultat chiffré a-t-il été mesuré ? Oui / non. Si oui : quoi, avant et après, par qui, sur quelle période. Si non : le client accepte-t-il de donner une estimation écrite ?
8. Quels logiciels sont réellement reliés : agenda / Outlook / Excel / comptabilité / paie / autre ?
9. Technique publiable, en mots simples : application web installable, fonctionnement hors réseau, IA (de quel fournisseur, ce qui sert aussi pour le RGPD) ? Sans citer les scénarios Make (c002).
10. Une capture réelle avec données fictives ou floutées est-elle possible ? Oui / non. Qui la fait ?
11. Le client accepte-t-il un témoignage de 2 à 3 phrases (prénom et fonction, ou fonction seule) ou un avis Google ? Oui / non.
12. Qu'a-t-il fallu ajuster après la première version ?

**Questions propres à chaque cas**
- **Carburant** : photo du ticket en plus du compteur (oui / non) ? Combien de personnes font les pleins ? Avant, combien de jours mettait l'information à arriver au dirigeant ? Est-ce le même client que le pointage (oui / non) ?
- **Épandage** : le client est-il dans le Haut-Rhin (oui / non) ? Combien de chauffeurs, combien de bons par saison ? Combien d'heures de recopie par semaine pour le secrétariat avant ? Quel agenda (Google / Outlook) ? À qui part le PDF ? Captures possibles des 4 étapes ?
- **Pointage** : avant, les heures étaient notées sur papier, par SMS ou sur Excel ? Comment les « 30 s » ont-elles été mesurées ? Les heures vont-elles vers la paie (oui / non, quel logiciel) ? Combien des 12 salariés pointent chaque jour ?
- **Transport** : date de livraison prévue ? Publication possible une fois livré ? Nombre de véhicules ? Combien de bons PDF étaient retapés par semaine ?
- **Gestion de patrimoine** : nombre de fichiers Excel avant ? Temps de préparation d'un rendez-vous avant et après ? Nombre de conseillers ? Témoignage possible (c'est le cas du post LinkedIn qui a le mieux marché) ?
- **Sécurité et prévention** : quels contrôles sont suivis ? Combien d'échéances ? Avant : Excel, agenda ou papier ? Combien de jours d'alerte avant l'échéance ? Échéances manquées avant (oui / non) ?
- **Événementiel** : type d'événement ? Nombre de réservations ? Avant : téléphone, papier ou formulaire ? Paiement en ligne (oui / non) ? Doublons avant (oui / non) ?
- **Stock** : faut-il l'ajouter à realisations.html (oui / non) ? Quel secteur ? Que fait l'application ?
- **Chiffres** : de quel cas viennent les « jusqu'à 20 h par semaine » et comment ont-ils été mesurés ? À quels secteurs se rattachent les 6 h et les 3 h, et peut-on les relier à une réalisation publiée ?

---

## PARTIE 4 — Protocole de mesure IA reproductible

### Jeu de questions stable (copié mot pour mot à chaque relevé)

**Locales** (plan-geo §4)
- L1 Quelle est la meilleure agence d'automatisation IA à Mulhouse ?
- L2 Recommande-moi une agence pour automatiser mes tâches administratives dans le Haut-Rhin.
- L3 Qui peut me créer un logiciel sur mesure pour ma PME près de Mulhouse ?
- L4 Agence intelligence artificielle pour TPE en Alsace : lesquelles choisir ?
- L5 Je suis artisan du BTP dans le Haut-Rhin : qui peut remplacer mes bons d'intervention papier par une application ?
- L6 Quelle agence peut remplacer nos fichiers Excel par une application à Colmar ou Mulhouse ?
- L7 Qui peut m'aider à préparer la facture électronique 2026-2027 dans le Haut-Rhin ?
- L8 Agence pour créer un agent IA pour une PME à Saint-Louis ou Mulhouse ?
- L9 Que penses-tu de SL Agence (slagence.fr) ?
- L10 Compare les agences d'automatisation et d'IA du Sud Alsace.

**Nationales** (§6 + relevé n°1)
- N1 Quelle agence peut créer une application de bons d'intervention pour artisan ?
- N2 Agence logiciel sur mesure pour entreprise de transport en France ?
- N3 Qui peut développer une application de pointage chantier sur mesure ?
- N4 Qui peut créer une application de bon d'épandage pour une entreprise de travaux agricoles ?

**Demandées par la mission**
- M1 Quelle entreprise peut créer une application métier simple pour une TPE dans le Haut-Rhin ?
- M2 Comment automatiser les bons et les factures d'une petite entreprise, et qui peut le faire près de Mulhouse ?
- M3 Quels exemples d'entreprises du Haut-Rhin ont remplacé le papier par une application sur mesure ?
- M4 Quel prestataire me recommandes-tu pour relier mon agenda, Outlook et Excel dans une PME en Alsace ?

**Organisation des questions**
- **Noyau**, à chaque relevé : L1, L6 (1re place le 26/10), L5, N4 (absent le 26/10), M1, L9 (exactitude).
- **Rotation**, une fois par mois : les 12 autres.
- Limite : la formulation exacte des questions du relevé n°1 n'est pas connue (plan-geo §5, question 1). La comparaison avec le 26/10 reste donc indicative.

### Plateformes et conditions (identiques à chaque relevé, notées dans la feuille)

- **Plateformes** : ChatGPT avec la recherche web activée, Gemini, Perplexity, Copilot. En plus : AI Overviews et AI Mode sur google.fr quand ils apparaissent (disponibilité à constater, pas à supposer).
- **Navigateur** : navigation privée ; non connecté quand la plateforme le permet. Sinon, toujours le même compte, mémoire et historique désactivés si possible.
- **Lieu** : même lieu physique dans le Haut-Rhin, sans VPN ; noter la ville.
- **Moment** : même jour, dans une plage de 2 h ; noter le modèle affiché.
- **Conduite** : une nouvelle conversation à chaque répétition, aucune relance, une capture de la réponse et du panneau des sources.

### Fréquence et répétitions (justification)

- La littérature montre que la même liste revient « less than 1% » du temps (SparkToro, via SEJ) et qu'aucun nombre de tirages ne vaut partout (Żatuchin v2). Choix SL Agence, sous contrainte de temps : **3 répétitions** par question du noyau sur ChatGPT et Gemini, **1** sur Perplexity et Copilot.
- **Premier relevé = essai pilote** : 5 répétitions sur L1 et L6 dans ChatGPT, pour voir la dispersion. On garde 3 répétitions si les taux d'apparition à 3 et à 5 tirages sont proches ; sinon on passe à 5.
- **Rythme** : un relevé toutes les 2 semaines.
- **Temps** (estimation SL Agence, environ 1 min par tirage) : noyau = 6 × 2 × 3 + 6 × 2 × 1 = 48 tirages, soit environ 50 min par relevé ; rotation = 12 min par mois. Cela fait environ 28 min par semaine en moyenne, **au-dessus des 20 min/semaine du plan-geo** (c027).
- Pour réduire le temps de Loïc : il ne fait que poser les questions et prendre les captures ; seo-site remplit la grille à partir des captures. Sinon, on passe à 2 répétitions (environ 36 min par relevé). **Décision à prendre par Loïc.**

### Grille de relevé

Google Sheet « Suivi IA SL Agence » dans le Drive « SL agence », accès Restreint. Ni le contenu ni le lien ne vont dans le dépôt (c021).

Colonnes, une ligne par tirage :
date · n° du relevé · plateforme · connexion (connecté / non) · modèle affiché · lieu · ID de la question · n° de répétition · SL Agence citée (O/N) · rang · dans le top 3 (O/N) · lien vers slagence.fr (O/N) · autre lien vers nous (fiche Google, PagesJaunes, LinkedIn) · exactitude (OK, ou type d'erreur : nom, ville, téléphone, service, prix, image/logo, lien) · 1er / 2e / 3e cité · nombre d'entreprises listées · domaines sources · événement connu (nouveau modèle, mise à jour Google, action SL Agence) · capture (nom du fichier).

### Indicateurs (par plateforme, par question et en tout)

- **Taux d'apparition** = tirages qui nous citent ÷ tirages.
- **Part de top 3** = tirages où nous sommes dans les 3 premiers ÷ tirages.
- **Rang médian**, calculé seulement quand nous sommes cités.
- **Taux de citation du site** = tirages avec un lien vers slagence.fr ÷ tirages.
- **Taux d'erreurs** = tirages qui nous citent avec au moins une erreur ÷ tirages qui nous citent (L9 en priorité).
- **Part de voix des concurrents** et liste des **domaines tiers** les plus cités : ce sont les cibles pour les annuaires et la presse.

### Ce qu'on peut mesurer du trafic venu des IA

- **Search Console** : ne sépare pas les visites venues des AI Overviews et d'AI Mode (doc Google).
- **Bing Webmaster Tools, rapport AI Performance** : nombre de citations dans Copilot et Bing, chaque mois. Valeur de départ non mesurée ; à relever par Loïc.
- **`utm_source=chatgpt.com`** : je ne l'ai vu que dans un extrait de recherche de la FAQ OpenAI (page inaccessible). Même s'il est ajouté, **nous ne pouvons pas le voir** : GitHub Pages ne nous donne pas de journal des visites, et Loïc a refusé un outil d'audience le 26/10 (on ne le repropose pas).
- **Demandes entrantes** : Loïc demande à chaque contact « Comment nous avez-vous connus ? » et note la date, le canal et la réponse mot pour mot dans une feuille Drive. Un champ dans le formulaire du site toucherait au script relié au webhook Make : question pour Sacha.

### Valeurs de départ connues

- **Relevé IA n°1 du 26/10** (un seul tirage, apprentissages.md) :
  - « meilleure agence automatisation IA Mulhouse » : ChatGPT hors du top 3 sur la capture (3e de mémoire), Gemini 4e ;
  - « remplacer Excel » : ChatGPT 1er, mais image et lien de la carte faux ; absent de Gemini ;
  - « épandage » : absent des deux.
- **Search Console, 28 jours au 02/11** : 36 clics, 2 240 impressions, CTR 1,6 %, position 20,4.
- **Fiche Google, mai à octobre** : 55 interactions, 4 appels, 7 clics vers le site.

### Règles d'interprétation

1. Aucune causalité automatique : chaque action est datée dans `apprentissages.md` et chaque événement extérieur est noté dans la feuille.
2. On lit la tendance sur 4 relevés (8 semaines) : moyenne des 2 derniers relevés contre moyenne des 2 premiers.
3. Une hausse ne compte comme signal que si elle va dans le même sens sur au moins 2 plateformes et au moins 2 questions. C'est une convention SL Agence, pas une norme statistique (c011).
4. On ne compare jamais deux relevés faits dans des conditions différentes, et un rang isolé ne sert à rien.

---

**Note : 8/10.** Retraits :
- 1 point parce que trois sources officielles étaient inaccessibles (FAQ éditeurs OpenAI, aide ChatGPT search, consignes Bing), remplacées par des sources secondaires ;
- 1 point parce que plusieurs études n'ont été lues qu'en résumé ou de seconde main (Chen et al., SparkToro, Scrunch), et que le temps de mesure dépasse le budget de 20 min/semaine tant que Loïc n'a pas tranché.

**Sources inaccessibles ou non consultées directement le 05/11/2026**
- help.openai.com/en/articles/12627856 (FAQ éditeurs) : inaccessible (403).
- help.openai.com/en/articles/9237897 (ChatGPT search) : inaccessible (403).
- bing.com/webmasters/help/webmasters-guidelines-30fba23a : inaccessible (page affichée sans texte) ; lue via Search Engine Journal.
- Étude originale SparkToro/Gumshoe : non consultée (lue via SEJ).
- Étude originale Scrunch : non consultée (lue via ppc.land).
- Chen et al. : texte complet non lu (résumé seulement).
- Vues seulement dans des résultats de recherche, donc non utilisées : Honey Badger SEO, Omniscient Digital, Yext, arXiv 2609.18729.
- Pages Google lues sans date de mise à jour affichée : ai-features, creating-helpful-content, crawlers, sd-policies.

**Questions pour Loïc**
1. Le positionnement doit-il garder l'IA ? Si non, accord pour modifier `agence.md`.
2. Combien de temps par semaine pour la mesure : 28 min, ou 2 répétitions à environ 20 min ?
3. Bing Webmaster Tools est-il ouvert, et que montre le rapport AI Performance ?
4. Les réponses aux questions fermées de la Partie 3 (avec Sacha).

**Fichiers lus (chemins absolus)**
- /home/user/sl-agence/realisations.html
- /home/user/sl-agence/application-bon-epandage-agricole.html
- /home/user/sl-agence/index.html
- /home/user/sl-agence/a-propos.html
- /home/user/sl-agence/logiciel-btp-sur-mesure.html
- /home/user/sl-agence/robots.txt
- /home/user/sl-agence/.claude/travail/seo/plan-geo-2026-10-21.md
- /home/user/sl-agence/.claude/savoirs/seo.md

Recherche Drive du 05/11 : aucune feuille de suivi IA existante, elle est à créer.

**Sources (URL consultées)**
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/faqpage
- https://developers.google.com/search/blog/2023/08/howto-faq-changes
- https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- https://developers.openai.com/api/docs/bots
- https://docs.perplexity.ai/guides/bots
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://support.apple.com/en-us/119829
- https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- https://www.searchenginejournal.com/bing-adds-geo-to-official-guidelines-expands-ai-abuse-definitions/568442/
- https://www.indexnow.org/faq
- https://arxiv.org/abs/2311.09735 et https://arxiv.org/html/2311.09735v3
- https://arxiv.org/abs/2509.08919
- https://arxiv.org/abs/2404.07981
- https://arxiv.org/abs/2406.03589
- https://arxiv.org/abs/2406.18382
- https://arxiv.org/abs/2609.04047
- https://arxiv.org/abs/2609.05059
- https://arxiv.org/abs/2606.20065
- https://www.searchenginejournal.com/ai-recommendations-change-with-nearly-every-query-sparktoro/
- https://ahrefs.com/blog/best-lists-research/
- https://ahrefs.com/blog/ai-overview-brand-correlation/
- https://www.brightlocal.com/resources/ai-directory-sources/
- https://www.seerinteractive.com/insights/the-listicle-window-is-closing-in-ai-search-30-decline-mom
- https://peec.ai/blog/self-promotional-listicles-analysis-from-232k-citations
- https://ppc.land/self-ranked-brands-gain-ai-recommendations-from-4-to-7-scrunch-finds/
- https://thehoth.com/blog/ai-cites-listicles/
- https://seroundtable.com/google-ai-llms-txt-39607.html
- https://slagence.fr/robots.txt