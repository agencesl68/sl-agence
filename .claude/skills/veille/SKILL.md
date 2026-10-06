---
name: veille
description: Rapport de veille concurrentielle (agences IA / automatisation en Alsace et France, offres, prix publics, nouveautés). Mensuel ou sur un concurrent précis (« /veille <nom ou url> »).
---

# /veille

Arguments : `$ARGUMENTS` (vide = rapport mensuel complet ; sinon un concurrent précis).

1. Lancer l'agent `veille`.
2. Pour chaque « action recommandée », créer une transmission dans `.claude/travail/transmissions/`
   vers l'agent concerné.
3. Présenter à Loïc : « En bref », les nouveaux concurrents, et les 3 actions prioritaires.
4. Commiter et pousser le rapport.

## Chaîne (obligatoire)

QG : agent(s) « au travail » + activité → **analyste** (brief) → **veille** (exécution, Sonnet) →
**controle-qualite** (verdict ; si À CORRIGER, renvoyer à l'agent, 2 fois max) → présentation à Loïc
→ QG : livrables, mission, agents « disponibles » → commit.

**Notion** (si connecté) : contenus et idées dans la base « Contenus » (statut Idée → En atelier → Prêt →
Publié) ; actions à faire par Loïc dans « Tâches de Loïc » ; rapports dans « Rapports ».
