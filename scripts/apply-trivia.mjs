#!/usr/bin/env node
// npm run trivia:apply [-- --controleer]
//
// Zet de triviavragen uit scripts/seed/trivia/<tijdperk>.json (en <tijdperk>-2.json, …) in
// `public.trivia_vragen`.
// Zonder --controleer: eerst toetsen, dan schrijven. Met --controleer: alleen toetsen.
//
// Elk bestand is een lijst van:
//   { moeilijkheid: 1|2|3, question, options: [4], correct_answer: 0..3, explanation, bron,
//     vertalingen: { nl|fr|de: { question, options: [4], explanation } } }
//
// **Schrijven is idempotent**: upsert op `(tijdperk_id, question)`, en een bestaande vraag krijgt
// de nieuwe opties, uitleg en vertalingen — zo kun je een verbeterde vraag gewoon opnieuw
// toepassen. Een vraag uit de database halen doe je met `actief = false`, niet door hem uit het
// bestand te schrappen: dit script verwijdert nooit iets.
//
// De tabel heeft RLS zonder policy (de app mag het antwoord niet vooraf lezen), dus alleen de
// service role kan hier schrijven. Zie supabase/trivia-migratie.sql.
import fs from 'node:fs';
import path from 'node:path';
import { maakSupabase, projectRoot } from './interactief-hulp.mjs';

const MAP = path.join(projectRoot, 'scripts', 'seed', 'trivia');
const TIJDPERKEN = ['oudheid', 'middeleeuwen', 'vroegmoderne-tijd', 'industriele-revolutie', 'twintigste-eeuw', 'hedendaags'];
const TALEN = ['nl', 'fr', 'de'];
const alleenControleren = process.argv.includes('--controleer');

function tekst(w) {
  return typeof w === 'string' && w.trim().length > 0;
}

function toetsVertaling(v, label, problemen) {
  if (!v || !tekst(v.question)) problemen.push(`${label}: lege vraag`);
  if (!Array.isArray(v?.options) || v.options.length !== 4 || !v.options.every(tekst)) problemen.push(`${label}: niet precies 4 opties`);
  else if (new Set(v.options).size !== 4) problemen.push(`${label}: dubbele opties`);
  if (!tekst(v?.explanation)) problemen.push(`${label}: lege toelichting`);
}

const rijen = [];
let fouten = 0;
for (const tijdperk of TIJDPERKEN) {
  // `<tijdperk>.json` plus eventuele aanvullingen `<tijdperk>-2.json`, `-3`, … — elke ronde
  // nieuwe vragen in een eigen bestand, zodat zichtbaar blijft wat erbij kwam.
  const bestanden = fs.existsSync(MAP)
    ? fs.readdirSync(MAP).filter((f) => f === `${tijdperk}.json` || new RegExp(`^${tijdperk}-\\d+\\.json$`).test(f))
    : [];
  if (bestanden.length === 0) {
    console.log(`  ${tijdperk.padEnd(22)} (nog geen bestand)`);
    continue;
  }
  const vragen = bestanden.flatMap((f) => JSON.parse(fs.readFileSync(path.join(MAP, f), 'utf8')));
  const problemen = [];
  const gezien = new Set();
  const perNiveau = [0, 0, 0];
  const perPlek = [0, 0, 0, 0];
  vragen.forEach((q, i) => {
    const label = `#${i + 1}`;
    toetsVertaling(q, `${label} en`, problemen);
    if (![1, 2, 3].includes(q.moeilijkheid)) problemen.push(`${label}: moeilijkheid ${q.moeilijkheid}`);
    else perNiveau[q.moeilijkheid - 1] += 1;
    if (!Number.isInteger(q.correct_answer) || q.correct_answer < 0 || q.correct_answer > 3) problemen.push(`${label}: correct_answer ${q.correct_answer}`);
    else perPlek[q.correct_answer] += 1;
    if (!tekst(q.bron)) problemen.push(`${label}: geen bron`);
    const sleutel = q.question?.trim().toLowerCase();
    if (gezien.has(sleutel)) problemen.push(`${label}: dubbele vraag`);
    gezien.add(sleutel);
    for (const taal of TALEN) toetsVertaling(q.vertalingen?.[taal], `${label} ${taal}`, problemen);
    rijen.push({
      tijdperk_id: tijdperk,
      moeilijkheid: q.moeilijkheid,
      question: q.question.trim(),
      options: q.options,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      vertalingen: q.vertalingen,
      bron: q.bron,
      actief: q.actief ?? true,
    });
  });

  if (problemen.length) {
    fouten += 1;
    console.log(`  ${tijdperk.padEnd(22)} FOUT`);
    for (const p of problemen) console.log(`      ! ${p}`);
  } else {
    console.log(
      `  ${tijdperk.padEnd(22)} ok — ${vragen.length} vragen, niveau ${perNiveau.join('/')}, antwoord op A/B/C/D ${perPlek.join('/')}`
    );
  }
}

if (fouten > 0) {
  console.error('\n  Niets toegepast — los eerst de fouten hierboven op.');
  process.exit(1);
}
if (alleenControleren || rijen.length === 0) process.exit(0);

const { client, soort } = maakSupabase();
if (soort !== 'secret') {
  console.error('trivia:apply heeft SUPABASE_SERVICE_ROLE_KEY nodig (RLS zonder policy op trivia_vragen).');
  process.exit(1);
}
const { error } = await client.from('trivia_vragen').upsert(rijen, { onConflict: 'tijdperk_id,question' });
if (error) {
  console.error(`  trivia_vragen: ${error.message}`);
  process.exit(1);
}
console.log(`\n  ${rijen.length} vragen toegepast.`);
process.exit(0);
