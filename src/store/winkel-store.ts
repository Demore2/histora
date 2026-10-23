import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';
import { foutTekst } from '@/store/sync-hulp';

/**
 * De winkel (1.3): Dukaten en streakbevriezers.
 *
 * **De server is de bron, dit is een kopie.** Saldo en bevriezers staan in Supabase en veranderen
 * alleen via `security definer`-functies (`supabase/winkel-migratie.sql`); deze store bewaart de
 * laatst bekende stand zodat de winkel en de widget iets kunnen tonen zonder netwerk. Er is dus
 * geen `syncToSupabase` die lokale state naar boven duwt zoals bij de zeven `SYNC_STORES` — een
 * saldo dat de app zelf mag zetten is een saldo dat iedereen kan zetten.
 *
 * Wat wél lokaal begint is **verdienen**: een afgerond hoofdstuk zet een sleutel in
 * `teVerzilveren`, en die gaat bij de volgende kans naar `dukaten_verdien`. De server telt elke
 * sleutel één keer, dus de wachtrij mag zo vaak opnieuw verstuurd worden als nodig — wat een
 * Pro-lezer die offline leest zijn Dukaten laat houden.
 */

/** De sleutels waarmee `dukaten_verdien` een hoofdstuk en een verhaal herkent. Wijzig ze samen. */
export const dukatenSleutel = {
  hoofdstuk: (verhaalId: string, hoofdstuk: number) => `hoofdstuk:${verhaalId}:${hoofdstuk}`,
  verhaal: (verhaalId: string) => `verhaal:${verhaalId}`,
};

export type WinkelInstellingen = {
  perHoofdstuk: number;
  perVerhaal: number;
  bevriezerPrijs: number;
  maxBevriezers: number;
  proBevriezersPerMaand: number;
};

/** Alleen om iets te tonen vóór de eerste serverronde; de server stuurt de echte bedragen mee. */
const STANDAARD_INSTELLINGEN: WinkelInstellingen = {
  perHoofdstuk: 10,
  perVerhaal: 40,
  bevriezerPrijs: 300,
  maxBevriezers: 2,
  proBevriezersPerMaand: 2,
};

export type KoopUitkomst = 'gekocht' | 'te-weinig-dukaten' | 'maximum' | 'mislukt';

type WinkelState = {
  saldo: number;
  bevriezers: number;
  /** Lokale datumsleutels (`YYYY-MM-DD`) die een bevriezer de afgelopen twee weken overbrugde. */
  bevrorenDagen: string[];
  instellingen: WinkelInstellingen;
  /** Sleutels die nog naar `dukaten_verdien` moeten (`hoofdstuk:<id>:<n>`, `verhaal:<id>`). */
  teVerzilveren: string[];
  /** Of de leesgeschiedenis van vóór de winkel al eenmalig is ingeleverd. Per account. */
  inhaalGedaanVoor: string | null;
  /** Wanneer de stand voor het laatst van de server kwam (epoch-ms), of `null`. */
  bijgewerktOp: number | null;
  isBezig: boolean;
  fout: string | null;

  verdien: (sleutels: string[]) => void;
  verzilver: () => Promise<void>;
  haalOp: () => Promise<void>;
  vulProAan: () => Promise<void>;
  koopBevriezer: () => Promise<KoopUitkomst>;
  /** `true` als de server de dagen overbrugde. Alles of niets, zie de SQL. */
  gebruikBevriezers: (dagen: string[]) => Promise<boolean>;
  markeerInhaalGedaan: (userId: string) => void;
  reset: () => void;
};

type ServerStand = {
  saldo?: number;
  bevriezers?: number;
  bevroren_dagen?: string[];
  instellingen?: Record<string, number>;
};

function leesStand(data: unknown): Partial<WinkelState> | null {
  if (!data || typeof data !== 'object') return null;
  const s = data as ServerStand;
  const i = s.instellingen ?? {};
  return {
    saldo: Number(s.saldo) || 0,
    bevriezers: Number(s.bevriezers) || 0,
    bevrorenDagen: Array.isArray(s.bevroren_dagen) ? s.bevroren_dagen.map(String) : [],
    instellingen: {
      perHoofdstuk: Number(i.per_hoofdstuk) || STANDAARD_INSTELLINGEN.perHoofdstuk,
      perVerhaal: Number(i.per_verhaal) || STANDAARD_INSTELLINGEN.perVerhaal,
      bevriezerPrijs: Number(i.bevriezer_prijs) || STANDAARD_INSTELLINGEN.bevriezerPrijs,
      maxBevriezers: Number(i.max_bevriezers) || STANDAARD_INSTELLINGEN.maxBevriezers,
      proBevriezersPerMaand:
        Number(i.pro_bevriezers_per_maand) || STANDAARD_INSTELLINGEN.proBevriezersPerMaand,
    },
    bijgewerktOp: Date.now(),
    fout: null,
  };
}

/** Een RPC die de stand teruggeeft; zet hem in de store. Gooit niet, geeft de foutcode terug. */
async function roepAan(
  set: (deel: Partial<WinkelState>) => void,
  naam: string,
  args?: Record<string, unknown>,
): Promise<string | null> {
  if (!useAuthStore.getState().user) return 'geen_sessie';
  const { data, error } = await supabase.rpc(naam, args);
  if (error) {
    set({ fout: foutTekst(error) });
    return error.message ?? 'onbekend';
  }
  const stand = leesStand(data);
  if (stand) set(stand);
  return null;
}

const BEGIN = {
  saldo: 0,
  bevriezers: 0,
  bevrorenDagen: [] as string[],
  instellingen: STANDAARD_INSTELLINGEN,
  teVerzilveren: [] as string[],
  inhaalGedaanVoor: null as string | null,
  bijgewerktOp: null as number | null,
  isBezig: false,
  fout: null as string | null,
};

export const useWinkelStore = create<WinkelState>()(
  persist(
    (set, get) => ({
      ...BEGIN,

      verdien: (sleutels) => {
        const nieuw = sleutels.filter((s) => !get().teVerzilveren.includes(s));
        if (nieuw.length === 0) return;
        set({ teVerzilveren: [...get().teVerzilveren, ...nieuw] });
        void get().verzilver();
      },

      verzilver: async () => {
        const wachtrij = get().teVerzilveren;
        if (wachtrij.length === 0 || get().isBezig) return;
        set({ isBezig: true });
        try {
          const fout = await roepAan(set, 'dukaten_verdien', { p_sleutels: wachtrij });
          // Alleen weghalen wat er bij vertrek in zat: wat er intussen bijkwam gaat de volgende keer.
          if (!fout) set({ teVerzilveren: get().teVerzilveren.filter((s) => !wachtrij.includes(s)) });
        } catch (fout) {
          set({ fout: foutTekst(fout) });
        } finally {
          set({ isBezig: false });
        }
      },

      haalOp: async () => {
        try {
          await roepAan(set, 'winkel_stand');
        } catch (fout) {
          set({ fout: foutTekst(fout) });
        }
      },

      vulProAan: async () => {
        try {
          await roepAan(set, 'pro_bevriezers_aanvullen');
        } catch (fout) {
          set({ fout: foutTekst(fout) });
        }
      },

      koopBevriezer: async () => {
        try {
          const fout = await roepAan(set, 'koop_bevriezer');
          if (!fout) return 'gekocht';
          if (fout.includes('te_weinig_dukaten')) return 'te-weinig-dukaten';
          if (fout.includes('max_bevriezers')) return 'maximum';
          return 'mislukt';
        } catch {
          return 'mislukt';
        }
      },

      gebruikBevriezers: async (dagen) => {
        try {
          const fout = await roepAan(set, 'gebruik_bevriezers', { p_dagen: dagen });
          return fout === null;
        } catch {
          return false;
        }
      },

      markeerInhaalGedaan: (userId) => set({ inhaalGedaanVoor: userId }),

      reset: () => set(BEGIN),
    }),
    {
      name: 'winkel-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // `isBezig` blijft eruit: een bewaarde `true` zou elke volgende verzilvering blokkeren.
      partialize: ({ isBezig: _isBezig, fout: _fout, ...rest }) => rest,
    },
  ),
);
