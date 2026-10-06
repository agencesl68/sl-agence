# Département IA de SL Agence — mode d'emploi (Loïc)

## Démarrer

Ouvre une session Claude Code sur ce dépôt et tape une commande :

| Commande | Ce que tu obtiens |
|---|---|
| `/brief` | « Que dois-je faire aujourd'hui ? » — 4 à 6 priorités avec tout prêt (messages, post, action SEO) |
| `/prospects 10 BTP Colmar` | 10 prospects qualifiés et sourcés + un message prêt pour chacun (Google Doc dans Drive) |
| `/relances` | Qui relancer aujourd'hui, prospects oubliés, demandes du site non traitées, messages prêts |
| `/linkedin` · `/linkedin semaine` · `/linkedin commentaire <post>` | Post du jour, programme de la semaine, ou commentaires à valeur ajoutée |
| `/seo` | L'action SEO / site à plus fort impact maintenant (+ rédaction et intégration si c'est un contenu) |
| `/veille` · `/veille <concurrent>` | Rapport concurrentiel mensuel ou fiche d'un concurrent |
| `/bilan` | Bilan de la semaine vs objectifs et ajustements |

Tu peux aussi parler normalement : « Trouve-moi des cabinets comptables à Mulhouse », « Prépare un post
sur la facture électronique ». SL Manager délègue à l'agent qui convient.

## L'équipe

```
SL MANAGER  (.claude/CLAUDE.md — la session principale)
├── prospection       Lead Hunter + Prospection
├── crm-relances      Suivi commercial et relances (complète le CRM de Sacha)
├── seo-site          SEO + Site & CRO
├── contenu-linkedin  Content Factory + LinkedIn
└── veille            Veille concurrentielle
```

| Agent | Temps économisé | Argent généré | Impact commercial | Difficulté | Remarque |
|---|---|---|---|---|---|
| SL Manager | ★★★★ | ★★★ | ★★★★★ | ★★ | Fait gagner du temps de décision |
| prospection | ★★★★★ | ★★★★★ | ★★★★★ | ★★ | ~190 entreprises déjà listées à exploiter en premier |
| crm-relances | ★★★★ | ★★★★ | ★★★★ | ★★ | Le robot CRM de Sacha gère déjà les relances des deals du CRM |
| contenu-linkedin | ★★★★★ | ★★ | ★★★★ | ★ | Pas d'accès LinkedIn : rédige, tu publies |
| seo-site | ★★★ | ★★★★ | ★★★★ | ★★★ | Limité tant qu'Ahrefs et une mesure d'audience ne sont pas branchés |
| veille | ★★ | ★ | ★★ | ★ | Une fois par mois suffit |

## Les règles qui te protègent

- **Rien ne part sans toi** : aucun e-mail, message ou post n'est envoyé ; tout est préparé en brouillon.
- **Aucune dépense sans toi** : les exports Vibe Prospecting (crédits) demandent ta confirmation.
- **Le travail de Sacha est intouchable** : toutes les écritures dans Make sont bloquées techniquement
  (`.claude/settings.json`), ainsi que l'outil d'envoi d'e-mail du CRM.
- **Le site** : modifications uniquement par pull request que tu valides.
- **Ce dépôt est public** : aucune donnée de prospect, aucun tarif, aucun nom de client n'y est écrit.
  Les prospects vivent dans Google Drive (dossier « SL agence ») et dans le CRM.

## Où sont les choses

| Dossier | Contenu |
|---|---|
| `memoire/` | **Source de vérité** : agence, cible, ton, concurrents, objectifs, outils, journal |
| `agents/` | Instructions de chaque agent |
| `skills/` | Les commandes `/…` |
| `travail/` | Fichiers de travail : `seo/`, `contenu/`, `veille/`, `rapports/`, `transmissions/` |

## À faire de ton côté (10 minutes, pour que tout marche à 100 %)

1. Relire et valider les points **[À VALIDER]** de `memoire/agence.md` (positionnement, tarifs) et les
   objectifs proposés dans `memoire/objectifs.md`.
2. Terminer la connexion d'**Ahrefs** et de **Gmail** dans claude.ai → Paramètres → Connecteurs.
3. Avec Sacha : passer le robot du CRM en mode **brouillon** (sinon il envoie les relances seul).
4. Optionnel : `/brief` automatique chaque matin — demande-le et une tâche planifiée sera créée.
