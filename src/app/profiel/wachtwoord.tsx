import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { AuthKnop } from '@/components/auth-knop';
import { AuthVeld } from '@/components/auth-veld';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MIN_WACHTWOORD_LENGTE } from '@/constants/auth-validatie';
import { meld } from '@/constants/dialoog';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { heeftWachtwoord, wijzigWachtwoord, type WachtwoordResultaat } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';

type WachtwoordFout = Extract<WachtwoordResultaat, { ok: false }>['reden'] | 'nietGelijk';

/**
 * Wachtwoord wijzigen (`/profiel/wachtwoord`, als modal vanuit Instellingen).
 *
 * Vraagt het huidige wachtwoord, behalve bij een account dat alleen via Google bestaat: dat heeft
 * er geen, en dan zet dit scherm er een. Het nieuwe wachtwoord twee keer, omdat het verborgen
 * getypt wordt en een tikfout hier betekent dat je jezelf buitensluit.
 */
export default function WachtwoordScreen() {
  const theme = useTheme();
  const { t } = useVertaling();
  const router = useRouter();

  const metWachtwoord = useAuthStore((s) => heeftWachtwoord(s.user));
  const [huidig, setHuidig] = useState('');
  const [nieuw, setNieuw] = useState('');
  const [herhaal, setHerhaal] = useState('');
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<WachtwoordFout | null>(null);

  async function opslaan() {
    if (nieuw !== herhaal) {
      setFout('nietGelijk');
      return;
    }
    setBezig(true);
    setFout(null);
    const resultaat = await wijzigWachtwoord(metWachtwoord ? huidig : null, nieuw);
    setBezig(false);
    if (!resultaat.ok) {
      setFout(resultaat.reden);
      return;
    }
    meld(
      t((s) => s.instellingen.wwGewijzigdTitel),
      t((s) => s.instellingen.wwGewijzigdTekst),
      t((s) => s.instellingen.ok),
    );
    router.back();
  }

  const foutTekst =
    fout === null
      ? null
      : fout === 'teKort'
        ? t((s) => s.instellingen.wwFouten.teKort)(MIN_WACHTWOORD_LENGTE)
        : t((s) => s.instellingen.wwFouten[fout]);

  const wisFout = () => setFout(null);
  const compleet = (!metWachtwoord || huidig.length > 0) && nieuw.length > 0 && herhaal.length > 0;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: t((s) => s.instellingen.wachtwoordWijzigen) }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.inhoud} keyboardShouldPersistTaps="handled">
          {metWachtwoord ? (
            <AuthVeld
              label={t((s) => s.instellingen.wwHuidig)}
              value={huidig}
              onChangeText={(tekst) => {
                setHuidig(tekst);
                wisFout();
              }}
              secureTextEntry
              autoFocus
              autoCapitalize="none"
              autoComplete="current-password"
              textContentType="password"
            />
          ) : (
            <ThemedText type="small" themeColor="textSecondary" style={styles.uitleg}>
              {t((s) => s.instellingen.wwGoogleUitleg)}
            </ThemedText>
          )}
          <AuthVeld
            label={t((s) => s.instellingen.wwNieuw)}
            value={nieuw}
            onChangeText={(tekst) => {
              setNieuw(tekst);
              wisFout();
            }}
            placeholder={t((s) => s.auth.wachtwoordPlaceholder)}
            secureTextEntry
            autoFocus={!metWachtwoord}
            autoCapitalize="none"
            autoComplete="new-password"
            textContentType="newPassword"
          />
          <AuthVeld
            label={t((s) => s.instellingen.wwHerhaal)}
            value={herhaal}
            onChangeText={(tekst) => {
              setHerhaal(tekst);
              wisFout();
            }}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="done"
            onSubmitEditing={() => {
              if (compleet) void opslaan();
            }}
          />
          {foutTekst ? (
            <ThemedText type="small" style={[styles.fout, { color: theme.gevaar }]}>
              {foutTekst}
            </ThemedText>
          ) : null}
          <AuthKnop
            label={t((s) => s.instellingen.naamOpslaan)}
            onPress={() => void opslaan()}
            bezig={bezig}
            disabled={!compleet}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inhoud: {
    padding: Spacing.four,
  },
  uitleg: {
    marginBottom: Spacing.four,
  },
  fout: {
    marginBottom: Spacing.three,
  },
});
