# 30 seconds of history: Alexander the Great

**Story in the app:** `alexander-the-great` · **Era:** Antiquity · **Spoken words:** 92 (+ shared CTA) · **~34 s**



## v5 — terug naar 30 seconden (2026-11-04, live 2026-11-05) · DEZE GELDT

v4 (de neus van Augustus, naam pas aan het eind) afgekeurd door de eigenaar: te lang (43-48 s) en de neus past niet.
v5: hook = open vraag, antwoord bij Hyphasis, korte twist (het graf). 74 woorden, ~29 s mét CTA op tempo 1.1.
Stem: Kokoro (lokaal, Apache 2.0), keuze tussen bm_daniel / am_michael / am_onyx.

**Hook in beeld:** NEVER **LOST**. / SO WHO / **STOPPED HIM?**

### Voice-over (clean, for TTS)
He never lost a battle. So who stopped him? At twenty, Alexander became king of Macedon. He crossed into Asia. Twice, the Persian king fled from him. He marched on, all the way to India. From Greece to India, it was all his. Then, at the river Hyphasis, his own soldiers refused to go on. Three years later, he was dead, at thirty-two. And to this day, no one knows where he is buried. That's thirty seconds of history.

### Caption
He never lost a battle. So who stopped him? 
#history #alexanderthegreat #ancientgreece #persia #30secondsofhistory #histora

## v4 — de naam pas aan het eind (2026-11-04, live 2026-11-05)

Na de Spartacus-flop (naam + bekend conflict = geen hook): de kijker weet niet over wie het gaat tot beat 10.
Geen gezicht van Alexander vóór de onthulling; kaartlabel "HIS EMPIRE". Tempo 1.1. ~100 woorden.

**Hook in beeld:** AN EMPEROR / BROKE A / **DEAD MAN'S** NOSE · **Cover:** WHO WAS / **THE DEAD MAN?**

### Voice-over (clean, for TTS)
Rome's first emperor came to see a body that was three hundred years old. And, the story goes, he broke off his nose. So who was the dead man? At twenty, he became a king. He crossed into Asia. Twice, the Persian king fled from him. He marched on, to India. He never lost a major battle. Only his own soldiers stopped him, at the river Hyphasis. Three years later, he was dead, at thirty-two. The dead man was Alexander the Great. And today, no one knows where he is buried. That's thirty seconds of history.

### Caption
An emperor broke a dead man's nose. Who was he? 👀
#history #alexanderthegreat #ancientrome #augustus #30secondsofhistory #histora

### Fact notes (v4)
- "Rome's first emperor": Octavian, who became Augustus in 27 BC; the visit was in 30 BC, so the title is anachronistic
  but describes the man correctly. The body: died 323 BC, so ~293 years, rounded to "three hundred".
- Nose: Cassius Dio 51.16.5 ("it is said"), hence "the story goes". Rest as v3.

## v2 — Remotion-sjabloon (2026-11-03)

Gebouwd in `marketing/remotion/` (config `src/videos/alexander-the-great.ts`), zonder Kling-clips. Elke beat is
één hele zin, zodat de timing de zinnen in één doorlopende opname kan vinden. De naam en de claim staan in de
eerste zin; "That's thirty seconds of history." is de vaste gesproken afsluiter, daarna de CTA. De beelden staan
er héél in (niet bijgesneden), met een vage kopie erachter.

**Hook in beeld:** NEVER **LOST** / A MAJOR / BATTLE

| Beat | Voice-over | Beeld |
|---|---|---|
| 0 | Alexander the Great never lost a major battle. | `-6` Gaugamela |
| 1 | The only army that stopped him was his own. | `-2` cavaleriecharge |
| 2 | At twenty, he became king of Macedon, after his father was murdered at a wedding. | portret, flits, **KING AT 20** · *336 BC* |
| 3 | He crossed into Asia. | kaart: Pella → Hellespont, het rijk kleurt mee in · *334 BC* |
| 4 | Twice, the Persian king fled from him. | kaart: → Issus → Gaugamela · *333 BC* |
| 5 | The largest empire on earth collapsed. | `-4` Darius vlucht, flits · *331 BC* |
| 6 | He marched on, to India. | kaart: → Babylon → Persepolis → Hyphasis · *326 BC* |
| 7 | From Greece to India, it was all his. | kaart zoomt uit, het hele rijk kleurt in: ALEXANDER'S EMPIRE |
| 8 | Then, at the river Hyphasis, his own soldiers refused to go on. | `-7` olifanten; muziek valt hard stil |
| 9 | He turned back. | kaart: gestippelde terugweg naar Babylon |
| 10 | Three years later, he was dead. | `-8` de tent in Babylon · *323 BC* |
| 11 | He was thirty-two. | **DEAD AT 32** |
| 12 | That's thirty seconds of history. | |
| CTA | The full story is in Histora. Follow for more. | vos + app-icoon over het laatste beeld |

### Voice-over (clean, for TTS)
Alexander the Great never lost a major battle. The only army that stopped him was his own. At twenty, he became king of Macedon, after his father was murdered at a wedding. He crossed into Asia. Twice, the Persian king fled from him. The largest empire on earth collapsed. He marched on, to India. From Greece to India, it was all his. Then, at the river Hyphasis, his own soldiers refused to go on. He turned back. Three years later, he was dead. He was thirty-two. That's thirty seconds of history.

### Fact notes (v2, naast die van v1 hieronder)
- "Twice, the Persian king fled": Darius III fled at Issus (333 BC) and Gaugamela (331 BC) — Arrian 2.11, 3.14.
- "The largest empire on earth": the Achaemenid Empire was the largest to that date — standard.
- "From Greece to India": Greece through the League of Corinth (Alexander was its hegemon), then Asia Minor, Egypt, Mesopotamia, Persia, Bactria and the Punjab — the standard extent c. 323 BC.
- Hyphasis (326 BC) to his death (June 323 BC) is a little under three years; "three years later" rounds that.
- The map is simplified: the route leaves out Egypt and Bactria, the return is one dashed line back to Babylon, and the empire's outline is drawn by hand from standard historical-atlas maps. Coastlines are modern.

---

## v1 (eerste versie, ffmpeg + Kling)

**Story in the app:** `alexander-the-great` · **Era:** Antiquity · **Spoken words:** 86

## Hook
He never lost a major battle. The only army that stopped him was his own.

## Script
| Time | Voice-over | On screen | Visual |
|---|---|---|---|
| 0–4 s | He never lost a major battle. The only army that stopped him was his own. | 30 SECONDS OF HISTORY · **ALEXANDER THE GREAT** | `alexander-the-great-6.webp` — Gaugamela, armies clashing |
| 4–9 s | At twenty, he became king of Macedon — after his father was murdered at a wedding. | KING AT **20** · *336 BC* | `alexander-the-great-2.webp` — the cavalry charge |
| 9–15 s | He crossed into Asia. At Issus and at Gaugamela, the Persian king fled from him. | the Persian king **fled** · *333 / 331 BC* | `alexander-the-great-3.webp` → `alexander-the-great-4.webp` (Darius's chariot) |
| 15–18 s | The largest empire the world had seen collapsed. | **COLLAPSED** | `alexander-the-great-6.webp`, push into the dust cloud |
| 18–21 s | He marched on, to India. | → **INDIA** · *326 BC* | `alexander-the-great-7.webp` — elephants at the Hydaspes |
| 21–24 s | Then, at the river Hyphasis, his own soldiers refused to go on. | his soldiers **refused** | hold on `alexander-the-great-7.webp`, music drops out |
| 24–28 s | He turned back. Three years later he was dead, at thirty-two. | dead at **32** · *323 BC* | `alexander-the-great-8.webp` — the tent in Babylon |
| 28–31 s | That's thirty seconds of history. | The full story is in Histora | End card: waving fox |

## Voice-over (clean, for TTS)
He never lost a major battle. The only army that stopped him was his own. At twenty, he became king of Macedon — after his father was murdered at a wedding. He crossed into Asia. At Issus and at Gaugamela, the Persian king fled from him. The largest empire the world had seen collapsed. He marched on, to India. Then, at the river Hyphasis, his own soldiers refused to go on. He turned back. Three years later he was dead, at thirty-two. That's thirty seconds of history.

## Caption
Undefeated in battle, stopped by his own men. Alexander's full story is in Histora.
#history #alexanderthegreat #ancientgreece #persia #30secondsofhistory #histora

## Fact notes
- Undefeated in pitched battle — the standard assessment (Arrian; modern: Bosworth, *Conquest and Empire*).
- Philip II assassinated by his bodyguard Pausanias at his daughter's wedding at Aegae, 336 BC; Alexander was 20 (born 356 BC) — Diodorus 16.91–94.
- Darius III fled at Issus (333 BC) and Gaugamela (331 BC) — Arrian 2.11, 3.14.
- Achaemenid Persia was the largest empire to that date — standard.
- Mutiny at the Hyphasis (Beas), 326 BC — Arrian 5.25–29.
- Died in Babylon, June 323 BC, aged 32 — Arrian 7.28. Hyphasis → death is roughly three years.

---

## v3 — voorstel na stats-review 2 (2026-11-03, nog niet ingesproken)

Pompeii-recept: hook laat een vraag open (blijft gelijk), en een **twist aan het eind** die weinig mensen kennen.
"Dead at 32" is bekend en houdt niemand vast; de neus van Augustus en het verdwenen graf wel. Eruit voor de tijd:
de moord op de bruiloft, "the largest empire collapsed", "He turned back". Kaart en stilte bij Hyphasis blijven.
95 woorden, ~38 s op tempo 1.1.

### Voice-over (clean, for TTS)
Alexander the Great never lost a major battle. The only army that stopped him was his own. At twenty, he became king of Macedon. He crossed into Asia. Twice, the Persian king fled from him. He marched on, to India. From Greece to India, it was all his. Then, at the river Hyphasis, his own soldiers refused to go on. Three years later, he was dead, at thirty-two. Three centuries later, Augustus came to see his body, and, the story goes, broke off his nose. Today, no one knows where Alexander is buried. That's thirty seconds of history.

**Nieuwe beats aan het eind:** Babylon-tent · DEAD AT 32 → `-8` of portret, *30 BC*, tekst **BROKE OFF HIS NOSE** →
kaart van Alexandrië met een vraagteken, **TOMB: LOST**.

### Fact notes (v3)
- Augustus in Alexandria, 30 BC (~293 years after 323 BC, "three centuries"): he viewed the body and "touched it, so
  that, it is said, a piece of the nose was broken off" — Cassius Dio 51.16.5. Hence "the story goes".
- The tomb (the Soma in Alexandria) is attested until late antiquity; its location is unknown today — standard.
