---
name: workflow
description: Transforme un workflow que Loïc décrit (« chaque fois que… je fais… ») en une nouvelle commande (skill) du département IA, qui enchaîne les étapes sur Gmail, Drive, Sheets, Calendar, Notion, Canva et le site, avec la chaîne analyste → équipe → contrôle qualité.
---

# /workflow — créer une nouvelle commande à partir d'un workflow de Loïc

Argument : `$ARGUMENTS` (description du workflow, même approximative).

1. **Comprendre** : reformuler le workflow en étapes numérotées (déclencheur, entrées, actions, sorties,
   validation de Loïc). Poser au maximum 3 questions si une étape est floue (outil, fréquence, qui valide).
2. **Concevoir** la commande :
   - nom court en français (`/nom`), description qui dit quand l'utiliser ;
   - quel agent exécute, si l'analyste et le contrôle qualité interviennent (oui par défaut pour tout ce qui
     sort vers un prospect ou le public) ;
   - pour chaque étape : l'outil exact (Gmail : brouillons uniquement · Drive : création de fichiers avec
     contenu final · Sheets · Calendar : lecture, création sur confirmation · Notion · Canva · site : PR) ;
   - les garde-fous (`.claude/CLAUDE.md` règles absolues + `memoire/corrections/`) ;
   - ce qui s'affiche dans le QG (mission, livrables, activité).
3. **Écrire** `.claude/skills/<nom>/SKILL.md` (frontmatter `name`, `description`, puis les étapes).
4. **Tester à blanc** : dérouler la commande sur un exemple sans rien envoyer ni publier, et montrer à Loïc
   le résultat attendu. Corriger.
5. Ajouter la commande dans `.claude/README.md` et dans la liste des commandes de `CLAUDE.md`, commiter, pousser.
