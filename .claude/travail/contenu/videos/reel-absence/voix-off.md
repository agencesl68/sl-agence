# Voix off : reel « Votre entreprise s'arrête quand un salarié est absent ? » (30 s)

Objectif : visibilité (pédagogie légère). Pilier 2 : le coût caché. Voix de Loïc, débit calme (environ 2,3 mots par seconde).
La voix complète l'écran (ce que vit le dirigeant), elle ne relit pas les textes affichés. Sans le son, l'écran se comprend seul.

## Tableau par segment

| N° | Minutage | Texte à dire | Mots | Indication de jeu |
|---|---|---|---|---|
| 1 | 0:00 à 0:04 (voix à 0:00,4) | Thomas est absent. Et là, tout se complique. | 8 | Ton posé, presque une confidence. Petite pause après « absent ». |
| 2 | 0:04 à 0:09 (voix à 0:04,2) | Un client demande où il en est. Vous cherchez partout. Rien. | 11 | Montez légèrement sur « partout ». « Rien. » sec, sur un souffle, avec 0,3 s de silence avant. |
| 3 | 0:09 à 0:13 (voix à 0:09,2) | Pas la faute de Thomas. L'information est éparpillée. | 8 | Voix douce sur « Thomas », bienveillante. Légère pause après « Thomas ». |
| 4 | 0:13 à 0:17 (voix à 0:13,2) | Imaginez tout rangé au même endroit. | 6 | Voix qui s'ouvre, plus lumineuse. Doit finir avant 0:15,5 : démarrez pile à 0:13 et ne traînez pas. Silence ensuite pour laisser passer le son de fusion à 0:15,7. |
| 5 | 0:17 à 0:24 (voix à 0:17,3) | Vous tapez le nom du client. Le dossier s'ouvre, même si Thomas est absent aujourd'hui. | 15 | Rythme fluide, sourire dans la voix. Pause courte après « client ». Insistez sur « s'ouvre ». |
| 6 | 0:24 à 0:27 (voix à 0:24,2) | Le travail continue. Même sans lui. | 6 | Lent, posé. Pause nette entre les deux phrases. Voix qui descend sur « lui ». |
| 7 | 0:27 à 0:30 (voix à 0:27,1) | Rendez-vous sur S L agence point F R. | 4 | Chaleureux, ouvert. Prononcez chaque lettre : « S, L, agence, point, F, R », sans vous presser, c'est la dernière chose entendue. |

Total : 8 + 11 + 8 + 6 + 15 + 6 + 4 = 58 mots (ajusté par le Manager : le segment 7 ne dispose que de 2,7 s). Aucun chiffre, aucun mot de jargon (pas de CRM, process, centraliser, IA, solution).
Au segment 7, « S L agence point F R » compte pour 1 mot (slagence.fr) mais dure environ 2 secondes à l'oral : la phrase est volontairement courte pour finir avant 0:30. « Des outils qui s'adaptent à votre entreprise » reste à l'écran.

## Texte complet, d'une traite

Thomas est absent. Et là, tout se complique. Un client demande où il en est. Vous cherchez partout. Rien. Pas la faute de Thomas. L'information est éparpillée. Imaginez tout rangé au même endroit. Vous tapez le nom du client. Le dossier s'ouvre, même si Thomas est absent aujourd'hui. Le travail continue. Même sans lui. Rendez-vous sur S L agence point F R.

## Variantes plus directes

Variante S1 (8 mots) : Thomas est absent. Plus personne ne trouve rien.
(Plus direct, mais « personne » est déjà à l'écran. Gardez la version du tableau si vous voulez éviter la répétition.)

Variante S5 (12 mots) : Le nom du client. Le dossier s'ouvre. Vous répondez tout de suite.
(Plus court, plus sec : laisse l'écran montrer « Thomas, absent aujourd'hui » et la réponse prête.)

## Après l'enregistrement

Déposer les fichiers dans `voix-off/` puis lancer `python3 audio/mixer-voix.py` : chaque segment est placé à sa seconde (repères dans `src/timeline.json` → `voix`), la musique baisse sous la voix, la vidéo finale est `out/reel-sl-agence-absence-voix.mp4`. Le script signale tout segment trop long.

## Consignes d'enregistrement

1. Téléphone à environ 20 cm de la bouche, micro dirigé vers vous, dans une pièce calme sans écho (rideaux, canapé, ou penderie pleine de vêtements).
2. Soit un fichier par segment nommé 1.m4a à 7.m4a, soit une seule prise en regardant la vidéo (le calage sera plus naturel).
3. Laissez 1 seconde de silence avant et après chaque prise, sans bouger ni toucher l'écran pendant que vous parlez.
4. Parlez calmement, comme à un dirigeant en face de vous, sourire léger. Refaites la prise si vous dépassez la durée du segment.
5. Le segment 4 doit se terminer avant 0:15,5, et le 7 se termine clairement par « S L agence point F R ».

## Auto-évaluation (grille du manuel § 11, adaptée à une voix off)

Note : 9/10.
- Objectif et pilier clairs (1), accroche avec un prénom et une scène vécue (1), une seule idée : l'information éparpillée (1).
- Aucun fait inventé, aucun chiffre ni client réel (1) ; concret : client, dossier, recherche (1).
- Voix humaine, mots de tous les jours, ne culpabilise pas Thomas (1) ; lisible à l'oral, phrases très courtes (1).
- Valeur pour le dirigeant : il reconnaît sa situation (1) ; fin avec nom du site prononcé (1).
- Conformité : budgets de mots respectés (S1 8, S2 11, S3 8, S4 6, S5 15, S6 6, S7 6), c038 et c043 respectées (0,5 de moins : S7 risque de déborder de 0:30, cf. note ci-dessus).
