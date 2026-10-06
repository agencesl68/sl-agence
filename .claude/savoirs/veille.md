# Manuel de veille — méthode de l'agent `veille`

> Dernière mise à jour : 2026-10-06. À relire chaque trimestre.
> But : savoir avant les autres ce qui bouge, et **transformer chaque signal en quelque chose de créé**
> (offre, post, argument, page). Un signal sans action n'entre pas dans le rapport.

## 1. Sources gratuites à surveiller

### Alertes Google (google.com/alerts — option « Flux RSS » ou e-mail hebdomadaire)

À créer une fois par Loïc (5 min), en « Une fois par semaine », « France », « Toutes les sources » :

| Alerte | Pourquoi |
|---|---|
| `"agence IA" Mulhouse` · `"agence IA" Colmar` · `"agence IA" Haut-Rhin` | Nouveaux entrants et pages locales concurrentes |
| `automatisation Mulhouse` · `automatisation Alsace TPE` | Concurrents « automatisation » sans le mot IA |
| `"logiciel sur mesure" Alsace` · `"application métier" Haut-Rhin` | Concurrence sur le cœur d'offre |
| `"facture électronique" TPE` · `"facturation électronique" artisans` | Calendrier, tolérances, sanctions |
| `SEINSIGHTS` · `"Getting Results" Mulhouse` · `Qizuna` · `Annei` · `"S MEDIA" Mulhouse` · `Acronet Mulhouse` | Suivi nominatif des concurrents directs |
| `"Région Grand Est" intelligence artificielle aide` | Nouvelles aides, appels à projets |

### Sites institutionnels (vérifier le 1er lundi du mois)

| Source | Ce qu'on y cherche | URL |
|---|---|---|
| France Num (DGE) | Baromètre annuel (publié fin septembre), guides, actualités IA | https://www.francenum.gouv.fr |
| entreprises.gouv.fr — espace presse | Annonces officielles (plan « Osez l'IA », baromètres) | https://www.entreprises.gouv.fr/espace-presse |
| impots.gouv.fr — facturation électronique | Calendrier, liste des plateformes agréées, sanctions | https://www.impots.gouv.fr |
| INSEE — enquête TIC entreprises | Usage de l'IA par taille et secteur (publication annuelle) | https://www.insee.fr |
| Bpifrance Le Lab | Études dirigeants PME/ETI | https://lelab.bpifrance.fr |
| les-aides.fr (filtre Grand Est + « intelligence artificielle » / « numérique ») | Aides actives et leur date de mise à jour | https://les-aides.fr |
| Grand E-nov+ / Région Grand Est | Aide primo-utilisateurs IA, modules Industrie 5.0 | https://www.grandest.fr |
| CNIL | IA, RGPD, recommandations pratiques | https://www.cnil.fr |
| EUR-Lex | Textes officiels AI Act et omnibus (référence en cas de doute) | https://eur-lex.europa.eu |
| CCI Alsace Eurométropole, CMA Grand Est | Événements IA/numérique locaux (où rencontrer des dirigeants) | https://www.alsace-eurometropole.cci.fr · https://www.cma-grandest.fr |

### Newsletters (s'abonner avec l'adresse de veille, lecture en diagonale)

- Lettre d'information France Num (actualités et baromètre).
- Blog du Modérateur (synthèses chiffrées des études numériques).
- ActuIA (études IA et entreprises).
- La newsletter de l'éditeur comptable utilisé par la cible (Pennylane, Sage, EBP) : annonces facture électronique.

### LinkedIn (sans outil payant)

- **Suivre** les pages entreprise : SEINSIGHTS / Getting Results, Acronet, Qizuna, Annei, S MEDIA, Quadia, KLdigital, Jaikin.
- **Suivre** (pas se connecter) leurs dirigeants quand ils publient : noter le thème, le format et l'engagement visible des 3 derniers posts.
- Recherche LinkedIn « automatisation » + filtre « Posts » + « Ce mois-ci » + lieu Alsace : repérer les nouveaux freelances.

### Annuaires (nouveaux entrants)

- Google Maps : « agence IA », « automatisation », « développement logiciel » autour de Mulhouse, Colmar, Saint-Louis.
- La Fabrique du Net (pages « agences IA Strasbourg / Grand Est », « automatisation IA ») — parfois bloqué à la lecture automatique : ouvrir à la main.
- Malt (filtre Mulhouse/Colmar + « n8n », « Make », « automatisation ») pour les freelances.
- agence-ia.net/departement/haut-rhin (annuaire, pas un concurrent).

## 2. Routine mensuelle de 30 minutes (1er lundi du mois)

| Minutes | Tâche | Sortie |
|---|---|---|
| 0-5 | Lire les alertes Google et notifications LinkedIn du mois ; garder 3 à 5 signaux maximum | Liste brute des signaux avec URL |
| 5-12 | Concurrents directs (6 du Haut-Rhin) : page d'accueil + page tarifs. Un prix, une offre ou un argument a-t-il changé ? | Lignes datées dans `memoire/concurrents.md` |
| 12-17 | Nouveaux entrants : 3 recherches fixes (« agence IA Mulhouse », « automatisation Colmar TPE », « logiciel sur mesure Haut-Rhin ») ; noter si slagence.fr apparaît | Fiche concurrent pour tout nouvel acteur (grille §4) |
| 17-22 | Réglementation et aides : impots.gouv (facture électronique), les-aides.fr (Grand Est IA), CNIL/AI Act | Mise à jour des §3 et §4 de `marche-2026.md` |
| 22-27 | Choisir les 2 signaux les plus utiles et les transformer (§3) | 2 actions écrites, chacune pour un agent |
| 27-30 | Écrire le rapport court `travail/veille/AAAA-MM.md` et les transmissions | Rapport + fichiers dans `travail/transmissions/` |

Une fois par an (octobre) : intégrer le nouveau Baromètre France Num et l'Insee Première sur l'IA dans `marche-2026.md` §1.

## 3. Transformer chaque signal en action

Règle : **chaque signal retenu produit un livrable créé**, attribué à un agent, avec une échéance.
Classement : argent probable à court terme > temps gagné > visibilité long terme.

| Type de signal | Exemple | Action à créer | Agent |
|---|---|---|---|
| Un concurrent affiche un nouveau prix ou un forfait | Getting Results : Système Essentiel 1 490 € HT en 10 jours | Une proposition d'offre packagée SL Agence (nom, contenu, délai, garantie) soumise à Loïc ; un argument de comparaison sans dénigrer | Manager (décision Loïc) → `seo-site` (page) |
| Un concurrent publie une page ville ou un mot-clé | « Agence IA Colmar » (S MEDIA, Quadia) | Brief de page locale à contenu réel (réalisation, déplacement, secteurs du coin) | `seo-site` |
| Une échéance réglementaire approche | Émission de factures électroniques au 1er/09/2027 | Post LinkedIn « ce qui change pour vous », séquence e-mail aux prospects BTP, mise à jour de `/facture-electronique-tpe` | `contenu-linkedin`, `prospection`, `seo-site` |
| Une nouvelle aide ou un changement d'aide | Aide primo-IA Grand Est (40 %, plafond 20 000 €) | Paragraphe type pour les devis + argument d'appel ; post « l'aide que peu de TPE connaissent » | `prospection`, `contenu-linkedin` |
| Une étude publie un chiffre fort | 85 % des payeurs d'IA voient un impact positif | Argument ajouté à `marche-2026.md` §7 + 1 post chiffré | `contenu-linkedin` |
| Un concurrent publie un cas client chiffré | SEINSIGHTS : 340 h économisées par an | Rédiger l'étude de cas chiffrée équivalente à partir d'une réalisation SL Agence (anonymisée) | `contenu-linkedin` |
| Un nouvel entrant cible le même secteur | Jaikin cite la construction | Renforcer les preuves BTP (page, post terrain) ; surveiller | `seo-site`, `contenu-linkedin` |
| Un concurrent abandonne un créneau | Mirtillo devenu studio web/mobile | Récupérer le mot-clé ou l'angle laissé libre | `seo-site` |

Format d'une action dans le rapport :
`Action : <ce qui est créé> → agent <nom> · Pourquoi : <signal + URL + date> · Échéance : <date>`
Puis créer la transmission dans `travail/transmissions/` (format `FORMAT.md`).

### Règles de rigueur

- **Constaté** = lu sur la source, URL et date de consultation notées. **Hypothèse** = déduction, toujours étiquetée.
- Un chiffre sans source primaire (étude, site officiel) est signalé « non sourcé » et n'est pas réutilisé commercialement (exemple : « 9 millions d'entreprises sans plateforme »).
- Ne jamais dénigrer un concurrent dans un contenu public ; comparer des faits (délai, preuve, proximité).
- Aucun nom de client ou de prospect dans le dépôt.

## 4. Grille d'évaluation d'une fiche concurrent (seuil 8/10)

Chaque fiche (dans le rapport mensuel et dans `memoire/concurrents.md`) est notée sur 10. **En dessous de 8, la fiche est complétée avant livraison.**

| Critère | Points | Exigence pour avoir les points |
|---|---|---|
| Identité vérifiée | 1 | Nom, ville réelle (adresse ou mention « à distance »), URL du site consultée |
| Offre décrite | 1 | Ce qu'il vend, en une phrase, pour qui |
| Prix publics | 1,5 | Montants exacts avec URL de la page tarifs, ou mention explicite « non affichés » après vérification |
| Sources et dates | 1,5 | Chaque fait porte une URL et une date de consultation |
| Constaté / hypothèse | 1 | Les appréciations (force, faiblesse) sont distinguées des faits |
| Force et faiblesse | 1 | Une force et une faiblesse concrètes, vues depuis la cible de SL Agence (TPE terrain Haut-Rhin) |
| Visibilité | 1 | Présence constatée ou non sur nos mots-clés, et activité LinkedIn/contenus récents |
| Opportunité pour SL Agence | 1 | Ce que SL Agence peut faire différemment ou mieux, en une phrase |
| Action recommandée | 1 | Une action créée, attribuée à un agent (`seo-site`, `contenu-linkedin`, `prospection`) |

### Grille du rapport mensuel (seuil 8/10)

| Critère | Points |
|---|---|
| « En bref » en 3 lignes maximum, utile à Loïc | 2 |
| Tous les concurrents connus revérifiés (date du mois) | 2 |
| Au moins 1 recherche de nouveaux entrants documentée | 1 |
| Réglementation et aides vérifiées sur source officielle | 1 |
| Au moins 2 actions créées et transmises | 2 |
| `marche-2026.md` et `concurrents.md` mis à jour et datés | 1 |
| Aucune donnée personnelle, aucune affirmation non sourcée | 1 |
