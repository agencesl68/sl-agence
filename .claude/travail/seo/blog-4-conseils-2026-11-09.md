# Blog : les 4 conseils de la vidéo SEO appliqués aux 11 articles (09/11/2026)

Les 4 conseils (résumé fourni par Loïc) : (1) le 1er paragraphe répond tout de suite à la question de la recherche ; (2) title et H1 collent à l'intention ; (3) le format de la page suit ce que Google montre en tête ; (4) Search Console : prioriser les pages et requêtes en positions 6 à 19, sans perdre les requêtes déjà associées.

**Limites à lire avant.** (a) Positions : seul l'export Search Console du 02/11 par **page** (04/10 → 31/10) donne des positions (`ctr-2026-11-02.md`). Il ne donne pas les requêtes de chaque page : « requête principale » = requête supposée d'après le title, le H1 et les relevés de `experiences.md`. (b) Format des résultats : relevé par l'outil de recherche de l'agent, qui **n'est pas Google** (résultats ni localisés ni personnalisés, extraits parfois incomplets) : un signal, pas une preuve. (c) Aucun volume de recherche mesuré.

## ÉTAPE A : diagnostic

### Synthèse (décision par article)

| Article | Position moy. (02/11) | Zone 6-19 | Mesure en cours (source) | Décision |
|---|---|---|---|---|
| `relancer-un-devis-sans-reponse` | 9,2 (643 impr., 2 clics) | oui | test CTR du 19/10, fin 16/11 (`ctr`, `experiences`) | APRÈS 16/11 |
| `comment-relancer-une-facture-poliment` | 5,4 (131 impr., 3 clics) | non (au-dessus) | test CTR du 19/10, fin 16/11 | APRÈS 16/11 |
| `feuille-heures-salaries` | 6,9 (556 impr., 14 clics) | oui | test CTR du 19/10, fin 16/11 | APRÈS 16/11 |
| `limites-excel-entreprise` | 6,1 (20 impr., 0 clic) | oui | lot CTR du 02/11 (title, meta, corps) : J+28 après fusion ; audit GEO §10 : fin ≈ 03/12 (PR 1d) | APRÈS 03/12 |
| `bon-intervention-contenu-modele` | non mesurée | inconnu | page qui porte le lien testé vers `/logiciel-entreprise-travaux-agricoles` (lot CTR du 02/11) ; audit §10 : fin ≈ 30/11 | APRÈS 30/11 |
| `cahier-des-charges-application` | 16,5 (2 impr.) | oui, trop peu de données | création du 30/10 : J+28 ≈ 27/11, verdict article J+56 (`experiences`, `rappels`) | APRÈS 27/11 |
| `logiciel-gestion-transport-parc-engins` | 36,0 (76 impr.) | non | témoin « comparatif » de la création de `/logiciel-transport-sur-mesure` (`experiences` 19/10) ; audit §10 : ≈ 27/11 | APRÈS 27/11 |
| `pointage-chantier-papier-application-sur-mesure` | non mesurée | inconnu | contrôle d'alternance d'URL avec `/application-pointage-chantier` (`experiences` 27/10), J+28 ≈ 27/11 | APRÈS 27/11 |
| `terrassement-heures-engins-carburant` | non mesurée | inconnu | aucune ligne dans `experiences.md` ; l'audit GEO §10 le range dans la mesure « créations 27-30/10 » (≈ 27/11). Prudence retenue (c040/c041). À trancher par le Manager : son propre J+28 serait le 20/11 | APRÈS 27/11 |
| `crm-ou-excel` | non mesurée (page du 02/11) | inconnu | création du 02/11 : impressions 30/11, verdict J+56 = 28/12 ; porte un lien testé (signe 06 de `limites-excel`) | APRÈS 28/12 |
| `facture-electronique-artisan-ce-qui-change` | non mesurée (absente de l'export du 02/11) | inconnu | **aucune** : ni `experiences.md`, ni `rappels-seo.md`, ni `ctr-2026-11-02.md`, ni audit GEO §10. Elle lie `/facture-electronique-tpe` (en test) mais ne porte aucun lien testé | **MODIFIABLE MAINTENANT** |

Constat utile : les articles dont le 1er paragraphe n'est pas une réponse directe (devis, facture, feuille d'heures, limites Excel, transport, bon d'intervention) sont justement ceux en mesure. Les 5 articles hors de ce cas (facture électronique, cahier des charges, pointage, CRM ou Excel, terrassement) répondent déjà dans leur 1er paragraphe.

### Détail par article

**1. `/blog/relancer-un-devis-sans-reponse`** : requête principale visée : « relancer un devis sans réponse » (pos. 9,2).
- Conseil 1 : NON. « Vous avez envoyé un devis, le client semblait intéressé, et depuis : plus rien. C'est la situation la plus frustrante du commercial, et l'une des plus coûteuses. » La réponse (J+7, J+10…) arrive dans l'encadré « En bref », 3e bloc.
- Conseil 2 : title « Relancer un devis sans réponse : 8 mails et SMS | SL Agence » (59 car.), H1 « Relancer un devis sans réponse : quand relancer et 8 modèles à copier. » (70 car.). Adéquation : bonne sur le sujet ; le title ne dit pas « modèles » ni « gratuit » (voir Variante A préparée dans `ctr-2026-11-02.md`).
- Conseil 3 : en tête (WebSearch, pas Google) : modèles d'e-mails (modele-lettre-gratuit, HubSpot « 26 exemples d'e-mails »), guides avec calendrier (Effy, Obat, Sellsy), offres de service (ComeUp). Format observé = guide + modèles à copier ; l'article y correspond déjà.
- Conseil 4 : oui (9,2). Priorité n° 1 (29 % des impressions).
- Mesure en cours : test 19/10 → 16/11. Décision : **APRÈS 16/11**.

**2. `/blog/comment-relancer-une-facture-poliment`** : « comment faire un rappel de paiement poliment » (GSC 26/10 : pos. 21, 1 clic) ; position de page 5,4.
- Conseil 1 : NON. « Relancer un client pour une facture impayée met souvent mal à l'aise. On a peur d'abîmer la relation, alors on attend. »
- Conseil 2 : title « Rappel de paiement poli : 6 modèles de relance | SL Agence » (58), H1 « Comment relancer une facture poliment : calendrier et 6 modèles prêts à copier. » (79). Adéquation : bonne (H1 = requête exacte, title = requête réelle de la Search Console).
- Conseil 3 : en tête : guides (Legalstart, Agicap, Pennylane), lettres types (Obat, independant.io). Format = guide + modèles ; correspond.
- Conseil 4 : non (5,4, au-dessus de la zone). Mesure : 19/10 → 16/11. Décision : **APRÈS 16/11**.

**3. `/blog/feuille-heures-salaries`** : « feuille d'heures salarié modèle » (pos. 6,9).
- Conseil 1 : NON. « Le vendredi, les feuilles d'heures reviennent froissées, incomplètes ou pas du tout. Il faut relancer, deviner, recompter. »
- Conseil 2 : title « Feuille d'heures salarié : modèle Excel et PDF gratuit » (54), H1 « Feuille d'heures des salariés : ce que dit la loi, et comment la tenir sans y passer vos soirées. » (97, long). Adéquation : title bonne ; H1 plus éditorial que la requête.
- Conseil 3 : en tête : pages de modèles à télécharger (Skello, Factorial, Absentify, Clockify, Ordio), mention Excel/PDF. L'article a déjà le modèle ; correspond.
- Conseil 4 : oui (6,9). Mesure : 19/10 → 16/11. Décision : **APRÈS 16/11**.

**4. `/blog/limites-excel-entreprise`** : « limites d'Excel en entreprise » / « Excel ne suffit plus » (pos. 6,1, 20 impr.).
- Conseil 1 : NON. « Lundi, 8h40. Un client appelle pour faire le point sur son dossier. Vous ouvrez le dossier « Clients », puis celui de l'année… » (récit).
- Conseil 2 : title « Limites d'Excel en entreprise : 7 signes et un test » (51), H1 « Excel ne suffit plus dans votre entreprise ? 7 signes qui ne trompent pas. » (74). Title et H1 ouvrent sur deux formulations ; la requête réelle n'est pas connue (conseil 4).
- Conseil 3 : en tête (WebSearch) : surtout des pages techniques en anglais sur les limites de lignes et de colonnes d'Excel, peu de guides français « signes pour changer d'outil » : format de l'article (liste de signes + test) sans équivalent observé ; l'intention des deux requêtes n'est pas la même (limites techniques / quand changer d'outil), à vérifier dans les requêtes réelles.
- Conseil 4 : oui (6,1). Mesure : lot CTR du 02/11 (title, meta, corps). Décision : **APRÈS 03/12**.

**5. `/blog/bon-intervention-contenu-modele`** : « modèle bon d'intervention gratuit ».
- Conseil 1 : PARTIEL. « Le bon d'intervention, c'est la feuille que le technicien fait signer avant de repartir. On la remplit vite, sur le capot du camion, et on n'y repense plus. » La définition est donnée, pas la réponse « ce qu'il contient + modèle ».
- Conseil 2 : title « Modèle de bon d'intervention gratuit (Word, PDF) | SL Agence » (60), H1 « Bon d'intervention : ce qu'il doit contenir, et un modèle gratuit à télécharger. » (80). Adéquation : bonne.
- Conseil 3 : la recherche n'a trouvé aucun modèle de bon d'intervention en tête (résultats hors sujet : lettres types, bons de commande) : **format de tête non observé**, pas de conclusion.
- Conseil 4 : position non mesurée. Mesure : lien testé vers travaux agricoles, fin ≈ 30/11. Décision : **APRÈS 30/11**.

**6. `/blog/cahier-des-charges-application`** : « cahier des charges application » (pos. 16,5 sur 2 impressions).
- Conseil 1 : OUI. « Pour une PME, 1 page suffit pour démarrer un cahier des charges d'application, selon nous. Elle répond à 7 questions : l'objectif, les utilisateurs, les écrans, les données, les outils à relier, les lieux d'usage et la priorité de la version 1. »
- Conseil 2 : title « Cahier des charges application : modèle 1 page gratuit » (54), H1 (81) « Cahier des charges d'une application : le modèle simple, en 1 page, pour une PME. » Adéquation : bonne.
- Conseil 3 : en tête : modèles téléchargeables (La Fabrique du Net web et mobile, ClickUp) et guides à 12 rubriques (Kolonell). Format = modèle + guide ; correspond (modèle 1 page + exemple).
- Conseil 4 : trop peu de données. Mesure : J+28 ≈ 27/11. Décision : **APRÈS 27/11** (aucune réécriture à prévoir).

**7. `/blog/logiciel-gestion-transport-parc-engins`** : « logiciel gestion transport parc engins » (pos. 36,0).
- Conseil 1 : NON. « 7h15, au bureau. 3 bons de commande sont arrivés par mail pendant la nuit, en PDF. Il faut les ouvrir, les retaper dans le logiciel… »
- Conseil 2 : title « Logiciel transport et parc d'engins : comparatif | SL Agence » (60), H1 « Logiciel de gestion transport et parc d'engins : Excel, logiciel du marché ou sur mesure ? » (90). Adéquation : bonne.
- Conseil 3 : en tête : guides « lequel choisir » (La Fabrique du Net), annuaires de logiciels (Capterra, GetApp). Format = comparatif ; correspond.
- Conseil 4 : non (36). Mesure : témoin du 19/10, ≈ 27/11. Décision : **APRÈS 27/11**.

**8. `/blog/pointage-chantier-papier-application-sur-mesure`** : « pointage chantier papier ou application » (non mesurée).
- Conseil 1 : OUI. « Pour pointer les heures de vos équipes sur chantier, la loi ne vous impose aucun outil. Papier, tableur, application ou outil sur mesure sont permis, à condition que le décompte soit fiable. »
- Conseil 2 : title « Pointage chantier : papier, appli ou sur mesure | SL Agence » (59), H1 (70) « Pointage des heures sur chantier : papier, application ou sur mesure ? » Adéquation : bonne.
- Conseil 3 : en tête : pages éditeurs « application de pointage chantier » (Skello, Kolonell, ContractorPlus) : intention plus commerciale que le comparatif de l'article ; c'est le but du contrôle d'alternance avec la page produit.
- Conseil 4 : inconnu. Mesure : 27/10, ≈ 27/11. Décision : **APRÈS 27/11**.

**9. `/blog/terrassement-heures-engins-carburant`** : « suivi heures engins carburant terrassement » (non mesurée).
- Conseil 1 : OUI, long. « Sur un chantier de terrassement, les coûts cachés ne viennent pas des machines. Ils viennent de ce qui est noté 2 fois : l'heure écrite sur une feuille puis retapée, le plein noté sur un ticket puis rapproché, le bon rempli à la main puis saisi au bureau. »
- Conseil 2 : title « Terrassement : heures, engins et carburant | SL Agence » (54), H1 « Terrassement : les coûts cachés des heures, des engins et du carburant » (70). Adéquation : correcte, sans mot « suivi » ni « logiciel ».
- Conseil 3 : en tête : fiches FNTP sur la télématique, guides de logiciels BTP (La Fabrique du Net, ContractorPlus) ; très peu de guides pratiques. Format de l'article (tableau + cas réels) sans équivalent direct.
- Conseil 4 : inconnu. Décision : **APRÈS 27/11** (voir réserve dans la synthèse).

**10. `/blog/crm-ou-excel`** : « CRM ou Excel TPE » (non mesurée, page du 02/11).
- Conseil 1 : OUI. « Notre avis. Excel suffit tant que 1 ou 2 personnes tiennent le fichier et qu'aucune relance ne s'oublie. Un CRM devient plus sûr quand plusieurs personnes suivent les mêmes clients ou des devis en cours. »
- Conseil 2 : title « CRM ou Excel : que choisir en TPE ? Modèle Excel gratuit » (56), H1 (91) très proche de la requête. Adéquation : bonne.
- Conseil 3 : en tête : comparatifs CRM vs Excel (Appvizer, Capterra, Efficy, Breakcold), CRM pour TPE (La Fabrique du Net, independant.io). Correspond ; le modèle gratuit est un plus.
- Conseil 4 : inconnu. Mesure : 30/11 (impressions), verdict 28/12. Décision : **APRÈS 28/12**.

**11. `/blog/facture-electronique-artisan-ce-qui-change`** : « facture électronique artisan » (non mesurée).
- Conseil 1 : OUI, déjà direct. « Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. Pour les artisans, les TPE et les micro-entreprises, l'obligation d'en émettre arrive le 1er septembre 2027. » Suivi d'un encadré « En bref ». **Pas de réécriture** (modifier une réponse déjà bonne n'apporterait rien).
- Conseil 2 : title « Facture électronique artisan : ce qui change | SL Agence » (56), H1 « Facture électronique : ce qui change pour les artisans et TPE. » (62). Adéquation bonne (sujet + « ce qui change »). Les titles concurrents ajoutent « en 2026 et 2027 » (Abby, Habitat Presto) : piste **non appliquée** (adéquation non mauvaise, aucune donnée de position) ; à reprendre si l'export Requêtes montre des impressions.
- Conseil 3 : en tête : guides d'artisans à dates (Abby, CAPEB, Indy, FFB). L'article a déjà la frise des dates et le tableau « votre situation » : correspond.
- Conseil 4 : inconnu. Mesure : aucune. Décision : **MODIFIABLE MAINTENANT**.

## ÉTAPE B : mise en œuvre (articles MODIFIABLES MAINTENANT)

Un seul article : `blog/facture-electronique-artisan-ce-qui-change.html`. Conseils 1, 2 et 3 : rien à changer (1er paragraphe déjà direct, adéquation title/H1 non mauvaise, format aligné). Corrigé au passage (c024, c038) : « rendra les ressaisies plus visibles » → « rendra plus visible tout ce que vous retapez à la main » ; « vous fait ressaisir à la main » → « vous oblige à retaper à la main ». Quantités en chiffres : rien à corriger. Non touché : l'extrait de la carte « À lire aussi » (« ressaisies »), qui reprend la description d'un article en mesure.
`dateModified`, « Mis à jour le » (19 octobre), `lastmod` du sitemap et `feed.xml` : **non changés**, car la règle c042 exclut les retouches de forme (2 mots remplacés, sens et contenu identiques). Le JSON-LD (BlogPosting, FAQPage, BreadcrumbList) est inchangé et valide.

### Textes prêts à appliquer à la date du verdict (aucun fichier HTML touché)

Chaque nouveau 1er paragraphe ne reprend que des faits déjà dans l'article (c019, c028, c034) ; le texte actuel du 1er paragraphe est conservé juste en dessous comme 2e paragraphe. À l'application : mettre à jour `dateModified`, « Mis à jour le », `lastmod` du sitemap et `feed.xml` (c042) et relire l'article en entier (c024).

**Après 16/11, `relancer-un-devis-sans-reponse`**
> Pour relancer un devis sans réponse : vérifiez la bonne réception à J+2, relancez par mail à J+7, appelez à J+10, puis relancez à J+15 avec un argument nouveau. Au bout d'un mois, à J+30, un message de clôture invite le client à se positionner, sans pression. Voici quoi dire selon la situation du client, avec 8 modèles de mail et de SMS à copier.

Title / H1 : si le verdict du test du 19/10 est **gagné**, ne rien changer. Si **neutre ou perdu**, appliquer la Variante A déjà préparée dans `ctr-2026-11-02.md` (« Relancer un devis sans réponse : 8 modèles gratuits », 51 car.), après vérification des requêtes réelles ; H1 inchangé.

**Après 16/11, `comment-relancer-une-facture-poliment`**
> Relancez dès le lendemain de la date d'échéance : la loi n'impose aucun délai minimum, et le plus souvent votre client a simplement oublié. Le calendrier conseillé : rappel amical à J-3, relance courtoise à J+1, relance ferme à J+10, dernier rappel à J+20, puis mise en demeure à J+30. Voici les 6 modèles à copier et les mots pour le dire poliment.

Title / H1 : aucun changement (requête réelle et H1 alignés).

**Après 16/11, `feuille-heures-salaries`**
> Une feuille d'heures est obligatoire dès que les horaires varient d'un salarié à l'autre (chantiers, tournées, interventions) : l'article D3171-8 du Code du travail impose alors un décompte chaque jour et un récapitulatif chaque semaine, par tous moyens (papier, tableur, badgeuse ou application). Si tout le monde suit le même horaire collectif affiché, il suffit, mais dès qu'un salarié fait des heures en plus, il faut pouvoir les compter. Voici ce qu'elle doit contenir, combien de temps la garder, et un modèle gratuit en Excel ou PDF.

Title : aucun changement. H1 : option « Feuille d'heures des salariés : ce que dit la loi, et un modèle gratuit. » (72 car., comptés par script) si l'export Requêtes confirme « modèle » comme requête ; sinon inchangé.

**Après 30/11, `bon-intervention-contenu-modele`**
> Le bon d'intervention est la feuille que le technicien fait signer avant de repartir : il prouve qu'une prestation a eu lieu, ce qui a été fait, en combien de temps et avec quel matériel. Aucun texte général ne l'impose ni ne fixe de modèle précis, mais ce qui n'est pas sur le bon est rarement facturé. Voici la liste de ce qu'il doit contenir et un modèle gratuit à télécharger, en Word ou en PDF.

Title / H1 : aucun changement.

**Après 03/12, `limites-excel-entreprise`**
> Excel ne suffit plus quand vous vous reconnaissez dans au moins 3 des 7 signes de cet article : plusieurs versions du même fichier, des informations tapées 2 fois, des erreurs de formule que personne ne voit. Dans ce cas, il vous coûte probablement plus de temps qu'il ne vous en fait gagner. Voici les 7 signes, un test pour vous situer et par où commencer sans tout remplacer.

Title / H1 : décider avec l'export Requêtes de la page. Si la requête principale est « excel ne suffit plus » : title « Excel ne suffit plus ? 7 signes et un test » ; si c'est « limites excel » : garder le title actuel et aligner le H1 (« Les limites d'Excel en entreprise : 7 signes qui ne trompent pas »). Compter par script avant d'appliquer ; ne pas reprendre « remplacer Excel » (c033, `/remplacer-excel`).

**Après 27/11, `logiciel-gestion-transport-parc-engins`**
> Le bon logiciel de gestion transport n'est ni forcément le plus connu, ni le plus cher : c'est celui qui évite de retaper les mêmes informations. Excel suffit au démarrage, un logiciel du marché convient si votre activité est standard, et le sur mesure devient rentable dès que vous passez plus de temps à contourner l'outil qu'à l'utiliser. Voici le comparatif pour une entreprise de transport routier, de terrassement ou de location d'engins.

Title / H1 : aucun changement.

**Articles sans réécriture à prévoir** : `cahier-des-charges-application`, `pointage-chantier-papier-application-sur-mesure`, `crm-ou-excel` (1er paragraphe déjà direct). `terrassement-heures-engins-carburant` : le 1er paragraphe répond déjà ; optionnel après 27/11 : retirer « ne viennent pas des machines » pour raccourcir. Ne pas toucher leurs titles avant verdict.

## ÉTAPE C : conseil 4, demande précise à Loïc (10 min, une fois)

1. Search Console > Performances > Résultats de recherche, période **3 derniers mois**, type de recherche Web.
2. Onglet **Pages** : exporter (CSV ou capture avec colonnes Clics, Impressions, CTR, Position moyenne) pour les 11 articles de `/blog/`.
3. Pour chaque article, cliquer sa ligne (filtre « Page »), onglet **Requêtes** : relever **toutes** les requêtes avec Impressions et **Position moyenne** (au minimum les 10 premières par impressions). Priorité : `relancer-un-devis-sans-reponse`, `feuille-heures-salaries`, `limites-excel-entreprise`, `comment-relancer-une-facture-poliment`.
4. Déposer le tout dans le Drive, dossier « SL agence/SEO », nom « blog-requetes-2026-MM-JJ » (accès Restreint, aucun lien dans le dépôt, c021). À faire **juste avant le 16/11** pour servir aussi au verdict des titles, puis après le 30/11 pour les autres articles.

Utilisation : (a) on fige pour chaque page la liste des requêtes qui lui apportent déjà des clics et des impressions : tout nouveau title, H1 ou 1er paragraphe doit les **garder** (pas de perte de trafic existant) ; (b) on classe les requêtes en positions 6 à 19 : ce sont celles où une réponse plus directe ou un title plus précis peut faire passer en 1re page ou gagner des clics ; (c) on vérifie qu'une requête n'est pas déjà tenue par une autre page (c033) ; (d) on remplace « requête supposée » par « requête réelle » dans ce fichier et dans `experiences.md`, et on tranche les titles et H1 « à décider » ci-dessus.
