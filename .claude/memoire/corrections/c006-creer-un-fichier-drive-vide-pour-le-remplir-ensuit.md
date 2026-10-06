---
id: c006
date: 2026-10-06
agents: [manager]
gravite: moyenne
source: Manager
remplace: aucune
---

# Créer un fichier Drive vide pour le remplir ensuite

## Ce qui s'est passé
Un Google Doc vide a été créé avec un contenu provisoire ; le connecteur Drive ne permet pas de modifier un fichier, il a fallu en créer un second et Loïc doit supprimer le premier.

## Règle désormais
Créer un fichier Drive en une seule fois, avec son contenu final (create_file avec textContent). Jamais de fichier provisoire.

## Vérification (contrôle qualité)
Aucun create_file sans contenu final.
