// Eigen achtergrondmuziek, uitgerekend op de timing van de stem (geen samples, geen AI).
// Gebruik: npm run music -- <id>   (na `npm run timing`; de partituur staat in scripts/music/<id>.mjs)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PUBLIC, ROOT, ff, id, leesTiming, timingPad } from './hulp.mjs';

const videoId = id();
const timing = leesTiming(videoId);
if (!timing) { console.error('Eerst `npm run timing -- ' + videoId + '`.'); process.exit(1); }
const partituur = join(ROOT, 'scripts/music', `${videoId}.mjs`);
if (!existsSync(partituur)) { console.error(`Geen partituur: scripts/music/${videoId}.mjs`); process.exit(1); }

const map = join(PUBLIC, videoId);
mkdirSync(join(map, 'tmp'), { recursive: true });
const ruw = join(map, 'tmp', 'music-raw.wav');
const score = (await import(pathToFileURL(partituur).href)).default;
score({
  s: (i) => timing.beats[i][0],
  e: (i) => timing.beats[i][1],
  cta: timing.cta[0],
  total: timing.total,
  out: ruw,
});
ff(['-i', ruw, '-af', 'acompressor=threshold=-30dB:ratio=3.5:attack=15:release=400:makeup=6,loudnorm=I=-22:TP=-3:LRA=11', '-ar', '48000', join(map, 'music.wav')]);
writeFileSync(timingPad(videoId), JSON.stringify({ ...timing, hasMusic: true }, null, 2) + '\n');
console.log('muziek: public/' + videoId + '/music.wav');
