import type { Verhaal } from '@/constants/types';
import { industrieleRevolutie } from './personen';
import { industrieleRevolutieGebeurtenissen } from './gebeurtenissen';
import { industrieleRevolutieGegenereerd } from './gegenereerd';

export const verhalen: Verhaal[] = [...industrieleRevolutie, ...industrieleRevolutieGebeurtenissen, ...industrieleRevolutieGegenereerd];
