-- =============================================================================================
-- Explore: +1 leven per advertentie — onbeperkt, maar alleen met nul levens (1.4.3, wens eigenaar)
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Vervangt `trivia_leven_bij_advertentie()` uit `trivia-advertentie-migratie.sql`; de tabel uit
-- dat bestand blijft nodig.
--
-- Twee wijzigingen (keuze van de eigenaar, 2026-10-27):
--   1. **Geen dagplafond meer.** Elke bekeken advertentie levert één leven op, zo vaak als de
--      lezer wil — elke vertoning is inkomsten.
--   2. **Alleen met nul levens.** Wie er nog één of meer heeft, kan er geen bij kijken. Zo blijft
--      het één leven per advertentie in plaats van een voorraad aanleggen. De app toont de knop
--      ook alleen in het venster "Out of lives"; dit is de serverkant van dezelfde regel.
--
-- `trivia_advertentie_levens` telt nog steeds per dag mee, maar alleen als statistiek: hoeveel
-- levens er via advertenties gekeken worden. Er wordt niets meer op afgekeurd.
-- Een app die op `advertentie_limiet` rekent (1.4.3) krijgt die fout nu nooit meer; dat is prima.

create or replace function public.trivia_leven_bij_advertentie()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  vandaag date := (now() at time zone 'utc')::date;
  rij public.trivia_levens;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  -- Eerst bijwerken tot nu: misschien is er sinds de advertentie al een leven vanzelf teruggekomen.
  rij := public.trivia_levens_bij(ik);
  if rij.levens > 0 then raise exception 'levens_niet_op' using errcode = 'P0001'; end if;

  insert into public.trivia_advertentie_levens (user_id, dag, aantal)
  values (ik, vandaag, 1)
  on conflict (user_id, dag) do update
    set aantal = public.trivia_advertentie_levens.aantal + 1;

  -- `bijgewerkt_op` blijft staan: de hersteltimer loopt gewoon door voor het volgende leven.
  update public.trivia_levens set levens = levens + 1 where user_id = ik;

  return public.trivia_stand();
end;
$$;

revoke all on function public.trivia_leven_bij_advertentie() from public, anon;
grant execute on function public.trivia_leven_bij_advertentie() to authenticated;
