---
id: c017
date: 2026-10-19
agents: [seo-site]
gravite: basse
source: Contrôle qualité
remplace: aucune
---

# Liens de pied de page en double

## Ce qui s'est passé
Les liens « Logiciel transport » et « Logiciel artisan » ont été ajoutés deux fois dans le pied des deux nouvelles pages, créées à partir d'un modèle déjà mis à jour.

## Règle désormais
Après tout ajout de liens dans un pied de page sur plusieurs fichiers, compter par Grep que chaque href apparaît une seule fois dans le pied de chaque page, pages nouvellement créées comprises.

## Vérification (contrôle qualité)
Un `grep -c` par href et par page renvoie 1.
