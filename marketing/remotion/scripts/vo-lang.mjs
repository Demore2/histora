// Voice-over voor lange YouTube-video's met Kokoro (lokaal, gratis), uit een script.md.
//   node scripts/vo-lang.mjs <pad/naar/script.md> [--stem am_onyx] [--speed 1.0]
// Elke niet-lege regel onder een `## `-kop = één zin. Lege regel = korte pauze, nieuwe kop = hoofdstukpauze.
// Alles na "## Fact notes" wordt genegeerd. Schrijft naast het script:
//   voice.mp3   de hele opname
//   timing.json [{ hoofdstuk, zin, start, eind }] in seconden, voor de animatie en de YouTube-hoofdstukken
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { RawAudio } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';
import { ff } from './hulp.mjs';

const args = process.argv.slice(2);
const pad = args.find((a) => !a.startsWith('--'));
if (!pad) throw new Error('Gebruik: node scripts/vo-lang.mjs <script.md> [--stem am_onyx] [--speed 1.0]');
const opt = (n, d) => (args.includes(n) ? args[args.indexOf(n) + 1] : d);
const stem = opt('--stem', 'am_onyx');
const speed = Number(opt('--speed', '1'));

const PAUZE_ZIN = 0.35;
const PAUZE_LEEG = 0.7;
const PAUZE_HOOFDSTUK = 1.3;

// regels lezen
const items = [];
let hoofdstuk = null;
for (const ruw of readFileSync(pad, 'utf8').split(/\r?\n/)) {
  const r = ruw.trim();
  if (r.startsWith('## ')) {
    hoofdstuk = r.slice(3).trim();
    if (hoofdstuk === 'Fact notes') break;
    if (items.length) items.push({ pauze: PAUZE_HOOFDSTUK });
    continue;
  }
  if (!hoofdstuk) continue;
  if (!r) { if (items.length && !items.at(-1).pauze) items.push({ pauze: PAUZE_LEEG }); continue; }
  items.push({ hoofdstuk, zin: r });
}

const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', { dtype: 'q8', device: 'cpu' });
const stukken = [];
const timing = [];
let sr = 24000;
let t = 0;
let n = 0;
for (const it of items) {
  if (it.pauze) { stukken.push(new Float32Array(Math.round(it.pauze * sr))); t += it.pauze; continue; }
  // Kokoro valt bij komma's lang stil: weg voor de stem (de ondertitels houden ze)
  const a = await tts.generate(it.zin.replace(/,\s*/g, ' ').replace(/:\s*/g, '. '), { voice: stem, speed });
  sr = a.sampling_rate;
  const duur = a.audio.length / sr;
  timing.push({ hoofdstuk: it.hoofdstuk, zin: it.zin, start: +t.toFixed(3), eind: +(t + duur).toFixed(3) });
  stukken.push(a.audio, new Float32Array(Math.round(PAUZE_ZIN * sr)));
  t += duur + PAUZE_ZIN;
  if (++n % 10 === 0) console.log(`${n} zinnen, ${t.toFixed(1)} s`);
}
const totaal = new Float32Array(stukken.reduce((s, x) => s + x.length, 0));
let o = 0;
for (const x of stukken) { totaal.set(x, o); o += x.length; }
const wav = join(tmpdir(), 'vo-lang.wav');
await new RawAudio(totaal, sr).save(wav);
const uit = dirname(pad);
ff(['-i', wav, '-ar', '44100', '-b:a', '192k', join(uit, 'voice.mp3')]);
writeFileSync(join(uit, 'timing.json'), JSON.stringify(timing, null, 1));
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const hoofdstukken = [];
for (const x of timing) if (!hoofdstukken.length || hoofdstukken.at(-1)[0] !== x.hoofdstuk) hoofdstukken.push([x.hoofdstuk, x.start]);
console.log(`klaar: ${fmt(t)} (${timing.length} zinnen)`);
for (const [h, s] of hoofdstukken) console.log(`${fmt(Math.max(0, s - (s ? 0.6 : 0)))} ${h}`);
