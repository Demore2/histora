-- =============================================================================================
-- Beheerbord: de intro-trechter zonder eigen, test- en robotinstallaties (2026-10-30)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- `beheer_intro_trechter()` (uit `gast-accounts-migratie.sql`) telde elke installatie, ook die van
-- de beheerders, kennissen en Play-robots die de rest van het bord al weglaat. De trechter telt per
-- installatie en niet per account, dus het filter gaat via de installatie: heeft één rij van een
-- installatie een `user_id` van een beheerder of van `is_testaccount()` (die ook
-- `public.uitgesloten_accounts` leest), dan valt die hele installatie weg — ook de welkomstap van
-- vóór het inloggen, die zelf geen `user_id` heeft.
--
-- Wat dit niet kan: een installatie die nooit aan zo'n account gekoppeld werd (een gast die niet
-- bewaarde, of een verwijderd account — de cascade wist dan de rijen mét `user_id`, maar de
-- welkomstap zonder `user_id` blijft staan). Die tellen nog mee.
--
-- Nieuw: `p_intern_meetellen`, net als `beheer_statistieken`, zodat het vinkje op het bord ook hier
-- werkt. De oude functie met één parameter gaat eruit; twee overloads met standaardwaarden maken
-- een aanroep met alleen `p_dagen` dubbelzinnig.

drop function if exists public.beheer_intro_trechter(integer);

create or replace function public.beheer_intro_trechter(p_dagen integer default 30,
                                                        p_intern_meetellen boolean default false)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  return jsonb_build_object(
    'dagen', p_dagen,
    'gemeten_op', now(),
    'intern_meegeteld', p_intern_meetellen,
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
      )
      select jsonb_agg(jsonb_build_object('stap', x.stap, 'nummer', x.nummer, 'installaties', x.n)
                       order by x.nummer, x.stap)
        from (select s.stap, min(s.stap_nummer) as nummer, count(distinct s.installatie_id) as n
                from public.intro_stappen s
               where s.aangemaakt_op >= now() - make_interval(days => p_dagen)
                 and s.installatie_id not in (select w.installatie_id from weg w)
               group by s.stap) x
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function public.beheer_intro_trechter(integer, boolean) from public, anon;
grant execute on function public.beheer_intro_trechter(integer, boolean) to authenticated;
