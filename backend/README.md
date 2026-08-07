# Astral — backend (Make)

Rôle unique de ce backend : savoir, de façon fiable et indépendante du navigateur, qui a payé quel plan — pour que l'accès Croissant/Pleine Lune survive à un changement d'appareil ou un cache vidé, ce que le frontend seul ne peut pas garantir.

Construit directement dans le compte Make de SL Agence (`My Team`, org `SL Agence`) — **pas de code à déployer**, tout vit dans Make (data store + scénarios). Ce README documente ce qui existe et comment le maintenir.

## État : entièrement construit et testé en direct

- **Data store `Astral - Abonnements`** (id `159221`) — une ligne par client : clé = e-mail, champs `tier` (`free` / `croissant` / `pleinelune`), `stripeCustomerId`, `updatedAt`.
- **Scénario `Astral - Vérifier accès`** (id `6864133`, actif) — webhook `https://hook.eu1.make.com/mzdre32o4kmflpiroykglrd603ij6oq4?email=...` → lit le data store → répond `{"tier":"..."}`. Déjà branché dans `horoscope-tarot/index.html` (`BACKEND_STATUS_URL`).
- **Scénario `Astral - Paiements Stripe`** (id `6864266`, actif) — webhook dédié qui reçoit les événements Stripe, vérifie un jeton secret dans l'URL (voir plus bas), détermine le plan selon le montant payé (399 → Croissant, 699 → Pleine Lune) et écrit `email → tier` dans le data store ; sur résiliation (`customer.subscription.deleted`), retrouve le client par `stripeCustomerId` et repasse son palier à `free`.

Testé en conditions réelles (requêtes HTTP simulant Stripe) : paiement Croissant, paiement Pleine Lune, résiliation, et tentative avec un jeton invalide (correctement rejetée, aucun accès accordé). Les quatre cas se comportent comme attendu.

## Pourquoi pas une vraie vérification de signature Stripe

Make n'a pas de fonction HMAC-SHA256 native accessible sans code, et connecter Stripe *à* Make (pour utiliser son intégration native, qui vérifie la signature automatiquement) demande de coller une clé API Stripe dans la fenêtre de connexion de Make — un geste qui doit rester entièrement à la charge du propriétaire du compte. Le compromis retenu : un jeton secret dans l'URL du webhook, vérifié par un filtre avant toute écriture dans la base. Ce n'est pas aussi robuste qu'une signature cryptographique, mais tant que l'URL complète (avec le jeton) reste privée, c'est une protection réelle — et ça ne demande qu'un copier-coller dans Stripe, sans jamais donner accès au compte Stripe lui-même à quoi que ce soit d'externe.

## Le seul geste restant : déclarer le webhook côté Stripe

Aucune connexion à créer dans Make. Juste, dans le dashboard Stripe :

1. **Développeurs → Webhooks → Ajouter un endpoint**
2. URL : *(donnée séparément — jamais commitée ici, voir la conversation)*
3. Événements à écouter : `checkout.session.completed` et `customer.subscription.deleted`
4. Enregistrer.

C'est tout — dès le premier vrai paiement, le data store se met à jour automatiquement.

## Limites connues (volontairement hors périmètre de cette v1)

- **Pas de changement de plan en libre-service** : passer de Croissant à Pleine Lune (ou l'inverse) demande de résilier puis souscrire à l'autre lien.
- **Détection du plan par montant payé**, pas par identifiant de prix Stripe — simple et suffisant tant qu'il n'y a pas de codes promo.
- **Administration** : consulter/corriger le statut d'un client se fait directement dans Make → Data stores → `Astral - Abonnements`.
- **`invoice.payment_failed` n'est pas traité** : un paiement qui échoue ne coupe pas l'accès immédiatement. Seule une résiliation confirmée (`customer.subscription.deleted`) repasse le client en gratuit.
