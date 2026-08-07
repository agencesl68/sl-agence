// Reçoit les webhooks Stripe (checkout.session.completed,
// customer.subscription.deleted) et met à jour la table `subscriptions`.
// Doit être déployée avec --no-verify-jwt (voir backend/README.md) :
// Stripe n'envoie pas de jeton Supabase, seulement sa propre signature,
// vérifiée manuellement dans handleWebhook.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleWebhook } from '../_shared/handlers.js';

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  return handleWebhook(req, {
    supabase,
    env: { STRIPE_WEBHOOK_SECRET: Deno.env.get('STRIPE_WEBHOOK_SECRET') }
  });
});
