import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { KopActies } from '@/components/kop-acties';
import { PhoxyLeraar } from '@/components/phoxy-leraar';
import { useProAanbodZichtbaar } from '@/components/pro-access-banner';
import { ProPaywall } from '@/components/pro-paywall';
import { RobotBeurt } from '@/components/robot-beurt';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TriviaVraag } from '@/components/trivia-vraag';
import { TriviaWiel, type WielVak } from '@/components/trivia-wiel';
import { meld } from '@/constants/dialoog';
import { ERA_KOP } from '@/constants/era-koppen';
import { Motion } from '@/constants/motion';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { getActieveTijdperken } from '@/constants/tijdperken';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { toonBeloond } from '@/lib/advertenties';
import {
  haalTriviaStand,
  levenVoorAdvertentie,
  trekVraag,
  TriviaFout,
  type TijdperkId,
  type TriviaStand,
  type TriviaUitslag,
  type TriviaVraag as Vraag,
} from '@/lib/trivia';
import {
  DUEL_KROON_REEKS,
  KROON_MOEILIJKHEID,
  KROON_REEKS,
  useTriviaStore,
  type Modus,
} from '@/store/trivia-store';
import { useAdvertentieStore } from '@/store/advertentie-store';

const GOUD = '#F2C230';

type Fase =
  | { soort: 'wiel' }
  | { soort: 'laden'; tijdperk: TijdperkId; kroon: boolean }
  | { soort: 'vraag'; vraag: Vraag; kroon: boolean; uitslag: TriviaUitslag | null; zin: number }
  | { soort: 'fout'; tijdperk: TijdperkId; kroon: boolean };

/**
 * Explore (1.4.1): trivia met een draaiwiel, één vak per tijdperk, solo of tegen de robot.
 *
 * Het spel: draai, beantwoord de vraag uit het tijdperk waar het wiel stopt. **Goede antwoorden
 * vullen de kroonmeter** (drie in solo, twee in een duel); dan kies je zelf een tijdperk zonder
 * kroontje en krijg je een moeilijkere kroonvraag. Goed = kroontje, alle zes = gewonnen. Een fout
 * laat de meter staan, maar kost een leven en in een duel je beurt (regels: `trivia-store.ts`).
 *
 * **Tegen de robot** wissel je van beurt bij een fout. De beurt van de robot wordt in één keer
 * uitgerekend en stap voor stap getoond (`RobotBeurt`, `lib/robot.ts`), ~60% goed. Wie het eerst
 * zes kroontjes heeft, wint.
 *
 * **Levens staan op de server** (`trivia_levens`): een fout antwoord kost er één, ze komen elke
 * paar uur terug, Pro heeft er onbeperkt. Zonder levens staat het wiel stil en zegt het scherm
 * wanneer het volgende leven komt. Wat hier lokaal staat (kroontjes, meter, score, het duel) is
 * de spelstand en hangt nergens aan.
 *
 * Alleen online: de vragen komen van de server en zitten niet in de bundel.
 */
export default function ExploreScreen() {
  const theme = useTheme();
  const { t, v } = useVertaling();
  const { width } = useWindowDimensions();
  const proAanbod = useProAanbodZichtbaar();
  // "+1 leven voor een advertentie" (1.4.3): alleen als er echt een advertentie klaarstaat, en niet
  // meer nadat de server deze sessie het dagplafond meldde.
  const beloondKlaar = useAdvertentieStore((s) => s.beloondKlaar);
  const [advertentieBezig, setAdvertentieBezig] = useState(false);
  const [advertentiesOp, setAdvertentiesOp] = useState(false);
  const tijdperken = getActieveTijdperken();

  const modus = useTriviaStore((s) => s.modus);
  const setModus = useTriviaStore((s) => s.setModus);
  const soloKroontjes = useTriviaStore((s) => s.kroontjes);
  const soloReeks = useTriviaStore((s) => s.reeks);
  const score = useTriviaStore((s) => s.score);
  const besteScore = useTriviaStore((s) => s.besteScore);
  const duel = useTriviaStore((s) => s.duel);
  const duelsGewonnen = useTriviaStore((s) => s.duelsGewonnen);
  const duelsVerloren = useTriviaStore((s) => s.duelsVerloren);
  const registreerAntwoord = useTriviaStore((s) => s.registreerAntwoord);
  const robotKlaar = useTriviaStore((s) => s.robotKlaar);
  const nieuwSpel = useTriviaStore((s) => s.nieuwSpel);
  const nieuwDuel = useTriviaStore((s) => s.nieuwDuel);

  const isDuel = modus === 'duel';
  const kroontjes = isDuel ? duel.speler : soloKroontjes;
  const reeks = isDuel ? duel.spelerReeks : soloReeks;
  const meter = isDuel ? DUEL_KROON_REEKS : KROON_REEKS;

  // Het wiel is ook het kroonoverzicht: een gewonnen tijdperk krijgt een kroontje op zijn vak.
  const vakken: WielVak[] = tijdperken.map((tp) => ({
    kleur: tp.kleur,
    beeld: ERA_KOP[tp.id as TijdperkId],
    gekroond: kroontjes.includes(tp.id as TijdperkId),
  }));

  const [fase, setFase] = useState<Fase>({ soort: 'wiel' });
  const [stand, setStand] = useState<TriviaStand | null>(null);
  const [nu, setNu] = useState(() => Date.now());
  const [toonPaywall, setToonPaywall] = useState(false);

  // De stand bij elke keer dat het tabblad in beeld komt: levens komen terug terwijl je weg bent.
  useFocusEffect(
    useCallback(() => {
      let actief = true;
      haalTriviaStand()
        .then((s) => actief && setStand(s))
        .catch(() => {});
      return () => {
        actief = false;
      };
    }, [])
  );

  // De klok voor "volgend leven over …". Is het moment voorbij, dan wordt de stand opnieuw
  // opgehaald in plaats van zelf een leven bij te tellen: de server is de bron.
  useEffect(() => {
    const id = setInterval(() => {
      const moment = Date.now();
      setNu(moment);
      if (stand?.volgendeOm && stand.volgendeOm.getTime() <= moment) {
        haalTriviaStand().then(setStand).catch(() => {});
      }
    }, 30_000);
    return () => clearInterval(id);
  }, [stand]);

  const soloGewonnen = !isDuel && soloKroontjes.length >= tijdperken.length;
  const kroonKlaar = reeks >= meter && kroontjes.length < tijdperken.length;
  const robotAanZet = isDuel && duel.beurt === 'robot' && duel.winnaar === null;
  const zonderLevens = stand !== null && !stand.pro && stand.levens <= 0;
  const wielMaat = Math.min(width - Spacing.four * 2, 320);

  /**
   * Advertentie bekijken → pas na `EARNED_REWARD` de server om het leven vragen. De server kent het
   * toe en bewaakt het plafond; wegklikken levert niets op en zegt ook niets.
   */
  async function levenViaAdvertentie() {
    setAdvertentieBezig(true);
    try {
      const verdiend = await toonBeloond();
      if (!verdiend) return;
      setStand(await levenVoorAdvertentie());
    } catch (fout) {
      if (fout instanceof TriviaFout && fout.soort === 'advertentie_limiet') {
        setAdvertentiesOp(true);
        meld(t((s) => s.explore.advertentieLimietTitel), t((s) => s.explore.advertentieLimietTekst), t((s) => s.instellingen.ok));
      } else {
        // `levens_vol` (er kwam intussen vanzelf een terug) of netwerk: de stand opnieuw ophalen
        // laat zien wat er werkelijk is.
        haalTriviaStand().then(setStand).catch(() => {});
      }
    } finally {
      setAdvertentieBezig(false);
    }
  }

  const naamVan = (id: TijdperkId) => {
    const tp = tijdperken.find((x) => x.id === id);
    return tp ? v(tp.titel) : id;
  };
  const kleurVan = (id: TijdperkId) => tijdperken.find((x) => x.id === id)?.kleur ?? theme.accent;

  function wisselModus(nieuw: Modus) {
    if (nieuw === modus || fase.soort === 'laden') return;
    setModus(nieuw);
    setFase({ soort: 'wiel' });
  }

  async function haalVraag(tijdperk: TijdperkId, kroon: boolean) {
    setFase({ soort: 'laden', tijdperk, kroon });
    try {
      const vraag = await trekVraag(tijdperk, useTriviaStore.getState().gezien, kroon ? KROON_MOEILIJKHEID : 1);
      setFase({ soort: 'vraag', vraag, kroon, uitslag: null, zin: 0 });
    } catch (fout) {
      if (fout instanceof TriviaFout && fout.soort === 'geen_levens') {
        haalTriviaStand().then(setStand).catch(() => {});
        setFase({ soort: 'wiel' });
        return;
      }
      setFase({ soort: 'fout', tijdperk, kroon });
    }
  }

  function verwerkUitslag(uitslag: TriviaUitslag) {
    if (fase.soort !== 'vraag') return;
    const zinnen = uitslag.goed ? t((s) => s.interactief.phoxyGoed) : t((s) => s.interactief.phoxyFout);
    setFase({ ...fase, uitslag, zin: Math.floor(Math.random() * zinnen.length) });
    setStand(uitslag.stand);
    registreerAntwoord(fase.vraag.id, uitslag.goed, fase.kroon ? fase.vraag.tijdperkId : null);
  }

  function phoxyTekst(f: Extract<Fase, { soort: 'vraag' }>): string {
    if (!f.uitslag) return t((s) => s.interactief.phoxyVraag);
    if (f.kroon && f.uitslag.goed) return t((s) => s.explore.kroonGewonnen)(naamVan(f.vraag.tijdperkId));
    if (isDuel && !f.uitslag.goed) return t((s) => s.explore.naarRobot);
    const zinnen = f.uitslag.goed ? t((s) => s.interactief.phoxyGoed) : t((s) => s.interactief.phoxyFout);
    return zinnen[f.zin] ?? zinnen[0];
  }

  const toonVerder = fase.soort === 'vraag' && fase.uitslag !== null;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView style={styles.scrollVak} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <ThemedText type="display" numberOfLines={1} adjustsFontSizeToFit style={styles.kopTitel}>
              {t((s) => s.tabs.explore)}
            </ThemedText>
            <KopActies />
          </View>

          <View style={styles.inhoud}>
            <Levens stand={stand} nu={nu} />

            <View style={[styles.modi, { backgroundColor: theme.backgroundElement }]} accessibilityRole="tablist">
              {(['solo', 'duel'] as const).map((m) => (
                <AnimatedPressable
                  key={m}
                  onPress={() => wisselModus(m)}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: modus === m }}
                  style={[styles.modus, modus === m && { backgroundColor: theme.accent }]}>
                  {m === 'duel' && (
                    <MaterialCommunityIcons name="robot-happy" size={16} color={modus === m ? theme.background : theme.text} />
                  )}
                  <ThemedText type="smallBold" style={{ color: modus === m ? theme.background : theme.text }}>
                    {m === 'solo' ? t((s) => s.explore.modusSolo) : t((s) => s.explore.modusDuel)}
                  </ThemedText>
                </AnimatedPressable>
              ))}
            </View>

            {isDuel ? (
              <View style={styles.scorebord}>
                <Speler naam={t((s) => s.explore.jij)} kroontjes={duel.speler} aanZet={duel.beurt === 'speler'} />
                <Speler naam={t((s) => s.explore.robot)} kroontjes={duel.robot} aanZet={duel.beurt === 'robot'} robot />
                <View style={styles.scoreRij}>
                  <ThemedText type="small" themeColor="textSecondary">
                    {t((s) => s.explore.duelStand)(duelsGewonnen, duelsVerloren)}
                  </ThemedText>
                  <Meter reeks={reeks} max={meter} />
                </View>
              </View>
            ) : (
              <View style={styles.scoreRij}>
                <ThemedText type="smallBold">
                  {t((s) => s.explore.score)(score)} · {t((s) => s.explore.kroontjesLabel)(kroontjes.length)}
                </ThemedText>
                <Meter reeks={reeks} max={meter} />
              </View>
            )}

            {/* Een einde pas ná "Verder": de uitleg bij de beslissende vraag moet je eerst nog kunnen lezen. */}
            {isDuel && duel.winnaar && fase.soort === 'wiel' ? (
              <Animated.View entering={ZoomIn.springify()} style={[styles.paneel, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="title" style={styles.midden}>
                  {duel.winnaar === 'speler' ? t((s) => s.explore.duelGewonnenTitel) : t((s) => s.explore.duelVerlorenTitel)}
                </ThemedText>
                <ThemedText style={styles.midden}>{t((s) => s.explore.duelStand)(duelsGewonnen, duelsVerloren)}</ThemedText>
                <Knop tekst={t((s) => s.explore.nieuwDuel)} kleur={theme.accent} onPress={nieuwDuel} />
              </Animated.View>
            ) : soloGewonnen && fase.soort === 'wiel' ? (
              <Animated.View entering={ZoomIn.springify()} style={[styles.paneel, { backgroundColor: theme.backgroundElement }]}>
                <ThemedText type="title" style={styles.midden}>
                  {t((s) => s.explore.gewonnenTitel)}
                </ThemedText>
                <ThemedText style={styles.midden}>{t((s) => s.explore.gewonnenTekst)(score, besteScore)}</ThemedText>
                <Knop tekst={t((s) => s.explore.nieuwSpel)} kleur={theme.accent} onPress={nieuwSpel} />
              </Animated.View>
            ) : fase.soort === 'vraag' ? (
              <View style={styles.vraagBlok}>
                <PhoxyLeraar
                  stand={!fase.uitslag ? 'vraag' : fase.uitslag.goed ? 'goed' : 'fout'}
                  tekst={phoxyTekst(fase)}
                />
                <Animated.View key={fase.vraag.id} entering={FadeIn}>
                  <TriviaVraag
                    vraag={fase.vraag}
                    kleur={kleurVan(fase.vraag.tijdperkId)}
                    kop={
                      fase.kroon
                        ? t((s) => s.explore.kroonvraagKop)(naamVan(fase.vraag.tijdperkId))
                        : naamVan(fase.vraag.tijdperkId)
                    }
                    onUitslag={verwerkUitslag}
                  />
                </Animated.View>
              </View>
            ) : fase.soort === 'laden' ? (
              <View style={styles.wacht}>
                <ActivityIndicator color={kleurVan(fase.tijdperk)} />
                <ThemedText type="small" themeColor="textSecondary">
                  {t((s) => s.explore.laden)(naamVan(fase.tijdperk))}
                </ThemedText>
              </View>
            ) : fase.soort === 'fout' ? (
              <View style={styles.wacht}>
                <ThemedText style={styles.midden}>{t((s) => s.explore.trekMislukt)}</ThemedText>
                <Knop tekst={t((s) => s.explore.opnieuw)} kleur={theme.accent} onPress={() => haalVraag(fase.tijdperk, fase.kroon)} />
              </View>
            ) : robotAanZet ? (
              <RobotBeurt duel={duel} onKlaar={robotKlaar} />
            ) : zonderLevens ? (
              <View style={[styles.paneel, { backgroundColor: theme.backgroundElement }]}>
                <Ionicons name="heart-dislike" size={40} color={theme.gevaar} style={styles.midden} />
                <ThemedText type="subtitle" style={styles.midden}>
                  {t((s) => s.explore.geenLevensTitel)}
                </ThemedText>
                <ThemedText style={styles.midden}>
                  {t((s) => s.explore.geenLevensTekst)(tijdTot(stand?.volgendeOm ?? null, nu, t((s) => s.explore.duur)))}
                </ThemedText>
                {beloondKlaar && !advertentiesOp && (
                  <Knop
                    tekst={advertentieBezig ? t((s) => s.explore.advertentieBezig) : t((s) => s.explore.advertentieKnop)}
                    kleur={theme.gevaar}
                    onPress={() => {
                      if (!advertentieBezig) void levenViaAdvertentie();
                    }}
                  />
                )}
                {proAanbod && <Knop tekst={t((s) => s.explore.proKnop)} kleur={theme.accent} onPress={() => setToonPaywall(true)} />}
              </View>
            ) : kroonKlaar ? (
              <Animated.View entering={ZoomIn.springify()} style={[styles.paneel, { backgroundColor: theme.backgroundElement }]}>
                <MaterialCommunityIcons name="crown" size={44} color={GOUD} style={styles.midden} />
                <ThemedText type="subtitle" style={styles.midden}>
                  {t((s) => s.explore.kroonKlaarTitel)}
                </ThemedText>
                <ThemedText style={styles.midden}>{t((s) => s.explore.kroonKlaarTekst)}</ThemedText>
                <View style={styles.kroonKeuze}>
                  {tijdperken
                    .filter((tp) => !kroontjes.includes(tp.id as TijdperkId))
                    .map((tp) => (
                      <AnimatedPressable
                        key={tp.id}
                        onPress={() => haalVraag(tp.id as TijdperkId, true)}
                        accessibilityRole="button"
                        style={[styles.kroonKnop, { backgroundColor: tp.kleur }]}>
                        <Image source={ERA_KOP[tp.id as TijdperkId]} style={styles.kroonKop} contentFit="cover" />
                        <ThemedText type="smallBold" style={styles.wit}>
                          {v(tp.titel)}
                        </ThemedText>
                      </AnimatedPressable>
                    ))}
                </View>
              </Animated.View>
            ) : (
              <View style={styles.wielBlok}>
                <TriviaWiel
                  vakken={vakken}
                  maat={wielMaat}
                  uitgeschakeld={stand === null}
                  knopTekst={t((s) => s.explore.draai)}
                  onKlaar={(i) => haalVraag(tijdperken[i].id as TijdperkId, false)}
                />
                <ThemedText type="small" themeColor="textSecondary" style={styles.midden}>
                  {isDuel ? t((s) => s.explore.duelUitleg)(meter) : t((s) => s.explore.uitleg)(meter)}
                </ThemedText>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Vast onderaan in plaats van onder de uitleg: dan hoeft niemand ervoor te scrollen. */}
        {toonVerder && (
          <Animated.View entering={FadeInDown.duration(Motion.duration.normaal)} style={[styles.voet, { backgroundColor: theme.background }]}>
            <Knop tekst={t((s) => s.explore.verder)} kleur={theme.accent} onPress={() => setFase({ soort: 'wiel' })} />
          </Animated.View>
        )}
      </SafeAreaView>
      <ProPaywall visible={toonPaywall} onClose={() => setToonPaywall(false)} bron="trivia" />
    </ThemedView>
  );
}

/** "2u 14m" / "14m" — de eenheden komen per taal uit i18n. */
function tijdTot(moment: Date | null, nu: number, duur: (uren: number, minuten: number) => string): string {
  if (!moment) return duur(0, 0);
  const minuten = Math.max(1, Math.ceil((moment.getTime() - nu) / 60_000));
  return duur(Math.floor(minuten / 60), minuten % 60);
}

function Meter({ reeks, max }: { reeks: number; max: number }) {
  const theme = useTheme();
  const { t } = useVertaling();
  return (
    <View style={styles.meter} accessibilityLabel={t((s) => s.explore.meterLabel)(reeks, max)}>
      {Array.from({ length: max }, (_, i) => (
        <View key={i} style={[styles.meterStip, { backgroundColor: i < reeks ? theme.accent : withAlpha(theme.inactive, 0.3) }]} />
      ))}
    </View>
  );
}

/** Eén regel van het duel-scorebord: naam, wie aan zet is, en zes kroontjes in tijdperkkleur. */
function Speler({ naam, kroontjes, aanZet, robot }: { naam: string; kroontjes: TijdperkId[]; aanZet: boolean; robot?: boolean }) {
  const theme = useTheme();
  const tijdperken = getActieveTijdperken();
  return (
    <View style={[styles.speler, { backgroundColor: aanZet ? withAlpha(theme.accent, 0.12) : 'transparent' }]}>
      <View style={styles.spelerNaam}>
        {robot ? (
          <MaterialCommunityIcons name="robot-happy" size={18} color={theme.text} />
        ) : (
          <Ionicons name="person" size={16} color={theme.text} />
        )}
        <ThemedText type="smallBold">{naam}</ThemedText>
      </View>
      <View style={styles.spelerKronen}>
        {tijdperken.map((tp) => {
          const heb = kroontjes.includes(tp.id as TijdperkId);
          return (
            <View key={tp.id} style={[styles.mini, { backgroundColor: heb ? tp.kleur : withAlpha(tp.kleur, 0.18) }]}>
              {heb && <MaterialCommunityIcons name="crown" size={12} color="#FFFFFF" />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Levens({ stand, nu }: { stand: TriviaStand | null; nu: number }) {
  const theme = useTheme();
  const { t } = useVertaling();
  if (!stand) return <View style={styles.levensRij} />;

  if (stand.pro) {
    return (
      <View style={styles.levensRij}>
        <Ionicons name="infinite" size={22} color={theme.gevaar} />
        <ThemedText type="small" themeColor="textSecondary">
          {t((s) => s.explore.onbeperkt)}
        </ThemedText>
      </View>
    );
  }
  return (
    <View style={styles.levensRij} accessibilityLabel={t((s) => s.explore.levensLabel)(stand.levens, stand.maxLevens)}>
      <View style={styles.harten}>
        {Array.from({ length: stand.maxLevens }, (_, i) => (
          <Ionicons key={i} name={i < stand.levens ? 'heart' : 'heart-outline'} size={22} color={theme.gevaar} />
        ))}
      </View>
      {stand.volgendeOm && (
        <ThemedText type="small" themeColor="textSecondary">
          {t((s) => s.explore.volgendLeven)(tijdTot(stand.volgendeOm, nu, t((s) => s.explore.duur)))}
        </ThemedText>
      )}
    </View>
  );
}

function Knop({ tekst, kleur, onPress }: { tekst: string; kleur: string; onPress: () => void }) {
  const theme = useTheme();
  return (
    <AnimatedPressable onPress={onPress} accessibilityRole="button" style={[styles.knop, { backgroundColor: kleur }]}>
      <ThemedText type="smallBold" style={{ color: theme.background }}>
        {tekst}
      </ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  scrollVak: { flex: 1 },
  scroll: { paddingBottom: Spacing.six, gap: Spacing.four },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  kopTitel: { flexShrink: 1 },
  inhoud: {
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  levensRij: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 24 },
  harten: { flexDirection: 'row', gap: Spacing.one },
  modi: { flexDirection: 'row', padding: Spacing.one, borderRadius: Radii.button, gap: Spacing.one },
  modus: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    borderRadius: Radii.button,
  },
  scorebord: { gap: Spacing.two },
  speler: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Radii.button,
  },
  spelerNaam: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  spelerKronen: { flexDirection: 'row', gap: Spacing.one },
  mini: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  scoreRij: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  meter: { flexDirection: 'row', gap: Spacing.one },
  meterStip: { width: 22, height: 8, borderRadius: 4 },
  wielBlok: { gap: Spacing.three, alignItems: 'center' },
  vraagBlok: { gap: Spacing.three },
  wacht: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.six },
  paneel: { gap: Spacing.three, padding: Spacing.four, borderRadius: Radii.card },
  midden: { textAlign: 'center', alignSelf: 'center' },
  kroonKeuze: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, justifyContent: 'center' },
  kroonKnop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Radii.button,
  },
  kroonKop: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.25)' },
  wit: { color: '#FFFFFF' },
  knop: { alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.three, borderRadius: Radii.button },
  voet: {
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
});
