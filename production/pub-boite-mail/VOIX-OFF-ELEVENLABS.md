# Voix off ElevenLabs, calée sur la vidéo V2 (39 s, couverture de 1 s au début incluse)

## Méthode recommandée : une phrase = une génération

C'est la seule méthode vraiment fiable pour le timing. Générez chaque ligne séparément dans ElevenLabs, puis posez chaque fichier à son **temps de départ** dans votre montage (CapCut, Premiere…). Chaque ligne tient dans sa fenêtre, même avec une voix un peu lente.

| # | Départ | Doit finir avant | Texte à coller | Ce qu'on voit |
|---|---|---|---|---|
| 1 | 0:02.7 | 0:04.8 | Soixante mails. Chaque matin. | Explosion des cartes, compteur 60 |
| 2 | 0:05.0 | 0:05.8 | Trier. | Mot-choc « Trier. » |
| 3 | 0:06.0 | 0:06.8 | Chercher. | « Chercher. » |
| 4 | 0:07.0 | 0:07.8 | Répondre. | « Répondre. » |
| 5 | 0:08.0 | 0:08.9 | Recommencer. | « Recommencer. » en écho |
| 6 | 0:09.3 | 0:11.0 | Et si tout se triait tout seul ? | Arrêt sur image |
| 7 | 0:11.9 | 0:13.5 | Chaque message, à sa place. | Les cartes se rangent en piles |
| 8 | 0:14.1 | 0:16.9 | Vos priorités, directement sous vos yeux. | Interface, priorités qui se soulèvent |
| 9 | 0:18.7 | 0:21.3 | Des réponses personnalisées. | Le brouillon s'écrit |
| 10 | 0:21.7 | 0:23.2 | Et c'est vous qui validez. | Clic sur « Relire et valider » (22,2 s) |
| 11 | 0:24.2 | 0:26.3 | Moins de temps dans vos mails. | Boîte apaisée, tuiles cochées |
| 12 | 0:26.7 | 0:29.3 | Plus de temps pour votre entreprise. | Photo de l'artisane |
| 13 | 0:30.6 | 0:31.8 | SL Agence. | Flash, apparition du logo |
| 14 | 0:32.9 | 0:37.5 | Commentez « mail » : on vous montre comment le mettre en place. | Bouton « Commentez MAIL » |

Astuce : en début de chaque fichier, ElevenLabs laisse environ 0,1 à 0,2 s de silence. Calez le **début du son** (la première onde) sur le temps de départ, pas le début du fichier.

## Méthode rapide : un seul collage

Choisissez le modèle **Eleven Multilingual v2**. Les balises `<break>` ne fonctionnent pas avec Eleven v3. Réglez la vitesse sur 1.0, la stabilité autour de 50 % et la similarité autour de 75 %. Collez ce texte, puis placez le début du fichier à **0:02.5** :

```
Soixante mails. Chaque matin. <break time="0.3s" />
Trier. <break time="0.5s" />
Chercher. <break time="0.4s" />
Répondre. <break time="0.4s" />
Recommencer. <break time="0.5s" />
Et si tout se triait tout seul ? <break time="0.9s" />
Chaque message, à sa place. <break time="0.5s" />
Vos priorités, directement sous vos yeux. <break time="1.8s" />
Des réponses personnalisées. <break time="1.2s" />
Et c'est vous qui validez. <break time="1.1s" />
Moins de temps dans vos mails. <break time="0.6s" />
Plus de temps pour votre entreprise. <break time="1.6s" />
SL Agence. <break time="1.3s" />
Commentez « mail » : on vous montre comment le mettre en place.
```

Selon la voix choisie, le débit varie, donc ce collage dérive de quelques dixièmes de seconde. Pour le recaler, coupez le fichier aux silences dans votre montage (chaque pause fait une coupe propre) et glissez chaque morceau à son temps de départ indiqué dans le tableau.

## Si la prononciation accroche

- « SL Agence » lu « sl » au lieu de « èss-èl » : écrivez **« S L Agence »** ou **« Esse-Elle Agence »**.
- « mail » épelé lettre par lettre : gardez-le en minuscules et entre guillemets, comme ci-dessus.
- « Soixante » : écrivez-le toujours en toutes lettres, jamais « 60 ».

## Mixage

Baissez les bruitages de la vidéo d'environ **−6 dB** pendant chaque phrase, et gardez la voix autour de −14 LUFS. La première seconde est la couverture : laissez-la sans voix. Les gros impacts (2,5 s, 11 s, 30,3 s) tombent volontairement dans des trous de la voix.
