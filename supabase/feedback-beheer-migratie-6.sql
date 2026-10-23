-- =============================================================================================
-- Beheerbord, ronde 6 (2026-10-23): inzichten — verhalen, retentie, streaks, winkel
-- =============================================================================================
--
-- Eén nieuwe functie naast `beheer_statistieken`, niet erin: die gaat over accounts, deze over
-- wat lezers dóén. Zelfde regels: alleen beheerders, en dezelfde filter op eigen en testaccounts
-- (`p_intern_meetellen`), zodat de twee helften van het tabblad over dezelfde mensen gaan.
--
-- Geen e-mailadressen in de uitvoer: de streaklijst toont de gebruikersnaam, of "Lezer" plus de
-- eerste vier tekens van het id als iemand geen naam heeft.
--
-- Met de hand draaien in de SQL Editor, net als de vijf rondes hiervoor.

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
     where p_intern_meetellen
        or not (lower(coalesce(u.email, '')) in (select lower(b.email) from public.beheerders b)
                or public.is_testaccount(u.email))
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
