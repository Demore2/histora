-- =============================================================================================
-- Explore (1.4.1) — deel 2: de hoofdstukvragen doen ook mee
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Vereist deel 1 (`trivia-migratie.sql`).
--
-- Wens van de eigenaar (2026-10-26): elk nieuw verhaal moet de trivia vanzelf aanvullen. Daarom
-- trekt `trivia_trek` nu uit **twee bakken**: `trivia_vragen` en de quizvraag per hoofdstuk
-- (`story_quizzes`), waarbij het tijdperk van een hoofdstukvraag uit `story_catalog` komt. Er
-- wordt niets gekopieerd; een verhaal dat in `story_catalog` staat en quizvragen heeft, doet
-- automatisch mee. (Een nieuw verhaal komt in `story_catalog` met `npm run sync:verhaalcatalogus`,
-- zoals al nodig was voor de pushmeldingen.)
--
-- Twee filters op de hoofdstukvragen:
--   - precies vier opties, zoals alle triviavragen;
--   - niet als de vraag naar "the chapter" verwijst: die leest los van het verhaal als onzin.
-- Ze tellen als moeilijkheid 2: ze gaan over één verhaal en zijn dus specifieker dan de
-- algemene vragen, en mogen meedoen als kroonvraag.
--
-- `trivia_antwoord` zoekt een id eerst in `trivia_vragen` en daarna in `story_quizzes`; ids zijn
-- uuid's, dus botsen kan niet.

create or replace function public.trivia_trek(
  p_tijdperk text,
  p_gezien uuid[] default '{}',
  p_min_moeilijkheid smallint default 1
)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  rij public.trivia_levens;
  vraag record;
  gevonden boolean := false;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  if not public.trivia_is_pro(ik) then
    rij := public.trivia_levens_bij(ik);
    if rij.levens <= 0 then raise exception 'geen_levens' using errcode = 'P0001'; end if;
  end if;

  -- Eerst een ongeziene vraag van het gevraagde niveau; zijn die op, dan alles van dat niveau;
  -- en als laatste alles uit het tijdperk.
  for i in 1..3 loop
    with pool as (
      select t.id, t.tijdperk_id, t.moeilijkheid, t.question, t.options, t.vertalingen
        from public.trivia_vragen t
       where t.actief
      union all
      select q.id, c.tijdperk_id, 2::smallint, q.question, q.options, q.vertalingen
        from public.story_quizzes q
        join public.story_catalog c on c.verhaal_id = q.story_id
       where c.actief
         and array_length(q.options, 1) = 4
         and q.question !~* 'chapter'
    )
    select * into vraag from pool
     where tijdperk_id = p_tijdperk
       and (i = 3 or moeilijkheid >= p_min_moeilijkheid)
       and (i > 1 or not (id = any (coalesce(p_gezien, '{}'))))
     order by random() limit 1;
    if found then
      gevonden := true;
      exit;
    end if;
  end loop;

  if not gevonden then raise exception 'geen_vragen' using errcode = 'P0001'; end if;

  return jsonb_build_object(
    'id', vraag.id,
    'tijdperk_id', vraag.tijdperk_id,
    'moeilijkheid', vraag.moeilijkheid,
    'question', vraag.question,
    'options', to_jsonb(vraag.options),
    'vertalingen', coalesce(
      (select jsonb_object_agg(taal, tekst - 'explanation') from jsonb_each(vraag.vertalingen) as v(taal, tekst)),
      '{}'::jsonb)
  );
end;
$$;

create or replace function public.trivia_antwoord(p_vraag uuid, p_keuze smallint)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  maxi int := (public.trivia_instellingen()->>'max_levens')::int;
  vraag record;
  rij public.trivia_levens;
  goed boolean;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  select t.correct_answer, t.explanation, t.vertalingen into vraag
    from public.trivia_vragen t where t.id = p_vraag and t.actief;
  if not found then
    select q.correct_answer, q.explanation, q.vertalingen into vraag
      from public.story_quizzes q where q.id = p_vraag;
  end if;
  if not found then raise exception 'onbekende_vraag' using errcode = 'P0001'; end if;

  goed := p_keuze = vraag.correct_answer;

  if not goed and not public.trivia_is_pro(ik) then
    rij := public.trivia_levens_bij(ik);
    if rij.levens > 0 then
      update public.trivia_levens
         set levens = levens - 1,
             bijgewerkt_op = case when rij.levens >= maxi then now() else bijgewerkt_op end
       where user_id = ik;
    end if;
  end if;

  return jsonb_build_object(
    'goed', goed,
    'juiste', vraag.correct_answer,
    'explanation', vraag.explanation,
    'vertalingen', coalesce(
      (select jsonb_object_agg(taal, jsonb_build_object('explanation', tekst->'explanation'))
         from jsonb_each(vraag.vertalingen) as v(taal, tekst)),
      '{}'::jsonb),
    'stand', public.trivia_stand()
  );
end;
$$;
