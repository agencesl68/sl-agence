# slagence.fr

Site vitrine de SL Agence. Tout est statique : aucun serveur, aucune base.

## Mettre en ligne

1. Déposer **tous** les fichiers de ce dossier à la **racine** du dépôt.
   Pas de sous-dossier : l'upload web de GitHub ne monte que les fichiers racine.
2. Settings → Pages → Source : la branche `main`, dossier `/ (root)`.
3. Le site est en ligne sous une minute.

## Brancher slagence.fr

Une fois le DNS prêt, ajouter à la racine un fichier nommé `CNAME`
contenant une seule ligne :

    slagence.fr

Puis, chez le registrar, faire pointer le domaine vers GitHub Pages
(enregistrements A vers 185.199.108–111.153, et CNAME `www` vers
`<compte>.github.io`).

**Ne pas ajouter ce fichier avant que le DNS ne soit configuré** : GitHub
cesserait de servir le site sur l'adresse `.github.io` sans que la nouvelle
adresse ne réponde encore.

## Modifier le site

Depuis le 15/10/2026 (refonte de l'accueil, PR #11), **`index.html` se modifie directement dans ce
dépôt**, comme les autres pages : il n'est plus généré depuis `template.html` (choix de Sacha).
Chaque modification passe par une branche et une pull request.
Les sources de la refonte (maquettes, scripts) sont dans `.claude/travail/site/refonte-accueil/`
(dossier non publié).

## Photographies

Sources Pexels, licence permettant l'usage commercial sans attribution.
Traitées en bichromie pour tenir avec la charte.

## Référencement (SEO)

- **Images de partage** (1200×630) : `og.png` pour l'accueil, `img/og/` pour les pages services
  et deux articles, `blog/og-*.png` pour les autres articles, `og-realisations.png`.
- **Nouvel article** : l'ajouter dans `blog/index.html` (carte + schéma `blogPost`),
  `blog/feed.xml`, `sitemap.xml` et `llms.txt`, et le relier depuis une ou deux pages services
  (bloc « Nos guides sur le sujet ») et depuis un autre article (bloc « À lire aussi »).
- **Auteur** : les articles sont signés Loïc Bitsch (encadré auteur, schéma `Person` relié à LinkedIn).
- **Polices** : Geist est hébergée dans `fonts/` (aucun appel à Google Fonts).
- **Logos** : `logo-sl.png` et `logo-sl-mark.png` (masques CSS), plus de base64 dans les pages.
- **404** : `404.html` est servie automatiquement par GitHub Pages.
- **Modèles téléchargeables** : `modeles/` (Word, Excel, PDF) ; visuels des articles dans `img/blog/`.

## Styles et scripts partagés (assets/)

- `assets/menu.css` et `assets/menu.js` : sources du menu. Après modification,
  lancer `python3 assets/inject-menu.py` (réinjecte le CSS dans chaque page et
  régénère `assets/menu.min.js`, seul fichier chargé par les pages).
- `assets/accueil.css` et `assets/blog-index.css` : styles de l'accueil et de la
  page blog, sortis du HTML (ratio texte/HTML signalé par Semrush). Les pages
  chargent les versions `.min.css` : après modification, lancer
  `npx clean-css-cli -O1 -o assets/accueil.min.css assets/accueil.css`
  (idem pour `blog-index`).
