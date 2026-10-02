# SL Agence — « Et si votre boîte mail travaillait pour vous ? » · V2

39 s · 9:16 (1080 × 1920) · 30 i/s avec flou de mouvement réel · **sans voix off, sans musique**, bruitages seuls.

| Fichier | Contenu |
|---|---|
| `sl-agence-boite-mail-9x16.mp4` | Film final (H.264 + AAC, −16 LUFS, crête −1 dBFS) |
| `bruitages.wav` | Piste de bruitages seule, pour poser votre voix off par-dessus |
| `miniature-tri.jpg`, `miniature-cta.jpg` | Miniatures à 11,9 s et 37 s |
| `sources/` | Animation (`pub.html`), rendu (`render.js`), bruitages (`sfx.py`), minutage commun (`timeline.json`) |

## Déroulé

> La vidéo s'ouvre sur la couverture Instagram (1 s + fondu de 0,25 s). Ajoutez 1 s à tous les temps ci-dessous.

| Temps | Plan | Animation | Bruitages |
|---|---|---|---|
| 0,0 – 1,5 | Ouverture | Une carte de mail nette au centre, puis deux autres en profondeur | 3 notifications cristallines |
| 1,5 – 3,6 | **« 60 mails. Chaque matin. »** | Explosion : 60 cartes jaillissent en 3D, avec profondeur de champ et rotation ; compteur rouleau 00 → 60 | Impact grave, souffle, 57 froissements, tics du compteur |
| 3,9 – 8,0 | **« Trier. Chercher. Répondre. Recommencer. »** | Mots-chocs plein écran (révélation masquée, secousse caméra) ; photo des mains sur le téléphone en fond ; « Recommencer. » démultiplié en écho | Frappes sourdes, glitchs, montée de tension |
| 8,0 – 10,0 | Arrêt sur image · **« Et si tout se triait automatiquement ? »** | Tout se fige, rotation de caméra autour du nuage gelé, la carte de Claire Meyer reste éclairée au milieu | Coupure nette, cristal, aspiration inversée |
| 10,0 – 12,6 | **Le drop** | Onde de choc lumineuse : chaque carte se retourne (claire → sombre), puis vole se ranger en 5 piles : Urgences 3 · Devis 9 · Clients 14 · Factures 8 · Newsletters 26 | Impact, retournements de cartes, 5 « clacs » magnétiques |
| 12,6 – 17,0 | **« Vos priorités, directement sous vos yeux. »** | Whip pan vers l'interface en 3D ; les 3 priorités se soulèvent ; compteurs rouleau ; un nouveau mail arrive comme une comète, est scanné, étiqueté « Demande de devis » et rangé (9 → 10) | Whoosh, pops, tics, balayage, tampon, clic |
| 17,0 – 22,6 | **« Des réponses personnalisées. » → « Avec vous aux commandes. »** | Zoom traversant dans la carte de Claire Meyer ; le brouillon s'écrit, avec les éléments personnalisés surlignés ; l'interrupteur passe sur « Relire et valider », puis clic sur « Envoyer » et départ du mail en traînée lumineuse | Montée, frappe clavier, clics, carillon de validation, envoi |
| 22,6 – 25,4 | **« Moins de temps dans vos mails. »** | Boîte apaisée et 3 tuiles cochées : Priorités identifiées · Réponses préparées · Messages classés | Arrivée, retournements, carillons |
| 25,4 – 28,4 | **« Plus de temps pour votre entreprise. »** | Photo de l'artisane sur chantier (révélation, reflet) | Souffles, scintillement |
| 28,4 – 38,0 | **Logo · « Votre boîte mail peut faire bien plus. » · Commentez MAIL** | Implosion en point de lumière, flash, logo officiel avec reflet, rayons doux, poussière ; CTA avec ressort et lettres MAIL en rouleau ; image stable jusqu'à la fin | Impact, signature en cloche, tics, pop |

## Garde-fous

- Toutes les données sont fictives : noms, adresse `exemple.fr`, et l'étiquette « Données de démonstration » sur le brouillon.
- Aucune statistique de gain, aucun logiciel nommé, aucune promesse absolue.
- La validation humaine est montrée explicitement.
- Le logo, les couleurs, la police Geist et les photos (déjà traitées en bichromie khaki) viennent du site slagence.fr. Aucun fichier Figma n'a été consulté.

## Ajouter votre voix off

Importez `sl-agence-boite-mail-9x16.mp4` dans votre logiciel de montage et placez la voix sur une piste au-dessus. Baissez les bruitages d'environ −6 dB pendant les phrases. Si vous voulez la piste de bruitages seule, prenez `bruitages.wav`.

## Refaire le rendu

```bash
npm i playwright && pip install numpy scipy
node render.js stills 12,24.5,37                    # images de contrôle
node render.js video video_mute.mp4                 # 2 280 images à 60 i/s → 30 i/s avec flou de mouvement
python3 sfx.py                                      # bruitages calés sur timeline.json
ffmpeg -i video_mute.mp4 -i sfx.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest final.mp4
```
