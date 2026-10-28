import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';

const PHOXY = require('@/assets/images/vos/leraar-wijzend.png');

/**
 * "Test your history skills!" op Home (1.4.5): de enige ingang naar de trivia tegen Phoxy
 * (`/trivia`), naast de kroontjes op Profiel. Bewust een kaart en niet het spel zelf: de reiskaart
 * blijft de grootste actie op Home, dit is de snelle optie voor wie geen tijd heeft voor een
 * hoofdstuk.
 */
export function TriviaKaart() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useVertaling();

  return (
    <AnimatedPressable
      onPress={() => router.push('/trivia')}
      accessibilityRole="button"
      style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
      <Image source={PHOXY} style={styles.vos} contentFit="contain" accessible={false} />
      <View style={styles.tekst}>
        <ThemedText type="subtitle">{t((s) => s.explore.titel)}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t((s) => s.explore.kaartTekst)}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={22} color={theme.textSecondary} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  kaart: {
    marginHorizontal: Spacing.four,
    borderRadius: Radii.card,
    paddingVertical: Spacing.three,
    paddingRight: Spacing.four,
    paddingLeft: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  vos: {
    width: 72,
    height: 72,
  },
  tekst: {
    flex: 1,
    gap: Spacing.one,
  },
});
