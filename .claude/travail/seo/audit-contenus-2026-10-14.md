# Audit des contenus + stratégie par métier — slagence.fr — 2026-10-14

> Agent `seo-site`. Audit demandé explicitement par Loïc (la correction c001 ne s'applique pas à la partie audit).
> Aucun fichier du site modifié. Aucune donnée personnelle (c004) : ni nom de client, ni nom d'avis, ni téléphone.
> Aucun appel Ahrefs (c008). Toute « absence » ci-dessous a été vérifiée par Grep sur le dépôt ET par comparaison avec la version en ligne (c007).
>
> **L'action qui aura probablement le plus d'impact maintenant : publier les deux pages locales (Mulhouse, Saint-Louis) en les liant depuis `/logiciel-btp-sur-mesure`, et corriger le maillage des 2 pages de service les moins reliées.** Il n'existe aujourd'hui aucune page locale par ville, le créneau « application / logiciel sur mesure + ville » est peu disputé (benchmark veille du 14/10), et les pages sont jeunes : plus tôt elles sont indexées, plus tôt on mesure.

## 0. Méthode et limites (à lire)

- **Inventaire** : script Python sur les fichiers du dépôt (branche à jour de `main`, dernier commit = fusion PR #8 du 12/10). Contrôle de concordance : les pages en ligne `/realisations` et `/blog/logiciel-gestion-transport-parc-engins` ont la même empreinte (md5) que les fichiers du dépôt ; toutes les URL testées répondent 200 ; `www` → 301.
- **Mots** = mots du corps hors en-tête, menu, pied de page, scripts (FAQ et sources comptées). **Liens contextuels** = liens placés dans le contenu (hors menu / pied de page, qui sont identiques partout).
- **Volumes : aucun chiffre de volume de recherche n'est donné.** Le niveau relatif (fort / moyen / faible) vient de la saisie semi-automatique Google (API publique de suggestion, ~100 requêtes ponctuelles, France, français) : une requête qui apparaît en suggestion existe et est cherchée ; une requête sans suggestion est rare ou inexistante. **Ce n'est pas un volume**, c'est un indice d'existence et d'ordre de grandeur. Ordre d'affichage des suggestions = popularité approximative.
- **Non obtenus** : « Autres questions posées » et « Recherches associées » (non accessibles par nos outils : le benchmark veille le dit aussi), Google Trends (page JavaScript, non récupérable), Keyword Planner (non ouvert). Les FAQ proposées viennent donc des FAQ réelles des pages gagnantes (benchmark) et des suggestions. **À recouper à la main par Loïc : 3 min par requête dans Google (checklist en fin de fichier).**
- **Indexation** : la recherche `site:slagence.fr` n'est pas interprétée par l'outil de recherche de l'agent (résultats sans rapport) : **état d'indexation non vérifiable ici**. Seule vérité : Search Console (rapport « Pages »). Constat d'octobre (0 page visible) non confirmé ni infirmé. Signal positif : la fiche Google existe désormais (lien « Voir notre fiche Google » sur `/realisations` et l'accueil, 2 avis Google affichés sur l'accueil).

## 1. Inventaire à jour (2026-10-14) — 18 URL indexables + 404

Légende : T = longueur du title, M = longueur de la meta, Mots = mots du corps, H2/H3 = nombre, Schéma = JSON-LD, In = pages qui lient (menu et pied compris) / In ctx = pages qui lient depuis le contenu. Tous : 1 seul H1, canonical, robots `index, follow, max-image-preview:large`, og:image présent.

### 1.1 Pages du site

| URL | Mot-clé principal visé (déduit du title) | Title (T) | H1 | M | Mots | H2 / H3 | Schéma | In / In ctx |
|---|---|---|---|---|---|---|---|---|
| `/` ⚠ généré depuis `template.html` hors dépôt | automatisation / logiciel sur mesure Mulhouse | Automatisation et logiciel sur mesure à Mulhouse \| SL Agence (60) | Automatisation et logiciel sur mesure à Mulhouse | 152 | 1 713 | 11 / 14 | ProfessionalService (+geo, areaServed), WebSite, VideoObject | 17 / 17 |
| `/automatisation-taches-administratives` | automatisation tâches administratives | Automatisation des tâches administratives \| SL Agence Mulhouse (**62**) | Automatisation des tâches administratives pour TPE et PME. | 158 | 1 133 | 7 / 10 | Service, FAQPage, BreadcrumbList | 17 / 10 |
| `/logiciel-sur-mesure` | logiciel sur mesure prix | Logiciel sur mesure : prix et méthode \| SL Agence Mulhouse (58) | Logiciel sur mesure pour TPE et PME : prix, délais et méthode. | 151 | 1 077 | 7 / 13 | idem | 17 / 5 |
| `/logiciel-btp-sur-mesure` | logiciel BTP sur mesure Alsace | Logiciel BTP sur mesure en Alsace \| SL Agence Mulhouse (54) | Logiciel et application de chantier sur mesure pour le BTP. | 148 | 1 268 | 7 / 14 | idem (areaServed 12 lieux) | 14 / **3** |
| `/bon-intervention-numerique` | bon d'intervention numérique | Bon d'intervention numérique sur mesure \| SL Agence Mulhouse (60) | Bon d'intervention numérique, signé sur téléphone. | 149 | 912 | 6 / 10 | idem | 17 / 8 |
| `/remplacer-excel` | remplacer Excel application | Remplacer Excel par une application sur mesure \| SL Agence Mulhouse (**67**) | Remplacer Excel par une application faite pour votre entreprise. | 145 | 934 | 6 / 10 | idem | 17 / 10 |
| `/relance-factures-automatique` | relance automatique factures | Relance automatique de factures pour TPE et PME \| SL Agence (59) | Relance automatique de factures : plus aucun impayé oublié. | 159 | 1 114 | 6 / 10 | idem | 17 / 8 |
| `/agent-ia-pme` | agent IA PME | Agent IA et automatisation IA pour PME \| SL Agence Mulhouse (59) | Agents IA et automatisation IA pour les PME. | 139 | 1 179 | 6 / 13 | idem | 17 / 5 |
| `/facture-electronique-tpe` | facture électronique TPE | Facture électronique TPE et PME : se préparer \| SL Agence (57) | Facture électronique : préparer votre TPE ou PME, sans stress. | 139 | 852 | 5 / 8 | idem | 17 / **1** |
| `/realisations` (nouvelle) | réalisations (page de preuve, pas de mot-clé cible) | Réalisations : outils sur mesure en Alsace \| SL Agence (54) | Nos réalisations : des outils en service chez des entreprises d'Alsace. | 140 | 824 | 4 / 7 | CollectionPage, BreadcrumbList | 17 / 8 |
| `/blog/` | blog automatisation gestion TPE | Blog : automatisation et gestion pour TPE et PME \| SL Agence (60) | Gagner du temps dans votre entreprise, concrètement. | 154 | 340 | 6 / 0 | Blog | 17 / 8 |
| `/404` | — | noindex (correct) | — | — | — | — | — | — |

### 1.2 Articles de blog (6) — auteur Loïc Bitsch (Person) sur tous

| URL | Mot-clé principal | Title (T) | M | Mots | H2 / H3 | Images (alt) | In ctx | Publié / maj |
|---|---|---|---|---|---|---|---|---|
| `/blog/logiciel-gestion-transport-parc-engins` | logiciel gestion transport / parc d'engins | Logiciel transport et parc d'engins : lequel choisir ? (**66**) | 150 | 2 373 | 8 / 23 | OG seulement | 9 | 10/10, maj 12/10 |
| `/blog/limites-excel-entreprise` | Excel ne suffit plus | Excel ne suffit plus ? 7 signes à repérer (53) | 137 | 2 227 | 7 / 15 | OG seulement | 9 | 05/10 |
| `/blog/bon-intervention-contenu-modele` (nouveau) | modèle bon d'intervention (Word, PDF) | Modèle de bon d'intervention gratuit (Word, PDF) (60) | 158 | 1 712 | 8 / 9 | 2 WebP, alt descriptifs | 7 | 02/10 |
| `/blog/feuille-heures-salaries` (nouveau) | feuille d'heures salarié modèle Excel | Feuille d'heures : obligations et modèle Excel gratuit (**66**) | 148 | 1 479 | 8 / 5 | 2 WebP, alt descriptifs | 6 | 02/10 |
| `/blog/relancer-un-devis-sans-reponse` | relancer un devis sans réponse | Relancer un devis sans réponse : 8 modèles à copier (**63**) | 142 | 2 051 | 8 / 7 | 2 WebP | 7 | 30/09 |
| `/blog/comment-relancer-une-facture-poliment` | relancer une facture poliment | Relancer une facture poliment : 6 modèles à copier (**62**) | 144 | 2 428 | 9 / 11 | 2 WebP | 9 | 30/09 |

Tous les 6 : BlogPosting + FAQPage + BreadcrumbList, `og:image` 1200x630, `article:published_time` / `modified_time`, fil d'Ariane, sommaire, bloc « En bref », encart CTA, FAQ, « À lire aussi », encadré auteur. Aussi dans le dépôt : `blog/feed.xml` (RSS), `llms.txt` (à jour : 8 services, réalisations, 6 guides), 6 modèles téléchargeables dans `/modeles/` (PDF, Word, Excel ; hors sitemap, c'est normal).

Lecture rapide de l'inventaire : titles > 60 caractères = **6** (62, 62, 63, 66, 66, 67). Metas : toutes entre 137 et 159 ; **3 dépassent 155** (158, 158, 159) mais restent sous 160. Aucun title ni H1 dupliqué. Aucune image sans `alt` (accueil : 6, réalisations : 1, remplacer-excel : 1, 3 articles : 2 chacun).

## 2. Le « gabarit maison » d'un article (tel qu'il existe réellement)

Source : `blog/logiciel-gestion-transport-parc-engins.html` (le plus abouti), confirmé sur les 5 autres. Fichier HTML autonome (CSS intégré ~800 lignes + polices Geist locales), sans framework.

**Balisage du `<head>`** : `title` ; `meta description` ; `robots` ; `theme-color #070907` ; `canonical` sans `.html` ; `link rel=alternate` RSS ; `og:type=article`, `og:locale`, `og:site_name`, `og:title`, `og:description`, `og:url`, `article:published_time` / `modified_time` (AAAA-MM-JJ), `article:author` (LinkedIn de Loïc), `article:publisher`, `og:image` (+ width 1200, height 630, alt), `twitter:card summary_large_image`, `twitter:image` ; favicons ; **3 blocs JSON-LD** : `BlogPosting` (`@id` `…#article`, headline, description, image ImageObject, datePublished, dateModified, `articleSection`, `wordCount`, author = Person « Loïc Bitsch » `@id` `https://slagence.fr/#loic` avec `sameAs` LinkedIn et `knowsAbout`, publisher = Organization `@id …/#organisation`, `mainEntityOfPage`, `isPartOf` Blog) ; `FAQPage` (Question/Answer en texte brut) ; `BreadcrumbList` (Accueil > Blog > article).

**Corps** (`<body>` → `<main id="contenu">`) :
1. Lien d'évitement, en-tête commun, panneau de menu (7 entrées), pied de page commun (liens services, fiche Google, mentions : entrepreneur individuel, SIRET, hébergeur).
2. `<section class="hero hero--page">` : fil d'Ariane (`p.ariane`), pastille (`p.pill`, thème), **H1** (`h1.titre-l`), chapô (`p.lead`), ligne `p.article-meta` (« Par Loïc Bitsch, associé de SL Agence · Publié le … · Mis à jour le … · N min de lecture »).
3. `<section class="section article"><div class="wrap"><div class="article-wrap">` :
   - `p.maj` (« Mis à jour le … ») ;
   - `nav.sommaire` (liste ordonnée d'ancres, une par H2) ;
   - **Introduction** : 2 à 3 paragraphes sans titre (scène vécue, puis constat) ;
   - `div.modele.bref` « En bref » (réponse directe en 2-3 phrases) ;
   - **H2 avec `id`** (ancre) : 7 à 9 par article ; **H3** numérotés avec `<span class="num">01</span>` pour les listes de signes ; `p.signal` (« Signal d'alerte ») après chaque signe ;
   - composants selon le sujet : `div.test` (cases à cocher + score, petit script en fin de page), `div.table-wrap > table.options` (comparatif Excel / marché / sur mesure), `div.avant-apres` (colonnes `aa avant` / `aa apres`), `div.frise.f4` (méthode en 4 étapes, `etape-f`), `div.stats-duo` / `stat`, `figure > img` WebP (`width`, `height`, `loading=lazy`, `decoding=async`, `alt` descriptif) ;
   - `div.encart` (titre + texte + `a.btn.btn-plein` « Réserver mon appel de 15 minutes » vers l'agenda Google, `target=_blank rel=noopener`) ;
   - `<h2 id="faq">Questions fréquentes</h2>` : 8 à 10 questions en H3 + réponse courte (mêmes textes que le JSON-LD, apostrophes encodées `&#x27;`) ;
   - `<h3>Sources</h3>` + `ul.sources` (liens externes `rel=noopener`) pour tout fait réglementaire ;
   - `div.guides` « À lire aussi » (2 cartes `a.guide`) ;
   - `aside.auteur#auteur` (« Écrit par Loïc Bitsch », rôle, 2-3 phrases, LinkedIn, Réalisations, téléphone).
4. Images de partage : `/blog/og-<slug>.png` (1200x630) ou `/img/og/<slug>.png`; visuels internes `/img/blog/<nom>.webp`.
5. Hors fichier : ajout au `sitemap.xml` (priorité 0.7, `lastmod`, `image:image`), à `blog/index.html` (carte + JSON-LD Blog), à `blog/feed.xml`, à `llms.txt`.

**Écarts avec la structure demandée par Loïc** (introduction, 4-5 parties, conclusion complète, FAQ) — constatés par Grep (aucun H2 « Conclusion », « En résumé » ni « À retenir » dans les 6 articles, hormis 1 occurrence du mot dans `feuille-heures-salaries`) :
- **Il n'y a pas de vraie conclusion** : l'article se termine par « Par où commencer » puis l'encart CTA. À ajouter dans le gabarit : un H2 « En conclusion » (4 à 6 phrases : réponse à la question de départ, les 2-3 décisions à retenir, le premier geste concret) placé juste avant l'encart. Les articles actuels ont 7 à 9 H2 : c'est plus que « 4-5 parties » ; pour les nouveaux, viser **5 parties + conclusion + FAQ**.
- L'introduction n'a pas de titre (normal) ; le bloc « En bref » fait office de réponse directe.
- Auteur nommé, dates visibles, sources : conformes au manuel.

## 3. Problèmes trouvés (chacun vérifié)

| # | Problème | Où (vérifié) | Gravité | Correction proposée |
|---|---|---|---|---|
| P1 | **Aucune page locale par ville** (le seul ancrage local est la section « Automatisation d'entreprise à Mulhouse et dans le Haut-Rhin » de l'accueil, répétée à l'identique sur `/automatisation-taches-administratives`, et la liste de villes de `/logiciel-btp-sur-mesure`). Les concurrents (S MEDIA, Quadia, Synapze) publient des pages Mulhouse / Colmar / Haut-Rhin | Grep « Saint-Louis » : 10 pages le citent en liste, aucune page n'y est consacrée | élevée | Les 2 pages du jour (§6) |
| P2 | **H2 identique sur 2 pages** : « Automatisation d'entreprise à Mulhouse et dans le Haut-Rhin. » (accueil et `/automatisation-taches-administratives`) | sortie du script H2 | moyenne (cannibalisation locale légère) | Reformuler le H2 de la page de service (« Où nous intervenons pour automatiser vos tâches administratives ») ; l'accueil étant généré (template hors dépôt), ne toucher que la page de service |
| P3 | **Cannibalisation possible sur « logiciel sur mesure Mulhouse »** : accueil (title) et `/logiciel-sur-mesure` (title « … Mulhouse ») | titles | moyenne | Garder l'accueil sur « automatisation + logiciel sur mesure Mulhouse », `/logiciel-sur-mesure` sur « prix ». Les nouvelles pages ville visent « application métier + ville » (pas « logiciel sur mesure + ville ») : voir §5 |
| P4 | **Autres chevauchements surveillés (faibles)** : `/bon-intervention-numerique` (service) vs `/blog/bon-intervention-contenu-modele` (modèle gratuit) ; `/remplacer-excel` vs `/blog/limites-excel-entreprise` ; `/relance-factures-automatique` vs 2 articles de relance | titles / H1 | faible | Intentions différentes (acheter / s'informer). Vérifier dans Search Console qu'une seule URL ressort par requête |
| P5 | **Pages de service peu reliées depuis le contenu** : `/facture-electronique-tpe` = 1 seule page qui la lie dans son contenu (`/relance-factures-automatique`) ; `/logiciel-btp-sur-mesure` = 3 (article transport, bon d'intervention, réalisations) ; aucun article ne lie la page facture électronique ; `/logiciel-sur-mesure` = 5 | colonne « In ctx » | moyenne | 1 lien contextuel depuis `/automatisation-taches-administratives`, `/remplacer-excel`, `/agent-ia-pme`, 2 articles de relance (facture électronique) ; et vers `/logiciel-btp-sur-mesure` depuis `/logiciel-sur-mesure`, `/remplacer-excel` et `/blog/feuille-heures-salaries` |
| P6 | **Pas de page orpheline au sens strict** : toutes les pages sont dans le menu / pied de page et le sitemap (18 entrées). `/modeles/*` et `feed.xml` hors sitemap : normal | sitemap, liens | — | — |
| P7 | **6 titles > 60 caractères** (voir §1) : risque de coupure dans les résultats | titles | faible | Réécritures en annexe A (≤ 60) |
| P8 | **3 metas > 155** (158, 158, 159) | `/automatisation-taches-administratives`, `/blog/bon-intervention-contenu-modele`, `/relance-factures-automatique` | très faible (sous 160) | À raccourcir lors du prochain passage sur ces pages |
| P9 | **Pas de conclusion** dans les 6 articles (voir §2) | Grep | moyenne (structure voulue par Loïc) | Ajouter un H2 « En conclusion » au gabarit et aux 6 articles lors d'un passage de mise à jour |
| P10 | **Aucune page ni article par métier** : plombier, électricien, menuisier, couvreur, carreleur, peintre, chauffagiste, paysagiste, charpentier, façadier : **0 occurrence** (Grep sur tout le dépôt). Seuls mots du bâtiment présents : « terrassement », « maçon » (accueil), « artisan », et des bulles décoratives « Plomberie / Électricité / Maçonnerie / Transport » sur l'accueil (sans lien) | Grep | élevée | §5 et §6 (briefs d'articles) |
| P11 | **Liste de villes dans `/logiciel-btp-sur-mesure`** (12 noms, de Mulhouse à Haguenau et « toute la France à distance ») et `areaServed` à 12 lieux : proche du bourrage si elle grossit | page, JSON-LD | faible aujourd'hui | Ne pas allonger. Remplacer progressivement par des liens vers les vraies pages ville |
| P12 | **Absence de page « Politique de confidentialité »** : Grep « politique de confidentialit » = 0 résultat dans tout le dépôt. En revanche l'hébergeur est maintenant dans le pied de page (corrigé depuis octobre) | Grep, pied de page | moyenne (formulaire de l'accueil) | À traiter par Sacha / Loïc (hors périmètre rédaction) |
| P13 | **Images de contenu rares** : 3 articles sur 6 et toutes les pages de service sauf 2 n'ont aucune image dans le contenu (hors OG) ; le benchmark montre qu'aucun concurrent ne met de capture réelle d'outil | Grep `<img` | moyenne (hypothèse) | Capture réelle (floutée) d'un bon d'intervention ou du suivi carburant, à fournir par Sacha |
| P14 | **Indexation inconnue** (voir §0) et **aucune mesure d'audience** (aucun script GA4 / Matomo / Plausible : Grep sur tout le dépôt, constat d'octobre non remis en cause) | Grep | élevée | Loïc : rapport « Pages » de Search Console + export « Performances » mensuel |
| P15 | Accueil généré depuis `template.html` hors dépôt : toute modification (menu, liens vers les pages ville, H2) passe par Sacha | README | contrainte | Prévoir une demande groupée à Sacha |

## 4. Recherche de mots-clés sans Ahrefs (14/10/2026)

**Outils utilisés** : API de saisie semi-automatique Google (≈ 100 requêtes, France/français, ponctuelles, sans suivi de position), WebSearch (concurrence), lecture du benchmark veille. Niveaux : **Fort** = apparaît dès 1 à 2 mots, avec 5 suggestions ou plus et des variantes (gratuit, prix, IA…) ; **Moyen** = 2 à 4 suggestions ; **Faible** = 1 suggestion ou variante du métier voisin ; **Aucun signal** = aucune suggestion (recherche très rare, ou formulée autrement). Cela ne mesure pas un volume absolu.

### 4.1 Famille « logiciel / devis / facture + métier »

| Requête (saisie) | Niveau | Ce que dit la saisie semi-automatique | Intention | Qui occupe le haut (source) |
|---|---|---|---|---|
| logiciel btp | **Fort** | complet, suivi chantier, devis facture, gratuit, ia, tout en un | commerciale (comparer des éditeurs) | Éditeurs nationaux, comparatifs (benchmark : Obat, Tool Advisor) |
| logiciel devis btp / logiciel devis bâtiment | **Fort** | gratuit, ia, avec bibliothèque, télécharger | commerciale | idem : très difficile |
| logiciel artisan / logiciel devis artisan | **Fort** | bâtiment, btp, plombier, électricien, rendez-vous, gratuit | commerciale | idem (Batappli, Independant.io, Obat) |
| logiciel plombier / logiciel plombier chauffagiste | **Fort** | devis, facturation, gestion, **intervention plombier chauffagiste**, artisan | commerciale + SAV | Comparatifs (Codeur, Qonto, Tool Advisor) |
| logiciel électricien | **Fort** | gratuit, meilleur, devis électricité, facturation | commerciale | idem |
| logiciel menuisier | **Fort** | agenceur, devis, dessin, 3D, plan, facturation | commerciale (dessin / chiffrage : hors de notre offre) | Obat blog, éditeurs de CAO |
| logiciel peintre (en bâtiment) | Moyen | devis, facturation (le mot est ambigu : artiste peintre) | commerciale | Éditeurs |
| logiciel couvreur | Moyen | meilleur, devis (toiture), facturation | commerciale | Éditeurs |
| logiciel maçon / maçonnerie | Moyen | gratuit, devis maçonnerie | commerciale | Éditeurs |
| logiciel chauffagiste | Moyen | plombier chauffagiste, gestion, facturation | commerciale | Qonto (4e), Codeur |
| logiciel carreleur / carrelage | Faible | devis carrelage | commerciale | Obat (3e), Tool Advisor (2e) |
| logiciel paysagiste | Moyen | gestion, **planning paysagiste**, devis | commerciale | Éditeurs |
| logiciel terrassier | **Aucun signal** ; « logiciel devis terrassement » : faible | — | — | Peu de pages dédiées : créneau où SL Agence a deux réalisations |
| logiciel btp sur mesure / logiciel btp petite entreprise | **Aucun signal** | — | — | Requête rare ; reste utile comme page de service (intention très qualifiée) |
| application [métier] (plombier, électricien…) | Aucun signal utile | suggestions hors sujet (Algérie, Maroc, « loge maçonnique ») | — | À ne pas cibler |

### 4.2 Famille « terrain » : bon d'intervention, heures, carburant, chantier (notre avantage)

| Requête | Niveau | Détail | Intention | Difficulté |
|---|---|---|---|---|
| bon d'intervention | **Fort** | exemple, pdf, **numérique gratuit**, excel, word, maintenance, personnalisé | info + modèle | Moyenne : l'article modèle existe (à suivre dans Search Console) |
| logiciel bon d'intervention / fiche d'intervention | Moyen | gratuit | commerciale | Moyenne |
| application suivi chantier | **Fort** | gratuit, ipad, gestion chantier, tablette | commerciale | Élevée (éditeurs) |
| logiciel suivi chantier | **Fort** | btp, tablette, architecte, outil de suivi | commerciale | Élevée |
| application pointage chantier / logiciel pointage chantier | Moyen | gratuit, pointage horaire | commerciale | Moyenne (Obat, Skello sur la requête voisine) |
| logiciel pointage salarié | Moyen | gratuit | commerciale | Moyenne ; l'article feuille d'heures est le bon point d'entrée |
| logiciel suivi carburant / gestion carburant | Moyen | gratuit, application | commerciale | À explorer : peu de pages BTP |
| bon de livraison numérique | Faible | 1 suggestion | info | À tester |
| gestion parc engins BTP, suivi heures machines, rapport de chantier photo | **Aucun signal** | — | — | Sujet porté par l'article transport (requête longue) |

### 4.3 Famille « automatisation administrative »

| Requête | Niveau | Détail | Intention | Difficulté |
|---|---|---|---|---|
| automatisation administrative / automatisation des tâches administratives | Moyen | seules 2 variantes ; des suggestions en anglais (« automate administrative tasks ») | info + commerciale | Moyenne : guides faibles en tête (Les Pépites Tech, agence-scroll) |
| automatiser la facturation | Faible | 1 | info | À tester |
| automatiser gestion administrative artisan / BTP | **Aucun signal** | — | — | Pas de requête de ce type : parler plutôt de « devis, bons, relances » |
| remplacer Excel par un logiciel | Faible | 1 | info | Moyenne |
| application métier sur mesure | Faible | 1 | commerciale | Moyenne |
| logiciel gestion entreprise sur mesure | **Aucun signal** | — | — | — |
| facture électronique artisan / btp | Moyen | obligatoire, 2026, logiciel, plateforme, groupe BTP | info (échéance) | Moyenne : sujet d'actualité, sources officielles à citer |
| facture électronique transporteur / transport routier | **Aucun signal** | — | — | — |

### 4.4 Famille « transport, logistique, parc »

| Requête | Niveau | Détail | Intention | Difficulté |
|---|---|---|---|---|
| logiciel transport | **Fort** | routier, gratuit, tms, logistique, scolaire, sanitaire, personnes | commerciale | Élevée (annuaires : Appvizer, La Fabrique du Net) |
| logiciel transport routier (marchandises) | **Fort** | gratuit, marchandises, management | commerciale | Élevée |
| tms transport | **Fort** | définition, avis, management system | info | Élevée |
| logiciel gestion transport routier | Moyen | exploitation, planning | commerciale | Moyenne |
| logiciel planning transport routier / planning chauffeurs | Moyen | gratuit | commerciale | Moyenne |
| logiciel facturation transport (routier) | Moyen | gratuit, marchandise, comptabilité transport | commerciale | Moyenne |
| logiciel gestion flotte (camion) | **Fort** | automobile, camion, gratuit, vtc | commerciale | Élevée (télématique) |
| logiciel location matériel (btp, tp) | Moyen | événementiel, btp, tp | commerciale | Moyenne |
| logiciel logistique pme / logiciel transporteur | Faible à aucun | — | — | — |

### 4.5 Famille locale

| Requête | Niveau | Détail | Lecture |
|---|---|---|---|
| logiciel sur mesure Mulhouse / Colmar / Alsace / Haut-Rhin | **Aucun signal** | pas de suggestion | Recherche rare en saisie complète : volume très faible. Pas un argument contre : la requête est à très forte intention et sans concurrent spécialisé |
| application sur mesure Mulhouse, logiciel btp Mulhouse / Alsace / Saint-Louis, logiciel transport Mulhouse | **Aucun signal** | — | idem |
| développeur logiciel Mulhouse | Faible | « développeur informatique », « ingénieur informatique » Mulhouse : plutôt emploi | Mauvaise intention (recrutement) : à éviter |
| automatisation entreprise Mulhouse | Faible | « entreprise automatisme Mulhouse » | Dérive vers l'automatisme industriel (déjà constaté en octobre) |
| entreprise btp Saint-Louis | Faible | confusion avec Saint-Louis (974) | Ajouter « 68 » / « Haut-Rhin » partout dans la page |

**Concurrence observée (WebSearch 14/10, requêtes locales)** : « logiciel de gestion sur mesure artisan bâtiment Mulhouse Haut-Rhin » → PagesJaunes (fiches), annuaires de travaux (Obat, travaux.com), Batappli (Batiproduits), une société de logiciels pour artisans du bâtiment référencée à Mulhouse (texte promotionnel, activité sur mesure non vérifiée) ; « application sur mesure entreprise Saint-Louis Haut-Rhin Bâle » → profils Malt et agences de Marseille, Paris, Toulouse, Annecy : **aucun prestataire à Saint-Louis ni à Bâle ressorti**. Le benchmark veille (14/10) ne trouve aucune agence concurrente sur les requêtes locales testées ; les pages « agence IA » de S MEDIA (Mulhouse, Colmar), Quadia, Synapze existent mais sont sur l'IA.

**Ce que ça change pour la stratégie** :
1. Les requêtes « logiciel devis facture + métier » sont **fortes mais verrouillées par les éditeurs nationaux et leurs comparatifs** (Obat, Tool Advisor, Codeur, Qonto, Batappli) : ne pas se battre là. Notre angle gagnant est le **terrain** (bon signé, heures, carburant, planning, photos) et le **sur mesure**, qui est absent de ces pages.
2. Les requêtes locales n'ont pas de volume visible : leur valeur est la **conversion** (un dirigeant du Haut-Rhin qui tape cela est un prospect) et la **citation par les moteurs IA**, pas le trafic.
3. Les articles de blog par métier visent les requêtes **fortes et informatives** (« logiciel [métier] », « bon d'intervention », « suivi chantier ») avec un angle que les éditeurs n'ont pas (quand un logiciel du marché ne suffit plus), puis renvoient vers la page pilier BTP.

### 4.6 Choix des métiers (où il y a de la demande ET où nous avons quelque chose à dire)

| Rang | Métier | Demande (saisie) | Notre légitimité (réalisations publiques) | Décision |
|---|---|---|---|---|
| 1 | **Plombier-chauffagiste** | Fort (intervention, devis, gestion) | bon d'intervention signé (réalisation travaux agricoles, même mécanique) | Article + page métier |
| 2 | **Électricien** | Fort | idem (interventions, bons) | Article |
| 3 | **Terrassier / travaux publics** | Aucun signal sur « terrassier », mais **2 réalisations** (carburant 11 engins, heures 12 salariés) | la meilleure preuve du site | Page métier (preuve) + article parc d'engins déjà publié |
| 4 | **Menuisier** | Fort mais orienté dessin 3D / chiffrage | partielle (suivi de pose, bons) | Article avec angle « chantiers de pose et SAV » |
| 5 | **Couvreur** | Moyen | partielle (rapport photo daté) | Article |
| 6 | **Paysagiste** | Moyen (planning, suivi de chantier) | partielle (travaux agricoles voisins) | Article |
| 7 | Peintre, maçon, carreleur | Moyen / faible | faible | Plus tard, décliner le gabarit une fois la Search Console parlante |
| — | **Transport routier** | Fort (logiciel transport routier, planning, facturation) | 1 projet en cours + article | Article déjà publié ; 1 article « facturation et délai de paiement » possible |

## 5. Architecture proposée

```
Pilier  /logiciel-btp-sur-mesure  (existe)  ──────────────┐
Pilier  /logiciel-sur-mesure (prix)  (existe)             │
Pilier  /bon-intervention-numerique (existe)              │
        │                                                  │
        ├── Pages métier (3 à 5 maxi, chacune avec preuve)  │
        │     /logiciel-plombier-chauffagiste (à créer)     │
        │     /logiciel-terrassement-travaux-publics (à créer, preuve réelle)
        │     /logiciel-electricien (plus tard)             │
        │                                                   │
        ├── Pages ville (3 maxi, contenu local réel)        │
        │     /application-metier-mulhouse  (aujourd'hui)   │
        │     /application-metier-saint-louis (aujourd'hui) │
        │     /application-metier-colmar (ensuite)          │
        │                                                   │
        └── Articles de blog par métier ────────────────────┘
              chacun → 1 lien vers la page métier (ou le pilier BTP) + 1 vers bon-intervention
```

**Règles de maillage**
- Chaque article métier : 1 lien vers `/logiciel-btp-sur-mesure` (ou la page métier), 1 vers `/bon-intervention-numerique` ou `/realisations`, 1-2 vers d'autres articles. En retour, la page pilier BTP liste les articles métier (section « Nos guides » existante).
- Chaque page ville : liée depuis `/logiciel-btp-sur-mesure` (remplace la liste de villes), `/realisations`, `/logiciel-sur-mesure`, `/bon-intervention-numerique`, le pied de page commun (une ligne « Mulhouse · Saint-Louis »), l'article transport. Elle renvoie vers le pilier BTP, les réalisations, 1 article, et vers l'autre page ville (liens entre villes réellement voisines uniquement).
- L'accueil (template hors dépôt) : à lier par Sacha quand les pages sont validées.

**Risque de pages satellites (doorway) et comment l'éviter** (règles anti-spam Google, section 7 du manuel ; benchmark veille §5)
- Un **doorway** = une série de pages quasi identiques qui ne changent que le nom de la ville. Quadia et Synapze en sont des exemples (listes de dizaines de communes, aucune adresse, aucun client).
- Garde-fous retenus pour SL Agence :
  1. **3 pages ville maximum** à ce stade (Mulhouse, Saint-Louis, puis Colmar), jamais de liste de communes.
  2. **≥ 40 % de texte inutilisable pour une autre ville** : tissu économique sourcé, activités réellement présentes, spécificités (frontière pour Saint-Louis, port et industrie pour Mulhouse).
  3. **Zéro phrase copiable d'une page à l'autre** : les deux briefs ci-dessous ont des plans H2 différents, pas seulement des mots remplacés.
  4. **Aucune réalisation rattachée à une ville** (décision de Loïc : pas de réalisation par ville). On présente les réalisations publiques **par métier**, sans lieu, et l'engagement de déplacement sur place.
  5. **Conditions écrites** (prix ferme, délai, données au client) uniquement celles déjà sur le site.
  6. **Au moins 2 questions FAQ locales** par page.
  7. Si une page ville n'obtient aucune impression à J+56, ne pas en créer d'autres : la regrouper dans une page « Haut-Rhin ».
- **Distinction avec la page d'accueil** : l'accueil porte « automatisation + logiciel sur mesure Mulhouse » (générique). Les pages ville portent « **application métier** + ville », centrées sur le BTP et le transport, pour éviter la cannibalisation (P3).

## 6. Recommandation pour AUJOURD'HUI (décision de Loïc : 2 pages, Mulhouse et Saint-Louis / frontière)

**Pourquoi ces deux pages** : (1) aucun prestataire d'outils de chantier n'apparaît sur ces requêtes locales (WebSearch 14/10 et octobre) ; (2) deux publics distincts, donc deux pages réellement différentes ; (3) la page BTP existante (3 liens contextuels) a besoin de relais. **Hypothèse à mesurer** : impressions sur les requêtes « application / logiciel + BTP / transport + Mulhouse / Saint-Louis » à J+28, indexation sous 14 jours. Volume non mesuré ; probablement très faible, la valeur est la conversion.

**Contraintes de rédaction communes (obligatoires)**
- Prix, délais et engagements : **uniquement ce qui est déjà publié**, vérifié par Grep : devis gratuit sous 24 h, prix ferme annoncé avant de commencer, premier outil en 7 jours, données au client et exportables, « jusqu'à 20 h récupérées par semaine chez un client », répond du lundi au samedi de 8 h à 19 h. **Aucun prix en euros, aucun autre délai.**
- Réalisations (publiques, sans ville) : terrassement, 11 engins, photo du compteur avant et après le plein, pleins visibles le jour même ; terrassement, 12 salariés, heures pointées en 30 s, rappel automatique ; travaux agricoles, bon rempli une fois et signé au doigt, PDF envoyé ; transport routier, projet en cours (planning relié aux commandes, bons lus depuis Outlook, suivi des véhicules et des permis) ; sécurité et prévention, échéances de contrôles. Toujours « présentés par leur activité ».
- Déplacement : **agence basée à Friesen (Sundgau), Loïc se déplace sur place dans tout le Haut-Rhin**. Le **temps de trajet** vers Mulhouse et Saint-Louis n'est pas dans nos sources : à confirmer par Loïc (voir questions) ou à calculer avec un itinéraire avant publication. Ne pas écrire de minutes sans cette vérification.
- Auteur : Loïc Bitsch (Person), date de publication et de mise à jour visibles.
- Longueur cible : 1 200 à 1 600 mots, ton de `ton.md` (vouvoiement, phrases courtes, aucun superlatif).
- Pas d'`aggregateRating`, pas d'adresse à Mulhouse ou Saint-Louis (SL Agence n'y a pas de bureau : ne pas déclarer de `LocalBusiness` local).
- Aucun nom de client, ni nom d'avis.

---

### BRIEF PAGE 1 — Mulhouse

- **URL** : `/application-metier-mulhouse`
- **Mot-clé principal** : application métier sur mesure Mulhouse (aucun signal de volume ; intention commerciale locale).
- **Secondaires** : logiciel BTP Mulhouse ; application de chantier Mulhouse ; logiciel transport Mulhouse ; bon d'intervention numérique Mulhouse ; suivi des heures et du carburant ; agglomération mulhousienne / m2A ; Haut-Rhin.
- **Intention** : commerciale locale (un dirigeant d'entreprise de bâtiment, de transport ou de service terrain cherche qui peut lui construire l'outil près de chez lui).
- **Title (≤ 60)** : `Application métier sur mesure à Mulhouse | SL Agence` (52)
- **Meta (≤ 155)** : `Applications de chantier, de transport et de gestion sur mesure pour les entreprises de Mulhouse. Bons signés, heures, carburant. Devis gratuit sous 24 h.` (154)
- **H1** : `Application métier sur mesure pour les entreprises de Mulhouse.`
- **Chapô (2-3 phrases)** : « Bons signés sur téléphone, heures pointées sur place, carburant suivi le jour même : nous construisons l'outil de votre métier, pour les entreprises du bâtiment, du transport et des services de terrain de Mulhouse et de son agglomération. Nous sommes basés à Friesen, dans le Sundgau, et Loïc se déplace chez vous. Devis gratuit sous 24 h. » + bouton « Réserver un appel de 15 minutes ».

**Plan**
1. **H2 « Une agence du Haut-Rhin, à votre porte »** : qui nous sommes (basés à Friesen), nous venons voir vos papiers et vos équipes sur place (réf. `/logiciel-btp-sur-mesure` : « nous venons sur place quand c'est utile »), `[temps de trajet à confirmer par Loïc]`. Conditions de rendez-vous : appel de 15 min, puis visite.
2. **H2 « Ce que vivent les entreprises de l'agglomération mulhousienne »** (bloc local sourcé)
   - H3 Un territoire industriel : m2A = 39 communes et 277 640 habitants (m2A, 1er janvier 2018, à revérifier pour une donnée plus récente), plus de 15 000 emplois directement liés à l'industrie (ADIRA, chiffres clés m2A 2023). Conséquence pour une entreprise de sous-traitance ou de maintenance : des interventions chez des industriels, avec des bons à faire signer et des heures à justifier.
   - H3 Un territoire de transit : port de Mulhouse-Rhin, 3,9 millions de tonnes de marchandises en 2024 (Le Journal des Entreprises) ; transporteurs, loueurs, entreprises de manutention. Lien vers l'article transport.
   - H3 Un bâtiment de petites structures : au niveau national, 97 % des entreprises du bâtiment ont moins de 10 salariés (CAPEB, chiffres clés 2023) ; le chiffre local n'est pas sourcé : ne pas l'inventer (voir questions : Loïc peut sortir le nombre d'entreprises par code NAF de l'annuaire Sirene).
3. **H2 « Ce que nous construisons, métier par métier »** : 4 cartes, chacune liée à sa page : bâtiment et travaux publics (`/logiciel-btp-sur-mesure`), interventions et dépannage (`/bon-intervention-numerique`), transport et engins (article `/blog/logiciel-gestion-transport-parc-engins`), fichiers à remplacer (`/remplacer-excel`). Exemples concrets de tâches : bon signé au doigt, rapport photo daté, pointage en 30 s, carburant avec photo du compteur, planning relié aux commandes.
4. **H2 « Des outils déjà en service dans des entreprises d'Alsace »** (réalisations publiques par métier, **sans ville**) : terrassement (11 engins), terrassement (12 salariés, 30 s), travaux agricoles (bon rempli une fois), transport routier (projet en cours). Phrase obligatoire : « Nos clients sont présentés par leur activité. » Lien `/realisations`. Image : capture réelle de l'outil si Sacha la fournit (floutée) ; à défaut aucune image décorative (c009).
5. **H2 « Conditions écrites avant de commencer »** : devis gratuit sous 24 h, prix ferme annoncé avant de commencer, premier outil en 7 jours, données propriété du client et exportables à tout moment, interlocuteur unique. Rien d'autre.
6. **H2 « Logiciel du marché ou outil sur mesure ? »** : 3-4 lignes honnêtes (si un logiciel du marché couvre vos besoins, prenez-le ; le sur mesure sert quand votre façon de travailler ne rentre dans aucune case) + lien vers `/logiciel-sur-mesure` pour le prix.
7. **H2 FAQ** (voir ci-dessous) puis **H2 « Parlons de votre quotidien »** : CTA appel 15 min + téléphone + formulaire.
8. **Conclusion** : 3 phrases (ce qu'on fait, comment on travaille, premier pas), avant le CTA final.

**FAQ (6 questions)** — origine : FAQ des pages gagnantes (benchmark §7) + saisies ; **à recouper dans « Autres questions posées » avant publication**
1. Une agence peut-elle créer une application sur mesure près de Mulhouse pour une petite entreprise du bâtiment ? (locale)
2. Vous déplacez-vous à Mulhouse et dans l'agglomération ? (locale ; réponse : basés à Friesen, Loïc se déplace ; trajet à confirmer)
3. Mon entreprise de transport a déjà un logiciel : peut-on le garder et le relier ? (nos outils se branchent sur l'existant, formulation du site)
4. Combien coûte une application sur mesure ? (devis gratuit sous 24 h, prix ferme avant de commencer ; lien `/logiciel-sur-mesure` ; aucun chiffre)
5. En combien de temps mes équipes peuvent-elles s'en servir ? (premier outil en 7 jours)
6. Mes données restent-elles à moi ? (oui, propriété du client, exportables)
Option locale supplémentaire si place : « Je travaille en sous-traitance chez des industriels : puis-je faire signer mes bons sur place ? » (bon signé au doigt, PDF envoyé).

**Schéma JSON-LD** : `Service` (`@id` `https://slagence.fr/application-metier-mulhouse#service`, `name` « Application métier sur mesure à Mulhouse », `serviceType` « Application métier sur mesure », `provider` = `{"@id":"https://slagence.fr/#organisation"}`, `areaServed` `[{"@type":"City","name":"Mulhouse"},{"@type":"AdministrativeArea","name":"Haut-Rhin"}]`, `url`) + `FAQPage` (mêmes textes que la page) + `BreadcrumbList` (Accueil > Logiciel BTP sur mesure > Mulhouse). Pas de `LocalBusiness`, pas d'`aggregateRating`.

**Liens internes sortants** : `/logiciel-btp-sur-mesure`, `/bon-intervention-numerique`, `/realisations`, `/logiciel-sur-mesure`, `/remplacer-excel`, `/blog/logiciel-gestion-transport-parc-engins`, `/blog/feuille-heures-salaries`, `/application-metier-saint-louis`. **À créer en entrée** : `/logiciel-btp-sur-mesure` (section « Près de chez vous »), `/realisations`, `/logiciel-sur-mesure`, article transport, pied de page commun, `sitemap.xml` (priorité 0.8), `llms.txt`.
**Images** : capture floutée d'un écran réel (bon ou suivi carburant) ; OG dédiée `/img/og/application-metier-mulhouse.png` (même charte que les autres, un message). Pas de photo de ville.
**Éléments locaux réels à citer (sources)** : m2A (39 communes, 277 640 habitants, 2018) — m2A, rapport d'activité 2018 (https://www.m2a.fr/wp-content/uploads/2022/02/2018-Rapport-activite.pdf) ; plus de 15 000 emplois industriels — ADIRA, chiffres clés m2A 2023 (https://www.adira.com/wp-content/uploads/ca-m2a-2023.pdf) ; port de Mulhouse-Rhin 3,9 Mt en 2024 — Le Journal des Entreprises (https://www.lejournaldesentreprises.com/breve/le-trafic-de-marchandises-ressort-en-hausse-sur-le-rhin-2117575) ; 97 % des entreprises du bâtiment < 10 salariés (national) — CAPEB, chiffres clés 2023 (https://www.capeb.fr/www/capeb/media/document/chiffres-cles-2023-4.pdf). **Ces extraits viennent de résumés de recherche : relire chaque source avant de publier et citer la date.**

---

### BRIEF PAGE 2 — Saint-Louis / frontière

- **URL** : `/application-metier-saint-louis`
- **Mot-clé principal** : application métier sur mesure Saint-Louis (68) (aucun signal de volume).
- **Secondaires** : logiciel BTP Saint-Louis Haut-Rhin ; logiciel entreprise Saint-Louis frontière Bâle ; application de chantier Saint-Louis 68 ; logiciel transport Saint-Louis ; entreprise frontalière / bassin trinational ; Huningue, Village-Neuf, Hégenheim (communes voisines à vérifier). **Toujours écrire « Saint-Louis (68) » ou « Haut-Rhin »** pour écarter Saint-Louis (974).
- **Intention** : commerciale locale, public spécifique (entreprises françaises à la frontière suisse et allemande).
- **Title (≤ 60)** : `Application métier sur mesure à Saint-Louis (68) | SL Agence` (60)
- **Meta (≤ 155)** : `Application sur mesure pour les entreprises de Saint-Louis et de la frontière : chantiers, transport, documents. Devis gratuit sous 24 h, prix ferme.` (149)
- **H1** : `Application métier sur mesure pour les entreprises de Saint-Louis et de la frontière.`
- **Chapô** : « À Saint-Louis, une entreprise travaille souvent avec la Suisse et l'Allemagne à quelques kilomètres, et tout le monde se partage la même main-d'œuvre. Pour que votre administratif n'occupe pas vos meilleurs éléments, nous construisons l'outil de votre métier : bons signés sur téléphone, heures, documents sans ressaisie. Loïc se déplace chez vous. » (La phrase sur la main-d'œuvre est une **hypothèse** à garder prudente, voir bloc 2.)

**Plan (différent de la page Mulhouse)**
1. **H2 « Travailler à la frontière : ce que ça change pour votre administratif »** (bloc local sourcé)
   - H3 Le premier bassin frontalier de la région : zone d'emploi de Saint-Louis, 47,5 % des travailleurs sont des frontaliers en 2019, la part la plus élevée des zones frontalières (INSEE Analyses Grand Est n° 161, 2023) ; 23 700 frontaliers dans la zone.
   - H3 Un tissu spécialisé : transport aérien (EuroAirport) 25 fois plus concentré que dans la région ; pharmacie 5,4 % des emplois, environ 15 fois la part régionale (même étude). **Hypothèse à signaler comme telle** : pour une PME du bâtiment ou du transport de la zone, ces employeurs voisins rendent le recrutement plus concurrentiel ; chaque heure d'administratif évitée libère du temps pour ceux qui sont là. Ne pas chiffrer.
   - H3 Un territoire de 40 communes et environ 80 000 habitants (Saint-Louis Agglomération, source à relire sur agglo-saint-louis.fr).
2. **H2 « Clients, fournisseurs et chantiers des deux côtés de la frontière »** : cas d'usage concrets, formulés comme capacités à confirmer avec Sacha avant écriture définitive : documents (bons, devis, rapports) en français et allemand, montants dans deux monnaies, bons de livraison pour des marchandises qui traversent. **Aucune règle fiscale ou douanière affirmée sans source** (TVA, e-facture, douane : à sourcer sur impots.gouv.fr / douane.gouv.fr ou à retirer).
3. **H2 « Ce que nous construisons pour le bâtiment et le transport de la zone »** : bons d'intervention signés, rapport photo daté, pointage d'heures (obligations de suivi du temps de travail : lien vers `/blog/feuille-heures-salaries`), suivi des engins et du carburant, planning de transport. Liens vers les pages de service.
4. **H2 « Des outils déjà en service dans des entreprises d'Alsace »** : mêmes réalisations publiques par métier que la page Mulhouse mais **présentées sous un autre angle** (ici : « une saisie faite sur place, une fois, utile des deux côtés de la frontière » ; sur la page Mulhouse : l'intervention chez l'industriel). Aucune ville. Réutiliser **les mêmes chiffres**, pas les mêmes phrases.
5. **H2 « Nous venons sur place »** : engagement de déplacement dans tout le Haut-Rhin, rendez-vous sur votre chantier ou à votre atelier, `[trajet depuis Friesen à confirmer]`, communes voisines desservies (Huningue, Village-Neuf, Hégenheim, Blotzheim… **liste à valider par Loïc, 6 maxi, pas plus**).
6. **H2 « Conditions écrites avant de commencer »** : devis gratuit sous 24 h, prix ferme, premier outil en 7 jours, données au client. Formulation différente de la page Mulhouse (paragraphe au lieu de liste).
7. **H2 FAQ**, puis **conclusion** (3 phrases) et CTA.

**FAQ (6 questions)**
1. Vous déplacez-vous à Saint-Louis, Huningue ou Village-Neuf ? (locale)
2. Mes clients ou fournisseurs sont en Suisse ou en Allemagne : l'outil peut-il gérer deux langues et deux monnaies ? (locale ; **réponse à valider par Sacha**)
3. Mes salariés sont tentés par la Suisse et je manque de temps : que peut-on automatiser en premier ? (locale ; réponse : la tâche la plus répétée, souvent bons, heures ou relances ; aucun chiffre)
4. Combien coûte une application sur mesure ? (devis gratuit sous 24 h, prix ferme ; aucun montant)
5. Combien de temps avant la première version ? (premier outil en 7 jours)
6. Que devient mon application si je change de prestataire ? (données au client, exportables ; question réelle posée par S MEDIA dans sa FAQ)

**Schéma JSON-LD** : comme la page Mulhouse, `areaServed` `[{"@type":"City","name":"Saint-Louis"},{"@type":"AdministrativeArea","name":"Haut-Rhin"}]`, Breadcrumb Accueil > Logiciel BTP sur mesure > Saint-Louis.
**Liens internes** : `/logiciel-btp-sur-mesure`, `/bon-intervention-numerique`, `/realisations`, `/logiciel-sur-mesure`, `/blog/feuille-heures-salaries`, `/blog/logiciel-gestion-transport-parc-engins`, `/application-metier-mulhouse`. Entrées à créer : mêmes que Mulhouse.
**Images** : une capture réelle floutée (différente de celle de Mulhouse si possible) ; aucune photo de frontière ou de ville achetée.
**Sources locales** : INSEE Analyses Grand Est n° 161 (juillet 2023), https://www.insee.fr/fr/statistiques/7644491 (lu le 14/10 : 23 700 frontaliers, 47,5 %, transport aérien x25, pharmacie 5,4 %, données 2019) ; Saint-Louis Agglomération, https://www.agglo-saint-louis.fr (40 communes, ~80 000 habitants, **à relire**) ; le chiffre « Haut-Rhin = 14 % des Français qui travaillent en Suisse » (Urssaf, 2023) vient d'un résumé de recherche : à relire avant de l'utiliser, ne pas en tirer d'effectif.

---

### BRIEFS D'ARTICLES — un par métier, pour demain (structure maison : introduction, 5 parties, conclusion complète, FAQ)

Règles communes : auteur Loïc Bitsch ; réponse directe dans les 3 premières phrases (bloc « En bref ») ; 1 apport original (modèle ou tableau) ; 1 image seulement si elle apporte quelque chose (capture ou modèle) ; encart CTA en fin d'article ; sources externes pour tout fait réglementaire ; ajout sitemap / blog index / flux RSS / `llms.txt`.

| # | Métier | Titre proposé (≤ 60) | Mot-clé principal (niveau) | Angle (ce que les éditeurs n'ont pas) | 5 parties | FAQ (thèmes) | Liens |
|---|---|---|---|---|---|---|---|
| A1 | **Plombier-chauffagiste** | `Logiciel plombier-chauffagiste : devis, bons, entretien` (53) | logiciel plombier chauffagiste (Fort) | Quand le logiciel de devis ne suffit pas : bon d'intervention signé, historique par chaudière, rappel d'entretien. Honnête : pour un artisan seul, un logiciel du marché peut suffire | 1 Ce que doit faire le logiciel d'un plombier-chauffagiste 2 Devis et factures : ce que les logiciels du marché font bien 3 Le terrain : bon signé, photos, pièces 4 Entretiens et contrats : relances 5 Marché ou sur mesure | gratuit ? hors ligne ? facture électronique ? bon d'intervention obligatoire ? coût ? | `/bon-intervention-numerique`, `/blog/bon-intervention-contenu-modele`, `/facture-electronique-tpe`, `/logiciel-btp-sur-mesure` |
| A2 | **Électricien** | `Logiciel électricien : devis, chantiers, suivi des heures` (56) | logiciel électricien (Fort) | Chantier + dépannage : pointage et rapport de conformité sans ressaisie. Mentions du devis (mentions obligatoires sourcées) | 1 Devis et factures 2 Chantiers et heures 3 Dépannages et bons 4 Documents et attestations 5 Marché ou sur mesure | gratuit ? micro-entrepreneur ? TVA ? | idem + `/blog/feuille-heures-salaries` |
| A3 | **Terrassier / TP** | `Logiciel terrassement : heures, engins, carburant` (50) | logiciel terrassement / devis terrassement (Faible, créneau libre) | **Notre preuve réelle** : 11 engins, photo du compteur, 12 salariés pointant en 30 s. Pas de concurrent éditeur dédié ressorti | 1 Les coûts cachés d'un chantier de terrassement 2 Suivi du carburant 3 Heures des salariés et des machines 4 Bons de livraison et pesées 5 Par où commencer | combien coûte ? tableur suffit-il ? engins loués ? | `/blog/logiciel-gestion-transport-parc-engins`, `/realisations`, `/logiciel-btp-sur-mesure` |
| A4 | **Menuisier** | `Logiciel menuisier : devis, pose et suivi de chantier` (52) | logiciel menuisier / logiciel devis menuiserie (Fort) | La demande se concentre sur dessin et chiffrage (hors de notre offre) : l'article le dit et se positionne sur **pose, SAV, réserves, bons signés** | 1 Ce qu'un logiciel de dessin ne fait pas 2 Du devis à la commande 3 La pose : planning et photos 4 SAV et réserves 5 Marché ou sur mesure | dessin 3D ? gratuit ? | idem |
| A5 | **Couvreur** | `Logiciel couvreur : devis toiture et rapports photo` (51) | logiciel couvreur / devis toiture (Moyen) | Rapports photo datés avant / après, valeur en cas de litige (déjà traité sur le site : bon et photos) | 1 Devis toiture 2 Rapport photo daté 3 Sécurité et chantiers en hauteur : seulement des faits sourcés 4 Facturation et relances 5 Marché ou sur mesure | litige ? hors ligne ? | idem |
| A6 | **Paysagiste** | `Logiciel paysagiste : planning d'équipes et chantiers` (53) | logiciel gestion paysagiste, planning paysagiste (Moyen) | Équipes saisonnières, planning, suivi de chantier ; proximité avec nos travaux agricoles | 1 Saisonnalité et planning 2 Suivi de chantier 3 Devis, contrats d'entretien, relances 4 Matériel et carburant 5 Marché ou sur mesure | gratuit ? appli téléphone ? | idem |
| T1 (optionnel) | **Transport** | `Facturer plus vite dans le transport routier` | logiciel facturation transport routier (Moyen) | Délai de paiement plafonné à 30 jours (source : Service-Public Entreprendre, déjà citée dans l'article transport) ; facturer à la livraison | 5 parties à définir | délai ? pénalités ? | article transport |

**Ordre conseillé demain** : A3 (terrassement : preuve réelle, concurrence faible), puis A1 (plombier-chauffagiste : demande la plus forte), puis A2. Un seul par jour pour garder la qualité (scaled content abuse, manuel §7).

## 7. À faire après publication (mesure)

- Search Console : inspection d'URL + demande d'indexation des 2 pages le jour J ; export mensuel « Performances ». Vérifier à J+14 l'indexation, à J+28 les requêtes (filtre page = `/application-metier-`). Verdict à noter dans `experiences.md`.
- Contrôler qu'une seule URL ressort pour « logiciel sur mesure Mulhouse » (accueil / `/logiciel-sur-mesure` / page ville).
- Aucune extension à d'autres villes avant le verdict J+28.

## 8. Annexe A — Réécritures de titles > 60 caractères (propositions)

| Page | Actuel (T) | Proposé (T) |
|---|---|---|
| `/automatisation-taches-administratives` | … \| SL Agence Mulhouse (62) | `Automatisation des tâches administratives \| SL Agence` (53) |
| `/remplacer-excel` | … \| SL Agence Mulhouse (67) | `Remplacer Excel par une application sur mesure \| SL Agence` (57) |
| `/blog/comment-relancer-une-facture-poliment` | (62) | `Relancer une facture poliment : 6 modèles à copier` + marque supprimée si 62 persiste : `Relancer une facture : calendrier et 6 modèles \| SL Agence` (57) |
| `/blog/relancer-un-devis-sans-reponse` | (63) | `Relancer un devis sans réponse : 8 modèles \| SL Agence` (53) |
| `/blog/feuille-heures-salaries` | (66) | `Feuille d'heures : obligations et modèle gratuit \| SL Agence` (59) |
| `/blog/logiciel-gestion-transport-parc-engins` | (66) | `Logiciel transport et engins : lequel choisir ? \| SL Agence` (58) |

Ces titles sont dans des pages déjà indexées ou en cours d'indexation : les changer en même temps que les ajouts de maillage, et noter la date dans `experiences.md`.

## 9. Auto-évaluation (grille du manuel, section 9) — livrable : briefs de pages Mulhouse et Saint-Louis

| # | Critère | Note | Remarque |
|---|---|---|---|
| 1 | Intention | 1 | « Application métier + ville » différenciée de l'accueil et de `/logiciel-sur-mesure` ; format observé (peu de pages locales concurrentes, benchmark) |
| 2 | Title et meta | 1 | 52 et 60 caractères ; metas 154 et 149 ; un seul H1 |
| 3 | Réponse directe | 1 | Chapô qui répond dès l'écran 1 |
| 4 | Expérience prouvée | 0,5 | Réalisations publiques par métier ; pas de réalisation par ville (décision Loïc) ; capture d'écran à fournir par Sacha |
| 5 | Exactitude | 0,5 | Chiffres locaux sourcés mais tirés de résumés de recherche : relecture des sources obligatoire ; trajets non confirmés ; capacités bilingue / bi-monnaie à valider par Sacha |
| 6 | Ancrage local | 1 | Contenu local distinct et sourcé pour chaque page, sans liste de villes |
| 7 | Structure lisible | 1 | H2 = questions du dirigeant, ton conforme |
| 8 | Maillage | 1 | Entrées et sorties listées, sitemap et `llms.txt` |
| 9 | Conversion | 1 | CTA dès l'écran 1, répété, réassurance (24 h, prix ferme, 7 jours) |
| 10 | Technique | 1 | JSON-LD défini, pas d'`aggregateRating`, OG dédiée, `alt` |
| **Total** | | **9 / 10** | Seuil 8 atteint. Points à 0,5 : 4 et 5, levés par les réponses de Loïc et de Sacha ci-dessous |

Audit lui-même (qualité du recensement) : inventaire vérifié par script et par comparaison avec la version en ligne ; limites des données de mots-clés énoncées (aucun volume inventé).

## 10. Questions pour Loïc / Sacha avant de rédiger les pages ville

1. **Trajet** : combien de minutes de route depuis Friesen vers Mulhouse et vers Saint-Louis ? (à écrire dans la page ; je ne l'invente pas)
2. **Adresse** : on garde « Friesen, Sundgau » partout, sans adresse à Mulhouse ni Saint-Louis ? (recommandé : oui, pas de fausse adresse)
3. **Communes desservies autour de Saint-Louis** : lesquelles voulez-vous citer (6 maximum, par exemple Huningue, Village-Neuf, Hégenheim, Blotzheim) ? Et pour Mulhouse : citer l'agglomération (Illzach, Riedisheim, Kingersheim…) ou seulement « Mulhouse et son agglomération » ?
4. **Références** : autorisez-vous à écrire « nos outils servent des entreprises d'Alsace » sans ville, et à montrer une capture floutée d'un outil réel ? Sacha peut-il fournir 2 captures (bon signé, suivi carburant) ?
5. **Frontière (Sacha)** : peut-on affirmer que les outils gèrent des documents en français et en allemand et des montants en euros et en francs suisses ? Si non, je retire ce passage.
6. **Public transfrontalier** : avez-vous déjà des échanges avec des entreprises de Saint-Louis ou des clients suisses ? (pour savoir quelles questions leur poser dans la FAQ, sans les citer)
7. **Colmar** : voulez-vous la page Colmar en troisième, après le verdict à J+28 des deux premières ?
8. **Ton de l'argument « salariés tentés par la Suisse »** : acceptable pour vous, ou trop sensible pour une page publique ? (je le garde en hypothèse prudente sinon)
9. **Checklist 5 minutes pour Loïc** : dans Google, taper « logiciel btp Mulhouse », « application sur mesure Saint-Louis 68 », « logiciel plombier chauffagiste », « logiciel terrassement » ; noter les « Autres questions posées » (copier les 4 premières) et si un pack local ou des annonces apparaissent. Je les intègre aux FAQ.
