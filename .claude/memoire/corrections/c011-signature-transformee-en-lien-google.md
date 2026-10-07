---
id: c011
date: 2026-10-07
agents: [prospection, suivi]
gravite: haute
source: controle-qualite
remplace: aucune
---

# Signature transformée en lien google.com/url

## Ce qui s'est passé
15 brouillons Gmail (06 et 07/10) affichaient « https://www.google.com/url?q=http://slagence.fr&… » au lieu de
« slagence.fr » dans la signature : texte recopié depuis un message lu dans Gmail, où Google réécrit les liens.

## Règle désormais
Taper la signature à la lettre, jamais la copier depuis un e-mail lu (signature exacte de `memoire/ton.md`).
Après chaque create_draft / update_draft, relire le brouillon (get_draft) : aucune occurrence de « google.com/url »,
« http » ou « www » dans le corps (hors citation du message d'origine).

## Vérification (contrôle qualité)
Rechercher « google.com/url » et « http » dans le corps de chaque brouillon livré. Une occurrence = À CORRIGER.

## Précision technique (2026-10-07, constat de `suivi`)
Même tapé à la lettre, « slagence.fr » passé dans le champ `body` de create_draft / update_draft est converti en lien
google.com/url. Contournement : utiliser **`htmlBody` seul**, avec `slagence<span>.</span>fr` (rendu visible « slagence.fr »,
sans lien). Toujours relire avec get_draft.
