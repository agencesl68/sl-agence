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
- **Horoscope du jour** basé sur le signe solaire réel (calculé à partir de la date de naissance), avec version courte gratuite et rapport complet Premium (Soleil + Lune + Ascendant + modalité astrologique).
- **Distinction gratuit / Premium** explicite : placements du thème floutés et verrouillés, tirages avancés listés avec cadenas, historique (« Journal ») réservé à Premium.
- **Paywall simulé** (6,99 €/mois) : aucun paiement réel, avec un bouton « Activer Premium (démo) » clairement identifié pour explorer l'interface déverrouillée.
- **Compte minimal** : profil (prénom, naissance, statut premium démo) persistant en `localStorage`, réinitialisable depuis les réglages.

## Approximation du thème natal

Ce prototype n'embarque pas de moteur d'éphémérides. Pour rester 100 % statique (pas de backend), il utilise :

- **Signe solaire** : calcul exact à partir des dates de début/fin de chaque signe.
- **Signe lunaire** : approximation par cycle fixe (~2,28 jours/signe) à partir d'une date de référence — donne une valeur stable et plausible, pas une position astronomique réelle.
- **Ascendant** : approximation à partir de l'heure de naissance (un signe toutes les ~2h à partir d'un lever solaire théorique à 6h). Non calculé si l'heure de naissance est inconnue.

Ces limites sont indiquées dans l'app (icône ℹ sur l'onglet Thème). Pour une vraie mise en production, brancher un moteur d'éphémérides (Swiss Ephemeris ou une API d'astrologie) et un service de géocodage pour le lieu de naissance, comme recommandé dans le brief produit.

## Génération du texte d'horoscope

Les textes sont composés (pas copiés-collés statiques) à partir de banques de phrases courtes combinées selon : élément du signe (Feu/Terre/Air/Eau), modalité (Cardinal/Fixe/Mutable), signe lunaire et ascendant, plus une ouverture/clôture tirées aléatoirement — le tout sélectionné de façon déterministe par jour pour rester stable. En production, cette étape serait remplacée par un LLM alimenté par les données réelles du thème, comme suggéré dans le brief.

## Prochaines étapes (hors périmètre de ce prototype)

- Paiement réel et gestion d'abonnement.
- Notifications push.
- Version native iOS/Android.
- Tirages avancés (amour, carrière, croix celtique à 10 cartes) et géocodage du lieu de naissance.
- Backend + comptes multi-appareils (le prototype est mono-appareil, `localStorage`).
