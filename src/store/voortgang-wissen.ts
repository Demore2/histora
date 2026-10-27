import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';
import { useCharacterUnlockStore } from '@/store/character-unlock-store';
import { useStoryProgressStore } from '@/store/story-progress-store';
import { useVoortgangStore } from '@/store/voortgang-store';

/**
 * "Reset reading progress" in Instellingen (1.4.3): opnieuw beginnen zonder je account kwijt te
 * raken. Weg gaan de gelezen hoofdstukken, de geopende en uitgelezen verhalen en de ontgrendelde
 * personages. Blijven staan: de streak, Dukaten en bevriezers (de winkel), Pro, de kroontjes van
 * Explore en wannéér je een mijlpaal verdiende. Wat je verdiend of gekocht hebt neemt een reset
 * niet af; wat je gelezen hebt wel. Dukaten voor een hoofdstuk krijg je overigens geen tweede keer:
 * het kasboek op de server kent de sleutel al (`dukatenSleutel`), dus herlezen is geen bron.
 *
 * **Eerst de server, dan pas dit toestel**, en bij een fout helemaal niets. Andersom gaat het mis
 * op een manier die je niet ziet: de voortgang **verenigt** bij elke koude start lokaal met server
 * (`voegServerVoortgangSamen`), dus een lege lokale stand naast een volle serverrij krijgt bij de
 * volgende start alles terug — en dan heeft de knop schijnbaar niets gedaan.
 *
 * Bekend gat: een **tweede toestel** met de oude voortgang nog lokaal verenigt die bij zijn eerste
 * koude start weer met de (nu lege) serverrij en zet hem terug. Dat dicht je alleen met een
 * reset-moment op de server dat elk toestel bij het ophalen vergelijkt; voor één telefoon per
 * lezer is dat niet nodig.
 */
export type WisResultaat = 'gewist' | 'mislukt';

export async function wisLeesvoortgang(): Promise<WisResultaat> {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) return 'mislukt';

  // Een geplande push (twee seconden na het laatste hoofdstuk) zou de oude stand anders alsnog
  // over de lege serverrij heen leggen.
  useVoortgangStore.getState().resetSyncStatus();
  useStoryProgressStore.getState().resetSyncStatus();
  useCharacterUnlockStore.getState().resetSyncStatus();

  // `update` en geen `delete`: er bestaat bewust nergens een delete-policy (zie "Account deletion"),
  // en een delete zonder policy raakt nul rijen zonder foutmelding. Een update op een rij die er
  // niet is, is hier juist goed: dan is er ook niets te wissen.
  const nu = new Date().toISOString();
  const [voortgang, hoofdstukken, personages] = await Promise.all([
    supabase
      .from('voortgang')
      .update({ gelezenids: [], bekekenids: [], completedstories: [], updated_at: nu })
      .eq('user_id', userId),
    supabase
      .from('story_progress')
      .update({ completed_chapters: [], updated_at: nu })
      .eq('user_id', userId),
    supabase
      .from('character_unlocks')
      .update({ unlocked_characters: [], updated_at: nu })
      .eq('user_id', userId),
  ]);

  const fout = voortgang.error ?? hoofdstukken.error ?? personages.error;
  if (fout) {
    console.warn('[voortgang-wissen] mislukt:', fout.message);
    return 'mislukt';
  }

  useVoortgangStore.setState({
    gelezenIds: new Set(),
    bekekenIds: new Set(),
    completedStories: new Set(),
    heeftOnverzondenWijzigingen: false,
  });
  useStoryProgressStore.setState({ progress: {}, heeftOnverzondenWijzigingen: false });
  useCharacterUnlockStore.setState({ unlockedCharacters: [], heeftOnverzondenWijzigingen: false });

  return 'gewist';
}
