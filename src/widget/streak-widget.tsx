import {
  FlexWidget,
  ImageWidget,
  OverlapWidget,
  TextWidget,
  type ColorProp,
} from 'react-native-android-widget';

import type { StreakFase, StreakStand } from '@/widget/streak-fase';

/**
 * De streak-widget op het homescreen (1.3). Geen React Native-component: dit wordt door
 * `react-native-android-widget` vertaald naar Android-RemoteViews, dus alleen de widget-primitieven
 * (`FlexWidget`, `TextWidget`, …) en geen `View`/`Text`, geen theme-hook, geen animatie.
 *
 * Twee indelingen uit één component, op de breedte die de launcher meldt: **klein** (2×2) is de vos
 * met het getal erboven, **breed** (4×2) zet links het getal, de zin en de week en rechts de vos.
 * Eén widget die je groter sleept in plaats van twee widgets in de kiezer — dat scheelt de lezer
 * een keuze en ons een tweede registratie in `app.json`.
 *
 * **Er staat geen tekst in de plaatjes** (zie `assets/images/vos/`): het getal en de zin komen
 * hier, in de taal van de app, zodat dezelfde vos in vier talen werkt.
 */
const FASE_BEELD: Record<StreakFase, number> = {
  gevierd: require('@/assets/images/vos/widget/fase-1-gevierd.png'),
  ochtend: require('@/assets/images/vos/widget/fase-2-ochtend.png'),
  middag: require('@/assets/images/vos/widget/fase-3-middag.png'),
  avond: require('@/assets/images/vos/widget/fase-4-avond.png'),
  paniek: require('@/assets/images/vos/widget/fase-5-paniek.png'),
  ijs: require('@/assets/images/vos/widget/fase-8-ijs.png'),
  skelet: require('@/assets/images/vos/widget/fase-6-skelet.png'),
  slaap: require('@/assets/images/vos/widget/fase-7-slaap.png'),
};

/**
 * Achtergrond per fase, van rustig naar alarm — de kleur vertelt het verhaal al voordat je de vos
 * ziet. Een verloop in plaats van een vlak, want een effen widget tussen app-icoontjes leest als
 * een leeg vak.
 */
const FASE_KLEUR: Record<StreakFase, { van: ColorProp; naar: ColorProp }> = {
  gevierd: { van: '#22C55E', naar: '#15803D' },
  ochtend: { van: '#38BDF8', naar: '#0284C7' },
  middag: { van: '#818CF8', naar: '#4F46E5' },
  avond: { van: '#C084FC', naar: '#9333EA' },
  paniek: { van: '#F87171', naar: '#B91C1C' },
  ijs: { van: '#7DD3FC', naar: '#0369A1' },
  skelet: { van: '#374151', naar: '#111827' },
  slaap: { van: '#1E40AF', naar: '#172554' },
};

/** Vanaf deze breedte (dp) de brede indeling. Een 2×2-widget is op de meeste launchers ±150 dp. */
const BREED_VANAF = 230;
const WIT: ColorProp = '#FFFFFF';
const WIT_ZACHT: ColorProp = 'rgba(255, 255, 255, 0.8)';

export type StreakWidgetProps = {
  stand: StreakStand;
  breedte: number;
  hoogte: number;
  /** Al vertaald: "12 days". */
  dagenTekst: string;
  zin: string;
  /** Al vertaald, maandag eerst: ["M", "T", …]. */
  weekdagen: string[];
};

export function StreakWidget({ stand, breedte, hoogte, dagenTekst, zin, weekdagen }: StreakWidgetProps) {
  const kleur = FASE_KLEUR[stand.fase];
  const beeld = FASE_BEELD[stand.fase];
  const breed = breedte >= BREED_VANAF;
  // Een verlopen of nooit begonnen streak toont geen "0 days": dat is een lege staat, net als op
  // Home en Voortgang (`useStreak`). Dan draagt de zin het alleen.
  const toonGetal = stand.dagen > 0;

  const tekstblok = (
    <FlexWidget style={{ flexDirection: 'column', flexGap: 2 }}>
      {toonGetal ? (
        <TextWidget
          text={`🔥 ${dagenTekst}`}
          style={{ fontSize: breed ? 22 : 18, fontWeight: 'bold', color: WIT }}
          maxLines={1}
        />
      ) : null}
      <TextWidget
        text={zin}
        style={{ fontSize: breed ? 15 : 13, fontWeight: '500', color: toonGetal ? WIT_ZACHT : WIT }}
        maxLines={2}
        truncate="END"
      />
    </FlexWidget>
  );

  if (!breed) {
    const vosMaat = Math.max(64, Math.min(breedte, hoogte) - 8);
    return (
      <OverlapWidget
        clickAction="OPEN_APP"
        accessibilityLabel={`${dagenTekst}. ${zin}`}
        style={{
          height: 'match_parent',
          width: 'match_parent',
          borderRadius: 24,
          backgroundGradient: { from: kleur.van, to: kleur.naar, orientation: 'TOP_BOTTOM' },
        }}>
        <FlexWidget
          style={{
            height: 'match_parent',
            width: 'match_parent',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <ImageWidget image={beeld} imageWidth={vosMaat} imageHeight={vosMaat} />
        </FlexWidget>
        <FlexWidget style={{ width: 'match_parent', padding: 12 }}>{tekstblok}</FlexWidget>
      </OverlapWidget>
    );
  }

  const vosMaat = Math.max(80, hoogte - 4);
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      accessibilityLabel={`${dagenTekst}. ${zin}`}
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 24,
        paddingLeft: 16,
        backgroundGradient: { from: kleur.van, to: kleur.naar, orientation: 'TL_BR' },
      }}>
      <FlexWidget style={{ flex: 1, flexDirection: 'column', flexGap: 10 }}>
        {tekstblok}
        <FlexWidget style={{ flexDirection: 'row', flexGap: 6 }}>
          {stand.week.map((dag, i) => (
            <FlexWidget key={i} style={{ flexDirection: 'column', alignItems: 'center', flexGap: 2 }}>
              <TextWidget
                text={weekdagen[i]}
                style={{ fontSize: 10, color: i === stand.vandaagIndex ? WIT : WIT_ZACHT }}
              />
              <FlexWidget
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: dag === 'gelezen' ? WIT : 'rgba(255, 255, 255, 0.25)',
                  borderWidth: i === stand.vandaagIndex ? 2 : 0,
                  borderColor: WIT,
                }}>
                {dag === 'gelezen' ? (
                  <TextWidget text="✓" style={{ fontSize: 11, fontWeight: 'bold', color: kleur.naar }} />
                ) : dag === 'bevroren' ? (
                  <TextWidget text="❄" style={{ fontSize: 11, color: WIT }} />
                ) : null}
              </FlexWidget>
            </FlexWidget>
          ))}
        </FlexWidget>
      </FlexWidget>
      <ImageWidget image={beeld} imageWidth={vosMaat} imageHeight={vosMaat} />
    </FlexWidget>
  );
}
