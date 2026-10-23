#!/usr/bin/env node
/**
 * Render the Play Store phone screenshots (1.3) from store/screenshots.html:
 *
 *   store/assets/screenshots-1.3/phone-<n>.png   1080x1920 (9:16), 24-bit, no alpha
 *
 * Same approach as generate-store-assets.mjs: the HTML is the source, headless Chrome renders
 * it once per slide (`?n=1` … `?n=6`), and the browser's RGBA output is flattened because Play
 * is fussy about alpha in listing images. The app screens inside the slides are real emulator
 * captures in store/screenshots-bron/ — recapture those, then re-run this.
 *
 * Written to a new folder instead of store/assets/screenshots/, which still holds the pre-1.3
 * set (the blue H era); keep that around until the new set is live.
 *
 * Usage:
 *   node scripts/generate-store-screenshots.mjs
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const bron = path.join(projectRoot, 'store/screenshots.html');
const outDir = path.join(projectRoot, 'store/assets/screenshots-1.3');
const BREED = 1080;
const HOOG = 1920;
const AANTAL = 6;

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];

const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) throw new Error('no Chrome/Edge found — add its path to BROWSERS');

fs.mkdirSync(outDir, { recursive: true });

// Higgsfield-scènes: het echte scherm in het groene vlak zetten (scripts/plaats-scherm.mjs).
// Scène in store/scenes/, screenshot in store/screenshots-bron/, uitkomst in store/scenes/klaar/.
const SCENES = [['scene-1-home.png', 'home.png']];
fs.mkdirSync(path.join(projectRoot, 'store/scenes/klaar'), { recursive: true });
for (const [scene, scherm] of SCENES) {
  execFileSync(
    process.execPath,
    [
      path.join(__dirname, 'plaats-scherm.mjs'),
      path.join(projectRoot, 'store/scenes', scene),
      path.join(projectRoot, 'store/screenshots-bron', scherm),
      path.join(projectRoot, 'store/scenes/klaar', scene),
    ],
    { stdio: 'inherit' }
  );
}

for (let n = 1; n <= AANTAL; n++) {
  const file = path.join(outDir, `phone-${n}.png`);
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      '--virtual-time-budget=4000',
      `--window-size=${BREED},${HOOG}`,
      `--screenshot=${file}`,
      `${pathToFileURL(bron).href}?n=${n}`,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );

  const png = PNG.sync.read(fs.readFileSync(file));
  if (png.width !== BREED || png.height !== HOOG) {
    throw new Error(`phone-${n}: expected ${BREED}x${HOOG}, got ${png.width}x${png.height}`);
  }
  // Every slide paints its own full-bleed background, so alpha is 255 already; drop the
  // channel anyway so the file is plain RGB.
  const rgb = new PNG({ width: BREED, height: HOOG, colorType: 2 });
  png.data.copy(rgb.data);
  for (let i = 3; i < rgb.data.length; i += 4) rgb.data[i] = 255;
  fs.writeFileSync(file, PNG.sync.write(rgb, { colorType: 2 }));

  console.log(
    `${path.relative(projectRoot, file).replace(/\\/g, '/')}  ${Math.round(fs.statSync(file).size / 1024)} KB`
  );
}
