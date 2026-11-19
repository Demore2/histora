import type React from 'react';
import type { ReactNode } from 'react';

/** Eén shot in BaibarsLang: start op zin `zin` (+ `na` seconden), met sfeergeluid en accenten. */
export type ShotDef = {
  zin: number;
  na?: number;
  C: () => React.ReactElement;
  over?: ReactNode;
  hoofdstuk?: [string, string];
  sfeer?: string;
  vol?: number;
  accent?: { bij: number; src: string; vol: number }[];
};
