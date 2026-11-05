import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

/**
 * Losse events van dit tijdperk (`soort: 'gebeurtenis'`, sinds 2026-10-28). Ze staan niet op de
 * routekaart of de reiskaart maar in de events-sectie op Home (`EventsSectie`), zijn korter dan
 * een biografie (4-5 hoofdstukken) en ontgrendelen geen personage.
 */

export const elfSeptember: Verhaal = {
  id: 'september-11-attacks',
  beginJaar: 2001,
  toegevoegdOp: '2026-11-05',
  titel: { en: 'September 11, 2001' },
  ondertitel: { en: 'The morning that changed the twenty-first century, and the people who ran towards it' },
  teaser: { en: 'On a clear Tuesday morning, nineteen men hijacked four airliners over the United States. In less than two hours, nearly three thousand people were dead and the world had changed.' },
  jaar: 2001,
  periodeLabel: '2001',
  soort: 'gebeurtenis',
  afbeelding: CHARACTER_IMAGES['september-11-attacks'],
  portretKleur: '#3E4A5E',
  uitgelicht: false,
  volgorde: 99,
  tijdperkId: 'hedendaags',
  themas: ['terrorisme', 'amerika', 'new-york', 'moed', 'veiligheid'],
  leestijdMinuten: 4,
  // Een event heeft geen personage (2026-10-28); het veld is verplicht en draagt de titel.
  personage: { naam: 'September 11, 2001' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Clear Tuesday Morning' },
      afbeelding: SCENE_IMAGES['september-11-attacks-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['september-11-attacks-1'],
          alt: { en: 'The twin towers of the World Trade Center rising over Lower Manhattan on a clear blue morning, seen from a ferry full of commuters.' },
          bijschrift: { en: 'New York, 11 September 2001, just after 8 a.m.' },
        },
        { type: 'tekst', inhoud: { en: 'Tuesday 11 September 2001 began as a beautiful late-summer day on the east coast of the United States, with clear skies from Boston to Washington. In New York, tens of thousands of people were arriving for work at the World Trade Center, whose two 110-storey towers were the tallest buildings in the city.' } },
        { type: 'tekst', inhoud: { en: 'That morning, nineteen men boarded four airliners at airports in Boston, Newark and Washington. All four flights were bound for California, so their tanks were full of fuel. The men belonged to al-Qaeda, a terrorist network led by Osama bin Laden from Afghanistan, which had attacked American targets before.' } },
        { type: 'kop', tekst: { en: '8.46 a.m.' } },
        { type: 'tekst', inhoud: { en: 'Shortly after take-off, the hijackers attacked the crews and took control of the planes. At 8.46 a.m. American Airlines Flight 11 was flown into the North Tower of the World Trade Center. At first many people thought it was a terrible accident. Television stations began broadcasting live pictures of the burning tower.' } },
        { type: 'tekst', inhoud: { en: 'Seventeen minutes later, at 9.03 a.m., with millions of people watching, United Airlines Flight 175 struck the South Tower. Now everyone understood: America was under attack.' } },
        { type: 'sleutelmoment', jaar: 2001, tekst: { en: 'On 11 September, hijacked planes strike both towers of the World Trade Center.' } },
      ],
    },
    {
      id: 2,
      titel: { en: 'Up the Stairs' },
      afbeelding: SCENE_IMAGES['september-11-attacks-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['september-11-attacks-2'],
          alt: { en: 'Firefighters in heavy coats and helmets walking down a Manhattan street covered in grey dust and scattered paper.' },
          bijschrift: { en: '343 New York firefighters lost their lives that morning.' },
        },
        { type: 'tekst', inhoud: { en: 'Inside the towers, the impacts had destroyed the lifts and the stairwells on the floors that were hit. Below them, thousands of people began the long walk down, sometimes from the seventieth or eightieth floor, in stairwells filled with smoke and crowded with colleagues helping each other.' } },
        { type: 'tekst', inhoud: { en: 'Going the other way, up the same stairs, were firefighters and police officers, carrying heavy equipment, climbing towards the fire to help whoever they could reach. Thanks to the evacuation, most of the people below the impact zones got out.' } },
        { type: 'kop', tekst: { en: 'The Collapse' } },
        { type: 'tekst', inhoud: { en: 'The burning jet fuel weakened the towers\' steel frames. At 9.59 a.m., 56 minutes after it was hit, the South Tower collapsed. At 10.28 a.m. the North Tower followed. Enormous clouds of dust rolled through the streets of Lower Manhattan, and people ran for their lives.' } },
        { type: 'tekst', inhoud: { en: 'Among the dead were 343 firefighters of the New York Fire Department, along with dozens of police officers and rescue workers. In the months afterwards, workers searched the ruins, known as Ground Zero, day and night. Many of them later became ill from the dust they breathed there.' } },
        { type: 'weetje', tekst: { en: 'With bridges and tunnels closed, ferries, tugboats, fishing boats and pleasure boats rushed to the tip of Manhattan. In about nine hours they carried around half a million people to safety across the water, one of the largest evacuations by sea in history.' } },
      ],
    },
    {
      id: 3,
      titel: { en: 'Flight 93' },
      afbeelding: SCENE_IMAGES['september-11-attacks-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['september-11-attacks-3'],
          alt: { en: 'A quiet field in rural Pennsylvania, with a fence covered in small flags, flowers and cards left by visitors.' },
          bijschrift: { en: 'Near Shanksville, Pennsylvania: the passengers of Flight 93 fought back.' },
        },
        { type: 'tekst', inhoud: { en: 'At 9.37 a.m. a third hijacked plane, American Airlines Flight 77, was flown into the Pentagon, the headquarters of the US military just outside Washington. 184 people died there, in the building and on the plane.' } },
        { type: 'tekst', inhoud: { en: 'The fourth plane, United Airlines Flight 93 from Newark, had taken off about 25 minutes late. By the time the hijackers seized it, the attacks in New York had already happened. Passengers and crew phoned their families from the plane, and learned what the hijackers were planning.' } },
        { type: 'kop', tekst: { en: '"Let\'s Roll"' } },
        { type: 'tekst', inhoud: { en: 'They decided to act. After a quick vote, a group of passengers rushed the cockpit. One of them, Todd Beamer, was heard on an open phone line saying "Are you guys ready? Let\'s roll." The hijackers rolled the plane violently to throw them off balance, and then flew it into the ground. At 10.03 a.m. Flight 93 crashed into a field near Shanksville, Pennsylvania, about twenty minutes\' flying time from Washington. All 40 passengers and crew were killed.' } },
        { type: 'tekst', inhoud: { en: 'The hijackers\' target was probably the Capitol or the White House. The passengers did not save themselves, but they very likely saved many others.' } },
        { type: 'weetje', tekst: { en: 'For the first time in history, all civilian air traffic over the United States was ordered to land. Thirty-eight diverted airliners came down in the small town of Gander, in Newfoundland, Canada, where some 10,000 residents took in nearly 7,000 stranded passengers for several days.' } },
      ],
    },
    {
      id: 4,
      titel: { en: 'A Changed World' },
      afbeelding: SCENE_IMAGES['september-11-attacks-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['september-11-attacks-4'],
          alt: { en: 'A square memorial pool with water flowing down dark walls, a white rose placed on a bronze parapet engraved with names.' },
          bijschrift: { en: 'The 9/11 Memorial: two pools where the towers once stood.' },
        },
        { type: 'tekst', inhoud: { en: '2,977 people were killed in the attacks, not counting the hijackers: in New York, at the Pentagon and on the four planes. They came from more than ninety countries. It was the deadliest terrorist attack in history.' } },
        { type: 'tekst', inhoud: { en: 'Within a month, the United States and its allies attacked Afghanistan, where the Taliban government had sheltered bin Laden. In 2003 the US also invaded Iraq, a war that remains deeply controversial. Bin Laden himself was found and killed by American special forces in Pakistan in May 2011. Twenty years after the attacks, in 2021, the last American troops left Afghanistan, and the Taliban returned to power.' } },
        { type: 'sleutelmoment', jaar: 2011, tekst: { en: 'In May, Osama bin Laden is killed in Pakistan. In September, the 9/11 Memorial opens in New York.' } },
        { type: 'kop', tekst: { en: 'Locked Doors and Long Queues' } },
        { type: 'tekst', inhoud: { en: 'Everyday life changed too. Cockpit doors were reinforced and locked during flights. Airport security became far stricter, with longer checks and new rules on what passengers could carry. Governments around the world gave their intelligence services new powers, and many people still debate where safety ends and privacy begins.' } },
        { type: 'tekst', inhoud: { en: 'Where the towers stood, two square pools now sit in their exact footprints, with the names of the victims cut into the bronze around them. Next to them rises One World Trade Center, 541 metres tall. Every year on the evening of 11 September, two beams of light shine up into the sky where the towers once were.' } },
        { type: 'weetje', tekst: { en: 'A month after the attacks, workers found a badly burned pear tree in the rubble with just one living branch. It was nursed back to health and replanted at the memorial in 2010. Today it blossoms every spring and is known as the Survivor Tree.' } },
      ],
    },
  ],
};

export const hedendaagsGebeurtenissen: Verhaal[] = [elfSeptember];
