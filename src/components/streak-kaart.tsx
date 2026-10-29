import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Vlam } from '@/components/vlam';
import { Radii, Spacing, withAlpha } from '@/constants/theme';
import { useStreakStand } from '@/hooks/use-streak-stand';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { useAuthStore } from '@/store/auth-store';
import { useWinkelStore } from '@/store/winkel-store';
import { FASE_KLEUR, type StreakFase } from '@/widget/streak-fase';

/**
 * Phoxy naast het wolkje. Grotendeels de 1024-px-versies van de widgetfases, maar overdag de
 * zwaaiende vos (wens van de eigenaar, 1.4.5): de ochtend- en middagvos van de widget kijken
 * bezorgd, en op Home begroet hij je. Vanaf de avond telt de stemming weer mee.
 */
const FASE_BEELD: Record<StreakFase, number> = {
  gevierd: require('@/assets/images/vos/fase-1-gevierd.png'),
  ochtend: require('@/assets/images/vos/zwaaiend.png'),
  middag: require('@/assets/images/vos/zwaaiend.png'),
  avond: require('@/assets/images/vos/fase-4-avond.png'),
  paniek: require('@/assets/images/vos/fase-5-paniek.png'),
  ijs: require('@/assets/images/vos/fase-8-ijs.png'),
  skelet: require('@/assets/images/vos/fase-6-skelet.png'),
  slaap: require('@/assets/images/vos/fase-7-slaap.png'),
};

const WIT = '#FFFFFF';
const WIT_ZACHT = 'rgba(255, 255, 255, 0.82)';
// De PNG's zijn 1024² met de vos onderin: boven 35-40% en opzij ~20% is leeg, en per fase anders
// (de slapende vos is lager). Dus per fase het vak om de vos heen (gemeten op alpha > 20, in px van
// het 1024-beeld); we tonen alleen dat deel, VOS_MAAT hoog, zodat er boven Phoxy niets leeg blijft.
const VOS_MAAT = 156;
const BRON_MAAT = 1024;
const FASE_VAK: Record<StreakFase, { x0: number; y0: number; x1: number; y1: number }> = {
  gevierd: { x0: 197, y0: 360, x1: 827, y1: 1000 },
  ochtend: { x0: 276, y0: 360, x1: 749, y1: 1000 },
  middag: { x0: 276, y0: 360, x1: 749, y1: 1000 },
  avond: { x0: 322, y0: 360, x1: 702, y1: 1000 },
  paniek: { x0: 284, y0: 360, x1: 741, y1: 1000 },
  ijs: { x0: 195, y0: 377, x1: 829, y1: 1000 },
  skelet: { x0: 285, y0: 374, x1: 740, y1: 1000 },
  slaap: { x0: 198, y0: 421, x1: 826, y1: 1000 },
};

function vosMaten(fase: StreakFase) {
  const vak = FASE_VAK[fase];
  const schaal = VOS_MAAT / (vak.y1 - vak.y0);
  return {
    vak: { width: Math.round((vak.x1 - vak.x0) * schaal), height: VOS_MAAT },
    beeld: { width: BRON_MAAT * schaal, height: BRON_MAAT * schaal, left: -vak.x0 * schaal, top: -vak.y0 * schaal },
  };
}

/**
 * De streak bovenaan Home (1.4.5, eerder de kop van Voortgang).
 *
 * Twee lagen, naar het voorbeeld dat de eigenaar aanleverde: een compacte balk in de fasekleur met
 * het vlammetje van de widget, het getal en de week; daaronder Phoxy in de stemming van dit moment
 * met een tekstwolkje. Fase, zin en week komen uit dezelfde functie als de widget
 * (`useStreakStand` → `bepaalStreakStand`), dus het homescreen en de app zeggen nooit iets anders.
 *
 * Bij een streak van nul staat er geen "0": dan valt het getal weg en draagt het wolkje het alleen
 * (LAUNCH-PLAN.md B6). Het chipje met de bevriezers leidt naar de winkel, waar je ze aanvult.
 */
export function StreakKaart() {
  const theme = useTheme();
  const { t } = useVertaling();
  const router = useRouter();
  const stand = useStreakStand();
  const bevriezers = useWinkelStore((s) => s.bevriezers);
  const max = useWinkelStore((s) => s.instellingen.maxBevriezers);
  const kleur = FASE_KLEUR[stand.fase];
  const vos = vosMaten(stand.fase);
  const weekdagen = t((s) => s.widget.weekdagen);
  const wolk = theme.backgroundElement;
  // De naam die de lezer bij het registreren koos: de `profiles`-rij, anders `user_metadata` (zie
  // `profile-header.tsx`). Geen e-mailadres als terugval — "Hey jan.devries@…" leest als een fout.
  const profielNaam = useAuthStore((s) => s.profiel?.username ?? null);
  const metadataNaam = useAuthStore((s) =>
    typeof s.user?.user_metadata?.username === 'string' ? (s.user.user_metadata.username as string) : null,
  );
  const naam = profielNaam?.trim() || metadataNaam?.trim() || null;

  return (
    <View style={styles.blok}>
      <View style={[styles.balk, { backgroundColor: kleur.van }]} accessibilityLabel={t((s) => s.widget.dagen)(stand.dagen)}>
        {stand.dagen > 0 ? (
          <>
            <View style={styles.teller}>
              <Vlam maat={34} hart={kleur.naar} />
              <View>
                <ThemedText type="title" style={styles.getal}>
                  {stand.dagen}
                </ThemedText>
                <ThemedText type="caption" style={{ color: WIT_ZACHT }}>
                  {t((s) => s.widget.dagWoord)(stand.dagen)}
                </ThemedText>
              </View>
            </View>
            <View style={styles.scheiding} />
          </>
        ) : null}

        <View style={styles.week}>
          {stand.week.map((dag, i) => {
            const vandaag = i === stand.vandaagIndex;
            return (
              <View key={i} style={styles.weekDag}>
                <View
                  style={[
                    styles.bolletje,
                    {
                      backgroundColor: dag === 'gelezen' ? WIT : 'transparent',
                      borderColor: vandaag ? WIT : WIT_ZACHT,
                      borderWidth: vandaag ? 2.5 : 1.5,
                    },
                  ]}>
                  {dag === 'gelezen' ? (
                    <ThemedText type="smallBold" style={{ color: kleur.naar }}>
                      ✓
                    </ThemedText>
                  ) : dag === 'bevroren' ? (
                    <ThemedText type="caption">❄️</ThemedText>
                  ) : null}
                </View>
                <ThemedText type={vandaag ? 'smallBold' : 'caption'} style={{ color: vandaag ? WIT : WIT_ZACHT }}>
                  {weekdagen[i]}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.phoxyRij}>
        <View style={[styles.vosVak, vos.vak]}>
          <Image source={FASE_BEELD[stand.fase]} style={[styles.vos, vos.beeld]} contentFit="contain" accessibilityIgnoresInvertColors />
        </View>
        <View style={styles.wolkVak}>
          {/* Statisch, zonder inspring-animatie (wens van de eigenaar): je komt hier elke dag langs. */}
          <View style={styles.wolkRij}>
            <View style={[styles.staart, { borderRightColor: wolk }]} />
            <View style={[styles.wolk, { backgroundColor: wolk, borderColor: withAlpha(theme.inactive, 0.2) }]}>
              <ThemedText type="bodyBold">{t((s) => s.widget.begroeting[stand.fase])(naam)}</ThemedText>
            </View>
          </View>
          <Pressable
            onPress={() => router.push('/shop')}
            accessibilityRole="button"
            style={[styles.chip, { backgroundColor: wolk }]}>
            <ThemedText type="smallBold">
              ❄️ {bevriezers}/{max}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blok: {
    marginHorizontal: Spacing.four,
    gap: Spacing.two,
  },
  balk: {
    borderRadius: Radii.card,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  teller: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  getal: {
    color: WIT,
    lineHeight: 30,
  },
  scheiding: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  week: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDag: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  bolletje: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoxyRij: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vosVak: {
    overflow: 'hidden',
    marginRight: Spacing.two,
  },
  vos: {
    position: 'absolute',
  },
  wolkVak: {
    flex: 1,
    gap: Spacing.two,
  },
  wolkRij: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staart: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  wolk: {
    flexShrink: 1,
    borderRadius: Radii.card,
    borderWidth: 1,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
  chip: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radii.button,
  },
});
