# Refonte de l'accueil — maquettes (rien en ligne)

Loïc veut voir un rendu à chaque étape avant toute mise en ligne. Ce dossier est dans `.claude/`,
donc jamais publié par GitHub Pages ; `index.html` à la racine n'est pas modifié.

- `build.py` : lit `index.html` (en ligne) et produit `etape-1-accueil.html` (maquette, chemins du vrai site).
- `apercu.py <dossier>` : en fait une page d'aperçu privée claude.ai (formulaire neutralisé).
- `src/` : héros (HTML, CSS, JS) et compléments CSS.
- Aperçu étape 1 : https://claude.ai/artifact/ArtZA25oUSFhQ31yv6HvGF (privé).

## Étape 1 — accueil (2026-10-12)
Héros animé « Vous décrivez → Nous construisons » (3 scènes : bons, relances, Excel), titre retravaillé,
bloc chiffres/réalisations retiré de l'accueil (la page /realisations reste dans le menu et le pied),
textes des domaines resserrés, appels à l'action dans 5 sections + barre mobile, rideau d'ouverture retiré.

## Étape 1 v2 (2026-10-12) — retours de Loïc : « trop d'infos, un peu le foutoir »
Ouverture épurée (plus de fil, de pastilles, de lien sous les onglets, d'étiquette « Nous construisons » ;
une phrase sous le titre ; fond plus discret). Section 01 refaite : plus de photos, la double saisie
racontée au défilement (le titre et son double qui se recollent, la ligne retapée le soir, puis reliée).
Correction enregistrée : c012.

## Ce qui ne bouge pas (SEO)
Title, meta description, canonical, Open Graph, JSON-LD (FAQ incluse), H1 « Automatisation et logiciel
sur mesure à Mulhouse », tous les H2/H3, liens vers les 8 pages de service, les 6 guides et le blog, URL.
Avant la mise en ligne : `index.html` est généré depuis `template.html` (dossier de Sacha) — reporter
les changements là-bas aussi, sinon une régénération les effacerait.

## Étape 1 v3 (2026-10-12) — section 02 en schéma
« Trop de texte » sur 02 : les 8 paragraphes deviennent un schéma « Vous saisissez une fois → votre logiciel
sur mesure → le reste se fait tout seul ». 8 cartes d'une ligne, titres H3 = noms des pages de service, et
chaque carte renvoie à sa page : 7 pages de service liées + le centre vers /logiciel-sur-mesure (avant : 5
liens). Correction enregistrée : c013 (chaque section se comprend en 5 secondes).

## Étape 1 v4 (2026-10-13) — retours complets de Loïc
- Héros : partie gauche épurée (« trop chargé, fait IA ») : surtitre simple (H1 conservé), titre sans effets,
  une phrase, un bouton + un lien. Plus de quadrillage animé. Le téléphone ne change pas.
- 01 : plus de défilement figé (c015) : l'animation se joue seule (~4 s) à l'apparition.
- Vidéo « En 45 secondes » retirée de l'accueil, et son balisage VideoObject avec.
- 02 : schéma retravaillé (ports, traits fins, lueurs qui circulent, disque central soigné) + vos outils
  en une ligne de pastilles (ex-section 05, logos retirés).
- 03 Votre métier : 4 familles de métiers au lieu des bulles flottantes ; le bandeau défilant est retiré.
- Nombres en chiffres (c014). Sections renumérotées 01 → 06. Avis et « Notre intervention » inchangés.

## Étape 1 v5 (2026-10-13)
- Héros : après chaque scène, le téléphone s'ouvre en écran d'ordinateur (même outil), puis revient — sans texte.
- 01 : « Le travail est fait 2 fois. » (chiffre, validé par Loïc).
- 04 Notre intervention : une ligne de 4 étapes reliées, sans paragraphes ; « Nous restons » → « Vous gagnez du temps ».
- Près de chez vous et Guides : titres secondaires plus petits ; les 6 guides deviennent des lignes cliquables
  (« Guide terrain » + titre), les 6 liens vers le blog sont conservés.

## Étape 1 v6 (2026-10-13)
- Héros plus rapide : l'ordinateur apparaît ~5 s après l'arrivée (au lieu de ~9 s) ; scène complète ~8 s.
- 01 : contours vivants (une lueur fait le tour des cartes, orange pendant la ressaisie, verte une fois relié)
  et étincelle qui circule sur le trait « automatique ».
- Validé par Loïc à ce stade : 01, pieuvre 02, avis, 03 métiers, 04 intervention, guides.

## Étape 1 v7 (2026-10-13)
- Héros réduit à l'essentiel : surtitre (H1), titre, un seul bouton « Décrire mon besoin ». La phrase
  « Applications métier, automatisations et IA… » est retirée (ses mots-clés restent dans les H2 de 02 et 03).
- Appels à l'action dédoublonnés : 02 → « Réserver un appel de 15 minutes avec nous » ; plus de bouton sous
  les avis ; bloc « Le vôtre n'y est pas ? » retiré de 03. Restent : héros, 02, 04, FAQ, formulaire, barre mobile.

## v8 « Genèse » (2026-10-13) — variante du héros, la v7 reste la base de référence
`HERO=v8 python3 build.py` → `etape-1-accueil-v8.html` (sources `src/hero-v8.*`). Seule l'ouverture change.
Des papiers en vrac (factures, bons, tableurs, mails, agendas) flottent ; une lame de lumière les balaie ;
chacun se pose en tuile d'un plan de ville isométrique, puis s'élève en immeuble ; les papiers en trop
éclatent ; des impulsions de données circulent dans les rues et allument les documents ; sous la souris,
les tuiles se soulèvent. Canvas 2D, sans bibliothèque. Titre en 2 temps (désordre / ordre).
Aperçu v8 (privé) : voir le lien donné à Loïc. Aperçu v7 : https://claude.ai/artifact/ArtZA25oUSFhQ31yv6HvGF
- v8.1 (2026-10-13) : aurore de couleurs derrière la ville (verts, bleu-vert, touche dorée), lame dès 0,7 s
  (ville posée vers 1,8 s), livraisons continues de documents qui ajoutent un étage aux immeubles, envois
  (gerbe verte) quand un immeuble est plein.
- v8.2 (2026-10-13) : plus de reflets multicolores. Fond = 1 halo vert + 1 halo d'accent. Couleur d'accent
  (variable CSS --accent-rgb, ambre par défaut, corail / lilas / tout vert en option) : les documents livrés
  arrivent dans l'accent (travail en attente) puis passent au vert quand une impulsion les traite.
  L'aperçu v8 a un sélecteur d'accent (maquette seulement).
- v8.3 (2026-10-13) : tout en vert (accents retirés, choix de Loïc). Beaucoup plus de lumières blanches :
  grandes impulsions dans les rues et sur le pourtour (8 max), fines entre les rangées de documents (14 max) ;
  bande de reflet qui balaie les toits en biais toutes les 6 s ; scintillements blancs sur les toits.

## v9 « vitrine » (2026-10-14) — repart de la v7, mise en page façon Apple
`HERO=v9 python3 build.py` → `etape-1-accueil-v9.html` (hero.css + hero-v9.css, hero.js de la v7).
Barre du haut : logo · rubriques (Le constat, Ce que nous faisons, Réalisations, Votre métier, Notre
intervention, Parlons-en) · Menu (le blog reste dans le menu). Héros centré : devise, « En savoir plus »
(→ #constat) et « Décrire mon besoin ». Dessous : l'atelier téléphone → ordinateur centré, devant un grand
mot en chrome « SUR MESURE » (relief + reflet qui passe). Sur téléphone, le mot passe au-dessus de l'animation.
- v9.1 (2026-10-15) : « SUR MESURE » au-dessus de l'animation sur ordinateur aussi (derrière le téléphone, on ne lisait que « SUR »).
