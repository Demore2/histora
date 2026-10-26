-- =============================================================================================
-- Quizvragen in vier talen (1.4) — deel 2: de RPC stuurt de vertalingen mee
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
-- Vereist deel 1 (`quiz-vertalingen-migratie.sql`, de kolom `story_quizzes.vertalingen`).
--
-- Dit is de definitie die op 2026-10-26 live stond (opgehaald met `pg_get_functiondef`), met één
-- toevoeging: `'vertalingen', q.vertalingen` in het quiz-object. Verder is er niets veranderd.
--
-- **De peilingen en keuzepunten blijven erin, ook al toont 1.4 ze niet meer.** Lezers op 1.3.1 en
-- ouder roepen dezelfde RPC aan en verwachten die twee lijsten; een RPC die ze weglaat breekt hun
-- vragenpaneel. Een oudere app negeert de nieuwe sleutel `vertalingen` gewoon
-- (`leesQuiz` in `src/lib/interactief.ts` leest alleen de velden die hij kent).
--
-- `create or replace` laat de bestaande `grant execute` staan, dus die hoeft niet opnieuw.

create or replace function public.hoofdstuk_interactie(p_story_id text, p_chapter_index integer)
 returns jsonb
 language sql
 stable security definer
 set search_path to 'public'
as $function$
  select jsonb_build_object(
    'quizzes', coalesce((
      select jsonb_agg(
               jsonb_build_object(
                 'id', q.id,
                 'question', q.question,
                 'options', to_jsonb(q.options),
                 'correct_answer', q.correct_answer,
                 'explanation', q.explanation,
                 'vertalingen', q.vertalingen
               ) order by q.volgorde, q.created_at)
      from story_quizzes q
      where q.story_id = p_story_id and q.chapter_index = p_chapter_index
    ), '[]'::jsonb),

    'polls', coalesce((
      select jsonb_agg(
               jsonb_build_object(
                 'id', p.id,
                 'question', p.question,
                 'options', to_jsonb(p.options),
                 'resultaten', (
                   select coalesce(jsonb_agg(t.aantal order by t.idx), '[]'::jsonb)
                   from (
                     select g.idx, count(r.id) as aantal
                     from generate_series(1, array_length(p.options, 1)) as g(idx)
                     left join poll_responses r
                       on r.poll_id = p.id and r.selected_option = g.idx - 1
                     group by g.idx
                   ) t
                 ),
                 'mijn_keuze', (
                   select r.selected_option
                   from poll_responses r
                   where r.poll_id = p.id and r.user_id = auth.uid()
                   limit 1
                 )
               ) order by p.volgorde, p.created_at)
      from story_polls p
      where p.story_id = p_story_id and p.chapter_index = p_chapter_index
    ), '[]'::jsonb),

    'choices', coalesce((
      select jsonb_agg(
               jsonb_build_object(
                 'id', c.id,
                 'choice_point_id', c.choice_point_id,
                 'prompt', c.prompt,
                 'options', to_jsonb(c.options),
                 'resultaten', (
                   select coalesce(jsonb_agg(t.aantal order by t.idx), '[]'::jsonb)
                   from (
                     select g.idx, count(u.id) as aantal
                     from generate_series(1, array_length(c.options, 1)) as g(idx)
                     left join user_choices u
                       on u.choice_id = c.id and u.selected_option = g.idx - 1
                     group by g.idx
                   ) t
                 ),
                 'mijn_keuze', (
                   select u.selected_option
                   from user_choices u
                   where u.choice_id = c.id and u.user_id = auth.uid()
                   limit 1
                 )
               ) order by c.volgorde, c.created_at)
      from story_choices c
      where c.story_id = p_story_id and c.chapter_index = p_chapter_index
    ), '[]'::jsonb)
  );
$function$;

-- Het hulpje waarmee deze definitie is opgehaald is niet meer nodig.
drop function if exists public.tijdelijk_toon_interactie_definitie();
