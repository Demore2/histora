import type { WidgetInfo } from 'react-native-android-widget';

import { getVertalingen } from '@/i18n';
import { useTaalStore } from '@/store/taal-store';
import { useVoortgangStore } from '@/store/voortgang-store';
import { wachtOpHydratie } from '@/store/sync-hulp';
import { bepaalStreakStand } from '@/widget/streak-fase';
import { StreakWidget } from '@/widget/streak-widget';

/** De naam uit `app.json` (plugin `react-native-android-widget`). Wijzig ze samen. */
export const STREAK_WIDGET = 'Streak';

/**
 * Bouwt de streak-widget uit de opgeslagen stand. **Alleen op Android laden** — dit bestand
 * importeert (via `streak-widget.tsx`) de widgetbibliotheek, en die gooit bij het importeren als de
 * native module er niet is. De twee aanroepers (`widget-task-handler.tsx` en `vernieuw-widget.ts`)
 * doen dat achter een `Platform`-controle.
 *
 * **Wacht op de hydratie van beide stores.** De achtergrondtaak draait vaak in een koud proces
 * (app dicht, telefoon net wakker), en dan is `streakDagen` nog de beginwaarde 0 tot AsyncStorage
 * gelezen is — dan zou elke widget-update een slapende vos tonen.
 */
export async function maakStreakWidget(info: WidgetInfo) {
  await Promise.all([wachtOpHydratie(useVoortgangStore), wachtOpHydratie(useTaalStore)]);
  const { streakDagen, laatsteActiviteitDatum } = useVoortgangStore.getState();
  const s = getVertalingen(useTaalStore.getState().taal).widget;
  const stand = bepaalStreakStand(streakDagen, laatsteActiviteitDatum);

  return (
    <StreakWidget
      stand={stand}
      breedte={info.width}
      hoogte={info.height}
      dagenTekst={s.dagen(stand.dagen)}
      zin={s.zinnen[stand.fase]}
      weekdagen={[...s.weekdagen]}
    />
  );
}
