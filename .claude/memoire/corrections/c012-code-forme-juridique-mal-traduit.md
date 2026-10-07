---
id: c012
date: 2026-10-07
agents: [prospection]
gravite: moyenne
source: controle-qualite
remplace: aucune
---

# Code de forme juridique mal traduit

## Ce qui s'est passé
Le code Insee `nature_juridique` 5499 a été traduit « société civile / autre » alors qu'il signifie « SARL ».

## Règle désormais
Traduire le code avec la table officielle de l'Insee, sans deviner. Repères : 5499 = SARL, 5498 = EURL, 5710 = SAS,
5720 = SASU, 1000 = entrepreneur individuel, 6540 = SCI. En cas de doute, écrire le code et « à vérifier ».

## Vérification (contrôle qualité)
Comparer la forme juridique du livrable au code renvoyé par l'API sur l'échantillon contrôlé.
