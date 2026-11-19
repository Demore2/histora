# Scratchboard — What If You Were Born as Baibars? (#05)

Eén regel = één zin = één shot (nummering = `zinnen.json`). 16:9, 3D-blokstijl, warm licht, scherptediepte. Zelfde
detailniveau als Leonidas: elk shot een "tweede blik"-grapje of detail, en een gezicht dat iets doet.

## Kwaliteitsregels

De acht regels uit `04-leonidas/werk/scratchboard.md` gelden ongewijzigd (niets tussen camera en onderwerp, geen halve
figuren, niets zwevend, geen z-fighting, geen kruisvormen/bloed/lijken in close-up, ondertitels niet over gezichten,
langzame camera, kaarten "modern borders, approximate"). Extra voor dit onderwerp:

9. **Geen moskee-interieur, geen Kaaba/Mekka/Medina, geen Profeet.** Cairo = citadel, poorten, daken, minaretten alleen
   ver op de achtergrond als silhouet.
10. **Moorden (Turanshah, Qutuz) en Antiochië: niet tonen.** Wel: de aanloop, een gevallen helm/kaars, een lege troon.
11. **Gezanten/hoofden op de poort (zin 56): niet tonen.** Alleen de dichte poort van Cairo, een kraai, Qutuz met een
    verscheurde brief.
12. Kruisvaarders: rode/witte tunieken zonder groot kruis op de borst (kleur + leeuw/lelie van Frankrijk volstaat).

## Vaste figuren (nieuwe kit `BaibarsKit.tsx`)

| Naam | Uiterlijk |
|---|---|
| `BAIBARS_KIND` | Kipchak-jongen, bontmuts, schapenvacht, blauwe ogen (één met een **wit vlekje**), blootsvoets of laarsjes |
| `BAIBARS` | lang, donkere huid, blauwe ogen (wit vlekje links), dunne snor, gele/rode mamelukse tulband-kap (zamt), lamellair pantser, kromme sabel, **leeuwembleem** op schild later |
| `BAIBARS_SULTAN` | zelfde + zwarte abbasidische mantel, gouden band, leeuw-vaandel |
| `MAMELUK` | als Baibars zonder vlekje, varianten in tulbandkleur, boog + koker |
| `MONGOOL` | bontrand-helm met punt, lamellair in donkerrood/bruin, korte paardjes, boog |
| `KITBUQA` | Mongoolse generaal, grijze snor, hoge helm met pluim |
| `HULAGU` | dik, hoge Mongoolse hoed, grijns (alleen op een brief/portret) |
| `QUTUZ` | korte zwarte baard, groene tulband, serieus, later helm die hij op de grond gooit |
| `LODEWIJK` | blond, gouden kroon, blauwe tuniek met gouden lelies, later in boeien met zweetdruppel |
| `RIDDER` | maliënkap, emmerhelm, blauwe/rode tuniek, groot paard |
| `TURANSHAH` | jonge sultan, rode wangen (dronken), beker, zwaard bij de kaarsen |
| `AYDAKIN` | dikke emir met kruisboog, grote snor |
| `HANDELAAR` | slavenhandelaar met weegschaal, tulband, sluw |
| `AQTAY` | mameluk-commandant met litteken, vriendelijk |
| Dieren | paarden, schapen, postduiven (wit), kraai, kamelen |

## Kaarten

`KaarttafelMO.tsx` (Saladin) hergebruiken: Midden-Oosten op de houten tafel, uitgebreid met de steppe ten noorden van de
Zwarte Zee. Kleuren: mamelukkenrijk **geel/oranje**, Mongolen **donkerrood**, kruisvaardersstaten **blauwgrijs**.

## Shots

| # | Zin (kort) | Beeld | Cartoon / detail | Geluid |
|---|---|---|---|---|
| 0 | What if you were Baibars? | Kanonknal-titel "WHAT IF YOU WERE BAIBARS?" in goud, camera schudt | stof dwarrelt van de letters | inslag + glans |
| 1 | Sold at 14, sent back | Slavenmarkt, kind op een kist, koper wijst naar zijn oog en draait zich om | prijsbordje "800" wordt doorgestreept | menigte, tik |
| 2 | Beat a king of France | Lodewijk op zijn paard in een smalle straat, Baibars op het dak | kroon wiebelt | inslag |
| 3 | Stop the Mongols | Kaart: rode Mongoolse pijl stopt tegen een geel schild bij Ain Jalut | pijl buigt krom | inslag |
| 4 | Kill the sultan, take throne | Lege troon, zijn schaduw valt erover | troonkussen nog ingedeukt | wind |
| 5 | So how does a slave boy… | Close-up kind met het witte vlekje, kijkt omhoog naar een kroon | traan blijft hangen | glans |
| 5b | (titelkaart) | "THE LIFE OF BAIBARS" | | inslag |
| 6 | Born ~1223, steppe | Eindeloze steppe met ronde vilttenten (yurts), wieg aan een paal | paard snuffelt aan de wieg | wind |
| 7 | Tents, horseback, sheep | Kamp met kudde, rook uit de tent | schaap kauwt op een muts | wind, schapen |
| 8 | Ride before you can walk | Peuter op een paard, moeder rent erachter | peuter grijnst, moeder zweet | paard |
| 9 | Shoot a bow, open sky | Jongens schieten vanaf het zadel op een strozak; nacht met sterren | één pijl in een schaap-hoed | pijl |
| 10 | Then the Mongols come | Horizon: stofwolk met rode vaandels | kind laat zijn kom vallen | dreun |
| 11 | Sweep across, family runs | Kaart: rode golf over de steppe, tenten vallen | mini-tentjes klappen om | wind |
| 12 | Thousands caught | Rij gevangenen in de verte, touwen | – | wind |
| 13 | Caught, chained, sold | Baibars-kind met touw om de pols, handelaar telt munten | handelaar likt duim | munten |
| 14 | South to Anatolia/Syria | Kaart: oranje stippellijn van de steppe naar Sivas → Hama, mini-karavaan | kameel kijkt chagrijnig | tik |
| 15 | Tall, dark, loud, blue eyes | Baibars als tiener naast een meetlat, roept iets (letters "HEY!") | handelaar houdt oren dicht | tik |
| 16 | White spot in one eye | Extreme close-up op het oog, wit vlekje verschijnt | – | glans |
| 17 | Hama buyer gives you back | Koper tilt zijn monocle, ziet het oog, zet hem terug op de kist | stempel "RETURNED" | stempel |
| 18 | Damaged goods | Bordje "DAMAGED GOODS" op een touwtje om zijn nek | kind kijkt boos (boos-teken) | tik |
| 19 | Aydakin buys, 800 coins | Dikke emir telt 800 munten op een weegschaal | munten stapelen tot toren | munten |
| 20 | Crossbowman, bunduqdar | Aydakin schiet met kruisboog, naam "al-Bunduqdari" verschijnt | pijl raakt een meloen | pijl |
| 21 | Sold on to the sultan | Optocht naar een paleis in Cairo, kind kijkt om | Aydakin zwaait met zakdoek | menigte |
| 22 | Fortress on an island in the Nile | Luchtbeeld: Nijl met eiland Roda, fort, boten | krokodil kijkt op | water |
| 23 | Mamluks = "owned" | Rij jonge soldaten, label "MAMLUK = 'OWNED'" | eentje zwaait naar de camera | tik |
| 24 | Ride, shoot backwards, obey | Baibars galoppeert en schiet achterwaarts, raakt het doel | instructeur valt van verbazing van zijn kruk | pijl, paard |
| 25 | Slave with a sword | Baibars ouder, zwaard omhoog, ketting aan zijn enkel breekt niet | – | glans |
| 26 | 1249, a king of France lands | Strand bij Damiate, schepen met lelievlaggen, Lodewijk stapt uit | ridder valt in het water | golven |
| 27 | Louis IX, later a saint | Lodewijk-portret in gouden lijst, halo-plaatje erboven "1297" | halo zit scheef | glans |
| 28 | Thousands of knights, horse ships | Schepen met paardenhoofden over de reling | paard is zeeziek (groen) | golven |
| 29 | Takes Damietta, up the Nile | Kaart: blauwe lijn langs de Nijl | – | tik |
| 30 | Brother's knights don't wait | Robert van Artois stormt vooruit, Lodewijk roept "WAIT!" | | paarden |
| 31 | Feb 1250, charge into Mansoura | Ridders galopperen een stadspoort binnen | stof | paarden |
| 32 | You're waiting for them | Baibars achter een poort, grijnst, vinger op de lippen | | stilte, tik |
| 33 | Open the gates | Poort zwaait open, ridders rijden in | mameluk achter de poort knipoogt | poort |
| 34 | Streets close like a trap | Bovenaanzicht: smalle straten, poorten klappen dicht achter de ridders | doolhof-effect | dreun |
| 35 | Arrows, stones, pots | Daken met mamelukken en stadsmensen die potten gooien | potten met bloemen, een kat | pijlen |
| 36 | King's brother dies | Gevallen helm met pluim in een lege straat | – | wind |
| 37 | Louis captured | Lodewijk in boeien, kroon scheef, zweetdruppel | | ketting |
| 38 | Still in your twenties | Baibars met jonge snor, tel "AGE ~27" | | tik |
| 39 | New sultan doesn't trust Mamluks | Turanshah op een troon, kijkt achterdochtig naar mamelukken | ogen schieten heen en weer | tik |
| 40 | Drunk, cutting candles, shouting names | Feestzaal, Turanshah slaat kaarsen af met zwaard, kaarsjes met namen | vlammetjes vliegen weg | zwaard |
| 41 | Mamluks strike first | Mamelukken kijken elkaar aan, handen aan het zwaard | | spanning |
| 42 | You're one of the men | Zijn schaduw op de muur, gevallen beker | – | val |
| 43 | Last of Saladin's family dead | Rij portretten van de Ayyubiden, laatste lijst valt van de muur | | val |
| 44 | Turn on each other | Mamelukken trekken aan een troon van twee kanten | troon kraakt | kraak |
| 45 | Aqtay murdered | Lege stoel met zijn tulband, kaars dooft | – | wind |
| 46 | Run for your life | Baibars springt op een paard, nacht, stadspoort | | paarden |
| 47 | Six years of exile | Kaart: zigzag van Syrische steden, kalender bladert 1254→1260 | | tik |
| 48 | Meanwhile, Mongols keep coming | Kaart: rode golf vanuit het oosten | | dreun |
| 49 | 1258 Baghdad | Bagdad (ronde stad) op de kaart, rood overspoeld; ver silhouet met rook | – | dreun |
| 50 | Kill caliph, hundreds of thousands | Getal "HUNDREDS OF THOUSANDS" met "(according to the chroniclers)" | | wind |
| 51 | March into Syria | Rode pijlen naar Syrië | | tik |
| 52 | Aleppo falls | Pin Aleppo kleurt rood | | dreun |
| 53 | Damascus opens gates | Poort van Damascus gaat open, burgers met witte vlag | | poort |
| 54 | Envoy to Cairo, Qutuz | Mongoolse ruiter met brief voor Qutuz op zijn troon | | paard |
| 55 | Surrender or Baghdad | Brief met grote letters "SURRENDER", Hulagu-portret grijnst | | papier |
| 56 | Envoys cut in half, heads on the gate | **Alleen**: Qutuz scheurt de brief doormidden; poort van Cairo, kraai erop | | papier |
| 57 | No way back | Brug achter Qutuz zakt in | | dreun |
| 58 | Qutuz needs every fighter | Qutuz kijkt naar een kleine rij soldaten, telt op zijn vingers | | tik |
| 59 | You come home, make peace | Baibars en Qutuz schudden handen, allebei een beetje stijf | allebei zweetdruppel | glans |
| 60 | 3 Sept 1260, Ain Jalut | Kaart: twee legers naar Ain Jalut, pin met bron | | tik |
| 61 | You lead the front | Baibars voorop met vaandel, mamelukken erachter | | paarden |
| 62 | Find, hit, pretend to run | Baibars zwaait, draait om, "RUN!" (met knipoog) | | paarden |
| 63 | Old steppe trick | Inzet: klein boekje "STEPPE TRICKS VOL. 1" | Mongool leest hetzelfde boekje | papier |
| 64 | Mongols chase into the hills | Mongolen achter hem aan een vallei in | | paarden |
| 65 | Almost break through | Gele linie buigt, rode dringt door | | dreun |
| 66 | Qutuz throws helmet, "O Islam!" | Qutuz gooit helm op de grond, roept | helm stuitert | val, menigte |
| 67 | Kitbuqa killed | Kitbuqa's helm met pluim valt in het gras | – | wind |
| 68 | First defeat, world hears | Kaart: rode golf trekt terug, uitroeptekens over de wereld | | inslag |
| 69 | Ask for Aleppo | Baibars wijst op Aleppo op de kaart | | tik |
| 70 | He says no | Qutuz schudt zijn hoofd | Baibars krijgt boos-teken | tik |
| 71 | On the way, Qutuz hunts | Jachtpartij, valk, haas | haas kijkt op | wind |
| 72 | Take his hand as if to kiss it | Close-up twee handen | – | stilte |
| 73 | The other emirs strike | Valk vliegt op, schrikt (geen geweld in beeld) | | vleugels |
| 74 | Dead, choose a new sultan | Kring emirs kijkt naar Baibars | | menigte |
| 75 | They choose you | Ze wijzen allemaal naar hem | hij wijst naar zichzelf "me?" | glans |
| 76 | al-Malik al-Zahir | Naam in goud op een banier | | glans |
| 77 | Cairo decorated for Qutuz | Feestslingers met Qutuz-vlaggetjes | | menigte |
| 78 | Cheers for you instead | Iemand plakt een Baibars-plaatje over het Qutuz-vlaggetje | | menigte |
| 79 | Seventeen years, never still | Teller 1260→1277, Baibars op paard die van links naar rechts flitst | | paard |
| 80 | Abbasid caliph in Cairo | Ceremonie: kalief in zwarte mantel, Baibars buigt (geen gebedsruimte) | | glans |
| 81 | Postal service, horses, pigeons | Kaart Cairo–Damascus, relaispaarden en duiven, teller "~4 days" | duif met postzakje | vleugels |
| 82 | Travel in disguise | Baibars met nepbaard op een markt | nepbaard valt half af | menigte |
| 83 | Lion emblem | Munt met leeuw, brug met leeuwen | leeuw knipoogt | glans |
| 84 | Crusader castles one by one | Kaart: kastelen-iconen | | tik |
| 85 | Caesarea, Arsuf, Safed, Antioch | Pins kleuren één voor één geel | | tik x4 |
| 86 | Krak des Chevaliers never fallen | Groot kasteel op een berg, bordje "NEVER TAKEN" | | wind |
| 87 | Letter signed by their commander | Brief met lakzegel naar het kasteel | | papier |
| 88 | The letter is forged | Inzet: Baibars die de handtekening oefent, papiertjes om hem heen | tong uit de mond | papier |
| 89 | They surrender anyway | Ridders lopen het kasteel uit, bordje wordt "TAKEN" | | poort |
| 90 | 1277, beat Mongols in Anatolia | Kaart: gele pijl naar Elbistan | | inslag |
| 91 | Damascus, cup of kumis, mare's milk | Beker met witte melk; in de damp een flashback naar de steppe en de yurt | paardje op de beker | tik, wind |
| 92 | A few days later, dead | Lege beker op tafel, kaars dooft | – | wind |
| 93 | About fifty-four | Teller "AGE ~54" | | tik |
| 94 | Poisoned, meant for someone else | Twee bekers die van plaats wisselen (handen) | | tik |
| 95 | Buried in Damascus, library dome | Koepel met boekenkasten eromheen (exterieur + boeken) | | wind |
| 96 | Storytellers in coffee houses | Verteller in een koffiehuis, kinderen luisteren, Baibars-poppetje | kind valt bijna van zijn stoel | menigte |
| 97 | Sent back for one bad eye | Terug naar het kind op de markt, wit vlekje, zoom op het oog | glimlach | glans |
| 98 | Outro: who next? | Afsluiter (LangAfsluiter) | | |
| 99 | Subscribe | Afsluiter | | |

## Thumbnail

Gesplitst, schuine snede (vorm `CaesarThumb.tsx`): links het kind op de slavenmarkt, close-up, wit vlekje in het oog, rood
manga-boos-teken, label **"AGE 14"** (wit), rechts Baibars als sultan met leeuwvaandel, zonsondergang, label
**"SULTAN"** in #FF5436. Geen kleine cursieve regel. Gestapelde 3:4-omslag (AGE 14 boven / SULTAN onder) in frame 0-2 en
als `omslag-reel.png`.
