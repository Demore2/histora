#!/usr/bin/env node
// posten-klaar.mjs: zet één short klaar voor YouTube + Instagram + TikTok in één keer.
//
//   node marketing/posten-klaar.mjs <map-van-de-short>          # klaarzetten
//   node marketing/posten-klaar.mjs <map> --check               # alleen controleren, niets schrijven
//
// Wat het doet, zodat Claude in de browser alleen nog hoeft te klikken (goedkoop in credits):
//  1. zoekt *-zonder-muziek.mp4 en (optioneel) *-met-muziek.mp4 in de map;
//  2. controleert de lengte (max 58 s, zie feedback-shorts-max-58s);
//  3. maakt van elk een *-upload.mp4 van < 10 MB (2-pass, logbestanden in %TEMP%, niet in de map);
//  4. leest youtube.md: titel, beschrijving, vastgezette reactie, Instagram- en TikTok-caption
//     (geen "## TikTok"-sectie? dan wordt hij afgeleid uit de beschrijving);
//  5. schrijft posten.json (alles wat in de browser geplakt wordt, met absolute paden).
//
// Daarna in Chrome, per platform één keer posten.json lezen en plakken. Zie marketing/README.md → "Posten".

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const MAX_SEC = 58;
const MAX_MB = 9.6; // browseruploads (MBS, TikTok) weigeren > 10 MB
const args = process.argv.slice(2);
const check = args.includes('--check');
const mapArg = args.find((a) => !a.startsWith('--'));
if (!mapArg) {
  console.error('Gebruik: node marketing/posten-klaar.mjs <map-van-de-short> [--check]');
  process.exit(2);
}
const map = path.resolve(mapArg);
const fouten = [];
const waarschuwingen = [];

const ff = (bin) => (process.platform === 'win32' && fs.existsSync(`G:/dev-tools/ffmpeg/${bin}.exe`) ? `G:/dev-tools/ffmpeg/${bin}.exe` : bin);
const duur = (f) =>
  Number(execFileSync(ff('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim());
const mb = (f) => fs.statSync(f).size / 1024 / 1024;

// zoek in de map zelf en in upload/ (gepost-mappen)
const kandidaten = [map, path.join(map, 'upload'), path.join(map, 'werk')].filter((d) => fs.existsSync(d));
const alle = kandidaten.flatMap((d) => fs.readdirSync(d).map((n) => path.join(d, n)));
const zoek = (re) => alle.find((f) => re.test(path.basename(f)) && !/-upload\.mp4$/.test(f));

function uploadVersie(bron) {
  if (!bron) return null;
  const doel = bron.replace(/\.mp4$/, '-upload.mp4');
  if (mb(bron) <= MAX_MB) return bron;
  if (fs.existsSync(doel) && fs.statSync(doel).mtimeMs >= fs.statSync(bron).mtimeMs && mb(doel) <= MAX_MB) return doel;
  if (check) {
    waarschuwingen.push(`${path.basename(doel)} ontbreekt of is verouderd (wordt gemaakt zonder --check)`);
    return doel;
  }
  const sec = duur(bron);
  const kbps = Math.floor(((MAX_MB * 8 * 1024) / sec) - 160); // 160 kbps audio
  const log = path.join(os.tmpdir(), `posten-klaar-${process.pid}`);
  const basis = ['-y', '-i', bron, '-c:v', 'libx264', '-b:v', `${kbps}k`, '-preset', 'medium', '-pix_fmt', 'yuv420p', '-passlogfile', log];
  console.log(`  2-pass naar ${kbps} kbps: ${path.basename(doel)}`);
  execFileSync(ff('ffmpeg'), [...basis, '-pass', '1', '-an', '-f', 'mp4', os.platform() === 'win32' ? 'NUL' : '/dev/null'], { stdio: 'ignore' });
  execFileSync(ff('ffmpeg'), [...basis, '-pass', '2', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', doel], { stdio: 'ignore' });
  if (mb(doel) > MAX_MB) fouten.push(`${path.basename(doel)} is nog ${mb(doel).toFixed(1)} MB`);
  return doel;
}

// ---- tekst uit youtube.md ----
const mdPad = alle.find((f) => path.basename(f) === 'youtube.md');
if (!mdPad) {
  console.error(`Geen youtube.md in ${map}`);
  process.exit(1);
}
const md = fs.readFileSync(mdPad, 'utf8').replace(/\r\n/g, '\n');
const sectie = (re) => {
  const m = md.split(/\n(?=## )/).find((s) => re.test(s.split('\n')[0]));
  return m ? m.split('\n').slice(1).join('\n').trim() : '';
};
const titel = sectie(/^## Titel/).split('\n')[0].trim();
const beschrijving = sectie(/^## Beschrijving/);
const reactie = sectie(/^## Vastgezette reactie/).split('\n')[0].trim();
const gerelateerd = (sectie(/^## Gerelateerde video/).match(/https?:\/\/\S+/) || [null])[0];
// IG/TikTok-secties beginnen vaak met een uitlegregel in backticks; de caption is de rest
const caption = (s) => s.split('\n').filter((r) => !/^`|^Caption|^\*\*Caption|\(alleen Engels\)/.test(r.trim())).join('\n').trim();
const hashtags = (t) => t.match(/#[\p{L}\p{N}_]+/gu) || [];

const instagram = caption(sectie(/^## Instagram/)) || beschrijving.replace(/#shorts\s*/g, '').trim();
let tiktok = caption(sectie(/^## TikTok/));
if (!tiktok) {
  // afgeleid: beschrijving zonder #shorts en zonder "on the channel"-regels (TikTok heeft geen link), max 5 tags
  const tekst = beschrijving
    .split('\n')
    .filter((r) => !/on the channel|^#/.test(r))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const tags = [...new Set(hashtags(beschrijving).filter((h) => h !== '#shorts'))];
  const gekozen = [...tags.filter((h) => h !== '#history').slice(0, 3), '#history', '#historytok'];
  const kop = titel.replace(/#shorts/g, '').trim(); // TikTok heeft geen titelveld: de vraag gaat bovenaan
  tiktok = `${kop} ${tekst}\n\n${gekozen.join(' ')}`;
  waarschuwingen.push('geen "## TikTok"-sectie in youtube.md, caption afgeleid uit de beschrijving');
}
if (!titel) fouten.push('geen titel');
if (!reactie) waarschuwingen.push('geen vastgezette reactie');
if (/histora|app store|play store/i.test(`${titel} ${beschrijving} ${instagram} ${tiktok} ${reactie}`))
  fouten.push('app-link/"Histora" in de tekst (niet toegestaan tot iOS live is)');
if (tiktok.length > 2200) fouten.push(`TikTok-caption ${tiktok.length} tekens (max 2200)`);
if (hashtags(instagram).length > 5) waarschuwingen.push(`Instagram heeft ${hashtags(instagram).length} hashtags (advies 3-5)`);

// ---- vertalingen: tabel "| taal | titel | beschrijving |" onder "## Vertalingen" ----
// studio = de taalnaam zoals YouTube Studio (NL-interface) hem in "Taal toevoegen" toont
const STUDIO = { es: 'Spaans', pt: 'Portugees', hi: 'Hindi', id: 'Indonesisch', ar: 'Arabisch', ur: 'Urdu', tr: 'Turks', fa: 'Perzisch',
  ms: 'Maleis', ru: 'Russisch', fr: 'Frans', de: 'Duits', it: 'Italiaans', nl: 'Nederlands', ky: 'Kirgizisch', ka: 'Georgisch' };
const talen = sectie(/^## Vertalingen/)
  .split('\n')
  .filter((r) => /^\|\s*[a-z]{2}\s*\|/.test(r))
  .map((r) => {
    const [code, t, b] = r.split('|').slice(1, 4).map((x) => x.trim());
    return { code, studio: STUDIO[code] || code, titel: t, beschrijving: b };
  });
if (!talen.length) waarschuwingen.push('geen vertalingentabel in youtube.md');

// ---- video's ----
const zonder = zoek(/zonder-muziek\.mp4$/);
const met = zoek(/met-muziek\.mp4$/);
const omslag = alle.find((f) => path.basename(f) === 'omslag.png') || null;
if (!zonder) fouten.push('geen *-zonder-muziek.mp4');
if (!omslag) waarschuwingen.push('geen omslag.png');
for (const f of [zonder, met].filter(Boolean)) {
  const s = duur(f);
  if (s > MAX_SEC + 0.5) waarschuwingen.push(`${path.basename(f)} duurt ${s.toFixed(1)} s (> ${MAX_SEC} s: TikTok-/IG-muziek stopt na 1:00)`);
}
console.log(`Short: ${titel || '(geen titel)'}`);
const zonderUpload = uploadVersie(zonder);
const metUpload = uploadVersie(met);

const uit = {
  titel,
  map,
  bestanden: {
    youtube: metUpload, // nummer ingebakken, Studio in de browser
    instagram: zonderUpload, // + "Amour plastique" (bovenste gewone) in MBS
    tiktok: zonderUpload, // + Favorites → 01:00 "Amour plastique", einde naar het einde van de video slepen
    omslag,
  },
  youtube: { titel, beschrijving, gerelateerd, reactie, tijd: '19:00 NL', talen },
  instagram: { caption: instagram, tijd: '17:00 NL', audio: 'Amour plastique (bovenste gewone, NIET Napoleon\'s Song)', reactie },
  tiktok: { caption: tiktok, tijd: '17:00 NL (zelfde als Instagram; alleen YouTube 19:00)', audio: 'Favorites → Amour plastique 01:00', aiLabel: false, reactie },
};

for (const w of waarschuwingen) console.log(`  ⚠ ${w}`);
for (const f of fouten) console.log(`  ✗ ${f}`);
if (!check) {
  fs.writeFileSync(path.join(map, 'posten.json'), JSON.stringify(uit, null, 2) + '\n');
  console.log(`  ✓ ${path.join(map, 'posten.json')}`);
}
process.exit(fouten.length ? 1 : 0);
