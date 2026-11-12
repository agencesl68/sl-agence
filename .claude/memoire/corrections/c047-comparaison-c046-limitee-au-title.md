---
id: c047
agents: [seo-site, contenu-linkedin, manager, analyste]
gravite: moyenne
source: contrôle qualité
remplace: aucune (précise c046)
---
# Comparaison c046 limitée au title de la page en test

## Ce qui s'est passé
12/11 : /blog/cout-automatisation-pme ouvrait title, H1 et meta par « Combien coûte… », jugé « distinct du title en test » de /logiciel-sur-mesure ; or la meta en test de cette page commence par « Combien coûte un logiciel sur mesure ? » (le test CTR du 19/10 porte sur title ET meta). Le texte du partenaire annonçait aussi « 3 variables » puis « 4 facteurs ».

## Règle désormais
La comparaison c033/c046 porte sur les 3 premiers mots du title, du H1 et de la meta de la nouvelle page, comparés au title ET à la meta de chaque page en test, et elle est écrite dans experiences.md. Pour un texte de partenaire : chaque nombre annoncé (variables, facteurs, étapes) est le même partout, et la meta décrit ce que la page contient vraiment.

## Vérification (contrôle qualité)
Lire la meta de chaque page en test dans le HTML ; relever chaque nombre annoncé dans l'article et vérifier qu'il est identique partout.
