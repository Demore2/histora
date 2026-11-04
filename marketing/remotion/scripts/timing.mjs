// Maakt de voice-over van een video strak en schrijft de timing waar het sjabloon op draait.
// Gebruik: npm run timing -- <id> [--take voice/kandidaten/x.mp3] [--cta voice/kandidaten/x-cta.mp3] [--tempo 1.1]
//
// Bron, in deze volgorde:
//   1. voice/<id>/take.(wav|mp3|m4a)   één doorlopende opname van de echte stem. De zinnen worden met
//                                       silencedetect gevonden; er moeten er precies zoveel zijn als beats
//                                       (te veel → de kortste pauzes worden samengevoegd).
//   2. voice/<id>/placeholder/NN.wav    per beat (npm run vo:placeholder).
//   3. niets                             geschat op 165 woorden per minuut, video zonder stem.
// De afsluiter: voice/shared/cta.(wav|mp3), anders cta-placeholder.wav.
//
// Pauzes worden ingekort tot `pauseAfter` uit de config (standaard 0.18 s); de stem begint op frame 0.
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { PUBLIC, ROOT, VOICE, duurVan, eerste, ff, ffStderr, id, laadConfig, timingPad } from './hulp.mjs';

const videoId = id();
const config = await laadConfig(videoId);
const N = config.beats.length;
const PAUZE = 0.18, VOOR_CTA = 0.3, NA_CTA = 0.45, PAD = 0.04;
const uitMap = join(PUBLIC, videoId);
const tmp = join(uitMap, 'tmp');
mkdirSync(tmp, { recursive: true });

const arg = (naam) => { const i = process.argv.indexOf(naam); return i > 0 ? resolve(ROOT, process.argv[i + 1]) : undefined; };
// --tempo 1.1 versnelt opname en afsluiter zonder de toonhoogte te veranderen (atempo), vóór het knippen.
// Zonder vlag: `voiceTempo` uit de config, anders 1.1 (Alistair, rustig: video's van ~35-40 s).
const TEMPO = process.argv.includes('--tempo') ? Number(process.argv[process.argv.indexOf('--tempo') + 1]) : (config.voiceTempo ?? 1.1);
const take = arg('--take') ?? eerste(...['wav', 'mp3', 'm4a'].map((e) => join(VOICE, videoId, `take.${e}`)));
const phMap = join(VOICE, videoId, 'placeholder');
const ph = existsSync(phMap) ? readdirSync(phMap).filter((f) => /^\d\d\.wav$/.test(f)).sort() : [];
const cta = arg('--cta') ?? eerste(join(VOICE, 'shared', 'cta.wav'), join(VOICE, 'shared', 'cta.mp3'), join(VOICE, 'shared', 'cta-placeholder.wav'));

/** Spraakstukken [start, eind] uit silencedetect. */
const spraak = (file, ruis = -35, minStil = 0.14) => {
  const log = ffStderr(['-i', file, '-af', `silencedetect=noise=${ruis}dB:d=${minStil}`, '-f', 'null', '-']);
  const totaal = duurVan(file);
  const stil = [...log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)].map((m) => [+m[1], +m[2]]);
  const uit = [];
  let p = 0;
  for (const [a, e] of stil) { if (a - p > 0.05) uit.push([p, a]); p = e; }
  if (totaal - p > 0.05) uit.push([p, totaal]);
  return uit;
};

/** Knip [a, e] uit `bron` naar een 48 kHz stereo wav, met piepkleine fades tegen klikken. */
const knip = (bron, a, e, uit) => ff(['-ss', Math.max(0, a - PAD).toFixed(3), '-to', (e + PAD).toFixed(3), '-i', bron,
  '-af', 'afade=t=in:d=0.015,areverse,afade=t=in:d=0.03,areverse', '-ar', '48000', '-ac', '2', uit]);
const stilte = (sec, uit) => ff(['-f', 'lavfi', '-t', sec.toFixed(3), '-i', 'anullsrc=r=48000:cl=stereo', uit]);
/** Hele bestand, met de stilte aan begin en eind weggeknipt. */
const bijgesneden = (bron, uit) => ff(['-i', bron, '-af',
  'silenceremove=start_periods=1:start_threshold=-42dB,areverse,silenceremove=start_periods=1:start_threshold=-42dB,afade=t=in:d=0.03,areverse',
  '-ar', '48000', '-ac', '2', uit]);

let stukken; // per beat een wav
let bron;
if (take) {
  bron = 'voice';
  const bronTake = join(tmp, 'take.wav');
  ff(['-i', take, '-af', `atempo=${TEMPO}`, '-ar', '48000', '-ac', '2', bronTake]);
  let seg = spraak(bronTake);
  // --grens 12.4 (herhaalbaar, seconden ná het tempo): de pauze rond dat moment is een zinsgrens en wordt nooit
  // samengevoegd. Voor een opname waarin een komma langer pauzeert dan een punt.
  const grenzen = process.argv.flatMap((a, i) => (a === '--grens' ? [Number(process.argv[i + 1])] : []));
  const vast = (k) => grenzen.some((t) => t >= seg[k][1] - 0.05 && t <= seg[k + 1][0] + 0.05);
  while (seg.length > N) {
    // Voeg de twee stukken met de kortste pauze ertussen samen.
    let k = -1;
    for (let i = 0; i < seg.length - 1; i++) {
      if (vast(i)) continue;
      if (k < 0 || seg[i + 1][0] - seg[i][1] < seg[k + 1][0] - seg[k][1]) k = i;
    }
    if (k < 0) break;
    seg.splice(k, 2, [seg[k][0], seg[k + 1][1]]);
  }
  if (seg.length < N) {
    console.error(`De opname heeft ${seg.length} zinnen, de config ${N} beats. Gevonden:`);
    seg.forEach(([a, e], i) => console.error(`  ${i}: ${a.toFixed(2)}–${e.toFixed(2)}`));
    console.error('Laat de stem tussen de beats een korte pauze nemen, of voeg beats samen in de config.');
    process.exit(1);
  }
  // Controle: woorden per seconde per zin. Een uitschieter betekent dat twee zinnen verkeerd zijn samengevoegd.
  seg.forEach(([a, e], i) => {
    const w = config.beats[i].say.split(/\s+/).length;
    console.log(`  ${String(i).padStart(2)} ${(e - a).toFixed(2)}s ${(w / (e - a)).toFixed(1)} w/s  ${config.beats[i].say}`);
  });
  stukken = seg.map(([a, e], i) => { const uit = join(tmp, `b${i}.wav`); knip(bronTake, a, e, uit); return uit; });
} else if (ph.length === N) {
  bron = 'placeholder';
  stukken = ph.map((f, i) => { const uit = join(tmp, `b${i}.wav`); bijgesneden(join(phMap, f), uit); return uit; });
} else {
  bron = 'estimate';
}

let t = 0;
const beats = [];
const delen = [];
if (stukken) {
  stukken.forEach((s, i) => {
    const d = duurVan(s);
    beats.push([+t.toFixed(3), +(t + d).toFixed(3)]);
    delen.push(s);
    t += d;
    const p = i < N - 1 ? (config.beats[i].pauseAfter ?? PAUZE) : VOOR_CTA;
    const g = join(tmp, `g${i}.wav`); stilte(p, g); delen.push(g); t += p;
  });
} else {
  config.beats.forEach((b, i) => {
    const d = b.say.split(/\s+/).length / (165 / 60) + 0.15;
    beats.push([+t.toFixed(3), +(t + d).toFixed(3)]);
    t += d + (i < N - 1 ? (b.pauseAfter ?? PAUZE) : VOOR_CTA);
  });
}

let ctaTijd;
if (stukken && cta) {
  const c0 = join(tmp, 'cta-ruw.wav'); bijgesneden(cta, c0);
  const c = join(tmp, 'cta.wav'); ff(['-i', c0, '-af', `atempo=${TEMPO}`, c]);
  const d = duurVan(c);
  ctaTijd = [+t.toFixed(3), +(t + d).toFixed(3)];
  delen.push(c);
  t += d;
} else {
  ctaTijd = [+t.toFixed(3), +(t + 2.2).toFixed(3)];
  t += 2.2;
}
const total = +(t + NA_CTA).toFixed(3);

if (stukken) {
  const lijst = join(tmp, 'lijst.txt');
  writeFileSync(lijst, delen.map((p) => `file '${p.replaceAll('\\', '/')}'`).join('\n'));
  ff(['-f', 'concat', '-safe', '0', '-i', lijst, '-af', `apad=whole_dur=${total},loudnorm=I=-14:TP=-1.5:LRA=7`, '-ar', '48000', join(uitMap, 'vo.wav')]);
}

const timing = {
  source: bron,
  ...(take ? { voice: basename(take, extname(take)) } : {}),
  beats,
  cta: ctaTijd,
  total,
  hasVoice: Boolean(stukken),
  hasMusic: existsSync(join(uitMap, 'music.wav')),
};
writeFileSync(timingPad(videoId), JSON.stringify(timing, null, 2) + '\n');
console.log(`timing (${bron}): ${N} beats, cta ${ctaTijd[0]}s, totaal ${total}s`);
if (timing.hasMusic) console.log('Let op: music.wav is van de vorige timing — draai `npm run music -- ' + videoId + '` opnieuw.');
if (total > 30.5) console.log(`Waarschuwing: ${total}s is langer dan de 30 s uit de checklist.`);
