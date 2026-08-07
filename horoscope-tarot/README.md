# Astral — Prototype Horoscope & Tarot

Prototype de PWA mobile-first : horoscope personnalisé + carte de tarot du jour, avec une direction artistique dédiée (fond noir profond, dégradés violet/or/rose mauve, typographie Playfair Display + Manrope).

## Lancer le prototype

Aucune dépendance ni build : c'est du HTML/CSS/JS statique.

```bash
cd horoscope-tarot
python3 -m http.server 8080
# puis ouvrir http://localhost:8080 sur mobile ou en réduisant la fenêtre du navigateur
```

Le manifest + service worker rendent l'app installable (PWA) une fois servie en HTTP(S).

## Ce que couvre le prototype

- **Onboarding** en 5 étapes (prénom, date, heure avec option « je ne sais pas », lieu de naissance).
- **Écran du jour** : carte de tarot tirée parmi les 78 (22 arcanes majeurs + 56 mineurs), stable pour la journée (mise en cache dans `localStorage`, régénérée chaque nouveau jour calendaire), avec animation de retournement et effet de scintillement au toucher. Chaque carte a sa propre illustration générée (glyphe + constellation procédurale + dégradé), dans une esthétique ligne fine / céleste, sans clipart.
- **Horoscope du jour** basé sur le signe solaire réel (calculé à partir de la date de naissance). La version gratuite reste courte et se termine sur une relance précise (« ta Lune est en X, ça change la lecture de cette journée ») plutôt qu'un texte complet — l'objectif est de donner envie de débloquer la suite, pas de tout donner d'entrée.
- **Énergie du jour** : couleur, pierre et chiffre du jour (universels, calés sur la date), plus une **carte conseil** bonus tirée en plus de la carte du jour — réservés à Croissant.
- **Affinités** : un nouvel onglet pour comparer son thème à celui d'un proche (sélection de son signe, score de compatibilité par éléments astrologiques + analyse). Le score est toujours visible ; l'analyse est réservée à Croissant, le détail (Amour / Communication / Point de vigilance) à Pleine Lune.
- **Deux paliers payants** au lieu d'un seul, pour donner une vraie trajectoire d'upsell :
  - **🌘 Croissant — 3,99 €/mois** : thème natal complet (Soleil, Lune, Ascendant), carte conseil quotidienne, énergie du jour, 7 derniers jours de journal, aperçu des affinités.
  - **🌕 Pleine Lune — 6,99 €/mois** : tout Croissant + tirages Amour / Carrière / Croix celtique (listés, pas encore implémentés — hors périmètre du prototype, voir plus bas), affinités illimitées et détaillées, historique complet, notification du matin.
- **Paiement réel via Stripe**, un lien par plan : chaque bouton « Choisir... » redirige vers une page de paiement Stripe hébergée (carte bancaire, Apple Pay, Google Pay), sans qu'aucune donnée bancaire ni clé secrète ne transite par le code de l'app. Voir [Paiement — configurer Stripe](#paiement--configurer-stripe) ci-dessous pour l'activer.
- **Compte minimal** : profil (prénom, naissance, palier) persistant en `localStorage`, réinitialisable depuis les réglages.

## Approximation du thème natal

Ce prototype n'embarque pas de moteur d'éphémérides. Pour rester 100 % statique (pas de backend), il utilise :

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
- ⚠️ **Le déblocage du palier après paiement n'est pas vérifié côté serveur.** L'app est volontairement restée 100 % statique (pas de backend) à ce stade du prototype : au retour de Stripe, elle active le palier localement (`localStorage`) simplement parce que l'URL contient `?premium_success=croissant` (ou `pleinelune`), sans appeler l'API Stripe pour confirmer que ce paiement a réellement eu lieu. Un utilisateur technique pourrait donc taper cette URL directement dans son navigateur et débloquer un palier sans payer, sur son propre appareil. Ce compromis a été choisi consciemment pour ce prototype ; **avant une vraie mise en production**, il faudra ajouter un petit backend (ex. une fonction serverless) qui reçoit les [webhooks Stripe](https://stripe.com/docs/webhooks) (`checkout.session.completed`), vérifie la signature, identifie le produit acheté, et enregistre le statut côté serveur plutôt que dans le `localStorage` du client.
- Les boutons « Activer Croissant / Pleine Lune (démo) » (utiles pour montrer l'interface débloquée sans payer) n'apparaissent plus sur l'écran de paiement — ils restent accessibles uniquement dans les réglages, et seulement en mode développeur (ouvrir l'app une fois avec `?dev=1` dans l'URL pour l'activer sur cet appareil). C'est une simple discrétion d'interface, pas une vraie barrière de sécurité : comme tout le contrôle du palier vit côté client, un utilisateur qui inspecte le code peut techniquement l'activer lui-même, quelle que soit l'interface. Là encore, un backend est la seule vraie solution.

## Prochaines étapes (hors périmètre de ce prototype)

- Backend léger (fonction serverless) pour vérifier les paiements Stripe via webhook et rendre le déblocage de palier infalsifiable.
- Notifications push.
- Version native iOS/Android.
- Implémentation réelle des tirages avancés (amour, carrière, croix celtique à 10 cartes) — actuellement listés comme inclus dans Pleine Lune mais pas encore construits.
- Géocodage du lieu de naissance (actuellement affiché mais non utilisé dans le calcul).
- Comptes multi-appareils (le prototype est mono-appareil, `localStorage`).
