import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { useProAanbodZichtbaar } from '@/components/pro-access-banner';
import { ProPaywall } from '@/components/pro-paywall';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';

type OfflineModalProps = {
  visible: boolean;
  /** Dwingt een nieuwe netwerkmeting af; komt de verbinding terug, dan sluit het venster vanzelf. */
  onOpnieuw: () => void;
  /** Verlaat het scherm — een venster zonder uitweg is een val. */
  onTerug: () => void;
};

/**
 * Wat een gratis lezer ziet als hij zonder internet een verhaal of hoofdstuk opent
 * (`useOnlinePoort`). Zelfde vorm als `StoryLimitModal`, maar een andere toon: dit is geen
 * afsluiting van de dag, het is een verbinding die even weg is. De hoofdactie is daarom "opnieuw
 * proberen", niet Pro.
 *
 * De Pro-regel verschijnt alleen als er echt iets te koop is (`useProAanbodZichtbaar`), zelfde
 * regel als de banner — een uitweg naar een aankoop die niet kan is geen uitweg.
 */
export function OfflineModal({ visible, onOpnieuw, onTerug }: OfflineModalProps) {
  const theme = useTheme();
  const { t } = useVertaling();
  const proTeKoop = useProAanbodZichtbaar();
  const [paywallOpen, setPaywallOpen] = useState(false);

  return (
    <>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onTerug}>
        <View style={[styles.overlay, { backgroundColor: withAlpha('#000000', 0.7) }]}>
          <View style={[styles.venster, { backgroundColor: theme.background }]}>
            <View style={[styles.merkCirkel, { backgroundColor: withAlpha(theme.accent, 0.14) }]}>
              <Ionicons name="cloud-offline-outline" size={30} color={theme.accent} />
            </View>

            <View style={styles.kopTekst}>
              <ThemedText type="title" style={styles.gecentreerd}>
                {t((s) => s.offline.titel)}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.gecentreerd}>
                {t((s) => s.offline.tekst)}
              </ThemedText>
            </View>

            <AnimatedPressable
              onPress={onOpnieuw}
              accessibilityRole="button"
              style={[styles.hoofdKnop, { backgroundColor: theme.accent }]}>
              <ThemedText type="bodyBold" style={{ color: theme.background }}>
                {t((s) => s.offline.opnieuw)}
              </ThemedText>
            </AnimatedPressable>

            {proTeKoop ? (
              <Pressable
                onPress={() => setPaywallOpen(true)}
                accessibilityRole="button"
                style={styles.tweedeKnop}>
                <ThemedText type="link">{t((s) => s.offline.pro)}</ThemedText>
              </Pressable>
            ) : null}

            <Pressable onPress={onTerug} accessibilityRole="button" style={styles.tweedeKnop}>
              <ThemedText type="link" themeColor="textSecondary">
                {t((s) => s.offline.terug)}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Naast de Modal en niet erin, zie `StoryLimitModal`. */}
      <ProPaywall visible={paywallOpen} onClose={() => setPaywallOpen(false)} bron="offline" />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  venster: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radii.card,
  },
  merkCirkel: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kopTekst: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  gecentreerd: {
    textAlign: 'center',
  },
  hoofdKnop: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
  },
  tweedeKnop: {
    paddingVertical: Spacing.one,
  },
});
