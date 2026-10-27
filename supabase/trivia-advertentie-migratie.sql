-- =============================================================================================
-- Explore: +1 leven voor een bekeken advertentie (1.4.3)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Een gratis lezer zonder levens kan een beloonde advertentie (AdMob "rewarded") bekijken voor één
-- leven. **Het leven wordt hier toegekend, nooit in de app**: `trivia_levens` heeft geen
-- schrijf-policy, en dat blijft zo. De app roept `trivia_leven_bij_advertentie()` aan nadat AdMob
-- `EARNED_REWARD` meldde.
--
-- Wat de server níet kan controleren is of er echt een advertentie bekeken is: daarvoor bestaat
-- AdMob's server-side verification (een callback van Google naar een eigen endpoint). Dat is voor
-- één leven te zwaar. In plaats daarvan begrenst de **daglimiet** wat iemand met een losse
-- REST-aanroep kan winnen: hooguit `advertentie_levens_per_dag` levens per dag, en alleen als zijn
-- levens niet al vol zijn. Wie dat omzeilt, wint drie levens in een triviaspel.
--
-- De dag is de UTC-dag. Dat is hier goed genoeg: het gaat om een plafond, niet om een kalender
-- die de lezer ziet.

create table if not exists public.trivia_advertentie_levens (
  user_id  uuid not null references auth.users (id) on delete cascade,
  dag      date not null,
  aantal   smallint not null default 0,
  primary key (user_id, dag)
);

alter table public.trivia_advertentie_levens enable row level security;
-- Geen enkele policy: alleen de functie hieronder (security definer) leest en schrijft hierin.

-- De instellingen krijgen er één getal bij; de andere twee blijven wat ze waren.
create or replace function public.trivia_instellingen()
returns jsonb
language sql immutable
as $$
  select jsonb_build_object('max_levens', 5, 'herstel_minuten', 240, 'advertentie_levens_per_dag', 3);
$$;

/**
 * Eén leven erbij voor een bekeken advertentie. Gooit `levens_vol` als er niets bij kan, en
 * `advertentie_limiet` als het dagplafond bereikt is. Geeft daarna de stand terug, net als
 * `trivia_stand()`, zodat de app in één ronde het nieuwe hartje ziet.
 */
create or replace function public.trivia_leven_bij_advertentie()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  maxi int := (public.trivia_instellingen()->>'max_levens')::int;
  plafond int := (public.trivia_instellingen()->>'advertentie_levens_per_dag')::int;
  vandaag date := (now() at time zone 'utc')::date;
  rij public.trivia_levens;
  geteld int;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  -- Eerst bijwerken tot nu: misschien is er sinds de advertentie al een leven vanzelf teruggekomen.
  rij := public.trivia_levens_bij(ik);
  if rij.levens >= maxi then raise exception 'levens_vol' using errcode = 'P0001'; end if;

  insert into public.trivia_advertentie_levens (user_id, dag, aantal)
  values (ik, vandaag, 1)
  on conflict (user_id, dag) do update
    set aantal = public.trivia_advertentie_levens.aantal + 1
    where public.trivia_advertentie_levens.aantal < plafond
  returning aantal into geteld;

  -- Geen rij terug = de `where` hierboven hield hem tegen: het plafond is bereikt.
  if geteld is null then raise exception 'advertentie_limiet' using errcode = 'P0001'; end if;

  -- `bijgewerkt_op` blijft staan: de hersteltimer loopt gewoon door voor het volgende leven.
  update public.trivia_levens set levens = levens + 1 where user_id = ik;

  return public.trivia_stand();
end;
$$;

revoke all on function public.trivia_leven_bij_advertentie() from public, anon;
grant execute on function public.trivia_leven_bij_advertentie() to authenticated;
