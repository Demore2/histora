# Baibars: wat er nog moet

Stand 19 nov (avond): script, zinnen, scratchboard en `upload/post.md` klaar, en **de scènes zijn gebouwd** (stap 1-2).

## Klaar

1. **Scènes** (`marketing/remotion/src/lang/`): `BaibarsKit.tsx`, `BaibarsScenes.tsx` (zin 0-38), `BaibarsScenes2.tsx`
   (39-68, `SHOTS_B`), `BaibarsScenes3.tsx` (69-99, `SHOTS_C`), `BaibarsLang.tsx`, `BaibarsShot.ts`, kaart
   `KaarttafelBaibars.tsx` (eigen projectie tot 50°N, zodat de steppe erop past; `KaarttafelMO.tsx` van Saladin is niet
   aangeraakt). 104 shots, timing geschat in `baibars-timing.json` (2,35 woorden/s, 8:53). Geregistreerd als
   `lang-baibars` en `lang-baibars-stem`.
   - `Figuur` (watals) kreeg drie optionele props: `oogKleur` + `oogVlek` (blauwe ogen, wit vlekje) en `hoofdExtra`
     (hoofddeksel dat met het hoofd meedraait: zamt, Mongoolse helm, bontmuts, maliënkap). Bestaande video's veranderen
     niet.
2. **Controle**: vier rondes stills (`node scripts/stills.mjs lang-baibars <map> <frames> 0.4`), alles bekeken en
   bijgesteld. Regels 9-12 gehouden: geen moskee-interieur (paleishal met bogen, minaretten alleen ver weg), geen moord
   in beeld (schaduw op de muur, lege stoel, twee handen + opschrikkende valk), zin 56 = verscheurde brief + dichte poort
   met kraai, kruisvaarders zonder kruis (Lodewijk met gouden ruitjes als lelies), ridderhelm met alleen een horizontale
   spleet.

3. **Thumbnail + omslag**: `BaibarsThumb` (in `CaesarThumb.tsx`), `BaibarsOmslag` + `BaibarsReel` (in
   `CaesarOmslag.tsx`), Stills `lang-baibars-thumb` / `-omslag` / `-reel`. Links de boze jongen met het bordje "DAMAGED
   GOODS" en het witte vlekje (AGE 14), rechts de sultan met het leeuwenvaandel bij zonsondergang (SULTAN). De omslag staat
   in frame 0-2 van `BaibarsLang`; `upload/thumbnail.png` en `upload/omslag-reel.png` zijn gerenderd.

## Nog te doen

4. **Stem** (na het aanvullen van de credits, na Leonidas): Dylan, teaser `speech_rate 0`, rest `-10`, 11 stukken.
   Dan stiltes inkorten, `vo-hoofdstukken.mjs`, render met `--gl=angle`, loudnorm -14 LUFS. Na de echte timing de
   stills nog één keer nalopen: een paar animaties zijn op frames getimed (bv. "ME?" in zin 75, de speld in 52).
5. **Hoofdstuktijden** in `post.md` en in `kanaal/vertalingen.py` (Baibars toevoegen, zelfde zes talen).

## Om te beluisteren / te beslissen

- **Muziek**: Caesar-stukken, keuze per hoofdstuk `STUK = [0, 1, 2, 5, 9, 6, 7, 8, 4, 3, 10]` in `BaibarsLang.tsx`
  (veldslagen III/VI = 5/7, moorden IV/VII = 9/8). Op gevoel gekozen, niet beluisterd.
- De traliewerkramen in de paleishal zijn een raster (geen los kruis); weghalen kan in `Paleis` in de kit.
- Nog geen volledige render gedaan (alleen stills); bij de eerste volle render op `delayRender`-time-outs letten.
