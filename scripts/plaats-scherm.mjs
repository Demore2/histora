#!/usr/bin/env node
/**
 * Zet een echt app-screenshot in het groene scherm van een Higgsfield-scène (store-afbeeldingen 1.3).
 *
 *   node scripts/plaats-scherm.mjs <scène.png> <screenshot.png> <uit.png>
 *
 * Higgsfield tekent de vos, de telefoon en de achtergrond, met een effen chroma-groen scherm
 * (#00FF00). AI-tekst in een nagetekende UI wordt kriebels, en Play wil dat screenshots de app
 * echt tonen — dus komt het scherm uit `store/screenshots-bron/`.
 *
 * Alleen de groene pixels worden vervangen, niet een rechthoek: zo blijven de ronde hoeken en
 * het camera-gaatje van de getekende telefoon staan. Randpixels die half groen zijn worden naar
 * verhouding gemengd, anders krijgt het scherm een groene zoom.
 *
 * Het screenshot (1080×2400) wordt op de breedte van het groen geschaald; de statusbalk van de
 * emulator valt bovenaan weg (wit op beige, onleesbaar) en wat dan nog te lang is, onderaan.
 */

import fs from 'fs';
import { PNG } from 'pngjs';

const [sceneBestand, schermBestand, uitBestand] = process.argv.slice(2);
if (!uitBestand) {
  console.error('gebruik: node scripts/plaats-scherm.mjs <scène.png> <screenshot.png> <uit.png>');
  process.exit(1);
}

/** Statusbalk van de emulator, in pixels van het 1080×2400-screenshot. */
const STATUSBALK = 110;

const scene = PNG.sync.read(fs.readFileSync(sceneBestand));
const scherm = PNG.sync.read(fs.readFileSync(schermBestand));

/** Hoe groen is een pixel: 0 = niet, 1 = zuiver chroma-groen. */
function groenheid(i) {
  const r = scene.data[i];
  const g = scene.data[i + 1];
  const b = scene.data[i + 2];
  return Math.max(0, Math.min(1, (g - Math.max(r, b) - 40) / 120));
}

// Het groene vlak opmeten.
let x0 = Infinity, y0 = Infinity, x1 = -1, y1 = -1;
for (let y = 0; y < scene.height; y++) {
  for (let x = 0; x < scene.width; x++) {
    if (groenheid((y * scene.width + x) * 4) > 0.9) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
}
if (x1 < 0) throw new Error('geen groen scherm gevonden in ' + sceneBestand);

// De telefoon in een scène staat zelden kaarsrecht: een paar graden gedraaid, soms met wat
// perspectief. Een recht geplakt screenshot leest dan scheef. Dus: per zijde de rand van het groen
// opmeten, daar een rechte lijn door leggen, en de vier snijpunten als hoeken nemen. Alleen het
// middelste deel van elke zijde telt mee, want de hoeken zijn afgerond.
const isGroen = (x, y) => groenheid((y * scene.width + x) * 4) > 0.5;

function lijn(punten) {
  // Kleinste kwadraten voor q = a·p + b, twee rondes: de tweede zonder uitschieters (een vos die
  // over de rand hangt, het camera-gaatje).
  const pas = (ps) => {
    const n = ps.length;
    const sp = ps.reduce((s, [p]) => s + p, 0);
    const sq = ps.reduce((s, [, q]) => s + q, 0);
    const spp = ps.reduce((s, [p]) => s + p * p, 0);
    const spq = ps.reduce((s, [p, q]) => s + p * q, 0);
    const a = (n * spq - sp * sq) / (n * spp - sp * sp);
    return { a, b: (sq - a * sp) / n };
  };
  const eerste = pas(punten);
  const goed = punten.filter(([p, q]) => Math.abs(eerste.a * p + eerste.b - q) < 3);
  return pas(goed.length > punten.length / 3 ? goed : punten);
}

const midden = (van, tot) => {
  const lengte = tot - van;
  const uit = [];
  for (let v = Math.round(van + lengte * 0.2); v <= van + lengte * 0.8; v++) uit.push(v);
  return uit;
};
const zoek = (van, tot, stap, test) => {
  for (let v = van; stap > 0 ? v <= tot : v >= tot; v += stap) if (test(v)) return v;
  return null;
};
const randpunten = (lijst) => lijst.filter(([, q]) => q !== null);

// Links/rechts: x als functie van y. Boven/onder: y als functie van x.
const links = lijn(randpunten(midden(y0, y1).map((y) => [y, zoek(x0 - 2, x1, 1, (x) => isGroen(x, y))])));
const rechts = lijn(randpunten(midden(y0, y1).map((y) => [y, zoek(x1 + 2, x0, -1, (x) => isGroen(x, y))])));
const boven = lijn(randpunten(midden(x0, x1).map((x) => [x, zoek(y0 - 2, y1, 1, (y) => isGroen(x, y))])));
const onder = lijn(randpunten(midden(x0, x1).map((x) => [x, zoek(Math.min(scene.height - 1, y1 + 2), y0, -1, (y) => isGroen(x, y))])));

/** Snijpunt van een verticale zijde (x = a·y + b) met een horizontale (y = c·x + d). */
function snij(v, h) {
  const x = (v.a * h.b + v.b) / (1 - v.a * h.a);
  return [x, h.a * x + h.b];
}
const hoeken = [snij(links, boven), snij(rechts, boven), snij(rechts, onder), snij(links, onder)];

// Projectieve afbeelding van het eenheidsvierkant (u, v) op de vier hoeken (Heckbert), en terug.
function vierkantNaarVierhoek([[x0q, y0q], [x1q, y1q], [x2q, y2q], [x3q, y3q]]) {
  const dx1 = x1q - x2q, dx2 = x3q - x2q, dx3 = x0q - x1q + x2q - x3q;
  const dy1 = y1q - y2q, dy2 = y3q - y2q, dy3 = y0q - y1q + y2q - y3q;
  const noemer = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / noemer;
  const h = (dx1 * dy3 - dx3 * dy1) / noemer;
  return [
    [x1q - x0q + g * x1q, x3q - x0q + h * x3q, x0q],
    [y1q - y0q + g * y1q, y3q - y0q + h * y3q, y0q],
    [g, h, 1],
  ];
}
function inverse(m) {
  const [[a, b, c], [d, e, f], [g, h, i]] = m;
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [
    [A / det, -(b * i - c * h) / det, (b * f - c * e) / det],
    [B / det, (a * i - c * g) / det, -(a * f - c * d) / det],
    [C / det, -(a * h - b * g) / det, (a * e - b * d) / det],
  ];
}
const naarVierkant = inverse(vierkantNaarVierhoek(hoeken));

// Hoe groot is het scherm, gemiddeld over de zijden? Daaruit volgt welk deel van het screenshot
// erin past: op de breedte, of — is het groen naar verhouding langer — op de hoogte met links en
// rechts een strookje eraf. Bron-y begint onder de statusbalk.
const afstand = ([ax, ay], [bx, by]) => Math.hypot(bx - ax, by - ay);
const breed = (afstand(hoeken[0], hoeken[1]) + afstand(hoeken[3], hoeken[2])) / 2;
const hoog = (afstand(hoeken[0], hoeken[3]) + afstand(hoeken[1], hoeken[2])) / 2;
const schaal = Math.min(scherm.width / breed, (scherm.height - STATUSBALK) / hoog);
const bronBreed = breed * schaal;
const bronHoog = hoog * schaal;
const bronX = (scherm.width - bronBreed) / 2;

/** Bilineair bemonsteren van het screenshot. */
function monster(sx, sy, kanaal) {
  const xa = Math.max(0, Math.min(scherm.width - 1, Math.floor(sx)));
  const ya = Math.max(0, Math.min(scherm.height - 1, Math.floor(sy)));
  const xb = Math.min(scherm.width - 1, xa + 1);
  const yb = Math.min(scherm.height - 1, ya + 1);
  const fx = Math.max(0, Math.min(1, sx - xa));
  const fy = Math.max(0, Math.min(1, sy - ya));
  const p = (x, y) => scherm.data[(y * scherm.width + x) * 4 + kanaal];
  return (p(xa, ya) * (1 - fx) + p(xb, ya) * fx) * (1 - fy) + (p(xa, yb) * (1 - fx) + p(xb, yb) * fx) * fy;
}

// Een rand van een paar pixels rond het vlak meenemen, voor de half-groene randpixels.
const MARGE = 3;
const [[m00, m01, m02], [m10, m11, m12], [m20, m21, m22]] = naarVierkant;
for (let y = Math.max(0, y0 - MARGE); y <= Math.min(scene.height - 1, y1 + MARGE); y++) {
  for (let x = Math.max(0, x0 - MARGE); x <= Math.min(scene.width - 1, x1 + MARGE); x++) {
    const i = (y * scene.width + x) * 4;
    const a = groenheid(i);
    if (a === 0) continue;
    // Middelpunt van de doelpixel terug naar (u, v) in het scherm, en dan naar het screenshot.
    const px = x + 0.5;
    const py = y + 0.5;
    const w = m20 * px + m21 * py + m22;
    const u = (m00 * px + m01 * py + m02) / w;
    const v = (m10 * px + m11 * py + m12) / w;
    const sx = bronX + u * bronBreed - 0.5;
    const sy = STATUSBALK + v * bronHoog - 0.5;
    for (let c = 0; c < 3; c++) {
      // Bij een half-groene randpixel ook het groen uit de oude kleur halen (de-spill).
      const oud = c === 1 ? Math.min(scene.data[i + 1], Math.max(scene.data[i], scene.data[i + 2])) : scene.data[i + c];
      scene.data[i + c] = Math.round(monster(sx, sy, c) * a + oud * (1 - a));
    }
  }
}

fs.writeFileSync(uitBestand, PNG.sync.write(scene));
console.log(`${uitBestand}: hoeken ${hoeken.map(([hx, hy]) => `(${hx.toFixed(0)}, ${hy.toFixed(0)})`).join(" ")}, schaal 1:${schaal.toFixed(2)}`);
