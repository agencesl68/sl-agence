# Pour Loïc — Search Console (5 min) et fiche Google (1 h 30)

> Préparé par l'agent `seo-site` le 2026-10-06. Plan : actions A1, A2 et B1-B3 (`plan.md`).
> Rien à installer, rien à payer.

## 1. Search Console — checklist de 5 minutes (à faire une fois, dès que possible)

Le fichier de vérification `google51daad5049f3b336.html` est en ligne : la propriété a sans doute déjà été vérifiée par celui qui l'a déposé.

1. **Vérifier la propriété** — ouvrir https://search.google.com/search-console avec le compte Google qui gère le site.
   La propriété `https://slagence.fr/` doit apparaître dans la liste en haut à gauche.
   - Si elle n'apparaît pas : « Ajouter une propriété » → « Préfixe d'URL » → `https://slagence.fr/` → méthode « Fichier HTML » → « Valider »
     (le fichier est déjà en ligne). Si la validation échoue, demander à Sacha avec quel compte il l'a créée et vous faire ajouter
     (Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur → « Propriétaire » ou « Complet »).
2. **Soumettre le sitemap** — menu « Sitemaps » → saisir `sitemap.xml` → « Envoyer ». Résultat attendu : « Opération effectuée », **13 URL découvertes**.
3. **Demander l'indexation des pages principales** — barre « Inspecter n'importe quelle URL » en haut → coller l'URL → « Demander l'indexation ».
   Dans cet ordre (quota d'environ 10 par jour) :
   `https://slagence.fr/` · `/automatisation-taches-administratives` · `/bon-intervention-numerique` · `/logiciel-btp-sur-mesure` ·
   `/logiciel-sur-mesure` · `/facture-electronique-tpe` · `/relance-factures-automatique` · `/remplacer-excel` · `/agent-ia-pme`
   (les URL complètes commencent par `https://slagence.fr`). Les 4 pages du blog suivront via le sitemap.
4. **Noter le point de départ** — menu « Pages » : combien de pages « Indexées » / « Non indexées » ? Envoyez-moi juste les deux chiffres
   (ou une capture d'écran). C'est la valeur « avant » de tout le plan.
5. **Donner l'accès à l'adresse de l'agence (facultatif)** — Paramètres → Utilisateurs et autorisations → ajouter `agence.sl.68@gmail.com`
   en « Complet », pour ne pas dépendre d'un seul compte.

### Export mensuel (5 min, le premier lundi de chaque mois) — action A2

1. Search Console → **Performances** → « Résultats de recherche ».
2. Période : **« 3 derniers mois »** (on compare ensuite mois par mois ; les données se recoupent sans problème).
3. Cocher les 4 courbes (clics, impressions, CTR, position).
4. En haut à droite : **« Exporter » → « Google Sheets »** (le plus simple : le fichier se crée directement dans votre Drive ;
   « Télécharger au format CSV » marche aussi, il produit un .zip avec `Requêtes.csv`, `Pages.csv`, etc.).
5. Renommer le fichier `GSC AAAA-MM` (ex. `GSC 2026-11`) et le **déplacer dans Drive → « SL agence » → « SEO »** (créer le sous-dossier « SEO » la première fois).
6. Me dire « export GSC déposé » : je reporte les positions dans `positions.md` et je donne les verdicts des actions à J+28.

Seuils qui doivent vous faire réagir (le lundi, 1 minute) : une alerte « Actions manuelles » ou « Problèmes de sécurité » → me prévenir le jour même ;
une page publiée toujours « non indexée » après 14 jours → me prévenir.

## 2. Fiche Google Business Profile — texte prêt à coller

**Tout le texte est déjà rédigé et complet dans le manuel : `savoirs/seo.md`, section 2.2 « La fiche GBP parfaite »**
(nom, catégories, zones desservies, horaires, description de 745 caractères, 8 services avec leur page, photos, posts, questions-réponses),
et **section 2.3** pour le message de demande d'avis et les modèles de réponse. Le copier tel quel.

Quatre décisions à prendre avant de commencer (5 min avec Sacha) :

1. **Numéro unique** affiché sur la fiche et dans tous les annuaires (le site met en avant celui de Sacha dans ses données structurées).
   Le même numéro partout, ensuite on n'y touche plus.
2. **Adresse masquée** (recommandé si vous ne recevez pas de clients à Friesen) → fiche « zone desservie » : Mulhouse, Colmar, Saint-Louis,
   Altkirch, Sundgau, etc. (liste dans le manuel). Ne jamais mettre une adresse à Mulhouse qui n'est pas la vôtre.
3. **Catégorie principale** : le manuel recommande « Entreprise de logiciels » (l'ancien audit proposait « Concepteur de logiciels »).
   Taper les deux dans le champ et garder celle que Google propose réellement ; secondaire : « Consultant informatique ».
   Éviter « Entreprise d'automatisation » (utilisée par l'automatisme industriel).
4. **Nom** : exactement « SL Agence », sans ville ni mot-clé (sinon risque de suspension).

Ensuite, dans l'ordre : créer la fiche sur https://business.google.com → valider (Google peut demander une courte vidéo du lieu de travail et d'un
justificatif d'activité) → coller description et services → ajouter 5 photos réelles (logo, vous deux, 2 captures d'outils anonymisées, la vidéo de 45 s) →
générer le **lien court de demande d'avis** et me l'envoyer : je prépare les messages pour les clients des 6 réalisations (à envoyer à **tous**, sans contrepartie).
