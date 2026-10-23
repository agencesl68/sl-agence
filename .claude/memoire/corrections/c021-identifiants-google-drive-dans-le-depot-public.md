---
id: c021
date: 2026-10-23
agents: [tous]
gravite: haute
source: Loïc (test d'intrusion)
remplace: aucune
---

# Identifiants Google Drive dans le dépôt public

## Ce qui s'est passé
Le 06/10 (commit 5dbe029), `memoire/outils.md` puis `savoirs/emailing.md` ont reçu les identifiants de 4 fichiers Drive (feuille de prospection, dossier « SL agence », analyse de marché et grille tarifaire, critique du lot de prospection). Ces fichiers étaient partagés « Tous les utilisateurs disposant du lien : Éditeur ». Comme le dépôt est public, n'importe qui pouvait reconstruire le lien et lire ou modifier ces données. Un test d'intrusion l'a signalé.

## Règle désormais
Jamais d'identifiant, de lien ou d'URL Google Drive / Docs / Sheets / Forms dans le dépôt (ni dans `.claude/`, ni dans le site, ni dans un message de commit). On désigne un fichier par son nom ; les agents le retrouvent avec `mcp__Google_Drive__search_files`. Tout fichier Drive créé par un agent reste en accès « Restreint ».

## Vérification (contrôle qualité)
Grep `docs.google|drive.google|sheets.google|/d/1[A-Za-z0-9_-]{20,}|id \`1` sur le livrable et le diff : 0 résultat. Le contrôle automatique GitHub (`.github/workflows/garde-donnees.yml`) bloque aussi ces motifs.
