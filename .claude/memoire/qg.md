# Le QG — tableau de bord de Loïc

- **URL** : https://claude.ai/artifact/MUaYVX2zxFinm8ryG4eqyY (privé : visible par Loïc uniquement)
- **Source de la page** : `.claude/qg/qg.html` — republier avec l'outil Artifact en passant cette URL
  comme `url` (lire l'artifact d'abord depuis une autre session).
- **Données** : base de l'artifact, lue/écrite avec l'outil `ArtifactData` (même `url`).

## Collections

| Collection | Contenu | Qui écrit |
|---|---|---|
| `directives` | `{texte, statut: nouvelle → prise en compte → traitée, date (ISO), reponse?}` | Loïc (depuis la page) ; le Manager met à jour `statut` et `reponse` |
| `missions` | `{titre, resume, agents: [ids], statut: en cours / terminée, date}` | Le Manager, à chaque directive traitée |
| `livrables` | `{agent, type, titre, resume, statut: à valider / prêt / envoyé / publié, lien?, lienLibelle?, texte?, date}` | Le Manager, après contrôle de chaque livrable |
| `activite` | `{agent, texte, date}` — une ligne au démarrage et à la fin de chaque tâche (ids `a-AAAAMMJJ-HHMM`) | Le Manager |
| `agents` | doc par agent (`prospection`, `suivi`, `contenu-linkedin`, `seo-site`, `veille`, `analyste`, `controle-qualite`) : `{statut: disponible / au travail, tache, depuis (ISO), derniere}` + doc `manager` | Le Manager |

## Règles

- Ids lisibles : `post-AAAA-MM-JJ`, `gmail-<entreprise>`, `lot-AAAA-MM-JJ`, `m-AAAA-MM-JJ-<sujet>`.
- `texte` = contenu prêt à copier (posts, articles courts) ; jamais d'e-mail ni de téléphone de prospect.
- Liens uniquement en `https://` (Google Docs, Gmail, GitHub).
- Toujours passer `if_version` pour modifier un document existant.
- Au début de chaque `/brief` : lire `directives` (statut `nouvelle`), les traiter, puis les passer à `traitée` avec une `reponse` d'une ligne.
