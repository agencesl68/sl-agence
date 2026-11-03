---
id: c033
date: 2026-11-02
agents: [seo-site, analyste]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Title concurrent pendant une mesure en cours

## Ce qui s'est passé
Le 02/11, le lot CTR a donné à /agence-ia-automatisation-haut-rhin un title « Agence IA, automatisation Haut-Rhin… » et une meta « Agence d'automatisation et d'IA… », alors que l'accueil (14,4 % de CTR) est en test jusqu'au 16/11 sur « agence automatisation ia » : variable parasite et risque de cannibalisation sur la meilleure page du site, pour 15 impressions.

## Règle désormais
Tant qu'une mesure de title/CTR est en cours sur une page, aucune autre page ne reçoit un title ou une meta qui commence par la requête de la page mesurée (même tête de requête, même ouverture de meta). Sinon : reporter après le verdict, ou garder une intention distincte (« Choisir… », « Comment… »), et noter la variable parasite dans experiences.md.
En raccourcissant un title, garder la nature exacte du contenu (ex. « 8 modèles mail et SMS », pas « 8 modèles de mail ») : récidive de c022.

## Vérification (contrôle qualité)
Pour chaque title réécrit, comparer ses 3 premiers mots aux titles et metas des pages en test (experiences.md).
