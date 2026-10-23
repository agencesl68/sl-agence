---
id: c004
date: 2026-10-06
agents: [tous]
gravite: haute
source: Manager
remplace: aucune
---

# Données de prospects dans le dépôt public

## Ce qui s'est passé
Le manuel e-mailing contenait les noms d'entreprises prospectées et de dirigeants ; le dépôt GitHub est public.

## Règle désormais
Aucun nom de prospect, de dirigeant, d'e-mail, de téléphone, de client ni de tarif interne dans le dépôt. Les détails nominatifs vont dans Google Drive (dossier « SL agence ») et seules les leçons anonymisées vont dans le dépôt.

## Vérification (contrôle qualité)
grep des fichiers modifiés du dépôt : aucun nom de personne ou d'entreprise prospectée, aucune adresse e-mail hors agence.


Précision 2026-10-23 (Loïc) : aucun nom de client ne doit apparaître sur le site, y compris dans une URL de démo (ex. sous-domaine github.io portant le nom du client) ou un nom de produit dérivé du client. Liens « Voir la réalisation en ligne » retirés.
