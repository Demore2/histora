import type { VertaaldVeld } from '@/constants/types';
import type { TijdperkId } from '@/lib/trivia';

export type Opwarmvraag = {
  tijdperkId: TijdperkId;
  vraag: VertaaldVeld;
  opties: VertaaldVeld[];
  /** Index in `opties`, voor alle talen dezelfde. */
  goed: number;
  uitleg: VertaaldVeld;
};

/**
 * De opwarmer in de intro (1.4.5): één vraag per tijdperk, **in de bundel** en niet uit Supabase,
 * want de intro draait vóór het inloggen en `trivia_trek` vraagt een sessie. Bewust bekende feiten
 * die bij een verhaal in de app horen, zodat de lezer het antwoord daar later terugleest.
 */
export const OPWARMVRAGEN: Opwarmvraag[] = [
  {
    tijdperkId: 'oudheid',
    vraag: {
      en: 'Which Roman city was buried by the eruption of Vesuvius in AD 79?',
      nl: 'Welke Romeinse stad werd in 79 n.Chr. bedolven door de uitbarsting van de Vesuvius?',
      fr: 'Quelle ville romaine fut ensevelie par l’éruption du Vésuve en 79 apr. J.-C. ?',
      de: 'Welche römische Stadt wurde 79 n. Chr. beim Ausbruch des Vesuvs verschüttet?',
    },
    opties: [
      { en: 'Carthage', nl: 'Carthago', fr: 'Carthage', de: 'Karthago' },
      { en: 'Pompeii', nl: 'Pompeï', fr: 'Pompéi', de: 'Pompeji' },
      { en: 'Athens', nl: 'Athene', fr: 'Athènes', de: 'Athen' },
      { en: 'Alexandria', nl: 'Alexandrië', fr: 'Alexandrie', de: 'Alexandria' },
    ],
    goed: 1,
    uitleg: {
      en: 'Ash and pumice buried Pompeii in a day, preserving the town almost exactly as it was.',
      nl: 'As en puimsteen bedolven Pompeï in één dag, waardoor de stad bijna precies bewaard bleef.',
      fr: 'Cendres et pierres ponces ont recouvert Pompéi en un jour, figeant la ville presque intacte.',
      de: 'Asche und Bimsstein begruben Pompeji an einem Tag und bewahrten die Stadt fast unverändert.',
    },
  },
  {
    tijdperkId: 'middeleeuwen',
    vraag: {
      en: 'Who was crowned emperor by the Pope on Christmas Day in the year 800?',
      nl: 'Wie werd op eerste kerstdag van het jaar 800 door de paus tot keizer gekroond?',
      fr: 'Qui fut couronné empereur par le pape le jour de Noël de l’an 800 ?',
      de: 'Wer wurde am Weihnachtstag des Jahres 800 vom Papst zum Kaiser gekrönt?',
    },
    opties: [
      { en: 'William the Conqueror', nl: 'Willem de Veroveraar', fr: 'Guillaume le Conquérant', de: 'Wilhelm der Eroberer' },
      { en: 'Genghis Khan', nl: 'Dzjengis Khan', fr: 'Gengis Khan', de: 'Dschingis Khan' },
      { en: 'Charlemagne', nl: 'Karel de Grote', fr: 'Charlemagne', de: 'Karl der Große' },
      { en: 'Saladin', nl: 'Saladin', fr: 'Saladin', de: 'Saladin' },
    ],
    goed: 2,
    uitleg: {
      en: 'Pope Leo III crowned Charlemagne in St Peter’s in Rome, reviving the title of emperor in the West.',
      nl: 'Paus Leo III kroonde Karel de Grote in de Sint-Pieter in Rome en blies zo de westerse keizerstitel nieuw leven in.',
      fr: 'Le pape Léon III couronna Charlemagne à Saint-Pierre de Rome, ressuscitant le titre d’empereur en Occident.',
      de: 'Papst Leo III. krönte Karl den Großen im Petersdom in Rom und belebte so den Kaisertitel im Westen wieder.',
    },
  },
  {
    tijdperkId: 'vroegmoderne-tijd',
    vraag: {
      en: 'In which year did Columbus first reach the Americas?',
      nl: 'In welk jaar bereikte Columbus voor het eerst Amerika?',
      fr: 'En quelle année Christophe Colomb atteignit-il l’Amérique pour la première fois ?',
      de: 'In welchem Jahr erreichte Kolumbus erstmals Amerika?',
    },
    opties: [
      { en: '1453', nl: '1453', fr: '1453', de: '1453' },
      { en: '1517', nl: '1517', fr: '1517', de: '1517' },
      { en: '1588', nl: '1588', fr: '1588', de: '1588' },
      { en: '1492', nl: '1492', fr: '1492', de: '1492' },
    ],
    goed: 3,
    uitleg: {
      en: 'On 12 October 1492 his ships landed in the Bahamas. He believed he had reached Asia.',
      nl: 'Op 12 oktober 1492 landden zijn schepen op de Bahama’s. Hij dacht dat hij Azië had bereikt.',
      fr: 'Le 12 octobre 1492, ses navires abordèrent aux Bahamas. Il pensait avoir atteint l’Asie.',
      de: 'Am 12. Oktober 1492 landeten seine Schiffe auf den Bahamas. Er glaubte, Asien erreicht zu haben.',
    },
  },
  {
    tijdperkId: 'industriele-revolutie',
    vraag: {
      en: 'Which machine did James Watt famously improve?',
      nl: 'Welke machine heeft James Watt beroemd gemaakt door hem te verbeteren?',
      fr: 'Quelle machine James Watt a-t-il rendue célèbre en l’améliorant ?',
      de: 'Welche Maschine hat James Watt berühmt gemacht, indem er sie verbesserte?',
    },
    opties: [
      { en: 'The steam engine', nl: 'De stoommachine', fr: 'La machine à vapeur', de: 'Die Dampfmaschine' },
      { en: 'The telephone', nl: 'De telefoon', fr: 'Le téléphone', de: 'Das Telefon' },
      { en: 'The printing press', nl: 'De drukpers', fr: 'La presse à imprimer', de: 'Die Druckerpresse' },
      { en: 'The light bulb', nl: 'De gloeilamp', fr: 'L’ampoule', de: 'Die Glühbirne' },
    ],
    goed: 0,
    uitleg: {
      en: 'His separate condenser made steam engines far more efficient, and they went on to power the factories.',
      nl: 'Zijn aparte condensor maakte stoommachines veel zuiniger, en daarna dreven ze de fabrieken aan.',
      fr: 'Son condenseur séparé rendit les machines à vapeur bien plus efficaces ; elles firent ensuite tourner les usines.',
      de: 'Sein separater Kondensator machte Dampfmaschinen viel effizienter, und bald trieben sie die Fabriken an.',
    },
  },
  {
    tijdperkId: 'twintigste-eeuw',
    vraag: {
      en: 'Who was the first person to walk on the Moon, in 1969?',
      nl: 'Wie was in 1969 de eerste mens die op de maan liep?',
      fr: 'Qui fut le premier homme à marcher sur la Lune, en 1969 ?',
      de: 'Wer betrat 1969 als erster Mensch den Mond?',
    },
    opties: [
      { en: 'Yuri Gagarin', nl: 'Joeri Gagarin', fr: 'Youri Gagarine', de: 'Juri Gagarin' },
      { en: 'Buzz Aldrin', nl: 'Buzz Aldrin', fr: 'Buzz Aldrin', de: 'Buzz Aldrin' },
      { en: 'Neil Armstrong', nl: 'Neil Armstrong', fr: 'Neil Armstrong', de: 'Neil Armstrong' },
      { en: 'John Glenn', nl: 'John Glenn', fr: 'John Glenn', de: 'John Glenn' },
    ],
    goed: 2,
    uitleg: {
      en: 'Neil Armstrong stepped onto the Moon on 20 July 1969, with Buzz Aldrin following shortly after.',
      nl: 'Neil Armstrong zette op 20 juli 1969 voet op de maan; Buzz Aldrin volgde kort daarna.',
      fr: 'Neil Armstrong posa le pied sur la Lune le 20 juillet 1969 ; Buzz Aldrin le suivit peu après.',
      de: 'Neil Armstrong betrat am 20. Juli 1969 den Mond; Buzz Aldrin folgte kurz darauf.',
    },
  },
  {
    tijdperkId: 'hedendaags',
    vraag: {
      en: 'Which device did Steve Jobs unveil in January 2007?',
      nl: 'Welk apparaat presenteerde Steve Jobs in januari 2007?',
      fr: 'Quel appareil Steve Jobs a-t-il présenté en janvier 2007 ?',
      de: 'Welches Gerät stellte Steve Jobs im Januar 2007 vor?',
    },
    opties: [
      { en: 'The iPod', nl: 'De iPod', fr: 'L’iPod', de: 'Den iPod' },
      { en: 'The iPhone', nl: 'De iPhone', fr: 'L’iPhone', de: 'Das iPhone' },
      { en: 'The iPad', nl: 'De iPad', fr: 'L’iPad', de: 'Das iPad' },
      { en: 'The Macintosh', nl: 'De Macintosh', fr: 'Le Macintosh', de: 'Den Macintosh' },
    ],
    goed: 1,
    uitleg: {
      en: 'He introduced it as "an iPod, a phone and an internet communicator" in one device.',
      nl: 'Hij noemde het "een iPod, een telefoon en een internetcommunicator" in één apparaat.',
      fr: 'Il le présenta comme « un iPod, un téléphone et un communicateur Internet » en un seul appareil.',
      de: 'Er stellte es als „iPod, Telefon und Internet-Kommunikator“ in einem Gerät vor.',
    },
  },
];

/**
 * Drie vragen voor deze lezer: eerst uit de gekozen tijdperken, aangevuld met de rest, in de
 * volgorde van de tijdlijn. Geen toeval: de intro moet bij elke start hetzelfde doen.
 */
export function kiesOpwarmvragen(gekozen: TijdperkId[], aantal = 3): Opwarmvraag[] {
  const voorkeur = OPWARMVRAGEN.filter((v) => gekozen.includes(v.tijdperkId));
  const rest = OPWARMVRAGEN.filter((v) => !gekozen.includes(v.tijdperkId));
  return [...voorkeur, ...rest].slice(0, aantal);
}
