#!/usr/bin/env node
// npm run generate:quizvragen [-- vlaggen]
//
// Eén quizvraag per hoofdstuk, in vier talen (1.4). Per verhaal één aanroep die twee dingen doet:
//   1. een nieuwe vraag schrijven voor elk hoofdstuk dat er nog geen heeft, en
//   2. de bestaande (Engelse) vragen vertalen naar nl/fr/de.
// Het resultaat landt in scripts/seed/quizvragen/<id>.json plus een <id>.md om na te lezen.
//
// Vlaggen:
//   --only <ids>   alleen deze verhalen (komma's)
//   --force        ook verhalen die al compleet zijn (opnieuw genereren overschrijft de JSON)
//   --apply        NIET genereren, maar de nagelezen JSON-bestanden naar Supabase schrijven
//   --controleer   NIET genereren, maar de JSON-bestanden op schijf toetsen en de .md opnieuw
//                  schrijven — voor sets die met de hand geschreven of verbeterd zijn
//   --model <id>   ander model (standaard claude-opus-5-5)
//
// **Genereren en toepassen zijn twee losse runs, en --apply leest van schijf.** Zo staat er in de
// database precies wat er nagelezen is — ook als je in de JSON iets met de hand hebt verbeterd —
// en niet een tweede generatie die niemand gezien heeft.
//
// Waarom geen uitbreiding van generate-interactive-content.mjs: dat script schrijft peilingen en
// keuzepunten, en die toont de app vanaf 1.4 niet meer. Het blijft staan voor de geschiedenis.
import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';
import { hoofdstukTekst, laadVerhalen, leesEnv, maakSupabase, projectRoot } from './interactief-hulp.mjs';

const argv = process.argv.slice(2);
function vlagWaarde(naam) {
  const i = argv.indexOf(naam);
  return i >= 0 ? argv[i + 1] : undefined;
}

const alleenIds = (vlagWaarde('--only') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const forceren = argv.includes('--force');
const toepassen = argv.includes('--apply');
const controleren = argv.includes('--controleer');
const MODEL = vlagWaarde('--model') ?? 'claude-opus-5-5';

const TALEN = ['nl', 'fr', 'de'];
const AANTAL_OPTIES = 4;
const UITVOER_MAP = path.join(projectRoot, 'scripts', 'seed', 'quizvragen');

// ── Wat we van het model terug willen ────────────────────────────────────────────────────────
const VERTALING = {
  type: 'object',
  properties: {
    question: { type: 'string' },
    options: { type: 'array', items: { type: 'string' } },
    explanation: { type: 'string' },
  },
  required: ['question', 'options', 'explanation'],
  additionalProperties: false,
};

const ANTWOORD_SCHEMA = {
  type: 'object',
  properties: {
    new_quizzes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          chapter: { type: 'integer' },
          question: { type: 'string' },
          options: { type: 'array', items: { type: 'string' } },
          correct_answer: { type: 'integer' },
          explanation: { type: 'string' },
          nl: VERTALING,
          fr: VERTALING,
          de: VERTALING,
        },
        required: ['chapter', 'question', 'options', 'correct_answer', 'explanation', 'nl', 'fr', 'de'],
        additionalProperties: false,
      },
    },
    translations: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'string' }, nl: VERTALING, fr: VERTALING, de: VERTALING },
        required: ['id', 'nl', 'fr', 'de'],
        additionalProperties: false,
      },
    },
  },
  required: ['new_quizzes', 'translations'],
  additionalProperties: false,
};

const SYSTEEM = `You write the quiz question that follows each chapter in Histora, a history reading app.
After "Mark Complete" the reader must answer one question before the next chapter unlocks. Any
answer counts: the app shows the right one with your explanation and moves on. It is a moment of
learning, not an exam.

A QUIZ QUESTION
- Tests something the chapter text you are given actually says. Not general knowledge about the
  period, not a detail from another chapter. If the text does not support it, do not ask it.
- Asks about something that matters in the chapter — a decision, a cause, a turning point, a
  person's role — not a trivial number the reader had no reason to remember.
- Has exactly ${AANTAL_OPTIES} short options (a few words each). Exactly one is right. The other three are
  plausible to someone who skimmed, from the same category (four places, four people, four
  years), never absurd and never "all of the above".
- Vary where the right answer sits; do not always put it first.
- The explanation is one or two sentences that add something the question did not say — a
  consequence, a detail, why it mattered — not a restatement of the answer.
- English, plain and concrete, in the register of the story. No exclamation marks, no "Did you
  know?!", no second-person hype.

TRANSLATIONS (nl, fr, de) — for new questions and for the existing ones you are given
- Natural, idiomatic text a native speaker would write, not a word-for-word copy.
- The options array has the same length and the SAME ORDER as the English one: correct_answer is
  an index shared by all four languages.
- Use the established name of a person or place in that language (Charlemagne → Karel de Grote /
  Charlemagne / Karl der Große; Joan of Arc → Jeanne d'Arc). Years: "52 BC" → "52 v.Chr." /
  "52 av. J.-C." / "52 v. Chr.".
- Dutch addresses the reader with "je", German with "du", French with "vous" — the rest of the app
  does the same.
- Translate an existing question faithfully; do not improve or change its facts.`;

function bouwPrompt(verhaal, bestaand, ontbrekend) {
  const tekst = (verhaal.chapters ?? [])
    .map((c) => `--- Chapter ${c.id}: ${c.titel.en} ---\n${hoofdstukTekst(c)}`)
    .join('\n\n');

  const teVertalen = bestaand.length
    ? bestaand
        .map((q) =>
          JSON.stringify({
            id: q.id,
            chapter: q.chapter_index,
            question: q.question,
            options: q.options,
            correct_answer: q.correct_answer,
            explanation: q.explanation,
          })
        )
        .join('\n')
    : '(none)';

  return `Story: "${verhaal.titel.en}" — ${verhaal.ondertitel.en}
Central figure: ${verhaal.personage.naam}
Period: ${verhaal.periodeLabel} (${verhaal.jaar})

1. Write exactly one new quiz question for each of these chapters: ${ontbrekend.length ? ontbrekend.join(', ') : '(none)'}.
   Each one is about its own chapter. Do not repeat what an existing question below already asks.

2. Translate each of these existing questions into nl, fr and de. Return them under "translations"
   with the same id:
${teVertalen}

The chapters:

${tekst}`;
}

// ── Validatie ────────────────────────────────────────────────────────────────────────────────
//
// Wat het schema niet kan afdwingen: precies vier opties, een antwoord binnen de opties, een
// vertaling met evenveel opties als het Engels, elk ontbrekend hoofdstuk precies één keer, en elk
// bestaand id precies één keer. Een verhaal met één fout wordt in zijn geheel afgekeurd — een half
// verhaal toepassen laat hoofdstukken zonder vraag achter, en dat is precies wat dit oplost.
function schoon(waarde) {
  return typeof waarde === 'string' ? waarde.trim().replace(/\s+/g, ' ') : '';
}

function schoneVertaling(v, aantalOpties, label, problemen) {
  const vraag = schoon(v?.question);
  const opties = (v?.options ?? []).map(schoon).filter(Boolean);
  const uitleg = schoon(v?.explanation);
  if (!vraag) problemen.push(`${label}: lege vraag`);
  if (opties.length !== aantalOpties) problemen.push(`${label}: ${opties.length} opties, verwacht ${aantalOpties}`);
  if (new Set(opties).size !== opties.length) problemen.push(`${label}: dubbele opties`);
  return { question: vraag, options: opties, explanation: uitleg };
}

function valideer(data, bestaand, ontbrekend) {
  const problemen = [];
  const nieuw = [];
  const vertalingen = [];

  const nogNodig = new Set(ontbrekend);
  for (const quiz of data.new_quizzes ?? []) {
    const label = `nieuw h${quiz.chapter}`;
    if (!nogNodig.has(quiz.chapter)) {
      problemen.push(`${label}: hoofdstuk niet gevraagd of dubbel`);
      continue;
    }
    nogNodig.delete(quiz.chapter);

    const en = schoneVertaling(quiz, AANTAL_OPTIES, `${label} en`, problemen);
    if (!Number.isInteger(quiz.correct_answer) || quiz.correct_answer < 0 || quiz.correct_answer >= AANTAL_OPTIES) {
      problemen.push(`${label}: correct_answer ${quiz.correct_answer} valt buiten de opties`);
    }
    const vertaald = {};
    for (const taal of TALEN) vertaald[taal] = schoneVertaling(quiz[taal], AANTAL_OPTIES, `${label} ${taal}`, problemen);

    nieuw.push({ chapter_index: quiz.chapter, ...en, correct_answer: quiz.correct_answer, vertalingen: vertaald });
  }
  for (const h of nogNodig) problemen.push(`hoofdstuk ${h}: geen nieuwe vraag ontvangen`);

  const bestaandPerId = new Map(bestaand.map((q) => [q.id, q]));
  const nogTeVertalen = new Set(bestaandPerId.keys());
  for (const t of data.translations ?? []) {
    const origineel = bestaandPerId.get(t.id);
    if (!origineel || !nogTeVertalen.has(t.id)) {
      problemen.push(`vertaling ${t.id}: onbekend of dubbel id`);
      continue;
    }
    nogTeVertalen.delete(t.id);
    const vertaald = {};
    for (const taal of TALEN) {
      vertaald[taal] = schoneVertaling(t[taal], origineel.options.length, `vertaling h${origineel.chapter_index} ${taal}`, problemen);
    }
    vertalingen.push({ id: t.id, chapter_index: origineel.chapter_index, vertalingen: vertaald });
  }
  for (const id of nogTeVertalen) problemen.push(`vertaling ${id}: ontbreekt`);

  return { nieuw, vertalingen, problemen };
}

// ── Om na te lezen ───────────────────────────────────────────────────────────────────────────
function naarMarkdown(verhaal, bestaand, resultaat) {
  const regels = [`# ${verhaal.titel.en}`, ''];
  const blok = (kop, en, correct, vertaald) => {
    regels.push(`## ${kop}`, '', `**${en.question}**`, '');
    en.options.forEach((o, i) => regels.push(`${i === correct ? '- ✅' : '-'} ${o}`));
    regels.push('', `_${en.explanation}_`, '');
    const nl = vertaald.nl;
    regels.push(`**NL:** ${nl.question}`, '');
    nl.options.forEach((o, i) => regels.push(`${i === correct ? '- ✅' : '-'} ${o}`));
    regels.push('', `_${nl.explanation}_`, '');
  };

  const perHoofdstuk = [
    ...resultaat.nieuw.map((q) => ({ h: q.chapter_index, kop: `Hoofdstuk ${q.chapter_index} — nieuw`, en: q, correct: q.correct_answer, v: q.vertalingen })),
    ...resultaat.vertalingen.map((t) => {
      const q = bestaand.find((b) => b.id === t.id);
      const en = t.correctie ?? q;
      const kop = t.correctie ? 'bestaand, GECORRIGEERD en vertaald' : 'bestaand, vertaald';
      return { h: q.chapter_index, kop: `Hoofdstuk ${q.chapter_index} — ${kop}`, en, correct: en.correct_answer, v: t.vertalingen };
    }),
  ].sort((a, b) => a.h - b.h);

  for (const r of perHoofdstuk) blok(r.kop, r.en, r.correct, r.v);
  return regels.join('\n');
}

// ── Controleren ──────────────────────────────────────────────────────────────────────────────
//
// Dezelfde eisen als valideer(), maar dan voor de vorm op schijf, plus wat pas over het hele
// verhaal heen te zien is: na toepassen heeft elk hoofdstuk een vraag, en elke vraag drie talen.
function setsOpSchijf() {
  const bestanden = fs.existsSync(UITVOER_MAP) ? fs.readdirSync(UITVOER_MAP).filter((f) => f.endsWith('.json')) : [];
  return bestanden
    .map((f) => f.replace(/\.json$/, ''))
    .filter((id) => alleenIds.length === 0 || alleenIds.includes(id));
}

async function controleer(client, verhalen) {
  const { data: alleQuizzes, error } = await client
    .from('story_quizzes')
    .select('id, story_id, chapter_index, question, options, correct_answer, explanation, vertalingen');
  if (error) throw new Error(`story_quizzes: ${error.message}`);

  let fouten = 0;
  for (const id of setsOpSchijf()) {
    const verhaal = verhalen.find((v) => v.id === id);
    const problemen = [];
    if (!verhaal) {
      console.log(`  ${id.padEnd(24)} FOUT — hoort bij geen bekend verhaal`);
      fouten += 1;
      continue;
    }
    const set = JSON.parse(fs.readFileSync(path.join(UITVOER_MAP, `${id}.json`), 'utf8'));
    const bestaand = alleQuizzes.filter((q) => q.story_id === id);
    const perId = new Map(bestaand.map((q) => [q.id, q]));

    for (const q of set.nieuw ?? []) {
      const label = `nieuw h${q.chapter_index}`;
      schoneVertaling(q, AANTAL_OPTIES, `${label} en`, problemen);
      if (!Number.isInteger(q.correct_answer) || q.correct_answer < 0 || q.correct_answer >= AANTAL_OPTIES) {
        problemen.push(`${label}: correct_answer ${q.correct_answer} valt buiten de opties`);
      }
      for (const taal of TALEN) schoneVertaling(q.vertalingen?.[taal], AANTAL_OPTIES, `${label} ${taal}`, problemen);
    }
    const vertaaldeIds = new Set();
    for (const t of set.vertalingen ?? []) {
      const origineel = perId.get(t.id);
      if (!origineel) { problemen.push(`vertaling ${t.id}: onbekend id`); continue; }
      vertaaldeIds.add(t.id);
      // Een `correctie` vervangt de Engelse vraag zelf — voor een bestaande vraag met een
      // feitelijke fout. Dan gelden de vertalingen tegen het aantal opties van de correctie.
      let aantalOpties = origineel.options.length;
      if (t.correctie) {
        const c = t.correctie;
        aantalOpties = (c.options ?? []).length;
        schoneVertaling(c, AANTAL_OPTIES, `correctie h${origineel.chapter_index} en`, problemen);
        if (!Number.isInteger(c.correct_answer) || c.correct_answer < 0 || c.correct_answer >= aantalOpties) {
          problemen.push(`correctie h${origineel.chapter_index}: correct_answer ${c.correct_answer} valt buiten de opties`);
        }
      }
      for (const taal of TALEN) {
        schoneVertaling(t.vertalingen?.[taal], aantalOpties, `vertaling h${origineel.chapter_index} ${taal}`, problemen);
      }
    }

    const gedekt = new Set([...bestaand.map((q) => q.chapter_index), ...(set.nieuw ?? []).map((q) => q.chapter_index)]);
    for (const c of verhaal.chapters ?? []) if (!gedekt.has(c.id)) problemen.push(`hoofdstuk ${c.id}: geen vraag`);
    for (const h of (set.nieuw ?? []).map((q) => q.chapter_index)) {
      if (!(verhaal.chapters ?? []).some((c) => c.id === h)) problemen.push(`hoofdstuk ${h} bestaat niet`);
    }
    for (const q of bestaand) {
      if (!vertaaldeIds.has(q.id) && !TALEN.every((t) => q.vertalingen?.[t])) problemen.push(`h${q.chapter_index}: bestaande vraag niet vertaald`);
    }

    if (problemen.length > 0) {
      console.log(`  ${id.padEnd(24)} FOUT`);
      for (const p of problemen) console.log(`      ! ${p}`);
      fouten += 1;
      continue;
    }
    fs.writeFileSync(path.join(UITVOER_MAP, `${id}.md`), naarMarkdown(verhaal, bestaand, set) + '\n', 'utf8');
    console.log(`  ${id.padEnd(24)} ok — ${set.nieuw.length} nieuw, ${set.vertalingen.length} vertaald`);
  }
  return fouten;
}

// ── Toepassen ────────────────────────────────────────────────────────────────────────────────
async function pasToe(client, verhalen) {
  const doelen = setsOpSchijf();
  if (doelen.length === 0) {
    console.log('Niets toe te passen in scripts/seed/quizvragen/.');
    return;
  }

  const bekend = new Set(verhalen.map((v) => v.id));
  for (const id of doelen) {
    if (!bekend.has(id)) throw new Error(`${id}.json hoort bij geen bekend verhaal`);
    const set = JSON.parse(fs.readFileSync(path.join(UITVOER_MAP, `${id}.json`), 'utf8'));

    // Nieuwe vragen: één upsert, `on conflict do nothing` op de bestaande unique constraint, zodat
    // twee keer toepassen niets verdubbelt.
    if (set.nieuw.length > 0) {
      const rijen = set.nieuw.map((q) => ({
        story_id: id,
        chapter_index: q.chapter_index,
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation || null,
        vertalingen: q.vertalingen,
      }));
      const { error } = await client
        .from('story_quizzes')
        .upsert(rijen, { onConflict: 'story_id,chapter_index,question', ignoreDuplicates: true });
      if (error) throw new Error(`${id} nieuw: ${error.message}`);
    }

    // Bestaande vragen: alleen de kolom vertalingen, per id. Twintig verhalen × een paar rijen.
    for (const t of set.vertalingen) {
      const wijziging = { vertalingen: t.vertalingen };
      if (t.correctie) {
        Object.assign(wijziging, {
          question: t.correctie.question,
          options: t.correctie.options,
          correct_answer: t.correctie.correct_answer,
          explanation: t.correctie.explanation || null,
        });
      }
      const { error } = await client.from('story_quizzes').update(wijziging).eq('id', t.id);
      if (error) throw new Error(`${id} vertaling ${t.id}: ${error.message}`);
    }
    console.log(`  ${id.padEnd(24)} ${set.nieuw.length} nieuw, ${set.vertalingen.length} vertaald`);
  }
}

// ── Uitvoeren ────────────────────────────────────────────────────────────────────────────────
const verhalen = await laadVerhalen();
const { client, soort } = maakSupabase();
if (soort !== 'secret') {
  console.error('Dit script heeft SUPABASE_SERVICE_ROLE_KEY nodig (zie interactief-hulp.mjs: anon ziet nul rijen).');
  process.exit(1);
}

if (controleren) {
  process.exit((await controleer(client, verhalen)) > 0 ? 1 : 0);
}
if (toepassen) {
  // Eerst toetsen: een set met een fout gaat er niet half in.
  if ((await controleer(client, verhalen)) > 0) {
    console.error('\n  Niets toegepast — los eerst de fouten hierboven op.');
    process.exit(1);
  }
  await pasToe(client, verhalen);
  process.exit(0);
}

const apiKey = leesEnv('ANTHROPIC_API_KEY');
if (!apiKey) {
  console.error('ANTHROPIC_API_KEY niet gevonden (omgeving of .env.local).');
  process.exit(1);
}
const anthropic = new Anthropic({ apiKey });

const { data: alleQuizzes, error: leesFout } = await client
  .from('story_quizzes')
  .select('id, story_id, chapter_index, question, options, correct_answer, explanation, vertalingen');
if (leesFout) throw new Error(`story_quizzes: ${leesFout.message}`);

let doelen = verhalen;
if (alleenIds.length > 0) {
  const onbekend = alleenIds.filter((id) => !verhalen.some((v) => v.id === id));
  if (onbekend.length > 0) {
    console.error(`Onbekende verhaal-id(s): ${onbekend.join(', ')}`);
    process.exit(1);
  }
  doelen = verhalen.filter((v) => alleenIds.includes(v.id));
}

fs.mkdirSync(UITVOER_MAP, { recursive: true });
console.log(`Model: ${MODEL}\n`);

const mislukt = [];
for (const verhaal of doelen) {
  const bestaand = alleQuizzes.filter((q) => q.story_id === verhaal.id);
  const metVraag = new Set(bestaand.map((q) => q.chapter_index));
  const ontbrekend = (verhaal.chapters ?? []).map((c) => c.id).filter((h) => !metVraag.has(h));
  const onvertaald = bestaand.filter((q) => !TALEN.every((t) => q.vertalingen?.[t]));

  process.stdout.write(`  ${verhaal.id.padEnd(24)} `);
  if (!forceren && ontbrekend.length === 0 && onvertaald.length === 0) {
    console.log('compleet');
    continue;
  }
  // Met --force wordt alles wat er staat opnieuw vertaald; anders alleen wat nog niet vertaald is.
  const teVertalen = forceren ? bestaand : onvertaald;

  try {
    const stream = anthropic.beta.messages.stream({
      model: MODEL,
      max_tokens: 64000,
      system: SYSTEEM,
      thinking: { type: 'adaptive' },
      output_config: { effort: 'high', format: { type: 'json_schema', schema: ANTWOORD_SCHEMA } },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      messages: [{ role: 'user', content: bouwPrompt(verhaal, teVertalen, ontbrekend) }],
    });
    const bericht = await stream.finalMessage();

    if (bericht.stop_reason === 'refusal') throw new Error(`geweigerd (${bericht.stop_details?.category ?? 'onbekend'})`);
    if (bericht.stop_reason === 'max_tokens') throw new Error('antwoord afgekapt (max_tokens)');
    const tekstBlok = bericht.content.find((b) => b.type === 'text');
    if (!tekstBlok) throw new Error('geen tekstblok in het antwoord');

    const resultaat = valideer(JSON.parse(tekstBlok.text), teVertalen, ontbrekend);
    if (resultaat.problemen.length > 0) throw new Error(resultaat.problemen.join('; '));

    const { nieuw, vertalingen } = resultaat;
    fs.writeFileSync(path.join(UITVOER_MAP, `${verhaal.id}.json`), JSON.stringify({ nieuw, vertalingen }, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(UITVOER_MAP, `${verhaal.id}.md`), naarMarkdown(verhaal, teVertalen, resultaat) + '\n', 'utf8');
    console.log(`${nieuw.length} nieuw, ${vertalingen.length} vertaald`);
  } catch (fout) {
    console.log(`MISLUKT — ${fout.message}`);
    mislukt.push(verhaal.id);
  }
}

if (mislukt.length > 0) console.log(`\n  Mislukt: ${mislukt.join(', ')}  (opnieuw met --only)`);
console.log('\n  Nalezen in scripts/seed/quizvragen/*.md, daarna: npm run generate:quizvragen -- --apply');
process.exit(mislukt.length > 0 ? 1 : 0);
