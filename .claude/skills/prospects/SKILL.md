---
name: prospects
description: Produit un lot de prospects qualifiés du Haut-Rhin avec, pour chacun, l'analyse et un message d'approche prêt à valider. Arguments possibles : nombre, secteur, ville (ex. « /prospects 10 BTP Colmar »).
---

# /prospects — lot de prospects qualifiés

Arguments : `$ARGUMENTS` (nombre, secteur, ville — par défaut : 10, secteurs priorité A de
`.claude/memoire/cible.md`, Haut-Rhin).

1. Lancer l'agent `prospection` avec la demande, en lui rappelant : commencer par la feuille Drive
   existante, sourcer chaque fait, ne rien exporter de Vibe Prospecting, créer le lot dans Google Drive.
2. Contrôler le résultat : chaque prospect a une source, un score, un message conforme à `ton.md`
   (pas de formule interdite, 50–90 mots, pas de prix, pas de nom de client). Renvoyer à l'agent ce qui ne va pas.
3. Présenter à Loïc : le tableau (entreprise · ville · score · angle · canal), le lien du Google Doc,
   et le temps estimé pour tout envoyer.
4. Après validation, rappeler à Loïc de passer les statuts à « Contacté » avec la date (feuille ou CRM)
   pour que `crm-relances` puisse planifier les relances. Ajouter une ligne anonyme dans `memoire/journal.md`.
