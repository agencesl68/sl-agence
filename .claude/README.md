# Département IA de SL Agence — mode d'emploi (Loïc)

## Ton QG

**https://claude.ai/artifact/MUaYVX2zxFinm8ryG4eqyY** — l'organigramme (SL Manager et ses 5 agents),
les missions, tous les livrables prêts à copier ou ouvrir, et une case pour donner une directive au Manager.

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

Tu parles **au Manager** : il répartit le travail entre les agents et te rend du travail fini
(pas d'audit, sauf si tu en demandes un). Tu peux aussi parler normalement : « Trouve-moi des cabinets comptables à Mulhouse », « Prépare un post
sur la facture électronique ». SL Manager délègue à l'agent qui convient.

## L'équipe

```
SL MANAGER  (.claude/CLAUDE.md — la session principale)
├── prospection       Lead Hunter + Prospection
├── suivi             CRM / follow-up de Loïc (Gmail + Drive, séparé du CRM de Sacha)
├── seo-site          SEO + Site & CRO
├── contenu-linkedin  Content Factory + LinkedIn
└── veille            Veille concurrentielle
```

| Agent | Temps économisé | Argent généré | Impact commercial | Difficulté | Remarque |
|---|---|---|---|---|---|
| SL Manager | ★★★★ | ★★★ | ★★★★★ | ★★ | Fait gagner du temps de décision |
| prospection | ★★★★★ | ★★★★★ | ★★★★★ | ★★ | ~190 entreprises déjà listées à exploiter en premier |
| suivi | ★★★★ | ★★★★ | ★★★★ | ★★ | Statuts par libellés Gmail, relances en brouillons dans le bon fil |
| contenu-linkedin | ★★★★★ | ★★ | ★★★★ | ★ | Pas d'accès LinkedIn : rédige, tu publies |
| seo-site | ★★★ | ★★★★ | ★★★★ | ★★★ | Outils gratuits (Search Console, Google Business Profile) |
| veille | ★★ | ★ | ★★ | ★ | Une fois par mois suffit |

## Les règles qui te protègent

- **Rien ne part sans toi** : aucun e-mail, message ou post n'est envoyé ; tout est préparé en brouillon
  (brouillons Gmail, Google Docs). L'envoi depuis Gmail est bloqué techniquement.
- **Séparé du CRM de Sacha** : ton suivi vit dans Gmail (libellés `SL Prospection/…`) et Drive.
- **Aucune dépense sans toi** : les exports Vibe Prospecting (crédits) demandent ta confirmation.
- **Le travail de Sacha est intouchable** : toutes les écritures dans Make sont bloquées techniquement
  (`.claude/settings.json`), ainsi que l'outil d'envoi d'e-mail du CRM.
- **Le site** : modifications uniquement par pull request que tu valides.
- **Ce dépôt est public** : aucune donnée de prospect, aucun tarif, aucun nom de client n'y est écrit.
  Les prospects vivent dans Google Drive (dossier « SL agence ») et dans Gmail.

## Les manuels des agents (`savoirs/`)

| Manuel | Pour | Contenu clé |
|---|---|---|
| `seo.md` | SEO & Site | Règles 2026, fiche Google prête à coller, checklists page/article, plan 90 jours |
| `emailing.md` | Prospection, Suivi | Règles chiffrées du cold email, 6 modèles par secteur, relances, CNIL, délivrabilité |
| `prospection.md` | Prospection | Sources gratuites testées (API entreprises, BODACC, France Travail), signaux, scripts d'appel |
| `linkedin-contenu.md` | Contenu & LinkedIn | Algorithme 2026, 25 accroches, 8 structures, profil de Loïc rédigé, commentaires |
| `marche-2026.md` | Tous | Chiffres du marché, aides, calendrier réglementaire, 21 concurrents, 10 arguments |
| `veille.md` | Veille | Sources gratuites et routine mensuelle |

Chaque livrable est noté sur 10 avec la grille du manuel : sous 8, l'agent le réécrit.
Tes résultats réels (`memoire/apprentissages.md`) priment sur les manuels.

## Où sont les choses

| Dossier | Contenu |
|---|---|
| `memoire/` | **Source de vérité** : agence, cible, ton, concurrents, objectifs, outils, journal |
| `agents/` | Instructions de chaque agent |
| `skills/` | Les commandes `/…` |
| `travail/` | Fichiers de travail : `seo/`, `contenu/`, `veille/`, `rapports/`, `transmissions/` |

## Ta routine

1. Le matin : `/brief` (5 min de lecture).
2. Ouvre Gmail → Brouillons : relis, ajuste si besoin, envoie (20 min).
3. Publie le post LinkedIn préparé et les commentaires proposés (15 min).
4. Le vendredi : `/bilan`.
