import type { Verhaal } from '@/constants/types';
import { middeleeuwen } from './personen';
import { middeleeuwenGebeurtenissen } from './gebeurtenissen';
import { middeleeuwenGegenereerd } from './gegenereerd';

export const verhalen: Verhaal[] = [...middeleeuwen, ...middeleeuwenGebeurtenissen, ...middeleeuwenGegenereerd];
