import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import type { Verhaal } from '@/constants/types';
import { bepaalReis } from '@/content/queries';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * De reiskaart bovenaan Home (1.4.2): één kaart, één actie. Vervangt de redactionele hero
 * ("Featured: Julius Caesar"), de kaart "Recommended for you" en de rij "Continue reading".
 *
 * De verhalen vormen samen één tijdlijn, van de stichting van Rome tot vandaag (`getTijdlijn()`).
 * Een nieuwe lezer begint bij het eerste verhaal, een lezer die halverwege is gaat verder waar hij
 * was, en wie een verhaal uit heeft krijgt het volgende op de tijdlijn. Welke van die drie het is
 * rekent `bepaalReis()` uit; deze kaart toont alleen.
 *
 * **Eerst wachten op de hydratie** van beide stores, zelfde reden als bij de oude
 * `RecommendedStoryCard`: vlak na een koude start is de voortgang nog leeg, en dan zou een lezer
 * met tien gelezen verhalen een tel lang "Your journey starts here" zien.
 *
 * Tikken gaat naar het hoofdstukkenoverzicht en niet rechtstreeks de reader in: daar staan de
 * poorten (online, daglimiet), en de tegel van het volgende hoofdstuk pulseert er al.
 */

function abonneerOpHydratie(herteken: () => void): () => void {
  const stopVoortgang = useStoryProgressStore.persist.onFinishHydration(herteken);
  const stopVerhalen = useVoortgangStore.persist.onFinishHydration(herteken);
  return () => {
    stopVoortgang();
    stopVerhalen();
  };
}

function isGehydrateerd(): boolean {
  return useStoryProgressStore.persist.hasHydrated() && useVoortgangStore.persist.hasHydrated();
}

function opDeServer(): boolean {
  return false;
}

/** Het scènebeeld van het hoofdstuk waar de lezer zal beginnen. */
function sceneVoor(verhaal: Verhaal, hoofdstukIndex: number) {
  return verhaal.chapters[Math.min(hoofdstukIndex, verhaal.chapters.length - 1)]?.afbeelding ?? verhaal.afbeelding;
}

export function ReisKaart() {
  const theme = useTheme();
  const router = useRouter();
  const { t, v } = useVertaling();

  const gehydrateerd = useSyncExternalStore(abonneerOpHydratie, isGehydrateerd, opDeServer);
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);

  if (!gehydrateerd) {
    return <View style={[styles.kaart, { backgroundColor: theme.backgroundElement }]} />;
  }

  const stand = bepaalReis(voortgang, uitgelezen);

  if (stand.soort === 'klaar') {
    return (
      <View style={[styles.kaart, styles.klaar, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="caption" themeColor="accent">
          {t((s) => s.reis.klaarKop)}
        </ThemedText>
        <ThemedText type="subtitle">{t((s) => s.reis.klaarTitel)}</ThemedText>
        <ThemedText themeColor="textSecondary">{t((s) => s.reis.klaarTekst)}</ThemedText>
        <AnimatedPressable
          onPress={() => router.push('/trivia')}
          style={[styles.knop, { backgroundColor: theme.accent }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            {t((s) => s.reis.klaarKnop)}
          </ThemedText>
        </AnimatedPressable>
      </View>
    );
  }

  const { verhaal } = stand;
  const tijdperk = getTijdperk(verhaal.tijdperkId);
  const beeld = sceneVoor(verhaal, stand.soort === 'verder' ? stand.afgerond : 0);
  const totaalHoofdstukken = verhaal.chapters.length;

  const kop =
    stand.soort === 'begin'
      ? t((s) => s.reis.beginKop)
      : stand.soort === 'verder'
        ? t((s) => s.reis.verderKop)
        : t((s) => s.reis.volgendeKop);
  const titel = stand.soort === 'begin' ? t((s) => s.reis.beginTitel) : v(verhaal.titel);
  const knop =
    stand.soort === 'begin'
      ? t((s) => s.reis.beginKnop)
      : stand.soort === 'verder'
        ? t((s) => s.reis.verderKnop)
        : t((s) => s.reis.volgendeKnop);

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/verhaal/[id]', params: { id: verhaal.id } })}
      style={[styles.kaart, { backgroundColor: theme.backgroundElement }]}>
      {beeld ? <Image source={beeld} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} /> : null}
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />

      <View style={styles.inhoud}>
        <ThemedText type="caption" style={styles.kop}>
          {kop}
        </ThemedText>
        <ThemedText type="title" style={styles.wit}>
          {titel}
        </ThemedText>
        <ThemedText type="small" style={styles.zacht}>
          {stand.soort === 'begin'
            ? t((s) => s.reis.beginTekst)(v(verhaal.titel))
            : stand.soort === 'verder'
              ? t((s) => s.reis.hoofdstukVan)(stand.afgerond + 1, totaalHoofdstukken)
              : `${tijdperk ? v(tijdperk.titel) : ''} · ${verhaal.periodeLabel}`}
        </ThemedText>

        {stand.soort === 'verder' ? (
          <View style={styles.balk}>
            <View style={[styles.balkVulling, { width: `${(stand.afgerond / totaalHoofdstukken) * 100}%` }]} />
          </View>
        ) : null}

        <View style={styles.voet}>
          <View style={[styles.knop, { backgroundColor: theme.accent }]}>
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              {knop}
            </ThemedText>
          </View>
          <ThemedText type="caption" style={styles.zacht}>
            {t((s) => s.reis.positie)(stand.positie, stand.totaal)}
          </ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  kaart: {
    marginHorizontal: Spacing.four,
    minHeight: 260,
    borderRadius: Radii.card,
    overflow: 'hidden',
  },
  klaar: {
    minHeight: 0,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  scrim: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  inhoud: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.four,
    gap: Spacing.two,
  },
  kop: {
    color: '#FFFFFF',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  wit: {
    color: '#FFFFFF',
  },
  zacht: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  balk: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  balkVulling: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  voet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  knop: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radii.button,
  },
});
