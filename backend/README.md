# Astral — backend (Make)

Rôle unique de ce backend : savoir, de façon fiable et indépendante du navigateur, qui a payé quel plan — pour que l'accès Croissant/Pleine Lune survive à un changement d'appareil ou un cache vidé, ce que le frontend seul ne peut pas garantir.

Construit directement dans le compte Make de SL Agence (`My Team`, org `SL Agence`) — **pas de code à déployer**, tout vit dans Make (data store + scénarios). Ce README documente ce qui existe et comment le maintenir.

## Ce qui existe déjà, en ligne

- **Data store `Astral - Abonnements`** (id `159221`) — une ligne par client : clé = e-mail, champs `tier` (`free` / `croissant` / `pleinelune`), `stripeCustomerId`, `updatedAt`.
- **Webhook `Astral - Vérifier accès (status)`** (id `3512904`) — `https://hook.eu1.make.com/mzdre32o4kmflpiroykglrd603ij6oq4`. Appelé par l'app (au chargement, et depuis "Restaurer mon accès") avec `?email=...`, répond `{"tier":"..."}`. Déjà branché dans `horoscope-tarot/index.html` (`BACKEND_STATUS_URL`).
- **Scénario `Astral - Vérifier accès`** (id `6864133`, actif) — Webhook ci-dessus → lit le data store par e-mail → répond en JSON. Testé en direct (`curl`), fonctionne.

## Ce qu'il reste à construire : `Astral - Paiements Stripe`

Ce scénario doit : recevoir les événements Stripe (paiement réussi, résiliation), déterminer le plan selon le montant payé (399 = Croissant, 699 = Pleine Lune), et écrire `email → tier` dans le data store `Astral - Abonnements`.

**Le seul geste qui ne peut être automatisé** : connecter ton compte Stripe à Make (ça demande tes identifiants Stripe, qui ne doivent passer que par la fenêtre de connexion sécurisée de Make — jamais ailleurs). Une fois cette connexion créée, le reste (récupération des événements, écriture dans le data store) est repris en charge sans autre action de ta part.

### Ce que tu as à faire (une seule fois)

1. Dans Make, ouvre **Scénarios → Créer un nouveau scénario**.
2. Cherche l'app **Stripe**, choisis le module **"Watch Events"**.
3. Sur le champ Connexion, clique **"Ajouter"**, connecte ton compte Stripe (clé API ou connexion Stripe).
4. Tu peux t'arrêter là et enregistrer le scénario tel quel (pas besoin de choisir les événements ni de configurer la suite) — dis-le moi, je termine le reste (filtre sur les événements, écriture dans le data store, activation) directement.

## Limites connues (volontairement hors périmètre de cette v1)

- **Pas de changement de plan en libre-service** : passer de Croissant à Pleine Lune (ou l'inverse) demande de résilier puis souscrire à l'autre lien.
- **Détection du plan par montant payé**, pas par identifiant de prix Stripe — simple et suffisant tant qu'il n'y a pas de codes promo.
- **Administration** : consulter/corriger le statut d'un client se fait directement dans Make → Data stores → `Astral - Abonnements`.
- **`invoice.payment_failed` n'est pas traité** : un paiement qui échoue ne coupe pas l'accès immédiatement. Seule une résiliation confirmée (`customer.subscription.deleted`) repasse le client en gratuit.
