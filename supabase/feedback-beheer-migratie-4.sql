-- Beheerbord, ronde 4 — de ideeënhub als bord: status, prioriteit en eigenaar.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- De hub groepeert sindsdien net als de tickets op status (Open → Mee bezig → Wacht op →
-- Afgerond) en een item slepen zet die status. Prioriteit heeft drie standen: hoog (rood),
-- medium (oranje) en lang = lange termijn (blauw). Bestaande items komen op `open`, of op
-- `afgerond` als ze al afgevinkt waren; de kolom `afgerond` blijft bestaan en loopt mee.

alter table public.beheer_notities
  add column if not exists status     text not null default 'open',
  add column if not exists prioriteit text,
  add column if not exists eigenaar   text references public.beheerders(id) on update cascade on delete set null;

alter table public.beheer_notities drop constraint if exists beheer_notities_status_check;
alter table public.beheer_notities add constraint beheer_notities_status_check
  check (status in ('open', 'in_behandeling', 'wacht', 'afgerond'));
alter table public.beheer_notities drop constraint if exists beheer_notities_prioriteit_check;
alter table public.beheer_notities add constraint beheer_notities_prioriteit_check
  check (prioriteit is null or prioriteit in ('hoog', 'medium', 'lang'));

update public.beheer_notities set status = 'afgerond' where afgerond and status = 'open';

create or replace function public.beheer_notities_lijst()
returns setof public.beheer_notities
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query
    select * from public.beheer_notities n
     order by n.vastgepind desc, n.bijgewerkt_op desc;
end;
$$;

-- Opslaan uit het venster: alles in één keer. Nieuwe handtekening, dus de oude eerst weg.
drop function if exists public.beheer_notitie_opslaan(uuid, text, text, text, boolean, boolean);
create or replace function public.beheer_notitie_opslaan(
  p_id uuid,
  p_soort text,
  p_titel text,
  p_inhoud text,
  p_vastgepind boolean,
  p_status text,
  p_prioriteit text,
  p_eigenaar text
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
    insert into public.beheer_notities
      (soort, titel, inhoud, auteur, vastgepind, status, prioriteit, eigenaar, afgerond)
    values
      (p_soort, btrim(p_titel), coalesce(p_inhoud, ''), ik, coalesce(p_vastgepind, false),
       coalesce(p_status, 'open'), nullif(p_prioriteit, ''), nullif(p_eigenaar, ''),
       coalesce(p_status, 'open') = 'afgerond')
    returning id into uit_id;
  else
    update public.beheer_notities n set
      soort         = p_soort,
      titel         = btrim(p_titel),
      inhoud        = coalesce(p_inhoud, ''),
      vastgepind    = coalesce(p_vastgepind, false),
      status        = coalesce(p_status, n.status),
      prioriteit    = nullif(p_prioriteit, ''),
      eigenaar      = nullif(p_eigenaar, ''),
      afgerond      = coalesce(p_status, n.status) = 'afgerond',
      bijgewerkt_op = now()
     where n.id = p_id
    returning n.id into uit_id;
    if uit_id is null then raise exception 'notitie_niet_gevonden' using errcode = 'P0002'; end if;
  end if;

  return uit_id;
end;
$$;

-- Eén veld bijwerken vanaf het bord (slepen, een keuzemenu). Null = niet aanraken, '' = wissen.
create or replace function public.beheer_notitie_bijwerken(
  p_id uuid,
  p_status text default null,
  p_prioriteit text default null,
  p_eigenaar text default null,
  p_vastgepind boolean default null
)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  update public.beheer_notities n set
    status        = coalesce(p_status, n.status),
    afgerond      = coalesce(p_status, n.status) = 'afgerond',
    prioriteit    = case when p_prioriteit is null then n.prioriteit else nullif(p_prioriteit, '') end,
    eigenaar      = case when p_eigenaar is null then n.eigenaar else nullif(p_eigenaar, '') end,
    vastgepind    = coalesce(p_vastgepind, n.vastgepind),
    bijgewerkt_op = now()
   where n.id = p_id;

  if not found then raise exception 'notitie_niet_gevonden' using errcode = 'P0002'; end if;
end;
$$;

revoke all on function
  public.beheer_notitie_opslaan(uuid, text, text, text, boolean, text, text, text),
  public.beheer_notitie_bijwerken(uuid, text, text, text, boolean)
from public, anon;
grant execute on function
  public.beheer_notitie_opslaan(uuid, text, text, text, boolean, text, text, text),
  public.beheer_notitie_bijwerken(uuid, text, text, text, boolean)
to authenticated;
