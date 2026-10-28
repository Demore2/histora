import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AnimatedPressable } from '@/components/animated-pressable';
import { ThemedText } from '@/components/themed-text';
import { ERA_KOP } from '@/constants/era-koppen';
import { Motion } from '@/constants/motion';
import { Radii, Spacing } from '@/constants/theme';
import { getActieveTijdperken } from '@/constants/tijdperken';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { speelRobotBeurt, type RobotBeurt as Beurt } from '@/lib/robot';
import type { TijdperkId } from '@/lib/trivia';
import { DUEL_KROON_REEKS, type Duel } from '@/store/trivia-store';

const STAP_MS = 1100;

/**
 * Het gezicht van de tegenstander (1.4.5): de zwaaiende Phoxy. Sinds de robot "VS Phoxy" is
 * geworden heet de logica nog `robot` (store, `lib/robot.ts`), maar de lezer ziet overal de vos.
 */
export const PHOXY_TEGENSTANDER = require('@/assets/images/vos/zwaaiend.png');

/** Waar de kop staat in `zwaaiend.png` (1024 px): een vierkant van 320 px vanaf (350, 340). */
const KOP = { links: 350, boven: 340, zijde: 320, bron: 1024 };

/**
 * Alleen Phoxy's kop, in een rondje. Het plaatje heeft veel lege rand en de vos staat er ten voeten
 * uit op, dus `contain` gaf een figuurtje van een paar pixels; hier wordt het vergroot en verschoven
 * tot alleen het vierkant rond de kop in beeld is.
 */
export function PhoxyKop({ maat, achtergrond }: { maat: number; achtergrond: string }) {
  const schaal = maat / KOP.zijde;
  return (
    <View style={{ width: maat, height: maat, borderRadius: maat / 2, overflow: 'hidden', backgroundColor: achtergrond }}>
      <Image
        source={PHOXY_TEGENSTANDER}
        style={{
          width: KOP.bron * schaal,
          height: KOP.bron * schaal,
          marginLeft: -KOP.links * schaal,
          marginTop: -KOP.boven * schaal,
        }}
        contentFit="fill"
        accessible={false}
      />
    </View>
  );
}

/**
 * De beurt van de tegenstander (Phoxy, tot 1.4.5 een robot) in een duel. **De uitkomst wordt bij de tik op "kijk mee" in één keer
 * uitgerekend** (`speelRobotBeurt`, zuiver) en daarna alleen stap voor stap getoond. Een
 * hertekening of een tabwissel onderweg verandert dus niets aan wat de robot deed, en de app hoeft
 * nergens een half gespeelde beurt te bewaren: pas `onKlaar` schrijft het resultaat weg.
 */
export function RobotBeurt({ duel, onKlaar }: { duel: Duel; onKlaar: (beurt: Beurt) => void }) {
  const theme = useTheme();
  const { t, v } = useVertaling();
  const tijdperken = getActieveTijdperken();
  const [beurt, setBeurt] = useState<Beurt | null>(null);
  const [zichtbaar, setZichtbaar] = useState(0);

  useEffect(() => {
    if (!beurt) return;
    const id = setInterval(() => {
      setZichtbaar((n) => (n >= beurt.stappen.length ? n : n + 1));
    }, STAP_MS);
    return () => clearInterval(id);
  }, [beurt]);

  function start() {
    const ids = tijdperken.map((tp) => tp.id as TijdperkId);
    setBeurt(speelRobotBeurt(ids, duel.robot, duel.robotReeks, DUEL_KROON_REEKS));
    setZichtbaar(1);
  }

  const naam = (id: TijdperkId) => {
    const tp = tijdperken.find((x) => x.id === id);
    return tp ? v(tp.titel) : id;
  };
  const klaar = beurt !== null && zichtbaar >= beurt.stappen.length;
  const nieuweKroontjes = beurt ? beurt.kroontjes.length - duel.robot.length : 0;

  return (
    <View style={[styles.paneel, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.kop}>
        <PhoxyKop maat={48} achtergrond={theme.background} />
        <ThemedText type="subtitle">{t((s) => s.explore.robotBeurtTitel)}</ThemedText>
      </View>

      {!beurt ? (
        <AnimatedPressable onPress={start} accessibilityRole="button" style={[styles.knop, { backgroundColor: theme.accent }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            {t((s) => s.explore.robotKijk)}
          </ThemedText>
        </AnimatedPressable>
      ) : (
        <View style={styles.stappen}>
          {beurt.stappen.slice(0, zichtbaar).map((stap, i) => (
            <Animated.View key={i} entering={FadeInDown.duration(Motion.duration.normaal)} style={styles.stap}>
              <Image source={ERA_KOP[stap.tijdperk]} style={styles.stapKop} contentFit="cover" />
              <ThemedText type="small" style={styles.stapTekst}>
                {stap.soort === 'kroon'
                  ? t((s) => s.explore.robotKroonvraag)(naam(stap.tijdperk))
                  : naam(stap.tijdperk)}
              </ThemedText>
              {stap.soort === 'kroon' && stap.goed ? (
                <MaterialCommunityIcons name="crown" size={20} color="#F2C230" />
              ) : (
                <Ionicons
                  name={stap.goed ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={stap.goed ? theme.succes : theme.gevaar}
                />
              )}
            </Animated.View>
          ))}
        </View>
      )}

      {klaar && beurt && (
        <Animated.View entering={FadeInDown.duration(Motion.duration.normaal)} style={styles.einde}>
          <ThemedText type="small" themeColor="textSecondary">
            {nieuweKroontjes > 0
              ? t((s) => s.explore.robotKroonGewonnen)(nieuweKroontjes)
              : t((s) => s.explore.robotGeenKroon)}
          </ThemedText>
          <AnimatedPressable
            onPress={() => onKlaar(beurt)}
            accessibilityRole="button"
            style={[styles.knop, { backgroundColor: theme.accent }]}>
            <ThemedText type="smallBold" style={{ color: theme.background }}>
              {beurt.kroontjes.length >= tijdperken.length ? t((s) => s.explore.verder) : t((s) => s.explore.jouwBeurt)}
            </ThemedText>
          </AnimatedPressable>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  paneel: { gap: Spacing.three, padding: Spacing.four, borderRadius: Radii.card },
  kop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  stappen: { gap: Spacing.two },
  stap: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  stapKop: { width: 32, height: 32, borderRadius: 16 },
  stapTekst: { flex: 1 },
  einde: { gap: Spacing.three },
  knop: { alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.three, borderRadius: Radii.button },
});
