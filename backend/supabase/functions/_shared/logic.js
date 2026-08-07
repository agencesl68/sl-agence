/**
 * Logique pure, sans dépendance Deno/Supabase — importable telle
 * quelle depuis les Edge Functions (runtime Deno) et depuis Node pour
 * les tests unitaires (backend/test-supabase.mjs). Identique en
 * substance à l'ancienne version Cloudflare Worker de ce projet.
 */

// Montants (centimes, EUR) qui identifient chaque plan — voir la même
// remarque que côté README sur les limites de cette approche.
export const PRICE_CENTS_CROISSANT = 399;
export const PRICE_CENTS_PLEINELUNE = 699;

const SIGNATURE_TOLERANCE_SECONDS = 5 * 60;

export function tierFromAmount(amountTotal) {
  if (amountTotal === PRICE_CENTS_CROISSANT) return 'croissant';
  if (amountTotal === PRICE_CENTS_PLEINELUNE) return 'pleinelune';
  return null;
}

export function extractEmail(session) {
  const email = (session.customer_details && session.customer_details.email) || session.customer_email || '';
  const trimmed = email.trim().toLowerCase();
  return trimmed || null;
}

export function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Vérifie la signature d'un webhook Stripe sans le SDK Stripe :
 * HMAC-SHA256 de "timestamp.payload" avec le secret de signature.
 * https://docs.stripe.com/webhooks#verify-manually
 */
export async function verifyStripeSignature(payload, signatureHeader, secret) {
  const parts = {};
  signatureHeader.split(',').forEach((kv) => {
    const idx = kv.indexOf('=');
    if (idx > -1) parts[kv.slice(0, idx)] = kv.slice(idx + 1);
  });
  const timestamp = parts.t;
  const expectedSig = parts.v1;
  if (!timestamp || !expectedSig) return false;

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - parseInt(timestamp, 10));
  if (isNaN(ageSeconds) || ageSeconds > SIGNATURE_TOLERANCE_SECONDS) return false;

  const signedPayload = timestamp + '.' + payload;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  const computedHex = Array.from(new Uint8Array(sigBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');

  return timingSafeEqual(computedHex, expectedSig);
}
