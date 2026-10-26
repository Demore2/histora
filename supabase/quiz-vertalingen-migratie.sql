-- =============================================================================================
-- Quizvragen in vier talen (1.4) — deel 1: de kolom
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Tot nu toe had een quizvraag één tekst, in het Engels, en kreeg een Nederlandse lezer dus een
-- Engelse vraag onder een Nederlands hoofdstuk. Engels blijft de basis (`question`, `options`,
-- `explanation`); de andere talen komen in `vertalingen`:
--
--   { "nl": { "question": "…", "options": ["…","…","…","…"], "explanation": "…" },
--     "fr": { … }, "de": { … } }
--
-- **De opties staan in dezelfde volgorde als de Engelse**, want `correct_answer` is een index en
-- geldt voor alle talen. Een ontbrekende taal valt in de app terug op het Engels — dezelfde regel
-- als `v()` voor de verhalen. Dat het object goed gevormd is controleert
-- `generate-interactive-content.mjs` vóór het schrijven; de database dwingt alleen af dat het een
-- object is, zodat een vierde taal later geen migratie kost.
--
-- Deel 2 (de RPC `hoofdstuk_interactie` die de kolom meestuurt) volgt in
-- `quiz-vertalingen-migratie-2.sql`. De laatste regel hieronder toont de huidige definitie van die
-- RPC, omdat die niet in de repo staat.

alter table public.story_quizzes
  add column if not exists vertalingen jsonb not null default '{}'::jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'story_quizzes_vertalingen_is_object'
  ) then
    alter table public.story_quizzes
      add constraint story_quizzes_vertalingen_is_object
      check (jsonb_typeof(vertalingen) = 'object');
  end if;
end $$;

-- Toon de huidige RPC, zodat deel 2 er precies op voortbouwt.
select pg_get_functiondef('public.hoofdstuk_interactie'::regproc) as huidige_definitie;
