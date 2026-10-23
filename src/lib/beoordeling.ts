import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';
import { Platform } from 'react-native';

/**
 * Vraagt om een beoordeling in Google Play, via het venster van Play zelf (In-App Review API).
 *
 * Zelfde vorm als `haptics.ts` en `deel.ts`: een intent, geen API. Hij gooit nooit, doet niets op
 * web, en de aanroeper hoeft niet te weten of er iets verscheen — dat weet niemand, want Google
 * vertelt het niet. Play heeft een eigen, ongedocumenteerde quotum en toont het venster vaak
 * gewoon niet; daarom is er ook geen "beoordeel ons"-knop die op deze functie leunt.
 *
 * **Het moment is na een uitgelezen verhaal**, als het personagevenster dicht is en de lezer weer
 * op Home staat: net iets afgemaakt en beloond, en niet midden in het lezen. De reader roept dit
 * aan; nergens anders.
 *
 * **Hooguit eens per `INTERVAL_DAGEN`**, bijgehouden op dit toestel. Ook als Play het venster zelf
 * al afknijpt: wie de API te vaak aanroept loopt sneller tegen dat quotum aan, en dan verschijnt
 * hij juist niet bij de lezer die net zijn vijfde verhaal uit heeft.
 */
const SLEUTEL = 'beoordeling_laatst_gevraagd';
const INTERVAL_DAGEN = 120;
/** Wachten tot de navigatie naar Home klaar is; een venster tijdens de overgang wordt weggeklikt. */
const VERTRAGING_MS = 900;

export async function vraagOmBeoordeling(): Promise<void> {
  if (Platform.OS !== 'android') return;
  try {
    const laatst = Number(await AsyncStorage.getItem(SLEUTEL)) || 0;
    if (Date.now() - laatst < INTERVAL_DAGEN * 24 * 60 * 60 * 1000) return;
    if (!(await StoreReview.hasAction())) return;

    // Vóór het tonen vastleggen: of het venster verscheen weten we niet, en een tweede poging
    // morgen is precies wat het quotum opmaakt.
    await AsyncStorage.setItem(SLEUTEL, String(Date.now()));
    await new Promise((klaar) => setTimeout(klaar, VERTRAGING_MS));
    await StoreReview.requestReview();
  } catch {
    // Geen Play Store, geen Play-services, of een emulator zonder account: niets aan de hand.
  }
}
