/**
 * Logique de traitement des requêtes, injectée avec un client Supabase
 * (le vrai en prod via les entry points index.ts, un mock en test —
 * voir backend/test-supabase.mjs). Ne dépend d'aucune API Deno, donc
 * testable directement avec Node.
 */
import { tierFromAmount, extractEmail, verifyStripeSignature } from './logic.js';

function jsonResponse(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {})
  });
}

function corsHeaders(allowedOrigin) {
  return {
    'Access-Control-Allow-Origin': allowedOrigin || 'https://slagence.fr',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

/**
 * ctx = { supabase, env: { STRIPE_WEBHOOK_SECRET } }
 */
export async function handleWebhook(request, ctx) {
  const signatureHeader = request.headers.get('Stripe-Signature');
  const payload = await request.text();
  const secret = ctx.env.STRIPE_WEBHOOK_SECRET;

  if (!signatureHeader || !secret) {
    return new Response('Signature manquante', { status: 400 });
  }
  if (!(await verifyStripeSignature(payload, signatureHeader, secret))) {
    return new Response('Signature invalide', { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (e) {
    return new Response('Payload invalide', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    await onCheckoutCompleted(event.data.object, ctx.supabase);
  } else if (event.type === 'customer.subscription.deleted') {
    await onSubscriptionDeleted(event.data.object, ctx.supabase);
  }
  // Autres événements non traités dans cette v1 — voir README, "Limites connues".

  return jsonResponse({ received: true }, 200);
}

async function onCheckoutCompleted(session, supabase) {
  const email = extractEmail(session);
  const tier = tierFromAmount(session.amount_total);
  if (!email || !tier) return;

  await supabase.from('subscriptions').upsert({
    email: email,
    tier: tier,
    stripe_customer_id: session.customer || null,
    updated_at: new Date().toISOString()
  });
}

async function onSubscriptionDeleted(subscription, supabase) {
  const customerId = subscription.customer;
  if (!customerId) return;

  await supabase
    .from('subscriptions')
    .update({ tier: 'free', updated_at: new Date().toISOString() })
    .eq('stripe_customer_id', customerId);
}

/**
 * ctx = { supabase, env: { ALLOWED_ORIGIN } }
 */
export async function handleStatus(request, ctx) {
  const headers = corsHeaders(ctx.env.ALLOWED_ORIGIN);

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: headers });
  }

  const url = new URL(request.url);
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  if (!email) {
    return jsonResponse({ error: 'email requis' }, 400, headers);
  }

  const { data } = await ctx.supabase.from('subscriptions').select('tier').eq('email', email).maybeSingle();
  const tier = data ? data.tier : 'free';
  return jsonResponse({ tier: tier }, 200, headers);
}
