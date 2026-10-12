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
Correction enregistrée : c011.

## Ce qui ne bouge pas (SEO)
Title, meta description, canonical, Open Graph, JSON-LD (FAQ incluse), H1 « Automatisation et logiciel
sur mesure à Mulhouse », tous les H2/H3, liens vers les 8 pages de service, les 6 guides et le blog, URL.
Avant la mise en ligne : `index.html` est généré depuis `template.html` (dossier de Sacha) — reporter
les changements là-bas aussi, sinon une régénération les effacerait.

## Étape 1 v3 (2026-10-12) — section 02 en schéma
« Trop de texte » sur 02 : les 8 paragraphes deviennent un schéma « Vous saisissez une fois → votre logiciel
sur mesure → le reste se fait tout seul ». 8 cartes d'une ligne, titres H3 = noms des pages de service, et
chaque carte renvoie à sa page : 7 pages de service liées + le centre vers /logiciel-sur-mesure (avant : 5
liens). Correction enregistrée : c012 (chaque section se comprend en 5 secondes).
