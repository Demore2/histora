-- Beheerbord, ronde 9 — kosten voor het Overzicht.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- De meeste diensten (Supabase, EAS, Higgsfield, ElevenLabs, Apple) hebben geen API voor hun
-- rekening, dus de kosten staan hier met de hand. Een post is een bedrag per maand, per jaar of
-- eenmalig, met een begin en een optioneel einde; het Overzicht rekent alles om naar een maand.
-- Bedragen in centen, zodat er niets afrondt.
--
-- Zelfde regels als `beheer_notities`: RLS aan zonder policies, alles via security-definer-functies
-- die `geen_beheerder` gooien voor ieder ander.

create table if not exists public.beheer_kosten (
  id             uuid primary key default gen_random_uuid(),
  naam           text not null check (char_length(btrim(naam)) between 1 and 120),
  categorie      text not null default 'overig'
                 check (categorie in ('hosting', 'ontwikkeling', 'content', 'marketing', 'winkel', 'overig')),
  bedrag_cent    integer not null check (bedrag_cent >= 0),
  valuta         text not null default 'EUR' check (valuta in ('EUR', 'USD')),
  interval       text not null default 'maand' check (interval in ('maand', 'jaar', 'eenmalig')),
  begin_op       date not null default current_date,
  eind_op        date,
  notitie        text not null default '' check (char_length(notitie) <= 1000),
  auteur         text references public.beheerders(id) on update cascade on delete set null,
  created_at     timestamptz not null default now(),
  bijgewerkt_op  timestamptz not null default now(),
  check (eind_op is null or eind_op >= begin_op)
);
alter table public.beheer_kosten enable row level security;
-- Geen policies.

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

create or replace function public.beheer_kost_opslaan(
  p_id          uuid,
  p_naam        text,
  p_categorie   text,
  p_bedrag_cent integer,
  p_valuta      text,
  p_interval    text,
  p_begin_op    date,
  p_eind_op     date,
  p_notitie     text
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
      (naam, categorie, bedrag_cent, valuta, interval, begin_op, eind_op, notitie, auteur)
    values
      (btrim(p_naam), coalesce(p_categorie, 'overig'), p_bedrag_cent, coalesce(p_valuta, 'EUR'),
       coalesce(p_interval, 'maand'), coalesce(p_begin_op, current_date), p_eind_op,
       coalesce(p_notitie, ''), ik)
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
      bijgewerkt_op = now()
     where k.id = p_id
    returning k.id into uit_id;
    if uit_id is null then raise exception 'kost_niet_gevonden' using errcode = 'P0002'; end if;
  end if;

  return uit_id;
end;
$$;

-- Een post is beheerdata, geen lezersdata: verwijderen mag hier wel (zoals een hub-notitie).
create or replace function public.beheer_kost_verwijderen(p_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  delete from public.beheer_kosten where id = p_id;
end;
$$;

revoke all on function
  public.beheer_kosten_lijst(),
  public.beheer_kost_opslaan(uuid, text, text, integer, text, text, date, date, text),
  public.beheer_kost_verwijderen(uuid)
from public, anon;
grant execute on function
  public.beheer_kosten_lijst(),
  public.beheer_kost_opslaan(uuid, text, text, integer, text, text, date, date, text),
  public.beheer_kost_verwijderen(uuid)
to authenticated;
