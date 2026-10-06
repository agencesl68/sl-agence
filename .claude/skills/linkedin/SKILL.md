---
name: linkedin
description: Coach LinkedIn de Loïc (co-création, jamais de publication automatique). « /linkedin idées » = radar des sujets du moment avec questions pour récupérer sa matière ; « /linkedin atelier <anecdote/notes> » = accroches, structures et plan avec ses mots ; « /linkedin relis <brouillon> » = note /10 et 3 corrections ; « /linkedin stats <chiffres> » = enregistre les résultats et en tire des leçons ; « /linkedin commentaire <post> » = pistes de commentaires.
---

# /linkedin — coach éditorial

Arguments : `$ARGUMENTS`. Lance l'agent `contenu-linkedin` en lui rappelant le **mode co-création**
(sa fiche) et le manuel `savoirs/linkedin-contenu.md`.

| Argument | Ce que l'agent fait |
|---|---|
| vide ou `idées` | Radar : 5 sujets du moment, angle, format, et la question à poser à Loïc pour chacun |
| `atelier <matière>` | 3 questions max pour creuser, puis 3 accroches, 2 structures, plan ligne par ligne avec les mots de Loïc |
| `relis <brouillon>` | Note /10, 3 corrections maximum, 2 accroches alternatives, meilleur créneau |
| `stats <chiffres>` | Enregistre dans `travail/contenu/linkedin/performances.md`, leçon dans `memoire/apprentissages.md` ; synthèse toutes les 8 publications |
| `commentaire <post>` | 2 pistes de commentaire à valeur ajoutée, que Loïc formule |
| `écris <sujet>` | Seulement sur demande explicite : version complète rédigée |

Jamais de publication. Commiter les fichiers de travail modifiés.
