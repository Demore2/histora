-- Melding in Discord (#nieuwe-lezers) zodra iemand een account aanmaakt.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Vereist het Vault-geheim `discord_webhook_nieuwe_lezers` (de webhook-URL, zie onderaan); zonder
-- dat geheim gebeurt er niets.
--
-- Bewust zonder edge function: het bericht heeft niets nodig wat de database niet al weet, dus
-- de trigger post zelf via pg_net (schema `net`, asynchroon — de signup wacht er niet op).
-- Er gaat geen e-mailadres, naam of id mee, alleen het aantal: zo hoeft het privacybeleid niet
-- aangepast te worden. Beheerders en test-/robotaccounts (`is_testaccount`) blijven stil en tellen
-- niet mee, dezelfde regel als `beheer_statistieken`.
--
-- Tijdelijk bedoeld, voor de beginperiode. Uitzetten:
--   drop trigger if exists nieuwe_lezer_na_insert on auth.users;

create or replace function public.stuur_nieuwe_lezer_melding()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  webhook  text;
  totaal   bigint;
begin
  if public.is_testaccount(new.email)
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
   where not public.is_testaccount(u.email)
     and lower(coalesce(u.email, '')) not in (select lower(b.email) from public.beheerders b);

  perform net.http_post(
    url     := webhook,
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body    := jsonb_build_object(
      'allowed_mentions', jsonb_build_object('parse', '[]'::jsonb),
      'embeds', jsonb_build_array(jsonb_build_object(
        'title',       '🎉 Er heeft iemand een account aangemaakt!',
        'description', 'Histora heeft nu **' || totaal || '** ' ||
                       case when totaal = 1 then 'lezer' else 'lezers' end || '.',
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

drop trigger if exists nieuwe_lezer_na_insert on auth.users;
create trigger nieuwe_lezer_na_insert
  after insert on auth.users
  for each row
  execute function public.stuur_nieuwe_lezer_melding();

-- ---------------------------------------------------------------------------------------------
-- Eenmalig, los uitvoeren met je eigen webhook-URL (zet die nooit in de repo of in een chat):
--
--   select vault.create_secret('https://discord.com/api/webhooks/…', 'discord_webhook_nieuwe_lezers');
--
-- URL vervangen:
--   select vault.update_secret(id, 'https://discord.com/api/webhooks/…')
--     from vault.secrets where name = 'discord_webhook_nieuwe_lezers';
--
-- Testen zonder account aan te maken (stuurt een echt bericht naar het kanaal):
--   select net.http_post(
--     url := (select decrypted_secret from vault.decrypted_secrets where name = 'discord_webhook_nieuwe_lezers'),
--     headers := '{"Content-Type":"application/json"}'::jsonb,
--     body := '{"content":"Testbericht van Histora 👋"}'::jsonb);
