import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */
// Allebei herschreven op 2026-10-28 (waren 8 hoofdstukken). De id's bleven, zodat voortgang,
// Dukaten en quizvragen blijven kloppen; hoofdstukken 1-4/1-5 zijn nu nieuwe tekst.

export const romesRise: Verhaal = {
  id: 'rome-rise',
  beginJaar: -753,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Founding of Rome' },
  ondertitel: { en: 'Twins, a wolf, seven kings and the night Rome swore off kings for good' },
  teaser: { en: 'A she-wolf, a murdered brother and a king driven out by his own city. How much of Rome\'s own origin story is true?' },
  jaar: -509,
  periodeLabel: '753 BC - 509 BC',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['rome-rise'],
  portretKleur: '#A0522D',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'oudheid',
  themas: ['rome', 'legende', 'koningen', 'republiek', 'archeologie'],
  leestijdMinuten: 6,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Founding of Rome' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Twins and the Wolf' },
      afbeelding: SCENE_IMAGES['rome-rise-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['rome-rise-1'],
          alt: { en: 'Thatched huts on green hills above the Tiber, with shepherds and grazing sheep.' },
          bijschrift: { en: 'The Palatine, where the story says a shepherd found two baby boys.' },
        },
        { type: 'tekst', inhoud: { en: 'Every Roman child knew how it began. In the hill town of Alba Longa, a king named Numitor was pushed off his throne by his brother Amulius. To make sure no grandson would ever come back for revenge, Amulius forced Numitor\'s daughter, Rhea Silvia, to become a Vestal Virgin, a priestess sworn never to marry. She gave birth to twins anyway, and claimed their father was Mars, the god of war.' } },
        { type: 'tekst', inhoud: { en: 'Amulius ordered the babies drowned in the Tiber. The servants could not bring themselves to do it properly. The river was in flood, so they left the basket at the edge of the water and walked away. When the flood went down, the basket was stranded under a fig tree. A she-wolf came down from the hills to drink, heard the crying, and fed the boys. A royal shepherd, Faustulus, found them and took them home to his wife.' } },
        { type: 'kop', tekst: { en: 'A Quarrel Over Birds' } },
        { type: 'tekst', inhoud: { en: 'Grown up, Romulus and Remus put their grandfather back on his throne and set off to found a city of their own, on the spot where they had been found. They could not agree on who should rule it, so they asked the gods, by watching for birds. Remus saw six vultures first. Romulus then saw twelve. Each claimed victory. Romulus began marking out his wall on the Palatine hill, and Remus, mocking it, jumped over the low trench. Romulus killed him.' } },
        { type: 'citaat', tekst: { en: 'So perish whoever else shall leap over my walls.' }, bron: { en: 'Romulus, as told by Livy (History of Rome, Book 1)' } },
        { type: 'weetje', tekst: { en: 'Even the Romans had doubts. The historian Livy noted that lupa, "she-wolf", was also slang for a prostitute, and that some people thought the shepherd\'s wife had simply earned that nickname.' } },
        { type: 'tekst', inhoud: { en: 'This is legend, and the Romans who wrote it down knew it. Livy, working seven centuries later, said openly that he could neither confirm nor deny these stories. But a city that tells itself it was born from a god, a wolf and a murder is telling you what it wants to be: fierce, chosen, and willing to kill for its walls.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'What the Spade Found' },
      afbeelding: SCENE_IMAGES['rome-rise-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['rome-rise-2'],
          alt: { en: 'An early Roman king in ceremonial robes leading a procession through a young city.' },
          bijschrift: { en: 'Seven kings, says tradition. The archaeology tells a slower story.' },
        },
        { type: 'tekst', inhoud: { en: 'The famous date, 21 April 753 BC, was not handed down from the founders. It was worked out in the first century BC by the scholar Marcus Terentius Varro, counting backwards through lists of officials and kings. Other Roman writers had placed the founding decades earlier or later. The 21st of April was already a shepherds\' festival, the Parilia, which made it a fitting birthday.' } },
        { type: 'sleutelmoment', jaar: -753, tekst: { en: 'The traditional founding of Rome, the year from which later Romans counted their history.' } },
        { type: 'tekst', inhoud: { en: 'Archaeologists have found that Varro was not far off, in one sense. On the Palatine hill there are the post-holes of oval Iron Age huts from around the 8th century BC, and in the valley below, graves that are older still. Rome was not founded in a day by one man. It grew out of a cluster of villages on neighbouring hills that slowly merged, until the marshy valley between them became a shared meeting place: the Forum.' } },
        { type: 'kop', tekst: { en: 'Seven Kings' } },
        { type: 'tekst', inhoud: { en: 'Tradition gave Rome seven kings after Romulus\'s death: Numa Pompilius, who was said to have created the priesthoods and the calendar; the warlike Tullus Hostilius; Ancus Marcius; and then three kings with links to the Etruscans, the powerful culture to the north: Tarquinius Priscus, Servius Tullius and Tarquinius Superbus. Under them the Forum was drained by a great sewer, the Cloaca Maxima, and work began on a vast temple to Jupiter on the Capitoline hill.' } },
        { type: 'weetje', tekst: { en: 'The famous bronze she-wolf in Rome\'s Capitoline Museums was long thought to be ancient. Tests in the 2000s dated it to the Middle Ages, and the twins beneath her were only added around the late 15th century.' } },
        { type: 'tekst', inhoud: { en: 'Seven kings across 244 years would mean an average reign of about 35 years, unusually long for any era. Most historians think the list was simplified, or partly invented, to fill a past that nobody had written down. But the Etruscan influence is real: it shows in Rome\'s temples, its symbols of office, and in the city\'s first real streets.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Tarquin the Proud' },
      afbeelding: SCENE_IMAGES['rome-rise-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['rome-rise-6'],
          alt: { en: 'Romans facing fellow Romans across a barricaded forum under storm light.' },
          bijschrift: { en: 'The city turned on its king, and never accepted another.' },
        },
        { type: 'tekst', inhoud: { en: 'The last king, Lucius Tarquinius Superbus, "Tarquin the Proud", was remembered as everything a king should not be. He had taken the throne by murder, executed senators without trial, and forced ordinary Romans to labour on his building projects. Rome put up with him while his wars brought in plunder. What it could not forgive was what his son did.' } },
        { type: 'tekst', inhoud: { en: 'According to Livy, Sextus Tarquinius forced himself on Lucretia, the wife of his own relative Collatinus. The next day Lucretia sent for her father and her husband, told them what had happened, made them swear to take revenge, and then stabbed herself in front of them.' } },
        { type: 'kop', tekst: { en: 'The Man Who Pretended to Be a Fool' } },
        { type: 'tekst', inhoud: { en: 'One of the men in the room was Lucius Junius Brutus, the king\'s own nephew. He had survived at court by acting slow-witted; his nickname, Brutus, meant "dullard". Now he pulled the knife from Lucretia\'s body and swore that no Tarquin, and no king of any kind, would ever rule Rome again. He had her body carried out into the town square for everyone to see, then rode to Rome and called the people together, and the city rose.' } },
        { type: 'sleutelmoment', jaar: -509, tekst: { en: 'The traditional date for the expulsion of Tarquin the Proud and the end of the monarchy.' } },
        { type: 'tekst', inhoud: { en: 'Tarquin was away with the army. When he rode back, the gates were shut against him. He went into exile and spent years trying to win his throne back with the help of Etruscan allies. Whether it happened quite like this is impossible to prove, and the story has the neat shape of a moral tale. But the Romans believed it, and for the next five centuries the word rex, king, was one of the most dangerous insults in their politics.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'Two Consuls, One Year' },
      afbeelding: SCENE_IMAGES['rome-rise-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['rome-rise-3'],
          alt: { en: 'The Roman Senate assembled in the Curia, a speaker standing mid-argument.' },
          bijschrift: { en: 'Power designed to expire: two consuls, elected for a single year.' },
        },
        { type: 'tekst', inhoud: { en: 'In place of a king, Rome now elected two magistrates, the consuls, who held office for just one year and could block each other. Brutus and Collatinus were said to be the first. The new state was called the res publica, "the public thing", the word that gives us republic.' } },
        { type: 'tekst', inhoud: { en: 'The test came almost at once. A group of young nobles plotted to let Tarquin back into the city, and among the conspirators were Brutus\'s own two sons. As consul, Brutus had to sit in judgement. Livy describes him watching, without looking away, as his sons were flogged and beheaded.' } },
        { type: 'kop', tekst: { en: 'A Bridge Held by One Man' } },
        { type: 'tekst', inhoud: { en: 'Then the Etruscan king Lars Porsenna marched on Rome to restore Tarquin. In the most famous of the stories, a soldier named Horatius Cocles held the wooden bridge over the Tiber almost alone, while the Romans behind him hacked it down. When it fell, he jumped into the river in full armour and swam back. The Romans set up a statue to him. Historians today treat him, like the twins and the wolf, as legend.' } },
        { type: 'weetje', tekst: { en: 'Five hundred years later, Julius Caesar\'s killers made a point of this history. Their leader, Marcus Brutus, claimed descent from the Brutus who drove out the last king.' } },
        { type: 'tekst', inhoud: { en: 'Rome would conquer Italy, then the Mediterranean, as a republic. Even when Augustus finally made himself sole ruler, he refused the title of king and called himself only princeps, "first citizen". The story of its founding had given Rome two things it never lost: the belief that it was destined for greatness, and a deep fear of any one man holding too much power.' } },
      ],
    },
  ],
};

export const pompeiiDisaster: Verhaal = {
  id: 'pompeii-disaster',
  beginJaar: 79,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Destruction of Pompeii' },
  ondertitel: { en: 'Two days in 79 AD, told by the teenager who watched it happen' },
  teaser: { en: 'Seventeen years after an earthquake warned them, a mountain nobody feared buried a city in a day and a night.' },
  jaar: 79,
  periodeLabel: '79 AD',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['pompeii-disaster'],
  portretKleur: '#C17F4E',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'oudheid',
  themas: ['ramp', 'pompeii', 'vesuvius', 'roman-life', 'natuur'],
  leestijdMinuten: 7,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'Mount Vesuvius Eruption' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Warning Nobody Read' },
      afbeelding: SCENE_IMAGES['pompeii-disaster-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pompeii-disaster-1'],
          alt: { en: 'A busy Pompeii street with painted shopfronts and Vesuvius peaceful behind the rooftops.' },
          bijschrift: { en: 'Pompeii in 79 AD: about eleven thousand people, and a mountain covered in vineyards.' },
        },
        { type: 'tekst', inhoud: { en: 'Pompeii was older than Roman Pompeii. It was founded by the Oscans, an Italian people, and later shaped by the Samnites and by Greek traders around the Bay of Naples. Only in 80 BC, after it had sided against Rome in a war, did the dictator Sulla turn it into a Roman colony. By the first century AD it was a busy market town of perhaps eleven thousand people, with an amphitheatre, public baths, bakeries, bars and walls covered in painted election slogans.' } },
        { type: 'tekst', inhoud: { en: 'Above it rose Vesuvius, green to the summit with vines. The Romans did not think of it as a volcano. The geographer Strabo had noticed that the rocks near the top looked burnt, as if the mountain had once been on fire, but that was ancient history. Nobody alive remembered an eruption.' } },
        { type: 'kop', tekst: { en: 'The Earthquake of 62' } },
        { type: 'sleutelmoment', jaar: 62, tekst: { en: 'On 5 February, a powerful earthquake shakes Pompeii and the towns around the bay.' } },
        { type: 'tekst', inhoud: { en: 'Seventeen years before the end, the ground gave its warning. The philosopher Seneca described a flock of hundreds of sheep killed near Pompeii, statues split, and people driven out of their minds by fear. Temples and houses fell. Pompeii set about rebuilding, and it was still rebuilding in 79: archaeologists have found workshops full of building materials, and walls being repainted when the city died.' } },
        { type: 'weetje', tekst: { en: 'Vesuvius already has a place in this app. In 73 BC, Spartacus and his escaped gladiators hid on its slopes, and broke out by climbing down the cliffs on ropes made of wild vines.' } },
        { type: 'tekst', inhoud: { en: 'Nobody connected the earthquake to the mountain. Smaller tremors in the days before the eruption were, as the Roman eyewitness would later write, "not particularly alarming, because they are frequent in Campania". It was a normal day in a normal town when the mountain opened.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Cloud Like a Pine Tree' },
      afbeelding: SCENE_IMAGES['pompeii-disaster-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pompeii-disaster-2'],
          alt: { en: 'Townspeople shading their eyes to look at a column of ash rising from the mountain.' },
          bijschrift: { en: 'Pliny saw a cloud with a tall trunk that spread out into branches.' },
        },
        { type: 'tekst', inhoud: { en: 'Almost everything we know about the eruption comes from two letters. Their author, Pliny the Younger, was seventeen in 79 and staying with his uncle at Misenum, the navy base across the bay. Some twenty-five years later the historian Tacitus asked him what had happened, and he wrote it down.' } },
        { type: 'tekst', inhoud: { en: 'Around one in the afternoon, his mother pointed out a cloud of unusual size and shape rising over the mountains. Pliny compared it to an umbrella pine: a tall trunk that spread out at the top into branches. Volcanologists still call this kind of eruption "Plinian" after him. The column of gas, ash and pumice rose some thirty kilometres into the sky.' } },
        { type: 'kop', tekst: { en: 'August or October?' } },
        { type: 'tekst', inhoud: { en: 'The usual date is 24 August, from the copies of Pliny\'s letter that survive. But other manuscripts give different dates, and Pompeii itself disagrees with August. Victims wore heavy clothes, braziers were lit, autumn fruits like pomegranates and chestnuts were found in houses, and the wine had already been sealed in jars. In 2018 archaeologists found a charcoal scribble on a wall dated to the equivalent of 17 October. Many historians now think the city was destroyed on 24 October.' } },
        { type: 'sleutelmoment', jaar: 79, tekst: { en: 'Vesuvius erupts. For the rest of the day, pumice falls on Pompeii.' } },
        { type: 'tekst', inhoud: { en: 'The wind carried the cloud south-east, straight over Pompeii. Stones of light pumice began to rain down, piling up at about fifteen centimetres an hour. By evening roofs were collapsing under the weight. Most of the people of Pompeii seem to have fled during these hours, and survived. Those who stayed, sheltering indoors and hoping it would stop, were the ones who were found.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Fortune Favours the Brave' },
      afbeelding: SCENE_IMAGES['pompeii-disaster-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pompeii-disaster-3'],
          alt: { en: 'A colossal ash column over the bay at night, lightning crackling inside the plume.' },
          bijschrift: { en: 'Pliny the Elder sailed towards the eruption, not away from it.' },
        },
        { type: 'tekst', inhoud: { en: 'The young Pliny\'s uncle was Pliny the Elder, commander of the fleet at Misenum and the author of the Natural History, an encyclopaedia of everything the Romans knew about the world. When he saw the cloud, his first thought was to take a light boat and go and look at it more closely. His nephew stayed behind to study.' } },
        { type: 'tekst', inhoud: { en: 'Then a message arrived from a woman named Rectina, whose villa lay at the foot of the mountain. There was no escape for her except by sea, and she begged for help. The admiral changed his plan. He launched the warships and steered straight for the danger, while everyone else was fleeing it, dictating notes on the shape of the cloud as he went.' } },
        { type: 'citaat', tekst: { en: 'Fortune favours the brave.' }, bron: { en: 'Pliny the Elder, as remembered by his nephew (Letters, 6.16)' } },
        { type: 'kop', tekst: { en: 'A Night at Stabiae' } },
        { type: 'tekst', inhoud: { en: 'Hot ash and blackened stones fell onto the decks, and the shore near the volcano was blocked. Instead he landed at Stabiae, further along the bay, at the house of his friend Pomponianus. To calm everyone, he took a bath, ate dinner cheerfully, and went to bed; people outside his room could hear him snoring. During the night the courtyard filled with so much ash that he had to be woken, or he would never have got out of the room.' } },
        { type: 'tekst', inhoud: { en: 'In the morning, with pillows tied to their heads against the falling stones, they went down to the beach to see if they could escape by sea. The waves were too wild. The admiral lay down on a sheet, asked for water, stood up with the help of two slaves, and collapsed. His nephew says he had always had weak airways. When his body was found, it looked, Pliny wrote, more like a man asleep than dead.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Surge' },
      afbeelding: SCENE_IMAGES['pompeii-disaster-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pompeii-disaster-4'],
          alt: { en: 'A surge of ash and gas racing down the flank of Vesuvius toward the darkened city.' },
          bijschrift: { en: 'A pyroclastic surge moves faster than anyone can run, and it is hundreds of degrees hot.' },
        },
        { type: 'tekst', inhoud: { en: 'During the night, the column could no longer hold itself up. Parts of it collapsed and came rushing down the slopes of the volcano as pyroclastic surges: avalanches of scorching gas, ash and rock that hug the ground and travel faster than a car on a motorway.' } },
        { type: 'tekst', inhoud: { en: 'The first towns to be hit lay closest to the mountain. At Herculaneum, on the coast, hundreds of people had crowded into the stone boathouses by the beach, waiting for rescue by sea. Their skeletons were found there in the 1980s and 1990s, lying where they died. Researchers studying one victim found that part of his brain had been turned to glass by the heat.' } },
        { type: 'kop', tekst: { en: 'Seven in the Morning' } },
        { type: 'tekst', inhoud: { en: 'Pompeii, further away, was reached early on the second morning. There the surges were cooler than at Herculaneum, but still a few hundred degrees. Anyone still in the city, in the streets or under a roof, died within minutes from the heat and from breathing in the ash-laden gas. The remains of more than 1,100 people have been found in the parts of Pompeii that have been dug up.' } },
        { type: 'weetje', tekst: { en: 'The famous figures of Pompeii are not bodies. They are plaster poured into the hollows that bodies left in the hardened ash, so they show a person\'s outline and posture, but rarely a face.' } },
        { type: 'tekst', inhoud: { en: 'Across the bay, in Misenum, the young Pliny and his mother were fleeing with a crowd along the road when the darkness reached them. People screamed for their children and their parents; some prayed for death, others said the gods were gone and this was the last night of the world. When the light finally came back, everything was covered in ash, deep as snow.' } },
        { type: 'citaat', tekst: { en: 'Darkness came on, not like a moonless or cloudy night, but as if the lamp had been put out in a closed room.' }, bron: { en: 'Pliny the Younger (Letters, 6.20)' } },
      ],
    },
    {
      id: 5,
      titel: { en: 'The City Comes Back' },
      afbeelding: SCENE_IMAGES['pompeii-disaster-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pompeii-disaster-6'],
          alt: { en: 'Eighteenth-century excavators uncovering a buried Roman colonnade by lantern light.' },
          bijschrift: { en: '1748: the first excavations begin, and a city comes back.' },
        },
        { type: 'tekst', inhoud: { en: 'Pompeii lay under four to six metres of ash and pumice. Survivors resettled in nearby towns, and over the centuries the name was forgotten. In the 1590s, engineers digging a water channel cut right through the buried city without realising what it was.' } },
        { type: 'sleutelmoment', jaar: 1748, tekst: { en: 'Excavations begin at Pompeii. In 1763 an inscription finally proves which city it is.' } },
        { type: 'tekst', inhoud: { en: 'Digging started in 1748, at first mainly a treasure hunt for statues and paintings for the king of Naples. Proper archaeology came later. In 1863, Giuseppe Fiorelli had the idea of pouring plaster into the cavities in the ash, and the victims reappeared: a man covering his face, a dog twisting on its chain, a family huddled together.' } },
        { type: 'kop', tekst: { en: 'What the Walls Say' } },
        { type: 'tekst', inhoud: { en: 'Pompeii is a city of ordinary voices. There are thousands of graffiti: prices, insults, jokes, election slogans, love notes. "Lovers, like bees, lead a honey-sweet life," one of them reads. In a bakery, eighty-one loaves of bread were found still in the oven, turned to charcoal. At Herculaneum a whole library of papyrus scrolls survived, burned into black lumps. In 2023, scanners and artificial intelligence read the first word from inside one of them: "purple".' } },
        { type: 'weetje', tekst: { en: 'Science keeps changing the story. In 2024, DNA tests showed that a pair long described as a mother holding her child was in fact an unrelated adult man with a child.' } },
        { type: 'tekst', inhoud: { en: 'About a third of Pompeii has deliberately been left unexcavated, for archaeologists of the future with better tools. Vesuvius has erupted many times since 79, most recently in 1944. Around three million people now live in its shadow, and it is one of the most closely watched volcanoes on Earth.' } },
      ],
    },
  ],
};

export const oudheidGebeurtennissen: Verhaal[] = [romesRise, pompeiiDisaster];
