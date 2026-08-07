// Simule un déploiement complet (KV en mémoire) pour vérifier le
// cycle entier : paiement -> webhook -> /status -> résiliation -> /status.
// Lancer avec : node backend/test-integration.mjs
import worker from './worker.js';

function makeMockKV() {
  const store = new Map();
  return {
    async get(key) { return store.has(key) ? store.get(key) : null; },
    async put(key, value) { store.set(key, value); },
    _store: store
  };
}

const env = {
  ALLOWED_ORIGIN: 'https://slagence.fr',
  STRIPE_WEBHOOK_SECRET: 'whsec_integration_test',
  STATUS_KV: makeMockKV()
};

async function sign(payload, timestamp, secret) {
  const signedPayload = timestamp + '.' + payload;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  return Array.prototype.map.call(new Uint8Array(sigBuffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function postWebhook(eventBody) {
  const payload = JSON.stringify(eventBody);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const sig = await sign(payload, timestamp, env.STRIPE_WEBHOOK_SECRET);
  const request = new Request('https://worker.example/webhook/stripe', {
    method: 'POST',
    headers: { 'Stripe-Signature': `t=${timestamp},v1=${sig}` },
    body: payload
  });
  return worker.fetch(request, env);
}

async function getStatus(email) {
  const request = new Request(`https://worker.example/status?email=${encodeURIComponent(email)}`, { method: 'GET' });
  const res = await worker.fetch(request, env);
  return res.json();
}

let failed = 0;
function check(cond, label) {
  if (cond) console.log('  ok  -', label);
  else { failed++; console.log('  FAIL -', label); }
}

console.log('Scénario : nouveau client Croissant');
{
  const res = await getStatus('nouvelle@example.fr');
  check(res.tier === 'free', 'e-mail inconnu -> free avant tout paiement');
}
{
  const res = await postWebhook({
    type: 'checkout.session.completed',
    data: { object: { amount_total: 399, customer: 'cus_croissant_1', customer_details: { email: 'Nouvelle@Example.fr' } } }
  });
  check(res.status === 200, 'webhook checkout.session.completed accepté (200)');
}
{
  const res = await getStatus('nouvelle@example.fr');
  check(res.tier === 'croissant', 'statut mis à jour -> croissant (email normalisé en minuscule)');
}

console.log('\nScénario : client Pleine Lune puis résiliation');
{
  await postWebhook({
    type: 'checkout.session.completed',
    data: { object: { amount_total: 699, customer: 'cus_pleinelune_1', customer_details: { email: 'fidele@example.fr' } } }
  });
  const res = await getStatus('fidele@example.fr');
  check(res.tier === 'pleinelune', 'après paiement -> pleinelune');
}
{
  const res = await postWebhook({
    type: 'customer.subscription.deleted',
    data: { object: { customer: 'cus_pleinelune_1' } }
  });
  check(res.status === 200, 'webhook subscription.deleted accepté (200)');
}
{
  const res = await getStatus('fidele@example.fr');
  check(res.tier === 'free', 'après résiliation -> free (retrouvé via l\'index customerId -> email)');
}

console.log('\nScénario : sécurité');
{
  const request = new Request('https://worker.example/webhook/stripe', {
    method: 'POST',
    headers: { 'Stripe-Signature': 't=123,v1=signaturebidon' },
    body: JSON.stringify({ type: 'checkout.session.completed', data: { object: { amount_total: 399, customer: 'cus_x', customer_details: { email: 'attaquant@example.fr' } } } })
  });
  const res = await worker.fetch(request, env);
  check(res.status === 400, 'webhook avec signature invalide -> rejeté (400)');
  const statusAfter = await getStatus('attaquant@example.fr');
  check(statusAfter.tier === 'free', 'aucun accès accordé via un webhook non signé correctement');
}
{
  const request = new Request('https://worker.example/status', { method: 'GET' });
  const res = await worker.fetch(request, env);
  check(res.status === 400, 'GET /status sans email -> 400');
}
{
  const request = new Request('https://worker.example/status?email=nouvelle@example.fr', { method: 'GET' });
  const res = await worker.fetch(request, env);
  check(res.headers.get('Access-Control-Allow-Origin') === 'https://slagence.fr', 'en-tête CORS présent et correct sur /status');
}

console.log(`\n${failed === 0 ? 'Tous les tests passent.' : failed + ' test(s) en échec.'}`);
if (failed > 0) process.exit(1);
