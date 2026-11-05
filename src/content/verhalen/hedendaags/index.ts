import type { Verhaal } from '@/constants/types';
import { hedendaags } from './personen';
import { hedendaagsGebeurtenissen } from './gebeurtenissen';
import { hedendaagsGegenereerd } from './gegenereerd';

export const verhalen: Verhaal[] = [...hedendaags, ...hedendaagsGebeurtenissen, ...hedendaagsGegenereerd];
