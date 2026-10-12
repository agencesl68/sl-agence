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

## Ce qui ne bouge pas (SEO)
Title, meta description, canonical, Open Graph, JSON-LD (FAQ incluse), H1 « Automatisation et logiciel
sur mesure à Mulhouse », tous les H2/H3, liens vers les 8 pages de service, les 6 guides et le blog, URL.
Avant la mise en ligne : `index.html` est généré depuis `template.html` (dossier de Sacha) — reporter
les changements là-bas aussi, sinon une régénération les effacerait.
