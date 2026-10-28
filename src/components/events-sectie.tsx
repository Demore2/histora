import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSyncExternalStore } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnimatedPressable } from '@/components/animated-pressable';
import { HorizontaleRij } from '@/components/horizontale-rij';
import { SectieKop } from '@/components/sectie-kop';
import { ThemedText } from '@/components/themed-text';
import { Radii, Spacing } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import { bepaalEvents, isNieuw, type EventStand } from '@/content/queries';
import { useTheme } from '@/hooks/use-theme';
import { useVandaag } from '@/hooks/use-vandaag';
import { useVertaling } from '@/hooks/use-vertaling';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * De events op Home (2026-10-28, wens van de eigenaar): gebeurtenissen (`soort: 'gebeurtenis'`)
 * staan niet meer als halte op de routes van Explore, maar hier, los te lezen en korter dan een
 * biografie. Variant "uitgelicht + rij": bovenaan het nieuwste event dat je nog niet uit hebt, met
 * het scènebeeld; daaronder een smalle rij met de rest, de gelezen met een vinkje.
 *
 * Welk event uitgelicht is rekent `bepaalEvents()` uit; deze sectie toont alleen. Net als de
 * reiskaart wacht hij op de hydratie, anders toont hij vlak na een koude start een gelezen event als
 * ongelezen. Tikken gaat naar het hoofdstukkenoverzicht, waar de poorten staan.
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

const TEGEL_BREEDTE = 132;

export function EventsSectie() {
  const { t } = useVertaling();
  const gehydrateerd = useSyncExternalStore(abonneerOpHydratie, isGehydrateerd, opDeServer);
  const voortgang = useStoryProgressStore((state) => state.progress);
  const uitgelezen = useVoortgangStore((state) => state.completedStories);

  if (!gehydrateerd) return null;
  const { uitgelicht, overige } = bepaalEvents(voortgang, uitgelezen);
  if (!uitgelicht && overige.length === 0) return null;

  return (
    <View style={styles.sectie}>
      <SectieKop titel={t((s) => s.events.kop)} />
      {uitgelicht ? (
        <UitgelichtEvent stand={uitgelicht} />
      ) : (
        <ThemedText themeColor="textSecondary" style={styles.allesGelezen}>
          {t((s) => s.events.allesGelezen)}
        </ThemedText>
      )}
      {overige.length > 0 ? (
        <HorizontaleRij
          data={overige}
          keyExtractor={(stand) => stand.verhaal.id}
          itemBreedte={TEGEL_BREEDTE}
          contentContainerStyle={styles.rij}
          renderItem={({ item }) => <EventTegel stand={item} />}
        />
      ) : null}
    </View>
  );
}

function UitgelichtEvent({ stand }: { stand: EventStand }) {
  const theme = useTheme();
  const router = useRouter();
  const { t, v } = useVertaling();
  const vandaag = useVandaag();
  const { verhaal, afgerond } = stand;
  const totaal = verhaal.chapters.length;
  const beeld = verhaal.chapters[Math.min(afgerond, totaal - 1)]?.afbeelding ?? verhaal.afbeelding;
  const kleur = getTijdperk(verhaal.tijdperkId)?.kleur ?? theme.accent;

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/verhaal/[id]', params: { id: verhaal.id } })}
      style={[styles.kaart, { backgroundColor: verhaal.portretKleur }]}>
      {beeld ? <Image source={beeld} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} /> : null}
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />

      <View style={styles.inhoud}>
        <ThemedText type="caption" style={styles.kop}>
          {isNieuw(verhaal, vandaag) ? t((s) => s.events.nieuw) : t((s) => s.events.uitgelicht)}
        </ThemedText>
        <ThemedText type="title" style={styles.wit}>
          {v(verhaal.titel)}
        </ThemedText>
        <ThemedText type="small" style={styles.zacht} numberOfLines={2}>
          {v(verhaal.teaser)}
        </ThemedText>
        {afgerond > 0 ? (
          <View style={styles.balk}>
            <View style={[styles.balkVulling, { width: `${(afgerond / totaal) * 100}%` }]} />
          </View>
        ) : null}
        <View style={styles.voet}>
          <View style={[styles.knop, { backgroundColor: kleur }]}>
            <ThemedText type="smallBold" style={styles.wit}>
              {afgerond > 0 ? t((s) => s.events.verderKnop) : t((s) => s.events.leesKnop)}
            </ThemedText>
          </View>
          <ThemedText type="caption" style={styles.zacht}>
            {afgerond > 0
              ? t((s) => s.reis.hoofdstukVan)(afgerond + 1, totaal)
              : `${verhaal.periodeLabel} · ${t((s) => s.verhaal.minLeestijd)(verhaal.leestijdMinuten)}`}
          </ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

function EventTegel({ stand }: { stand: EventStand }) {
  const router = useRouter();
  const { v } = useVertaling();
  const { verhaal, uit } = stand;
  const beeld = verhaal.chapters[0]?.afbeelding ?? verhaal.afbeelding;

  return (
    <AnimatedPressable
      onPress={() => router.push({ pathname: '/verhaal/[id]', params: { id: verhaal.id } })}
      style={[styles.tegel, { backgroundColor: verhaal.portretKleur }]}>
      {beeld ? <Image source={beeld} style={StyleSheet.absoluteFill} contentFit="cover" /> : null}
      <View style={[StyleSheet.absoluteFill, styles.scrim]} />
      {uit ? (
        <View style={styles.vinkje}>
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
        </View>
      ) : null}
      <View style={styles.tegelTekst}>
        <ThemedText type="caption" style={styles.zacht}>
          {verhaal.periodeLabel}
        </ThemedText>
        <ThemedText type="smallBold" style={styles.wit} numberOfLines={2}>
          {v(verhaal.titel)}
        </ThemedText>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  sectie: {
    gap: Spacing.three,
  },
  allesGelezen: {
    paddingHorizontal: Spacing.four,
  },
  kaart: {
    marginHorizontal: Spacing.four,
    minHeight: 220,
    borderRadius: Radii.card,
    overflow: 'hidden',
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
    marginTop: Spacing.one,
  },
  knop: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radii.button,
  },
  rij: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
  },
  tegel: {
    width: TEGEL_BREEDTE,
    height: 150,
    borderRadius: Radii.card,
    overflow: 'hidden',
  },
  vinkje: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
  },
  tegelTekst: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Spacing.two,
    gap: 2,
  },
});
