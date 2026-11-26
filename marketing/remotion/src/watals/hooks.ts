/**
 * Hook-varianten voor Instagram trial reels (plan: marketing/trial-reels-plan.md, 2026-11-26).
 *
 * Eén What-if wordt drie trials, die alleen in de eerste seconden verschillen (Instagram vergelijkt vooral de
 * eerste 3 s en het beeld):
 *   A = zoals altijd: de vraag "What if you were X?" opent;
 *   B = de top eerst: de scène met het hoogtepunt opent, de vraag komt als tweede;
 *   C = een schokdetail eerst: de vreemdste/hardste scène opent, de vraag komt als tweede.
 *
 * Er worden geen scènes bijgemaakt of weggegooid, alleen verplaatst, dus de lengte blijft gelijk (< 58 s) en de
 * afsluiter (laatste scène) blijft het einde. Elke What-if geeft zijn eigen `HookPlan` op: welke scène B en C opent.
 * Daarnaast kan per variant het muziekfragment verschuiven (`muziekVanaf`), zodat ook de audio niet identiek is.
 */

export type Hook = 'A' | 'B' | 'C';
export const HOOKS: Hook[] = ['A', 'B', 'C'];

/** Welke scène (index in de gewone volgorde) bij B en C vooraan komt. */
export type HookPlan = { B: number; C: number };

/** De scènevolgorde voor een hook, als lijst van originele indices. */
export const hookVolgorde = (aantal: number, plan: HookPlan | undefined, hook: Hook = 'A'): number[] => {
  const alle = Array.from({ length: aantal }, (_, i) => i);
  if (hook === 'A' || !plan) return alle;
  const voor = plan[hook];
  if (voor <= 0 || voor >= aantal - 1) throw new Error(`hook ${hook}: scène ${voor} kan niet openen (0 is de vraag, de laatste de afsluiter)`);
  return [voor, ...alle.filter((i) => i !== voor)];
};

/** Startframe per scène, geïndexeerd op de originele index, voor een gegeven volgorde. */
export const startsVoor = (duur: number[], volgorde: number[]): number[] => {
  const starts = new Array<number>(duur.length);
  let t = 0;
  for (const i of volgorde) {
    starts[i] = t;
    t += duur[i];
  }
  return starts;
};

/** De knippen (alle starts behalve 0), voor de whoosh op elke overgang. */
export const knippen = (starts: number[]) => starts.filter((s) => s > 0).sort((a, b) => a - b);

/** Standaard muziekstart per hook (seconden in "Amour plastique"), zodat de drie trials ook anders klinken. */
export const MUZIEK_PER_HOOK: Record<Hook, number> = { A: 14, B: 20, C: 8 };
