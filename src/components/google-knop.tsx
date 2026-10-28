import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { logInloggen, logRegistreren } from '@/hooks/useAnalytics';
import { loginMetGoogle } from '@/hooks/useAuth';
import { googleLogin } from '@/lib/google-login';

type Props = {
  /** Na een geslaagde login of koppeling; het scherm kiest zelf waarheen. */
  onGelukt: () => void;
  /** Een fout om te tonen, of `null` om een oude weg te halen. Afbreken is geen fout. */
  onFout: (fout: string | null) => void;
  /**
   * Vlak vóór het inloggen. De intro zet hier `rondIntroAf`, zodat de auth-poort — die reageert
   * zodra de sessie wisselt — al weet dat het Pro-aanbod nog moet komen.
   */
  onStart?: () => void;
  /** Afgebroken of mislukt, na een `onStart`: de intro draait daar zijn `rondIntroAf` terug. */
  onNietGelukt?: () => void;
  /** Andere knoppen op het scherm uitzetten zolang Google bezig is. */
  onBezig?: (bezig: boolean) => void;
  disabled?: boolean;
};

/**
 * "Continue with Google" (1.5.0) — op de intro, het inlog- en registratiescherm en "Bewaar je
 * voortgang". Rendert **niets** waar Google niet kan (web, een dev-client van vóór 1.5.0): een knop
 * die alleen een foutmelding oplevert is erger dan geen knop.
 *
 * Wat de knop doet hangt af van wie er is (`loginMetGoogle`): een gast wordt gekoppeld, anders wordt
 * er ingelogd of een account gemaakt. Hij oogt als een tweede knop (omlijnd), want op elk scherm is
 * hij een alternatief naast de hoofdactie.
 */
export function GoogleKnop({ onGelukt, onFout, onStart, onNietGelukt, onBezig, disabled = false }: Props) {
  const theme = useTheme();
  const { t } = useVertaling();
  const [bezig, setBezig] = useState(false);

  if (!googleLogin.beschikbaar) return null;

  async function handlePress() {
    onFout(null);
    onStart?.();
    setBezig(true);
    onBezig?.(true);
    const resultaat = await loginMetGoogle();
    setBezig(false);
    onBezig?.(false);

    if (resultaat.ok) {
      // Zelfde twee gebeurtenissen als de e-mailroute, met `google` als methode.
      if (resultaat.nieuw) logRegistreren('google');
      else logInloggen('google');
      onGelukt();
      return;
    }
    onNietGelukt?.();
    if (resultaat.reden === 'afgebroken') return;
    onFout(
      resultaat.reden === 'geen-play-services'
        ? t((s) => s.auth.googleGeenPlay)
        : t((s) => s.auth.googleMislukt),
    );
  }

  const inert = bezig || disabled;
  return (
    <AnimatedPressable
      onPress={() => void handlePress()}
      disabled={inert}
      accessibilityRole="button"
      accessibilityState={{ disabled: inert, busy: bezig }}
      style={[styles.knop, { borderColor: theme.backgroundSelected, backgroundColor: theme.backgroundElement }]}>
      {bezig ? (
        <ActivityIndicator color={theme.text} />
      ) : (
        <>
          <Ionicons name="logo-google" size={20} color={theme.text} />
          <ThemedText type="bodyBold">{t((s) => s.auth.googleKnop)}</ThemedText>
        </>
      )}
      <View style={styles.hoogtevuller} />
    </AnimatedPressable>
  );
}

/** Een dunne lijn met "or" ertussen, tussen de Google-knop en het formulier. */
export function OfScheiding() {
  const theme = useTheme();
  const { t } = useVertaling();
  if (!googleLogin.beschikbaar) return null;
  return (
    <View style={styles.scheiding}>
      <View style={[styles.lijn, { backgroundColor: theme.backgroundSelected }]} />
      <ThemedText type="small" themeColor="textSecondary">
        {t((s) => s.auth.of)}
      </ThemedText>
      <View style={[styles.lijn, { backgroundColor: theme.backgroundSelected }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  knop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radii.button,
    borderWidth: 1,
  },
  hoogtevuller: { height: 24 },
  scheiding: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginVertical: Spacing.four,
  },
  lijn: { flex: 1, height: 1 },
});
