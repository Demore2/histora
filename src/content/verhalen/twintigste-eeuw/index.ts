import type { Verhaal } from '@/constants/types';
import { twintigsteEeuw } from './personen';
import { twintigsteEeuwGebeurtenissen } from './gebeurtenissen';
import { twintigsteEeuwGegenereerd } from './gegenereerd';

export const verhalen: Verhaal[] = [...twintigsteEeuw, ...twintigsteEeuwGebeurtenissen, ...twintigsteEeuwGegenereerd];
