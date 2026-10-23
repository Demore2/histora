-- =============================================================================================
-- De winkel (1.3): Dukaten en streakbevriezers
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Dukaten verdien je met lezen (een afgerond hoofdstuk, een uitgelezen verhaal) en geef je uit in
-- de winkel; voor nu is het enige artikel een streakbevriezer, die een gemiste dag overbrugt.
--
-- **Alles staat op de server en wijzigt alleen via de functies hieronder.** De drie tabellen hebben
-- uitsluitend een select-policy voor de eigen rijen; er is geen insert-, update- of delete-policy.
-- Een munt die de app zelf bijhoudt kan iedereen met een REST-client ophogen — CLAUDE.md zegt het
-- al bij de mijlpaalpunten: "ging er ooit iets mee te betalen, dan moeten ze eerst naar de server".
--
-- **Het saldo is een kasboek, geen getal.** Elke bij- en afschrijving is een rij in
-- `dukaten_mutaties` met een `sleutel` die per gebruiker uniek is (`hoofdstuk:julius-caesar:3`,
-- `verhaal:julius-caesar`, `bevriezer:<uuid>`). Zo levert een hoofdstuk maar één keer iets op,
-- hoe vaak de app het ook meldt — dat maakt een wachtrij aan de app-kant veilig om te herhalen —
-- en is het saldo altijd na te rekenen.
--
-- De bedragen staan hier en nergens anders (`winkel_instellingen()`); de app leest ze uit
-- `winkel_stand()` en toont ze alleen.

-- ---------------------------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------------------------

create table if not exists public.dukaten_mutaties (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  bedrag      integer not null check (bedrag <> 0),
  reden       text not null,
  sleutel     text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, sleutel)
);
create index if not exists idx_dukaten_mutaties_user on public.dukaten_mutaties (user_id);

create table if not exists public.streak_bevriezers (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  aantal      integer not null default 0 check (aantal between 0 and 2),
  -- De maand ('2026-10') waarin Pro voor het laatst is aangevuld; zo gebeurt dat één keer per maand.
  pro_maand   text,
  updated_at  timestamptz not null default now()
);

-- Welke dagen een bevriezer heeft overbrugd. Primaire sleutel op (user, dag): een dag kost hooguit
-- één bevriezer, ook als twee toestellen tegelijk dezelfde gemiste dag melden.
create table if not exists public.bevriezer_gebruik (
  user_id     uuid not null references auth.users (id) on delete cascade,
  dag         date not null,
  created_at  timestamptz not null default now(),
  primary key (user_id, dag)
);

alter table public.dukaten_mutaties enable row level security;
alter table public.streak_bevriezers enable row level security;
alter table public.bevriezer_gebruik enable row level security;

drop policy if exists "Eigen mutaties lezen" on public.dukaten_mutaties;
create policy "Eigen mutaties lezen" on public.dukaten_mutaties
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Eigen bevriezers lezen" on public.streak_bevriezers;
create policy "Eigen bevriezers lezen" on public.streak_bevriezers
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Eigen bevriezergebruik lezen" on public.bevriezer_gebruik;
create policy "Eigen bevriezergebruik lezen" on public.bevriezer_gebruik
  for select to authenticated using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------------------------
-- De bedragen — één plek
-- ---------------------------------------------------------------------------------------------

create or replace function public.winkel_instellingen()
returns jsonb
language sql immutable set search_path = ''
as $$
  select jsonb_build_object(
    'per_hoofdstuk', 10,
    'per_verhaal', 40,
    'bevriezer_prijs', 300,
    'max_bevriezers', 2,
    'pro_bevriezers_per_maand', 2
  );
$$;

-- ---------------------------------------------------------------------------------------------
-- De stand van één lezer
-- ---------------------------------------------------------------------------------------------

create or replace function public.winkel_stand()
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;
  return jsonb_build_object(
    'saldo', coalesce((select sum(bedrag) from public.dukaten_mutaties where user_id = ik), 0),
    'bevriezers', coalesce((select aantal from public.streak_bevriezers where user_id = ik), 0),
    'bevroren_dagen', coalesce((
      select jsonb_agg(to_char(dag, 'YYYY-MM-DD') order by dag)
        from public.bevriezer_gebruik
       where user_id = ik and dag >= current_date - 14
    ), '[]'::jsonb),
    'instellingen', public.winkel_instellingen()
  );
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Verdienen
-- ---------------------------------------------------------------------------------------------
--
-- Eén functie voor alles wat iets oplevert, met een lijst sleutels, zodat de app een wachtrij (of
-- bij de eerste keer de hele leesgeschiedenis) in één aanroep kan inleveren. Een sleutel die al
-- bestaat doet niets; een sleutel die niet klopt wordt overgeslagen in plaats van de rest te laten
-- vallen.
--
-- **Wat de server niet kan controleren**: of het hoofdstuk echt gelezen is. `story_progress` loopt
-- met een debounce achter, dus ernaar kijken zou een net afgerond hoofdstuk weigeren. Wat hij wél
-- afdwingt is dat het verhaal bestaat (`story_catalog`) en dat elk hoofdstuk één keer telt — het
-- totaal dat iemand kan verdienen is dus begrensd door de inhoud van de app.

create or replace function public.dukaten_verdien(p_sleutels text[])
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  s text;
  inst jsonb := public.winkel_instellingen();
  delen text[];
  bedrag integer;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  foreach s in array coalesce(p_sleutels, '{}') loop
    delen := string_to_array(s, ':');
    bedrag := null;
    if delen[1] = 'hoofdstuk' and array_length(delen, 1) = 3
       and delen[3] ~ '^[0-9]{1,2}$' and delen[3]::int between 1 and 30
       and exists (select 1 from public.story_catalog c where c.verhaal_id = delen[2]) then
      bedrag := (inst->>'per_hoofdstuk')::int;
    elsif delen[1] = 'verhaal' and array_length(delen, 1) = 2
       and exists (select 1 from public.story_catalog c where c.verhaal_id = delen[2]) then
      bedrag := (inst->>'per_verhaal')::int;
    end if;

    if bedrag is not null then
      insert into public.dukaten_mutaties (user_id, bedrag, reden, sleutel)
      values (ik, bedrag, delen[1], s)
      on conflict (user_id, sleutel) do nothing;
    end if;
  end loop;

  return public.winkel_stand();
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Kopen
-- ---------------------------------------------------------------------------------------------

create or replace function public.koop_bevriezer()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  inst jsonb := public.winkel_instellingen();
  prijs integer := (inst->>'bevriezer_prijs')::int;
  huidig integer;
  saldo integer;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  insert into public.streak_bevriezers (user_id) values (ik) on conflict (user_id) do nothing;
  -- Rij op slot: twee snelle tikken op "kopen" mogen niet allebei het oude saldo zien.
  select aantal into huidig from public.streak_bevriezers where user_id = ik for update;
  if huidig >= (inst->>'max_bevriezers')::int then
    raise exception 'max_bevriezers' using errcode = 'P0001';
  end if;

  select coalesce(sum(bedrag), 0) into saldo from public.dukaten_mutaties where user_id = ik;
  if saldo < prijs then
    raise exception 'te_weinig_dukaten' using errcode = 'P0001';
  end if;

  insert into public.dukaten_mutaties (user_id, bedrag, reden, sleutel)
  values (ik, -prijs, 'bevriezer', 'bevriezer:' || gen_random_uuid());
  update public.streak_bevriezers set aantal = aantal + 1, updated_at = now() where user_id = ik;

  return public.winkel_stand();
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Pro: elke maand aanvullen tot het maximum
-- ---------------------------------------------------------------------------------------------
--
-- "2 per maand" is hier "aanvullen tot 2", niet "2 erbij": met een maximum van 2 is dat hetzelfde
-- voor wie ze opmaakte, en het voorkomt dat de aanvulling bij iemand die er nog 2 had verloren gaat
-- in een fout. Of iemand Pro is, bepaalt de serverrij (`user_subscriptions`), niet de app.

create or replace function public.pro_bevriezers_aanvullen()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  maand text := to_char(now() at time zone 'utc', 'YYYY-MM');
  is_pro boolean;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  select exists (
    select 1 from public.user_subscriptions s
     where s.user_id = ik and s.tier = 'premium'
       and greatest(coalesce(s.subscription_ends_at, '-infinity'),
                    coalesce(s.trial_ends_at, '-infinity')) > now()
  ) into is_pro;

  if is_pro then
    insert into public.streak_bevriezers (user_id, aantal, pro_maand)
    values (ik, (public.winkel_instellingen()->>'pro_bevriezers_per_maand')::int, maand)
    on conflict (user_id) do update
      set aantal = greatest(public.streak_bevriezers.aantal, excluded.aantal),
          pro_maand = maand,
          updated_at = now()
      where public.streak_bevriezers.pro_maand is distinct from maand;
  end if;

  return public.winkel_stand();
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Gebruiken: gemiste dagen overbruggen
-- ---------------------------------------------------------------------------------------------
--
-- **Alles of niets.** Twee gemiste dagen met één bevriezer redden de streak niet; dan wordt er ook
-- niets afgeschreven, anders verbrand je een bevriezer aan een streak die toch dood gaat.
-- De dagen komen van de app (lokale datum van de lezer — de streak rekent in lokale dagen, zie
-- `datumSleutel`), en moeten binnen de afgelopen week liggen.

create or replace function public.gebruik_bevriezers(p_dagen date[])
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  nodig date[];
  huidig integer;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  select coalesce(array_agg(d order by d), '{}') into nodig
    from (select distinct unnest(p_dagen) as d) dagen
   where d between current_date - 7 and current_date
     and not exists (select 1 from public.bevriezer_gebruik g where g.user_id = ik and g.dag = d);

  if cardinality(nodig) = 0 then return public.winkel_stand(); end if;

  insert into public.streak_bevriezers (user_id) values (ik) on conflict (user_id) do nothing;
  select aantal into huidig from public.streak_bevriezers where user_id = ik for update;
  if huidig < cardinality(nodig) then
    raise exception 'te_weinig_bevriezers' using errcode = 'P0001';
  end if;

  insert into public.bevriezer_gebruik (user_id, dag) select ik, unnest(nodig);
  update public.streak_bevriezers
     set aantal = aantal - cardinality(nodig), updated_at = now()
   where user_id = ik;

  return public.winkel_stand();
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Rechten
-- ---------------------------------------------------------------------------------------------

revoke all on function public.winkel_stand() from public, anon;
revoke all on function public.dukaten_verdien(text[]) from public, anon;
revoke all on function public.koop_bevriezer() from public, anon;
revoke all on function public.pro_bevriezers_aanvullen() from public, anon;
revoke all on function public.gebruik_bevriezers(date[]) from public, anon;
grant execute on function public.winkel_stand() to authenticated;
grant execute on function public.dukaten_verdien(text[]) to authenticated;
grant execute on function public.koop_bevriezer() to authenticated;
grant execute on function public.pro_bevriezers_aanvullen() to authenticated;
grant execute on function public.gebruik_bevriezers(date[]) to authenticated;
