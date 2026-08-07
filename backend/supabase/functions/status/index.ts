// Répond "quel est le palier de cet e-mail ?" — appelée par l'app au
// chargement et depuis "Restaurer mon accès". Doit être déployée avec
// --no-verify-jwt (voir backend/README.md) : appelée par des visiteurs
// anonymes, sans jeton Supabase.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { handleStatus } from '../_shared/handlers.js';

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  return handleStatus(req, {
    supabase,
    env: { ALLOWED_ORIGIN: Deno.env.get('ALLOWED_ORIGIN') }
  });
});
