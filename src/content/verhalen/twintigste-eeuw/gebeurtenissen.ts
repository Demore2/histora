import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */

export const valVanDeMuur: Verhaal = {
  id: 'fall-of-the-berlin-wall',
  beginJaar: 1961,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Fall of the Berlin Wall' },
  ondertitel: { en: 'How a wall built overnight was opened by a mistake at a press conference' },
  teaser: { en: 'For 28 years it split a city in two. Then, on a November evening, a tired official read out the wrong note.' },
  jaar: 1989,
  periodeLabel: '1961 - 1989',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['fall-of-the-berlin-wall'],
  portretKleur: '#4F5A63',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'twintigste-eeuw',
  themas: ['koude-oorlog', 'berlijn', 'vrijheid', 'duitsland', 'revolutie'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Fall of the Berlin Wall' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Wall in One Night' },
      afbeelding: SCENE_IMAGES['fall-of-the-berlin-wall-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-the-berlin-wall-1'],
          alt: { en: 'Soldiers unrolling barbed wire across a cobbled street at dawn, residents watching from apartment windows.' },
          bijschrift: { en: '13 August 1961: Berliners woke up to find their city cut in two.' },
        },
        { type: 'tekst', inhoud: { en: 'After the Second World War, Germany was divided. The West became a democracy allied with the United States; the East, the German Democratic Republic, was a communist state controlled by the Soviet Union. Berlin lay deep inside East Germany, but it too was split, and West Berlin was an island of the West in the middle of the East.' } },
        { type: 'tekst', inhoud: { en: 'For East Germans, West Berlin was an open door. You could take the underground train across and never come back. Between 1949 and 1961 well over two and a half million people left the East, many of them young and skilled. The communist state was bleeding to death.' } },
        { type: 'sleutelmoment', jaar: 1961, tekst: { en: 'In the night of 12 to 13 August, East German troops seal the border around West Berlin.' } },
        { type: 'kop', tekst: { en: 'Sunday Morning' } },
        { type: 'tekst', inhoud: { en: 'In the early hours of Sunday 13 August 1961, soldiers and workers rolled out barbed wire along the border, tore up streets and blocked the train lines. Families woke up separated from parents, children and friends a few streets away. In the following days and years the wire was replaced by concrete: eventually a wall of about 155 kilometres around West Berlin, with a "death strip" of sand, floodlights, dogs and watchtowers behind it.' } },
        { type: 'weetje', tekst: { en: 'Two days after the border closed, a nineteen-year-old East German soldier, Conrad Schumann, jumped over the barbed wire into the West. The photograph of his leap became one of the most famous images of the Cold War.' } },
        { type: 'tekst', inhoud: { en: 'The East German government called it the "Anti-Fascist Protection Rampart", as if it were meant to keep enemies out. Everybody knew it was built to keep its own people in. At least 140 people died at the Berlin Wall over the years, shot while trying to escape, drowned in the river, or killed in accidents at the border.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'Candles in Leipzig' },
      afbeelding: SCENE_IMAGES['fall-of-the-berlin-wall-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-the-berlin-wall-2'],
          alt: { en: 'Thousands of people marching peacefully with candles through the streets of Leipzig at night, a church behind them.' },
          bijschrift: { en: 'Leipzig, 9 October 1989: seventy thousand people, and no shots fired.' },
        },
        { type: 'tekst', inhoud: { en: 'By 1989 the Soviet Union was changing. Its leader, Mikhail Gorbachev, was trying to reform the communist system and had made it clear that Soviet tanks would no longer crush protests in the countries of Eastern Europe. Poland and Hungary began to open up. The East German leader, Erich Honecker, refused to change anything at all.' } },
        { type: 'tekst', inhoud: { en: 'In May 1989 Hungary started taking down the fence on its border with Austria. Thousands of East Germans, who were allowed to travel to Hungary on holiday, saw their chance. Over the summer they streamed west through Hungary, or crowded into the West German embassies in Prague and Warsaw, until those were overflowing.' } },
        { type: 'kop', tekst: { en: 'Monday Evenings' } },
        { type: 'tekst', inhoud: { en: 'Those who stayed began to protest. In Leipzig, people gathered every Monday evening after prayers in the Nikolai Church and marched around the city centre, chanting "Wir sind das Volk", "We are the people". On 9 October, some seventy thousand marched, while police and soldiers stood ready and hospitals prepared for casualties. Nobody gave the order to shoot. The marchers carried candles and chanted "Keine Gewalt", "No violence".' } },
        { type: 'sleutelmoment', jaar: 1989, tekst: { en: 'On 9 October, around 70,000 people march peacefully through Leipzig. The regime does not intervene.' } },
        { type: 'tekst', inhoud: { en: 'After that, fear changed sides. Honecker was pushed out on 18 October and replaced by Egon Krenz. On 4 November, hundreds of thousands of people filled the Alexanderplatz in East Berlin to demand free speech and free elections. The government, desperate to calm things down, drafted a new law that would make travel to the West easier.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Immediately, Without Delay' },
      afbeelding: SCENE_IMAGES['fall-of-the-berlin-wall-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-the-berlin-wall-3'],
          alt: { en: 'A crowded press conference room, an official at a long table reading from a sheet of paper, journalists with microphones.' },
          bijschrift: { en: 'East Berlin, 9 November 1989, just before seven in the evening.' },
        },
        { type: 'tekst', inhoud: { en: 'On the evening of 9 November 1989, Günter Schabowski, a senior member of the ruling party, held a long and dull press conference that was broadcast live on television. Just before it began, he had been handed a note about the new travel rules. He had not been at the meeting where they were agreed, and he had not read the note carefully.' } },
        { type: 'tekst', inhoud: { en: 'Near the end, almost as an afterthought, he read it out: East Germans would be allowed to apply for travel abroad without the usual conditions, and could leave through any border crossing, including those into West Berlin. The journalists in the room were stunned. One of them asked the obvious question: when does this take effect?' } },
        { type: 'kop', tekst: { en: 'The Note' } },
        { type: 'tekst', inhoud: { en: 'Schabowski shuffled his papers. Nothing in them gave a date. In fact, the new rules were meant to start the next day, with proper visa applications and an orderly process. But he did not know that.' } },
        { type: 'citaat', tekst: { en: 'That comes into effect, according to my information, immediately, without delay.' }, bron: { en: 'Günter Schabowski, press conference, 9 November 1989' } },
        { type: 'weetje', tekst: { en: 'The question that started it all is usually credited to Riccardo Ehrman, an Italian correspondent, though several journalists in the room were asking the same thing at the same moment.' } },
        { type: 'tekst', inhoud: { en: 'Within an hour, West German television was reporting that the Wall was open. East Berliners, most of whom watched Western TV, did not wait to find out whether it was true. They put on their coats and went to the border crossings to see for themselves.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Night the Gates Opened' },
      afbeelding: SCENE_IMAGES['fall-of-the-berlin-wall-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-the-berlin-wall-4'],
          alt: { en: 'Jubilant crowds standing on top of the Berlin Wall in front of the Brandenburg Gate at night, under floodlights.' },
          bijschrift: { en: 'Night of 9 to 10 November 1989: Berliners on top of the Wall.' },
        },
        { type: 'tekst', inhoud: { en: 'At the Bornholmer Strasse crossing, thousands of people gathered, chanting "Open the gate!" The officer in charge, Harald Jäger of the Stasi, the secret police, phoned his superiors again and again. Nobody would give him an order. Nobody wanted to be responsible for opening the border, or for shooting into a peaceful crowd.' } },
        { type: 'tekst', inhoud: { en: 'At around half past eleven that night, Jäger decided on his own. He told his men to open the barrier and let everybody through. Over the next hours the other crossings followed. People who had never seen the West walked over, crying, laughing, hugging strangers. West Berliners met them with flowers and bottles of sparkling wine.' } },
        { type: 'sleutelmoment', jaar: 1989, tekst: { en: 'In the night of 9 to 10 November, the border crossings in Berlin open and the Wall falls.' } },
        { type: 'kop', tekst: { en: 'Wall Peckers' } },
        { type: 'tekst', inhoud: { en: 'At the Brandenburg Gate, people climbed onto the Wall itself and danced on top of it. In the following days, thousands of Berliners attacked it with hammers and chisels, chipping off pieces as souvenirs. They were nicknamed Mauerspechte, "wall woodpeckers". The official demolition began the next year.' } },
        { type: 'weetje', tekst: { en: 'The Wall did not fall because of a plan. It opened because of a badly read note, a tired official, live television, and an officer at a crossing who chose not to shoot.' } },
        { type: 'tekst', inhoud: { en: 'Less than a year later, on 3 October 1990, East and West Germany were reunited. The Soviet Union itself collapsed at the end of 1991, and with it the Cold War. Today a line of cobblestones runs through Berlin where the Wall once stood, and in places you can step across it without noticing.' } },
      ],
    },
  ],
};

export const maanlanding: Verhaal = {
  id: 'moon-landing',
  beginJaar: 1969,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Moon Landing' },
  ondertitel: { en: 'Apollo 11 as Houston lived it: alarms, fuel calls and a speech nobody had to read' },
  teaser: { en: 'Two men walked on the Moon. Behind them stood a computer that nearly gave up, a room full of people holding their breath, and a speech written in case they never came home.' },
  jaar: 1969,
  periodeLabel: '1969',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['moon-landing'],
  portretKleur: '#3D4656',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'twintigste-eeuw',
  themas: ['ruimtevaart', 'apollo', 'techniek', 'koude-oorlog', 'wetenschap'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Moon Landing' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Four Hundred Thousand People' },
      afbeelding: SCENE_IMAGES['moon-landing-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['moon-landing-1'],
          alt: { en: 'Mission Control in 1969, rows of consoles with small screens, flight controllers in white shirts and ties.' },
          bijschrift: { en: 'Mission Control, Houston: many of the flight controllers were in their twenties.' },
        },
        { type: 'tekst', inhoud: { en: 'On 16 July 1969 a Saturn V rocket lifted off from Florida with three astronauts on board: Neil Armstrong, Buzz Aldrin and Michael Collins. Their names are the ones everyone remembers. But Apollo was the work of around 400,000 people, engineers, scientists, seamstresses, factory workers and programmers, spread over thousands of companies and universities.' } },
        { type: 'tekst', inhoud: { en: 'The landing itself would be guided from a room in Houston, Texas: Mission Control. Rows of flight controllers sat at consoles with small black-and-white screens, each responsible for one system: fuel, guidance, communications, the crew\'s health. Many of them were in their twenties. The man in charge during the landing was flight director Gene Kranz.' } },
        { type: 'kop', tekst: { en: 'A Computer Woven by Hand' } },
        { type: 'tekst', inhoud: { en: 'The lunar module, called Eagle, carried a computer that had to help fly it down to the surface. By modern standards it was tiny: its working memory held about two thousand words. Its programs were stored in "core rope" memory, made by threading copper wire through or around tiny magnetic rings, a job done largely by women working by hand at a factory in Massachusetts.' } },
        { type: 'weetje', tekst: { en: 'The software was written at the MIT Instrumentation Laboratory, where Margaret Hamilton led the team that built the onboard flight software. Her later work helped make "software engineering" a recognised field.' } },
        { type: 'tekst', inhoud: { en: 'Before the landing, Kranz polled every controller, one by one: go or no go? He had the doors to the control room locked. Nobody would come in or out until Eagle was either on the Moon, or on its way back up.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'Program Alarm' },
      afbeelding: SCENE_IMAGES['moon-landing-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['moon-landing-2'],
          alt: { en: 'Inside a spacecraft cockpit, a small computer keypad display with glowing numbers and a warning light.' },
          bijschrift: { en: '20 July 1969: "Program alarm. It\'s a 1202."' },
        },
        { type: 'tekst', inhoud: { en: 'On 20 July Eagle separated from the command module Columbia and began its powered descent, about fifteen kilometres above the Moon. A few minutes in, a yellow light came on in the cockpit. Armstrong\'s voice came over the radio, tense: "Program alarm." Then: "It\'s a 1202."' } },
        { type: 'tekst', inhoud: { en: 'Nobody in the crew knew what a 1202 meant. In Houston, the guidance officer was Steve Bales, 26 years old. Behind him, in a back room, sat an engineer named Jack Garman, who had made a handwritten list of every alarm code the computer could produce, and what each one meant.' } },
        { type: 'kop', tekst: { en: 'Go on That Alarm' } },
        { type: 'tekst', inhoud: { en: 'A 1202 meant the computer was being asked to do more work than it had time for. But it had been designed for exactly that: instead of crashing, it dropped its least important tasks, restarted, and kept the essential ones, like steering the spacecraft, running. As long as the alarms did not come constantly, it was safe to go on. Garman told Bales; Bales told Kranz. "We\'re go on that alarm."' } },
        { type: 'weetje', tekst: { en: 'The alarms happened because a radar meant for docking back with Columbia was set up in a way that kept interrupting the computer with useless data. The software itself did exactly what it was built to do.' } },
        { type: 'tekst', inhoud: { en: 'More alarms followed, a 1201 and more 1202s, each one deciding in seconds whether two men would land or turn back. Each time, Houston said go. Had the computer been designed less carefully, or had a young engineer not kept a list on a sheet of paper, the mission would almost certainly have been called off.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Thirty Seconds' },
      afbeelding: SCENE_IMAGES['moon-landing-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['moon-landing-3'],
          alt: { en: 'A lunar module descending over a cratered grey surface, its engine kicking up dust, boulders below.' },
          bijschrift: { en: 'Armstrong flew the last part of the landing by hand.' },
        },
        { type: 'tekst', inhoud: { en: 'As Eagle came down, Armstrong looked out of the window and saw that the computer was taking them towards a crater surrounded by boulders the size of cars. He took over semi-manual control and flew on, low over the surface, looking for a flat spot. Aldrin called out speeds and heights beside him.' } },
        { type: 'tekst', inhoud: { en: 'In Houston, the fuel was the problem. The capsule communicator, the only person in Mission Control who spoke to the crew, was astronaut Charlie Duke. On the advice of the controllers he called out the warnings: "Sixty seconds." Then: "Thirty seconds." When the counter ran out, they would have to abort or land, whatever was below them. The room went silent.' } },
        { type: 'kop', tekst: { en: 'Tranquility Base' } },
        { type: 'tekst', inhoud: { en: 'Dust blew up from the surface, hiding the ground. Then Aldrin said: "Contact light." The engine shut down. After a short pause, Armstrong spoke: "Houston, Tranquility Base here. The Eagle has landed." Later analysis suggested they had a little more fuel left than they thought in that moment, but no one in the room knew that.' } },
        { type: 'citaat', tekst: { en: 'Roger, Tranquility, we copy you on the ground. You got a bunch of guys about to turn blue. We\'re breathing again. Thanks a lot.' }, bron: { en: 'Charlie Duke, Mission Control, 20 July 1969' } },
        { type: 'sleutelmoment', jaar: 1969, tekst: { en: 'On 20 July, the lunar module Eagle lands in the Sea of Tranquility.' } },
        { type: 'tekst', inhoud: { en: 'A few hours later, around 600 million people around the world watched on television as Armstrong climbed down the ladder and stepped onto the surface. Aldrin followed him. They spent about two and a half hours outside, collecting rocks, setting up experiments and planting a flag.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'In Event of Moon Disaster' },
      afbeelding: SCENE_IMAGES['moon-landing-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['moon-landing-4'],
          alt: { en: 'A space capsule floating in the ocean with an orange flotation collar, a helicopter overhead and a ship in the distance.' },
          bijschrift: { en: '24 July 1969: splashdown in the Pacific.' },
        },
        { type: 'tekst', inhoud: { en: 'While his crewmates walked on the Moon, Michael Collins circled above it alone in Columbia. Each time he passed behind the Moon he lost all contact with Earth, for about 48 minutes. He later wrote that he did not feel lonely, but aware, expectant and satisfied, and almost joyful.' } },
        { type: 'tekst', inhoud: { en: 'Getting off the Moon was the part nobody could rehearse for real. Eagle\'s ascent engine had to work the first time; there was no backup. Then, inside the cabin, Aldrin found that a switch for arming the engine had broken off. He pushed the circuit breaker in with a felt-tip pen, and it worked.' } },
        { type: 'kop', tekst: { en: 'The Speech Nobody Read' } },
        { type: 'tekst', inhoud: { en: 'In Washington, President Nixon\'s speechwriter William Safire had prepared a text in case the astronauts were stranded on the surface. It was dated 18 July 1969, two days before the landing. Nixon would have phoned the widows, and then told the world.' } },
        { type: 'citaat', tekst: { en: 'Fate has ordained that the men who went to the moon to explore in peace will stay on the moon to rest in peace.' }, bron: { en: 'William Safire, "In Event of Moon Disaster", 18 July 1969' } },
        { type: 'weetje', tekst: { en: 'After they splashed down, the three astronauts spent 21 days in quarantine, in case they had brought back germs from the Moon. They had not; the Moon is lifeless.' } },
        { type: 'tekst', inhoud: { en: 'Eagle lifted off safely, docked with Columbia, and on 24 July the crew splashed down in the Pacific Ocean, where they were picked up by the aircraft carrier USS Hornet. Safire\'s speech went into a file and was forgotten for decades. Five more Apollo missions landed on the Moon after Apollo 11. Since the last one, in 1972, nobody has been back.' } },
      ],
    },
  ],
};

export const twintigsteEeuwGebeurtenissen: Verhaal[] = [valVanDeMuur, maanlanding];
