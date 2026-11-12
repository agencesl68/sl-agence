---
id: c046
agents: [seo-site, contenu-linkedin, manager]
gravite: moyenne
source: contrôle qualité
remplace: aucune (étend c033)
---
# Nouvel article sur la requête d'une page en test

## Ce qui s'est passé
12/11 : un nouvel article (/blog/agent-ia-entreprise-definition) a reçu un title qui commençait par « Agent IA… » et contenait « PME », pendant le test de title de /agent-ia-pme (jusqu'au 16/11).

## Règle désormais
c033 s'applique aussi aux pages et articles nouveaux et aux contenus de partenaires. Avant toute mise en ligne, comparer les 3 premiers mots du title, du H1 et de la meta, et les mots de la requête mesurée, aux pages en test (experiences.md). Si 2 mots sur 3 sont communs ou si tous les mots de la requête mesurée sont présents : changer d'intention (« Qu'est-ce que… », « Choisir… », « Comment… ») ou publier après le verdict. Un lien ajouté vers une page en test est noté comme variable parasite dans experiences.md.

## Vérification (contrôle qualité)
Relire la ligne d'experiences.md de la nouvelle page contre toutes les mesures en cours.
