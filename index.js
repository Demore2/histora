// Het startpunt van de bundel (`main` in package.json). Was `expo-router/entry`; sinds 1.3 komt er
// één ding bij: de achtergrondtaak van de streak-widget.
//
// Die moet hier staan en niet in een scherm: Android start de taak ook als de app dicht is, en dan
// wordt er geen enkel scherm gemonteerd — alleen deze bundel wordt geladen. Achter een
// Platform-controle en met `require`, want de widgetbibliotheek gooit bij het importeren als de
// native module er niet is (web).
import { Platform } from 'react-native';
import 'expo-router/entry';

if (Platform.OS === 'android') {
  const { registerWidgetTaskHandler } = require('react-native-android-widget');
  const { widgetTaskHandler } = require('./src/widget/widget-task-handler');
  registerWidgetTaskHandler(widgetTaskHandler);
}
