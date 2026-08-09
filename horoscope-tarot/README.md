# Astral — Horoscope & Tarot

PWA mobile-first : horoscope personnalisé + carte de tarot du jour, avec une direction artistique dédiée (fond noir profond, dégradés violet/or/rose mauve, typographie Playfair Display + Manrope). Deux paliers payants avec paiement Stripe réel et vérification côté serveur.

## Lancer l'app

Le frontend reste sans dépendance ni build : c'est du HTML/CSS/JS statique.

```bash
cd horoscope-tarot
python3 -m http.server 8080
# puis ouvrir http://localhost:8080 sur mobile ou en réduisant la fenêtre du navigateur
```

Le manifest + service worker rendent l'app installable (PWA) une fois servie en HTTP(S). Le backend (vérification des paiements) vit dans le compte Make de l'agence — voir la section [Backend](#backend--vérification-des-paiements) plus bas pour l'état exact.

## Ce que couvre le prototype

- **Onboarding** en 5 étapes (prénom, date, heure avec option « je ne sais pas », lieu de naissance).
- **Écran du jour** : carte de tarot tirée parmi les 78 (22 arcanes majeurs + 56 mineurs), stable pour la journée (mise en cache dans `localStorage`, régénérée chaque nouveau jour calendaire), avec animation de retournement et effet de scintillement au toucher. Chaque carte a sa propre illustration générée (glyphe + constellation procédurale + dégradé), dans une esthétique ligne fine / céleste, sans clipart.
- **Horoscope du jour** basé sur le signe solaire réel (calculé à partir de la date de naissance). La version gratuite reste courte et se termine sur une relance précise (« ta Lune est en X, ça change la lecture de cette journée ») plutôt qu'un texte complet — l'objectif est de donner envie de débloquer la suite, pas de tout donner d'entrée.
- **Énergie du jour** : couleur, pierre et chiffre du jour (universels, calés sur la date), plus une **carte conseil** bonus tirée en plus de la carte du jour — réservés à Croissant.
- **Affinités** : un nouvel onglet pour comparer son thème à celui d'un proche (sélection de son signe, score de compatibilité par éléments astrologiques + analyse). Le score est toujours visible ; l'analyse est réservée à Croissant, le détail (Amour / Communication / Point de vigilance) à Pleine Lune.
- **Deux paliers payants**, pour une vraie trajectoire d'upsell :
  - **🌘 Croissant — 3,99 €/mois** : thème natal complet (Soleil, Lune, Ascendant), carte conseil quotidienne, énergie du jour, 7 derniers jours de journal, aperçu des affinités.
  - **🌕 Pleine Lune — 6,99 €/mois** : tout Croissant + les trois tirages avancés (ci-dessous), affinités illimitées et détaillées, historique complet. La notification du matin reste listée comme « bientôt » — elle n'est pas construite (notifications push hors périmètre, voir Prochaines étapes).
- **Trois tirages avancés** (Pleine Lune) : Tirage Amour et Tirage Carrière (3 cartes, positions dédiées — *Toi / L'autre / Ce qui vous lie*, etc.), Croix Celtique (10 cartes, regroupées en « La Croix » et « Le Bâton » selon la disposition traditionnelle). Réutilisent le même moteur de cartes que la carte du jour (mêmes 78 cartes, mêmes illustrations) ; tirage à la demande et illimité, pas de cache journalier comme la carte du jour.
- **Paiement réel via Stripe**, un lien par plan, **vérifié côté serveur** : chaque bouton « Choisir... » redirige vers une page de paiement Stripe hébergée (carte bancaire, Apple Pay, Google Pay). Un e-mail est demandé au moment de payer — il permet de retrouver son accès sur n'importe quel appareil via « Restaurer mon accès » dans les réglages, en interrogeant le backend (voir plus bas). Voir [Paiement — configurer Stripe](#paiement--configurer-stripe) ci-dessous pour brancher tes propres liens.
- **Compte minimal** : profil (prénom, naissance, palier, e-mail) persistant en `localStorage` côté appareil, et `email → palier` persistant côté serveur (backend) pour survivre à un changement d'appareil. Réinitialisable depuis les réglages.

## Approximation du thème natal

Le calcul du thème natal reste entièrement fait côté client (le backend ne sert qu'à la vérification des paiements, pas à l'astrologie) : pas de moteur d'éphémérides embarqué, pour rester simple et sans dépendance externe. Il utilise :

- **Signe solaire** : calcul exact à partir des dates de début/fin de chaque signe.
- **Signe lunaire** : approximation par cycle fixe (~2,28 jours/signe) à partir d'une date de référence — donne une valeur stable et plausible, pas une position astronomique réelle.
- **Ascendant** : approximation à partir de l'heure de naissance (un signe toutes les ~2h à partir d'un lever solaire théorique à 6h). Non calculé si l'heure de naissance est inconnue.

Ces limites sont indiquées dans l'app (icône ℹ sur l'onglet Thème). Pour une vraie mise en production, brancher un moteur d'éphémérides (Swiss Ephemeris ou une API d'astrologie) et un service de géocodage pour le lieu de naissance, comme recommandé dans le brief produit.

## Génération du texte d'horoscope

Les textes sont composés (pas copiés-collés statiques) à partir de banques de phrases courtes combinées selon : élément du signe (Feu/Terre/Air/Eau), modalité (Cardinal/Fixe/Mutable), signe lunaire et ascendant, plus une ouverture/clôture tirées aléatoirement — le tout sélectionné de façon déterministe par jour pour rester stable. En production, cette étape serait remplacée par un LLM alimenté par les données réelles du thème, comme suggéré dans le brief.

## Paiement — configurer Stripe

Le prototype est câblé pour rediriger vers deux **Stripe Payment Links** (un par plan) : des pages de paiement créées et hébergées par Stripe, sans écrire une ligne de backend. Tu n'as besoin de coller que deux URLs publiques dans le code — jamais de clé secrète.

### 1. Créer le compte et les deux produits

1. Crée un compte sur [dashboard.stripe.com](https://dashboard.stripe.com) (ou connecte-toi si tu en as déjà un).
2. Dans **Produits**, crée deux produits avec un prix récurrent chacun :
   - « Astral Croissant » — 3,99 € / mois
   - « Astral Pleine Lune » — 6,99 € / mois
3. Reste en **mode test** pour les essais (bascule visible en haut du dashboard) — tu passeras en mode live une fois prête à encaisser réellement, avec des cartes de test Stripe (`4242 4242 4242 4242`, n'importe quelle date future, n'importe quel CVC).

### 2. Créer les deux Payment Links

Pour **chacun** des deux produits :

1. Dans **Paiements → Payment Links**, crée un nouveau lien à partir du produit.
2. Dans les options du lien, section **Après le paiement** : choisis « Rediriger les clients vers votre site » et renseigne (en remplaçant `TIER` par `croissant` ou `pleinelune` selon le lien que tu crées) :
   ```
   https://slagence.fr/horoscope-tarot/index.html?premium_success=TIER
   ```
   (adapte le domaine/chemin si l'app est hébergée ailleurs — l'important est de garder `?premium_success=croissant` ou `?premium_success=pleinelune` à la fin, c'est ce que l'app détecte à son retour pour savoir quel plan débloquer).
3. Copie l'URL du Payment Link généré (ex. `https://buy.stripe.com/xxxxxxxxxxxx`).

### 3. Brancher les URLs dans le code

Dans `index.html`, cherche l'objet en tout début de balise `<script>` :

```js
var STRIPE_LINKS = {
  croissant: '',  // ex: 'https://buy.stripe.com/xxxxxxxxxxxx' (Croissant, 3,99€/mois)
  pleinelune: ''  // ex: 'https://buy.stripe.com/yyyyyyyyyyyy' (Pleine Lune, 6,99€/mois)
};
```

et colle chaque URL de Payment Link au bon endroit. Tant qu'une valeur reste vide, son bouton « Choisir... » affiche un message au lieu de rediriger vers une URL invalide — utile pendant le développement.

### Ce qui est réellement sécurisé, et ce qui ne l'est pas (important)

- ✅ **Le paiement lui-même est réel et sûr** : la page de paiement est hébergée par Stripe (conforme PCI-DSS), aucune donnée bancaire ni clé secrète Stripe ne touche jamais ce dépôt de code, qui est public.
- ✅ **Le déblocage du palier est vérifié côté serveur.** Le backend (Make) reçoit chaque paiement/résiliation Stripe par webhook et enregistre `email → palier` ; l'app confirme systématiquement le palier auprès de lui (au chargement, et via « Restaurer mon accès »), pas seulement au retour immédiat de Stripe. Testé en conditions réelles : paiement Croissant, paiement Pleine Lune, résiliation, et tentative non autorisée correctement rejetée — voir [`backend/README.md`](../backend/README.md) pour le détail.
- Les boutons « Activer Croissant / Pleine Lune (démo) » (utiles pour montrer l'interface débloquée sans payer) n'apparaissent pas sur l'écran de paiement — ils restent accessibles uniquement dans les réglages, et seulement en mode développeur (ouvrir l'app une fois avec `?dev=1` dans l'URL pour l'activer sur cet appareil).

## Publicité — pixel TikTok

Pour que TikTok Ads sache quelles pubs amènent de vrais inscrits/clients (et optimise les campagnes en conséquence), l'app peut charger le pixel TikTok — désactivé par défaut.

### 1. Créer le pixel côté TikTok

1. Dans [TikTok Ads Manager](https://ads.tiktok.com), va dans **Ressources → Évènements → Pixels Web → Créer un pixel**.
2. Choisis la configuration manuelle ("Installer manuellement le code du pixel").
3. Copie l'**ID du pixel** affiché (une chaîne du type `CXXXXXXXXXXXXXXXXXXX`) — pas besoin du code JavaScript complet, juste cet identifiant.

### 2. Brancher l'ID dans le code

Dans `index.html`, cherche :

```js
var TIKTOK_PIXEL_ID = '';
```

et colle l'ID entre les guillemets. Tant que c'est vide, aucun script TikTok n'est chargé et la bannière de consentement ne s'affiche même pas.

### Comment ça marche une fois activé

- Au premier chargement, une **bannière de consentement** apparaît en bas de l'écran (obligatoire pour un tracking publicitaire tiers en France/UE — RGPD). Le pixel ne se charge **qu'après un clic sur "Accepter"** ; en cas de refus, rien n'est chargé, aucun cookie tiers n'est posé. Le choix est mémorisé (pas redemandé à chaque visite).
- Trois évènements sont envoyés à TikTok une fois le consentement donné, pour permettre l'optimisation des campagnes :
  - `CompleteRegistration` — à la fin de l'onboarding (quelqu'un a créé son profil).
  - `InitiateCheckout` — au clic sur "Choisir Croissant/Pleine Lune", juste avant la redirection vers Stripe.
  - `CompletePayment` — au retour de Stripe après un paiement confirmé.
- Limite connue : si quelqu'un paie sans avoir encore donné son consentement (ex. premier passage direct sur le paywall via une pub), l'évènement `CompletePayment` n'est pas envoyé — c'est le prix normal d'un tracking conforme RGPD (opt-in avant tout dépôt de cookie tiers), pas un bug.

## Backend — vérification des paiements

Le backend vit directement dans le compte [Make](../backend/) de SL Agence (data store + deux scénarios, pas de code à déployer) — construit et testé en direct. Reste une seule déclaration à faire côté dashboard Stripe (coller une URL, cocher deux événements) pour que les vrais paiements l'alimentent — voir [`backend/README.md`](../backend/README.md).

## Prochaines étapes (hors périmètre actuel)

- Notifications push (matin).
- Version native iOS/Android.
- Géocodage du lieu de naissance (actuellement affiché mais non utilisé dans le calcul).
- Portail client pour changer de palier ou se désabonner en libre-service (aujourd'hui : résilier puis re-souscrire à l'autre lien).
- Moteur d'éphémérides réel (voir [Approximation du thème natal](#approximation-du-thème-natal)).
