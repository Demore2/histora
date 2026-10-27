import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

export const joanOfArc: Verhaal = {
  id: 'joan-of-arc',
  beginJaar: 1412,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Joan of Arc' },
  ondertitel: { en: 'The Peasant Girl Who Heard Divine Voices' },
  teaser: { en: 'From humble fields to legendary military leader, Joan of Arc changed the course of the Hundred Years War.' },
  jaar: 1431,
  periodeLabel: '1412 - 1431',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['joan-of-arc'],
  portretKleur: '#D4AF37',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'middeleeuwen',
  themas: ['oorlog', 'geloof', 'Frankrijk', 'jonge-leiders', 'moed'],
  leestijdMinuten: 9,
  personage: { naam: 'Joan of Arc' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Girl from Domrémy' },
      afbeelding: SCENE_IMAGES['joan-of-arc-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-1'],
          alt: { en: 'A peasant girl tending sheep beside a village church in the Meuse valley.' },
          bijschrift: { en: 'Domrémy, around 1425: a border village on the wrong side of a war that had already lasted ninety years.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the small French village of Domrémy, a young girl named Jeanne was born around 1412 to a family of simple peasants. Her father, Jacques d\'Arc, was a respected farmer and village official, while her mother, Isabelle Romée, was deeply religious. Jeanne grew up in a world torn apart by war. The Hundred Years War between France and England had raged for nearly a century, devastating the countryside and draining the kingdom\'s resources. English forces controlled much of northern France, while the French king appeared powerless to stop them. For people like Jeanne\'s family, war meant danger, destruction, and constant uncertainty about the future.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Unlike other girls her age, Jeanne showed little interest in the typical pursuits of village life. She was illiterate and never learned to read or write, but she possessed an unusually strong faith and a sharp intelligence. From her earliest years, she spent hours in church and was known for her piety and moral conviction. Her godparents called her well-behaved and kind-hearted. In her spare time, she helped her mother with household tasks and her father with farm work. Nothing in her early life suggested that this ordinary peasant girl would one day command armies and change the fate of nations. Yet the seeds of her extraordinary destiny were already being sown by forces beyond her understanding.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Voices Begin' },
      afbeelding: SCENE_IMAGES['joan-of-arc-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-2'],
          alt: { en: 'A girl kneeling in a walled garden as light falls through the summer trees.' },
          bijschrift: { en: 'She was about thirteen when the voices began — in her father’s garden, in broad daylight.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Jeanne was around thirteen years old, something remarkable happened that would transform her life forever. While sitting in her father\'s garden, she heard a voice calling to her. At first, she was frightened and confused. The voice was distinct and clear, accompanied by a brilliant light that seemed to shine from the direction of the local church. She heard it again and again on different occasions, always with the same message: she was chosen by God for a special purpose. Jeanne described the voices as beautiful and gentle, never cruel or demanding. She later reported hearing the voices of Saint Michael the Archangel, Saint Catherine of Alexandria, and Saint Margaret of Antioch.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'At first, Jeanne kept the voices secret, fearing that people would think her mad or possessed by demons. Medieval society had little patience for those who claimed direct communication with God, especially women and peasants. However, as she grew older, the voices became more insistent and more specific. By the time she was seventeen, the voices had given her a clear mission: France was suffering under English occupation, and God had chosen her to lead the French king\'s armies to victory. The voices told her that she must travel to the royal court and convince the king to place her at the head of his military forces. It seemed an impossible task, yet Jeanne felt an overwhelming certainty that this was her destiny.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Jeanne\'s conviction grew so strong that she could no longer ignore her calling. She cut her hair short, dressed in men\'s clothing, and told her parents that she needed to travel to the nearest French stronghold at Vaucouleurs. She claimed she had a cousin there who could help her, though this was apparently not true. Her determination was so fierce that her father eventually agreed to let her go. Early in 1429, at about seventeen years old, Jeanne left her village for the last time. She had no army, no official position, no experience in warfare, and no guarantee that anyone would listen to her. Yet she set out on her journey with absolute faith that God would guide her steps.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The King\'s Court' },
      afbeelding: SCENE_IMAGES['joan-of-arc-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-3'],
          alt: { en: 'A figure in men’s riding clothes standing before the royal court in a castle hall.' },
          bijschrift: { en: 'Chinon, March 1429: a farmer’s daughter asking a disinherited king for an army.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Jeanne\'s journey to the royal court was perilous. The roads were dangerous, controlled by soldiers and bandits. Yet she traveled with an escort provided by Jean of Metz, a French nobleman who had been impressed by her conviction and her claim to carry God\'s message. When she finally reached the court of King Charles VII at Chinon, she faced skepticism from everyone around her. Nobles questioned whether a peasant girl could possibly be sent by God. Military leaders dismissed her as a fool or a fraud. The king himself was uncertain, having been told that his legitimacy to rule was questionable. However, Jeanne\'s absolute certainty and her direct manner impressed many at court. She spoke with authority that seemed far beyond her years and education.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'To test Jeanne\'s claims, the king placed her in a room with courtiers while he hid among them dressed like a servant. Jeanne immediately approached him and recognized him as the true king. Later, she submitted to examination by theologians and bishops, who questioned her extensively about her faith and her voices. Remarkably, she answered all their questions with wisdom and clarity. Some of the clergy became convinced that she truly was sent by God. After weeks of testing, the king finally agreed to give Jeanne a small force of soldiers to command. She was given armor, a horse, and a banner that bore the image of Jesus Christ and two angels. Most of the military leaders remained doubtful, but they were willing to try anything to turn the tide of the war.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'The Miracle of Orléans' },
      afbeelding: SCENE_IMAGES['joan-of-arc-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-4'],
          alt: { en: 'French soldiers storming an English siege fort outside a walled river city.' },
          bijschrift: { en: 'Orléans held out for nine days after she arrived. The English had besieged it for seven months.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The city of Orléans was the key to France\'s survival. English forces had surrounded it and were preparing for a final assault that would give them control of central France. The French were demoralized and exhausted. Many believed the city was doomed to fall. Yet when Jeanne arrived at the military camp, something shifted. The soldiers, who had been filled with despair, suddenly felt hope. This peasant girl, who claimed to carry God\'s message, walked among them with such confidence and conviction that their spirits lifted. She spoke of victory as though it were already certain. She told the soldiers that God had sent her to save France, and they believed her.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On May 7, 1429, Jeanne led a decisive charge against the English forces besieging Orléans. She rode at the front of the French army, carrying her banner high, seemingly fearless in the face of arrows and danger. The English, who had been winning battle after battle for years, found themselves facing something unexpected: an army that believed in victory absolutely. They retreated from Orléans, and the siege was broken. The victory shocked everyone, including the skeptics who had doubted Jeanne\'s abilities. News of the miracle spread quickly across France. Jeanne was no longer just a peasant girl claiming to hear voices; she was now a proven military leader who had accomplished what experienced generals could not.' }
        },
        {
          type: 'citaat',
          tekst: { en: 'Act, and God will act.' },
          bron: { en: 'Joan of Arc' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'A Soldier\'s Rise' },
      afbeelding: SCENE_IMAGES['joan-of-arc-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-5'],
          alt: { en: 'An armoured figure on a white horse leading men-at-arms past a Loire town.' },
          bijschrift: { en: 'Jargeau, Meung, Beaugency, Patay — the whole Loire campaign took barely a week.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Following the victory at Orléans, Jeanne led the French army on a remarkable series of military campaigns. She was present at the capture of important cities including Jargeau, Meung-sur-Loire, and Beaugency. At each location, her presence seemed to inspire the French soldiers to fight with renewed determination and courage. The English, accustomed to victory, found themselves struggling against an army led by a peasant girl who seemed to have God on her side. Jeanne\'s tactics were sometimes unorthodox, but they were remarkably effective. She pushed for direct, aggressive action against the English, refusing to accept the cautious, defensive strategies that had characterized French warfare. Her boldness surprised everyone, including the experienced military commanders who fought beside her.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Within just a few months, Jeanne had changed the entire momentum of the Hundred Years War. The French king, deeply grateful for his newfound success, traveled to the city of Reims in July 1429 for his coronation, an event that would have seemed impossible just months earlier. Jeanne walked beside him throughout the ceremony, her role in his triumph clear for everyone to see. The coronation was significant not just as a religious ceremony but as a political statement: Charles VII was the rightful king of France, and God had proven it through his military victories. Jeanne had accomplished in six months what the French nobility had failed to achieve in nearly a century of warfare. Yet even as she reached the height of her power and influence, her enemies were preparing their response.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Capture and Trial' },
      afbeelding: SCENE_IMAGES['joan-of-arc-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-6'],
          alt: { en: 'A prisoner standing before a bench of black-robed clerics in a vaulted hall.' },
          bijschrift: { en: 'Rouen, 1431: seventy charges, months of interrogation, and no counsel for the defence.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In May 1430, Jeanne was captured by Burgundian forces fighting on the side of the English during a siege at Compiègne. She was sold to the English for a large sum of money. Instead of being treated as a soldier entitled to ransom, as was the custom for nobles and military leaders, Jeanne was imprisoned and charged with heresy. The English and their allies wanted to break her power and prove that her victories were not gifts from God but the result of witchcraft and demonic possession. They brought her to trial in the city of Rouen, where a hostile tribunal of English-allied clergy and French collaborators waited to judge her.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The trial lasted for months, with interrogators attempting to trick Jeanne into making statements that could be used against her. She was questioned relentlessly about her voices, her faith, and her military decisions. Despite her fear and isolation, Jeanne remained remarkably composed and articulate. She defended herself with intelligence and conviction, refusing to renounce her mission or her belief in the divine nature of her calling. The trial was rigged from the beginning; the outcome had been decided before she ever entered the courtroom. The tribunal had only one purpose: to condemn her as a heretic and destroy her legacy as a threat to English power in France.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the end, Jeanne was found guilty of heresy and witchcraft. On May 30, 1431, at just nineteen years old, she was burned at the stake in the marketplace of Rouen. Her ashes were scattered in the Seine River to prevent them from becoming holy relics. The English believed that by executing Jeanne, they had removed the spiritual force behind French resistance. They could not have been more wrong. Jeanne\'s death transformed her from a military leader into a martyr, making her even more powerful in the hearts and minds of the French people.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Legacy of Courage' },
      afbeelding: SCENE_IMAGES['joan-of-arc-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-7'],
          alt: { en: 'A crowd gathered around a stone cross in a French market square at dusk.' },
          bijschrift: { en: 'Her death did not end the war — it hardened it. Within twenty-two years the English had lost France.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'After Jeanne\'s execution, the French were devastated. For a time, it seemed as if the English had succeeded in crushing the movement she had inspired. However, something remarkable happened. Instead of weakening French resolve, her martyrdom strengthened it. Stories of Jeanne\'s trial and execution spread throughout France, inspiring countless people to continue fighting for their country\'s freedom. The very act of dying for her beliefs made her cause seem even more just and noble. Jeanne had gone from being a controversial peasant girl to being a symbol of French independence and divine will. Within a generation, the French had completely pushed the English out of France, ending the Hundred Years War with a decisive French victory.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The impact of Jeanne\'s brief life extended far beyond her own time. She demonstrated that ordinary people could achieve extraordinary things when they acted with courage and conviction. She showed that age, education, and social status did not determine a person\'s worth or abilities. She challenged the medieval certainty that women were inferior to men and suited only for domestic roles. Twenty-five years after her execution, the Church reopened her case and declared her trial invalid. Jeanne was officially rehabilitated and recognized as a victim of injustice. Centuries later, in 1920, she was canonized as a saint by the Catholic Church.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'Forever Remembered' },
      afbeelding: SCENE_IMAGES['joan-of-arc-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['joan-of-arc-8'],
          alt: { en: 'A gilded equestrian statue of a young woman in armour above a Paris square.' },
          bijschrift: { en: 'Condemned in 1431, declared innocent in 1456, canonised in 1920.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Today, more than five hundred years after her death, Joan of Arc remains one of the most famous figures in history. Her story has been told in countless books, plays, films, and paintings. She is remembered as a symbol of courage, faith, and national identity. In France, she is a national hero whose statue stands in many cities and squares. Young people continue to study her life and be inspired by her example. What makes Jeanne\'s story so powerful and enduring is that it challenges us to think about what is possible when we believe in ourselves and in something greater than ourselves. She showed that one person, armed with courage and conviction, can change the world.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Joan of Arc\'s life was short, lasting only nineteen years, yet it was filled with extraordinary meaning and impact. She rose from poverty to command armies. She faced her enemies without fear and stood by her beliefs even when it meant death. She asked nothing for herself and offered everything to her country and her God. Her story reminds us that heroism is not determined by age, background, or appearance. It is determined by the strength of our convictions and our willingness to act on them, regardless of the cost. Joan of Arc proved that anyone can be a hero. This lesson has made her a timeless inspiration for people around the world who face their own challenges and seek to make a difference in their communities and their world.' }
        }
      ]
    }
  ]
};

export const charlemagne: Verhaal = {
  id: 'charlemagne',
  beginJaar: 748,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Charlemagne' },
  ondertitel: { en: 'The Father of Europe' },
  teaser: { en: 'A warrior king who united much of Europe and became the first Holy Roman Emperor since ancient times.' },
  jaar: 814,
  periodeLabel: '748 - 814',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['charlemagne'],
  portretKleur: '#8B0000',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'middeleeuwen',
  themas: ['macht', 'oorlog', 'educatie', 'geloof', 'Europese-eenheid'],
  leestijdMinuten: 9,
  personage: { naam: 'Charlemagne' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born to Rule' },
      afbeelding: SCENE_IMAGES['charlemagne-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-1'],
          alt: { en: 'A Frankish hall of carved timber where a boy watches warriors at a long table.' },
          bijschrift: { en: 'The Franks were one Germanic people among many. Nothing yet marked them out.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the year 748, in the realm of the Franks, a boy was born who would reshape the political landscape of Europe. Named Charles, later known as Charlemagne—Charles the Great—he was the son of Pepin the Short, the founder of the Carolingian dynasty. The Franks were a Germanic tribe that had gradually expanded their power across western Europe, but they remained relatively unknown compared to the great empires of Rome and Constantinople. Pepin the Short had consolidated Frankish power by overthrowing the weak Merovingian kings and establishing himself as the true ruler of the realm. He prepared his kingdom and his son for even greater accomplishments.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Young Charles grew up in a warrior culture where strength, courage, and military skill were the highest virtues. His father trained him not only in the arts of war but also in leadership and governance. The young prince learned to ride horses expertly, to handle weapons with skill, and to command respect from those around him. He was taught Latin and other subjects considered essential for a ruler, though he would struggle with reading and writing throughout his life. Charles inherited his father\'s ambition and his talent for organization. When Pepin died in 768, his kingdom was divided between Charles and his brother Carloman, according to Frankish custom. This division created tension and conflict between the two brothers, setting the stage for Charles to prove himself as a leader.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Master of the Franks' },
      afbeelding: SCENE_IMAGES['charlemagne-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-2'],
          alt: { en: 'Frankish cavalry riding through a dark Saxon forest past a felled idol.' },
          bijschrift: { en: 'The Saxon wars ran for thirty-two years — longer than most medieval reigns lasted altogether.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The early years of Charles\'s rule were marked by constant military campaigns. He faced challenges on all sides: rebellious nobles, neighboring kingdoms seeking to expand their own territories, and Saxons to the north who resisted Frankish domination. In 772, Charles embarked on a military campaign against the Saxons that would continue, with varying intensity, for over thirty years. The Saxons were fierce warriors who refused to abandon their pagan religion and accept Christianity, which Charles saw as inseparable from his rule and his authority. These were brutal campaigns, with Charles showing little mercy to those who defied him. His methods were harsh by modern standards, but they were considered normal for medieval warfare and politics.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'A turning point came in 771 when Carloman died, leaving Charles as the sole ruler of the Frankish kingdom. Charles quickly moved to consolidate his power, taking control of territories that Carloman had ruled and forcing Carloman\'s widow and children into exile. With his position secured, Charles could pursue his ambitions more forcefully. In 773, he intervened in Italian politics when Pope Hadrian asked for his protection against the Lombards, a Germanic tribe that threatened papal territories. Charles defeated the Lombards and declared himself their king, adding Italy to his growing empire. He donated territories to the Church, establishing a pattern of cooperation between the Frankish ruler and the Pope that would define medieval European politics.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Over the next two decades, Charles conquered and consolidated territory relentlessly. He defeated the Bavarians, the Frisii, and various other groups who resisted Frankish rule. His Saxon wars were particularly long and difficult; the Saxons rebelled repeatedly against Frankish rule and Frankish efforts to Christianize them. In 778, Charles assembled one of the largest armies ever seen in medieval Europe and marched across the Pyrenees into Spain to fight against Muslim forces. Though this campaign was not entirely successful, it expanded Frankish influence and prestige. With each victory, Charles\'s empire grew larger and stronger.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Emperor Crowned' },
      afbeelding: SCENE_IMAGES['charlemagne-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-3'],
          alt: { en: 'A Frankish king crowned by the pope before the altar of old Saint Peter’s.' },
          bijschrift: { en: 'Christmas Day, 800: the first emperor in western Europe for more than three centuries.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By the beginning of the ninth century, Charles had united nearly all of western Europe under his rule. His territories stretched from the Atlantic Ocean to beyond the Rhine River, and from the North Sea to Rome. No ruler in western Europe had controlled such vast lands since the fall of the Roman Empire more than three hundred years earlier. Charles had become more than a king; he was the dominant political and military force in Christian Europe. The Pope and the church hierarchy recognized his power and his importance to their own security and influence. In 799, when a revolt threatened Pope Leo III\'s authority in Rome, the Pope appealed to Charles for protection. Charles responded immediately, marching to Rome and restoring the Pope to his throne.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'What happened next would have enormous consequences for European history. On Christmas Day in the year 800, as Charles knelt in prayer in the church of Saint Peter in Rome, Pope Leo III placed an imperial crown on his head and proclaimed him Emperor of the Romans. The crowd in the church shouted their approval: "Charles the most pious Emperor of the Romans, crowned by God, life and victory!" With this single act, the Pope crowned Charles as the successor to the Roman emperors of ancient times. It was a momentous gesture, suggesting that legitimate imperial authority had returned to western Europe after centuries of fragmentation and decline. Charles was the first western European ruler to bear the title of emperor since the fall of Rome.' }
        },
        {
          type: 'citaat',
          tekst: { en: 'Learning is the most excellent ornament and the greatest power of a people.' },
          bron: { en: 'Charlemagne' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'The Builder of Empire' },
      afbeelding: SCENE_IMAGES['charlemagne-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-4'],
          alt: { en: 'The octagonal palace chapel of Aachen under construction.' },
          bijschrift: { en: 'Aachen was built as a new Rome — with columns shipped north from the old one.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charles did not simply conquer territory; he built the infrastructure and institutions that would hold his empire together. He established a system of government that combined centralized authority with local administration. He appointed counts and bishops to rule provinces on his behalf, keeping them accountable to him through regular inspections and communications. He created a system of roads and bridges that improved trade and military movement throughout his territories. He standardized weights, measures, and coinage to facilitate commerce. These practical innovations made his empire not just larger but stronger and more stable than anything that had existed in western Europe for centuries.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charles was deeply interested in culture and learning. He believed that a great emperor needed to support intellectual advancement and education. He established a palace school at his capital in Aachen, where the finest scholars in Europe came to teach and study. He personally participated in these discussions, learning Latin with the same determination he brought to everything else. He insisted that young men study not only military arts but also literature, mathematics, astronomy, and other intellectual disciplines. This period became known as the Carolingian Renaissance, a flourishing of learning and culture that helped preserve and spread knowledge from the ancient world through the medieval period.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charles also reformed the Church and religious practice throughout his empire. He worked closely with Pope Leo III and the church hierarchy to standardize religious observances and eliminate superstitions and corruptions that had crept into Christian practice. He promoted the use of Latin in religious services and ensured that churches had proper training and resources. He saw religious reform as central to his mission as emperor. The combination of military conquest, practical governance, cultural patronage, and religious reform created an empire that was unprecedented in medieval Europe and set patterns for European civilization that would endure for centuries.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Warrior Never Rests' },
      afbeelding: SCENE_IMAGES['charlemagne-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-5'],
          alt: { en: 'An ageing king in mail riding at the head of a column through an alpine pass.' },
          bijschrift: { en: 'He kept campaigning into his seventies, and moved his whole court with him.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Despite his vast empire and advanced age, Charles continued to lead military campaigns well into his seventies. He personally led armies into battle, enduring the same hardships as his soldiers. His health was robust and his will seemed unbreakable. He spent much of his time traveling throughout his empire, checking on his territories, meeting with local rulers and bishops, and making sure that his authority was respected. He established Aachen as his primary capital, creating a grand palace and cathedral there that reflected his power and vision. The palace complex at Aachen served as the administrative center of his empire and a symbol of his authority and sophistication. Diplomatic embassies from distant lands, including the Byzantine Empire and the Abbasid Caliphate, traveled to Aachen to conduct negotiations with the great emperor.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charles was known for his physical strength and his vigorous lifestyle. He enjoyed swimming in hot springs, riding horses, and hunting. He learned to write and kept tablets under his pillow so he could practice writing at night, though his adult writing always remained clumsy. He was fond of eating and drinking and could entertain for hours, but he drank wine in moderation and often encouraged the same discipline in others. He took his duties as emperor seriously and believed that God had blessed his rule. He lived to about seventy, an exceptional age for the medieval period, ruling for nearly half a century. His death in 814 marked the end of an era and raised questions about whether his empire could survive without him.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Law, Order, and Faith' },
      afbeelding: SCENE_IMAGES['charlemagne-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-6'],
          alt: { en: 'Monks copying manuscripts at slanted desks in a Carolingian scriptorium.' },
          bijschrift: { en: 'The script his scribes standardised is the distant ancestor of the letters you are reading now.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charles understood that military conquest alone could not hold an empire together. He needed a system of laws and administration that would function efficiently and command loyalty. He issued numerous written laws and regulations that standardized legal practices throughout his empire. He ensured that his officials and military commanders followed consistent rules and procedures. He established a strong court system that allowed subjects to appeal to higher authorities if they believed they had been treated unjustly. These legal reforms created a sense of order and justice that had been absent from most of Europe for centuries. People believed that under Charles\'s rule, there was a real authority that would hold powerful nobles accountable if they abused their power.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Religion was central to Charles\'s vision of empire. He saw himself as divinely chosen to rule and as responsible for the spiritual as well as the material welfare of his people. He worked to ensure that every monastery and cathedral had adequate resources to function properly. He promoted the copying of manuscripts and the preservation of ancient texts, much of which would otherwise have been lost. He insisted that the clergy be educated and well-trained. He reformed monastic life to ensure that monks followed strict rules and devoted themselves to prayer and scholarship. Under Charles\'s patronage, monasteries became centers of learning and culture, preserving knowledge that might otherwise have been destroyed.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Empire\'s Legacy' },
      afbeelding: SCENE_IMAGES['charlemagne-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-7'],
          alt: { en: 'Three crowned brothers seated apart around a divided map.' },
          bijschrift: { en: 'Frankish custom split an inheritance between sons. An empire was no exception.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Charles died in 814, his empire did not survive intact. His son Louis, called Louis the Pious, inherited the throne but lacked his father\'s military genius and forceful personality. After Louis\'s death, his three sons divided the empire among themselves according to Frankish custom, creating separate kingdoms. Within a few generations, the great empire that Charles had built had fragmented into smaller kingdoms that would eventually become the nations of medieval and modern Europe. The Frankish empire itself did not last, but the impact of Charles\'s reign was permanent and transformative.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charlemagne\'s greatest legacy was not a lasting political empire but a vision of what Europe could be. He demonstrated that western Europe could be united under a single ruler and that such unity could create stability, prosperity, and cultural advancement. He showed that knowledge and learning were valuable and worth supporting. He proved that a ruler could use his power not just for conquest but for constructive purposes: creating better laws, improving infrastructure, and promoting education and the arts. The institutions he created—the palace school, the reformed monasteries, the standardized legal system—outlasted his empire itself. European rulers for centuries afterward sought to emulate what Charlemagne had accomplished. His name became synonymous with greatness and the possibility of bringing order and civilization to a fragmented world.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'Father of Europe' },
      afbeelding: SCENE_IMAGES['charlemagne-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charlemagne-8'],
          alt: { en: 'An empty stone throne on the gallery above the octagon of Aachen chapel.' },
          bijschrift: { en: 'Thirty German kings were crowned in this chapel after him.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'More than twelve hundred years after his death, Charlemagne is remembered as one of the most important figures in European history. He is often called "the Father of Europe" because he united the continent and established patterns and institutions that would define European civilization for centuries. Students of history study his reign to understand how medieval Europe developed and how the modern European nations emerged from the fragments of his empire. His palace at Aachen still stands as a symbol of his vision and his ambition. The German city of Aachen celebrates his legacy and hosts many visitors each year who come to see the magnificent cathedral he built.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Charlemagne\'s story reminds us that individuals can shape history through vision, determination, and hard work. He was born into a warrior culture but chose to use his power to do more than simply conquer and dominate. He built institutions, supported learning, and created systems of law and governance that improved the lives of people throughout his realm. He was not perfect—his methods were often brutal by modern standards, and his conquest of the Saxons involved mass killing and forced religious conversion. Yet his overall impact on European civilization was immensely positive. He proved that unified leadership could bring stability and progress to a fractured and struggling continent. This lesson remains relevant today, as nations around the world continue to grapple with questions of unity, governance, and how to promote human flourishing across diverse populations.' }
        }
      ]
    }
  ]
};

export const richardTheLionheart: Verhaal = {
  id: 'richard-the-lionheart',
  beginJaar: 1157,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Richard the Lionheart' },
  ondertitel: { en: 'The Crusader King of England' },
  teaser: { en: 'A legendary medieval warrior king who led the Third Crusade and became an icon of chivalry.' },
  jaar: 1199,
  periodeLabel: '1157 - 1199',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['richard-the-lionheart'],
  portretKleur: '#CD5C5C',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'middeleeuwen',
  themas: ['oorlog', 'ridderlijkheid', 'Kruistochten', 'Engeland', 'avontuur'],
  leestijdMinuten: 9,
  personage: { naam: 'Richard I' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Prince of a Great Dynasty' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-1'],
          alt: { en: 'A boy riding through the vineyards of Aquitaine with the queen and her retinue.' },
          bijschrift: { en: 'He grew up as his mother’s heir in Aquitaine, not as a future king of England.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the year 1157, a boy was born who would become one of the most famous warriors in medieval history. Named Richard, he was the second son of King Henry II of England and Eleanor of Aquitaine. The English throne seemed destined for Richard\'s older brother, Henry, so Richard was initially expected to inherit his mother\'s vast territories in Aquitaine and southern France. He grew up in a world of power, politics, and endless warfare. The Angevin Empire, as it was called, stretched from Scotland to southern France, making the English king one of the most powerful rulers in Europe. However, family conflict and ambition would eventually thrust Richard onto the center stage of European politics.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As a young man, Richard was trained in all the skills expected of a medieval knight and nobleman. He learned to ride, to fight with sword and lance, to command armies, and to govern territories. He also received an education in languages, learning to speak not only English and French but also Latin, Occitan, and other tongues. He showed an early talent for military strategy and a passionate commitment to the ideals of chivalry—the code of honor that governed knightly behavior. Richard was known for his athletic abilities and his physical courage. He had a commanding presence and a natural ability to inspire loyalty in those who followed him. These qualities would serve him well when he inherited the throne.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Path to the Crown' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-2'],
          alt: { en: 'A red-haired prince crowned in a Romanesque abbey church.' },
          bijschrift: { en: 'Westminster, 1189. In a ten-year reign he would spend roughly six months in England.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As the young Prince Richard matured, tensions within the royal family increased. In 1183, Richard\'s older brother Henry died, suddenly changing Richard\'s circumstances. Richard was now the heir to the English throne. However, his father, King Henry II, favored Richard\'s younger brother John and seemed reluctant to give Richard the full authority and resources he felt he deserved. This conflict between father and son was not unusual in medieval royal families, but it created serious problems. In 1189, Richard joined with Philip II of France against his own father in a military campaign. The pressure proved too much for the aging King Henry II, who was forced to accept a peace treaty that granted Richard the territories and authority he demanded. Within weeks of the treaty, Henry died, and Richard became King of England.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As the new King Richard I, the young warrior had vast resources at his command. Unlike his father, Richard did not view his kingdom as a primarily French territory with an English crown attached to it. He was determined to prove himself as a great warrior and Christian king. Almost immediately, he heard a call that captured his imagination and his ambition. The Christian crusaders had lost control of Jerusalem, the holiest city in Christendom, to the Muslim leader Saladin. Pope Gregory VIII was calling for a new crusade to reclaim the holy land. This was not a distant religious concern but a matter that fired the imagination of Christian knights throughout Europe. Richard saw his opportunity to prove himself as a great Christian warrior and leader. He took the cross and began assembling one of the largest armies ever seen to undertake a crusade to the Holy Land.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Crusade Begins' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-3'],
          alt: { en: 'A crusader fleet beating through a Mediterranean storm past a rocky coast.' },
          bijschrift: { en: 'The storm that scattered his fleet also handed him Cyprus, which he took and then sold.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1190, Richard set out on the Third Crusade with thousands of knights, soldiers, and support personnel. The journey itself was dangerous and arduous. Richard\'s army traveled by sea and land, facing numerous obstacles and challenges. At one point, a storm wrecked Richard\'s fleet off the coast of Cyprus. Richard used the crisis as an opportunity to conquer the island, which he sold to finance his crusade. Nothing stopped the English king from pursuing his goal. When he arrived in the Holy Land, he found the crusade in disarray. The previous Crusade had been a disaster, with the Christian army destroyed and Jerusalem still in Muslim hands. The crusaders were demoralized and uncertain about their chances of success.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Richard immediately took command of the crusade and revitalized the Christian forces. His energy, his military expertise, and his absolute conviction in the justness of the crusade inspired the soldiers. He won a crucial victory against Saladin\'s forces at the Battle of Arsuf in 1191, demonstrating that the legendary Muslim commander could be defeated. The crusade\'s fortunes improved dramatically under Richard\'s leadership. He captured several important cities and fortifications, pushing deeper into Muslim-held territory. The crusaders came within sight of Jerusalem itself, the ultimate goal of the crusade. However, military reality ultimately prevented Richard from taking the city. Saladin\'s forces remained strong and well-positioned, and Richard\'s supply lines were stretched thin.' }
        },
        {
          type: 'citaat',
          tekst: { en: 'I am not made for this kind of work; I did not become king to hide in fortresses.' },
          bron: { en: 'Richard the Lionheart' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Truce and Retreat' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-4'],
          alt: { en: 'A crusader king on a ridge above the distant walled city of Jerusalem.' },
          bijschrift: { en: 'He came within sight of Jerusalem twice and turned back both times.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'After months of campaign in the Holy Land, Richard realized that while he could win battles, taking and holding Jerusalem was not practical with his current forces. In 1192, he negotiated a truce with Saladin that allowed Christian pilgrims to visit Jerusalem safely, though the city itself remained under Muslim control. It was not the complete victory that Richard had sought, but it was a remarkable achievement. He had taken control of much of the Palestinian coast and established Christian strongholds that would survive for years after his departure. He had proven himself a capable commander and a worthy opponent of the legendary Saladin. The crusade had accomplished more than anyone had expected when Richard arrived.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'However, Richard\'s journey home proved more dangerous than his campaign in the Holy Land. While returning to Europe by sea, a storm forced his ship to land near the territory of an enemy nobleman, the Duke of Austria. Richard was captured and held for ransom. His imprisonment lasted over a year, during which his mother Eleanor negotiated with his captors and arranged the payment of a massive ransom to secure his release. His younger brother John, meanwhile, took advantage of Richard\'s absence to seize parts of England and France. When Richard finally returned home, he found his kingdom threatened and his authority challenged. He had to use his military skills not against external enemies but against rebellious nobles and his own brother.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Warrior\'s Legacy' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-5'],
          alt: { en: 'A king in mail directing the siege of a small French castle.' },
          bijschrift: { en: 'A crossbow bolt at an unremarkable siege in the Limousin killed him at forty-one.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'After his return from captivity, Richard spent several years fighting to restore his authority in England and his territories in France. He was remarkably successful, defeating his enemies and reclaiming the lands that his brother had taken. He earned a fearsome reputation as a military commander, and his enemies learned to respect his power. However, these years of fighting in Europe were less glamorous and less meaningful to Richard than his crusade had been. He longed for another great religious war, another opportunity to prove himself as a champion of Christianity. The peace and stability of a well-governed kingdom seemed less exciting to him than the glory of battle.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Tragically, Richard\'s life as a warrior came to an abrupt and violent end. In 1199, while besieging a minor castle in France, he was struck by a crossbow bolt. The wound was serious but not immediately fatal. Richard, thinking like a warrior, actually forgave the archer who had shot him and ordered that the man be released. However, the wound became infected, and within days, Richard died. He was only forty-two years old, but he had already accomplished enough to secure his place in history. His reign had lasted only ten years, but those years had been filled with extraordinary military campaigns and adventures. He had led one of the great crusades, won famous battles against legendary opponents, and established himself as one of the most feared warriors in Europe.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'The Knight\'s Code' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-6'],
          alt: { en: 'An armoured king listening to a troubadour in a candlelit hall.' },
          bijschrift: { en: 'He wrote verse himself — two of his songs survive, one composed in captivity.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Richard the Lionheart became a legend partly because he seemed to embody the ideals of medieval chivalry. He was a warrior who was also educated and cultured. He appreciated poetry and music, and some of his own verses survive today. He was capable of both brutal violence in battle and mercy toward conquered enemies, showing the two sides of the knightly ideal. He treated his obligations to his allies seriously and expected the same from others. He believed that a true knight should be willing to suffer and sacrifice for just causes. He combined physical prowess with moral conviction in a way that captured the imagination of his contemporaries and has continued to fascinate people ever since.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The crusaders and pilgrims who traveled to the Holy Land in the medieval period saw themselves as soldiers of Christ, fighting to reclaim sacred territory for Christianity. Richard, as the leader of the Third Crusade, was seen as the champion of this great religious cause. While modern people may view the Crusades differently, understanding that they were destructive wars waged by one faith against another, Richard\'s contemporaries saw him as a hero engaged in sacred warfare. His reputation as "the Lionheart"—named for his courage and martial prowess—was earned through genuine military achievements and captured the admiration of people throughout Europe and the Middle East.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'After the King\'s Death' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-7'],
          alt: { en: 'A crowned king surrounded by hostile barons in a river meadow.' },
          bijschrift: { en: 'His brother John lost Normandy, Anjou and Maine within five years of his death.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Richard died, he left no legitimate children to inherit his throne. His brother John succeeded him as King of England, though he lacked Richard\'s military skill and charisma. John\'s reign was marked by conflicts with the French king, the English nobility, and the Church. John lost most of the Angevin territories in France that Richard had fought to maintain. He was forced to grant the Magna Carta in 1215, a document that limited royal power and established principles of rule of law that would become fundamental to English and later American democracy. In many ways, the contrast between Richard\'s glory and John\'s failures highlighted what an exceptional leader Richard had been.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Richard\'s memory, however, lived on. Ballads and stories about his adventures spread throughout Europe, growing in legend with each retelling. In popular imagination, Richard became a symbol of the perfect knight—brave, pious, honorable, and dedicated to great causes. Tales of his crusade spread far beyond those who had actually witnessed it. For centuries after his death, troubadours and storytellers recounted tales of Richard the Lionheart. He became as much a legend as a historical figure, representing an idealized vision of medieval knighthood that has never been entirely forgotten.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'An Eternal Hero' },
      afbeelding: SCENE_IMAGES['richard-the-lionheart-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['richard-the-lionheart-8'],
          alt: { en: 'A painted stone effigy of a crowned king on a tomb in an abbey church.' },
          bijschrift: { en: 'His body lies at Fontevraud, his heart at Rouen, and the rest of him at Châlus.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'More than eight hundred years after his death, Richard the Lionheart remains one of the most famous medieval warriors. His story has been retold in countless books, plays, films, and legends. In popular culture, he has been depicted as everything from a noble Christian hero to a greedy warmonger, depending on the perspective of the storyteller. What cannot be disputed is that Richard was an exceptional military commander, a devoted crusader by the standards of his time, and a man whose brief life had an outsized impact on European history. He represented the ideals of the medieval warrior: physical courage, martial skill, religious devotion, and a willingness to risk everything for glory and just causes.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Richard\'s legacy teaches us several lessons about power, courage, and the costs of warfare. He showed that a single capable leader can rally his people and accomplish great things, but also that warfare, however just it seems, brings suffering and destruction. He demonstrated that actions taken in youth can define a person\'s entire historical legacy. He proved that courage and determination matter, but that they must also be guided by wisdom and practicality. The image of Richard the Lionheart—mounted on a destrier, banner flying, charging toward the enemy—has become an enduring symbol of medieval warfare and the ideals of chivalry. Whether one sees him as a hero or a cautionary tale, Richard I remains an unforgettable figure in the tapestry of European history, forever the Lionheart.' }
        }
      ]
    }
  ]
};

export const genghisKhan: Verhaal = {
  id: 'genghis-khan',
  beginJaar: 1162,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Genghis Khan' },
  ondertitel: { en: 'From outcast boy to ruler of the largest land empire in history' },
  teaser: { en: 'Abandoned on the freezing steppe as a boy, he built an empire that would stretch from Korea to Hungary. How did one outcast unite the Mongols and shake the world?' },
  jaar: 1227,
  periodeLabel: 'c. 1162 - 1227',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['genghis-khan'],
  portretKleur: '#7A5230',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'middeleeuwen',
  themas: ['mongolen', 'rijk', 'oorlog', 'steppe', 'macht'],
  leestijdMinuten: 9,
  personage: { naam: 'Genghis Khan' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy Born on the Steppe' },
      afbeelding: SCENE_IMAGES['genghis-khan-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-1'],
          alt: { en: 'A Mongol mother with her small children gathering roots by a river on the cold, empty steppe.' },
          bijschrift: { en: 'The Onon River, around 1171: an abandoned family fights to survive.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1162, on the banks of the Onon River in what is now Mongolia, a boy was born to a chieftain named Yesügei and his wife Hö\'elün. They called him Temüjin. A later story says he came into the world clutching a clot of blood in his fist, a sign that he would become a great warrior. Whatever the truth, nothing about his early life suggested that he would one day rule half of Asia.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The steppe was a hard place. The Mongols were one of many nomadic peoples who moved with their herds of horses, sheep and goats between summer and winter pastures, living in round felt tents called gers. The clans raided each other constantly, stealing animals and women, and grudges were passed down from father to son.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Left to Die' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Temüjin was about nine, his father was poisoned by a group of Tatars who invited him to share a meal. Without their leader, the clan abandoned Yesügei\'s widow and children on the steppe, taking their animals with them. It should have been a death sentence. But Hö\'elün refused to give up. She fed her children on roots, wild onions, berries and fish, and taught them that their family had once been great.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hunger made the boys fierce. According to the oldest Mongol account of his life, Temüjin quarrelled with his half-brother Begter over a fish and a bird, and together with his brother Khasar he shot Begter dead with arrows. His mother was furious with them. Even as a boy, Temüjin would not accept anyone standing over him.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Almost everything we know about Temüjin\'s youth comes from \'The Secret History of the Mongols\', written by an unknown author a few decades after his death. It was meant only for the royal family, and its Mongolian text survived only in a Chinese transcription.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Escape and a Stolen Bride' },
      afbeelding: SCENE_IMAGES['genghis-khan-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-2'],
          alt: { en: 'A young man with a heavy wooden collar around his neck hiding in a cart piled with wool at night.' },
          bijschrift: { en: 'A prisoner of the Tayichiud: the escape that saved a future khan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As Temüjin grew older, a rival clan, the Tayichiud, came to see him as a threat. They captured him and locked a heavy wooden collar, called a cangue, around his neck. One night, during a feast, he struck his guard with the collar and escaped into the river, hiding with only his face above the water. A herdsman named Sorkan-shira found him, broke the collar and burned it, and hid him under a cart full of wool until the searchers gave up.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Long before, his father had arranged for Temüjin to marry a girl named Börte. Now, at about sixteen, he went to claim her. But soon afterwards, raiders from the Merkit tribe attacked his camp and carried Börte away. Temüjin had almost nothing: a few horses, his brothers and a handful of loyal friends.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Allies and a Blood Brother' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He turned to two men for help. Toghrul, the powerful khan of the Kerait people, had once been his father\'s sworn brother. Jamukha, a young chief of his own age, was Temüjin\'s anda, or blood brother; as boys they had exchanged gifts and sworn eternal friendship. Together their warriors attacked the Merkit and rescued Börte. Soon afterwards she gave birth to a son, Jochi. Some whispered that he was the child of a Merkit captor, but Temüjin always treated him as his own.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Börte remained Temüjin\'s most trusted adviser for the rest of his life. Only her four sons were ever considered as his heirs, although he had many other wives.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'A New Kind of Army' },
      afbeelding: SCENE_IMAGES['genghis-khan-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-3'],
          alt: { en: 'Rows of Mongol horse archers drawn up in disciplined units of ten on a wide plain.' },
          bijschrift: { en: 'Around 1200: loyalty to the leader, not to the clan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Temüjin\'s reputation grew, and warriors began to join him. What made him different from other chiefs was how he treated them. On the steppe, a man\'s place usually depended on his family. Temüjin promoted people for loyalty and ability, even if they came from humble families or from tribes he had defeated. Some of his best generals had once been his enemies.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He also reorganised his army. Soldiers were grouped in units of ten, a hundred, a thousand and ten thousand, and men from different clans were mixed together on purpose, so that their loyalty belonged to their commander rather than to their tribe. Discipline was strict. Loot was shared out fairly according to fixed rules, instead of being grabbed by whoever got there first.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Brothers Become Enemies' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This new way of doing things worried the old aristocracy, and it drove Temüjin and his blood brother Jamukha apart. Their friendship turned into a long and bitter rivalry. Step by step, Temüjin defeated his rivals: the Tatars who had murdered his father in 1202, his old protector Toghrul in 1203, and the powerful Naiman people in 1204.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Jamukha was finally betrayed by his own men and handed over. Temüjin executed the traitors for betraying their master. According to the Secret History, he offered Jamukha his friendship again, but Jamukha refused and asked to be killed without his blood being spilled, which the Mongols believed would allow his spirit to rest. Temüjin granted his wish.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Universal Ruler' },
      afbeelding: SCENE_IMAGES['genghis-khan-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-4'],
          alt: { en: 'A great assembly of Mongol chiefs on a riverbank raising a leader on white felt before a tall standard.' },
          bijschrift: { en: '1206: Temüjin becomes Genghis Khan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the spring of 1206, the chiefs of all the peoples of the steppe gathered at a great assembly, a kurultai, near the source of the Onon River, where Temüjin had been born. There they proclaimed him their supreme ruler with a new name: Chinggis Khan, usually written in English as Genghis Khan. The exact meaning is debated, but it is often translated as \'universal\' or \'fierce\' ruler.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1206,
          tekst: { en: 'A great assembly of the steppe peoples proclaims Temüjin as Genghis Khan, ruler of all the Mongols.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For the first time, the scattered clans of the steppe were one nation. Genghis Khan gave them laws, known as the Great Yasa, that forbade stealing livestock, kidnapping women and fighting among themselves. The Mongols had never written their language down. Genghis ordered a captured Uyghur scribe to adapt his people\'s script for Mongolian, and the result is still used in Inner Mongolia today.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Bodyguard of Ten Thousand' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Genghis Khan surrounded himself with an imperial guard of ten thousand men, chosen from the sons of commanders. They protected the khan, ran his camp and trained to become future generals. It also meant that the families of his leading men always had a son close to him, which made rebellion much less tempting.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Genghis Khan himself probably never learned to read or write. He made sure his sons and officials did.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Over the Great Wall' },
      afbeelding: SCENE_IMAGES['genghis-khan-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-5'],
          alt: { en: 'Mongol horsemen riding through a mountain pass towards a walled Chinese city in the distance.' },
          bijschrift: { en: '1211-1215: the Mongols turn on the rich empire of the Jin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'South of the steppe lay China, rich and divided. In the north ruled the Jin dynasty, whose emperors had long played the steppe peoples off against each other. Genghis Khan first attacked the smaller kingdom of the Western Xia, which submitted in 1210. Then, in 1211, he led his armies against the Jin.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Mongols were superb horsemen. Each warrior brought several horses so that he could switch to a fresh one, and an army could cover astonishing distances in a day. They shot powerful composite bows from the saddle, and they used fake retreats to lure enemies into traps. But walled cities were a problem: horsemen cannot ride over walls.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Learning to Take Cities' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Genghis Khan solved this the way he solved most problems: he recruited the people who knew how. Chinese engineers, often captured, built catapults and siege towers for him. In 1215 the Mongols captured the Jin capital Zhongdu, near modern Beijing. Much of the city was burned, and travellers later reported seeing the bones of the dead still piled outside its walls.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1215,
          tekst: { en: 'The Mongols capture Zhongdu, the capital of the Jin dynasty, near modern Beijing.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Among the prisoners taken in north China was a scholar named Yelü Chucai. He became one of Genghis Khan\'s advisers and is said to have persuaded the Mongols that taxing farmers was more profitable than turning their fields into pasture.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Caravan at Otrar' },
      afbeelding: SCENE_IMAGES['genghis-khan-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-6'],
          alt: { en: 'A Mongol army on the march past a burning city of domes and walls in Central Asia.' },
          bijschrift: { en: '1219-1221: revenge on the empire of Khwarazm.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To the west of the Mongols lay the empire of Khwarazm, ruled by Shah Muhammad II, which included much of modern Iran, Uzbekistan and Afghanistan. Genghis Khan first wanted trade with it. In 1218 he sent a caravan of about 450 merchants with silver, silk and furs. When it reached the border town of Otrar, the governor accused the merchants of being spies and had them killed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Genghis Khan sent envoys to demand justice. The shah had one of them executed and the others\' beards shaved off, a terrible insult. It was one of the worst decisions in history. In 1219 Genghis Khan marched west with perhaps 100,000 or more men, and over the next two years he destroyed the empire.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Terror as a Weapon' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Great cities fell one after another: Bukhara, Samarkand, Urgench, Merv, Nishapur. Cities that surrendered at once were usually spared, though they had to pay heavily. Those that resisted were often destroyed, their craftsmen carried off and the rest of the population killed. The death tolls given by medieval chroniclers run into the hundreds of thousands and are surely exaggerated, but the destruction was real, and some cities never recovered.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Mongols used this reputation on purpose. News of what happened to cities that resisted travelled ahead of the army, and many surrendered without a fight. Shah Muhammad fled westwards, chased by Mongol horsemen, and died on a small island in the Caspian Sea, abandoned and penniless.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1219,
          tekst: { en: 'Genghis Khan invades the empire of Khwarazm after his merchants are murdered at Otrar.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'An Empire of Roads' },
      afbeelding: SCENE_IMAGES['genghis-khan-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-7'],
          alt: { en: 'A Mongol rider handing a message to another rider at a relay station on the steppe.' },
          bijschrift: { en: 'The yam: fresh horses every day\'s ride across Asia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Conquering an empire is one thing; holding it together is another. Genghis Khan set up a system of relay stations called the yam. Every day\'s ride or so there was a station with fresh horses, food and shelter. Messengers carrying the khan\'s orders could cover long distances at remarkable speed by changing horses again and again.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Officials and important travellers carried a paiza, a tablet of wood, silver or gold, which showed that they had the khan\'s permission and entitled them to horses and supplies. Merchants were encouraged, because trade brought wealth and goods the nomads could not make themselves. Later travellers would write that under the Mongols a person could cross Asia more safely than ever before.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Many Gods, One Khan' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Mongols worshipped Tengri, the eternal blue sky, and had their own shamans. But Genghis Khan did not force his religion on anyone. Buddhists, Muslims, Christians and Daoists could practise their faiths, and religious leaders were often freed from taxes. This was less about kindness than about common sense: people who were left to pray in peace were less likely to rebel.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'The greatest joy a man can know is to conquer his enemies and drive them before him.' },
          bron: { en: 'Words attributed to Genghis Khan by the Persian historian Rashid al-Din, writing about eighty years after his death' },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Mongol trading networks may also have helped to spread the Black Death a century later. The plague travelled along the same roads as the merchants.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Hidden Grave' },
      afbeelding: SCENE_IMAGES['genghis-khan-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['genghis-khan-8'],
          alt: { en: 'A funeral procession of Mongol horsemen crossing empty green hills at dusk.' },
          bijschrift: { en: '1227: the khan is buried in a place no one may find.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1226 the old khan went to war one last time, against the Western Xia, who had refused to send troops for his campaign in the west. During the campaign he fell from his horse while hunting and was badly injured. He died in August 1227, aged about sixty-five, before the Xia capital fell. His army destroyed the kingdom anyway.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1227,
          tekst: { en: 'Genghis Khan dies during his campaign against the Western Xia kingdom.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His body was carried back to Mongolia and buried in a secret place, probably near the sacred mountain Burkhan Khaldun. Legends say that anyone who saw the funeral procession was killed, and that horses were driven over the grave to hide it. Whether that is true or not, the grave has never been found.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Largest Land Empire in History' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Genghis Khan had divided his lands among his sons, and his third son Ögedei became Great Khan. His descendants kept conquering. They took all of China, Korea, Persia and Russia, sacked Baghdad and reached Poland and Hungary. At its height, about fifty years after his death, the Mongol Empire stretched from the Pacific Ocean to Eastern Europe. It is the largest connected land empire that has ever existed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the lands he destroyed, Genghis Khan is remembered as one of history\'s great killers. In Mongolia he is the father of the nation, whose face is on banknotes and whose giant steel statue looks out over the steppe. Both memories are true.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'One of Genghis Khan\'s grandsons was Kublai Khan, who conquered southern China and welcomed a young traveller from Venice named Marco Polo to his court.' },
        },
      ],
    },
  ],
};

export const williamTheConqueror: Verhaal = {
  id: 'william-the-conqueror',
  beginJaar: 1028,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'William the Conqueror' },
  ondertitel: { en: 'The Norman duke who won England in a single day' },
  teaser: { en: 'Mocked as a tanner\'s grandson, he survived murder plots as a boy duke. Then, in October 1066, he gambled everything on one battle near Hastings.' },
  jaar: 1087,
  periodeLabel: 'c. 1028 - 1087',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['william-the-conqueror'],
  portretKleur: '#4E5B3A',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'middeleeuwen',
  themas: ['engeland', 'normandie', 'oorlog', 'koning', 'verovering'],
  leestijdMinuten: 8,
  personage: { naam: 'William the Conqueror' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Duke\'s Son' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-1'],
          alt: { en: 'A young woman washing cloth in a stream below a castle while a nobleman watches from the walls.' },
          bijschrift: { en: 'Falaise, around 1027: the duke and the tanner\'s daughter.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1028, in the town of Falaise in Normandy, a boy named William was born to Robert, the young duke of Normandy, and a woman called Herleva. They were not married. Herleva\'s father is usually said to have been a tanner, a man who made leather, a smelly and lowly trade. A later chronicler tells the romantic story that Robert first saw her from the castle walls as she washed clothes in the stream below.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Normandy was one of the most powerful territories in France. Its dukes were descended from Viking raiders who had settled there about a hundred years earlier; the name Normandy comes from \'Northmen\'. By William\'s time the Normans spoke French and were devout Christians, but they still had a reputation as fierce and restless warriors.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1035,
          tekst: { en: 'Duke Robert dies on his way back from a pilgrimage to Jerusalem. His son William, aged about seven, becomes duke of Normandy.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1035 Duke Robert decided to make a pilgrimage to Jerusalem. Before leaving, he made the Norman lords swear to accept his son as his heir. He never came back: he died on the return journey. William, aged about seven and illegitimate, was now duke of Normandy. His enemies called him William the Bastard.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'William never used the name \'the Conqueror\' himself. During his lifetime he was usually known as William the Bastard, a name his enemies used to mock him.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Boy Among Murderers' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-2'],
          alt: { en: 'A frightened boy hiding in a dark castle chamber while armed men burst through the door.' },
          bijschrift: { en: 'The 1040s: Normandy falls into chaos around its child duke.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A child duke was an invitation to violence. Norman lords seized land and castles, settled old feuds and fought each other. Several of the men appointed to protect William were murdered, one after another. According to a chronicler, his steward Osbern was killed in the very room where the young duke lay sleeping.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'William survived because a few loyal relatives hid him and because his overlord, King Henry I of France, supported him. In 1047, when William was about nineteen, a group of rebel barons tried to overthrow him. With King Henry\'s help, he crushed them at the battle of Val-ès-Dunes. From then on, William began to take control of his duchy.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Ruthless Lord' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He learned to be hard. When he besieged the town of Alençon, the defenders are said to have hung animal hides over the walls and beaten them, mocking his mother\'s family of tanners. When the town was taken, William had the hands and feet of the men who had insulted him cut off. The other defenders surrendered quickly after that.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1051 William married Matilda, the daughter of the powerful count of Flanders. The Pope opposed the marriage, perhaps because the couple were distant relatives. William went ahead anyway. In the end he and Matilda each founded an abbey in the town of Caen, and the marriage turned out to be a strong and loyal one.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Matilda was famously small. When her bones were measured in the nineteenth century, she was estimated to have been only about 1.52 metres tall.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'An Oath on Holy Relics' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-3'],
          alt: { en: 'An English nobleman swearing an oath with his hands on two reliquaries before a seated Norman duke.' },
          bijschrift: { en: 'Around 1064: the oath that William would never let Harold forget.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Across the Channel, England was ruled by King Edward the Confessor, a pious man who had spent many years in exile in Normandy. Edward was William\'s cousin once removed, and he had no children. William later claimed that in 1051 Edward had promised him the English throne.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The most powerful man in England, however, was Harold Godwinson, Earl of Wessex. Around 1064 Harold was in Normandy; the reason is still debated. According to Norman sources, he swore an oath to William on holy relics, promising to support William\'s claim to the English crown. An oath on relics was the most solemn promise a medieval Christian could make.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1066,
          tekst: { en: 'On 5 January King Edward the Confessor dies. The next day Harold Godwinson is crowned king of England.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 5 January 1066 Edward died. The English nobles chose Harold as their king, and he was crowned the very next day. To William, this was robbery and perjury. He decided to take England by force, and he persuaded the Pope to send him a papal banner, which made his invasion look like a holy cause.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Star with a Tail' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 1066 a bright comet appeared in the sky for about a week. People all over Europe saw it and took it as a sign of great change. We now know it was Halley\'s Comet, which returns roughly every 76 years. In England, many saw it as a warning of disaster.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Two Invasions' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-4'],
          alt: { en: 'A great fleet of Norman ships with striped sails crossing the Channel, packed with horses and soldiers.' },
          bijschrift: { en: 'September 1066: the Norman fleet finally sails.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'All summer William gathered an army in Normandy: Norman knights, but also adventurers from all over France, attracted by the promise of English land. Hundreds of ships were built to carry men, weapons and horses. Then the wind blew the wrong way for weeks, and the fleet could not sail.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The delay turned out to be lucky. In September another invader landed in the north of England: Harald Hardrada, the famous warrior king of Norway, who also claimed the English throne. King Harold marched north at astonishing speed and destroyed the Norwegian army at Stamford Bridge on 25 September. Hardrada was killed.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1066,
          tekst: { en: 'On 28 September, three days after the battle of Stamford Bridge in the north, William lands at Pevensey on the south coast of England.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Just two days later the wind changed in the Channel. William\'s fleet crossed overnight and landed unopposed at Pevensey, on the south coast, on 28 September. A later legend says that William stumbled and fell as he jumped ashore, and quickly turned the bad omen into a good one by grabbing the sand and declaring that he had seized England with both hands.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'William built a wooden castle and began burning the countryside around Hastings. Harold, hearing the news, rushed his tired army 400 kilometres back south. He might have done better to wait and gather more men. Instead he went straight for the invader.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Battle of Hastings' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-5'],
          alt: { en: 'Norman knights on horseback charging uphill against a wall of English shields and axes.' },
          bijschrift: { en: '14 October 1066: a battle that lasted all day.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the morning of 14 October 1066, the two armies met on a hill about ten kilometres from Hastings. They were probably roughly equal in size, perhaps 7,000 to 8,000 men each. Harold\'s men formed a shield wall along the top of the ridge, a solid line of overlapping shields with warriors swinging huge two-handed axes. William had archers and, above all, mounted knights.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'All day the Normans attacked uphill, and all day the shield wall held. At one point a rumour spread that William had been killed, and his army began to panic. William pushed back his helmet so that his men could see his face and rode among them shouting that he was alive.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Pretending to Run' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Twice, according to the Norman chroniclers, the Norman cavalry pretended to flee. Some English soldiers broke ranks to chase them down the hill, and the knights turned and cut them down. Slowly the shield wall grew thinner. Late in the afternoon Harold was killed, along with his two brothers, and the English army collapsed.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1066,
          tekst: { en: 'On 14 October William defeats and kills King Harold at the Battle of Hastings.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'The famous image of Harold being shot in the eye with an arrow comes from the Bayeux Tapestry, but historians still argue about whether the figure with the arrow is actually Harold.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'A Coronation in Flames' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-6'],
          alt: { en: 'Houses burning outside a great abbey church while inside a duke is crowned king at Christmas.' },
          bijschrift: { en: 'Westminster, Christmas Day 1066.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Victory at Hastings did not make William king at once. He marched slowly around London, burning towns and villages, until the English leaders came out to surrender. On Christmas Day 1066 he was crowned king in Westminster Abbey, the church Edward the Confessor had just built.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The ceremony went badly wrong. When the congregation shouted their approval, in English and in French, the Norman guards outside thought it was an attack. They set fire to the houses around the abbey. People fled the church, and William was left almost alone with the clergy, trembling, as they finished crowning him.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1066,
          tekst: { en: 'On Christmas Day William is crowned king of England in Westminster Abbey.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Castles Everywhere' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Normans were a small group ruling a hostile country of perhaps two million people, and they knew it. They built castles everywhere: first quick ones of earth and timber, later huge towers of stone. The most famous is the White Tower in London, the heart of the Tower of London. These castles were not just defences; they were a message about who was in charge.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'William brought stone from Caen in Normandy across the Channel to build some of his English castles and churches.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Harrying of the North' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-7'],
          alt: { en: 'Norman soldiers burning a farm and its barns in a bleak northern valley in winter.' },
          bijschrift: { en: 'Winter 1069-1070: a whole region laid waste.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The English did not accept their new king quietly. There were rebellions in the west and the north, often supported by Danish fleets. In 1069 rebels in Yorkshire, helped by the Danes, captured York and killed hundreds of Normans. William\'s answer was one of the most brutal campaigns in English history.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During the winter of 1069 to 1070, his soldiers systematically destroyed the north. They burned villages, crops and stores of food and killed livestock, so that no rebel army could live there. The chronicler Orderic Vitalis, writing a few decades later, claimed that more than 100,000 people died of famine. The number may be exaggerated, but years later many villages in the region were still recorded as empty.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A New Ruling Class' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the end of William\'s reign, almost all the great English landowners had been replaced by Normans and other Frenchmen, and nearly every bishop was a foreigner. The language of the court, the law and the nobility became French. Ordinary people kept speaking English, but it changed forever, absorbing thousands of French words.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'You can still hear the conquest in English. The animals in the field kept their old English names, like cow, pig and sheep, while the meat served at the Norman lord\'s table got French ones: beef, pork and mutton.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Great Survey' },
      afbeelding: SCENE_IMAGES['william-the-conqueror-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['william-the-conqueror-8'],
          alt: { en: 'Royal clerks writing in a great book by candlelight, surrounded by piles of parchment and tally sticks.' },
          bijschrift: { en: '1086: the Domesday Book records a whole kingdom.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Christmas 1085, William ordered something no medieval ruler had ever done on such a scale. He sent officials into every county of England to find out who held what land, how many people lived there, and what it was all worth, down to the number of ploughs, mills and pigs. The results were written up in a great survey.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1086,
          tekst: { en: 'The Domesday survey records the land, people and wealth of almost all of England.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The English called it the Domesday Book, because like the Day of Judgement there was no appeal against what it said. It still survives in the National Archives in London and is the most detailed record of any country in medieval Europe. Many English villages appear in history for the very first time in its pages.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Undignified End' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1087 William was fighting the king of France and burned the town of Mantes. As he rode through the ruins, he was badly injured, perhaps when his horse stumbled and the saddle struck his stomach. He was carried to Rouen and died there on 9 September 1087, aged about fifty-nine. His sons rushed off to secure their inheritances, and his body was left almost alone.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Even his funeral at Caen was a disaster. A fire broke out in the town, and then a man interrupted the service to claim that the church stood on land William had stolen from his father. Finally, according to Orderic Vitalis, the stone coffin was too small: as the monks forced the swollen body in, it burst, and the church filled with such a stench that the service was hurried to an end.',
          },
        },
      ],
    },
  ],
};

export const saladin: Verhaal = {
  id: 'saladin',
  beginJaar: 1137,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Saladin' },
  ondertitel: { en: 'The sultan who retook Jerusalem and won the respect of his enemies' },
  teaser: { en: 'He united Egypt and Syria, crushed the crusaders at Hattin and took back Jerusalem without a massacre. Why did even his enemies sing his praises?' },
  jaar: 1193,
  periodeLabel: '1137 - 1193',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['saladin'],
  portretKleur: '#2F6B5E',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'middeleeuwen',
  themas: ['kruistochten', 'jeruzalem', 'sultan', 'oorlog', 'ridderlijkheid'],
  leestijdMinuten: 8,
  personage: { naam: 'Saladin' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Kurdish Boy from Tikrit' },
      afbeelding: SCENE_IMAGES['saladin-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-1'],
          alt: { en: 'A family leaving a riverside fortress by night with horses and camels.' },
          bijschrift: { en: 'Tikrit, 1137: a family forced to flee the night a son is born.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin\'s real name was Yusuf ibn Ayyub. He was born in 1137 or 1138 in Tikrit, a fortress town on the Tigris River in what is now Iraq, into a Kurdish family of soldiers. His father Ayyub was governor of the fortress. According to an old story, the family had to flee Tikrit the very night Yusuf was born, because his uncle Shirkuh had killed a man in a quarrel.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The family found service with Zengi, a powerful Turkish lord in northern Syria, and later with his son Nur ad-Din, ruler of Aleppo and Damascus. Yusuf grew up in Damascus, one of the great cities of the Islamic world. As a young man he was said to be more interested in religion and learning than in war.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Land Divided' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Middle East of his youth was deeply divided. In 1099 the knights of the First Crusade had captured Jerusalem and massacred many of its Muslim and Jewish inhabitants. They had set up four Christian states along the coast, known as the crusader states. The Muslim world was split between rival rulers, and between the Sunni caliph in Baghdad and the rival Shia caliph of the Fatimid dynasty in Cairo.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Saladin is the European version of his honorary title Salah ad-Din, which means \'righteousness of the faith\'.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Master of Egypt' },
      afbeelding: SCENE_IMAGES['saladin-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-2'],
          alt: { en: 'A young commander in a turban standing in a palace hall in Cairo as officials bow to him.' },
          bijschrift: { en: 'Cairo, 1169: a reluctant soldier becomes vizier of Egypt.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Egypt was rich but weak, and both the crusaders and Nur ad-Din wanted to control it. In the 1160s Nur ad-Din sent Shirkuh to Egypt three times, and the young Yusuf went with his uncle. He later said he went \'like a man being led to his death\'. In 1169 Shirkuh became vizier, the chief minister of the Fatimid caliph, but he died just two months later.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To everyone\'s surprise, the caliph appointed the nephew, aged about thirty-one, as the new vizier. Perhaps the Egyptian courtiers thought he would be easy to control. They were wrong. Saladin crushed a rebellion of the caliph\'s African guards and took firm control of the country.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1171,
          tekst: { en: 'Saladin ends the Shia Fatimid caliphate in Egypt, which had ruled for two centuries.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1171, as the last Fatimid caliph lay dying, Saladin ordered that Friday prayers in Egypt be said in the name of the Sunni caliph of Baghdad. Two hundred years of Fatimid rule ended quietly. Officially Saladin was still Nur ad-Din\'s servant, but relations between the two grew tense. Nur ad-Din suspected that his general wanted to rule Egypt for himself.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Saladin began building the great Citadel of Cairo on a hill above the city. It remained the seat of Egypt\'s rulers for nearly 700 years.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Uniting the Muslim World' },
      afbeelding: SCENE_IMAGES['saladin-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-3'],
          alt: { en: 'A sultan on horseback leading his army into the gates of Damascus as crowds cheer.' },
          bijschrift: { en: '1174: after Nur ad-Din\'s death, Saladin takes Damascus.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1174 Nur ad-Din died, leaving an eleven-year-old son. Saladin marched to Damascus and took control of it. Over the next twelve years he fought, negotiated and married his way to power over Aleppo, Mosul and the rest of Syria and northern Iraq. By 1186 he ruled an empire that surrounded the crusader states.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin presented himself as the leader of a holy war, a jihad, to recover Jerusalem, the third holiest city in Islam. Some of his rivals accused him of spending more time fighting fellow Muslims than Christians, and there was truth in that. But by uniting Egypt and Syria he changed the balance of power in the region.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Defeated by a Leper King' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin was not always victorious. In 1177 he invaded the kingdom of Jerusalem, whose king, Baldwin IV, was a sixteen-year-old suffering from leprosy. At Montgisard, near Ramla, Baldwin and his knights caught Saladin\'s army by surprise and routed it. Saladin barely escaped, riding a fast camel, and had to rebuild his forces.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1177,
          tekst: { en: 'At Montgisard the young leper king Baldwin IV of Jerusalem defeats Saladin\'s army.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Thirst at Hattin' },
      afbeelding: SCENE_IMAGES['saladin-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-4'],
          alt: { en: 'Exhausted crusader knights on a dry hillside surrounded by smoke from burning grass under a blazing sun.' },
          bijschrift: { en: '4 July 1187: the Horns of Hattin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A Christian lord named Reynald of Châtillon gave Saladin his chance. Reynald had raided Muslim caravans and even sent ships into the Red Sea to threaten Mecca and Medina. Early in 1187, during a truce, he attacked another caravan. Saladin swore that he would kill Reynald with his own hand, and he gathered the largest army he had ever commanded.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1187 Saladin besieged Tiberias, beside the Sea of Galilee. The crusader army under King Guy of Jerusalem marched out to save it, across dry hills in the summer heat. Saladin\'s men blocked the way to the water, harassed them with arrows and set fire to the dry grass so that smoke blew into the thirsty knights\' faces.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1187,
          tekst: { en: 'On 4 July Saladin destroys the army of the kingdom of Jerusalem at the Horns of Hattin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 4 July, on a hill with two peaks called the Horns of Hattin, the crusader army was destroyed. King Guy and Reynald were brought to Saladin\'s tent. Saladin offered the exhausted king a cup of iced water. When Guy passed it to Reynald, Saladin made it clear that he had not offered it to Reynald himself: by Arab custom, a man who has been given food or drink by his captor is under his protection. Saladin then killed Reynald. To Guy he said that kings do not kill kings.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'At Hattin the crusaders also lost the True Cross, a relic believed to be part of the cross on which Jesus died. It was carried into every battle, and it was never seen again.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Jerusalem Without a Massacre' },
      afbeelding: SCENE_IMAGES['saladin-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-5'],
          alt: { en: 'Families of Christian refugees leaving through a gate of Jerusalem as Muslim soldiers stand aside.' },
          bijschrift: { en: '2 October 1187: Jerusalem surrenders to Saladin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Hattin the crusader kingdom had almost no soldiers left. Town after town surrendered. In September 1187 Saladin reached Jerusalem. Its defence was led by a nobleman named Balian of Ibelin, who knighted every boy and man of noble birth he could find to man the walls.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Saladin\'s engineers broke through the wall, Balian came to negotiate. According to an Arab chronicler, he threatened to kill the Muslim prisoners, destroy the holy places and fight to the death if no terms were given. Saladin agreed to a surrender: the inhabitants could leave if they paid a ransom.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1187,
          tekst: { en: 'On 2 October Jerusalem surrenders to Saladin, 88 years after the crusaders took it.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 2 October 1187 Saladin entered Jerusalem. Christian writers themselves noted the contrast with 1099, when the crusaders had slaughtered the city\'s people. Thousands who could not pay were sold into slavery, but thousands more were let go. Saladin\'s brother asked for a thousand poor people as a gift and freed them, and Saladin himself released many old people and widows.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Freedom of Worship' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The great golden cross was taken down from the Dome of the Rock, and the city\'s mosques were cleansed with rosewater. But Saladin did not destroy the Church of the Holy Sepulchre, the holiest site in Christianity, and he later allowed Christian pilgrims to visit it. He also invited Jews to resettle in the city.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Lionheart Arrives' },
      afbeelding: SCENE_IMAGES['saladin-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-6'],
          alt: { en: 'Crusader ships arriving at a besieged harbour city as the two armies face each other on the plain.' },
          bijschrift: { en: 'Acre, 1191: the Third Crusade.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The fall of Jerusalem shocked Europe. The Pope called a new crusade, and three of the most powerful rulers in Christendom took the cross: the German emperor Frederick Barbarossa, King Philip II of France and King Richard I of England, known as the Lionheart. Barbarossa drowned crossing a river in Anatolia, and most of his army went home.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Meanwhile King Guy, released by Saladin on the promise that he would never fight again, went back on his word and besieged the port of Acre in 1189. Saladin besieged the besiegers. For two years the armies were locked together around the city in a war of hunger, disease and endless fighting.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1191,
          tekst: { en: 'Acre surrenders to the crusaders after a two-year siege, soon after Richard the Lionheart arrives.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Philip and Richard arrived in 1191, and in July Acre surrendered. Negotiations over the exchange of prisoners and the True Cross dragged on. In August Richard, losing patience, had about 2,700 Muslim prisoners killed in sight of Saladin\'s army. It was the darkest moment of the war.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Two Great Opponents' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin and Richard never met in person. But they sent each other messages and gifts, and Richard negotiated often with Saladin\'s brother al-Adil. Richard won a battle at Arsuf in September 1191 and twice marched within reach of Jerusalem, but each time he turned back, knowing that even if he took the city, he could never hold it once his army sailed home.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'A Gift of Horses' },
      afbeelding: SCENE_IMAGES['saladin-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-7'],
          alt: { en: 'A Muslim groom leading two fine horses through the battle lines towards a crusader king on foot.' },
          bijschrift: { en: 'Jaffa, 1192: a gift in the middle of a battle.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the summer of 1192 Saladin attacked the port of Jaffa. Richard rushed there by sea and leapt into the water to lead the counter-attack. In the battle that followed, Richard\'s horse was killed under him. According to the chroniclers, Saladin\'s brother sent him two fine horses so that the king would not have to fight on foot.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Whether the story happened exactly as told or not, it shows how the two sides came to see each other. Both kings were exhausted, both armies were sick and both had problems at home. Richard fell ill with fever; Saladin is said to have sent him fresh fruit and snow from the mountains to cool his drinks.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1192,
          tekst: { en: 'The Treaty of Jaffa ends the Third Crusade. Jerusalem stays under Saladin, and Christian pilgrims may visit it freely.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 2 September 1192 they agreed the Treaty of Jaffa, a truce of three years. The crusaders kept a strip of coast from Tyre to Jaffa. Jerusalem remained in Muslim hands, but unarmed Christian pilgrims would be allowed to visit the holy places. Richard sailed home in October, and never saw the Holy Land again.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Not Enough for a Funeral' },
      afbeelding: SCENE_IMAGES['saladin-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['saladin-8'],
          alt: { en: 'A simple wooden coffin in a quiet courtyard in Damascus, mourners standing in silence.' },
          bijschrift: { en: 'Damascus, March 1193.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin returned to Damascus, worn out by years of war. In February 1193 he fell ill with a fever, and on 4 March he died, aged about fifty-five. His biographer and friend Baha ad-Din ibn Shaddad, who was at his bedside, wrote that the city mourned him as no ruler had been mourned before.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saladin had been famously generous, giving away huge sums to his soldiers, scholars and the poor. When his treasury was opened after his death, it is said to have held just one gold coin and 47 silver ones. There was not enough to pay for his funeral, and money had to be borrowed to bury him.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'He was sweet-tempered, and generous in giving.' },
          bron: { en: 'Baha ad-Din ibn Shaddad, Saladin\'s friend and biographer' },
        },
        {
          type: 'kop',
          tekst: { en: 'Admired by His Enemies' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His empire did not last long; his sons and brothers soon divided it among themselves. But his reputation grew, and strangely it grew most of all in Europe. Medieval Christian writers turned him into a model of the chivalrous knight, and the Italian poet Dante placed him among the noble souls of the non-Christian world, beside the great heroes and thinkers of the ancient world.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Saladin\'s tomb stands in a small garden beside the Umayyad Mosque in Damascus. In 1898 the German emperor Wilhelm II paid for a new marble coffin, but Saladin\'s body still lies in the original wooden one.' },
        },
      ],
    },
  ],
};

export const marcoPolo: Verhaal = {
  id: 'marco-polo',
  beginJaar: 1254,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Marco Polo' },
  ondertitel: { en: 'The Venetian who travelled to the court of Kublai Khan' },
  teaser: { en: 'At seventeen he set out for China and did not come home for twenty-four years. Then he told his story in a prison cell, and Europe could hardly believe it.' },
  jaar: 1324,
  periodeLabel: '1254 - 1324',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['marco-polo'],
  portretKleur: '#8A3B2E',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'middeleeuwen',
  themas: ['reizen', 'handel', 'china', 'venetie', 'ontdekking'],
  leestijdMinuten: 7,
  personage: { naam: 'Marco Polo' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy in Venice' },
      afbeelding: SCENE_IMAGES['marco-polo-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-1'],
          alt: { en: 'Two merchants in travel-worn clothes returning to a busy Venetian quay where a teenage boy waits.' },
          bijschrift: { en: 'Venice, 1269: a father returns after fifteen years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marco Polo was born in 1254 in Venice, the richest trading city in Europe. Venetian merchants sailed to Constantinople, the Black Sea and the ports of the Middle East, bringing back silk, spices and precious stones from the East. The Polo family were merchants too, and Marco\'s father Niccolò and uncle Maffeo were away on a trading journey when he was born.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'They were gone for fifteen years. War blocked their way home, so they travelled further and further east until they reached the court of Kublai Khan, grandson of Genghis Khan and ruler of the Mongol Empire. Kublai had never met Europeans and was curious about them. He sent the brothers back with a letter to the Pope, asking for a hundred learned men to teach his people about Christianity, and for oil from the lamp that burned at Christ\'s tomb in Jerusalem.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Niccolò finally came home in 1269, he found that his wife had died. His son Marco was fifteen, a boy he had never seen.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'We know almost nothing about Marco Polo\'s childhood, not even exactly where in Venice he was born. Even the claim that his family came from the Dalmatian coast is uncertain.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Into the Desert' },
      afbeelding: SCENE_IMAGES['marco-polo-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-2'],
          alt: { en: 'A small caravan of camels crossing endless sand dunes under a starry sky.' },
          bijschrift: { en: 'Around 1273: the desert of voices.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1271 the brothers set out again for Kublai\'s court, and this time they took the seventeen-year-old Marco with them. The Pope sent two friars instead of a hundred scholars, and they turned back almost at once, frightened by war in Armenia. The Polos went on alone, carrying holy oil from Jerusalem as a gift for the khan.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1271,
          tekst: { en: 'Seventeen-year-old Marco Polo leaves with his father and uncle for the court of Kublai Khan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Their journey took about three and a half years. They crossed Persia, perhaps went down to the port of Hormuz and back, climbed over the high Pamir mountains, which Marco called \'the roof of the world\', and crossed the deserts of Central Asia. At one point, Marco wrote, he fell ill and spent a year recovering in the mountains.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Spirits in the Sand' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The most frightening part was the desert of Lop, at the edge of the Taklamakan. Travellers said that at night they heard voices calling their names, and the sound of drums and weapons, and that anyone who wandered off to follow them was lost forever. Modern travellers have reported strange sounds in the desert too, probably caused by shifting sand.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Marco described sheep in the Pamir mountains with horns more than a metre long. The species, a wild mountain sheep, is now named after him: Ovis ammon polii, the Marco Polo sheep.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Palace of Xanadu' },
      afbeelding: SCENE_IMAGES['marco-polo-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-3'],
          alt: { en: 'Three Venetian travellers bowing before a great Mongol emperor in a splendid palace hall.' },
          bijschrift: { en: 'Shangdu, around 1275: the Polos meet Kublai Khan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1275 the travellers reached Kublai Khan\'s summer palace at Shangdu, in what is now Inner Mongolia. Marco described it as a marble palace with gilded halls, set in a great park with fountains and meadows full of deer, and a portable palace of bamboo that could be taken apart and moved. Five hundred years later the English poet Coleridge made it famous as \'Xanadu\'.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Kublai was then about sixty and ruled the largest empire on earth. He had moved his capital to China and was completing the conquest of the Song dynasty in the south. Marco says the khan welcomed them warmly and took a liking to the young man, who quickly learned languages and customs.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1275,
          tekst: { en: 'Marco Polo arrives at Shangdu, the summer palace of Kublai Khan.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Khan\'s Envoy' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marco claims that he spent the next seventeen years in Kublai\'s service, travelling on missions across China and beyond, and that he governed the city of Yangzhou for three years. Chinese records do not mention him by name, and historians doubt some of his claims. But many think he served as one of the many foreigners the Mongols used as officials, because they trusted outsiders more than the conquered Chinese.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Paper Money and Black Stones' },
      afbeelding: SCENE_IMAGES['marco-polo-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-4'],
          alt: { en: 'Merchants in a Chinese market paying with paper notes while a European traveller watches in amazement.' },
          bijschrift: { en: 'Wonders Europe had never seen.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Much of what Marco described seemed impossible to Europeans. People in China, he wrote, paid for things with pieces of paper printed with the khan\'s seal. This paper money was accepted everywhere, and anyone who refused it could be put to death. In Europe, money meant coins of gold or silver; the idea that paper could be worth something seemed absurd.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He also described black stones dug from mountains that burned like wood and gave off great heat. This was coal, which was used in China on a large scale centuries before it was common in Europe. He wrote about the relay system of horses and riders that carried messages across the empire, and about huge granaries where the khan stored grain to feed the poor in times of famine.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Greatest City in the World' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Above all Marco was amazed by the cities. Hangzhou, which he called Kinsay, had been the capital of the Song dynasty. He described it as the finest and noblest city in the world, with canals, a great lake with pleasure boats, bathhouses and markets selling everything imaginable. He claimed it had 12,000 bridges, which is certainly an exaggeration, but the city probably did have more than a million inhabitants, far more than any city in Europe.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Marco never mentions the Great Wall, tea or chopsticks, which some critics see as proof he never went to China. But much of the wall that tourists see today was built later, under the Ming dynasty.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Escorting a Princess' },
      afbeelding: SCENE_IMAGES['marco-polo-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-5'],
          alt: { en: 'A fleet of large Chinese junks setting sail from a busy southern harbour, a young princess on deck.' },
          bijschrift: { en: '1292: the long voyage home by sea.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After many years, the Polos wanted to go home, but Kublai did not want to let them go. Their chance came in 1292. The Mongol ruler of Persia, Arghun, a great-nephew of Kublai, had lost his wife and asked for a new bride from her tribe. A seventeen-year-old princess named Kököchin was chosen, and because the land routes were blocked by war, she would travel by sea.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Polos, experienced travellers, were allowed to escort her. They left from the great port of Quanzhou with a fleet of fourteen ships. The voyage through Southeast Asia, past Sumatra, Sri Lanka and India, took about two years. Storms, disease and attacks took a terrible toll. According to Marco, of some six hundred passengers and crew, only eighteen survived, although the princess was among them.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1292,
          tekst: { en: 'The Polos leave China by sea, escorting a Mongol princess to Persia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When they reached Persia, they discovered that Arghun had died. Kököchin married his son Ghazan instead. The Polos travelled on overland, and while they were on the way they learned that Kublai Khan had also died.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Strangers at the Door' },
      afbeelding: SCENE_IMAGES['marco-polo-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-6'],
          alt: { en: 'Three ragged travellers slitting open the seams of their coats, jewels spilling onto a table before astonished relatives.' },
          bijschrift: { en: 'Venice, 1295: the story of the hidden jewels.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1295, after twenty-four years away, the three Polos arrived back in Venice. Marco was now about forty-one. A famous story, first written down more than two centuries later, says that their relatives did not recognise the three men in their worn, strange clothes and refused to believe who they were.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'So the Polos invited them to a great feast. At the end of it they brought out their ragged coats and slit open the seams, and a stream of rubies, sapphires, diamonds and emeralds poured onto the table. They had carried their fortune sewn into their clothes all the way from China. After that, the story goes, no one doubted them.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1295,
          tekst: { en: 'Marco Polo returns to Venice after twenty-four years away.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Messer Millions' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marco told so many stories about the khan\'s millions of subjects, his millions in treasure and his millions of horses that, according to a later tradition, Venetians nicknamed him \'Il Milione\', the man of millions. The Italian version of his book is still known by that name.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'A Book from Prison' },
      afbeelding: SCENE_IMAGES['marco-polo-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-7'],
          alt: { en: 'Two prisoners in a stone cell, one talking while the other writes on parchment by the light of a window.' },
          bijschrift: { en: 'Genoa, 1298: a traveller and a storyteller in a prison cell.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Venice and its great rival Genoa were often at war. In 1298, according to tradition, Marco commanded a war galley and was captured by the Genoese, possibly at a sea battle near the island of Korčula. He was thrown into prison in Genoa. There he met a fellow prisoner, Rustichello of Pisa, a writer of popular romances about King Arthur and his knights.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marco told his story, and Rustichello wrote it down in French, the language of romance and adventure. The book was called \'The Description of the World\'. It was not really a travel diary but a description of the countries, peoples, animals, cities and wonders of Asia, from Armenia to Japan, which Marco had heard about but never visited.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1298,
          tekst: { en: 'In a prison in Genoa, Marco Polo dictates his travels to the writer Rustichello of Pisa.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Some of it was clearly exaggerated, and some was borrowed from other people\'s stories. But historians who have checked his descriptions of Chinese salt production, paper money and taxes have found them remarkably accurate, often more accurate than anything else written by a European at the time.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'No original manuscript survives. The book was copied by hand and translated many times, and the roughly 150 surviving versions all differ from each other.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Half of What I Saw' },
      afbeelding: SCENE_IMAGES['marco-polo-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marco-polo-8'],
          alt: { en: 'An explorer in a cabin studying a worn book about the East, a world map on the table.' },
          bijschrift: { en: 'Two centuries later, the book inspires a new voyage.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marco was released in 1299 and went back to Venice. He married, had three daughters and lived quietly as a merchant. He died in January 1324, aged about seventy, and left a modest fortune, as well as, his will reveals, a Mongol servant named Peter, whom he freed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many people did not believe his book. According to a story told by a Dominican friar, his friends gathered at his deathbed and begged him to take back his lies for the sake of his soul.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I have not told half of what I saw.' },
          bron: { en: 'Marco Polo on his deathbed, according to the friar Jacopo d\'Acqui' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Book That Changed the Map' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His book became one of the most widely read works of the late Middle Ages. Mapmakers used it to fill in Asia on their maps. And nearly two centuries after his death, a sailor from Genoa named Christopher Columbus read a printed copy and filled its margins with notes about gold, spices and the great island of Japan. When Columbus sailed west in 1492, he was looking for the lands that Marco Polo had described.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1324,
          tekst: { en: 'Marco Polo dies in Venice, aged about seventy.' },
        },
      ],
    },
  ],
};

export const mansaMusa: Verhaal = {
  id: 'mansa-musa',
  beginJaar: 1280,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Mansa Musa' },
  ondertitel: { en: 'The king of Mali whose pilgrimage crashed the price of gold' },
  teaser: { en: 'He crossed the Sahara with so much gold that he wrecked the economy of Cairo. Who was the African king some call the richest man who ever lived?' },
  jaar: 1337,
  periodeLabel: 'c. 1280 - c. 1337',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['mansa-musa'],
  portretKleur: '#B07D1E',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'middeleeuwen',
  themas: ['afrika', 'mali', 'goud', 'handel', 'islam'],
  leestijdMinuten: 8,
  personage: { naam: 'Mansa Musa' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Empire of Gold' },
      afbeelding: SCENE_IMAGES['mansa-musa-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-1'],
          alt: { en: 'Gold miners in West Africa washing river sand in calabashes beside a great river.' },
          bijschrift: { en: 'West Africa, around 1300: the gold that made Mali rich.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the early fourteenth century, one of the largest and richest empires in the world lay in West Africa. The empire of Mali stretched from the Atlantic coast deep into the Sahara and along the great Niger River, covering parts of what are now Mali, Senegal, Guinea, Mauritania and more. Its ruler was called the mansa, which means king or emperor.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mali\'s wealth came from gold. West Africa was then the main source of gold for the whole of Europe, North Africa and the Middle East. It was dug from mines and washed from rivers in regions to the south of the empire. Merchants carried it north across the Sahara on camels, and brought back salt, which was so scarce in the south that it could be worth its weight in gold.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Lion King of Mali' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The empire had been founded about a century earlier by Sundiata Keita, a hero whose life is still told by West African storytellers called griots. According to the epic, Sundiata was a disabled boy who could not walk, who grew up to defeat a cruel sorcerer-king and unite the Mande peoples. Mansa Musa was a descendant of Sundiata\'s family.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Much of Mali\'s history was passed down orally by griots, who memorise and perform family histories, songs and epics. Some griot families have done this for many generations.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The King Who Sailed Away' },
      afbeelding: SCENE_IMAGES['mansa-musa-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-2'],
          alt: { en: 'A great fleet of long wooden canoes setting off into the Atlantic Ocean from a West African beach.' },
          bijschrift: { en: 'Before 1312: a king sails west into the ocean and never returns.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Musa was born around 1280; the exact date is unknown. He came to power around 1312 in an unusual way, which he himself later described to an official in Cairo. The king before him, he said, did not believe that the Atlantic Ocean had no end. He wanted to know what lay on the other side.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'According to Musa, the king first sent out two hundred ships full of men, with enough gold and supplies to last for years. Only one ship came back. Its captain reported that the others had sailed into a great current in the middle of the ocean and disappeared. The king then equipped two thousand ships, one thousand for himself and his men and another thousand for supplies, left Musa in charge as his deputy, and sailed away. He was never seen again.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1312,
          tekst: { en: 'Around this year Musa becomes mansa of Mali, after the previous king sails into the Atlantic and never returns.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That is how Musa became king. Some modern writers have suggested that the fleet reached the Americas, long before Columbus, but there is no evidence of that. What the story does show is an empire wealthy and ambitious enough to imagine such a voyage.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The story was recorded by the Syrian scholar al-Umari, who spoke to people in Cairo who had met Mansa Musa. Almost everything we know about the king comes from Arab writers like him.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'A Caravan Like No Other' },
      afbeelding: SCENE_IMAGES['mansa-musa-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-3'],
          alt: { en: 'An enormous caravan of camels, people and banners crossing the Sahara desert in the glare of the sun.' },
          bijschrift: { en: '1324: the king of Mali sets out for Mecca.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mansa Musa was a devout Muslim. Islam had spread into West Africa over the centuries through traders, and the kings of Mali had adopted it, although many of their subjects kept their traditional beliefs. Every Muslim who can afford it is expected to make the hajj, the pilgrimage to Mecca, once in their life. In 1324 Musa set out on the journey of nearly 6,500 kilometres.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He did not travel lightly. Writers of the time describe a caravan of thousands of people: officials, soldiers, servants, wives and attendants. The numbers grew with each retelling, and some later accounts speak of tens of thousands. What everyone agreed on was the gold. The king brought tonnes of it, carried on camels, as gifts and to pay his way.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1324,
          tekst: { en: 'Mansa Musa sets out on his pilgrimage to Mecca with an enormous caravan loaded with gold.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Across the Sahara' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Crossing the Sahara was dangerous even for a small group of merchants. A caravan travelled from oasis to oasis and well to well, and could take months. Organising such a huge procession across the desert, keeping thousands of people and animals supplied with food and water, was itself a demonstration of the power and wealth of Mali.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Gold in Cairo' },
      afbeelding: SCENE_IMAGES['mansa-musa-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-4'],
          alt: { en: 'A West African king in white robes handing out gold to officials and merchants in a crowded Cairo street.' },
          bijschrift: { en: 'Cairo, July 1324: a visitor who gave gold to everyone.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1324 the caravan reached Cairo, then the largest city in the Muslim world and the capital of the Mamluk sultanate. Musa camped outside the city near the pyramids. The visit became legendary in Egypt, and people were still talking about it decades later.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'There was a moment of tension when Musa was invited to meet the sultan, al-Nasir Muhammad. Court etiquette required visitors to kneel and kiss the ground before the sultan. Musa refused at first: he would bow down only to God. In the end he prostrated himself, but made it clear that he did so before God, and the sultan received him with honour.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'This man flooded Cairo with his benefactions. He left no court emir nor holder of a royal office without the gift of a load of gold.' },
          bron: { en: 'al-Umari, writing about Mansa Musa\'s visit to Cairo' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Price of Gold Collapses' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Musa and his followers spent and gave away so much gold in Cairo that there was suddenly far more of it in the city than before. When something becomes plentiful, its value falls. The price of gold in Cairo dropped sharply. When al-Umari visited the city about twelve years later, he reported that it had still not recovered.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Musa\'s visit is one of the earliest recorded examples of a single person disturbing a whole city\'s economy. Economists still use it as an example of inflation.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Borrowing on the Way Home' },
      afbeelding: SCENE_IMAGES['mansa-musa-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-5'],
          alt: { en: 'A royal caravan arriving in the holy city of Mecca among crowds of white-clad pilgrims.' },
          bijschrift: { en: 'Mecca, 1324: the pilgrimage, and an empty treasury.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'From Cairo the caravan travelled on to Mecca and Medina, the holy cities of Islam, where Musa completed the pilgrimage. He gave generously there too, to the poor and to the holy places. The journey had been as much about faith as about display, and on the way he met scholars and men of learning.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the time he came back to Cairo on the return journey, something remarkable had happened: the richest king in the world had run out of money. He had given away, spent or lost so much that he had to borrow from Cairo\'s merchants, at very high interest, to get home. According to one report, this time his borrowing pushed the price of gold in Cairo back up.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Bringing Back Scholars' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Musa did not return home with treasure. He returned with people. He persuaded scholars, religious teachers and craftsmen to come back with him to Mali, including descendants of the Prophet Muhammad\'s family. Among them was a poet and architect from Andalusia, in Muslim Spain, named Abu Ishaq al-Sahili.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1325,
          tekst: { en: 'On his way back, Mansa Musa\'s generals bring the trading cities of Gao and Timbuktu firmly under Mali\'s control.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Timbuktu' },
      afbeelding: SCENE_IMAGES['mansa-musa-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-6'],
          alt: { en: 'A great earthen mosque with wooden beams sticking out of its walls in a desert city.' },
          bijschrift: { en: 'Timbuktu, around 1327: the Djinguereber Mosque.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Timbuktu, a trading town on the edge of the Sahara near the Niger River, Mansa Musa had a great mosque built: the Djinguereber Mosque. Tradition says that al-Sahili designed it and that the king paid him a huge sum of gold. Rebuilt and repaired many times, it still stands today, made of earth, straw and wood.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The building style of this region uses sun-dried mud bricks covered in a smooth layer of mud plaster. Wooden beams stick out of the walls. They strengthen the building, but they also act as a permanent scaffold: every year, after the rainy season, the community climbs on them to re-plaster the walls.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1327,
          tekst: { en: 'The Djinguereber Mosque is built in Timbuktu on the orders of Mansa Musa.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A City of Books' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Under Mali, and later under the Songhai empire that replaced it, Timbuktu grew into a famous centre of learning, with mosques, teachers and students from across Africa. Families collected manuscripts on religion, law, astronomy, medicine and mathematics. Hundreds of thousands of these manuscripts survive, and in 2012, when militants occupied the city, local librarians smuggled many of them to safety.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'For centuries Europeans imagined Timbuktu as a mysterious golden city at the end of the world. In English, \'from here to Timbuktu\' still means somewhere impossibly far away.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'A King on the Map' },
      afbeelding: SCENE_IMAGES['mansa-musa-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-7'],
          alt: { en: 'A medieval mapmaker painting a crowned African king holding a golden nugget onto a richly decorated map.' },
          bijschrift: { en: 'Majorca, 1375: Mansa Musa on the Catalan Atlas.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'News of Mansa Musa\'s pilgrimage spread far beyond the Muslim world. Merchants carried the story to the Mediterranean ports, and Europeans began to imagine a fabulously rich king in the heart of Africa, sitting on a mountain of gold.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1375, about forty years after his death, a Jewish mapmaker on the island of Majorca named Abraham Cresques produced a magnificent map of the known world, now called the Catalan Atlas. In the middle of West Africa sits a king wearing a golden crown and holding up a large golden nugget or orb. A caption describes him as the richest and noblest lord of all the land, because of the abundance of gold in his country.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1375,
          tekst: { en: 'The Catalan Atlas shows Mansa Musa holding a golden nugget in the middle of West Africa.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Richest Man Ever?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Modern articles often call Mansa Musa the richest person who ever lived. The truth is that it is impossible to calculate. His wealth cannot be separated from that of his empire, and no one knows how much gold he actually controlled. But the very fact that people still try to measure it shows how deep an impression he made.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'After Musa' },
      afbeelding: SCENE_IMAGES['mansa-musa-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['mansa-musa-8'],
          alt: { en: 'A North African traveller arriving at the court of Mali where a king sits beneath a silk canopy.' },
          bijschrift: { en: '1352: Ibn Battuta visits the court of Mali.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mansa Musa probably died around 1337, although some sources give other dates. Mali remained powerful for a while. In 1352 the famous Moroccan traveller Ibn Battuta visited the court of Musa\'s brother, Mansa Suleyman. He was not always impressed by the gifts he received, but he praised the safety of the roads.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'There is complete security in their country. Neither traveller nor inhabitant in it has anything to fear from robbers or men of violence.' },
          bron: { en: 'Ibn Battuta, describing Mali in 1352' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Over the following century Mali declined. Its rulers fought among themselves, and subject peoples broke away. The Songhai, based in the city of Gao, built a new empire that took over Timbuktu and the trade routes. Later, Portuguese ships began trading directly with the West African coast, and the gold that had once crossed the Sahara went by sea instead.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Legacy in Earth and Paper' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mansa Musa left no golden palace and no great tomb. His legacy is the mosque in Timbuktu, the tradition of learning that grew there, and the story of a king who crossed the desert with so much gold that the world had to take notice of Africa.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The modern country of Mali, which became independent in 1960, took its name from the medieval empire.' },
        },
      ],
    },
  ],
};

export const vladTheImpaler: Verhaal = {
  id: 'vlad-the-impaler',
  beginJaar: 1431,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Vlad the Impaler' },
  ondertitel: { en: 'The real prince behind the legend of Dracula' },
  teaser: { en: 'A hostage as a boy, a ruthless prince as a man, and centuries later the name behind the world\'s most famous vampire. Who was the real Dracula?' },
  jaar: 1477,
  periodeLabel: 'c. 1431 - 1477',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['vlad-the-impaler'],
  portretKleur: '#5E1F24',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'middeleeuwen',
  themas: ['dracula', 'walachije', 'oorlog', 'ottomanen', 'legende'],
  leestijdMinuten: 8,
  personage: { naam: 'Vlad the Impaler' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Son of the Dragon' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-1'],
          alt: { en: 'A nobleman being invested with a dragon medallion by a king in a great hall.' },
          bijschrift: { en: '1431: Vlad\'s father joins the Order of the Dragon.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Vlad was born around 1431, probably in the walled town of Sighișoara in Transylvania, in what is now Romania. His father, also called Vlad, was a claimant to the throne of Wallachia, a principality between the Carpathian Mountains and the Danube River. In the same year his father was admitted to the Order of the Dragon, a society of knights founded by the Holy Roman Emperor Sigismund to defend Christianity against the Ottoman Turks.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Because of this, the father became known as Vlad Dracul, from the Latin word draco, dragon. His son would be called Dracula: the son of Dracul. In Romanian \'drac\' can also mean devil, which may have added to the name\'s dark reputation later.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Caught Between Empires' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Wallachia was small and in a dangerous place. To the south lay the Ottoman Empire, which was conquering the Balkans step by step. To the north and west lay the kingdom of Hungary. Wallachian princes had to pay tribute to the sultan to survive, while Hungary demanded their loyalty too. Within Wallachia, powerful nobles called boyars constantly plotted to put their own candidates on the throne.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The house in Sighișoara where Vlad is believed to have been born still stands. Today it is a restaurant.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Hostage of the Sultan' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-2'],
          alt: { en: 'Two young brothers in fine clothes standing in the courtyard of an Ottoman palace among Turkish courtiers.' },
          bijschrift: { en: '1442: two Wallachian princes are left with the Ottomans.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1442 Vlad Dracul went to the court of the Ottoman sultan Murad II to prove his loyalty. The sultan held him for a while, then let him go, but kept two of his sons as hostages to guarantee their father\'s good behaviour: Vlad, about eleven years old, and his younger brother Radu, about seven.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The boys spent several years at the Ottoman court. They were educated, learned Turkish and studied the Quran, riding, and the art of war. But they also lived with the knowledge that if their father broke his word, they could be blinded or killed. Vlad is said to have been rebellious and was often punished. Radu, by contrast, adapted to life among the Ottomans and became a favourite of the sultan\'s son, the future Mehmed II.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1447,
          tekst: { en: 'Vlad\'s father is killed by rebellious nobles, and his elder brother Mircea is buried alive.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1447 disaster struck at home. Vlad Dracul was murdered on the orders of the Hungarian commander John Hunyadi, and his eldest son Mircea was blinded and, according to reports, buried alive by boyars of the town of Târgoviște. Vlad never forgot it.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A First, Short Reign' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1448, with Ottoman support, the teenage Vlad seized the throne of Wallachia. He lasted only about two months before Hunyadi\'s candidate drove him out. For eight years he lived in exile, moving between Moldavia, Transylvania and Hungary, and in the end, surprisingly, joining his father\'s murderer, Hunyadi, who needed allies against the Ottomans.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'A Prince Without Mercy' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-3'],
          alt: { en: 'A grim prince on a dark horse watching nobles in fine clothes being led away in chains past a stone church.' },
          bijschrift: { en: '1456: Vlad takes the throne of Wallachia again.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1456 Vlad finally took the throne of Wallachia again, with Hungarian help. This time he ruled for six years, and he set out to make his power absolute. He trusted no one, least of all the boyars, the nobles who had murdered his father and brother and made and unmade princes as they pleased.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A story told by the Byzantine historian Laonikos Chalkokondyles and repeated in Romanian tradition says that Vlad invited the boyars to an Easter feast and asked how many princes each of them had lived through. Some had seen seven, some even more. Vlad had the older ones killed, and the younger ones forced to work like slaves on rebuilding a castle in the mountains, until their fine clothes fell off them.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Death on a Stake' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His favourite punishment was impalement: the victim was forced onto a sharpened wooden stake and left to die slowly in public. Impalement was used elsewhere at the time, by the Ottomans among others, but Vlad used it on a scale that shocked even his own age. It earned him the name by which Romanians remember him: Vlad Țepeș, Vlad the Impaler.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Vlad never used the name Țepeș himself. He signed his letters as Vlad Dracula, or simply Vlad, prince of Wallachia.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Golden Cup' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-4'],
          alt: { en: 'A golden cup resting on the stone rim of a fountain in a quiet town square.' },
          bijschrift: { en: 'Legend: a golden cup no one dared to steal.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many stories about Vlad are hard to check. Some come from his enemies, some from folk tales told centuries later. But they show how people saw him: as a monster to some, and as a stern bringer of justice to others.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'One famous Romanian tale says that Vlad placed a golden cup beside a fountain in a town square so that travellers could drink from it. The cup stayed there for years. No one dared to steal it, because everyone knew what Vlad did to thieves. Another story says he invited the poor, the sick and the beggars of his land to a great feast, then locked the doors and burned the hall, declaring that now no one in his country would be poor.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Hero in Romania' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Abroad, Vlad became a byword for cruelty. In Romania he has often been remembered quite differently: as a ruler who stood up to the powerful Ottomans and the greedy boyars, and who made his country so orderly that you could leave gold in the street. Both images say more about the people who told the stories than about the man himself, but the cruelty is well documented.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The story of the turbans: Ottoman envoys are said to have refused to take off their turbans before Vlad, saying it was not their custom. Vlad supposedly had the turbans nailed to their heads, so that the custom would be strengthened.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'War with the Sultan' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-5'],
          alt: { en: 'Wallachian horsemen attacking an Ottoman camp at night, tents and torches in chaos.' },
          bijschrift: { en: 'June 1462: the night attack on the sultan\'s camp.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Vlad stopped paying tribute to the Ottomans, who were now ruled by Mehmed II, the sultan who had conquered Constantinople in 1453 and Vlad\'s companion from his hostage days. In the winter of 1461 to 1462, Vlad crossed the frozen Danube and attacked Ottoman territory along the river, burning towns and killing soldiers and civilians alike.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He reported the results himself in a letter to the king of Hungary, listing the dead town by town, with a total of 23,884 people, not counting those burned in their houses. He clearly wanted Hungary to see him as a great Christian warrior and send help.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1462,
          tekst: { en: 'Sultan Mehmed II invades Wallachia. Vlad\'s night attack on the Ottoman camp fails to kill the sultan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the spring of 1462, Mehmed invaded Wallachia with a huge army. Vlad could not face it in open battle. He retreated, burning villages and poisoning wells so that the enemy would find nothing to eat, and attacked small groups. On the night of 17 June he led a bold attack on the Ottoman camp itself, hoping to kill the sultan in his tent. Many were killed in the chaos, but the sultan survived.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Forest of the Impaled' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-6'],
          alt: { en: 'An Ottoman army halting in horror at the edge of a misty valley lined with thousands of tall wooden stakes.' },
          bijschrift: { en: 'Outside Târgoviște, 1462.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As the sultan\'s army approached Vlad\'s capital, Târgoviște, it came upon a terrible sight. According to the historian Chalkokondyles, a valley about three kilometres long was filled with stakes on which some twenty thousand prisoners had been impaled. The sultan, who was no stranger to war, is said to have remarked that he could not take a country from a man who did such things.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Yet Vlad\'s position collapsed. Many boyars went over to his younger brother Radu, who came with the Ottoman army and promised peace. Wallachians who were tired of war and terror followed. Vlad fled north into the mountains.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Castle on the Cliff' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A legend says that Vlad\'s wife threw herself from the walls of his mountain fortress, Poenari, into the river below rather than be captured by the Turks. There is no contemporary record of it. Poenari itself is real: a ruined castle high on a cliff above the Argeș River, reached today by climbing about 1,480 steps.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Bran Castle in Transylvania is sold to tourists as \'Dracula\'s Castle\'. Vlad may have passed through the area, but there is no evidence that he ever lived there.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Prisoner and Bestseller' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-7'],
          alt: { en: 'A man in a printing workshop pulling sheets showing woodcut pictures of a cruel prince.' },
          bijschrift: { en: 'Germany, 1460s onward: the first horror stories about Dracula.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Vlad fled to Hungary to ask King Matthias Corvinus for help. Instead, Matthias had him arrested, claiming to have found letters in which Vlad offered to submit to the sultan. They were probably forged. Vlad spent about twelve years as a prisoner or under guard in Hungary, while his brother Radu ruled Wallachia as an Ottoman vassal.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1462,
          tekst: { en: 'King Matthias Corvinus of Hungary has Vlad arrested. He is held for about twelve years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During those years Vlad became famous in a new way. In Germany, stories about his cruelty, many told by the Saxon merchants of Transylvania whom he had attacked, were printed as small pamphlets. Printing had just been invented, and these gruesome tales sold extremely well. They are among the very first printed bestsellers about a real living person.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Dinner Among the Dead' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The pamphlets had titles like \'The frightful tale of a wild bloodthirsty man, Dracula voivode\'. One famous woodcut shows him eating a meal surrounded by impaled victims. A Russian account, written by a diplomat who had visited Hungary, tells many of the same stories but presents Vlad more as a harsh but just ruler.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'From Prince to Vampire' },
      afbeelding: SCENE_IMAGES['vlad-the-impaler-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['vlad-the-impaler-8'],
          alt: { en: 'A writer at a desk late at night surrounded by books about the Carpathians, a candle burning low.' },
          bijschrift: { en: 'London, 1890s: Bram Stoker finds a name.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1475 Vlad was released, married a relative of the Hungarian king and converted to Catholicism. In November 1476 he regained the throne of Wallachia for the third time. It lasted only weeks. By January 1477 he was dead, killed in battle against the Ottomans or murdered near Bucharest. His head was reportedly sent to Constantinople as a trophy. Where his body lies is uncertain; tradition says the island monastery of Snagov.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1477,
          tekst: { en: 'Vlad is killed around the turn of the year 1476 to 1477, weeks after taking the throne for the third time.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Four centuries later, the Irish writer Bram Stoker was working on a vampire novel. In a library book about Wallachia and Moldavia, he came across the name Dracula and a note that it meant \'devil\'. He gave it to his vampire. Stoker\'s \'Dracula\', published in 1897, became one of the most famous novels ever written.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Vampire Who Never Was' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stoker seems to have known very little about the real Vlad, and his Count Dracula lives in Transylvania, not Wallachia. The historical Vlad was cruel even by the standards of his own violent age, but he was never accused of drinking blood or rising from the dead. That part of the legend was invented in London, not in the Carpathians.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Stoker never visited Romania. He researched his novel in libraries, including the reading room of the British Museum and the public library of the English seaside town of Whitby.' },
        },
      ],
    },
  ],
};

export const gutenberg: Verhaal = {
  id: 'johannes-gutenberg',
  beginJaar: 1400,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Johannes Gutenberg' },
  ondertitel: { en: 'The goldsmith whose printing press changed the world' },
  teaser: { en: 'Before him, every book was copied by hand. After him, ideas could spread faster than any king could stop them. Yet he died almost forgotten.' },
  jaar: 1468,
  periodeLabel: 'c. 1400 - 1468',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['johannes-gutenberg'],
  portretKleur: '#3D4A5C',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'middeleeuwen',
  themas: ['uitvinding', 'boekdrukkunst', 'bijbel', 'duitsland', 'kennis'],
  leestijdMinuten: 7,
  personage: { naam: 'Johannes Gutenberg' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A World of Handwritten Books' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-1'],
          alt: { en: 'Monks in a cold scriptorium copying books by hand at slanted desks.' },
          bijschrift: { en: 'Before Gutenberg: a book could take months to copy.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1400, in the German city of Mainz on the Rhine, a boy named Johannes Gensfleisch was born into a well-off family. The family was later known as zum Gutenberg, after the house where they lived. His father worked with the city\'s mint, and Johannes probably learned the skills of metalworking and goldsmithing, which would turn out to be vital.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In his world, books were rare and expensive. Every copy had to be written out by hand, letter by letter, by monks in monasteries or by professional scribes in towns. A large book like the Bible could take a scribe a year or more. A university library might own a few hundred books, and most ordinary people had never held one.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Demand Was Growing' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the fifteenth century, more people wanted books than ever before. Universities were growing, merchants needed to read and count, and more townspeople wanted prayer books of their own. Paper, which had come to Europe from the Islamic world, was now made in Europe and much cheaper than parchment made of animal skin. The world was ready for a faster way to make books.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'No portrait of Gutenberg was made during his lifetime. Every image of him, including his famous long beard, was invented by artists after his death.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Mirrors for Pilgrims' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-2'],
          alt: { en: 'Pilgrims in a crowded cathedral square holding up small metal mirrors towards relics shown from a balcony.' },
          bijschrift: { en: 'Aachen: pilgrims tried to catch the holy light in mirrors.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1434 Gutenberg was living in Strasbourg, after his family had been caught up in political conflicts in Mainz. There he started a business that tells us a lot about how his mind worked. Every few years, huge crowds of pilgrims travelled to the city of Aachen to see its holy relics. Many believed that a small mirror held up towards the relics would capture some of their holy power.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gutenberg and his partners planned to mass-produce these pilgrim mirrors from a metal alloy. It was about making many identical objects quickly and cheaply. Then the pilgrimage was postponed by a year because of plague, and the partners had to think of something else.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Secret Project' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1439 one of Gutenberg\'s partners died, and his brothers took Gutenberg to court. The records of the lawsuit survive. Witnesses mention a secret \'work\', a press, metal \'forms\' and money spent on lead. Gutenberg had ordered that certain pieces be taken apart so that no one could see what they were. Historians are almost certain he was already experimenting with printing.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1439,
          tekst: { en: 'Court records from Strasbourg reveal that Gutenberg is working on a secret project involving a press and metal pieces.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Letters Made of Metal' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-3'],
          alt: { en: 'A craftsman pouring molten metal into a small hand mould while rows of tiny metal letters cool on a bench.' },
          bijschrift: { en: 'The real invention: a mould to cast thousands of identical letters.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Printing with carved wooden blocks already existed in Europe, mainly for pictures with a few words. But carving a whole page into a block of wood was slow, and the block could print only that one page. Gutenberg\'s idea was to make every letter as a separate piece of metal. The letters could be set into words and lines, printed, and then taken apart and used again for the next page. This is called movable type.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The hardest part was making the letters. Gutenberg invented a hand mould: a small adjustable instrument into which a craftsman could pour molten metal and, within seconds, cast a letter. The same mould could make letters of different widths, an i and an m, all exactly the same height so that they would print evenly. Thousands of letters could be cast quickly.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Metal, Ink and a Press' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He also had to find the right metal: an alloy of lead, tin and antimony that melted easily but became hard. Ordinary ink, made for pens, ran off metal, so he developed a thick, oily ink, more like paint. And he adapted the screw press, already used for making wine and pressing paper, to push paper firmly and evenly onto the inked letters. No single part was the miracle. The genius was combining them all into a system.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Gutenberg was not the first to print with movable type. In China, Bi Sheng made clay movable type around 1040, and in Korea a Buddhist book was printed with metal type in 1377. But Gutenberg\'s system was far better suited to an alphabet of a few dozen letters.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Borrowed Money' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-4'],
          alt: { en: 'A wealthy merchant counting out gold coins on a table to a craftsman while a clerk records the loan.' },
          bijschrift: { en: 'Mainz, 1450: Johann Fust invests in the printing press.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By 1448 Gutenberg was back in Mainz. Building a printing workshop was enormously expensive: metal, paper, presses and the wages of workers all had to be paid long before a single book could be sold. In 1450 he borrowed 800 guilders from a rich Mainz businessman named Johann Fust, a huge sum, and a few years later another 800.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gutenberg\'s workshop printed small things first, such as Latin grammar books and calendars. In 1454 he printed letters of indulgence for the Church: forms that people bought and on which a clerk only had to fill in the buyer\'s name and the date. They were exactly the kind of job printing was perfect for, thousands of identical copies, and they brought in money.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1454,
          tekst: { en: 'Gutenberg\'s press prints letters of indulgence, some of the earliest printed documents in Europe that can be dated.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But Gutenberg had a far bigger plan. He wanted to print the most important book of all: the Bible, in Latin, as beautiful as the finest handwritten copies.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Gutenberg Bible' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-5'],
          alt: { en: 'A finished page of a printed Bible with two columns of black Gothic text and colourful painted initials.' },
          bijschrift: { en: 'Around 1455: a book that looked like a manuscript, but was printed.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Gutenberg Bible took several years to make. It has about 1,280 pages in two large volumes, with 42 lines of text in each column, which is why it is also called the 42-line Bible. Up to six compositors set the type, and several presses worked at the same time. Around 180 copies were printed: most on paper, some on expensive vellum, made from calfskin.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gutenberg wanted his Bible to look like a handwritten one. His type imitated the formal Gothic handwriting of scribes, and he cut almost 300 different characters, including joined letters and abbreviations, to make the lines look natural. The decorated initials and coloured headings were painted in by hand afterwards, so no two copies are exactly alike.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1455,
          tekst: { en: 'The Gutenberg Bible is finished in Mainz: the first major book printed in Europe with movable metal type.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'The script was very neat and legible, not at all difficult to follow. Your grace would be able to read it without effort, and indeed without glasses.' },
          bron: { en: 'Enea Silvio Piccolomini, the future Pope Pius II, after seeing pages of the Bible at Frankfurt in 1454' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Forty-nine copies of the Gutenberg Bible survive, complete or in large part. When one is sold, it is among the most expensive books in the world.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Losing Everything' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-6'],
          alt: { en: 'A craftsman standing alone in an emptying workshop as other men carry out his presses and type cases.' },
          bijschrift: { en: '1455: Fust takes Gutenberg to court and wins.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Just as his great work was finished, Gutenberg lost it. In 1455 Johann Fust sued him for the return of his loans with interest, more than 2,000 guilders. Gutenberg could not pay. The court decided in Fust\'s favour, and Fust took over the workshop, much of the equipment and probably the stock of Bibles.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Fust ran the business with Peter Schöffer, a skilled young man who had worked as Gutenberg\'s assistant and who later married Fust\'s daughter. In 1457 they published a splendid printed psalm book, the Mainz Psalter. It was the first printed book to name its printers and give a date, and the names on it were theirs, not Gutenberg\'s.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Why We Know So Little' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gutenberg never put his name on any of his books. Most of what we know about his life comes from legal and financial documents: lawsuits, loans and contracts. It is strange that the man who made it possible to record everything left so few records of himself.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Gutenberg probably went on printing on a smaller scale after he lost his workshop. Some historians believe he printed a large Latin dictionary, the Catholicon, in 1460, but this is still debated.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Art Escapes' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-7'],
          alt: { en: 'Soldiers storming a medieval Rhine city at night while craftsmen flee carrying tools and crates.' },
          bijschrift: { en: 'Mainz, 1462: printers flee and the secret spreads.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For a few years the new art stayed mostly in Mainz. Then war broke it open. In 1462 two rival archbishops fought for control of the city, and Mainz was stormed and sacked. Many citizens were killed or expelled, and printers who had learned the craft in Mainz scattered across Germany and beyond.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1462,
          tekst: { en: 'Mainz is sacked during a war between two archbishops. Printers flee and spread the new technique across Europe.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'They took Gutenberg\'s methods with them. Printing presses appeared in Cologne, Basel, Rome, Venice, Paris and Lyon. In 1476 William Caxton set up the first press in England, at Westminster. By 1500, less than fifty years after the Gutenberg Bible, presses were working in more than 250 European towns and had produced millions of books.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Faster Than Any King' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The effects were enormous. Books became cheaper, so more people learned to read. Scientists could share exact copies of their findings, with the same diagrams and numbers. Spelling and languages became more standardised. And ideas could now spread faster than any ruler could stop them. Sixty years after Gutenberg\'s Bible, Martin Luther\'s writings would race across Europe on printed pages and split the Church in two.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'A Pension of Grain and Wine' },
      afbeelding: SCENE_IMAGES['johannes-gutenberg-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['johannes-gutenberg-8'],
          alt: { en: 'An elderly man in a fur coat receiving a cask of wine and sacks of grain at a palace gate.' },
          bijschrift: { en: '1465: the archbishop honours the inventor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1465 Archbishop Adolf of Mainz made Gutenberg a member of his court, in recognition of his services. It came with a kind of pension: every year a new suit of court clothing, around 2,000 litres of grain and about 2,000 litres of wine, and freedom from certain taxes.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Gutenberg died on 3 February 1468, probably in his late sixties. He was buried in the Franciscan church in Mainz. The church was later demolished, and his grave was lost. He did not become rich from his invention, and for a long time others received the credit for it.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1468,
          tekst: { en: 'Johannes Gutenberg dies in Mainz. His grave is later lost when the church is demolished.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Man of the Millennium' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Today he is honoured everywhere. Mainz has a Gutenberg Museum and its university bears his name. At the end of the twentieth century, many historians and journalists named the printing press as the most important invention of the past thousand years, and Gutenberg as one of the most influential people who ever lived.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The word \'incunabula\', from the Latin for cradle, is used for books printed in Europe before 1501, in the cradle years of printing. About 30,000 different editions are known.' },
        },
      ],
    },
  ],
};

export const middeleeuwen: Verhaal[] = [joanOfArc, charlemagne, richardTheLionheart, genghisKhan, williamTheConqueror, saladin, marcoPolo, mansaMusa, vladTheImpaler, gutenberg];
