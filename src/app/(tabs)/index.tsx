import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AdBanner } from '@/components/ad-banner';
import { CollectieKaart } from '@/components/collectie-kaart';
import { HorizontaleRij } from '@/components/horizontale-rij';
import { KopActies } from '@/components/kop-acties';
import { LegeStaat } from '@/components/lege-staat';
import { NieuwVerhaalKaart } from '@/components/nieuw-verhaal-kaart';
import { OppakKaart } from '@/components/oppak-kaart';
import { ReisKaart } from '@/components/reis-kaart';
import { SectieKop } from '@/components/sectie-kop';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TijdperkTegel } from '@/components/tijdperk-tegel';
import { CardDimensions, Radii, Spacing, VLAM_KLEUR } from '@/constants/theme';
import { getActieveTijdperken } from '@/constants/tijdperken';
import { collecties } from '@/content/collecties';
import { bepaalOppakken, bepaalReis, getNieuweVerhalen } from '@/content/queries';
import { verhalen as allVerhalen } from '@/content/verhalen';
import { useStreak } from '@/hooks/use-streak';
import { useTheme } from '@/hooks/use-theme';
import { useVandaag } from '@/hooks/use-vandaag';
import { useVertaling } from '@/hooks/use-vertaling';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

const SHOW_STORYLINES = false;

export default function OntdekScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { t } = useVertaling();
  const completedStories = useVoortgangStore((state) => state.completedStories);
  const streakDagen = useStreak();

  const voortgang = useStoryProgressStore((state) => state.progress);
  // De reiskaart is chronologisch; een verhaal dat je daarbuiten bent begonnen krijgt eronder een
  // eigen tegel (1.4.4). Die vervangt de rij "Continue reading".
  const reis = bepaalReis(voortgang, completedStories);
  const reisVerhaalId = reis.soort === 'klaar' ? null : reis.verhaal.id;
  const oppakken = bepaalOppakken(voortgang, completedStories, reisVerhaalId);
  const vandaag = useVandaag();
  // Alleen wat deze week is toegevoegd en nog niet uit is: meestal niets, soms één kaart.
  // Hooguit twee kaarten: komen er meerdere verhalen tegelijk bij, dan wordt Home anders een lijst.
  // De rest is te vinden via het labeltje "New" op de tijdperktegel en de routekaart.
  const nieuweVerhalen = getNieuweVerhalen(vandaag)
    .filter((verhaal) => verhaal.id !== reisVerhaalId && !completedStories.has(verhaal.id))
    .slice(0, 2);

  if (allVerhalen.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]} showsVerticalScrollIndicator={false}>
            <View style={styles.headerRow}>
              <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>{t((s) => s.tabs.ontdek)}</ThemedText>
              <View style={styles.kopRechts}>
                {streakDagen > 0 && (
                  <View style={[styles.streak, { backgroundColor: theme.backgroundElement }]}>
                    <Ionicons name="flame" size={18} color={VLAM_KLEUR} />
                    <ThemedText type="smallBold">{streakDagen}</ThemedText>
                  </View>
                )}
                <KopActies />
              </View>
            </View>
            <LegeStaat
              icoonNaam="book-outline"
              titel="Geen content"
              beschrijving="Er zijn nog geen verhalen beschikbaar."
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
              {/* Geen vlammetje met een 0 ernaast: zonder streak is er niets te tonen (B6). */}
              {streakDagen > 0 && (
                <View style={[styles.streak, { backgroundColor: theme.backgroundElement }]}>
                  <Ionicons name="flame" size={18} color={VLAM_KLEUR} />
                  <ThemedText type="smallBold">{streakDagen}</ThemedText>
                </View>
              )}
              {/* Saldo, feedback en instellingen: op elk hoofdscherm rechtsboven (1.3). */}
              <KopActies />
            </View>
          </View>

          {/*
            De reiskaart (1.4.2) vervangt de redactionele hero en "Recommended for you": één kaart met
            één actie — beginnen bij Rome, verder waar je was, of de volgende halte op de tijdlijn.
          */}
          <ReisKaart />

          {oppakken ? <OppakKaart verhaal={oppakken.verhaal} afgerond={oppakken.afgerond} /> : null}

          {/* "New hot topics" is weg (1.4.3): een kaart per verhaal dat deze week is toegevoegd. */}
          {nieuweVerhalen.map((verhaal) => (
            <NieuwVerhaalKaart key={verhaal.id} verhaal={verhaal} />
          ))}

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

          {/* Eén tegel per tijdperk, onder elkaar (1.4.2): tikken opent de routekaart. */}
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
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radii.button,
  },
  sectie: {
    gap: Spacing.three,
  },
  rij: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
});
