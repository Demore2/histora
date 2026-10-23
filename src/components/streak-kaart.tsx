import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { useStreakStand } from '@/hooks/use-streak-stand';
import { useVertaling } from '@/hooks/use-vertaling';
import { useWinkelStore } from '@/store/winkel-store';
import { FASE_KLEUR, type StreakFase } from '@/widget/streak-fase';

/** De 1024-px-versies: op een scherm komt de vos groter in beeld dan op een widget. */
const FASE_BEELD: Record<StreakFase, number> = {
  gevierd: require('@/assets/images/vos/fase-1-gevierd.png'),
  ochtend: require('@/assets/images/vos/fase-2-ochtend.png'),
  middag: require('@/assets/images/vos/fase-3-middag.png'),
  avond: require('@/assets/images/vos/fase-4-avond.png'),
  paniek: require('@/assets/images/vos/fase-5-paniek.png'),
  ijs: require('@/assets/images/vos/fase-8-ijs.png'),
  skelet: require('@/assets/images/vos/fase-6-skelet.png'),
  slaap: require('@/assets/images/vos/fase-7-slaap.png'),
};

const WIT = '#FFFFFF';
const WIT_ZACHT = 'rgba(255, 255, 255, 0.82)';

/**
 * De kop van Voortgang (1.3): de vos in de stemming van dit moment, met de streak, de zin en de
 * week — dezelfde inhoud als de brede widget, uit dezelfde functie.
 *
 * Hier stonden vier tellers (`ProgressStatsHeader`, nu orphaned): streak, hoofdstukken, verhalen,
 * personages. De laatste drie staan ook op Profiel, en twee keer hetzelfde lijstje is ruis. Zo gaat
 * Voortgang over de streak en waar je bent, en Profiel over wat je verzameld hebt.
 *
 * Het chipje met de bevriezers leidt naar de winkel: het is de plek waar je ze aanvult.
 */
export function StreakKaart() {
  const { t } = useVertaling();
  const router = useRouter();
  const stand = useStreakStand();
  const bevriezers = useWinkelStore((s) => s.bevriezers);
  const max = useWinkelStore((s) => s.instellingen.maxBevriezers);
  const kleur = FASE_KLEUR[stand.fase];
  const weekdagen = t((s) => s.widget.weekdagen);

  return (
    <View style={[styles.kaart, { backgroundColor: kleur.van }]}>
      <View style={styles.tekst}>
        {stand.dagen > 0 ? (
          <ThemedText type="title" style={{ color: WIT }}>
            🔥 {t((s) => s.widget.dagen)(stand.dagen)}
          </ThemedText>
        ) : null}
        <ThemedText type="bodyBold" style={{ color: stand.dagen > 0 ? WIT_ZACHT : WIT }}>
          {t((s) => s.widget.zinnen[stand.fase])}
        </ThemedText>

        <View style={styles.week}>
          {stand.week.map((dag, i) => (
            <View key={i} style={styles.weekDag}>
              <ThemedText type="caption" style={{ color: i === stand.vandaagIndex ? WIT : WIT_ZACHT }}>
                {weekdagen[i]}
              </ThemedText>
              <View
                style={[
                  styles.bolletje,
                  {
                    backgroundColor: dag === 'gelezen' ? WIT : 'rgba(255, 255, 255, 0.25)',
                    borderWidth: i === stand.vandaagIndex ? 2 : 0,
                  },
                ]}>
                {dag === 'gelezen' ? (
                  <ThemedText type="smallBold" style={{ color: kleur.naar }}>
                    ✓
                  </ThemedText>
                ) : dag === 'bevroren' ? (
                  <ThemedText type="caption">❄️</ThemedText>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => router.push('/winkel')}
          accessibilityRole="button"
          style={styles.chip}>
          <ThemedText type="smallBold" style={{ color: WIT }}>
            ❄️ {bevriezers}/{max}
          </ThemedText>
        </Pressable>
      </View>

      <Image
        source={FASE_BEELD[stand.fase]}
        style={styles.vos}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  );
}

const styles = StyleSheet.create({
  kaart: {
    marginHorizontal: Spacing.four,
    borderRadius: Radii.card,
    paddingLeft: Spacing.four,
    paddingVertical: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  tekst: {
    flex: 1,
    gap: Spacing.two,
  },
  week: {
    flexDirection: 'row',
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
  weekDag: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  bolletje: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: WIT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radii.button,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  vos: {
    width: 140,
    height: 140,
    marginLeft: -Spacing.two,
  },
});
