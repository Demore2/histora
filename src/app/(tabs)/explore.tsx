import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { KopActies } from '@/components/kop-acties';
import { NieuwVerhaalKaart } from '@/components/nieuw-verhaal-kaart';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TijdperkTegel } from '@/components/tijdperk-tegel';
import { Spacing } from '@/constants/theme';
import { getActieveTijdperken } from '@/constants/tijdperken';
import { getNieuweVerhalen } from '@/content/queries';
import { useVandaag } from '@/hooks/use-vandaag';
import { useVertaling } from '@/hooks/use-vertaling';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * Explore (1.4.5): de tijdperken, één `TijdperkTegel` per tijdperk onder elkaar. Tikken opent de
 * routekaart (`tijdperk/[id]`).
 *
 * Tot 1.4.4 stonden deze tegels op Home en was dit tabblad de trivia. Wens van de eigenaar: Home
 * gaat over wat je nú doet (streak, de reis, verder lezen), Explore over bladeren. De trivia staat
 * sindsdien op een eigen scherm (`src/app/trivia.tsx`), alleen bereikbaar via de kaart op Home.
 */
export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useVertaling();
  const vandaag = useVandaag();
  const uitgelezen = useVoortgangStore((state) => state.completedStories);
  const nieuwVerhaal = getNieuweVerhalen(vandaag).find((verhaal) => !uitgelezen.has(verhaal.id)) ?? null;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>
              {t((s) => s.tabs.explore)}
            </ThemedText>
            <KopActies />
          </View>

          {/* Eén kaart voor het nieuwste verhaal van deze week dat je nog niet uit hebt (1.4.5: was
              op Home, hooguit twee). De rest herken je aan het labeltje "New" op de tegel. */}
          {nieuwVerhaal ? <NieuwVerhaalKaart verhaal={nieuwVerhaal} /> : null}

          {getActieveTijdperken().map((tijdperk) => (
            <TijdperkTegel key={tijdperk.id} tijdperk={tijdperk} />
          ))}
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
    gap: Spacing.four,
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
});
