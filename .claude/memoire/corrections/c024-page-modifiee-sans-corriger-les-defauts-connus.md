---
id: c024
date: 2026-10-26
agents: [seo-site, contenu-linkedin]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Page modifiée sans corriger les défauts déjà connus

## Ce qui s'est passé
Le 26/10, seo-site a ajouté un encart dans `blog/feuille-heures-salaries.html`, 12 lignes au-dessus de la phrase même citée dans c019 (« plus de feuilles perdues, plus de relances le vendredi »), sans la corriger. Des quantités en lettres (c014) et une faute (« s.adapter ») sont aussi restées dans les pages modifiées.

## Règle désormais
Quand on modifie une page, on la relit en entier avec les corrections de l'agent et de « tous » (c014, c019, c022 au minimum) et on corrige dans la même PR toute violation trouvée, même antérieure. On le signale dans le livrable (« corrigé au passage : … »). Exception : title/meta sous expérience de mesure en cours (voir `travail/seo/experiences.md`).

## Vérification (contrôle qualité)
Pour chaque fichier HTML du commit : grep des nombres en lettres (deux|trois|…|douze|quinze|trente) et des phrases bannies citées dans les corrections ; résultat attendu : 0 (hors expressions figées).
