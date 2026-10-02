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

Ne pas éditer `index.html` à la main : il est généré.
La source est `template.html`, dans le dossier parent.

    python3 build.py        # régénère index.html
    python3 make-deploy.py  # réassemble ce dossier

## Photographies

Sources Pexels, licence permettant l'usage commercial sans attribution.
Traitées en bichromie pour tenir avec la charte.

## Référencement (SEO)

- **Images de partage** : une par page, dans `img/og/` (accueil : `og.png`).
  Pour un nouvel article, ajouter une entrée dans `outils/og-pages.json`
  puis lancer `node outils/og-images.mjs` depuis la racine (Playwright requis).
- **Nouvel article** : penser à l'ajouter dans `blog/index.html` (carte + schéma
  `blogPost`), `blog/feed.xml`, `sitemap.xml` et `llms.txt`, et à le lier depuis
  une ou deux pages services.
- **Polices** : Geist est hébergée dans `fonts/` (aucun appel à Google Fonts).
- **404** : `404.html` est servie automatiquement par GitHub Pages.
