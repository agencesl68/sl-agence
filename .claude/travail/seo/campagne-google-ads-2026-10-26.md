# Campagne Google Ads Search « SL Agence Haut-Rhin » : prête à coller

> Rédigée le 2026-10-26 par `seo-site`, en appui du commando de prospection (plan : `travail/rapports/plan-coup-de-boost-2026-10-26.md`, levier n° 3).
> **Rien n'est dépensé tant que Loïc n'a pas dit « oui »** (règle absolue n° 3). Le site n'est pas modifié.
> Tous les comptes de caractères ci-dessous ont été calculés avec un script Python (`len`) le 2026-10-26.

**L'action qui aura probablement le plus d'impact maintenant : créer la campagne le jour du « oui » de Loïc avec le groupe 1 pointé sur `/logiciel-sur-mesure` (la seule page qui affiche déjà « à partir de 500 € »), puis remplacer cette URL par la page d'offre dès que sa pull request est fusionnée.**

## 0. À savoir avant de lancer (honnêteté sur les chances)

- **Le volume local est probablement très faible.** Le 26/10/2026, la saisie semi-automatique Google ne propose **aucune** suggestion pour « logiciel sur mesure mulhouse », « logiciel sur mesure alsace », « logiciel sur mesure haut-rhin », « application sur mesure mulhouse », « logiciel btp mulhouse », « logiciel transport mulhouse ». Cela ne prouve pas un volume de 0 (la saisie masque les requêtes rares), mais c'est un indice de faible demande. La zone « Haut-Rhin » en « Présence » fait le travail local : les mots-clés sans ville (ex. « développement logiciel sur mesure », présent dans la saisie auto) ne seront montrés qu'aux personnes situées dans le département ou qui s'y rendent régulièrement.
- **Aucun volume n'est inventé.** Search Console ne donne que les impressions de notre propre site (3 mois, du 31/08 au 19/10/2026 : « remplacer excel » 23, « application excel sur mesure » 19, « agence automatisation ia » 27) : ce n'est pas la demande du marché. Le chiffre de demande réel viendra du **Planificateur de mots clés** du compte Ads (à ouvrir avant de publier : voir étape 1 du pas-à-pas) et, ensuite, du rapport « Termes de recherche ». Tout volume ci-dessous est « non mesuré ».
- **Estimation du plan (hypothèse, non sourcée)** : 26 à 140 clics sur 3 semaines pour 210 € HT (CPC de 1,50 € à 8 €). Sur cette base, le but réaliste est d'obtenir **quelques demandes de contact**, pas du trafic. Si le Planificateur indique des volumes quasi nuls, la décision honnête est de ne pas dépenser les 210 € et de les garder.
- **Cohérence annonce / page** : la mention « à partir de 500 € » n'est affichée que sur `/logiciel-sur-mesure` (vérifié par recherche dans le dépôt : 0 occurrence sur `logiciel-btp-sur-mesure.html`, `logiciel-transport-sur-mesure.html`, `bon-intervention-numerique.html`, `remplacer-excel.html`). **Le prix n'apparaît donc que dans les annonces du groupe 1.** Les groupes 2 et 2B n'en mentionnent aucun, pour ne pas envoyer le visiteur sur une page qui contredit l'annonce.
- **État des pages (vérifié le 2026-10-26 sur `origin/main` et la branche de travail)** : les 3 pages d'arrivée, `/realisations`, `/bon-intervention-numerique`, `/remplacer-excel` et `/a-propos` sont en production. Aucune page d'offre n'existe sur aucune branche distante.
- **Page d'offre « 5 places »** : pas encore créée ni validée (il faut l'accord de Sacha sur la capacité). Aucune mention de rareté ou de date dans les annonces tant que ce n'est pas vrai. Quand la page est en ligne : changer l'URL finale du groupe 1 et ajouter 1 titre.

## 1. Paramètres de la campagne

| Réglage | Valeur à saisir | Vérifié sur l'aide Google Ads (2026-10-26) |
|---|---|---|
| Nom | `SL Agence - Search - Haut-Rhin - 2026-10` | — |
| Type de campagne | **Réseau de Recherche** (bouton « Rechercher »). Ni Performance Max, ni campagne intelligente, ni Demand Gen | Oui : « Sous "Sélectionnez un type de campagne", cliquez sur "Rechercher" » (aide 9510373) |
| Objectif | « Créer une campagne sans objectif spécifique » (aucune balise de conversion sur le site). Si Google l'impose : « Trafic vers le site Web » | Libellés « Ventes », « Leads », « Trafic vers le site Web », « Créer une campagne sans objectif spécifique » : oui. La page précise aussi « au moins un objectif de conversion reste requis » : formulation ambiguë, à constater à l'écran |
| Réseaux | **Décocher** « Inclure les partenaires du Réseau de Recherche de Google » **et** « Réseau Display » | Oui : les 2 libellés figurent dans l'aide (aides 9510373 et 1722047) |
| Zone géographique | **Haut-Rhin** (département). Si Google ne le propose pas : Mulhouse, Colmar, Saint-Louis, Altkirch, Guebwiller + rayon de 25 km autour de Friesen | Le libellé « Haut-Rhin » comme lieu ciblable n'a pas pu être vérifié hors interface : **non vérifié** |
| Option de ciblage géographique | **Présence** : « Toucher les personnes situées dans les zones ciblées ou qui s'y rendent régulièrement (présence) ». À ne pas confondre avec l'option par défaut « Présence ou intérêt » | Oui : libellés exacts relevés dans l'aide 1722038 |
| Langue | Français | — |
| Calendrier de diffusion des annonces | **Lundi au samedi, 8 h 00 à 19 h 00** (dimanche : aucune diffusion). Fuseau horaire = celui du compte : régler Europe/Paris à la création du compte | Oui : menu Campagnes > « Calendrier de diffusion des annonces », jusqu'à 6 calendriers par jour et par campagne, fuseau du compte (aide 6372656). Le raccourci « Lun-Sam » n'est pas décrit : **non vérifié** (sinon créer 6 lignes, 1 par jour) |
| Stratégie d'enchères | **Maximiser les clics** (dans l'assistant : optimisation « Clics ») avec la **« Limite d'enchère au CPC maximale »** de **3,00 €** | Oui pour le nom de la stratégie et de la limite (aide 6268626). Le chiffre de 3,00 € est une **hypothèse SL Agence** : milieu de la fourchette du plan (1,50 à 8 €), aucune donnée. À corriger avec le Planificateur de mots clés avant publication |
| Budget | **10 €/jour** (budget quotidien moyen) | Oui : un jour donné peut atteindre 2 fois le budget quotidien moyen, et le plafond mensuel est de 30,4 fois ce budget, soit 304 € (aide 10486938). **Le plafond de 210 € est donc une moyenne, pas un verrou** : voir § 2 |
| Dates | Début = jour du « oui » ; **fin = début + 20 jours** (21 jours). Exemple : début mercredi 2026-10-28, fin mardi 2026-11-17 | « Budget total » avec dates : l'aide dit qu'il impose des dates de début et de fin, mais ne confirme pas qu'il existe pour le Réseau de Recherche : **non vérifié**. Sinon, mettre la date de fin sur la campagne et surveiller à J+7 et J+14 |
| AI Max, « Adaptation du texte », « Extension d'URL finale » | **Tout désactiver** (Campagnes > Paramètres > AI Max, puis décocher chaque option). Sans cela, Google peut envoyer le visiteur sur une autre page et réécrire les annonces | Oui pour AI Max et l'extension d'URL finale (aides 15909989 et 16230205). Le panneau exact « Optimisation des composants » : non vérifié |
| Recommandations de Google | Ne rien appliquer automatiquement ; ne pas accepter « mots-clés en requête large » ni « augmenter le budget » | Principe seulement ; le menu exact des « recommandations appliquées automatiquement » n'a pas été vérifié |
| Mots-clés | Uniquement **Expression exacte** et **Mot clé exact**. Jamais « Requête large » | Oui : 3 types sur le Réseau de Recherche, la requête large étant le type par défaut (aide 2453972) |
| Suivi des appels (compte) | **Désactivé**, pour que le vrai 07 67 08 19 43 s'affiche (décision de Loïc du 26/10 : 07 partout hors site ; le 06 reste sur le site) | Oui : Admin > Paramètres du compte > « Suivi des appels » > Désactivé ; Google précise alors qu'il ne peut plus suivre les appels (aide 9141717). Contrepartie : pas de durée d'appel ni de rapport d'appels |
| Balise de suivi sur le site | **Aucune** (Loïc refuse les outils tiers ; la CNIL exclut le suivi marketing de l'exemption de consentement : « Cookies : solutions pour les outils de mesure d'audience », 04/07/2025, cité dans savoirs/seo.md § 6) | Décision de Loïc, 2026-10-26 |

### Frais réglementaires France : statut vérifié

- Page officielle : aide Google Ads « Surcharges spécifiques à certaines juridictions » (réf. 9750227), section « Coûts d'exploitation liés à la réglementation en France » (en anglais : « France Regulatory Operating Cost »). **Le libellé « frais réglementaires » n'y figure pas.**
- Texte relevé le 2026-10-26 : « As of January 1, 2027, a 3% France Regulatory Operating Cost will be added » et « Prior to January 1, 2027, the France Regulatory Operating Cost was 2% » (le supplément s'ajoute à la facture pour les annonces diffusées en France).
- **Lecture pour cette campagne** : elle se termine avant le 1er janvier 2027, donc le supplément serait de **2 %** (la formulation au passé « was 2% » laisse un doute : **à confirmer sur la 1re facture**, ligne « Coût d'exploitation réglementaire en France » selon une source de presse de 2021). 3 % à partir du 1er janvier 2027 si la campagne est prolongée.
- Calcul SL Agence, pour 210 € HT de clics : 210 × 1,02 = **214,20 € HT** (4,20 € de supplément). La TVA ou l'autoliquidation applicable sur la facture Google n'a pas été vérifiée : **non vérifié**.

## 2. Budget : comment tenir 210 € HT

0. Si l'assistant propose un « budget total de la campagne » (avec dates de début et de fin), le choisir et saisir 210 € : selon l'aide 10486938, le montant payé « ne dépassera jamais votre budget total » (hors supplément France de 2 %). Disponibilité pour le Réseau de Recherche : non vérifiée. Sinon, 10 €/jour et les verrous ci-dessous.
1. Google peut dépenser jusqu'à 20 € un jour donné avec un budget de 10 € ; la moyenne se rééquilibre sur le mois (aide 10486938). Sur 21 jours, 210 € est la cible, pas une garantie.
2. **Verrou le plus sûr (à vérifier sur le compte)** : si le paiement manuel (prépaiement) est proposé, payer **215 €** : les annonces s'arrêtent quand le solde est dépensé. L'aide indique que les suppléments sont facturés une fois le paiement entièrement dépensé et qu'un solde négatif peut apparaître : donc un prépaiement de 215 € peut dépasser de quelques euros. La disponibilité du paiement manuel sur ce compte est **non vérifiée**.
3. À défaut : date de fin posée, puis contrôle **J+7 (2026-11-04 si lancement le 28/10)** et **J+14** : coût cumulé > 110 € à J+7 ou > 160 € à J+14 = baisser le budget à 7 €/jour (seuils internes SL Agence, pas des normes Google).
4. Calcul SL Agence (hypothèse) : à 3 € de CPC moyen, 10 €/jour ≈ 3 clics/jour ≈ 70 clics en 21 jours. Si le CPC réel dépasse le plafond de 3 €, la campagne dépensera moins que 10 € : ce n'est pas un problème, c'est un signal (voir § 9).

## 3. Structure : 1 campagne, 3 groupes d'annonces

La demande de départ prévoyait 2 groupes. **J'en propose 3** : le groupe 2 (BTP / transport / bon d'intervention) est coupé en « 2 » (BTP et bon d'intervention) et « 2B » (transport). Raison : une annonce responsive affiche ses titres au hasard de la combinaison ; une annonce qui mêle « Lettres de voiture » et « Heures pointées » serait hors sujet pour la moitié des recherches, et chaque groupe doit avoir sa propre page d'arrivée. Pour garder strictement 2 groupes, supprimer le groupe 2B et ses mots-clés (le transport est la niche la plus étroite).

| Groupe | Thème | Page d'arrivée (URL finale) | Chemin d'affichage (2 x 15 car. max) |
|---|---|---|---|
| 1 | Logiciel / application sur mesure, remplacer Excel | `https://slagence.fr/logiciel-sur-mesure` (à remplacer par la page d'offre quand elle sera en ligne) | `logiciel` / `sur-mesure` |
| 2 | BTP, chantier, bon d'intervention | `https://slagence.fr/logiciel-btp-sur-mesure` (option : mettre `/bon-intervention-numerique` en URL finale au niveau des mots-clés « bon d'intervention », page plus précise pour ces requêtes) | `logiciel` / `btp` |
| 2B | Transport routier, flotte | `https://slagence.fr/logiciel-transport-sur-mesure` | `logiciel` / `transport` |

## 4. Groupe 1 : logiciel / application sur mesure + remplacer Excel

### Mots-clés (coller dans « Mots clés », un par ligne, avec les crochets ou guillemets)

Signal de demande = présence de la requête dans la saisie semi-automatique Google (France, français), interrogée le 2026-10-26. « Non » ne veut pas dire « aucune recherche ».

| Mot-clé | Type | Signal de demande (26/10/2026) |
|---|---|---|
| `[logiciel sur mesure mulhouse]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[logiciel sur mesure haut-rhin]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[logiciel sur mesure alsace]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[application sur mesure mulhouse]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[application sur mesure alsace]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[logiciel sur mesure pme]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel sur mesure entreprise]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel sur mesure prix]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[prix développement logiciel sur mesure]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[développement logiciel sur mesure]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[agence logiciel sur mesure]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[application métier sur mesure]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[remplacer excel par un autre logiciel]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[application excel sur mesure]` | Mot clé exact | Saisie auto : oui · GSC : 19 impressions de notre site en 3 mois ; volume non mesuré |
| `"logiciel sur mesure mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel sur mesure haut-rhin"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel sur mesure alsace"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"application sur mesure mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"application sur mesure alsace"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel métier sur mesure"` | Expression exacte | Saisie auto : oui ; volume non mesuré |
| `"développeur logiciel sur mesure"` | Expression exacte | Saisie auto : oui ; volume non mesuré |
| `"remplacer excel par une application"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"remplacer excel par un logiciel"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"agence logiciel mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |

### Annonce responsive : 15 titres (≤ 30 caractères)

| # | Titre | Car. |
|---|---|---|
| 1 | Logiciel sur mesure Mulhouse | 28/30 |
| 2 | Logiciel sur mesure Haut-Rhin | 29/30 |
| 3 | Application sur mesure Alsace | 29/30 |
| 4 | Premier outil en 7 jours | 24/30 |
| 5 | À partir de 500 € | 17/30 |
| 6 | Devis gratuit sous 24 h | 23/30 |
| 7 | Prix ferme annoncé d'avance | 27/30 |
| 8 | Remplacez vos fichiers Excel | 28/30 |
| 9 | Tous vos fichiers, un écran | 27/30 |
| 10 | Sans cahier des charges | 23/30 |
| 11 | Diagnostic offert | 17/30 |
| 12 | SL Agence, Friesen (68) | 23/30 |
| 13 | Vos données restent à vous | 26/30 |
| 14 | Outils en service en Alsace | 27/30 |
| 15 | Réservez un appel de 15 min | 27/30 |

### 4 descriptions (≤ 90 caractères)

| # | Description | Car. |
|---|---|---|
| 1 | Logiciel sur mesure pour TPE et PME du Haut-Rhin. Premier outil en 7 jours, dès 500 €. | 86/90 |
| 2 | Devis gratuit sous 24 h, prix ferme annoncé avant de commencer. Sans cahier des charges. | 88/90 |
| 3 | Fichiers Excel qui se multiplient ? Réunis dans un seul écran, partagé par toute l'équipe. | 90/90 |
| 4 | Outils en service chez des entreprises d'Alsace. Vos données restent à vous, exportables. | 89/90 |

Aucune épingle (« pinning ») : laisser Google combiner. Faits tous issus de `logiciel-sur-mesure.html` et `realisations.html` : « à partir de 500 euros », « devis gratuit et prix ferme sous 24 h », « un premier outil en 7 jours », « sans cahier des charges », « un diagnostic offert », « vos données à vous, exportables à tout moment », « des outils en service chez des entreprises d'Alsace ». « Friesen » et « associés » : `agence.md`.

## 5. Groupe 2 : logiciel BTP, bon d'intervention

### Mots-clés

| Mot-clé | Type | Signal de demande (26/10/2026) |
|---|---|---|
| `[logiciel btp sur mesure]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[application chantier sur mesure]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[logiciel suivi chantier]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel suivi heures chantier]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[bon d'intervention numérique]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[bon d'intervention électronique]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[bon d'intervention dématérialisé]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[application bon d'intervention]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel bon d'intervention]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel fiche d'intervention]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `"logiciel btp sur mesure"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel btp mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel btp alsace"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel artisan btp"` | Expression exacte | Saisie auto : oui ; volume non mesuré |
| `"bon d'intervention numérique"` | Expression exacte | Saisie auto : oui ; volume non mesuré |
| `"bon d'intervention numérique mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"application bon d'intervention"` | Expression exacte | Saisie auto : oui ; volume non mesuré |
| `"logiciel bon d'intervention"` | Expression exacte | Saisie auto : oui ; volume non mesuré |

### 15 titres (≤ 30 caractères)

| # | Titre | Car. |
|---|---|---|
| 1 | Logiciel BTP sur mesure | 23/30 |
| 2 | Application chantier Haut-Rhin | 30/30 |
| 3 | Bon d'intervention numérique | 28/30 |
| 4 | Bon signé au doigt, PDF envoyé | 30/30 |
| 5 | 12 salariés pointent en 30 s | 28/30 |
| 6 | Carburant visible le jour même | 30/30 |
| 7 | Pour terrassiers et plombiers | 29/30 |
| 8 | Fini les bons recopiés le soir | 30/30 |
| 9 | Pour le BTP du Haut-Rhin | 24/30 |
| 10 | Premier outil en 7 jours | 24/30 |
| 11 | Devis gratuit sous 24 h | 23/30 |
| 12 | Prix ferme annoncé d'avance | 27/30 |
| 13 | Construit pour votre métier | 27/30 |
| 14 | Rien à installer, sur mobile | 28/30 |
| 15 | Réservez un appel de 15 min | 27/30 |

### 4 descriptions (≤ 90 caractères)

| # | Description | Car. |
|---|---|---|
| 1 | Bons signés au doigt, heures et carburant saisis sur téléphone. Pour le BTP du Haut-Rhin. | 89/90 |
| 2 | Terrassement : 12 salariés pointent en 30 s, 11 engins suivis. Premier outil en 7 jours. | 88/90 |
| 3 | Fini les bons recopiés le soir. Rien à installer : téléphone, tablette ou ordinateur. | 85/90 |
| 4 | Devis gratuit sous 24 h, prix ferme annoncé avant de commencer. Appel de 15 minutes. | 84/90 |

Faits (règle c019 : rien d'enrichi) : « 12 salariés, pointage en 30 secondes » et « 11 engins suivis, carburant visible le jour même » viennent des 2 fiches terrassement de `realisations.html` ; « signé au doigt, PDF envoyé » de la fiche travaux agricoles et de `bon-intervention-numerique.html` ; « sans rien installer, téléphone, tablette et ordinateur » de la page BTP. Le titre « 12 salariés pointent en 30 s » reprend le résultat tel quel, sans le généraliser. Aucun prix dans ce groupe (page BTP sans prix).

## 6. Groupe 2B : logiciel transport (option)

La seule réalisation transport est un **projet en cours** (`realisations.html`) : aucune annonce ne parle donc de résultat obtenu, uniquement de ce que l'outil fait (texte de `logiciel-transport-sur-mesure.html`).

### Mots-clés

| Mot-clé | Type | Signal de demande (26/10/2026) |
|---|---|---|
| `[logiciel transport sur mesure]` | Mot clé exact | Saisie auto : non ; volume non mesuré |
| `[logiciel transport routier]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel gestion transport routier]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `[logiciel de gestion de flotte camion]` | Mot clé exact | Saisie auto : oui ; volume non mesuré |
| `"logiciel transport sur mesure"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel transport mulhouse"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel transport alsace"` | Expression exacte | Saisie auto : non ; volume non mesuré |
| `"logiciel de gestion de flotte camion"` | Expression exacte | Saisie auto : oui ; volume non mesuré |

### 15 titres (≤ 30 caractères)

| # | Titre | Car. |
|---|---|---|
| 1 | Logiciel transport sur mesure | 29/30 |
| 2 | Gestion de flotte sur mesure | 28/30 |
| 3 | Lettres de voiture sur mobile | 29/30 |
| 4 | Livraison signée sur téléphone | 30/30 |
| 5 | Heures des conducteurs saisies | 30/30 |
| 6 | Carburant suivi par véhicule | 28/30 |
| 7 | Planning relié aux commandes | 28/30 |
| 8 | Commandes PDF sans ressaisie | 28/30 |
| 9 | PME de transport du Haut-Rhin | 29/30 |
| 10 | Entretien et permis suivis | 26/30 |
| 11 | Premier outil en 7 jours | 24/30 |
| 12 | Devis gratuit sous 24 h | 23/30 |
| 13 | Prix ferme annoncé d'avance | 27/30 |
| 14 | Rien à installer, sur mobile | 28/30 |
| 15 | Réservez un appel de 15 min | 27/30 |

### 4 descriptions (≤ 90 caractères)

| # | Description | Car. |
|---|---|---|
| 1 | Lettres de voiture signées sur téléphone, heures, carburant, entretien et planning. | 83/90 |
| 2 | Bons de commande reçus par e-mail : la mission se crée dans le planning, sans ressaisie. | 88/90 |
| 3 | Une application web : rien à installer, sur mobile, tablette et poste fixe. Haut-Rhin. | 86/90 |
| 4 | Devis gratuit sous 24 h, prix ferme annoncé avant de commencer. Premier outil en 7 jours. | 89/90 |

## 7. Mots-clés à exclure (liste complète)

Où les saisir : en bas de la liste des campagnes, « Modifier les exclusions » pour le niveau campagne (aide 7102995), ou l'onglet « Mots clés à exclure » de la campagne. Types disponibles : **requête large** (aucun symbole), **expression exacte** (`"…"`), **mot clé exact** (`[…]`).

**2 pièges vérifiés dans l'aide (aide 2453972)** :
1. Une exclusion en *requête large* bloque toute recherche contenant tous ses mots, **dans n'importe quel ordre** : ne jamais saisir « logiciel mesure » sans guillemets, car « logiciel sur mesure » serait exclu. C'est pourquoi les expressions de plus d'un mot sont entre guillemets, et pourquoi **le mot « mesure » n'est jamais exclu seul**.
2. Les variantes (pluriel, accents) ne sont pas couvertes : la liste contient donc les 2 formes (« modèle » et « modele »).

Contrôle fait par script : aucun mot exclu ci-dessous ne figure dans les mots-clés positifs de la campagne.

### 7.1 Niveau campagne (199 entrées)

Thèmes : gratuit et téléchargement ; modèles et documents ; formules Excel ; programmer soi-même ; emploi, études ; définitions ; logiciels concurrents ou outils précis (remplacer Excel par Airtable, Odoo, etc. n'est pas notre offre) ; « sur mesure » hors sujet (meubles, vêtements, applications de mesure) ; calcul et plans de terrassement ; pays hors zone ; jeux et applications mobiles.

```
gratuit
gratuite
gratuits
gratuitement
free
télécharger
telecharger
téléchargement
telechargement
crack
torrent
opensource
libre
pdf
word
modèle
modèles
modele
modeles
template
templates
exemple
exemples
cerfa
imprimer
vierge
formule
formules
fonction
fonctions
macro
macros
vba
virgule
point
tabulation
texte
caractère
caractères
rien
vide
cellule
cellules
colonne
colonnes
csv
libreoffice
openoffice
sheets
python
php
java
javascript
github
wordpress
tutoriel
tuto
tutos
cours
apprendre
formation
formations
emploi
emplois
recrutement
recruter
job
jobs
stage
stages
alternance
cdi
cdd
salaire
salaires
cv
école
ecole
diplôme
diplome
master
bts
iut
uha
étudiant
etudiant
thèse
définition
definition
wikipedia
wikipédia
signification
batappli
obat
ebp
sage
cegid
henrri
quickbooks
odoo
dolibarr
salesforce
sap
zoho
airtable
notion
zapier
powerapps
meuble
meubles
cuisine
cuisines
dressing
placard
vêtement
vêtements
couture
tricot
chaussures
costume
robe
lunettes
musculation
entraînement
sport
fitness
diététique
nutrition
acoustique
audio
angle
toiture
drone
température
pétanque
topographie
3d
autocad
sketchup
bim
cao
dao
cubature
calcul
calculer
calculateur
maroc
marrakech
casablanca
rabat
tunisie
algérie
algerie
sénégal
cameroun
québec
quebec
canada
réunion
guadeloupe
martinique
jeu
jeux
game
gaming
iphone
ios
android
apk
"no code"
"low code"
"open source"
"version gratuite"
"offre d'emploi"
"offres d'emploi"
"lettre de motivation"
"c'est quoi"
"qu'est-ce que"
"comment créer"
"comment faire"
"pour les nuls"
"point par virgule"
"retour à la ligne"
"tableau croisé"
"mise en forme"
"google sheets"
"power apps"
"microsoft access"
"el jadida"
"côte d'ivoire"
"code source"
"programme sur mesure"
"logiciel mesure"
"application mesure"
"mesure sur photo"
"mesure sur image"
"mesure sur plan"
"play store"
"app store"
```

### 7.2 Niveau groupe d'annonces

**Groupe 1** (renvoyer BTP et transport vers les autres groupes) :
```
btp
chantier
chantiers
transport
camion
camions
flotte
intervention
interventions
```

**Groupe 2** (Excel, transport, facturation et devis : intentions d'autres offres) :
```
excel
transport
camion
camions
flotte
routier
facturation
"devis facture"
```

**Groupe 2B** (transport hors cible : scolaire, sanitaire, voyageurs, grands logiciels de logistique) :
```
btp
chantier
chantiers
excel
intervention
interventions
scolaire
sanitaire
voyageurs
voyageur
personne
personnes
vtc
taxi
ambulance
ambulancier
bus
autocar
covoiturage
tms
logistique
wms
entrepôt
entrepot
colis
"transport management"
"supply chain"
```

### 7.3 Routine d'entretien

Au J+3, J+7, J+14 : rapport « Termes de recherche » de la campagne ; ajouter en exclusion **tout terme hors sujet** (par défaut, Google l'ajoute en mot clé exact depuis ce rapport, aide 2453972). Noter dans le suivi la part du budget consommée par des termes hors sujet.

## 8. Composants (extensions)

### 8.1 Appel (niveau campagne)

- Numéro : **07 67 08 19 43** (France). Pas de numéro dans le texte des annonces (il se met uniquement dans ce composant).
- Planning (« Options avancées » du composant) : lundi au samedi, 8 h 00 à 19 h 00, comme la campagne (l'aide 2453991 confirme la planification du composant).
- Rapport d'appels : désactivé (voir § 1). Un clic sur le bouton d'appel est facturé au CPC normal (même aide).
- Les appels arrivent sur le 07. Prévenir Sacha (voir § 11).

### 8.2 Informations sur l'établissement (ex-« composant Lieu »)

- À associer à la fiche Google « SL Agence » (liaison : menu Composants, puis associer la fiche d'établissement ; **libellé exact non vérifié**).
- **Réserve** : la fiche masque l'adresse (établissement de services de proximité, décision du 2026-10-26 de ne plus rediscuter l'adresse). Je n'ai pas pu vérifier si Google Ads affiche un lieu pour une fiche à adresse masquée. **Si la liaison échoue ou n'affiche rien, passer ce composant : il n'est pas nécessaire.** Ne jamais rendre l'adresse publique pour ce seul usage.

### 8.3 Liens annexes (4)

L'aide 2375416 donne 25 caractères pour le texte du lien et exige 2 liens minimum. **La limite de 35 caractères par description n'est pas écrite dans l'aide consultée** (c'est la limite connue de l'interface) : l'interface affichera le décompte, et les lignes ci-dessous sont déjà à 30 caractères ou moins. Si une description est remplie, remplir aussi l'autre.

| Lien | Titre (≤25) | Description 1 (≤35) | Description 2 (≤35) | URL |
|---|---|---|---|---|
| 1 | Nos réalisations (16) | Outils en service en Alsace (27) | Avant, après, par métier (24) | https://slagence.fr/realisations |
| 2 | Bon d'intervention (18) | Signé au doigt, PDF envoyé (26) | Photos et heures horodatées (27) | https://slagence.fr/bon-intervention-numerique |
| 3 | Remplacer Excel (15) | Tous vos fichiers, un écran (27) | Données reprises, export Excel (30) | https://slagence.fr/remplacer-excel |
| 4 | Qui sommes-nous (15) | Basés à Friesen (68) (20) | Sacha et Loïc, associés (23) | https://slagence.fr/a-propos |

### 8.4 Accroches (4, ≤ 25 caractères)

| # | Accroche | Car. |
|---|---|---|
| 1 | Devis gratuit sous 24 h | 23/25 |
| 2 | Prix ferme annoncé | 18/25 |
| 3 | Premier outil en 7 jours | 24/25 |
| 4 | Données exportables | 19/25 |

En réserve (non mises en service par défaut) :

| # | Accroche de réserve | Car. |
|---|---|---|
| 1 | Lundi au samedi, 8 h-19 h | 25/25 |
| 2 | Applications sur mesure | 23/25 |

Aucun prix dans les accroches (campagne commune aux groupes sans prix).

### 8.5 Extraits de site structurés

- En-tête : **Catalogue de services** (liste officielle : Équipements, Marques, Cours, Programmes d'études, Destinations, Sélection d'hôtels, Couverture d'assurance, Modèles, Quartiers, Catalogue de services, Émissions, Styles, Types ; aide 6280012).
- Minimum 3 valeurs (aide), recommandé : au moins 4. La limite de 25 caractères par valeur n'est pas écrite dans l'aide consultée : valeurs choisies ≤ 20.

| # | Valeur | Car. |
|---|---|---|
| 1 | Bons d'intervention | 19/25 |
| 2 | Pointage des heures | 19/25 |
| 3 | Suivi du carburant | 18/25 |
| 4 | Remplacement d'Excel | 20/25 |
| 5 | Relances de factures | 20/25 |
| 6 | Agents IA pour PME | 18/25 |

Toutes ces valeurs existent comme offres sur le site (`agence.md`, services 1, 2, 4, 5).

## 9. Mesure sans balise (Loïc refuse les outils tiers)

**Ce qui est mesurable, dans l'interface Google Ads uniquement** : impressions, clics, CTR, CPC moyen, coût, « Termes de recherche », clics sur les composants (liens annexes, appel). Les appels réels, eux, ne sont pas suivis (suivi des appels désactivé). Les demandes de contact se comptent **à la main** : réservation d'appel dans l'agenda, appels reçus, et la question « Comment nous avez-vous connus ? » notée dans le fichier de suivi (Drive, jamais dans le dépôt).

### Lecture à J+7 (2026-11-04 si lancement le 28/10) : 6 colonnes, 10 minutes

Seuils = conventions internes SL Agence (hypothèses, aucun benchmark sourcé).

| À regarder | Où | Signal | Décision |
|---|---|---|---|
| Impressions sur 7 jours | Tableau des groupes d'annonces | < 100 en 7 jours : zone trop étroite ou CPC max trop bas | Regarder « part d'impressions perdue (classement) » ; si élevée, monter le CPC max à 4 € ; si très faible dès le départ, arrêter et garder le budget |
| CTR par groupe | Idem | < 1 % après 100 impressions : annonce peu pertinente | Réécrire les titres du groupe, vérifier les termes de recherche |
| CPC moyen vs 3 € | Idem | CPC moyen proche du plafond | La demande est chère : réduire à 7 €/jour ou couper le groupe 2B |
| Termes de recherche | Rapport « Termes de recherche » | Plus de 30 % de termes hors sujet | Ajouter les exclusions (§ 7.3) avant de continuer |
| Clics sur le composant d'appel et clics sur les liens annexes | Composants | 0 clic d'appel sur 7 jours avec > 20 clics | Normal en B2B ; l'indicateur utile est ailleurs |
| Demandes réelles | Agenda de réservation, appels reçus, question « comment nous avez-vous connus ? » | ≥ 1 demande attribuée à Google à J+14 | Sinon : couper à J+14 (aucune donnée ne justifie de continuer) |

Autres lectures gratuites, sans nouvelle balise : recherches sur la marque « SL Agence » dans Search Console (une hausse peut venir des annonces vues sans clic) ; statistiques de la fiche Google. Verdict à J+21 → ajouter la leçon dans `memoire/apprentissages.md` (section SEO et site).

## 10. Pas-à-pas pour Loïc (10 étapes, environ 60 minutes la première fois)

1. **Compte** : ouvrir le compte Google Ads en **mode Expert** (pas la campagne intelligente), pays France, devise euro, fuseau Europe/Paris. Ouvrir le **Planificateur de mots clés** (menu Outils) et regarder les prévisions des mots-clés du groupe 1 : si les clics prévus sont quasi nuls ou le CPC > 8 €, **me le dire avant d'aller plus loin**. Si Google demande la validation de l'identité de l'annonceur (Admin > Règlement > Compte), la faire.
2. **Nouvelle campagne** : Campagnes > « + » > « Créer une campagne sans objectif spécifique » > type « Rechercher ». Nom du § 1.
3. **Réseaux, zone, langue** : décocher « Inclure les partenaires du Réseau de Recherche de Google » et « Réseau Display ». Zone « Haut-Rhin » en option « Présence ». Langue français. Désactiver AI Max, adaptation du texte et extension d'URL finale.
4. **Budget, enchères, dates** : budget total de 210 € si l'option est proposée, sinon 10 €/jour ; optimisation « Clics » ; limite d'enchère au CPC maximale 3 € ; dates début et fin (§ 1). Dans « Afficher plus de paramètres », créer le « Calendrier de diffusion des annonces » lundi-samedi 8 h-19 h.
5. **Groupe 1** : coller les mots-clés du § 4 ; annonce responsive : URL finale, chemin d'affichage, 15 titres, 4 descriptions (copier-coller des tableaux). Vérifier l'« Efficacité de l'annonce » (viser « Bonne » ; ne pas ajouter de titres non listés ici).
6. **Groupe 2** (§ 5), puis **groupe 2B** (§ 6, facultatif) : même méthode, chacun avec sa page d'arrivée.
7. **Exclusions** : coller la liste du § 7.1 au niveau campagne, puis celles du § 7.2 dans chaque groupe.
8. **Composants** : appel (07 67 08 19 43 + planning), 4 liens annexes, 4 accroches, extraits « Catalogue de services », informations sur l'établissement si possible (§ 8). Dans Admin > Paramètres du compte : « Suivi des appels » sur Désactivé.
9. **Paiement** : choisir paiement manuel de 215 € si proposé ; sinon carte avec date de fin posée. Vérifier le récapitulatif : budget 10 €/jour, Réseau de Recherche seul, Présence.
10. **Publier**, puis me transmettre : une capture du récapitulatif de la campagne, et à **J+1** (rapport « Termes de recherche » + impressions). Je prépare alors la lecture de J+7.

## 11. Ce qui reste non vérifié ou à décider

- **Non vérifié** (aide Google Ads consultée le 2026-10-26, interface non ouverte) : libellé « mode Expert » et nom exact du « Planificateur de mots clés » ; « Haut-Rhin » comme lieu ciblable ; raccourci « Lun-Sam » du calendrier ; budget total pour le Réseau de Recherche ; libellé exact de l'option de limite de CPC dans l'assistant ; limite de 35 caractères des descriptions de liens annexes et de 25 des valeurs d'extraits ; menu des recommandations appliquées automatiquement ; liaison de la fiche Google avec une adresse masquée ; régime de TVA des factures Google ; disponibilité du paiement manuel.
- **Hypothèses chiffrées** : CPC max 3,00 €, 70 clics, seuils du § 9 et du § 2.
- **Décisions pour Loïc** : (1) oui/non au plafond de 210 € HT (214,20 € HT avec le supplément France à 2 %) ; (2) garder le groupe 2B transport ou le retirer ; (3) prévenir Sacha : les appels de l'annonce sonnent sur le 07, du lundi au samedi de 8 h à 19 h ; (4) date de lancement ; (5) accord de Sacha sur la page d'offre pour remplacer l'URL du groupe 1.

## 12. Sources (aide Google Ads, consultée le 2026-10-26)

- Ciblage géographique : https://support.google.com/google-ads/answer/1722038?hl=fr
- Stratégie « Maximiser les clics » : https://support.google.com/google-ads/answer/6268626?hl=fr
- Création d'une campagne Réseau de Recherche : https://support.google.com/google-ads/answer/9510373?hl=fr
- Calendrier de diffusion : https://support.google.com/google-ads/answer/6372656?hl=fr
- Annonces responsives (30 / 90 caractères) : https://support.google.com/google-ads/answer/17092074?hl=fr
- Mots clés à exclure : https://support.google.com/google-ads/answer/2453972?hl=fr
- Liens annexes : https://support.google.com/google-ads/answer/2375416?hl=fr
- Accroches : https://support.google.com/google-ads/answer/6079510?hl=fr
- Extraits structurés : https://support.google.com/google-ads/answer/6280012?hl=fr
- Composant d'appel : https://support.google.com/google-ads/answer/2453991?hl=fr
- Suivi des appels : https://support.google.com/google-ads/answer/9141717?hl=fr
- Budgets : https://support.google.com/google-ads/answer/10486938?hl=fr
- AI Max / extension d'URL finale : https://support.google.com/google-ads/answer/15909989?hl=fr ; https://support.google.com/google-ads/answer/16230205?hl=fr
- Surcharges par pays (France) : https://support.google.com/google-ads/answer/9750227?hl=en
- Saisie semi-automatique : interrogée le 2026-10-26 (France, français) ; Search Console : `memoire/apprentissages.md` (3 mois au 19/10/2026).
