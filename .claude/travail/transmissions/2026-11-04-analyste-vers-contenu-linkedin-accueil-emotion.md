---
de: manager (brief de l'analyste)
vers: contenu-linkedin
date: 2026-11-04
statut: en cours
priorité: P1
---

## Demande
Réécrire les textes de la page d'accueil (`index.html`) pour qu'ils touchent le visiteur : livrer un « avant / après » section par section, avec 2 variantes de l'accroche du héros et de chaque H2 réécrit. Objectif : un dirigeant se reconnaît dans au moins 3 scènes avant les avis.

## Contexte
- Directive de Loïc (04/11) : « la forme est belle, le fond est platonique ; il faut que la personne ressente des émotions, se sente visée, ait envie de rester ».
- Structure de la page refaite la veille (PR #35, mesure SEO J+28 le 01/12) : on ne touche **qu'au texte**.
- Objectif : conversion + identification.

### Diagnostic
- La page parle de nous, pas de lui (« Les logiciels que nous construisons pour vous », « Si vous savez le décrire, nous savons le construire »).
- Des fonctions, pas des moments de vie (« Signé au doigt sur le chantier, même sans réseau »).
- Les douleurs de la 03 s'arrêtent avant le coût humain ; les réponses restent techniques.
- « …nous le faisons disparaître » se répète (H2 de la 03 et de la 06).
- Personne n'a de visage : Loïc et Sacha n'apparaissent qu'à côté des téléphones.

### Axes (du plus fort au plus faible)
1. **Des scènes de sa semaine, au « vous »** : le soir, le dimanche, le téléphone qui sonne (savoirs/linkedin-contenu.md §2 règle 4 ; ton.md règle 2). Où : la 03, le chapeau de la 02, le lead de la 01.
2. **Nommer le coût caché, sans chiffre** : soirées, peur d'oublier, argent qui dort, être le seul à tout savoir (ton.md règle 3). Où : les lignes 2 des cartes de la 03, la chute de la 01.
3. **Promettre le soulagement, pas la technique** (agence.md : toujours parler du résultat). Où : la phrase du héros, les boutons, le H2 de la 06.
4. **La preuve par les vrais clients** : phrases reprises mot pour mot de `realisations.html` et des avis Google de la page (seo.md, E-E-A-T). Où : une transition avant les avis, une ligne de preuve sous 2 ou 3 cartes de la 03.
5. **2 personnes du coin** : Loïc et Sacha, associés à Friesen (« Vous parlez directement à ceux qui construisent votre outil », déjà sur a-propos.html). Où : le lead de la 06 et « Près de chez vous ».

### Plan section par section
- **Héros** : H1 inchangé ; 2 variantes de la phrase centrée et des libellés des 2 boutons ; l'animation et ses badges inchangés.
- **01** : le H2 reste ; lead en scène, chute = ce qu'il récupère.
- **02** : H2 au « vous » avec « logiciel » ; intro réécrite ; la ligne des 8 nœuds décrit le moment vécu (1 ligne) ; liens et H3 inchangés.
- **Avis** : citations, prénoms et lien inchangés ; H2 et intro réécrivables.
- **03** : ligne 1 = scène, ligne 2 = soulagement. Corriger « 10 minutes » (chiffre non sourcé) et « une entreprise qui tourne aussi sans vous » (surpromesse). H2 différent de celui de la 06.
- **04** : H2 et 4 H3 inchangés ; possible ligne courte par étape tirée d'agence.md (Méthode).
- **Près de chez vous** : H2 et liens inchangés ; ajouter une phrase sur Loïc et Sacha.
- **06 Contact** : nouveau H2 ; lead sur les 15 minutes ; numéros et formulaire inchangés.
- **FAQ, guides, pied de page, title/meta, JSON-LD** : on n'y touche pas.

## Contraintes
- H1, title et meta inchangés. Mots-clés des H2/H3 gardés ou remplacés par un équivalent (c013).
- Chaque section se lit en 5 s, 1 ligne par élément, la page ne s'allonge pas (c012, c013).
- Nombres en chiffres, sauf citations (c014).
- **Aucun chiffre ni résultat inventé** (règle de Loïc du 27/10, c019, c028, c034). Seuls autorisés : ceux de realisations.html, agence.md et des avis de la page ; « 6 h » et « 3 h gagnées par semaine » (cas réels confirmés le 03/11).
- Une scène au « vous » est une situation possible, jamais un résultat client (c011) ; on garde les conditions (c022).
- Aucun nom de client (c004) ; aucun prix ; zone selon agence.md (c032).
- ton.md : phrases courtes, vouvoiement, pas de superlatif ni de mot interdit. Pas de tiret cadratin, pas d'emoji, pas de série « ce n'est pas X, c'est Y ».
- Pièges : mélo ou culpabilisation, textes plus longs, reprendre « nous le faisons disparaître », toucher la FAQ.

## Livrable attendu
`.claude/travail/contenu/accueil-avant-apres-2026-11-04.md` : un tableau par section, avec les colonnes Avant (texte exact) / Après / Axe / Source de chaque fait. Pas de HTML. Auto-notation sur la grille du manuel (≥ 8/10).

## Contrôle qualité
1. ≥ 4 scènes au « vous », aucune présentée comme un résultat.
2. Chaque fait se retrouve mot pour mot dans sa source.
3. H1, title et meta inchangés ; mots-clés gardés ; aucun H2 en double.
4. Test des 5 s, page pas plus longue.
5. Aucun tiret cadratin ni emoji ; nombres en chiffres ; aucun nom de client ni prix.
6. « 10 minutes » et « tourne aussi sans vous » corrigés.
7. 2 variantes de l'accroche et de chaque H2 réécrit.
