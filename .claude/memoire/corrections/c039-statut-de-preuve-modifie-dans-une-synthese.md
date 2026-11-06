---
id: c039
agents: [seo-site, analyste, manager]
gravite: moyenne
source: contrôle qualité
remplace: aucune
---
# Statut de preuve modifié dans une synthèse

## Ce qui s'est passé
05/11, synthèse de l'audit GEO : le Manager a présenté comme « anomalies confirmées » des points que le fichier source classait « SUSPECTÉ » ou « OK » (zone des pages BTP/transport/artisan, nœud WebSite de /realisations, fil d'Ariane de /blog/), et a décrit un défaut de clic (« le rendez-vous s'ouvre dans un nouvel onglet ») sans lire le script qui gère ce clic (assets/rdv.js:283-291 l'ouvre sur place).

## Règle désormais
Une synthèse garde le statut de sa source : SUSPECTÉ reste SUSPECTÉ, OK ne devient jamais ANOMALIE. Avant d'affirmer un défaut de comportement (clic, onglet, fenêtre, formulaire), lire le script qui le gère et citer sa ligne.

## Vérification (contrôle qualité)
Pour chaque ligne d'un lot de corrections, retrouver « ANOMALIE CONFIRMÉE » dans le fichier source ; pour chaque défaut de comportement, une ligne de script citée.
