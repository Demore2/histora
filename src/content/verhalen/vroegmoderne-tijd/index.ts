import type { Verhaal } from '@/constants/types';
import { vroegmoderneTijd } from './personen';
import { vroegmoderneTijdGebeurtenissen } from './gebeurtenissen';
import { vroegmoderneTijdGegenereerd } from './gegenereerd';

export const verhalen: Verhaal[] = [...vroegmoderneTijd, ...vroegmoderneTijdGebeurtenissen, ...vroegmoderneTijdGegenereerd];
