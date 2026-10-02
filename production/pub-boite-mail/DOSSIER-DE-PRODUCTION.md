# SL Agence — « Et si votre boîte mail travaillait pour vous ? »

Publicité vidéo · 40 s · 9:16 (1080 × 1920) · Instagram Reels / TikTok / LinkedIn

Fichier livré : `sl-agence-boite-mail-9x16.mp4` (H.264, 30 i/s, AAC 48 kHz, −14 LUFS).

---

## 0. Ce qui a été réellement utilisé, et ce qui ne l'a pas été

| Ressource | Statut |
|---|---|
| **Figma** | Connecteur actif (compte « SL Agence », équipe « L'équipe de SL Agence »). **Aucun fichier n'a été consulté** : le connecteur ne permet pas de lister les fichiers, et aucun lien n'a été fourni. Couleurs, police et logo viennent donc du site en production `slagence.fr`, qui applique la même charte. |
| **Logo** | Logo officiel extrait de `logo.png` (site), passé en blanc sur fond transparent. Aucune retouche de forme. |
| **Couleurs** | Celles du site : noir `#070907`, khaki `#3C4F3B`, blanc, graphite `#0E110E` / `#171B17`. Accents discrets déjà présents sur le site : bleu `#A1D3FF`, terracotta `#E08A6D`. |
| **Typographie** | Geist (police du site), poids variables 450 → 600. |
| **Vidéo de référence** | `pub-sl-agence.mp4` (site). Principes repris sans copie : cartes d'interface claires sur fond noir pour le « problème », interface sombre et calme pour la « solution », titres Geist centrés, fin sur le logo et un halo khaki. |
| **Voix off** | **Voix de synthèse provisoire** (Microsoft Edge TTS, voix « Henri », fr-FR). Elle sert de voix témoin pour le minutage. Pour la diffusion, il faut la remplacer par un comédien (voir §5). |
| **Musique / sound design** | Synthétisés pour ce film (aucune banque sonore, aucun droit tiers). |
| **Génération vidéo** | Aucune IA générative d'images. Le film est un motion design rendu en code (HTML + Playwright + ffmpeg), donc précis, net et reproductible image par image. |

Toutes les données affichées sont **fictives** : noms, entreprises, horaires, adresse `exemple.fr`. Les disponibilités du brouillon sont signalées à l'écran comme « données de démonstration ».

---

## 1. Concept créatif final

**Un seul écran, deux états.** On ne quitte jamais la boîte mail. Elle passe du chaos au calme sous nos yeux.

- **Avant**, l'interface est claire, presque blanche, dense et bruyante. Les messages tombent, les notifications s'empilent, les fenêtres se superposent.
- **La bascule** : tout se fige, le son se coupe. Une ligne de lumière khaki balaie la liste. Sur son passage, chaque message vire au graphite, puis glisse vers sa catégorie.
- **Après**, l'interface est sombre, aérée, hiérarchisée. Les priorités sont en haut, les réponses sont préparées, et l'humain valide.

Ce passage clair → sombre est le moment signature du film. Il traduit visuellement « du bruit au calme » sans robot, sans cerveau numérique et sans hologramme.

**Message principal :** Votre boîte mail ne devrait plus vous faire perdre du temps.

---

## 2. Storyboard minuté, plan par plan

Coordonnées pour un cadre de 1080 × 1920. Les textes restent entre y = 160 et y = 480 : zone sûre Reels/TikTok, hors des boutons à droite et de la légende en bas.

### Scène 1 — Le problème · 0,0 → 5,0 s

| | |
|---|---|
| **Image** | Fond noir. L'interface de messagerie (claire, `#EEEDE8`) émerge du noir en perspective (rotateX 16° → 6°) et avance vers la caméra (échelle 0,84 → 1,0). 22 nouveaux mails arrivent par le haut et poussent la liste vers le bas. L'intervalle entre deux arrivées passe de 0,65 s à 0,12 s. Les notifications « Nouveau message » s'empilent à droite, trois au maximum. Le compteur passe de « 38 non lus » à « 60 non lus ». |
| **Texte** | 1,0 s : **« 60 mails. »** (128 px, 600) · 1,9 s : **« Chaque matin. »** (62 px, blanc 72 %) |
| **Voix off** | 0,67 s : « Chaque jour, votre boîte mail déborde. » |
| **Caméra** | Push-in continu, léger tremblé (rotation ±0,18°), qui monte avec la tension. |
| **Son** | Pad grave en la mineur, filtre qui s'ouvre progressivement. Un ping par mail, de plus en plus serrés, et un tic-tac de plus en plus dense. |
| **Lumière** | Halo khaki faible derrière la fenêtre, vignettage, grain argentique à 7 %. |

### Scène 2 — La perte de temps · 5,0 → 9,95 s

| | |
|---|---|
| **Image** | Un curseur apparaît. Il ouvre « Garage Muller — Demande de devis » (5,85 s) : une fenêtre de lecture s'ouvre. Il revient en arrière, cherche et survole plusieurs lignes, ouvre « Facture F-2026-118 » (7,25 s), puis la newsletter « Pro Hebdo » (8,35 s). Les trois fenêtres se superposent en cascade, les plus anciennes floutées. Le mail important (« Claire Meyer — Intervention la semaine prochaine ? ») est survolé, puis laissé au milieu de la liste. |
| **Texte** | Mot par mot, calé sur la voix : **« Trier. »** 5,2 s · **« Chercher. »** 5,9 s · **« Répondre. »** 7,25 s · **« Recommencer. »** 8,5 s |
| **Voix off** | 5,2 s : « Trier, chercher les urgences, répondre aux mêmes questions… » |
| **Caméra** | Rapprochement (1,0 → 1,13), légère rotation Y (−3°). La liste passe en profondeur de champ (flou de 1,4 px) dès qu'une fenêtre s'ouvre. |
| **Son** | Pulsation sub à 112 BPM, montée de bruit filtré, clics de souris et souffles d'ouverture de fenêtre. **Coupure nette à 9,95 s.** |

### Scène 3 — La transformation · 9,95 → 14,0 s ★ moment signature

| | |
|---|---|
| **Image** | 9,95 s : **gel total**. L'image, le curseur et la caméra s'arrêtent, le texte disparaît d'un coup. 10,0 → 10,6 s : les fenêtres de lecture se dissolvent en flou. 10,35 s : une ligne de lumière khaki balaie la liste de haut en bas. Sur son passage, chaque ligne passe du papier clair au graphite, et la barre de titre passe de « 60 non lus » à « ● Tri automatique actif ». À partir de 10,95 s, les messages glissent un par un (décalage 0,13 s, courbe ease-in-out quintique, léger gonflement à mi-course) vers leur catégorie : **Urgences · Demandes de devis · Clients · Factures · Newsletters**. Les newsletters sont rangées à part : elles se replient dans leur en-tête. |
| **Texte** | 10,6 s : **« Et si tout se triait automatiquement ? »** |
| **Voix off** | 10,57 s : « Et si votre boîte mail s'organisait toute seule ? » |
| **Caméra** | Après le gel, recul doux (1,13 → 0,99) qui révèle l'interface entière, à plat. |
| **Son** | 0,35 s de **silence absolu**, puis un souffle doux synchronisé au balayage, un accord cristallin (do-mi-sol-si) et 11 petits « tics » en gamme pentatonique montante, un par message rangé. |
| **Lumière** | Le halo khaki double d'intensité au passage clair → sombre. |

### Scène 4 — Le tri intelligent · 14,0 → 20,0 s

| | |
|---|---|
| **Image** | 14,2 s : la vue se réorganise. Trois messages montent dans **« Vos priorités · Aujourd'hui »** et deviennent des cartes plus hautes avec étiquettes : Atelier Hoffmann (Urgent · Rappel souhaité), Claire Meyer (Client · À répondre), Garage Muller (Demande de devis · Nouveau client). Les catégories se compactent en dessous, avec leur nombre de messages. 16,4 s : un nouveau mail arrive (« Schmitt Immobilier »), passe en « Analyse ••• » avec une barre de lecture, reçoit l'étiquette « Demande de devis » (17,45 s), puis vole vers sa catégorie en suivant une ligne pointillée très discrète (17,9 → 18,6 s). Le compteur passe de 9 à 10 avec une pulsation. |
| **Texte** | 14,7 s : **« Vos priorités, directement sous vos yeux. »** |
| **Voix off** | 14,72 s : « L'IA identifie les priorités et classe chaque message. » |
| **Caméra** | Travelling latéral lent (tx −10 → +12 px, rotateY +2,5° → −2,5°) qui donne de la profondeur. |
| **Son** | Pad apaisé (fa majeur 9), pulsation sub à 96 BPM très discrète, arpège doux. Ping, chatoiement d'analyse, « pop » d'étiquette, souffle de vol, tic d'arrivée. |

### Scène 5 — Les réponses personnalisées · 20,0 → 27,0 s

| | |
|---|---|
| **Image** | 20,0 s : la carte de Claire Meyer s'ouvre en vue message. On voit l'expéditrice (claire.meyer@exemple.fr), l'objet et le message : « Bonjour, êtes-vous disponibles pour une intervention la semaine prochaine ? ». 20,9 s : le panneau **« Brouillon de réponse · Préparé automatiquement »** monte, avec l'étiquette en pointillés **« Disponibilités : données de démonstration »**. 21,3 → 23,7 s : la réponse s'écrit. Les éléments personnalisés (prénom, contexte, créneaux) sont surlignés en khaki. 23,0 s : le sélecteur **« Mode d'envoi »** apparaît, avec deux options : « Réponse automatique » et « Relire et valider ». 24,4 s : le curseur clique sur **« Relire et valider »**, qui se remplit en khaki avec une coche. 24,85 s : bandeau **« Brouillon validé · prêt à être envoyé »** avec le bouton « Envoyer », qui s'illumine. |
| **Texte** | 20,8 s : **« Des réponses personnalisées. »** · 22,75 s : **« Avec vous aux commandes. »** |
| **Voix off** | 20,82 s : « Les réponses sont personnalisées, avec ou sans validation de votre part. » |
| **Caméra** | Léger push-in (0,99 → 1,03). |
| **Son** | Frappe clavier très discrète, clic, carillon de validation sur deux notes montantes. |

Texte du brouillon (fictif) :

> Bonjour Claire,
>
> Merci pour votre message. Nous pouvons intervenir la semaine prochaine : mardi à 14 h ou jeudi à 9 h.
>
> Quel créneau vous conviendrait le mieux ?
>
> Bien cordialement,
> L'équipe Lambert Rénovation

### Scène 6 — Le résultat · 27,0 → 33,0 s

| | |
|---|---|
| **Image** | Retour à la boîte de réception complète, calme. Les cartes prioritaires affichent leur nouvel état : « ✓ Réponse prête » (Claire Meyer) et « ✓ Brouillon prêt » (Garage Muller). 28,0 s : trois tuiles de tableau de bord apparaissent : **Priorités identifiées · Réponses préparées · Messages classés**. Elles portent une coche, **sans aucun chiffre de gain**. |
| **Texte** | 27,5 s : « Moins de temps dans vos mails. » (secondaire, 50 px) · 29,75 s : **« Plus de temps pour votre entreprise. »** (principal, 74 px) |
| **Voix off** | 27,52 s : « Moins de temps dans vos mails. Plus de temps pour l'essentiel. » |
| **Caméra** | Le rythme ralentit, recul lent (1,03 → 0,92) avec un léger basculement (rotateX 5°). |
| **Son** | Pad calme et arpège. Trois tics doux à l'apparition des tuiles. |

### Scène 7 — Reveal SL Agence et CTA · 33,0 → 40,0 s

| | |
|---|---|
| **Image** | 32,9 → 33,8 s : l'interface rétrécit (×0,58), se floute et se fond dans le noir. 33,5 s : le **logo officiel** apparaît (opacité, flou 14 → 0 px, montée de 30 px, échelle 1,06 → 1), puis un reflet khaki le traverse (34,05 → 35,1 s). Un halo khaki respire derrière. 34,3 s : **« Votre boîte mail peut faire bien plus. »** 34,9 s : « Automatisation & optimisation des opérations d'entreprise ». 35,0 s : pilule khaki **« Commentez MAIL »**. 35,9 s : « On vous montre comment le mettre en place. » **Image parfaitement stable de 36,5 à 40 s.** |
| **Voix off** | 33,52 s : « SL Agence. » · 34,96 s : « Commentez MAIL pour découvrir ce que l'on peut automatiser pour vous. » |
| **Son** | Souffle descendant, signature sonore (cloche douce en do majeur + sub qui descend), tic sur le CTA, pad final qui s'éteint en fondu de 38,6 à 40 s. |

---

## 3. Voix off synchronisée

| Début (s) | Fin (s) | Texte |
|---|---|---|
| 0,67 | 2,92 | Chaque jour, votre boîte mail déborde. |
| 5,20 | 8,38 | Trier, chercher les urgences, répondre aux mêmes questions… |
| 10,57 | 12,80 | Et si votre boîte mail s'organisait toute seule ? |
| 14,72 | 17,43 | L'IA identifie les priorités et classe chaque message. |
| 20,82 | 24,54 | Les réponses sont personnalisées, avec ou sans validation de votre part. |
| 27,52 | 31,08 | Moins de temps dans vos mails. Plus de temps pour l'essentiel. |
| 33,52 | 37,98 | SL Agence. *(pause 0,6 s)* Commentez MAIL pour découvrir ce que l'on peut automatiser pour vous. |

Le texte n'a pas été raccourci. Le débit de la voix témoin a été ralenti de 4 % et le film tient en 40 s sans accélérer la voix.

**Casting de la voix définitive :** homme, 25-35 ans, français standard, timbre chaud et légèrement grave, posé. Il parle d'égal à égal, comme un professionnel qui en conseille un autre, sans ton « pub ». Il faut l'enregistrer phrase par phrase et caler chaque prise au début indiqué ci-dessus : l'image est construite sur ces repères.

---

## 4. Textes à l'écran (relus)

1. 60 mails.
2. Chaque matin.
3. Trier. Chercher. Répondre. Recommencer.
4. Et si tout se triait automatiquement ?
5. Vos priorités, directement sous vos yeux.
6. Des réponses personnalisées.
7. Avec vous aux commandes.
8. Moins de temps dans vos mails.
9. Plus de temps pour votre entreprise.
10. Votre boîte mail peut faire bien plus.
11. Automatisation & optimisation des opérations d'entreprise
12. Commentez MAIL
13. On vous montre comment le mettre en place.

Typographie française : espace insécable avant « ? », guillemets « », apostrophes typographiques.

Textes d'interface : Boîte de réception · 60 non lus · Tri automatique actif · Vos priorités · Aujourd'hui · Catégories · Urgences · Demandes de devis · Clients · Factures · Newsletters · Nouveau message · Analyse · Brouillon de réponse · Préparé automatiquement · Disponibilités : données de démonstration · Mode d'envoi · Réponse automatique · Relire et valider · Brouillon validé · prêt à être envoyé · Envoyer · Réponse prête · Brouillon prêt · Priorités identifiées · Réponses préparées · Messages classés.

---

## 5. Garde-fous éditoriaux respectés

- **Aucune statistique ni aucun gain chiffré.** Les seuls nombres sont des compteurs d'interface de démonstration (60 non lus, effectifs des catégories).
- **Pas de promesse absolue.** Le film ne dit jamais « aucun mail oublié ». Il montre des priorités mises en avant.
- **Contrôle humain explicite.** Le sélecteur « Réponse automatique / Relire et valider » montre que l'entreprise choisit le niveau d'autonomie, et le curseur choisit la validation.
- **Aucune intégration logicielle nommée** (ni Gmail, ni Outlook, ni agenda). Les disponibilités sont marquées comme données de démonstration.
- **Interface originale** qui n'imite aucune messagerie commerciale.
- **Pas de robot, de cerveau, d'hologramme ni de néon.** L'« IA » n'est visible qu'à travers ses effets : le tri, l'analyse et le brouillon.

---

## 6. Lumière, contraste, profondeur

- **Contraste narratif :** interface papier `#EEEDE8` sur noir (agression lumineuse) → interface graphite `#0E110E` (repos). Le texte blanc reste toujours sur fond sombre, avec un dégradé noir en haut du cadre pour garantir la lisibilité.
- **Halo khaki** radial derrière l'interface : 45 % d'intensité pendant le chaos, 100 % après la bascule, puis halo dédié derrière le logo.
- **Halo froid très léger** (`#A1D3FF` à 10 %) en haut du cadre, pour une touche premium sans effet néon.
- **Profondeur :** perspective 3D (2 400 px), flou de profondeur de champ sur la liste et sur les fenêtres « en arrière », ombres longues et douces (60 px / 140 px de flou).
- **Texture :** grain animé à 7 % en mode incrustation, vignettage elliptique.

---

## 7. Instructions de génération (si vous refaites des plans avec une IA vidéo)

Le film livré n'en a pas besoin. Ces prompts servent si vous voulez des plans d'ambiance supplémentaires (Veo, Runway, Kling…). N'utilisez pas l'IA pour les interfaces : elle déforme le texte. Conservez les plans d'interface du rendu fourni.

- **Plan d'ouverture alternatif (0-2 s) :** « Vertical 9:16, macro shot of a dark matte desk at early morning, a laptop screen glowing softly off-frame, deep black background, subtle dark olive green (#3C4F3B) rim light, shallow depth of field, slow dolly-in, premium tech commercial, no text, no logos, no people's faces, cinematic, 35 mm, fine film grain. »
- **Plan humain optionnel (27-30 s) :** « Vertical 9:16, a business owner in their 30s closing a laptop calmly and turning toward a workshop, warm natural light, dark muted palette with olive green accents, slow handheld push-out, calm and relieved mood, premium commercial look, no visible screen content, no text. »
- **Contraintes communes :** pas de robot, d'hologramme, de cerveau numérique, de néon ni d'écran lisible. Couleurs dominantes : noir, graphite, khaki `#3C4F3B`.

---

## 8. Montage et export

**Livré :** `sl-agence-boite-mail-9x16.mp4` · 1080 × 1920 · 30 i/s · H.264 High, yuv420p, BT.709 · AAC 48 kHz stéréo · −14 LUFS intégrés, crête vraie −1,5 dBFS · `faststart` pour la lecture web.

**Pistes séparées fournies** (pour remplacer la voix sans refaire le mix) :
- `pistes/voix-temoin.wav`, à remplacer par la voix du comédien, mêmes positions.
- `pistes/musique.wav`, déjà atténuée (ducking) sous chaque phrase.
- `pistes/effets.wav`

Niveaux de mix : voix 0 dB, musique −7 dB, effets −6 dB, puis normalisation loudnorm à −14 LUFS.

**Variantes à exporter depuis le même master :**
- **LinkedIn :** même fichier. Si possible, ajoutez des sous-titres SRT, car LinkedIn se regarde beaucoup sans le son. Les textes à l'écran couvrent déjà le message.
- **TikTok / Reels :** même fichier, avec une miniature tirée de 12,0 s (catégories en cours de tri) ou de 37,0 s (logo et CTA).
- **4:5 (fil Instagram) :** recadrage centré 1080 × 1350 (y de 285 à 1635). Les textes du haut sont alors à remonter : il faut refaire le rendu avec la composition adaptée.

**Pour modifier et refaire le rendu** (sources dans `sources/`) :

```bash
npm i playwright geist && pip install numpy edge-tts
node render.js stills 12,24.5,37     # images de contrôle
node render.js video video_mute.mp4  # 1 200 images → vidéo muette
python3 sound.py                     # musique + effets, calés sur timeline.json
./mix.sh [voix-comedien.wav]         # mix, −14 LUFS, mux → MP4 final
```

Tous les minutages (arrivées, tri, clics, frappe, logo) se trouvent dans `timeline.json`, partagé par l'image et le son. Si vous déplacez un repère, l'image et le son restent synchronisés.
