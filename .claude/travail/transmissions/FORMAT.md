# Format des transmissions entre agents

Un fichier par transmission : `AAAA-MM-JJ-<de>-vers-<a>-<sujet>.md`
(ex. `2026-10-07-seo-vers-contenu-facture-electronique-btp.md`).
Jamais de données personnelles (nom de prospect, e-mail, client).

```
---
de: seo-site | contenu-linkedin | prospection | suivi | veille | manager
vers: seo-site | contenu-linkedin | prospection | suivi | veille | manager
date: AAAA-MM-JJ
statut: à faire | en cours | à vérifier | terminé
priorité: P1 | P2 | P3
---

## Demande
<ce qu'on attend, en une phrase>

## Contexte
- Sujet :
- Mot-clé (si SEO) :
- Intention de recherche :
- Angle :
- Page cible / emplacement :
- Objectif : visibilité | autorité | acquisition | conversion | preuve sociale | pédagogie
- Sources :

## Livrable attendu
<format, longueur, fichier où le déposer>

## Retour
<rempli par l'agent destinataire : fichier produit, remarques, statut>
```

Le Manager passe en revue les transmissions `à faire` et `à vérifier` à chaque `/brief` et `/seo`.
Quand une transmission est `terminé`, la déplacer dans `transmissions/archives/`.
