import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedPressable } from '@/components/animated-pressable';
import { StoryChoice } from '@/components/story-choice';
import { StoryPoll } from '@/components/story-poll';
import { StoryQuiz } from '@/components/story-quiz';
import { ThemedText } from '@/components/themed-text';
import { ANALYTICS_EVENTS } from '@/constants/analytics';
import { Motion } from '@/constants/motion';
import { MAX_LEESBREEDTE, Radii, Spacing, withAlpha } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { logStoryEvent } from '@/hooks/useAnalytics';
import { useVertaling } from '@/hooks/use-vertaling';
import type { HoofdstukInteractie, Keuzepunt, Poll, Quiz } from '@/lib/interactief';

type Stap =
  | { soort: 'quiz'; id: string; quiz: Quiz }
  | { soort: 'poll'; id: string; poll: Poll }
  | { soort: 'keuze'; id: string; keuzepunt: Keuzepunt };

/** Feitelijk → persoonlijk, dezelfde volgorde als de kaarten onder de tekst vroeger stonden. */
function maakStappen(interactie: HoofdstukInteractie): Stap[] {
  return [
    ...interactie.quizzes.map((quiz) => ({ soort: 'quiz' as const, id: quiz.id, quiz })),
    ...interactie.polls.map((poll) => ({ soort: 'poll' as const, id: poll.id, poll })),
    ...interactie.keuzepunten.map((keuzepunt) => ({
      soort: 'keuze' as const,
      id: keuzepunt.id,
      keuzepunt,
    })),
  ];
}

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
 * **Elk antwoord telt, ook een fout.** De quiz toont het juiste antwoord met toelichting, en daarna
 * gaat het door. Verplicht antwoorden, niet verplicht goed antwoorden: wie vastloopt op een vraag
 * die hij niet weet, leert niets bij en sluit de app.
 *
 * **Een stem telt als beantwoord op het moment van de tik**, niet pas als de server hem heeft.
 * `stemOpPoll` draait de stem terug als het schrijven mislukt; zonder deze eigen administratie zou
 * de lezer offline dan met een uitgeschakelde knop blijven zitten.
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
  onStem,
  onKies,
  onKlaar,
}: {
  zichtbaar: boolean;
  interactie: HoofdstukInteractie;
  accent: string;
  verhaalId: string;
  chapterId: number;
  onStem: (pollId: string, optie: number) => void;
  onKies: (keuzeId: string, optie: number) => void;
  /** Alle vragen beantwoord: nu pas wordt het hoofdstuk afgerond. */
  onKlaar: () => void;
}) {
  const theme = useTheme();
  const { t } = useVertaling();
  const insets = useSafeAreaInsets();
  const [stapIndex, setStapIndex] = useState(0);
  const [beantwoord, setBeantwoord] = useState<ReadonlySet<string>>(() => new Set());

  const stappen = maakStappen(interactie);
  const stap = stappen[Math.min(stapIndex, stappen.length - 1)];
  if (!stap) return null;

  const markeer = (id: string) => setBeantwoord((huidig) => new Set(huidig).add(id));

  // Een peiling waar je al eerder op stemde (bijvoorbeeld vóór deze versie, toen hij nog onder de
  // tekst stond) is ook beantwoord; de server weet dat en geeft `mijnKeuze` mee.
  const isBeantwoord =
    beantwoord.has(stap.id) ||
    (stap.soort === 'poll' && stap.poll.mijnKeuze !== null) ||
    (stap.soort === 'keuze' && stap.keuzepunt.mijnKeuze !== null);
  const isLaatste = stapIndex >= stappen.length - 1;

  function verder() {
    if (!isBeantwoord) return;
    if (isLaatste) {
      onKlaar();
      return;
    }
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
            {stappen.length > 1 && (
              <ThemedText type="small" themeColor="textSecondary">
                {t((s) => s.interactief.vragenStap)(stapIndex + 1, stappen.length)}
              </ThemedText>
            )}
          </View>

          <ScrollView
            style={styles.inhoud}
            contentContainerStyle={styles.inhoudContainer}
            showsVerticalScrollIndicator={false}>
            {/* `key` per stap: elke vraag begint met een schone eigen state, en de animatie speelt
                bij elke nieuwe vraag opnieuw. */}
            <Animated.View key={stap.id} entering={FadeInRight.duration(Motion.duration.normaal)}>
              {stap.soort === 'quiz' ? (
                <StoryQuiz
                  quiz={stap.quiz}
                  accent={accent}
                  onBeantwoord={(gekozen, goed) => {
                    markeer(stap.id);
                    logStoryEvent(ANALYTICS_EVENTS.QUIZ_ANSWER, {
                      story_id: verhaalId,
                      chapter_index: chapterId,
                      quiz_id: stap.quiz.id,
                      selected_option: gekozen,
                      correct: goed,
                    });
                  }}
                />
              ) : stap.soort === 'poll' ? (
                <StoryPoll
                  poll={stap.poll}
                  accent={accent}
                  onStem={(pollId, optie) => {
                    markeer(stap.id);
                    onStem(pollId, optie);
                  }}
                />
              ) : (
                <StoryChoice
                  keuzepunt={stap.keuzepunt}
                  accent={accent}
                  onKies={(keuzeId, optie) => {
                    markeer(stap.id);
                    onKies(keuzeId, optie);
                  }}
                />
              )}
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
    maxHeight: '88%',
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
