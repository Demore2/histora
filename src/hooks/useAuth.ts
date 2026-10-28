import type { Session, User } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { googleLogin } from '@/lib/google-login';
import { supabase } from '@/lib/supabase';
import { useAuthStore, type Profiel } from '@/store/auth-store';
import { useCharacterUnlockStore } from '@/store/character-unlock-store';
import { bereidToestelVoorGebruiker } from '@/store/lokale-gegevens';
import { useOnboardingStore } from '@/store/onboarding-store';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * Auth-acties voor R8.AUTH deel 1.
 *
 * De losse functies staan bewust buiten de hook: ze zijn dan stabiel (geen nieuwe referentie
 * per render), los importeerbaar in een event-handler, en ze praten via `getState()` met de
 * store in plaats van via een closure over verouderde state.
 */

export type AuthResultaat =
  | { ok: true; user: User; bevestigingNodig: boolean }
  | { ok: false; error: string };

/** De kolommen van `profiles` die we uitlezen. */
const PROFIEL_KOLOMMEN = 'id, email, username, language, theme';

/**
 * Haalt de `profiles`-rij op. `maybeSingle()` — een ontbrekend profiel is een lege waarde,
 * geen fout: bij een signup met e-mailbevestiging bestaat de rij nog niet.
 */
async function haalProfiel(userId: string): Promise<Profiel | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select(PROFIEL_KOLOMMEN)
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    // Geen harde fout: zonder profiel kun je nog steeds ingelogd zijn. De UI valt terug
    // op het e-mailadres uit `user`.
    console.warn('[auth] profiel ophalen mislukt:', error.message);
    return null;
  }
  return data as Profiel | null;
}

export async function login(email: string, password: string): Promise<AuthResultaat> {
  const store = useAuthStore.getState();
  store.setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error || !data.user) {
    const bericht = error?.message ?? 'Inloggen mislukt.';
    store.setError(bericht);
    return { ok: false, error: bericht };
  }

  const profiel = await haalProfiel(data.user.id);
  await bereidToestelVoorGebruiker(data.user.id);
  store.setUser(data.user, profiel);
  return { ok: true, user: data.user, bevestigingNodig: false };
}

export async function signup(
  email: string,
  password: string,
  username: string
): Promise<AuthResultaat> {
  const store = useAuthStore.getState();
  store.setLoading(true);

  const genormaliseerdeEmail = email.trim();
  const { data, error } = await supabase.auth.signUp({
    email: genormaliseerdeEmail,
    password,
    // De gebruikersnaam gaat mee in user_metadata, niet alleen naar `profiles`: bij een signup
    // met e-mailbevestiging bestaat de profielrij nog niet, en `herstelSessie` haalt de naam
    // bij de eerste login hier weer op. Zonder dit was de ingetypte naam dan verdwenen.
    options: { data: { username } },
  });

  if (error || !data.user) {
    const bericht = error?.message ?? 'Registreren mislukt.';
    store.setError(bericht);
    return { ok: false, error: bericht };
  }

  // Staat e-mailbevestiging aan in Supabase, dan geeft signUp() wel een user maar géén
  // sessie. Zonder sessie is auth.uid() leeg en weigert RLS beide inserts. De rijen komen
  // dan bij de eerste login alsnog goed (zie herstelSessie), dus dit is geen fout.
  const bevestigingNodig = data.session === null;

  if (bevestigingNodig) {
    // Geen sessie = niet ingelogd. De store hier tóch vullen zou de auth-poort in de root
    // layout (deel 2) binnenlaten terwijl elke query een 401 geeft, en bij de eerstvolgende
    // start zou `getSession()` de gebruiker er weer uit gooien. Het scherm toont in plaats
    // daarvan "check je mail".
    store.setLoading(false);
    return { ok: true, user: data.user, bevestigingNodig };
  }

  await maakGebruikersrijen(data.user.id, genormaliseerdeEmail, username);
  const profiel = await haalProfiel(data.user.id);
  await bereidToestelVoorGebruiker(data.user.id);
  store.setUser(data.user, profiel);
  return { ok: true, user: data.user, bevestigingNodig: false };
}

/**
 * Zet de `profiles`- en `voortgang`-rij klaar. `upsert` in plaats van `insert`, zodat een
 * tweede aanroep (herstelde sessie na e-mailbevestiging, of een half mislukte signup) geen
 * duplicate-key-fout geeft.
 *
 * De voortgang-rij krijgt alleen `user_id` mee — alle andere kolommen hebben een default in het
 * schema, en de eerste sync van `voortgang-store` vult ze meteen daarna.
 */
async function maakGebruikersrijen(
  userId: string,
  email: string,
  username?: string
): Promise<void> {
  const { error: profielFout } = await supabase
    .from('profiles')
    .upsert({ id: userId, email, username: username ?? null }, { onConflict: 'id' });

  if (profielFout) {
    console.warn('[auth] profiel aanmaken mislukt:', profielFout.message);
  }

  // Was een select-dan-insert, omdat `voortgang` geen unieke index op user_id had. Sinds de
  // migratie van deel 3 staat die er wel en kan dit één upsert zijn. `ignoreDuplicates`, want
  // een bestaande rij bevat echte voortgang die we hier niet mogen platslaan met defaults.
  const { error: voortgangFout } = await supabase
    .from('voortgang')
    .upsert({ user_id: userId }, { onConflict: 'user_id', ignoreDuplicates: true });

  if (voortgangFout) {
    console.warn('[auth] voortgang aanmaken mislukt:', voortgangFout.message);
  }
}

/** Een anoniem account (1.5.0): de intro start er een, tot de lezer Google of een e-mail koppelt. */
export function isGast(user: User | null | undefined): boolean {
  return user?.is_anonymous === true;
}

/**
 * De naam voor een nieuwe `profiles`-rij: wat bij het registreren werd ingetikt, anders de naam uit
 * de intro, anders wat Google meegeeft. Een Google-account heeft geen `username` in zijn metadata.
 */
function gebruikersnaamVoor(user: User): string | undefined {
  const meta = user.user_metadata ?? {};
  const kandidaten: unknown[] = [meta.username, useOnboardingStore.getState().naam, meta.full_name, meta.name];
  for (const k of kandidaten) {
    if (typeof k === 'string' && k.trim()) return k.trim();
  }
  return undefined;
}

/**
 * Begin als gast (1.5.0): een anoniem Supabase-account, zodat de intro, het eerste verhaal en de
 * sync meteen een `auth.uid()` hebben. Koppelen later houdt hetzelfde id, dus ook RevenueCat
 * (`appUserID` = dit id) en alle rijen blijven van dezelfde lezer.
 *
 * Mislukt het (offline, of CAPTCHA staat aan in Supabase en we sturen nog geen token), dan gaat de
 * intro gewoon verder zonder sessie en eindigt hij zoals vóór 1.5.0 bij registreren of inloggen.
 */
export async function startAlsGast(): Promise<boolean> {
  if (useAuthStore.getState().user) return true;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    console.warn('[auth] als gast beginnen mislukt:', error?.message);
    return false;
  }
  await bereidToestelVoorGebruiker(data.user.id, true);
  useAuthStore.getState().setUser(data.user, null);
  return true;
}

/**
 * Zet de naam uit de intro op het gastaccount (`user_metadata.username`), zodat de profielkop en
 * Phoxy's begroeting hem tonen voordat er een `profiles`-rij is. Stil bij een fout: het is een
 * weergave, en bij het koppelen gaat dezelfde naam alsnog mee.
 */
export async function zetGastNaam(naam: string): Promise<void> {
  const schoon = naam.trim();
  if (!schoon || !isGast(useAuthStore.getState().user)) return;
  const { data, error } = await supabase.auth.updateUser({ data: { username: schoon } });
  if (error) {
    console.warn('[auth] gastnaam zetten mislukt:', error.message);
    return;
  }
  if (data.user) useAuthStore.getState().setUser(data.user, useAuthStore.getState().profiel);
}

export type GoogleAuthResultaat =
  | { ok: true; nieuw: boolean }
  | { ok: false; reden: 'afgebroken' | 'geen-play-services' | 'mislukt'; bericht?: string };

/**
 * "Continue with Google" (1.5.0), op elk scherm hetzelfde:
 *
 * - **Gast** → `linkIdentity` met het ID-token: hetzelfde id, de gast wordt een echt account en
 *   houdt alles. Bestaat dat Google-account al bij ons (`identity_already_exists`), dan wordt het
 *   gewoon inloggen op dat account; de voortgang van de gast gaat mee (zie `bereidToestelVoorGebruiker`).
 * - **Niemand ingelogd** → `signInWithIdToken`: inloggen, of een nieuw account als het er nog niet is.
 */
export async function loginMetGoogle(): Promise<GoogleAuthResultaat> {
  const token = await googleLogin.haalIdToken();
  if (!token.ok) return token;

  if (isGast(useAuthStore.getState().user)) {
    const { data, error } = await supabase.auth.linkIdentity({ provider: 'google', token: token.idToken });
    if (!error && data.session) {
      await herstelSessie(data.session);
      return { ok: true, nieuw: true };
    }
    if (error && error.code !== 'identity_already_exists') {
      console.warn('[auth] Google koppelen mislukt:', error.message);
      return { ok: false, reden: 'mislukt', bericht: error.message };
    }
    // Bestaat al: val door naar inloggen met hetzelfde token.
  }

  const { data, error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: token.idToken });
  if (error || !data.session) {
    console.warn('[auth] inloggen met Google mislukt:', error?.message);
    return { ok: false, reden: 'mislukt', bericht: error?.message };
  }
  // Nieuw = het account is in deze aanroep aangemaakt (geen eerdere inlog vóór deze).
  const nieuw = Date.now() - new Date(data.user.created_at).getTime() < 60_000;
  await herstelSessie(data.session);
  return { ok: true, nieuw };
}

export type KoppelResultaat =
  | { ok: true; bevestigingNodig: boolean }
  | { ok: false; error: string; bestaatAl: boolean };

/**
 * Een e-mailadres en wachtwoord aan het gastaccount hangen (1.5.0). Eén `updateUser`: Supabase
 * staat een wachtwoord op een gast alleen toe als er in dezelfde aanroep een e-mail meekomt. Met
 * "Confirm email" uit (zo staat het project) is de gast daarna meteen een echt account; staat het
 * ooit weer aan, dan blijft hij gast tot de bevestigingslink geopend is — dat meldt `bevestigingNodig`.
 */
export async function koppelEmail(email: string, password: string, username: string): Promise<KoppelResultaat> {
  const schoon = email.trim();
  const { data, error } = await supabase.auth.updateUser({ email: schoon, password, data: { username } });
  if (error || !data.user) {
    const bestaatAl = error?.code === 'email_exists' || error?.code === 'user_already_exists';
    return { ok: false, error: error?.message ?? 'Koppelen mislukt.', bestaatAl };
  }
  if (isGast(data.user)) {
    useAuthStore.getState().setUser(data.user, null);
    return { ok: true, bevestigingNodig: true };
  }
  await maakGebruikersrijen(data.user.id, schoon, username);
  const profiel = await haalProfiel(data.user.id);
  await bereidToestelVoorGebruiker(data.user.id, false);
  useAuthStore.getState().setUser(data.user, profiel);
  return { ok: true, bevestigingNodig: false };
}

export async function logout(): Promise<void> {
  // Laatste kans om openstaande voortgang weg te schrijven: na `signOut()` is er geen token meer
  // en geeft elke upsert een 401. Mislukt hij (offline), dan blijft de vlag lokaal staan en gaat
  // het alsnog omhoog zodra dezelfde gebruiker weer inlogt.
  //
  // Alle drie de stores, sinds R8.SYNC-B: wie het laatste hoofdstuk afmaakt en meteen uitlogt,
  // doet dat ruim binnen de twee seconden debounce.
  await Promise.all(
    [useVoortgangStore, useStoryProgressStore, useCharacterUnlockStore].map(async (store) => {
      if (store.getState().heeftOnverzondenWijzigingen) {
        await store.getState().syncToSupabase();
      }
    })
  );

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.warn('[auth] uitloggen mislukt:', error.message);
  }
  // Ook bij een fout lokaal uitloggen: de sessie is hier hoe dan ook weggegooid.
  useAuthStore.getState().clearUser();
}

/**
 * Vult de store vanuit een bestaande sessie. Draait bij het opstarten en bij elke wissel
 * die supabase-js meldt (token-refresh, uitloggen op een ander tabblad).
 */
async function herstelSessie(session: Session | null): Promise<void> {
  const store = useAuthStore.getState();

  if (!session?.user) {
    store.clearUser();
    return;
  }

  let profiel = await haalProfiel(session.user.id);

  // Eerste login na een e-mailbevestiging: de signup kon de rijen nog niet schrijven omdat
  // er toen geen sessie was. Nu wel — alsnog aanmaken.
  // Sinds 1.5.0 ook: een gast die net Google of een e-mailadres koppelde (zelfde id, nu met e-mail),
  // en een nieuw Google-account. Een gast zelf heeft geen e-mail en dus (nog) geen `profiles`-rij.
  if (!profiel && session.user.email) {
    await maakGebruikersrijen(session.user.id, session.user.email, gebruikersnaamVoor(session.user));
    profiel = await haalProfiel(session.user.id);
  }

  // Vóór `setUser`: zie `bereidToestelVoorGebruiker` — een ander account mag de voortgang van de
  // vorige lezer op dit toestel niet erven. Een gast telt daar als "nog niemand".
  await bereidToestelVoorGebruiker(session.user.id, isGast(session.user));
  store.setUser(session.user, profiel);
}

/**
 * Houdt de auth-store gelijk met de echte Supabase-sessie.
 *
 * Mount dit één keer hoog in de boom (root layout). Meerdere instanties zijn niet fout —
 * elke instantie ruimt zijn eigen abonnement op — maar ze doen hetzelfde werk dubbel.
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const profiel = useAuthStore((state) => state.profiel);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    let actief = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (actief) void herstelSessie(data.session);
      })
      .catch((fout: unknown) => {
        if (!actief) return;
        console.warn('[auth] sessie ophalen mislukt:', fout);
        useAuthStore.getState().clearUser();
      });

    const { data: abonnement } = supabase.auth.onAuthStateChange((_event, session) => {
      if (actief) void herstelSessie(session);
    });

    return () => {
      actief = false;
      abonnement.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profiel,
    isLoading,
    error,
    isIngelogd: user !== null,
    login,
    signup,
    logout,
  };
}

export { useAuthStore };
