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
import { sleutelUit, verkleinNaar } from './groen-scherm.mjs';

const BRON = 'assets/images/vos/bron';
const DOEL = 'assets/images/vos';
const POSES = ['leraar-wijzend', 'leraar-juichend', 'leraar-bemoedigend'];

const BREEDTE = 480;
const HOOGTE = 480;
const ROMP_HOOGTE = 190; // van bovenkant sjaal tot onderkant benen, in de uitvoer
const VACHT_ONDERKANT = 410; // y waar de vacht (de benen) ophoudt; de voeten vallen eronder
const NEK_MIDDEN = 220; // x van het midden van de sjaal; rechts is ruimte voor de wijzende stok

function isVacht(r, g, b) {
  return r > 190 && g > 70 && g < 150 && b < 90;
}

function isSjaal(r, g, b) {
  return b > 170 && r < 90 && g > 100 && g < 210;
}

/** Van bovenkant sjaal tot onderkant benen, en het midden van de sjaal, in bronpixels. */
function meetRomp(png) {
  const { width: b, height: h, data } = png;
  let sjaalBoven = h;
  let maxY = 0;
  let somX = 0;
  let aantal = 0;
  for (let p = 0; p < b * h; p++) {
    const i = p * 4;
    const [r, g, bl] = [data[i], data[i + 1], data[i + 2]];
    if (g - Math.max(r, bl) > 40) continue; // groen scherm of de rand ervan
    const y = Math.floor(p / b);
    if (isVacht(r, g, bl) && y > maxY) maxY = y;
    if (isSjaal(r, g, bl)) {
      if (y < sjaalBoven) sjaalBoven = y;
      somX += p % b;
      aantal += 1;
    }
  }
  return { boven: sjaalBoven, onder: maxY, midden: somX / aantal };
}

for (const pose of POSES) {
  const png = PNG.sync.read(fs.readFileSync(`${BRON}/${pose}.png`));
  const uit = sleutelUit(png);
  const romp = meetRomp(png);
  const schaal = ROMP_HOOGTE / (romp.onder - romp.boven);

  // Verkleinen met supersampling: per uitvoerpixel een raster van monsters, anders kartelt de
  // dunne stok bij een factor van bijna drie.
  const doel = new PNG({ width: BREEDTE, height: HOOGTE });
  const afgekapt = verkleinNaar(doel, uit, png.width, png.height, Math.max(1, Math.ceil(1 / schaal)), (ux, uy) => [
    (ux - NEK_MIDDEN) / schaal + romp.midden,
    (uy - VACHT_ONDERKANT) / schaal + romp.onder,
  ]);
  fs.writeFileSync(`${DOEL}/${pose}.png`, PNG.sync.write(doel));
  console.log(`  ${pose.padEnd(20)} schaal ${schaal.toFixed(3)}${afgekapt ? `  ! ${afgekapt} randpixels afgekapt` : ''}`);
}
