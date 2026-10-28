import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  type ImageSourcePropType,
} from 'react-native';
import Animated, { Easing, FadeIn, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { GoogleKnop } from '@/components/google-knop';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ERA_KOP } from '@/constants/era-koppen';
import { haptics } from '@/constants/haptics';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { getActieveTijdperken, getTijdperk } from '@/constants/tijdperken';
import { bepaalInstapVerhaal, getTijdlijn } from '@/content/queries';
import { biedHerinneringAan } from '@/hooks/use-dagelijkse-herinnering';
import { useTheme } from '@/hooks/use-theme';
import { useVertaling } from '@/hooks/use-vertaling';
import { isGast, startAlsGast, zetGastNaam } from '@/hooks/useAuth';
import { INTRO_AFLOOP, meetIntroStap } from '@/lib/intro-meting';
import type { TijdperkId } from '@/lib/trivia';
import { useAuthStore } from '@/store/auth-store';
import { useOnboardingStore, type OnboardingDoel, type OnboardingNiveau } from '@/store/onboarding-store';
import { useProfileStore } from '@/store/profile-store';

const PHOXY = {
  zwaaiend: require('@/assets/images/vos/zwaaiend.png'),
  opWeg: require('@/assets/images/vos/op-weg.png'),
};

/** Zoals een echte melding: met het app-icoon. */
const APP_ICOON = require('@/assets/images/app-icon.png');

/**
 * De volgorde van de intro. Negen stappen: de opwarmquiz en het tussenscherm "genoteerd" zijn eruit
 * (wens van de eigenaar, 1.4.5) — de app draait om lezen, niet om losse quizvragen, en het eerste
 * echte hoofdstuk volgt direct na het registreren.
 */
const STAPPEN = [
  'welkom',
  'hallo',
  'doel',
  'tijdperken',
  'niveau',
  'profiel',
  'eersteVerhaal',
  'meldingen',
  'account',
] as const;
type Stap = (typeof STAPPEN)[number];

const DOELEN: { id: OnboardingDoel; icoon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'kennis', icoon: 'globe-outline' },
  { id: 'school', icoon: 'school-outline' },
  { id: 'uitdaging', icoon: 'barbell-outline' },
  { id: 'expert', icoon: 'library-outline' },
];
const NIVEAUS: { id: OnboardingNiveau; icoon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'beginner', icoon: 'battery-dead-outline' },
  { id: 'af-en-toe', icoon: 'battery-half-outline' },
  { id: 'geinteresseerd', icoon: 'battery-charging-outline' },
  { id: 'liefhebber', icoon: 'battery-full-outline' },
];

/**
 * De intro voor nieuwe lezers (1.4.5, fase 1). Een lezer zonder sessie die de intro nog niet zag,
 * komt hier via de auth-poort (`AuthPoort` in `_layout.tsx`) in plaats van op `/login`.
 *
 * Eén scherm met een stapteller in plaats van dertien routes: de terugknop is gewoon "vorige stap",
 * en een half doorlopen intro hoeft nergens bewaard te worden — de antwoorden staan meteen in
 * `onboarding-store`. Wat de stappen opleveren:
 *
 * - **naam** → vult het registratiescherm alvast in, en Phoxy begroet je ermee op Home;
 * - **avatar** → een Phoxy-kop per tijdperk (`profile-store`, soort `phoxy`);
 * - **tijdperken** → het eerste verhaal (`bepaalInstapVerhaal`); niets gekozen is het begin van de reis;
 * - **niveau** → alleen bewaard, voor het persoonlijke gevoel;
 * - **meldingen** → hier valt de toestemmingsvraag, met uitleg ervoor (`biedHerinneringAan`).
 *
 * Sinds 1.5.0 loopt de intro **als gast**: "Get started" maakt een anoniem account
 * (`startAlsGast`), zodat het eerste verhaal al synchroniseert. De laatste stap is dan "bewaar je
 * voortgang" — Google, e-mail (`/account-bewaren`) of "Later" — en daarna eenmalig het Pro-aanbod
 * (`intro-pro.tsx`). Lukt het gastaccount niet (offline), dan eindigt de stap zoals vóór 1.5.0 bij
 * registreren of inloggen. Elke getoonde stap gaat naar `public.intro_stappen` (`meetIntroStap`).
 */
export default function IntroScreen() {
  const theme = useTheme();
  const { t, v } = useVertaling();
  const [stap, setStap] = useState<Stap>('welkom');
  const [googleFout, setGoogleFout] = useState<string | null>(null);

  const doel = useOnboardingStore((s) => s.doel);
  const tijdperken = useOnboardingStore((s) => s.tijdperken);
  const niveau = useOnboardingStore((s) => s.niveau);
  const naam = useOnboardingStore((s) => s.naam);
  const kiesDoel = useOnboardingStore((s) => s.kiesDoel);
  const wisselTijdperk = useOnboardingStore((s) => s.wisselTijdperk);
  const kiesNiveau = useOnboardingStore((s) => s.kiesNiveau);
  const zetNaam = useOnboardingStore((s) => s.zetNaam);
  const rondIntroAf = useOnboardingStore((s) => s.rondIntroAf);
  const slaIntroOver = useOnboardingStore((s) => s.slaIntroOver);
  const heropenIntro = useOnboardingStore((s) => s.heropenIntro);
  const gast = useAuthStore((s) => isGast(s.user));
  const avatar = useProfileStore((s) => s.avatar);
  const kiesPhoxy = useProfileStore((s) => s.kiesPhoxy);

  const index = STAPPEN.indexOf(stap);
  const volgende = () => setStap(STAPPEN[Math.min(index + 1, STAPPEN.length - 1)]);
  const vorige = () => setStap(STAPPEN[Math.max(index - 1, 0)]);

  // De gekozen tijdperken bepalen het eerste verhaal (sinds 2026-10-28); niets gekozen is het begin van de reis.
  const { verhaal: startVerhaal, reden: startReden } = bepaalInstapVerhaal(tijdperken);
  const schoneNaam = naam.trim() || null;

  // Een gekozen avatar uit de intro; anders standaard de Romeinse Phoxy, zodat er altijd iets staat.
  const gekozenKop = avatar?.soort === 'phoxy' ? avatar.tijdperkId : null;
  useEffect(() => {
    if (stap === 'profiel' && !avatar) kiesPhoxy('oudheid');
  }, [stap, avatar, kiesPhoxy]);

  // De trechter: elke stap die in beeld komt, één rij (zie `lib/intro-meting.ts`).
  useEffect(() => {
    meetIntroStap(stap, index);
  }, [stap, index]);

  function naarAccount(route: '/signup' | '/login' | '/account-bewaren') {
    rondIntroAf(startVerhaal.id);
    if (route === '/login') meetIntroStap(INTRO_AFLOOP.inloggen.stap, INTRO_AFLOOP.inloggen.nummer);
    router.replace(route === '/account-bewaren' ? { pathname: route, params: { bron: 'intro' } } : route);
  }

  if (stap === 'welkom') {
    return (
      <Welkom
        onStart={() => {
          // Na uitloggen staat `gezien` nog aan; opnieuw beginnen is dan een echte nieuwe intro, zodat
          // de poort hem bij een herstart midden in de stappen ook weer hier terugzet.
          if (useOnboardingStore.getState().gezien) heropenIntro();
          // Op de achtergrond: de intro wacht er niet op, en mislukt het, dan loopt hij zonder sessie.
          void startAlsGast();
          volgende();
        }}
        onAccount={() => {
          slaIntroOver();
          router.replace('/login');
        }}
      />
    );
  }

  let inhoud: ReactNode = null;
  let knop: { tekst: string; onPress: () => void; uit?: boolean } | null = { tekst: t((s) => s.intro.verder), onPress: volgende };
  let tweede: { tekst: string; onPress: () => void } | null = null;
  let google: ReactNode = null;

  switch (stap) {
    case 'hallo':
      inhoud = <PhoxyZegt beeld={PHOXY.zwaaiend} tekst={t((s) => s.intro.phoxyHallo)} />;
      knop = { tekst: t((s) => s.intro.aangenaam), onPress: volgende };
      break;
    case 'doel':
      inhoud = (
        <Vraag titel={t((s) => s.intro.doelVraag)}>
          {DOELEN.map((d) => (
            <Keuze key={d.id} icoon={d.icoon} tekst={t((s) => s.intro.doelen[d.id])} actief={doel === d.id} onPress={() => kiesDoel(d.id)} />
          ))}
        </Vraag>
      );
      knop = { tekst: t((s) => s.intro.verder), onPress: volgende, uit: !doel };
      break;
    case 'tijdperken':
      inhoud = (
        <Vraag titel={t((s) => s.intro.tijdperkVraag)} hint={t((s) => s.intro.tijdperkHint)}>
          <View style={styles.raster}>
            {getActieveTijdperken().map((tp) => {
              const actief = tijdperken.includes(tp.id as TijdperkId);
              return (
                <AnimatedPressable
                  key={tp.id}
                  onPress={() => wisselTijdperk(tp.id as TijdperkId)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: actief }}
                  style={[
                    styles.tijdperkTegel,
                    {
                      backgroundColor: actief ? withAlpha(tp.kleur, 0.18) : theme.backgroundElement,
                      borderColor: actief ? tp.kleur : 'transparent',
                    },
                  ]}>
                  <Image source={ERA_KOP[tp.id as TijdperkId]} style={[styles.tijdperkKop, { backgroundColor: tp.kleur }]} contentFit="cover" />
                  <ThemedText type="smallBold" style={styles.midden} numberOfLines={2}>
                    {v(tp.titel)}
                  </ThemedText>
                </AnimatedPressable>
              );
            })}
          </View>
        </Vraag>
      );
      knop = { tekst: tijdperken.length ? t((s) => s.intro.verder) : t((s) => s.intro.overslaan), onPress: volgende };
      break;
    case 'niveau':
      inhoud = (
        <Vraag titel={t((s) => s.intro.niveauVraag)}>
          {NIVEAUS.map((n) => (
            <Keuze key={n.id} icoon={n.icoon} tekst={t((s) => s.intro.niveaus[n.id])} actief={niveau === n.id} onPress={() => kiesNiveau(n.id)} />
          ))}
        </Vraag>
      );
      knop = { tekst: t((s) => s.intro.verder), onPress: volgende, uit: !niveau };
      break;
    case 'profiel':
      inhoud = (
        <View style={styles.vraag}>
          <View style={styles.kopTekst}>
            <ThemedText type="display">{t((s) => s.intro.profielTitel)}</ThemedText>
            <ThemedText type="body" themeColor="textSecondary">
              {t((s) => s.intro.profielOndertitel)}
            </ThemedText>
          </View>
          <View style={styles.grootAvatar}>
            <Image
              source={ERA_KOP[gekozenKop ?? 'oudheid']}
              style={[styles.grootAvatarBeeld, { borderColor: theme.accent, backgroundColor: getTijdperk(gekozenKop ?? 'oudheid')?.kleur }]}
              contentFit="cover"
            />
          </View>
          <View style={styles.veld}>
            <ThemedText type="smallBold">{t((s) => s.intro.naamLabel)}</ThemedText>
            <TextInput
              value={naam}
              onChangeText={zetNaam}
              placeholder={t((s) => s.intro.naamPlaceholder)}
              placeholderTextColor={theme.inactive}
              autoCapitalize="words"
              autoComplete="given-name"
              maxLength={30}
              returnKeyType="done"
              style={[styles.invoer, { backgroundColor: theme.backgroundElement, color: theme.text, borderColor: theme.backgroundSelected }]}
            />
          </View>
          <View style={styles.veld}>
            <ThemedText type="smallBold">{t((s) => s.intro.avatarLabel)}</ThemedText>
            <View style={styles.avatarRij}>
              {getActieveTijdperken().map((tp) => {
                const actief = gekozenKop === tp.id;
                return (
                  <Pressable
                    key={tp.id}
                    onPress={() => {
                      haptics.tik();
                      kiesPhoxy(tp.id as TijdperkId);
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: actief }}
                    accessibilityLabel={v(tp.titel)}
                    style={[styles.avatarKeuze, { borderColor: actief ? theme.accent : 'transparent' }]}>
                    <Image source={ERA_KOP[tp.id as TijdperkId]} style={[styles.avatarBeeld, { backgroundColor: tp.kleur }]} contentFit="cover" />
                  </Pressable>
                );
              })}
            </View>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.midden}>
            {t((s) => s.intro.profielVoet)}
          </ThemedText>
        </View>
      );
      knop = { tekst: t((s) => s.intro.verder), onPress: volgende, uit: !schoneNaam };
      break;
    case 'eersteVerhaal': {
      const tp = getTijdperk(startVerhaal.tijdperkId);
      const waarom =
        startReden.soort === 'tijdperk' && tp ? t((s) => s.intro.eersteVerhaalWaarom)(v(tp.titel), startReden.aantalGekozen) : null;
      inhoud = (
        <View style={styles.vraag}>
          <View style={styles.kopTekst}>
            <ThemedText type="display">{t((s) => s.intro.eersteVerhaalKop)(schoneNaam)}</ThemedText>
            {waarom ? (
              <ThemedText type="body" themeColor="textSecondary">
                {waarom}
              </ThemedText>
            ) : null}
          </View>
          <View style={[styles.verhaalKaart, { backgroundColor: tp?.kleur ?? theme.accent }]}>
            <Image source={startVerhaal.chapters[0]?.afbeelding ?? startVerhaal.afbeelding} style={StyleSheet.absoluteFill} contentFit="cover" />
            <View style={[StyleSheet.absoluteFill, styles.verhaalWaas]} />
            <View style={styles.verhaalTekst}>
              <ThemedText type="caption" style={styles.witZacht}>
                {tp ? v(tp.titel).toUpperCase() : ''}
              </ThemedText>
              <ThemedText type="display" style={styles.wit}>
                {v(startVerhaal.titel)}
              </ThemedText>
              <ThemedText type="small" style={styles.witZacht}>
                {startVerhaal.periodeLabel}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="body" themeColor="textSecondary">
            {t((s) => s.intro.eersteVerhaalTekst)}
          </ThemedText>
        </View>
      );
      break;
    }
    case 'meldingen':
      inhoud = (
        <View style={styles.vraag}>
          <View style={styles.kopTekst}>
            <ThemedText type="display">{t((s) => s.intro.meldingenTitel)}</ThemedText>
            <ThemedText type="body" themeColor="textSecondary">
              {t((s) => s.intro.meldingenOndertitel)}
            </ThemedText>
          </View>
          <ThemedText type="bodyBold" style={styles.midden}>
            {t((s) => s.intro.voorbeeld)}
          </ThemedText>
          <Melding titel={`🔥 ${t((s) => s.intro.voorbeeld1Titel)}`} tekst={t((s) => s.intro.voorbeeld1Tekst)} />
          <Melding titel={`📖 ${t((s) => s.intro.voorbeeld2Titel)}`} tekst={t((s) => s.intro.voorbeeld2Tekst)} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.midden}>
            {t((s) => s.intro.meldingenVoet)}
          </ThemedText>
        </View>
      );
      knop = {
        tekst: t((s) => s.intro.meldingenAan),
        onPress: () => {
          void biedHerinneringAan().finally(volgende);
        },
      };
      tweede = { tekst: t((s) => s.intro.later), onPress: volgende };
      break;
    case 'account':
      // Als gast: bewaren (Google of e-mail) of later. Zonder sessie (gastaccount mislukt): zoals
      // vóór 1.5.0 registreren of inloggen — Google werkt daar ook, als gewone login.
      inhoud = <PhoxyZegt beeld={PHOXY.opWeg} tekst={t((s) => (gast ? s.intro.accountPhoxyGast : s.intro.accountPhoxy))} />;
      google = (
        <GoogleKnop
          onStart={() => rondIntroAf(startVerhaal.id)}
          onNietGelukt={heropenIntro}
          onGelukt={() => {
            meetIntroStap(INTRO_AFLOOP.google.stap, INTRO_AFLOOP.google.nummer);
            router.replace('/intro-pro');
          }}
          onFout={setGoogleFout}
        />
      );
      if (gast) {
        knop = { tekst: t((s) => s.intro.accountEmail), onPress: () => naarAccount('/account-bewaren') };
        tweede = {
          tekst: t((s) => s.intro.later),
          onPress: () => {
            meetIntroStap(INTRO_AFLOOP.later.stap, INTRO_AFLOOP.later.nummer);
            rondIntroAf(startVerhaal.id);
            void zetGastNaam(naam);
            router.replace('/intro-pro');
          },
        };
      } else {
        knop = { tekst: t((s) => s.intro.accountKnop), onPress: () => naarAccount('/signup') };
        tweede = { tekst: t((s) => s.intro.hebAccount), onPress: () => naarAccount('/login') };
      }
      break;
  }

  return (
    <ThemedView style={styles.scherm}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.kop}>
            <Pressable onPress={vorige} accessibilityRole="button" accessibilityLabel={t((s) => s.intro.terug)} hitSlop={12}>
              <Ionicons name="arrow-back" size={26} color={theme.text} />
            </Pressable>
            <View
              style={[styles.balk, { backgroundColor: withAlpha(theme.inactive, 0.3) }]}
              accessibilityLabel={t((s) => s.intro.voortgang)(index, STAPPEN.length - 1)}>
              <View style={[styles.balkVulling, { backgroundColor: theme.accent, width: `${(index / (STAPPEN.length - 1)) * 100}%` }]} />
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.inhoud} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Animated.View key={stap} entering={FadeIn.duration(250)} style={styles.flex}>
              {inhoud}
            </Animated.View>
          </ScrollView>

          <View style={styles.voet}>
            {googleFout && stap === 'account' ? (
              <ThemedText type="small" themeColor="gevaar" style={styles.midden}>
                {googleFout}
              </ThemedText>
            ) : null}
            {google}
            {knop ? (
              <AnimatedPressable
                onPress={knop.onPress}
                disabled={knop.uit}
                accessibilityRole="button"
                style={[styles.hoofdKnop, { backgroundColor: knop.uit ? theme.backgroundElement : theme.accent }]}>
                <ThemedText type="bodyBold" style={{ color: knop.uit ? theme.inactive : theme.background }}>
                  {knop.tekst}
                </ThemedText>
              </AnimatedPressable>
            ) : null}
            {tweede ? (
              <Pressable onPress={tweede.onPress} accessibilityRole="button" style={styles.tweedeKnop}>
                <ThemedText type="bodyBold" themeColor="textSecondary">
                  {tweede.tekst}
                </ThemedText>
              </Pressable>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Het eerste scherm: drie rijen scènes die langzaam voorbij schuiven, en de twee ingangen. */
function Welkom({ onStart, onAccount }: { onStart: () => void; onAccount: () => void }) {
  const theme = useTheme();
  const { t } = useVertaling();
  // Twaalf scènes verspreid over de tijdlijn: van elk vierde verhaal het tweede hoofdstuk.
  const beelden = getTijdlijn()
    .filter((_, i) => i % 4 === 0)
    .map((verhaal) => verhaal.chapters[1]?.afbeelding ?? verhaal.afbeelding)
    .filter((beeld) => beeld !== undefined)
    .slice(0, 12);
  const rijen = [beelden.slice(0, 4), beelden.slice(4, 8), beelden.slice(8, 12)];

  return (
    <ThemedView style={styles.scherm}>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <View style={styles.welkomKop}>
          <ThemedText type="subtitle" style={styles.midden}>
            {t((s) => s.intro.welkomBij)}
          </ThemedText>
          <ThemedText type="display" themeColor="accent" style={[styles.midden, styles.merk]}>
            Histora
          </ThemedText>
        </View>
        <View style={styles.collage}>
          {rijen.map((rij, i) => (
            <SchuifRij key={i} beelden={rij} omgekeerd={i % 2 === 1} duur={38000 + i * 6000} />
          ))}
        </View>
        <View style={styles.welkomVoet}>
          <ThemedText type="subtitle" style={styles.midden}>
            {t((s) => s.intro.welkomTagline)}
          </ThemedText>
          <AnimatedPressable onPress={onStart} accessibilityRole="button" style={[styles.hoofdKnop, { backgroundColor: theme.accent }]}>
            <ThemedText type="bodyBold" style={{ color: theme.background }}>
              {t((s) => s.intro.aanDeSlag)}
            </ThemedText>
          </AnimatedPressable>
          <Pressable onPress={onAccount} accessibilityRole="button" style={styles.tweedeKnop}>
            <ThemedText type="bodyBold" themeColor="textSecondary">
              {t((s) => s.intro.hebAccount)}
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const TEGEL = 132;
const TEGEL_RUIMTE = Spacing.two;

/** Een rij scènes die eindeloos opschuift: de rij staat er twee keer in en verspringt onzichtbaar. */
function SchuifRij({ beelden, omgekeerd, duur }: { beelden: ImageSourcePropType[]; omgekeerd: boolean; duur: number }) {
  const breedte = beelden.length * (TEGEL + TEGEL_RUIMTE);
  const x = useSharedValue(0);

  useEffect(() => {
    x.set(withRepeat(withTiming(-breedte, { duration: duur, easing: Easing.linear }), -1, false));
  }, [x, breedte, duur]);

  const stijl = useAnimatedStyle(() => ({
    transform: [{ translateX: omgekeerd ? -breedte - x.get() : x.get() }],
  }));

  return (
    <Animated.View style={[styles.schuifRij, stijl]}>
      {[...beelden, ...beelden].map((beeld, i) => (
        <Image key={i} source={beeld} style={styles.collageTegel} contentFit="cover" accessible={false} />
      ))}
    </Animated.View>
  );
}

function PhoxyZegt({ beeld, tekst }: { beeld: number; tekst: string }) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const maat = Math.min(width * 0.62, 280);
  return (
    <View style={styles.phoxyZegt}>
      <View style={[styles.ballon, { backgroundColor: theme.backgroundElement }]}>
        <ThemedText type="subtitle">{tekst}</ThemedText>
      </View>
      <View style={[styles.ballonStaart, { borderTopColor: theme.backgroundElement }]} />
      <Image source={beeld} style={{ width: maat, height: maat }} contentFit="contain" accessible={false} />
    </View>
  );
}

function Vraag({ titel, hint, children }: { titel: string; hint?: string; children: ReactNode }) {
  return (
    <View style={styles.vraag}>
      <View style={styles.kopTekst}>
        <ThemedText type="title">{titel}</ThemedText>
        {hint ? (
          <ThemedText type="small" themeColor="textSecondary">
            {hint}
          </ThemedText>
        ) : null}
      </View>
      <View style={styles.opties}>{children}</View>
    </View>
  );
}

function Keuze({ icoon, tekst, actief, onPress }: { icoon: keyof typeof Ionicons.glyphMap; tekst: string; actief: boolean; onPress: () => void }) {
  const theme = useTheme();
  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: actief }}
      style={[
        styles.keuze,
        {
          backgroundColor: actief ? withAlpha(theme.accent, 0.14) : theme.backgroundElement,
          borderColor: actief ? theme.accent : 'transparent',
        },
      ]}>
      <Ionicons name={icoon} size={22} color={actief ? theme.accent : theme.textSecondary} />
      <ThemedText type="body" style={styles.flex}>
        {tekst}
      </ThemedText>
      {actief ? <Ionicons name="checkmark-circle" size={22} color={theme.accent} /> : null}
    </AnimatedPressable>
  );
}

function Melding({ titel, tekst }: { titel: string; tekst: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.melding, { backgroundColor: theme.backgroundElement }]}>
      <Image source={APP_ICOON} style={styles.meldingIcoon} contentFit="cover" accessible={false} />
      <View style={styles.flex}>
        <ThemedText type="bodyBold">{titel}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {tekst}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scherm: { flex: 1 },
  flex: { flex: 1 },
  midden: { textAlign: 'center' },
  wit: { color: '#FFFFFF' },
  witZacht: { color: 'rgba(255, 255, 255, 0.85)' },
  kop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  balk: { flex: 1, height: 10, borderRadius: 5, overflow: 'hidden' },
  balkVulling: { height: '100%', borderRadius: 5 },
  inhoud: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
  },
  voet: {
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  hoofdKnop: { alignItems: 'center', justifyContent: 'center', paddingVertical: Spacing.three + 2, borderRadius: Radii.button },
  tweedeKnop: { alignItems: 'center', paddingVertical: Spacing.three },
  welkomKop: { paddingTop: Spacing.five, paddingBottom: Spacing.four, gap: Spacing.one },
  merk: { fontSize: 52, lineHeight: 60 },
  collage: { gap: TEGEL_RUIMTE, overflow: 'hidden', flex: 1, justifyContent: 'center' },
  schuifRij: { flexDirection: 'row', gap: TEGEL_RUIMTE },
  collageTegel: { width: TEGEL, height: TEGEL, borderRadius: Radii.card },
  welkomVoet: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four, paddingBottom: Spacing.two, gap: Spacing.three },
  phoxyZegt: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 0 },
  ballon: { borderRadius: Radii.card, paddingVertical: Spacing.three, paddingHorizontal: Spacing.four, alignSelf: 'stretch' },
  ballonStaart: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: Spacing.two,
  },
  vraag: { gap: Spacing.four },
  kopTekst: { gap: Spacing.one },
  opties: { gap: Spacing.three },
  keuze: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three + 2,
    paddingHorizontal: Spacing.three,
    borderRadius: Radii.card,
    borderWidth: 2,
  },
  raster: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  tijdperkTegel: {
    width: '47%',
    flexGrow: 1,
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderRadius: Radii.card,
    borderWidth: 2,
  },
  tijdperkKop: { width: 64, height: 64, borderRadius: 32 },
  grootAvatar: { alignItems: 'center' },
  grootAvatarBeeld: { width: 128, height: 128, borderRadius: 64, borderWidth: 3 },
  veld: { gap: Spacing.two },
  invoer: { borderWidth: 1, borderRadius: Radii.button, paddingHorizontal: Spacing.three, paddingVertical: Spacing.three, fontSize: 16 },
  avatarRij: { flexDirection: 'row', justifyContent: 'space-between' },
  avatarKeuze: { borderWidth: 3, borderRadius: 32, padding: 2 },
  avatarBeeld: { width: 48, height: 48, borderRadius: 24 },

  verhaalKaart: { height: 260, borderRadius: Radii.card, overflow: 'hidden', justifyContent: 'flex-end' },
  verhaalWaas: { backgroundColor: 'rgba(0, 0, 0, 0.38)' },
  verhaalTekst: { padding: Spacing.four, gap: Spacing.half },
  melding: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, padding: Spacing.three, borderRadius: Radii.card },
  meldingIcoon: { width: 44, height: 44, borderRadius: 10 },
});
