---
id: c045
agents: [seo-site, analyste, manager]
gravite: moyenne
source: contrôle qualité
remplace: aucune (complète c040, c041)
---
# Date de verrou sans ligne de mesure

## Ce qui s'est passé
09/11, plan « 4 conseils » du blog : des dates de verrou ont été prises dans le regroupement des PR de l'audit §10 (transport, terrassement), J+28 a été appliqué à des articles au lieu de J+56 (cahier des charges, terrassement), et la mesure du 26/10 a été confondue avec celle du 16/11.

## Règle désormais
Chaque date « APRÈS » cite sa ligne de mesure (fichier + date de mise en ligne + J+28 pour une page ou J+56 pour un article) et retient la plus tardive de toutes les lignes qui touchent la page, y compris quand la page porte un lien testé. Une date de regroupement de PR n'est jamais une date de mesure.

## Vérification (contrôle qualité)
Pour chaque page, lister toutes les lignes de experiences.md qui la citent (Grep sur le nom du fichier) et vérifier que la date retenue est la plus tardive.
