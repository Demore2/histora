// Assembles the self-contained explainer pages: inlines the harness, the explainer and the app images.
//   node marketing/explainer/build.mjs            -> histora-explainer-storyboard.html (+ histora-explainer.html when its template exists)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HIER = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HIER, '..', '..');
const IMG = join(ROOT, 'assets', 'images');

// Real app art: portraits, chapter scenes and the fox poses. Keys are what explainer.js asks for via img().
const ASSETS = {
  pCaesar: 'characters/julius-caesar.webp',
  pAlexander: 'characters/alexander-the-great.webp',
  scene1: 'scenes/julius-caesar-1.webp',
  scene2: 'scenes/julius-caesar-2.webp',
  scene3: 'scenes/julius-caesar-3.webp',
  scene4: 'scenes/julius-caesar-4.webp',
  cleo1: 'scenes/cleopatra-1.webp',
  foxWave: 'vos/zwaaiend.png',
  foxEra: 'vos/era-oudheid.png',
  foxGo: 'vos/op-weg.png',
  foxPoint: 'vos/leraar-wijzend.png',
  foxCheer: 'vos/leraar-juichend.png',
};
const mime = (p) => (p.endsWith('.webp') ? 'image/webp' : 'image/png');
const assets = Object.fromEntries(Object.entries(ASSETS).map(([k, p]) => [k, `data:${mime(p)};base64,${readFileSync(join(IMG, p)).toString('base64')}`]));

const lees = (f) => readFileSync(join(HIER, f), 'utf8');
const code = { HARNESS: lees('lib/harness.js'), SOUND: existsSync(join(HIER, 'lib/sound.js')) ? lees('lib/sound.js') : '', EXPLAINER: lees('explainer.js'), ASSETS: `window.ASSETS = ${JSON.stringify(assets)};`,
  VO: existsSync(join(HIER, 'vo/vo-track.mp3')) ? `window.VO_SRC = 'data:audio/mpeg;base64,${readFileSync(join(HIER, 'vo/vo-track.mp3')).toString('base64')}';` : '' };

for (const [tpl, out, layout] of [['storyboard.template.html', 'histora-explainer-storyboard.html', 'wide'], ['player.template.html', 'histora-explainer.html', 'wide'], ['player.template.html', 'histora-explainer-vertical.html', 'tall']]) {
  code.LAYOUT = `window.LAYOUT_NAME = '${layout}';`;
  if (!existsSync(join(HIER, tpl))) continue;
  let html = lees(tpl);
  for (const [k, v] of Object.entries(code)) html = html.replace(`/*@${k}@*/`, () => v);
  writeFileSync(join(HIER, out), html);
  console.log(`${out}: ${(html.length / 1024 / 1024).toFixed(2)} MB`);
}
