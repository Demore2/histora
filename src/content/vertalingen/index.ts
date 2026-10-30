import type { Verhaal } from '@/constants/types';

import { vertaalbareVelden, vertaalSleutel } from './sleutel';
import abrahamLincolnNl from './nl/abraham-lincoln';
import adolfHitlerNl from './nl/adolf-hitler';
import albertEinsteinNl from './nl/albert-einstein';
import alexanderTheGreatNl from './nl/alexander-the-great';
import ashokaMauryaNl from './nl/ashoka-maurya';
import blackDeathNl from './nl/black-death';
import catherineTheGreatNl from './nl/catherine-the-great';
import charlemagneNl from './nl/charlemagne';
import charlesDarwinNl from './nl/charles-darwin';
import christopherColumbusNl from './nl/christopher-columbus';
import cleopatraNl from './nl/cleopatra';
import elizabethINl from './nl/elizabeth-i';
import fallOfConstantinopleNl from './nl/fall-of-constantinople';
import florenceNightingaleNl from './nl/florence-nightingale';
import galileoGalileiNl from './nl/galileo-galilei';
import genghisKhanNl from './nl/genghis-khan';
import hannibalNl from './nl/hannibal';
import harrietTubmanNl from './nl/harriet-tubman';
import henryViiiNl from './nl/henry-viii';
import hernanCortesNl from './nl/hernan-cortes';
import jamesWattNl from './nl/james-watt';
import joanOfArcNl from './nl/joan-of-arc';
import johannesGutenbergNl from './nl/johannes-gutenberg';
import josephStalinNl from './nl/joseph-stalin';
import juliusCaesarNl from './nl/julius-caesar';
import leonardoDaVinciNl from './nl/leonardo-da-vinci';
import louisXivNl from './nl/louis-xiv';
import mahatmaGandhiNl from './nl/mahatma-gandhi';
import mansaMusaNl from './nl/mansa-musa';
import marcoPoloNl from './nl/marco-polo';
import marieAntoinetteNl from './nl/marie-antoinette';
import marieCurieNl from './nl/marie-curie';
import martinLutherNl from './nl/martin-luther';
import martinLutherKingJrNl from './nl/martin-luther-king-jr';
import napoleonBonaparteNl from './nl/napoleon-bonaparte';
import neroNl from './nl/nero';
import nikolaTeslaNl from './nl/nikola-tesla';
import ottoVonBismarckNl from './nl/otto-von-bismarck';
import pompeiiDisasterNl from './nl/pompeii-disaster';
import qinShiHuangNl from './nl/qin-shi-huang';
import queenVictoriaNl from './nl/queen-victoria';
import richardTheLionheartNl from './nl/richard-the-lionheart';
import romeRiseNl from './nl/rome-rise';
import saladinNl from './nl/saladin';
import socratesNl from './nl/socrates';
import spartacusNl from './nl/spartacus';
import suleimanTheMagnificentNl from './nl/suleiman-the-magnificent';
import thomasEdisonNl from './nl/thomas-edison';
import tutankhamunNl from './nl/tutankhamun';
import vladTheImpalerNl from './nl/vlad-the-impaler';
import williamTheConquerorNl from './nl/william-the-conqueror';
import winstonChurchillNl from './nl/winston-churchill';

// Vertalingen van de verhaaltekst, één bestand per verhaal per taal, gesleuteld op
// `vertaalSleutel(en)`. Bewust een expliciete lijst (zoals CHARACTER_IMAGES): een verhaal dat
// hier ontbreekt is Engels, en `npm run content:vertaling` laat zien welke dat zijn.
// Werkwijze: `npm run content:vertaling -- --toon <id>` geeft sleutel + Engelse tekst van elk
// onvertaald veld; schrijf `nl/<id>.ts` en voeg hem hieronder toe.
export type Vertaaltabel = Record<string, string>;

const NL: Record<string, Vertaaltabel> = {
  'abraham-lincoln': abrahamLincolnNl,
  'adolf-hitler': adolfHitlerNl,
  'albert-einstein': albertEinsteinNl,
  'alexander-the-great': alexanderTheGreatNl,
  'ashoka-maurya': ashokaMauryaNl,
  'black-death': blackDeathNl,
  'catherine-the-great': catherineTheGreatNl,
  'charlemagne': charlemagneNl,
  'charles-darwin': charlesDarwinNl,
  'christopher-columbus': christopherColumbusNl,
  'cleopatra': cleopatraNl,
  'elizabeth-i': elizabethINl,
  'fall-of-constantinople': fallOfConstantinopleNl,
  'florence-nightingale': florenceNightingaleNl,
  'galileo-galilei': galileoGalileiNl,
  'genghis-khan': genghisKhanNl,
  'hannibal': hannibalNl,
  'harriet-tubman': harrietTubmanNl,
  'henry-viii': henryViiiNl,
  'hernan-cortes': hernanCortesNl,
  'james-watt': jamesWattNl,
  'joan-of-arc': joanOfArcNl,
  'johannes-gutenberg': johannesGutenbergNl,
  'joseph-stalin': josephStalinNl,
  'julius-caesar': juliusCaesarNl,
  'leonardo-da-vinci': leonardoDaVinciNl,
  'louis-xiv': louisXivNl,
  'mahatma-gandhi': mahatmaGandhiNl,
  'mansa-musa': mansaMusaNl,
  'marco-polo': marcoPoloNl,
  'marie-antoinette': marieAntoinetteNl,
  'marie-curie': marieCurieNl,
  'martin-luther': martinLutherNl,
  'martin-luther-king-jr': martinLutherKingJrNl,
  'napoleon-bonaparte': napoleonBonaparteNl,
  'nero': neroNl,
  'nikola-tesla': nikolaTeslaNl,
  'otto-von-bismarck': ottoVonBismarckNl,
  'pompeii-disaster': pompeiiDisasterNl,
  'qin-shi-huang': qinShiHuangNl,
  'queen-victoria': queenVictoriaNl,
  'richard-the-lionheart': richardTheLionheartNl,
  'rome-rise': romeRiseNl,
  'saladin': saladinNl,
  'socrates': socratesNl,
  'spartacus': spartacusNl,
  'suleiman-the-magnificent': suleimanTheMagnificentNl,
  'thomas-edison': thomasEdisonNl,
  'tutankhamun': tutankhamunNl,
  'vlad-the-impaler': vladTheImpalerNl,
  'william-the-conqueror': williamTheConquerorNl,
  'winston-churchill': winstonChurchillNl,
};

export const VERTALINGEN = { nl: NL } as const;

// Zet de vertalingen op de VertaaldVelden van de verhalen zelf, één keer bij het laden. Daarna
// lost `v()` ze op zoals elk ander veld; geen scherm hoeft hiervan te weten.
export function pasVertalingenToe(verhalen: Verhaal[]): Verhaal[] {
  for (const verhaal of verhalen) {
    for (const [taal, perVerhaal] of Object.entries(VERTALINGEN)) {
      const tabel = perVerhaal[verhaal.id];
      if (!tabel) continue;
      for (const veld of vertaalbareVelden(verhaal)) {
        if (veld[taal]) continue;
        const vertaling = tabel[vertaalSleutel(veld.en)];
        if (vertaling) veld[taal] = vertaling;
      }
    }
  }
  return verhalen;
}
