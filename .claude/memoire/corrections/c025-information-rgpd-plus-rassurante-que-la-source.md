---
id: c025
date: 2026-10-26
agents: [veille, seo-site, contenu-linkedin]
gravite: moyenne
source: Contrôle qualité
remplace: aucune
---

# Texte d'information RGPD sur un outil tiers incomplet ou plus rassurant que la source

## Ce qui s'est passé
Paragraphe de politique de confidentialité pour GoatCounter : « votre navigateur n'est pas enregistré » alors que la source dit seulement « pas l'en-tête User-Agent complet » et que les statistiques de navigateur sont conservées ; données collectées (écran, pays, UTM) omises ; mécanisme d'opposition présenté comme « non vérifié » alors que le code public montre ce qu'il stocke. Rôle de l'outil d'auto-évaluation CNIL inversé (fournisseurs, pas éditeurs).

## Règle désormais
Tout texte d'information RGPD sur un outil tiers : (1) liste toutes les données collectées ; (2) chaque négation (« pas enregistré », « pas stocké ») reprend exactement la portée de la source, avec ses limites (« complet », « sur disque », « 8 heures ») ; (3) ce que stocke le mécanisme d'opposition est vérifié (documentation ou code) et écrit ; (4) destinataire, pays d'exploitation et durée de conservation figurent dans le texte.

## Vérification (contrôle qualité)
Confronter chaque donnée du tableau comparatif au paragraphe proposé ; ouvrir la source de chaque négation ; tout écart → À CORRIGER.
