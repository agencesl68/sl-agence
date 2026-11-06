---
id: c042
agents: [seo-site, analyste, manager]
gravite: basse
source: contrôle qualité
remplace: aucune
---
# Date de modification calculée en écartant les commits de lot

## Ce qui s'est passé
06/11, PR 1a de l'audit GEO : le `lastmod` de /logiciel-sur-mesure a été calculé au 27/10 parce que la méthode écartait les commits de plus de 12 fichiers HTML ; or le commit de masse du 30/10 avait ajouté 3 liens et changé une réponse de FAQ dans le corps de la page.

## Règle désormais
`lastmod` et `dateModified` = date de la dernière modification **significative** du contenu de la page (texte ou liens dans `<main>`, JSON-LD propre à la page), quel que soit le nombre de fichiers du commit (Google : « last significant update »). On écarte seulement les commits qui ne changent que le menu, le pied de page, le CSS, des scripts communs ou un composant commun (ex. bouton de rendez-vous du 28/10), et les retouches de forme (chiffres en lettres → chiffres).

## Vérification (contrôle qualité)
Pour chaque page, comparer `<main>…</main>` + JSON-LD d'un commit à l'autre (`git log -- <page>`) et prendre la dernière date où le contenu change réellement ; justifier chaque exclusion.
