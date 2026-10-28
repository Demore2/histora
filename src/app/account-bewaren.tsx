import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthKnop } from '@/components/auth-knop';
import { AuthVeld } from '@/components/auth-veld';
import { GoogleKnop, OfScheiding } from '@/components/google-knop';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MIN_WACHTWOORD_LENGTE, isGeldigEmail } from '@/constants/auth-validatie';
import { MAX_LEESBREEDTE, Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { logRegistreren } from '@/hooks/useAnalytics';
import { koppelEmail, zetGastNaam } from '@/hooks/useAuth';
import { INTRO_AFLOOP, meetIntroStap } from '@/lib/intro-meting';
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore } from '@/store/onboarding-store';

/**
 * "Save your progress" (1.5.0): een gastaccount omzetten in een echt account, met Google of met
 * e-mail en wachtwoord. **Hetzelfde id**, dus alle voortgang, Dukaten, kroontjes en een eventuele
 * Pro-aankoop blijven staan — er wordt niets samengevoegd of overgezet.
 *
 * Twee ingangen: de laatste stap van de intro (`?bron=intro`, met "Later" en daarna het
 * Pro-aanbod) en de regel "Guest account" in Instellingen (terug waar je vandaan kwam).
 *
 * Bewust een eigen route en niet `/signup` met een vlag: `signup` is een auth-scherm, en de
 * auth-poort stuurt een echt account daar meteen weg — dan vechten de poort en dit scherm om de
 * navigatie zodra het koppelen lukt. Hier navigeert alleen het scherm zelf.
 */
export default function AccountBewarenScherm() {
  const theme = useTheme();
  const { t } = useVertaling();
  const { bron } = useLocalSearchParams<{ bron?: string }>();
  const vanuitIntro = bron === 'intro';

  const [gebruikersnaam, setGebruikersnaam] = useState(() => {
    const meta = useAuthStore.getState().user?.user_metadata?.username;
    return (typeof meta === 'string' && meta) || useOnboardingStore.getState().naam.trim();
  });
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [akkoord, setAkkoord] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [melding, setMelding] = useState<string | null>(null);
  const [bezig, setBezig] = useState(false);
  const [googleBezig, setGoogleBezig] = useState(false);

  function verder() {
    if (vanuitIntro || useOnboardingStore.getState().afrondenOpen) {
      router.replace('/intro-pro');
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }

  async function handleOpslaan() {
    if (!email.trim() || !wachtwoord || !gebruikersnaam.trim()) {
      setFout(t((s) => s.auth.foutAlleVelden));
      return;
    }
    if (!isGeldigEmail(email)) {
      setFout(t((s) => s.auth.foutEmailOngeldig));
      return;
    }
    if (wachtwoord.length < MIN_WACHTWOORD_LENGTE) {
      setFout(t((s) => s.auth.foutWachtwoordKort));
      return;
    }
    if (!akkoord) {
      setFout(t((s) => s.auth.foutVoorwaarden));
      return;
    }

    setFout(null);
    setMelding(null);
    setBezig(true);
    const resultaat = await koppelEmail(email, wachtwoord, gebruikersnaam.trim());
    setBezig(false);

    if (!resultaat.ok) {
      setFout(resultaat.bestaatAl ? t((s) => s.auth.emailBestaat) : resultaat.error);
      return;
    }
    logRegistreren('email');
    if (vanuitIntro) meetIntroStap(INTRO_AFLOOP.email.stap, INTRO_AFLOOP.email.nummer);
    if (resultaat.bevestigingNodig) {
      setMelding(t((s) => s.auth.bevestigMail)(email.trim()));
      return;
    }
    verder();
  }

  function handleLater() {
    meetIntroStap(INTRO_AFLOOP.later.stap, INTRO_AFLOOP.later.nummer);
    void zetGastNaam(gebruikersnaam);
    router.replace('/intro-pro');
  }

  const inert = bezig || googleBezig;

  return (
    <ThemedView style={styles.scherm}>
      <Stack.Screen options={{ headerShown: !vanuitIntro, title: '' }} />
      <SafeAreaView edges={vanuitIntro ? ['top', 'bottom'] : ['bottom']} style={styles.flex}>
        <KeyboardAvoidingView style={styles.flex} behavior="padding">
          <ScrollView contentContainerStyle={styles.inhoud} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.kop}>
              <Image
                source={require('@/assets/images/vos/zwaaiend.png')}
                style={{ width: 72, height: 72 }}
                contentFit="contain"
                accessibilityIgnoresInvertColors
              />
              <ThemedText type="title" style={styles.midden}>
                {t((s) => s.bewaren.titel)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.midden}>
                {t((s) => s.bewaren.ondertitel)}
              </ThemedText>
            </View>

            {fout !== null && (
              <View style={[styles.berichtvak, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="alert-circle-outline" size={18} color={theme.gevaar} />
                <ThemedText type="small" themeColor="gevaar" style={styles.flex}>
                  {fout}
                </ThemedText>
              </View>
            )}
            {melding !== null && (
              <View style={[styles.berichtvak, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="mail-outline" size={18} color={theme.succes} />
                <ThemedText type="small" themeColor="succes" style={styles.flex}>
                  {melding}
                </ThemedText>
              </View>
            )}

            <GoogleKnop
              onGelukt={() => {
                if (vanuitIntro) meetIntroStap(INTRO_AFLOOP.google.stap, INTRO_AFLOOP.google.nummer);
                verder();
              }}
              onFout={setFout}
              onBezig={setGoogleBezig}
              disabled={bezig}
            />
            <OfScheiding />

            <AuthVeld
              label={t((s) => s.auth.gebruikersnaam)}
              value={gebruikersnaam}
              onChangeText={setGebruikersnaam}
              placeholder={t((s) => s.auth.gebruikersnaamPlaceholder)}
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect={false}
              textContentType="username"
              editable={!inert}
              returnKeyType="next"
            />
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
              editable={!inert}
              returnKeyType="next"
            />
            <AuthVeld
              label={t((s) => s.auth.wachtwoord)}
              value={wachtwoord}
              onChangeText={setWachtwoord}
              placeholder={t((s) => s.auth.wachtwoordPlaceholder)}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
              textContentType="newPassword"
              editable={!inert}
              returnKeyType="go"
              onSubmitEditing={() => void handleOpslaan()}
            />

            <Pressable
              onPress={() => setAkkoord((huidig) => !huidig)}
              disabled={inert}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: akkoord }}
              style={styles.akkoordRij}>
              <Ionicons name={akkoord ? 'checkbox' : 'square-outline'} size={20} color={akkoord ? theme.accent : theme.inactive} />
              <ThemedText type="small" themeColor="textSecondary" style={styles.flex}>
                {t((s) => s.auth.voorwaarden)}
              </ThemedText>
            </Pressable>

            <AuthKnop label={t((s) => s.bewaren.knop)} onPress={() => void handleOpslaan()} bezig={bezig} disabled={googleBezig} />

            {vanuitIntro ? (
              <Pressable onPress={handleLater} disabled={inert} accessibilityRole="button" style={styles.laterKnop}>
                <ThemedText type="bodyBold" themeColor="textSecondary">
                  {t((s) => s.intro.later)}
                </ThemedText>
              </Pressable>
            ) : null}

            <View style={styles.wisselRij}>
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.auth.welAccount)}
              </ThemedText>
              <Pressable
                onPress={() => {
                  if (vanuitIntro) meetIntroStap(INTRO_AFLOOP.inloggen.stap, INTRO_AFLOOP.inloggen.nummer);
                  router.replace('/login');
                }}
                accessibilityRole="link"
                disabled={inert}>
                <ThemedText type="linkPrimary">{t((s) => s.auth.naarLogin)}</ThemedText>
              </Pressable>
            </View>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.midden}>
              {t((s) => s.bewaren.inloggenUitleg)}
            </ThemedText>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scherm: { flex: 1 },
  flex: { flex: 1 },
  midden: { textAlign: 'center' },
  inhoud: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    padding: Spacing.four,
  },
  kop: { alignItems: 'center', gap: Spacing.two, marginBottom: Spacing.four },
  berichtvak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radii.small,
    marginBottom: Spacing.three,
  },
  akkoordRij: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginBottom: Spacing.four },
  laterKnop: { alignItems: 'center', paddingVertical: Spacing.three },
  wisselRij: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    marginTop: Spacing.three,
    marginBottom: Spacing.two,
  },
});
