-- =============================================================================================
-- 1.5.0: gastaccounts (anoniem), de trechter van de intro, en gasten uit de tellingen
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Vóór het uitbrengen van 1.5.0 draaien: de app schrijft vanaf die versie naar `intro_stappen`.
--
-- Sinds 1.5.0 maakt "Get started" in de intro een anoniem account (`signInAnonymously`); de lezer
-- kan dat later bewaren met Google of e-mail (zelfde id, `is_anonymous` gaat van true naar false).
-- Vier delen:
--   A. `public.intro_stappen`: één rij per getoonde intro-stap, per installatie.
--   B. `beheer_intro_trechter()`: de trechter daaruit, alleen voor beheerders.
--   C. De Discord-melding "nieuwe lezer": stil bij een gast, en wél bij het bewaren van een gast.
--   D. `beheer_statistieken` en `beheer_inzichten` tellen gasten niet als lezer.

-- ---------------------------------------------------------------------------------------------
-- Deel A — de meettabel
-- ---------------------------------------------------------------------------------------------
-- Per installatie (een willekeurig uuid uit de app), niet per gebruiker: wie op het welkomscherm
-- afhaakt heeft nog geen account en moet tóch in de trechter staan. `user_id` vult de database zelf
-- in zodra er een sessie is. Alleen insert, voor `anon` én `authenticated`; geen select, update of
-- delete — de app leest zijn eigen rijen nooit terug. Verwijderen van een account ruimt de rijen op
-- via de cascade (zoals elke tabel met een `user_id`).

create table if not exists public.intro_stappen (
  id              bigint generated always as identity primary key,
  installatie_id  uuid not null,
  user_id         uuid default auth.uid() references auth.users (id) on delete cascade,
  stap            text not null check (char_length(stap) between 1 and 40),
  stap_nummer     smallint check (stap_nummer between 0 and 200),
  app_versie      text check (char_length(app_versie) <= 20),
  platform        text check (char_length(platform) <= 10),
  taal            text check (char_length(taal) <= 5),
  aangemaakt_op   timestamptz not null default now()
);

create index if not exists idx_intro_stappen_tijd on public.intro_stappen (aangemaakt_op);

alter table public.intro_stappen enable row level security;

drop policy if exists "intro_stappen_insert" on public.intro_stappen;
create policy "intro_stappen_insert" on public.intro_stappen
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

revoke all on public.intro_stappen from anon, authenticated;
grant insert on public.intro_stappen to anon, authenticated;

-- ---------------------------------------------------------------------------------------------
-- Deel B — de trechter voor het beheerbord
-- ---------------------------------------------------------------------------------------------
-- Unieke installaties per stap in de laatste `p_dagen` dagen. Terug en weer verder geeft dubbele
-- rijen; daarom `count(distinct installatie_id)`. Stappen 0–8 zijn de intro, 100+ de afloop van de
-- accountstap (google / email / later / inloggen).

create or replace function public.beheer_intro_trechter(p_dagen integer default 30)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  return jsonb_build_object(
    'dagen', p_dagen,
    'gemeten_op', now(),
    'stappen', coalesce((
      select jsonb_agg(jsonb_build_object('stap', x.stap, 'nummer', x.nummer, 'installaties', x.n)
                       order by x.nummer, x.stap)
        from (select s.stap, min(s.stap_nummer) as nummer, count(distinct s.installatie_id) as n
                from public.intro_stappen s
               where s.aangemaakt_op >= now() - make_interval(days => p_dagen)
               group by s.stap) x
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.beheer_intro_trechter(integer) from public, anon;
grant execute on function public.beheer_intro_trechter(integer) to authenticated;

-- ---------------------------------------------------------------------------------------------
-- Deel C — de Discord-melding "nieuwe lezer"
-- ---------------------------------------------------------------------------------------------
-- Zelfde functie als in `nieuwe-lezer-melding-migratie.sql`, met twee wijzigingen:
--   * een gast (insert met `is_anonymous`) is nog geen lezer en blijft stil;
--   * het moment dat een gast bewaart (update `is_anonymous` true → false) is het moment dat er
--     een lezer bijkomt, en dát meldt hij. Daarvoor een tweede trigger, op update.
-- Het totaal telt gasten niet mee.

create or replace function public.stuur_nieuwe_lezer_melding()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  webhook  text;
  totaal   bigint;
begin
  if new.is_anonymous
     or public.is_testaccount(new.email)
     or lower(coalesce(new.email, '')) in (select lower(b.email) from public.beheerders b) then
    return new;
  end if;

  select decrypted_secret into webhook from vault.decrypted_secrets
   where name = 'discord_webhook_nieuwe_lezers' limit 1;
  if webhook is null then
    return new;
  end if;

  select count(*) into totaal
    from auth.users u
   where not u.is_anonymous
     and not public.is_testaccount(u.email)
     and lower(coalesce(u.email, '')) not in (select lower(b.email) from public.beheerders b);

  perform net.http_post(
    url     := webhook,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body    := jsonb_build_object(
      'allowed_mentions', jsonb_build_object('parse', '[]'::jsonb),
      'embeds', jsonb_build_array(jsonb_build_object(
        'title',       '🎉 Er heeft iemand een account aangemaakt!',
        'description', 'Histora heeft nu **' || totaal || '** ' ||
                       case when totaal = 1 then 'lezer' else 'lezers' end || '.',
        'color',       959977,  -- #0EA5E9, het merkblauw
        'timestamp',   to_char(now() at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
      ))
    ),
    timeout_milliseconds := 10000
  );
  return new;
exception when others then
  -- Een melding mag een registratie nooit laten mislukken.
  raise warning '[nieuwe-lezer-melding] niet verstuurd: %', sqlerrm;
  return new;
end;
$$;

revoke all on function public.stuur_nieuwe_lezer_melding() from public, anon, authenticated;

drop trigger if exists nieuwe_lezer_na_insert on auth.users;
create trigger nieuwe_lezer_na_insert
  after insert on auth.users
  for each row
  execute function public.stuur_nieuwe_lezer_melding();

drop trigger if exists nieuwe_lezer_na_bewaren on auth.users;
create trigger nieuwe_lezer_na_bewaren
  after update of is_anonymous on auth.users
  for each row
  when (old.is_anonymous and not new.is_anonymous)
  execute function public.stuur_nieuwe_lezer_melding();

-- ---------------------------------------------------------------------------------------------
-- Deel D — de statistieken op het beheerbord zonder gasten
-- ---------------------------------------------------------------------------------------------
-- De twee functies zijn letterlijk die uit `feedback-beheer-migratie-5.sql` en `-6.sql`; alleen de
-- `where` van `gebruikers` kreeg `not u.is_anonymous` erbij, en `tel` twee gastentellers. Een gast
-- is geen lezer tot hij zijn voortgang bewaart — anders telt elke tik op "Get started" als account.

create or replace function public.beheer_statistieken(p_intern_meetellen boolean default false)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  uit jsonb;
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  with
  instelling as (select (now() at time zone 'Europe/Amsterdam') as nu),
  gebruikers as (
    select u.id, (u.created_at at time zone 'Europe/Amsterdam') as aangemaakt
      from auth.users u
     where not u.is_anonymous
       and (p_intern_meetellen
            or not (lower(coalesce(u.email, '')) in (select lower(b.email) from public.beheerders b)
                    or public.is_testaccount(u.email)))
  ),
  activiteit as (
    select a.user_id, (a.ts at time zone 'Europe/Amsterdam') as moment from (
      select u.id as user_id, u.last_sign_in_at as ts from auth.users u
      union all select v.user_id, v.updated_at from public.voortgang v
      union all select s.user_id, s.updated_at from public.story_progress s
      union all select c.user_id, c.updated_at from public.character_unlocks c
      union all select r.user_id, r.read_at from public.user_daily_reads r
      union all select p.user_id, p.created_at from public.poll_responses p
      union all select k.user_id, k.created_at from public.user_choices k
      union all select f.user_id, f.created_at from public.feedback f where f.bron = 'app'
    ) a
    where a.ts is not null and a.user_id in (select g.id from gebruikers g)
  ),
  abo as (
    select g.id,
      case
        when s.tier = 'premium' and (s.subscription_ends_at is null or s.subscription_ends_at > now()) then
          case when s.product_id is null then 'handmatig'
               when s.trial_ends_at > now() then 'proef'
               when s.product_id ilike '%year%' or s.product_id ilike '%annual%' then 'jaar'
               else 'maand' end
        else 'gratis' end as soort
      from gebruikers g left join public.user_subscriptions s on s.user_id = g.id
  ),
  reeks as (
    select r.stap, p.begin, p.begin + r.duur as eind
      from instelling i,
           (values ('dag', 'day', interval '1 day', 30),
                   ('week', 'week', interval '1 week', 12),
                   ('maand', 'month', interval '1 month', 12)) as r(stap, trunc, duur, aantal)
           cross join lateral generate_series(
             date_trunc(r.trunc, i.nu) - r.duur * (r.aantal - 1), date_trunc(r.trunc, i.nu), r.duur
           ) as p(begin)
  ),
  reeks_waarden as (
    select r.stap, r.begin,
      (select count(*) from gebruikers g where g.aangemaakt >= r.begin and g.aangemaakt < r.eind) as nieuw,
      (select count(distinct a.user_id) from activiteit a where a.moment >= r.begin and a.moment < r.eind) as actief,
      (select count(*) from gebruikers g where g.aangemaakt < r.eind) as totaal
    from reeks r
  ),
  tel as (
    select
      (select count(*) from gebruikers) as totaal,
      (select count(*) from gebruikers g, instelling i
        where g.aangemaakt >= i.nu - interval '30 days') as nieuw_30d,
      (select count(*) from gebruikers g, instelling i
        where g.aangemaakt >= i.nu - interval '60 days' and g.aangemaakt < i.nu - interval '30 days') as nieuw_30d_vorige,
      (select count(distinct a.user_id) from activiteit a, instelling i
        where a.moment >= i.nu - interval '1 day') as actief_1d,
      (select count(distinct a.user_id) from activiteit a, instelling i
        where a.moment >= i.nu - interval '7 days') as actief_7d,
      (select count(distinct a.user_id) from activiteit a, instelling i
        where a.moment >= i.nu - interval '14 days' and a.moment < i.nu - interval '7 days') as actief_7d_vorige,
      (select count(distinct a.user_id) from activiteit a, instelling i
        where a.moment >= i.nu - interval '30 days') as actief_30d,
      -- Gastaccounts (1.5.0) tellen nergens anders mee; hier staat hoeveel er zijn, en hoeveel
      -- daarvan de afgelopen 30 dagen begonnen.
      (select count(*) from auth.users u where u.is_anonymous) as gasten,
      (select count(*) from auth.users u, instelling i
        where u.is_anonymous and (u.created_at at time zone 'Europe/Amsterdam') >= i.nu - interval '30 days') as gasten_30d
  )
  select jsonb_build_object(
    'tel', (select to_jsonb(t) from tel t),
    'abonnementen', (select coalesce(jsonb_object_agg(x.soort, x.n), '{}'::jsonb)
                       from (select a.soort, count(*) as n from abo a group by a.soort) x),
    'reeksen', (select jsonb_object_agg(y.stap, y.punten) from (
        select w.stap,
               jsonb_agg(jsonb_build_object('begin', to_char(w.begin, 'YYYY-MM-DD'),
                                            'nieuw', w.nieuw, 'actief', w.actief, 'totaal', w.totaal)
                         order by w.begin) as punten
          from reeks_waarden w group by w.stap) y),
    'intern_meegeteld', p_intern_meetellen,
    'gemeten_op', now()
  ) into uit;

  return uit;
end;
$$;

create or replace function public.beheer_inzichten(p_intern_meetellen boolean default false)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  uit jsonb;
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  with
  gebruikers as (
    select u.id, (u.created_at at time zone 'Europe/Amsterdam') as aangemaakt
      from auth.users u
     where not u.is_anonymous
       and (p_intern_meetellen
            or not (lower(coalesce(u.email, '')) in (select lower(b.email) from public.beheerders b)
                    or public.is_testaccount(u.email)))
  ),
  -- Zelfde bronnen als `beheer_statistieken`: alles wat een lezer schrijft telt als activiteit.
  activiteit as (
    select a.user_id, (a.ts at time zone 'Europe/Amsterdam')::date as dag from (
      select u.id as user_id, u.last_sign_in_at as ts from auth.users u
      union all select v.user_id, v.updated_at from public.voortgang v
      union all select s.user_id, s.updated_at from public.story_progress s
      union all select c.user_id, c.updated_at from public.character_unlocks c
      union all select r.user_id, r.read_at from public.user_daily_reads r
      union all select p.user_id, p.created_at from public.poll_responses p
      union all select k.user_id, k.created_at from public.user_choices k
      union all select d.user_id, d.created_at from public.dukaten_mutaties d
    ) a
    where a.ts is not null and a.user_id in (select g.id from gebruikers g)
  ),
  vandaag as (select (now() at time zone 'Europe/Amsterdam')::date as d),

  -- Per verhaal: hoeveel lezers begonnen, hoeveel het uitlazen, en per hoofdstuk hoeveel lezers
  -- dat hoofdstuk afrondden — de trechter laat zien waar mensen afhaken.
  voortgang_rijen as (
    select sp.verhaal_id, sp.user_id, coalesce(sp.completed_chapters::int[], '{}') as hoofdstukken
      from public.story_progress sp
     where sp.user_id in (select g.id from gebruikers g)
       and cardinality(coalesce(sp.completed_chapters::int[], '{}')) > 0
  ),
  uitgelezen as (
    select v.user_id, unnest(coalesce(v.completedstories::text[], '{}')) as verhaal_id
      from public.voortgang v
     where v.user_id in (select g.id from gebruikers g)
  ),
  verhalen as (
    select c.verhaal_id, c.titel, c.tijdperk_naam,
      (select count(*) from voortgang_rijen r where r.verhaal_id = c.verhaal_id) as begonnen,
      (select count(distinct u.user_id) from uitgelezen u where u.verhaal_id = c.verhaal_id) as uitgelezen,
      (select jsonb_agg((select count(*) from voortgang_rijen r
                          where r.verhaal_id = c.verhaal_id and n = any (r.hoofdstukken)) order by n)
         from generate_series(1, 8) n) as trechter
      from public.story_catalog c
  ),

  -- Retentie: kwam een lezer op een latere dag terug (D1), en was hij een week na zijn eerste dag
  -- nog bezig (D7)? Alleen lezers die oud genoeg zijn tellen mee in de noemer.
  retentie as (
    select
      count(*) filter (where g.aangemaakt::date <= (select d from vandaag) - 1) as d1_basis,
      count(*) filter (where g.aangemaakt::date <= (select d from vandaag) - 1
                         and exists (select 1 from activiteit a where a.user_id = g.id
                                       and a.dag >= g.aangemaakt::date + 1)) as d1_terug,
      count(*) filter (where g.aangemaakt::date <= (select d from vandaag) - 7) as d7_basis,
      count(*) filter (where g.aangemaakt::date <= (select d from vandaag) - 7
                         and exists (select 1 from activiteit a where a.user_id = g.id
                                       and a.dag >= g.aangemaakt::date + 7)) as d7_terug
      from gebruikers g
  ),

  -- Een streak leeft als de laatste leesdag vandaag of gisteren was (zelfde regel als de app,
  -- `berekenHuidigeStreak`). Een opgeslagen getal met een oude datum is dus nul.
  streaks as (
    select v.user_id,
      coalesce(nullif(trim(p.username), ''), 'Lezer ' || left(v.user_id::text, 4)) as naam,
      v.streak,
      nullif(v.laatsteactiviteitdatum::text, '')::date as laatst
      from public.voortgang v
      left join public.profiles p on p.id = v.user_id
     where v.user_id in (select g.id from gebruikers g)
  ),
  levende as (
    select * from streaks
     where coalesce(streak, 0) > 0 and laatst >= (select d from vandaag) - 1
  )

  select jsonb_build_object(
    'gemeten_op', now(),
    'verhalen', coalesce((select jsonb_agg(jsonb_build_object(
        'id', v.verhaal_id, 'titel', v.titel, 'tijdperk', v.tijdperk_naam,
        'begonnen', v.begonnen, 'uitgelezen', v.uitgelezen, 'trechter', v.trechter)
        order by v.begonnen desc, v.uitgelezen desc, v.titel) from verhalen v), '[]'::jsonb),
    'retentie', (select to_jsonb(r) from retentie r),
    'streaks', jsonb_build_object(
      'levend', (select count(*) from levende),
      'top', coalesce((select jsonb_agg(jsonb_build_object('naam', l.naam, 'dagen', l.streak, 'laatst', l.laatst)
                       order by l.streak desc, l.laatst desc)
                       from (select * from levende order by streak desc, laatst desc limit 10) l), '[]'::jsonb)
    ),
    'winkel', jsonb_build_object(
      'verdiend', coalesce((select sum(d.bedrag) from public.dukaten_mutaties d
                             where d.bedrag > 0 and d.user_id in (select g.id from gebruikers g)), 0),
      'uitgegeven', coalesce((select -sum(d.bedrag) from public.dukaten_mutaties d
                               where d.bedrag < 0 and d.user_id in (select g.id from gebruikers g)), 0),
      'bevriezers_gekocht', (select count(*) from public.dukaten_mutaties d
                              where d.reden = 'bevriezer' and d.user_id in (select g.id from gebruikers g)),
      'bevriezers_gebruikt', (select count(*) from public.bevriezer_gebruik b
                               where b.user_id in (select g.id from gebruikers g)),
      'bevriezers_voorraad', coalesce((select sum(s.aantal) from public.streak_bevriezers s
                                        where s.user_id in (select g.id from gebruikers g)), 0)
    )
  ) into uit;

  return uit;
end;
$$;

revoke all on function public.beheer_inzichten(boolean) from public, anon;
grant execute on function public.beheer_inzichten(boolean) to authenticated;
