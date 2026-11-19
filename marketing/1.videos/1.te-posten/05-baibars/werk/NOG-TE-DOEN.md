# Baibars: wat er nog moet

Stand 19 nov: `script.md` (100 zinnen, ~1.110 woorden, ~8 min, feitentabel), `zinnen.json`, `hoofdstuk-teksten.json`
(11 stukken voor de stem), `scratchboard.md` (shot per zin, figuren, gevoeligheidsregels, thumbnail) en `upload/post.md`.

1. **Scènes bouwen** in `marketing/remotion/src/lang/`: `BaibarsKit.tsx` (figuren uit het scratchboard), `BaibarsScenes*.tsx`,
   `BaibarsLang.tsx` (vorm van `LeonidasLang.tsx`), kaart via `KaarttafelMO.tsx` uitgebreid met de steppe. Timing eerst
   geschat (`baibars-timing.json`, 2,35 woorden/s). Registreren in `Root.tsx` als `lang-baibars`.
2. **Controle**: stills per shot (`node scripts/stills.mjs lang-baibars <map> <frames> 0.4`), vellen bekijken, regels 1-12
   uit het scratchboard nalopen (vooral: geen moord, geen hoofden op de poort, geen moskee-interieur).
3. **Thumbnail + omslag** (`BaibarsThumb.tsx` naar `CaesarThumb.tsx`; gestapelde 3:4-omslag in frame 0-2 + `omslag-reel.png`).
4. **Stem** (na het aanvullen van de credits, na Leonidas): Dylan, teaser `speech_rate 0`, rest `-10`, 11 stukken.
   Dan stiltes inkorten, `vo-hoofdstukken.mjs`, render met `--gl=angle`, loudnorm -14 LUFS.
5. **Hoofdstuktijden** in `post.md` en in `kanaal/vertalingen.py` (Baibars toevoegen, zelfde zes talen).
