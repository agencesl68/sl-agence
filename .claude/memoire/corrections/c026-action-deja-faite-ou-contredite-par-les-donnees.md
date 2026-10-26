---
id: c026
date: 2026-10-26
agents: [analyste, seo-site, manager]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Action proposée déjà faite, ou hypothèse contredite par les données de Loïc

## Ce qui s'est passé
Diagnostic carte ChatGPT : ajout d'alternateName/disambiguatingDescription proposé alors qu'il était en cours sur la branche ; captures de Loïc (numéros 07 et 06, favicon dans la source) non confrontées aux hypothèses ; source Gemini citée pour une affirmation qu'elle ne contient pas ; étude SCAILE utilisée pour appuyer une hypothèse de logo alors qu'elle ne relève aucune erreur d'image. Le Manager a relayé à Loïc l'hypothèse « absents des bases de lieux » comme explication principale avant le contrôle.

## Règle désormais
Avant de proposer une action sur le site : grep sur la branche de travail ET lecture de main, et indiquer l'état (absent / sur branche / en production). Avant de livrer un diagnostic : confronter chaque hypothèse aux relevés et captures de memoire/apprentissages.md. Chaque fait sourcé : la phrase doit se trouver dans la page citée. Manager : ne pas présenter une explication à Loïc avant le verdict du contrôle qualité, ou la marquer explicitement « hypothèse en cours de vérification ».

## Vérification (contrôle qualité)
Grep des éléments dits « absents » ; relecture des captures du jour ; ouverture d'au moins 2 sources du diagnostic.
