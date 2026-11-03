#!/usr/bin/env node
/**
 * Render the App Store iPhone screenshots from store/screenshots-ios.html:
 *
 *   store/assets/screenshots-ios/phone-<n>.png   1320x2868 (iPhone 6.9"), 24-bit, no alpha
 *
 * The iOS twin of generate-store-screenshots.mjs, without the Higgsfield scenes: those show an
 * Android phone, which App Review rejects. The screens inside are real iOS captures in
 * store/screenshots-ios/ (Appetize) — recapture those, then re-run this.
 *
 * Usage:
 *   npm run generate:ios-screenshots
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const bron = path.join(projectRoot, 'store/screenshots-ios.html');
const outDir = path.join(projectRoot, 'store/assets/screenshots-ios');
const BREED = 1320;
const HOOG = 2868;
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
