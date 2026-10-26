-- =============================================================================================
-- Explore: trivia met het draaiwiel (1.4.1) — vragenbank en levens
-- =============================================================================================
--
-- Uitvoeren: Supabase-dashboard → SQL Editor → plak dit hele bestand → Run. Idempotent.
--
-- Keuzes van de eigenaar (2026-10-26): je speelt voor kroontjes en score (geen Dukaten), en
-- gratis lezers hebben **levens**: een fout antwoord kost er één, ze komen vanzelf terug. Pro
-- speelt onbeperkt.
--
-- **De app kan het juiste antwoord niet vooraf lezen.** `trivia_vragen` heeft RLS aan en géén
-- policy: alleen deze functies komen erbij. `trivia_trek` geeft een vraag zónder antwoord en
-- toelichting; `trivia_antwoord` controleert, schrijft bij een fout een leven af en geeft dan pas
-- het antwoord terug. Een select-policy op de tabel zou de levens met één REST-aanroep omzeilbaar
-- maken — dezelfde reden waarom het Dukaten-saldo een kasboek op de server is.
--
-- **Levens herstellen lui.** Er draait geen cron: bij elke aanroep wordt uitgerekend hoeveel
-- herstelmomenten er sinds `bijgewerkt_op` verstreken zijn, en dat wordt bijgeschreven. Zo telt
-- de tijd ook door als niemand de app opent.
--
-- De vragen zelf zijn redactiewerk: ze worden met de service role ingevoerd vanuit
-- `scripts/seed/trivia/` (zie `npm run trivia:apply`), net als de quizvragen per hoofdstuk.

-- ---------------------------------------------------------------------------------------------
-- Tabellen
-- ---------------------------------------------------------------------------------------------

create table if not exists public.trivia_vragen (
  id             uuid primary key default gen_random_uuid(),
  tijdperk_id    text not null check (tijdperk_id in
                   ('oudheid', 'middeleeuwen', 'vroegmoderne-tijd', 'industriele-revolutie',
                    'twintigste-eeuw', 'hedendaags')),
  moeilijkheid   smallint not null default 1 check (moeilijkheid between 1 and 3),
  question       text not null,
  options        text[] not null check (array_length(options, 1) = 4),
  correct_answer smallint not null check (correct_answer between 0 and 3),
  explanation    text,
  -- { "nl": { "question", "options", "explanation" }, "fr": …, "de": … } — opties in dezelfde
  -- volgorde als het Engels, net als `story_quizzes.vertalingen`.
  vertalingen    jsonb not null default '{}'::jsonb check (jsonb_typeof(vertalingen) = 'object'),
  -- Waar het feit op steunt, voor wie de vraag later naleest. Wordt nooit naar de app gestuurd.
  bron           text,
  actief         boolean not null default true,
  created_at     timestamptz not null default now(),
  unique (tijdperk_id, question)
);

alter table public.trivia_vragen enable row level security;
-- Bewust géén policy: zie boven.

create index if not exists idx_trivia_vragen_tijdperk
  on public.trivia_vragen (tijdperk_id) where actief;

create table if not exists public.trivia_levens (
  user_id       uuid primary key references auth.users (id) on delete cascade,
  levens        smallint not null,
  bijgewerkt_op timestamptz not null default now()
);

alter table public.trivia_levens enable row level security;

drop policy if exists "trivia_levens_eigen_select" on public.trivia_levens;
create policy "trivia_levens_eigen_select" on public.trivia_levens
  for select to authenticated using (auth.uid() = user_id);
-- Geen insert/update/delete-policy: levens wijzigen alleen via de functies hieronder.

-- ---------------------------------------------------------------------------------------------
-- Instellingen en hulpfuncties
-- ---------------------------------------------------------------------------------------------

create or replace function public.trivia_instellingen()
returns jsonb
language sql immutable
as $$
  select jsonb_build_object('max_levens', 5, 'herstel_minuten', 240);
$$;

create or replace function public.trivia_is_pro(p_user uuid)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.user_subscriptions s
     where s.user_id = p_user and s.tier = 'premium'
       and greatest(coalesce(s.subscription_ends_at, '-infinity'),
                    coalesce(s.trial_ends_at, '-infinity')) > now()
  );
$$;

/**
 * Brengt de levensrij van `p_user` bij tot nu (luie herstel) en geeft de stand terug. Maakt de rij
 * aan met volle levens als hij nog niet bestaat.
 */
create or replace function public.trivia_levens_bij(p_user uuid)
returns public.trivia_levens
language plpgsql security definer set search_path = ''
as $$
declare
  maxi int := (public.trivia_instellingen()->>'max_levens')::int;
  stap interval := make_interval(mins => (public.trivia_instellingen()->>'herstel_minuten')::int);
  rij public.trivia_levens;
  erbij int;
begin
  insert into public.trivia_levens (user_id, levens) values (p_user, maxi)
  on conflict (user_id) do nothing;

  select * into rij from public.trivia_levens where user_id = p_user for update;

  if rij.levens >= maxi then
    return rij;
  end if;

  erbij := floor(extract(epoch from (now() - rij.bijgewerkt_op)) / extract(epoch from stap));
  if erbij > 0 then
    if rij.levens + erbij >= maxi then
      rij.levens := maxi;
      rij.bijgewerkt_op := now();
    else
      rij.levens := rij.levens + erbij;
      rij.bijgewerkt_op := rij.bijgewerkt_op + stap * erbij;
    end if;
    update public.trivia_levens
       set levens = rij.levens, bijgewerkt_op = rij.bijgewerkt_op
     where user_id = p_user;
  end if;

  return rij;
end;
$$;

/** De stand zoals de app hem toont. `volgende_om` is null als de levens vol zijn. */
create or replace function public.trivia_stand()
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  maxi int := (public.trivia_instellingen()->>'max_levens')::int;
  stap interval := make_interval(mins => (public.trivia_instellingen()->>'herstel_minuten')::int);
  rij public.trivia_levens;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;
  rij := public.trivia_levens_bij(ik);
  return jsonb_build_object(
    'levens', rij.levens,
    'max_levens', maxi,
    'volgende_om', case when rij.levens < maxi then rij.bijgewerkt_op + stap end,
    'pro', public.trivia_is_pro(ik)
  );
end;
$$;

-- ---------------------------------------------------------------------------------------------
-- Spelen
-- ---------------------------------------------------------------------------------------------

/**
 * Trekt één willekeurige actieve vraag uit een tijdperk, zonder antwoord en zonder toelichting.
 * `p_gezien` zijn vragen die deze lezer in dit spel al kreeg; zijn die op, dan mag alles weer.
 * `p_min_moeilijkheid` is voor de kroonvraag. Zonder levens (en zonder Pro) gooit hij `geen_levens`.
 */
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
  vraag public.trivia_vragen;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  if not public.trivia_is_pro(ik) then
    rij := public.trivia_levens_bij(ik);
    if rij.levens <= 0 then raise exception 'geen_levens' using errcode = 'P0001'; end if;
  end if;

  select * into vraag from public.trivia_vragen
   where actief and tijdperk_id = p_tijdperk and moeilijkheid >= p_min_moeilijkheid
     and not (id = any (coalesce(p_gezien, '{}')))
   order by random() limit 1;

  if vraag.id is null then
    select * into vraag from public.trivia_vragen
     where actief and tijdperk_id = p_tijdperk and moeilijkheid >= p_min_moeilijkheid
     order by random() limit 1;
  end if;
  if vraag.id is null then
    select * into vraag from public.trivia_vragen
     where actief and tijdperk_id = p_tijdperk
     order by random() limit 1;
  end if;
  if vraag.id is null then raise exception 'geen_vragen' using errcode = 'P0001'; end if;

  return jsonb_build_object(
    'id', vraag.id,
    'tijdperk_id', vraag.tijdperk_id,
    'moeilijkheid', vraag.moeilijkheid,
    'question', vraag.question,
    'options', to_jsonb(vraag.options),
    -- Vertalingen zonder toelichting: die verraadt het antwoord, en komt pas uit `trivia_antwoord`.
    'vertalingen', coalesce(
      (select jsonb_object_agg(taal, tekst - 'explanation') from jsonb_each(vraag.vertalingen) as v(taal, tekst)),
      '{}'::jsonb)
  );
end;
$$;

/**
 * Controleert een antwoord. Fout en geen Pro: één leven eraf. Pas hier komen het juiste antwoord
 * en de toelichting (in alle talen) terug, plus de nieuwe stand.
 */
create or replace function public.trivia_antwoord(p_vraag uuid, p_keuze smallint)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  ik uuid := auth.uid();
  maxi int := (public.trivia_instellingen()->>'max_levens')::int;
  vraag public.trivia_vragen;
  rij public.trivia_levens;
  goed boolean;
begin
  if ik is null then raise exception 'geen_sessie' using errcode = '42501'; end if;

  select * into vraag from public.trivia_vragen where id = p_vraag and actief;
  if vraag.id is null then raise exception 'onbekende_vraag' using errcode = 'P0001'; end if;

  goed := p_keuze = vraag.correct_answer;

  if not goed and not public.trivia_is_pro(ik) then
    rij := public.trivia_levens_bij(ik);
    if rij.levens > 0 then
      update public.trivia_levens
         set levens = levens - 1,
             -- Waren de levens vol, dan begint de hersteltimer nu; anders loopt hij gewoon door.
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

-- ---------------------------------------------------------------------------------------------
-- Rechten
-- ---------------------------------------------------------------------------------------------

revoke all on function public.trivia_is_pro(uuid) from public, anon, authenticated;
revoke all on function public.trivia_levens_bij(uuid) from public, anon, authenticated;
revoke all on function public.trivia_stand() from public, anon;
revoke all on function public.trivia_trek(text, uuid[], smallint) from public, anon;
revoke all on function public.trivia_antwoord(uuid, smallint) from public, anon;
grant execute on function public.trivia_stand() to authenticated;
grant execute on function public.trivia_trek(text, uuid[], smallint) to authenticated;
grant execute on function public.trivia_antwoord(uuid, smallint) to authenticated;
