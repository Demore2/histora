import type { WidgetTaskHandlerProps } from 'react-native-android-widget';

import { maakStreakWidget, STREAK_WIDGET } from '@/widget/maak-streak-widget';

/**
 * De achtergrondtaak achter de widget. Android roept hem aan bij het plaatsen, bij het vergroten,
 * en elke `updatePeriodMillis` (30 minuten, het minimum) — ook als de app dicht is. Geregistreerd
 * in `index.js`, vóór Expo Router, want een headless task moet bestaan voordat de launcher erom
 * vraagt.
 *
 * Een tik op de widget opent de app (`clickAction="OPEN_APP"`); dat handelt de bibliotheek zelf af
 * en komt hier niet langs.
 */
export async function widgetTaskHandler({ widgetInfo, widgetAction, renderWidget }: WidgetTaskHandlerProps) {
  if (widgetInfo.widgetName !== STREAK_WIDGET) return;
  if (widgetAction === 'WIDGET_ADDED' || widgetAction === 'WIDGET_UPDATE' || widgetAction === 'WIDGET_RESIZED') {
    renderWidget(await maakStreakWidget(widgetInfo));
  }
}
