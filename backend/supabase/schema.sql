-- Astral — table de suivi des paiements.
-- À exécuter une fois dans Supabase (Dashboard → SQL Editor → New query).

create table if not exists subscriptions (
  email text primary key,
  tier text not null default 'free',
  stripe_customer_id text,
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_stripe_customer_id_idx
  on subscriptions (stripe_customer_id);

-- RLS activée sans aucune policy : personne ne peut lire/écrire cette
-- table via l'API REST publique de Supabase (clé anonyme), ni via un
-- utilisateur connecté. Seules les Edge Functions y accèdent, avec la
-- clé de service (SUPABASE_SERVICE_ROLE_KEY), qui contourne RLS. Le
-- frontend ne parle jamais directement à Postgres.
alter table subscriptions enable row level security;
