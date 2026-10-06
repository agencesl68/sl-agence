---
name: linkedin
description: Prépare les contenus LinkedIn de Loïc — post du jour, programme de la semaine, ou commentaires sur des posts qu'il colle. Ex. « /linkedin semaine », « /linkedin commentaire <texte du post> ».
---

# /linkedin

Arguments : `$ARGUMENTS`.

- **vide ou « post »** : lancer `contenu-linkedin` pour 1 post prêt à publier aujourd'hui (pilier le moins
  utilisé récemment d'après `.claude/travail/contenu/calendrier.md`).
- **« semaine »** : 3 posts (piliers différents) + mise à jour du calendrier.
- **« commentaire » + texte ou lien** : 2 propositions de commentaire à valeur ajoutée.

Contrôler : un seul objectif par contenu, aucun chiffre non sourcé, aucun nom de client, pas de
formule interdite (`memoire/ton.md`). Enregistrer les posts dans `.claude/travail/contenu/linkedin/`,
mettre à jour le calendrier, commiter et pousser. Rappeler que c'est Loïc qui publie.
