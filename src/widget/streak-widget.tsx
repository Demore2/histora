import {
  FlexWidget,
  ImageWidget,
  OverlapWidget,
  SvgWidget,
  TextWidget,
  type ColorProp,
} from 'react-native-android-widget';

import { FASE_KLEUR, type StreakFase, type StreakStand } from '@/widget/streak-fase';

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
 * Het vlammetje naast het getal. Een tekening en geen 🔥: een emoji wordt in de lettertypekleur van
 * de launcher getekend (op Samsung een ander vuurtje dan op Pixel) en leest als getypt. Wit met de
 * fasekleur als hart, zodat hij bij elke achtergrond hoort.
 */
function vlam(hart: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path fill="#FFFFFF" d="M12 23c-4.4 0-8-3.1-8-7.8 0-3.2 2.1-6 4.4-8.3.4-.4 1.1-.1 1.1.5 0 1.3.8 2.6 1.9 3.1C11.1 7 12 3.9 14.2 1.6c.4-.4 1-.2 1.1.3.6 3 3.7 5.5 4.5 8.2.4 1.4.2 2.7.2 3.7 0 5.3-3.6 9.2-8 9.2z"/>
<path fill="${hart}" d="M12 21c-2.2 0-4-1.6-4-3.9 0-1.9 1.4-3.2 2.6-4.5.3-.3.8-.1.8.3 0 .9.6 1.6 1.4 1.6.9 0 1.4-.8 1.3-1.7 0-.4.4-.6.7-.4C16 13.6 16 15.4 16 17c0 2.3-1.8 4-4 4z"/>
</svg>`;
}

/** De plaatjes in `assets/images/vos/widget/` zijn 384 px; het vak bepaalt de getekende maat. */
const VOS_BRON = 384;

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

  // Alleen het getal naast de vlam: iedereen weet dat het dagen zijn (wens van de eigenaar, naar het
  // voorbeeld van Blend). `dagenTekst` blijft voor de schermlezer.
  const getalMaat = breed ? 30 : 28;
  const tekstblok = (
    <FlexWidget
      style={{ flexDirection: 'column', flexGap: 2, alignItems: breed ? 'flex-start' : 'center' }}>
      {toonGetal ? (
        <FlexWidget style={{ flexDirection: 'row', alignItems: 'center', flexGap: 4 }}>
          <SvgWidget
            svg={vlam(String(kleur.naar))}
            style={{ width: getalMaat, height: getalMaat }}
          />
          <TextWidget
            text={String(stand.dagen)}
            style={{ fontSize: getalMaat, fontWeight: 'bold', color: WIT }}
            maxLines={1}
          />
        </FlexWidget>
      ) : null}
      <TextWidget
        text={zin}
        style={{
          fontSize: breed ? 16 : 15,
          fontWeight: '600',
          color: toonGetal ? WIT_ZACHT : WIT,
          textAlign: breed ? 'left' : 'center',
        }}
        maxLines={2}
        truncate="END"
      />
    </FlexWidget>
  );

  if (!breed) {
    // De vos schaalt mee met de widget (`contain` in een vak tot de onderrand) in plaats van met
    // `hoogte`: launchers melden een minimum, niet de maat die ze echt tekenen. Het vak begint
    // 36 dp onder de bovenrand en loopt dus achter de tekst langs — dat kan, want het bovenste
    // derde van elk faseplaatje is leeg (zie `assets/images/vos/`), dus de vos zelf begint pas
    // onder de zin.
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
          style={{ height: 'match_parent', width: 'match_parent', paddingTop: 36, alignItems: 'center' }}>
          <ImageWidget
            image={beeld}
            imageWidth={VOS_BRON}
            imageHeight={VOS_BRON}
            resizeMode="contain"
            style={{ width: 'match_parent', height: 'match_parent' }}
          />
        </FlexWidget>
        <FlexWidget style={{ width: 'match_parent', alignItems: 'center', padding: 14 }}>
          {tekstblok}
        </FlexWidget>
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
