// npm run content:vertaling                 — per verhaal: hoeveel velden Nederlands hebben
// npm run content:vertaling -- --toon <id>  — sleutel + Engelse tekst van elk onvertaald veld
// npm run content:vertaling -- --check      — exitcode 1 bij verweesde sleutels of botsingen
//
// De vertalingen staan in src/content/vertalingen/nl/<id>.ts, gesleuteld op een hash van de
// Engelse tekst (zie sleutel.ts). Verweesd = een sleutel waarvan de Engelse tekst niet meer
// bestaat; die vertaling wordt dus niet meer getoond en moet opnieuw.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
import './asset-require-shim.mjs';

register(pathToFileURL('./scripts/ts-content-loader.mjs').href, pathToFileURL('./'));

const { verhalen } = await import('../src/content/verhalen/index.ts');
const { VERTALINGEN } = await import('../src/content/vertalingen/index.ts');
const { vertaalbareVelden, vertaalSleutel } = await import('../src/content/vertalingen/sleutel.ts');

const args = process.argv.slice(2);
const toon = args.includes('--toon') ? args[args.indexOf('--toon') + 1] : null;
const check = args.includes('--check');
const tabellen = VERTALINGEN.nl;

if (toon) {
  const verhaal = verhalen.find((x) => x.id === toon);
  if (!verhaal) {
    console.error(`Onbekend verhaal: ${toon}`);
    process.exit(1);
  }
  const gezien = new Set();
  for (const veld of vertaalbareVelden(verhaal)) {
    const sleutel = vertaalSleutel(veld.en);
    if (veld.nl || gezien.has(sleutel)) continue;
    gezien.add(sleutel);
    console.log(`${sleutel}\t${veld.en}`);
  }
  process.exit(0);
}

let problemen = 0;
let totaal = 0;
let vertaald = 0;
for (const verhaal of verhalen) {
  const sleutels = new Map();
  let velden = 0;
  let klaar = 0;
  for (const veld of vertaalbareVelden(verhaal)) {
    const sleutel = vertaalSleutel(veld.en);
    const eerder = sleutels.get(sleutel);
    if (eerder !== undefined && eerder !== veld.en) {
      console.log(`  ✗ ${verhaal.id}: hashbotsing op ${sleutel}`);
      problemen++;
    }
    sleutels.set(sleutel, veld.en);
    velden++;
    if (veld.nl) klaar++;
  }
  const tabel = tabellen[verhaal.id] ?? {};
  const verweesd = Object.keys(tabel).filter((s) => !sleutels.has(s));
  problemen += verweesd.length;
  totaal += velden;
  vertaald += klaar;
  const stand = klaar === velden ? '✓' : klaar === 0 ? '·' : '…';
  const extra = verweesd.length ? `  (${verweesd.length} verweesd: ${verweesd.join(', ')})` : '';
  console.log(`${stand} ${verhaal.id.padEnd(28)} ${String(klaar).padStart(3)}/${velden}${extra}`);
}
console.log(`\nNederlands: ${vertaald}/${totaal} velden`);
if (check && problemen > 0) process.exit(1);
