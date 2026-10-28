import { Platform } from 'react-native';

import { GOOGLE_WEB_CLIENT_ID } from '@/constants/app-info';

/**
 * "Continue with Google" (1.5.0), als bedoeling in plaats van als API — dezelfde vorm als
 * `lib/push.ts` en `lib/aankopen.ts`:
 *
 * 1. **Niets hierin gooit ooit.** Het resultaat zegt wat er gebeurde; het scherm kiest de tekst.
 * 2. **Lui `require` achter een `Platform`-controle.** `@react-native-google-signin/google-signin`
 *    is native: hij bestaat niet op web en niet in een dev-client van vóór 1.5.0. Daar is
 *    `googleLogin.beschikbaar` onwaar en tonen de schermen de knop gewoon niet.
 * 3. **Mislukt het laden één keer, dan niet opnieuw** (`sdk === null`).
 *
 * Dit levert alleen het **ID-token**; wat ermee gebeurt (inloggen, of een anoniem account koppelen)
 * staat in `hooks/useAuth.ts`. Bewust de "Original Google sign in" en niet One Tap: die zet geen
 * nonce in het token, en zonder nonce aan beide kanten laat Supabase het token door terwijl de
 * nonce-controle daar gewoon aan blijft.
 *
 * Geen config-plugin in `app.json`: zonder opties wil die `google-services.json` (Firebase-modus),
 * en met opties alleen een iOS-URL-schema. Op Android heeft de bibliotheek niets in het manifest
 * nodig — de client-ID gaat hieronder mee in `configure()`.
 */

type GoogleSdk = typeof import('@react-native-google-signin/google-signin');

export type GoogleResultaat =
  | { ok: true; idToken: string }
  | { ok: false; reden: 'afgebroken' | 'geen-play-services' | 'mislukt'; bericht?: string };

/** `undefined` = nog niet geprobeerd, `null` = niet beschikbaar op dit platform of deze build. */
let sdk: GoogleSdk | null | undefined;
let geconfigureerd = false;

function laad(): GoogleSdk | null {
  if (Platform.OS !== 'android') return null;
  if (sdk === null) return null;
  try {
    if (sdk === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      sdk = require('@react-native-google-signin/google-signin') as GoogleSdk;
    }
    if (!geconfigureerd) {
      sdk.GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID });
      geconfigureerd = true;
    }
    return sdk;
  } catch (fout) {
    sdk = null;
    // Bijna altijd "de dev-client is niet opnieuw gebouwd".
    console.warn('[google] Google Sign-In niet beschikbaar:', fout);
    return null;
  }
}

async function haalIdToken(): Promise<GoogleResultaat> {
  const g = laad();
  if (!g) return { ok: false, reden: 'mislukt' };

  try {
    await g.GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const antwoord = await g.GoogleSignin.signIn();
    if (!g.isSuccessResponse(antwoord)) return { ok: false, reden: 'afgebroken' };

    // Meteen weer afmelden bij Google (niet bij ons): anders kiest de volgende tik stilletjes
    // hetzelfde Google-account en kan een tweede lezer op dit toestel nooit een ander kiezen.
    void g.GoogleSignin.signOut().catch(() => undefined);

    const idToken = antwoord.data.idToken;
    if (!idToken) return { ok: false, reden: 'mislukt', bericht: 'geen_id_token' };
    return { ok: true, idToken };
  } catch (fout) {
    if (g.isErrorWithCode(fout)) {
      if (fout.code === g.statusCodes.SIGN_IN_CANCELLED || fout.code === g.statusCodes.IN_PROGRESS) {
        return { ok: false, reden: 'afgebroken' };
      }
      if (fout.code === g.statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return { ok: false, reden: 'geen-play-services' };
      }
    }
    // `DEVELOPER_ERROR` (code 10) betekent: de SHA-1 van deze build staat niet bij een
    // Android-client in Google Cloud. Een lokale debugbuild heeft een andere sleutel dan Play.
    console.warn('[google] inloggen mislukt:', fout);
    return { ok: false, reden: 'mislukt', bericht: fout instanceof Error ? fout.message : String(fout) };
  }
}

export const googleLogin = {
  /** Of de knop getoond mag worden. Laadt de module bij de eerste vraag. */
  get beschikbaar(): boolean {
    return laad() !== null;
  },
  haalIdToken,
};
