-- Feedbackbord, ronde 2 — zelf tickets aanmaken, de ideeënhub en de statistieken.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run.
-- Vereist feedback-beheer-migratie.sql. Idempotent: nog een keer draaien kan geen kwaad.

-- =============================================================================================
-- 1. Interne tickets — op het bord, níét in Discord
-- =============================================================================================
--
-- Een ticket dat Quinten of Mike zelf aanmaakt is een gewone rij in `feedback` met
-- `bron = 'intern'` en `user_id` = wie hem aanmaakte. Discord is uitsluitend voor feedback van
-- lezers, dus beide triggers slaan een intern ticket over — ook bij toewijzen of afvinken.

alter table public.feedback
  add column if not exists bron text not null default 'app';
alter table public.feedback drop constraint if exists feedback_bron_check;
alter table public.feedback add constraint feedback_bron_check check (bron in ('app', 'intern'));

create or replace function public.beheer_ticket_aanmaken(
  p_soort text,
  p_bericht text,
  p_toegewezen_aan text default null,
  p_prioriteit text default null
)
returns uuid
language plpgsql security definer set search_path = ''
as $$
declare
  nieuw_id uuid;
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  if p_soort not in ('bug', 'idee') then raise exception 'ongeldige_soort' using errcode = '22023'; end if;
  if coalesce(btrim(p_bericht), '') = '' then raise exception 'leeg_bericht' using errcode = '22023'; end if;

  insert into public.feedback (user_id, soort, bericht, platform, bron, status, toegewezen_aan, prioriteit)
  values (auth.uid(), p_soort, btrim(p_bericht), 'bord', 'intern', 'nieuw',
          nullif(p_toegewezen_aan, ''), nullif(p_prioriteit, ''))
  returning id into nieuw_id;

  return nieuw_id;
end;
$$;

-- De lijst krijgt `bron` erbij; een ander teruggavetype kan niet met `create or replace`.
drop function if exists public.beheer_feedback_lijst();
create function public.beheer_feedback_lijst()
returns table (
  id uuid, soort text, bericht text, app_versie text, platform text, created_at timestamptz,
  status text, toegewezen_aan text, prioriteit text, notitie text,
  bijgewerkt_op timestamptz, afgehandeld_op timestamptz, lezer_email text, bron text
)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query
    select f.id, f.soort, f.bericht, f.app_versie, f.platform, f.created_at,
           f.status, f.toegewezen_aan, f.prioriteit, f.notitie,
           f.bijgewerkt_op, f.afgehandeld_op, u.email::text, f.bron
      from public.feedback f
      left join auth.users u on u.id = f.user_id
     order by f.created_at desc;
end;
$$;

-- Bij een nieuwe rij: Discord + mail, maar niets voor een intern ticket.
create or replace function public.stuur_feedback_meldingen()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  sleutel  text;
  koppen   jsonb;
  lichaam  jsonb;
begin
  if new.bron = 'intern' then
    return new;
  end if;

  select decrypted_secret into sleutel
    from vault.decrypted_secrets
   where name = 'service_role_key'
   limit 1;

  if sleutel is null then
    return new;
  end if;

  koppen := jsonb_build_object(
    'Content-Type', 'application/json',
    'Authorization', 'Bearer ' || sleutel
  );
  lichaam := jsonb_build_object('feedback_id', new.id);

  perform net.http_post(
    url                  := 'https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-feedback-discord',
    headers              := koppen,
    body                 := lichaam,
    timeout_milliseconds := 15000
  );

  perform net.http_post(
    url                  := 'https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-feedback-email',
    headers              := koppen,
    body                 := lichaam,
    timeout_milliseconds := 15000
  );

  return new;
exception when others then
  raise warning '[feedback-meldingen] aanroep niet gestart voor %: %', new.id, sqlerrm;
  return new;
end;
$$;

-- Bij toewijzen of een statuswijziging: Discord bijwerken, maar niet voor een intern ticket.
create or replace function public.werk_feedback_discord_bij()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  sleutel text;
begin
  if new.bron = 'intern' then
    return new;
  end if;

  select decrypted_secret into sleutel from vault.decrypted_secrets
   where name = 'service_role_key' limit 1;
  if sleutel is null then return new; end if;

  perform net.http_post(
    url                  := 'https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-feedback-discord',
    headers              := jsonb_build_object('Content-Type', 'application/json',
                                               'Authorization', 'Bearer ' || sleutel),
    body                 := jsonb_build_object('feedback_id', new.id, 'actie', 'bijwerken',
                                               'vorige_toegewezen', old.toegewezen_aan),
    timeout_milliseconds := 15000
  );
  return new;
exception when others then
  raise warning '[feedback-discord-bijwerken] niet gestart voor %: %', new.id, sqlerrm;
  return new;
end;
$$;

-- =============================================================================================
-- 2. De ideeënhub
-- =============================================================================================
--
-- Ideeën, doelen en taken voor de lange termijn van Quinten en Mike zelf — geen lezersfeedback,
-- dus een eigen tabel. Alleen bereikbaar via de RPC's hieronder.

create table if not exists public.beheer_notities (
  id             uuid primary key default gen_random_uuid(),
  soort          text not null default 'idee' check (soort in ('idee', 'doel', 'taak')),
  titel          text not null check (char_length(btrim(titel)) between 1 and 200),
  inhoud         text not null default '' check (char_length(inhoud) <= 10000),
  auteur         text references public.beheerders(id) on update cascade on delete set null,
  vastgepind     boolean not null default false,
  afgerond       boolean not null default false,
  created_at     timestamptz not null default now(),
  bijgewerkt_op  timestamptz not null default now()
);
alter table public.beheer_notities enable row level security;
-- Geen policies.

create or replace function public.beheer_notities_lijst()
returns setof public.beheer_notities
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query
    select * from public.beheer_notities n
     order by n.vastgepind desc, n.afgerond asc, n.bijgewerkt_op desc;
end;
$$;

-- Zonder p_id een nieuwe notitie (auteur = wie hem maakt); met p_id een bewerking.
create or replace function public.beheer_notitie_opslaan(
  p_id uuid,
  p_soort text,
  p_titel text,
  p_inhoud text,
  p_vastgepind boolean,
  p_afgerond boolean
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
    insert into public.beheer_notities (soort, titel, inhoud, auteur, vastgepind, afgerond)
    values (p_soort, btrim(p_titel), coalesce(p_inhoud, ''), ik,
            coalesce(p_vastgepind, false), coalesce(p_afgerond, false))
    returning id into uit_id;
  else
    update public.beheer_notities n set
      soort         = p_soort,
      titel         = btrim(p_titel),
      inhoud        = coalesce(p_inhoud, ''),
      vastgepind    = coalesce(p_vastgepind, false),
      afgerond      = coalesce(p_afgerond, false),
      bijgewerkt_op = now()
     where n.id = p_id
    returning n.id into uit_id;
    if uit_id is null then raise exception 'notitie_niet_gevonden' using errcode = 'P0002'; end if;
  end if;

  return uit_id;
end;
$$;

create or replace function public.beheer_notitie_verwijderen(p_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  delete from public.beheer_notities where id = p_id;
end;
$$;

-- =============================================================================================
-- 3. Statistieken
-- =============================================================================================
--
-- Eén aanroep, één jsonb: tellers, abonnementsverdeling en reeksen per dag/week/maand.
--
-- * "Gebruiker" = een account in auth.users. Downloads staan NIET in Supabase maar in Google Play.
-- * "Actief" = iets geschreven of ingelogd in die periode: inloggen, voortgangssync, een geopend
--   verhaal, een stem, een keuze of feedback. Wie de app opent zonder iets te doen telt niet mee;
--   dat kan pas met een eigen hartslag vanuit de app.
-- * Standaard tellen jullie eigen accounts (beheerders) en de testaccounts (@chronicles.app) niet
--   mee; `p_intern_meetellen := true` zet ze erbij.
-- * Tijden in Europe/Amsterdam, zodat "vandaag" en "deze week" kloppen met de klok aan de muur.

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
                or lower(coalesce(u.email, '')) like '%@chronicles.app')
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

-- =============================================================================================
-- Rechten
-- =============================================================================================

revoke all on function
  public.beheer_ticket_aanmaken(text, text, text, text),
  public.beheer_feedback_lijst(),
  public.beheer_notities_lijst(),
  public.beheer_notitie_opslaan(uuid, text, text, text, boolean, boolean),
  public.beheer_notitie_verwijderen(uuid),
  public.beheer_statistieken(boolean)
from public, anon;
grant execute on function
  public.beheer_ticket_aanmaken(text, text, text, text),
  public.beheer_feedback_lijst(),
  public.beheer_notities_lijst(),
  public.beheer_notitie_opslaan(uuid, text, text, text, boolean, boolean),
  public.beheer_notitie_verwijderen(uuid),
  public.beheer_statistieken(boolean)
to authenticated;
