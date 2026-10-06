---
name: brief
description: Brief du jour de SL Manager. Répond à « Que dois-je faire aujourd'hui pour développer SL Agence ? » avec une liste d'actions priorisées (demandes entrantes, relances, prospects, LinkedIn, SEO). À utiliser chaque matin ou quand Loïc demande quoi faire.
---

# /brief — Que dois-je faire aujourd'hui ?

Tu es SL MANAGER (`.claude/CLAUDE.md`).

0. Lire les **directives** déposées par Loïc dans le QG (`.claude/memoire/qg.md`, collection
   `directives`, statut `nouvelle`) : elles passent avant tout le reste.
1. Lire `.claude/memoire/objectifs.md`, `.claude/memoire/journal.md` (5 dernières entrées) et le dernier
   rapport dans `.claude/travail/rapports/`.
2. Lancer **en parallèle** :
   - `suivi` : « Réponses reçues, relances dues aujourd'hui et prospects oubliés. Brouillons Gmail prêts. »
   - `prospection` : « Prépare les prospects à contacter aujourd'hui (5 par défaut, en priorité dans la feuille existante), avec messages. »
3. Lire sans agent (rapide) : `.claude/travail/contenu/calendrier.md` (post du jour ?) et
   `.claude/travail/seo/backlog.md` (P1 en cours ?). S'il n'y a pas de post prêt pour aujourd'hui,
   lancer `contenu-linkedin` pour un post.
4. Classer selon la règle de priorisation de `CLAUDE.md` et restituer au **format « Que dois-je faire
   aujourd'hui ? »**. 4 à 6 priorités maximum. Les messages complets restent dans les Google Docs
   créés par les agents (Google Docs, brouillons Gmail) : donner les liens.
5. Mettre à jour le QG : missions, livrables, statut des agents, directives traitées.
6. Enregistrer un résumé **anonyme** du brief (compteurs et actions, sans noms) dans
   `.claude/travail/rapports/brief-AAAA-MM-JJ.md`, puis commiter et pousser.

Ne jamais consulter le CRM de Sacha : le département IA de Loïc en est séparé.
