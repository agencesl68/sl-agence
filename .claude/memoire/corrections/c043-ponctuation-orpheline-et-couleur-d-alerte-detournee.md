---
id: c043
agents: [manager, contenu-linkedin, seo-site]
gravite: basse
source: contrôle qualité
remplace: aucune
---
# Ponctuation orpheline et couleur d'alerte détournée dans un visuel

## Ce qui s'est passé
06/11, reel « salarié absent » : un « ? » s'est retrouvé seul sur une ligne (espace normale devant), et le rouge réservé aux erreurs a servi à mettre en valeur le mot « personne » dans une scène où Loïc ne l'avait pas demandé.

## Règle désormais
Dans tout visuel ou toute vidéo : espace insécable (U+00A0) avant ? ! : ; et aucune ponctuation seule en début de ligne. Une couleur qui a un rôle (rouge = erreur, vert = validation) ne sert pas à la simple mise en valeur, sauf consigne explicite de Loïc pour cet endroit précis.

## Vérification (contrôle qualité)
Chercher « ␣? », « ␣! », « ␣: » (espace normale) dans les fichiers de textes ; relire les planches image par image ; lister chaque usage du rouge et le rattacher à une erreur ou à une consigne de Loïc.
