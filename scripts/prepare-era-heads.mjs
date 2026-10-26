#!/usr/bin/env node
/**
 * Maakt van de zes Higgsfield-koppen van Phoxy per tijdperk (`assets/images/vos/bron/era-*.png`,
 * groen scherm, 1:1) transparante 256-px-PNG's (`assets/images/vos/era-*.png`) voor het draaiwiel
 * en de kroonkeuze in Explore.
 *
 *   node scripts/prepare-era-heads.mjs
 *
 * Geen schaling per plaatje: ze zijn alle zes met dezelfde uitsnede gemaakt (kop en schouders,
 * recht van voren, zelfde referentie), dus het hele vierkant wordt verkleind en de koppen blijven
 * onderling even groot. Uitknippen gaat via `groen-scherm.mjs`, zoals bij de leraar-vossen.
 */
import fs from 'node:fs';
import { PNG } from 'pngjs';
import { sleutelUit, verkleinNaar } from './groen-scherm.mjs';

const BRON = 'assets/images/vos/bron';
const DOEL = 'assets/images/vos';
const TIJDPERKEN = ['oudheid', 'middeleeuwen', 'vroegmoderne-tijd', 'industriele-revolutie', 'twintigste-eeuw', 'hedendaags'];
const MAAT = 256;

for (const tijdperk of TIJDPERKEN) {
  const png = PNG.sync.read(fs.readFileSync(`${BRON}/era-${tijdperk}.png`));
  const schaal = MAAT / Math.max(png.width, png.height);
  const doel = new PNG({ width: MAAT, height: MAAT });
  verkleinNaar(doel, sleutelUit(png), png.width, png.height, Math.ceil(1 / schaal), (ux, uy) => [ux / schaal, uy / schaal]);
  fs.writeFileSync(`${DOEL}/era-${tijdperk}.png`, PNG.sync.write(doel));
  console.log(`  era-${tijdperk}`);
}
