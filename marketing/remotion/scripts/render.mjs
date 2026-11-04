// Rendert een video naar zijn map in marketing/shorts/30-seconds-of-history/<te-posten|gepost>/<nn>-<id>/renders/,
// plus frame 1 als png (de eerste indruk) en de omslag (src/sjabloon/Cover.tsx).
// Gebruik: npm run render -- <id>
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, SHORTS, id, leesTiming } from './hulp.mjs';

const videoId = id();
const timing = leesTiming(videoId);
if (!timing) { console.error('Eerst `npm run timing -- ' + videoId + '`.'); process.exit(1); }

const zoekMap = () => {
  for (const status of ['te-posten', 'gepost']) {
    const dir = join(SHORTS, status);
    const hit = existsSync(dir) && readdirSync(dir).find((d) => d.replace(/^\d+-/, '') === videoId);
    if (hit) return join(dir, hit, 'renders');
  }
  return join(ROOT, 'out');
};
const uit = zoekMap();
mkdirSync(uit, { recursive: true });
const achtervoegsel = timing.source === 'voice' ? (timing.voice && timing.voice !== 'take' ? `-${timing.voice}` : '') : `-${timing.source}`;
const mp4 = join(uit, `${videoId}-30s-remotion${achtervoegsel}.mp4`);

const remotion = (args) => execFileSync(process.execPath, [join(ROOT, 'node_modules/@remotion/cli/remotion-cli.js'), ...args], { stdio: 'inherit', cwd: ROOT });
remotion(['render', 'src/index.ts', videoId, mp4]);
remotion(['still', 'src/index.ts', videoId, join(uit, `${videoId}-frame1.png`), '--frame=0']);
remotion(['still', 'src/index.ts', `${videoId}-cover`, join(uit, `${videoId}-cover.png`)]);
if (timing.source !== 'voice') console.log(`\nLet op: dit is een ${timing.source}-versie (geen echte stem) — niet posten.`);
console.log('klaar:', mp4);
