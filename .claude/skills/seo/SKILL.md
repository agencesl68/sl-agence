---
name: seo
description: Identifie l'action SEO ou site (conversion) qui aura le plus d'impact pour SL Agence maintenant, met à jour le backlog SEO, et lance si besoin la chaîne SEO → contenu → vérification → intégration.
---

# /seo — l'action SEO / site à plus fort impact

1. Lancer `seo-site` : « Quelle action SEO ou site aura probablement le plus d'impact maintenant ?
   Mets à jour `.claude/travail/seo/backlog.md`. »
2. Si l'action est un contenu : prendre le brief déposé dans `.claude/travail/transmissions/`,
   lancer `contenu-linkedin` pour rédiger, puis relancer `seo-site` pour vérifier et préparer
   l'intégration (branche + pull request, jamais sur `main` sans accord de Loïc).
3. Présenter à Loïc : l'action n°1 (impact, effort, priorité, pourquoi, action recommandée),
   les 3 suivantes en une ligne chacune, et ce qui demande sa validation.

## Chaîne (obligatoire)

QG : agent(s) « au travail » + activité → **analyste** (brief) → **seo-site** (exécution, Sonnet) →
**controle-qualite** (verdict ; si À CORRIGER, renvoyer à l'agent, 2 fois max) → présentation à Loïc
→ QG : livrables, mission, agents « disponibles » → commit.

**Notion** (si connecté) : contenus et idées dans la base « Contenus » (statut Idée → En atelier → Prêt →
Publié) ; actions à faire par Loïc dans « Tâches de Loïc » ; rapports dans « Rapports ».
