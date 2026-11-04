// Elke video: zijn config plus het timingbestand dat `npm run timing -- <id>` schrijft.
// Een nieuwe video = een config in deze map, een regel hier, en dan de stappen uit README.md.
import type { ShortConfig, Timing } from '../sjabloon/types';
import alexander from './alexander-the-great';
import alexanderTiming from './timing/alexander-the-great.json';
import spartacus from './spartacus';
import spartacusTiming from './timing/spartacus.json';

export const VIDEOS: { config: ShortConfig; timing: Timing }[] = [
  { config: alexander, timing: alexanderTiming as Timing },
  { config: spartacus, timing: spartacusTiming as Timing },
];
