import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/ad-banner';
import { CollectieKaart } from '@/components/collectie-kaart';
import { EventsSectie } from '@/components/events-sectie';
import { HorizontaleRij } from '@/components/horizontale-rij';
import { KopActies } from '@/components/kop-acties';
import { LegeStaat } from '@/components/lege-staat';
import { OppakKaart } from '@/components/oppak-kaart';
import { ReisKaart } from '@/components/reis-kaart';
import { SectieKop } from '@/components/sectie-kop';
import { StreakKaart } from '@/components/streak-kaart';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TriviaKaart } from '@/components/trivia-kaart';
import { CardDimensions, Spacing } from '@/constants/theme';
import { collecties } from '@/content/collecties';
import { bepaalOppakken, bepaalReis } from '@/content/queries';
import { verhalen as allVerhalen } from '@/content/verhalen';
import { useVertaling } from '@/hooks/use-vertaling';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

const SHOW_STORYLINES = false;

export default function OntdekScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useVertaling();
  const completedStories = useVoortgangStore((state) => state.completedStories);

  const voortgang = useStoryProgressStore((state) => state.progress);
  // De reiskaart is chronologisch; een verhaal dat je daarbuiten bent begonnen krijgt eronder een
  // eigen tegel (1.4.4). Die vervangt de rij "Continue reading".
  const reis = bepaalReis(voortgang, completedStories);
  const reisVerhaalId = reis.soort === 'klaar' ? null : reis.verhaal.id;
  const oppakken = bepaalOppakken(voortgang, completedStories, reisVerhaalId);

  if (allVerhalen.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>{t((s) => s.tabs.ontdek)}</ThemedText>
              <View style={styles.kopRechts}>
                <KopActies />
              </View>
            </View>
            <LegeStaat
              icoonNaam="book-outline"
              titel={t((s) => s.ontdek.geenVerhalenTitel)}
              beschrijving={t((s) => s.ontdek.geenVerhalenTekst)}
            />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }


  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>{t((s) => s.tabs.ontdek)}</ThemedText>
            <View style={styles.kopRechts}>
              {/* Saldo, feedback en instellingen: op elk hoofdscherm rechtsboven (1.3). */}
              <KopActies />
            </View>
          </View>

          {/* De streak bovenaan (1.4.5, wens van de eigenaar): de vos, het getal en de week. Stond op
              Progress, dat tabblad is opgeheven. Vervangt ook het vlammetje dat hier in de kop stond. */}
          <StreakKaart />

          {/*
            De reiskaart (1.4.2) vervangt de redactionele hero en "Recommended for you": één kaart met
            één actie — beginnen bij Rome, verder waar je was, of de volgende halte op de tijdlijn.
          */}
          <ReisKaart />

          {/* De enige ingang naar de trivia tegen Phoxy (1.4.5); direct onder de reis (wens van de eigenaar). */}
          <TriviaKaart />

          {oppakken ? <OppakKaart verhaal={oppakken.verhaal} afgerond={oppakken.afgerond} /> : null}

          {/* Losse events (2026-10-28): één uitgelicht, de rest als rij. Ze staan niet op de reis. */}
          <EventsSectie />

          {/* De kaart "New story" staat sinds 1.4.5 op Explore, en nog maar één (wens van de eigenaar). */}

          {/* De banner (v1.2) staat onder de reiskaart, de oppak-tegel en een eventuele nieuw-kaart.
              Rendert niets voor Pro of zolang er geen echte advertentie
              geladen is, dan sluit de `gap` gewoon aan. */}
          <AdBanner />

          {SHOW_STORYLINES && (
            <View style={styles.sectie}>
              <SectieKop titel={t((s) => s.ontdek.verhaallijnen)} />
              <HorizontaleRij
                data={collecties}
                keyExtractor={(collectie) => collectie.id}
                itemBreedte={CardDimensions.portraitWidth}
                contentContainerStyle={styles.rij}
                renderItem={({ item }) => (
                  <CollectieKaart
                    collectie={item}
                    onPress={() => router.push({ pathname: '/collectie/[id]', params: { id: item.id } })}
                  />
                )}
              />
            </View>
          )}

          {/* De tijdperktegels stonden hier tot 1.4.4; ze staan nu op Explore. */}
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
  kopRechts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  sectie: {
    gap: Spacing.three,
  },
  rij: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
