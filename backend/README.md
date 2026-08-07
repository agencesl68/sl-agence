# Astral — backend (Supabase)

Rôle unique de ce backend : savoir, de façon fiable et indépendante du navigateur, qui a payé quel plan — pour que l'accès Croissant/Pleine Lune survive à un changement d'appareil ou un cache vidé, ce que le frontend seul ne peut pas garantir.

[Supabase](https://supabase.com/) gratuit à ce volume : une table Postgres (`subscriptions`) + deux Edge Functions (Deno) qui la lisent/écrivent.

## Ce que ça fait

- **`stripe-webhook`** — reçu automatiquement par Stripe à chaque paiement ou résiliation. Vérifie que l'appel vient bien de Stripe (signature), détermine le plan acheté (Croissant ou Pleine Lune, via le montant payé), et enregistre `email → palier` dans la table `subscriptions`.
- **`status`** — appelée par l'app pour savoir quel palier correspond à un e-mail. Utilisée automatiquement à chaque ouverture de l'app (si un e-mail est déjà connu) et depuis le bouton "Restaurer mon accès" des réglages.

La table `subscriptions` n'est accessible qu'aux Edge Functions (clé de service, qui contourne les policies RLS) — jamais directement depuis le navigateur, même avec la clé publique du projet.

## Déploiement — étapes à faire une seule fois

### 1. Compte Supabase + projet

Crée un compte et un projet sur [supabase.com](https://supabase.com/dashboard) (gratuit). Note l'URL du projet (`https://<ref>.supabase.co`), visible dans **Project Settings → API**.

### 2. Créer la table

Dashboard → **SQL Editor → New query**, colle le contenu de [`supabase/schema.sql`](supabase/schema.sql) et exécute-le.

### 3. Outil en ligne de commande

```bash
npm install -g supabase
supabase login
```

Depuis le dossier `backend/` :

```bash
supabase link --project-ref <ta-reference-de-projet>
```

(la référence de projet est dans l'URL du dashboard : `supabase.com/dashboard/project/<ref>`)

### 4. Déployer les deux fonctions

```bash
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy status --no-verify-jwt
```

`--no-verify-jwt` est nécessaire : Stripe et les visiteurs anonymes de l'app n'ont pas de jeton Supabase à présenter (voir les commentaires en tête de chaque `index.ts`).

Les fonctions sont alors joignables sur :
```
https://<ta-reference-de-projet>.supabase.co/functions/v1/stripe-webhook
https://<ta-reference-de-projet>.supabase.co/functions/v1/status
```

**Envoie-moi** `https://<ta-reference-de-projet>.supabase.co/functions/v1` (sans le nom de fonction à la fin) — c'est ce que je colle dans `BACKEND_STATUS_URL` côté app.

### 5. Définir les secrets

```bash
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set ALLOWED_ORIGIN=https://slagence.fr
```

(`SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` sont fournis automatiquement par Supabase à l'intérieur de chaque Edge Function — inutile de les définir toi-même, et leurs noms sont d'ailleurs réservés : `supabase secrets set` refuse tout nom commençant par `SUPABASE_`.)

La valeur `whsec_...` vient de l'étape suivante :

### 6. Créer le webhook côté Stripe

Dashboard Stripe → **Développeurs → Webhooks → Ajouter un endpoint** :
- URL : `https://<ta-reference-de-projet>.supabase.co/functions/v1/stripe-webhook`
- Événements à écouter : `checkout.session.completed` et `customer.subscription.deleted`

Stripe affiche alors la **clé de signature** (`whsec_...`) — c'est la valeur à donner à `supabase secrets set STRIPE_WEBHOOK_SECRET=...` ci-dessus (redéploie les fonctions après coup si tu avais déjà fait l'étape 4 : `supabase functions deploy stripe-webhook --no-verify-jwt`).

### 7. Tester

Fais un paiement en mode test (carte `4242 4242 4242 4242`) sur un des deux Payment Links, puis vérifie :

```bash
curl "https://<ta-reference-de-projet>.supabase.co/functions/v1/status?email=l-email-utilise-au-paiement@exemple.fr"
# doit répondre {"tier":"croissant"} ou {"tier":"pleinelune"}
```

## Structure du dossier

```
backend/
  supabase/
    schema.sql                        — table à créer une fois (étape 2)
    functions/
      _shared/logic.js                — vérif. signature Stripe, mapping montant→palier (pur, testé)
      _shared/handlers.js             — logique des deux routes (pure, testée avec un client Supabase simulé)
      stripe-webhook/index.ts         — point d'entrée Deno, déployé tel quel
      status/index.ts                 — point d'entrée Deno, déployé tel quel
  test-supabase.mjs                   — tests (node backend/test-supabase.mjs), aucun projet requis
```

## Limites connues (volontairement hors périmètre de cette v1)

- **Pas de changement de plan en libre-service** : passer de Croissant à Pleine Lune (ou l'inverse) demande de résilier puis souscrire à l'autre lien — pas de portail client Stripe branché pour l'instant.
- **Détection du plan par montant payé**, pas par identifiant de prix Stripe — simple et suffisant tant qu'il n'y a pas de codes promo. Si un code promo change un jour le montant réellement facturé, il faudra passer à une détection par Price ID (ce qui demande la clé secrète du compte Stripe, pas seulement le secret du webhook).
- **Pas d'interface d'administration.** Pour vérifier ou corriger manuellement le statut d'un client, direct dans le Dashboard Supabase → Table Editor → `subscriptions`.
- **`invoice.payment_failed` n'est pas traité** : un paiement qui échoue ne coupe pas l'accès immédiatement (Stripe retente automatiquement). Seule une résiliation confirmée (`customer.subscription.deleted`) repasse le client en gratuit.
