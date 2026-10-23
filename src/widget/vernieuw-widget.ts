import { Platform } from 'react-native';

type WidgetSdk = typeof import('react-native-android-widget');
type Maker = typeof import('@/widget/maak-streak-widget');

/**
 * De app-kant van de streak-widget. Zelfde vorm als `lib/push.ts`: lui `require` achter een
 * `Platform`-controle, nooit gooien. Op web en iOS bestaat de native module niet en zou een
 * statische import de app op het eerste frame laten klappen.
 */
let geladen: { sdk: WidgetSdk; maker: Maker } | null | undefined;

function laad() {
  if (geladen !== undefined) return geladen;
  if (Platform.OS !== 'android') return (geladen = null);
  try {
    geladen = {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      sdk: require('react-native-android-widget') as WidgetSdk,
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      maker: require('@/widget/maak-streak-widget') as Maker,
    };
  } catch (fout) {
    if (__DEV__) console.warn('[widget] niet beschikbaar:', fout);
    geladen = null;
  }
  return geladen;
}

/**
 * Tekent elke geplaatste streak-widget opnieuw. Aangeroepen door `useStreakWidget()` als de streak
 * of de taal verandert, zodat de vos meteen juicht na een afgerond hoofdstuk in plaats van tot de
 * volgende update van 30 minuten te blijven smeken. Geen widget op het homescreen: niets.
 */
export function vernieuwStreakWidget(): void {
  const l = laad();
  if (!l) return;
  void l.sdk
    .requestWidgetUpdate({ widgetName: l.maker.STREAK_WIDGET, renderWidget: l.maker.maakStreakWidget })
    .catch(() => {});
}

/**
 * Vraagt de launcher de widget op het homescreen te zetten (Android 8+, en niet elke launcher kan
 * het). `false` betekent "kan hier niet", niet "geweigerd" — dat laatste vertelt Android niet.
 */
export async function vraagWidgetToevoegen(): Promise<boolean> {
  const l = laad();
  if (!l) return false;
  try {
    return await l.sdk.requestPinWidget({ widgetName: l.maker.STREAK_WIDGET });
  } catch {
    return false;
  }
}

export function widgetKanToevoegen(): boolean {
  return Platform.OS === 'android' && laad() !== null;
}
