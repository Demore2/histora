-- Billing via RevenueCat — UITGEVOERD op 2026-10-19 (met de hand in de SQL editor).
--
-- Na deze migratie zet alleen de server nog premium: de edge function `revenuecat-sync`
-- schrijft met de service role, die RLS omzeilt. Zie supabase/README-billing.md.

-- 1. Het lek dicht: met de update-policy kon een lezer zijn eigen rij op 'premium' zetten
--    (één PATCH met de publishable key uit de bundel). Zonder policy raakt een client-update
--    nul rijen.
drop policy if exists "Eigen abonnement bijwerken" on public.user_subscriptions;

-- 2. De client mag zijn rij nog aanmaken (`loadSubscription` doet dat voor een lezer die zich na
--    de backfill registreerde), maar uitsluitend als gratis rij zonder data. Zonder deze
--    beperking is een insert met tier = 'premium' hetzelfde lek via een andere deur.
drop policy if exists "Eigen abonnement schrijven" on public.user_subscriptions;
create policy "Eigen gratis abonnementsrij aanmaken" on public.user_subscriptions
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and tier = 'free'
    and trial_ends_at is null
    and subscription_ends_at is null
    and coalesce(auto_renew, false) = false
  );

-- 3. Wat de webhook bijhoudt.
alter table public.user_subscriptions
  add column if not exists product_id text,
  add column if not exists winkel text;

-- Geen kolom voor de volgorde van events: `revenuecat-sync` leest bij elk event de actuele stand
-- bij RevenueCat terug, dus een event dat te laat binnenkomt schrijft gewoon de stand van nu.
comment on column public.user_subscriptions.product_id is
  'Product uit Google Play via RevenueCat. NULL = handmatig gezet (testaccounts) en wordt door revenuecat-sync nooit naar free gedegradeerd.';
