#!/usr/bin/env node
/**
 * Render the social profile images from the HTML templates in ./sjablonen
 * into ./beelden. Same approach as scripts/generate-store-assets.mjs: headless
 * Chrome/Edge + pngjs, no Higgsfield, no cost. The HTML is the source; edit
 * that and re-run, never edit the PNGs.
 *
 *   node social/profielen/render.mjs
 */

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { PNG } from 'pngjs';

const hier = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(hier, '../..');
const uit = path.join(hier, 'beelden');
fs.mkdirSync(uit, { recursive: true });

const BROWSERS = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
];
const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) throw new Error('no Chrome/Edge found');

function render(sjabloon, query, bestand, breedte, hoogte, { transparant = false, zonderAlpha = false } = {}) {
  const doel = path.join(uit, bestand);
  const url = pathToFileURL(path.join(hier, 'sjablonen', sjabloon)).href + (query ? `?${query}` : '');
  execFileSync(
    browser,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      '--virtual-time-budget=4000',
      ...(transparant ? ['--default-background-color=00000000'] : []),
      `--window-size=${breedte},${hoogte}`,
      `--screenshot=${doel}`,
      url,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
  const png = PNG.sync.read(fs.readFileSync(doel));
  if (png.width !== breedte || png.height !== hoogte) {
    throw new Error(`${bestand}: expected ${breedte}x${hoogte}, got ${png.width}x${png.height}`);
  }
  if (zonderAlpha) fs.writeFileSync(doel, PNG.sync.write(png, { colorType: 2 }));
  console.log(`${bestand}  ${Math.round(fs.statSync(doel).size / 1024)} KB`);
}

// Profile picture: the app icon itself, unchanged, so the account and the app
// on the phone look identical. The preview shows how the platforms crop it.
fs.copyFileSync(path.join(root, 'assets/images/app-icon.png'), path.join(uit, 'profielfoto.png'));
console.log('profielfoto.png  (copy of assets/images/app-icon.png)');
render('cirkel.html', 'bron=assets/images/app-icon.png', 'controle-profielfoto-cirkel.png', 1200, 600);

// Instagram highlight covers, in profile order.
const HIGHLIGHTS = [
  ['1-start-here', 'zwaaiend'],
  ['2-stories', 'op-weg'],
  ['3-the-app', 'leraar-wijzend'],
  ['4-quiz', 'leraar-juichend'],
  ['5-eras', 'era-oudheid'],
];
for (const [naam, vos] of HIGHLIGHTS) {
  render('highlight.html', `vos=${vos}`, `ig-highlight-${naam}.png`, 1080, 1920, { zonderAlpha: true });
}

// YouTube banner + a copy with the safe area outlined, to check the crop.
render('banner.html', '', 'yt-banner.png', 2560, 1440, { zonderAlpha: true });
render('banner.html', 'veilig', 'controle-yt-banner-veilige-zone.png', 2560, 1440, { zonderAlpha: true });

// YouTube watermark, transparent outside the circle.
render('watermerk.html', '', 'yt-watermerk.png', 150, 150, { transparant: true });
