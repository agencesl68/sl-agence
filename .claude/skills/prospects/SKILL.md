---
name: prospects
description: Produit un lot de prospects qualifiés du Haut-Rhin avec un message prêt pour chacun - analyse, exécution, contrôle qualité, puis Drive (Google Doc), Gmail (brouillons), Sheets (feuille à jour) et Notion (tâches de Loïc). Ex. « /prospects 10 BTP Colmar ».
---

# /prospects — lot de prospects prêt à envoyer

Arguments : `$ARGUMENTS` (nombre, secteur, ville — défaut : 10, secteurs A de `memoire/cible.md`, Haut-Rhin).

## Chaîne (obligatoire)

QG : agent(s) « au travail » + activité → **analyste** (brief) → **prospection** (exécution, Sonnet) →
**controle-qualite** (verdict ; si À CORRIGER, renvoyer à l'agent, 2 fois max) → présentation à Loïc
→ QG : livrables, mission, agents « disponibles » → commit.

## Étapes

1. **Analyste** : brief (secteur, signaux à chercher, sources du manuel prospection, corrections c004 c005 c010…).
2. **Prospection** exécute :
   - sources : feuille Drive « Prospection SL agence », API Recherche d'entreprises, BODACC, offres d'emploi ;
   - vérification Gmail de chaque entreprise (correction c005) ;
   - **Drive** : Google Doc `Prospects – lot AAAA-MM-JJ` (contenu final en une fois, c006) ;
   - **Gmail** : un brouillon par prospect joignable par e-mail (ou relance dans le fil existant) ;
   - **Sheets** : ajout des prospects retenus (statut « À contacter », source) et marquage des écartés.
3. **Contrôle qualité** : verdict sur le lot et sur chaque message (grille e-mailing ≥ 8/10).
4. **Notion** (si connecté) : une tâche dans « Tâches de Loïc » : « Relire et envoyer N brouillons » (lien Gmail,
   échéance aujourd'hui) + une tâche par prospect à appeler ou à contacter sur LinkedIn.
5. Présenter : tableau (entreprise · ville · score · canal · angle), liens Doc et brouillons, verdict QC, temps estimé.
