import type { TaalCode } from '@/constants/types';
import { supabase } from '@/lib/supabase';

/**
 * Explore: trivia met het draaiwiel (1.5). Alles loopt via drie RPC's uit
 * `supabase/trivia-migratie.sql`; de tabel `trivia_vragen` zelf is voor de app onleesbaar.
 *
 * **De app krijgt het juiste antwoord pas ná het antwoorden.** `trivia_trek` geeft een vraag
 * zonder antwoord en zonder toelichting; `trivia_antwoord` controleert, schrijft bij een fout een
 * leven af en geeft dan pas het antwoord terug. Een vraag die lokaal zijn antwoord kent, kan de
 * levens met één blik op het netwerkverkeer omzeilen.
 *
 * Anders dan de quizvragen per hoofdstuk is dit **alleen online**: er is geen bundelversie, en de
 * levens staan op de server. Een mislukte aanroep gooit, en het scherm toont dat.
 */

export type TijdperkId =
  | 'oudheid'
  | 'middeleeuwen'
  | 'vroegmoderne-tijd'
  | 'industriele-revolutie'
  | 'twintigste-eeuw'
  | 'hedendaags';

export type TriviaStand = {
  levens: number;
  maxLevens: number;
  /** Wanneer het volgende leven terugkomt; `null` als de levens vol zijn. */
  volgendeOm: Date | null;
  pro: boolean;
};

type VraagTekst = { vraag: string; opties: string[] };

export type TriviaVraag = VraagTekst & {
  id: string;
  tijdperkId: TijdperkId;
  moeilijkheid: number;
  vertalingen: Partial<Record<TaalCode, VraagTekst>>;
};

export type TriviaUitslag = {
  goed: boolean;
  juiste: number;
  toelichting: string | null;
  toelichtingen: Partial<Record<TaalCode, string>>;
  stand: TriviaStand;
};

function leesStand(waarde: unknown): TriviaStand {
  const rij = (waarde ?? {}) as Record<string, unknown>;
  const volgende = typeof rij.volgende_om === 'string' ? new Date(rij.volgende_om) : null;
  return {
    levens: typeof rij.levens === 'number' ? rij.levens : 0,
    maxLevens: typeof rij.max_levens === 'number' ? rij.max_levens : 5,
    volgendeOm: volgende && !Number.isNaN(volgende.getTime()) ? volgende : null,
    pro: rij.pro === true,
  };
}

function isVierTeksten(waarde: unknown): waarde is string[] {
  return Array.isArray(waarde) && waarde.length === 4 && waarde.every((x) => typeof x === 'string');
}

/** Een vertaling telt alleen met precies vier opties: de antwoordindex geldt voor alle talen. */
function leesVertalingen(waarde: unknown): TriviaVraag['vertalingen'] {
  if (!waarde || typeof waarde !== 'object' || Array.isArray(waarde)) return {};
  const uit: TriviaVraag['vertalingen'] = {};
  for (const [taal, tekst] of Object.entries(waarde as Record<string, unknown>)) {
    const { question, options } = (tekst ?? {}) as Record<string, unknown>;
    if (typeof question === 'string' && isVierTeksten(options)) {
      uit[taal as TaalCode] = { vraag: question, opties: options };
    }
  }
  return uit;
}

/** Fouten die de server bewust gooit, zodat het scherm er iets zinnigs mee kan. */
export class TriviaFout extends Error {
  constructor(public readonly soort: 'geen_levens' | 'geen_vragen' | 'onbekend') {
    super(soort);
  }
}

function vertaalFout(error: { message?: string }): TriviaFout {
  const bericht = error.message ?? '';
  if (bericht.includes('geen_levens')) return new TriviaFout('geen_levens');
  if (bericht.includes('geen_vragen')) return new TriviaFout('geen_vragen');
  return new TriviaFout('onbekend');
}

export async function haalTriviaStand(): Promise<TriviaStand> {
  const { data, error } = await supabase.rpc('trivia_stand');
  if (error) throw vertaalFout(error);
  return leesStand(data);
}

export async function trekVraag(
  tijdperkId: TijdperkId,
  gezien: string[],
  minMoeilijkheid = 1
): Promise<TriviaVraag> {
  const { data, error } = await supabase.rpc('trivia_trek', {
    p_tijdperk: tijdperkId,
    p_gezien: gezien,
    p_min_moeilijkheid: minMoeilijkheid,
  });
  if (error) throw vertaalFout(error);
  const rij = (data ?? {}) as Record<string, unknown>;
  if (typeof rij.id !== 'string' || typeof rij.question !== 'string' || !isVierTeksten(rij.options)) {
    throw new TriviaFout('onbekend');
  }
  return {
    id: rij.id,
    tijdperkId: rij.tijdperk_id as TijdperkId,
    moeilijkheid: typeof rij.moeilijkheid === 'number' ? rij.moeilijkheid : 1,
    vraag: rij.question,
    opties: rij.options,
    vertalingen: leesVertalingen(rij.vertalingen),
  };
}

export async function beantwoordVraag(vraagId: string, keuze: number): Promise<TriviaUitslag> {
  const { data, error } = await supabase.rpc('trivia_antwoord', { p_vraag: vraagId, p_keuze: keuze });
  if (error) throw vertaalFout(error);
  const rij = (data ?? {}) as Record<string, unknown>;
  const toelichtingen: TriviaUitslag['toelichtingen'] = {};
  if (rij.vertalingen && typeof rij.vertalingen === 'object') {
    for (const [taal, tekst] of Object.entries(rij.vertalingen as Record<string, unknown>)) {
      const uitleg = (tekst as Record<string, unknown> | null)?.explanation;
      if (typeof uitleg === 'string') toelichtingen[taal as TaalCode] = uitleg;
    }
  }
  return {
    goed: rij.goed === true,
    juiste: typeof rij.juiste === 'number' ? rij.juiste : -1,
    toelichting: typeof rij.explanation === 'string' ? rij.explanation : null,
    toelichtingen,
    stand: leesStand(rij.stand),
  };
}

/** De vraag in de taal van de lezer, met het Engels als terugval — zelfde regel als `v()`. */
export function vraagInTaal(vraag: TriviaVraag, taal: TaalCode): TriviaVraag {
  const tekst = vraag.vertalingen[taal];
  return tekst ? { ...vraag, ...tekst } : vraag;
}

export function toelichtingInTaal(uitslag: TriviaUitslag, taal: TaalCode): string | null {
  return uitslag.toelichtingen[taal] ?? uitslag.toelichting;
}
