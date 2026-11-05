import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */

export const goldrushCalifornie: Verhaal = {
  id: 'california-gold-rush',
  beginJaar: 1848,
  toegevoegdOp: '2026-11-05',
  titel: { en: 'The California Gold Rush' },
  ondertitel: { en: 'How a few flakes in a mill stream pulled 300,000 people across the world' },
  teaser: { en: 'In January 1848 a carpenter saw something shining in a ditch. Within a few years a quiet corner of the world had become a state, a boom town and, for its first peoples, a catastrophe.' },
  jaar: 1855,
  periodeLabel: '1848 - 1855',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['california-gold-rush'],
  portretKleur: '#8A6A2F',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'industriele-revolutie',
  themas: ['goud', 'amerika', 'migratie', 'californie', 'economie'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The California Gold Rush' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Something Shining in the Ditch' },
      afbeelding: SCENE_IMAGES['california-gold-rush-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['california-gold-rush-1'],
          alt: { en: 'A carpenter crouching in a shallow channel next to a half-built wooden sawmill, holding a tiny flake of gold up to the light.' },
          bijschrift: { en: 'Coloma, 24 January 1848: James Marshall\'s discovery.' },
        },
        { type: 'tekst', inhoud: { en: 'In January 1848 California was a remote, thinly populated land on the Pacific coast. It had belonged to Mexico, but the United States had occupied it during a war between the two countries. Apart from its Native peoples, it had perhaps fifteen thousand settlers of Mexican, American and European origin.' } },
        { type: 'tekst', inhoud: { en: 'One of them was John Sutter, a Swiss immigrant who ran a large estate in the Sacramento Valley. He hired a carpenter, James Marshall, to build a sawmill on the American River, in the foothills of the Sierra Nevada mountains. On the morning of 24 January 1848, Marshall was inspecting the channel that carried water away from the mill when he noticed small shining flakes in the gravel.' } },
        { type: 'citaat', tekst: { en: 'I picked up one or two pieces and examined them attentively. It made my heart thump, for I was certain it was gold.' }, bron: { en: 'James Marshall, recalling the discovery years later' } },
        { type: 'kop', tekst: { en: 'A Secret That Could Not Be Kept' } },
        { type: 'tekst', inhoud: { en: 'Sutter tested the metal and asked his workers to keep quiet. He was afraid that a rush of gold seekers would destroy his farms and his plans. He was right. The rumours spread anyway, and in May a San Francisco shopkeeper named Samuel Brannan walked through the streets holding up a bottle of gold dust and shouting: "Gold! Gold from the American River!"' } },
        { type: 'weetje', tekst: { en: 'Brannan had already filled his store with picks, shovels and pans. He made a fortune selling them to the gold seekers he had just sent on their way.' } },
        { type: 'sleutelmoment', jaar: 1848, tekst: { en: 'Nine days after the discovery, Mexico signs the peace treaty that hands California to the United States.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Forty-Niners' },
      afbeelding: SCENE_IMAGES['california-gold-rush-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['california-gold-rush-2'],
          alt: { en: 'Dozens of abandoned sailing ships crowding San Francisco harbour, with a muddy town of tents on the hills behind.' },
          bijschrift: { en: 'San Francisco, 1849: crews left their ships and ran for the hills.' },
        },
        { type: 'tekst', inhoud: { en: 'Within weeks, San Francisco emptied. Shops closed, soldiers deserted, sailors abandoned their ships, and almost every able-bodied man headed for the rivers. In December 1848 the American president, James K. Polk, confirmed the reports in a speech to Congress. Now the whole world believed it.' } },
        { type: 'tekst', inhoud: { en: 'In 1849 gold seekers poured in from the eastern United States, Mexico, Chile, Peru, Hawaii, China, Australia and Europe. They became known as the forty-niners. Between 1848 and 1855 around 300,000 people came to California, one of the largest migrations in American history.' } },
        { type: 'kop', tekst: { en: 'Three Ways to California' } },
        { type: 'tekst', inhoud: { en: 'From the East Coast there were three routes, and all of them were hard. You could sail around the tip of South America, a voyage of five to eight months. You could sail to Panama, cross its jungle by canoe and mule, and hope to find a ship on the other side, risking cholera and yellow fever. Or you could travel over land by wagon, more than three thousand kilometres across plains, deserts and mountains.' } },
        { type: 'tekst', inhoud: { en: 'Thousands died on the way, mostly of disease. Those who reached San Francisco found a town transformed. In early 1848 it had perhaps a thousand inhabitants; two years later it had around 25,000. The harbour was jammed with hundreds of ships whose crews had run off to the gold fields. Some were dragged ashore and turned into shops, hotels and even a jail.' } },
        { type: 'weetje', tekst: { en: 'Some of those abandoned ships are still there. As San Francisco filled in its shallow harbour to make new land, the hulls were buried. Builders digging foundations downtown still occasionally find them.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Pans, Rockers and Luck' },
      afbeelding: SCENE_IMAGES['california-gold-rush-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['california-gold-rush-3'],
          alt: { en: 'Miners of many different origins working a long wooden sluice in a river, with tents and log cabins on the bank.' },
          bijschrift: { en: 'A mining camp, around 1850: hard work, high prices, and no guarantees.' },
        },
        { type: 'tekst', inhoud: { en: 'At first the gold was easy to reach. It lay in the gravel of rivers and streams, washed down from the mountains over millions of years. A miner scooped gravel and water into a shallow metal pan and swirled it, so that the light sand washed over the edge and the heavy gold stayed at the bottom.' } },
        { type: 'tekst', inhoud: { en: 'Soon miners worked in teams, with a wooden "rocker", a box on curved feet that was rocked like a cradle, or long sluices through which a stream of water carried the gravel. In 1848 a lucky man could find more gold in a day than a labourer in the East earned in months. By 1850 the easy gold was mostly gone, and most miners barely covered their costs.' } },
        { type: 'kop', tekst: { en: 'A Dollar for an Egg' } },
        { type: 'tekst', inhoud: { en: 'Because everything had to be shipped or carried in, prices in the mining camps were enormous. An egg could cost a dollar, a pair of boots many times what it cost in New York. Camps sprang up overnight with names like Hangtown, Rough and Ready and Poker Flat, and many disappeared just as fast when the gold ran out.' } },
        { type: 'tekst', inhoud: { en: 'Competition turned ugly. In 1850 California introduced a tax of twenty dollars a month on foreign miners, aimed above all at Mexicans, Chileans and the Chinese. Chinese immigrants, who called California "Gold Mountain", were driven off claims, attacked and later barred from testifying in court against white people.' } },
        { type: 'weetje', tekst: { en: 'Gold seekers called the trip to California "seeing the elephant": a once-in-a-lifetime adventure that usually turned out to be far harder than anyone had imagined.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'Who Really Got Rich' },
      afbeelding: SCENE_IMAGES['california-gold-rush-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['california-gold-rush-4'],
          alt: { en: 'A busy general store in San Francisco where a merchant sells canvas trousers, shovels and pans to miners.' },
          bijschrift: { en: 'The surest way to make money in the gold rush was to sell to the miners.' },
        },
        { type: 'tekst', inhoud: { en: 'The men who started it all did not profit. Squatters overran John Sutter\'s land, stole his cattle and killed his plans. He spent his last years in Washington asking Congress for compensation, and died in 1880 without receiving it. James Marshall died poor in 1885, near the place where he had found the gold.' } },
        { type: 'tekst', inhoud: { en: 'The surest fortunes were made by those who sold to the miners: food, tools, transport, banking. A young German merchant named Levi Strauss came to San Francisco in 1853 to sell cloth and clothing. Twenty years later he and a tailor, Jacob Davis, patented work trousers strengthened with copper rivets: the first blue jeans.' } },
        { type: 'kop', tekst: { en: 'A Catastrophe for California\'s First Peoples' } },
        { type: 'tekst', inhoud: { en: 'For the Native peoples of California, the gold rush was a disaster. Miners destroyed their rivers and food sources, brought new diseases, and attacked their villages. The new state paid for militias that hunted them down. In 1848 around 150,000 Native people lived in California; by 1870 only about 30,000 were left.' } },
        { type: 'sleutelmoment', jaar: 1850, tekst: { en: 'On 9 September, California becomes the 31st state of the United States.' } },
        { type: 'tekst', inhoud: { en: 'The gold rush changed the shape of the United States. California became a state in 1850, only two years after the discovery, and the gold helped pay for railways that would soon tie the coasts together. It is still called the Golden State, and San Francisco\'s American football team is named after the forty-niners.' } },
      ],
    },
  ],
};

export const industrieleRevolutieGebeurtenissen: Verhaal[] = [goldrushCalifornie];
