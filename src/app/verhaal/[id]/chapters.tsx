import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { AnimatedPressable } from '@/components/animated-pressable';
import { LegeStaat } from '@/components/lege-staat';
import { OfflineModal } from '@/components/offline-modal';
import { RoutePad, type RouteHalte } from '@/components/route-pad';
import { StoryLimitModal } from '@/components/story-limit-modal';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ANALYTICS_EVENTS } from '@/constants/analytics';
import { DAGELIJKSE_VERHAAL_LIMIET } from '@/constants/monetisatie';
import { Motion } from '@/constants/motion';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { getTijdperk } from '@/constants/tijdperken';
import { berekenLeestijdMinuten } from '@/content/leestijd';
import { getVerhaal } from '@/content/verhalen';
import { haalVerhalenVandaagOp, logVerhaalGeopend } from '@/lib/leeslimiet';
import { useOnlinePoort } from '@/hooks/use-online-poort';
import { useTheme } from '@/hooks/use-theme';
import { useStoryProgress } from '@/hooks/use-story-progress';
import { logStoryEvent } from '@/hooks/useAnalytics';
import { useVertaling } from '@/hooks/use-vertaling';
import { useAbonnementStore, verhalenVanVandaag } from '@/store/abonnement-store';
import { wachtOpSessie } from '@/store/auth-store';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { wachtOpHydratie } from '@/store/sync-hulp';

const ROMEINSE_CIJFERS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

/**
 * Het hoofdstukkenoverzicht van één verhaal: sinds 1.4.3 een routekaart (`RoutePad`, dezelfde als
 * op `tijdperk/[id]`) in plaats van een raster van tegels. Anders dan daar zijn de haltes hier wél
 * een slot: een hoofdstuk gaat pas open als het vorige af is, en een halte op slot verklapt zijn
 * scène nog niet. `HoofdstukTegel` is daarmee orphaned.
 */
export default function ChaptersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const { t, v } = useVertaling();

  const verhaal = getVerhaal(id);
  const progress = useStoryProgress(verhaal?.id ?? '', verhaal?.chapters.length ?? 0);

  // Zonder verhaal is `progressPercentage` een NaN (0/0) — die mag niet in een animatie belanden.
  const voortgangPercentage = Number.isFinite(progress.progressPercentage)
    ? progress.progressPercentage
    : 0;
  const voortgangBreedte = useSharedValue(0);

  useEffect(() => {
    // Start op 0 en loop vol. Dit scherm wordt via `router.push` steeds opnieuw gemonteerd, dus
    // een overgang tussen twee waardes zou je nooit zien; het vollopen bij openen wel.
    voortgangBreedte.set(
      withDelay(
        Motion.duration.normaal,
        withTiming(voortgangPercentage, { duration: Motion.duration.traag })
      )
    );
  }, [voortgangPercentage, voortgangBreedte]);

  const voortgangStijl = useAnimatedStyle(() => ({
    width: `${voortgangBreedte.get()}%` as `${number}%`,
  }));

  // --- Dagelijkse leeslimiet (gratis lezers) ---
  //
  // Dit scherm is de trechter waar élke route naar een verhaal doorheen komt (`verhaal/[id].tsx`
  // stuurt hierheen door), dus hier wordt geteld en hier wordt tegengehouden. In de reader zou het
  // te laat zijn: dan staat de lezer al in hoofdstuk één.
  const [limietBereikt, setLimietBereikt] = useState(false);
  // Gratis lezen kan alleen online (zie `useOnlinePoort`). Hier én in de reader: dit scherm is de
  // trechter, de reader vangt een deeplink rechtstreeks naar een hoofdstuk.
  const { geblokkeerd: offlineGeblokkeerd, opnieuwProberen } = useOnlinePoort();
  const verhaalId = verhaal?.id;
  const tijdperkId = verhaal?.tijdperkId;
  const aantalHoofdstukken = verhaal?.chapters.length ?? 0;

  useEffect(() => {
    if (!verhaalId) return;
    let afgebroken = false;

    // Eerst wachten tot beide stores uit AsyncStorage gelezen zijn. Zonder die garantie kijken we
    // vlak na een koude start naar lege beginwaarden: een uitgelezen verhaal lijkt dan ongelezen,
    // en de teller van vandaag lijkt op nul te staan.
    Promise.all([
      wachtOpHydratie(useStoryProgressStore),
      wachtOpHydratie(useAbonnementStore),
    ]).then(async () => {
      if (afgebroken) return;

      // Een verhaal dat je al helemaal uit hebt kost geen plek: de limiet doseert nieuwe inhoud,
      // hij zet je eigen boekenkast niet op slot. Zonder deze regel kun je met de teller vol geen
      // hoofdstuk teruglezen dat je gisteren al las.
      const gelezen = useStoryProgressStore.getState().getChapterProgress(verhaalId);
      const isUitgelezen =
        aantalHoofdstukken > 0 && gelezen.completedChapters.length >= aantalHoofdstukken;
      // Dit effect is ook de plek waar het openen geteld wordt (Firebase). Niet in
      // `verhaal/[id].tsx`: dat is een omleiding die een deeplink rechtstreeks naar dit scherm
      // overslaat, en dan zou de bovenkant van de trechter systematisch te laag uitvallen.
      const meting = { story_id: verhaalId, era: tijdperkId, chapter_count: aantalHoofdstukken };

      if (isUitgelezen) {
        setLimietBereikt(false);
        logStoryEvent(ANALYTICS_EVENTS.STORY_READ, { ...meting, is_reread: true });
        return;
      }

      // Wat de server voor vandaag kent erbij leggen, vóór de poort. De teller staat in
      // AsyncStorage en hoort dus bij dit toestel, terwijl de limiet bij het account hoort —
      // zonder deze ronde krijgt een tweede telefoon zijn eigen dagvoorraad.
      //
      // De opvraging heeft een eigen tijdslimiet en `null` betekent "de server weet het even
      // niet". Dan telt de lokale stand, want een leeslimiet die dichtklapt zodra het netwerk
      // wegvalt is erger dan een limiet die een keer te ruim uitpakt.
      // `wachtOpSessie()` en niet `getState().user?.id`: bij een koude start of een deeplink
      // rechtstreeks in een verhaal herstelt `AuthPoort` de sessie nog terwijl dit effect al
      // loopt. Dan leest een directe uitlezing `null`, wordt er niets naar `user_daily_reads`
      // geschreven en blijft de serverronde uit — precies de koude start die daardoor een gratis
      // extra verhaal zou opleveren.
      const userId = await wachtOpSessie();
      if (afgebroken) return;
      if (userId) {
        const server = await haalVerhalenVandaagOp(userId);
        if (afgebroken) return;
        if (server) {
          useAbonnementStore
            .getState()
            .voegServerVerhalenSamen(server.dagSleutel, server.verhaalIds);
        }
      }

      const abonnement = useAbonnementStore.getState();
      if (abonnement.magVerhaalOpenen(verhaalId)) {
        const wasAlGeteld = verhalenVanVandaag(abonnement).includes(verhaalId);
        abonnement.registreerVerhaalGeopend(verhaalId);
        // Alleen de eerste keer vandaag een rij schrijven. `registreerVerhaalGeopend` is idempotent
        // binnen de dag, maar de tabel is een append-only logboek zonder unique constraint: elke
        // terugkeer uit de reader (`router.back()`) zou anders een rij bijschrijven.
        if (userId && !wasAlGeteld) logVerhaalGeopend(userId, verhaalId);
        setLimietBereikt(false);
        logStoryEvent(ANALYTICS_EVENTS.STORY_READ, { ...meting, is_reread: false });
        return;
      }
      setLimietBereikt(true);
      // Het directe signaal voor het gratis/Pro-model: hoe vaak loopt een lezer tegen de muur,
      // en bij welk verhaal? Dat is niet af te leiden uit `story_read`, want die blijft hier
      // juist uit.
      logStoryEvent(ANALYTICS_EVENTS.LIMIT_REACHED, {
        ...meting,
        daily_limit: DAGELIJKSE_VERHAAL_LIMIET,
      });
    });

    return () => {
      afgebroken = true;
    };
  }, [verhaalId, tijdperkId, aantalHoofdstukken]);

  if (!verhaal) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: t((s) => s.verhaal.nietGevondenTitel) }} />
        <LegeStaat
          titel={t((s) => s.verhaal.nietGevondenTitel)}
          beschrijving={t((s) => s.verhaal.nietGevondenBeschrijving)}
        />
      </ThemedView>
    );
  }

  const tijdperk = getTijdperk(verhaal.tijdperkId);
  const routeKleur = tijdperk?.kleur ?? theme.accent;

  // Het eerste hoofdstuk dat open staat maar nog niet af is — daar was de lezer gebleven.
  const volgendHoofdstukId = verhaal.chapters.find(
    (chapter) => progress.isChapterUnlocked(chapter.id) && !progress.isChapterCompleted(chapter.id)
  )?.id;

  const volgendeIndex = verhaal.chapters.findIndex((chapter) => chapter.id === volgendHoofdstukId);

  const haltes: RouteHalte[] = verhaal.chapters.map((chapter) => {
    const open = progress.isChapterUnlocked(chapter.id);
    const metBeeld = open && chapter.afbeelding !== undefined;
    const cijfer = ROMEINSE_CIJFERS[chapter.id - 1] ?? String(chapter.id);
    return {
      sleutel: String(chapter.id),
      af: progress.isChapterCompleted(chapter.id),
      actief: false,
      achtergrond: open ? theme.backgroundElement : theme.inactive,
      afbeelding: metBeeld ? chapter.afbeelding : undefined,
      overlay: open ? (
        <>
          {/* Sluier over de scène: zonder deze laag valt het cijfer weg zodra de scène toevallig
              licht is (Pompeii's aswolken zijn bijna wit). */}
          {metBeeld ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: withAlpha('#000000', 0.4) }]} />
          ) : null}
          <ThemedText type="title" style={{ color: metBeeld ? '#FFFFFF' : theme.text }}>
            {cijfer}
          </ThemedText>
        </>
      ) : (
        <Ionicons name="lock-closed" size={22} color={theme.textSecondary} />
      ),
      titel: v(chapter.titel),
      onder: t((s) => s.hoofdstuk.halteOnder)(chapter.id, berekenLeestijdMinuten(chapter.blokken, v)),
      onPress: open ? () => handleChapterPress(chapter.id) : undefined,
    };
  });

  const knopTekst =
    volgendHoofdstukId === undefined
      ? t((s) => s.hoofdstuk.routeKlaar)
      : progress.completedChapters.length === 0
        ? t((s) => s.hoofdstuk.routeBegin)
        : t((s) => s.hoofdstuk.routeVerder)(volgendHoofdstukId);

  function handleChapterPress(chapterId: number) {
    // Vangnet: de melding ligt over het scherm, dus hier komt normaal geen tik doorheen.
    if (limietBereikt || offlineGeblokkeerd) return;
    if (progress.isChapterUnlocked(chapterId)) {
      router.push({
        pathname: '/verhaal/[id]/reader',
        params: { id: verhaal!.id, chapterId: String(chapterId) },
      });
    }
  }

  /**
   * Terug naar Home. Bewust géén `router.push('/')`: dit scherm wordt zelf met `push` geopend, dus
   * pushen legt een tweede Home *bovenop* het hoofdstukoverzicht in plaats van ernaartoe terug te
   * gaan. De stapel groeit dan Home → hoofdstukken → Home → hoofdstukken → … en elk scherm dat
   * eronder blijft staan houdt zijn scèneafbeeldingen in het geheugen. Tien keer heen en weer
   * kostte zo ruim een gigabyte. Poppen hoort hier; `replace` is het vangnet voor een deeplink
   * rechtstreeks naar dit scherm, waar er niets is om naar terug te gaan.
   */
  function handleHome() {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace('/');
  }

  /**
   * "Tot morgen" sluit niet alleen het venster maar verlaat ook het verhaal — anders kijk je naar
   * een hoofdstukoverzicht dat je niet mag openen, en dat leest als een kapotte app in plaats van
   * als een limiet.
   */
  function handleLimietSluiten() {
    setLimietBereikt(false);
    handleHome();
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.headerBar}>
        <AnimatedPressable
          onPress={handleHome}
          style={[styles.homeButton, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="smallBold">{t((s) => s.tabs.ontdek)}</ThemedText>
        </AnimatedPressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="display">{v(verhaal.titel)}</ThemedText>
        <ThemedText themeColor="textSecondary">{v(verhaal.ondertitel)}</ThemedText>

        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                { backgroundColor: routeKleur },
                voortgangStijl,
              ]}
            />
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {t((s) => s.hoofdstuk.voortgang)(progress.completedChapters.length, verhaal.chapters.length)}
          </ThemedText>
        </View>

        {volgendHoofdstukId === undefined ? (
          <View style={[styles.cta, { backgroundColor: theme.backgroundElement }]}>
            <Ionicons name="trophy" size={18} color={routeKleur} />
            <ThemedText type="smallBold">{knopTekst}</ThemedText>
          </View>
        ) : (
          <AnimatedPressable
            onPress={() => handleChapterPress(volgendHoofdstukId)}
            style={[styles.cta, { backgroundColor: routeKleur }]}>
            <ThemedText type="smallBold" style={{ color: '#FFFFFF' }}>
              {knopTekst}
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </AnimatedPressable>
        )}

        <RoutePad
          haltes={haltes}
          volgende={volgendeIndex === -1 ? null : volgendeIndex}
          kleur={routeKleur}
          volgendeLabel={t((s) => s.reis.halteVolgende)}
        />

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={theme.accent} />
          <ThemedText type="small" style={styles.infoText}>
            {t((s) => s.hoofdstuk.volgordeUitleg)}
          </ThemedText>
        </View>
      </ScrollView>

      <StoryLimitModal visible={limietBereikt} onClose={handleLimietSluiten} />
      {/* Nooit twee vensters tegelijk: de limiet is het definitievere antwoord. */}
      <OfflineModal
        visible={offlineGeblokkeerd && !limietBereikt}
        onOpnieuw={opnieuwProberen}
        onTerug={handleHome}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.three,
    flexDirection: 'row',
  },
  homeButton: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Radii.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.four,
    gap: Spacing.three,
    paddingBottom: Spacing.six,
    // Zie MAX_LEESBREEDTE: houdt de route op een breed scherm bij elkaar in plaats van de haltes
    // zeshonderd punten uit elkaar te trekken.
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
  },
  progressSection: {
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  cta: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
    marginTop: Spacing.three,
  },
  infoBox: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radii.card,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'flex-start',
    marginTop: Spacing.three,
  },
  infoText: {
    flex: 1,
  },
});
