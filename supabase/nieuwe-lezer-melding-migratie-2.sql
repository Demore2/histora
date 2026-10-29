-- Discord-melding "nieuwe lezer": nu mét gebruikersnaam (wens van de eigenaar, 2026-10-29).
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Draai eerst `gast-accounts-migratie.sql` (deel C); dit is diezelfde functie met één veld erbij.
-- De twee triggers (`nieuwe_lezer_na_insert`, `nieuwe_lezer_na_bewaren`) blijven staan en roepen
-- deze functie al aan, dus die worden hier niet opnieuw gemaakt.
--
-- Waar de naam vandaan komt: de `profiles`-rij bestaat op dit moment nog niet (de app maakt hem
-- pas ná de signup aan), dus de naam komt uit `raw_user_meta_data`:
--   * `username`  — e-mailregistratie (`signUp`/`updateUser` met `data: { username }`) en de
--                   naam uit de intro op een gastaccount;
--   * `full_name` / `name` — wat Google meegeeft.
-- Geen van drieën: "(geen naam)". Nog steeds géén e-mailadres of id in het bericht.
-- De naam is door de lezer getypt: `allowed_mentions` staat leeg (geen pings), Discord-opmaak
-- wordt ge-escaped en de lengte begrensd. Het privacybeleid noemt dit sinds dezelfde dag.

create or replace function public.stuur_nieuwe_lezer_melding()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  webhook  text;
  totaal   bigint;
  naam     text;
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

  naam := nullif(btrim(coalesce(
            new.raw_user_meta_data ->> 'username',
            new.raw_user_meta_data ->> 'full_name',
            new.raw_user_meta_data ->> 'name')), '');
  naam := case
            when naam is null then '*(geen naam)*'
            else regexp_replace(left(naam, 80), '([\\*_~`|>\[\]()#@-])', '\\\1', 'g')
          end;

  perform net.http_post(
    url     := webhook,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body    := jsonb_build_object(
      'allowed_mentions', jsonb_build_object('parse', '[]'::jsonb),
      'embeds', jsonb_build_array(jsonb_build_object(
        'title',       '🎉 Er heeft iemand een account aangemaakt!',
        'description', 'Histora heeft nu **' || totaal || '** ' ||
                       case when totaal = 1 then 'lezer' else 'lezers' end || '.',
        'fields',      jsonb_build_array(jsonb_build_object(
                         'name', 'Gebruikersnaam', 'value', naam, 'inline', true)),
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
