// De sleutel van een vertaling is een hash van de Engelse tekst, niet zijn plek in het verhaal.
// Wordt de Engelse zin later herschreven, dan past de oude vertaling niet meer en valt dat veld
// terug op Engels — beter dan een vertaling die iets anders zegt dan het origineel.
// `npm run content:vertaling` meldt zulke verweesde sleutels.
//
// FNV-1a, 32 bit: genoeg voor een paar honderd teksten per verhaal (het script controleert op
// botsingen), en goedkoop genoeg om bij het laden van de app voor elke tekst uit te rekenen.
export function vertaalSleutel(tekst: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < tekst.length; i++) {
    hash ^= tekst.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

// Elk VertaaldVeld in een verhaal, in leesvolgorde. Gedeeld door de app (die er `nl` op zet) en
// het script (dat de ontbrekende toont), zodat beide precies dezelfde velden zien.
export function* vertaalbareVelden(waarde: unknown): Generator<{ en: string; [taal: string]: string }> {
  if (Array.isArray(waarde)) {
    for (const item of waarde) yield* vertaalbareVelden(item);
    return;
  }
  if (typeof waarde !== 'object' || waarde === null) return;
  const object = waarde as Record<string, unknown>;
  if (typeof object.en === 'string') {
    yield object as { en: string; [taal: string]: string };
    return;
  }
  for (const kind of Object.values(object)) yield* vertaalbareVelden(kind);
}
