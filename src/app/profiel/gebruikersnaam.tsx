import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { AuthKnop } from '@/components/auth-knop';
import { AuthVeld } from '@/components/auth-veld';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { MAX_GEBRUIKERSNAAM, wijzigGebruikersnaam, type NaamResultaat } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/auth-store';

type NaamFout = Extract<NaamResultaat, { ok: false }>['reden'];

/**
 * De gebruikersnaam wijzigen (`/profiel/gebruikersnaam`, als modal vanuit Instellingen).
 *
 * Eén veld en één knop, met de auth-componenten zodat het eruitziet als het registratiescherm
 * waar de naam ooit werd ingetikt. Bij een fout blijft de getypte naam staan.
 */
export default function GebruikersnaamScreen() {
  const theme = useTheme();
  const { t } = useVertaling();
  const router = useRouter();

  const [naam, setNaam] = useState(() => {
    const { profiel, user } = useAuthStore.getState();
    const meta = user?.user_metadata?.username;
    return profiel?.username ?? (typeof meta === 'string' ? meta : '');
  });
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<NaamFout | null>(null);

  async function opslaan() {
    setBezig(true);
    setFout(null);
    const resultaat = await wijzigGebruikersnaam(naam);
    setBezig(false);
    if (resultaat.ok) {
      router.back();
      return;
    }
    setFout(resultaat.reden);
  }

  const foutTekst =
    fout === null
      ? null
      : fout === 'teLang'
        ? t((s) => s.instellingen.naamFouten.teLang)(MAX_GEBRUIKERSNAAM)
        : t((s) => s.instellingen.naamFouten[fout]);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: t((s) => s.instellingen.gebruikersnaam) }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.inhoud} keyboardShouldPersistTaps="handled">
          <ThemedText type="small" themeColor="textSecondary" style={styles.uitleg}>
            {t((s) => s.instellingen.naamUitleg)}
          </ThemedText>
          <AuthVeld
            label={t((s) => s.instellingen.gebruikersnaam)}
            value={naam}
            onChangeText={(tekst) => {
              setNaam(tekst);
              setFout(null);
            }}
            placeholder={t((s) => s.auth.gebruikersnaamPlaceholder)}
            autoFocus
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect={false}
            textContentType="username"
            maxLength={MAX_GEBRUIKERSNAAM}
            returnKeyType="done"
            onSubmitEditing={() => void opslaan()}
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
            disabled={!naam.trim()}
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
