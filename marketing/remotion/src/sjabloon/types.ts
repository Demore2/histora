// Het sjabloon "30 seconds of history". Eén video = één ShortConfig (src/videos/<id>.ts) plus een
// gegenereerd timingbestand (src/videos/timing/<id>.json, door scripts/timing.mjs).

/** Eén gesproken zin of zinsdeel: één stuk voice-over, één ondertitelblok. */
export type Beat = {
  /** Wat de stem zegt (voor de placeholder-stem en de woordtelling). */
  say: string;
  /**
   * Ondertitelkaarten, 2-5 woorden per stuk. `{woord}` wordt oranje. Laat weg om `say` zelf te tonen.
   * Elke kaart blijft staan tot de volgende; de woorden lichten op in het tempo van de stem.
   */
  cap?: string[];
  /** Stilte na deze zin in seconden (standaard 0.18). Gebruik ~0.5 voor een dramatische pauze. */
  pauseAfter?: number;
};

export type Motion =
  /** Langzame pan over de breedte van een 16:9-beeld; x0/x1 = horizontale focus 0..1 (0.5 = midden). */
  | { kind: 'pan'; x0: number; x1: number; zoom0?: number; zoom1?: number; y?: number }
  /** Inzoomen op een punt (fx, fy in 0..1 van het bronbeeld). */
  | { kind: 'push'; fx: number; fy: number; zoom0?: number; zoom1?: number };

export type MapStop = {
  name: string;
  lon: number;
  lat: number;
  /** Waar het label staat; standaard rechts van de stip. */
  label?: 'left' | 'right' | 'above';
};

export type Territory = { polygon: [number, number][]; label?: string; full?: boolean };

export type Shot =
  | {
      kind: 'scene';
      /** Begint bij deze beat (index in `beats`), of bij de CTA. */
      from: number | 'cta';
      /** Pad onder public/, bijv. `scenes/alexander-the-great-6.webp`. */
      src: string;
      /** Breedte/hoogte van het bronbeeld; scènes zijn 16:9 (standaard), portretten 3:4. */
      aspect?: number;
      motion: Motion;
      /** Korte witte flits op de knip (voor een klap in het verhaal). */
      flash?: boolean;
      /** Begin zoveel seconden vóór de beat, in de pauze ervoor. Geef de beat ervóór dan een lange `pauseAfter`. */
      lead?: number;
    }
  | {
      kind: 'map';
      from: number | 'cta';
      /** De hele route; het pad tekent zich van stop `fromStop` naar `toStop` in tijdens deze shot. */
      stops: MapStop[];
      fromStop: number;
      toStop: number;
      /** Hoeveel lengtegraden de breedte van het beeld beslaat (inzoom). Standaard 22. */
      span?: number;
      /** Een gestippelde terugweg naar deze stop, getekend na de laatste stop. */
      returnTo?: number;
      /** Zoom van begin naar eind van de shot (<1 = uitzoomen naar de hele route), bijv. [1, 0.4]. */
      zoom?: [number, number];
      /** Het gebied dat de figuur bezit. Groeit rond elke bereikte stop; `full` = het hele gebied kleurt in. */
      territory?: Territory;
      /** Op welk deel van de shot (0..1) de lijn aankomt; standaard ~8 frames voor het eind. Korter = de laatste stop staat langer in beeld. */
      draw?: number;
      flash?: boolean;
      lead?: number;
    }
  | {
      /**
       * Een tijdlijn op schaal: punten op een lijn die zich van links naar rechts intekent, met onder (of boven)
       * de lijn de afstand in jaren tussen twee punten. Voor "dichter bij X dan bij Y".
       */
      kind: 'timeline';
      from: number | 'cta';
      points: TimelinePoint[];
      /** Afstanden die verschijnen nadat de punten staan: tussen punt `a` en `b`, boven of onder de lijn. */
      gaps: { a: number; b: number; label: string; side: 'above' | 'below' }[];
      /** Vage achtergrond onder de tijdlijn (pad onder public/). */
      backdrop?: string;
      flash?: boolean;
      lead?: number;
    }
  | {
      /** Staande staven die op schaal opgroeien, voor een vergelijking (lengtes, aantallen). */
      kind: 'bars';
      from: number | 'cta';
      bars: Bar[];
      /** De laagste waarde op de as (de staven beginnen hier), zodat kleine verschillen zichtbaar worden. */
      floor: number;
      /** Kop boven de staven, bijv. 'HEIGHT'. */
      title?: string;
      backdrop?: string;
      flash?: boolean;
      lead?: number;
    };

export type TimelinePoint = {
  /** Jaar; negatief = v.Chr. */
  year: number;
  /** Het jaartal zoals het in beeld staat, bijv. '2560 BC'. */
  yearLabel: string;
  label: string;
  /** Pad onder public/ voor een rond plaatje boven het punt; anders een getekend icoon. */
  img?: string;
  icon?: 'pyramid' | 'moon';
  highlight?: boolean;
};

export type Bar = {
  label: string;
  value: number;
  /** Wat er boven de staaf staat, bijv. '1.69 m'. */
  display: string;
  /** Kleine regel onder de waarde, bijv. "5'2\" in French inches". */
  sub?: string;
  /** Oranje en als laatste opgroeiend; de rest is room. */
  highlight?: boolean;
  /** Gestreept en doorgestreept: de mythe. */
  myth?: boolean;
};

/** Grote tekst die bij een beat in beeld springt: een jaartal, een getal, één woord. */
export type Stamp = {
  beat: number;
  /** Kleine regel boven het grote woord. */
  over?: string;
  big: string;
  /** Kleine regel onder het grote woord. */
  under?: string;
  /** Telt het getal in `big` op van 0 (alleen als `big` een geheel getal is). */
  countUp?: boolean;
};

export type ShortConfig = {
  id: string;
  /** Verhaal-id in de app; daar komen de beelden vandaan. */
  storyId: string;
  /** De claim in beeld vanaf frame 1. `{deel}` wordt oranje, `|` is een regelovergang. */
  hook: string;
  /** Hoe lang de hook-titel blijft staan: t/m deze beat. */
  hookUntilBeat: number;
  beats: Beat[];
  shots: Shot[];
  /** Jaartal in de hoek, vanaf deze beat. */
  /** `lead`: zoveel seconden eerder, gelijk met een shot die ook `lead` heeft. */
  years: { beat: number; text: string; lead?: number }[];
  stamps: Stamp[];
  /** Versnelling van de opname (atempo) in scripts/timing.mjs; standaard 1.1. */
  voiceTempo?: number;
  /** De omslag (scripts/render.mjs maakt hem mee). */
  cover: Cover;
  /** Beats waarop de muziek hard stil valt (dramatische zin). Leest ook scripts/music.mjs. */
  silenceOn: number[];
  /** Echte geluidseffecten (skill `sound-designer`), bestanden in `public/<id>/sfx/`. */
  sfx?: Sfx[];
};

/**
 * Eén geluidseffect, vastgemaakt aan een beat in plaats van aan een tijd: na `npm run timing` schuift het mee.
 * Het bestand begint op het begin (of `vanaf: 'eind'`) van die beat plus `plus` seconden. Een klap die op de cue
 * moet vallen staat dus zijn eigen aanloop (onset in het bestand) eerder.
 */
export type Sfx = { beat: number; vanaf?: 'begin' | 'eind'; plus?: number; src: string; volume?: number };

/**
 * Omslag, 1080x1920. Alles wat telt staat binnen het middelste 3:4-vak (1080x1440), want het profielraster van
 * Instagram en TikTok snijdt boven en onder weg. `{deel}` = oranje.
 */
export type Cover = {
  /** Pad onder public/; liefst het portret (3:4, past precies in het rastervak). */
  src: string;
  aspect?: number;
  /** De naam, één regel per element, bijv. ['ALEXANDER', '{THE GREAT}']. */
  name: string[];
  /** De claim in één regel, bijv. 'NEVER LOST A {MAJOR BATTLE}'. */
  hook: string;
  /**
   * Alleen voor een liggend beeld: snijd het bij tot het hele 3:4-rastervak gevuld is, met het gezicht op
   * deze horizontale positie (0..1). Zonder `focus` staat een liggend beeld er héél in, als smalle strook.
   */
  focus?: number;
};

/** Uitkomst van scripts/timing.mjs, in seconden op de tijdlijn van de video. */
export type Timing = {
  /** `placeholder` = Windows-stem of schatting, `voice` = echte opname. */
  source: 'estimate' | 'placeholder' | 'voice';
  beats: [number, number][];
  cta: [number, number];
  total: number;
  /** Naam van de stem (bestandsnaam van de opname), voor de bestandsnaam van de render. */
  voice?: string;
  /** Is er een vo.wav / music.wav in public/<id>/? */
  hasVoice: boolean;
  hasMusic: boolean;
};
