-- Beheerbord, ronde 10 — cache voor de externe bronnen van het Overzicht.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- De edge function `beheer-dashboard` haalt RevenueCat, Google Analytics, AdMob en Google Play op
-- en bewaart elk antwoord hier een tijdje (zie de TTL in de function). Zo kost het bord, dat elke
-- minuut ververst, geen API-quotum per verversing. Alleen de function schrijft en leest (service
-- role); RLS staat aan zonder policies, dus voor de app en het bord zelf is de tabel onzichtbaar.

create table if not exists public.beheer_cache (
  sleutel       text primary key,
  data          jsonb not null,
  opgehaald_op  timestamptz not null default now()
);
alter table public.beheer_cache enable row level security;
-- Geen policies.
