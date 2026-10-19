import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ProPaywall } from '@/components/pro-paywall';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useAbonnement } from '@/hooks/use-abonnement';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { useAanbodStore } from '@/store/aanbod-store';

/**
 * Eén schakelaar voor het hele Pro-aanbod: deze banner én het paywall-venster erachter, ook waar
 * Instellingen het opent. Staat hij uit, dan is er nergens in de app een spoor van abonnementen.
 *
 * **Sinds Billing staat hij aan, maar dat alleen toont nog niets.** Het aanbod verschijnt pas als
 * er ook echt iets te koop is (`useProAanbodZichtbaar()` = deze vlag én `aanbod-store.teKoop`).
 * Zo ziet een reviewer nooit een prijs zonder werkende aankoop, ook niet in de periode tussen deze
 * build en het aanmaken van de producten in Play. Zet de vlag op `false` om het hele aanbod in één
 * keer weg te halen.
 */
export const PRO_BANNER_ENABLED = true;

/** Mag het Pro-aanbod nu getoond worden? Eén antwoord voor de banner en voor Instellingen. */
export function useProAanbodZichtbaar(): boolean {
  const teKoop = useAanbodStore((state) => state.teKoop);
  return PRO_BANNER_ENABLED && teKoop;
}

export function ProAccessBanner() {
  const theme = useTheme();
  const { t } = useVertaling();
  const { isPremium } = useAbonnement();
  const zichtbaar = useProAanbodZichtbaar();
  const [paywallOpen, setPaywallOpen] = useState(false);

  if (!zichtbaar) return null;
  if (isPremium) return null;

  return (
    <>
      <View style={[styles.banner, { backgroundColor: theme.backgroundElement }]}>
        <Ionicons name="star" size={22} color={theme.accent} />
        <View style={styles.tekst}>
          <ThemedText type="smallBold">{t((s) => s.pro.titel)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t((s) => s.pro.ondertitel)}
          </ThemedText>
        </View>
        <AnimatedPressable
          onPress={() => setPaywallOpen(true)}
          accessibilityRole="button"
          style={[styles.knop, { backgroundColor: theme.accent }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            {t((s) => s.pro.knop)}
          </ThemedText>
        </AnimatedPressable>
      </View>

      <ProPaywall visible={paywallOpen} onClose={() => setPaywallOpen(false)} bron="banner" />
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginHorizontal: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radii.card,
  },
  tekst: {
    flex: 1,
    gap: Spacing.half,
  },
  knop: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radii.button,
  },
});
