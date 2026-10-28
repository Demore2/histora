import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { ERA_KOP } from '@/constants/era-koppen';
import { Radii, Spacing } from '@/constants/theme';
import { getActieveTijdperken } from '@/constants/tijdperken';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import type { TijdperkId } from '@/lib/trivia';
import { useTriviaStore } from '@/store/trivia-store';

const GOUD = '#F2C230';

/**
 * Op Profiel (sinds 1.4.5, daarvoor op Progress): de kroontjes die je in de trivia verdiende, per tijdperk en over alle
 * spellen heen (`trivia-store.kroonTotaal`). Een tijdperk zonder kroontje staat er vaag bij, zodat
 * je ziet wat er nog te halen valt. Het hele blok is een ingang naar de trivia (`/trivia`).
 */
export function KroontjesBlok() {
  const theme = useTheme();
  const router = useRouter();
  const { t, v } = useVertaling();
  const kroonTotaal = useTriviaStore((s) => s.kroonTotaal);
  const tijdperken = getActieveTijdperken();
  const totaal = tijdperken.reduce((som, tp) => som + (kroonTotaal[tp.id as TijdperkId] ?? 0), 0);

  return (
    <View style={styles.blok}>
      <ThemedText type="title" style={styles.kop}>
        {t((s) => s.voortgang.kroontjes)}
      </ThemedText>
      <AnimatedPressable
        onPress={() => router.push('/trivia')}
        accessibilityRole="button"
        accessibilityLabel={t((s) => s.voortgang.kroontjesLabel)(totaal)}
        style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.rij}>
          {tijdperken.map((tp) => {
            const aantal = kroonTotaal[tp.id as TijdperkId] ?? 0;
            return (
              <View key={tp.id} style={styles.vak} accessibilityLabel={`${v(tp.titel)}: ${aantal}`}>
                <View
                  style={[
                    styles.kop2,
                    { backgroundColor: tp.kleur, borderColor: aantal > 0 ? GOUD : 'transparent', opacity: aantal > 0 ? 1 : 0.35 },
                  ]}>
                  <Image source={ERA_KOP[tp.id as TijdperkId]} style={styles.beeld} contentFit="cover" />
                </View>
                {aantal > 0 && (
                  <View style={[styles.teller, { backgroundColor: GOUD }]}>
                    <MaterialCommunityIcons name="crown" size={11} color="#FFFFFF" />
                    <ThemedText type="caption" style={styles.tellerTekst}>
                      {aantal}
                    </ThemedText>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <ThemedText type="small" themeColor="textSecondary">
          {totaal > 0 ? t((s) => s.voortgang.kroontjesTekst)(totaal) : t((s) => s.voortgang.kroontjesLeeg)}
        </ThemedText>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  blok: { gap: Spacing.three },
  kop: { paddingHorizontal: Spacing.four },
  kaart: {
    marginHorizontal: Spacing.four,
    padding: Spacing.three,
    borderRadius: Radii.card,
    gap: Spacing.three,
  },
  rij: { flexDirection: 'row', justifyContent: 'space-between' },
  vak: { alignItems: 'center' },
  kop2: { width: 46, height: 46, borderRadius: 23, overflow: 'hidden', borderWidth: 2 },
  beeld: { width: '100%', height: '100%' },
  teller: {
    position: 'absolute',
    bottom: -6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  tellerTekst: { color: '#FFFFFF' },
});
