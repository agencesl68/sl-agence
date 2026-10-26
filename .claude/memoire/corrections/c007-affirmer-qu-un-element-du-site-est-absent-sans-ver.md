---
id: c007
date: 2026-10-06
agents: [tous]
gravite: moyenne
source: Manager
remplace: aucune
---

# Affirmer qu'un élément du site est absent sans vérifier tout le site

## Ce qui s'est passé
L'agent SEO a écrit « mentions légales absentes » alors qu'elles figurent dans le pied de page de chaque page.

## Règle désormais
Avant d'affirmer une absence, chercher dans tous les fichiers (Grep sur le dépôt) et sur la version en ligne ; citer l'endroit vérifié.

## Vérification (contrôle qualité)
Chaque « absent / manquant » est accompagné de la vérification faite.

## Précision (26/10/2026, contrôle qualité)
Récidive : un agent a affirmé que « 500 € » n'était pas sur /logiciel-sur-mesure, alors que la page écrit « 500 euros ». Avant d'affirmer une absence, chercher **toutes les graphies** (« 500 € », « 500 euros », « 500&nbsp;€ », « 500 ») dans le dépôt ET sur la page en ligne, et citer fichier + ligne vérifiés.
