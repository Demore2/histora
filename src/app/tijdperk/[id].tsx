import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AdBanner } from '@/components/ad-banner';
import { AnimatedPressable } from '@/components/animated-pressable';
import { LegeStaat } from '@/components/lege-staat';
import { RoutePad } from '@/components/route-pad';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ERA_KOP } from '@/constants/era-koppen';
import { Radii, Spacing } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import { bepaalRoute, isNieuw } from '@/content/queries';
import { useTheme } from '@/hooks/use-theme';
import { useVandaag } from '@/hooks/use-vandaag';
import { useVertaling } from '@/hooks/use-vertaling';
import type { TijdperkId } from '@/lib/trivia';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * De routekaart van één tijdperk (1.4.2): de verhalen als haltes op een pad dat van boven naar
 * beneden zigzagt, in tijdlijnvolgorde (`bepaalRoute`). Was een raster van kaarten. Het pad zelf
 * is `RoutePad`, gedeeld met het hoofdstukkenoverzicht.
 *
 * **Elke halte is vrij aan te klikken** (wens van de eigenaar): de route is een volgorde, geen
 * slot. Personages blijven vrijgespeeld worden door uit te lezen.
 */

export default function TijdperkScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { t, v } = useVertaling();
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);
  const vandaag = useVandaag();

  const tijdperk = getTijdperk(id);

  if (!tijdperk) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: t((s) => s.tijdperkScherm.titel) }} />
        <LegeStaat
          titel={t((s) => s.tijdperkScherm.nietGevondenTitel)}
          beschrijving={t((s) => s.tijdperkScherm.nietGevondenBeschrijving)}
        />
      </ThemedView>
    );
  }

  const { haltes, volgende, uit } = bepaalRoute(tijdperk.id, voortgang, uitgelezen);
  const kop = ERA_KOP[tijdperk.id as TijdperkId];
  const openVerhaal = (verhaalId: string) => router.push({ pathname: '/verhaal/[id]', params: { id: verhaalId } });

  const knopTekst =
    volgende === null
      ? t((s) => s.reis.routeKlaar)
      : uit === 0 && haltes[volgende].stand === 'open'
        ? t((s) => s.reis.routeBegin)
        : t((s) => s.reis.routeVerder);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: '' }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.kop, { backgroundColor: tijdperk.kleur }]}>
          <View style={styles.kopTekst}>
            <ThemedText type="display" style={styles.wit} numberOfLines={2} adjustsFontSizeToFit>
              {v(tijdperk.titel)}
            </ThemedText>
            <ThemedText style={styles.wit}>{v(tijdperk.periode)}</ThemedText>
            <ThemedText type="smallBold" style={styles.wit}>
              {t((s) => s.reis.tijdperkGelezen)(uit, haltes.length)}
            </ThemedText>
          </View>
          {kop ? <Image source={kop} style={styles.kopVos} contentFit="contain" /> : null}
        </View>

        {haltes.length === 0 ? (
          <LegeStaat
            titel={t((s) => s.tijdperkScherm.geenVerhalenTitel)}
            beschrijving={t((s) => s.tijdperkScherm.geenVerhalenBeschrijving)}
          />
        ) : (
          <>
            {volgende === null ? (
              <View style={[styles.cta, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="trophy" size={18} color={tijdperk.kleur} />
                <ThemedText type="smallBold">{knopTekst}</ThemedText>
              </View>
            ) : (
              <AnimatedPressable
                onPress={() => openVerhaal(haltes[volgende].verhaal.id)}
                style={[styles.cta, { backgroundColor: tijdperk.kleur }]}>
                <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
                  {knopTekst}
                </ThemedText>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </AnimatedPressable>
            )}

            <RoutePad
              haltes={haltes.map(({ verhaal, stand, afgerond }) => ({
                sleutel: verhaal.id,
                af: stand === 'uit',
                actief: stand === 'bezig',
                achtergrond: verhaal.portretKleur,
                afbeelding: verhaal.afbeelding,
                titel: v(verhaal.titel),
                onder:
                  stand === 'bezig'
                    ? t((s) => s.reis.halteBezig)(afgerond + 1, verhaal.chapters.length)
                    : verhaal.periodeLabel,
                nieuwLabel: isNieuw(verhaal, vandaag) ? t((s) => s.ontdek.nieuwLabel) : undefined,
                onPress: () => openVerhaal(verhaal.id),
              }))}
              volgende={volgende}
              kleur={tijdperk.kleur}
              volgendeLabel={t((s) => s.reis.halteVolgende)}
            />

            <View style={styles.advertentie}>
              <AdBanner />
            </View>
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: Spacing.six,
    gap: Spacing.four,
  },
  kop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.four,
    paddingTop: Spacing.five,
    gap: Spacing.three,
  },
  kopTekst: {
    flex: 1,
    gap: Spacing.one,
  },
  kopVos: {
    width: 112,
    height: 112,
  },
  wit: {
    color: '#FFFFFF',
  },
  cta: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
  },
  advertentie: {
    paddingHorizontal: Spacing.four,
  },
});
