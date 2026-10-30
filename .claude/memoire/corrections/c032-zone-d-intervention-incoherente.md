---
id: c032
date: 2026-10-30
agents: [seo-site, contenu-linkedin]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Zone d'intervention incohérente entre les pages

## Ce qui s'est passé
Le 30/10, la page transport (modifiée) et /a-propos disaient « En Alsace et dans le Grand Est, nous travaillons à distance », alors que agence.md (précision de Loïc du 23/10) et /logiciel-sur-mesure disent « déplacement en Alsace et dans le Grand Est, à distance partout en France ».

## Règle désormais
Toute mention de zone reprend agence.md (section zone) : déplacement dans le Haut-Rhin, en Alsace et dans le Grand Est ; à distance (téléphone, visio) partout en France. Pour chaque page modifiée, chercher « à distance » et « déplaçons » dans le texte visible et dans le JSON-LD, et aligner. Avant de réutiliser une maquette de `travail/site/` (refonte de l'accueil), chercher « à distance partout en Alsace » : les maquettes contiennent encore l'ancienne formulation.

## Vérification (contrôle qualité)
Grep « à distance » / « déplaçons » sur les pages livrées : aucune phrase ne limite les déplacements au Haut-Rhin ni ne met l'Alsace / le Grand Est « à distance ».
