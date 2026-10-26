import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AchievementsGrid } from '@/components/achievements-grid';
import { KopActies } from '@/components/kop-acties';
import { KroontjesBlok } from '@/components/kroontjes-blok';
import { EraProgressBars } from '@/components/era-progress-bars';
import { StreakKaart } from '@/components/streak-kaart';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useStreak } from '@/hooks/use-streak';
import { useVertaling } from '@/hooks/use-vertaling';

/**
 * Voortgang, in drie lagen: waar je staat, waar je aan werkt, wat je hebt verdiend.
 *
 * **Sinds 1.3 staat bovenaan de streak-kaart met de vos** (`StreakKaart`), met dezelfde fases als
 * de widget. De vier tellers die hier stonden (`ProgressStatsHeader`, nu orphaned) zijn eruit: drie
 * ervan staan ook op Profiel. Daarvóór was de streakkaart opgegaan in die vier tellers. Wat daaruit is meegenomen is de **lege stand als uitnodiging**: bij een streak van nul
 * staat er niet "0 dagen" met een uitleg over hoe je hem behoudt, maar een regel die zegt wat je
 * moet doen om er een te beginnen (LAUNCH-PLAN.md B6).
 *
 * De streak zelf komt overal op dit scherm via `useStreak()` en nooit via `state.streakDagen`:
 * die laatste verandert alleen bij een leesactie en weet niet dat er sindsdien dagen voorbij zijn.
 */
export default function VoortgangScreen() {
  const { t } = useVertaling();
  const streakDagen = useStreak();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>
              {t((s) => s.voortgang.titel)}
            </ThemedText>
            <KopActies />
          </View>

          <View style={styles.statsBlok}>
            <StreakKaart />
            <ThemedText type="small" themeColor="textSecondary" style={styles.streakRegel}>
              {streakDagen > 0
                ? t((s) => s.voortgang.streakBeschrijving)
                : t((s) => s.voortgang.streakLeegBeschrijving)}
            </ThemedText>
          </View>

          <KroontjesBlok />

          <EraProgressBars />

          <AchievementsGrid />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.six,
    gap: Spacing.five,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  kopTitel: {
    flexShrink: 1,
  },
  statsBlok: {
    gap: Spacing.two,
  },
  streakRegel: {
    paddingHorizontal: Spacing.four,
  },
});
