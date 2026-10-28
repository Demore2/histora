import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { FeedbackModal } from '@/components/feedback-modal';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { useWinkelStore } from '@/store/winkel-store';

type KopActiesProps = {
  /** Het Dukaten-knopje naar de winkel. Uit op de winkel zelf, want daar sta je al. */
  toonWinkel?: boolean;
};

/**
 * De knoppen rechtsboven op elk hoofdscherm (1.3, wens van de eigenaar): het saldo dat naar de
 * winkel leidt, het spreekwolkje voor een bug of idee, en het tandwiel naar Instellingen.
 *
 * Feedback en Instellingen stonden alleen op Profiel, en de winkel had een eigen tabblad. Nu staan
 * ze op één vaste plek op elk scherm — de plek waar je ze zonder zoeken verwacht — en blijft de
 * tabbalk over voor de drie plekken waar je leest en kijkt hoe ver je bent.
 *
 * **Eén `FeedbackModal` per kopje**, want hij hoort bij de knop die hem opent. Er staat er altijd
 * maar één in beeld (één scherm tegelijk), dus twee open vensters kunnen niet.
 */
export function KopActies({ toonWinkel = true }: KopActiesProps) {
  const theme = useTheme();
  const { t } = useVertaling();
  const router = useRouter();
  const saldo = useWinkelStore((s) => s.saldo);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <View style={styles.rij}>
      {toonWinkel ? (
        <Pressable
          onPress={() => router.push('/shop')}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`${t((s) => s.winkel.titel)}, ${t((s) => s.winkel.dukaten)(saldo)}`}
          style={[styles.saldo, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="smallBold">🪙 {saldo}</ThemedText>
          {/* Het winkeltje maakt zichtbaar dat het saldo een knop naar de winkel is (wens van de eigenaar). */}
          <Ionicons name="storefront-outline" size={16} color={theme.text} />
        </Pressable>
      ) : null}
      <Pressable
        onPress={() => setFeedbackOpen(true)}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={t((s) => s.profiel.feedbackOpenen)}
        style={styles.icoon}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color={theme.text} />
      </Pressable>
      <Pressable
        onPress={() => router.push('/profiel/settings')}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel={t((s) => s.profiel.instellingenOpenen)}
        style={styles.icoon}>
        <Ionicons name="settings-outline" size={22} color={theme.text} />
      </Pressable>

      <FeedbackModal visible={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  rij: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  saldo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radii.button,
  },
  icoon: {
    padding: Spacing.one,
  },
});
