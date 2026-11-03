-- =============================================================================================
-- Beheerbord, ronde 11 — de intro-trechter ook "alleen met account" (2026-11-03)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- De trechter telt installaties, niet accounts: elk toestel dat het welkomstscherm opende. Daar
-- zitten de Play-prelanceringsrobots en de reviewers van Google en Apple in (die openen de app bij
-- elke ingestuurde versie, en hebben geen e-mailadres om op te filteren), plus gasten die nooit
-- bewaarden. Nuttig om te zien waar mensen afhaken, maar het leest als "25 lezers" naast een bord
-- dat er 1 telt.
--
-- Nieuw: `p_alleen_accounts`. Aan = alleen installaties waarvan een rij aan een echt account hangt
-- (`not is_anonymous`), dus precies de lezers die het Overzicht ook telt. De oude functie met twee
-- parameters gaat eruit; overloads met standaardwaarden maken een aanroep dubbelzinnig.

-- Daarnaast: Firebase Test Lab (waar Google Play's prelanceringsrapport op draait) logt in met
-- adressen op `@cloudtestlabaccounts.com`, bij elke ingestuurde versie een nieuw. Dat hele domein is
-- een robot. De regel met `uitgesloten_accounts` is uit de live versie (zie -7.sql) en moet blijven.

create or replace function public.is_testaccount(p_email text)
returns boolean
language sql stable set search_path = ''
as $$
  select
    -- Onze eigen testaccounts.
    lower(coalesce(p_email, '')) like '%@chronicles.app'
    -- Domeinen die volgens RFC 2606 nooit echt bestaan, plus de tikfout die Google's reviewer maakte.
    or lower(coalesce(p_email, '')) ~ '@(.+\.)?(example\.(com|org|net)|exmple\.com|testdomain123\.org)$'
    or lower(coalesce(p_email, '')) ~ '\.(test|invalid|example|localhost)$'
    -- Wegwerpdomeinen van reviewers.
    or lower(coalesce(p_email, '')) ~ '@leafflip\.com$'
    -- Firebase Test Lab / Google Play's prelanceringsrobots, het hele domein.
    or lower(coalesce(p_email, '')) ~ '@cloudtestlabaccounts\.com$'
    -- Google Play's pre-launch-robot, per adres.
    or lower(coalesce(p_email, '')) in (
      'crawlerrobo@gmail.com',
      'alex_history_8899@gmail.com'
    )
    -- Kennissen, eigenaars en losse robots: per e-mail in een tabel, niet in de (publieke) repo.
    or exists (select 1 from public.uitgesloten_accounts x
                where lower(x.email) = lower(coalesce(p_email, '')));
$$;

drop function if exists public.beheer_intro_trechter(integer, boolean);

create or replace function public.beheer_intro_trechter(p_dagen integer default 30,
                                                        p_intern_meetellen boolean default false,
                                                        p_alleen_accounts boolean default false)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  return jsonb_build_object(
    'dagen', p_dagen,
    'gemeten_op', now(),
    'intern_meegeteld', p_intern_meetellen,
    'alleen_accounts', p_alleen_accounts,
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
                 and s.installatie_id not in (select w.installatie_id from weg w)
                 and (not p_alleen_accounts or s.installatie_id in (select m.installatie_id from met_account m))
               group by s.stap) x
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.beheer_intro_trechter(integer, boolean, boolean) from public, anon;
grant execute on function public.beheer_intro_trechter(integer, boolean, boolean) to authenticated;
