# Benchmark des meilleures pages Google — pages métier BTP, pages ville, administratif/transport

> Observé le 2026-10-14 (WebSearch + WebFetch). Agent veille. Aucun nom de prospect ni de client (c004), aucun Ahrefs (c008).

## 0. Limites de la méthode (à lire d'abord)

- **« Position » = rang dans la liste renvoyée par WebSearch**, pas une position SERP Google mesurée (pas de géolocalisation, pas de personnalisation, pas d'outil de rang). Indicatif seulement.
- **Longueurs** = estimations de l'outil de lecture (± 20 %). **JSON-LD / schéma** : non observable via WebFetch (texte converti), noté « non vérifié ». À contrôler dans le code source avant de copier un choix.
- **« Autres questions posées » (People Also Ask) : inaccessibles** avec nos outils. Les questions de la section 6 viennent des **FAQ réelles des pages gagnantes** (constaté) ; les regroupements par famille sont ma synthèse (hypothèse). À recouper à la main dans Google (3 min par requête) avant publication.
- **Constat local important** : le 14/10, « agence automatisation Mulhouse », « logiciel sur mesure Colmar », « agence IA Haut-Rhin », « développement application Mulhouse » ne renvoient **aucune agence concurrente** dans la liste WebSearch (offres d'emploi, annuaires, formations, agences immobilières). S MEDIA, Quadia, Synapze n'y sont pas ressortis ce jour (ils l'étaient le 06/10 sur une requête plus longue, cf. `memoire/concurrents.md`). « Kolonell » : rien trouvé (non confirmé). **Hypothèse** : le créneau « sur mesure + ville » est peu disputé par de vraies pages ; le vide est une opportunité.

## 1. Les pages gagnantes analysées (8)

| # | Famille | Page | Position observée (14/10) | Longueur |
|---|---|---|---|---|
| 1 | A métier | Obat « devis factures carreleur » — https://www.obat.fr/devis-factures/carreleur/ | 3e (après 2 comparatifs) sur « logiciel devis facture carreleur » | ~2 000 mots |
| 2 | A comparatif | Tool Advisor « 6 meilleurs logiciels carreleurs » — https://tool-advisor.fr/logiciel-facturation/comparatif/logiciel-devis-facture-carreleur/ | 2e sur la même requête ; présent aussi pour électricien, plombier, chauffagiste | ~3 000 mots |
| 3 | A métier | Obat « suivi du temps / GTA BTP » — https://www.obat.fr/suivi-temps | 1er sur « application chantier artisan suivi heures » | ~1 000 mots |
| 4 | A comparatif | Codeur.com « facturation plombier-chauffagiste » — https://www.codeur.com/comparatif/logiciel-facturation-btp-plombier-chauffagiste | 2e sur « logiciel plombier chauffagiste devis facture » | ~1 300 mots |
| 5 | B ville | S MEDIA « Agence IA à Mulhouse » — https://s-media.fr/agence-ia-mulhouse.html | non ressortie ce jour ; repérée le 06/10 | ~1 800-2 000 mots |
| 6 | B ville | S MEDIA « Agence IA à Colmar » — https://s-media.fr/agence-ia-colmar.html | idem | ~1 300-1 500 mots |
| 7 | B ville (satellite) | Quadia « Agence IA à Colmar » — https://quadia.fr/agence-ia-colmar/ | idem | ~1 200 mots (+ listes de liens) |
| 8 | B ville (satellite) | Synapze IA « Haut-Rhin » — https://www.synapze-ia.fr/agence-ia-departement-haut-rhin/ | idem | ~1 200-1 500 mots |
| 9 | C | Copeps « Logiciel TMS pour PME : fonctionnalités et prix » — https://copeps.fr/actualites/logiciel-tms-pme/ | 6e sur « logiciel gestion transport PME » (1er : Appvizer, 2e : La Fabrique du Net) | ~900-1 000 mots |
| 10 | C | Les Pépites Tech « Automatiser la gestion administrative en PME » — https://lespepitestech.com/blog/2026/06/30/automatiser-la-gestion-administrative-en-pme-le-guide | 1er (et ses variantes paginées occupent presque toute la liste) sur « automatiser tâches administratives PME » | ~1 000 mots |

Page complémentaire lue : Obat blog menuiserie (https://www.obat.fr/blog/logiciel-menuiserie/, 1er article de blog ; ~1 600 mots, 7 H3 produits, pas de FAQ, MAJ 20/04/2026) et Qonto « logiciel chauffagiste » (https://qonto.com/fr/blog/gestion-entreprise/btp-construction/logiciel-chauffagiste, 4e ; ~2 000 mots, 7 outils avec Avantages/Inconvénients/Alternatives, 3 questions FAQ).

## 2. Fiches détaillées

### Famille A — pages métier BTP

**A1. Obat carreleur** (page éditeur, intention : « je cherche un outil pour mon métier »)
- Hn : H1 « Le logiciel de devis et facture spécialisé pour les carreleurs » ; H2 bénéfices métier → H2 « Pourquoi les pros du carrelage choisissent Obat » (bibliothèque d'ouvrages, devis qui inspire confiance, cloud) → **H2 « Comment faire un devis carreleur professionnel ? »** (mentions obligatoires, décomposition des prix) → H2 ce que les clients apprécient (experts métier, facturation électronique, chiffrage vocal IA) → H2 meilleur logiciel (personnalisation, suivi chantier) → CTA → témoignages → ressources métier (fiche métier, guide NF DTU 52) → **FAQ 6 questions** → sélecteur de taille d'entreprise.
- FAQ : oui, 6 questions (schéma non vérifié). Preuves : 4,9/5 sur 2 693 avis Google, 21 000 pros, ~500 ouvrages carrelage, 7 logos ; **pas de capture d'écran ni de vidéo** visibles. Contenu métier réel : repères de prix au m² (fourniture 10-60 €, pose 30-40 €), TVA, calcul de quantités. CTA : « Tester gratuitement » ×4+, essai 14 jours. Maillage : fonctions, tarifs, facturation électronique, blog. Local : aucun.
- À retenir : **la page gagne parce qu'elle contient du savoir-faire du métier** (mentions du devis, DTU, prix au m²), pas seulement des fonctions.

**A2. Tool Advisor (comparatif)**
- H1 « Les 6 meilleurs logiciels … en 2026 : comparatif et avis » → sommaire + « En bref » (3 recommandations) → 1 H3 par outil → fonctionnalités (génériques puis métier) → **tableau des tarifs** (Obat 32 € HT/mois, Costructor 15 €, Tolteck 25 €, etc.) → comment choisir (4 questions). Une page par métier (carreleur, électricien, plombier, chauffagiste), même gabarit.
- Preuves : tableau chiffré, auteur nommé, date. Faiblesses constatées : liens d'affiliation malgré « indépendant », dates incohérentes (12/10/2026 vs 29/07/2026), « leader » non sourcé. Pas de FAQ formelle.

**A3. Obat suivi du temps** : H1 + 7 H2 (suivi du temps, pourquoi, fonctions, comment choisir, témoignages, taille d'entreprise, FAQ 4 questions dont RGPD). ~15 témoignages avec prénom et métier. Aucune capture ni vidéo. Gain « 20 % de productivité » non sourcé. Maillage dense (11+ pages produit).

**A4. Codeur.com plombier-chauffagiste** : H2 avantages → qualités → **fonctions clés avec H3 métier** (dépannages, acomptes et situations, historique d'interventions, catalogue pièces, normes) → différences → recommandations → FAQ 4 questions (dont facturation électronique). Tableau 5 outils avec prix de départ. Mention de sponsoring.

### Famille B — pages ville d'agences

**B1. S MEDIA Mulhouse** (la plus riche)
- H1 « Agence IA à Mulhouse : l'intelligence artificielle qui travaille pour vous » ; 9 H2 : intro locale (« à une demi-heure ») → ce que ça change → ce que fait le pôle (4 cartes services) → comment ça se passe → **Conditions écrites avant de signer** → ce qu'on peut lancer → **preuves « en production depuis 2021 »** → **FAQ 6 questions** → contact.
- Local : bureau centre-ville Mulhouse (68100) depuis 2013 ; Colmar à 1 h ; Bâle ; organisme de formation co-fondé localement. Preuves : SaaS déployé sur 40 agences, 4 modèles d'IA, propriété du code et des accès « dès le premier jour », 3 lignes de coût annoncées (construction, abonnements API, maintenance), « dès 5 000 € ». Gain 4-8 h/semaine **non sourcé**, aucun cas client nommé, aucune image. CTA : appel 30 min gratuit, par e-mail uniquement. Maillage : pages Colmar / Haut-Rhin / Alsace + services.
**B2. S MEDIA Colmar** : même gabarit adapté, avec **vraies spécificités locales** (A35, marchés de Noël, vendanges, haute saison, saisonniers) et FAQ locale (« Que peut faire l'IA pour le tourisme ou le vignoble colmarien ? »). Faiblesse constatée : aucun client colmarien, section « Conditions » renvoyée à Mulhouse.
**B3. Quadia Colmar** (satellite) : H1 « Agence IA à Colmar : agents IA et automatisation pour PME et ETI » ; blocs : distanciel 100 % → coût des tâches manuelles (3 chiffres non sourcés) → 6 services → secteurs → bénéfices → ~30 communes voisines + ~22 villes « au profil similaire » + ~35 grandes villes + départements. **Pas de FAQ, pas d'adresse, pas de preuve, pas d'image**, 3 cartes secteurs vers la même page, doublon « Saint-Denis », chiffre « ~17 k€/an » surévalué (constaté par l'outil). Seule spécificité : code postal 68000, population.
**B4. Synapze Haut-Rhin** (satellite) : ~12 questions FAQ (dont un doublon), 20 pages villes liées, **erreurs factuelles constatées** : « viticulture champenoise » dans le Haut-Rhin, Ardennes/Aube/Marne présentés comme départements voisins (le Bas-Rhin et le Territoire de Belfort ne le sont pas), « 154+ communes » non sourcé, « principalement à distance » en contradiction avec la promesse locale. Aucun client, aucune étude de cas.

### Famille C — transport et administratif

**C1. Copeps TMS** : H1 « … fonctionnalités et prix » ; H2 définition → performance → fonctions → **facteurs de prix (H3/H4)** → coût réel (direct/caché) → avantages → ROI → top 10 → FAQ 2 questions. **Fourchettes de prix affichées** (SaaS 30-50 €/véhicule/mois ; licence 40-80 € ; formation 10-20 % du coût). Aucun cas, aucun témoignage. Hiérarchie Hn bancale. Le reste de la liste (Appvizer, La Fabrique du Net, Capterra) = annuaires/comparatifs ; les éditeurs ne donnent pas de prix (« sur demande »).
**C2. Les Pépites Tech** : H1 « Automatiser la gestion administrative en PME : le guide » ; 5 H2 sans H3 : pourquoi la charge pèse → 3 chantiers rentables (factures, relances, reporting) → méthode (cartographier, prioriser, tester, former) → conformité → par où commencer (« une seule tâche »). ~1 000 mots, **aucun chiffre, aucune FAQ, aucun cas**, auteur incohérent. Page faible mais première : la requête est peu disputée par du contenu fort.
**Gestion administrative artisan** (WebSearch 14/10) : le haut de liste = comparatifs et fiches éditeurs (Independant.io, Batappli sur Batiproduits, Copeps dossier artisan, Fiducial, Pennylane/Sage). Aucun éditeur n'y parle d'« outil sur mesure ».

## 3. Gabarit gagnant — PAGE MÉTIER (ordre des blocs)

Synthèse des pages A1-A4 + éléments que les meilleures n'ont pas (preuves visuelles) :

1. **Title** (50-60 car.) `Logiciel <métier> sur mesure : devis, chantier, heures | SL Agence` ; **H1** formulé pour le dirigeant (« L'outil de <métier> qui fait exactement ce que vous faites »).
2. **Chapô de 2-3 phrases** : pour qui (métier + taille d'équipe + Haut-Rhin), quoi, délai (« premier outil en 7 jours »).
3. **CTA principal** visible dès l'écran 1 (appel de 15 min ou devis sous 24 h) + téléphone.
4. **Bloc « Ce que vous perdez aujourd'hui »** : 3-4 douleurs du métier dans ses mots (feuilles à recopier, bons non signés, relances oubliées).
5. **Capture ou courte vidéo (45 s) d'un outil réel anonymisé** (aucune page du top n'en montre : avantage à prendre).
6. **H2 « Ce que l'outil fait, étape par étape »** : fonctions métier en H3 (modèle Codeur : acomptes/situations, historique, pièces…), chacune avec un exemple chiffré.
7. **H2 savoir-faire du métier** (modèle Obat « Comment faire un devis <métier> ») : mentions obligatoires, TVA, repères de prix/m² ou d'heures, normes (DTU), facturation électronique. C'est ce qui donne la profondeur éditoriale.
8. **H2 « Sur mesure ou logiciel du marché ? »** : tableau honnête (voir §5) avec prix de départ des éditeurs cités (sourcés) vs prix ferme SL Agence.
9. **H2 Prix, délai, propriété des données** (modèle S MEDIA « conditions écrites avant de signer ») : prix ferme annoncé, délai, données au client, compatibilité Sage/EBP/Pennylane.
10. **Preuve** : cas anonymisé chiffré (« 12 salariés, 30 secondes de saisie/jour »), avis Google quand il y en aura. Chiffres uniquement sourcés ou issus d'une réalisation réelle.
11. **FAQ 5-6 questions** (balisage FAQPage) — §6.
12. **CTA final** + maillage : page facture électronique, autres métiers, bon d'intervention, page ville du lecteur, 1-2 articles du blog.
13. Mise à jour datée visible (« Mis à jour le … ») — Obat et Tool Advisor l'affichent.
Longueur cible : **1 200-1 800 mots** (médiane des pages éditeur observées ~1 000-2 000 ; au-delà, les comparatifs de 3 000 mots répondent à une autre intention : comparer).

## 4. Gabarit gagnant — PAGE VILLE (ordre des blocs)

1. **Title** `Logiciel sur mesure et automatisation à <Ville> | SL Agence` (≤ 60 car.), **H1** avec ville + bénéfice.
2. **Chapô local** : qui nous sommes, d'où (Friesen, à X min de la ville — vérifier avec Loïc, cf. seo.md §2.1), pour qui. Modèle S MEDIA : distance en minutes + axe routier.
3. **CTA** (appel, téléphone, déplacement sur place) dès l'écran 1.
4. **H2 « Ce que nous faisons pour les entreprises de <Ville> »** : 3-4 services, chacun lié à sa page métier.
5. **H2 « Des cas d'usage de <Ville> »** : secteurs réels de la zone (ex. industrie/chimie mulhousienne, vignoble et tourisme colmarien, transfrontalier Saint-Louis/Bâle), chacun avec un exemple concret de tâche automatisée.
6. **H2 « Comment ça se passe »** : 15 min d'appel → déplacement → premier outil en 7 jours → suivi.
7. **H2 « Conditions écrites avant de signer »** : prix ferme, délai, propriété des données, ce qui arrive si SL Agence s'arrête (question réelle posée par S MEDIA).
8. **H2 Preuves** : réalisation anonymisée du Haut-Rhin, photo réelle de l'équipe, avis ; plan d'accès/zone desservie.
9. **FAQ locale 5-6 questions** avec au moins 2 spécifiques à la ville.
10. **Maillage** : villes voisines **réelles** (max 6-8, distance), pages services/métiers, page hub Haut-Rhin.
Longueur : 1 200-1 800 mots, **dont au moins 40 % de texte qui ne serait pas valable pour une autre ville**.

## 5. Ce qui distingue une page ville qui rank d'une page satellite creuse

Constaté (S MEDIA vs Quadia vs Synapze) :

| Critère | Page ville solide (S MEDIA Mulhouse) | Satellite creux (Quadia, Synapze) |
|---|---|---|
| Adresse / présence | Bureau en centre-ville, 2013, distances en minutes | Aucune adresse ; « 100 % à distance » ou « dans toute la France » |
| Contenu local | Repères réels (A35, vendanges, marchés de Noël, Bâle, école locale) | Ville + code postal + population ; phrases valables pour n'importe quelle ville |
| Preuves | Produit déployé, ancienneté, conditions de coût | Chiffres « indicatifs » sans source, 0 client, 0 cas |
| FAQ | Questions propres au lieu (tourisme, saisonniers) | Absente (Quadia) ou 12 questions génériques avec doublon (Synapze) |
| Maillage | Pages liées entre elles, courtes | Dizaines de villes en liste mécanique, erreurs (départements « voisins » faux) |
| Qualité factuelle | Cohérente | Erreurs repérables (Champagne dans le Haut-Rhin, doublon Saint-Denis) |

**Hypothèse (non mesurée)** : une page qui ne contient que « nom de ville + gabarit » est exposée au risque « contenu de faible valeur / pages en masse » (politique anti-spam de Google) ; les pages qui rankent portent une information que seule une entreprise du lieu peut donner. Le vide actuel du créneau (§0) suggère qu'aucune de ces pages ne domine, mais **ne prouve pas** qu'elles ne rankent pas sur une requête plus longue.
**Règle pour SL Agence** : pas de page ville sans (a) une réalisation ou un exemple de la zone, (b) 2 questions FAQ locales, (c) un temps de trajet réel, (d) 0 phrase copiable pour une autre ville. Mieux vaut 3 pages ville riches (Mulhouse, Colmar, Saint-Louis) que 20 satellites.

## 6. Cinq angles pour battre ces pages

1. **« Sur mesure vs logiciel du marché » avec prix sourcés** : les comparatifs affichent des abonnements (Obat 25-32 € HT/mois, Costructor dès 15 €, Tolteck 25 €, Extrabat dès 49 €/utilisateur, InterFast dès 15 €, Calixta dès 14 € — Tool Advisor 12/10/2026, Qonto 11/11/2025, Codeur 07/2026). Aucune page ne dit **quand ces outils ne suffisent plus** (bon d'intervention signé, heures + carburant + engins, règles propres à l'entreprise, liaison avec la paie). Page : « Quand un logiciel du marché ne suffit plus » (honnête : pour un artisan seul, Obat peut suffire).
2. **Preuve visuelle terrain** : aucune page du top (Obat inclus) ne montre de capture d'écran ni de vidéo ; les satellites n'ont aucune image. Une capture réelle d'un bon d'intervention signé et une vidéo de 45 s sont un avantage immédiat (réutilisables sur toutes les pages).
3. **Local réel et déplacement** : seul S MEDIA a une vraie adresse ; il vend de l'IA/chatbots (dès 5 000 €), pas des outils de chantier. SL Agence peut écrire « nous venons sur votre chantier / dans votre atelier » et citer des zones précises (Sundgau, M2A, Saint-Louis/Bâle). **Constaté le 06/10 et inchangé** : aucun concurrent du Haut-Rhin ne montre d'outils terrain.
4. **Prix ferme et délai écrits** : les concurrents locaux annoncent « dès 5 000 € » (S MEDIA), « 3 000-8 000 € » (Quadia), 4 à 8 semaines ; les éditeurs cachent le prix sur mesure. « Premier outil en 7 jours, prix ferme annoncé avant de commencer, devis sous 24 h » est un bloc que personne ne propose (à n'afficher que si Loïc et Sacha le confirment).
5. **Savoir-faire métier + échéances** : les meilleures pages éditeurs gagnent par la profondeur métier (Obat : mentions du devis, DTU, TVA) mais restent génériques sur les chantiers multi-équipes. Page par métier avec calcul d'heures, acomptes/situations, et un encadré facture électronique (réception depuis septembre 2026, émission septembre 2027 — dates relayées par Obat et Abby, **à citer depuis impots.gouv.fr**, source primaire non relue ce jour). Et côté C : les pages « automatiser l'administratif » sont faibles (aucun chiffre, aucune FAQ, aucun cas) : un guide chiffré avec un cas réel anonymisé peut les dépasser.

## 7. Questions récurrentes par famille (pour FAQ)

Source : FAQ réelles des pages observées (constaté) ; regroupement = synthèse. People Also Ask non accessible (§0).

**A — Pages métier BTP**
- Quel logiciel de devis et facture choisir pour un <métier> ? (tool-advisor, Qonto)
- Existe-t-il un logiciel gratuit ? Quel est le moins cher ? (Tool Advisor : Costructor ; Qonto/InterFast/Tiime gratuits)
- Peut-on faire ses devis depuis un téléphone / sur le chantier, hors ligne ? (Obat, Codeur)
- Le logiciel est-il compatible avec la facturation électronique ? (Codeur, Qonto)
- Quel taux de TVA sur une facture de <travaux> ? (Obat)
- Comment calculer ses tarifs / la quantité de matériau dans un devis ? (Obat)
- Peut-on gérer les chantiers, les acomptes et situations de travaux ? (Codeur)
- Est-il adapté aux micro-entrepreneurs ? (Obat)
- Le suivi du temps respecte-t-il le RGPD ? (Obat GTA)
- À adapter pour SL Agence : « Combien coûte un outil sur mesure pour un <métier> ? », « Combien de temps pour le mettre en place ? », « Mes données m'appartiennent-elles ? », « Ça se branche à Sage / EBP / Pennylane ? »

**B — Pages ville / agence**
- Existe-t-il une agence <IA / automatisation> à <ville> ? / Quelle agence choisir ? (S MEDIA)
- Combien coûte un projet, abonnements compris ? (S MEDIA, Synapze)
- Où vont nos données ? Sont-elles confidentielles ? (S MEDIA)
- Que se passe-t-il si on arrête, ou si l'agence s'arrête ? Qui est responsable si l'IA se trompe ? (S MEDIA)
- Combien de temps le projet demande-t-il à nos équipes ? Nos équipes vont-elles suivre ? (S MEDIA Colmar)
- Quel délai de mise en œuvre ? (Synapze, répétée deux fois)
- Que peut faire l'IA pour <secteur local> (tourisme, vignoble, industrie, transfrontalier) ? (S MEDIA Colmar : seule question vraiment locale)
- À adapter pour SL Agence : « Vous déplacez-vous chez nous à <ville> ? », « Premier outil en combien de jours ? », « Existe-t-il des aides régionales ? » (sourcer Grand Est avant publication).

**C — Transport et administratif**
- Un TMS est-il adapté aux petites entreprises ? Existe-t-il des solutions gratuites ou économiques ? (Copeps)
- Combien coûte un logiciel de transport (par véhicule/utilisateur) ? (Copeps ; fourchettes à citer avec source)
- Faut-il un logiciel de transport ou un ERP global ? (WebSearch 14/10, Fabrique du Net / Sage)
- Quelles tâches administratives automatiser en premier ? (Pépites Tech : saisie de factures, relances, reporting)
- Faut-il garder une validation humaine ? Qu'en est-il de la conformité / RGPD ? (Pépites Tech)
- Quel logiciel de facturation pour un artisan ? Compatible facture électronique ? (Codeur, Qonto)

## 8. Actions (pour le Manager — non exécutées, sur demande)

1. **seo-site** : appliquer le gabarit §3 à la prochaine page métier ; ajouter capture réelle + FAQPage ; bloc « sur mesure vs marché » (angle 1).
2. **seo-site** : pages ville seulement selon la règle de fin de §5 (Mulhouse en premier, Colmar ensuite).
3. **contenu-linkedin** : guide chiffré « automatiser l'administratif » avec cas anonymisé (famille C peu disputée).
4. **Loïc** : confirmer ce qu'on peut afficher (prix de départ, délai 7 jours, adresse/zone, une réalisation anonymisable) ; vérifier à la main les PAA Google (§0).

## 9. Sources consultées le 2026-10-14

Obat : https://www.obat.fr/devis-factures/carreleur/ · https://www.obat.fr/blog/logiciel-menuiserie/ · https://www.obat.fr/suivi-temps · https://www.obat.fr/devis-factures/menuisier/ · https://www.obat.fr/l/m/plombier — Comparatifs : https://tool-advisor.fr/logiciel-facturation/comparatif/logiciel-devis-facture-carreleur/ · https://www.codeur.com/comparatif/logiciel-facturation-btp-plombier-chauffagiste · https://qonto.com/fr/blog/gestion-entreprise/btp-construction/logiciel-chauffagiste · https://independant.io/logiciel-devis-carreleur/ — Agences : https://s-media.fr/agence-ia-mulhouse.html · https://s-media.fr/agence-ia-colmar.html · https://quadia.fr/agence-ia-colmar/ · https://www.synapze-ia.fr/agence-ia-departement-haut-rhin/ — C : https://copeps.fr/actualites/logiciel-tms-pme/ · https://lespepitestech.com/blog/2026/06/30/automatiser-la-gestion-administrative-en-pme-le-guide · https://www.appvizer.fr/operations/fret · https://www.lafabriquedunet.fr/logiciels/gestion/logistique/logistique-transport · https://copeps.fr/actualites/dossier-gestion-batiment-artisanat/
