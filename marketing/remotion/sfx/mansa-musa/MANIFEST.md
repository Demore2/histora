# Mansa Musa: geluidseffecten

Kandidaten van Openverse (allemaal Freesound). Licentie gelezen op de pagina van het geluid zelf (2026-11-04).
Ruwe downloads staan in `downloads/` (gitignored); de gekozen trims komen in `public/mansa-musa/sfx/`.

## Geplande momenten (uit `src/videos/timing/mansa-musa.json`, knip = beatstart - 0,1 s)

| t (s) | moment | wat de muziek daar al doet | plan |
|---|---|---|---|
| 0.000 | hook "SO MUCH GOLD" | boem + glinsterklokjes | muntenregen, zacht onder het eerste woord |
| ~12.6 | Cairo, "he gave it away" | glinsterregen + koper | handvol munten die neerkletteren (ander bestand dan de hook) |
| 19.07 | na "he ran out", in de stilte | muziek valt hard weg | **één munt die valt en uittolt** (het belangrijkste effect) |
| 19.51 | stempel "IN DEBT" | zachte boem | rubberstempel-klap |
| 8.36 | kaart, Sahara | whoosh + karavaanritme | overgeslagen: geen bruikbare kameelbel (CC0/BY) gevonden, de muziek draagt het |
| 14.90 | stempel "12" telt op | lage klokken | overgeslagen: ligt op de zin, de muziek draagt het |
| 24.22 | CTA (vos) | kora-noot | overgeslagen: sjabloonkeuze voor alle shorts, niet per video |

## Kandidaten

| bestand | voor | Openverse id | maker | licentie (pagina) | duur | earshot | gekozen |
|---|---|---|---|---|---|---|---|
| ov-40b9f284_coins-being-poured.mp3 | hook / Cairo | 40b9f284 | TheWoodlandNomad | CC0 1.0 | 8.7 | – | – |
| ov-be8b7740_coins-wav.mp3 | hook / Cairo | be8b7740 | eZZin | CC0 1.0 | 4.0 | – | – |
| ov-3a374eff_coins-04-wav.mp3 | hook / Cairo | 3a374eff | Anthousai | CC0 1.0 | 1.3 | – | – |
| ov-a4e7034b_coins-01-wav.mp3 | hook / Cairo | a4e7034b | Anthousai | CC0 1.0 | 1.3 | – | – |
| ov-806284ff_coins.mp3 | hook / Cairo | 806284ff | dj997 | **CC BY 3.0** | 4.0 | – | – |
| ov-65a4635b_coin-spin-1.mp3 | munt valt | 65a4635b | SpaceJoe | CC0 1.0 | 1.9 | – | – |
| ov-a8e2063f_coin-spin-6.mp3 | munt valt | a8e2063f | SpaceJoe | CC0 1.0 | 5.6 | – | – |
| ov-a0c9fc56_coin-spinning-wav.mp3 | munt valt | a0c9fc56 | ThunderQuads | CC0 1.0 | 8.7 | – | – |
| ov-c154424d_es-stamp-wav.mp3 | stempel | c154424d | eddies2000 | CC0 1.0 | 5.2 | – | – |
| ov-e5f3310d_17-stamp-rubber-plastic-wav.mp3 | stempel | e5f3310d | 15FPanska_KristynaHaupt | CC0 1.0 | 15.6 | – | – |
| ov-f65de1b6_thump-mp3.mp3 | stempel | f65de1b6 | mpuffenbarger | CC0 1.0 | 0.7 | – | – |

Landingspagina's en download-URL's: `candidates.json`.

Earshot draait met de volledige ffmpeg in `G:/dev-tools/ffmpeg-full/ffmpeg-9.0.2-essentials_build/bin` (vooraan op
het PATH zetten); de Remotion-ffmpeg in `G:/dev-tools/ffmpeg` mist de `f32le`-muxer.

## Definitief (2026-11-05, door de eigenaar beluisterd en goedgekeurd)

| t (s) | moment | bestand in `public/mansa-musa/sfx/` | bron + trim | volume | earshot |
|---|---|---|---|---|---|
| 12.75 | Cairo, "he gave it away" | `2-cairo-munten.wav` | be8b7740 (eZZin, CC0), 1.000-2.000 s, fade in 10 ms / uit 300 ms | 0.6 | los: "coins dropping" z +4.5, p_real 0.95; in de mix niet meer apart te horen, de eigenaar hoort hem wel |
| 19.09 | de stilte na "he ran out" | `3-laatste-munt.wav` | a0c9fc56 (ThunderQuads, CC0), 0.250-1.451 s, -1 dB, fade uit 300 ms | 0.7 | in de mix "coins dropping" z +2.7, sync 0 ms |

Afgevallen: de hook-muntenregen (40b9f284), omdat die onder de eerste zin als sissen klonk en de true peak naar 0 dBTP duwde;
de stempel ("Thump", f65de1b6), omdat earshot er een kick drum in hoorde en de muziek daar al een dreun heeft; dj997 (CC BY), vanwege 758 geclipte samples.
Eindmix: -14.5 LUFS, true peak -1.1 dBTP. Alles CC0, dus geen naamsvermelding nodig.
