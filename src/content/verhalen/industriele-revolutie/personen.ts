import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

export const james: Verhaal = {
  id: 'james-watt',
  beginJaar: 1736,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'James Watt' },
  ondertitel: { en: 'Scottish Engineer Who Perfected the Steam Engine' },
  teaser: { en: 'A mind obsessed with efficiency transformed the world through steam.' },
  jaar: 1819,
  periodeLabel: '1736 - 1819',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['james-watt'],
  portretKleur: '#5B6B73',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'industriele-revolutie',
  themas: ['stoom', 'uitvinding', 'industrie', 'schotland', 'technologie'],
  leestijdMinuten: 8,
  personage: { naam: 'James Watt' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy Who Asked Questions' },
      afbeelding: SCENE_IMAGES['james-watt-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-1'],
          alt: { en: 'A boy watching steam lift a kettle lid in a Scottish shipwright’s workshop.' },
          bijschrift: { en: 'Greenock, in the 1740s. He was schooled mostly at home, and learned his hands in his father’s shop.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'James Watt was born on January 19, 1736, in Greenock, Scotland, during a time when the world was beginning to transform through mechanical innovation. His father, James Watt Sr., was a ship carpenter and merchant. His mother, Agnes Muirhead, came from a respected family. Young James showed an early curiosity about how things worked. He would spend hours observing the mechanical devices around him, asking questions that sometimes puzzled the adults in his life. Unlike many children his age who were content to accept things as they were, James wanted to understand the principles behind them.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'James received a basic education in reading, writing, and mathematics, but his greatest teacher was his own curiosity and observation. He watched blacksmiths, carpenters, and other craftsmen at work, learning the practical skills of making and repairing things. He developed an interest in mathematics and the sciences, studying them on his own when formal instruction was not available. When he was a teenager, James decided he wanted to become an instrument maker—someone who would build precision instruments for scientific research and navigation. To pursue this ambition, he traveled to London to apprentice with a renowned instrument maker. After a year of study, he returned to Scotland with the skills and knowledge he needed to establish himself in this trade.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Problem of Inefficiency' },
      afbeelding: SCENE_IMAGES['james-watt-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-2'],
          alt: { en: 'A brass model of an atmospheric steam engine on an instrument maker’s bench.' },
          bijschrift: { en: 'The university’s Newcomen model wasted most of its heat reheating the cylinder every single stroke.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the 1760s, James Watt was working as an instrument maker and repairer at the University of Glasgow. One day, he was asked to repair a model of a Newcomen steam engine—a device that had been invented by Thomas Newcomen decades earlier and was used to pump water out of mines. The Newcomen engine worked, but it was terribly inefficient. It wasted enormous amounts of fuel because it was constantly being heated and then cooled in the same chamber, requiring continuous firing of the furnace to keep it running.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'As Watt examined the engine, he began to think about the problem. Why did it waste so much fuel? The issue, he realized, was that every cycle required heating a massive cylinder and then cooling it—an enormously wasteful process. He began to calculate and think about how the engine might be improved. What if, instead of cooling the entire cylinder, only a small section was cooled? What if the hot and cold parts of the engine were separated? These thoughts occupied him for weeks as he worked on other tasks and pursued his daily life.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'In 1765, while walking across Glasgow Green on a Sunday afternoon, the solution came to him in a flash of insight. Separate the condenser! Keep one chamber for condensation and another for the high-pressure steam. This simple but brilliant idea would transform the steam engine from a fuel-hungry, inefficient device into a powerful and relatively economical machine. Watt immediately began to work on the concept, first in his mind and then on paper, calculating the improvements and planning how to build a model that would prove his theory.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Innovation and Partnership' },
      afbeelding: SCENE_IMAGES['james-watt-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-3'],
          alt: { en: 'A great beam engine being assembled in a Birmingham manufactory yard.' },
          bijschrift: { en: 'Watt had the idea in 1765. It took Matthew Boulton’s capital to turn it into a product.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Watt built a model of his improved steam engine and tested it. The results exceeded his expectations. His new design used only about a quarter of the fuel that a Newcomen engine would require for the same amount of work. But building a working engine and getting it manufactured were very different challenges. Watt had the knowledge and creativity to invent, but he lacked the capital and business acumen to bring his invention to market. This is where fortune intervened. Watt met Matthew Boulton, a successful industrialist who owned a manufacturing enterprise near Birmingham. Boulton recognized the potential of Watt\'s invention immediately and proposed a partnership.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'In 1775, Watt and Boulton established a formal partnership. Boulton would manufacture the engines, and Watt would continue to improve the design and supervise production. It was a perfect match: Watt had the genius for innovation, while Boulton had the business skills, capital, and manufacturing facilities necessary to turn the invention into a commercial success. Together, they began producing steam engines that were far more efficient than anything previously available. Their engines started being used not just for pumping water from mines but for powering machinery in factories, mills, and other industrial operations.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Watt continued to improve his design throughout the 1770s and 1780s. He developed a rotary motion engine that could power machinery directly, without the complex system of levers and rods that had been required before. He added governors to regulate speed, developed new valve systems, and created improvements that made the engines more reliable and efficient. Each improvement expanded the possible uses for the steam engine and increased its value to industry.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'The Power Revolution' },
      afbeelding: SCENE_IMAGES['james-watt-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-4'],
          alt: { en: 'A steam engine driving line shafts and belts in an early cotton mill.' },
          bijschrift: { en: 'Once power no longer had to come from a river, a factory could be built anywhere at all.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Watt\'s improved steam engines became available, they revolutionized manufacturing and transportation. Factories no longer needed to be built near water sources to power their machinery with waterwheels. They could be built anywhere, powered by steam engines. This flexibility transformed manufacturing, allowing industrial development to spread far beyond the locations that had natural water power. The engines were used in textile mills, iron foundries, breweries, and countless other industrial facilities. Output increased dramatically as industries could increase production beyond what had previously been possible.' },
      },
        {
          type: 'citaat',
          tekst: { en: 'I can think of nothing else but this machine. I\'ll never be happy until it succeeds.' },
          bron: { en: 'James Watt' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The steam engine also transformed transportation. While Watt himself was skeptical about applying his engine to transportation, others saw the possibilities. Within decades of his death, steam engines were powering locomotives and steamships, revolutionizing travel and commerce. Goods could be transported faster and more reliably than ever before. People could travel across continents and across oceans with unprecedented speed. The industrial revolution that Watt had helped to create ultimately connected the entire world in new ways.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Mind Never Rests' },
      afbeelding: SCENE_IMAGES['james-watt-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-5'],
          alt: { en: 'An inventor’s workshop of retorts, ore samples and a copying press.' },
          bijschrift: { en: 'Among his patents: the letter copying press, which offices went on using for a century.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Despite the success of his steam engine business, Watt\'s curiosity never ceased. He investigated chemistry, geology, and metallurgy. He experimented with various processes and materials. He studied the properties of steam itself to better understand how to make engines more efficient. He took out numerous patents for improvements and new applications of steam power. By the end of his life, he held so many patents that he was recognized as one of the most prolific inventors in British history.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Watt was also interested in the broader implications of technology. He was elected to the Lunar Society, an informal group of scientists, engineers, and businessmen who met near Birmingham to discuss scientific discoveries and their practical applications. Members of this society included some of the brightest minds of the age, and their conversations helped to shape the scientific and industrial development of Britain. Watt remained intellectually active well into his later years, continuing to observe, learn, and contribute to the advancement of knowledge.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Honors and Recognition' },
      afbeelding: SCENE_IMAGES['james-watt-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-6'],
          alt: { en: 'An elderly engineer honoured before a gathering of gentlemen scientists.' },
          bijschrift: { en: 'The unit of power carries his name — the only SI unit named after a Scot.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By the end of his life, James Watt was widely recognized as one of the greatest engineers and inventors of his age. Universities awarded him honorary degrees. The Royal Society of London, the most prestigious scientific organization in Britain, recognized his achievements. The unit of power called the "watt"—used to measure electrical and mechanical power—was named in his honor, ensuring that his name would be associated with power and energy for all time.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Watt retired from his business around 1800, turning over the operation of the company to his son and others. He continued to be active in research and invention until his death in 1819 at the age of eighty-three. By the time he died, the world had been transformed by the industrial revolution that his improvements to the steam engine had made possible. The economy had shifted from an agricultural base to an industrial one. Production had increased exponentially. Trade had expanded globally. Watt had lived to see the beginning of a new age—the age of steam and industry.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'An Industrial World' },
      afbeelding: SCENE_IMAGES['james-watt-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-7'],
          alt: { en: 'A panorama of mill chimneys, canal barges and coal wagons under a smoky sky.' },
          bijschrift: { en: 'He did not start the Industrial Revolution. He removed the thing that was holding it back.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'James Watt\'s improvements to the steam engine were not just technical achievements; they were the foundation of the Industrial Revolution. Without his innovation, the transformation of society that occurred in the eighteenth and nineteenth centuries might not have happened, or might have developed much more slowly. The steam engine powered the factories that produced goods on an unprecedented scale. It drove the railroads that connected cities and nations. It propelled the ships that carried goods and people around the world. Every major development in the industrial age was either directly or indirectly powered by engines based on Watt\'s principles.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'The industrial revolution brought tremendous benefits to humanity. It created wealth, enabled technological progress, and improved living standards (eventually, after initial hardships). It also brought challenges—urban overcrowding, pollution, child labor in factories, and the social dislocation of traditional ways of life. But it transformed the world permanently, bringing humanity into the modern age. At the center of this transformation stood James Watt\'s steam engine, a machine that changed everything.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'The Engineer\'s Legacy' },
      afbeelding: SCENE_IMAGES['james-watt-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['james-watt-8'],
          alt: { en: 'A towering polished beam engine preserved in a museum hall.' },
          bijschrift: { en: 'Boulton & Watt built around 500 engines before the patent ran out in 1800.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'James Watt embodied the spirit of the engineer and inventor. He was not a dreamer who imagined grand possibilities without understanding practical reality. Nor was he merely a craftsman who made things work without understanding the principles behind them. He was a man who combined practical knowledge with scientific understanding, who could identify a problem, think through potential solutions mathematically, and then work with others to bring those solutions to practical reality. His approach—identifying inefficiency, thinking systematically about solutions, and implementing improvements—became the foundation of engineering as a discipline.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'More than two hundred years after his death, James Watt is remembered as one of the most important figures in the history of technology and industry. His portrait appears in textbooks. His name is known around the world as the unit of electrical power. His inventions are studied in every engineering curriculum. But perhaps his greatest legacy is less his specific inventions than the attitude they represent—the belief that human ingenuity, combined with systematic thinking and hard work, can solve problems and create tools that transform the world. That belief, more than any specific engine, is what James Watt gave to the world.' }
        }
      ]
    }
  ]
};

export const florence: Verhaal = {
  id: 'florence-nightingale',
  beginJaar: 1820,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Florence Nightingale' },
  ondertitel: { en: 'The Pioneer Who Transformed Modern Nursing' },
  teaser: { en: 'She defied her family, revolutionized healthcare, and proved that data could save lives.' },
  jaar: 1910,
  periodeLabel: '1820 - 1910',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['florence-nightingale'],
  portretKleur: '#8B6B47',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'industriele-revolutie',
  themas: ['verpleegkunde', 'geneeskunde', 'oorlog', 'hervorming', 'vrouwen'],
  leestijdMinuten: 7,
  personage: { naam: 'Florence Nightingale' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born to Wealth, Called to Service' },
      afbeelding: SCENE_IMAGES['florence-nightingale-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-1'],
          alt: { en: 'A young woman at the window of an English country house drawing room.' },
          bijschrift: { en: 'Nursing in 1840s Britain was untrained, disreputable work. Her family were appalled.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Florence Nightingale was born on May 12, 1820, into a wealthy and respected English family. Her mother was fashionable and concerned with social status; her father was a landowner with progressive ideas. Florence grew up in luxury, surrounded by comfort and opportunity. She was well-educated—unusual for girls of her time—and learned languages, history, music, and mathematics. She was expected to make an advantageous marriage to a gentleman of appropriate social standing and to spend her life managing a household and raising children, as was typical for women of her class.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'But Florence had other dreams. When she was young, she felt what she later described as a "calling"—a sense that God wanted her to dedicate her life to serving others. Specifically, she felt drawn to nursing. In the 1840s, nursing was not a respectable profession for women of good family. Nurses were often seen as rough, uneducated women of questionable character. The idea that Florence would want to work in hospitals tending to the sick was shocking to her family. They opposed her plans firmly and repeatedly. They urged her to abandon these ambitions and accept her place in respectable society.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Against All Odds' },
      afbeelding: SCENE_IMAGES['florence-nightingale-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-2'],
          alt: { en: 'An Englishwoman walking a ward of a German charitable hospital.' },
          bijschrift: { en: 'Kaiserswerth, 1850: three months of training that her mother was told almost nothing about.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Florence\'s determination was extraordinary. Despite her family\'s opposition, she pursued her goal of becoming a nurse. She found ways to gain practical experience. She studied at a training institution in Germany. She visited hospitals and learned about different approaches to patient care and hospital management. She read everything she could find about nursing, medicine, and hospital administration. Her family remained opposed, but Florence persisted. At age thirty-one, after years of conflict with her family, Florence accepted a position as superintendent of a small private hospital in London. This was a major achievement—she now had authority to implement her ideas about patient care and hospital management.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Florence\'s opportunity to make her greatest impact came with the Crimean War. Fighting broke out in 1853, and in 1854 Britain and France joined the Ottoman Empire against Russia. British soldiers were dying not primarily from combat wounds but from disease—typhus, dysentery, typhoid, and cholera were killing more soldiers than enemy bullets. Conditions in the military hospitals were terrible: overcrowded, dirty, poorly ventilated, and inadequately supplied. When reports of these conditions reached Britain, public outrage grew. Florence read the reports and knew this was where she needed to be. She offered her services, and with official permission, she traveled to the Crimea with a small group of nurses she had trained.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Lady with the Lamp' },
      afbeelding: SCENE_IMAGES['florence-nightingale-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-3'],
          alt: { en: 'A nurse with an oil lamp in a dim hospital corridor of wounded soldiers.' },
          bijschrift: { en: 'Scutari, 1854. Far more soldiers were dying of infection there than of their wounds.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Florence Nightingale and her nurses arrived at the Barrack Hospital in Scutari in November 1854, they found appalling conditions. The hospital was filthy, lice-infested, and overrun with rats. Patients lay on straw mattresses that were never changed. The mortality rate was shockingly high—in some months, more than one in four of the patients admitted died. Florence and her nurses immediately set about trying to improve conditions. They scrubbed floors, washed bedding, improved ventilation, and organized supply systems. They provided basic care and comfort to the wounded and dying soldiers.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Florence worked tirelessly, often staying up all night tending to patients. According to accounts, she would walk through the wards at night, making her rounds with a lamp, checking on patients and making sure they had what they needed. She became known as "the Lady with the Lamp," an image that captured the public imagination and made her famous. But Florence was not satisfied with just providing comfort. She began to analyze the hospital\'s records systematically. She collected data on mortality rates, causes of death, and changes in conditions. Her analysis revealed something shocking: most of the soldiers were dying not from their wounds but from diseases that resulted from poor sanitation and overcrowding.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Florence\'s data-driven approach was revolutionary for its time. She used statistics to prove that improving sanitation and hygiene could dramatically reduce mortality. She created detailed charts and diagrams showing the relationship between sanitary conditions and patient outcomes. Her work demonstrated that systematic observation, careful record-keeping, and analysis of data could identify problems and solutions. This approach—using statistics to understand and improve healthcare—became the foundation of modern hospital administration and public health.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Data Saves Lives' },
      afbeelding: SCENE_IMAGES['florence-nightingale-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-4'],
          alt: { en: 'A Victorian desk with mortality tables and a coloured circular diagram.' },
          bijschrift: { en: 'Her polar-area diagrams were designed for one audience: ministers who would not read a table.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Florence implemented improvements in sanitation at the Barrack Hospital, something remarkable happened. The mortality rate began to fall dramatically. Patients who might have died from typhoid, dysentery, or cholera began to recover. The improvements she made—better ventilation, cleaner bedding, improved water supply, and organized waste disposal—had a measurable impact on patient survival. Her careful records proved it beyond doubt.' },
      },
        {
          type: 'citaat',
          tekst: { en: 'To understand God\'s thoughts, we must study statistics, for these are the measure of His purpose.' },
          bron: { en: 'Florence Nightingale' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Florence returned to England after the Crimean War, she was famous. She had become a symbol of compassion and dedication. But Florence was not interested in basking in fame. She was focused on using her experience to transform nursing and healthcare more broadly. She wrote extensively about what she had learned. She designed a training school for nurses that emphasized both theoretical knowledge and practical skills. She advised on hospital design and organization. She advocated for public health reforms that would improve conditions for poor people living in crowded urban areas. She was determined that the lessons learned from her work in the Crimea would benefit the entire nation.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Establishing Modern Nursing' },
      afbeelding: SCENE_IMAGES['florence-nightingale-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-5'],
          alt: { en: 'Probationer nurses taking notes as a matron teaches beside a hospital bed.' },
          bijschrift: { en: 'St Thomas’, 1860 — the first school to treat nursing as a profession you train for.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1860, Florence Nightingale established the Nightingale Training School at St. Thomas\' Hospital in London. This was the first systematic training program for nurses, designed to elevate nursing from an unskilled occupation to a respected profession. The program included classroom instruction in anatomy, physiology, hygiene, and disease, combined with supervised practical experience. Graduates of the school became known for their high standards of care and professional competence. The Nightingale model influenced nursing education around the world. Schools based on her principles were established in America, Europe, and elsewhere, creating a global profession of trained nurses.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Florence also wrote extensively about hospital design. She believed that the physical environment affected patient outcomes. She advocated for hospitals with good ventilation, natural light, adequate space between beds to prevent disease transmission, and organized systems for managing patients. Her ideas about hospital design were revolutionary and influenced how hospitals were built for decades. She also worked on public health issues, investigating the conditions in which poor people lived and advocating for reforms that would improve sanitation and reduce disease.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'A Life Dedicated to Reform' },
      afbeelding: SCENE_IMAGES['florence-nightingale-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-6'],
          alt: { en: 'An invalid woman writing at a bed-desk piled with government reports.' },
          bijschrift: { en: 'She spent most of her last fifty years housebound, and wrote some 14,000 letters from that bed.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'After the Crimean War, Florence lived a relatively private life, but she remained intensely active in her work. She suffered from a chronic illness that limited her ability to leave her home, but this did not slow her productivity. She wrote reports, advised government officials, corresponded with leaders in the field of nursing and public health, and continued to gather and analyze data about healthcare outcomes. She was a prolific author, and her writings were widely read and influential. Her book "Notes on Nursing" became a classic text that shaped how care is understood and provided.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Florence was also unusual for her time in her advocacy for women\'s rights and independence. She believed that women should have the opportunity to pursue meaningful work and to achieve recognition for their accomplishments. She herself had defied conventional expectations to pursue her calling, and she used her influence to open doors for other women in nursing and healthcare. She served as a role model and inspiration for generations of women who wanted to build careers in service to others.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'An Evolving World' },
      afbeelding: SCENE_IMAGES['florence-nightingale-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-7'],
          alt: { en: 'A bright Victorian hospital ward with open windows and well-spaced beds.' },
          bijschrift: { en: 'She never fully accepted germ theory. Her sanitary reforms saved lives regardless.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Florence Nightingale aged, she saw the world changing in ways that validated her work and vision. Germ theory, which had been emerging during her time in the Crimea, became established scientific knowledge. The understanding of how disease spreads through contamination and poor sanitation became widely accepted. The improvements she had advocated—better sanitation, cleaner conditions, organized waste disposal—became standard practice in hospitals and public health. The profession of nursing, which she had helped to establish and elevate, became increasingly respected and professionalized.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Florence Nightingale died on August 13, 1910, at the age of ninety. She had lived a long life, seeing tremendous changes in healthcare and society. Many of the conditions she had fought to improve—poor sanitation, lack of professional nursing care, absence of systematic record-keeping in hospitals—had been significantly addressed. Her influence extended far beyond her own time, as her principles and methods continued to guide healthcare practice for generations.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'Data, Compassion, and Care' },
      afbeelding: SCENE_IMAGES['florence-nightingale-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['florence-nightingale-8'],
          alt: { en: 'A brass oil lamp beside a folded nurse’s apron and a statistical chart.' },
          bijschrift: { en: 'She was the first woman elected to the Royal Statistical Society, in 1858.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Florence Nightingale\'s legacy is extraordinary in its breadth and depth. She revolutionized nursing, transforming it from an unskilled, disreputable occupation into a respected profession. She demonstrated the power of data and systematic analysis in healthcare, pioneering the use of statistics to improve patient outcomes. She showed that the physical environment—cleanliness, ventilation, light, space—directly affects health and recovery. She proved that one person, armed with determination and knowledge, could change systems and improve the lives of thousands of people.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'What makes Florence Nightingale\'s story particularly inspiring is that she overcame tremendous obstacles to pursue her vision. She defied her family, challenged social conventions, and persisted in her goals despite opposition. She combined practical compassion for individual patients with systematic thinking about how to improve healthcare systems more broadly. She used data to support her arguments and convince skeptics that her reforms were necessary and effective. She established institutions and practices that outlasted her and influenced how healthcare is understood and provided to this day. Florence Nightingale showed that caring for others and pursuing systematic improvement are not contradictory goals—they reinforce each other. Her life reminds us that meaningful change requires both heart and mind, both compassion and analysis.' }
        }
      ]
    }
  ]
};

export const thomas: Verhaal = {
  id: 'thomas-edison',
  beginJaar: 1847,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Thomas Edison' },
  ondertitel: { en: 'The Inventor Who Lit Up the World' },
  teaser: { en: 'With over a thousand patents, he transformed daily life through practical innovation and relentless experimentation.' },
  jaar: 1931,
  periodeLabel: '1847 - 1931',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['thomas-edison'],
  portretKleur: '#6B5B4A',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'industriele-revolutie',
  themas: ['uitvinding', 'elektriciteit', 'licht', 'Amerika', 'innovatie'],
  leestijdMinuten: 7,
  personage: { naam: 'Thomas Edison' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Boy Who Experimented' },
      afbeelding: SCENE_IMAGES['thomas-edison-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-1'],
          alt: { en: 'A boy’s makeshift chemical laboratory in an Ohio farmhouse cellar.' },
          bijschrift: { en: 'He had a few months of formal schooling. His mother, a teacher, did the rest.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Thomas Alva Edison was born on February 11, 1847, in Milan, Ohio. His father was a jack-of-all-trades who had fled Canada for political reasons; his mother was a schoolteacher. Young Tom showed an early curiosity about how things worked. He was a curious child, always asking questions and experimenting. His formal schooling was brief—he attended school for only three months before his teacher decided he was a difficult student and his mother took him out to teach him at home. But this turned out to be fortunate. His mother\'s patient, thoughtful approach to education suited Tom\'s learning style far better than traditional schooling.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'As a boy, Tom built a chemical laboratory in the basement of his family\'s home. He conducted experiments in chemistry and electricity, reading books and learning through trial and error. When his family moved to Michigan, the young Edison set up another laboratory on the train that ran between Detroit and Michigan. He even began printing a small newspaper on the train, the first newspaper ever printed on a moving vehicle. These early experiences showed the characteristics that would define his life: curiosity, experimentation, practical application, and entrepreneurship. He was not interested in pure theory; he wanted to build things that worked and that people could use.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Telegraph Operator and Young Inventor' },
      afbeelding: SCENE_IMAGES['thomas-edison-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-2'],
          alt: { en: 'A young telegraph operator at a brass key in a night railway office.' },
          bijschrift: { en: 'Deafness made him a better night operator: nothing else in the room distracted him.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'At age sixteen, Edison worked as a telegraph operator for Western Union. The telegraph was one of the most important communication technologies of the time, transmitting electrical signals over long distances. Working with the telegraph gave Edison an intimate knowledge of electrical systems and how they could be used to transmit information. While working as a telegraph operator, Edison made his first significant invention: an automatic repeater that allowed telegraph signals to be relayed over long distances without an operator. This invention caught the attention of other businessmen and inventors, and Edison began to consider making invention his primary occupation.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Edison moved to New York and then to Boston, working on telegraph systems while continuing to develop his own inventions. In 1869, he moved to New York permanently and began to establish himself as an independent inventor. He founded a company to develop and sell his electrical innovations. His work on telegraph technology led him to develop the stock ticker—a device that would print stock prices on paper tape using electrical signals. This device was highly valued on Wall Street, and it made Edison financially successful for the first time.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Menlo Park: The Invention Factory' },
      afbeelding: SCENE_IMAGES['thomas-edison-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-3'],
          alt: { en: 'A wooden laboratory in rural New Jersey lit up at night.' },
          bijschrift: { en: 'Menlo Park was the first industrial research lab — invention run as an organised business.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'With his success from the stock ticker, Edison had the financial resources to pursue his larger vision. In 1876, he established a laboratory in Menlo Park, New Jersey. This laboratory was unlike any research facility that had existed before. Edison brought together skilled mechanics, craftsmen, and experimenters to work on his ideas. The laboratory had machinery for making metal and other materials, electrical equipment, chemical apparatus, and everything else needed to turn ideas into working prototypes. Edison called it his "invention factory," and it was designed to produce innovations systematically, almost like a manufacturing plant produces goods.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'At Menlo Park, Edison and his team developed several important innovations in rapid succession. In 1877, he invented the phonograph—a device that could record sound on a tin foil cylinder and play it back. It was the first device ever able to capture and reproduce human voice and music. The achievement astounded the world. Edison became a celebrity, and the phonograph made him wealthy. But Edison was already focused on his next project: creating a practical, long-lasting electric light bulb.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'The challenge of the light bulb was not inventing the basic principle—scientists already understood that passing electric current through a wire could produce light. The challenge was finding a material that would glow bright enough to be useful, last long enough to be practical, and operate in a way that could be controlled. Edison attacked this problem systematically. He tested hundreds of different materials as filaments. He designed experiments carefully, kept detailed records, and analyzed results. His approach combined scientific knowledge with practical problem-solving and stubborn determination.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Let There Be Light' },
      afbeelding: SCENE_IMAGES['thomas-edison-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-4'],
          alt: { en: 'Men watching a single glowing filament bulb on a laboratory bench.' },
          bijschrift: { en: 'October 1879: thirteen and a half hours. The filament was never the hard part — the vacuum was.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On October 21, 1879, after months of experimentation, Edison tested a light bulb with a carbonized cotton filament. The bulb burned continuously for over thirteen hours—far longer than any previous attempt. Edison continued to refine the design. He tested different filaments and discovered that carbonized bamboo could last much longer than cotton. By 1880, Edison had developed a practical light bulb that could burn for over 1,200 hours. Most importantly, he had done more than invent a light bulb; he had created a complete electrical system to support it.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Edison understood that a light bulb was useless without an electrical system to power it. He designed and built the first electrical distribution system in New York City, complete with generators to produce electricity, wiring to distribute it, and safety systems to prevent overloads and fires. On September 4, 1882, Edison\'s Pearl Street Station began supplying electrical power to buildings in lower Manhattan. Electric lights began to illuminate homes, streets, and businesses. The era of electric lighting had begun.' },
      },
        {
          type: 'citaat',
          tekst: { en: 'Genius is one percent inspiration and ninety-nine percent perspiration.' },
          bron: { en: 'Thomas Edison' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Competition and Innovation' },
      afbeelding: SCENE_IMAGES['thomas-edison-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-5'],
          alt: { en: 'Engineers inspecting competing switchboards in a dynamo station.' },
          bijschrift: { en: 'The War of Currents ended badly for him. Alternating current simply travels further.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Edison\'s success with electric light did not go unchallenged. Other inventors and companies were working on electrical systems and lighting. George Westinghouse and Nikola Tesla developed an alternating current (AC) system that competed with Edison\'s direct current (DC) system. A period of intense competition, later called the "War of Currents," ensued. Edison fought aggressively to promote his system and discredit his rivals\' approaches. While Edison was brilliant at innovation, he was also willing to use questionable tactics in business competition—including conducting public demonstrations of electrocution to show the dangers of AC current.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Ultimately, the AC system proved to be more practical for long-distance electrical transmission, and Westinghouse and Tesla\'s approach prevailed over Edison\'s DC system for most applications. However, this did not diminish Edison\'s accomplishments or his influence. He had pioneered the practical application of electricity to everyday life. He had developed the light bulb that made electric lighting possible. He had created the first electrical distribution system. His contributions to electrification were fundamental and lasting.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'The Prolific Inventor' },
      afbeelding: SCENE_IMAGES['thomas-edison-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-6'],
          alt: { en: 'A workshop of phonographs, cameras, batteries and stacks of drawings.' },
          bijschrift: { en: '1,093 US patents in his name — a record that stood for more than a century.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Throughout his long career, Edison patented over 1,000 inventions. Beyond the light bulb and the phonograph, he developed the electrical storage battery, improvements to telephone technology, motion picture camera, and countless other devices. Some of his inventions changed the world; others were less significant. But collectively, they demonstrated an extraordinary capacity for innovation and practical problem-solving. Edison had established a method of systematic invention that has influenced how research and development is conducted ever since.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Edison\'s laboratories at Menlo Park and later at West Orange, New Jersey, became models for research and development facilities. The idea of bringing together skilled people in a well-equipped facility to work systematically on solving problems and creating innovations became a standard approach in industry. Many of the largest corporations in the world maintain research laboratories based on principles that Edison pioneered.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Later Years' },
      afbeelding: SCENE_IMAGES['thomas-edison-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-7'],
          alt: { en: 'An elderly inventor at a laboratory bench with young assistants.' },
          bijschrift: { en: 'He worked into his eighties, chasing a domestic American source of rubber.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Edison aged, he became something of an elder statesman of innovation and industry. He was celebrated as one of the great inventors of all time. Presidents and important people sought his counsel. Universities wanted to honor him. Yet Edison never stopped working. Well into his eighties, he continued to conduct experiments and work on new projects. He developed improved storage batteries, investigated electrical railway systems, and pursued numerous other projects.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Edison died on October 18, 1931, at the age of eighty-four. On the evening of his funeral, President Herbert Hoover asked Americans to dim or switch off their electric lights for one minute in honor of Edison\'s passing. Across the United States, millions of electric lights went dark for one minute, a fitting tribute to the man who had lit up the modern world. The event symbolized how thoroughly Edison\'s inventions had transformed modern life. From the light in our homes to the power that runs our industries, Edison\'s legacy surrounds us.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'The Legacy of Practical Innovation' },
      afbeelding: SCENE_IMAGES['thomas-edison-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['thomas-edison-8'],
          alt: { en: 'An American city at night glowing with electric light.' },
          bijschrift: { en: 'On the evening of his funeral, American cities dimmed their lights for one minute.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Thomas Edison\'s contributions to modern civilization are difficult to overstate. He did not work alone—he built teams of talented people and fostered an environment of creativity and systematic innovation. He was not always right—some of his ideas failed, and some of his business practices were questionable. But his fundamental approach to innovation—identify a problem, systematically investigate possible solutions, conduct experiments, learn from failures, refine designs, and create practical applications—became the model for modern research and development.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Edison proved that innovation could be more than the work of isolated geniuses having sudden insights. It could be systematic, methodical, and organized. It could be conducted in laboratories equipped with the necessary tools and staffed with skilled people. It could be focused on practical problems and create products that people could use and that would improve their lives. This vision of innovation—practical, systematic, and focused on human benefit—is one of Edison\'s greatest legacies, perhaps even more important than his specific inventions. In an age of rapid technological change, the Edisonian approach to innovation remains relevant and valuable. Thomas Edison showed that light comes from sustained effort, systematic thinking, and the refusal to accept failure as final.' }
        }
      ]
    }
  ]
};

export const napoleonBonaparte: Verhaal = {
  id: 'napoleon-bonaparte',
  beginJaar: 1769,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Napoleon Bonaparte' },
  ondertitel: { en: 'The soldier from Corsica who crowned himself emperor' },
  teaser: { en: 'A poor officer from an island France had only just bought rose to rule half of Europe. Then he marched into Russia, and lost almost everything.' },
  jaar: 1821,
  periodeLabel: '1769 - 1821',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['napoleon-bonaparte'],
  portretKleur: '#2E3F6E',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'industriele-revolutie',
  themas: ['frankrijk', 'keizer', 'oorlog', 'revolutie', 'wetgeving'],
  leestijdMinuten: 8,
  personage: { naam: 'Napoleon Bonaparte' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Boy from Corsica' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-1'],
          alt: { en: 'A thin dark-haired boy in a school uniform standing alone in a snowy school courtyard while other boys laugh.' },
          bijschrift: { en: 'Brienne, around 1780: the island boy among the sons of French nobles.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Napoleone di Buonaparte was born on 15 August 1769 in Ajaccio, on the Mediterranean island of Corsica. Only a year earlier the island had belonged to the Republic of Genoa, which had sold it to France. His family were minor Corsican nobles with more pride than money, and the language spoken at home was Italian, not French.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His father, Carlo, made peace with the new French rulers, and that brought a reward: free places for his sons at French schools. In 1779, aged nine, Napoleon was sent to the military academy at Brienne, in eastern France. He arrived barely speaking French.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Outsider' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The other boys were the sons of French aristocrats, and they mocked his accent, his poverty and his strange name. Napoleon kept to himself. He read history books about Alexander the Great and Julius Caesar, and he was outstanding at mathematics. One winter, the story goes, he organised the boys into armies for a snowball fight and led his side to victory.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1785, at the age of sixteen, he became a second lieutenant in the artillery, the branch of the army where mathematics mattered most. That same year his father died, and the young officer took on much of the burden of supporting his mother and his many younger brothers and sisters.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Napoleon was not unusually short. He measured about 1.69 metres, average for a Frenchman of his time. The myth came partly from old French inches, which were longer than English ones, and partly from British cartoons that drew him as a tiny, furious man.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Revolution\'s Gunner' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-2'],
          alt: { en: 'A young officer directing cannon fire at a harbour fortress at night.' },
          bijschrift: { en: 'Toulon, December 1793: the battle that made Bonaparte famous.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1789 the French Revolution broke out. The king was overthrown, and in 1793 he was executed. Many aristocratic officers fled abroad, which opened the way for talented young men without powerful families. Napoleon, who had once dreamed of Corsican independence, chose the side of the Revolution.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1793,
          tekst: { en: 'At the siege of Toulon, Captain Bonaparte drives the British from the harbour and is made a general at twenty-four.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That year the port of Toulon rebelled and let in a British fleet. The 24-year-old artillery captain spotted the key: a hill overlooking the harbour. Once French guns stood there, the British ships could no longer stay. The town fell in December 1793, and Napoleon was promoted to brigadier general.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Whiff of Grapeshot' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 1795 royalist crowds marched on the government in Paris. Napoleon placed cannons in the streets and fired grapeshot into the attackers at close range. The rising collapsed within hours. The government owed him its survival, and he was given command of an army.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Paris he met Joséphine de Beauharnais, a stylish widow six years older than him whose first husband had been guillotined. They married in March 1796. Two days later he left to lead the French army in Italy. He wrote her passionate letters from every camp; she rarely wrote back.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Italy and Egypt' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-3'],
          alt: { en: 'French soldiers in square formations fighting cavalry in the desert with pyramids on the horizon.' },
          bijschrift: { en: 'July 1798: the Battle of the Pyramids.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The army of Italy was hungry, unpaid and ragged. Napoleon promised his soldiers the riches of Italy, and then delivered. In a year of lightning marches he beat the Austrians again and again, at Lodi, at Arcole and at Rivoli. He sent treasure and works of art back to Paris and signed peace treaties as if he were already a head of state.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1798 he set off on an even bolder adventure: the conquest of Egypt, to threaten Britain\'s route to India. He took not only soldiers but more than a hundred scientists, engineers and artists. Near Cairo his squares of infantry crushed the Mamluk cavalry at the Battle of the Pyramids.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Soldiers, from the top of these pyramids, forty centuries look down upon you.' },
          bron: { en: 'Words Napoleon is said to have spoken to his army before the battle, July 1798' },
        },
        {
          type: 'kop',
          tekst: { en: 'Stranded' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ten days later the British admiral Horatio Nelson found the French fleet anchored at Aboukir Bay and destroyed it. Napoleon\'s army was trapped in Egypt. In August 1799, hearing that the government in Paris was in trouble, he quietly sailed home, leaving his army behind.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1799 French soldiers digging fortifications near the town of Rosetta found a stone carved with the same decree in three scripts. The Rosetta Stone later allowed Egyptian hieroglyphs to be deciphered. The British took it as a prize of war, and it is now in the British Museum.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The First Consul' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-4'],
          alt: { en: 'A man in a red consul\'s coat working at a desk piled with papers late at night, secretaries asleep.' },
          bijschrift: { en: 'Paris, around 1801: Napoleon rebuilds France from his desk.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'France was tired of ten years of chaos. In November 1799 Napoleon and his allies overthrew the government in a coup. A new constitution made him First Consul, and in practice the ruler of France. He was thirty years old.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He worked astonishing hours, dictating letters to several secretaries at once and sleeping in short naps. He made peace with the Catholic Church, created the Bank of France, reorganised taxes and schools, and founded the Legion of Honour to reward service to the state.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Civil Code' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His most lasting creation was a single book of laws, the Civil Code of 1804, later called the Code Napoléon. It swept away the privileges of birth: all men were equal before the law, property was protected and anyone could pursue any career. But it also gave husbands power over their wives, and it did not apply to the enslaved people in France\'s colonies, where Napoleon restored slavery in 1802.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1804,
          tekst: { en: 'The Civil Code becomes law in France; versions of it are still in force in many countries today.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Code Napoléon spread across Europe with his armies. The legal systems of France, Belgium, Italy, Spain and Latin America, and even the US state of Louisiana, still show its influence.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Emperor of the French' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-5'],
          alt: { en: 'A man in a long red velvet coronation robe lifting a crown above a kneeling woman in Notre-Dame cathedral.' },
          bijschrift: { en: '2 December 1804: the coronation in Notre-Dame.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1804 the French voted to make Napoleon emperor. On 2 December, in the cathedral of Notre-Dame in Paris, Pope Pius VII blessed him, but Napoleon placed the crown on his own head himself. Then he crowned Joséphine as empress. No one, the gesture said, had given him his power but himself.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Exactly a year later, on 2 December 1805, he won his most famous victory. At Austerlitz, in what is now the Czech Republic, he lured the Russian and Austrian armies into attacking his weakened right wing, then smashed through their centre. It became known as the Battle of the Three Emperors.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1805,
          tekst: { en: 'Victory at Austerlitz; but at Trafalgar, Nelson destroys the French and Spanish fleets.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At sea he could not win. Six weeks before Austerlitz, Nelson destroyed the French and Spanish fleets at Trafalgar. Napoleon tried instead to starve Britain of trade by forbidding all of Europe to buy British goods, the Continental System. Smuggling flourished, and enforcing it drew him into ever more wars.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Family of Kings' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He handed out crowns to his family: his brother Joseph became King of Naples and later of Spain, his brother Louis King of Holland, his brother Jérôme King of Westphalia. Because Joséphine had given him no children, he divorced her in 1809 and married Marie-Louise, the daughter of the Austrian emperor. In 1811 she gave birth to a son, proclaimed King of Rome.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1811 Napoleon ordered everyone in the Netherlands, then part of his empire, to register a fixed surname. According to a popular story, some people chose joke names, assuming the rule would not last. Historians doubt that story, but the surnames registered then are still in use.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Road to Moscow' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-6'],
          alt: { en: 'Exhausted French soldiers trudging through deep snow past abandoned cannons and dead horses.' },
          bijschrift: { en: 'Winter 1812: the retreat from Russia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Russia\'s tsar, Alexander I, refused to keep obeying the ban on British trade. In June 1812 Napoleon crossed the river Niemen into Russia with the largest army Europe had ever seen, more than 450,000 men at the start, with more following later. He expected a quick victory.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Russians kept retreating, burning crops and villages as they went. Disease and heat killed tens of thousands of French soldiers before they had even fought. In September the two armies finally clashed at Borodino, one of the bloodiest days of the century. A week later Napoleon entered Moscow.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A City on Fire' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Moscow was almost empty, and within a day it was on fire, very probably set alight by the Russians themselves. Napoleon waited for the tsar to ask for peace. The tsar never answered. In October, with winter coming, the Grand Army began the long march home.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The retreat became a catastrophe. Cossacks attacked the stragglers, horses died by the thousand, and temperatures fell far below freezing. Crossing the river Berezina in November, engineers stood in icy water to build bridges while the army streamed over them. Only a small fraction of the men who had marched into Russia came back.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1812,
          tekst: { en: 'The invasion of Russia ends in disaster for the Grand Army.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Elba and the Hundred Days' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-7'],
          alt: { en: 'A man in a grey coat walking alone towards a line of soldiers aiming muskets at him on a country road.' },
          bijschrift: { en: 'March 1815: Napoleon faces the soldiers sent to stop him.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Russia, all of Europe turned on him. In October 1813 the allies beat him at Leipzig, the Battle of the Nations. In March 1814 they entered Paris. Napoleon abdicated and was sent to rule the tiny Mediterranean island of Elba, with a guard of a few hundred soldiers. The old royal family returned to the French throne.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He lasted ten months. In February 1815 he slipped away from Elba with about a thousand men and landed on the south coast of France. Near Grenoble a regiment was sent to stop him. Napoleon walked up to the soldiers alone and opened his coat.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Soldiers! If there is one among you who wants to kill his emperor, here I am.' },
          bron: { en: 'Napoleon to the 5th Infantry Regiment near Grenoble, March 1815, according to eyewitnesses' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The soldiers threw down their muskets and cheered. Regiment after regiment joined him, the king fled, and on 20 March Napoleon was back in Paris. The period that followed is called the Hundred Days.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Waterloo' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 18 June 1815, near the village of Waterloo south of Brussels, he attacked the British-led army of the Duke of Wellington. All afternoon the French assaults broke on Wellington\'s lines. In the evening the Prussian army of Marshal Blücher arrived on his flank, and the French army collapsed. Four days later Napoleon abdicated for the second time.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'St Helena' },
      afbeelding: SCENE_IMAGES['napoleon-bonaparte-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['napoleon-bonaparte-8'],
          alt: { en: 'An ageing man in a white shirt and a wide-brimmed hat standing on a windswept cliff looking out over the ocean.' },
          bijschrift: { en: 'St Helena: an island in the middle of the South Atlantic.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This time the British took no chances. Napoleon was sent to St Helena, a volcanic island in the South Atlantic, nearly 2,000 kilometres from the coast of Africa. He arrived in October 1815 and lived in Longwood House, a damp farmhouse on a windy plateau, guarded by thousands of soldiers and a ring of warships.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He spent his days dictating his memories to a small circle of loyal followers, shaping the legend of the emperor who had only wanted peace and the good of the people. He quarrelled endlessly with the British governor, and his health slowly broke down.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1821,
          tekst: { en: 'Napoleon dies on St Helena on 5 May 1821, aged fifty-one.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He died on 5 May 1821, most likely of stomach cancer, the disease that had killed his father. In 1840 the British allowed his body to be brought back to France. Hundreds of thousands lined the streets of Paris in the snow, and he was laid to rest under the great dome of Les Invalides, where his tomb still stands.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'What He Left Behind' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His wars cost millions of lives. Yet his laws, schools, departments and roads outlived his empire. By sweeping away old borders and kingdoms he also awakened a new force he could not control: the national pride of Germans, Italians, Spaniards and many others, which would shape the century that followed.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'For years a rumour claimed that Napoleon was poisoned with arsenic on St Helena. Later studies of his hair found arsenic throughout his life, probably from the environment of the time, and most historians agree he died of cancer.' },
        },
      ],
    },
  ],
};

export const abrahamLincoln: Verhaal = {
  id: 'abraham-lincoln',
  beginJaar: 1809,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Abraham Lincoln' },
  ondertitel: { en: 'The rail-splitter who held America together and ended slavery' },
  teaser: { en: 'Born in a log cabin with barely a year of school, Lincoln taught himself law, led the United States through its bloodiest war, and was shot five days after victory.' },
  jaar: 1865,
  periodeLabel: '1809 - 1865',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['abraham-lincoln'],
  portretKleur: '#3A3A3A',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'industriele-revolutie',
  themas: ['verenigde-staten', 'president', 'burgeroorlog', 'slavernij', 'democratie'],
  leestijdMinuten: 7,
  personage: { naam: 'Abraham Lincoln' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Log Cabin' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-1'],
          alt: { en: 'A tall thin boy reading a book by the light of a fireplace in a rough log cabin.' },
          bijschrift: { en: 'Indiana, 1820s: books were rare, so he read every one he could borrow.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Abraham Lincoln was born on 12 February 1809 in a one-room log cabin on a farm in Kentucky, then the frontier of the young United States. His father, Thomas, was a farmer and carpenter who could barely write his name. When Abraham was seven, the family moved to the forests of Indiana, partly because Thomas disliked living in a state that allowed slavery.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1818, when Abraham was nine, his mother Nancy died of milk sickness, a poisoning caused by drinking milk from cows that had eaten a toxic plant. A year later his father married a widow, Sarah Bush Johnston. She was warm and kind, and she encouraged the boy who always had his nose in a book.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Less Than a Year of School' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Added together, Lincoln\'s schooling amounted to less than a year. Everything else he taught himself. He walked miles to borrow books, read the Bible, Aesop\'s fables and a biography of George Washington, and practised writing on boards with charcoal. His father thought it was laziness and hired him out to neighbours to swing an axe.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Lincoln was the tallest president in American history, about 1.93 metres. With his tall hat, he towered over almost everyone in a crowd.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Rail-Splitter and Lawyer' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-2'],
          alt: { en: 'A tall young man in shirtsleeves steering a flatboat down a wide river.' },
          bijschrift: { en: '1828: a flatboat journey down the Mississippi to New Orleans.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As a young man Lincoln took two trips by flatboat down the Mississippi River to New Orleans. There he saw a slave market, where men, women and children were sold like cattle. It left a lasting impression.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1831 he settled in the little village of New Salem, Illinois. He worked as a shop clerk, a postmaster and a surveyor, split logs into fence rails, and won respect as a champion wrestler. When a war against the Native American leader Black Hawk broke out in 1832, the local volunteers elected him their captain.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Honest Abe' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1834 he was elected to the Illinois legislature. He borrowed law books and studied them on his own, and in 1836 he became a lawyer. He moved to the state capital, Springfield, where his reputation for fairness earned him the nickname Honest Abe. In 1842 he married Mary Todd, a lively, well-educated woman from a wealthy Kentucky family.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1846,
          tekst: { en: 'Lincoln is elected to the US Congress, where he serves a single term.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Lincoln is the only American president to have held a patent. In 1849 he patented a device to lift riverboats over sandbars using inflatable chambers. It was never built.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'A House Divided' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-3'],
          alt: { en: 'Two men debating on an outdoor wooden platform before a large crowd on a prairie town square.' },
          bijschrift: { en: '1858: the Lincoln-Douglas debates draw crowds of thousands.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the 1850s the United States was splitting over slavery. Around four million Black people were enslaved in the Southern states, where the cotton economy depended on their unpaid labour. The question that tore the country apart was whether slavery would be allowed to spread into the new western territories.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1854 a new law opened the territories of Kansas and Nebraska to slavery if the settlers voted for it. Lincoln was outraged and returned to politics, joining the new Republican Party, which opposed the spread of slavery.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free.' },
          bron: { en: 'Abraham Lincoln, Springfield, Illinois, 16 June 1858' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Great Debates' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1858 he ran for the Senate against the famous senator Stephen Douglas. The two men held seven debates across Illinois, each lasting three hours, in front of crowds of thousands. Newspapers printed them in full. Lincoln lost the election, but the debates made him known throughout the country.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'A Nation Breaks Apart' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-4'],
          alt: { en: 'A tall man taking the oath of office in front of the unfinished Capitol dome.' },
          bijschrift: { en: '4 March 1861: Lincoln\'s inauguration under the unfinished dome.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In November 1860 Lincoln was elected president, without winning a single Southern state. For the slave states, his victory was the final straw. Starting with South Carolina in December, seven states declared they were leaving the United States before he had even taken office. They formed the Confederate States of America.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Lincoln was sworn in on 4 March 1861, in front of a Capitol whose new dome was still a ring of scaffolding. He told the South that he would not attack slavery where it already existed, but that no state had the right to leave the Union.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1861,
          tekst: { en: 'Confederate guns fire on Fort Sumter on 12 April: the American Civil War begins.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 12 April 1861 Confederate cannons opened fire on Fort Sumter, a federal fort in the harbour of Charleston, South Carolina. Lincoln called for 75,000 volunteers. Four more Southern states joined the Confederacy. The Civil War had begun.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Dark Beginning' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Both sides expected a short war. Instead the Union lost battle after battle to Confederate generals like Robert E. Lee. In February 1862 Lincoln\'s eleven-year-old son Willie died of fever in the White House. His wife Mary never recovered from the grief, and Lincoln himself was often seen weeping.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Forever Free' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-5'],
          alt: { en: 'A man signing a document at a cabinet table while ministers look on.' },
          bijschrift: { en: '1 January 1863: the Emancipation Proclamation.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At first Lincoln said the war was being fought to save the Union, not to end slavery. But enslaved people were already fleeing to the Union armies by the thousands, and their labour was keeping the Confederate war effort going. Freeing them would weaken the South and give the war a higher purpose.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In September 1862, after the Union stopped Lee\'s invasion of Maryland at the bloody Battle of Antietam, Lincoln announced his decision. On 1 January 1863 he signed the Emancipation Proclamation, declaring that all people enslaved in the rebelling states were from now on free.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I never, in my life, felt more certain that I was doing right, than I do in signing this paper.' },
          bron: { en: 'Abraham Lincoln, signing the Emancipation Proclamation, 1 January 1863' },
        },
        {
          type: 'kop',
          tekst: { en: 'Freedom on the March' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The proclamation could only take effect where Union armies arrived, so every advance now freed people. It also allowed Black men to join the Union army. By the end of the war about 180,000 had served, fighting for the freedom of their own families.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1863,
          tekst: { en: 'The Emancipation Proclamation turns the war into a war against slavery.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Two Minutes at Gettysburg' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-6'],
          alt: { en: 'A tall man speaking from a platform to a crowd at a cemetery on a grey November day.' },
          bijschrift: { en: '19 November 1863: the Gettysburg Address.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1863 Lee invaded the North again. For three days the armies fought around the small Pennsylvania town of Gettysburg. When it was over, more than 50,000 men had been killed, wounded or captured. Lee retreated south, and the Confederacy never again invaded the North.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In November a cemetery for the Union dead was dedicated on the battlefield. The main speaker, a famous orator, spoke for two hours. Then Lincoln stood up and spoke for about two minutes. His speech had 272 words.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: '...that this nation, under God, shall have a new birth of freedom, and that government of the people, by the people, for the people, shall not perish from the earth.' },
          bron: { en: 'Abraham Lincoln, the Gettysburg Address, 19 November 1863' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Some newspapers dismissed it. But Lincoln had done something remarkable: in a few sentences he had turned the war into a struggle for equality and for the idea of democracy itself. Generations of schoolchildren have learned it by heart.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Only one confirmed photograph shows Lincoln at Gettysburg that day: a small, blurry figure without his hat, sitting among the crowd on the platform.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'With Malice Toward None' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-7'],
          alt: { en: 'Two generals shaking hands in a parlour of a farmhouse, officers standing around them.' },
          bijschrift: { en: '9 April 1865: Lee surrenders to Grant at Appomattox.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In General Ulysses S. Grant, Lincoln had finally found a commander who would keep fighting. In 1864 Grant ground down Lee\'s army in Virginia while General William Sherman marched through Georgia. That November, Lincoln was re-elected. Soldiers were allowed to vote in the field, and most voted for him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Lincoln knew the Emancipation Proclamation was a wartime measure that a court might overturn. He wanted slavery abolished for good, written into the Constitution. In January 1865, after fierce lobbying, the House of Representatives passed the Thirteenth Amendment, banning slavery throughout the United States.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'With malice toward none, with charity for all... let us strive on to finish the work we are in, to bind up the nation\'s wounds.' },
          bron: { en: 'Abraham Lincoln, Second Inaugural Address, 4 March 1865' },
        },
        {
          type: 'kop',
          tekst: { en: 'The End of the War' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 9 April 1865 Lee surrendered his army to Grant at Appomattox Court House in Virginia. Lincoln had insisted on generous terms: the Confederate soldiers could go home and keep their horses for the spring ploughing. After four years and at least 620,000 dead, the war was effectively over.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Ford\'s Theatre' },
      afbeelding: SCENE_IMAGES['abraham-lincoln-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['abraham-lincoln-8'],
          alt: { en: 'A crowded Victorian theatre with a flag-draped box above the stage.' },
          bijschrift: { en: '14 April 1865: the president\'s box at Ford\'s Theatre.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the evening of Good Friday, 14 April 1865, Lincoln and his wife went to Ford\'s Theatre in Washington to see a comedy called Our American Cousin. Lincoln was in a cheerful mood. That afternoon he had talked with Mary about travelling after the presidency.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Shortly after ten o\'clock John Wilkes Booth, a well-known actor and Confederate sympathiser, slipped into the presidential box and shot Lincoln in the back of the head. Booth leapt onto the stage, breaking his leg, and escaped into the night. He was tracked down and killed twelve days later.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1865,
          tekst: { en: 'Lincoln dies on the morning of 15 April, the first American president to be assassinated.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The unconscious president was carried across the street to a boarding house. He died there at 7:22 the next morning. His Secretary of War, Edwin Stanton, is reported to have said: \'Now he belongs to the ages.\'',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Long Journey Home' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A funeral train carried his coffin about 2,700 kilometres back to Springfield, stopping in city after city, where millions of mourners came to see it pass. In December 1865 the Thirteenth Amendment was ratified, and slavery in the United States was abolished for ever. Lincoln did not live to see it.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Lincoln and Charles Darwin were born on the very same day, 12 February 1809, one in a Kentucky log cabin and the other in a comfortable English town house.' },
        },
      ],
    },
  ],
};

export const queenVictoria: Verhaal = {
  id: 'queen-victoria',
  beginJaar: 1819,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Queen Victoria' },
  ondertitel: { en: 'The girl who became queen at eighteen and ruled for 63 years' },
  teaser: { en: 'Raised under lock and key, crowned at eighteen and widowed at forty-two, Victoria watched railways, telegraphs and an empire covering a quarter of the world grow around her.' },
  jaar: 1901,
  periodeLabel: '1819 - 1901',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['queen-victoria'],
  portretKleur: '#4B2E5A',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'industriele-revolutie',
  themas: ['engeland', 'koningin', 'imperium', 'industrie', 'familie'],
  leestijdMinuten: 6,
  personage: { naam: 'Queen Victoria' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Princess Under Guard' },
      afbeelding: SCENE_IMAGES['queen-victoria-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-1'],
          alt: { en: 'A little girl in a white dress playing alone with dolls in a large palace room while a governess watches.' },
          bijschrift: { en: 'Kensington Palace, 1820s: a childhood without friends.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexandrina Victoria was born on 24 May 1819 at Kensington Palace in London. Her father, the Duke of Kent, was a son of King George III. He died when she was eight months old. Above her in the line of succession stood only her elderly uncles, none of whom had surviving legitimate children.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her mother, the Duchess of Kent, and the Duchess\'s ambitious adviser, Sir John Conroy, raised her under a strict set of rules known as the Kensington System. She was never allowed to be alone, slept in her mother\'s bedroom, and could not walk down a staircase without someone holding her hand. Conroy hoped to rule through her one day.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I will be good.' },
          bron: { en: 'Victoria, aged ten, on discovering she would one day be queen, as recalled by her governess' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Lonely Child' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She had few friends of her own age. Her companions were her governess, Louise Lehzen, her spaniel Dash and a collection of more than a hundred small wooden dolls she dressed herself. From the age of thirteen she kept a diary, and she would keep writing it almost every day for the rest of her life.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Victoria\'s journals eventually filled more than 120 volumes. After her death her daughter Beatrice copied them out, editing and burning the originals.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Queen at Eighteen' },
      afbeelding: SCENE_IMAGES['queen-victoria-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-2'],
          alt: { en: 'A young woman in a dressing gown receiving two kneeling gentlemen in a palace room at dawn.' },
          bijschrift: { en: '20 June 1837, six in the morning: "You are Queen."' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 20 June 1837, at six in the morning, Victoria was woken by her mother. The Archbishop of Canterbury and the Lord Chamberlain were waiting downstairs. Her uncle, King William IV, had died in the night. She came down in her dressing gown, and they knelt before her. She was eighteen and queen of the United Kingdom.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'One of her first wishes was a bedroom of her own. She moved into Buckingham Palace, becoming the first monarch to live there, and pushed Sir John Conroy out of her life. Her guide in the art of ruling became the prime minister, Lord Melbourne, a charming, worldly man forty years older than her.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1837,
          tekst: { en: 'Victoria becomes queen at eighteen; she will reign for more than 63 years.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Coronation' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She was crowned in Westminster Abbey on 28 June 1838. The ceremony lasted five hours, and the ruby coronation ring had been made for her little finger, so the archbishop forced it painfully onto her fourth. Hundreds of thousands of people came to London to see the procession, many by the new railways.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Albert' },
      afbeelding: SCENE_IMAGES['queen-victoria-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-3'],
          alt: { en: 'A young queen and her husband with their children around a decorated Christmas tree.' },
          bijschrift: { en: 'The royal family at Christmas, 1840s.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 1839 her German cousin, Prince Albert of Saxe-Coburg and Gotha, came to visit. Victoria, who had found him dull a few years earlier, was overwhelmed. Because she was the queen, he could not propose to her. So five days after his arrival, she proposed to him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'They married on 10 February 1840. Victoria wore a white satin dress instead of the usual royal silver and velvet, and white wedding dresses became the fashion ever since. Albert, serious and hard-working, became her closest adviser. She called him her \'angel\'.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Nine Children' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Between 1840 and 1857 they had nine children. Victoria disliked pregnancy and found babies ugly, but the children married into royal families across Europe. Within a few years of her death her grandchildren sat on or beside the thrones of Germany, Russia, Spain, Greece, Norway, Romania and Sweden, and she was called the grandmother of Europe.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'A picture of the royal family around a decorated Christmas tree, a German tradition Albert loved, appeared in a London newspaper in 1848. Christmas trees soon spread through British and American homes.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1853 Victoria was given chloroform during the birth of her son Leopold. Her approval helped make pain relief in childbirth acceptable.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Crystal Palace' },
      afbeelding: SCENE_IMAGES['queen-victoria-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-4'],
          alt: { en: 'A gigantic glass and iron hall filled with crowds, trees and exhibits.' },
          bijschrift: { en: '1851: the Great Exhibition in Hyde Park.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Albert\'s great project was an exhibition of the industry of all nations. Its building, designed by the gardener Joseph Paxton, was a gigantic greenhouse of iron and almost 300,000 panes of glass, built in Hyde Park in a matter of months. A magazine nicknamed it the Crystal Palace.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1851,
          tekst: { en: 'The Great Exhibition opens on 1 May: the first world\'s fair.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Victoria opened the Great Exhibition on 1 May 1851. Inside stood steam engines, locomotives, printing presses, a giant diamond from India, and inventions from around the world. The building was so tall that full-grown elm trees stood inside it. Cheap railway tickets allowed working families to visit.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'This day is one of the greatest and most glorious of our lives.' },
          bron: { en: 'Queen Victoria, in her journal, 1 May 1851' },
        },
        {
          type: 'kop',
          tekst: { en: 'Six Million Visitors' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In five and a half months about six million visits were made, roughly a third of the population of Britain. The profits paid for the museums of South Kensington, including what are now the Victoria and Albert Museum, the Science Museum and the Natural History Museum.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Widow of Windsor' },
      afbeelding: SCENE_IMAGES['queen-victoria-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-5'],
          alt: { en: 'A woman in black mourning dress sitting alone at a desk beside a marble bust of a man.' },
          bijschrift: { en: 'After 1861: Victoria wore black for the rest of her life.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In December 1861 Albert fell ill, probably with typhoid fever, though some historians now suspect a long-standing stomach illness. He died at Windsor Castle on 14 December, aged forty-two. Victoria was devastated.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She wore black for the rest of her life, forty years. Albert\'s rooms were kept exactly as he had left them, and servants laid out fresh clothes and hot water for him every day. She withdrew from London and public life, spending her time at Windsor, at Osborne House on the Isle of Wight, and at Balmoral in Scotland.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Where Is the Queen?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The public grew impatient. Newspapers mocked the invisible queen, and a movement for a republic gained support. Her closest companion in those years was her Scottish servant John Brown, whose bluntness she valued, to the irritation of her family and court.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1861,
          tekst: { en: 'Prince Albert dies at Windsor Castle on 14 December.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Victoria survived at least seven attempts on her life. After one in 1842, the attacker was caught when she deliberately drove out again along the same route the next day, as bait.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Empress of India' },
      afbeelding: SCENE_IMAGES['queen-victoria-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-6'],
          alt: { en: 'An elderly queen in black receiving a young Indian man in a turban in a palace room.' },
          bijschrift: { en: 'The ageing queen and her Indian secretary, Abdul Karim.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Slowly she was coaxed back into public life, above all by Benjamin Disraeli, the witty prime minister who flattered her outrageously. In 1876, at his initiative, Parliament gave her a new title: Empress of India. She had never been there and never would go.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During her reign the British Empire grew to cover around a quarter of the world\'s land surface. It brought railways, telegraph lines and trade, but also conquest, famine and brutal repression, from the uprising in India in 1857 to wars in Africa. Many people under its rule saw it very differently from the crowds in London.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Munshi' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1887 a young Indian clerk named Abdul Karim came to serve at her table. Victoria grew very fond of him, made him her teacher, her Munshi, and took lessons from him in Hindustani for years. Her household was horrified, and after her death her family burned his letters and sent him home to India.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1876,
          tekst: { en: 'Victoria is proclaimed Empress of India.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Two Jubilees' },
      afbeelding: SCENE_IMAGES['queen-victoria-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-7'],
          alt: { en: 'A royal open carriage moving through packed, flag-decked London streets.' },
          bijschrift: { en: '22 June 1897: the Diamond Jubilee procession.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1887 Victoria celebrated fifty years on the throne, her Golden Jubilee. Ten years later, on 22 June 1897, came the Diamond Jubilee. Troops from Canada, India, Australia, Africa and the Caribbean marched through London. The queen, now seventy-eight and lame, rode in an open carriage to St Paul\'s Cathedral.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Because she could no longer climb the cathedral steps, the thanksgiving service was held outside, with the queen sitting in her carriage. By telegraph she sent a message to the whole empire: \'From my heart I thank my beloved people. May God bless them.\'',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A World Transformed' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When she was born, people travelled by horse and sailing ship and letters took weeks. By her Diamond Jubilee there were railways across every continent, steamships, telephones, electric light and the first motor cars. She was even filmed with a moving-picture camera.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The phrase "We are not amused" is famously linked to Victoria, but there is no reliable evidence she ever said it. Those who knew her said she laughed often and loudly.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The End of an Era' },
      afbeelding: SCENE_IMAGES['queen-victoria-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['queen-victoria-8'],
          alt: { en: 'A white-draped coffin on a gun carriage drawn through a silent crowd in winter.' },
          bijschrift: { en: 'February 1901: Victoria\'s funeral.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Victoria died at Osborne House on the Isle of Wight on 22 January 1901, aged eighty-one, surrounded by her family. Her grandson, the German emperor Wilhelm II, held her in his arms. She had reigned for 63 years and seven months, longer than any British monarch before her.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1901,
          tekst: { en: 'Queen Victoria dies; her son becomes King Edward VII.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She had left precise instructions for her funeral. She hated black funerals, so London was hung with purple and white. In her coffin, out of sight, were Albert\'s dressing gown, a plaster cast of his hand, and a photograph and a lock of hair of John Brown.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Her Name on Everything' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She was buried beside Albert in the mausoleum at Frogmore, near Windsor. Lakes, waterfalls, cities and a whole Australian state carry her name. Her record as Britain\'s longest-reigning monarch stood until her great-great-granddaughter, Elizabeth II, passed it in 2015.',
          },
        },
      ],
    },
  ],
};

export const charlesDarwin: Verhaal = {
  id: 'charles-darwin',
  beginJaar: 1809,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Charles Darwin' },
  ondertitel: { en: 'The beetle collector whose voyage changed how we see life' },
  teaser: { en: 'A young man his father thought would never amount to anything sailed around the world, noticed something about finches and tortoises, and spent twenty years afraid to say what he had found.' },
  jaar: 1882,
  periodeLabel: '1809 - 1882',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['charles-darwin'],
  portretKleur: '#4F5D3A',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'industriele-revolutie',
  themas: ['wetenschap', 'evolutie', 'natuur', 'reizen', 'engeland'],
  leestijdMinuten: 7,
  personage: { naam: 'Charles Darwin' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Disappointment to His Father' },
      afbeelding: SCENE_IMAGES['charles-darwin-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-1'],
          alt: { en: 'A young man on his knees in a wood peeling bark from a tree to look for beetles.' },
          bijschrift: { en: 'Cambridge, around 1829: the student who would rather hunt beetles.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Charles Robert Darwin was born on 12 February 1809 in Shrewsbury, England, into a wealthy family. His father, Robert, was a successful doctor. One grandfather, Erasmus Darwin, was a famous physician and poet; the other was Josiah Wedgwood, founder of the pottery firm. His mother died when Charles was eight.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At school he was an average pupil. What he loved was collecting: shells, coins, minerals, birds\' eggs, and above all beetles. At sixteen his father sent him to Edinburgh to study medicine. Charles found the lectures dull, and after watching two operations performed without anaesthetic, including one on a child, he could not bear to watch another.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'You care for nothing but shooting, dogs, and rat-catching, and you will be a disgrace to yourself and all your family.' },
          bron: { en: 'Robert Darwin to his son, as Charles remembered it in his autobiography' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Clergyman in the Making' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His father then sent him to Cambridge to become a clergyman in the Church of England, a respectable career that would leave time for natural history. At Cambridge Charles became obsessed with beetle collecting and befriended the botany professor, John Stevens Henslow, who took him on long field walks.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Darwin once found two rare beetles and held one in each hand. Then he spotted a third. He popped one into his mouth to free a hand, but it squirted a burning liquid on his tongue and he lost two of the three.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Beagle' },
      afbeelding: SCENE_IMAGES['charles-darwin-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-2'],
          alt: { en: 'A small three-masted sailing ship leaving a grey English harbour.' },
          bijschrift: { en: '27 December 1831: HMS Beagle leaves Plymouth.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1831 Henslow received a letter. A naval ship, HMS Beagle, was about to sail around the world to survey the coasts of South America, and its captain, Robert FitzRoy, wanted a gentleman naturalist as a companion. Henslow recommended Darwin.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His father refused at first, calling it a wild scheme. Darwin\'s uncle, Josiah Wedgwood II, persuaded him to change his mind. Even FitzRoy hesitated: he believed you could read a man\'s character from his face, and he doubted that anyone with a nose like Darwin\'s had enough energy for such a voyage.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1831,
          tekst: { en: 'HMS Beagle sails from Plymouth on 27 December with Darwin on board.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Five Years at Sea' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The voyage was planned for two years. It lasted almost five. The Beagle was only about 27 metres long and carried 74 people. Darwin shared a cramped cabin, slept in a hammock above the chart table, and was horribly seasick for much of the journey. Whenever he could, he went ashore.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Giants in the Rocks' },
      afbeelding: SCENE_IMAGES['charles-darwin-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-3'],
          alt: { en: 'A young man digging enormous fossil bones out of a cliff on a South American shore.' },
          bijschrift: { en: 'Argentina, 1832: the bones of extinct giant animals.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In South America Darwin rode across the pampas with gauchos, explored rainforests and climbed the Andes. He shipped home crates of birds, plants, insects and rocks. Near Bahía Blanca in Argentina he dug the fossil bones of huge extinct animals out of the cliffs, including giant ground sloths.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The fossils puzzled him. These enormous beasts resembled the much smaller armadillos and sloths still living in the same region. Why would the animals of a continent, past and present, be related in this way?',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Shaking Earth' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 1835 he lived through a powerful earthquake in Chile. Afterwards he saw that the coast near Concepción had been lifted up out of the sea by about a metre. High in the Andes he found fossil seashells. The earth, he concluded, was not fixed. It changed slowly over immense spans of time.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'On board, Darwin read the new book by the geologist Charles Lyell, who argued that the earth had been shaped by slow processes over millions of years. It changed the way he looked at everything.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Galápagos Islands' },
      afbeelding: SCENE_IMAGES['charles-darwin-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-4'],
          alt: { en: 'A man crouching beside a giant tortoise on a rocky volcanic island.' },
          bijschrift: { en: 'September 1835: five weeks among the islands.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In September 1835 the Beagle reached the Galápagos Islands, a group of volcanic islands in the Pacific about 1,000 kilometres off the coast of Ecuador. Darwin spent five weeks there. He saw giant tortoises, sea-going lizards that dived for seaweed, and birds so tame they would land on his gun.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The vice-governor of the islands told him something remarkable: he could tell which island a tortoise came from by the shape of its shell. Darwin also noticed that the mockingbirds differed from island to island. At the time he did not realise how important this was. He even forgot to label which island many of his finches came from.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Finches' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Back in London in 1837, the bird expert John Gould examined Darwin\'s specimens and told him that the small brown birds he had collected were twelve separate species of finch, each with a differently shaped beak. Why would there be so many species, each slightly different, on a few islands so close together?',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1835,
          tekst: { en: 'Darwin visits the Galápagos Islands.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Secret Notebook' },
      afbeelding: SCENE_IMAGES['charles-darwin-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-5'],
          alt: { en: 'A man writing in a small notebook at a desk by lamplight, a simple branching sketch on the page.' },
          bijschrift: { en: '1837: "I think" and a sketch of a branching tree.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Beagle returned to England in October 1836. Darwin never left Britain again. In a private notebook in 1837 he drew a little branching diagram, like a tree, and wrote above it two words: \'I think\'. Species were not fixed. They changed over time, and all living things were related, branches of one great tree of life.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But how did they change? In 1838 he read an essay by Thomas Malthus, which argued that populations always grow faster than their food supply, so that many must die. Darwin saw the answer. In every generation, individuals that happen to be slightly better suited to their surroundings are more likely to survive and pass on their traits. Over vast periods of time, this natural selection could create new species.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Marry or Not Marry' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Before proposing to his cousin Emma Wedgwood, Darwin wrote a list of the pros and cons of marriage. Against: less money, less time for books. For: children and \'a constant companion, better than a dog anyhow\'. They married in 1839, moved to Down House in Kent, and had ten children.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was terrified of publishing his theory. It contradicted the belief that God had created every species separately, and Emma was deeply religious. He wrote it out in 1844, sealed it, and left a letter instructing her to publish it if he died. Then he spent eight years studying barnacles.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Darwin suffered for most of his adult life from a mysterious illness: exhaustion, stomach pains and vomiting. Doctors still debate what it was.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'A Letter from the Jungle' },
      afbeelding: SCENE_IMAGES['charles-darwin-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-6'],
          alt: { en: 'A man in a garden study reading a letter in shock, a stack of manuscript beside him.' },
          bijschrift: { en: 'June 1858: a letter from Alfred Russel Wallace.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1858 a letter arrived at Down House from Alfred Russel Wallace, a young naturalist collecting specimens on the islands of the Malay Archipelago. Wallace had sent an essay, asking Darwin\'s opinion. Darwin read it with horror. Wallace had arrived independently at almost exactly the same theory.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I never saw a more striking coincidence.' },
          bron: { en: 'Charles Darwin, in a letter to Charles Lyell, June 1858' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darwin\'s friends, the geologist Charles Lyell and the botanist Joseph Hooker, arranged a fair solution. On 1 July 1858 Wallace\'s essay and extracts from Darwin\'s earlier writings were read together at a meeting of the Linnean Society in London. Neither man was there: Wallace was in the jungle, and Darwin was mourning a baby son who had just died.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'On the Origin of Species' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Spurred into action, Darwin wrote his book in thirteen months. On the Origin of Species was published on 24 November 1859. The first printing of 1,250 copies was snapped up by booksellers on the day of publication.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1859,
          tekst: { en: 'On the Origin of Species is published.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'The word "evolution" does not appear in the first edition of the Origin. The very last word of the book, however, is "evolved".' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Great Debate' },
      afbeelding: SCENE_IMAGES['charles-darwin-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-7'],
          alt: { en: 'A packed Victorian lecture hall where a bishop and a scientist argue before an excited audience.' },
          bijschrift: { en: 'Oxford, 30 June 1860: the famous debate.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The book caused a storm. Some scientists were convinced at once; others were furious. Many religious people felt it left no room for God. Darwin himself stayed at home, avoiding public arguments, and let others defend him. His fiercest champion, the biologist Thomas Henry Huxley, became known as \'Darwin\'s bulldog\'.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 30 June 1860, at a meeting in Oxford, the Bishop of Oxford, Samuel Wilberforce, attacked the theory before a crowd of hundreds. According to the most famous version of events, he asked Huxley mockingly whether it was through his grandfather or his grandmother that he claimed descent from an ape.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Huxley is said to have replied that he would rather have an ape for a grandfather than a man who used his great gifts to ridicule a serious scientific discussion. No exact record was made, and both sides later claimed victory, but the story spread around the world.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Descent of Man' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the Origin Darwin had avoided writing about humans. In 1871, in The Descent of Man, he argued openly that humans had evolved from earlier primates. Cartoonists drew him with the body of an ape. Darwin collected the cartoons.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Worms and Westminster' },
      afbeelding: SCENE_IMAGES['charles-darwin-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['charles-darwin-8'],
          alt: { en: 'An old man with a long white beard walking along a gravel path in a garden.' },
          bijschrift: { en: 'Down House: the Sandwalk, where Darwin did his thinking.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darwin kept working at Down House until the end. Every day he walked several times around a gravel path in his garden, the Sandwalk, which he called his thinking path. He experimented with orchids, climbing plants and carnivorous plants, and studied how plants turn towards light.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His last book, published in 1881, was about earthworms. He had studied them for decades, measuring how they slowly bury stones and ruins by dragging leaves underground and bringing soil to the surface. He even tested whether they could hear by playing music to them. It sold faster than the Origin had.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1882,
          tekst: { en: 'Darwin dies at Down House and is buried in Westminster Abbey.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He died at Down House on 19 April 1882, aged seventy-three. He had expected to be buried in the village churchyard, but scientists and politicians pressed for a national honour, and he was buried in Westminster Abbey, a few steps from Isaac Newton.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'From so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.' },
          bron: { en: 'Charles Darwin, the final sentence of On the Origin of Species, 1859' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darwin knew nothing of genes or DNA, which were discovered later. Yet every discovery since has confirmed the core of his idea. Today evolution by natural selection is the foundation of all of modern biology.',
          },
        },
      ],
    },
  ],
};

export const nikolaTesla: Verhaal = {
  id: 'nikola-tesla',
  beginJaar: 1856,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Nikola Tesla' },
  ondertitel: { en: 'The genius of alternating current who died alone and broke' },
  teaser: { en: 'He saw a motor turning in his mind before he ever built one, lit up a world\'s fair, and threw artificial lightning across his lab. Then the money ran out.' },
  jaar: 1943,
  periodeLabel: '1856 - 1943',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['nikola-tesla'],
  portretKleur: '#283A4F',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'industriele-revolutie',
  themas: ['uitvinder', 'elektriciteit', 'wetenschap', 'amerika', 'rivaliteit'],
  leestijdMinuten: 7,
  personage: { naam: 'Nikola Tesla' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born in a Storm' },
      afbeelding: SCENE_IMAGES['nikola-tesla-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-1'],
          alt: { en: 'A small stone church and village in the mountains during a night thunderstorm.' },
          bijschrift: { en: 'Smiljan, 1856: a village in the mountains of present-day Croatia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nikola Tesla was born on 10 July 1856 in Smiljan, a village in the mountains of present-day Croatia, which was then part of the Austrian Empire. His parents were Serbs. His father, Milutin, was an Orthodox priest who wanted Nikola to become one too. Family legend says he was born at midnight during a lightning storm.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His mother, Đuka, could not read, but she was an inventor in her own right: she designed household tools and could recite long epic poems from memory. Nikola believed he got his talent from her. He had an extraordinary memory and could picture objects in his mind so vividly that he sometimes struggled to tell them from reality.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Promise' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As a teenager he fell gravely ill with cholera and lay close to death for months. He told his father he might get better if he were allowed to study engineering instead of becoming a priest. His father promised. Nikola recovered.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'As a boy Tesla stroked the family cat in the dark and saw sparks of static electricity fly from its back. He later said that moment made him wonder for the rest of his life what electricity was.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Vision in the Park' },
      afbeelding: SCENE_IMAGES['nikola-tesla-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-2'],
          alt: { en: 'A tall young man drawing a diagram in the sand with a stick in a city park at sunset.' },
          bijschrift: { en: 'Budapest, 1882: the idea of a rotating magnetic field.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Tesla studied engineering at the polytechnic in Graz, in Austria. At first he was a brilliant student who worked from three in the morning until eleven at night. Later he fell into gambling, lost his scholarship and left without a degree.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Graz a professor demonstrated a direct-current motor that sparked badly. Tesla suggested it could work without the sparking brushes. The professor told the class that was impossible. Tesla could not let the problem go.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Rotating Field' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1882, while walking in a park in Budapest with a friend and reciting lines from Goethe\'s Faust at sunset, the solution came to him in a flash. He grabbed a stick and drew a diagram in the sand: a magnetic field that rotated, driven by alternating currents. It meant a motor with no brushes at all.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1882,
          tekst: { en: 'In a Budapest park, Tesla conceives the rotating magnetic field, the basis of the AC induction motor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That year he went to work in Paris for the Continental Edison Company, a branch of Thomas Edison\'s business. His manager, impressed, wrote him a letter of introduction to Edison himself.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Working for Edison' },
      afbeelding: SCENE_IMAGES['nikola-tesla-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-3'],
          alt: { en: 'A tall young immigrant with a small bag stepping off a ship onto a crowded New York pier.' },
          bijschrift: { en: 'New York, June 1884: Tesla arrives in America.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1884 Tesla arrived in New York with very little money and the letter of introduction. Edison hired him. Tesla worked fiercely, repairing the dynamos of a ship and redesigning machinery in Edison\'s workshops.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But the two men were opposites. Edison was a practical tinkerer who tried thousand after thousand of materials until one worked. Tesla calculated everything in his head first. Edison was also committed to direct current, DC, for his power stations. Tesla was convinced that alternating current, AC, was the future.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'American Humour' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'According to Tesla\'s own account, he was promised a bonus of 50,000 dollars if he could improve Edison\'s dynamos. When he had done so and asked for the money, he was told: \'Tesla, you don\'t understand our American humour.\' Whether or not it happened exactly that way, he left Edison\'s company in early 1885.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A company he started with investors forced him out. In the winter of 1886 to 1887 the future inventor of modern electricity was digging ditches in New York for two dollars a day.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The War of the Currents' },
      afbeelding: SCENE_IMAGES['nikola-tesla-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-4'],
          alt: { en: 'Two rival engineers in a workshop beside large electrical machines, sparks between them.' },
          bijschrift: { en: 'Late 1880s: AC against DC.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1887 new investors backed Tesla\'s own company, and in 1888 he patented his alternating-current motor and system. The industrialist George Westinghouse saw their value at once and bought the patents. Tesla went to Pittsburgh to help put them into practice.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Direct current had a serious weakness: it could only be sent a short distance before losing too much power, so a city would need a power station every mile or two. Alternating current could be raised to high voltage, sent over long distances and lowered again with transformers.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Dirty Campaign' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Edison fought back. His camp claimed that AC was deadly and staged public demonstrations in which animals were killed with alternating current. When New York State adopted the electric chair for executions, Edison\'s allies made sure it ran on Westinghouse\'s AC, so that the public would associate it with death.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Westinghouse was nearly ruined by the struggle. In Tesla\'s later telling, he tore up his contract, giving up the generous royalties he was owed on every unit of AC power sold, so that Westinghouse\'s company could survive. If true, it cost him a fortune.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1888,
          tekst: { en: 'Tesla patents his AC induction motor; Westinghouse buys the rights.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The City of Light' },
      afbeelding: SCENE_IMAGES['nikola-tesla-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-5'],
          alt: { en: 'A world\'s fair at night with white palaces reflected in a lagoon and blazing with electric lights.' },
          bijschrift: { en: 'Chicago, 1893: the World\'s Columbian Exposition.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1893 the World\'s Columbian Exposition opened in Chicago. Westinghouse won the contract to light it, using Tesla\'s alternating current, and underbid Edison\'s company to do it. At night the white palaces of the fair blazed with electric light. Millions of visitors saw what AC could do.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Tesla gave dazzling demonstrations, there and in lecture halls. He let high-frequency currents pass over his body and lit glass tubes in his bare hands without any wires. Audiences thought he was a magician.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Niagara Falls' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The final victory came at Niagara Falls. A great hydroelectric power station was built there using Tesla\'s AC system. In November 1896 its power reached the city of Buffalo, about 40 kilometres away. Soon it was lighting streets and driving factories. Alternating current had won, and it still powers almost every electrical socket in the world.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1896,
          tekst: { en: 'Power from Niagara Falls reaches Buffalo using Tesla\'s alternating-current system.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1895 a fire destroyed Tesla\'s New York laboratory and years of notes, models and equipment. He had no insurance.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Lightning in Colorado' },
      afbeelding: SCENE_IMAGES['nikola-tesla-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-6'],
          alt: { en: 'A man sitting calmly in a chair in a high wooden laboratory while huge electric sparks crackle above him.' },
          bijschrift: { en: 'Colorado Springs, 1899: artificial lightning.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1898, at an electrical exhibition in Madison Square Garden, Tesla showed a small boat that he steered by radio signals from across the hall. Some spectators were convinced a trained monkey was hidden inside. It was one of the first remote-controlled machines ever demonstrated.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1899 he built a laboratory high on the plains at Colorado Springs, with a mast rising high above the roof. There he built a giant coil, a magnifying transmitter, and produced artificial lightning bolts many metres long. The thunder could be heard for kilometres. One experiment burned out the generator of the local power company and plunged the town into darkness.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Signals from Space' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'One night his instruments picked up strange, regular signals. Tesla announced that they might be messages from another planet, perhaps Mars. Scientists laughed. Today it is thought that he may have picked up natural radio signals, or signals from other experimenters.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The famous photograph of Tesla calmly reading beside giant sparks in Colorado Springs was a double exposure: the sparks were photographed first, then Tesla, sitting in the dark lab.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Wardenclyffe Tower' },
      afbeelding: SCENE_IMAGES['nikola-tesla-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-7'],
          alt: { en: 'A tall wooden tower with a mushroom-shaped dome standing next to a brick laboratory on a field.' },
          bijschrift: { en: 'Long Island, around 1902: the tower that was never finished.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Tesla\'s greatest dream was a worldwide system for sending messages, pictures and even electrical power through the air and the earth, without wires. In 1901 the banker J. P. Morgan gave him 150,000 dollars, and Tesla began building a tall tower at Wardenclyffe on Long Island.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In December 1901 the Italian inventor Guglielmo Marconi sent a radio signal across the Atlantic with simpler, cheaper equipment, partly based on ideas Tesla had patented. Tesla\'s project was far more ambitious, and far more expensive. When he asked Morgan for more money, the banker refused.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Let the future tell the truth, and evaluate each one according to his work and accomplishments. The present is theirs; the future, for which I really worked, is mine.' },
          bron: { en: 'Words attributed to Nikola Tesla' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Dream Torn Down' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Work stopped in 1906. Tesla had a breakdown. The tower stood unused for years, and in 1917 it was demolished and sold for scrap to pay his debts. In 1943 the US Supreme Court ruled on a long patent dispute, finding that Tesla\'s earlier patents anticipated part of Marconi\'s work, but by then it was too late to matter to him.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Man Who Fed the Pigeons' },
      afbeelding: SCENE_IMAGES['nikola-tesla-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nikola-tesla-8'],
          alt: { en: 'A very thin elderly man in a black coat feeding pigeons in a city park.' },
          bijschrift: { en: 'New York, 1930s: Tesla in his last years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In his later years Tesla lived in a series of New York hotels, often leaving unpaid bills behind. He had strange habits: he counted his steps, preferred numbers divisible by three, and was terrified of germs. Each year on his birthday he gave interviews announcing fantastic inventions, including a \'death ray\' to end war. None was ever built.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He never married. His closest companions were the pigeons of New York, which he fed in the parks and cared for in his hotel room. He said he loved one white pigeon as a man loves a woman.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1943,
          tekst: { en: 'Tesla dies alone in room 3327 of the Hotel New Yorker on 7 January, aged 86.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He died alone in his room at the Hotel New Yorker on 7 January 1943, aged eighty-six, deep in debt. Government officials took away his papers, worried that they might contain military secrets.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Remembered at Last' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For decades he was almost forgotten, while Edison was celebrated. Today the international unit of magnetic flux density is called the tesla, Belgrade\'s airport carries his name, and an electric car company was named after him. The alternating current in every wall socket is his true monument.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Tesla held around 300 patents in many countries and spoke several languages, including Serbian, English, German, French and Italian.' },
        },
      ],
    },
  ],
};

export const harrietTubman: Verhaal = {
  id: 'harriet-tubman',
  beginJaar: 1822,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Harriet Tubman' },
  ondertitel: { en: 'She escaped slavery, then went back again and again for others' },
  teaser: { en: 'Born enslaved in Maryland, she walked to freedom by the North Star. Then she returned to the South about thirteen times to lead others out, and later guided Union gunboats on a raid that freed hundreds.' },
  jaar: 1913,
  periodeLabel: 'c. 1822 - 1913',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['harriet-tubman'],
  portretKleur: '#6B4A2E',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'industriele-revolutie',
  themas: ['slavernij', 'vrijheid', 'verenigde-staten', 'burgeroorlog', 'moed'],
  leestijdMinuten: 7,
  personage: { naam: 'Harriet Tubman' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Araminta' },
      afbeelding: SCENE_IMAGES['harriet-tubman-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-1'],
          alt: { en: 'A young girl walking through a cold marsh at dawn, checking traps in the water.' },
          bijschrift: { en: 'Maryland, around 1830: a childhood of hard labour.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She was born around 1822 on a plantation in Dorchester County, on the Eastern Shore of Maryland, and named Araminta Ross. Her parents, Ben Ross and Harriet \'Rit\' Green, were enslaved, and so were she and her eight brothers and sisters. Like most enslaved people, she never knew her exact birthday.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her owner rented her out to other families from the age of about five or six. She was made to look after a baby through the night and was whipped whenever it cried. Later she was sent to check muskrat traps in the freezing marshes, until she fell ill with measles. She was a small child doing an adult\'s work.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Sisters Sold Away' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The worst fear in every enslaved family was being sold. Three of Araminta\'s sisters were sold to buyers further south and were never seen by their family again. Once, her mother hid a younger son for a month to stop him from being sold, and threatened to strike anyone who came for him. The sale was called off. Araminta never forgot it.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Tubman never learned to read or write. Everything we know of her own words comes from interviews and from people who wrote down her stories.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Blow to the Head' },
      afbeelding: SCENE_IMAGES['harriet-tubman-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-2'],
          alt: { en: 'A young woman resting beside a field, her head bandaged, as other workers labour behind her.' },
          bijschrift: { en: 'Around 1835: an injury that marked her for life.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When she was a teenager, Araminta was sent to a village store. An enslaved man had left his work without permission, and the overseer chasing him threw a heavy iron weight at him. It missed and struck Araminta on the head.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'The weight broke my skull... they carried me to the house all bleeding and fainting.' },
          bron: { en: 'Harriet Tubman, recalling the injury years later' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She was sent back to work in the fields, blood and sweat running down her face. For the rest of her life she suffered severe headaches and sudden spells in which she fell asleep, often in the middle of a sentence. She also had vivid dreams and visions, which she believed were messages from God.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Strong as a Man' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As she grew up she was hired out to work in the timber trade and in the fields. She was barely 1.5 metres tall but immensely strong, able to haul logs and drive oxen. From Black men who worked the ships and timber roads she heard about the routes north and about people who had escaped.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1844 she married a free Black man named John Tubman. At about that time she took a new first name: Harriet, after her mother.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Following the North Star' },
      afbeelding: SCENE_IMAGES['harriet-tubman-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-3'],
          alt: { en: 'A woman walking alone through a dark forest at night, guided by a bright star above the trees.' },
          bijschrift: { en: '1849: the escape to Pennsylvania.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1849 her owner died, and his widow began selling enslaved people to pay his debts. Harriet was certain she would be sold south. In the autumn she escaped alone, leaving her husband behind.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She travelled about 140 kilometres, mostly at night, through forest and marsh, using the North Star as her guide. Along the way she was helped by members of a secret network: free Black families, Quakers and other opponents of slavery who hid fugitives in their houses, barns and wagons. This network was known as the Underground Railroad.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'When I found I had crossed that line, I looked at my hands to see if I was the same person. There was such a glory over everything.' },
          bron: { en: 'Harriet Tubman, recalling her arrival in Pennsylvania, as recorded by Sarah Bradford' },
        },
        {
          type: 'kop',
          tekst: { en: 'Free, but Alone' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Philadelphia she found work as a cook and cleaner and saved her money. But she was free in a strange land, and her family was still enslaved. She decided she would bring them north.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1849,
          tekst: { en: 'Harriet Tubman escapes from slavery in Maryland to Pennsylvania.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Underground Railroad' },
      afbeelding: SCENE_IMAGES['harriet-tubman-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-4'],
          alt: { en: 'People hiding in the hayloft of a barn by lantern light while a farmer keeps watch at the door.' },
          bijschrift: { en: 'A "station" on the Underground Railroad.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Underground Railroad was neither underground nor a railroad. It was a loose network of secret routes and safe houses. Its members borrowed railway words as code: the guides were \'conductors\', the safe houses \'stations\', and the people fleeing \'passengers\'.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In December 1850 Harriet made her first rescue. Her niece Kessiah was about to be sold at auction in the town of Cambridge, Maryland, together with her two small children. Kessiah\'s free husband made the winning bid, then slipped away with his family while the auctioneer was at lunch. Harriet met them in Baltimore and led them to Philadelphia.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Harsher Law' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That same year the US Congress passed the Fugitive Slave Act. It required people even in the free Northern states to help capture escaped slaves and send them back. The North was no longer safe. From then on Harriet led her passengers all the way to Canada, where slavery had been abolished, mostly to the town of St. Catharines in Ontario.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1850,
          tekst: { en: 'The Fugitive Slave Act makes the North unsafe for people who have escaped.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'They Called Her Moses' },
      afbeelding: SCENE_IMAGES['harriet-tubman-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-5'],
          alt: { en: 'A small woman leading a group of people across a shallow river at night.' },
          bijschrift: { en: 'The 1850s: about thirteen trips back into Maryland.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Over about ten years Harriet returned to Maryland around thirteen times. She led about seventy people to freedom herself, including several of her brothers, and gave directions to dozens more who escaped on their own. People began calling her Moses, after the prophet who led his people out of slavery in Egypt.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She planned carefully. She travelled in winter, when the nights were long, and often started an escape on a Saturday night, because runaway notices could not appear in the newspapers until Monday. She used songs to signal danger or safety, and gave babies a medicine to keep them quiet.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I never ran my train off the track and I never lost a passenger.' },
          bron: { en: 'Harriet Tubman, speaking at a convention in 1896' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Rescue for Her Parents' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1857 she went back for her elderly parents, who could no longer walk long distances. She brought them out in a makeshift cart pulled by an old horse and took them all the way to Canada. Not every rescue worked out. When she had gone back for her husband John in 1851, she found he had married another woman and did not want to leave.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'It is often said that slaveholders put a reward of 40,000 dollars on Tubman\'s head. Historians have found no evidence of it. The only known notice, from 1849, offered up to 100 dollars each for her and two of her brothers.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'General Tubman' },
      afbeelding: SCENE_IMAGES['harriet-tubman-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-6'],
          alt: { en: 'A grey-bearded man with fierce eyes and a small woman talking intensely in a modest parlour.' },
          bijschrift: { en: '1858: Tubman meets the abolitionist John Brown.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1858 she met John Brown, a radical opponent of slavery who planned to start an armed uprising of the enslaved. He was so impressed by her that he called her \'General Tubman\'. She helped him find recruits in Canada, but she was ill when he launched his raid on the government arsenal at Harpers Ferry, Virginia, in October 1859. The raid failed, and Brown was hanged.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1859 she bought a small house and land in Auburn, in the state of New York, from the politician William Seward, who sold it to her on easy terms. Because she was still a fugitive under the law, it was a risky deal for both of them. Her parents moved there, and Auburn became her home for the rest of her life.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Rescue in Troy' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 1860, passing through the town of Troy, New York, she heard that a man who had escaped slavery, Charles Nalle, had been arrested and was about to be sent back. Harriet joined the crowd outside the courthouse, and in the struggle that followed she seized him and helped pull him free. He escaped to safety.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1859,
          tekst: { en: 'John Brown\'s raid on Harpers Ferry brings the country closer to civil war.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Combahee River Raid' },
      afbeelding: SCENE_IMAGES['harriet-tubman-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-7'],
          alt: { en: 'Union steamboats on a misty river at dawn as crowds of people rush towards them from the rice fields.' },
          bijschrift: { en: '2 June 1863: the raid on the Combahee River.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the Civil War began in 1861, Tubman went south to help the Union army in South Carolina. She worked as a nurse and a cook, and then as a scout and spy. She recruited formerly enslaved men who knew the rivers and the land and gathered information about Confederate positions.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the night of 1 June 1863 she guided three Union gunboats with a regiment of Black soldiers up the Combahee River. Using her information, the boats avoided the mines the Confederates had laid in the water. At dawn they reached the rice plantations along the banks.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Seven Hundred Free' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the boats blew their whistles, enslaved people came running from the fields, carrying children, pots and even pigs. In one morning more than 700 people were freed. Tubman became the first woman known to have helped lead an armed raid in the war.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1863,
          tekst: { en: 'Tubman helps lead the Combahee River Raid, freeing more than 700 people.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Despite years of service, Tubman was never properly paid by the army. Only decades later did she receive a pension, at first as the widow of her second husband, a Union veteran.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Free at Last' },
      afbeelding: SCENE_IMAGES['harriet-tubman-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['harriet-tubman-8'],
          alt: { en: 'An elderly woman with a cane sitting on the porch of a wooden house surrounded by visitors.' },
          bijschrift: { en: 'Auburn, New York: Tubman\'s home in her later years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the war Harriet returned to Auburn. In 1869 she married Nelson Davis, a younger Union veteran. Though she was always poor, she took in elderly people, the sick and children with nowhere else to go. She raised money by selling vegetables and telling her story.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She also campaigned for women\'s right to vote, speaking at meetings alongside leading suffragists. Late in life, suffering from her old head injury, she underwent brain surgery in Boston. According to her own account, she refused anaesthetic and bit down on a bullet, as she had seen soldiers do.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Her Last Words' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1908 she opened a home for elderly Black people on land next to her house. She moved into it herself in her final years. She died of pneumonia on 10 March 1913, aged about ninety-one, surrounded by friends and family. She was buried in Auburn with military honours.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I go to prepare a place for you.' },
          bron: { en: 'Harriet Tubman\'s last words, quoting the Bible, 1913' },
        },
        {
          type: 'sleutelmoment',
          jaar: 1913,
          tekst: { en: 'Harriet Tubman dies in Auburn, New York.' },
        },
      ],
    },
  ],
};

export const ottoVonBismarck: Verhaal = {
  id: 'otto-von-bismarck',
  beginJaar: 1815,
  toegevoegdOp: '2026-10-28',
  titel: { en: 'Otto von Bismarck' },
  ondertitel: { en: 'The Iron Chancellor who forged Germany with blood and iron' },
  teaser: { en: 'A hard-drinking, duel-fighting country squire became the most powerful statesman in Europe. He won three wars to unite Germany, then spent twenty years keeping the peace.' },
  jaar: 1898,
  periodeLabel: '1815 - 1898',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['otto-von-bismarck'],
  portretKleur: '#3D3A35',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'industriele-revolutie',
  themas: ['duitsland', 'politiek', 'oorlog', 'eenwording', 'diplomatie'],
  leestijdMinuten: 7,
  personage: { naam: 'Otto von Bismarck' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Mad Junker' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-1'],
          alt: { en: 'A tall young student with a large dog walking through a German university town, other students staring.' },
          bijschrift: { en: 'Göttingen, 1830s: the wild student.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Otto von Bismarck was born on 1 April 1815, eleven weeks before the Battle of Waterloo, on his family\'s estate at Schönhausen in Prussia. His father was a Junker, a member of the landowning nobility of eastern Prussia. His mother came from a family of educated civil servants and wanted her son to be a diplomat.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the University of Göttingen he became famous for drinking, debts and duels. He walked the streets with a huge dog and is said to have fought around twenty-five duels in his first terms, getting just one scar. People called him \'the mad Junker\'.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Bored Official, Bored Farmer' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He tried a career in the Prussian civil service and hated it, leaving after quarrels and a love affair. Then he went home to run the family estates, where he read widely, rode wildly and drank heavily. Neighbours shook their heads at the young man who seemed to be wasting himself.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Bismarck was famous for his enormous appetite. A breakfast could include several eggs, cold meats and quantities of beer or champagne. The pickled Bismarck herring is named after him.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Diplomat' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-2'],
          alt: { en: 'A tall man in a dark coat standing on a frozen bank of a river in St Petersburg in winter.' },
          bijschrift: { en: '1859: ambassador in St Petersburg.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1847 he married Johanna von Puttkamer, a deeply religious woman, and entered politics as a fierce conservative. When revolutions swept across Europe in 1848 and crowds in Berlin demanded a constitution and a united Germany, Bismarck was horrified. He stood firmly with the king.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At that time there was no Germany. There were about thirty-nine separate German states, from large kingdoms like Prussia and Bavaria to tiny principalities, loosely joined in a German Confederation dominated by the Austrian Empire.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Learning the Game' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1851 the king of Prussia sent him as envoy to the Confederation\'s assembly in Frankfurt. There he came to a firm conclusion: Prussia and Austria could not both lead Germany. One day one of them would have to give way. Later he served as ambassador in St Petersburg and Paris, where he studied the rulers of Europe closely.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1851,
          tekst: { en: 'Bismarck becomes Prussia\'s envoy to the German Confederation in Frankfurt.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Blood and Iron' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-3'],
          alt: { en: 'A tall man in uniform addressing a committee of parliament from behind a table.' },
          bijschrift: { en: '30 September 1862: the "blood and iron" speech.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1862 King Wilhelm I of Prussia was locked in a crisis with parliament, which refused to pay for his plans to enlarge the army. The king was close to giving up the throne. As a last resort he appointed Bismarck as his chief minister.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'The great questions of the day will not be decided by speeches and majority decisions, that was the great mistake of 1848 and 1849, but by iron and blood.' },
          bron: { en: 'Otto von Bismarck to a committee of the Prussian parliament, 30 September 1862' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The speech caused an uproar, and the phrase \'blood and iron\' stuck to him for ever. When parliament still refused the money, Bismarck simply governed without an approved budget and collected the taxes anyway, for four years.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Master of Timing' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Bismarck was not a man of fixed plans. He compared politics to a man walking through a forest who waits until he hears the footsteps of God, then grabs the hem of His coat. He kept several options open and seized the moment when it came.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1862,
          tekst: { en: 'Bismarck becomes Minister-President of Prussia.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Three Wars: Denmark and Austria' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-4'],
          alt: { en: 'Prussian soldiers in spiked helmets advancing through smoke across a hilly battlefield.' },
          bijschrift: { en: '3 July 1866: the Battle of Königgrätz.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The first opportunity came in 1864. Prussia and Austria together fought a short war against Denmark over the duchies of Schleswig and Holstein, which had large German populations. Denmark was defeated, and the two victors shared the territories between them. Bismarck knew that sharing them would lead to quarrels.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1866 the quarrel came. Prussia went to war with Austria. Prussian troops were armed with a new breech-loading rifle that could be loaded lying down, much faster than the Austrians\' muzzle-loaders, and they were moved to the front by railway. On 3 July 1866 the Prussians crushed the Austrians at Königgrätz, in Bohemia.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1866,
          tekst: { en: 'Prussia defeats Austria at Königgrätz; Austria is pushed out of German affairs.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Generous Peace' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The king and the generals wanted to march on Vienna and take Austrian land. Bismarck refused, fighting them so furiously that he wept with rage and threatened to resign. He wanted Austria as a future friend, not an enemy thirsting for revenge. Austria lost no territory to Prussia, but it had to stay out of Germany.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Prussia then joined the northern German states into a North German Confederation under its leadership. Only the southern German states, including Bavaria, remained outside.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Hall of Mirrors' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-5'],
          alt: { en: 'Officers in uniform raising their swords and cheering an emperor in a palace hall lined with mirrors.' },
          bijschrift: { en: '18 January 1871: the German Empire is proclaimed at Versailles.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The southern German states would only join a war against a common enemy. Bismarck found one in France, ruled by Emperor Napoleon III, the nephew of Napoleon Bonaparte. In July 1870 a dispute arose over a German prince who had been offered the throne of Spain.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Bismarck received a telegram from the king describing a polite meeting with the French ambassador at the spa town of Ems. He shortened it before releasing it to the press, so that it seemed both sides had insulted each other. As he expected, it caused fury in Paris. On 19 July 1870 France declared war.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Sedan and Versailles' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'All the German states fought together. On 2 September 1870, at Sedan, the French army was surrounded and Napoleon III himself was taken prisoner. Paris was besieged for months.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 18 January 1871, in the Hall of Mirrors in the palace of Versailles, outside the besieged French capital, King Wilhelm I of Prussia was proclaimed German Emperor. Bismarck became the first Chancellor of the German Empire. The French never forgot the humiliation of the place.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'France also had to give up Alsace and part of Lorraine. In 1919, after the First World War, France made a defeated Germany sign the peace treaty in that same Hall of Mirrors.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Iron Chancellor at Home' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-6'],
          alt: { en: 'Factory workers leaving a large brick factory gate at the end of a shift.' },
          bijschrift: { en: '1880s: the first social insurance in the world.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Bismarck ruled the new empire as Chancellor for almost twenty years. He was a ruthless opponent of anyone he saw as a threat to it. In the 1870s he waged a struggle against the Catholic Church, the Kulturkampf, imprisoning and expelling priests. In 1878 he outlawed socialist organisations and newspapers.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But he also tried to win the workers away from socialism. Germany was industrialising fast, and factory workers who fell ill, were injured or grew old had nothing to live on. Bismarck introduced something no country had ever had: state insurance for workers.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1883,
          tekst: { en: 'Germany introduces health insurance for workers, the first of Bismarck\'s social laws.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Health insurance came in 1883, accident insurance in 1884, and pensions for old age and disability in 1889. Workers, employers and the state all paid in. It was the start of what we now call the welfare state, and countries across the world later copied it.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The first German old-age pension started at the age of seventy. Few workers lived that long.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Honest Broker' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-7'],
          alt: { en: 'Diplomats around a large table in an elegant hall, studying maps of Europe.' },
          bijschrift: { en: 'Berlin, 1878: Bismarck hosts the great powers.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Having won three wars, Bismarck now wanted peace. Germany, he said, was \'satisfied\'. A new war could only destroy what he had built. His great fear was that France would one day find allies and attack Germany from two sides at once.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1878, after a war between Russia and the Ottoman Empire, the great powers came to Berlin to redraw the map of the Balkans. Bismarck presented himself as an \'honest broker\' who wanted nothing for Germany. The congress avoided a wider war, though it left many peoples of the Balkans bitterly disappointed.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Web of Alliances' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He wove a complicated network of treaties: an alliance with Austria-Hungary, a league with Austria and Russia, and later a secret treaty with Russia. The aim was always the same: to keep France isolated and to keep Russia and Austria from going to war with each other.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1884 and 1885 he hosted another conference in Berlin, where European powers set out rules for claiming African territory. No Africans were invited. Germany itself acquired colonies in Africa and the Pacific, though Bismarck had long been sceptical about them.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1878,
          tekst: { en: 'The Congress of Berlin, with Bismarck as host and "honest broker".' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Dropping the Pilot' },
      afbeelding: SCENE_IMAGES['otto-von-bismarck-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['otto-von-bismarck-8'],
          alt: { en: 'An old man in a long coat walking down the gangway of a ship while a young emperor watches from the deck.' },
          bijschrift: { en: 'March 1890: the young emperor dismisses the old chancellor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1888 the old emperor Wilhelm I died. His son, Frederick III, was already dying of throat cancer and reigned for only ninety-nine days. Then his grandson became emperor: Wilhelm II, twenty-nine years old, impatient and determined to rule personally.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The young emperor and the old chancellor clashed over workers\' rights, foreign policy and above all over who was in charge. In March 1890 Wilhelm II forced Bismarck to resign. The British magazine Punch published a famous cartoon of the old pilot leaving the ship while the emperor watched from above. It was called Dropping the Pilot.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1890,
          tekst: { en: 'Wilhelm II forces Bismarck to resign.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Last Years' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Bismarck retired to his estate at Friedrichsruh, near Hamburg, and spent his last years writing his memoirs and attacking the new government in the newspapers. Germans built hundreds of Bismarck towers and statues in his honour. He died on 30 July 1898, aged eighty-three.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After his fall, Germany let his treaty with Russia lapse. Russia and France became allies, the very thing he had feared most. Sixteen years after his death, the alliance system he had built to keep the peace dragged Europe into the First World War.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Bismarck is often quoted as predicting that the next great war would start from "some damned foolish thing in the Balkans". There is no reliable source for the words, but in 1914 a war did begin with a murder in the Balkan city of Sarajevo.' },
        },
      ],
    },
  ],
};

export const industrieleRevolutie: Verhaal[] = [james, florence, thomas, napoleonBonaparte, abrahamLincoln, queenVictoria, charlesDarwin, nikolaTesla, harrietTubman, ottoVonBismarck];

