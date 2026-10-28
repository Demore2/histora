import type { PrestatieId } from '@/constants/prestaties';
import type { AanbevelingReden } from '@/content/aanbeveling';
import type { StreakFase } from '@/widget/streak-fase';

// Bron van waarheid voor alle UI-sleutels. nl/fr/de moeten dezelfde
// structuur volgen; ontbrekende sleutels daar vallen terug op deze Engelse
// tekst (zie src/i18n/index.ts).
const en = {
  /**
   * De merknaam en de eenregelige omschrijving van de app.
   *
   * Staat in i18n en niet in `app-info.ts` omdat het gebruikerstekst is: het opstartscherm toont
   * `app.name`, en de omschrijving is dezelfde zin als de korte storebeschrijving in
   * `store/listing.md`. De naam zelf is een merknaam en blijft in elke taal gelijk; alleen de
   * omschrijving wordt vertaald.
   */
  app: {
    name: 'Histora',
    description: 'Learn history through interactive stories',
  },
  /**
   * **De tabnamen zijn in elke taal Engels** (keuze van de eigenaar, 2026-10-26): nl/fr/de
   * vertalen deze sectie bewust niet, zodat ze via `diepeMerge` op dit Engels terugvallen. Voeg
   * hier dus geen vertaling aan toe in de andere talen.
   */
  tabs: {
    ontdek: 'Home',
    explore: 'Explore',
    voortgang: 'Progress',
    profiel: 'Profile',
    winkel: 'Shop',
  },
  ontdek: {
    uitgelicht: 'Featured',
    leesNu: 'Read now',
    verderLezen: 'Continue reading',
    verderLezenLegeTitel: 'Nothing started yet',
    verderLezenLegeBeschrijving: 'Stories you open will appear here.',
    verhaallijnen: 'Storylines',
    ontdekMeer: 'Discover more',
    nieuwToegevoegd: 'New hot topics',
    /** Kop van de kaart op Home voor een verhaal dat deze week is toegevoegd (1.4.3). */
    nieuwVerhaal: 'New story',
    /** Het labeltje op een tijdperktegel en een halte op de routekaart. */
    nieuwLabel: 'New',
    toonAlles: 'Show all',
  },
  /** De reiskaart bovenaan Home (`reis-kaart.tsx`): de tijdlijn van Rome tot vandaag. */
  reis: {
    beginKop: 'Your journey starts here',
    beginTitel: 'From the pharaohs to the world today',
    beginTekst: (titel: string) => `First stop: ${titel}`,
    beginKnop: 'Begin the journey',
    verderKop: 'Continue your journey',
    verderKnop: 'Continue',
    hoofdstukVan: (hoofdstuk: number, totaal: number) => `Chapter ${hoofdstuk} of ${totaal}`,
    volgendeKop: 'Next on your journey',
    volgendeKnop: 'Start reading',
    positie: (positie: number, totaal: number) => `Stop ${positie} of ${totaal}`,
    klaarKop: 'Journey complete',
    klaarTitel: 'You travelled all the way from the pharaohs to today',
    klaarTekst: 'New stories are on their way. Until then, test what you remember.',
    klaarKnop: 'Play trivia',
    tijdperkGelezen: (uit: number, totaal: number) => `${uit}/${totaal} read`,
    tijdperkProcent: (procent: number) => `${procent}% read`,
    routeBegin: 'Start at the beginning',
    routeVerder: 'Continue the route',
    routeKlaar: 'You finished this era',
    halteVolgende: 'Next stop',
    oppakkenKop: 'Pick up where you left off',
    halteBezig: (hoofdstuk: number, totaal: number) => `Chapter ${hoofdstuk} of ${totaal}`,
  },
  /**
   * Het opstartscherm (`components/splash-screen.tsx`). De merknaam erboven komt uit `app.name`
   * en blijft onvertaald; deze regel is een zin en hoort dus wél mee te gaan met de taal.
   */
  splash: {
    ondertitel: 'Discover the Stories That Shaped Our World',
  },
  /**
   * De "Recommended for you"-kaart op Home (`recommended-story-card.tsx`).
   *
   * `reden` is getypeerd tegen `AanbevelingReden`, zodat een nieuwe reden zonder tekst een
   * compileerfout is in plaats van een lege regel — dezelfde afspraak als bij `prestatie.namen`.
   * Alle drie zijn functies met dezelfde handtekening, ook al gebruiken er twee de tijdperknaam
   * niet: dan hoeft de kaart niet te weten welke reden een parameter kent.
   */
  aanbeveling: {
    kop: 'Recommended for you',
    startLezen: 'Start reading',
    reden: {
      favorite_era: (tijdperk: string): string => `More from ${tijdperk}, the era you read most`,
      next_up: (): string => 'Next up in your journey',
      first_story: (): string => 'A good place to begin',
    } satisfies Record<AanbevelingReden, (tijdperk: string) => string>,
    leegTitel: 'You have opened every story',
    leegTekst: 'Nothing left to suggest — finish one you started, or read a favourite again.',
  },
  voortgang: {
    /** Net als de tabnamen in elke taal Engels: nl/fr/de vertalen hem bewust niet. */
    titel: 'Progress',
    streak: (n: number) => (n === 1 ? `${n} day streak` : `${n} days streak`),
    streakBeschrijving: 'Finish a chapter every day to keep your streak going.',
    streakLeeg: 'No streak yet',
    streakLeegBeschrijving: 'Finish a chapter today to start one.',
    verhalenGelezen: 'Stories read',
    chaptersRead: 'chapters done',
    charactersUnlocked: 'characters unlocked',
    storiesCompleted: 'stories completed',
    perTijdperk: 'By era',
    byEra: 'By Era',
    kroontjes: 'Crowns',
    kroontjesLabel: (n: number): string => `${n} crowns won in trivia. Play trivia.`,
    kroontjesTekst: (n: number): string => (n === 1 ? '1 crown won in trivia' : `${n} crowns won in trivia`),
    kroontjesLeeg: 'Win crowns in trivia against Phoxy: every two right answers earn a crown question.',
    aantalVerhalen: (gelezen: number, totaal: number) => `${gelezen}/${totaal} stories`,
    storiesOfEra: (completed: number, total: number) => `${completed} of ${total} stories`,
    noMoreStories: 'All stories explored! View all via Discover more.',

    /**
     * De vier tellerkaarten bovenaan Voortgang. Naam en eenheid staan apart omdat het cijfer er
     * als los `display`-getal tussen staat: alleen de eenheid buigt mee met het aantal, de naam
     * is het vaste kopje van de kaart.
     */
    statStreak: 'Streak',
    statStreakEenheid: (n: number): string => (n === 1 ? 'day' : 'days'),
    statHoofdstukken: 'Chapters',
    statHoofdstukkenEenheid: 'done',
    statVerhalen: 'Stories',
    statVerhalenEenheid: 'completed',
    statPersonages: 'Characters',
    statPersonagesEenheid: 'unlocked',
    /** Rechts van een tijdperkbalk: hoeveel procent van dat tijdperk uit is. */
    eraPercentage: (procent: number): string => `${procent}%`,
  },
  profiel: {
    /** Net als de tabnamen in elke taal Engels: nl/fr/de vertalen hem bewust niet. */
    titel: 'Profile',
    characterCollection: 'Character Collection',
    // Functies, geen strings: het getal staat als los `display`-cijfer boven het label, dus
    // alleen het label mag meebuigen. "1 chapters done" stond in een store-screenshot.
    // Het expliciete `: string` is nodig: `en` is `as const`, dus zonder annotatie wordt het
    // retourtype de letterlijke Engelse tekst en past geen enkele vertaling er meer in.
    chaptersRead: (n: number): string => (n === 1 ? 'chapter done' : 'chapters done'),
    charactersUnlocked: (n: number): string => (n === 1 ? 'character unlocked' : 'characters unlocked'),
    storiesCompleted: (n: number): string => (n === 1 ? 'story completed' : 'stories completed'),
    unlockedCounter: (count: number, total: number) => `${count} of ${total} unlocked`,
    /** Op een vergrendelde personagekaart, in plaats van de naam die je nog moet verdienen. */
    personageVergrendeld: 'Still hidden',
    personageVergrendeldUitleg: 'Finish this story to add the portrait to your collection.',
    /** Aanmoediging onder de collectie. Verdwijnt zodra alles ontgrendeld is. */
    nogTeOntgrendelen: (n: number): string =>
      n === 1 ? 'One more story to complete your collection.' : `Read on to unlock ${n} more characters.`,
    collectieCompleet: 'Your collection is complete. Every character unlocked.',
    instellingen: 'Settings',
    thema: 'Theme',
    themaLicht: 'Light',
    themaDonker: 'Dark',
    themaSysteem: 'System',
    taal: 'Language',
    herinnering: 'Daily reminder',
    // Bewust zonder tijdstip: dat is sinds de instelbare herinnering geen vast gegeven meer, en
    // het staat een regel lager als waarde bij `instellingen.herinneringTijd`.
    herinneringUitleg: 'A quiet nudge to read your next chapter.',
    over: 'About',
    privacybeleid: 'Privacy Policy',
    privacybeleidUitleg: 'Histora stores your progress on this device only and collects no personal data.',
    /** Toegankelijkheidslabels van de twee icoonknoppen bovenaan Profiel. */
    instellingenOpenen: 'Open settings',
    feedbackOpenen: 'Send feedback',
    avatarWijzigen: 'Change avatar',
    /** Valt in als er noch een gebruikersnaam noch een e-mailadres bekend is. */
    naamloos: 'Reader',
  },
  /** Het avatarscherm (modal vanaf Profiel). */
  avatar: {
    titel: 'Your avatar',
    ondertitel: 'Wear a character you unlocked, or a picture of your own.',
    fotoKiezen: 'Choose a photo',
    fotoUitleg: 'Stays on this device.',
    fotoMislukt: 'That picture could not be opened.',
    personages: 'Unlocked characters',
    personagesLeeg: 'Finish a story to unlock a portrait you can wear here.',
    verwijderen: 'Remove avatar',
    huidige: 'Current avatar',
  },
  /** Het instellingenscherm (`app/profiel/settings.tsx`). */
  instellingen: {
    titel: 'Settings',
    sectieAccount: 'Account',
    sectieWeergave: 'Appearance',
    sectieMeldingen: 'Notifications',
    sectieAbonnement: 'Subscription',
    sectieSupport: 'Support & feedback',
    sectieApp: 'App info',
    sectieGevaar: 'Account',

    // Alles wat nog niet bestaat draagt dit label in plaats van een knop die doet alsof.
    binnenkort: 'Soon',
    binnenkortTitel: 'Not available yet',
    binnenkortTekst: (onderwerp: string): string =>
      `${onderwerp} is not part of this version of Histora yet.`,
    ok: 'OK',

    /**
     * Rechts van een regel die informatie is en geen knop. Staat bij de meldingen en bij de
     * gebruiksstatistieken: allebei categorieën die de app zelf beheert.
     */
    altijdAan: 'Always on',

    ingelogdAls: 'Signed in as',
    gastAccount: 'Guest account',
    gastUitleg: 'Save your progress so you don\'t lose it when you change phones.',
    gebruikersnaam: 'Username',
    geenGebruikersnaam: 'Not set',
    wachtwoordWijzigen: 'Change password',
    uitnodigen: 'Invite friends',
    uitnodigenUitleg: 'Share your code and earn rewards.',
    synchronisatie: 'Sync',

    appIcoon: 'App icon',
    /**
     * Bij een "Soon"-regel is de vraag niet dát het er nog niet is, maar wát er dan komt. De
     * uitleg staat onder het label en de melding erachter vertelt het hele verhaal, in plaats van
     * de algemene `binnenkortTekst`.
     */
    appIcoonUitleg: 'Alternative icons for your home screen.',
    appIcoonBinnenkortTekst:
      'A later version lets you swap the Histora icon on your home screen for a different one — a light and a dark variant, and one per era. Nothing changes inside the app. It is not in this build yet.',
    abonnement: 'Your plan',
    abonnementGratis: 'Free',
    abonnementPro: 'Pro',
    /** De losse regel waarmee een gratis lezer het aanbod opent. Zie `abonnementProVoordelen`. */
    abonnementUpgrade: 'Upgrade to Pro',
    /**
     * Wat Pro oplevert, onder de plan-regel van een Pro-lezer. Bewust de twee dingen die de app
     * vandaag écht doet — geen belofte over inhoud die er niet is.
     */
    abonnementProVoordelen: 'No interruptions · Unlimited reading',
    /** Opent het abonnementenoverzicht van Google Play; opzeggen kan alleen daar. */
    abonnementBeheren: 'Manage subscription',
    /** Onder "Your plan" voor een opgezegd abonnement dat nog loopt. */
    abonnementLooptAf: (datum: string): string => `Ends on ${datum} · does not renew`,
    abonnementVerlengt: (datum: string): string => `Renews on ${datum}`,
    dagelijkseLimiet: 'Today’s reading',
    /** Rechts van "Your plan" voor een gratis lezer: hoeveel van de dag nog over is. */
    verhalenVandaag: (gebruikt: number, limiet: number): string =>
      `${gebruikt}/${limiet} stories today`,
    onbeperkt: 'Unlimited',

    // --- Dagelijkse herinnering ---
    /**
     * De drie meldingen die bij het lezen zelf horen (herinnering, streak, mijlpaal) hebben geen
     * schakelaar meer in de app. De voetnoot zegt dat, en zegt er meteen bij wáár ze dan wel uit
     * kunnen — een categorie zonder uitknop noemen zonder de uitknop te wijzen is een halve zin.
     */
    meldingenVoet:
      'These belong to reading with Histora, so there is no switch for them here. Android keeps its own: press and hold a notification, or open Android Settings → Apps → Histora → Notifications, to silence one kind without losing the others.',
    /** Zonder systeemtoestemming kan geen van de drie aankomen. Dan is dit de enige echte knop. */
    meldingenToestemming: 'Allow notifications',
    meldingenToestemmingUitleg:
      'Notifications are switched off for Histora, so none of these can reach you. Tap to turn them on.',
    herinneringTijd: 'Reminder time',
    /**
     * Klok­notatie. Een functie en geen `toLocaleTimeString`: de app kent vier talen die niet met
     * de systeemtaal hoeven mee te lopen, en alleen het Engels gebruikt AM/PM.
     */
    tijdWaarde: (uur: number, minuut: number): string => {
      const deel = uur < 12 ? 'AM' : 'PM';
      const twaalf = uur % 12 === 0 ? 12 : uur % 12;
      return `${twaalf}:${String(minuut).padStart(2, '0')} ${deel}`;
    },
    tijdKiezerTitel: 'When should we nudge you?',
    tijdKiezerUitleg: 'One reminder a day, at this time. You can change it whenever you like.',
    tijdOpslaan: 'Save time',
    uur: 'Hour',
    minuut: 'Minute',

    // --- E-mailvoorkeuren ---
    sectieEmail: 'Email',
    emailVoorkeuren: 'Email preferences',
    /**
     * Kort gehouden, maar niet weggehaald. Twee dingen moeten hier staan: er gaat vandaag nog
     * niets uit, en afmelden kan onderaan elke mail. Dat tweede is geen dienst maar de route die
     * de wet eist bij vooraf aangezette vlaggen (zie `email-voorkeur-store.ts`), en die route
     * wordt hier in de app bewust niet gedupliceerd.
     *
     * Wat eruit ging is de opsomming van wélke standaard aan staan: dat zie je aan de vier
     * schakelaars erboven, en het liep achter zodra er een standaardwaarde wijzigde.
     */
    emailUitleg:
      'Histora sends no email yet. Every email we send has an unsubscribe link at the bottom, and that link works for good.',
    emailNieuwsbrief: 'Monthly letter',
    emailNieuwsbriefUitleg: 'One email a month, with what we have been reading.',
    emailNieuweVerhalen: 'New stories',
    emailNieuweVerhalenUitleg: 'A note when a new story or era lands.',
    emailTips: 'Reading tips',
    emailTipsUitleg: 'Occasional ideas on getting more out of a chapter.',
    emailAanbiedingen: 'Offers',
    emailAanbiedingenUitleg: 'Discounts on Histora Pro. Rare, we promise.',

    // --- Privacy ---
    sectiePrivacy: 'Privacy',
    analytics: 'Usage statistics',
    analyticsUitleg: 'Helps us improve Histora.',
    advertentieKeuzes: 'Ad choices',
    advertentieKeuzesUitleg: 'Change what you agreed to for ads.',
    /**
     * Ingekort tot twee zinnen, maar niet geschrapt, en de twee dingen die moesten blijven staan
     * er nog: wát er gemeten wordt (bewust niet "anoniem" — ingelogd hangt het aan je account) en
     * wélke route je hebt zonder schakelaar. "Hier valt niets aan te doen" is geen mededeling die
     * je over gegevens kunt doen; zie `analytics-preferences.tsx` en `docs/privacy-policy.html`.
     */
    analyticsVoet:
      'Histora counts screens, finished chapters and taps, with your device type and country — never what you write. It is tied to your account and handled by Google Firebase; to object, or to have it removed, write to us or delete your account below.',

    // --- Push-notificaties ---
    //
    // Los van de dagelijkse herinnering, die lokaal is en zijn eigen sectie heeft. Wat hier staat
    // komt van de server, en de teksten zeggen dat ook: wie een melding krijgt hoort te weten
    // waarom hij hem krijgt.
    sectiePush: 'Push notifications',
    /**
     * Zegt wat er nodig is om ze te sturen. Bewust geen "we respect your privacy"-zin: wat er
     * gebeurt is dat dit toestel bij ons bekend staat, en dát is de mededeling.
     */
    pushVoet:
      'To send these, Histora registers this device with Google Firebase and keeps track of when you last read. Turn both off and the device is unregistered again.',
    /** Als FCM in deze build niet bestaat: dan is er maar één schakelaar, en die is lokaal. */
    pushVoetLokaal:
      'This reminder is created on your device and never leaves it. Suggestions to come back are not available in this version.',
    pushTerugkeer: 'Nudge me back',
    pushTerugkeerUitleg: 'A quiet reminder if a few days pass without reading.',
    pushAanbevelingen: 'Story suggestions',
    pushAanbevelingenUitleg: 'Now and then, a story from an era you like that you have not opened.',
    pushStreak: 'Streak at risk',
    pushStreakUitleg: 'A heads-up in the evening if today would break your streak.',
    /**
     * Mijlpalen. Staat in dezelfde sectie als de rest, maar is net als de streakmelding lokaal —
     * de voetnoot van de sectie gaat over de twee die dat niet zijn.
     */
    pushPrestaties: 'Milestones',
    pushPrestatiesUitleg: 'A note when you reach a milestone while the app is closed.',

    beoordeel: 'Rate Histora',
    contact: 'Contact support',
    contactOnderwerp: 'Histora support',
    voorwaarden: 'Terms of Service',

    /**
     * De regel onder de tekst op `/profiel/terms` en `/profiel/privacy`. De tekst staat in de
     * bundel en werkt offline; dit is de weg naar de gepubliceerde kopie, voor wie hem buiten
     * de app wil lezen of doorsturen.
     */
    bekijkOnline: 'View this page online',

    versie: 'Version',

    /**
     * Opnieuw beginnen (1.4.3, `voortgang-wissen.ts`). De tekst noemt ook wat blijft: wie op
     * "reset" drukt vraagt zich vooral af of zijn Dukaten en streak meegaan.
     */
    voortgangWissen: 'Reset reading progress',
    voortgangWissenTitel: 'Start over?',
    voortgangWissenTekst:
      'This clears every chapter and story you have read and locks your characters again. Your account, streak, Dukaten, streak freezes and Pro stay. This cannot be undone.',
    voortgangWissenBevestig: 'Reset progress',
    voortgangWissenBezig: 'Resetting…',
    voortgangGewistTitel: 'Progress reset',
    voortgangGewistTekst: 'Your journey starts again at the very beginning.',
    voortgangWissenMisluktTitel: 'Could not reset',
    voortgangWissenMisluktTekst: 'Nothing was changed. Check your connection and try again.',
    accountVerwijderen: 'Delete account',
    accountVerwijderenTitel: 'Delete account?',
    /**
     * Zegt precies wat er gebeurt, inclusief het toestel. Dit stond hier eerder als "we handle it
     * by hand — email us"; sinds de edge function `delete-account` is het echt onmiddellijk, en
     * dan mag de tekst niet meer om een mailtje vragen. De regel over dit toestel staat er bij
     * omdat uitloggen het tegenovergestelde belooft — dat verschil is precies de vraag die je op
     * dit moment stelt.
     */
    accountVerwijderenTekst:
      'This deletes your account, your reading progress, your characters and your answers — on our servers and on this device. It happens right away and cannot be undone.',
    accountVerwijderenBevestig: 'Delete forever',
    accountVerwijderenBezig: 'Deleting…',
    accountVerwijderdTitel: 'Account deleted',
    accountVerwijderdTekst:
      'Everything is gone and this device has been cleared. Thank you for reading with us.',
    accountVerwijderenMisluktTitel: 'Could not delete your account',
    /** Belangrijkste zin: er is *niets* half weg. Zonder dat blijft de vraag hangen. */
    accountVerwijderenMisluktTekst: (adres: string): string =>
      `Nothing was deleted — your account is exactly as it was. Check your connection and try again, or write to ${adres}.`,
    // Superseded: het verwijderen loopt niet meer via een mailtje. Blijft staan zolang de
    // andere talen hem nog kennen.
    accountVerwijderenMail: 'Email us',

    // --- Gegevensverzoek (AVG art. 15/20) ---
    /**
     * Een export bouwen we (nog) niet in de app: dat is een tweede edge function plus een
     * bestandsformaat, en de gegevens passen in een e-mail. Deze regel opent er dus eentje, met
     * onderwerp en tekst al ingevuld, zodat het verzoek herkenbaar binnenkomt.
     */
    gegevensVerzoek: 'Request my data',
    gegevensVerzoekUitleg: 'A copy of everything stored against your account, by email.',
    gegevensVerzoekOnderwerp: 'Histora data request',
    gegevensVerzoekBody:
      'Hello,\n\nI would like a copy of the data stored against my Histora account.\n\nPlease send it to the address I am writing from.\n\nThank you.',
  },
  /**
   * De premium-banner op Profiel en het paywall-venster erachter (`pro-paywall.tsx`).
   *
   * De prijzen staan hier en niet in het component: zodra Google Play Billing echt gekoppeld is
   * komen ze uit de producten van de store zelf (andere valuta en andere bedragen per land), en
   * dan is dit precies de plek die vervalt. Tot die tijd zijn het richtprijzen, en dat zegt
   * `voorbehoud` er ook bij.
   */
  pro: {
    titel: 'Get Pro access',
    ondertitel: 'Every era, no interruptions.',
    knop: 'See plans',

    paywallTitel: 'Histora Pro',
    paywallOndertitel: 'More history, fewer interruptions.',
    sluiten: 'Close',

    /**
     * **Een voordeelregel moet een verschil zijn dat de build vandaag afdwingt.**
     *
     * De vijf regels hieronder deden dat geen van alle: zes tijdperken, de portretten, offline
     * lezen en "geen advertenties" krijgt een gratis lezer óók (alle 20 verhalen en 160 scènes
     * zitten in de bundel, en `ADS_ENABLED` staat op `false`), en "nieuwe verhalen als eerste"
     * beloofde een pijplijn die niet bestaat. Vijf regels waarvan er nul waar waren.
     *
     * Wat wél alleen Pro is, staat in `constants/monetisatie.ts` en wordt echt afgedwongen:
     * `VERHAAL_LIMIET_ENABLED` (twee nieuwe verhalen per dag) en `AD_ONDERBREKING_ENABLED` (de
     * onderbreking na een uitgelezen verhaal). Dat zijn de eerste twee regels hieronder — zelfde
     * formulering als in `limiet.*`, want het is hetzelfde verschil, en een lezer die de
     * limietmelding zag hoort het hier terug te lezen.
     *
     * **Staan die twee vlaggen op `false`, dan is er geen verschil meer en hoort het hele aanbod
     * uit** (`PRO_BANNER_ENABLED`). Deze teksten zijn precies zo lang waar als die vlaggen aan
     * staan; wijzig ze samen.
     *
     * De oude vijf blijven staan omdat de vertalingen bruikbaar zijn zodra er een échte
     * Pro-functie tegenover staat — niet omdat ze weer aangezet mogen worden.
     */
    voordeelOnbeperkt: 'Read as many stories as you like',
    voordeelGeenOnderbreking: 'No interruptions between stories',
    // Sinds v1.2 (AdMob) wél een echt verschil: een gratis lezer ziet een banner op Home en het
    // tijdperk-scherm en een interstitial na elk uitgelezen verhaal; Pro ziet geen van drie. Staat
    // dus weer in de paywall en de limietmelding, in plaats van `voordeelGeenOnderbreking`.
    voordeelSupport: 'Support the development of Histora',

    // Met opzet niet in gebruik — zie de opmerking hierboven (behalve `voordeelGeenAds`, sinds v1.2).
    voordeelVerhalen: 'Stories from six eras',
    voordeelPersonages: 'Every character portrait in your collection',
    voordeelVroeg: 'New stories first, as soon as they land',
    voordeelOffline: 'Read offline, anywhere',
    voordeelGeenAds: 'No ads, ever',

    prijsMaand: '€4.99 / month',
    prijsJaar: '€39.99 / year',
    // Bijschrift onder de prijs. Bewust niet "Renews monthly": er verlengt niets, want er wordt
    // niets afgeschreven. "Save 33%" is wél waar — het is 39,99 tegen 12 × 4,99.
    // Prijzen sinds 2026-10-19: €4,99/maand en €39,99/jaar, 7 dagen proef op beide. Met een
    // winkel komen de bedragen van Google; dit zijn alleen de terugvalteksten.
    prijsMaandNoot: 'Monthly plan',
    prijsJaarNoot: 'Save 33%',
    abonneer: 'Subscribe',
    misschienLater: 'Maybe later',

    // Trial messaging (FASE 3)
    trialOffer: '7-day free trial',
    // Geen "cancel anytime" en geen "no credit card needed": allebei uitspraken over een
    // afrekening die niet bestaat. Wat er staat is wat er is — het aanbod, nog zonder betaalweg.
    trialOfferDescription:
      'Seven days of full access when Pro launches. Payments are not available yet.',
    startTrial: 'Start free trial',
    startingTrial: 'Starting trial…',
    // Label van de hoofdknop zolang er geen Billing is. De knop staat er, uitgeschakeld, in
    // plaats van te verdwijnen: het aanbod is echt, alleen de kassa nog niet.
    startTrialComingSoon: 'Available soon',
    trialStartedTitel: 'Trial started!',
    // Nog niet in gebruik (de knop is uitgeschakeld tot Billing er is), maar hier stond
    // "Auto-renews after 7 days unless cancelled" — een verlenging die niets kan uitvoeren en
    // die niemand kan opzeggen. Bijgewerkt zodat het opnieuw aanzetten van de knop niet
    // meteen een onware mededeling oplevert.
    trialStartedTekst:
      'Your seven days of Histora Pro have started. Nothing has been charged and nothing renews on its own.',
    trialFailedTitel: 'Could not start trial',
    trialFailedTekst: 'Something went wrong. Please check your connection and try again.',

    /**
     * Eerlijk over wat er vandaag gebeurt: niets. Een "7 dagen gratis proberen"-regel zonder
     * Billing erachter belooft een proefperiode die niet bestaat en die niemand kan opzeggen.
     */
    voorbehoud:
      'Subscriptions are managed by Google Play. See our privacy policy for details.',
    nogNietTitel: 'Not available yet',
    nogNietTekst:
      'Subscriptions arrive with a later version of Histora. Nothing has been charged.',

    /**
     * **Met Billing (RevenueCat).** Vanaf hier komen de bedragen van Google, in de valuta van de
     * lezer, en zijn "renews" en "cancel anytime" wél waar — daarom staan ze hier en nergens
     * hierboven. De vaste bedragen in `prijsMaand`/`prijsJaar` zijn de terugval zolang er geen
     * winkel is.
     */
    prijsPerMaand: (prijs: string) => `${prijs} / month`,
    prijsPerJaar: (prijs: string) => `${prijs} / year`,
    bespaar: (procent: number) => `Save ${procent}%`,
    /** Onder het jaarplan: wat het per maand kost. Uitgerekend uit de echte Google-prijs. */
    perMaandJaarlijks: (prijs: string) => `${prijs} per month, billed yearly`,
    proefDagen: (dagen: number) => `${dagen}-day free trial`,
    proefUitleg: (dagen: number, prijs: string) =>
      `Free for ${dagen} days, then ${prijs}. Cancel anytime in Google Play before the trial ends and you pay nothing.`,
    // Play eist dat prijs, periode en automatisch verlengen bij de koopknop staan.
    verlengUitleg:
      'Your subscription renews automatically until you cancel it in Google Play. Payment is charged to your Google account.',
    plannenLaden: 'Loading plans…',
    geenPlannen: 'Plans could not be loaded. Check your connection and try again.',
    bezig: 'One moment…',
    herstel: 'Restore purchases',
    welkomTitel: 'Welcome to Histora Pro',
    welkomTekst: 'Thank you! Pro is now active on this account.',
    inBehandelingTitel: 'Payment pending',
    inBehandelingTekst:
      'Google is still processing your payment. Pro switches on as soon as it goes through.',
    misluktTitel: 'Purchase failed',
    misluktTekst: 'Nothing has been charged. Please try again in a moment.',
    hersteldTitel: 'Purchases restored',
    hersteldTekst: 'Your Pro subscription is active again on this device.',
    nietsGevondenTitel: 'Nothing to restore',
    nietsGevondenTekst: 'We found no active subscription for this Google account.',
  },
  /**
   * De dagelijkse leeslimiet voor gratis lezers (`story-limit-modal.tsx`).
   *
   * De toon is bewust "tot morgen" en niet "betaal nu": wie de limiet raakt heeft net twee
   * verhalen gelezen, en dat is precies het gedrag dat de app wil. Er staat daarom óók dat de
   * voortgang bewaard blijft — dat is de vraag die je op dit scherm stelt.
   */
  limiet: {
    titel: 'That is today’s reading',
    tekst: (n: number): string =>
      n === 1
        ? 'Histora opens one new story a day for free readers. Everything you read is saved — the next one is waiting tomorrow.'
        : `Histora opens ${n} new stories a day for free readers. Everything you read is saved — the next one is waiting tomorrow.`,
    /** Een verhaal dat je vandaag al opende blijft open; dat zegt deze regel. */
    verderUitleg: 'Stories you already started today stay open.',
    voordeelOnbeperkt: 'Read as many stories as you like',
    voordeelGeenAds: 'No ads between chapters',
    voordeelAlles: 'Every era, every character',
    upgrade: 'See Histora Pro',
    morgen: 'Come back tomorrow',
  },
  /** `offline-modal.tsx`: een gratis lezer zonder internet (`useOnlinePoort`). */
  offline: {
    titel: 'You’re offline',
    tekst: 'Free reading needs an internet connection. Connect to Wi-Fi or mobile data and carry on where you left off — your progress is saved.',
    opnieuw: 'Try again',
    pro: 'Read offline with Histora Pro',
    terug: 'Go back',
  },
  /**
   * De streak-widget op het homescreen (`src/widget/`). `zinnen` is getypeerd tegen `StreakFase`,
   * net als `prestatie.namen`: een fase erbij zonder zin is een compileerfout.
   */
  /** Het tabblad Winkel (`(tabs)/winkel.tsx`, 1.3). De bedragen komen van de server. */
  winkel: {
    titel: 'Shop',
    ondertitel: 'Spend the Ducats you earn by reading.',
    saldoLabel: 'Your Ducats',
    dukaten: (n: number): string => (n === 1 ? '1 Ducat' : `${n} Ducats`),
    verdienKop: 'How to earn Ducats',
    verdienHoofdstuk: (n: number): string => `+${n} for every chapter you finish`,
    verdienVerhaal: (n: number): string => `+${n} for every story you finish`,
    bevriezerTitel: 'Streak freeze',
    bevriezerUitleg: 'Miss a day and a freeze keeps your streak alive. It is used automatically.',
    bevriezerStand: (n: number, max: number): string => `${n} of ${max} equipped`,
    koop: (prijs: number): string => `Buy for ${prijs}`,
    vol: 'Fully stocked',
    tekort: (n: number): string => `${n} more Ducats needed`,
    gekocht: 'Freeze equipped!',
    mislukt: 'That didn’t work. Check your connection and try again.',
    proRegel: (n: number): string => `With Pro you get ${n} free freezes every month.`,
    pakkettenBinnenkort: 'Ducat bundles are coming soon.',
  },
  widget: {
    dagen: (n: number): string => (n === 1 ? '1 day' : `${n} days`),
    /** Alleen het woord, onder het getal op de streak-kaart (1.4.5). */
    dagWoord: (n: number): string => (n === 1 ? 'day' : 'days'),
    zinnen: {
      gevierd: 'Streak saved!',
      ochtend: 'Time for a chapter?',
      middag: 'Got five minutes?',
      avond: 'Don’t let it break!',
      paniek: 'Last chance!',
      ijs: 'Frozen — your streak is safe',
      skelet: 'Your streak is gone…',
      slaap: 'Start a new streak',
    } satisfies Record<StreakFase, string>,
    /**
     * Het tekstwolkje naast Phoxy op Home (1.4.5): per fase een zin met de naam van de lezer.
     * `naam` is `null` als er geen gebruikersnaam is; dan valt de aanspreking weg.
     */
    begroeting: {
      gevierd: (naam: string | null): string =>
        naam ? `Nice work, ${naam}! Your streak is safe for today.` : 'Nice work! Your streak is safe for today.',
      ochtend: (naam: string | null): string =>
        naam ? `Hey ${naam}, ready for a history lesson today?` : 'Hey, ready for a history lesson today?',
      middag: (naam: string | null): string =>
        naam ? `Hey ${naam}, got five minutes for a chapter?` : 'Hey, got five minutes for a chapter?',
      avond: (naam: string | null): string =>
        naam ? `${naam}, one chapter keeps your streak alive!` : 'One chapter keeps your streak alive!',
      paniek: (naam: string | null): string =>
        naam ? `Last chance, ${naam}! Read a chapter before midnight.` : 'Last chance! Read a chapter before midnight.',
      ijs: (naam: string | null): string =>
        naam ? `Phew, ${naam}! A freeze saved your streak.` : 'Phew! A freeze saved your streak.',
      skelet: (naam: string | null): string =>
        naam ? `Your streak is gone, ${naam}… Start again today?` : 'Your streak is gone… Start again today?',
      slaap: (naam: string | null): string =>
        naam ? `Hey ${naam}, ready to start a new streak?` : 'Hey, ready to start a new streak?',
    } satisfies Record<StreakFase, (naam: string | null) => string>,
    /** Instellingen → Algemeen: de launcher vragen de widget toe te voegen. */
    toevoegen: 'Add the widget',
    toevoegenUitleg: 'Your streak and the fox on your home screen.',
    /** Als de launcher het venster niet kan tonen: zo zet je hem zelf neer. */
    handmatig: 'Your launcher can’t add it from here. Touch and hold an empty spot on your home screen, choose Widgets and look for Histora.',
    /** Beginletters, maandag eerst — de weekbalk op de brede widget. */
    weekdagen: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  /**
   * Het feedbackvenster achter het spreekwolkje op Profiel (`feedback-modal.tsx`).
   *
   * Het bericht gaat naar `public.feedback` in Supabase, dus "verzonden" betekent hier ook echt
   * verzonden — vandaar dat er een aparte mislukt-tekst is die zegt dat de tekst blijft staan.
   */
  feedback: {
    titel: 'Send feedback',
    ondertitel: 'What went wrong, or what would you like to see?',
    soortBug: 'Bug report',
    soortIdee: 'Feature idea',
    plaatshouderBug: 'What happened, and what did you expect instead?',
    plaatshouderIdee: 'What would you like Histora to do?',
    versturen: 'Send feedback',
    verzenden: 'Sending…',
    sluiten: 'Close',
    tekensOver: (n: number): string => `${n} characters left`,
    leegTitel: 'Nothing to send yet',
    leegTekst: 'Write a line or two first.',
    geluktTitel: 'Thank you!',
    geluktTekst:
      'Your feedback came through. We read everything, even when we cannot reply to all of it.',
    misluktTitel: 'Could not send',
    misluktTekst: 'Your message is still here — check your connection and try again.',
    geenSessie: 'Sign in to send feedback.',
    ok: 'OK',
  },
  // De dagelijkse herinnering. Bewust zonder app-naam (die staat al in de kop van de melding)
  // en zonder streakgetal: een notificatie wordt dagen vooruit gepland, dus elk getal erin is
  // tegen de tijd dat hij afgaat achterhaald.
  notificatie: {
    titel: 'Your next chapter is waiting',
    tekst: 'A few minutes of history, before the day is over.',
    /**
     * De ontgrendelmelding. Lokaal en meteen — het ontgrendelen gebeurt op dit toestel, dus er
     * is geen server voor nodig (zie `notificaties.toonNu`).
     *
     * Hij verschijnt alleen als de app *niet* op de voorgrond staat: wie de ontgrendelmodal voor
     * zijn neus heeft gehad, heeft het al gezien, en dan is een melding erbovenop ruis.
     */
    streakTitel: 'Your streak ends tonight',
    streakTekst: (dagen: number): string =>
      `${dagen} day${dagen === 1 ? '' : 's'} in a row. One chapter keeps it alive.`,
  },
  /**
   * Mijlpalen (`constants/prestaties.ts`). De naam is per mijlpaal geschreven, de uitleg wordt uit
   * de categorie samengesteld — zo staat er één zin per categorie in plaats van veertien.
   *
   * `namen` is getypeerd als `Record<PrestatieId, string>`: een mijlpaal erbij zonder naam is
   * daarmee een compileerfout en niet een badge die "streak-30" heet.
   */
  prestatie: {
    sectie: 'Milestones',
    /** De teller boven het raster op Profiel. */
    telling: (behaald: number, totaal: number): string => `${behaald} of ${totaal}`,
    /** Titel van de systeemmelding. De naam van de mijlpaal staat in de body. */
    meldingTitel: 'Milestone reached',
    /** Onder een nog niet behaalde mijlpaal in het raster. */
    nogNiet: 'Not yet',
    /** Wat er in het raster staat als er nog geen enkele mijlpaal is. */
    leeg: 'Finish a chapter and the first one is yours.',
    namen: {
      'hoofdstuk-1': 'First Page',
      'hoofdstuk-10': 'Ten Chapters In',
      'hoofdstuk-25': 'Well Read',
      'hoofdstuk-50': 'Deep in the Archive',
      'hoofdstuk-100': 'Centurion',
      'verhaal-1': 'A Life Read',
      'verhaal-5': 'Five Lives',
      'verhaal-10': 'Ten Lives',
      'personage-3': 'Good Company',
      'personage-10': 'A Gathering',
      'streak-3': 'Three Days Running',
      'streak-7': 'A Full Week',
      'streak-30': 'A Month of History',
      'streak-100': 'A Hundred Days',
    } satisfies Record<PrestatieId, string>,
    uitleg: {
      hoofdstukken: (n: number): string => `${n} chapter${n === 1 ? '' : 's'} finished.`,
      verhalen: (n: number): string => `${n} stor${n === 1 ? 'y' : 'ies'} read to the end.`,
      personages: (n: number): string => `${n} character${n === 1 ? '' : 's'} in your collection.`,
      streak: (n: number): string => `${n} day${n === 1 ? '' : 's'} in a row.`,
    },
    /** Op de tegel en in het venster: hoe ver je bent naar een nog niet behaalde mijlpaal. */
    /** Op de tegel en in het venster: hoe ver je bent naar een nog niet behaalde mijlpaal. */
    voortgangKort: (huidig: number, doel: number): string => `${huidig}/${doel}`,
    voortgangRegel: (huidig: number, doel: number): string => `Progress: ${huidig} of ${doel}`,
    /** In het venster van een behaalde mijlpaal, boven de uitleg. */
    behaald: 'Unlocked',
    ok: 'OK',
    sluiten: 'Close',
    /** De punten die een enkele mijlpaal opleverde, in zijn venster. */
    punten: (n: number): string => `+${n} points`,
    /** De puntenteller boven het raster. Geen valuta — zie `punten` in constants/prestaties.ts. */
    puntenTotaal: (behaald: number, totaal: number): string => `${behaald} / ${totaal} points`,
    /** Wanneer de mijlpaal is verdiend. `datum` is al opgemaakt in de taal van de lezer. */
    ontgrendeldOp: (datum: string): string => `Earned on ${datum}`,
    deel: 'Share',
    deelOpnieuw: 'Share again',
    /** Titel van het deelvenster van het toestel. */
    deelTitel: 'Histora milestone',
    /** Wat er daadwerkelijk verstuurd wordt. */
    deelBericht: (naam: string, uitleg: string): string =>
      `I just unlocked “${naam}” in Histora — ${uitleg}`,
    deelGelukt: 'Shared.',
    deelGekopieerd: 'Copied to your clipboard.',
    deelNietMogelijk: 'Sharing is not available here.',
  },
  /**
   * Sociaal delen — mijlpalen, citaten en uitnodigingen.
   *
   * De berichten zijn functies en geen sjablonen met plakhaakjes, om dezelfde reden als overal in
   * dit bestand: elke taal kiest zijn eigen woordvolgorde, en een zin die in het Engels op de naam
   * eindigt begint in het Duits misschien met het werkwoord. Het expliciete `: string` is nodig
   * omdat `en` `as const` is — zonder annotatie wordt het retourtype de letterlijke Engelse tekst
   * en past geen enkele vertaling er meer in.
   *
   * De app-link staat er hier **niet** in. Die wordt in `deelBerichtMetLink()` achteraan geplakt,
   * zodat er precies één plek is waar hij aan een bericht komt en hij dus nergens vergeten kan
   * worden — zie `constants/app-info.ts`.
   */
  deel: {
    /** De drie knoppen van `deel-opties.tsx`. */
    whatsapp: 'Share on WhatsApp',
    alsLink: 'Share as link',
    kopieerTekst: 'Copy text',
    sluiten: 'Close',
    /** De regel onder de knoppen. "Gekopieerd" is geen mislukt "gedeeld" — zie `DeelResultaat`. */
    gelukt: 'Shared.',
    gekopieerd: 'Copied to your clipboard.',
    nietMogelijk: 'Sharing is not available here.',

    /** Het deelvenster van een mijlpaal (`share-achievement-modal.tsx`). */
    prestatieKop: 'Milestone unlocked',
    prestatieBericht: (naam: string): string =>
      `${naam} 🏆 Unlocked in Histora! History, one chapter at a time.`,

    /** De deelknop onder een alinea of citaat (`share-quote-button.tsx`). */
    citaatKnop: 'Share this passage',
    citaatKop: 'Share this passage',
    citaatTitel: 'A passage from Histora',
    citaatBericht: (citaat: string, verhaal: string): string =>
      `“${citaat}” — from ${verhaal} 📖 via Histora`,
  },
  /**
   * Het uitnodigingsscherm (`profiel/invite-friends.tsx`).
   *
   * `nogNietActief` is geen tijdelijke tekst maar de kern van dit scherm zoals het vandaag werkt:
   * de code is echt en het delen werkt, maar er is nog geen weg voor de uitgenodigde vriend om
   * hem in te wisselen (dat vergt een `security definer` RPC, zie `referral-store.ts`). Een scherm
   * dat beloningen belooft die niemand kan verdienen is precies waar dit project elders "Soon"
   * voor gebruikt; hier staat het als zin, omdat de code zelf al wél te delen is.
   */
  referral: {
    titel: 'Invite friends',
    kop: 'Give a friend a head start',
    uitleg: 'Share your code. Every friend who joins with it earns you a reward.',
    jouwCode: 'Your invite code',
    codeKopieren: 'Copy code',
    codeGekopieerd: 'Code copied.',
    deelUitnodiging: 'Share invite',
    deelTitel: 'Join me on Histora',
    bericht: (code: string): string =>
      `Join me on Histora! Read history, one chapter at a time. Use code: ${code} for 1 free story.`,
    /** De twee tellers. Getal en label staan apart: het cijfer staat er als los `display`-getal. */
    vriendenUitgenodigd: 'Friends invited',
    beloningenVerdiend: 'Rewards earned',
    beloningenKop: 'Your rewards',
    beschikbaar: (n: number): string =>
      n === 1 ? '1 reward ready to claim' : `${n} rewards ready to claim`,
    geenBeloningen: 'No rewards to claim yet.',
    beloningVerhaal: '1 extra story',
    beloningVerhaalUitleg: 'Open one more new story beyond today’s limit.',
    beloningProWeek: 'A week of Pro',
    beloningProWeekUitleg: (dagen: number): string =>
      `${dagen} days without the daily limit or interruptions.`,
    claim: 'Claim',
    geclaimdTitel: 'Reward claimed',
    geclaimdVerhaal: 'You can open one more new story today.',
    geclaimdProWeek: (dagen: number): string => `Pro is yours for the next ${dagen} days.`,
    ok: 'OK',
    /** Zolang de sessie nog laadt of ontbreekt is er geen code om te tonen. */
    geenCode: 'Sign in to get your invite code.',
    hoeWerktKop: 'How it works',
    stap1: 'Share your code with a friend.',
    stap2: 'They enter it when they sign up.',
    stap3: 'You both get a reward.',
    nogNietActief:
      'Entering a code is not live yet, so inviting cannot earn rewards today. Your code is real and already yours — it keeps working once redeeming arrives.',
  },
  collectie: {
    nietGevondenTitel: 'Storyline not found',
    nietGevondenBeschrijving: 'This storyline no longer exists.',
  },
  tijdperkScherm: {
    titel: 'Era',
    nietGevondenTitel: 'Era not found',
    nietGevondenBeschrijving: 'This era no longer exists.',
    alle: 'All',
    geenVerhalenTitel: 'No stories',
    geenVerhalenBeschrijving: 'No stories for this filter.',
  },
  verhaal: {
    nietGevondenTitel: 'Story not found',
    nietGevondenBeschrijving: 'This story no longer exists.',
    minLeestijd: (n: number) => `${n} min read`,
    gelezen: 'Read',
    markeerAlsGelezen: 'Mark as read',
    volgendVerhaal: 'Next story',
    waar: 'True',
    nietWaar: 'False',
    goedGeraden: 'Correct!',
    tochNietHelemaal: 'Not quite.',
  },
  hoofdstuk: {
    nietGevondenTitel: 'Chapter not found',
    nietGevondenBeschrijving: 'This chapter no longer exists.',
    /** Tegeltitel op het hoofdstukoverzicht: "Chapter 3: The Rubicon". */
    tegelTitel: (nummer: number, titel: string) => `Chapter ${nummer}: ${titel}`,
    teller: (huidig: number, totaal: number) => `Chapter ${huidig} of ${totaal}`,
    voortgang: (voltooid: number, totaal: number) => `${voltooid} / ${totaal} chapters`,
    volgordeUitleg: 'Complete chapters in order to unlock the next one.',
    /** Onder een halte op de routekaart van een verhaal: "Chapter 3 · 6 min". */
    halteOnder: (nummer: number, minuten: number) => `Chapter ${nummer} · ${minuten} min`,
    routeBegin: 'Start with chapter 1',
    routeVerder: (nummer: number) => `Continue with chapter ${nummer}`,
    routeKlaar: 'You finished this story',
    terugNaarOverzicht: 'Back to Chapters',
    markeerVoltooid: 'Mark Complete',
    volgende: 'Next Chapter',
    allesVoltooid: 'All Chapters Complete',
    ontgrendelPersonage: (naam: string) => `Unlock ${naam}`,
  },
  /** Labels die `blok-weergave.tsx` zelf toevoegt aan een blok (LAUNCH-PLAN.md B3). */
  blok: {
    weetjeLabel: 'Did you know?',
    /**
     * Jaartal van een sleutelmoment-blok. Negatief = voor Christus. "AD" alleen bij jaren onder
     * 1000 — "AD 1969" leest raar, "AD 79" is juist nodig om het van 79 BC te onderscheiden.
     */
    jaarLabel: (jaar: number) =>
      jaar < 0 ? `${Math.abs(jaar)} BC` : jaar < 1000 ? `AD ${jaar}` : `${jaar}`,
  },
  /**
   * Interactief lezen: de quiz, de peiling en het keuzepunt onder een hoofdstuk.
   *
   * `keuzeNa` zegt met opzet *niet* dat je keuze het verhaal verandert. Er vertakt niets — de
   * hoofdstukken liggen vast in de bundel. Wat je na het kiezen te zien krijgt is echt: hoe
   * andere lezers besloten. Dezelfde afweging als bij de paywall: liever iets kleiners dat waar
   * is dan een belofte die het scherm niet waarmaakt.
   */
  interactief: {
    quizKop: 'Quick check',
    quizControleer: 'Check answer',
    quizGoedTitel: 'Correct',
    quizGoedTekst: 'You were paying attention.',
    quizFoutTitel: 'Not quite',
    quizJuisteAntwoord: (antwoord: string): string => `The answer is ${antwoord}.`,
    quizVerder: 'Continue reading',
    optieLabel: (letter: string, tekst: string): string => `Option ${letter}: ${tekst}`,
    pollKop: 'What do you think?',
    pollVoor: 'Answer to see what other readers chose.',
    pollStemmen: (n: number): string =>
      n === 1 ? '1 reader has answered' : `${n} readers have answered`,
    pollEerste: 'You are the first to answer.',
    keuzeKop: 'Your call',
    keuzeVoor: 'What would you have done?',
    keuzeNa: 'History went its own way — this is how other readers decided.',
    vragenTitel: 'Before you go on',
    vragenStap: (n: number, totaal: number): string => `Question ${n} of ${totaal}`,
    vragenVolgende: 'Next question',
    vragenKlaar: 'Finish chapter',
    vragenHint: 'Answer to continue. Any answer counts.',
    /** Phoxy's tekstwolkje naast de vraag (1.4). Eén zin wordt per antwoord willekeurig gekozen. */
    phoxyVraag: "Here's one for you!",
    phoxyGoed: ['Great job!', 'Spot on!', 'You really know your history!'],
    phoxyFout: ["So close! Next time you've got it.", 'Good try. Now you know!', 'History is tricky. Keep going!'],
  },
  /** Explore: trivia met het draaiwiel (1.5). */
  explore: {
    titel: 'Test your history skills!',
    kaartTekst: 'Spin the wheel and take on Phoxy.',
    modusSolo: 'Solo',
    modusDuel: 'vs Phoxy',
    jij: 'You',
    robot: 'Phoxy',
    duelStand: (gewonnen: number, verloren: number): string => `Duels won ${gewonnen} · lost ${verloren}`,
    duelUitleg: (n: number): string =>
      `Take turns with Phoxy. Every ${n} right answers earn a crown question; a wrong answer passes the turn. First to six crowns wins.`,
    naarRobot: "Not quite. Now it's Phoxy's turn!",
    robotBeurtTitel: "Phoxy's turn",
    robotKijk: 'Watch Phoxy play',
    robotKroonvraag: (tijdperk: string): string => `Crown question · ${tijdperk}`,
    robotKroonGewonnen: (n: number): string => (n === 1 ? 'Phoxy won a crown.' : `Phoxy won ${n} crowns.`),
    robotGeenKroon: 'No crown for Phoxy this turn.',
    jouwBeurt: 'Your turn',
    duelGewonnenTitel: 'You beat Phoxy!',
    duelVerlorenTitel: 'Phoxy won this time',
    nieuwDuel: 'New duel',
    draai: 'Spin',
    uitleg: (n: number): string =>
      `Spin the wheel and answer a question from that era. Every ${n} right answers earn a crown question. Collect all six crowns.`,
    score: (n: number): string => `Score ${n}`,
    meterLabel: (n: number, max: number): string => `Crown meter: ${n} of ${max}`,
    kroontjesLabel: (n: number): string => `${n} of 6 crowns`,
    levensLabel: (n: number, max: number): string => `${n} of ${max} lives`,
    duur: (uren: number, minuten: number): string => (uren > 0 ? `${uren}h ${minuten}m` : `${minuten}m`),
    volgendLeven: (tijd: string): string => `Next life in ${tijd}`,
    onbeperkt: 'Unlimited lives with Pro',
    geenLevensTitel: 'Out of lives',
    geenLevensTekst: (tijd: string): string => `Your next life arrives in ${tijd}. Why not read a chapter in the meantime?`,
    advertentieKnop: 'Watch an ad for +1 life',
    advertentieBezig: 'Loading the ad…',
    advertentieLimietTitel: 'That was today’s last one',
    advertentieLimietTekst: 'You can earn up to three lives a day with ads. Your lives also come back by themselves.',
    proKnop: 'Play without limits with Pro',
    kroonKlaarTitel: 'Crown question!',
    kroonKlaarTekst: 'Choose an era. Answer correctly and its crown is yours.',
    kroonvraagKop: (tijdperk: string): string => `Crown question · ${tijdperk}`,
    kroonGewonnen: (tijdperk: string): string => `The ${tijdperk} crown is yours!`,
    verder: 'Continue',
    laden: (tijdperk: string): string => `Finding a question from the ${tijdperk}…`,
    trekMislukt: "Couldn't fetch a question. Check your connection.",
    antwoordMislukt: "Your answer didn't reach us. Please pick again.",
    opnieuw: 'Try again',
    gewonnenTitel: 'All six crowns!',
    gewonnenTekst: (score: number, beste: number): string => `You scored ${score}. Your best: ${beste}.`,
    nieuwSpel: 'New game',
  },
  /** De intro voor nieuwe lezers (1.4.5, `src/app/intro.tsx` en `intro-pro.tsx`). */
  intro: {
    welkomBij: 'Welcome to',
    welkomTagline: 'The stories that shaped our world, one short chapter at a time.',
    aanDeSlag: 'Get started',
    hebAccount: 'I already have an account',
    terug: 'Back',
    verder: 'Continue',
    overslaan: 'Skip',
    voortgang: (stap: number, totaal: number): string => `Step ${stap} of ${totaal}`,
    phoxyHallo: "Hi! I'm Phoxy, your guide through history.",
    aangenaam: 'Nice to meet you!',
    doelVraag: 'What brings you to Histora?',
    doelen: {
      kennis: 'Broaden my general knowledge',
      school: 'Study for school or exams',
      uitdaging: 'Challenge myself every day',
      expert: 'Become a real history buff',
    },
    tijdperkVraag: 'Which eras interest you most?',
    tijdperkHint: 'Pick as many as you like.',
    niveauVraag: 'How well do you know history?',
    niveaus: {
      beginner: "I'm just starting out",
      'af-en-toe': 'I read about it now and then',
      geinteresseerd: "I'm quite interested",
      liefhebber: "I'm a true history lover",
    },
    phoxyGenoteerd: "Perfect, I've noted that! Now let's make your profile.",
    profielTitel: 'Make your profile',
    profielOndertitel: 'What should Phoxy call you?',
    naamLabel: 'Your name',
    naamPlaceholder: 'First name or nickname',
    avatarLabel: 'Pick your Phoxy',
    profielVoet: 'You can change this any time.',
    phoxyWelkom: (naam: string | null): string =>
      naam ? `Welcome, ${naam}! I've prepared a short quiz to warm up.` : "Welcome! I've prepared a short quiz to warm up.",
    laatsGaan: "Let's go!",
    opwarmTitel: 'Quick warm-up',
    opwarmOndertitel: (n: number): string => `${n} questions to get started`,
    opwarmUitslag: (goed: number, totaal: number): string =>
      goed === totaal
        ? `All ${totaal} right! You really know your history.`
        : goed === 0
          ? 'Not this time, but now you know three new facts!'
          : `${goed} of ${totaal} right. A great start!`,
    eersteVerhaalKop: (naam: string | null): string =>
      naam ? `${naam}, your first story is ready` : 'Your first story is ready',
    eersteVerhaalTekst: 'Eight short chapters, each with its own scene and a question at the end.',
    meldingenTitel: 'Turn on reminders',
    meldingenOndertitel: 'A gentle nudge to read a chapter each day.',
    voorbeeld: 'For example:',
    voorbeeld1Titel: 'Keep your streak alive!',
    voorbeeld1Tekst: 'One chapter today keeps your streak going.',
    voorbeeld2Titel: 'Your next chapter is waiting',
    voorbeeld2Tekst: 'Pick up where you left off in a few minutes.',
    meldingenVoet: 'You can change this any time in Settings.',
    meldingenAan: 'Turn on reminders',
    later: 'Later',
    accountPhoxy: 'Last step: create your account so your progress is safe on every device.',
    accountKnop: 'Create my account',
    accountPhoxyGast: 'Last step: save your progress so it\'s safe on every device. Or do it later — you can start reading right away.',
    accountEmail: 'Use my email',
    proTitel: 'Unlock all of Histora',
    proOndertitel: 'Read without limits and support Histora.',
    gratis: 'Free',
    pro: 'Pro',
    rijVerhalen: 'New stories',
    rijVerhalenGratis: '2 a day',
    rijVerhalenPro: 'Unlimited',
    rijAds: 'No ads',
    rijOffline: 'Read offline',
    rijLevens: 'Trivia lives',
    rijLevensGratis: '5',
    rijLevensPro: 'Unlimited',
    rijBevriezers: 'Streak freezes',
    rijBevriezersGratis: 'With Dukaten',
    rijBevriezersPro: '2 free a month',
    rijProef: 'Free trial',
    rijProefPro: '7 days',
    gratisDoorgaan: 'Continue for free',
  },
  personage: {
    ontgrendeldTitel: 'Character Unlocked!',
    ontgrendeldBeschrijving: "You've unlocked a new character! View your collection in the Profile tab.",
    naarHome: 'Continue to Home',
  },
  advertentie: {
    label: 'Advertisement',
    /**
     * De onderbreking na een uitgelezen verhaal is een *placeholder* — er is nog geen AdMob. De
     * tekst zegt dat dan ook, in plaats van een advertentie na te spelen die er niet is.
     */
    plaatshouder: 'A sponsored message would appear here.',
    overslaanIn: (n: number): string => `Skip in ${n}s`,
    overslaan: 'Skip',
    proKnop: 'Remove ads with Pro',
  },
  /** Inloggen, registreren en uitloggen (R8.AUTH deel 2). */
  // "Save your progress" (1.5.0, `app/account-bewaren.tsx`): een gastaccount omzetten in een echt account.
  bewaren: {
    titel: 'Save your progress',
    ondertitel: 'Your stories, streak and Ducats stay exactly as they are — they just get an account to live in.',
    knop: 'Save my progress',
    inloggenUitleg: 'Signing in to an existing account brings what you read as a guest along.',
  },
  auth: {
    loginTitel: 'Welcome back',
    loginOndertitel: 'Sign in to pick up where you left off.',
    signupTitel: 'Create an account',
    signupOndertitel: 'Keep your progress safe across devices.',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    wachtwoord: 'Password',
    wachtwoordPlaceholder: 'At least 6 characters',
    gebruikersnaam: 'Username',
    gebruikersnaamPlaceholder: 'The name shown on your profile',
    inloggen: 'Sign in',
    registreren: 'Create account',
    wachtwoordVergeten: 'Forgot password?',
    wachtwoordVergetenTitel: 'Password reset is not available yet',
    /**
     * De knop deed niets — zie `handleWachtwoordVergeten` in `app/login.tsx`. Dit is de
     * eerlijke versie: geen herstelmail, wel een adres dat gelezen wordt.
     */
    wachtwoordVergetenTekst: (email: string): string =>
      `We cannot send a reset link yet. Write to ${email} from the address you signed up with and we will help you back in.`,
    /** Zonder ingevuld supportadres valt de mailroute weg en blijft de mededeling over. */
    wachtwoordVergetenTekstZonderSupport: 'We cannot send a reset link yet. Please get in touch and we will help you back in.',
    geenAccount: 'No account yet?',
    welAccount: 'Already have an account?',
    naarSignup: 'Sign up',
    naarLogin: 'Sign in',
    sterkte: 'Password strength',
    sterkteZwak: 'Weak',
    sterkteGemiddeld: 'Medium',
    sterkteSterk: 'Strong',
    voorwaarden: 'I agree to the Terms of Service and the Privacy Policy.',
    // Staat e-mailbevestiging aan in Supabase, dan is er na signUp() nog geen sessie: de
    // gebruiker moet eerst de link in zijn mail openen. Zie `signup` in use-auth.
    bevestigMail: (email: string): string =>
      `Almost there — open the confirmation link we sent to ${email}, then sign in.`,
    foutVeldenLeeg: 'Email and password are required.',
    foutAlleVelden: 'All fields are required.',
    foutEmailOngeldig: "That doesn't look like an email address.",
    foutWachtwoordKort: 'Password must be at least 6 characters.',
    foutVoorwaarden: 'You need to agree to the Terms of Service first.',
    // 1.5.0: inloggen met Google en een gastaccount bewaren.
    googleKnop: 'Continue with Google',
    of: 'or',
    googleMislukt: 'Signing in with Google didn\'t work. Try again, or use your email.',
    googleGeenPlay: 'Google sign-in needs Google Play services on this device. Use your email instead.',
    emailBestaat: 'There is already an account with this email. Sign in instead.',
    account: 'Account',
    uitloggen: 'Sign out',
    uitlogTitel: 'Sign out?',
    // Bewust niet "you'll lose your progress": uitloggen wist de lokale voortgang niet, die
    // staat in AsyncStorage op dit toestel. Een waarschuwing die niet klopt is erger dan geen.
    uitlogTekst:
      'Your reading progress stays on this device. You will need to sign in again to reach your account.',
    annuleren: 'Cancel',
  },
  // Statusregel onder het account op Profiel (R8.AUTH deel 3). Bewust geruststellend van toon:
  // een mislukte sync kost de gebruiker niets — het lezen staat lokaal en gaat vanzelf alsnog
  // omhoog — dus mag de tekst geen alarm slaan dat de app zelf al oplost.
  sync: {
    bezig: 'Syncing…',
    wachtend: 'Waiting to sync',
    mislukt: 'Offline — your progress will sync later',
    nooit: 'Not synced yet',
    zojuist: 'Progress synced just now',
    minutenGeleden: (minuten: number): string =>
      `Progress synced ${minuten} ${minuten === 1 ? 'minute' : 'minutes'} ago`,
    urenGeleden: (uren: number): string =>
      `Progress synced ${uren} ${uren === 1 ? 'hour' : 'hours'} ago`,
    langGeleden: 'Progress synced earlier',
  },
} as const;

export default en;

export type Vertalingen = typeof en;
