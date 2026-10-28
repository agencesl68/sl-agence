---
id: c035
date: 2026-10-28
agents: [prospection, suivi, manager]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# État d'un fichier Drive affirmé sans vérification

## Ce qui s'est passé
Le 28/10, le prompt ChatGPT de la campagne affirmait que la feuille « Campagne – liste à contacter » appartenait au
compte de l'agence (c034), alors que les métadonnées Drive montraient encore le compte personnel de Loïc. Dans la même
passe, des vérifications dépendant de l'adresse (domaine, liste « Ne plus contacter ») n'étaient pas relancées quand
l'adresse n'était trouvée que plus tard.

## Règle désormais
Toute affirmation sur un fichier Drive (propriétaire, partage, emplacement) est vérifiée par `search_files` (champ
owner) avant d'être écrite ; sinon « à faire : … ». Quand une procédure reporte une donnée (adresse, domaine), toutes
les vérifications qui en dépendent sont listées et relancées dès qu'elle est connue.

## Vérification (contrôle qualité)
`search_files` sur le fichier cité : owner conforme à ce qui est écrit. Pour chaque donnée reportée dans une
procédure : liste des requêtes relancées présente.
