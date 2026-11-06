---
id: c041
agents: [seo-site, manager, analyste]
gravite: moyenne
source: contrôle qualité
remplace: aucune (complète c040)
---
# Mesures en cours croisées sans le journal d'expériences

## Ce qui s'est passé
05/11, audit GEO (2e passe) : le découpage des PR modifiait encore travaux agricoles (lot CTR du 02/11 + mesure du 01/12), CRM/stock/pointage (J+28 de création ≈ 27/11) et limites-excel (title du 02/11) avant leur verdict. Cause : experiences.md non lu, et des actions déjà en ligne restées sous « Actions prêtes, pas encore en ligne ».

## Règle désormais
Le croisement c040 lit experiences.md (les deux tableaux) en plus de rappels-seo.md et ctr-*.md ; toute ligne « prête » est vérifiée en ligne (title) et, si elle est en ligne, déplacée dans le tableau principal avec sa date réelle. Tout lot de PR donne un tableau « fichier → mesure en cours → date de fin → PR ».

## Vérification (contrôle qualité)
Pour chaque fichier du lot, retrouver sa ligne dans experiences.md et sa date de fin ; aucun fichier modifié avant sa date.
