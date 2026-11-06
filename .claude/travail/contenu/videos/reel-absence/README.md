# Reel Instagram — « Votre entreprise s'arrête quand un salarié est absent ? »

Vidéo motion design 30 s, 1080 × 1920 (9:16), 30 i/s, H.264 + AAC, sans filigrane.
Fichier final : `out/reel-sl-agence-absence.mp4`.

Même univers que la première pub (`pub-sl-agence.mp4` à la racine du site) : fond noir, fenêtres claires
pour le désordre, application sombre et verte pour la solution, police Geist du site, vrai logo SL Agence
(vectorisé depuis `logo.png`).

## Déroulé

| Temps | Scène | Fichier |
|---|---|---|
| 0:00–0:04 | Accroche : Thomas passe « Absent aujourd'hui », notification, « Et personne ne retrouve les dossiers. » | `src/scenes/S1Hook.tsx` |
| 0:04–0:09 | Le client attend : « Où en est mon dossier ? », recherche sans résultat, logiciels qui s'empilent, liens rompus | `src/scenes/S2Recherche.tsx` |
| 0:09–0:13 | Dépendance : tout gravite autour de Thomas, il disparaît, les liens se coupent | `src/scenes/S3Dependance.tsx` |
| 0:13–0:17 | Bascule : impulsion verte, les lignes se redressent, tout fusionne en une application | `src/scenes/S3Dependance.tsx` |
| 0:17–0:24 | Solution : même recherche, résultat immédiat, fiche client, réponse prête | `src/scenes/S5Solution.tsx` (+ `App.tsx`) |
| 0:24–0:27 | Bénéfice : « Votre entreprise avance. Même quand quelqu'un est absent. » | `src/scenes/S6Benefice.tsx` |
| 0:27–0:30 | Signature : logo, « Des outils qui s'adaptent à votre entreprise. », slagence.fr | `src/scenes/S7Fin.tsx` |

## Modifier

- **Textes** : `src/textes.ts` (tout est au même endroit).
- **Couleurs / police** : `src/theme.ts`.
- **Timing des scènes et des sons** : `src/timeline.json` (en images, 30 = 1 s). Le son relit ce fichier.
- **Bande-son** : `audio/generer-audio.py` — musique et bruitages 100 % synthétisés (aucun droit tiers).

## Refaire le rendu (sur un Mac ou un PC avec Node 18+)

```bash
npm install
ELEVENLABS_API_KEY=ta_cle node voix/generer-voix.mjs   # voix off + vidéo finale avec voix
npm run export                                          # vidéo seule (sans voix si src/voix.json est vide)
npm run studio                                          # aperçu interactif dans le navigateur
```

- Voix off : textes dans `voix/textes-voix.json`, ID de la voix ElevenLabs dans `voix/voice-id.txt`, départs dans `src/timeline.json` → `voix`. La musique baisse automatiquement sous la voix (`MUSIQUE_SOUS_VOIX` dans `src/Reel.tsx`).
- Musique : `public/audio/bande-son.wav`, régénérable avec `npm run musique` (Python + numpy).
- Dans une session cloud, préfixer par `REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
- Planche de contrôle : `outils/planche.sh <video> <sortie.png> <image1> <image2> …` (ffmpeg requis).

## À savoir

- L'application montrée est une **démonstration conceptuelle** ; Thomas, Clément, Bauer, Roth… sont des personnages fictifs.
- Aucun chiffre ni statistique dans la vidéo.
- Zone sûre Instagram respectée : textes importants entre 250 et 1 500 px de hauteur, rien de clé dans la colonne droite des boutons Instagram (au-delà de 960 px, sous 1 000 px de hauteur).
