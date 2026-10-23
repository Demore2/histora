#!/usr/bin/env node
/**
 * App-icoon en opstartbeeld uit de vos (1.2.1), in plaats van de blauwe H.
 *
 *   node scripts/prepare-mascot-images.mjs   # eerst: maakt assets/images/vos/zwaaiend.png
 *   node scripts/derive-fox-icon.mjs
 *   npm run generate:store-assets            # daarna: icon-512 + feature graphic volgen app-icon.png
 *
 * Bron: `assets/images/vos/bron/icoon-gezicht.png` (het gezicht, rand tot rand, Higgsfield) en
 * `assets/images/vos/zwaaiend.png` (transparant). Schrijft:
 *
 *   assets/images/app-icon.png           1024  store + iOS, het gezicht rand tot rand
 *   assets/images/app-icon-adaptive.png  1024  Android-voorgrond, het gezicht verkleind
 *   assets/images/app-favicon.png         196  web
 *   assets/images/app-splash.png         1024  de zwaaiende vos, bijgesneden, transparant
 *
 * **Waarom niet `derive-icon-variants.mjs`**: dat script zoekt een losstaand merk op een egale
 * achtergrond en zet het in de veilige zone. Dit icoon *is* de achtergrond — het gezicht loopt tot
 * de randen, net als bij Duolingo — en de hoeken zijn donkerbruine oortjes, dus zijn
 * hoekbemonstering zou bruin als achtergrondkleur kiezen.
 *
 * **De adaptieve voorgrond**: Android toont van het 108dp-canvas alleen de binnenste 72dp (66,7%),
 * soms als cirkel. Het gezicht wordt daarom op `ADAPTIEF_SCHAAL` gezet: groot genoeg dat het hele
 * zichtbare vlak gezicht is, klein genoeg dat de bril binnen de cirkel valt. Wat er buiten het
 * plaatje valt is `adaptiveIcon.backgroundColor` in app.json — de vachtkleur, die het script
 * hieronder meet en afdrukt, zodat een naad tussen voorgrond en achtergrond niet opvalt.
 */
import fs from 'node:fs';
import { PNG } from 'pngjs';

const GEZICHT = 'assets/images/vos/bron/icoon-gezicht.png';
const ZWAAIEND = 'assets/images/vos/zwaaiend.png';
const UIT = 'assets/images/';
const ADAPTIEF_SCHAAL = 0.68;

function lees(pad) {
  return PNG.sync.read(fs.readFileSync(pad));
}

/** Bilineair met voorvermenigvuldigde alfa; tekent `bron` geschaald op (x, y) in `doel`. */
function teken(doel, bron, x0, y0, breedte, hoogte) {
  const sx = bron.width / breedte;
  const sy = bron.height / hoogte;
  const px = (x, y, c) => {
    x = Math.min(bron.width - 1, Math.max(0, x));
    y = Math.min(bron.height - 1, Math.max(0, y));
    const i = (y * bron.width + x) * 4;
    return c === 3 ? bron.data[i + 3] : (bron.data[i + c] * bron.data[i + 3]) / 255;
  };
  for (let y = Math.max(0, Math.floor(y0)); y < Math.min(doel.height, y0 + hoogte); y++)
    for (let x = Math.max(0, Math.floor(x0)); x < Math.min(doel.width, x0 + breedte); x++) {
      // Bij flink verkleinen (favicon) eerst een kleine kast middelen, anders flikkert de bril.
      const stappen = Math.max(1, Math.round(Math.max(sx, sy)));
      const acc = [0, 0, 0, 0];
      for (let j = 0; j < stappen; j++)
        for (let k = 0; k < stappen; k++) {
          const bx = (x - x0 + (k + 0.5) / stappen) * sx - 0.5;
          const by = (y - y0 + (j + 0.5) / stappen) * sy - 0.5;
          const fx = Math.floor(bx), fy = Math.floor(by), tx = bx - fx, ty = by - fy;
          for (let c = 0; c < 4; c++)
            acc[c] +=
              px(fx, fy, c) * (1 - tx) * (1 - ty) + px(fx + 1, fy, c) * tx * (1 - ty) +
              px(fx, fy + 1, c) * (1 - tx) * ty + px(fx + 1, fy + 1, c) * tx * ty;
        }
      const n = stappen * stappen;
      const a = acc[3] / n;
      const i = (y * doel.width + x) * 4;
      // "Over"-samenstelling, zodat tekenen op een gekleurde ondergrond ook klopt.
      const onder = doel.data[i + 3] / 255;
      const boven = a / 255;
      const uitA = boven + onder * (1 - boven);
      for (let c = 0; c < 3; c++) {
        const bovenKleur = a > 0 ? acc[c] / n / boven / 255 : 0;
        const kleur = (bovenKleur * 255 * boven + doel.data[i + c] * onder * (1 - boven)) / (uitA || 1);
        doel.data[i + c] = Math.min(255, Math.round(kleur));
      }
      doel.data[i + 3] = Math.round(uitA * 255);
    }
}

function schrijf(naam, png) {
  fs.writeFileSync(UIT + naam, PNG.sync.write(png));
  console.log(`${naam}: ${png.width}×${png.height}`);
}

const gezicht = lees(GEZICHT);

// De vachtkleur: mediaan van een strook voorhoofd, boven de wenkbrauwen en tussen de oren.
const monsters = [];
for (let y = Math.round(gezicht.height * 0.18); y < gezicht.height * 0.22; y++)
  for (let x = Math.round(gezicht.width * 0.3); x < gezicht.width * 0.38; x++) {
    const i = (y * gezicht.width + x) * 4;
    monsters.push([gezicht.data[i], gezicht.data[i + 1], gezicht.data[i + 2]]);
  }
const vacht = [0, 1, 2].map((c) => monsters.map((m) => m[c]).sort((a, b) => a - b)[monsters.length >> 1]);
const vachtHex = '#' + vacht.map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase();

const icoon = new PNG({ width: 1024, height: 1024 });
teken(icoon, gezicht, 0, 0, 1024, 1024);
schrijf('app-icon.png', icoon);

const adaptief = new PNG({ width: 1024, height: 1024 });
const maat = 1024 * ADAPTIEF_SCHAAL;
teken(adaptief, gezicht, (1024 - maat) / 2, (1024 - maat) / 2, maat, maat);
schrijf('app-icon-adaptive.png', adaptief);

const favicon = new PNG({ width: 196, height: 196 });
teken(favicon, gezicht, 0, 0, 196, 196);
schrijf('app-favicon.png', favicon);

// Opstartbeeld: de zwaaiende vos bijgesneden tot zijn eigen kader, gecentreerd in een vierkant
// met wat lucht. `expo-splash-screen` schaalt het naar `imageWidth` op de beige plaat.
const zwaai = lees(ZWAAIEND);
let x0 = zwaai.width, y0 = zwaai.height, x1 = 0, y1 = 0;
for (let y = 0; y < zwaai.height; y++)
  for (let x = 0; x < zwaai.width; x++)
    if (zwaai.data[(y * zwaai.width + x) * 4 + 3] > 24) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
const uitsnede = new PNG({ width: x1 - x0 + 1, height: y1 - y0 + 1 });
PNG.bitblt(zwaai, uitsnede, x0, y0, uitsnede.width, uitsnede.height, 0, 0);
const splash = new PNG({ width: 1024, height: 1024 });
const schaal = (1024 * 0.9) / Math.max(uitsnede.width, uitsnede.height);
const bw = uitsnede.width * schaal, bh = uitsnede.height * schaal;
teken(splash, uitsnede, (1024 - bw) / 2, (1024 - bh) / 2, bw, bh);
schrijf('app-splash.png', splash);

console.log(`\nadaptiveIcon.backgroundColor in app.json hoort te zijn: ${vachtHex}`);
