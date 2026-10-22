-- =============================================================================================
-- Beheerbord, ronde 5 (2026-10-22): test- en robotaccounts uit de statistieken
-- =============================================================================================
--
-- Google Play maakt bij elke ingediende versie accounts aan: de pre-launch-robot en de reviewers.
-- Ze gebruiken verzonnen adressen (`historybuff@example.com`, `explorer88@testdomain123.org`,
-- `you@exmple.com`, `crawlerrobo@gmail.com`) en vervuilen zo "nieuwe gebruikers" en "actief".
-- Zolang "Confirm email" aan stond, bouncete elke bevestigingsmail naar zo'n adres. Dat is waarom
-- Supabase op 2026-10-22 de standaardmailer voor dit project blokkeerde.
--
-- Deel A vervangt de vaste regel `like '%@chronicles.app'` in `beheer_statistieken` door één
-- functie, `is_testaccount(email)`, zodat de lijst op één plek staat. Deel B ruimt de bestaande
-- robotaccounts op. Draai deel A altijd; deel B alleen als je de accounts echt kwijt wilt.
--
-- Met de hand draaien in de SQL Editor, net als de vier rondes hiervoor.

-- ---------------------------------------------------------------------------------------------
-- Deel A — het filter
-- ---------------------------------------------------------------------------------------------

create or replace function public.is_testaccount(p_email text)
returns boolean
language sql immutable set search_path = ''
as $$
  select
    -- Onze eigen testaccounts.
    lower(coalesce(p_email, '')) like '%@chronicles.app'
    -- Domeinen die volgens RFC 2606 nooit echt bestaan, plus de tikfout die Google's reviewer maakte.
    or lower(coalesce(p_email, '')) ~ '@(.+\.)?(example\.(com|org|net)|exmple\.com|testdomain123\.org)$'
    or lower(coalesce(p_email, '')) ~ '\.(test|invalid|example|localhost)$'
    -- Google Play's pre-launch-robot.
    or lower(coalesce(p_email, '')) = 'crawlerrobo@gmail.com';
$$;

-- Zelfde functie als in ronde 2, alleen de `where` van `gebruikers` is veranderd.
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
     where p_intern_meetellen
        or not (lower(coalesce(u.email, '')) in (select lower(b.email) from public.beheerders b)
                or public.is_testaccount(u.email))
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
        where a.moment >= i.nu - interval '30 days') as actief_30d
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

revoke all on function public.is_testaccount(text) from public, anon;
grant execute on function public.is_testaccount(text) to authenticated;

-- Controle: welke accounts vallen nu onder het filter? Verwacht: de twee @chronicles.app-accounts
-- en de vier robots hieronder.
select email, created_at from auth.users where public.is_testaccount(email) order by created_at;

-- ---------------------------------------------------------------------------------------------
-- Deel B — opruimen (optioneel, niet terug te draaien)
-- ---------------------------------------------------------------------------------------------
--
-- Verwijdert de robotaccounts van Google Play. Alles wat aan zo'n account hangt (profiel,
-- voortgang, feedback, …) gaat mee via `on delete cascade`, net als bij een gewone
-- accountverwijdering. Een Discord-bericht dat al geplaatst is, blijft staan.
--
-- Bewust NIET in deze lijst:
--   * `newuser@` en `r8test@chronicles.app`: onze testaccounts, die zijn nog nodig.
--   * `trohith385@gmail.com`: waarschijnlijk een echte lezer die de bevestiging miste.
--   * `nejav79993@leafflip.com`: wegwerpadres, waarschijnlijk een menselijke reviewer. Twijfel? Laat staan.
--
-- Google maakt bij een volgende inzending gewoon nieuwe aan; het filter van deel A houdt die
-- dan uit de statistieken. Opruimen is dus voor nu, het filter is voor later.
--
-- Haal de `--` voor de regels hieronder weg om te draaien:

-- delete from auth.users
--  where lower(email) in (
--    'historybuff@example.com',
--    'explorer88@testdomain123.org',
--    'you@exmple.com',
--    'crawlerrobo@gmail.com'
--  );
