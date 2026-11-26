// trial-hooks.mjs: rendert één What-if als drie trial reels (hook A/B/C), zonder muziek (die gaat er in de
// Instagram-app op), plus het eerste frame van elke variant om de opening naast elkaar te zien.
// Plan: marketing/trial-reels-plan.md. Hooks per persoon: <NAAM>_HOOKS in src/watals/WatAls<Naam>.tsx.
//
//   node scripts/trial-hooks.mjs <id>                 # bijv. stalin → out/trials/stalin/hook-{A,B,C}.mp4 + .png
//   node scripts/trial-hooks.mjs <id> --alleen-frames # alleen de drie eerste frames (snel nakijken)
//
// Daarna per variant `node marketing/posten-klaar.mjs` niet nodig: de mp4's zijn voor de trials in de app.
// Renderen gaat met --gl=angle (videokaart), anders duurt een short veel langer.
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const alleenFrames = args.includes('--alleen-frames');
if (!id) {
  console.error('Gebruik: node scripts/trial-hooks.mjs <id> [--alleen-frames]');
  process.exit(2);
}
const uit = join(ROOT, 'out', 'trials', id);
mkdirSync(uit, { recursive: true });
const remotion = (a) => execFileSync(process.execPath, [join(ROOT, 'node_modules/@remotion/cli/remotion-cli.js'), ...a], { stdio: 'inherit', cwd: ROOT });

for (const hook of ['A', 'B', 'C']) {
  const comp = hook === 'A' ? `watals-${id}-stil` : `watals-${id}-stil-${hook}`;
  remotion(['still', 'src/index.ts', comp, join(uit, `hook-${hook}.png`), '--frame=20', '--scale=0.5', '--gl=angle']);
  if (!alleenFrames) remotion(['render', 'src/index.ts', comp, join(uit, `hook-${hook}.mp4`), '--gl=angle']);
}
console.log(`klaar: ${uit}`);
