-- Premium-meldingen in Discord — een bericht zodra iemand een proef start, betaalt of opzegt.
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run.
-- Vereist de edge function `send-premium-discord` en de secret `DISCORD_WEBHOOK_PREMIUM`.
-- Idempotent.
--
-- De trigger leest alleen de overgang tussen oud en nieuw; `revenuecat-sync` schrijft dezelfde rij
-- bij elke webhook opnieuw (ook bij een gewone verlenging), en die levert dus geen melding op.
-- Rijen zonder `product_id` zijn met de hand toegekend premium (testaccounts) en blijven stil.

create or replace function public.stuur_premium_melding()
returns trigger
language plpgsql security definer set search_path = ''
as $$
declare
  sleutel      text;
  gebeurtenis  text;
  was_premium  boolean := tg_op = 'UPDATE' and old.tier = 'premium';
begin
  if new.tier = 'premium' and new.product_id is not null then
    if not was_premium then
      gebeurtenis := case when new.trial_ends_at is not null then 'proef' else 'betalend' end;
    elsif old.trial_ends_at is not null and new.trial_ends_at is null then
      gebeurtenis := 'betalend';
    elsif coalesce(old.auto_renew, true) and new.auto_renew = false then
      gebeurtenis := 'opgezegd';
    end if;
  elsif was_premium and new.tier is distinct from 'premium' and old.product_id is not null then
    gebeurtenis := 'verlopen';
  end if;

  if gebeurtenis is null then
    return new;
  end if;

  select decrypted_secret into sleutel from vault.decrypted_secrets
   where name = 'service_role_key' limit 1;
  if sleutel is null then
    return new;
  end if;

  perform net.http_post(
    url                  := 'https://nxwdhuuouhbmykgykbov.supabase.co/functions/v1/send-premium-discord',
    headers              := jsonb_build_object('Content-Type', 'application/json',
                                               'Authorization', 'Bearer ' || sleutel),
    body                 := jsonb_build_object('user_id', new.user_id, 'gebeurtenis', gebeurtenis),
    timeout_milliseconds := 15000
  );
  return new;
exception when others then
  -- Een melding mag een aankoop nooit laten mislukken.
  raise warning '[premium-melding] niet gestart voor %: %', new.user_id, sqlerrm;
  return new;
end;
$$;

drop trigger if exists premium_melding_na_wijziging on public.user_subscriptions;
create trigger premium_melding_na_wijziging
  after insert or update on public.user_subscriptions
  for each row
  execute function public.stuur_premium_melding();
