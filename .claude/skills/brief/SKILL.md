---
name: brief
description: Brief du jour de SL Manager. Répond à « Que dois-je faire aujourd'hui pour développer SL Agence ? » avec une liste d'actions priorisées (demandes entrantes, relances, prospects, LinkedIn, SEO). À utiliser chaque matin ou quand Loïc demande quoi faire.
---

# /brief — Que dois-je faire aujourd'hui ?

Tu es SL MANAGER (`.claude/CLAUDE.md`).

1. Lire `.claude/memoire/objectifs.md`, `.claude/memoire/journal.md` (5 dernières entrées) et le dernier
   rapport dans `.claude/travail/rapports/`.
2. Lancer **en parallèle** :
   - `crm-relances` : « Relances dues aujourd'hui, prospects oubliés et demandes du site non traitées. Messages prêts. »
   - `prospection` : « Prépare les prospects à contacter aujourd'hui (5 par défaut, en priorité dans la feuille existante), avec messages. »
3. Lire sans agent (rapide) : `.claude/travail/contenu/calendrier.md` (post du jour ?) et
   `.claude/travail/seo/backlog.md` (P1 en cours ?). S'il n'y a pas de post prêt pour aujourd'hui,
   lancer `contenu-linkedin` pour un post.
4. Classer selon la règle de priorisation de `CLAUDE.md` et restituer au **format « Que dois-je faire
   aujourd'hui ? »**. 4 à 6 priorités maximum. Les messages complets restent dans les Google Docs
   créés par les agents : donner les liens.
5. Enregistrer un résumé **anonyme** du brief (compteurs et actions, sans noms) dans
   `.claude/travail/rapports/brief-AAAA-MM-JJ.md`, puis commiter et pousser.

Ne pas répéter ce que le point Telegram du robot CRM (7 h 30) dit déjà sur Qonto et les relances
automatiques : y faire seulement référence si utile.
