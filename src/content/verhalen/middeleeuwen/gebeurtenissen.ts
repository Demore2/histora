import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */

export const valVanConstantinopel: Verhaal = {
  id: 'fall-of-constantinople',
  beginJaar: 1453,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Fall of Constantinople' },
  ondertitel: { en: 'Fifty-three days in 1453 that ended an empire eleven centuries old' },
  teaser: { en: 'A 21-year-old sultan, the biggest cannon ever cast and a fleet dragged over a hill. How did the city that had never fallen finally fall?' },
  jaar: 1453,
  periodeLabel: '1453',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['fall-of-constantinople'],
  portretKleur: '#7A4E2D',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'middeleeuwen',
  themas: ['beleg', 'byzantium', 'ottomanen', 'constantinopel', 'oorlog'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Fall of Constantinople' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Throat Cutter' },
      afbeelding: SCENE_IMAGES['fall-of-constantinople-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-constantinople-1'],
          alt: { en: 'A new fortress rising on the shore of the Bosphorus, workers hauling stone, a young sultan on horseback watching.' },
          bijschrift: { en: '1452: a fortress built in months, at the narrowest point of the Bosphorus.' },
        },
        { type: 'tekst', inhoud: { en: 'In 1451 the Ottoman throne passed to an eighteen-year-old named Mehmed. Europe\'s ambassadors thought he was inexperienced and would be easy to handle. They were wrong. Mehmed had one ambition that mattered more than any other: to take Constantinople, the great city on the Bosphorus that had been the capital of the Eastern Roman Empire since the emperor Constantine founded it in 330.' } },
        { type: 'tekst', inhoud: { en: 'By 1450 that empire, which we call Byzantine, was little more than a city. Its lands had been swallowed one by one by the Ottomans, who now surrounded it on both sides. Constantinople itself had shrunk to perhaps fifty thousand people, living among ruins, orchards and fields inside walls built for half a million. But those walls had held for a thousand years.' } },
        { type: 'kop', tekst: { en: 'A Fortress in Four Months' } },
        { type: 'tekst', inhoud: { en: 'In the spring of 1452 Mehmed began building a fortress on the European shore of the Bosphorus, opposite an older Ottoman castle on the Asian side. Together they controlled the narrowest point of the strait. It was finished in about four months. The Turks called it Boğazkesen, the "throat cutter". When a Venetian ship refused to stop and pay a toll, it was sunk by cannon fire, and its captain was executed.' } },
        { type: 'sleutelmoment', jaar: 1452, tekst: { en: 'The fortress later called Rumeli Hisarı is completed, cutting Constantinople off from the Black Sea.' } },
        { type: 'tekst', inhoud: { en: 'The emperor, Constantine XI Palaiologos, sent desperate appeals to the West. Help barely came. Venice and Genoa sent a few ships and soldiers; the pope sent a cardinal and two hundred archers. In return, the Orthodox Greeks were expected to accept union with the Roman Church, which many of them hated. Constantinople went into the siege divided, outnumbered, and almost alone.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Great Bombard' },
      afbeelding: SCENE_IMAGES['fall-of-constantinople-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-constantinople-2'],
          alt: { en: 'An enormous bronze cannon being dragged by oxen towards the triple land walls of Constantinople.' },
          bijschrift: { en: 'Orban\'s great bombard needed dozens of oxen to move, and hours to cool between shots.' },
        },
        { type: 'tekst', inhoud: { en: 'Mehmed arrived before the land walls in early April 1453 with an army that modern historians estimate at between fifty and eighty thousand fighting men. Inside, the emperor\'s secretary George Sphrantzes counted the defenders: 4,983 Greeks able to fight, and fewer than two thousand foreigners. They had to hold walls that ran for more than twenty kilometres around the city.' } },
        { type: 'tekst', inhoud: { en: 'The most famous of the foreigners was the Genoese captain Giovanni Giustiniani Longo, who arrived with 700 well-armed men and was put in charge of the land walls. These were the Theodosian Walls, built in the 400s: a moat, an outer wall and an inner wall, with nearly two hundred towers. No army had ever broken through them.' } },
        { type: 'kop', tekst: { en: 'The Engineer Who Changed Sides' } },
        { type: 'tekst', inhoud: { en: 'Mehmed had something no earlier besieger had. A cannon founder named Orban, probably from Hungary, had first offered his services to the emperor, who could not afford him. Mehmed could. Orban cast a monster bronze bombard about eight metres long that fired stone balls weighing more than half a tonne. It took dozens of oxen to drag it into place, and it could only fire a few times a day.' } },
        { type: 'weetje', tekst: { en: 'Every night the defenders repaired what the guns had smashed by day, filling the breaches with earth, timber, barrels and rubble. For weeks, the patched walls held.' } },
        { type: 'tekst', inhoud: { en: 'The bombardment began on 6 April and never really stopped. The ancient stone was not built for this. Section by section, especially in the valley of the Lycus stream, the outer wall crumbled. But every Ottoman assault on the breaches was driven back, and on 20 April four Christian ships fought their way through the whole Ottoman fleet into the harbour, while Mehmed watched from the shore, so furious he rode his horse into the sea.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Ships Over the Hill' },
      afbeelding: SCENE_IMAGES['fall-of-constantinople-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-constantinople-3'],
          alt: { en: 'Ottoman galleys being hauled overland on greased logs by torchlight, the city in the distance.' },
          bijschrift: { en: '22 April 1453: dozens of ships crossed a hill to reach the Golden Horn.' },
        },
        { type: 'tekst', inhoud: { en: 'Constantinople\'s harbour, the Golden Horn, was protected by a great iron chain stretched across its mouth on floating timbers. The Ottoman fleet could not get in, so the city\'s sea walls along the harbour were barely defended. Mehmed found a way around the chain.' } },
        { type: 'tekst', inhoud: { en: 'Behind the Genoese town of Galata, across the Horn, his engineers built a road of greased wooden logs over the hill. On 22 April, the defenders woke to an impossible sight: some seventy Ottoman ships, pulled by oxen and men, sliding down the slope into the Golden Horn, with sails raised and drums beating. Now the harbour walls had to be manned too, and the defenders were stretched thinner still.' } },
        { type: 'sleutelmoment', jaar: 1453, tekst: { en: 'On 22 April, Ottoman ships are hauled overland into the Golden Horn.' } },
        { type: 'kop', tekst: { en: 'Bad Omens' } },
        { type: 'tekst', inhoud: { en: 'By late May the city was exhausted and hungry. There was an old prophecy that Constantinople would not fall while the moon was waxing; on 22 May there was an eclipse of the moon. During a procession, the chroniclers say, the city\'s holiest icon of the Virgin slipped from its bearers\' hands, and a storm and thick fog followed. People read it all as a sign that God had abandoned them.' } },
        { type: 'citaat', tekst: { en: 'Better to see the Turkish turban in the midst of the city than the Latin mitre.' }, bron: { en: 'Attributed to the Byzantine official Loukas Notaras by the chronicler Doukas' } },
        { type: 'tekst', inhoud: { en: 'Mehmed offered terms: surrender, and the emperor could leave safely with his court. Constantine refused. On the evening of 28 May, Greeks and Latins, who had quarrelled bitterly over the union of the churches, prayed together in the great church of Hagia Sophia. Then the soldiers went back to the walls to wait.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Last Morning' },
      afbeelding: SCENE_IMAGES['fall-of-constantinople-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['fall-of-constantinople-4'],
          alt: { en: 'Soldiers pouring through a breach in the battered walls at dawn, the dome of Hagia Sophia on the horizon.' },
          bijschrift: { en: '29 May 1453, shortly before dawn: the final assault.' },
        },
        { type: 'tekst', inhoud: { en: 'The attack came in the dark hours before dawn on 29 May, in waves. First the irregular troops, then the disciplined Anatolian regiments, and finally the sultan\'s elite infantry, the Janissaries. For hours the defenders held. Then Giustiniani was badly wounded and carried away from the walls, and his men, seeing their commander leave, began to break.' } },
        { type: 'tekst', inhoud: { en: 'One chronicler tells of a small gate, the Kerkoporta, that had been left open after a raid, and of Ottoman soldiers raising their flag on a tower behind it. Whether through that gate or through the main breach, the Ottomans were inside. Constantine XI threw off his imperial insignia and charged into the fighting. He was never seen again, and his body was never certainly identified.' } },
        { type: 'kop', tekst: { en: 'The Conqueror' } },
        { type: 'tekst', inhoud: { en: 'As was customary for a city taken by storm, Mehmed allowed his soldiers to plunder it. Thousands of people were killed or carried off as slaves. When the sultan rode into Hagia Sophia, he had it turned into a mosque. He took the title Fatih, "the Conqueror", made the city his capital, and set about filling it again with people: Muslims, Greeks, Armenians and Jews.' } },
        { type: 'weetje', tekst: { en: 'The fall is often said to have caused the Renaissance, or forced Europeans to look for a sea route to Asia. Both are exaggerations: Greek scholars had been moving to Italy for decades, and trade with the East went on.' } },
        { type: 'tekst', inhoud: { en: 'Constantinople had been a Roman capital for 1,123 years. Its fall ended the last remnant of the Roman Empire, and many historians use 1453 as one of the dates that close the Middle Ages. The city itself did not die. Under the name Istanbul it became the capital of an empire that lasted until the twentieth century, and it is still one of the great cities of the world.' } },
      ],
    },
  ],
};

export const zwarteDood: Verhaal = {
  id: 'black-death',
  beginJaar: 1346,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'The Black Death' },
  ondertitel: { en: 'The plague that killed perhaps half of Europe in seven years' },
  teaser: { en: 'In 1347 a handful of ships docked in Sicily. Within four years, between a third and a half of Europe was dead.' },
  jaar: 1353,
  periodeLabel: '1346 - 1353',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['black-death'],
  portretKleur: '#4A3B2F',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'middeleeuwen',
  themas: ['ramp', 'pest', 'ziekte', 'samenleving', 'geloof'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Black Death' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Ships From the East' },
      afbeelding: SCENE_IMAGES['black-death-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['black-death-1'],
          alt: { en: 'A merchant galley docking in a Sicilian harbour, sick sailors on deck, frightened townspeople on the quay.' },
          bijschrift: { en: 'Messina, October 1347: the plague arrives in Europe.' },
        },
        { type: 'tekst', inhoud: { en: 'The disease started far from Europe. For centuries its origin was a mystery, but in 2022 scientists extracted plague DNA from skeletons in a graveyard near Lake Issyk-Kul, in what is now Kyrgyzstan. Gravestones there from 1338 and 1339 mention deaths from "pestilence". From the steppes of Central Asia the plague travelled west along the trade routes of the Mongol world.' } },
        { type: 'tekst', inhoud: { en: 'In 1346 a Mongol army of the Golden Horde was besieging Caffa, a Genoese trading port in Crimea, when plague broke out among the soldiers. An Italian writer, Gabriele de\' Mussis, later claimed that the Mongols catapulted their dead over the walls to infect the town. He was not there himself, and historians argue about whether it happened. Rats, fleas and people on ships would have carried the disease out of Crimea either way.' } },
        { type: 'kop', tekst: { en: 'Messina' } },
        { type: 'sleutelmoment', jaar: 1347, tekst: { en: 'In October, Genoese galleys bring the plague to Messina in Sicily.' } },
        { type: 'tekst', inhoud: { en: 'In October 1347 Genoese galleys put in at Messina in Sicily. A friar, Michele da Piazza, described sailors who carried "a sickness clinging to their very bones". Within days people in the city were dying. The authorities drove the ships out of the harbour, which only spread the disease to the next ports. By the end of the year the plague had reached Constantinople, Alexandria and Marseille.' } },
        { type: 'weetje', tekst: { en: 'Nobody called it the Black Death at the time. People spoke of "the great mortality" or simply "the pestilence". The name Black Death became common only centuries later.' } },
        { type: 'tekst', inhoud: { en: 'The cause was a bacterium, Yersinia pestis, which lives in rodents and the fleas that feed on them. Its genetic code was finally read in 2011, from teeth taken from a plague pit in London. In 1347 nobody knew any of this. To the people of Europe, it was simply a death that came out of nowhere, and seemed to spare no one.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Great Mortality' },
      afbeelding: SCENE_IMAGES['black-death-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['black-death-2'],
          alt: { en: 'A narrow medieval street with a cart of shrouded bodies, a gravedigger and a mourning woman in a doorway.' },
          bijschrift: { en: 'Florence, 1348: the dead were buried in trenches, layer upon layer.' },
        },
        { type: 'tekst', inhoud: { en: 'In 1348 the plague swept through Italy, France, Spain and England; in 1349 it reached Germany and Scandinavia, and by 1351 Russia. It moved along roads and rivers, with merchants, soldiers and pilgrims, and almost nowhere was spared. In most places it raged for a few months, killed and moved on.' } },
        { type: 'tekst', inhoud: { en: 'The most common form began with fever, then painful swellings called buboes in the groin, armpits or neck, often followed by dark patches under the skin. Many died within a week. When the infection reached the lungs, the victim could pass it on with a cough, and death came even faster, often within two or three days.' } },
        { type: 'kop', tekst: { en: 'Florence' } },
        { type: 'tekst', inhoud: { en: 'The writer Giovanni Boccaccio lived through the plague in Florence and described it at the start of his book the Decameron. Relatives abandoned each other; doctors were useless; the dead were left in front of houses each morning, and buried in great trenches, stacked "like goods in a ship\'s hold". In Siena, the tax official Agnolo di Tura wrote one of the most terrible lines of the age.' } },
        { type: 'citaat', tekst: { en: 'And I, Agnolo di Tura, called the Fat, buried my five children with my own hands.' }, bron: { en: 'Agnolo di Tura, Chronicle of Siena, 1348' } },
        { type: 'tekst', inhoud: { en: 'How many died? There were no censuses, so historians work from tax records, church registers and graveyards. Most estimates for Europe lie between a third and a half of the population, some higher. Tens of millions of people died in about four years. In some villages nobody was left alive.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Looking for Someone to Blame' },
      afbeelding: SCENE_IMAGES['black-death-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['black-death-3'],
          alt: { en: 'Hooded flagellants in white robes processing through a town square with a large cross, watched by a fearful crowd.' },
          bijschrift: { en: 'The flagellants: whipping themselves in public to win back God\'s mercy.' },
        },
        { type: 'tekst', inhoud: { en: 'People reached for explanations. In 1348 the king of France asked the medical faculty of Paris, the most respected in Europe, what had caused the plague. The doctors replied that it was a conjunction of Saturn, Jupiter and Mars in 1345, which had corrupted the air. Others blamed bad smells, earthquakes or the sins of humanity.' } },
        { type: 'tekst', inhoud: { en: 'If the plague was God\'s punishment, perhaps it could be stopped with penance. Bands of flagellants marched from town to town, in Germany and the Low Countries above all, whipping themselves bloody in the squares while crowds watched. Within a year the pope condemned them.' } },
        { type: 'kop', tekst: { en: 'The Pogroms' } },
        { type: 'tekst', inhoud: { en: 'The darkest answer was to blame the Jews. Rumours spread that they had poisoned the wells. Under torture, some confessed to it, and the confessions were copied and sent from town to town. In 1348 and 1349 Jewish communities across Germany, Switzerland and France were massacred. In Strasbourg, in February 1349, hundreds of Jews, perhaps as many as two thousand, were burned, before the plague had even reached the city.' } },
        { type: 'weetje', tekst: { en: 'Pope Clement VI pointed out that the accusation made no sense: Jews were dying of the plague like everyone else, and it raged in places where no Jews lived. His orders were widely ignored.' } },
        { type: 'tekst', inhoud: { en: 'Clement himself survived by staying in his palace at Avignon, sitting between two great fires on his doctor\'s advice. It may even have helped, because heat drives away fleas. Nobody could have known that then. Almost everything people did to protect themselves, from sweet-smelling herbs to prayers, had no effect at all.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'The World After' },
      afbeelding: SCENE_IMAGES['black-death-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['black-death-4'],
          alt: { en: 'An emptied village with abandoned cottages around a stone church, a lone peasant ploughing with an ox.' },
          bijschrift: { en: 'Fewer people, more land: the survivors could ask more for their work.' },
        },
        { type: 'tekst', inhoud: { en: 'By 1353 the first great wave had passed. It was not the end. The plague came back again and again, roughly every ten or twenty years at first, for more than three centuries. One of the last big outbreaks in western Europe struck Marseille in 1720.' } },
        { type: 'tekst', inhoud: { en: 'For the survivors, the world had changed. With so many people dead, there was more land than hands to work it. Peasants and labourers could demand higher wages and better terms, and many did. Lords and governments tried to stop them. In England the Statute of Labourers of 1351 tried to freeze wages at their old level; resentment of such laws fed into the Peasants\' Revolt of 1381.' } },
        { type: 'kop', tekst: { en: 'Forty Days' } },
        { type: 'tekst', inhoud: { en: 'Cities slowly learned to defend themselves. In 1377 Ragusa, today Dubrovnik, ordered ships and travellers from infected areas to wait thirty days before entering. Later the waiting time was set at forty days, quaranta giorni in Italian, which gave us the word quarantine.' } },
        { type: 'sleutelmoment', jaar: 1377, tekst: { en: 'Ragusa (Dubrovnik) makes arriving travellers wait before entering the city, an early form of quarantine.' } },
        { type: 'weetje', tekst: { en: 'The famous plague doctor with the bird-like mask belongs to a later century. The costume was first described in the 1600s, three hundred years after the Black Death.' } },
        { type: 'tekst', inhoud: { en: 'The Black Death was probably the deadliest disaster in recorded human history, measured by the share of people it killed. It left behind fear, art obsessed with death and the Dance of Death, deep wounds between Christians and Jews, and a Europe with fewer people and higher wages. Plague still exists today, but it can be cured with ordinary antibiotics.' } },
      ],
    },
  ],
};

export const middeleeuwenGebeurtenissen: Verhaal[] = [valVanConstantinopel, zwarteDood];
