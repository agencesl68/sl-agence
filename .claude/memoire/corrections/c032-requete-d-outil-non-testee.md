---
id: c032
date: 2026-10-28
agents: [prospection, analyste, suivi, manager]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Requête d'outil écrite dans une procédure sans avoir été testée

## Ce qui s'est passé
Le 28/10, la procédure du mail de base de `/campagne` (lancée chaque jour ouvré) contenait des requêtes jamais
exécutées : `minimal=true&include=dirigeants` ne renvoie pas le siège (contrôle « siège 68 » impossible), le filtre
`etat_administratif=A` masque les entreprises fermées (classées INTROUVABLE au lieu de CESSÉE), la recherche France
Travail portait sur le poste au lieu de l'entreprise. Une promesse du site était aussi paraphrasée alors que la phrase
exacte existait sur d'autres pages.

## Règle désormais
Toute requête (API, URL, Gmail, Drive) écrite dans une procédure ou un skill est lancée une fois sur un cas réel avant
livraison ; les champs lus sont notés (sans donnée personnelle dans le dépôt). Une promesse du site reprend la phrase
exacte si elle existe : Grep sur tout le site avant de paraphraser.

## Vérification (contrôle qualité)
Relancer au moins 2 requêtes de la procédure et vérifier que les champs utilisés figurent dans la réponse ; Grep de
chaque promesse sur tout le site.
