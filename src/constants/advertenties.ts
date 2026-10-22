/**
 * De AdMob-instellingen, op één plek (v1.2).
 *
 * **Wat hier staat is niet geheim.** Een app-ID en een ad unit-ID zitten hoe dan ook in de bundel
 * en het manifest; AdMob beschermt ze niet met geheimhouding maar met de koppeling aan dit pakket.
 *
 * **Zolang een eenheid `null` is, toont een productiebuild op die plek niets.** In `__DEV__` wordt
 * dan Google's test-eenheid gebruikt, zodat je de plaatsing kunt bekijken zonder een echte
 * vertoning te veroorzaken. Echte advertenties aantikken op je eigen toestel is een klassieke
 * reden voor AdMob om een account te blokkeren — daarom nooit een echte eenheid in `__DEV__`.
 *
 * Het **app-ID** staat niet hier maar in `app.json` (plugin `react-native-google-mobile-ads`),
 * want het moet in het manifest staan vóórdat er één regel JS draait: `ca-app-pub-5960565412463172~2661644668`
 * (account Demore, sinds 2026-10-22). Het iOS-ID daar is nog het voorbeeld-ID van Google; er is geen iOS-app.
 *
 * **Het app-ID staat twee keer in `app.json`, en beide moeten gelijk blijven**: in het plugin-blok
 * (`androidAppId`, voor het manifest) én als top-level-sleutel `react-native-google-mobile-ads`
 * (`android_app_id`). Die tweede is een omweg om een bug in 17.2.0 heen: zonder die sleutel zet
 * `android/app-json.gradle` een variabele met een tikfout (`googleAdsJson`), en dan faalt
 * `build.gradle` op "Cannot get property 'googleMobileAdsJson'". Expo meldt bij elk commando dat het
 * die extra sleutel negeert. Dat klopt, want hij is alleen voor Gradle bedoeld.
 */
export const ADMOB_EENHEDEN: { banner: string | null; interstitial: string | null } = {
  banner: 'ca-app-pub-5960565412463172/4405971174', // banner-main
  interstitial: 'ca-app-pub-5960565412463172/3587713526', // interstitial-story-end
};

/**
 * De vaste banner op Home en op het tijdperk-scherm. Bewust **niet** in de reader: daar is de
 * tekst het product, en een banner onder elk hoofdstuk zou acht keer per verhaal dezelfde
 * onderbreking zijn. Keuze van de eigenaar, 2026-10-22.
 */
export const ADS_ENABLED = true;
