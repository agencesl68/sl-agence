# Action 01 (plan : C1) — Optimiser `/automatisation-taches-administratives`

> Agent `seo-site` · préparée le 2026-10-06 · **statut : prête, pas en ligne** (en attente de l'autorisation des branches `seo/<sujet>`).
> Branche prévue : `seo/automatisation-administrative` · 1 pull request · fichiers touchés : `automatisation-taches-administratives.html`, `sitemap.xml`.
> Aucun changement à `index.html` / `template.html`, au formulaire ni aux scripts.
> Correctif prêt à appliquer : [`01-automatisation-taches-administratives.patch`](01-automatisation-taches-administratives.patch)
> (vérifié le 2026-10-06 : `git apply --check` passe sur le dépôt à jour). **Avant la PR : remplacer `AAAA-MM-JJ` dans `sitemap.xml` par la date de mise en ligne.**

**L'action qui aura probablement le plus d'impact maintenant (côté site) : faire de cette page la réponse locale à
« automatiser l'administratif d'une TPE/PME du Haut-Rhin ».** C'est exactement la mission du site ; c'est la page qui vise
la requête où 7 concurrents occupent le top 10 sans nous ; et elle n'a aujourd'hui ni preuve, ni vraie section locale.

## Pourquoi cette page en premier

- Problème constaté : title de 62 caractères (> 60) ; H1 sans ancrage local ; **aucune réalisation** (les 6 réalisations ne
  sont que sur l'accueil) ; section locale d'une seule phrase, avec un H2 « Automatisation d'entreprise à Mulhouse » qui attire
  l'intention « automatisme industriel » (requête témoin 3) ; **aucun lien vers le blog** ; logiciels compatibles et propriété
  des données absents ; pas de réassurance près du bouton d'appel (`automatisation-taches-administratives.html`, lignes 6-7, 38-43, 128-136).
- Concurrence observée (`positions.md`, 2026-10-06) : sur « automatisation tâches administratives PME », le top 10 est fait de
  **guides** (Les Pépites Tech, agence-scroll) → la page garde ses parties explicatives (quelles tâches, avant/après, quel outil) ;
  sur « agence automatisation Haut-Rhin », **aucun prestataire d'automatisation administrative**, uniquement de l'automatisme industriel.

## Modifications, fichier par fichier

### `automatisation-taches-administratives.html`

| # | Élément | Avant | Après |
|---|---|---|---|
| 1 | `<title>` | Automatisation des tâches administratives \| SL Agence Mulhouse (62 car.) | **Automatiser les tâches administratives \| SL Agence Mulhouse** (59 car.) |
| 2 | Meta description + `og:description` | Saisies en double, relances, documents, tableaux de bord : nous automatisons le travail administratif des TPE et PME avec vos outils actuels. Devis sous 24 h. (158) | **Saisies en double, relances, devis, tableaux de bord : nous automatisons l'administratif des TPE et PME du Haut-Rhin avec vos logiciels. Devis sous 24 h.** (153) |
| 3 | H1 + `og:title` | Automatisation des tâches administratives pour TPE et PME. | **Automatisation des tâches administratives pour les TPE et PME du Haut-Rhin.** |
| 4 | Chapeau (`.lead`) | … avec les outils que vous utilisez déjà. Vos équipes retrouvent du temps pour vos clients. | … avec les logiciels que vous utilisez déjà. **Votre première tâche automatisée est en place en 7 jours**, et vos équipes retrouvent du temps pour vos clients. |
| 5 | Sous les 2 boutons du haut (nouveau `<p class="note">`) | — | **Réponse sous 24 h · Devis gratuit · Prix ferme annoncé avant de commencer** |
| 6 | Carte « Les relances » | … au bon moment. | … au bon moment. **En attendant, nos [8 modèles pour relancer un devis sans réponse](/blog/relancer-un-devis-sans-reponse).** |
| 7 | Carte « Les fichiers Excel partagés » | … Une application à la place. | … Une application à la place. **Pas sûr d'en être là ? Voici [les 7 signes qu'Excel ne suffit plus](/blog/limites-excel-entreprise).** |
| 8 | Carte « Les documents à produire » | … c'est le bon d'intervention numérique. | … c'est le bon d'intervention numérique. **Et les factures deviennent électroniques : [ce qui change pour votre TPE ou PME](/facture-electronique-tpe).** |
| 9 | **Nouvelle section** `#exemples` (après « Avant, après ») | — | Voir texte complet ci-dessous |
| 10 | Méthode, étape 03 | Branchée sur vos outils actuels : comptabilité, facturation, messagerie, agenda, Excel. | Branchée sur vos outils actuels : **Excel, Outlook et Microsoft 365, Sage, EBP, Cegid, Pennylane, votre logiciel de paie, votre agenda. Vos données restent les vôtres, exportables à tout moment.** |
| 11 | Section locale `#local` : H2 | Automatisation d'entreprise à Mulhouse et dans le Haut-Rhin. | **Automatisation administrative à Mulhouse et dans le Haut-Rhin.** |
| 12 | Section locale : contenu | 1 phrase | Phrase conservée + **3 cartes** (texte ci-dessous) |
| 13 | FAQ « Faut-il changer de logiciels ? » (visible **et** JSON-LD `FAQPage`) | Non, dans la plupart des cas. Si vos outils peuvent échanger ou exporter leurs données, nous nous y raccordons. Vous gardez vos habitudes. | Non, dans la plupart des cas. Nous nous raccordons à ce que vous utilisez déjà : Excel, Outlook et Microsoft 365, Sage, EBP, Cegid, Pennylane, votre logiciel de paie ou votre agenda, dès qu'ils peuvent échanger ou exporter leurs données. Vous gardez vos habitudes, et vos données restent les vôtres, exportables à tout moment. |
| 14 | JSON-LD `Service` | `areaServed` sans Altkirch, pas de `description` | `areaServed` + « Altkirch » (cité dans le texte visible) ; `description` : « Automatisation des saisies en double, des relances, des documents et des tableaux de bord des TPE et PME, branchée sur leurs logiciels actuels. Première tâche automatisée en 7 jours. » |
| 15 | Numérotation et fonds de section | 01 → 06 | 01 → 07 (nouvelle section 03) ; alternance fond clair/foncé conservée (`section--surface` déplacée sur `#exemples`, `#comparatif`, `#questions`) |

**Texte complet de la nouvelle section `#exemples`** (classes CSS existantes de la page, aucun style ajouté) :

> **03 · Déjà en place**
> ## Ce que nous avons déjà automatisé pour des entreprises d'Alsace.
> Nos clients sont présentés par leur activité, jamais par leur nom. Chaque exemple est un outil réellement livré.
>
> **01 — Sécurité et prévention : plus une échéance qui passe à travers.** Chaque contrôle est suivi et signalé à l'avance. L'historique se constitue tout seul, exportable en un clic.
> **02 — Terrassement : les heures pointées avant de rentrer.** Douze salariés, un rappel automatique en fin de journée, et trente secondes pour saisir sa journée sur place. Voir notre [logiciel BTP sur mesure](/logiciel-btp-sur-mesure).
> **03 — Travaux agricoles : le bon rempli une fois, pas deux.** Signé au doigt chez le client, envoyé en PDF dans la foulée. Le rendez-vous du jour est pré-rempli depuis l'agenda par une IA.
> **04 — Gestion de patrimoine : un fichier par client, puis un seul écran.** Le questionnaire se remplit pendant le rendez-vous et le score se calcule en direct. Un seul écran au lieu d'un fichier par client : c'est ce que permet un [logiciel sur mesure](/logiciel-sur-mesure).

Source de chaque fait : `memoire/agence.md` (Réalisations) et section `#realisations` de l'accueil (« des entreprises d'Alsace »). Aucun nom de client.

**Texte complet des 3 cartes ajoutées à la section locale** :

> **01 — Nous regardons comment vous travaillez vraiment.** Au bureau, à l'atelier ou sur le chantier : nous suivons le chemin d'une information, de la demande du client jusqu'au paiement, avant de proposer quoi que ce soit.
> **02 — Un interlocuteur qui connaît votre dossier.** La même équipe construit l'outil, le fait essayer à vos équipes et l'ajuste ensuite. Quand vous appelez, vous parlez à quelqu'un qui connaît votre dossier.
> **03 — La facture électronique, le bon moment pour automatiser.** Depuis septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques ; les TPE et PME devront les émettre en septembre 2027. C'est l'occasion de relier devis, facture et relance. [Se préparer à la facture électronique](/facture-electronique-tpe).

Sources : méthode en 4 temps et engagements (`agence.md`) ; calendrier de la facture électronique déjà publié sur `/facture-electronique-tpe` et sourcé dans `savoirs/marche-2026.md` (economie.gouv.fr, Keobiz).

### `sitemap.xml`

`<lastmod>` de `https://slagence.fr/automatisation-taches-administratives` : `2026-09-29` → date de mise en ligne.

## Effet mesuré sur le fichier (contrôle local, 2026-10-06)

| Indicateur | Avant | Après |
|---|---|---|
| Title | 62 car. | 59 car. |
| Meta description | 158 car. | 153 car. |
| Mots (hors menu et pied de page) | 971 | 1 361 |
| H2 | 7 | 8 |
| Liens contextuels sortants vers le blog | 0 | 2 |
| Liens contextuels entrants de `/blog/limites-excel-entreprise` / `/blog/relancer-un-devis-sans-reponse` | 2 / 3 | 3 / 4 |
| Liens contextuels entrants de `/logiciel-btp-sur-mesure` / `/facture-electronique-tpe` / `/logiciel-sur-mesure` | 1 / 1 / 2 | 2 / 2 / 3 |
| JSON-LD | 3 blocs valides | 3 blocs valides (parsés), FAQ identique au texte visible |

## Hypothèse et indicateur (ligne à reporter dans `experiences.md` le jour de la mise en ligne)

- **Hypothèse** : une fois la page indexée, ancrer la page dans le Haut-Rhin, y montrer 4 réalisations réelles et la relier au
  blog lui fait gagner des impressions sur les requêtes « tâches administratives / automatisation administrative » (nationales
  et locales), là où elle n'apparaît pas aujourd'hui.
- **Indicateur principal** : Search Console → Performances → filtre page `/automatisation-taches-administratives` → nombre de
  requêtes distinctes contenant « administrati » avec ≥ 1 impression, et position moyenne sur « automatisation tâches administratives ».
- **Valeur avant** : requêtes témoins 3 et 6 « non trouvé dans les 10 premiers » (WebSearch, 2026-10-06) ; Search Console : non
  relevé (export pas encore disponible ; site probablement non indexé).
- **Objectif à J+28** (gagné si atteint) : ≥ 3 requêtes « administrati… » avec impressions **et** position moyenne < 30 sur la
  requête 6. Neutre : impressions sans position < 30. Perdu : aucune impression alors que la page est indexée.
- **Groupe témoin** : comparer avec `/agent-ia-pme` et `/remplacer-excel` (non modifiées à cette date) pour séparer l'effet de
  l'action de l'effet « le site commence à être indexé ».
- **Date de mesure** : J+28 **à partir de la date d'indexation constatée** (Inspection d'URL), pas de la date de fusion.
- **Indicateur secondaire (après A4)** : clics sur « Réserver un appel de 15 minutes » depuis cette page.

## Contrôle qualité (grille `savoirs/seo.md` §9)

| # | Critère | Note | Commentaire |
|---|---|---|---|
| 1 | Intention | 0,5 | Le top 10 national est fait de guides : la page reste une page de service avec des parties explicatives (quelles tâches, avant/après, quel outil, FAQ). Un guide complet serait un autre contenu (à envisager en article si GSC montre ces requêtes). |
| 2 | Title et meta | 1 | 59 car. avec mot-clé + marque ; meta 153 car. avec bénéfice, zone et appel à l'action ; un seul H1. |
| 3 | Réponse directe | 1 | Chapeau : quoi (saisies, relances, documents, tableaux de bord), avec quoi (vos logiciels), en combien de temps (7 jours). |
| 4 | Expérience prouvée | 1 | 4 réalisations réelles avec chiffres (12 salariés, 30 s) tirées de `agence.md`. |
| 5 | Exactitude | 1 | Aucun fait nouveau : tout vient d'`agence.md`, de l'accueil ou de la page facture électronique (sourcée). Aucun nom de client. |
| 6 | Ancrage local | 1 | H1 « du Haut-Rhin », section locale avec contenu propre (déplacement, interlocuteur, échéance), sans liste de villes ajoutée. |
| 7 | Structure lisible | 1 | Cartes courtes, une idée par carte, ton de `ton.md`, aucun jargon (« workflow », « API » absents). |
| 8 | Maillage | 1 | +6 liens contextuels descriptifs (2 articles, 3 services) ; page déjà liée par 6 pages ; `lastmod` du sitemap mis à jour. |
| 9 | Conversion | 1 | Bouton d'appel en haut et en bas, réassurance ajoutée sous le bouton du haut. |
| 10 | Technique | 0,5 | JSON-LD valides (parsés) et conformes au visible ; aucune image ajoutée. Reste à passer le Rich Results Test sur l'URL de prévisualisation au moment de la PR. |

**Note : 9/10** (seuil 8/10 atteint).

## Description de la pull request (prête)

> **SEO — `/automatisation-taches-administratives` : ancrage Haut-Rhin, réalisations, maillage blog**
>
> **Avant** : title 62 car. ; H1 sans zone ; aucune réalisation ; section locale d'une phrase ; 0 lien vers le blog.
> **Après** : title 59 car. ; H1 « … pour les TPE et PME du Haut-Rhin » ; section « Ce que nous avons déjà automatisé » (4 réalisations
> réelles anonymisées) ; section locale avec 3 cartes ; logiciels compatibles et propriété des données ; réassurance sous le bouton
> d'appel ; 2 liens vers le blog, 3 vers des services ; FAQ et JSON-LD alignés ; `lastmod` du sitemap.
> **Pourquoi** : page cœur de la mission ; sur « agence automatisation Haut-Rhin », aucun prestataire d'automatisation administrative
> dans le top 10 (WebSearch du 2026-10-06) ; 7 concurrents présents sur la requête « agence automatisation IA … Haut-Rhin », pas slagence.fr.
> **Mesure** : Search Console, J+28 après indexation : ≥ 3 requêtes « administrati… » avec impressions, position < 30 sur
> « automatisation tâches administratives » ; groupe témoin `/agent-ia-pme`, `/remplacer-excel`.
> Rien n'est modifié dans `index.html`, le formulaire ou les scripts.
