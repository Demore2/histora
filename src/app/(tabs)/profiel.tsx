import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AchievementsGrid } from '@/components/achievements-grid';
import { AdBanner } from '@/components/ad-banner';
import { KopActies } from '@/components/kop-acties';
import { KroontjesBlok } from '@/components/kroontjes-blok';
import { ProAccessBanner } from '@/components/pro-access-banner';
import { ProfileCharacterCollection } from '@/components/profile-character-collection';
import { ProfileHeader } from '@/components/profile-header';
import { ProfileStats } from '@/components/profile-stats';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';

/**
 * Profiel: wie je bent, wat je hebt gelezen en wie je hebt vrijgespeeld.
 *
 * **De instellingen staan hier niet meer.** Thema, taal, de dagelijkse herinnering, het
 * privacybeleid, de synchronisatiestatus en uitloggen zijn verhuisd naar `/profiel/settings` —
 * dit scherm gaat over voortgang, dat scherm over knoppen. Er is niets weggevallen: elke
 * instelling die hier stond werkt daar precies zo.
 *
 * Dit bestand is bewust `(tabs)/profiel.tsx` gebleven in plaats van `(tabs)/profiel/index.tsx`
 * te worden. Verwijderen kan niet in dit project (zie CLAUDE.md), en zolang het oude bestand
 * blijft bestaan zouden beide dezelfde route `/profiel` opeisen — Expo Router struikelt daarover.
 * De twee nieuwe schermen staan daarom onder `src/app/profiel/` en pushen als stack-scherm over
 * de tabbladen heen, net als `verhaal/[id]`.
 */
export default function ProfielScreen() {
  const theme = useTheme();
  const { t } = useVertaling();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Buiten de ScrollView, zodat feedback en instellingen bereikbaar blijven terwijl je door
            je collectie scrolt (wens van de eigenaar, 1.2.1). De achtergrond is nodig: zonder
            schuift de inhoud zichtbaar onder de icoontjes door. */}
        <View style={[styles.topBalk, { backgroundColor: theme.background }]}>
          <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.titel}>
            {t((s) => s.profiel.titel)}
          </ThemedText>
          {/* Feedback, instellingen en het saldo: hetzelfde kopje als op Home en Voortgang. Het
              spreekwolkje opent een venster in de app (`feedback-modal.tsx`), geen mailprogramma. */}
          <KopActies />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <ProfileHeader />
          <ProfileStats />
          {/* De kroontjes uit de trivia direct onder de tellers (1.4.5, wens van de eigenaar). */}
          <KroontjesBlok />
          <ProfileCharacterCollection />
          {/* Banner onder de collectie (1.4.3, wens van de eigenaar). Rendert niets voor Pro of
              zolang er geen advertentie geladen is. */}
          <View style={styles.advertentie}>
            <AdBanner />
          </View>
          {/* De mijlpalen (1.4.5): verhuisd van Progress, dat geen tabblad meer is.
              Het is `AchievementsGrid` (afgeleid uit de vier tellers, loopt nooit achter op een
              verse ontgrendeling) en níét het oude `PrestatieRaster`, dat hier tot 1.2 stond en
              `prestatie-store` las. Houd het bij één raster: twee rasters van dezelfde veertien
              badges met elk hun eigen teller laten je bij een verschil zoeken welke liegt. */}
          <AchievementsGrid />
        </ScrollView>

        {/* Staat buiten de ScrollView zodat hij blijft plakken. Rendert `null` zodra
            `PRO_BANNER_ENABLED` uit gaat — zie `pro-access-banner.tsx`. */}
        <ProAccessBanner />
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
  advertentie: {
    paddingHorizontal: Spacing.four,
  },
  scrollContent: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
  },
  topBalk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  titel: {
    flex: 1,
  },
});
