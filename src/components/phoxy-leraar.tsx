import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Motion } from '@/constants/motion';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PhoxyStand = 'vraag' | 'goed' | 'fout';

/** Uit `scripts/prepare-teacher-fox.mjs`: alle drie op dezelfde schaal, voeten op dezelfde hoogte. */
const BEELD: Record<PhoxyStand, number> = {
  vraag: require('@/assets/images/vos/leraar-wijzend.png'),
  goed: require('@/assets/images/vos/leraar-juichend.png'),
  fout: require('@/assets/images/vos/leraar-bemoedigend.png'),
};

const MAAT = 112;

/**
 * Phoxy als leraar naast de quizvraag (1.4): eerst wijzend, na het antwoord juichend of
 * bemoedigend, met een tekstwolkje erbij.
 *
 * **De tekst staat in het wolkje en niet in het plaatje**, zodat één set vossen in vier talen werkt
 * — dezelfde afspraak als bij de widget. Wélke zin er staat kiest `HoofdstukVragen`, op het
 * moment van antwoorden; hier wordt alleen getoond.
 *
 * Wolkje en vos krijgen een `key` per stand, zodat ze bij elke wissel opnieuw binnenkomen: het
 * wolkje springt op, de vos fade't van pose naar pose. Een doorlopende animatie is er bewust niet;
 * dit staat naast een vraag die gelezen moet worden.
 */
export function PhoxyLeraar({ stand, tekst }: { stand: PhoxyStand; tekst: string }) {
  const theme = useTheme();
  const wolk = theme.backgroundElement;

  return (
    <View style={styles.rij}>
      <Animated.View key={`vos-${stand}`} entering={FadeIn.duration(Motion.duration.normaal)}>
        <Image
          source={BEELD[stand]}
          style={styles.vos}
          contentFit="contain"
          accessible={false}
        />
      </Animated.View>

      <Animated.View
        key={`wolk-${stand}`}
        entering={ZoomIn.springify()
          .damping(Motion.spring.stuiter.damping)
          .stiffness(Motion.spring.stuiter.stiffness)}
        style={styles.wolkVak}
        accessibilityLiveRegion="polite">
        <View style={[styles.staart, { borderRightColor: wolk }]} />
        <View
          style={[styles.wolk, { backgroundColor: wolk, borderColor: withAlpha(theme.inactive, 0.2) }]}>
          <ThemedText type="smallBold">{tekst}</ThemedText>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  rij: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vos: {
    width: MAAT,
    height: MAAT,
    // De vos staat links in zijn vierkant, met rechts ruimte voor de stok; het wolkje mag daar
    // een stukje overheen schuiven, anders hangt het los van zijn snuit. De negatieve marge staat
    // hier en niet op het wolkje: op het `flex: 1`-element maakt hij dat te breed voor de rij.
    marginRight: -Spacing.three,
  },
  wolkVak: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  staart: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  wolk: {
    flex: 1,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radii.card,
    borderWidth: 1,
  },
});
