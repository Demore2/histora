-- =============================================================================================
-- Beheerbord: meer test- en robotaccounts herkennen (2026-10-27)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- `public.is_testaccount` (uit `feedback-beheer-migratie-5.sql`) is de ene plek waar staat welke
-- accounts niet meetellen in de statistieken en de Discord-melding voor nieuwe lezers. Erbij:
--   * `leafflip.com`: wegwerpdomein dat een Play-reviewer gebruikte.
--   * `alex_history_8899@gmail.com`: de pre-launch-robot van Google Play bij de upload van 1.4.3/1.4.4.
--     De robot verzint tegenwoordig "geloofwaardige" adressen die bij de app passen, ook op gmail.com,
--     dus die gaan per adres en niet per domein — op gmail.com zitten ook echte lezers.
-- Zie je een nieuw nep-adres opduiken, zet het in de lijst hieronder en draai dit bestand opnieuw.

create or replace function public.is_testaccount(p_email text)
returns boolean
language sql immutable set search_path = ''
as $$
  select
    -- Onze eigen testaccounts.
    lower(coalesce(p_email, '')) like '%@chronicles.app'
    -- Domeinen die volgens RFC 2606 nooit echt bestaan, plus de tikfout die Google's reviewer maakte.
    or lower(coalesce(p_email, '')) ~ '@(.+\.)?(example\.(com|org|net)|exmple\.com|testdomain123\.org)$'
    or lower(coalesce(p_email, '')) ~ '\.(test|invalid|example|localhost)$'
    -- Wegwerpdomeinen van reviewers.
    or lower(coalesce(p_email, '')) ~ '@leafflip\.com$'
    -- Google Play's pre-launch-robot, per adres.
    or lower(coalesce(p_email, '')) in (
      'crawlerrobo@gmail.com',
      'alex_history_8899@gmail.com'
    );
$$;
