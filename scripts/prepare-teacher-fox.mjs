#!/usr/bin/env node
/**
 * Maakt van de drie Higgsfield-plaatjes van Phoxy als leraar (`assets/images/vos/bron/leraar-*.png`,
 * groen scherm) transparante PNG's op één schaal (`assets/images/vos/leraar-*.png`), voor het
 * vragenpaneel na "Mark Complete".
 *
 *   node scripts/prepare-teacher-fox.mjs
 *
 * - **Uitknippen op kleur, niet met een flood-fill.** `prepare-mascot-images.mjs` vult vanaf de
 *   randen, omdat daar grijs binnen een omlijning moest blijven staan. Hier zit nergens groen in de
 *   vos, en een flood-fill zou groen laten staan dat ingesloten ligt (tussen stok en arm).
 * - **De groene rand wordt weggepoetst** (despill): halfdoorzichtige randpixels houden anders een
 *   groene zweem, en die zie je op het beige van de app meteen.
 * - **Eén schaal, gemeten van sjaal tot benen.** De stok en de armen steken per pose ergens anders
 *   uit, dus de omhullende van alle pixels (of van alle vacht: opgestoken armen) schaalt de vos per
 *   pose anders. De afstand van de bovenkant van de blauwe sjaal tot de onderkant van de oranje
 *   benen is in alle drie gelijk; daarop wordt geschaald, en op het midden van de sjaal (de nek)
 *   gecentreerd.
 *
 * pngjs zoals de andere beeldscripts, geen sharp.
 */
import fs from 'node:fs';
import { PNG } from 'pngjs';

const BRON = 'assets/images/vos/bron';
const DOEL = 'assets/images/vos';
const POSES = ['leraar-wijzend', 'leraar-juichend', 'leraar-bemoedigend'];

const BREEDTE = 480;
const HOOGTE = 480;
const ROMP_HOOGTE = 190; // van bovenkant sjaal tot onderkant benen, in de uitvoer
const VACHT_ONDERKANT = 410; // y waar de vacht (de benen) ophoudt; de voeten vallen eronder
const NEK_MIDDEN = 220; // x van het midden van de sjaal; rechts is ruimte voor de wijzende stok

/** Hoe groen een pixel is: 0 = geen groen scherm, 1 = puur groen scherm. */
function groenheid(r, g, b) {
  const over = g - Math.max(r, b);
  return Math.max(0, Math.min(1, (over - 40) / 120));
}

function isVacht(r, g, b) {
  return r > 190 && g > 70 && g < 150 && b < 90;
}

function isSjaal(r, g, b) {
  return b > 170 && r < 90 && g > 100 && g < 210;
}

function knip(png) {
  const { width: b, height: h, data } = png;
  const uit = new Float32Array(b * h * 4); // voorvermenigvuldigd, 0..1
  let sjaalBoven = h;
  let maxY = 0;
  let somX = 0;
  let aantal = 0;
  for (let p = 0; p < b * h; p++) {
    const i = p * 4;
    const r = data[i];
    let g = data[i + 1];
    const bl = data[i + 2];
    const alfa = 1 - groenheid(r, g, bl);
    // Despill: een pixel mag niet groener zijn dan zijn rood of blauw.
    g = Math.min(g, Math.max(r, bl));
    uit[i] = (r / 255) * alfa;
    uit[i + 1] = (g / 255) * alfa;
    uit[i + 2] = (bl / 255) * alfa;
    uit[i + 3] = alfa;
    if (alfa > 0.99) {
      const y = Math.floor(p / b);
      if (isVacht(r, data[i + 1], bl) && y > maxY) maxY = y;
      if (isSjaal(r, data[i + 1], bl)) {
        if (y < sjaalBoven) sjaalBoven = y;
        somX += p % b;
        aantal += 1;
      }
    }
  }
  return { uit, b, h, romp: { boven: sjaalBoven, onder: maxY, midden: somX / aantal } };
}

/** Bilineair bemonsteren in voorvermenigvuldigde kleur, zodat randen niet donker worden. */
function bemonster(bron, b, h, x, y, kanaal) {
  if (x < 0 || y < 0 || x > b - 1 || y > h - 1) return 0;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const x1 = Math.min(x0 + 1, b - 1);
  const y1 = Math.min(y0 + 1, h - 1);
  const fx = x - x0;
  const fy = y - y0;
  const w = (xx, yy) => bron[(yy * b + xx) * 4 + kanaal];
  return (w(x0, y0) * (1 - fx) + w(x1, y0) * fx) * (1 - fy) + (w(x0, y1) * (1 - fx) + w(x1, y1) * fx) * fy;
}

for (const pose of POSES) {
  const png = PNG.sync.read(fs.readFileSync(`${BRON}/${pose}.png`));
  const { uit, b, h, romp } = knip(png);
  const schaal = ROMP_HOOGTE / (romp.onder - romp.boven);

  // Verkleinen met supersampling: per uitvoerpixel een raster van monsters, anders kartelt de
  // dunne stok bij een factor van bijna drie.
  const stappen = Math.max(1, Math.ceil(1 / schaal));
  const doel = new PNG({ width: BREEDTE, height: HOOGTE });
  let afgekapt = 0;
  for (let y = 0; y < HOOGTE; y++) {
    for (let x = 0; x < BREEDTE; x++) {
      const som = [0, 0, 0, 0];
      for (let sy = 0; sy < stappen; sy++) {
        for (let sx = 0; sx < stappen; sx++) {
          const ux = x + (sx + 0.5) / stappen;
          const uy = y + (sy + 0.5) / stappen;
          const bx = (ux - NEK_MIDDEN) / schaal + romp.midden;
          const by = (uy - VACHT_ONDERKANT) / schaal + romp.onder;
          for (let k = 0; k < 4; k++) som[k] += bemonster(uit, b, h, bx, by, k);
        }
      }
      const n = stappen * stappen;
      const a = som[3] / n;
      const i = (y * BREEDTE + x) * 4;
      doel.data[i] = a > 0 ? Math.round((som[0] / n / a) * 255) : 0;
      doel.data[i + 1] = a > 0 ? Math.round((som[1] / n / a) * 255) : 0;
      doel.data[i + 2] = a > 0 ? Math.round((som[2] / n / a) * 255) : 0;
      doel.data[i + 3] = Math.round(a * 255);
      if (a > 0.05 && (x === 0 || y === 0 || x === BREEDTE - 1 || y === HOOGTE - 1)) afgekapt += 1;
    }
  }
  fs.writeFileSync(`${DOEL}/${pose}.png`, PNG.sync.write(doel));
  console.log(`  ${pose.padEnd(20)} schaal ${schaal.toFixed(3)}${afgekapt ? `  ! ${afgekapt} randpixels afgekapt` : ''}`);
}
