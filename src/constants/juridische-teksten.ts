/**
 * De tekst van de algemene voorwaarden en het privacybeleid, zoals ze in de app zelf te lezen
 * zijn (`app/profiel/terms.tsx` en `app/profiel/privacy.tsx`).
 *
 * **Waarom hier en niet in i18n.** De app spreekt vier talen, deze twee documenten spreken er
 * één. Een juridische tekst laten meevertalen betekent dat er straks vier versies zijn waarvan er
 * drie niet nagelezen zijn, en dan is het onduidelijk welke geldt — terwijl juist dát de enige
 * vraag is die een lezer over zo'n document heeft. De schermtitel en de terugknop komen wél uit
 * i18n: dat is chroom, geen inhoud.
 *
 * **Dit is niet hetzelfde bestand als `docs/privacy-policy.html`.** Die pagina is wat er
 * *gepubliceerd* wordt, want Google Play eist een privacybeleid op een publiek bereikbare URL —
 * een scherm in de app telt daar niet voor. Wijzig je hier iets aan wat de app verzamelt, wijzig
 * het daar dan mee; `PRIVACY_BELEID_URL` in `juridisch.ts` blijft de plek waar die URL komt te
 * staan zodra de pagina online staat.
 */

import { SUPPORT_EMAIL } from '@/constants/app-info';

/**
 * De datum onder de titel van beide documenten. Met de hand bijwerken zodra de tekst hierónder
 * verandert — een automatische "vandaag" zou elke dag een nieuwe versie suggereren en is precies
 * het tegenovergestelde van wat "laatst bijgewerkt" moet vertellen.
 */
export const JURIDISCH_BIJGEWERKT = '22 October 2026';

/**
 * Eén alinea. `label` is de vetgedrukte aanhef ("What we collect:"); zonder label is het gewoon
 * een alinea. Bewust geen kopniveaus: deze twee documenten zijn te kort om een inhoudsopgave te
 * verdienen, en een kop per zin leest als een formulier.
 */
export type JuridischeAlinea = {
  label?: string;
  tekst: string;
};

export const VOORWAARDEN_TITEL = 'Terms of Service — Histora';

export const VOORWAARDEN_ALINEAS: JuridischeAlinea[] = [
  { tekst: 'By using Histora, you agree to these terms.' },
  {
    tekst:
      'Histora provides historical stories and educational content, available in a Free tier and an optional Pro subscription with additional features.',
  },
  {
    label: 'Pro subscription',
    tekst:
      'a monthly or yearly subscription bought through Google Play, at the price Google Play shows before you confirm. New subscribers get a 7-day free trial. It renews automatically until you cancel it in the Play Store (Payments & subscriptions → Subscriptions); you keep Pro until the end of the paid period. Deleting your Histora account does not cancel it. Payment and refunds follow Google Play’s terms, and your statutory consumer rights are not affected.',
  },
  {
    tekst:
      'You agree not to misuse the app, attempt to reverse-engineer it, or use it in violation of applicable law.',
  },
  {
    tekst:
      'Content in Histora (stories, illustrations, text) belongs to Histora and may not be redistributed without permission.',
  },
  {
    tekst:
      'Histora is provided "as is." We aim for historical accuracy but cannot guarantee the content is error-free.',
  },
  {
    tekst: 'We may update these Terms; continued use after changes means you accept them.',
  },
  { label: 'Questions', tekst: SUPPORT_EMAIL },
];

export const PRIVACY_TITEL = 'Privacy Policy — Histora';

/**
 * Wat hier staat moet kloppen met wat de app in *deze* build doet, niet met wat er ooit is
 * ingebouwd. Dat is precies waar de vorige versie de mist in ging: die noemde Google Firebase
 * als verwerker van gebruiksstatistieken, terwijl Firebase achter `EXPO_PUBLIC_FIREBASE_ENABLED`
 * uit staat en `google-services.json` niet bestaat — er wordt dus geen enkele meting verstuurd.
 * Een beleid dat méér verzameling opgeeft dan er plaatsvindt is net zo goed onjuist als een dat
 * er minder opgeeft, en Play legt deze tekst naast het Data Safety-formulier.
 *
 * De verwerkers die er wél zijn: Supabase (account, voortgang, peiling- en keuze-antwoorden,
 * uitnodigingen, dagteller, abonnementsstatus, feedback), Google Play en RevenueCat (alleen bij
 * een abonnement) en Discord (alleen bij feedback: het bericht plus e-mailadres in het
 * privékanaal van de makers). Zet je Firebase later aan, zet dan de alinea over
 * gebruiksstatistieken terug — `docs/privacy-policy.html` heeft die tekst nog, achter een
 * HTML-commentaar, zodat hij niet opnieuw geschreven hoeft te worden.
 */
export const PRIVACY_ALINEAS: JuridischeAlinea[] = [
  {
    tekst: `Histora ("we", "us") is operated by Quinten, contact: ${SUPPORT_EMAIL}.`,
  },
  {
    label: 'What we collect',
    tekst:
      'your account (email address and username), your reading progress, the characters you have unlocked, your answers to polls and choice points, which new stories you opened today (for the free daily limit), your invite code, your subscription status, and any feedback you send us from inside the app. We do not collect the text you read, and quiz answers are never stored.',
  },
  {
    label: 'Subscription',
    tekst:
      'if you subscribe to Pro, Google Play takes the payment and we never see your card. RevenueCat checks the purchase and keeps its status in sync; it receives your account identifier (not your email), the purchase token, product, dates, price, currency, country and basic app and device details.',
  },
  {
    label: 'Feedback',
    tekst:
      'a message you send from inside the app is also posted, with your email address, to a private channel in the Discord workspace of the two people who build Histora, so that we see it and can reply.',
  },
  {
    label: 'Account',
    tekst: 'your account is used to sync progress and preferences across devices.',
  },
  {
    label: 'Usage statistics',
    tekst:
      'this version of Histora sends no usage statistics and contains no analytics SDK.',
  },
  {
    label: 'Advertising',
    tekst:
      'without Pro, Histora shows ads from Google AdMob: a banner on the home screen and the era pages, and one full-screen ad after you finish a story. Google receives your advertising ID, IP address (approximate location), device and app details and how you interact with the ads, never your email or what you read. In the EU, UK and Switzerland you are asked for consent first and can change it under Settings → Privacy → Ad choices. Pro readers see no ads.',
  },
  {
    label: 'On this device only',
    tekst:
      'your language, your theme, your profile picture and your email preferences stay on this phone and are never uploaded.',
  },
  {
    label: 'Email',
    tekst:
      'Histora has not launched yet and currently sends no emails. Once live, emails are only sent based on your Settings preferences (Monthly letter, New stories, Reading tips, Offers), and every email includes a working unsubscribe link.',
  },
  {
    label: 'Your rights (EU/GDPR)',
    tekst:
      'you can access, correct, or delete your data at any time. Delete your account from Settings, or contact us for other requests. Deleting your account does not cancel a Google Play subscription, and copies in our Discord channel and at RevenueCat are removed on request.',
  },
  {
    label: 'Third parties',
    tekst:
      'your data is processed on our behalf by Supabase (database and sign-in), and only where relevant by Google Play (payments), RevenueCat (subscription status) and Discord (feedback). RevenueCat and Discord are US companies and may process data there. Without Pro, Google AdMob shows ads and uses the data described above under its own privacy policy. We do not sell your data.',
  },
  {
    label: 'Changes',
    tekst: 'we may update this policy; material changes will be shown in-app.',
  },
];
