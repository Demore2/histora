-- =============================================================================================
-- Beheerbord, ronde 12 — Android en iOS los te bekijken (2026-11-05)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Het Overzicht krijgt bovenaan twee vinkjes, Android en iOS, standaard allebei aan. Elke functie
-- die het bord leest krijgt daarom een parameter `p_platformen` (standaard beide), en de kosten
-- krijgen een kolom `platform` (algemeen / android / ios).
--
-- Op welk platform een lezer zit, staat nergens als kolom. `platformen_van()` leidt het af uit drie
-- sporen die er al zijn, zonder app-update:
--   1. `intro_stappen.platform`  — elke installatie sinds 1.5.0 schrijft `Platform.OS` mee;
--   2. `feedback.platform`       — idem, bij elke melding;
--   3. `auth.sessions.user_agent` — iOS stuurt "CFNetwork/… Darwin/…", Android "okhttp/…".
-- Een lezer kan op beide zitten (dan telt hij bij allebei, en één keer als ze samen aan staan).
-- Geen enkel spoor = **android**: iOS bestaat pas sinds 1.5.0, dus elk ouder account zonder spoor
-- is een Android-lezer.
--
-- De oude functies (zonder `p_platformen`) gaan eruit; overloads met standaardwaarden maken een
-- aanroep dubbelzinnig. Het bord valt terug op de oude aanroep zolang deze migratie niet gedraaid is.

-- ---------------------------------------------------------------------------------------------
-- Deel A — het platform van een lezer
-- ---------------------------------------------------------------------------------------------

create or replace function public.platformen_van(p_user uuid)
returns text[]
language sql stable security definer set search_path = ''
as $$
  select coalesce(
    nullif(array(
      select distinct x.p from (
        select lower(s.platform) as p from public.intro_stappen s where s.user_id = p_user
        union all
        select lower(f.platform) from public.feedback f where f.user_id = p_user
        union all
        select case
                 when se.user_agent ~* '(darwin|cfnetwork|iphone|ipad)' then 'ios'
                 when se.user_agent ~* '(okhttp|android|dalvik)' then 'android'
               end
          from auth.sessions se where se.user_id = p_user
      ) x
      where x.p in ('android', 'ios')
      order by x.p
    ), '{}'),
    array['android']
  );
$$;

revoke all on function public.platformen_van(uuid) from public, anon, authenticated;

/** Lege of onbekende keuze = beide. */
create or replace function public.beheer_platform_keuze(p text[])
returns text[]
language sql immutable set search_path = ''
as $$
  select coalesce(
    nullif(array(select distinct lower(x) from unnest(coalesce(p, '{}')) x
                  where lower(x) in ('android', 'ios') order by 1), '{}'),
    array['android', 'ios']);
$$;

-- ---------------------------------------------------------------------------------------------
-- Deel B — beheer_statistieken met p_platformen
-- ---------------------------------------------------------------------------------------------

drop function if exists public.beheer_statistieken(boolean);

create or replace function public.beheer_statistieken(p_intern_meetellen boolean default false,
                                                      p_platformen text[] default array['android', 'ios'])
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  uit jsonb;
  plat text[] := public.beheer_platform_keuze(p_platformen);
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
       and public.platformen_van(u.id) && plat
  ),
  gasten as (
    select u.id, (u.created_at at time zone 'Europe/Amsterdam') as aangemaakt
      from auth.users u
     where u.is_anonymous
       and public.platformen_van(u.id) && plat
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
      (select count(*) from gasten) as gasten,
      (select count(*) from gasten g, instelling i where g.aangemaakt >= i.nu - interval '30 days') as gasten_30d
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
    'platformen', to_jsonb(plat),
    'gemeten_op', now()
  ) into uit;

  return uit;
end;
$$;

revoke all on function public.beheer_statistieken(boolean, text[]) from public, anon;
grant execute on function public.beheer_statistieken(boolean, text[]) to authenticated;

-- ---------------------------------------------------------------------------------------------
-- Deel C — beheer_inzichten met p_platformen
-- ---------------------------------------------------------------------------------------------

drop function if exists public.beheer_inzichten(boolean);

create or replace function public.beheer_inzichten(p_intern_meetellen boolean default false,
                                                   p_platformen text[] default array['android', 'ios'])
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  uit jsonb;
  plat text[] := public.beheer_platform_keuze(p_platformen);
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
       and public.platformen_van(u.id) && plat
  ),
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
    'platformen', to_jsonb(plat),
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

revoke all on function public.beheer_inzichten(boolean, text[]) from public, anon;
grant execute on function public.beheer_inzichten(boolean, text[]) to authenticated;

-- ---------------------------------------------------------------------------------------------
-- Deel D — de intro-trechter per platform (staat per rij in intro_stappen)
-- ---------------------------------------------------------------------------------------------

drop function if exists public.beheer_intro_trechter(integer, boolean, boolean);

create or replace function public.beheer_intro_trechter(p_dagen integer default 30,
                                                        p_intern_meetellen boolean default false,
                                                        p_alleen_accounts boolean default false,
                                                        p_platformen text[] default array['android', 'ios'])
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  plat text[] := public.beheer_platform_keuze(p_platformen);
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  return jsonb_build_object(
    'dagen', p_dagen,
    'gemeten_op', now(),
    'intern_meegeteld', p_intern_meetellen,
    'alleen_accounts', p_alleen_accounts,
    'platformen', to_jsonb(plat),
    'stappen', coalesce((
      with
      intern as (
        select u.id
          from auth.users u
         where lower(coalesce(u.email, '')) in (select lower(b.email) from public.beheerders b)
            or public.is_testaccount(u.email)
      ),
      weg as (
        select distinct s.installatie_id
          from public.intro_stappen s
         where not p_intern_meetellen
           and s.user_id in (select i.id from intern i)
      ),
      met_account as (
        select distinct s.installatie_id
          from public.intro_stappen s
          join auth.users u on u.id = s.user_id
         where not u.is_anonymous
      )
      select jsonb_agg(jsonb_build_object('stap', x.stap, 'nummer', x.nummer, 'installaties', x.n)
                       order by x.nummer, x.stap)
        from (select s.stap, min(s.stap_nummer) as nummer, count(distinct s.installatie_id) as n
                from public.intro_stappen s
               where s.aangemaakt_op >= now() - make_interval(days => p_dagen)
                 and coalesce(lower(s.platform), 'android') = any (plat)
                 and s.installatie_id not in (select w.installatie_id from weg w)
                 and (not p_alleen_accounts or s.installatie_id in (select m.installatie_id from met_account m))
               group by s.stap) x
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.beheer_intro_trechter(integer, boolean, boolean, text[]) from public, anon;
grant execute on function public.beheer_intro_trechter(integer, boolean, boolean, text[]) to authenticated;

-- ---------------------------------------------------------------------------------------------
-- Deel E — kosten per platform
-- ---------------------------------------------------------------------------------------------
-- `algemeen` telt altijd mee (Supabase, EAS, Higgsfield …); `android` alleen met het Android-vinkje
-- aan (Google Play-registratie), `ios` alleen met iOS aan (Apple Developer Program).

alter table public.beheer_kosten
  add column if not exists platform text not null default 'algemeen';
alter table public.beheer_kosten drop constraint if exists beheer_kosten_platform_check;
alter table public.beheer_kosten
  add constraint beheer_kosten_platform_check check (platform in ('algemeen', 'android', 'ios'));

-- Bestaande posten die duidelijk bij één winkel horen.
update public.beheer_kosten set platform = 'ios'
 where platform = 'algemeen' and naam ~* '(apple|app store|ios)';
update public.beheer_kosten set platform = 'android'
 where platform = 'algemeen' and naam ~* '(google play|play console)';

drop function if exists public.beheer_kost_opslaan(uuid, text, text, integer, text, text, date, date, text);

create or replace function public.beheer_kost_opslaan(
  p_id          uuid,
  p_naam        text,
  p_categorie   text,
  p_bedrag_cent integer,
  p_valuta      text,
  p_interval    text,
  p_begin_op    date,
  p_eind_op     date,
  p_notitie     text,
  p_platform    text default null
)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  ik      text;
  uit_id  uuid;
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  select b.id into ik from public.beheerders b
   where lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''));

  if p_id is null then
    insert into public.beheer_kosten
      (naam, categorie, bedrag_cent, valuta, interval, begin_op, eind_op, notitie, auteur, platform)
    values
      (btrim(p_naam), coalesce(p_categorie, 'overig'), p_bedrag_cent, coalesce(p_valuta, 'EUR'),
       coalesce(p_interval, 'maand'), coalesce(p_begin_op, current_date), p_eind_op,
       coalesce(p_notitie, ''), ik, coalesce(p_platform, 'algemeen'))
    returning id into uit_id;
  else
    update public.beheer_kosten k set
      naam          = btrim(p_naam),
      categorie     = coalesce(p_categorie, k.categorie),
      bedrag_cent   = p_bedrag_cent,
      valuta        = coalesce(p_valuta, k.valuta),
      interval      = coalesce(p_interval, k.interval),
      begin_op      = coalesce(p_begin_op, k.begin_op),
      eind_op       = p_eind_op,
      notitie       = coalesce(p_notitie, ''),
      platform      = coalesce(p_platform, k.platform),
      bijgewerkt_op = now()
     where k.id = p_id
    returning k.id into uit_id;
    if uit_id is null then raise exception 'kost_niet_gevonden' using errcode = 'P0002'; end if;
  end if;

  return uit_id;
end;
$$;

-- De lijst opnieuw, zodat hij de nieuwe kolom zeker meegeeft.
create or replace function public.beheer_kosten_lijst()
returns setof public.beheer_kosten
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query
    select * from public.beheer_kosten k
     order by (k.eind_op is not null and k.eind_op < current_date), k.categorie, k.naam;
end;
$$;

revoke all on function
  public.beheer_kosten_lijst(),
  public.beheer_kost_opslaan(uuid, text, text, integer, text, text, date, date, text, text)
from public, anon;
grant execute on function
  public.beheer_kosten_lijst(),
  public.beheer_kost_opslaan(uuid, text, text, integer, text, text, date, date, text, text)
to authenticated;
