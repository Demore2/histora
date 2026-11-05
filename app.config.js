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
const fs = require('fs');
const path = require('path');
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
 * Firebase op iOS hangt aan één bestand: `GoogleService-Info.plist` in de repo-root (gecommit,
 * net als `google-services.json` — het is configuratie, geen geheim).
 *
 * - **Zonder dat bestand** krijgt een iOS-build geen Firebase-plugins: de plugin van
 *   `@react-native-firebase/app` gooit op een ontbrekende plist, en de pods staan dan uitgesloten
 *   in `expo.autolinking.ios.exclude`. Zo is het sinds 1.5.1.
 * - **Met dat bestand** blijven de plugins staan, wijst `ios.googleServicesFile` ernaar, en zet
 *   `expo-build-properties` `useFrameworks: 'static'` — dat eist React Native Firebase op iOS.
 *   Dan moeten `app` en `analytics` uit `ios.exclude` (messaging blijft eruit tot push er is).
 *
 * De twee helften (bestand en uitsluitlijst) moeten het eens zijn, anders bouwt hij zonder Firebase
 * of met pods zonder configuratie. `bewaakIos()` gooit dan met de ontbrekende stap erin.
 * `EAS_BUILD_PLATFORM` zet EAS zelf.
 */
const IOS_PLIST = './GoogleService-Info.plist';
const IOS_FIREBASE = fs.existsSync(path.join(__dirname, IOS_PLIST));

function bewaakIos() {
  const uitgesloten = require('./package.json').expo?.autolinking?.ios?.exclude ?? [];
  const nodig = ['@react-native-firebase/app', '@react-native-firebase/analytics'];
  const nogUit = nodig.filter((naam) => uitgesloten.includes(naam));
  if (IOS_FIREBASE && nogUit.length) {
    throw new Error(
      `${IOS_PLIST} staat er, maar package.json sluit ${nogUit.join(', ')} op iOS nog uit van het autolinken. ` +
        'Haal ze uit "expo.autolinking.ios.exclude" (messaging mag blijven), anders zit er geen Firebase in de iOS-build.'
    );
  }
  if (!IOS_FIREBASE && nogUit.length < nodig.length) {
    throw new Error(
      `package.json linkt Firebase op iOS, maar ${IOS_PLIST} ontbreekt. ` +
        'Zet het bestand uit de Firebase Console in de repo-root, of zet de pods terug in "expo.autolinking.ios.exclude".'
    );
  }
  if (IOS_FIREBASE) {
    try {
      require.resolve('expo-build-properties');
    } catch {
      throw new Error(`${IOS_PLIST} staat er, maar expo-build-properties ontbreekt: \`npx expo install expo-build-properties\`.`);
    }
  }
}

function zonderFirebasePlugins(config) {
  return (config.plugins ?? []).filter(
    (plugin) => !String(pluginNaam(plugin)).startsWith('@react-native-firebase/')
  );
}

/** iOS mét Firebase: plist erbij en statische frameworks (eis van React Native Firebase). */
function metIosFirebase(config) {
  return {
    ...config,
    ios: { ...config.ios, googleServicesFile: IOS_PLIST },
    plugins: [
      ...(config.plugins ?? []).filter((p) => pluginNaam(p) !== 'expo-build-properties'),
      ['expo-build-properties', { ios: { useFrameworks: 'static' } }],
    ],
  };
}

module.exports = ({ config }) => {
  if (FIREBASE_AAN) {
    bewaakUitsluitlijst();
    bewaakIos();
    if (process.env.EAS_BUILD_PLATFORM === 'ios') {
      return IOS_FIREBASE ? metIosFirebase(config) : { ...config, plugins: zonderFirebasePlugins(config) };
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
