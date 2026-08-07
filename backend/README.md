# Astral — backend (Cloudflare Worker)

Rôle unique de ce backend : savoir, de façon fiable et indépendante du navigateur, qui a payé quel plan — pour que l'accès Croissant/Pleine Lune survive à un changement d'appareil ou un cache vidé, ce que le frontend seul ne peut pas garantir.

Pas de base de données classique, pas de serveur à maintenir : un [Cloudflare Worker](https://workers.cloudflare.com/) (gratuit à ce volume) + une table clé/valeur (Workers KV) qui associe un e-mail à un palier.

## Ce que ça fait

- `POST /webhook/stripe` — reçu automatiquement par Stripe à chaque paiement ou résiliation. Vérifie que l'appel vient bien de Stripe (signature), détermine le plan acheté (Croissant ou Pleine Lune, via le montant payé), et enregistre `email → palier`.
- `GET /status?email=...` — appelé par l'app pour savoir quel palier correspond à un e-mail. Utilisé automatiquement à chaque ouverture de l'app (si un e-mail est déjà connu) et depuis le bouton "Restaurer mon accès" des réglages.

## Déploiement — étapes à faire une seule fois

### 1. Compte Cloudflare + outil en ligne de commande

```bash
npm install -g wrangler
wrangler login
```

(crée un compte gratuit sur [dash.cloudflare.com](https://dash.cloudflare.com) si tu n'en as pas — `wrangler login` ouvre le navigateur pour t'y connecter)

### 2. Créer la table clé/valeur

Depuis le dossier `backend/` :

```bash
wrangler kv namespace create STATUS_KV
```

La commande affiche un `id`. Colle-le dans `wrangler.toml`, à la place de `REMPLACE_MOI_APRES_wrangler_kv_namespace_create`.

### 3. Déployer le Worker

```bash
wrangler deploy
```

Note l'URL affichée à la fin (ex. `https://astral-backend.<ton-sous-domaine>.workers.dev`) — **envoie-la-moi**, c'est ce que je colle dans `BACKEND_STATUS_URL` côté app.

### 4. Créer le webhook côté Stripe

Dans le dashboard Stripe → **Développeurs → Webhooks → Ajouter un endpoint** :
- URL : `https://<ton-worker>.workers.dev/webhook/stripe`
- Événements à écouter : `checkout.session.completed` et `customer.subscription.deleted`

Une fois créé, Stripe affiche une **clé de signature** (commence par `whsec_...`). C'est un secret : ne la colle nulle part dans le code, seulement à l'étape suivante.

### 5. Donner le secret au Worker

```bash
wrangler secret put STRIPE_WEBHOOK_SECRET
```

(colle la valeur `whsec_...` quand la commande te la demande — elle ne sera jamais visible dans le code ni sur GitHub)

### 6. Tester

Fais un paiement en mode test (carte `4242 4242 4242 4242`) sur un des deux Payment Links, puis vérifie que le statut est bien enregistré :

```bash
curl "https://<ton-worker>.workers.dev/status?email=l-email-utilise-au-paiement@exemple.fr"
# doit répondre {"tier":"croissant"} ou {"tier":"pleinelune"}
```

## Limites connues (volontairement hors périmètre de cette v1)

- **Pas de changement de plan en libre-service** : passer de Croissant à Pleine Lune (ou l'inverse) demande de résilier puis souscrire à l'autre lien — pas de portail client Stripe branché pour l'instant.
- **Détection du plan par montant payé**, pas par identifiant de prix Stripe — simple et suffisant tant qu'il n'y a pas de codes promo. Si un code promo change un jour le montant réellement facturé, il faudra passer à une détection par Price ID (ce qui demande la clé secrète du compte Stripe, pas seulement le secret du webhook).
- **Pas d'interface d'administration.** Pour vérifier ou corriger manuellement le statut d'un client en cas de souci, ça se fait en ligne de commande :
  ```bash
  wrangler kv key get "email:client@exemple.fr" --namespace-id=<id-du-namespace>
  wrangler kv key put "email:client@exemple.fr" '{"tier":"pleinelune","updatedAt":"..."}' --namespace-id=<id-du-namespace>
  ```
- **`invoice.payment_failed` n'est pas traité** : un paiement qui échoue ne coupe pas l'accès immédiatement (Stripe retente automatiquement). Seule une résiliation confirmée (`customer.subscription.deleted`) repasse le client en gratuit.
