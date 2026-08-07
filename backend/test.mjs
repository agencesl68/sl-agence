// Tests unitaires de la logique pure du Worker (pas de déploiement
// requis). Lancer avec : node backend/test.mjs
import { tierFromAmount, extractEmail, verifyStripeSignature, timingSafeEqual } from './worker.js';

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, label) {
  const ok = actual === expected;
  if (ok) {
    passed++;
    console.log('  ok  -', label);
  } else {
    failed++;
    console.log('  FAIL -', label, '| attendu:', JSON.stringify(expected), 'obtenu:', JSON.stringify(actual));
  }
}

async function assertAsyncEqual(promise, expected, label) {
  const actual = await promise;
  assertEqual(actual, expected, label);
}

console.log('tierFromAmount');
assertEqual(tierFromAmount(399), 'croissant', '399 centimes -> croissant');
assertEqual(tierFromAmount(699), 'pleinelune', '699 centimes -> pleinelune');
assertEqual(tierFromAmount(1000), null, 'montant inconnu -> null');
assertEqual(tierFromAmount(undefined), null, 'montant absent -> null');

console.log('extractEmail');
assertEqual(extractEmail({ customer_details: { email: '  Test@Example.com ' } }), 'test@example.com', 'trim + lowercase depuis customer_details.email');
assertEqual(extractEmail({ customer_email: 'a@b.com' }), 'a@b.com', 'fallback sur customer_email');
assertEqual(extractEmail({}), null, 'absent -> null');
assertEqual(extractEmail({ customer_details: { email: '' } }), null, 'email vide -> null');

console.log('timingSafeEqual');
assertEqual(timingSafeEqual('abc', 'abc'), true, 'chaînes identiques -> true');
assertEqual(timingSafeEqual('abc', 'abd'), false, 'chaînes différentes -> false');
assertEqual(timingSafeEqual('abc', 'ab'), false, 'longueurs différentes -> false');

console.log('verifyStripeSignature');
const secret = 'whsec_test_secret';
async function sign(payload, timestamp) {
  const signedPayload = timestamp + '.' + payload;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  return Array.prototype.map.call(new Uint8Array(sigBuffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

const payload = JSON.stringify({ type: 'checkout.session.completed' });
const now = Math.floor(Date.now() / 1000);
const validSig = await sign(payload, String(now));
await assertAsyncEqual(verifyStripeSignature(payload, `t=${now},v1=${validSig}`, secret), true, 'signature valide et récente -> true');
await assertAsyncEqual(verifyStripeSignature(payload, `t=${now},v1=${validSig}deadbeef`, secret), false, 'signature altérée -> false');
await assertAsyncEqual(verifyStripeSignature('{"tampered":true}', `t=${now},v1=${validSig}`, secret), false, 'payload modifié après signature -> false');
const oldTimestamp = now - 3600; // 1h dans le passé
const oldSig = await sign(payload, String(oldTimestamp));
await assertAsyncEqual(verifyStripeSignature(payload, `t=${oldTimestamp},v1=${oldSig}`, secret), false, 'signature trop ancienne (rejeu) -> false');
await assertAsyncEqual(verifyStripeSignature(payload, '', secret), false, 'en-tête de signature vide -> false');

console.log(`\n${passed} tests réussis, ${failed} échoués.`);
if (failed > 0) process.exit(1);
