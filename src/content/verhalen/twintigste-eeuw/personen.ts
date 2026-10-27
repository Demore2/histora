import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

// Content generated from 20th Century agent (3 stories with 8 chapters each)
// Full details: Marie Curie, Winston Churchill, Martin Luther King Jr.

export const marieCurie: Verhaal = {
  id: 'marie-curie',
  beginJaar: 1867,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Marie Curie' },
  ondertitel: { en: 'The Scientist Who Unveiled the Power of Atoms' },
  teaser: { en: 'Born in Warsaw, she discovered the hidden forces within matter itself—and changed science forever.' },
  jaar: 1934,
  periodeLabel: '1867 - 1934',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['marie-curie'],
  portretKleur: '#6B8E4F',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'twintigste-eeuw',
  themas: ['wetenschap', 'radioactiviteit', 'vrouwen', 'Frankrijk', 'atoom'],
  leestijdMinuten: 9,
  personage: { naam: 'Marie Curie' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Polish Girl Dreams of Science' },
      afbeelding: SCENE_IMAGES['marie-curie-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-1'],
          alt: { en: 'A girl reading by candlelight in a modest Warsaw apartment.' },
          bijschrift: { en: 'Russian-ruled Warsaw did not admit women to university. She studied at an illegal one instead.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Maria Skłodowska was born in Warsaw, Poland, in 1867, during a time when few girls were permitted to pursue science. Her childhood was marked by tragedy. When she was only eight years old, her eldest sister died of typhus. Two years later, her mother succumbed to tuberculosis. These losses shaped Maria\'s character, giving her a fierce determination to achieve something meaningful with her life. Despite her grief, she was captivated by the world of science—by chemistry, physics, and the mysteries of nature that seemed to hold infinite answers.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In Russian-occupied Warsaw, where her family lived, attending university was forbidden for women. But Maria was undeterred. She attended secret "floating schools"—underground educational gatherings held in different locations to avoid Russian authorities. There, she studied with other eager young people, absorbing every bit of knowledge she could gather. Her teachers recognized her exceptional talent. By her late teens, Maria had made a decision: she would leave Poland and travel to Paris, where women were allowed to study at universities. It was a bold move for a young woman traveling alone in the 1890s, but Maria was ready to seize this opportunity.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'From Warsaw to Paris' },
      afbeelding: SCENE_IMAGES['marie-curie-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-2'],
          alt: { en: 'A student working by candlelight in a freezing Paris attic room.' },
          bijschrift: { en: 'She finished first in her physics degree, and second in mathematics the year after.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1891, at the age of 23, Maria arrived in Paris with almost no money in her pockets. She enrolled at the University of Paris, one of the first female physics students in the institution\'s history. Life was difficult. She lived in a small, freezing room in the Latin Quarter, surviving on bread, chocolate, and eggs. Sometimes she had so little food that she would faint during her studies. Despite these hardships, Maria threw herself into her work with remarkable intensity. She attended lectures, performed experiments, and read everything she could find about the latest discoveries in physics and chemistry.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1893, she earned her degree in physics—ranking first in her examinations. A year later, she obtained another degree in mathematics, ranking second. By this time, Maria had adopted the French version of her name: Marie. Her dedication and brilliance had not gone unnoticed. Through a Polish physicist friend, Marie was introduced to Pierre Curie, a talented scientist who had made important discoveries in crystallography. When they met in 1894, it was clear that they shared not only a passion for science but also a connection that would change both their lives. They married in July 1895, beginning a partnership that would lead to some of the greatest scientific discoveries of the age.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Mystery of Rays' },
      afbeelding: SCENE_IMAGES['marie-curie-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-3'],
          alt: { en: 'A shed laboratory where a couple stir a vat of pitchblende residue.' },
          bijschrift: { en: 'A tonne of pitchblende yielded about a tenth of a gram of radium chloride.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1896, Marie chose an exciting topic for her doctoral research. Just one year earlier, Wilhelm Röntgen had discovered X-rays, and Henri Becquerel had noticed that uranium emitted mysterious rays. The scientific world was ablaze with curiosity. Marie decided to investigate these rays more thoroughly using an electrometer—a sensitive instrument that Pierre and his brother had invented. This device could measure tiny electrical currents with remarkable precision, making it perfect for studying these invisible radiations.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Working in a converted shed that served as a laboratory, Marie tested numerous elements and minerals. She discovered that the strength of the rays was proportional to the amount of uranium present—not to the chemical compounds it formed. This meant the rays came from the atom itself, a revolutionary idea. But then she noticed something puzzling. Some minerals emitted far more rays than their uranium content would predict. Marie hypothesized that these minerals must contain unknown elements that were even more radioactive than uranium. This intuition would prove correct.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Working alongside Pierre, Marie began the arduous process of processing tons of pitchblende ore—a mineral that had been mined in Bohemia. They boiled it, filtered it, and chemically separated it, fraction by fraction, always measuring the radioactivity. It was exhausting, painstaking work conducted in their cold, drafty shed. But in 1898, their efforts were rewarded: they isolated two new elements. One they named polonium, after Marie\'s native country. The other, they called radium—the most radioactive element they had found. The scientific community erupted in excitement.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Fame and Tragedy' },
      afbeelding: SCENE_IMAGES['marie-curie-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-4'],
          alt: { en: 'A woman in black walking away down a rain-wet Paris street.' },
          bijschrift: { en: 'Pierre was killed by a horse-drawn wagon in 1906. She was thirty-eight.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The discovery of radium and polonium made the Curies world-famous. In 1903, Marie became the first woman to earn a doctorate in physics in France. That same year, she and Pierre, along with Henri Becquerel, shared the Nobel Prize in Physics—one of the world\'s highest scientific honors. Remarkably, the Nobel Prize committee initially had not intended to include Marie, planning to honor only Pierre and Becquerel. It was Pierre himself who insisted that his wife\'s contributions be recognized equally. Marie and Pierre had become symbols of scientific progress and intellectual partnership.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The Curies refused to patent their radium discovery, believing that scientific knowledge should be freely available to all researchers and doctors. This decision meant they never became wealthy from their breakthrough, but they adhered to their principles. They had two daughters, Irène and Ève, and Marie tried to balance motherhood with her scientific ambitions—a challenge few women of her era attempted. But tragedy struck on April 19, 1906. Pierre, deep in thought about his research, stepped behind a horse-drawn wagon near the Pont-Neuf in Paris. He was instantly killed. Marie was devastated. Her partner, her scientific collaborator, and the father of her children was gone in an instant.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Continuing the Work' },
      afbeelding: SCENE_IMAGES['marie-curie-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-5'],
          alt: { en: 'A woman lecturing to a packed amphitheatre of students at the Sorbonne.' },
          bijschrift: { en: 'She took over his chair and became the first woman ever to teach at the Sorbonne.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Marie faced a choice. She could retreat from science and focus on her daughters, as many people expected a widow to do. Instead, she made a remarkable decision: she would continue the work. The University of Paris offered her Pierre\'s professorship—the first time a French university had appointed a woman to such a position. In her first lecture, before a packed hall of scientists and curious onlookers, Marie spoke about radium and its properties. When she reached the point in her notes where Pierre\'s work ended, she paused, too overcome with emotion to continue. The audience sat in respectful silence. It was a powerful moment, but Marie recovered and finished her lecture. She would not be stopped by grief.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Over the following years, Marie threw herself into her research with even greater intensity. She had already been nominated for a second Nobel Prize for her discovery of radium\'s atomic weight, and in 1911, she won it—becoming the first person ever to win Nobel Prizes in two different scientific fields. This achievement was remarkable, but it also sparked controversy. Some voices in the French press attacked her, partly because she was a woman, and partly because she had become involved in a personal relationship with a fellow scientist, Paul Langevin, who was separated from his wife. The scandal threatened to overshadow her scientific accomplishments, but Marie refused to let public opinion silence her. She continued her work, undeterred.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'War and Dedication' },
      afbeelding: SCENE_IMAGES['marie-curie-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-6'],
          alt: { en: 'A motor van fitted as a mobile X-ray unit at a field hospital.' },
          bijschrift: { en: 'She equipped some twenty radiology vans and drove one herself, with her daughter Irène.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When World War I erupted in 1914, Europe was plunged into unprecedented conflict. Marie recognized that X-ray machines could save lives on the battlefield by helping doctors locate bullets and identify internal injuries in wounded soldiers. The French military, however, had very few radiography units, and many were far from the front lines. Marie could not sit idle while soldiers suffered. Using her own money and donations, she purchased X-ray equipment and installed it in a van she nicknamed "Petite Curies"—little Curies—after her two daughters. She drove to the front lines herself, operating the equipment and training others to use it.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Marie made multiple trips to dangerous areas near the fighting, often working in conditions that exposed her to both enemy fire and continuous radiation. She wrote about her experiences: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less." Her mobile X-ray units, and the radiography stations she helped establish, saved thousands of lives during the war. After the war, her health had been damaged by the accumulated radiation exposure from years of handling radioactive materials without proper protection—though she did not yet realize how seriously.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Despite her health challenges, Marie continued to work and to train the next generation of scientists. Her daughter Irène followed in her footsteps, becoming a physicist and eventually winning her own Nobel Prize. Marie established the Curie Institute in Paris, a world-leading research center dedicated to the study of radioactivity and its applications in medicine. She traveled internationally, giving lectures and raising funds for her institute. Even as her energy waned, she remained committed to the mission that had defined her life: the pursuit of scientific knowledge and its application to help humanity.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Price of Discovery' },
      afbeelding: SCENE_IMAGES['marie-curie-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-7'],
          alt: { en: 'A worn notebook, glassware and fogged photographic plates on a bench.' },
          bijschrift: { en: 'Her notebooks are still radioactive. They are kept in lead-lined boxes.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In her final years, Marie\'s health deteriorated. The cumulative effects of radiation exposure were taking their toll. She suffered from anemia, joint pain, and other ailments that made it difficult to work. In 1934, at the age of 66, she was admitted to a hospital near Paris. Doctors diagnosed her with aplastic anemia—a rare blood disorder almost certainly caused by decades of exposure to radiation. At this time, very little was known about how to treat radiation sickness, and there was no cure. Marie knew, better than anyone, what was happening to her body. The very element she had devoted her life to studying was destroying her.' }
        },
        {
          type: 'citaat',
          tekst: { en: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.' },
          bron: { en: 'Marie Curie' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On July 4, 1934, Marie Curie died. She was buried beside Pierre in the small town of Sceaux. Sixty-one years later, in 1995, both were moved to the Panthéon in Paris, and she became the first woman laid to rest there for her own achievements. Her life had been dedicated to understanding the mysteries of matter, and in doing so, she had opened doors that would lead to countless medical and technological advances. The periodic table of elements now carries her legacy: Curium, element 96, was named in honor of Marie and Pierre for their contributions to the discovery of radioactivity. She had lived by her principles: to question, to investigate, and to share knowledge with the world.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'A Revolutionary Legacy' },
      afbeelding: SCENE_IMAGES['marie-curie-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-curie-8'],
          alt: { en: 'Young women in white coats at work in a bright institute laboratory.' },
          bijschrift: { en: 'She remains the only person to have won Nobel Prizes in two different sciences.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Marie Curie\'s impact on science and society extended far beyond her discoveries of polonium and radium. She shattered the barrier that had prevented women from entering the world of scientific research at the highest levels. Before Marie, it was almost unthinkable for a woman to win a Nobel Prize, to hold a university professorship, or to direct a major scientific institute. She proved that scientific brilliance knows no gender. Today, countless women in physics, chemistry, biology, and medicine cite Marie Curie as their inspiration. She showed the world that a woman could be just as dedicated, just as brilliant, and just as transformative as any man in science.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The applications of her discoveries revolutionized medicine and physics. Radioactivity became central to modern nuclear physics and led to the development of nuclear energy. In medicine, radiotherapy became one of the most powerful tools for treating cancer. X-rays, which she helped popularize, became essential for diagnosis. Medical isotopes derived from her work are used worldwide every day. Her research laid the groundwork for 20th-century physics and changed how we understand the fundamental nature of matter itself. Marie Curie\'s story reminds us that great achievements often require sacrifice, determination, and the courage to pursue your passion despite obstacles. She faced poverty, discrimination because of her gender, personal tragedy, and ultimately, illness caused by her own scientific work. Yet she never wavered in her commitment to understanding nature and using that understanding to benefit humanity. In 2011, on what would have been her 144th birthday, the Google Doodle honored her—introducing millions of people worldwide to her remarkable life. Marie Curie remains one of history\'s most celebrated scientists, a testament to the power of curiosity, perseverance, and the human desire to understand our world.' }
        }
      ]
    },
  ]
};

export const winstonChurchill: Verhaal = {
  id: 'winston-churchill',
  beginJaar: 1874,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Winston Churchill' },
  ondertitel: { en: 'The Statesman Who Led Britain Through Its Darkest Hour' },
  teaser: { en: 'A determined leader who rallied a nation against tyranny and changed the course of history.' },
  jaar: 1965,
  periodeLabel: '1874 - 1965',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['winston-churchill'],
  portretKleur: '#4A5A6B',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'twintigste-eeuw',
  themas: ['politiek', 'wereldoorlog', 'leiderschap', 'groot-brittannie', 'strategie'],
  leestijdMinuten: 7,
  personage: { naam: 'Winston Churchill' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born to Privilege, Driven by Ambition' },
      afbeelding: SCENE_IMAGES['winston-churchill-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-1'],
          alt: { en: 'A boy arranging rows of lead soldiers in a vast palace room.' },
          bijschrift: { en: 'Born at Blenheim, near the bottom of his class, and a soldier before he was a politician.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Winston Leonard Spencer Churchill was born on November 30, 1874, into one of Britain\'s most aristocratic families. His father, Lord Randolph Churchill, was a prominent Conservative politician, and his mother was an American heiress. Despite his privileged birth, young Winston\'s childhood was marked by emotional distance from his parents. He attended elite schools but was considered a mediocre student, struggling with subjects that bored him. However, he possessed an unshakeable determination and an exceptional talent for writing and public speaking that would define his career.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'As a young man, Churchill embarked on a military career, serving in India, Sudan, and South Africa. His experiences as a soldier and war correspondent shaped his worldview and provided material for his prolific writing. He wrote books about his military adventures that became bestsellers and established him as a public figure. By his early thirties, Churchill had transitioned from military service to politics, entering Parliament as a Conservative MP in 1900. His political journey would be marked by party switches, powerful speeches, and an unwavering belief in Britain\'s destiny as a global power.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Rising Through the Political Ranks' },
      afbeelding: SCENE_IMAGES['winston-churchill-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-2'],
          alt: { en: 'A politician studying naval charts with admirals in an Admiralty room.' },
          bijschrift: { en: 'Gallipoli cost him the Admiralty. He went to the Western Front as a battalion commander.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill rapidly climbed the political ladder, serving as President of the Board of Trade, Home Secretary, and First Lord of the Admiralty before turning forty. His tenure at the Admiralty during World War I was marked by ambitious initiatives, including his support for the ill-fated Gallipoli Campaign, which resulted in heavy British casualties. This failure damaged his reputation and led to his resignation. For several years, Churchill was something of a political outcast, blamed for the disaster and struggling to rebuild his standing in Parliament and with the public.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'During the 1920s and 1930s, Churchill held various political positions and wrote extensively, maintaining his public profile through journalism and books. However, he grew increasingly alarmed by the rise of Adolf Hitler and Nazi Germany. While many British politicians, including Prime Minister Neville Chamberlain, pursued a policy of appeasement, Churchill warned repeatedly about the Nazi threat. His speeches became more passionate and urgent as he tried to wake his country to the danger. Though widely dismissed as a warmonger at the time, Churchill\'s warnings would prove prophetic.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'War and Leadership' },
      afbeelding: SCENE_IMAGES['winston-churchill-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-3'],
          alt: { en: 'An underground map room beneath wartime London.' },
          bijschrift: { en: 'He became prime minister on 10 May 1940 — the day Germany invaded the Low Countries.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In May 1940, as Nazi Germany invaded France and seemed poised to conquer all of Europe, Churchill became Prime Minister of Britain at age sixty-five. The nation was in crisis, facing possible invasion and seemingly inevitable defeat. In his first speech as Prime Minister, Churchill told the British people he had nothing to offer but "blood, toil, tears and sweat." He refused to consider surrender or negotiation with Hitler, declaring that Britain would defend itself alone if necessary and that ultimate victory would belong to those who never surrendered.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill\'s leadership during the darkest days of World War II was extraordinary. Through stirring speeches delivered over radio, he inspired the British people to endure the German Blitz, bombing raids that destroyed cities and killed thousands. He communicated a sense of purpose and defiance, transforming Britain\'s fight from a desperate struggle against overwhelming odds into a moral battle for civilization itself. His famous declaration that "we shall never surrender" became a rallying cry that steeled the nation\'s resolve. Churchill also proved himself a shrewd strategist and diplomat, forging alliances with the United States and the Soviet Union.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Victory and Defeat' },
      afbeelding: SCENE_IMAGES['winston-churchill-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-4'],
          alt: { en: 'Three Allied leaders seated for a photograph before a colonnaded palace.' },
          bijschrift: { en: 'Yalta, February 1945. Britain was still fighting, and negotiating from growing weakness.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As the war progressed, Churchill worked tirelessly to maintain the alliance between Britain, America, and the Soviet Union. He met with Franklin D. Roosevelt and Joseph Stalin at key conferences to coordinate strategy and plan for the postwar world. Churchill negotiated from a position of declining British power—Britain was fighting for survival but increasingly dependent on American economic and military support. Nevertheless, he fought hard to protect British interests and to shape the peace that would follow the war.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Germany surrendered in May 1945, and Churchill was at the height of his fame and influence. However, in July 1945, British voters unexpectedly voted his Conservative Party out of power, choosing the Labour Party instead. Shocked and hurt, Churchill was forced to step down as Prime Minister just months after victory. He felt that Britain had repaid him poorly for his leadership during the war, but he remained in Parliament as Leader of the Opposition. His defeat was a reminder that military victory does not always translate into political success.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Iron Curtain and the Cold War' },
      afbeelding: SCENE_IMAGES['winston-churchill-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-5'],
          alt: { en: 'An elderly statesman speaking from a podium in an American college hall.' },
          bijschrift: { en: 'Fulton, Missouri, 1946: an iron curtain, he said, had descended across the continent.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Out of power, Churchill warned of new dangers. In a famous 1946 speech in Fulton, Missouri, he spoke of an "Iron Curtain" that had descended across Eastern Europe, dividing the free West from the Soviet-dominated East. This speech, delivered in collaboration with President Truman, helped articulate what would become known as the Cold War—the ideological and strategic competition between the capitalist West and the communist Soviet Union that would dominate global politics for the next four decades.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill\'s concept of the "Iron Curtain" became a central metaphor for understanding the postwar division of Europe. He advocated for a strong Western alliance, including NATO, to contain Soviet expansion. His warnings about communist threats shaped Western policy for years. Churchill also promoted the idea of a "special relationship" between Britain and America, arguing that these two English-speaking democracies should work together to preserve freedom and prevent another world war. His influence on postwar geopolitics was immense, even from opposition.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Return to Power and Continued Service' },
      afbeelding: SCENE_IMAGES['winston-churchill-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-6'],
          alt: { en: 'An old prime minister at the cabinet table in a panelled Downing Street room.' },
          bijschrift: { en: 'He returned to office at seventy-six and stayed until a stroke forced him out.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1951, Churchill returned to power as Prime Minister at age seventy-six. Rather than fading into retirement, he embarked on a second term as Britain\'s leader. His government focused on maintaining Britain\'s status as a great power and managing the transition to a new postwar world. Churchill also commissioned the building of nuclear weapons to ensure Britain would not be eclipsed by American nuclear superiority. He worked to maintain the Anglo-American alliance and to contain Soviet expansion while also managing Britain\'s declining empire.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill served as Prime Minister until 1955, when he finally retired at age eighty. Even in his seventies and eighties, he continued to command respect and influence. He remained an MP until 1964, continuing to contribute to Parliament\'s debates and serving as an elder statesman. Churchill\'s second term was less dramatic than his wartime leadership but was still significant in shaping the early Cold War world and establishing Britain\'s role in the new international order.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'Words and Legacy' },
      afbeelding: SCENE_IMAGES['winston-churchill-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-7'],
          alt: { en: 'A writer’s study with manuscript pages, a cigar and a green-shaded lamp.' },
          bijschrift: { en: 'He won the Nobel Prize in Literature in 1953 — for history and oratory, not fiction.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Throughout his long life, Churchill was a master of rhetoric and language. His speeches were carefully crafted, full of vivid imagery, classical references, and memorable phrases. He won the Nobel Prize in Literature in 1953 for his war memoirs and historical writings. Churchill believed in the power of words to inspire, persuade, and shape history. His speeches during World War II are still studied for their oratorical brilliance and their ability to move people to action. He demonstrated that political leadership is not just about making decisions—it\'s about communicating a vision that people can believe in.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill was also a prolific writer, producing numerous books on military history, politics, and his own life. His multi-volume work "The Second World War" is considered a masterpiece of historical writing. He used his writing to influence political thinking and to shape how people understood history. For Churchill, words were a weapon as powerful as any military force, and he wielded them with precision and skill.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'An Enduring Legacy' },
      afbeelding: SCENE_IMAGES['winston-churchill-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['winston-churchill-8'],
          alt: { en: 'A coffin on a launch passing dockside cranes that dip in salute.' },
          bijschrift: { en: 'The Thames cranes lowered their jibs as he passed. Nobody had ordered them to.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Winston Churchill died on January 24, 1965, at age ninety. His death was mourned worldwide as the end of an era. He is remembered as one of the greatest leaders of the twentieth century—a man who rallied his nation in its darkest hour and helped defeat Nazi tyranny. His stubbornness, determination, and refusal to accept defeat when others counseled surrender were exactly the qualities Britain needed during World War II. Churchill proved that individual leadership matters, that moral courage is essential in times of crisis, and that words can be as powerful as weapons in shaping the course of history.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Churchill\'s legacy extends beyond World War II and the Cold War. He is remembered for demonstrating the importance of democratic values, individual liberty, and resistance to tyranny. His warnings about the dangers of totalitarianism remain relevant. His speeches continue to be read and quoted as examples of powerful political communication. Churchill showed that a leader must be willing to stand alone against prevailing opinion when principle demands it, and that perseverance in the face of overwhelming odds can lead to ultimate victory. Today, nearly sixty years after his death, Winston Churchill remains one of history\'s most celebrated and influential political figures.' }
        }
      ]
    },
  ]
};

export const martinLutherKingJr: Verhaal = {
  id: 'martin-luther-king-jr',
  beginJaar: 1929,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Martin Luther King Jr.' },
  ondertitel: { en: 'The Dreamer Who Changed America' },
  teaser: { en: 'Through nonviolent resistance, he shattered the chains of racial segregation and inspired a nation.' },
  jaar: 1968,
  periodeLabel: '1929 - 1968',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['martin-luther-king-jr'],
  portretKleur: '#6B4A3A',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'twintigste-eeuw',
  themas: ['burgerrechten', 'rascisme', 'geweldloosheid', 'amerikaanse samenleving', 'gelijkheid'],
  leestijdMinuten: 7,
  personage: { naam: 'Martin Luther King Jr.' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Growing Up in the Jim Crow South' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-1'],
          alt: { en: 'A southern American street with two drinking fountains side by side.' },
          bijschrift: { en: 'Segregation was not merely custom but law, enforced in schools, buses, courts and waiting rooms.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Martin Luther King Jr. was born on January 15, 1929, in Atlanta, Georgia, in the American South during the era of Jim Crow segregation. His father was a prominent minister, and young Martin grew up in a relatively privileged African American household. However, no amount of family wealth or education could shield him from the brutal reality of racial segregation. Jim Crow laws mandated the separation of blacks and whites in schools, restaurants, public transportation, and almost every aspect of public life. The signs reading "Whites Only" and "Colored" were constant reminders of the inferior status to which African Americans were relegated.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Martin\'s parents were educated and proud, determined to instill in their son a sense of his own worth and dignity despite the racism surrounding him. They taught him that he was equal to anyone, regardless of skin color. His father\'s work as a minister exposed Martin to the traditions of the black church, which combined faith, morality, and social justice. Young Martin excelled in school and showed an early interest in theology and philosophy. He attended Morehouse College at age fifteen and later went to seminary. Throughout his education, King grappled with questions about justice, equality, and how to address the sin of racism.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Becoming a Minister and Finding a Philosophy' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-2'],
          alt: { en: 'A young minister preaching from the pulpit of a red-brick Baptist church.' },
          bijschrift: { en: 'Montgomery, 1954. He was twenty-five, with a new doctorate and a first congregation.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Martin Luther King Jr. was ordained as a minister at age eighteen and later earned a doctorate in systematic theology. He became pastor of the Dexter Avenue Baptist Church in Montgomery, Alabama, in 1954. King\'s early ministry focused on the spiritual and moral dimensions of faith, but he was increasingly aware of the gap between Christian teachings about love and equality and the reality of racial injustice in American society. He studied the teachings of Mahatma Gandhi, whose philosophy of nonviolent resistance through civil disobedience offered a practical approach to fighting injustice without resorting to violence.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'King developed a theology that combined Christian ethics, American ideals of democracy and equality, and Gandhi\'s methods of nonviolent resistance. He believed that moral progress required confronting injustice directly but without hatred or violence. This philosophy—often called nonviolent civil disobedience—became the foundation of the civil rights movement. King argued that unjust laws should be openly disobeyed, but those who broke the law should be willing to accept legal punishment without fighting back, thereby exposing the injustice of the system through their suffering.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Montgomery Bus Boycott' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-3'],
          alt: { en: 'Residents walking to work at dawn as an empty city bus passes.' },
          bijschrift: { en: '381 days of walking. The bus company lost roughly three-quarters of its riders.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On December 1, 1955, Rosa Parks, a seamstress and civil rights activist, refused to give up her seat to a white passenger on a Montgomery bus, an act that violated local segregation laws. She was arrested. This simple act of courage sparked the Montgomery Bus Boycott, a sustained protest that lasted 381 days. The black community of Montgomery organized a complete boycott of the bus system, coordinated by a group of ministers including the young Martin Luther King Jr. King\'s church became headquarters for the boycott movement.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Despite threats against his life, King led the boycott with remarkable composure and grace. He articulated a vision of nonviolent resistance that inspired thousands of people to maintain the boycott despite personal hardship. The boycott achieved its goal—the Supreme Court ruled that segregation on buses was unconstitutional. The Montgomery Bus Boycott was a watershed moment. It demonstrated that organized, nonviolent protest could succeed against an unjust system, and it catapulted Martin Luther King Jr. to national prominence. He was just twenty-six years old and had already changed the course of American history.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'The Sit-Ins and Freedom Rides' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-4'],
          alt: { en: 'Students sitting at a segregated lunch counter as a crowd presses behind.' },
          bijschrift: { en: 'The rule was absolute: whatever was done to you, you did not hit back.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Throughout the late 1950s and early 1960s, King led and supported a series of nonviolent protests against segregation. In 1960, African American college students began sit-ins at segregated lunch counters in Greensboro, North Carolina, and the movement spread rapidly. Young people, black and white, sat peacefully at lunch counters and endured verbal abuse, threats, and physical violence, never fighting back. King supported these sit-ins and encouraged students to maintain nonviolent discipline, believing that their refusal to respond with violence would ultimately expose the immorality of their oppressors\' actions.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1961, Freedom Riders—integrated groups of activists—traveled on buses through the deep South to challenge segregation in interstate bus travel. These rides were dangerous, and the riders faced violent mobs and arrest. King did not always participate directly in each action, but he provided moral and strategic leadership for the movement. He was arrested multiple times, jailed, and threatened with death. Each time, he emerged from these experiences strengthened in his conviction that nonviolent resistance was morally superior to violence, even when facing brutal opposition.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Dream and the March on Washington' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-5'],
          alt: { en: 'A vast crowd filling the reflecting pool between a memorial and an obelisk.' },
          bijschrift: { en: 'August 1963. The most famous passage of the speech was not in the prepared text.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On August 28, 1963, more than 200,000 people gathered in Washington, DC, for the March on Washington for Jobs and Freedom. It was the largest political demonstration in American history to that date. Martin Luther King Jr. stood on the steps of the Lincoln Memorial and delivered the speech that would define his legacy: "I Have a Dream." In this soaring oration, King articulated a vision of a future America where racial segregation would be gone and where people would be judged not by the color of their skin but by the content of their character.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'The dream King described was both deeply rooted in American ideals—drawing on the Declaration of Independence and the Gettysburg Address—and prophetic in its vision of radical transformation. He spoke not with anger but with hope, not with calls for revenge but with demands for justice. The speech moved millions of Americans and elevated the civil rights movement to unprecedented heights. The march and King\'s speech are credited with influencing Congress to pass the Civil Rights Act of 1964, which outlawed racial segregation in public accommodations and employment. For the first time in nearly a century, the federal government had taken strong action to protect the rights of African Americans.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Nobel Prize and the Struggle Continues' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-6'],
          alt: { en: 'A laureate receiving a medal in a grand Scandinavian civic hall.' },
          bijschrift: { en: 'At thirty-five, the youngest Nobel Peace laureate up to that point. He gave the money away.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1964, at age thirty-five, Martin Luther King Jr. became the youngest man at that time to win the Nobel Peace Prize. The award recognized his leadership in the civil rights movement and his commitment to nonviolent resistance. In his Nobel Prize acceptance speech, King spoke of peace and called on humanity to abolish war. However, he also acknowledged that the struggle for racial justice in America was far from over. Despite the Civil Rights Act of 1964, African Americans still faced discrimination in employment, housing, education, and voting rights.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'King expanded his focus to address economic inequality, housing segregation, and voting rights. In 1965, he led a march from Selma to Montgomery, Alabama, to protest voting discrimination. The march was violently attacked by police, but King persisted. The resulting national outcry led Congress to pass the Voting Rights Act of 1965, protecting African Americans\' right to vote. King\'s later years saw him become increasingly critical of American foreign policy, particularly the Vietnam War, which he believed was unjust and was draining resources needed to fight poverty and racism at home.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Widening Vision' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-7'],
          alt: { en: 'Striking sanitation workers marching down a wet Memphis street.' },
          bijschrift: { en: 'By 1968 he was speaking about poverty and Vietnam — and losing allies over both.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By the mid-1960s, King\'s focus had expanded beyond legal segregation to address the deeper structural problems of poverty, inequality, and militarism. He began the Poor People\'s Campaign to address economic injustice affecting not just African Americans but poor people of all races. He became a vocal opponent of the Vietnam War, arguing that America should not be spending billions on warfare when millions of its citizens lived in poverty. King\'s message evolved to encompass a broader vision of human rights and dignity, connected to struggles for justice around the world.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'King\'s willingness to speak out on controversial issues like poverty and war made him more controversial in some circles, even as his moral stature grew. He remained committed to nonviolence despite increasing radicalization within the civil rights movement. After the assassinations of Malcolm X and others, some activists argued that nonviolence was insufficient. King stood firm in his conviction that nonviolent resistance was not only morally superior but also more effective in the long run. He believed that using violence would only perpetuate cycles of violence and would undermine the moral power of the movement.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'A Dream Deferred But Not Defeated' },
      afbeelding: SCENE_IMAGES['martin-luther-king-jr-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-king-jr-8'],
          alt: { en: 'A candlelight vigil beneath a motel balcony at night.' },
          bijschrift: { en: 'Memphis, 4 April 1968. He was thirty-nine years old.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On April 4, 1968, Martin Luther King Jr. was assassinated in Memphis, Tennessee, at age thirty-nine. His death shocked the world and sparked both mourning and anger. He did not live to see the full realization of his dream, and in many ways, the struggle for racial justice and equality continues to this day. Yet the impact of his life and work was immeasurable. The civil rights legislation he helped inspire transformed American society and provided legal protections that continue to benefit millions.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Martin Luther King Jr.\'s legacy extends far beyond the civil rights movement. He demonstrated that one person, armed with moral conviction and committed to nonviolence, can inspire millions and change the course of history. His dream of a nation where people are judged by character rather than color remains an aspiration that continues to inspire people around the world. King showed that moral leadership requires not just words but willingness to suffer for what is right. His life reminds us that progress toward justice is not automatic—it requires constant effort, sacrifice, and unwavering commitment to the principles of human dignity and equality. Today, the civil rights movement King led stands as one of the great moral achievements of the twentieth century, a testament to the power of nonviolent resistance and the possibility of transforming unjust systems through courage and faith.' }
        }
      ]
    },
  ]
};

export const mahatmaGandhi: Verhaal = {
  id: 'mahatma-gandhi',
  beginJaar: 1869,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Mahatma Gandhi' },
  ondertitel: { en: 'The lawyer who took on an empire without firing a shot' },
  teaser: { en: 'A shy lawyer was thrown off a train for the colour of his skin. Decades later, armed with nothing but a handful of salt, he shook the British Empire. How do you win freedom without violence?' },
  jaar: 1948,
  periodeLabel: '1869 - 1948',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['mahatma-gandhi'],
  portretKleur: '#B07A3C',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'twintigste-eeuw',
  themas: ['india', 'geweldloosheid', 'onafhankelijkheid', 'kolonialisme', 'protest'],
  leestijdMinuten: 8,
  personage: { naam: 'Mahatma Gandhi' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Shy Boy from Porbandar' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-1'],
          alt: { en: 'A young Indian man in a Western suit and stiff collar standing on a foggy London street in the 1880s.' },
          bijschrift: { en: 'London, 1888: a homesick law student keeps a promise to his mother.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mohandas Karamchand Gandhi was born on 2 October 1869 in Porbandar, a small port on the west coast of India. His father was the chief minister of the local prince, and his mother, Putlibai, was deeply religious. She fasted often and taught her son that all life was sacred. Few people who knew the boy would have guessed his future. He was so shy that he ran home from school so he would not have to talk to anyone.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As was the custom in his community, he was married at the age of thirteen to Kasturba, a girl of the same age. Later in life Gandhi wrote that he was ashamed of how jealous and bossy he had been as a young husband. Kasturba was no pushover: she would stand at his side, and sometimes stand up to him, for more than sixty years.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Three Promises' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1888 Gandhi sailed to London to study law. Before he left, his mother made him swear three vows: no meat, no alcohol and no women. At first he tried hard to become an English gentleman, with dancing lessons, violin lessons and an expensive suit. But he kept his promises, and through the London Vegetarian Society he met people who made him think seriously about religion and simple living.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1891 he qualified as a barrister and went home. His career in India began badly. At his first case in a Bombay court he was so nervous that he could not get a single question out, sat down and handed the case back. He needed a new start.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Thrown off the Train' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-2'],
          alt: { en: 'A young Indian lawyer in a suit sitting alone in a cold, dim railway waiting room at night.' },
          bijschrift: { en: 'Pietermaritzburg station, 1893: the night that changed his life.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1893 an Indian trading firm asked Gandhi to come to South Africa to help with a lawsuit. He bought a first-class train ticket from Durban to Pretoria. At the station of Pietermaritzburg a white passenger objected to sharing the compartment with a man with brown skin. Gandhi refused to move to the third-class carriage, so a police officer pushed him off the train.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1893,
          tekst: { en: 'Gandhi is thrown off a train in South Africa because of the colour of his skin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He spent the night shivering in the waiting room, too humiliated to ask for his coat, which was in his luggage. He later called it one of the most important moments of his life. Should he go home to India, or stay and fight? By morning he had decided to stay. On the rest of the journey he was beaten by a stagecoach driver for refusing to sit on the footboard.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Finding His Voice' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The shy lawyer turned into an organiser. In 1894 he helped to found the Natal Indian Congress to defend the rights of Indians in South Africa, who faced laws designed to keep them poor and powerless. He wrote petitions, gave speeches and started a newspaper. The man who could not ask a question in court had found a cause that was bigger than his fear.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Gandhi stayed in South Africa for about twenty-one years. He arrived as a lawyer in a suit and left as a political leader who had begun to wear the simple clothes of the poor.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Truth-Force' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-3'],
          alt: { en: 'A packed theatre full of Indian men in turbans and caps raising their hands to swear an oath.' },
          bijschrift: { en: 'Johannesburg, 1906: thousands vow to disobey an unjust law.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1906 the government of the Transvaal proposed a law that forced every Indian to register with the police, give their fingerprints and carry a pass at all times. Indians called it the Black Act. On 11 September, about three thousand people met in a Johannesburg theatre and swore that they would rather go to prison than obey it.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gandhi needed a name for this new kind of struggle. \'Passive resistance\' sounded weak to him. He chose satyagraha, which can be translated as \'holding on to truth\' or \'truth-force\'. A satyagrahi broke an unjust law openly, accepted the punishment and never used violence. The goal was not to defeat the opponent, but to make him see that he was wrong.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Prison and a March' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Thousands of Indians, including Gandhi himself, went to prison. In 1913 he led more than two thousand men, women and children on a march across the border into the Transvaal to protest against a heavy tax and a ruling that did not recognise Hindu and Muslim marriages. Miners went on strike. In 1914 the government gave in on several key demands.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gandhi\'s opponent, General Jan Smuts, had once jailed him. When Gandhi left South Africa, he gave Smuts a pair of sandals he had made in prison. Many years later Smuts sent them back with a friendly note, saying he did not feel worthy to stand in the shoes of so great a man.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Great Soul' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-4'],
          alt: { en: 'An Indian man in a white loincloth spinning cotton thread on a wooden spinning wheel on a mat.' },
          bijschrift: { en: 'The spinning wheel: a symbol of an India that makes its own cloth.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1915 Gandhi returned to India, which was then ruled by Britain. He travelled the country by third-class train to see how ordinary people lived. In 1917 he took up the cause of poor farmers in Champaran, in the north, who were forced to grow indigo for British planters. His success there made him famous. People began to call him Mahatma, which means \'great soul\', a title he never liked.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 13 April 1919, British troops opened fire on a crowd of unarmed people in a walled garden called Jallianwala Bagh in Amritsar. Officially 379 people were killed; Indian estimates were far higher. For Gandhi it was the end of any trust in British rule. He called on Indians to stop cooperating with the government: to leave British schools, courts and jobs, and to stop buying British cloth.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Stopping His Own Movement' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Millions joined in. But in February 1922, in the village of Chauri Chaura, an angry crowd set fire to a police station and more than twenty policemen died. Gandhi was horrified and called off the whole campaign, to the fury of many of his allies. Soon afterwards he was arrested and sentenced to six years in prison. He was released after two because of illness.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gandhi asked every Indian to spin cotton thread for half an hour a day and wear khadi, hand-woven cloth. It was practical, because it gave poor villagers work. But it was also a weapon: every metre of homespun cloth was a metre of British cloth that India did not buy.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The spinning wheel became such a powerful symbol that it was placed in the centre of the flag of the Indian independence movement.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Handful of Salt' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-5'],
          alt: { en: 'An elderly man in white leading a long line of marchers along a dusty road in India.' },
          bijschrift: { en: 'March 1930: the walk to the sea at Dandi.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In India, the British government had a monopoly on salt. Everyone needed it, even the poorest, and everyone paid tax on it. It was illegal to collect or sell your own salt. Gandhi chose this law as his target, because every Indian could understand it. British officials laughed. What harm could salt do?',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 12 March 1930, Gandhi, then sixty years old, set out from his ashram near Ahmedabad with 78 followers. For twenty-four days they walked about 385 kilometres to the village of Dandi on the coast. Crowds gathered in every village they passed, and journalists from around the world followed them.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1930,
          tekst: { en: 'Gandhi completes the Salt March and breaks the British salt law at Dandi.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'With this, I am shaking the foundations of the British Empire.' },
          bron: { en: 'Gandhi, picking up salt at Dandi, 6 April 1930' },
        },
        {
          type: 'kop',
          tekst: { en: 'The World Was Watching' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the morning of 6 April, Gandhi picked up a lump of salty mud from the beach. It was a tiny act, and it set off a vast wave of civil disobedience. Across India, people made salt and sold it openly. About 60,000 people were arrested. When peaceful protesters marched on the Dharasana salt works in May, police beat them with steel-tipped clubs. They did not fight back. An American reporter\'s account of the scene shocked readers around the world.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Tea with the King' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-6'],
          alt: { en: 'A thin man in a white loincloth and shawl walking past grand stone buildings in London in autumn.' },
          bijschrift: { en: 'London, 1931: Gandhi arrives dressed as an Indian villager.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1931 Gandhi travelled to London for talks about India\'s future. He arrived wearing what he wore at home: a loincloth, a shawl and sandals. Winston Churchill sneered at the \'half-naked fakir\' and the newspapers loved the pictures. Gandhi was invited to tea with King George V at Buckingham Palace. When a reporter asked if he had been dressed warmly enough, he joked that the King had enough on for both of them.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He also visited the cotton towns of Lancashire, where many workers had lost their jobs because of the Indian boycott of British cloth. Instead of booing him, the mill workers cheered him. The conference itself achieved almost nothing, and Gandhi went home empty-handed.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Fasting as a Weapon' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gandhi\'s most powerful and most controversial tool was the fast. In 1932, in prison, he stopped eating to protest against a British plan to give the so-called \'untouchables\', the lowest group in the Hindu caste system, separate elections. He feared it would split Hindus for ever. After six days, the leaders of the two sides reached a compromise, the Poona Pact.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Not everyone admired him. B. R. Ambedkar, the brilliant leader of the \'untouchables\' who had himself grown up facing their discrimination, felt that Gandhi\'s fast had forced him to give up rights his people needed. Their argument about caste and equality is still debated in India today.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Quit India' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-7'],
          alt: { en: 'An elderly man in white speaking to a vast crowd in a city square at night under electric lights.' },
          bijschrift: { en: 'Bombay, August 1942: "Do or die."' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the Second World War began in 1939, Britain declared India at war without asking any Indian leader. Gandhi and the Congress party were furious. In August 1942, with Japanese armies close to India\'s borders, Gandhi launched a new campaign with a simple message for the British: Quit India. He told his followers: \'Do or die.\'',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1942,
          tekst: { en: 'Gandhi launches the \'Quit India\' movement and is arrested the next day.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The British did not wait. The next morning Gandhi and almost all Congress leaders were arrested. Without their leaders, protests turned violent in many places, and tens of thousands of people were jailed. Gandhi was locked up in the Aga Khan Palace in Poona.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Losing Kasturba' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During this imprisonment Gandhi lost two of the people closest to him. His secretary and friend Mahadev Desai died of a heart attack within a week. In February 1944, Kasturba, his wife of more than sixty years, died in his arms. Gandhi himself fell seriously ill and was released in May 1944. The war had shown the British that they could no longer hold India for long.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Freedom and Three Shots' },
      afbeelding: SCENE_IMAGES['mahatma-gandhi-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mahatma-gandhi-8'],
          alt: { en: 'Mourners in white gathered at dusk in a garden in Delhi, holding oil lamps.' },
          bijschrift: { en: 'Birla House, New Delhi, 30 January 1948.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 15 August 1947, India became independent. But it was split in two: India, with a Hindu majority, and Pakistan, with a Muslim majority. Partition led to terrible violence. Up to a million people were killed and around fifteen million fled their homes. Gandhi did not celebrate. On Independence Day he was in Calcutta, fasting and praying to stop the killing between Hindus and Muslims.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many Hindu nationalists hated him for defending Muslims and for agreeing to the partition. On the evening of 30 January 1948, as Gandhi walked to his prayer meeting in the garden of Birla House in New Delhi, a man named Nathuram Godse stepped forward, bowed, and fired three shots into his chest. Gandhi was seventy-eight.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'The light has gone out of our lives, and there is darkness everywhere.' },
          bron: { en: 'Jawaharlal Nehru, prime minister of India, in a radio address on 30 January 1948' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Method That Travelled' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gandhi was not a saint, and he never claimed to be one. His views on caste, on modern medicine and on women\'s lives are still argued over. But his method lived on. Martin Luther King Jr. studied it, and so did Nelson Mandela. The idea that ordinary people can defeat an unjust system without violence is perhaps his greatest gift to the twentieth century.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Gandhi was nominated for the Nobel Peace Prize five times but never won it. In 1948, the year he died, the committee awarded no prize at all, saying there was no suitable living candidate.' },
        },
      ],
    },
  ],
};

export const josephStalin: Verhaal = {
  id: 'joseph-stalin',
  beginJaar: 1878,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Joseph Stalin' },
  ondertitel: { en: 'The man of steel who built a superpower through terror' },
  teaser: { en: 'A cobbler\'s son from Georgia became the most feared ruler on earth. He turned a nation of farmers into a superpower that defeated Hitler, but at a cost of millions of lives. How did he do it?' },
  jaar: 1953,
  periodeLabel: '1878 - 1953',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['joseph-stalin'],
  portretKleur: '#7A2E2E',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'twintigste-eeuw',
  themas: ['sovjet-unie', 'communisme', 'dictatuur', 'wereldoorlog', 'terreur'],
  leestijdMinuten: 7,
  personage: { naam: 'Joseph Stalin' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Cobbler\'s Son from Gori' },
      afbeelding: SCENE_IMAGES['joseph-stalin-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-1'],
          alt: { en: 'A boy in a long dark robe at the gate of a stone seminary in a hilly Georgian city.' },
          bijschrift: { en: 'Tiflis, 1894: a gifted boy is sent to train as a priest.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was born Ioseb Jughashvili on 18 December 1878 in Gori, a small town in Georgia, then part of the Russian Empire. His father, Besarion, was a shoemaker who drank heavily and beat his wife and son. His mother, Keke, cleaned houses and was determined that her boy would make something of himself. Everyone called him Soso.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His childhood was hard. Smallpox left his face scarred for life, and an accident left his left arm slightly shorter and stiffer than the right. But Soso was clever, had a beautiful singing voice and was fiercely competitive. In 1894 he won a place at the Orthodox seminary in Tiflis, the Georgian capital, to train as a priest.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Forbidden Books' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The seminary was strict: the students were watched, searched and punished. Soso read forbidden books in secret, including the works of Karl Marx, and began to see himself as a revolutionary. He also wrote romantic poems that were published in a Georgian newspaper. In 1899 he left the seminary without graduating. Instead of a priest, he became a professional revolutionary.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Koba the Outlaw' },
      afbeelding: SCENE_IMAGES['joseph-stalin-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-2'],
          alt: { en: 'A chaotic square in an old city with smoke from explosions and an overturned horse-drawn carriage.' },
          bijschrift: { en: 'Tiflis, 1907: a bank robbery to fund the revolution.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the underground, he took the name Koba, after a Georgian folk hero who fought for justice. He joined the Bolsheviks, the radical wing of the Russian Marxist movement led by Vladimir Lenin. He organised strikes, printed illegal leaflets and raised money in any way he could, including protection rackets and robberies.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The most famous of these was the Tiflis bank robbery of June 1907. Gunmen threw bombs at a carriage carrying money to the State Bank and escaped with about 250,000 roubles, a huge sum. Around forty people died. Koba planned the raid behind the scenes, and the money went to Lenin\'s Bolsheviks.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Prison and Siberia' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The tsar\'s secret police arrested him again and again. He was sent into exile in Siberia several times and escaped several times. Around 1912 he began to sign himself \'Stalin\', which means \'man of steel\' in Russian. In 1913 he was arrested once more and sent to Kureika, a remote village near the Arctic Circle, where he spent the next four years fishing, hunting and waiting.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Stalin was not a Russian. He spoke Russian with a strong Georgian accent all his life, even when he ruled the largest country in the world.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Revolution\'s Secretary' },
      afbeelding: SCENE_IMAGES['joseph-stalin-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-3'],
          alt: { en: 'Revolutionary soldiers and sailors with rifles gathered around a campfire in a snowy city square at night.' },
          bijschrift: { en: 'Petrograd, 1917: the Bolsheviks seize power.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 1917, the Russian people overthrew the tsar, and political prisoners were set free. Stalin returned to Petrograd, the capital. In October, Lenin\'s Bolsheviks seized power in a coup. Stalin was not one of the famous faces of the revolution. Leon Trotsky, a brilliant speaker, was much better known. But Stalin was hard-working and useful, and Lenin made him Commissar for Nationalities.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During the brutal civil war that followed, Stalin was sent to the city of Tsaritsyn on the Volga to secure grain supplies. He ruled there through shootings and fear, and he clashed angrily with Trotsky, who led the Red Army. The rivalry between the two men would shape the next twenty years.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Boring Job' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1922 Stalin became General Secretary of the Communist Party. Others thought it was a dull, administrative job. In fact it gave him control over appointments throughout the party. Slowly, he filled important posts with people who owed their careers to him.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Stalin is too rude, and this defect... becomes intolerable in a Secretary-General.' },
          bron: { en: 'Vladimir Lenin, in a secret addition to his \'testament\', January 1923' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Lenin, after a series of strokes, recognised the danger too late. He recommended that Stalin be removed. But when Lenin died in January 1924, the other leaders decided to keep the document quiet. They underestimated Stalin, and it would cost most of them their lives.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Removing the Rivals' },
      afbeelding: SCENE_IMAGES['joseph-stalin-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-4'],
          alt: { en: 'A crowded Soviet meeting hall with delegates in dark suits voting with raised cards.' },
          bijschrift: { en: '1920s: one by one, Stalin outmanoeuvres the old Bolsheviks.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Lenin\'s death, Stalin played his rivals against each other with great skill. First he allied with Grigory Zinoviev and Lev Kamenev against Trotsky. Then he joined forces with Nikolai Bukharin against Zinoviev and Kamenev. Finally he turned on Bukharin. He presented himself as a modest, sensible man in the middle, while the others looked ambitious and quarrelsome.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Trotsky was expelled from the party in 1927 and from the Soviet Union in 1929. He continued to attack Stalin in books and articles from abroad. In 1940, in Mexico, a Soviet agent killed him with an ice axe.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Cult Begins' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By 1929, when he turned fifty, Stalin was the undisputed leader of the Soviet Union. His birthday was celebrated with portraits, poems and speeches. Cities, factories and mountains were named after him. Old photographs were retouched so that disgraced rivals disappeared from them, as if they had never existed.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Soviet censors became experts at removing people from photographs. Some well-known pictures of Lenin exist in several versions, with a different number of people in each one.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Steel and Hunger' },
      afbeelding: SCENE_IMAGES['joseph-stalin-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-5'],
          alt: { en: 'A huge steel works under construction on a frozen plain, with workers, cranes and smoking chimneys.' },
          bijschrift: { en: 'The First Five-Year Plan: factories at any price.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stalin believed that the Soviet Union was fifty or a hundred years behind the advanced countries and had to catch up in ten, or be crushed. In 1928 he launched the first Five-Year Plan. Whole new industrial cities, such as Magnitogorsk in the Ural Mountains, rose from empty land. Production of steel, coal and tractors soared, often in terrible conditions.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To feed the workers and pay for machines from abroad, the state needed grain. Stalin forced the peasants into collective farms run by the state. Those who resisted, or who were labelled \'kulaks\', supposedly rich peasants, were shot or deported to Siberia and Central Asia. Rather than hand them over, many farmers slaughtered their animals.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Great Famine' },
        },
        {
          type: 'sleutelmoment',
          jaar: 1932,
          tekst: { en: 'A man-made famine begins in Ukraine, Kazakhstan and other grain regions; millions die by 1933.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1932 and 1933, the state kept taking grain even as people starved. Villages that did not meet their quotas were blacklisted, and peasants were forbidden to leave to look for food. Millions of people died, in Ukraine above all, as well as in Kazakhstan, southern Russia and elsewhere. In Ukraine the famine is remembered as the Holodomor, \'death by hunger\'. The Soviet government denied that it was happening at all.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Great Terror' },
      afbeelding: SCENE_IMAGES['joseph-stalin-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-6'],
          alt: { en: 'A black car in front of a Moscow apartment block at night, with lit windows and men in long coats.' },
          bijschrift: { en: 'Moscow, 1937: the knock on the door that everyone feared.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In December 1934 Sergei Kirov, a popular party leader in Leningrad, was shot dead. Stalin used the murder as a reason to hunt for \'enemies of the people\' everywhere. Between 1936 and 1938, famous old Bolsheviks, including Zinoviev, Kamenev and Bukharin, appeared in show trials, confessed to absurd crimes after torture and threats to their families, and were shot.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The terror spread far beyond the party. The secret police, the NKVD, were given quotas of people to arrest and shoot in each region. In 1937 and 1938 alone, about 680,000 people were executed. Many more were sent to the Gulag, a vast network of labour camps where prisoners dug canals, built railways and mined gold in brutal cold. Most of the leadership of the Red Army was wiped out.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Alone at the Top' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stalin\'s private life was full of loss. His first wife died of illness in 1907. His second wife, Nadezhda, shot herself in 1932 after a quarrel with him. He grew ever more suspicious and isolated, working late into the night and keeping his closest comrades in constant fear.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Many people arrested during the terror kept a small suitcase packed by the door, so they would be ready when the knock came at night.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The War Against Hitler' },
      afbeelding: SCENE_IMAGES['joseph-stalin-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-7'],
          alt: { en: 'Soviet soldiers in white winter camouflage advancing through the ruins of a city in the snow.' },
          bijschrift: { en: 'Stalingrad, winter 1942-1943: the turning point of the war.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In August 1939, to the world\'s astonishment, Stalin signed a non-aggression pact with Hitler. In secret, the two dictators divided Eastern Europe between them. Stalin was so sure that Hitler would not attack soon that he ignored dozens of warnings. On 22 June 1941, three million German and allied soldiers invaded the Soviet Union.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The first months were a disaster. Whole armies were surrounded, and German troops reached the outskirts of Moscow. But Stalin stayed in the capital, and on 7 November 1941 he held the traditional military parade in Red Square, with troops marching straight from the parade to the front. The decisive battle came at Stalingrad on the Volga, where a German army of about 300,000 men was surrounded and destroyed in the winter of 1942-1943.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1943,
          tekst: { en: 'The German army surrenders at Stalingrad, the turning point of the war in Europe.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Price of Victory' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Red Army fought its way to Berlin in 1945. But the cost was almost beyond imagination: about 27 million Soviet citizens died in the war. Stalin\'s own son Yakov was captured by the Germans and died in a prison camp in 1943; Stalin is said to have refused to exchange him for a captured German field marshal. At the conferences of Yalta and Potsdam, Stalin sat as an equal with the leaders of the United States and Britain.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Iron Curtain and the End' },
      afbeelding: SCENE_IMAGES['joseph-stalin-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joseph-stalin-8'],
          alt: { en: 'Huge crowds in heavy winter coats queuing in a snowy Moscow street beside a grand building.' },
          bijschrift: { en: 'Moscow, March 1953: the country mourns, and the camps begin to open.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the war, Stalin\'s Soviet Union controlled half of Europe. Communist governments loyal to Moscow were installed in Poland, Hungary, Czechoslovakia and other countries. Churchill spoke of an \'iron curtain\' falling across the continent. In 1949 the Soviet Union tested its first atomic bomb. The Cold War had begun.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At home, the terror never really stopped. In his last months, Stalin\'s paranoia focused on a group of mostly Jewish doctors who were accused of plotting to poison Soviet leaders. A new wave of arrests seemed about to begin.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Nobody Dared to Open the Door' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the night of 1 March 1953, Stalin collapsed with a stroke at his country house near Moscow. His guards were so afraid of disturbing him that for hours no one dared to go into his room. He died on 5 March. Millions of people wept in the streets, and in the crush to see his body in Moscow, many were trampled to death.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Three years later, his successor Nikita Khrushchev denounced him in a \'secret speech\' to the party congress and exposed some of his crimes. Millions of prisoners were released from the Gulag. Historians still debate how many people died because of Stalin\'s rule, but the number runs to many millions. He had turned a land of peasants into a nuclear superpower, and he had done it through fear.',
          },
        },
      ],
    },
  ],
};

export const albertEinstein: Verhaal = {
  id: 'albert-einstein',
  beginJaar: 1879,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Albert Einstein' },
  ondertitel: { en: 'The patent clerk who rewrote the laws of space and time' },
  teaser: { en: 'He could not find a job as a teacher, so he took one checking patents. In his spare time he changed how we understand light, time and gravity. And then he signed a letter that helped to build the atomic bomb.' },
  jaar: 1955,
  periodeLabel: '1879 - 1955',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['albert-einstein'],
  portretKleur: '#5A6E8C',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'twintigste-eeuw',
  themas: ['wetenschap', 'natuurkunde', 'relativiteit', 'atoombom', 'genie'],
  leestijdMinuten: 8,
  personage: { naam: 'Albert Einstein' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Magic Compass' },
      afbeelding: SCENE_IMAGES['albert-einstein-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-1'],
          alt: { en: 'A small boy in a sailor suit sitting on a bed staring in wonder at a brass pocket compass.' },
          bijschrift: { en: 'Munich, around 1884: a gift that started a lifetime of questions.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Albert Einstein was born on 14 March 1879 in Ulm, in southern Germany, into a Jewish family. A year later the family moved to Munich, where his father and uncle ran a small company making electrical equipment. Albert was slow to start talking, and his family worried about him. When he did speak, he had a habit of quietly repeating sentences to himself.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When he was about five, he was ill in bed and his father showed him a compass. However he turned it, the needle always pointed the same way, as if pulled by an invisible hand. Einstein later wrote that this experience made a deep and lasting impression on him. Something hidden lay behind things.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Rebel at School' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He hated the strict, military style of his German school, where pupils had to learn by heart and obey without question. At twelve he worked through a geometry book on his own and called it his \'holy little geometry book\'. When his family moved to Italy for business, the fifteen-year-old Albert left school without a diploma and followed them.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'A popular myth says Einstein failed mathematics. He did not. He did fail the entrance exam for the Zurich Polytechnic in 1895, at sixteen, but his scores in mathematics and physics were excellent; it was languages and other subjects that let him down.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Clerk, Third Class' },
      afbeelding: SCENE_IMAGES['albert-einstein-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-2'],
          alt: { en: 'A young man with a moustache at a wooden desk in an office, papers and a technical drawing in front of him.' },
          bijschrift: { en: 'Bern, 1902: the Swiss Patent Office.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After a year at a school in Aarau, Switzerland, Einstein was admitted to the Polytechnic in Zurich in 1896. He often skipped lectures to study on his own, and some of his professors found him arrogant. When he graduated in 1900, none of them would give him a job as an assistant. For two years he scraped a living as a private tutor and supply teacher.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1902, a friend\'s father helped him get a job at the Swiss Patent Office in Bern as a \'technical expert, third class\'. His task was to judge whether inventions sent in by the public actually worked. He loved it. The work trained him to think precisely, and it left his evenings free.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Mileva' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the Polytechnic he had fallen in love with Mileva Marić, a physics student from Serbia and one of the very few women in the course. In 1902, before they were married, she gave birth to a daughter, Lieserl, whose fate is unknown; she seems to have been given up for adoption or to have died young. Albert and Mileva married in 1903 and had two sons.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'With two friends, Einstein formed a small discussion club they jokingly called the \'Olympia Academy\'. Over sausage, cheese and tea, they read and argued about philosophy and physics late into the night.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Miracle Year' },
      afbeelding: SCENE_IMAGES['albert-einstein-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-3'],
          alt: { en: 'A cluttered small apartment desk at night with handwritten pages of equations and a lamp.' },
          bijschrift: { en: '1905: four papers that changed physics.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1905, the 26-year-old patent clerk published four papers that changed physics. The first said that light is not only a wave but also comes in tiny packets of energy, later called photons. The second explained the jittery movement of pollen grains in water and helped to prove that atoms really exist.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The third paper was the special theory of relativity. Einstein started from two ideas: that the laws of physics are the same for everyone moving at a steady speed, and that the speed of light is always the same. The consequences were astonishing. Time itself runs slower for objects that move very fast, and there is no single \'now\' that everyone in the universe agrees on.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1905,
          tekst: { en: 'Einstein\'s \'miracle year\': light quanta, atoms, special relativity and E = mc².' },
        },
        {
          type: 'kop',
          tekst: { en: 'E = mc²' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In a short fourth paper, almost an afterthought, Einstein showed that mass and energy are two forms of the same thing. Written in its later famous form, it is E = mc²: energy equals mass times the speed of light squared. Because the speed of light is so enormous, even a tiny amount of mass contains a huge amount of energy. This explains why the sun shines, and, decades later, why atomic bombs work.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Light Bends' },
      afbeelding: SCENE_IMAGES['albert-einstein-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-4'],
          alt: { en: 'Astronomers with a large telescope on a tropical island watching a total solar eclipse.' },
          bijschrift: { en: 'Príncipe, 29 May 1919: the eclipse that made Einstein famous.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Special relativity left out one great force: gravity. For ten years Einstein struggled with it. His answer, the general theory of relativity, was completed in Berlin in November 1915. It said that gravity is not a force pulling through space, but that heavy objects such as the sun bend space and time around them, and that everything else follows the curves.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The theory made a testable prediction: light from distant stars should bend as it passes the sun. Normally the sun is too bright to see stars next to it, but during a total eclipse it is possible. On 29 May 1919 British expeditions photographed an eclipse from the island of Príncipe off West Africa and from Sobral in Brazil. The stars had shifted, just as Einstein had predicted.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1919,
          tekst: { en: 'An eclipse expedition confirms Einstein\'s prediction that gravity bends light.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Most Famous Scientist on Earth' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the results were announced in London in November 1919, newspapers around the world declared a revolution in science. A German professor whom almost nobody understood became a celebrity overnight. Crowds followed him, and he was asked to explain relativity everywhere he went. With his wild hair and dry humour, he seemed the very picture of a genius.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The GPS in your phone has to correct for relativity. Clocks on the satellites run at a slightly different speed from clocks on the ground, and without Einstein\'s equations your position would drift by kilometres every day.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Prize and a Warning' },
      afbeelding: SCENE_IMAGES['albert-einstein-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-5'],
          alt: { en: 'A grand hall with a large audience in evening dress, a scientist receiving a diploma on a stage.' },
          bijschrift: { en: 'The Nobel Prize: awarded for light, not for relativity.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1922 Einstein was awarded the Nobel Prize in Physics for 1921. But not for relativity, which some members of the committee still found too controversial. He got it for his explanation of the photoelectric effect, the idea that light comes in packets. His divorce settlement with Mileva had already promised her the prize money, should he ever win, and that is where it went.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1919 he had married his cousin Elsa. They lived in Berlin, and he was one of the most admired men in Germany. But not by everyone. As a Jew, a pacifist and a supporter of democracy, he became a target for the nationalist right. Meetings were held to attack relativity as \'Jewish physics\', and some scientists joined in.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Threats' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1922 Walther Rathenau, the Jewish foreign minister of Germany and a friend of Einstein, was murdered by right-wing extremists. Einstein was warned that he was on a list of targets as well. For a while he stopped giving public lectures. The atmosphere in Germany was growing darker.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Never Going Back' },
      afbeelding: SCENE_IMAGES['albert-einstein-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-6'],
          alt: { en: 'An ocean liner leaving a harbour, a man with wild grey hair standing at the rail on deck.' },
          bijschrift: { en: '1933: Einstein leaves Europe for good.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Adolf Hitler came to power in January 1933, Einstein was visiting the United States. He announced that he would not return to Germany as long as it was a country without freedom. The Nazis raided his summer house, took his money, and burned his books together with those of other Jewish and left-wing writers. His name appeared in a publication listing enemies of the new regime.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Einstein gave up his German citizenship and his membership of the Prussian Academy of Sciences. In October 1933 he settled in Princeton, New Jersey, at the new Institute for Advanced Study. He would never set foot in Germany again. Many other Jewish scientists also fled, a loss that weakened German science for decades.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Professor Next Door' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Princeton, Einstein became a familiar local figure, walking to his office in baggy clothes and often without socks. He helped many refugees to escape from Europe by writing letters of support. He spent his days searching for a \'theory of everything\' that would unite gravity and electromagnetism. He never found it.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Einstein became an American citizen in 1940 and kept his Swiss citizenship as well. He loved sailing, although he could not swim.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Letter' },
      afbeelding: SCENE_IMAGES['albert-einstein-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-7'],
          alt: { en: 'Two men on the porch of a summer cottage by the sea, one reading a typed letter.' },
          bijschrift: { en: 'Long Island, summer 1939: the signature that helped start the atomic age.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1938 scientists in Berlin discovered that the uranium atom could be split, releasing energy. The Hungarian physicist Leó Szilárd, another refugee, realised the terrifying possibility: a chain reaction that could power a bomb of unimaginable force. And Nazi Germany had the scientists who could build it.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Szilárd knew that the President of the United States would read a letter from Einstein. In the summer of 1939 he drove out to the cottage on Long Island where Einstein was on holiday. Einstein signed a letter, dated 2 August 1939, warning President Franklin D. Roosevelt that \'extremely powerful bombs of a new type\' might be built, and that Germany could be working on one.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1939,
          tekst: { en: 'Einstein signs a letter to President Roosevelt warning that an atomic bomb may be possible.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Regret' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The letter led to a small government committee on uranium. Years later, in 1942, the huge secret Manhattan Project began. Einstein himself was not invited to work on it; the army considered the pacifist with left-wing friends a security risk. In August 1945 American atomic bombs destroyed Hiroshima and Nagasaki.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Einstein was deeply troubled. In 1954 he told his friend Linus Pauling that he had made one great mistake in his life when he signed that letter, though he added that there had been some justification: the danger that the Germans would build the bomb first.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Imagination' },
      afbeelding: SCENE_IMAGES['albert-einstein-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['albert-einstein-8'],
          alt: { en: 'An old man with white hair walking alone along a leafy street in autumn.' },
          bijschrift: { en: 'Princeton, 1955: the last walk.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the war, Einstein used his fame to campaign against nuclear weapons and for a world government that could keep the peace. In 1952 he was offered the presidency of the new state of Israel. He was moved, but declined, saying he lacked the natural aptitude and experience to deal with people.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A week before his death he signed a manifesto with the philosopher Bertrand Russell and other scientists, calling on the world\'s governments to find peaceful ways to settle their disputes, because a nuclear war could end the human race.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Last Calculation' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 18 April 1955, Albert Einstein died in a Princeton hospital of a burst artery, aged seventy-six. He had refused surgery, saying he wanted to go when he wanted and that it was tasteless to prolong life artificially. On his bedside table lay pages of calculations he was still working on. In an unusual twist, the pathologist who performed the autopsy secretly kept his brain to study it.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.' },
          bron: { en: 'Albert Einstein, in an interview published in 1929' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His ideas are everywhere today: in GPS satellites, in lasers, in solar panels, in the black holes that astronomers now photograph, and in the gravitational waves first detected in 2015, exactly a hundred years after he completed general relativity. His face, with its tongue stuck out in a famous photograph from 1951, has become the universal symbol of genius.',
          },
        },
      ],
    },
  ],
};

export const adolfHitler: Verhaal = {
  id: 'adolf-hitler',
  beginJaar: 1889,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Adolf Hitler' },
  ondertitel: { en: 'How a failed painter led Germany into war and genocide' },
  teaser: { en: 'Rejected by an art school, a drifter from Austria became the dictator of Germany. His war cost tens of millions of lives and his regime murdered six million Jews. How could this happen?' },
  jaar: 1945,
  periodeLabel: '1889 - 1945',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['adolf-hitler'],
  portretKleur: '#4A4A4A',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'twintigste-eeuw',
  themas: ['nazi-duitsland', 'tweede-wereldoorlog', 'holocaust', 'dictatuur', 'propaganda'],
  leestijdMinuten: 8,
  personage: { naam: 'Adolf Hitler' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Rejected Artist' },
      afbeelding: SCENE_IMAGES['adolf-hitler-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-1'],
          alt: { en: 'A young man in a shabby coat sitting on a bench in a snowy Vienna park with a sketchbook.' },
          bijschrift: { en: 'Vienna, around 1909: rejected by the Academy of Fine Arts.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Adolf Hitler was born on 20 April 1889 in Braunau am Inn, a small town in Austria on the border with Germany. His father, Alois, was a strict and often violent customs official; his mother, Klara, adored her son. Adolf did badly at school and dreamed of becoming a great artist. After his father died in 1903, he left school without any qualifications.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1907 he moved to Vienna and applied to the Academy of Fine Arts. He was rejected. A few months later his mother died of cancer. He applied again in 1908 and was rejected again, this time without even being allowed to sit the exam. Bitter and directionless, he drifted through the city, at one point sleeping in a homeless shelter and selling small paintings of famous buildings to tourists.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A City Full of Hatred' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Vienna was then one of the great cities of Europe, rich in music, science and art. It was also full of hateful politics. The popular mayor, Karl Lueger, used antisemitism, hatred of Jews, to win votes, and newspapers and pamphlets blamed Jews for every problem. Hitler absorbed these ideas. Historians still debate exactly when his hatred became an obsession, but the seeds were sown here.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Hitler later claimed that he had lived in grinding poverty in Vienna. In fact he received an orphan\'s pension and for a time an inheritance, though he did spend months in a men\'s hostel.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Runner in the Trenches' },
      afbeelding: SCENE_IMAGES['adolf-hitler-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-2'],
          alt: { en: 'A soldier in a German First World War uniform and spiked helmet running through a muddy trench.' },
          bijschrift: { en: 'The Western Front, 1914-1918: the messenger who would not forget the defeat.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1913 Hitler moved to Munich, partly to avoid service in the Austrian army. When the First World War broke out in August 1914, he volunteered for the Bavarian army. He later said it was the happiest moment of his life. He served for four years as a dispatch runner, carrying messages between headquarters and the front lines.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was wounded in 1916 and awarded the Iron Cross, First Class, in 1918, a rare honour for a corporal. The officer who recommended him for it was a Jewish lieutenant, Hugo Gutmann. In October 1918, Hitler was temporarily blinded in a British gas attack.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Myth of Betrayal' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was lying in a military hospital when he heard that Germany had lost the war. Like many Germans, he refused to believe that the army had been defeated on the battlefield. A poisonous myth spread: that the army had been \'stabbed in the back\' by traitors at home, socialists and Jews. It was untrue, but Hitler would build his whole career on it.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The peace treaty of Versailles in 1919 made Germany accept the blame for the war, give up land and pay huge reparations. Many Germans felt humiliated and angry. Millions of soldiers came home to a country in chaos.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Beer Hall' },
      afbeelding: SCENE_IMAGES['adolf-hitler-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-3'],
          alt: { en: 'A smoky Munich beer hall crowded with men in coats and hats listening to a speaker on a table.' },
          bijschrift: { en: 'Munich, 1920s: a talent for speeches and a failed coup.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the war the army sent Hitler to spy on small political groups in Munich. One of them, the German Workers\' Party, impressed him and he joined it in 1919. He discovered that he had a gift: he could hold a crowd spellbound for hours, building from quiet beginnings to furious shouting. The party soon renamed itself the National Socialist German Workers\' Party, the Nazis, and Hitler became its leader.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the evening of 8 November 1923, Hitler and his followers burst into a large Munich beer hall, fired a shot into the ceiling, and declared a national revolution. The next day they marched through the city. Police opened fire; sixteen Nazis and four policemen were killed. The coup, known as the Beer Hall Putsch, collapsed and Hitler was arrested.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Book Written in Prison' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At his trial he turned the courtroom into a stage, and sympathetic judges gave him a light sentence. In the comfortable prison at Landsberg he dictated \'Mein Kampf\', \'My Struggle\', a book full of hatred of Jews and plans to conquer \'living space\' in the east. He was released after only about nine months. He now decided to win power through elections rather than force.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Road to Power' },
      afbeelding: SCENE_IMAGES['adolf-hitler-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-4'],
          alt: { en: 'Long lines of unemployed men in caps and coats queuing outside a building in a German city.' },
          bijschrift: { en: 'Germany, early 1930s: six million unemployed.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For years the Nazis remained a small party. Then, in 1929, the Great Depression hit. Banks collapsed and factories closed; by 1932 about six million Germans were out of work. Desperate people turned to extremes. Hitler promised jobs, national pride and revenge for Versailles, and he gave people someone to blame: Jews, communists and the democratic politicians of the Weimar Republic.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1932 the Nazis won about 37 per cent of the vote and became the largest party in parliament. They never won a majority in a free election. Instead, a small circle of conservative politicians convinced the old president, Paul von Hindenburg, to appoint Hitler as chancellor on 30 January 1933. They believed they could control him.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1933,
          tekst: { en: 'Hitler is appointed Chancellor of Germany; within months democracy is destroyed.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Democracy Dismantled' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'They were wrong. In February 1933 the parliament building, the Reichstag, burned down, and Hitler used the fire to suspend basic rights. In March the Enabling Act allowed him to make laws without parliament. Other parties were banned, trade unions closed, and the first concentration camps were opened for political opponents. In June 1934 he had rivals in his own movement murdered in the \'Night of the Long Knives\'. When Hindenburg died that August, Hitler made himself Führer, the leader, with total power.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Broken Glass' },
      afbeelding: SCENE_IMAGES['adolf-hitler-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-5'],
          alt: { en: 'A city street at night covered in shattered glass in front of smashed shop windows.' },
          bijschrift: { en: '9-10 November 1938: Kristallnacht.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'From the start, Jews were Hitler\'s main target. They were thrown out of government jobs, universities and professions. In 1935 the Nuremberg Laws took away their citizenship and banned marriages between Jews and non-Jews. Propaganda in films, newspapers and schools taught Germans to see their Jewish neighbours as enemies.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the night of 9 to 10 November 1938, Nazi mobs attacked Jews across Germany and Austria. They burned more than a thousand synagogues, smashed thousands of Jewish shops and homes, and killed at least ninety-one people. Around 30,000 Jewish men were sent to concentration camps. The night became known as Kristallnacht, the \'Night of Broken Glass\'.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1938,
          tekst: { en: 'Kristallnacht: a nationwide pogrom against Jews in Germany and Austria.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Testing the World' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Meanwhile Hitler rebuilt the army in violation of the Treaty of Versailles. In 1936 he sent troops into the Rhineland; in March 1938 he annexed Austria; in September 1938, at a conference in Munich, Britain and France agreed to let him take part of Czechoslovakia in the hope of keeping the peace. Each time, nobody stopped him, and each time he grew bolder.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'War' },
      afbeelding: SCENE_IMAGES['adolf-hitler-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-6'],
          alt: { en: 'A long column of tanks and trucks moving along a dusty road through a burning village.' },
          bijschrift: { en: '1 September 1939: the invasion of Poland starts the Second World War.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 1 September 1939, Germany invaded Poland. Two days later Britain and France declared war. In the spring of 1940, German forces overran Denmark, Norway, the Netherlands, Belgium and France in a matter of weeks. Only Britain, led by Winston Churchill, fought on alone.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 22 June 1941, Hitler broke his pact with Stalin and invaded the Soviet Union, a war he saw as a fight to the death against \'Jewish Bolshevism\' and to win land for German settlers. In December 1941, after Japan attacked Pearl Harbor, Hitler also declared war on the United States. Germany was now fighting the world\'s greatest powers at once.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Tide Turns' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Stalingrad in the winter of 1942-1943 an entire German army was destroyed. Hitler forbade retreat and increasingly took military decisions himself, often against the advice of his generals. In June 1944 the Western Allies landed in Normandy. Germany\'s cities were being reduced to rubble by bombing.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Second World War was the deadliest conflict in human history. Estimates of the total number of deaths, soldiers and civilians, range from about 70 to 85 million people.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Holocaust' },
      afbeelding: SCENE_IMAGES['adolf-hitler-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-7'],
          alt: { en: 'Railway tracks running through snow to the brick gatehouse of a camp under a grey winter sky.' },
          bijschrift: { en: 'Auschwitz-Birkenau: the largest of the Nazi death camps.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Behind the front lines, the Nazi regime carried out the greatest crime in history. In the occupied Soviet Union, mobile killing squads shot more than a million Jewish men, women and children at the edges of pits. On 20 January 1942, senior officials met at a villa at Wannsee near Berlin to coordinate the \'Final Solution\': the murder of all the Jews of Europe.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Jews from all over Europe were deported in cattle wagons to death camps in occupied Poland, such as Treblinka, Sobibor, Belzec and Auschwitz-Birkenau. Most were murdered in gas chambers on arrival. About six million Jews were killed, around two-thirds of the Jews of Europe. The Nazis also murdered Roma and Sinti, disabled people, Soviet prisoners of war, Polish civilians, gay men and political opponents.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Hitler\'s Responsibility' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'No single written order from Hitler for the Holocaust has been found, but historians agree that it could not have happened without him. He spoke publicly of the \'annihilation\' of the Jews, and his closest followers, such as Heinrich Himmler, carried out what they knew he wanted. Hundreds of thousands of ordinary people took part, as guards, clerks, train drivers and neighbours who looked away.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'In spite of everything, I still believe that people are really good at heart.' },
          bron: { en: 'Anne Frank, in her diary, 15 July 1944. She died in the Bergen-Belsen camp in early 1945, aged fifteen.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'On 27 January 1945, Soviet soldiers liberated Auschwitz. That date is now International Holocaust Remembrance Day.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Bunker' },
      afbeelding: SCENE_IMAGES['adolf-hitler-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['adolf-hitler-8'],
          alt: { en: 'The bombed-out ruins of a city at sunset, with smoke rising over broken buildings.' },
          bijschrift: { en: 'Berlin, April 1945: the end of the Third Reich.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Not every German followed Hitler. On 20 July 1944, an army officer, Claus von Stauffenberg, planted a bomb in a briefcase under the table at Hitler\'s headquarters in East Prussia. It exploded, but a heavy table leg shielded Hitler, who escaped with minor injuries. Stauffenberg and around two hundred others were executed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By April 1945, Soviet troops were fighting their way into Berlin. Hitler had retreated into an underground bunker beneath the government quarter. He blamed the German people for not being strong enough and ordered everything to be destroyed, an order his armaments minister secretly ignored. On 29 April he married his long-time companion Eva Braun.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1945,
          tekst: { en: 'Hitler takes his own life in his Berlin bunker; a week later Germany surrenders.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Never Again' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 30 April 1945, as Soviet soldiers closed in, Hitler and Eva Braun took their own lives. Their bodies were burned outside the bunker. On 7 and 8 May Germany surrendered unconditionally. At the Nuremberg trials, leading Nazis were tried for crimes against humanity, a new idea in international law. Europe lay in ruins.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Today, schools across Germany teach about the Nazi past in detail, and denying the Holocaust is a crime in Germany and many other countries. The question that historians, and every new generation, keep asking is how a democracy could vote its way into such darkness, and what it takes to stop it from happening again.',
          },
        },
      ],
    },
  ],
};

export const maoZedong: Verhaal = {
  id: 'mao-zedong',
  beginJaar: 1893,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Mao Zedong' },
  ondertitel: { en: 'The revolutionary who founded modern China, and caused its worst famine' },
  teaser: { en: 'A farmer\'s son led a ragged army on a march of thousands of kilometres and won a civil war. Then, as ruler of a quarter of humanity, he launched experiments that cost tens of millions of lives.' },
  jaar: 1976,
  periodeLabel: '1893 - 1976',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['mao-zedong'],
  portretKleur: '#9C2B23',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'twintigste-eeuw',
  themas: ['china', 'communisme', 'revolutie', 'hongersnood', 'dictatuur'],
  leestijdMinuten: 7,
  personage: { naam: 'Mao Zedong' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Farmer\'s Son from Shaoshan' },
      afbeelding: SCENE_IMAGES['mao-zedong-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-1'],
          alt: { en: 'A teenage boy reading a book by an oil lamp in a simple farmhouse while his father scowls at him.' },
          bijschrift: { en: 'Shaoshan, Hunan, around 1908: a boy who would rather read than farm.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao Zedong was born on 26 December 1893 in Shaoshan, a village in the green hills of Hunan province in southern China. His father had risen from poverty to become a fairly prosperous farmer and grain trader. He was hard and demanding, and he and his son clashed constantly. Mao\'s mother was a devout Buddhist, gentle and generous to the poor.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao worked in the fields from the age of six. He went to the village school, but what he loved most were old Chinese novels about rebels, bandits and heroes who fought against unjust rulers. At about fourteen his father arranged a marriage for him with an older girl. Mao refused to live with her, and soon left home to continue his studies.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Empire Falls' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'China was in crisis. For centuries it had been the greatest power in Asia, but in the nineteenth century foreign powers had defeated it in war after war and forced it to give up ports and territory. In 1911 a revolution overthrew the last emperor. Mao briefly joined the revolutionary army. He then trained to be a teacher in the provincial capital, Changsha, where he read everything he could about the West.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1918 Mao worked as an assistant in the library of Peking University, earning a tiny wage. There he met the scholars who introduced him to Marxism.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Gun and the Peasants' },
      afbeelding: SCENE_IMAGES['mao-zedong-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-2'],
          alt: { en: 'A band of ragged rebel soldiers with old rifles camped in a misty mountain forest.' },
          bijschrift: { en: 'The Jinggang Mountains, 1928: a revolution that starts in the countryside.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1921, Mao was one of thirteen delegates at the founding meeting of the Chinese Communist Party in Shanghai. At first the communists worked together with the Nationalist Party, the Kuomintang. But in 1927 the Nationalist leader Chiang Kai-shek turned on them and had thousands of communists killed in Shanghai and other cities.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Political power grows out of the barrel of a gun.' },
          bron: { en: 'Mao Zedong, at an emergency party meeting, August 1927' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao led a failed uprising in Hunan and fled with the survivors to the Jinggang Mountains. Most Marxists believed that the revolution would be made by factory workers in the cities. Mao saw that China was a country of peasants, hundreds of millions of them, often poor and in debt to landlords. He believed they could be the army of the revolution.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Guerrilla War' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the mountains, and later in a larger base in Jiangxi province, the communists took land from landlords and gave it to poor peasants, often after violent \'struggle meetings\'. Mao developed a style of guerrilla warfare: retreat when the enemy advances, attack when he is tired. His first wife, Yang Kaihui, was captured by the Nationalists and executed in 1930.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Long March' },
      afbeelding: SCENE_IMAGES['mao-zedong-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-3'],
          alt: { en: 'A long column of soldiers crossing a high snowy mountain pass in a blizzard.' },
          bijschrift: { en: '1934-1935: a retreat that became a legend.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By 1934 Chiang Kai-shek\'s armies had surrounded the communist base in Jiangxi. In October, about 86,000 communists broke out and began a retreat that would last a year. They crossed rivers, swamps and snowy mountains, under constant attack, travelling thousands of kilometres to the north-west of China.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In January 1935, at a meeting in the town of Zunyi, Mao won a leading voice in the party\'s military affairs. His position grew steadily during the march. When the survivors reached Shaanxi province in October 1935, fewer than 10,000 of those who had set out from Jiangxi were left.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Legend and Reality' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Long March became the founding legend of Communist China. Official accounts claim the marchers covered about 12,500 kilometres; some historians think the real distance was shorter. Famous episodes, like the heroic charge across the chain bridge at Luding, were probably embellished. But the march gave the communists an aura of endurance, and it made Mao their leader.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In the north the communist leaders lived for years in caves dug into the soft yellow hillsides around the town of Yan\'an.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Founding of a Nation' },
      afbeelding: SCENE_IMAGES['mao-zedong-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-4'],
          alt: { en: 'A man in a plain tunic speaking into a microphone on the balcony of an ancient red gate above a huge crowd.' },
          bijschrift: { en: 'Tiananmen Gate, Beijing, 1 October 1949.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1937 Japan launched a full-scale invasion of China. For a time, communists and Nationalists formed an uneasy alliance against the invaders. While the Nationalist army bore much of the heavy fighting, the communists built up their strength behind Japanese lines and won support among peasants. When Japan surrendered in 1945, civil war broke out again.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This time the communists won. The Nationalist government was corrupt and divided, and its armies collapsed. On 1 October 1949, Mao stood on Tiananmen Gate, the entrance to the old imperial palace in Beijing, and proclaimed the People\'s Republic of China. Chiang Kai-shek fled to the island of Taiwan.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1949,
          tekst: { en: 'Mao proclaims the People\'s Republic of China in Beijing.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Land and Terror' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The new government brought order after decades of war and gave land to hundreds of millions of peasants. But land reform was violent: in village after village, landlords were denounced at public meetings and often killed. Historians estimate that between one and two million people died. In 1950 China entered the Korean War, where Mao\'s eldest son, Mao Anying, was killed in an American air raid.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Hundred Flowers' },
      afbeelding: SCENE_IMAGES['mao-zedong-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-5'],
          alt: { en: 'Students and professors gathered at a university, putting up handwritten posters on a wall.' },
          bijschrift: { en: '1957: an invitation to criticise, and a trap.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1956 Mao surprised everyone. \'Let a hundred flowers bloom,\' he declared, \'let a hundred schools of thought contend.\' Intellectuals were invited to criticise the party openly. After hesitating, many did, and in the spring of 1957 the criticism poured in: about the lack of freedom, the privileges of officials, and the arrogance of the party.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao was shocked by how fierce it was. Within weeks the campaign was reversed. In the Anti-Rightist Campaign that followed, more than half a million people were labelled \'rightists\'. Many lost their jobs and were sent to labour camps or to the countryside for years. The lesson for everyone in China was clear: it was dangerous to speak your mind.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Rivalry with Moscow' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the same time Mao grew impatient with the Soviet Union, China\'s ally and teacher. After Stalin\'s death, Mao saw himself as the leading communist in the world. He wanted China to catch up with the industrial powers, not in decades but in a few years. That ambition led to the greatest disaster of his rule.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Great Leap Forward' },
      afbeelding: SCENE_IMAGES['mao-zedong-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-6'],
          alt: { en: 'Villagers feeding scrap metal into small, glowing clay furnaces in a field at night.' },
          bijschrift: { en: '1958: backyard furnaces and an impossible dream.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1958 Mao launched the Great Leap Forward. China, he announced, would overtake Britain in steel production within fifteen years. Peasants were organised into huge people\'s communes, with shared kitchens and no private plots. Across the country, millions of people built small \'backyard furnaces\' and melted down pots, pans and tools to make steel. Most of it was useless.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1958,
          tekst: { en: 'Mao launches the Great Leap Forward; it ends in the deadliest famine in history.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Local officials, terrified of being called rightists, reported fantastic harvests that did not exist. The state took grain according to these false figures, leaving villages with nothing. A campaign to kill sparrows, which ate grain, led to plagues of insects that ate even more. Farmers had been pulled away from the fields to make steel, and crops rotted unharvested.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Great Famine' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Between 1959 and 1961, China suffered the deadliest famine in recorded history. Estimates of the number of deaths range from about fifteen million to forty-five million; many historians put it around thirty million. When the respected defence minister Peng Dehuai criticised the policy at a party meeting in 1959, Mao had him purged. Even as people starved, China continued to export grain.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'For decades the famine was barely mentioned in China. It was historians and journalists, some of whom had survived it themselves, who gathered the evidence from local archives and interviews.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Cultural Revolution' },
      afbeelding: SCENE_IMAGES['mao-zedong-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-7'],
          alt: { en: 'A huge crowd of young people in army-style uniforms waving small red books in a vast square.' },
          bijschrift: { en: '1966: the Red Guards.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the famine, more practical leaders such as Liu Shaoqi and Deng Xiaoping repaired the economy, and Mao was pushed into the background. He feared that the revolution was going soft and that the party was turning against him. In 1966 he struck back with the Great Proletarian Cultural Revolution. He called on young people to attack \'bourgeois\' elements everywhere, even inside the party.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Millions of students formed Red Guard groups, waving the \'Little Red Book\' of Mao\'s quotations. They humiliated and beat their teachers, smashed temples and ancient art, and hunted down \'class enemies\'. Liu Shaoqi, the head of state, was denounced, denied medical care and died in prison in 1969. Deng Xiaoping was sent to work in a tractor factory.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Swim in the Yangtze' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To show he was still strong, the 72-year-old Mao took a much-publicised swim in the Yangtze River in July 1966. The cult around him reached extraordinary heights: his portrait hung in every home, and people read his quotations aloud every day. When the Red Guards became too chaotic, Mao sent millions of young people from the cities to work in the countryside.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1972, to the world\'s surprise, Mao received the American president Richard Nixon in Beijing. The two old enemies began to talk, a turning point of the Cold War.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Portrait on the Gate' },
      afbeelding: SCENE_IMAGES['mao-zedong-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mao-zedong-8'],
          alt: { en: 'A huge portrait of a man hanging on an ancient red gate above a busy modern square with tourists.' },
          bijschrift: { en: 'Beijing today: the portrait still hangs over Tiananmen Square.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao Zedong died on 9 September 1976, at the age of eighty-two. Within a month his closest radical supporters, including his widow Jiang Qing, were arrested. They became known as the \'Gang of Four\' and were blamed for the worst excesses of the Cultural Revolution. Deng Xiaoping returned to power and opened China to markets and foreign investment.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1981 the Communist Party gave its official verdict: Mao had been a great revolutionary who made \'gross mistakes\' in his later years. Deng summed it up with a famous formula: Mao was seventy per cent right and thirty per cent wrong. The party has never allowed an open discussion of the famine or the Cultural Revolution.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Two Faces' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mao remains one of the most important and most disputed people of the twentieth century. He united a country that had been torn apart for a century and made it independent and strong. He also ruled through terror, and his policies caused the deaths of tens of millions of his own people. His embalmed body lies in a mausoleum in Tiananmen Square, and his portrait still hangs above the gate where he proclaimed the People\'s Republic.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Mao\'s face is printed on every banknote of the Chinese yuan.' },
        },
      ],
    },
  ],
};

export const johnFKennedy: Verhaal = {
  id: 'john-f-kennedy',
  beginJaar: 1917,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'John F. Kennedy' },
  ondertitel: { en: 'The young president who stared down nuclear war' },
  teaser: { en: 'The sickly second son of a rich family became the youngest man ever elected president of the United States. He brought the world back from the brink of nuclear war, and then, in Dallas, three shots rang out.' },
  jaar: 1963,
  periodeLabel: '1917 - 1963',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['john-f-kennedy'],
  portretKleur: '#2F4F7A',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'twintigste-eeuw',
  themas: ['verenigde-staten', 'koude-oorlog', 'president', 'cuba', 'moord'],
  leestijdMinuten: 7,
  personage: { naam: 'John F. Kennedy' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Second Son' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-1'],
          alt: { en: 'A large wealthy family playing football on a lawn by the sea in the 1930s.' },
          bijschrift: { en: 'Hyannis Port, 1930s: a family raised to compete.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'John Fitzgerald Kennedy, called Jack, was born on 29 May 1917 in Brookline, near Boston, the second of nine children. His great-grandparents had come from Ireland as poor immigrants. His father, Joseph P. Kennedy, made a fortune in banking, the stock market and films, and later became American ambassador to Britain. He raised his children to compete at everything, and to win.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Jack was often ill. As a child he had scarlet fever and so many other illnesses that his family joked that a mosquito biting him risked its life. He suffered from painful back problems and stomach troubles, and in his later life it became known that he had Addison\'s disease, a serious hormone disorder. He hid most of this from the public.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Living in His Brother\'s Shadow' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The family\'s hopes rested on the eldest son, Joe Jr., who was expected to become president one day. Jack was the charming, careless one. But he was also a great reader. At Harvard he wrote a thesis about why Britain had been so slow to rearm against Hitler. It was published in 1940 as a book, \'Why England Slept\', and became a bestseller.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'PT-109' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-2'],
          alt: { en: 'Exhausted young sailors swimming towards a small island with palm trees at dawn, one towing another.' },
          bijschrift: { en: 'Solomon Islands, August 1943: the night his boat was cut in half.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the United States entered the Second World War, Kennedy\'s health should have kept him out of the navy. His father\'s connections got him in. He was given command of PT-109, a small, fast patrol torpedo boat, in the Solomon Islands in the South Pacific.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the night of 2 August 1943, the Japanese destroyer Amagiri rammed PT-109 in the dark and sliced it in two. Two of the crew were killed. Kennedy gathered the eleven survivors on the floating wreckage. Then they swam for hours to a tiny island. Kennedy towed a badly burned crewman the whole way by clenching the strap of the man\'s life jacket between his teeth.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Message on a Coconut' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For days they waited, hungry and thirsty. Finally two Solomon Islander scouts, Biuku Gasa and Eroni Kumana, found them. Kennedy scratched a message on a coconut shell, and the two men paddled it in their canoe to an Allied base. The crew was rescued. Kennedy kept the coconut on his desk in the White House.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A year later, in August 1944, his brother Joe Jr. was killed when his plane exploded over England during a secret bombing mission. The family\'s political hopes now passed to Jack.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Young Senator' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-3'],
          alt: { en: 'A young politician in a suit shaking hands with factory workers at a gate in Boston.' },
          bijschrift: { en: 'Boston, 1946: the start of a political career.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1946, aged twenty-nine, Kennedy ran for Congress in a working-class district of Boston. He was thin, shy at first and not a natural speaker, but he worked tirelessly, visiting factories, docks and kitchens. His father paid for an enormous campaign, and he won easily. In 1952 he beat a well-known Republican to become a senator for Massachusetts.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1953 he married Jacqueline Bouvier, an elegant young journalist who spoke French and loved art. While recovering from dangerous back surgery, he worked on a book about American senators who had risked their careers for their principles, \'Profiles in Courage\'. It won the Pulitzer Prize in 1957, though much of it was written by his assistant, Ted Sorensen.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Aiming for the Top' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the late 1950s Kennedy was preparing to run for president. Many doubted that he could win. He was young, and he was a Catholic: no Catholic had ever been elected president, and some Americans feared that a Catholic president would take orders from the Pope. Kennedy faced the question directly, declaring that he believed in the absolute separation of church and state.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The First TV Debate' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-4'],
          alt: { en: 'Two candidates at lecterns in a television studio in 1960, cameras and studio lights around them.' },
          bijschrift: { en: '26 September 1960: the debate that television decided.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1960 Kennedy faced Vice President Richard Nixon. On 26 September they met in the first televised presidential debate in American history, watched by about seventy million people. Nixon had been ill, refused proper make-up and looked pale and sweaty. Kennedy, tanned and calm, looked straight into the camera. Many people who heard the debate on the radio thought Nixon had done well; many who watched it on television thought Kennedy had won.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The election in November was one of the closest in American history. Kennedy won the popular vote by only about 112,000 votes out of almost seventy million. At forty-three, he was the youngest person ever elected president, and the first Catholic.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1960,
          tekst: { en: 'Kennedy is elected the 35th President of the United States.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Ask Not' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On a freezing, snowy day in January 1961, Kennedy took the oath of office in Washington. His inaugural speech was short and full of energy. He said the torch had passed to a new generation of Americans, born in the twentieth century.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Ask not what your country can do for you; ask what you can do for your country.' },
          bron: { en: 'John F. Kennedy, inaugural address, 20 January 1961' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Wall and the Moon' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-5'],
          alt: { en: 'A young president speaking to an enormous cheering crowd in a square in West Berlin.' },
          bijschrift: { en: 'West Berlin, June 1963: "Ich bin ein Berliner."' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Kennedy\'s presidency began with a humiliation. In April 1961, about 1,400 Cuban exiles, trained and armed by the CIA, landed at the Bay of Pigs in Cuba to overthrow Fidel Castro\'s communist government. The invasion collapsed within three days. Kennedy took public responsibility for the failure.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Cold War with the Soviet Union grew more dangerous. In August 1961 East Germany built the Berlin Wall to stop its people fleeing to the West. Two years later Kennedy visited West Berlin and told a crowd of hundreds of thousands: \'Ich bin ein Berliner\', \'I am a Berliner\'. It was his way of saying that the free world stood with them.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'We Choose to Go to the Moon' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Soviets were also ahead in space: they had launched the first satellite and, in April 1961, the first man into orbit, Yuri Gagarin. In May 1961 Kennedy asked Congress to commit the nation to landing a man on the Moon and returning him safely to Earth before the decade was out. It seemed almost impossible. It became the Apollo programme.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'A popular myth says that \'Ich bin ein Berliner\' means \'I am a jam doughnut\'. It doesn\'t: Kennedy\'s German was perfectly correct, and the crowd understood exactly what he meant.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Thirteen Days' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-6'],
          alt: { en: 'Tense men in suits around a long table in a White House meeting room studying aerial photographs.' },
          bijschrift: { en: 'October 1962: the Cuban Missile Crisis.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 14 October 1962, an American U-2 spy plane flying over Cuba photographed something alarming: Soviet nuclear missile sites under construction, just 150 kilometres from Florida. From there, missiles could reach most American cities within minutes. For the next thirteen days the world came closer to nuclear war than ever before or since.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Kennedy\'s military advisers urged him to bomb the sites and invade Cuba. Kennedy was cautious. He chose a naval blockade, which he called a \'quarantine\', to stop further Soviet ships from reaching the island, and on 22 October he told the nation on television what was happening. Soviet ships headed for the blockade line. On 27 October, an American U-2 was shot down over Cuba.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1962,
          tekst: { en: 'The Cuban Missile Crisis brings the world to the edge of nuclear war.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Secret Deal' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Behind the scenes, Kennedy\'s brother Robert, the Attorney General, met the Soviet ambassador. On 28 October, the Soviet leader Nikita Khrushchev announced that the missiles would be removed. In return, the United States promised not to invade Cuba and, in secret, agreed to withdraw its own nuclear missiles from Turkey. The secret part of the deal remained hidden from the public for years.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The crisis frightened both leaders. In 1963 they set up a direct \'hotline\' between Washington and Moscow and signed a treaty banning nuclear tests in the atmosphere.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Civil Rights' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-7'],
          alt: { en: 'A president seated at a desk in front of television cameras, about to address the nation.' },
          bijschrift: { en: 'June 1963: civil rights become a moral issue.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For a long time Kennedy moved slowly on civil rights for Black Americans. He needed the votes of white Southern Democrats in Congress and did not want to lose them. But the courage of protesters, the Freedom Riders who were beaten on buses, and the children of Birmingham who were attacked with dogs and fire hoses, forced the issue onto the television screens of the nation.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1963, after the governor of Alabama tried to block two Black students from entering the state university, Kennedy went on television. He called civil rights \'a moral issue\' as old as the Scriptures and as clear as the American Constitution, and announced that he would send a major civil rights bill to Congress. That same night the civil rights activist Medgar Evers was murdered outside his home in Mississippi.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Myth of Camelot' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In public, the Kennedys seemed a perfect young family, with their small children playing in the White House. After his death, his widow compared his presidency to Camelot, the legendary court of King Arthur. The reality was more complicated: Kennedy hid his serious illnesses and had numerous affairs. Historians still argue about how much he really achieved in his thousand days.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Dallas' },
      afbeelding: SCENE_IMAGES['john-f-kennedy-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['john-f-kennedy-8'],
          alt: { en: 'An open-top limousine in a presidential motorcade driving through a sunny plaza lined with crowds.' },
          bijschrift: { en: 'Dealey Plaza, Dallas, 22 November 1963, 12:30.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In November 1963 Kennedy travelled to Texas to prepare for the next election. On 22 November, he and his wife Jacqueline rode through Dallas in an open-top car. The crowds were large and friendly. At 12:30, as the car passed through Dealey Plaza, shots rang out. Kennedy was hit in the neck and the head. He was rushed to Parkland Hospital and declared dead half an hour later. He was forty-six.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1963,
          tekst: { en: 'President Kennedy is assassinated in Dallas, Texas.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Less than two hours later, Vice President Lyndon B. Johnson was sworn in as president on board Air Force One, with Jacqueline Kennedy standing beside him, still wearing her bloodstained pink suit. Police arrested Lee Harvey Oswald, a former marine who had once lived in the Soviet Union, who worked in the book warehouse overlooking the plaza. Two days later, as he was being moved, a nightclub owner named Jack Ruby shot Oswald dead in front of live television cameras.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Questions That Never Went Away' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1964 the Warren Commission concluded that Oswald had acted alone. But because Oswald never stood trial, many people never accepted that answer, and countless theories about conspiracies have appeared ever since. Kennedy was buried at Arlington National Cemetery, where an eternal flame burns over his grave. The civil rights law he had proposed was passed in 1964, and in July 1969, Americans walked on the Moon.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Many people who were alive in 1963 can still remember exactly where they were when they heard that Kennedy had been shot.' },
        },
      ],
    },
  ],
};

export const neilArmstrong: Verhaal = {
  id: 'neil-armstrong',
  beginJaar: 1930,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Neil Armstrong' },
  ondertitel: { en: 'The quiet engineer who became the first human on the Moon' },
  teaser: { en: 'He could fly a plane before he could drive a car. He survived a spinning spacecraft, a crashing test vehicle and a landing with seconds of fuel to spare. And then he stepped onto another world.' },
  jaar: 2012,
  periodeLabel: '1930 - 2012',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['neil-armstrong'],
  portretKleur: '#3E4A5C',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'twintigste-eeuw',
  themas: ['ruimtevaart', 'maan', 'apollo', 'techniek', 'avontuur'],
  leestijdMinuten: 7,
  personage: { naam: 'Neil Armstrong' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy Who Looked Up' },
      afbeelding: SCENE_IMAGES['neil-armstrong-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-1'],
          alt: { en: 'A small boy and his father looking up in wonder at an old silver three-engined aeroplane in a field.' },
          bijschrift: { en: 'Ohio, 1936: a first flight in the "Tin Goose".' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Neil Alden Armstrong was born on 5 August 1930 on his grandparents\' farm near Wapakoneta, a small town in Ohio. His father audited the accounts of county governments, so the family moved around Ohio often. When Neil was six, his father took him for a ride in a Ford Trimotor, a noisy metal aeroplane nicknamed the \'Tin Goose\'. From that day on he was in love with flying.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He built model aeroplanes, read flying magazines and worked at a pharmacy and other jobs to pay for flying lessons, which cost nine dollars an hour. On his sixteenth birthday he earned his student pilot\'s certificate. He could fly a plane before he had a driving licence.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Eagle Scout' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Neil was quiet, serious and careful, a boy who liked to understand exactly how things worked. He became an Eagle Scout, the highest rank in the Boy Scouts. In 1947 he went to Purdue University in Indiana to study aeronautical engineering on a navy scholarship, which meant that after two years of study he had to serve as a navy pilot.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Flying in Korea' },
      afbeelding: SCENE_IMAGES['neil-armstrong-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-2'],
          alt: { en: 'A navy jet fighter taking off from the deck of an aircraft carrier in a grey sea.' },
          bijschrift: { en: 'The Korean War, 1951: seventy-eight combat missions.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1949 the navy called him up. He trained as a pilot and in 1951, aged twenty, he flew jet fighters from the aircraft carrier USS Essex in the Korean War. He flew seventy-eight combat missions, attacking bridges, trains and supply routes.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 3 September 1951, flying low on a bombing run, his Panther jet hit a cable or wire strung across a valley, which sliced off part of one wing. Armstrong nursed the damaged plane back over friendly territory and ejected. He landed safely and was picked up by a jeep driven by a former roommate from flight school.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Back to School' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the war he returned to Purdue and finished his degree. There he met Janet Shearon, a home economics student, and they married in 1956. He had decided what he wanted to do: not just fly planes, but fly the newest and fastest ones nobody had flown before.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Edge of Space' },
      afbeelding: SCENE_IMAGES['neil-armstrong-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-3'],
          alt: { en: 'A black rocket plane with stubby wings dropping from under the wing of a large bomber high above a desert.' },
          bijschrift: { en: 'The X-15: flying higher and faster than almost anyone.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1955 Armstrong joined the NACA, the forerunner of NASA, as a test pilot. He spent years at Edwards Air Force Base in the Mojave Desert in California, flying experimental aircraft and chase planes. He flew more than two hundred different types of aircraft in his career.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The most extraordinary was the X-15, a black rocket plane that was dropped from under the wing of a B-52 bomber and then blasted upwards on its own engine. Armstrong flew it seven times. In 1962 he reached a height of more than 63 kilometres. On one flight he climbed so high that the plane \'bounced\' off the thin upper atmosphere and overshot the base, gliding back with barely enough height to land.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Private Grief' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In those same years, Neil and Janet\'s two-year-old daughter Karen was diagnosed with a brain tumour. She died in January 1962. Armstrong rarely spoke about her, even to his closest friends. A few months later he applied to become an astronaut.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Armstrong\'s application to become an astronaut arrived about a week after the deadline. A friend at NASA is said to have slipped it into the pile.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Gemini 8' },
      afbeelding: SCENE_IMAGES['neil-armstrong-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-4'],
          alt: { en: 'A small two-man space capsule tumbling in orbit above the blue Earth, attached to a rocket stage.' },
          bijschrift: { en: '16 March 1966: a spacecraft spinning out of control.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1962 Armstrong was chosen as one of NASA\'s second group of astronauts, one of only two civilians among them. In March 1966, he commanded Gemini 8 with David Scott. Their task was to perform the first docking in space: to catch up with an unmanned target rocket, the Agena, and lock onto it. They did it perfectly.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Then things went badly wrong. The joined spacecraft began to roll. Armstrong undocked, but the spinning got faster, until the capsule was turning about once every second. The astronauts were close to blacking out, and their vision was blurring. A thruster on their own capsule was stuck on.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Keeping Calm' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Armstrong shut off the main control thrusters and used the separate thrusters meant for re-entry to steady the craft. It worked, but mission rules required them to come home at once. They splashed down in the Pacific less than eleven hours after launch. Some at NASA grumbled, but the people who mattered noticed how coolly he had saved the mission and their lives.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Choosing the Crew' },
      afbeelding: SCENE_IMAGES['neil-armstrong-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-5'],
          alt: { en: 'A strange flying machine with a framework body and a jet engine hovering over an airfield, its pilot ejecting.' },
          bijschrift: { en: 'May 1968: a training machine crashes seconds after Armstrong ejects.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Apollo programme had a terrible start. On 27 January 1967, during a test on the launch pad, a fire broke out inside the Apollo 1 capsule. In seconds the pure oxygen inside turned it into an inferno. Gus Grissom, Ed White and Roger Chaffee were killed. NASA redesigned the spacecraft from top to bottom.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To practise landing on the Moon, astronauts flew a bizarre machine called the Lunar Landing Research Vehicle, nicknamed the \'Flying Bedstead\'. On 6 May 1968, Armstrong\'s craft went out of control about thirty metres above the ground. He ejected just seconds before it hit the ground and exploded. He then went back to his office and finished his paperwork that afternoon.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Apollo 11' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In January 1969, NASA announced the crew for Apollo 11, the mission that would attempt the first landing: Neil Armstrong as commander, Edwin \'Buzz\' Aldrin as lunar module pilot, and Michael Collins, who would stay in orbit around the Moon in the command module. NASA decided that the commander would step out first.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Eagle Has Landed' },
      afbeelding: SCENE_IMAGES['neil-armstrong-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-6'],
          alt: { en: 'A spidery golden lunar module descending over a grey, cratered moon surface with a plume of dust.' },
          bijschrift: { en: '20 July 1969: seconds of fuel to spare.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 16 July 1969, a Saturn V rocket, as tall as a 36-storey building, lifted Apollo 11 off the launch pad in Florida. Four days later, Armstrong and Aldrin climbed into the lunar module, called Eagle, and began their descent to the Moon while Collins waited in orbit.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The landing nearly failed. Alarms flashed, codes \'1202\' and \'1201\': the guidance computer was overloaded. Engineers in Houston quickly decided it was safe to continue. Then Armstrong saw that the computer was taking them into a crater full of boulders the size of cars. He took manual control and flew Eagle onwards, searching for a smooth place to land, as the fuel ran lower and lower.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1969,
          tekst: { en: 'Apollo 11 lands on the Moon; Neil Armstrong becomes the first human to walk on it.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Tranquility Base' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mission Control called out \'sixty seconds\', then \'thirty seconds\' of fuel left before they would have to abort. Then a light came on: the probes on Eagle\'s legs had touched the surface. Armstrong\'s voice came over the radio: \'Houston, Tranquility Base here. The Eagle has landed.\' In Mission Control, people who had been holding their breath started breathing again.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'One Small Step' },
      afbeelding: SCENE_IMAGES['neil-armstrong-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-7'],
          alt: { en: 'An astronaut in a white suit stepping off the ladder of a lunar module onto the grey dust of the Moon.' },
          bijschrift: { en: '21 July 1969, 02:56 world time.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hours later, Armstrong squeezed out of the hatch and climbed slowly down the ladder. A camera on the side of Eagle sent blurry black-and-white pictures back to Earth. About 650 million people, perhaps a fifth of all the people in the world, were watching or listening. At 02:56 world time on 21 July 1969, Armstrong put his left boot on the Moon.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'That\'s one small step for man, one giant leap for mankind.' },
          bron: { en: 'Neil Armstrong, stepping onto the Moon, 21 July 1969. He always said he meant to say "for a man".' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Aldrin joined him about twenty minutes later. He described the view as \'magnificent desolation\'. For about two and a half hours, the two men collected rocks and soil, set up experiments, planted an American flag and unveiled a plaque on Eagle\'s leg that read: \'We came in peace for all mankind\'.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Almost No Photos' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Because Armstrong carried the camera most of the time, there are very few good photographs of the first man on the Moon. The most famous picture of an astronaut on the Moon shows Aldrin, with Armstrong visible only as a small reflection in his visor.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Quiet Hero' },
      afbeelding: SCENE_IMAGES['neil-armstrong-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['neil-armstrong-8'],
          alt: { en: 'An older man with grey hair standing at night on a quiet lawn looking up at the full moon.' },
          bijschrift: { en: 'Ohio, later years: a man who never sought the spotlight.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 24 July 1969, Apollo 11 splashed down in the Pacific Ocean. The three astronauts spent three weeks in quarantine, in case they had brought back germs from the Moon. Then came parades in New York and a world tour to more than twenty countries. Everyone wanted to see the first man on the Moon.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Armstrong never flew in space again. In 1971 he left NASA and became a professor of aerospace engineering at the University of Cincinnati. He avoided the spotlight, rarely gave interviews and refused to sign autographs once he discovered they were being sold. In 1986 he served on the commission that investigated the explosion of the Space Shuttle Challenger.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Wink at the Moon' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Neil Armstrong died on 25 August 2012, aged eighty-two, after heart surgery. He was buried at sea. His family asked people who wanted to honour him to do something simple: the next time you walk outside on a clear night and see the Moon smiling down at you, think of Neil Armstrong and give him a wink.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Twelve people have walked on the Moon, all of them between 1969 and 1972. Their footprints are still there, because there is no wind on the Moon to blow them away.' },
        },
      ],
    },
  ],
};

export const twintigsteEeuw: Verhaal[] = [marieCurie, winstonChurchill, martinLutherKingJr, mahatmaGandhi, josephStalin, albertEinstein, adolfHitler, maoZedong, johnFKennedy, neilArmstrong];
