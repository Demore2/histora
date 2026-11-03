# App Store listing — Histora iOS 1.5.0

Alles wat App Store Connect vraagt voor de eerste iOS-versie, klaar om te kopiëren. Zelfde regels
als `listing.md` (Play): **Engels**, geen aantallen, de vos heet "a fox", en niets beloven wat de
iOS-build niet doet.

**De iOS-versie wijkt af van Android** — `aankopen`, `advertenties`, Google-login, de widget, push en
de reviewvraag zijn allemaal `Platform.OS === 'android'`. De tekst hieronder noemt dus géén Pro,
geen advertenties, geen widget en geen Google Play. Komt een van die dingen naar iOS, pas dan ook
deze pagina aan (en de privacylabels).

Screenshots: `store/screenshots-ios/` (1320×2868 = iPhone 6.9", gemaakt op Appetize, iPhone 16 Pro
Max, iOS 27.2).

---

## App Information

| Veld | Waarde |
|---|---|
| Name (30) | `Histora: Learn History` (22) — staat al |
| Subtitle (30) | `History you actually finish` (27) |
| Primary category | **Books** |
| Secondary category | **Education** |
| Content rights | "Does your app contain, show, or access third-party content?" → **No** (eigen teksten, gegenereerde beelden) |
| Age rating | zie hieronder |

## Version 1.5.0 — tekst

### Promotional text (170)

```
Real lives and turning points from every era, told as short illustrated chapters. Read one a day, keep your streak, and collect the people you meet along the way.
```

(162/170.) Kan later zonder review gewijzigd worden.

### Description (4000)

```
Histora turns history into something you actually finish.

Every famous person and every turning point is one true story, told in short chapters. Read one on the bus, one before bed. A chapter takes a few minutes.

ONE JOURNEY THROUGH TIME

Follow history in order, from the pharaohs of Egypt to the world today. Your journey card always shows where you are and what comes next. Every era has its own route to explore:

Antiquity
Middle Ages
Early Modern Period
Industrial Revolution
20th Century
Contemporary Era

New stories are added regularly, and they show up with a "New" label so you never miss one. Short events, from the fall of Constantinople to the moon landing, sit alongside the life stories.

HOW IT READS

Every story is a path of chapters. Each chapter opens with an illustrated scene, and the next one unlocks when you finish, so you never have to remember where you left off. A fox in glasses walks the route with you.

LEARN AS YOU READ

After every chapter, the fox asks you one quick question about what you just read. Right or wrong, you see the answer and a short explanation, so the story sticks.

SPIN THE WHEEL

Spin the wheel, land on an era and answer a history question. Take turns with the fox: every two right answers earn a crown question, and the first to win a crown for every era wins the duel.

COLLECT THE PEOPLE

Finish a story and its figure joins your character collection. A card for every story, filled in one at a time.

KEEP YOUR STREAK

Read a chapter a day to build your streak. Earn Ducats by reading and spend them on streak freezes for busy days. Unlock milestones as you go.

BUILT FOR READING

No ads. Nothing sold to anyone.
Start reading straight away, no account needed. Save your progress with Apple or email whenever you like, so it follows you to a new phone.
One reminder a day, at a time you pick, and you can switch it off.

The app and its questions are available in English, Dutch, French and German. The stories are in English and Dutch. Light and dark themes.
```

De verhaaltekst staat sinds 2026-10-30 in het Engels én Nederlands (OTA); Frans en Duits alleen
de app en de vragen. Daarom wijkt die regel af van `listing.md`.

### Keywords (100, komma's zonder spaties, niet de naam of categorie herhalen)

```
stories,biography,ancient,rome,egypt,medieval,trivia,quiz,reading,facts,world,war,kings,daily
```

### URLs

| Veld | Waarde |
|---|---|
| Support URL | `https://demore2.github.io/histora/contact.html` — verplicht; een werkende pagina met contactgegevens. |
| Marketing URL | leeg |
| Privacy Policy URL | `https://demore2.github.io/histora/privacy-policy.html` |
| Copyright | `2026 Histora Studio` |

### Version information

- **Version**: 1.5.0
- **What's New**: niet nodig bij de eerste versie.

---

## Age Rating (vragenlijst)

Historische verhalen gaan over oorlogen, executies en rampen, maar zonder expliciete beschrijvingen.

| Vraag | Antwoord |
|---|---|
| Cartoon or Fantasy Violence | None |
| Realistic Violence | **Infrequent/Mild** |
| Prolonged Graphic or Sadistic Realistic Violence | None |
| Profanity or Crude Humor | None |
| Mature/Suggestive Themes | **Infrequent/Mild** (o.a. slavernij, genocide in de 20e-eeuwse verhalen) |
| Horror/Fear Themes | None |
| Medical/Treatment Information | None |
| Alcohol, Tobacco, Drug Use | None |
| Simulated Gambling | None (het wiel is een quiz, geen kansspel; er is niets met geld) |
| Sexual Content or Nudity | None |
| Contests | None |
| Unrestricted Web Access | No |
| User-generated content / messaging / social | **No** — er is geen chat of openbare inhoud; feedback gaat alleen naar ons |
| Age assurance / parental controls | No |

Verwachte uitkomst: 12+ / 13+. Prima — Play staat op 13+.

---

## App Privacy (privacylabels)

Voor **deze** iOS-build: geen Firebase (uit), geen AdMob, geen RevenueCat. Wat er wél naar Supabase
gaat, volgens `docs/README.md` (Data Safety):

**Tracking: No.** Er wordt niets met andermans data gekoppeld en geen IDFA gebruikt.

| Apple-categorie → type | Linked to user | Purpose | Waar vandaan |
|---|---|---|---|
| Contact Info → **Email Address** | Yes | App Functionality | Supabase Auth (bij bewaren met e-mail of Apple; Apple kan een privérelay-adres geven) |
| Identifiers → **User ID** | Yes | App Functionality | Supabase-user-id, gebruikersnaam |
| Usage Data → **Product Interaction** | Yes | App Functionality, Analytics | leesvoortgang, streak, personages; de intro-trechter (`intro_stappen`) |
| User Content → **Customer Support** | Yes | App Functionality | feedbackberichten via het spreekwolkje |
| User Content → **Other User Content** | Yes | App Functionality | antwoorden op peilingen/keuzes (oude versies), trivia-stand op de server |

Niet aanvinken: Location, Contacts, Health, Financial, Purchases (nog geen IAP op iOS), Browsing,
Search, Diagnostics (geen crashrapportage), Sensitive Info.

---

## App Review Information

| Veld | Waarde |
|---|---|
| Sign-in required | **Yes** (aanvinken, ook al kan de reviewer als gast verder) |
| User name / Password | het testaccount uit `docs/TEST_ACCOUNTS.md` (gitignored — **zet het wachtwoord nooit in deze repo**, die is publiek) |
| Contact | Quinten Raats, `businessdemore@gmail.com`, telefoon |

### Notes (Engels, plakken)

```
Histora works without an account: tap "Get started" on the welcome screen and the app creates a guest session, so you can read straight away. At the end of the intro you can save your progress with Sign in with Apple or email, or tap "Later".

To sign in with the demo account instead: on the welcome screen tap "I already have an account" and use the credentials above.

To test reading: Home > "Begin the journey" > open chapter 1 > scroll to the end > "Mark Complete" > answer the question. The next chapter then unlocks.

Account deletion: Settings (gear icon, top right) > "Delete account". This removes the account and all its data immediately, for guest accounts too.

There are no in-app purchases and no ads in this version.
```

---

## Risico's bij de review

- **Sign in with Apple + accountverwijdering (guideline 5.1.1(v))**: Apple verwacht dat een app die
  Sign in with Apple gebruikt bij het verwijderen ook het Apple-token intrekt (REST
  `auth/revoke`). `delete-account` doet dat nu niet — alleen `auth.admin.deleteUser`. Reviewers
  wijzen hier soms op af. Oplossing als dat gebeurt: de Apple-sleutel (.p8) aanmaken, het
  refresh-token bewaren bij de login en in `delete-account` intrekken.
- **4.2 Minimum functionality / 4.3 Spam**: geen probleem verwacht, de app is ruim.
- **Support URL** moet echt contactinformatie tonen.
