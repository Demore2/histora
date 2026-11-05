import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */

export const bestormingBastille: Verhaal = {
  id: 'storming-of-the-bastille',
  beginJaar: 1789,
  toegevoegdOp: '2026-11-05',
  titel: { en: 'The Storming of the Bastille' },
  ondertitel: { en: 'How hungry Parisians went looking for gunpowder and brought down a king' },
  teaser: { en: 'On 14 July 1789 a crowd attacked a medieval prison that held just seven prisoners. It became the day the French Revolution began.' },
  jaar: 1789,
  periodeLabel: '1789',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['storming-of-the-bastille'],
  portretKleur: '#5B4A3F',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['revolutie', 'frankrijk', 'parijs', 'vrijheid', 'monarchie'],
  leestijdMinuten: 5,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'The Storming of the Bastille' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Kingdom Out of Money' },
      afbeelding: SCENE_IMAGES['storming-of-the-bastille-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['storming-of-the-bastille-1'],
          alt: { en: 'Poor women and children queueing outside a bakery in a narrow street of old Paris, holding empty baskets.' },
          bijschrift: { en: 'Paris, 1789: a loaf of bread could cost more than half of a worker\'s daily wage.' },
        },
        { type: 'tekst', inhoud: { en: 'In 1789 France was the richest and most powerful kingdom in Europe, and it was broke. Decades of wars, including the expensive help it gave the Americans in their war of independence against Britain, had left the crown with enormous debts. Almost half of the government\'s income went on paying interest.' } },
        { type: 'tekst', inhoud: { en: 'At the same time, ordinary people were going hungry. In the summer of 1788 a violent hailstorm destroyed crops across northern France, and the winter that followed was one of the coldest anyone could remember. By the spring of 1789 bread, the food most French families lived on, cost more than it had for decades.' } },
        { type: 'kop', tekst: { en: 'Three Estates' } },
        { type: 'tekst', inhoud: { en: 'French society was divided into three "estates": the clergy, the nobility, and everyone else, the Third Estate, which made up about 97 percent of the population. The first two paid little or no tax. To raise money, King Louis XVI called a meeting of representatives of all three, the Estates-General, for the first time since 1614.' } },
        { type: 'sleutelmoment', jaar: 1789, tekst: { en: 'On 5 May the Estates-General opens at Versailles.' } },
        { type: 'tekst', inhoud: { en: 'The meeting quickly turned into a power struggle. Each estate had one vote, so the clergy and nobility could always outvote the Third Estate. In June its representatives declared that they alone were the true National Assembly of France. When they found their meeting hall locked, they gathered in an indoor tennis court nearby and swore not to separate until France had a constitution.' } },
        { type: 'weetje', tekst: { en: 'The Tennis Court Oath of 20 June 1789 was sworn in a hall for jeu de paume, an early form of tennis played with the palm of the hand. Its name means "game of the palm".' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'Paris Takes Up Arms' },
      afbeelding: SCENE_IMAGES['storming-of-the-bastille-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['storming-of-the-bastille-2'],
          alt: { en: 'A young man standing on a table in a crowded Parisian garden, speaking to an excited crowd wearing green leaves on their hats.' },
          bijschrift: { en: 'Palais-Royal, 12 July 1789: the call to arms.' },
        },
        { type: 'tekst', inhoud: { en: 'Louis XVI did not want to share his power. In early July, thousands of soldiers, many of them foreign regiments in French service, gathered around Paris and Versailles. Then, on 11 July, the king dismissed Jacques Necker, his finance minister and the one member of the government ordinary Parisians trusted.' } },
        { type: 'tekst', inhoud: { en: 'To many in the city it looked like the start of a crackdown: first the minister, then the Assembly, then the troops would march in. The news reached Paris on Sunday 12 July. In the gardens of the Palais-Royal, a young lawyer and journalist, Camille Desmoulins, jumped onto a table and told the crowd to arm themselves.' } },
        { type: 'kop', tekst: { en: 'Muskets, but No Powder' } },
        { type: 'tekst', inhoud: { en: 'For two days Paris was in uproar. Crowds burned the hated customs posts where taxes were collected on food entering the city, and searched everywhere for weapons. On the morning of 14 July, tens of thousands of people marched to the Hôtel des Invalides, a home for old soldiers, and carried off around 30,000 muskets and a number of cannons.' } },
        { type: 'tekst', inhoud: { en: 'But a musket is useless without gunpowder. Only days earlier, the authorities had moved some 250 barrels of it to a safer place: the old fortress of the Bastille, on the eastern edge of the city. So the crowd turned east.' } },
        { type: 'weetje', tekst: { en: 'On 12 July Desmoulins urged people to wear a green leaf as a sign of hope, and they stripped the trees bare. Green was soon dropped, because it was also the colour of the king\'s unpopular brother. Red and blue, the colours of Paris, took its place, and later the royal white was added: the French tricolour.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Fortress' },
      afbeelding: SCENE_IMAGES['storming-of-the-bastille-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['storming-of-the-bastille-3'],
          alt: { en: 'The massive grey towers of the Bastille rising above a moat, with an armed crowd gathering in front and smoke drifting over the walls.' },
          bijschrift: { en: '14 July 1789: eight towers, walls about 24 metres high, and a crowd that would not leave.' },
        },
        { type: 'tekst', inhoud: { en: 'The Bastille had been built in the 1370s to defend Paris against the English. Later kings used it as a state prison, where people could be locked up without trial on a sealed royal order, a lettre de cachet. To Parisians its eight towers and thick walls stood for everything that was arbitrary about royal power.' } },
        { type: 'tekst', inhoud: { en: 'Its governor, Bernard-René de Launay, had a small garrison: around eighty veteran soldiers, joined a week earlier by about thirty Swiss guards. On the morning of 14 July, delegates from the crowd came in to negotiate. De Launay invited them to breakfast and pulled his cannons back from the openings in the walls, but he would not hand over the powder.' } },
        { type: 'kop', tekst: { en: 'The Drawbridge Falls' } },
        { type: 'tekst', inhoud: { en: 'Outside, the crowd grew impatient. In the early afternoon a few men climbed onto the roof of a building next to the outer wall and cut the chains of a drawbridge. It crashed down, and hundreds of people poured into the outer courtyard. The defenders opened fire. Nobody knows for certain who fired first.' } },
        { type: 'sleutelmoment', jaar: 1789, tekst: { en: 'On 14 July, after hours of fighting, the Bastille surrenders.' } },
        { type: 'tekst', inhoud: { en: 'For hours the attackers were shot down in the open courtyard. Then, in the middle of the afternoon, soldiers of the French Guards who had sided with the people arrived with cannons and aimed them at the main gate. De Launay threatened to blow up the powder store, and the whole neighbourhood with it, but his own men refused. At around five o\'clock the fortress surrendered.' } },
        { type: 'tekst', inhoud: { en: 'Around a hundred attackers had been killed, against one defender during the fighting. The anger did not end with the surrender. De Launay was dragged towards the city hall, killed in the street, and his head was carried through Paris on a pike.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'Seven Prisoners and a Key' },
      afbeelding: SCENE_IMAGES['storming-of-the-bastille-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['storming-of-the-bastille-4'],
          alt: { en: 'Workers with pickaxes tearing down the stone towers of the Bastille while onlookers carry away pieces as souvenirs.' },
          bijschrift: { en: 'Within months, the Bastille had all but disappeared.' },
        },
        { type: 'tekst', inhoud: { en: 'When the crowd burst into the cells, they expected to find dungeons full of victims of royal tyranny. They found seven prisoners: four men accused of forgery, two who were considered mentally ill, and one young nobleman locked up at the request of his own family.' } },
        { type: 'weetje', tekst: { en: 'The Bastille\'s most famous prisoner, the writer known as the Marquis de Sade, was not there. He had been moved out about ten days earlier, after shouting from his window to passers-by that prisoners were being murdered inside.' } },
        { type: 'tekst', inhoud: { en: 'It did not matter. What counted was that the people of Paris had taken the king\'s fortress by force, and the king had not been able to stop them. Louis XVI pulled his troops back from the city and recalled Necker. A few days later he came to Paris himself and pinned the red and blue cockade of the revolution to his hat.' } },
        { type: 'kop', tekst: { en: 'Souvenirs' } },
        { type: 'tekst', inhoud: { en: 'The very next day, a building contractor named Pierre-François Palloy began tearing the Bastille down. He turned it into a business, selling its stones carved into small models of the fortress all over France. The Marquis de Lafayette, hero of the American war, sent the main key of the Bastille to George Washington. It still hangs at Washington\'s home, Mount Vernon.' } },
        { type: 'tekst', inhoud: { en: 'The fall of the Bastille set off a chain of events nobody could control. In August the Assembly abolished the privileges of the nobility and adopted the Declaration of the Rights of Man and of the Citizen. Three years later France became a republic, and in 1793 Louis XVI and Marie Antoinette were executed.' } },
        { type: 'weetje', tekst: { en: 'On 14 July 1789, Louis XVI wrote one word in his diary: "Rien", nothing. It was his hunting diary, and it meant he had caught nothing that day.' } },
        { type: 'tekst', inhoud: { en: 'Today nothing of the fortress is left standing on the Place de la Bastille, except a line of paving stones that marks where its walls once stood. Since 1880, 14 July has been France\'s national holiday.' } },
      ],
    },
  ],
};

export const vroegmoderneTijdGebeurtenissen: Verhaal[] = [bestormingBastille];
