// Gedeeld door de scripts die Higgsfield-plaatjes met een groen scherm uitknippen
// (prepare-teacher-fox.mjs, prepare-era-heads.mjs).
//
// - Uitknippen op kleur, niet met een flood-fill: er zit nergens groen in Phoxy, en een flood-fill
//   laat groen staan dat ingesloten ligt (tussen stok en arm, binnen een helm).
// - Despill: halfdoorzichtige randpixels houden anders een groene zweem, en die zie je op het
//   beige van de app meteen.
// - Alles in voorvermenigvuldigde kleur, zodat randen bij het verkleinen niet donker worden.

/** Hoe groen een pixel is: 0 = geen groen scherm, 1 = puur groen scherm. */
export function groenheid(r, g, b) {
  const over = g - Math.max(r, b);
  return Math.max(0, Math.min(1, (over - 40) / 120));
}

/** Zet een PNG om naar voorvermenigvuldigde RGBA (0..1) zonder groen scherm. */
export function sleutelUit(png) {
  const { width: b, height: h, data } = png;
  const uit = new Float32Array(b * h * 4);
  for (let p = 0; p < b * h; p++) {
    const i = p * 4;
    const r = data[i];
    const bl = data[i + 2];
    const alfa = 1 - groenheid(r, data[i + 1], bl);
    const g = Math.min(data[i + 1], Math.max(r, bl));
    uit[i] = (r / 255) * alfa;
    uit[i + 1] = (g / 255) * alfa;
    uit[i + 2] = (bl / 255) * alfa;
    uit[i + 3] = alfa;
  }
  return uit;
}

/** Bilineair bemonsteren van een voorvermenigvuldigde buffer; buiten het beeld is 0. */
export function bemonster(bron, b, h, x, y, kanaal) {
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

/**
 * Verkleint met supersampling naar `doel` (een pngjs-PNG): `bronXY(ux, uy)` vertaalt een
 * uitvoerpunt naar bronpixels. Geeft het aantal niet-lege randpixels terug (afgekapt).
 */
export function verkleinNaar(doel, bron, b, h, stappen, bronXY) {
  let afgekapt = 0;
  for (let y = 0; y < doel.height; y++) {
    for (let x = 0; x < doel.width; x++) {
      const som = [0, 0, 0, 0];
      for (let sy = 0; sy < stappen; sy++) {
        for (let sx = 0; sx < stappen; sx++) {
          const [bx, by] = bronXY(x + (sx + 0.5) / stappen, y + (sy + 0.5) / stappen);
          for (let k = 0; k < 4; k++) som[k] += bemonster(bron, b, h, bx, by, k);
        }
      }
      const n = stappen * stappen;
      const a = som[3] / n;
      const i = (y * doel.width + x) * 4;
      doel.data[i] = a > 0 ? Math.round((som[0] / n / a) * 255) : 0;
      doel.data[i + 1] = a > 0 ? Math.round((som[1] / n / a) * 255) : 0;
      doel.data[i + 2] = a > 0 ? Math.round((som[2] / n / a) * 255) : 0;
      doel.data[i + 3] = Math.round(a * 255);
      if (a > 0.05 && (x === 0 || y === 0 || x === doel.width - 1 || y === doel.height - 1)) afgekapt += 1;
    }
  }
  return afgekapt;
}
