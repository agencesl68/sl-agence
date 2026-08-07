// Tests de la version Supabase du backend — logique pure +
// gestionnaires de requêtes avec un client Supabase simulé en mémoire
// (aucun projet Supabase réel requis). Lancer avec :
//   node backend/test-supabase.mjs
import { tierFromAmount, extractEmail, verifyStripeSignature, timingSafeEqual } from './supabase/functions/_shared/logic.js';
import { handleWebhook, handleStatus } from './supabase/functions/_shared/handlers.js';

let passed = 0;
let failed = 0;
function check(cond, label) {
  if (cond) { passed++; console.log('  ok  -', label); }
  else { failed++; console.log('  FAIL -', label); }
}

/* ================= logique pure (identique à la version Cloudflare) ================= */
console.log('tierFromAmount / extractEmail / timingSafeEqual');
check(tierFromAmount(399) === 'croissant', '399 -> croissant');
check(tierFromAmount(699) === 'pleinelune', '699 -> pleinelune');
check(tierFromAmount(1000) === null, 'montant inconnu -> null');
check(extractEmail({ customer_details: { email: '  Test@Example.com ' } }) === 'test@example.com', 'trim + lowercase');
check(extractEmail({}) === null, 'email absent -> null');
check(timingSafeEqual('abc', 'abc') === true, 'comparaison identique -> true');
check(timingSafeEqual('abc', 'abd') === false, 'comparaison différente -> false');

async function sign(payload, timestamp, secret) {
  const signedPayload = timestamp + '.' + payload;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  return Array.from(new Uint8Array(sigBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

console.log('\nverifyStripeSignature');
const secret = 'whsec_test_secret';
const payload = JSON.stringify({ type: 'checkout.session.completed' });
const now = Math.floor(Date.now() / 1000);
const validSig = await sign(payload, String(now), secret);
check(await verifyStripeSignature(payload, `t=${now},v1=${validSig}`, secret) === true, 'signature valide -> true');
check(await verifyStripeSignature(payload, `t=${now},v1=deadbeef`, secret) === false, 'signature invalide -> false');

/* ================= mock client Supabase (en mémoire) ================= */
function makeMockSupabase() {
  const rows = new Map(); // email -> row
  return {
    from(table) {
      return {
        upsert: async (obj) => { rows.set(obj.email, obj); return { data: [obj], error: null }; },
        update: (patch) => ({
          eq: async (col, val) => {
            for (const [key, row] of rows) {
              if (row[col] === val) rows.set(key, Object.assign({}, row, patch));
            }
            return { data: null, error: null };
          }
        }),
        select: () => ({
          eq: (col, val) => ({
            maybeSingle: async () => {
              for (const row of rows.values()) {
                if (row[col] === val) return { data: row, error: null };
              }
              return { data: null, error: null };
            }
          })
        })
      };
    },
    _rows: rows
  };
}

const supabase = makeMockSupabase();
const env = { STRIPE_WEBHOOK_SECRET: secret, ALLOWED_ORIGIN: 'https://slagence.fr' };

async function postWebhook(eventBody) {
  const body = JSON.stringify(eventBody);
  const timestamp = String(Math.floor(Date.now() / 1000));
  const sig = await sign(body, timestamp, secret);
  const request = new Request('https://fn.example/stripe-webhook', {
    method: 'POST',
    headers: { 'Stripe-Signature': `t=${timestamp},v1=${sig}` },
    body: body
  });
  return handleWebhook(request, { supabase, env });
}

async function getStatus(email) {
  const request = new Request(`https://fn.example/status?email=${encodeURIComponent(email)}`, { method: 'GET' });
  const res = await handleStatus(request, { supabase, env });
  return res.json();
}

console.log('\nScénario : nouveau client Croissant');
{
  const res = await getStatus('nouvelle@example.fr');
  check(res.tier === 'free', 'e-mail inconnu -> free');
}
{
  const res = await postWebhook({ type: 'checkout.session.completed', data: { object: { amount_total: 399, customer: 'cus_1', customer_details: { email: 'Nouvelle@Example.fr' } } } });
  check(res.status === 200, 'webhook accepté (200)');
  const status = await getStatus('nouvelle@example.fr');
  check(status.tier === 'croissant', 'statut -> croissant');
}

console.log('\nScénario : Pleine Lune puis résiliation');
{
  await postWebhook({ type: 'checkout.session.completed', data: { object: { amount_total: 699, customer: 'cus_2', customer_details: { email: 'fidele@example.fr' } } } });
  check((await getStatus('fidele@example.fr')).tier === 'pleinelune', 'après paiement -> pleinelune');
}
{
  const res = await postWebhook({ type: 'customer.subscription.deleted', data: { object: { customer: 'cus_2' } } });
  check(res.status === 200, 'webhook résiliation accepté (200)');
  check((await getStatus('fidele@example.fr')).tier === 'free', "après résiliation -> free (via stripe_customer_id, pas d'index séparé nécessaire avec Postgres)");
}

console.log('\nScénario : sécurité');
{
  const request = new Request('https://fn.example/stripe-webhook', {
    method: 'POST',
    headers: { 'Stripe-Signature': 't=123,v1=signaturebidon' },
    body: JSON.stringify({ type: 'checkout.session.completed', data: { object: { amount_total: 399, customer: 'cus_x', customer_details: { email: 'attaquant@example.fr' } } } })
  });
  const res = await handleWebhook(request, { supabase, env });
  check(res.status === 400, 'signature invalide -> rejeté (400)');
  check((await getStatus('attaquant@example.fr')).tier === 'free', 'aucun accès accordé via webhook non signé');
}
{
  const request = new Request('https://fn.example/status', { method: 'GET' });
  const res = await handleStatus(request, { supabase, env });
  check(res.status === 400, 'GET status sans email -> 400');
}
{
  const request = new Request('https://fn.example/status?email=nouvelle@example.fr', { method: 'GET' });
  const res = await handleStatus(request, { supabase, env });
  check(res.headers.get('Access-Control-Allow-Origin') === 'https://slagence.fr', 'en-tête CORS correct');
}

console.log(`\n${passed} tests réussis, ${failed} échoués.`);
if (failed > 0) process.exit(1);
