# Manuel du Lead Hunter — trouver, qualifier, prioriser, approcher (Haut-Rhin)

> Version 1 — 2026-10-06. Manuel de l'agent `prospection`. Relecture trimestrielle (prochaine : janvier 2027,
> obligatoire à cause du passage à la NAF 2025 au 1er janvier 2027).
> Hors périmètre : la rédaction des e-mails (voir `savoirs/emailing.md`).
> Les retours terrain de `memoire/apprentissages.md` priment sur ce manuel.
> Toutes les requêtes marquées « testé le 2026-10-06 » ont été exécutées et ont renvoyé des résultats.

## Plan

1. Règles d'or
2. Sources gratuites et requêtes prêtes à l'emploi
3. Tableau des codes NAF des secteurs prioritaires
4. Signaux d'achat et comment les détecter
5. Qualification légère et grille de score v2 (proposition)
6. Cadence multicanale sur 3 semaines
7. Scripts : appel à froid, objections, visite, LinkedIn
8. Réseau et prescripteurs
9. RGPD / CNIL pour un fichier B2B
10. Grille d'auto-évaluation d'un lot (10 critères, seuil 8/10)
11. Sources réellement consultées

---

## 1. Règles d'or

1. **Un fait réel par prospect, sinon pas de prospect.** La campagne générique d'août 2026 (« Je me permets de
   vous contacter… ») n'a produit aucune réponse connue (`apprentissages.md`). Chaque entreprise retenue doit
   porter au moins un fait daté et sourcé (offre d'emploi, avis Google, reprise, nouvelle agence, page du site).
2. **Vérifier avant de chercher plus loin.** ~40 % de la feuille historique est fermée, introuvable ou trop
   petite. Premier contrôle systématique : `etat_administratif=A` dans l'API Recherche d'entreprises, puis
   tranche d'effectif, puis historique Gmail (`in:anywhere`, nom ET domaine).
3. **Le siège compte, pas l'établissement.** Le filtre `departement=68` de l'API renvoie aussi des groupes
   dont le siège est ailleurs mais qui ont un établissement dans le 68 (constaté : sièges à Woippy, Nancy,
   Strasbourg, Montbonnot). Contrôler `siege.departement == "68"` et écarter les réseaux et grands groupes.
4. **Du moins cher au plus cher.** Feuille Drive → API publiques (État, BODACC, France Travail) → site et
   fiche Google de l'entreprise → presse locale → Vibe Prospecting (crédits, estimation obligatoire, jamais
   d'export sans le « oui » de Loïc).
5. **Le téléphone ouvre, l'écrit confirme.** Pour un dirigeant de TPE du bâtiment ou du transport, qui passe
   sa journée sur le terrain, l'appel (ou le passage sur place) est le canal d'ouverture ; l'e-mail et
   LinkedIn servent à préparer et confirmer. Pour les cabinets (comptables, avocats, patrimoine), LinkedIn et
   l'e-mail pèsent davantage.
6. **On vend un rendez-vous de 15 minutes, pas un logiciel.** Toute approche se termine par une demande
   légère : « 15 minutes au téléphone pour voir si ça vaut le coup ». Jamais de prix.
7. **Ne jamais citer un client.** On parle de « une entreprise de terrassement du Haut-Rhin, 12 salariés ».
8. **Aucune donnée nominative dans le dépôt.** Noms, e-mails, téléphones vivent dans Drive et Gmail.
9. **Toute information non trouvée s'écrit « non trouvé ».** Jamais d'adresse devinée (prenom.nom@…).
10. **Lots de 10, dont 5 chauds.** Mieux vaut 10 prospects vérifiés que 40 lignes d'annuaire.

---

## 2. Sources gratuites et requêtes prêtes à l'emploi

### 2.1 API Recherche d'entreprises (État) — la source n° 1

- Base : `https://recherche-entreprises.api.gouv.fr/search` — gratuite, **sans clé**, interrogeable par WebFetch.
- Limites : **7 requêtes/seconde par IP** ; `per_page` max **25** (documentation OpenAPI, consultée le 2026-10-06).
- Version lisible humaine : `https://annuaire-entreprises.data.gouv.fr/` (même source, fiche par SIREN).

**Paramètres utiles** (documentation OpenAPI) :

| Paramètre | Valeurs | Usage |
|---|---|---|
| `activite_principale` | codes NAF séparés par des virgules (`43.12A,43.99C`) | secteur |
| `section_activite_principale` | lettre A à U (`F` = construction) | secteur large |
| `departement` / `code_postal` / `code_commune` / `epci` | listes séparées par des virgules | zone |
| `tranche_effectif_salarie` | codes INSEE (voir ci-dessous) | taille |
| `etat_administratif` | `A` (active) / `C` (cessée) | exclure les fermées |
| `categorie_entreprise` | `PME`, `ETI`, `GE` | écarter ETI/GE |
| `est_entrepreneur_individuel` | `true`/`false` | |
| `est_rge` | `true` | artisans RGE (bâtiment) |
| `ca_min`, `ca_max` | entiers | si finances publiées |
| `minimal=true&include=dirigeants` | | réponse allégée + dirigeants |
| `q` | texte (nom, adresse, dirigeant) ou SIREN/SIRET | recherche libre |

**Codes de tranche d'effectif** (nomenclature INSEE) : `01` = 1-2 · `02` = 3-5 · `03` = 6-9 · `11` = 10-19 ·
`12` = 20-49 · `21` = 50-99. Cœur de cible 3-49 = `02,03,11,12`.

**Champs renvoyés** (constatés) : `siren`, `nom_complet`, `date_creation`, `etat_administratif`,
`nature_juridique`, `activite_principale` (NAF actuelle), `activite_principale_naf25` (future NAF 2025),
`tranche_effectif_salarie` + année de référence (2024 constatée), `dirigeants` (nom, prénoms, qualité),
`siege` (adresse, code postal, commune, département, coordonnées), `matching_etablissements`, `finances`,
`complements` (dont `est_rge`, convention collective).

**Requêtes testées le 2026-10-06 (résultats réels)** :

| Objectif | Requête (à coller après `/search?`) | Résultat |
|---|---|---|
| Terrassiers 3-49 sal. du 68 | `activite_principale=43.12A&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A&per_page=25` | 40 entreprises (tranche `03,11,12` testée) |
| Tout le second œuvre / gros œuvre 3-99 sal. | `activite_principale=43.99C,43.21A,43.22A,43.22B,43.31Z,43.32A,43.91A,43.91B,43.12A&departement=68&tranche_effectif_salarie=02,03,11,12,21&etat_administratif=A&per_page=25` | 812 entreprises |
| Artisans RGE du bâtiment 10-99 sal. | `est_rge=true&section_activite_principale=F&departement=68&tranche_effectif_salarie=11,12,21&etat_administratif=A&per_page=25` | 154 entreprises |
| Travaux agricoles / forestiers | `activite_principale=01.61Z,01.62Z,02.40Z&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A` | 22 entreprises |
| Sécurité, contrôles, diagnostics | `activite_principale=80.10Z,80.20Z,71.20B&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A` | 46 (dont sièges hors 68 à écarter) |
| Transport et logistique | `activite_principale=49.41A,49.41B,49.42Z,52.29A,52.29B&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A` | 169 (nombreux sièges hors 68) |
| Immobilier, courtage, juridique | `activite_principale=68.31Z,68.32A,66.22Z,66.19B,69.10Z&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A` | 284 (nombreux sièges hors 68) |
| Experts-comptables + dirigeants | `activite_principale=69.20Z&departement=68&tranche_effectif_salarie=02,03,11,12&etat_administratif=A&minimal=true&include=dirigeants` | 140 (les premiers sont des réseaux nationaux : à écarter) |
| Recherche par mot et villes | `q=terrassement&code_postal=68100,68200,68110,68390&etat_administratif=A` | 5 résultats, effectif « NN » |

**Pièges constatés** :
- `departement=68` filtre sur les établissements : toujours vérifier `siege.departement`.
- Beaucoup de petites entreprises ont une tranche **« NN » (non renseignée)** : elles disparaissent dès qu'on
  filtre par effectif. Pour le BTP, faire une seconde passe sans filtre d'effectif puis vérifier la taille
  sur le site, la fiche Google ou les offres d'emploi.
- Effectif = année N-2 (2024 en 2026) : une entreprise en croissance peut être sous-estimée.
- Pour paginer : `&page=2`, `&page=3`… (25 par page). Pour un lot, ne lire que 2 à 4 pages et trier ensuite.

### 2.2 Sirene INSEE (API officielle)

- Portail : `https://portail-api.insee.fr/` — gratuit après création d'un compte « externe » et souscription
  à l'API Sirene ; clé dans l'en-tête `X-INSEE-Api-Key-Integration` (notice INSEE consultée le 2026-10-06).
- Intérêt par rapport à l'API Recherche d'entreprises : requêtes multicritères fines (date de création,
  historique des établissements, liens de succession). **Utile seulement si Loïc crée le compte** ;
  l'agent ne peut pas s'inscrire. Fichier complet téléchargeable aussi sur data.gouv.fr (« Base Sirene des
  entreprises et de leurs établissements »).

### 2.3 BODACC — reprises, changements de dirigeant, créations

- API Opendatasoft gratuite, sans clé : `https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records`
- Valeurs de `familleavis` constatées : `vente` (ventes et cessions), `modification`, `creation`.
- **Piège** : `numerodepartement="68"` renvoie aussi des communes du Bas-Rhin (Sélestat, Châtenois,
  Muttersholtz) rattachées au greffe de Colmar → filtrer par **`cp like "68*"`**.

| Signal | Paramètre `where=` (à encoder dans l'URL) | Résultat testé le 2026-10-06 |
|---|---|---|
| Ventes et cessions de fonds (repreneur = nouveau dirigeant) | `numerodepartement="68" AND familleavis="vente"` + `&order_by=dateparution desc&limit=20` | 8 660 annonces ; dernières du 2026-10-06 |
| Changement d'administration (nouveau gérant) hors dissolutions | `cp like "68*" AND familleavis="modification" AND modificationsgenerales like "*administration*" AND NOT modificationsgenerales like "*dissolution*" AND dateparution>="2026-09-01"` | 181 annonces en un mois |
| Créations | `numerodepartement="68" AND familleavis="creation" AND dateparution>="2026-09-01"` | 600 (surtout des personnes physiques : faible intérêt) |

Ajouter `&select=dateparution,commercant,ville,cp,registre,modificationsgenerales` pour alléger la réponse.
Le champ `registre` donne le SIREN → recouper dans l'API Recherche d'entreprises (secteur, effectif).
Une recherche plein texte `search(modificationsgenerales,"dirigeant")` a renvoyé 0 : utiliser `like "*administration*"`.

### 2.4 France Travail — offres d'emploi (signal de croissance et de surcharge)

- Page publique sans compte, lisible par WebFetch (testé le 2026-10-06) :
  `https://candidat.francetravail.fr/offres/recherche?motsCles=assistant+administratif&lieux=68D&offresPartenaires=true&tri=1`
  → 59 offres dans le Haut-Rhin. `lieux=68D` = département 68 ; `tri=1` = plus récentes d'abord.
- Mots-clés à faire tourner : `secretaire`, `assistant+administratif`, `assistante+de+gestion`,
  `conducteur+de+travaux`, `chef+de+chantier`, `comptable`, `assistant+juridique`, `exploitant+transport`.
- **Piège** : une grande partie des annonces vient d'agences d'intérim (constaté : 3 sur les 5 premières).
  L'employeur réel est souvent masqué : ne retenir que les offres où l'entreprise est nommée.
- API officielle « Offres d'emploi » : gratuite sur `francetravail.io` après inscription (à créer par Loïc).

### 2.5 Pappers

- Fiches entreprises consultables gratuitement sur le site (dirigeants, comptes déposés, annonces).
  La page tarifs renvoie une erreur 403 à l'agent : conditions de l'offre API **non vérifiées**. Usage :
  consultation manuelle ponctuelle par Loïc ; l'agent privilégie l'API de l'État, qui couvre les mêmes données
  publiques.

### 2.6 Annuaires et réseaux professionnels

| Source | Ce qu'on y trouve | Usage |
|---|---|---|
| « Artisans du bâtiment by CAPEB » (artisans-du-batiment-by-capeb.com) | Artisans adhérents CAPEB, labellisés RGE, Handibat, Silverbat | Liste d'artisans engagés, recouper avec l'API |
| `est_rge=true` dans l'API (ci-dessus) | Entreprises RGE | Même cible, plus rapide |
| FFB Alsace, CCI Alsace Eurométropole, CMA Alsace | Annuaires d'adhérents, agenda d'événements | Événements et prescripteurs (section 8) |
| PagesJaunes / Google Maps | Téléphone standard, horaires, **avis** | Signal de douleur (avis sur les délais), canal |
| Site de l'entreprise | Formulaires PDF, « devis par mail », pas de RDV en ligne | Signal de faible maturité |
| Presse locale (L'Alsace, DNA) | Reprises, nouveaux locaux, anniversaires, prix | Fait d'accroche daté |
| Page LinkedIn entreprise | Recrutements, publications du dirigeant | Canal LinkedIn |

**Recherche Google Maps type** : « terrassement Altkirch », « expert-comptable Saint-Louis »,
puis lire les avis 1 à 3 étoiles des 24 derniers mois en cherchant : « pas rappelé », « devis jamais reçu »,
« injoignable », « délai », « relance ». Citer l'avis sans nommer son auteur.

---

## 3. Tableau des codes NAF des secteurs prioritaires

> NAF rév. 2 (en vigueur jusqu'au 31/12/2026). La **NAF 2025** entre en vigueur le **1er janvier 2027**
> (décret n° 2025-736 du 31 juillet 2025) ; 2026 est une année de double affichage. L'API expose déjà
> `activite_principale_naf25` (ex. constaté : 71.20B → 71.20H). Revoir ce tableau en janvier 2027.

| Priorité | Secteur | Codes NAF rév. 2 | Remarques |
|---|---|---|---|
| A | Terrassement, démolition | 43.12A (terrassement courant, travaux préparatoires), 43.12B (terrassements spécialisés, grande masse), 43.11Z (démolition) | 2 réalisations SL Agence |
| A | Gros œuvre, maçonnerie | 43.99C (maçonnerie générale, gros œuvre), 41.20A/41.20B (construction de maisons / autres bâtiments) | |
| A | Second œuvre | 43.21A (électricité), 43.22A (eau, gaz), 43.22B (chauffage, clim), 43.29A (isolation), 43.31Z (plâtrerie), 43.32A (menuiserie bois/PVC), 43.32B (menuiserie métallique, serrurerie), 43.33Z (sols et murs), 43.34Z (peinture, vitrerie), 43.91A (charpente), 43.91B (couverture), 43.99A (étanchéité), 43.99D (autres travaux spécialisés) | Croiser avec `est_rge=true` |
| A | Travaux publics, VRD, paysage | 42.11Z (routes), 42.21Z (réseaux fluides), 81.30Z (aménagement paysager) | |
| A | Travaux agricoles et forestiers | 01.61Z (soutien aux cultures = ETA), 01.62Z (soutien à la production animale), 02.40Z (soutien à l'exploitation forestière), 02.20Z (exploitation forestière) | 22 entreprises 3-49 sal. dans le 68 |
| A | Sécurité, prévention, contrôles | 80.10Z (sécurité privée), 80.20Z (systèmes de sécurité), 71.20B (analyses, essais, inspections techniques, dont diagnostics), 33.12Z (réparation de machines, souvent maintenance d'extincteurs : à vérifier au cas par cas) | Rattacher la prévention incendie au cas par cas |
| B | Experts-comptables | 69.20Z | Beaucoup de réseaux nationaux : écarter |
| B | Avocats, notaires, huissiers | 69.10Z | Le code ne distingue pas les professions : lire le nom |
| B | Gestion de patrimoine, CGP, courtage en crédit | 66.19B (autres activités auxiliaires de services financiers), 70.22Z (conseil de gestion, utilisé par certains CGP) | 1 réalisation SL Agence |
| B | Courtage en assurance | 66.22Z | |
| B | Immobilier | 68.31Z (agences), 68.32A (administration d'immeubles, syndics) | Écarter les franchises |
| B | Transport et logistique | 49.41A (fret interurbain), 49.41B (fret de proximité), 49.42Z (déménagement), 52.29A (messagerie, fret express), 52.29B (affrètement, organisation des transports), 52.10B (entreposage) | Nombreux sièges hors 68 |
| C | Santé libérale | 86.23Z (dentaire), 86.90E (kiné et rééducation), 75.00Z (vétérinaires) | Souvent déjà équipés |

Codes vérifiés par requête réelle le 2026-10-06 : 43.12A, 43.99C, 43.21A, 43.22A, 43.22B, 43.31Z, 43.32A,
43.91A, 43.91B, 01.61Z, 01.62Z, 02.40Z, 80.10Z, 80.20Z, 71.20B, 49.41A, 49.41B, 49.42Z, 52.29A, 52.29B,
68.31Z, 68.32A, 66.22Z, 66.19B, 69.10Z, 69.20Z (requêtes sectorielles avec résultats dans le 68).
Les autres codes du tableau (43.12B, 43.11Z, 41.20A/B, 43.29A, 43.32B, 43.33Z, 43.34Z, 43.99A, 43.99D,
42.11Z, 42.21Z, 81.30Z, 02.20Z, 33.12Z, 70.22Z, 52.10B, 86.23Z, 86.90E, 75.00Z) ont été acceptés par l'API
dans une requête groupée (7 959 entreprises actives liées au 68, toutes tailles) : valides, mais leur
volume individuel n'a pas été mesuré.

---

## 4. Signaux d'achat et comment les détecter gratuitement

> Aucun de ces signaux n'a encore été mesuré sur les prospects de SL Agence. Ils sont classés par logique
> (proximité avec nos offres) ; **le taux de réponse réel par signal doit être consigné dans
> `apprentissages.md`** et ce classement révisé après 30 contacts.

| # | Signal | Pourquoi il compte | Où le détecter (gratuit) | Offre SL Agence liée | Fraîcheur max |
|---|---|---|---|---|---|
| 1 | **Recrutement administratif** (secrétaire, assistant(e), assistante de gestion) | Le dirigeant achète du temps administratif : une automatisation peut compléter ou soulager le poste | France Travail (`lieux=68D`), Indeed, page Carrières, LinkedIn entreprise | Automatisation administrative, documents générés, agent IA | 60 jours |
| 2 | **Recrutement terrain** (conducteur de travaux, chef de chantier, chauffeur, technicien) | Croissance → plus de bons, d'heures, de plannings à consolider | France Travail, presse locale | Bons d'intervention, pointage, remplacer Excel | 60 jours |
| 3 | **Reprise ou changement de dirigeant** | Un repreneur revoit les outils dans les 12 premiers mois et hérite souvent de fichiers épars | BODACC (`familleavis="vente"` ou `modification` + « administration »), presse | Remplacer Excel, application métier | 12 mois |
| 4 | **Échéance facture électronique** : réception obligatoire depuis le 1er septembre 2026 pour toutes les entreprises assujetties à la TVA ; émission obligatoire pour les PME, TPE et micro-entreprises au 1er septembre 2027 | Échéance datée, connue, qui touche toute la cible | Universel : utiliser surtout comme **angle secondaire**, combiné à un autre signal | Page `/facture-electronique-tpe`, automatisation entre logiciels | jusqu'au 01/09/2027 |
| 5 | **Avis Google qui se plaignent de délais, de rappels ou de devis non reçus** | Douleur exprimée par les clients du prospect, citable mot pour mot | Google Maps, PagesJaunes (avis 1-3 étoiles, 24 derniers mois) | Relances automatiques, portail et prise de RDV | 24 mois |
| 6 | **Faible maturité visible sur le site** : formulaire PDF à imprimer, « envoyez-nous votre bon par mail », devis « sur demande par mail », pas de RDV en ligne, pas d'espace client | Preuve directe d'une ressaisie | Site de l'entreprise (WebFetch) | Formulaires et documents automatiques, portail | — |
| 7 | **Nouvelle agence, nouveau dépôt, déménagement** | Organisation multi-sites → besoin d'un écran commun | Presse locale, LinkedIn entreprise, fiche annuaire-entreprises (onglet établissements). BODACC capte peu ce signal (5 annonces « établissement secondaire » dans le 68 en un mois, surtout commerce) | Application métier, remplacer Excel | 6 mois |
| 8 | **Flotte ou parc d'engins qui grandit** (nouveaux véhicules, engins) | Carburant, entretien, contrôles à suivre | Publications LinkedIn/Facebook de l'entreprise, presse | Suivi carburant, registres et échéances | 6 mois |
| 9 | **Obligation de registre ou de contrôle** (sécurité, prévention, contrôles périodiques) | Échéances à ne pas rater, historique à prouver | Secteur NAF (80.xx, 71.20B), site | Conformité et registres | — |
| 10 | **Anniversaire, prix, article de presse** | Prétexte d'accroche positif, pas une douleur | L'Alsace, DNA, Journal des entreprises | Accroche seulement | 3 mois |

**Contexte chiffré utile (France Num, baromètre 2025, 11 021 entreprises dont 7 878 TPE)** : 78 % des dirigeants
voient des bénéfices réels au numérique ; 46 % prévoient plus de 1 000 € de dépenses informatiques (44 % en 2024) ;
26 % des TPE et PME utilisent l'IA (34 % des PME), un usage qui a doublé en un an. À utiliser pour
dédramatiser (« un quart des petites entreprises s'y sont déjà mises »), jamais comme preuve d'un besoin individuel.

**Combinaisons les plus fortes** (à prioriser dans un lot) : 1 + 6 (recrute une assistante ET formulaires papier),
3 + 6 (repreneur ET outils anciens), 2 + 8 (croissance terrain ET flotte), 5 + secteur A.

**Faux signaux à écarter** : offres d'emploi publiées par une agence d'intérim sans nom d'employeur ;
« modification de l'administration » liée à une dissolution ou une cessation ; création de micro-entreprise
sans salarié ; avis Google de plus de deux ans.

---

## 5. Qualification légère et grille de score v2 (proposition)

### 5.1 Pourquoi CHAMP plutôt que BANT ou MEDDIC

- **BANT** (Budget, Authority, Need, Timing) commence par le budget : un dirigeant de TPE n'a presque jamais
  de budget « logiciel » prévu ; on disqualifierait à tort.
- **MEDDIC** est conçu pour des ventes complexes à plusieurs décideurs : trop lourd pour un gérant seul.
- **CHAMP** (Challenges, Authority, Money, Prioritization ; attribué à Zorian Rotenberg) commence par la
  douleur. Version SL Agence, **4 questions à se poser pendant le premier appel** :

| Lettre | Question à vérifier | Formulation au téléphone | Disqualifiant si… |
|---|---|---|---|
| C — Challenge | Une tâche concrète est-elle faite deux fois ? | « Aujourd'hui, un bon / une heure / un devis, il est noté où, et ressaisi où ? » | Rien n'est ressaisi, tout est déjà dans un logiciel métier qui convient |
| H/A — Autorité | Mon interlocuteur décide-t-il seul ? | « Sur ce genre de sujet, c'est vous qui tranchez, ou vous en parlez avec quelqu'un ? » | Outils imposés par une tête de réseau |
| M — Money | Le coût de la douleur est-il chiffrable ? | « Ça vous prend combien de temps par semaine, à vous ou à votre secrétaire ? » | Moins d'une heure par semaine |
| P — Priorité | Est-ce un sujet pour les 3 prochains mois ? | « Si on vous enlevait ça, ce serait pour maintenant ou après la saison ? » | « Pas avant un an » → statut `Plus tard` + date |

Un prospect qui coche C + A + P au téléphone justifie la proposition du rendez-vous de 15 minutes avec
partage d'écran (méthode `agence.md`, étape 1).

### 5.2 Grille de score v2 (PROPOSITION — `cible.md` reste la référence tant que Loïc ne l'a pas validée)

Changements par rapport à la v1 : la taille doit être **vérifiée** (beaucoup de « NN ») ; le signal doit être
**daté** ; un bonus récompense la proximité (recommandation, réseau commun), qui est le canal le plus
efficace en local ; des exclusions automatiques évitent de scorer des entreprises hors cible.

| Critère | Points | Règle de preuve |
|---|---|---|
| Secteur priorité A / B / C | 20 / 12 / 5 | NAF ou description du site |
| Taille 3-49 salariés **vérifiée** (API, site, offre d'emploi) ; 1-2 ou « NN » non vérifié | 15 / 5 | URL de la source de l'effectif |
| Siège dans le Haut-Rhin / Alsace hors 68 | 10 / 5 | `siege.departement` |
| Douleur administrative sourcée : citation explicite (avis, page du site) / indice indirect | 20 / 10 | URL + citation |
| Déclencheur daté de moins de 90 jours (recrutement, reprise, nouvelle agence) / échéance générique seule (facture électronique) | 15 / 5 | URL + date |
| Décideur identifié (nom + rôle sourcés) | 10 | API (dirigeants) ou site |
| Canal d'ouverture direct : ligne directe publiée ou profil LinkedIn actif du dirigeant (publication < 3 mois) / standard ou e-mail générique | 5 / 3 | URL |
| Proximité : recommandation, prescripteur, réseau commun, même commune que Friesen/Sundgau | 5 | Préciser le lien |
| **Total** | **100** | |

**Exclusions automatiques (pas de score)** : entreprise cessée ; siège hors Alsace ; franchise ou réseau
national ; client existant ; conversation en cours dans Gmail ; contacté il y a moins de 30 jours.
**Malus** : logiciel métier complet déjà en place et récent (−10) ; déjà contacté sans réponse (traiter en
relance, pas en premier contact).

**Seuils inchangés** : ≥ 70 chaud (contacter cette semaine) · 50-69 tiède · < 50 ne pas contacter maintenant.

### 5.3 Méthode de tri d'un lot (30 minutes pour 10 prospects)

1. Extraire 40 à 60 candidats (feuille Drive « À contacter » d'abord, puis API par NAF).
2. Écarter les exclusions automatiques (API : état, siège, effectif).
3. Pour les 20 restants : 5 minutes chacun sur le site, la fiche Google et France Travail → noter le fait réel.
4. Scorer, garder les 10 meilleurs, vérifier Gmail (`in:anywhere`, nom ET domaine).
5. Écrire l'angle d'approche à partir du fait le plus fort (pas de l'offre).

---

## 6. Cadence multicanale sur 3 semaines

### 6.1 Quel canal pour qui

| Profil | Canal d'ouverture | Canal de confirmation | Remarque |
|---|---|---|---|
| Artisan, terrassier, ETA, transporteur (dirigeant sur le terrain) | **Téléphone** (ligne publiée), puis **visite** si à moins de 30 min de Friesen ou sur une tournée | E-mail court récapitulatif (voir `emailing.md`) | Rarement actif sur LinkedIn ; e-mail souvent lu le soir |
| Cabinet (comptable, avocat, notaire, CGP, courtier) | **LinkedIn** si le dirigeant publie, sinon e-mail | Téléphone au secrétariat pour demander le bon créneau | Ne jamais court-circuiter l'assistante : en faire une alliée |
| Agence immobilière, sécurité, PME de 20-49 | E-mail + téléphone | LinkedIn | Plusieurs interlocuteurs possibles : viser le gérant |
| Prospect recommandé par un tiers | **Téléphone** en citant le recommandant (avec son accord) | E-mail | Le meilleur taux de transformation attendu ; traiter dans les 48 h |

### 6.2 Créneaux d'appel

- Données publiées (Cognism/WHAM 2026, 200 000+ appels, marchés anglo-saxons, B2B) : meilleur créneau
  **10 h-11 h**, second **16 h-17 h** ; mercredi et jeudi meilleurs jours. Taux de succès moyen d'un appel à
  froid : 2,7 % (secteur), 11,3 % pour une équipe entraînée.
- **Hypothèse à tester pour le BTP et le terrain** (non sourcée, à mesurer) : 7 h 30-8 h 15 (avant le
  départ en chantier) et 17 h 30-18 h 30 (retour au dépôt). Noter dans `apprentissages.md` l'heure de chaque
  appel décroché pendant 4 semaines, puis trancher.
- Gong (analyse de cold calls) : les appels réussis durent en moyenne 5 min 50 contre 3 min 14 pour les
  appels ratés → l'objectif du premier appel n'est pas de vendre mais d'obtenir une conversation.

### 6.3 Cadence type d'un prospect « chaud » (8 contacts maximum en 21 jours)

| Jour | Canal | Action | Si réponse |
|---|---|---|---|
| J1 | LinkedIn | Visiter le profil du dirigeant ; invitation (sans note si quota épuisé, voir 7.4) | — |
| J1 | Téléphone | Appel 1 (script 7.1). Pas de message vocal au premier essai | RDV 15 min → envoyer la confirmation |
| J1 | E-mail | Premier e-mail (rédaction : `emailing.md`) si pas de décroché | — |
| J3 | Téléphone | Appel 2 + message vocal de 20 s (7.3) | |
| J5 | LinkedIn | Si invitation acceptée : message court qui rebondit sur un fait ; sinon commenter sincèrement une publication de l'entreprise | |
| J8 | Téléphone ou visite | Appel 3, ou **visite** (7.5) si sur la route | |
| J10 | E-mail | Relance dans le même fil (`emailing.md`) | |
| J15 | Téléphone | Appel 4, créneau différent des précédents | |
| J21 | E-mail | Message de clôture courtois (« je ne vous relance plus, la porte reste ouverte ») | |
| J21+ | — | Statut `SL Prospection/Plus tard` + date de reprise à 90 jours, ou `Perdu` | |

Prospect « tiède » : J1 e-mail ou LinkedIn, J5 appel, J12 relance, J21 clôture (4 contacts).
**Règle d'arrêt** : un « non merci » clair arrête immédiatement toute la séquence et se note (droit d'opposition,
section 9).

### 6.4 Capacité hebdomadaire réaliste pour Loïc (objectif : 25 prospects contactés / semaine)

25 nouveaux prospects × (1 appel + 1 écrit) la première semaine = environ 50 actions ; en vitesse de croisière,
les cadences se superposent (~25 nouveaux + ~40 suites). Bloquer **deux sessions d'appel de 45 minutes**
(mardi et jeudi) plutôt que des appels dispersés.

---

## 7. Scripts : appel à froid, objections, message vocal, LinkedIn, visite

### 7.1 Appel à froid de 45 secondes

Construction : ouverture honnête qui annonce l'appel à froid (Josh Braun : ne jamais cacher que c'est un
appel à froid) + cadre en 5 temps de Jeb Blount (*Fanatical Prospecting*) : nom du prospect, qui je suis,
pourquoi j'appelle, **le « parce que »** relié à sa situation, la demande, puis se taire. Gong a mesuré que
« la raison de mon appel » augmente le taux de succès (×2,1) et que « Je vous dérange ? » est l'une des pires
ouvertures (2,15 %). Les ouvertures familières trompeuses (« Comment allez-vous depuis la dernière fois ? »)
sont exclues : elles mentent sur la relation.

```
[0-8 s]   Bonjour Monsieur <Nom>, Loïc, de SL Agence à Friesen.
          Vous ne me connaissez pas, c'est un appel à froid : je vous prends 30 secondes
          et vous me dites si ça vaut la peine de continuer. Ça vous va ?
[8-25 s]  La raison de mon appel : j'ai vu que <FAIT RÉEL : vous recrutez un(e) assistant(e)
          administratif(ve) / vous avez repris l'entreprise en <mois> / un client écrit sur Google
          qu'il attendait son devis>.
          On travaille avec des entreprises de <secteur> du Haut-Rhin, par exemple une entreprise
          de terrassement de 12 salariés : les heures sont pointées sur le téléphone avant de
          rentrer, 30 secondes de saisie, plus rien à recopier le soir.
[25-40 s] Je ne sais pas si c'est votre cas : chez vous, <les bons / les heures / les devis>,
          ils sont notés où, et ressaisis où ?
          → (SE TAIRE. Écouter. Reformuler.)
[40-45 s] Si ça vous parle, je vous propose 15 minutes au téléphone avec Sacha qui construit
          les outils, pour voir si ça vaut le coup. Plutôt <jour> matin ou <jour> fin de journée ?
```

Variante cabinet : « … j'ai vu que le cabinet <fait réel>. On a construit pour un cabinet de gestion de
patrimoine un écran unique à la place d'un fichier par client, avec le questionnaire rempli en direct pendant
le rendez-vous. Chez vous, la préparation d'un rendez-vous client, ça se passe comment ? »

### 7.2 Les 6 objections fréquentes

Principe (Josh Braun) : ne pas contrer, **se détacher du résultat et poser une question** ; l'objection est
souvent un réflexe pour raccrocher, pas une analyse.

| Objection | Réponse proposée |
|---|---|
| 1. « Envoyez-moi un mail. » | « Volontiers. Pour ne pas vous envoyer une plaquette inutile : c'est plutôt les bons de chantier ou la facturation qui vous prend du temps ? » → l'e-mail devient personnalisé et attendu. |
| 2. « Je n'ai pas le temps, je suis sur un chantier. » | « Je comprends, je vous rappelle. Demain 7 h 45 ou plutôt en fin de journée ? » (obtenir un créneau précis, pas un « rappelez plus tard »). |
| 3. « On a déjà un logiciel / mon comptable s'en occupe. » | « Très bien. Il y a quand même des choses que vous ressaisissez à côté, sur Excel ou sur papier ? Nous, on ne remplace pas ce qui marche : on relie ce qui existe (Sage, EBP, Pennylane…) pour supprimer la double saisie. » |
| 4. « Ça ne m'intéresse pas. » | « D'accord, je ne vais pas insister. Juste par curiosité : la paperasse, c'est un sujet réglé chez vous, ou c'est simplement pas le moment ? » → si « réglé » : remercier, noter, arrêter. |
| 5. « C'est combien ? » | « Ça dépend vraiment de ce qu'on supprime : on annonce un prix ferme sous 24 h, devis gratuit et sans engagement. Pour vous donner un ordre d'idée juste, il me faut ces 15 minutes. » (jamais de prix au téléphone) |
| 6. « On est trop petits / ça marche très bien comme ça. » | « Tant mieux si ça marche. La question, c'est combien d'heures par semaine ça vous coûte, à vous ou à votre secrétaire. Chez un client, on en a récupéré jusqu'à 20 par semaine ; si chez vous c'est 1 heure, ça ne vaut pas le coup et je vous le dirai. » |

Bonus facture électronique (à n'utiliser que si le prospect l'évoque) : « Vous recevez déjà les factures
électroniques depuis septembre ; l'émission sera obligatoire en septembre 2027. Le bon moment pour relier vos
outils, c'est avant. »

### 7.3 Message vocal (20 secondes)

« Bonjour Monsieur <Nom>, Loïc de SL Agence à Friesen. Je vous appelais parce que <fait réel>. J'ai une idée
pour <supprimer la ressaisie des bons / des heures>, ce qu'on a fait pour une entreprise de <secteur> du coin.
Je vous envoie un mot par e-mail, et je retente jeudi en fin de journée. Mon numéro : 06 01 16 07 62. »

### 7.4 LinkedIn : invitation et premier message

**Limites vérifiées** :
- Aide officielle LinkedIn (consultée le 2026-10-06) : les membres gratuits (« Basic ») peuvent joindre un
  message personnalisé à **5 invitations par mois** ; au-delà d'une limite non publiée, restriction temporaire
  d'environ une semaine.
- Sources tierces (outils d'automatisation, 2025-2026, non officielles) : plafond d'environ **100 invitations
  par semaine**, variable selon le taux d'acceptation et le nombre d'invitations en attente ; note limitée à
  **200 caractères** pour un compte gratuit.
- Conséquence : avec un compte gratuit, réserver les 5 notes mensuelles aux prospects « chauds » ; pour les
  autres, invitation sans note puis message après acceptation. Viser **20 à 30 invitations ciblées par
  semaine**, retirer les invitations en attente depuis plus de 3 semaines. Aucun outil d'automatisation
  (interdit par les conditions de LinkedIn et par nos règles).

Note d'invitation (≤ 200 caractères, à adapter au fait réel) :
> « Bonjour <Prénom>, je suis à Friesen et je travaille avec des entreprises de <secteur> du Haut-Rhin.
> J'ai vu <fait réel>. Ravi d'échanger entre voisins. Loïc »

Premier message après acceptation (pas de pitch dans la note d'invitation) :
> « Merci pour la connexion, <Prénom>. J'ai vu que <fait réel>. Question franche : chez vous, <les bons /
> les heures / les rendez-vous>, ils sont ressaisis quelque part ? On a supprimé cette double saisie pour une
> entreprise de <secteur> du coin. Si ça vous parle, 15 minutes au téléphone suffisent pour voir si ça vaut
> le coup. »

Avant toute invitation : regarder si le dirigeant publie (dernier post < 3 mois). Sinon, LinkedIn n'est pas
le bon canal d'ouverture.

### 7.5 Visite sur place (artisans, dépôts, agences)

Quand : prospect « chaud » sur un trajet déjà prévu, ou après 2 appels sans décroché. Créneau : début ou fin
de journée pour un dépôt, milieu de matinée pour un bureau. Toujours avec une **fiche A4** : les 2 réalisations
du secteur (anonymes), « devis gratuit, prix ferme sous 24 h », numéro de Loïc.

Script (30 secondes à l'accueil) :
> « Bonjour, Loïc, de SL Agence, on est à Friesen. Je passais dans le secteur. J'ai vu que vous <fait réel>.
> On aide des entreprises de <secteur> du coin à ne plus recopier <les bons / les heures>. Est-ce que
> Monsieur <Nom> est là deux minutes ? Sinon, quel est le meilleur moment pour l'appeler ? »

Si le dirigeant est là : même déroulé que 7.1 (fait réel → question → 15 minutes de rendez-vous), en
regardant ce qui traîne : classeurs de bons, tableau blanc de planning, pochettes de tickets carburant.
Si absent : laisser la fiche, noter le prénom de la personne de l'accueil et **rappeler dans les 48 h**
en la citant (« J'ai déposé une fiche mardi à <Prénom> »).
Ne jamais insister au-delà d'un refus ; ne rien photographier sur place.

---

## 8. Réseau et prescripteurs (Haut-Rhin)

La prospection réseau est la plus rentable en local parce qu'elle remplace un appel à froid par une
recommandation. Objectif proposé : **1 événement par mois et 2 prescripteurs actifs avant fin 2026**.

### 8.1 Réseaux identifiés (existence sourcée ; conditions d'adhésion à vérifier par Loïc)

| Réseau | Ce qui est sourcé | Intérêt pour SL Agence |
|---|---|---|
| CPME du Haut-Rhin (Mulhouse) | Représente 150 adhérents et 3 000 entreprises du département (Journal des entreprises) ; partenariat avec la gendarmerie sur la sécurité des entreprises | Cœur de cible TPE/PME, événements réguliers |
| CJD Mulhouse | Centre des jeunes dirigeants, dirigeants de moins de 45 ans du sud Alsace ; nouvelle présidente élue (Journal des entreprises) | Dirigeants ouverts au changement d'outils |
| Sud Rhin Business Club (Mulhouse) | Club d'affaires mulhousien en développement (Journal des entreprises ; article non lisible le 2026-10-06) | Format club de recommandations |
| BNI | Présent en Alsace (groupes à Strasbourg, Molsheim, Centre-Alsace) ; groupe dans le Haut-Rhin **non vérifié** | Vérifier sur bnifrance.fr ; une seule place par métier par groupe : intérêt si la place « informatique / automatisation » est libre |
| Reisa | Réseau d'entrepreneurs innovants du sud Alsace (bassins de Mulhouse, Saint-Louis, Doller, Guebwiller) | Petits dirigeants, proximité |
| Forces Françaises de l'Industrie (FFI) | Déjeuners mensuels à Mulhouse annoncés jusqu'en 2027 (pages d'inscription Luma) | Industrie : hors cible prioritaire, utile pour les prescripteurs |
| CCI Alsace Eurométropole | Atelier « reprises d'entreprise » à Mulhouse le 19 mars 2026 | Les repreneurs = signal n° 3 ; surveiller les prochaines éditions |
| CAPEB / FFB Alsace / CMA Alsace | Annuaire d'artisans (CAPEB) ; événements professionnels | Accès au BTP ; proposer une intervention « facture électronique et bons numériques » |

### 8.2 Prescripteurs à cultiver (par ordre d'intérêt)

1. **Experts-comptables locaux** (69.20Z, cabinets indépendants de 3 à 20 salariés, pas les réseaux) : ils
   voient chaque jour les fichiers Excel et les factures papier de leurs clients, et la facture électronique
   (réception depuis septembre 2026, émission en septembre 2027) les oblige à accompagner leurs clients TPE.
   Proposition : « vous gardez la comptabilité, nous supprimons la ressaisie en amont ». Ils sont à la fois
   prospects (secteur B) et prescripteurs.
2. **Intégrateurs et revendeurs de logiciels de gestion** (Sage, EBP, Cegid, Pennylane) : ils vendent le
   logiciel, SL Agence relie ce qui reste à côté (terrain, Excel, documents).
3. **Conseillers professionnels de banque et agents d'assurance** : ils rencontrent les dirigeants lors des
   reprises et des investissements (engins, véhicules).
4. **Conseillers numériques et de transmission de la CCI et de la CMA**.
5. **Clients satisfaits** : demander **2 introductions nominatives** à chaque client 30 jours après la mise
   en service (le moment où le gain de temps est visible), avec l'accord du client pour citer son nom
   **uniquement à l'oral et auprès de la personne recommandée** (jamais dans un contenu public).

### 8.3 Règles en événement

- Préparer 3 cibles par événement (liste des participants si publiée) ; venir avec 1 question, pas un pitch :
  « Qu'est-ce que vous recopiez encore à la main chaque semaine ? ».
- Le lendemain : message LinkedIn ou e-mail citant un détail de la conversation, proposition de 15 minutes.
- Noter dans `apprentissages.md` : événement, nombre de conversations, rendez-vous obtenus (sans nom).

---

## 9. RGPD / CNIL pour un fichier de prospection B2B

> Ceci n'est pas un avis juridique ; c'est la lecture des pages de la CNIL (mises à jour le 10 juin 2026)
> appliquée à notre usage. En cas de doute, demander à Loïc avant d'agir.

| Règle | Source | Application chez SL Agence |
|---|---|---|
| **Base légale B2B = intérêt légitime**, si la sollicitation est en rapport avec la profession de la personne | CNIL, prospection par téléphone et par courrier électronique | Ne contacter un dirigeant que sur un sujet lié à son entreprise (outils, administratif) |
| **Téléphone vers un professionnel : pas de consentement préalable**, mais droit d'opposition simple et gratuit ; l'appelant s'identifie | CNIL, prospection par téléphone (« Les professionnels disposent quant à eux de la possibilité de s'y opposer ») | Toujours dire « Loïc, de SL Agence » ; un « ne m'appelez plus » est définitif |
| Le régime de **consentement préalable au démarchage téléphonique** entré en vigueur le **11 août 2026** (loi n° 2025-594 du 30 juin 2025, art. L223-1 du Code de la consommation) vise les **consommateurs** | Presse juridique ; CNIL | Ne pas appeler le numéro personnel d'un entrepreneur individuel pour autre chose que son activité ; privilégier la ligne de l'entreprise |
| **E-mail vers une adresse professionnelle** : sans consentement si le message concerne la fonction, avec un moyen d'opposition simple **dès le premier envoi** et l'identité de l'expéditeur | CNIL, prospection par courrier électronique ; mise au point 2026 (leto.legal) | Détail de la rédaction : `emailing.md` |
| **Informer la personne (article 14 RGPD)** quand ses données ne viennent pas d'elle : au plus tard au **premier contact** (ou dans le mois de la collecte) — qui nous sommes, pourquoi, **source des données**, droit d'opposition | RGPD art. 14 ; guides 2026 | Mentionner la source dans le premier contact écrit (« trouvé sur votre site / l'annuaire des entreprises ») |
| **Durée de conservation** : 3 ans maximum à compter de la collecte ou du **dernier contact émanant du prospect** (une relance sans réponse ne relance pas le délai) | Doctrine CNIL (référentiel gestion commerciale) | Purger chaque année les lignes du Drive sans réaction depuis 3 ans |
| **Minimisation** | RGPD | Ne collecter que : entreprise, rôle, coordonnées professionnelles publiées, fait d'accroche, source, historique de contact. Jamais d'information sur la vie privée |
| **Liste d'opposition** | Droit d'opposition | Tenir dans le Drive une liste « Ne plus contacter » (entreprise + date), vérifiée avant chaque lot |
| **Pas d'adresse devinée, pas de scraping de LinkedIn** | Règles SL Agence ; conditions LinkedIn | Uniquement des adresses publiées par l'entreprise |
| **Données personnelles hors du dépôt** | `CLAUDE.md` (dépôt public) | Noms, e-mails, téléphones : Drive et Gmail uniquement |

Points d'attention : les données de l'API de l'État (dirigeants) sont publiques mais restent des données
personnelles ; certaines entreprises individuelles sont en diffusion partielle (non-diffusibles) — ne pas
chercher à contourner. Les achats de fichiers sont proscrits (et les exports Vibe Prospecting soumis à
l'accord de Loïc).

---

## 10. Grille d'auto-évaluation d'un lot de prospects (10 critères, seuil 8/10)

Chaque critère vaut 1 point. **Sous 8/10, le lot est repris avant d'être livré.** La note figure dans la
réponse de l'agent.

| # | Critère | 1 point si… |
|---|---|---|
| 1 | Activité vérifiée | 100 % des entreprises sont actives (`etat_administratif=A`) et ont leur siège en Alsace (Haut-Rhin pour les chauds) |
| 2 | Hors exclusions | Aucun client, aucune conversation en cours, aucune franchise/réseau, aucun nom de la liste « Ne plus contacter » ; Gmail vérifié (`in:anywhere`, nom ET domaine) |
| 3 | Fait réel sourcé | Chaque prospect a au moins un fait daté avec son URL |
| 4 | Zéro invention | Aucun nom, rôle, e-mail ou chiffre sans source ; « non trouvé » écrit quand c'est le cas |
| 5 | Score justifié | Chaque ligne de la grille (v1 ou v2 validée) est justifiée ; ≥ 5 prospects ≥ 70 et tous ≥ 50 |
| 6 | Taille vérifiée | L'effectif vient d'une source (API, site, offre) et non d'une supposition |
| 7 | Angle spécifique | L'angle part du fait réel et relie une offre précise de `agence.md` (pas de message interchangeable) |
| 8 | Bon canal | Le canal recommandé suit la section 6.1 et est disponible (téléphone publié, LinkedIn actif, adresse pro publiée) |
| 9 | Diversité utile | Au moins 2 secteurs A représentés ; pas plus de 4 prospects d'un même secteur (pour apprendre ce qui marche) |
| 10 | Conformité et rangement | Données nominatives uniquement dans Drive/Gmail ; relances identifiées comme telles (date du premier envoi) ; mention de la source prévue au premier contact |

---

## 11. Sources réellement consultées (2026-10-06)

**Données et requêtes testées**
- API Recherche d'entreprises — documentation OpenAPI : https://recherche-entreprises.api.gouv.fr/openapi.json ;
  requêtes : https://recherche-entreprises.api.gouv.fr/search (paramètres détaillés en section 2.1)
- Annuaire des entreprises : https://annuaire-entreprises.data.gouv.fr/
- BODACC (Opendatasoft) : https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records
- France Travail, recherche d'offres : https://candidat.francetravail.fr/offres/recherche?motsCles=assistant+administratif&lieux=68D&offresPartenaires=true&tri=1
- INSEE, notice d'accès aux API : https://static.insee.fr/api-sirene/Insee_API_publique_modalites_connexion.pdf ; portail https://portail-api.insee.fr/
- Base Sirene sur data.gouv.fr : https://www.data.gouv.fr/fr/datasets/5b7ffc618b4c4169d30727e0/
- Pappers (page tarifs inaccessible, 403) : https://www.pappers.fr/tarifs
- CAPEB, annuaire « Artisans du bâtiment by CAPEB » : https://www.capeb.fr/actualites/decouvrez-la-plateforme-quot-artisans-du-batiment-by-capeb-quot

**Nomenclature et réglementation**
- NAF 2025 au 1er janvier 2027 : https://www.infogreffe.fr/NAF-2025-codes-APE-nouvelle-grille-lecture-entreprises-a-compter-de-2027 ; https://www.capeb.fr/actualites/nouveau-code-ape-en-2027
- Facture électronique (calendrier) : https://www.quadient.com/fr/blog/passer-rapidement-facturation-electronique ; https://deveco.esterelcotedazur-agglo.fr/wp-content/uploads/2026/02/Facturation-electronique-Fiche-pratique.pdf
- CNIL, prospection par courrier électronique : https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique
- CNIL, prospection par téléphone : https://cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles
- Mise au point CNIL 2026 (opt-in / opt-out) : https://www.leto.legal/news/cnil-communications-electroniques-prospection-regles-2026
- Démarchage téléphonique, loi du 30 juin 2025 : https://www.weblex.fr/weblex-actualite/demarchage-telephone-consentement-prealable-obligatoire ; https://www.legalplace.fr/actualites/demarchage-telephonique/
- Article 14 RGPD et B2B : https://www.leto.legal/guides/rgpd-et-prospection-btob-quelles-regles-respecter ; https://donneespersonnelles.fr/article-14-rgpd
- Durées de conservation : https://www.cnil.fr/les-durees-de-conservation-des-donnees-du-secteur-de-lassurance ; https://donneespersonnelles.fr/rgpd-conservation-des-donnees

**Méthodes de vente**
- Josh Braun, ouverture honnête : https://www.11x.ai/guides/josh-braun-cold-outreach-method ; https://prospeo.io/s/permission-based-opener-cold-call
- Jeb Blount, cadre en 5 temps : https://www.insidesales.com/secrets-of-phone-prospecting-jeb-blount/ ; https://www.supersummary.com/fanatical-prospecting/summary/
- Gong Labs, ouvertures d'appel : https://www.gong.io/blog/the-best-and-worst-cold-call-openers-backed-by-data-from-300m-calls
- Statistiques d'appel (Cognism/WHAM 2026, Gong) : https://prospeo.io/s/cold-calling-stats ; https://blog.hubspot.com/sales/cold-calling-statistics
- CHAMP : https://www.revenue.io/inside-sales-glossary/what-is-champ ; https://kylas.io/blog/sales-champ-framework-small-business

**LinkedIn**
- Aide LinkedIn, limite d'invitations et notes personnalisées : https://www.linkedin.com/help/billing/answer/a550555
- Limites hebdomadaires (sources tierces) : https://ligosocial.com/fr/blog/are-there-any-limits-on-the-number-of-linkedin-invitations-i-can-send ; https://help.dripify.com/en/articles/8490987-limited-personalized-connection-request-notes-for-free-linkedin-accounts

**Marché et réseaux locaux**
- France Num, baromètre 2025 : https://www.entreprises.gouv.fr/espace-presse/france-num-presente-la-6e-edition-de-son-barometre-annuel-sur-la-transformation ; https://siecledigital.fr/2025/09/17/barometre-france-num-2025-comment-evoluent-les-usages-numeriques-dans-les-pme/
- CPME 68 : https://www.lejournaldesentreprises.com/article/la-cpme-du-haut-rhin-veut-enclencher-une-nouvelle-dynamique-2109512 ; https://www.lejournaldesentreprises.com/breve/la-cpme-68-et-la-gendarmerie-du-haut-rhin-unissent-leurs-forces-pour-securiser-les-entreprises-du-2115463
- CJD Mulhouse : https://www.lejournaldesentreprises.com/breve/sophie-frantz-elue-presidente-du-cjd-mulhouse-2122299
- Sud Rhin Business Club : https://www.lejournaldesentreprises.com/article/le-club-daffaires-sud-rhin-business-club-se-developpe-mulhouse-138893
- Reisa : https://www.lejournaldesentreprises.com/breve/le-reseau-reisa-federe-les-entrepreneurs-du-sud-alsace-698391
- BNI en Alsace : https://www.lejournaldesentreprises.com/article/bni-un-groupe-en-centre-alsace-46655 ; https://www.creerentreprise.fr/reseau-affaires-bni-avis-et-conseils/
- FFI, déjeuners Mulhouse : https://luma.com/5ow23foj
- CCI Alsace Eurométropole, atelier reprises : https://www.lejournaldesentreprises.com/breve/le-19-mars-2026-la-cci-alsace-eurometropole-organise-mulhouse-un-atelier-pour-les-reprises-2139179

**Mémoire interne** : `memoire/agence.md`, `cible.md`, `outils.md`, `journal.md`, `apprentissages.md`.
