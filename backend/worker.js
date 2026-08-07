/**
 * Astral — backend minimal (Cloudflare Worker)
 *
 * Rôle : recevoir les webhooks Stripe pour savoir qui a payé quoi, et
 * répondre "quel est le palier de cet e-mail ?" au frontend statique.
 * Aucun compte, aucun mot de passe : l'e-mail est le seul identifiant,
 * saisi une fois au moment du paiement puis réutilisé pour restaurer
 * l'accès sur un autre appareil.
 *
 * Stockage : une seule table clé/valeur (Workers KV) —
 *   "email:<email>"        -> { tier, stripeCustomerId, updatedAt }
 *   "cust:<stripeCustomerId>" -> "<email>"   (index inverse, utilisé
 *                                              quand Stripe annule un
 *                                              abonnement : l'event ne
 *                                              contient pas l'e-mail)
 *
 * Voir README.md dans ce dossier pour le déploiement pas à pas.
 */

// Montants (en centimes, devise EUR) qui identifient chaque plan.
// Sert à distinguer Croissant/Pleine Lune à la réception du webhook,
// sans avoir besoin d'appeler l'API Stripe (donc sans clé secrète de
// compte ici — seul le secret de signature du webhook est nécessaire).
// ⚠️ Si un jour un code promo change le montant réellement facturé,
// cette détection par montant devient peu fiable : il faudra alors
// passer à une détection par Price ID via l'API Stripe.
const PRICE_CENTS_CROISSANT = 399;
const PRICE_CENTS_PLEINELUNE = 699;

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60; // rejette les webhooks rejoués plus de 5 min après coup

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(env) });
    }

    if (url.pathname === '/status' && request.method === 'GET') {
      return handleStatus(url, env);
    }

    if (url.pathname === '/webhook/stripe' && request.method === 'POST') {
      return handleStripeWebhook(request, env);
    }

    return new Response('Not found', { status: 404 });
  }
};

function corsHeaders(env) {
  return {
    'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || 'https://slagence.fr',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

function jsonResponse(body, status, extraHeaders) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, extraHeaders || {})
  });
}

async function handleStatus(url, env) {
  const headers = corsHeaders(env);
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  if (!email) {
    return jsonResponse({ error: 'email requis' }, 400, headers);
  }
  const raw = await env.STATUS_KV.get('email:' + email);
  const tier = raw ? (JSON.parse(raw).tier || 'free') : 'free';
  return jsonResponse({ tier: tier }, 200, headers);
}

async function handleStripeWebhook(request, env) {
  const signatureHeader = request.headers.get('Stripe-Signature');
  const payload = await request.text();

  if (!signatureHeader || !env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Signature manquante', { status: 400 });
  }
  const valid = await verifyStripeSignature(payload, signatureHeader, env.STRIPE_WEBHOOK_SECRET);
  if (!valid) {
    return new Response('Signature invalide', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    return new Response('Payload invalide', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    await onCheckoutCompleted(event.data.object, env);
  } else if (event.type === 'customer.subscription.deleted') {
    await onSubscriptionDeleted(event.data.object, env);
  }
  // Autres événements (paiement échoué, changement de plan, etc.) ne
  // sont pas traités dans cette v1 minimale — voir README, section
  // "Limites connues".

  return jsonResponse({ received: true }, 200);
}

async function onCheckoutCompleted(session, env) {
  const email = extractEmail(session);
  const customerId = session.customer || null;
  const tier = tierFromAmount(session.amount_total);

  if (!email || !tier) return; // paiement hors des deux plans connus, ou e-mail absent : on ignore

  await env.STATUS_KV.put('email:' + email, JSON.stringify({
    tier: tier,
    stripeCustomerId: customerId,
    updatedAt: new Date().toISOString()
  }));
  if (customerId) {
    await env.STATUS_KV.put('cust:' + customerId, email);
  }
}

async function onSubscriptionDeleted(subscription, env) {
  const customerId = subscription.customer;
  if (!customerId) return;
  const email = await env.STATUS_KV.get('cust:' + customerId);
  if (!email) return;

  const raw = await env.STATUS_KV.get('email:' + email);
  const current = raw ? JSON.parse(raw) : {};
  await env.STATUS_KV.put('email:' + email, JSON.stringify(Object.assign({}, current, {
    tier: 'free',
    updatedAt: new Date().toISOString()
  })));
}

function extractEmail(session) {
  var email = (session.customer_details && session.customer_details.email) || session.customer_email || '';
  return email.trim().toLowerCase() || null;
}

function tierFromAmount(amountTotal) {
  if (amountTotal === PRICE_CENTS_CROISSANT) return 'croissant';
  if (amountTotal === PRICE_CENTS_PLEINELUNE) return 'pleinelune';
  return null;
}

/**
 * Vérifie la signature d'un webhook Stripe sans dépendre du SDK Stripe
 * (non nécessaire ici, et plus simple à auditer). Implémente le schéma
 * documenté par Stripe : HMAC-SHA256 de "timestamp.payload" avec le
 * secret de signature de l'endpoint webhook.
 * https://docs.stripe.com/webhooks#verify-manually
 */
async function verifyStripeSignature(payload, signatureHeader, secret) {
  var parts = {};
  signatureHeader.split(',').forEach(function (kv) {
    var idx = kv.indexOf('=');
    if (idx > -1) parts[kv.slice(0, idx)] = kv.slice(idx + 1);
  });
  var timestamp = parts.t;
  var expectedSig = parts.v1;
  if (!timestamp || !expectedSig) return false;

  var ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - parseInt(timestamp, 10));
  if (isNaN(ageSeconds) || ageSeconds > SIGNATURE_TOLERANCE_SECONDS) return false;

  var signedPayload = timestamp + '.' + payload;
  var key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  var sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  var computedHex = Array.prototype.map.call(new Uint8Array(sigBuffer), function (b) {
    return b.toString(16).padStart(2, '0');
  }).join('');

  return timingSafeEqual(computedHex, expectedSig);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  var mismatch = 0;
  for (var i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// Exporté uniquement pour les tests unitaires (voir backend/test.js) ;
// n'affecte pas le comportement du Worker en production.
export { tierFromAmount, extractEmail, verifyStripeSignature, timingSafeEqual };
