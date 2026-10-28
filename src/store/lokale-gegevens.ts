import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAbonnementStore } from '@/store/abonnement-store';
import { useAchievementStore } from '@/store/achievement-store';
import { useCharacterUnlockStore } from '@/store/character-unlock-store';
import { STANDAARD_EMAIL_VOORKEUREN, useEmailVoorkeurStore } from '@/store/email-voorkeur-store';
import { useNotificatieStore } from '@/store/notificatie-store';
import { usePrestatieStore } from '@/store/prestatie-store';
import { useProfileStore } from '@/store/profile-store';
import { useRecommendationStore } from '@/store/recommendation-store';
import { useReferralStore } from '@/store/referral-store';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { wachtOpHydratie } from '@/store/sync-hulp';
import { wisAbonnementCache } from '@/store/subscription-store';
import { useTriviaStore } from '@/store/trivia-store';
import { useVoortgangStore } from '@/store/voortgang-store';
import { useWinkelStore } from '@/store/winkel-store';

/** Wie er op dit toestel het laatst ingelogd was (1.4.4). Overleeft uitloggen, met opzet. */
const LAATSTE_GEBRUIKER_SLEUTEL = 'laatste-gebruiker-id';
/** Of die laatste een gastaccount was (1.5.0): `'1'` of afwezig. */
const LAATSTE_WAS_GAST_SLEUTEL = 'laatste-gebruiker-gast';

/** Eén lopende controle tegelijk: `login()` en `onAuthStateChange` melden dezelfde sessie bijna tegelijk. */
let lopend: { userId: string; isGast: boolean; klaar: Promise<void> } | null = null;

/**
 * Roep aan vóór elke `setUser`, dus voordat een hook of store de nieuwe gebruiker ziet (1.4.4).
 *
 * De voortgangsstores **verenigen** lokaal met server bij het inloggen; dat is de bedoeling voor
 * wat je las vóór je een account had. Maar uitloggen laat de voortgang op het toestel staan, en
 * dan kreeg een **ander** account dat hier daarna inlogt de streak, hoofdstukken en personages
 * van de vorige lezer — en zette die op de server. Dus: was er hiervoor iemand anders ingelogd,
 * dan eerst `wisLokaleGebruikersgegevens()`. Hetzelfde account of nog nooit iemand: niets wissen.
 *
 * Wacht eerst op de hydratie van alles wat gewist wordt: wissen vóór AsyncStorage is ingelezen
 * wordt meteen weer overschreven door de opgeslagen stand. Een installatie van vóór 1.4.4 kent
 * de sleutel nog niet; de eerste login daarna verenigt dus nog één keer zoals vroeger.
 *
 * **Een gastaccount (1.5.0, anoniem) telt als "nog niemand".** Wie als gast begint te lezen en dan
 * inlogt op een bestaand account, neemt die voortgang mee — precies wat lezen-zonder-account
 * vóór 1.5.0 deed. Koppelen (Google of e-mail aan de gast hangen) houdt hetzelfde id en raakt
 * deze regel niet.
 */
export function bereidToestelVoorGebruiker(userId: string, isGast = false): Promise<void> {
  // Ook op `isGast`: na het koppelen is het id hetzelfde maar moet de gastvlag eraf, anders erft een
  // volgend account op dit toestel de voortgang van dit (nu echte) account.
  if (lopend?.userId === userId && lopend.isGast === isGast) return lopend.klaar;
  const klaar = (async () => {
    let vorige: string | null = null;
    let vorigeWasGast = false;
    try {
      const [[, id], [, gast]] = await AsyncStorage.multiGet([LAATSTE_GEBRUIKER_SLEUTEL, LAATSTE_WAS_GAST_SLEUTEL]);
      vorige = id;
      vorigeWasGast = gast === '1';
    } catch {
      // Niet te lezen: dan weten we het niet, en verenigen is het oude, veilige gedrag.
    }
    if (vorige && vorige !== userId && !vorigeWasGast) {
      await Promise.all(
        [
          useVoortgangStore,
          useStoryProgressStore,
          useCharacterUnlockStore,
          useAchievementStore,
          useRecommendationStore,
          useReferralStore,
          useNotificatieStore,
          usePrestatieStore,
          useWinkelStore,
          useTriviaStore,
          useProfileStore,
          useEmailVoorkeurStore,
          useAbonnementStore,
        ].map((store) => wachtOpHydratie(store))
      );
      wisLokaleGebruikersgegevens({ behoudAankondigingen: true });
    }
    try {
      await AsyncStorage.multiSet([
        [LAATSTE_GEBRUIKER_SLEUTEL, userId],
        [LAATSTE_WAS_GAST_SLEUTEL, isGast ? '1' : '0'],
      ]);
    } catch {
      // Volgende keer opnieuw proberen.
    }
  })();
  lopend = { userId, isGast, klaar };
  return klaar;
}

/**
 * Wist alles wat dít toestel over de ingelogde lezer bewaart.
 *
 * **Voor accountverwijdering en voor een accountwissel op dit toestel
 * (`bereidToestelVoorGebruiker`), niet voor uitloggen.** Uitloggen belooft juist het
 * tegenovergestelde ("your reading progress stays on this device"), en de serverrij is dan de
 * kopie voor de volgende keer. Hier is er geen serverrij meer om naar terug te keren.
 *
 * Waarom dit móét gebeuren, en niet alleen netjes is: de drie voortgangsstores **verenigen** bij
 * de eerstvolgende login lokaal met server (`voegServerVoortgangSamen`) in plaats van te
 * overschrijven. Blijft de voortgang staan, dan erft het volgende account dat op dit toestel
 * wordt aangemaakt de hoofdstukken, personages en streak van de verwijderde lezer — en zet die
 * vervolgens keurig op de server. Dan is er dus een kopie van precies de gegevens die net
 * "voorgoed verwijderd" heetten.
 *
 * Wat blijft staan, met opzet: taal, thema, de dagelijkse herinnering en de toestemming voor
 * gebruiksstatistieken. Dat zijn instellingen van het *toestel*, geen geschiedenis van de
 * persoon — en de analytics-schakelaar terugzetten op zijn standaard zou een uitgezette meting
 * stilletjes weer aanzetten.
 */
export function wisLokaleGebruikersgegevens({
  behoudAankondigingen = false,
}: {
  /**
   * Bij een accountwissel (niet bij verwijderen): laat `prestatie-store` staan. Gewist meet de
   * eerste meting "nul mijlpalen" vóórdat de voortgang van de nieuwe lezer van de server binnen
   * is, en kondigt die daarna als nieuw aan — een felicitatievenster voor een oude streak. Een
   * gemiste felicitatie voor iets dat de vorige lezer hier al vierde is het kleinere kwaad.
   */
  behoudAankondigingen?: boolean;
} = {}): void {
  // Eerst de geplande syncs afblazen. Zonder dit vertrekt twee seconden na een laatste
  // afgevinkt hoofdstuk alsnog een upsert — naar een account dat niet meer bestaat.
  useVoortgangStore.getState().resetSyncStatus();
  useStoryProgressStore.getState().resetSyncStatus();
  useCharacterUnlockStore.getState().resetSyncStatus();
  useAchievementStore.getState().resetSyncStatus();
  useRecommendationStore.getState().resetSyncStatus();
  useReferralStore.getState().resetSyncStatus();
  // De notificatievoorkeuren zélf blijven staan — dat is een instelling van dit toestel, net als
  // taal en thema. Wat wél weg moet is een openstaande sync: die zou de voorkeuren van de
  // verwijderde lezer naar het volgende account op dit toestel duwen.
  useNotificatieStore.getState().resetSyncStatus();
  useNotificatieStore.setState({ heeftOnverzondenWijzigingen: false });

  useVoortgangStore.setState({
    gelezenIds: new Set(),
    bekekenIds: new Set(),
    completedStories: new Set(),
    streakDagen: 0,
    laatsteActiviteitDatum: null,
    lastSyncTime: null,
    // De vlag zegt "dit toestel loopt voor op de server". Er is geen server meer om op voor te
    // lopen, en een openstaande vlag zou de volgende lezer een lege push laten doen.
    heeftOnverzondenWijzigingen: false,
  });

  useStoryProgressStore.setState({ progress: {}, heeftOnverzondenWijzigingen: false });

  // De mijlpalen zijn afgeleid en verdwijnen dus vanzelf met de voortgang hierboven. Wat hier weg
  // moet is het lijstje "hier heb je de melding al voor gehad": blijft dat staan, dan haalt de
  // volgende lezer op dit toestel zijn eerste tien hoofdstukken zonder ooit een mijlpaal te zien.
  // `geinitialiseerd` gaat mee terug op `false`, zodat die lezer een schone eerste meting krijgt.
  if (!behoudAankondigingen) usePrestatieStore.getState().reset();
  // En de serverkant ervan: de ontgrendeldata en deelstatus horen bij de verwijderde lezer.
  // Blijven die staan, dan neemt de samenvoeging bij de volgende login ze mee omhoog naar het
  // nieuwe account — een kopie van precies de gegevens die net "voorgoed verwijderd" heetten.
  useAchievementStore.setState({
    ontgrendeld: [],
    stand: null,
    heeftOnverzondenWijzigingen: false,
  });
  useCharacterUnlockStore.setState({ unlockedCharacters: [], heeftOnverzondenWijzigingen: false });

  // De winkel (1.3): het saldo is een kopie van een serverstand die met het account verdwijnt, en
  // de wachtrij `teVerzilveren` zou de hoofdstukken van de verwijderde lezer als Dukaten op het
  // volgende account op dit toestel bijschrijven.
  useWinkelStore.getState().reset();

  // Explore (1.5): het lopende spel en de beste score horen bij de lezer, niet bij het toestel.
  // De levens staan op de server en verdwijnen met het account.
  useTriviaStore.getState().nieuwSpel();
  useTriviaStore.getState().nieuwDuel();
  useTriviaStore.setState({
    besteScore: 0,
    gewonnenSpellen: 0,
    duelsGewonnen: 0,
    duelsVerloren: 0,
    kroonTotaal: {},
    gezien: [],
  });

  // De aanbevelingen zijn afgeleid uit voortgang die hierboven net is gewist, dus ze zeggen niets
  // meer — maar ze zijn wél een lijstje verhaal-id's van de verwijderde lezer, en de samenvoeging
  // bij de volgende login zou ze naar het nieuwe account tillen. Zelfde reden als bij de
  // personages hierboven.
  useRecommendationStore.setState({ aanbevelingen: [], heeftOnverzondenWijzigingen: false });

  // De avatar: een personage-avatar verwijst naar een verhaal dat je niet meer hebt ontgrendeld,
  // een foto-avatar is een bestand van de vorige lezer.
  useProfileStore.getState().wisAvatar();
  useEmailVoorkeurStore.setState({ voorkeuren: { ...STANDAARD_EMAIL_VOORKEUREN } });

  // `gestarteVerhalen` is een lijst verhaal-id's van vandaag — leesgedrag, dus het gaat mee. Dat
  // geeft de volgende aanmelding op dit toestel wel een verse dagteller; die uitruil is bewust,
  // want een dagteller doseert nieuwe inhoud en is geen gegeven dat we mogen bewaren.
  useAbonnementStore.setState({
    isPro: false,
    proTot: null,
    dagSleutel: null,
    gestarteVerhalen: [],
    // Een tegoed dat met de uitnodigingen van de verwijderde lezer is verdiend hoort niet bij het
    // volgende account op dit toestel terecht te komen — zelfde redenering als bij de personages.
    bonusVerhalen: 0,
  });

  // De uitnodigingsrij: de code is afgeleid van een gebruiker-id dat niet meer bestaat, en de
  // lijst uitgenodigde vrienden is een gegeven over de verwijderde lezer. Zou hij blijven staan,
  // dan tilt de samenvoeging bij de volgende login hem naar het nieuwe account — een kopie van
  // precies de gegevens die net "voorgoed verwijderd" heetten.
  useReferralStore.setState({ data: null, heeftOnverzondenWijzigingen: false });

  // De abonnementsstatus uit Supabase plus de gecachte kopie ervan. De serverrij is met de cascade
  // op auth.users al weg; dit is de kopie die op dit toestel achterbleef.
  wisAbonnementCache();
}
