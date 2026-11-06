# Voix off : reel « Votre entreprise s'arrête quand un salarié est absent ? » (30 s)

Objectif : visibilité (pédagogie légère). Pilier 2 : le coût caché. Voix de Loïc, débit naturel (environ 2,3 mots par seconde).
La voix complète l'écran (ce que vit le dirigeant), elle ne relit pas les textes affichés. Sans le son, l'écran se comprend seul.

## Tableau par segment

| N° | Minutage | Texte à dire | Mots | Indication de jeu |
|---|---|---|---|---|
| 1 | 0:00 à 0:04 (voix à 0:00,4) | Thomas est absent. Et là, tout se complique. | 8 | Ton posé, presque une confidence. Petite pause après « absent ». Juste dans le temps : pas de marge. |
| 2 | 0:04 à 0:09 (voix à 0:04,2) | Un client attend une réponse. Vous cherchez partout. Rien. | 9 | Montez légèrement sur « partout ». « Rien. » sec, sur un souffle, avec 0,3 s de silence avant. |
| 3 | 0:09 à 0:13 (voix à 0:09,2) | Le problème n'est pas Thomas. C'est l'information éparpillée. | 8 | Voix douce sur « Thomas », bienveillante. Enchaînez sans pause ajoutée. |
| 4 | 0:13 à 0:17 (voix à 0:13,2) | Maintenant, imaginez l'inverse. | 3 | Voix qui s'ouvre, plus lumineuse. Doit finir avant 0:15,5 : démarrez pile à 0:13,2 et ne traînez pas. Silence ensuite pour laisser passer le son de fusion à 0:15,7. |
| 5 | 0:17 à 0:24 (voix à 0:17,3) | Vous tapez le nom du client. Le dossier s'ouvre, même si Thomas est absent aujourd'hui. | 15 | Rythme fluide, sourire dans la voix. Pause courte après « client ». Insistez sur « s'ouvre ». Juste dans le temps : pas de marge. |
| 6 | 0:24 à 0:27 (voix à 0:24,2) | Le travail continue, tout simplement. | 5 | Posé, voix qui descend sur « simplement ». |
| 7 | 0:27 à 0:30 (voix à 0:27,1) | S L agence point F R. | 1 | Chaleureux, ouvert. Prononcez chaque lettre : « S, L, agence, point, F, R », sans vous presser, c'est la dernière chose entendue. 2,7 s disponibles. |

Total : 8 + 9 + 8 + 3 + 15 + 5 + 1 = 49 mots écrits (S7 compte pour 1 mot : slagence.fr ; à l'oral « S L agence point F R » fait 6 mots, soit environ 54 mots dits). Aucun chiffre, aucun mot de jargon (pas de CRM, process, centraliser, IA, solution). « Des outils qui s'adaptent à votre entreprise » reste à l'écran.
Ce total est sous la fourchette 60 à 70 initiale : c'est voulu, les temps réels de chaque segment (heures de départ de la voix) ne permettent pas plus sans déborder.

## Texte complet, d'une traite

Thomas est absent. Et là, tout se complique. Un client attend une réponse. Vous cherchez partout. Rien. Le problème n'est pas Thomas. C'est l'information éparpillée. Maintenant, imaginez l'inverse. Vous tapez le nom du client. Le dossier s'ouvre, même si Thomas est absent aujourd'hui. Le travail continue, tout simplement. S L agence point F R.

## Variantes plus directes

Variante S1 (8 mots, même durée que la version du tableau) : Thomas est absent. Plus personne ne trouve rien.
(Plus direct, mais « personne » est déjà à l'écran. Gardez la version du tableau si vous voulez éviter la répétition.)

Variante S5 (12 mots, plus court que la version du tableau, donc tient dans le temps) : Le nom du client. Le dossier s'ouvre. Vous répondez tout de suite.
(Plus sec : laisse l'écran montrer « Thomas, absent aujourd'hui » et la réponse prête.)

## Génération de la voix (ElevenLabs) et vidéo finale

Les phrases sont dans `voix/textes-voix.json`, l'ID de la voix dans `voix/voice-id.txt`.
Dans le dossier du projet : `ELEVENLABS_API_KEY=ta_cle node voix/generer-voix.mjs` → génère les 7 phrases, les cale à leur seconde (`src/timeline.json` → `voix`), baisse la musique sous la voix et sort `out/reel-sl-agence-absence-voix.mp4`. Le script signale toute phrase trop longue.

## Consignes d'enregistrement

1. Téléphone à environ 20 cm de la bouche, micro dirigé vers vous, dans une pièce calme sans écho (rideaux, canapé, ou penderie pleine de vêtements).
2. Soit un fichier par segment nommé 1.m4a à 7.m4a, soit une seule prise en regardant la vidéo (le calage sera plus naturel).
3. Laissez 1 seconde de silence avant et après chaque prise, sans bouger ni toucher l'écran pendant que vous parlez.
4. Débit naturel, pas plus lent : les segments 1 et 5 sont justes, sans marge. Refaites la prise si vous dépassez la durée du segment.
5. Le segment 4 doit se terminer avant 0:15,5, et le 7 se termine clairement par « S L agence point F R ».

## Auto-évaluation (grille du manuel § 11, adaptée à une voix off)

Note : 9/10.
- Objectif et pilier clairs (1), accroche avec un prénom et une scène vécue (1), une seule idée : l'information éparpillée (1).
- Aucun fait inventé, aucun chiffre ni client réel (1) ; concret : client, dossier, recherche (1).
- Voix humaine, mots de tous les jours, aucun reproche à Thomas ni sous-entendu qu'on peut se passer de lui (1) ; lisible à l'oral, phrases courtes (1).
- Valeur pour le dirigeant : il reconnaît sa situation (1) ; fin avec nom du site prononcé (1).
- Conformité : segments plus courts que leurs créneaux (S4 fini avant 0:15,5, S7 dans 2,7 s), c038 et c043 respectées (0,5 de moins : total de mots sous la fourchette initiale de 60 à 70, imposé par les temps réels).
