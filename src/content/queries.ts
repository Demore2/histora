import { collecties, getCollectie } from '@/content/collecties';
import { getVerhaal, verhalen } from '@/content/verhalen';
import { getTijdperk } from '@/constants/tijdperken';
import type { Verhaal } from '@/constants/types';

export function getVerhalenVoorCollectie(collectieId: string): Verhaal[] {
  const collectie = getCollectie(collectieId);
  if (!collectie) return [];
  return collectie.verhaalIds
    .map((id) => getVerhaal(id))
    .filter((verhaal): verhaal is Verhaal => verhaal !== undefined);
}

export function getCollectiesVoorVerhaal(verhaalId: string) {
  return collecties.filter((collectie) => collectie.verhaalIds.includes(verhaalId));
}

// Picks the first verhaal flagged uitgelicht (in tijdperk order), rather than a hardcoded id,
// so each era's R7 content agent can nominate its own hero candidate independently.
export function getUitgelichtVerhaal(): Verhaal | undefined {
  return verhalen.find((verhaal) => verhaal.uitgelicht) ?? verhalen[0];
}

/**
 * "New hot topics": het nieuwste verhaal helemaal links (1.4.2). Op `toegevoegdOp`, niet op de
 * plek in de bundel — die volgt de tijdperken, zodat hier vroeger altijd de laatste Hedendaags-
 * verhalen stonden en een nieuw Romeins verhaal er nooit in kwam. Bij gelijke datum gaat het
 * latere verhaal op de tijdlijn voor.
 */
export function getNieuwToegevoegd(aantal = 6): Verhaal[] {
  const tijdlijn = getTijdlijn();
  const plek = (verhaal: Verhaal) => tijdlijn.indexOf(verhaal);
  return [...verhalen]
    .sort((a, b) => b.toegevoegdOp.localeCompare(a.toegevoegdOp) || plek(b) - plek(a))
    .slice(0, aantal);
}

/**
 * Hoe lang een verhaal "nieuw" heet (1.4.3): de dag van toevoegen plus zes, dus precies een week.
 * Daarna verdwijnen de kaart op Home en het labeltje op de routekaart vanzelf — er is niets om op
 * te ruimen, want het volgt alleen uit `toegevoegdOp` en de datum van vandaag.
 */
export const NIEUW_DAGEN = 7;

/** Lokale datumsleutel `n` dagen vóór `vandaag` (beide 'YYYY-MM-DD'), via de kalender en niet via "× 24 uur". */
function dagenTerug(vandaag: string, n: number): string {
  const [jaar, maand, dag] = vandaag.split('-').map(Number);
  const datum = new Date(jaar, maand - 1, dag - n);
  const tweeCijfers = (getal: number) => String(getal).padStart(2, '0');
  return `${datum.getFullYear()}-${tweeCijfers(datum.getMonth() + 1)}-${tweeCijfers(datum.getDate())}`;
}

/**
 * `vandaag` is een lokale datumsleutel (`vandaagSleutel()`, via `useVandaag()` in een scherm) en
 * komt als parameter binnen, zodat dit zuiver blijft en een component niet tijdens het renderen
 * de klok afleest.
 */
export function isNieuw(verhaal: Verhaal, vandaag: string): boolean {
  return verhaal.toegevoegdOp >= dagenTerug(vandaag, NIEUW_DAGEN - 1) && verhaal.toegevoegdOp <= vandaag;
}

/** De verhalen die nu nieuw zijn, het nieuwste eerst. Meestal leeg of één. */
export function getNieuweVerhalen(vandaag: string): Verhaal[] {
  return getNieuwToegevoegd(verhalen.length).filter((verhaal) => isNieuw(verhaal, vandaag));
}

export function getVolgendVerhaal(huidigId: string): Verhaal | undefined {
  const index = verhalen.findIndex((verhaal) => verhaal.id === huidigId);
  if (index === -1) return undefined;
  return verhalen[(index + 1) % verhalen.length];
}

export type Voortgang = { totaal: number; gelezen: number };

export function getTijdperkVoortgang(tijdperkId: string, gelezenIds: Set<string>): Voortgang {
  const verhalenVoorTijdperk = verhalen.filter((verhaal) => verhaal.tijdperkId === tijdperkId);
  return {
    totaal: verhalenVoorTijdperk.length,
    gelezen: verhalenVoorTijdperk.filter((verhaal) => gelezenIds.has(verhaal.id)).length,
  };
}

// Sorteert op volgorde (ontbrekend = laatst) i.p.v. jaar, voor de ~5 uitgelichte
// figuren per tijdperk-rij op Home (REFACTOR-PLAN.md R4).
export function getUitgelichteVerhalenVoorTijdperk(tijdperkId: string, aantal = 5): Verhaal[] {
  return verhalen
    .filter((verhaal) => verhaal.tijdperkId === tijdperkId)
    .sort((a, b) => (a.volgorde ?? Number.MAX_SAFE_INTEGER) - (b.volgorde ?? Number.MAX_SAFE_INTEGER))
    .slice(0, aantal);
}

/**
 * Alle verhalen in de volgorde van de tijdlijn: eerst op tijdperk (`Tijdperk.nummer`), dan op
 * `beginJaar`, dan op id (zodat twee verhalen met hetzelfde jaar nooit van plek wisselen). Dit is de
 * "reis van Rome tot vandaag" op Home. Een nieuw verhaal valt hier vanzelf op zijn plek, want
 * `beginJaar` is verplicht.
 */
export function getTijdlijn(): Verhaal[] {
  const nummer = (verhaal: Verhaal) => getTijdperk(verhaal.tijdperkId)?.nummer ?? Number.MAX_SAFE_INTEGER;
  return [...verhalen].sort(
    (a, b) => nummer(a) - nummer(b) || a.beginJaar - b.beginJaar || a.id.localeCompare(b.id)
  );
}

/**
 * Waar de lezer staat op de reis, voor de reiskaart bovenaan Home.
 *
 * - `begin`: nog nergens aan begonnen → het eerste verhaal van de tijdlijn.
 * - `verder`: het eerste niet-uitgelezen verhaal op de tijdlijn is half gelezen.
 * - `volgende`: het eerste niet-uitgelezen verhaal op de tijdlijn is nog niet begonnen.
 * - `klaar`: alles uit.
 *
 * Sinds 1.4.4 strikt chronologisch; een half verhaal verderop staat in `bepaalOppakken`.
 *
 * Uitgelezen = elk hoofdstuk af, óf het personage ontgrendeld (`uitgelezenIds`) — wie de knop nog
 * niet indrukte heeft het verhaal wél uit. Zuiver: de voortgang komt als parameter binnen.
 */
export type ReisStand =
  | { soort: 'begin' | 'volgende'; verhaal: Verhaal; positie: number; totaal: number }
  | { soort: 'verder'; verhaal: Verhaal; positie: number; totaal: number; afgerond: number }
  | { soort: 'klaar'; totaal: number };

/**
 * De reiskaart (1.4.4, wens van de eigenaar): **altijd het eerste verhaal op de tijdlijn dat nog
 * niet uit is** — de reis is chronologisch. Is dat verhaal half gelezen, dan `verder` met
 * "Chapter n of 8"; anders `begin` of `volgende`. Een verhaal dat je buiten de volgorde om bent
 * begonnen staat hier niet meer (tot 1.4.3 ging elk half open verhaal vóór); dat is
 * `bepaalOppakken` en een eigen tegel eronder.
 */
export function bepaalReis(
  progress: Record<string, { completedChapters: number[] }>,
  uitgelezenIds: Set<string>
): ReisStand {
  const tijdlijn = getTijdlijn();
  const totaal = tijdlijn.length;
  const afgerond = (verhaal: Verhaal) => progress[verhaal.id]?.completedChapters.length ?? 0;
  const isUit = (verhaal: Verhaal) => uitgelezenIds.has(verhaal.id) || afgerond(verhaal) >= verhaal.chapters.length;

  const volgende = tijdlijn.findIndex((verhaal) => !isUit(verhaal));
  if (volgende === -1) return { soort: 'klaar', totaal };
  const verhaal = tijdlijn[volgende];
  if (afgerond(verhaal) > 0) {
    return { soort: 'verder', verhaal, positie: volgende + 1, totaal, afgerond: afgerond(verhaal) };
  }
  const ooitIetsGelezen = tijdlijn.some((v) => afgerond(v) > 0 || uitgelezenIds.has(v.id));
  return { soort: ooitIetsGelezen ? 'volgende' : 'begin', verhaal, positie: volgende + 1, totaal };
}

/**
 * "Pick up where you left off" (1.4.4): het half gelezen verhaal dat niet al op de reiskaart
 * staat, het laatst gelezen eerst (`laatstGelezenOp`, anders tijdlijnvolgorde). `null` als er
 * niets buiten de volgorde open staat.
 */
export function bepaalOppakken(
  progress: Record<string, { completedChapters: number[]; laatstGelezenOp?: number }>,
  uitgelezenIds: Set<string>,
  reisVerhaalId: string | null
): { verhaal: Verhaal; afgerond: number } | null {
  const tijdlijn = getTijdlijn();
  const kandidaten = tijdlijn
    .map((verhaal, plek) => ({ verhaal, plek, stand: progress[verhaal.id] }))
    .filter(
      ({ verhaal, stand }) =>
        verhaal.id !== reisVerhaalId &&
        !uitgelezenIds.has(verhaal.id) &&
        (stand?.completedChapters.length ?? 0) > 0 &&
        (stand?.completedChapters.length ?? 0) < verhaal.chapters.length
    )
    .sort((a, b) => (b.stand?.laatstGelezenOp ?? 0) - (a.stand?.laatstGelezenOp ?? 0) || a.plek - b.plek);
  const eerste = kandidaten[0];
  return eerste ? { verhaal: eerste.verhaal, afgerond: eerste.stand?.completedChapters.length ?? 0 } : null;
}

/** Eén halte op de routekaart van een tijdperk. */
export type Halte = {
  verhaal: Verhaal;
  stand: 'uit' | 'bezig' | 'open';
  afgerond: number;
};

/**
 * De route door één tijdperk (1.4.2): de verhalen in tijdlijnvolgorde, elk met zijn stand, plus
 * welke halte "de volgende" is: het eerste dat nog niet uit is (sinds 1.4.4, was: een half gelezen
 * verhaal eerst), `null` als alles uit is. Zelfde regel als `bepaalReis`, zodat de routekaart en
 * de reiskaart het nooit oneens zijn. Elke halte is vrij aan te klikken; de route is een
 * volgorde, geen slot.
 */
export function bepaalRoute(
  tijdperkId: string,
  progress: Record<string, { completedChapters: number[] }>,
  uitgelezenIds: Set<string>
): { haltes: Halte[]; volgende: number | null; uit: number } {
  const haltes: Halte[] = getTijdlijn()
    .filter((verhaal) => verhaal.tijdperkId === tijdperkId)
    .map((verhaal) => {
      const afgerond = progress[verhaal.id]?.completedChapters.length ?? 0;
      const uit = uitgelezenIds.has(verhaal.id) || afgerond >= verhaal.chapters.length;
      return { verhaal, afgerond, stand: uit ? 'uit' : afgerond > 0 ? 'bezig' : 'open' };
    });
  const volgende = haltes.findIndex((halte) => halte.stand !== 'uit');
  return {
    haltes,
    volgende: volgende !== -1 ? volgende : null,
    uit: haltes.filter((halte) => halte.stand === 'uit').length,
  };
}
