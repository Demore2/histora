import { Platform } from 'react-native';

/**
 * "Sign in with Apple" (iOS-voorbereiding), als bedoeling in plaats van als API — dezelfde vorm als
 * `lib/google-login.ts`:
 *
 * 1. **Niets hierin gooit ooit.** Het resultaat zegt wat er gebeurde; het scherm kiest de tekst.
 * 2. **Lui `require` achter een `Platform`-controle.** Apple-login bestaat alleen op iOS; op Android
 *    en web is `appleLogin.beschikbaar` onwaar en tonen de schermen de knop niet.
 * 3. **Mislukt het laden één keer, dan niet opnieuw** (`sdk === null`).
 *
 * Verplicht zodra de iOS-app Google-login aanbiedt (App Store-richtlijn 4.8).
 *
 * **De nonce.** Apple zet de SHA-256 van de nonce in het ID-token; Supabase wil de ruwe nonce, hasht
 * hem zelf en vergelijkt. Dus: ruwe nonce bewaren, de hash aan Apple geven, de ruwe aan Supabase.
 *
 * **De naam komt maar één keer.** Apple geeft `fullName` alleen bij de allereerste login met dit
 * Apple ID, en zet hem niet in het token. `hooks/useAuth.ts` schrijft hem daarom meteen in de
 * `user_metadata` (`full_name`), waar `gebruikersnaamVoor` hem vindt.
 */

type AppleSdk = typeof import('expo-apple-authentication');
type CryptoSdk = typeof import('expo-crypto');

export type AppleResultaat =
  | { ok: true; idToken: string; nonce: string; naam: string | null }
  | { ok: false; reden: 'afgebroken' | 'mislukt'; bericht?: string };

/** `undefined` = nog niet geprobeerd, `null` = niet beschikbaar op dit platform of deze build. */
let sdk: { apple: AppleSdk; crypto: CryptoSdk } | null | undefined;

function laad(): { apple: AppleSdk; crypto: CryptoSdk } | null {
  if (Platform.OS !== 'ios') return null;
  if (sdk !== undefined) return sdk;
  try {
    sdk = {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      apple: require('expo-apple-authentication') as AppleSdk,
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      crypto: require('expo-crypto') as CryptoSdk,
    };
    return sdk;
  } catch (fout) {
    sdk = null;
    // Bijna altijd "de dev-client is niet opnieuw gebouwd".
    console.warn('[apple] Sign in with Apple niet beschikbaar:', fout);
    return null;
  }
}

async function haalIdToken(): Promise<AppleResultaat> {
  const s = laad();
  if (!s) return { ok: false, reden: 'mislukt' };

  try {
    const nonce = s.crypto.randomUUID();
    const gehasht = await s.crypto.digestStringAsync(s.crypto.CryptoDigestAlgorithm.SHA256, nonce);
    const credential = await s.apple.signInAsync({
      requestedScopes: [
        s.apple.AppleAuthenticationScope.FULL_NAME,
        s.apple.AppleAuthenticationScope.EMAIL,
      ],
      nonce: gehasht,
    });
    if (!credential.identityToken) return { ok: false, reden: 'mislukt', bericht: 'geen_id_token' };

    const delen = [credential.fullName?.givenName, credential.fullName?.familyName].filter(
      (d): d is string => typeof d === 'string' && d.trim() !== '',
    );
    return { ok: true, idToken: credential.identityToken, nonce, naam: delen.length ? delen.join(' ') : null };
  } catch (fout) {
    if ((fout as { code?: string } | null)?.code === 'ERR_REQUEST_CANCELED') {
      return { ok: false, reden: 'afgebroken' };
    }
    console.warn('[apple] inloggen mislukt:', fout);
    return { ok: false, reden: 'mislukt', bericht: fout instanceof Error ? fout.message : String(fout) };
  }
}

export const appleLogin = {
  /** Of de knop getoond mag worden. Laadt de module bij de eerste vraag. */
  get beschikbaar(): boolean {
    return laad() !== null;
  },
  /** De module zelf, voor `AppleAuthenticationButton` (Apple eist hun eigen knop). */
  get sdk(): AppleSdk | null {
    return laad()?.apple ?? null;
  },
  haalIdToken,
};
