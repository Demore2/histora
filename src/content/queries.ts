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
 * - `verder`: een verhaal staat half open → dát verhaal (bij meerdere: het vroegste op de tijdlijn).
 *   Gaat vóór het volgende ongelezen verhaal, anders staat een half gelezen boek nergens meer.
 * - `volgende`: niets half open → het eerste nog niet uitgelezen verhaal op de tijdlijn.
 * - `klaar`: alles uitgelezen.
 *
 * Uitgelezen = elk hoofdstuk af, óf het personage ontgrendeld (`uitgelezenIds`) — wie de knop nog
 * niet indrukte heeft het verhaal wél uit. Zuiver: de voortgang komt als parameter binnen.
 */
export type ReisStand =
  | { soort: 'begin' | 'volgende'; verhaal: Verhaal; positie: number; totaal: number }
  | { soort: 'verder'; verhaal: Verhaal; positie: number; totaal: number; afgerond: number }
  | { soort: 'klaar'; totaal: number };

export function bepaalReis(
  progress: Record<string, { completedChapters: number[] }>,
  uitgelezenIds: Set<string>
): ReisStand {
  const tijdlijn = getTijdlijn();
  const totaal = tijdlijn.length;
  const afgerond = (verhaal: Verhaal) => progress[verhaal.id]?.completedChapters.length ?? 0;
  const isUit = (verhaal: Verhaal) => uitgelezenIds.has(verhaal.id) || afgerond(verhaal) >= verhaal.chapters.length;

  const halfOpen = tijdlijn.findIndex((verhaal) => !isUit(verhaal) && afgerond(verhaal) > 0);
  if (halfOpen !== -1) {
    const verhaal = tijdlijn[halfOpen];
    return { soort: 'verder', verhaal, positie: halfOpen + 1, totaal, afgerond: afgerond(verhaal) };
  }
  const volgende = tijdlijn.findIndex((verhaal) => !isUit(verhaal));
  if (volgende === -1) return { soort: 'klaar', totaal };
  const ooitIetsGelezen = tijdlijn.some((verhaal) => afgerond(verhaal) > 0 || uitgelezenIds.has(verhaal.id));
  return { soort: ooitIetsGelezen ? 'volgende' : 'begin', verhaal: tijdlijn[volgende], positie: volgende + 1, totaal };
}

/** Eén halte op de routekaart van een tijdperk. */
export type Halte = {
  verhaal: Verhaal;
  stand: 'uit' | 'bezig' | 'open';
  afgerond: number;
};

/**
 * De route door één tijdperk (1.4.2): de verhalen in tijdlijnvolgorde, elk met zijn stand, plus
 * welke halte "de volgende" is — een half gelezen verhaal eerst, anders het eerste ongelezen,
 * `null` als alles uit is. Zelfde regels als `bepaalReis`, zodat de tegel op Home, de routekaart
 * en de reiskaart het nooit oneens zijn. Elke halte is vrij aan te klikken; de route is een
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
  const bezig = haltes.findIndex((halte) => halte.stand === 'bezig');
  const open = haltes.findIndex((halte) => halte.stand === 'open');
  return {
    haltes,
    volgende: bezig !== -1 ? bezig : open !== -1 ? open : null,
    uit: haltes.filter((halte) => halte.stand === 'uit').length,
  };
}
