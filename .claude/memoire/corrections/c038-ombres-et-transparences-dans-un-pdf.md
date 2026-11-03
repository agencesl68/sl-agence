---
id: c038
date: 2026-11-03
agents: [manager, contenu-linkedin]
gravite: moyenne
source: Loïc
remplace: aucune
---

# Ombres et transparences dans un PDF

## Ce qui s'est passé
Le 03/11, la plaquette PDF (HTML imprimé par Chrome) affichait des rectangles transparents autour des captures et des cartes. Chrome transforme chaque ombre portée (box-shadow), filtre ou mode de fusion en image grise rectangulaire, que certaines visionneuses (téléphone) affichent telle quelle. Loïc : « un cadre dégueulasse autour de toutes les images ».

## Règle désormais
Dans un PDF : aucune ombre portée, aucun filtre CSS, aucun mode de fusion, aucune opacité ni couleur rgba. Les couleurs sont pleines ; les photos sont teintées à l'avance (fichier image) ; les séparations se font par filets fins.

## Vérification (contrôle qualité)
`pdfimages -list` sur le PDF : uniquement les vraies images (logo, photos, captures), aucune image grise ou « smask » non prévue.
