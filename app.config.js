/**
 * Dynamische laag over `app.json`.
 *
 * Expo laadt dit bestand als het bestaat en geeft de inhoud van `app.json` mee als `config`, dus
 * `app.json` blijft de basis en hier staat alleen wat van een omgevingsvariabele afhangt.
 *
 * Op dit moment is dat één ding: **Firebase**. Zonder `google-services.json` in de repo-root
 * faalt `expo prebuild` op de `@react-native-firebase/app`-plugin, en dus faalt élke EAS-build.
 * Dat is een fout in de *native configuratie*, niet in JS — een `if` in `lib/analytics.ts` draait
 * pas als de app al gebouwd is en helpt hier dus niets.
 *
 * Staat `EXPO_PUBLIC_FIREBASE_ENABLED` niet op `'true'`, dan laten we allebei de verwijzingen weg:
 * de plugin en `android.googleServicesFile`. Er wordt dan geen `google-services`-Gradle-plugin
 * toegepast en er is geen bestand om te missen.
 *
 * **Dit is de helft van het werk.** `@react-native-firebase/*` zijn gewone React Native-modules,
 * dus ze worden ook zonder plugin nog geautolinkt en hun manifest wordt nog samengevoegd — waar de
 * build alsnog op omviel (`default_notification_color`, botsend met `expo-notifications`). De
 * andere helft staat in `react-native.config.js`, dat ze bij dezelfde vlag uit het autolinken
 * haalt. De npm-pakketten zelf blijven geïnstalleerd; TypeScript heeft hun typen nodig.
 *
 * Weer aanzetten is: bestand neerzetten, vlag op `true`, `npx expo prebuild --clean`, opnieuw
 * bouwen. Er hoeft geen regel code terug.
 */

// Gedeeld met `react-native.config.js`. Zie dat bestand: het autolinken draait in een ander
// proces dan de Expo-CLI, en als die twee de vlag verschillend lezen valt de build pas om in de
// manifest-merger.
const { FIREBASE_AAN, SLEUTEL } = require('./firebase-vlag');

/** De plugin-invoer kan een string zijn of een `[naam, opties]`-paar. */
function pluginNaam(plugin) {
  return Array.isArray(plugin) ? plugin[0] : plugin;
}

/**
 * De uitsluitlijst in `package.json` kan de vlag niet lezen — het is statische JSON. Dus
 * controleren we hier of de twee het eens zijn. Zonder deze controle levert "vlag op `true`" een
 * build op waarin de Firebase-plugin wél is toegepast maar de native modules níét gekoppeld zijn:
 * hij bouwt, hij start, en er komt nooit een meting of een push binnen. Dat is precies het soort
 * fout dat je pas weken later in een lege console ontdekt.
 */
function bewaakUitsluitlijst() {
  const autolinking = require('./package.json').expo?.autolinking ?? {};
  // Sinds 1.5.1 mag `messaging` (Android) en alles op iOS uitgesloten blijven: alleen Analytics op
  // Android staat aan. De platformlijst vervangt de algemene, dus Android leest `android.exclude`.
  const uitgesloten = autolinking.android?.exclude ?? autolinking.exclude ?? [];
  const nodig = ['@react-native-firebase/app', '@react-native-firebase/analytics'];
  const firebase = uitgesloten.filter((naam) => nodig.includes(naam));
  if (firebase.length === 0) return;
  throw new Error(
    [
      `${SLEUTEL}=true, maar package.json sluit ${firebase.join(', ')} op Android nog uit van het autolinken.`,
      'Haal ze uit "expo.autolinking" in package.json en draai `npx expo prebuild --clean`.',
      'Zonder die stap bouwt de app wel, maar zit er geen Firebase in.',
    ].join(' ')
  );
}

/**
 * Firebase is (nog) Android-only: op iOS ontbreekt `GoogleService-Info.plist`, waar de plugin van
 * `@react-native-firebase/app` op gooit, en de pods zijn daar uitgesloten van het autolinken. Een
 * iOS-build op EAS krijgt de plugins dus niet. `EAS_BUILD_PLATFORM` zet EAS zelf.
 */
function zonderFirebasePlugins(config) {
  return (config.plugins ?? []).filter(
    (plugin) => !String(pluginNaam(plugin)).startsWith('@react-native-firebase/')
  );
}

module.exports = ({ config }) => {
  if (FIREBASE_AAN) {
    bewaakUitsluitlijst();
    if (process.env.EAS_BUILD_PLATFORM === 'ios') {
      return { ...config, plugins: zonderFirebasePlugins(config) };
    }
    return config;
  }

  const { googleServicesFile, ...android } = config.android ?? {};

  return {
    ...config,
    android,
    plugins: zonderFirebasePlugins(config),
  };
};
