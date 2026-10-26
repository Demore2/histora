import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { PhoxyLeraar } from '@/components/phoxy-leraar';
import { StoryQuiz } from '@/components/story-quiz';
import { ThemedText } from '@/components/themed-text';
import { ANALYTICS_EVENTS } from '@/constants/analytics';
import { Motion } from '@/constants/motion';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { logStoryEvent } from '@/hooks/useAnalytics';
import { useVertaling } from '@/hooks/use-vertaling';
import type { HoofdstukInteractie } from '@/lib/interactief';

/** Hoe de lezer de huidige vraag beantwoordde, plus welke van Phoxy's zinnen erbij hoort. */
type Reactie = { goed: boolean; zin: number };

/**
 * De vragen van een hoofdstuk, ná "Mark Complete" en vóór het hoofdstuk echt af is.
 *
 * **Dit is de quiz die het volgende hoofdstuk wél blokkeert, en dat is een bewuste koerswijziging**
 * (wens van de eigenaar, 2026-10-22: "zodat mensen ook echt leren"). Tot dan stonden de vragen als
 * optionele kaarten onder de tekst (`interactieve-sectie.tsx`, nu orphaned). Wat van de oude
 * afweging overeind blijft, staat in de reader en niet hier: dit paneel opent alleen als de vragen
 * al geladen zijn. Offline, een mislukte fetch of een hoofdstuk zonder vragen geeft dus geen
 * paneel, en daarmee loopt niemand ooit vast op iets wat er niet is.
 *
 * **Alleen quizvragen, sinds 1.4** (wens van de eigenaar, 2026-10-26). Elk hoofdstuk heeft er
 * precies één; de peilingen en keuzepunten staan nog in de database en komen nog uit de RPC —
 * oudere app-versies tonen ze — maar dit paneel slaat ze over. Met een handvol lezers zei "wat
 * stemden anderen" nog niets. `StoryPoll` en `StoryChoice` zijn daarmee orphaned.
 *
 * **Elk antwoord telt, ook een fout.** De quiz toont het juiste antwoord met toelichting, en daarna
 * gaat het door. Verplicht antwoorden, niet verplicht goed antwoorden: wie vastloopt op een vraag
 * die hij niet weet, leert niets bij en sluit de app. Phoxy reageert daarom op een fout antwoord
 * bemoedigend, niet teleurgesteld.
 *
 * Geen kruisje en de hardwareknop doet niets: het paneel is verplicht. Het hoofdstuk zelf blijft
 * daaronder gewoon staan; wie het paneel niet wil, heeft het hoofdstuk nog niet afgerond.
 */
export function HoofdstukVragen({
  zichtbaar,
  interactie,
  accent,
  verhaalId,
  chapterId,
  onKlaar,
}: {
  zichtbaar: boolean;
  interactie: HoofdstukInteractie;
  accent: string;
  verhaalId: string;
  chapterId: number;
  /** Alle vragen beantwoord: nu pas wordt het hoofdstuk afgerond. */
  onKlaar: () => void;
}) {
  const theme = useTheme();
  const { t } = useVertaling();
  const insets = useSafeAreaInsets();
  const [stapIndex, setStapIndex] = useState(0);
  const [reactie, setReactie] = useState<Reactie | null>(null);

  const quizzes = interactie.quizzes;
  const quiz = quizzes[Math.min(stapIndex, quizzes.length - 1)];
  if (!quiz) return null;

  const zinnenGoed = t((s) => s.interactief.phoxyGoed);
  const zinnenFout = t((s) => s.interactief.phoxyFout);
  const phoxyTekst = !reactie
    ? t((s) => s.interactief.phoxyVraag)
    : (reactie.goed ? zinnenGoed : zinnenFout)[reactie.zin];

  const isBeantwoord = reactie !== null;
  const isLaatste = stapIndex >= quizzes.length - 1;

  function verder() {
    if (!isBeantwoord) return;
    if (isLaatste) {
      onKlaar();
      return;
    }
    setReactie(null);
    setStapIndex((i) => i + 1);
  }

  return (
    <Modal visible={zichtbaar} transparent animationType="slide" onRequestClose={() => {}}>
      <View style={[styles.achtergrond, { backgroundColor: withAlpha('#000000', 0.45) }]}>
        <View
          style={[
            styles.paneel,
            { backgroundColor: theme.background, paddingBottom: insets.bottom + Spacing.three },
          ]}>
          <View style={styles.kop}>
            <ThemedText type="smallBold" style={{ color: accent }}>
              {t((s) => s.interactief.vragenTitel)}
            </ThemedText>
            {quizzes.length > 1 && (
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.interactief.vragenStap)(stapIndex + 1, quizzes.length)}
              </ThemedText>
            )}
          </View>

          <ScrollView
            style={styles.inhoud}
            contentContainerStyle={styles.inhoudContainer}
            showsVerticalScrollIndicator={false}>
            <PhoxyLeraar
              stand={!reactie ? 'vraag' : reactie.goed ? 'goed' : 'fout'}
              tekst={phoxyTekst}
            />

            {/* `key` per vraag: elke vraag begint met een schone eigen state, en de animatie speelt
                bij elke nieuwe vraag opnieuw. */}
            <Animated.View key={quiz.id} entering={FadeInRight.duration(Motion.duration.normaal)}>
              <StoryQuiz
                quiz={quiz}
                accent={accent}
                onBeantwoord={(gekozen, goed) => {
                  // De zin wordt hier gekozen, bij het antwoord, en niet tijdens het renderen:
                  // anders wisselt Phoxy van woorden bij elke hertekening.
                  const zinnen = goed ? zinnenGoed : zinnenFout;
                  setReactie({ goed, zin: Math.floor(Math.random() * zinnen.length) });
                  logStoryEvent(ANALYTICS_EVENTS.QUIZ_ANSWER, {
                    story_id: verhaalId,
                    chapter_index: chapterId,
                    quiz_id: quiz.id,
                    selected_option: gekozen,
                    correct: goed,
                  });
                }}
              />
            </Animated.View>
          </ScrollView>

          <AnimatedPressable
            onPress={verder}
            disabled={!isBeantwoord}
            accessibilityRole="button"
            accessibilityState={{ disabled: !isBeantwoord }}
            style={[styles.knop, { backgroundColor: accent, opacity: isBeantwoord ? 1 : 0.4 }]}>
            <ThemedText type="smallBold" style={{ color: theme.background }}>
              {isLaatste
                ? t((s) => s.interactief.vragenKlaar)
                : t((s) => s.interactief.vragenVolgende)}
            </ThemedText>
          </AnimatedPressable>
          {!isBeantwoord && (
            <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
              {t((s) => s.interactief.vragenHint)}
            </ThemedText>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  achtergrond: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  paneel: {
    width: '100%',
    maxWidth: MAX_LEESBREEDTE,
    alignSelf: 'center',
    maxHeight: '92%',
    borderTopLeftRadius: Radii.card,
    borderTopRightRadius: Radii.card,
    paddingTop: Spacing.four,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
  },
  kop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inhoud: {
    flexGrow: 0,
  },
  inhoudContainer: {
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  knop: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radii.button,
  },
  hint: {
    textAlign: 'center',
  },
});
