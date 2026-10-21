-- Feedbackbord (docs/beheer/) — beheerders, ticketstatus en Discord-bijwerken.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run.
-- Idempotent: nog een keer draaien kan geen kwaad.
--
-- Toegang loopt via `public.beheerders` (op e-mail), bewust NIET via premium: premium kan straks
-- iedereen kopen, en dan zou elke betalende lezer andermans feedback en e-mailadres zien.
-- Gewone lezers zien in `public.feedback` nog steeds alleen hun eigen rijen (RLS ongewijzigd);
-- het bord leest en schrijft uitsluitend via de security-definer-functies hieronder.

create table if not exists public.beheerders (
  id          text primary key,               -- korte sleutel, ook de waarde van toegewezen_aan
  naam        text not null,
  email       text not null unique,
  kleur       text not null default '#579bfc',
  discord_id  text check (discord_id is null or discord_id ~ '^[0-9]{15,21}$')
);
alter table public.beheerders enable row level security;
-- Geen policies: alleen bereikbaar via de functies hieronder.

insert into public.beheerders (id, naam, email, kleur) values
  ('quinten', 'Quinten', 'quintenraats@gmail.com', '#a25ddc'),
  ('mike',    'Mike',    'mikefuruy@gmail.com',    '#fdab3d')
on conflict (id) do nothing;

-- Discord-ID's (Discord → Ontwikkelaarsmodus → rechtsklik op je naam → Gebruikers-ID kopiëren):
-- update public.beheerders set discord_id = '123456789012345678' where id = 'quinten';
-- update public.beheerders set discord_id = '123456789012345678' where id = 'mike';

alter table public.feedback
  add column if not exists status             text not null default 'nieuw',
  add column if not exists toegewezen_aan     text references public.beheerders(id) on update cascade on delete set null,
  add column if not exists prioriteit         text,
  add column if not exists notitie            text,
  add column if not exists bijgewerkt_op      timestamptz,
  add column if not exists afgehandeld_op     timestamptz,
  add column if not exists discord_bericht_id text;

alter table public.feedback drop constraint if exists feedback_status_check;
alter table public.feedback add constraint feedback_status_check
  check (status in ('nieuw', 'in_behandeling', 'klaar'));
alter table public.feedback drop constraint if exists feedback_prioriteit_check;
alter table public.feedback add constraint feedback_prioriteit_check
  check (prioriteit is null or prioriteit in ('laag', 'normaal', 'hoog'));
alter table public.feedback drop constraint if exists feedback_notitie_lengte;
alter table public.feedback add constraint feedback_notitie_lengte
  check (notitie is null or char_length(notitie) <= 2000);

create or replace function public.is_beheerder()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.beheerders b
     where lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.beheer_ik()
returns jsonb
language sql stable security definer set search_path = ''
as $$
  select to_jsonb(b) - 'discord_id' from public.beheerders b
   where lower(b.email) = lower(coalesce(auth.jwt() ->> 'email', ''));
$$;

create or replace function public.beheer_beheerders()
returns table (id text, naam text, kleur text)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query select b.id, b.naam, b.kleur from public.beheerders b order by b.naam;
end;
$$;

create or replace function public.beheer_feedback_lijst()
returns table (
  id uuid, soort text, bericht text, app_versie text, platform text, created_at timestamptz,
  status text, toegewezen_aan text, prioriteit text, notitie text,
  bijgewerkt_op timestamptz, afgehandeld_op timestamptz, lezer_email text
)
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;
  return query
    select f.id, f.soort, f.bericht, f.app_versie, f.platform, f.created_at,
           f.status, f.toegewezen_aan, f.prioriteit, f.notitie,
           f.bijgewerkt_op, f.afgehandeld_op, u.email::text
      from public.feedback f
      left join auth.users u on u.id = f.user_id
     order by f.created_at desc;
end;
$$;

-- Null = niet aanraken; '' wist toegewezen_aan / prioriteit / notitie.
create or replace function public.beheer_feedback_bijwerken(
  p_id uuid,
  p_status text default null,
  p_toegewezen_aan text default null,
  p_prioriteit text default null,
  p_notitie text default null
)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_beheerder() then raise exception 'geen_beheerder' using errcode = '42501'; end if;

  update public.feedback f set
    status         = coalesce(p_status, f.status),
    toegewezen_aan = case when p_toegewezen_aan is null then f.toegewezen_aan
                          else nullif(p_toegewezen_aan, '') end,
    prioriteit     = case when p_prioriteit is null then f.prioriteit
                          else nullif(p_prioriteit, '') end,
    notitie        = case when p_notitie is null then f.notitie
                          else nullif(p_notitie, '') end,
    bijgewerkt_op  = now(),
    afgehandeld_op = case
                       when coalesce(p_status, f.status) = 'klaar' and f.status <> 'klaar' then now()
                       when coalesce(p_status, f.status) <> 'klaar' then null
                       else f.afgehandeld_op end
   where f.id = p_id;

  if not found then raise exception 'feedback_niet_gevonden' using errcode = 'P0002'; end if;
end;
$$;

revoke all on function public.is_beheerder(), public.beheer_ik(), public.beheer_beheerders(),
  public.beheer_feedback_lijst(),
  public.beheer_feedback_bijwerken(uuid, text, text, text, text) from public, anon;
grant execute on function public.is_beheerder(), public.beheer_ik(), public.beheer_beheerders(),
  public.beheer_feedback_lijst(),
  public.beheer_feedback_bijwerken(uuid, text, text, text, text) to authenticated;

-- Discord bijwerken als status of toewijzing verandert (niet bij een notitie: die is intern).
create or replace function public.werk_feedback_discord_bij()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  sleutel text;
begin
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

drop trigger if exists feedback_discord_na_update on public.feedback;
create trigger feedback_discord_na_update
  after update of status, toegewezen_aan on public.feedback
  for each row
  when (old.status is distinct from new.status
        or old.toegewezen_aan is distinct from new.toegewezen_aan)
  execute function public.werk_feedback_discord_bij();
