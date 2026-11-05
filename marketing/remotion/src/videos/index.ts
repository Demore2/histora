// Elke video: zijn config plus het timingbestand dat `npm run timing -- <id>` schrijft.
// Een nieuwe video = een config in deze map, een regel hier, en dan de stappen uit README.md.
import type { ShortConfig, Timing } from '../sjabloon/types';
import alexander from './alexander-the-great';
import alexanderTiming from './timing/alexander-the-great.json';
import cleopatra from './cleopatra';
import cleopatraTiming from './timing/cleopatra.json';
import mansaMusa from './mansa-musa';
import mansaMusaTiming from './timing/mansa-musa.json';
import napoleon from './napoleon-bonaparte';
import napoleonTiming from './timing/napoleon-bonaparte.json';
import spartacus from './spartacus';
import spartacusTiming from './timing/spartacus.json';
import ashoka from './ashoka-maurya';
import ashokaTiming from './timing/ashoka-maurya.json';
import qin from './qin-shi-huang';
import qinTiming from './timing/qin-shi-huang.json';
import moon from './moon-landing';
import moonTiming from './timing/moon-landing.json';
import genghis from './genghis-khan';
import genghisTiming from './timing/genghis-khan.json';

export const VIDEOS: { config: ShortConfig; timing: Timing }[] = [
  { config: alexander, timing: alexanderTiming as Timing },
  { config: spartacus, timing: spartacusTiming as Timing },
  { config: mansaMusa, timing: mansaMusaTiming as Timing },
  { config: napoleon, timing: napoleonTiming as Timing },
  { config: cleopatra, timing: cleopatraTiming as Timing },
  { config: ashoka, timing: ashokaTiming as Timing },
  { config: qin, timing: qinTiming as Timing },
  { config: moon, timing: moonTiming as Timing },
  { config: genghis, timing: genghisTiming as Timing },
];
