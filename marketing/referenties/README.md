# Referenties voor de nieuwe video-pijplijn

Hier verzamelt de eigenaar voorbeelden van het soort video dat Histora wil maken. Claude bouwt
die daarna volledig in Remotion (code), zonder Higgsfield.

| Wat | Waar |
|---|---|
| **Video's** (mp4/mov, gedownload of schermopname) | `videos/` — staat niet in git (video's van anderen, publieke repo) |
| **Links** (Instagram/TikTok/YouTube) + wat je er goed aan vindt | `links.md` |
| **Het nummer** dat onder elke video komt | `muziek/` (mp3/wav) |

Waarom liever het bestand dan alleen een link: Claude kan een Instagram-link niet zelf
afspelen. Met het bestand kan Claude de video beeld voor beeld bekijken (ffmpeg → frames) en het
geluid analyseren (earshot), en zo het tempo, de knippen, de tekst in beeld en de opbouw precies
overnemen.
