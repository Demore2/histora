// Plakt per hoofdstuk ingesproken mp3's (h0.mp3, h1.mp3, ...) aan elkaar en leidt de zinstijden af
// uit de stiltes. Voor stemmen van Higgsfield (Seed Audio), die per hoofdstuk natuurlijker klinken.
//   node scripts/vo-hoofdstukken.mjs <map-met-hN.mp3> <zinnen.json> [--pauze 1.0]
// zinnen.json = [{ i, h: hoofdstuk, zin }]. Schrijft in de map: voice.mp3 en timing.json
// [{ hoofdstuk, zin, start, eind }]. Per hoofdstuk worden de (n-1) langste stiltes de zinsgrenzen.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { duurVan, ff, ffStderr } from './hulp.mjs';

const [map, zinnenPad] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const pi = process.argv.indexOf('--pauze');
const PAUZE = pi > 0 ? Number(process.argv[pi + 1]) : 1.0;
const zinnen = JSON.parse(readFileSync(zinnenPad, 'utf8'));
const hoofdstukken = [...new Set(zinnen.map((z) => z.h))];

const timing = [];
let t = 0;
const lijst = [];
hoofdstukken.forEach((h, hi) => {
  const pad = join(map, `h${hi}.mp3`);
  const duur = duurVan(pad);
  const eigen = zinnen.filter((z) => z.h === h);
  // stiltes binnen het hoofdstuk
  const log = ffStderr(['-i', pad, '-af', 'silencedetect=n=-38dB:d=0.08', '-f', 'null', '-']);
  const st = [...log.matchAll(/silence_start: ([\d.]+)[\s\S]*?silence_end: ([\d.]+)/g)].map((m) => ({ a: +m[1], b: +m[2] }));
  const binnen = st.filter((s) => s.a > 0.2 && s.b < duur - 0.2);
  const begin = st.length && st[0].a < 0.05 ? st[0].b : 0;
  const eindSpraak = st.length && st.at(-1).b > duur - 0.05 ? st.at(-1).a : duur;
  // Kies de n-1 zinsgrenzen uit de stiltes zo dat elke zin ongeveer zo lang duurt als zijn tekst
  // (tekens x tempo), met een bonus voor lange stiltes. Alleen de langste stiltes nemen pakt soms een
  // adempauze midden in een zin.
  const n = eigen.length;
  const tekens = eigen.map((z) => z.zin.length + 8);
  const tempo = (eindSpraak - begin) / tekens.reduce((x, y) => x + y, 0);
  const verwacht = tekens.map((c) => c * tempo);
  const kand = binnen.sort((x, y) => x.a - y.a);
  const m = kand.length;
  const kost = (van, tot, k) => { const d = tot - van; return ((d - verwacht[k]) ** 2) / verwacht[k]; };
  // dp[k][j] = minimale kost als zin k eindigt op kandidaat j
  const INF = 1e18;
  const dp = Array.from({ length: n }, () => new Array(m).fill(INF));
  const terug = Array.from({ length: n }, () => new Array(m).fill(-1));
  for (let j = 0; j < m; j++) dp[0][j] = kost(begin, kand[j].a, 0) - 2 * (kand[j].b - kand[j].a);
  for (let k = 1; k < n - 1; k++)
    for (let j = k; j < m; j++)
      for (let i = k - 1; i < j; i++) {
        const c = dp[k - 1][i] + kost(kand[i].b, kand[j].a, k) - 2 * (kand[j].b - kand[j].a);
        if (c < dp[k][j]) { dp[k][j] = c; terug[k][j] = i; }
      }
  let grenzen = [];
  if (n > 1 && m >= n - 1) {
    let best = INF, bj = -1;
    for (let j = n - 2; j < m; j++) { const c = dp[n - 2][j] + kost(kand[j].b, eindSpraak, n - 1); if (c < best) { best = c; bj = j; } }
    for (let k = n - 2, j = bj; k >= 0; k--) { grenzen.unshift(kand[j]); j = terug[k][j]; }
  }
  if (grenzen.length !== n - 1) console.warn(`! ${h}: ${grenzen.length + 1} stukken voor ${n} zinnen`);
  eigen.forEach((z, k) => {
    const s = k === 0 ? begin : grenzen[k - 1]?.b ?? begin;
    const e = k === eigen.length - 1 ? eindSpraak : grenzen[k]?.a ?? eindSpraak;
    timing.push({ hoofdstuk: h, zin: z.zin, start: +(t + s).toFixed(3), eind: +(t + e).toFixed(3) });
  });
  lijst.push(pad);
  t += duur + (hi < hoofdstukken.length - 1 ? PAUZE : 0);
});

// aan elkaar met stiltes ertussen
const filters = [];
const inputs = [];
lijst.forEach((p, i) => { inputs.push('-i', p); filters.push(`[${i}:a]aresample=44100,aformat=channel_layouts=mono${i < lijst.length - 1 ? `,apad=pad_dur=${PAUZE}` : ''}[a${i}]`); });
filters.push(`${lijst.map((_, i) => `[a${i}]`).join('')}concat=n=${lijst.length}:v=0:a=1[uit]`);
ff([...inputs, '-filter_complex', filters.join(';'), '-map', '[uit]', '-b:a', '192k', join(map, 'voice.mp3')]);
writeFileSync(join(map, 'timing.json'), JSON.stringify(timing, null, 1));
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
console.log(`klaar: ${fmt(duurVan(join(map, 'voice.mp3')))} (${timing.length} zinnen)`);
let vorige = null;
for (const x of timing) if (x.hoofdstuk !== vorige) { vorige = x.hoofdstuk; console.log(`${fmt(Math.max(0, x.start - 0.5))} ${x.hoofdstuk}`); }
