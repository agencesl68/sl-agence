---
name: correction
description: Enregistre une correction de Loïc (ou une erreur repérée par le contrôle qualité) dans la mémoire des corrections, pour que la même erreur ne revienne jamais. À utiliser dès que Loïc dit « non », « ce n'est pas ce que je veux », « arrête de… », « fais plutôt… », ou via « /correction <ce qui n'allait pas> ».
---

# /correction — la même erreur ne revient jamais

Argument : `$ARGUMENTS` (ce qui n'allait pas ; sinon, reprendre la remarque de Loïc dans la conversation).

1. Lire `.claude/memoire/corrections/INDEX.md` : la règle existe-t-elle déjà ?
   - Oui mais elle a été violée → ne pas dupliquer : ajouter une ligne « Récidive AAAA-MM-JJ : … » dans le
     fichier existant et renforcer sa section « Vérification ».
   - Non → nouveau fichier.
2. Nouveau fichier `.claude/memoire/corrections/cNNN-<slug>.md` (numéro suivant), avec l'en-tête :
   `id, date, agents: [manager|prospection|suivi|contenu-linkedin|seo-site|veille|analyste|controle-qualite|tous], gravite: haute|moyenne|basse, source: Loïc|Contrôle qualité, remplace: aucune|cXXX`
   puis 3 sections : **Ce qui s'est passé** (faits, sans nom de prospect), **Règle désormais** (une
   instruction claire, positive, vérifiable), **Vérification (contrôle qualité)** (le test concret).
3. Ajouter la ligne dans `INDEX.md`.
4. Si la règle change le comportement d'un agent de façon durable, ajouter aussi une ligne dans sa fiche
   (`.claude/agents/<agent>.md`) ou dans `CLAUDE.md` pour le Manager.
5. Commiter et pousser. Confirmer à Loïc en une ligne : « Correction cNNN enregistrée : <règle> ».
