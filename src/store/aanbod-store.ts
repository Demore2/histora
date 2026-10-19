import { create } from 'zustand';

/**
 * Is Pro op dit moment werkelijk te koop?
 *
 * Ja zodra RevenueCat een offering met minstens één pakket teruggeeft — en dat kan alleen als het
 * abonnement in de Play Console bestaat, aan RevenueCat gekoppeld is en de build de SDK bevat.
 * `useAankopen()` vult dit na het koppelen.
 *
 * **Dit is de tweede helft van elke monetisatievlag.** `PRO_BANNER_ENABLED` en
 * `VERHAAL_LIMIET_ENABLED` zeggen "we willen dit"; deze store zegt "het kan". De limiet en het
 * aanbod gaan pas aan als allebei waar zijn, zodat er nooit een muur zonder deur staat: geen
 * dagelijkse limiet zolang er niets te kopen valt (vóór de producten bestaan, op web, in een oude
 * dev-client, of als de offerings niet laden), en geen Pro-knop die op "plannen konden niet geladen
 * worden" uitkomt. Mislukt het laden, dan valt alles terug op open — zelfde keuze als de
 * leeslimiet zelf maakt bij een netwerkfout.
 *
 * Bewust niet `persist`: de SDK van RevenueCat cachet de offerings zelf, en een bewaarde "te koop"
 * van gisteren zou een limiet aanzetten voor een product dat inmiddels is ingetrokken.
 */
type AanbodState = {
  teKoop: boolean;
  zetTeKoop: (teKoop: boolean) => void;
};

export const useAanbodStore = create<AanbodState>((set) => ({
  teKoop: false,
  zetTeKoop: (teKoop) => set({ teKoop }),
}));

/** Voor een beslissing op één moment (de leeslimiet), buiten React. */
export function isAanbodTeKoop(): boolean {
  return useAanbodStore.getState().teKoop;
}
