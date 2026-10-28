import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Image } from 'expo-image';
import { AuthKnop } from '@/components/auth-knop';
import { AuthVeld } from '@/components/auth-veld';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SUPPORT_EMAIL, supportEmailIsIngesteld } from '@/constants/app-info';
import { isGeldigEmail } from '@/constants/auth-validatie';
import { meld } from '@/constants/dialoog';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { logInloggen } from '@/hooks/useAnalytics';
// De losse `login` in plaats van `useAuth()`: de hook zet ook de sessie-listener op en die
// hoort maar op één plek te draaien (de root layout). Zie de opmerking bij `useAuth`.
import { login } from '@/hooks/useAuth';
import { useOnboardingStore } from '@/store/onboarding-store';

export default function LoginScreen() {
  const theme = useTheme();
  const { t } = useVertaling();

  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [fout, setFout] = useState<string | null>(null);
  const [bezig, setBezig] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !wachtwoord) {
      setFout(t((s) => s.auth.foutVeldenLeeg));
      return;
    }
    if (!isGeldigEmail(email)) {
      setFout(t((s) => s.auth.foutEmailOngeldig));
      return;
    }

    setFout(null);
    setBezig(true);
    const resultaat = await login(email, wachtwoord);
    setBezig(false);

    if (!resultaat.ok) {
      setFout(resultaat.error);
      return;
    }
    // Firebase' eigen `login`-gebeurtenis, niet een eigen naam: die voedt de standaardrapporten
    // over nieuwe versus terugkerende lezers. `method` is er maar één zolang er geen Google- of
    // Apple-login is, en juist daarom staat hij erbij — anders is de dag dat die erbij komt niet
    // terug te zien in de cijfers.
    logInloggen('email');
    // De poort in de root layout stuurt óók door zodra de store een user heeft; dit is de
    // snelle weg zodat er geen frame met het inlogscherm blijft staan. Twee keer naar
    // dezelfde route vervangen is een no-op.
    // Net uit de intro (1.4.5)? Dan eerst eenmalig het Pro-aanbod; zelfde keuze als de auth-poort,
    // anders wint deze `replace` de race en verdwijnt dat scherm meteen weer.
    router.replace(useOnboardingStore.getState().afrondenOpen ? '/intro-pro' : '/');
  }

  /**
   * Wachtwoord vergeten bestaat nog niet, en dat zegt de knop nu ook.
   *
   * Hier stond een `console.log`: de knop was zichtbaar, reageerde op een tik en deed niets —
   * de lezer denkt dan dat de mail onderweg is en wacht op iets dat nooit komt. Zelfde afweging
   * als bij de "Soon"-regels in Instellingen: liever zeggen dat het er niet is dan doen alsof.
   *
   * De echte stroom is `supabase.auth.resetPasswordForEmail()` plus een scherm achter een
   * deeplink om er een nieuw wachtwoord mee te zetten; die tweede helft is het werk, en zonder
   * haar levert de mail een link op die nergens heen gaat. Tot die tijd wijst deze melding naar
   * support — dat adres wordt wél gelezen.
   */
  function handleWachtwoordVergeten() {
    meld(
      t((s) => s.auth.wachtwoordVergetenTitel),
      supportEmailIsIngesteld
        ? t((s) => s.auth.wachtwoordVergetenTekst)(SUPPORT_EMAIL)
        : t((s) => s.auth.wachtwoordVergetenTekstZonderSupport),
      t((s) => s.instellingen.ok),
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        {/* `padding` ook op Android: de app draait edge-to-edge, dus het venster krimpt niet
            mee met het toetsenbord. Zie dezelfde regel in `signup.tsx`. */}
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.kop}>
              {/* Sinds 1.3.1 de zwaaiende vos (Phoxy) in plaats van de blauwe H, net als het icoon en het opstartscherm. */}
              <Image
                source={require('@/assets/images/vos/zwaaiend.png')}
                style={{ width: 72, height: 72 }}
                contentFit="contain"
                accessibilityIgnoresInvertColors
              />
              <ThemedText type="title">{t((s) => s.auth.loginTitel)}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.auth.loginOndertitel)}
              </ThemedText>
            </View>

            {fout !== null && (
              <View style={[styles.foutvak, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="alert-circle-outline" size={18} color={theme.gevaar} />
                <ThemedText type="small" themeColor="gevaar" style={styles.foutTekst}>
                  {fout}
                </ThemedText>
              </View>
            )}

            <AuthVeld
              label={t((s) => s.auth.email)}
              value={email}
              onChangeText={setEmail}
              placeholder={t((s) => s.auth.emailPlaceholder)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              editable={!bezig}
              returnKeyType="next"
            />

            <AuthVeld
              label={t((s) => s.auth.wachtwoord)}
              value={wachtwoord}
              onChangeText={setWachtwoord}
              placeholder={t((s) => s.auth.wachtwoordPlaceholder)}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="current-password"
              textContentType="password"
              editable={!bezig}
              returnKeyType="go"
              onSubmitEditing={() => void handleLogin()}
            />

            <Pressable
              onPress={handleWachtwoordVergeten}
              accessibilityRole="button"
              style={styles.vergetenKnop}>
              <ThemedText type="link" themeColor="textSecondary">
                {t((s) => s.auth.wachtwoordVergeten)}
              </ThemedText>
            </Pressable>

            <AuthKnop
              label={t((s) => s.auth.inloggen)}
              onPress={() => void handleLogin()}
              bezig={bezig}
            />

            <View style={styles.wisselRij}>
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.auth.geenAccount)}
              </ThemedText>
              <Pressable
                onPress={() => router.push('/signup')}
                accessibilityRole="link"
                disabled={bezig}>
                <ThemedText type="linkPrimary">{t((s) => s.auth.naarSignup)}</ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.four,
  },
  kop: {
    alignItems: 'center',
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  foutvak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radii.small,
    marginBottom: Spacing.three,
  },
  foutTekst: {
    flex: 1,
  },
  vergetenKnop: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.four,
  },
  wisselRij: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
});
