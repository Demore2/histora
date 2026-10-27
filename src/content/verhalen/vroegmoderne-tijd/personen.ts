import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

export const leonardo: Verhaal = {
  id: 'leonardo-da-vinci',
  beginJaar: 1452,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Leonardo da Vinci' },
  ondertitel: { en: 'Renaissance Master of Art, Science, and Invention' },
  teaser: { en: 'A mind that saw possibilities in everything—from a perfect smile to the mechanics of flight.' },
  jaar: 1519,
  periodeLabel: '1452 - 1519',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['leonardo-da-vinci'],
  portretKleur: '#C9A961',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['kunst', 'wetenschap', 'vernieuwing', 'genialiteit', 'renaissance'],
  leestijdMinuten: 6,
  personage: { naam: 'Leonardo da Vinci' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Boy from Vinci' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-1'],
          alt: { en: 'A boy sketching a hawk on a terraced Tuscan hillside above the Arno valley.' },
          bijschrift: { en: 'Born out of wedlock, he was barred from university — and from his father’s profession.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the small Tuscan village of Vinci, in 1452, a boy was born who would become one of history\'s greatest minds. Leonardo da Vinci came into the world as the illegitimate son of a notary, which meant he couldn\'t attend university or follow his father\'s profession. Instead of seeing this as a limitation, young Leonardo saw it as freedom. While other boys studied Latin and philosophy from books, Leonardo studied the world around him—the movement of water, the structure of plants, the way light fell across a landscape.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'His father recognized his son\'s talent and, around age fourteen, arranged for Leonardo to apprentice with Andrea del Verrocchio, one of Florence\'s finest artists. Verrocchio\'s workshop was a place of constant creation—painters, sculptors, and engineers worked side by side, learning from each other. Here, Leonardo would master the fundamentals of art: how to mix colors, carve marble, and understand human anatomy. But more importantly, he learned that art and science were not separate pursuits—they were two ways of understanding the same universe.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Florentine Years' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-2'],
          alt: { en: 'Apprentices at work in a busy Florentine artist’s workshop.' },
          bijschrift: { en: 'Verrocchio’s workshop taught painting, sculpture, metalwork and engineering as one trade.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By his early twenties, Leonardo was one of Florence\'s most promising artists. He painted altarpieces, designed armor, and created intricate drawings of imaginary weapons. But he was never content with just one thing. While working as an artist, he was also observing human anatomy by studying corpses, drawing detailed sketches of muscles and bones that wouldn\'t be seen again in scientific drawings for centuries. He filled notebooks with observations about optics, engineering, and the natural world.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'Around 1482, Leonardo decided to leave Florence for Milan, where the powerful Duke Ludovico Sforza ruled. Leonardo wrote the Duke a letter offering his services—not primarily as an artist, but as an engineer and weapons designer. He knew that princes valued military innovation and architectural knowledge. Once in Milan, Leonardo found exactly what he wanted: a patron wealthy enough to support his endless curiosities, and a city full of projects where art and engineering could merge.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Masterpieces and Mysteries' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-3'],
          alt: { en: 'A painter on scaffolding at work on a fresco across a monastery refectory wall.' },
          bijschrift: { en: 'He painted The Last Supper in an experimental technique. It began flaking within twenty years.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In Milan, Leonardo created some of his most famous works. He painted "The Last Supper" on the wall of the monastery of Santa Maria delle Grazie—not a simple religious scene, but a moment frozen in time, with each apostle reacting differently to Jesus\'s announcement of betrayal. He sketched flying machines that wouldn\'t actually fly until four hundred years later. He designed canals, bridges, and cities that were centuries ahead of their time. His notebooks from these years contain thousands of observations written in his distinctive mirror script—backwards writing that only he could easily read.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Yet for all his productivity, Leonardo was also a perfectionist who struggled to finish things. He would work on the same painting for years, never quite satisfied. He took commissions he never completed. He started projects with enthusiasm and abandoned them when new ideas captured his attention. This was both his genius and his curse—his mind was always reaching for the next discovery, the next possibility, the next connection between seemingly unrelated things.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'The Scientist-Artist' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-4'],
          alt: { en: 'A candlelit study walled with anatomical drawings, a skull and brass dividers on the table.' },
          bijschrift: { en: 'He dissected some thirty bodies and drew what he found, centuries before textbooks caught up.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'What made Leonardo unique was his refusal to accept any boundary between art and science. When he wanted to paint the human body accurately, he dissected corpses—a controversial and dangerous practice—to understand the placement of muscles and organs. When he wanted to paint water correctly, he studied its flow patterns for years. His anatomical drawings were so precise and detailed that modern surgeons have studied them with admiration. He drew the human heart and understood its function centuries before medical science could confirm it.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'Whoever loves practice without theory is like a sailor steering without rudder and compass.' },
          bron: { en: 'Leonardo da Vinci' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Dreams of Flight' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-5'],
          alt: { en: 'A workshop loft hung with wing models and studies of birds in flight.' },
          bijschrift: { en: 'None of his flying machines flew. The observations behind them were sound anyway.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Among all of Leonardo\'s obsessions, one captured his imagination like no other: human flight. He watched birds for hours, sketching their wing movements and theorizing about air currents. He filled page after page with designs for flying machines—some with wings like a bat, others like a bird, still others like nothing nature had ever created. He designed a massive mechanical device he called the "ornithopter" that he believed a man could operate to soar through the air. He thought about parachutes and helicopters centuries before they existed.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Though Leonardo never flew himself, his vision wasn\'t mere fantasy. It was based on careful observation and logical thinking. When aviation finally became reality, engineers looked back at his designs and found principles that actually worked. His dream of human flight was a dream of understanding nature so completely that humans could do what only birds could do—an ambitious goal that showed the extraordinary scope of his ambitions.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Restless Genius' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-6'],
          alt: { en: 'An ageing master beside a small portrait of a seated woman on an easel.' },
          bijschrift: { en: 'He carried the Mona Lisa with him for years and never delivered it to whoever ordered it.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Leonardo grew older, he remained restless. When Milan fell to French forces, he left the city he had called home for nearly two decades. He returned to Florence, where he painted the "Mona Lisa"—the portrait that would become the most famous painting in the world, famous partly for the mysterious quality of the woman\'s smile, achieved through Leonardo\'s perfect understanding of how light and shadow could convey emotion.' },
        },
        {
          type: 'tekst',
          inhoud: { en: 'He served Cesare Borgia as a military engineer, later lived in Rome under the protection of Giuliano de\' Medici, and continued his endless investigations into nature. He designed cities with advanced sanitation systems. He studied geology and fossils, trying to understand the history of the earth. He examined the flow of water and the structure of spirals in nature. At sixty, most people might retire, but Leonardo\'s curiosity showed no signs of slowing down.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Final Years' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-7'],
          alt: { en: 'An old man in a red robe among stacks of notebooks in a French manor room.' },
          bijschrift: { en: 'Amboise, 1519. He had arrived in France with his notebooks and three paintings.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1516, King Francis I of France invited Leonardo to come to his court. By then Leonardo was an old man, living in a time that had moved beyond him in some ways, yet remained forever ahead of him in imagination. He brought his notebooks with him, thousands of pages filled with observations, sketches, and ideas. At the French court, he was treated with respect as a sage and artist, though his body was failing. He spent his time refining his drawings, explaining his ideas to anyone who would listen, and continuing to dream.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Leonardo da Vinci died on May 2, 1519, at the age of sixty-seven. He left behind fewer than twenty completed paintings, but thousands of notebook pages that showed a mind operating on a level most people had never imagined. He left behind flying machines that would inspire engineers centuries later, anatomical drawings that advanced medical science, and the idea that human knowledge wasn\'t divided into separate boxes but was one vast, interconnected exploration of the universe.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'A Legacy of Wonder' },
      afbeelding: SCENE_IMAGES['leonardo-da-vinci-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['leonardo-da-vinci-8'],
          alt: { en: 'Open Renaissance notebooks in mirror writing under a museum spotlight.' },
          bijschrift: { en: 'About 7,000 notebook pages survive — perhaps a third of what he actually wrote.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'What made Leonardo truly great wasn\'t that he mastered any single field—he didn\'t really. He left numerous projects unfinished and many of his ideas remained only sketches. What made him great was his conviction that everything in the universe was worth understanding. A military engineer could be an artist. An artist could be a scientist. A scientist could be a visionary. He refused to accept that human knowledge had limits or boundaries.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'When we look at Leonardo today, more than five hundred years after his death, we see a man who truly represented the Renaissance ideal—not someone who knew everything, but someone who believed everything was worth learning. His paintings moved people because they showed his understanding of human emotion. His inventions worked (when built by others) because they were based on careful observation. His sketches continue to inspire because they show a mind that saw possibility everywhere. Leonardo da Vinci stands as a reminder that the most creative human minds are those that refuse to be confined to a single discipline.' }
        }
      ]
    }
  ]
};

export const galileo: Verhaal = {
  id: 'galileo-galilei',
  beginJaar: 1564,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Galileo Galilei' },
  ondertitel: { en: 'The Stargazer Who Changed Science' },
  teaser: { en: 'When Galileo looked through his telescope, he didn\'t just see the stars—he saw a universe that contradicted everything people believed.' },
  jaar: 1642,
  periodeLabel: '1564 - 1642',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['galileo-galilei'],
  portretKleur: '#8B7355',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['wetenschap', 'astronomie', 'vernieuwing', 'kerk', 'waarheid'],
  leestijdMinuten: 6,
  personage: { naam: 'Galileo Galilei' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Young Mathematician' },
      afbeelding: SCENE_IMAGES['galileo-galilei-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-1'],
          alt: { en: 'A student watching a bronze lamp swing on its chain in Pisa cathedral.' },
          bijschrift: { en: 'He enrolled to study medicine and left, against his father’s wishes, for mathematics.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1564, the same year William Shakespeare was born, another child entered the world who would reshape human understanding—Galileo Galilei, born in Pisa, Italy. His father was a merchant and musician, a man of talent but modest means. Galileo\'s early life wasn\'t marked by extraordinary advantage, but rather by an extraordinary mind. As a student, he was curious about everything—how things moved, why pendulums swung at constant rhythms, how the natural world actually worked rather than how ancient authorities said it should work.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'At the University of Pisa, Galileo was supposed to study medicine, but mathematics and physics captured his imagination instead. He showed a talent for mathematics that impressed his teachers, and eventually he became a professor of mathematics. But Galileo wasn\'t content to simply teach the mathematics that had been accepted for centuries. He wanted to verify it, test it, and improve it. He believed that nature could be understood through careful observation and mathematics, not just through ancient texts and logical debate.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'Challenging the Ancient Authorities' },
      afbeelding: SCENE_IMAGES['galileo-galilei-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-2'],
          alt: { en: 'Two spheres of different size falling from a leaning bell tower.' },
          bijschrift: { en: 'The tower story may be legend. The result — equal fall, whatever the weight — was not.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In Galileo\'s time, scientific knowledge rested on the authority of ancient philosophers, especially Aristotle, who had lived over two thousand years earlier. Aristotle had taught that heavier objects fall faster than lighter ones. This seemed logical—if you dropped a cannonball and a feather, the cannonball hit the ground first. But Galileo questioned this assumption. He realized that the feather fell slowly because of air resistance, not because it was inherently slower. If you could eliminate air resistance, he theorized, both objects would fall at the same speed.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Whether or not Galileo actually dropped objects from the Leaning Tower of Pisa (the famous story may be exaggerated), he certainly conducted experiments and mathematical calculations that proved Aristotle wrong. This was revolutionary. For centuries, scholars had accepted that if Aristotle said something, it must be true. Galileo demonstrated that the way to find truth wasn\'t to defer to ancient authorities but to observe nature directly and test ideas systematically. This approach—what we now call the scientific method—would change human knowledge forever.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'The Telescope Arrives' },
      afbeelding: SCENE_IMAGES['galileo-galilei-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-3'],
          alt: { en: 'A scholar on a Venetian rooftop aiming a long wooden tube at the moon.' },
          bijschrift: { en: 'He did not invent the telescope. He built a far better one and pointed it upward.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1609, when Galileo was forty-five years old, he heard rumors of a new invention coming from the Netherlands—a "spyglass" or telescope that could make distant objects appear close. Within weeks, Galileo had constructed his own telescope using his understanding of lenses and optics. His version was crude by modern standards but powerful for its time, magnifying objects about thirty times their actual size. He realized immediately what this meant: he could see the heavens in detail never before possible.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'That winter, Galileo pointed his telescope at the sky and began a revolution. He saw that the Moon wasn\'t a perfect, smooth sphere as scholars believed—it had mountains and valleys, craters and shadows, just like Earth. He saw that Jupiter wasn\'t alone in the sky—it had moons orbiting it, small bodies dancing around the giant planet. He saw that Venus went through phases, like the Moon, which was impossible if the Earth was the center of the universe. For the first time, a human being was seeing the cosmos with unprecedented clarity, and what he saw contradicted everything the authorities had taught.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Supporting the Sun' },
      afbeelding: SCENE_IMAGES['galileo-galilei-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-4'],
          alt: { en: 'A candlelit study with an armillary sphere and a sun-centred diagram.' },
          bijschrift: { en: 'Copernicus had published the idea in 1543. What Galileo added was evidence.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'For over a thousand years, the Christian Church and almost all European scholars had accepted that Earth was the center of the universe. The Sun, Moon, and stars all orbited around us. It made intuitive sense—the Earth felt still and solid, and the heavens seemed to move around us. But in the 1500s, a Polish astronomer named Copernicus had proposed something radical: what if the Earth orbited the Sun instead? What if we were not the center of everything?' },
        },
        {
          type: 'citaat',
          tekst: { en: 'I do not feel obliged to believe that the same God who has endowed us with sense, reason, and intellect has intended us to forgo their use.' },
          bron: { en: 'Galileo Galilei' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Conflict with Authority' },
      afbeelding: SCENE_IMAGES['galileo-galilei-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-5'],
          alt: { en: 'An astronomer offering a telescope to sceptical cardinals in a Roman palace.' },
          bijschrift: { en: 'Some churchmen looked through it and were convinced. Others refused to look at all.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Galileo\'s telescope observations supported Copernicus\'s ideas. If the Earth were the center, Venus shouldn\'t show phases as it orbited the Sun. If the Earth were the center, Jupiter\'s moons shouldn\'t orbit Jupiter—they should orbit Earth. Galileo published his findings in 1610 in a book called "The Starry Messenger," which made him famous but also put him in danger. The Church considered the Copernican theory heretical—contrary to Scripture and to the teaching of the Church Fathers.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'In 1616, Pope Paul V called Galileo to Rome and warned him not to support the Copernican theory. Galileo complied—for a while. He continued his scientific work but tried to avoid the theological controversy. However, his personality made silence difficult. He was brilliant, confident, and not inclined to hide his views. In 1632, he published another book, "Dialogue Concerning the Two Chief World Systems," which, despite its careful writing, clearly favored the heliocentric system. The Church saw this as defiance.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'The Trial' },
      afbeelding: SCENE_IMAGES['galileo-galilei-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-6'],
          alt: { en: 'An old scholar kneeling before a semicircle of seated inquisitors.' },
          bijschrift: { en: '1633: he recanted, and spent the last nine years of his life under house arrest.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1633, Galileo, now almost seventy years old, was brought before the Inquisition—the Church\'s court for matters of heresy. He was ordered to renounce his support for heliocentrism. The trial was difficult, and Galileo was afraid. He had seen what happened to those who defied the Church. Under pressure, he agreed to deny that the Earth moved around the Sun. According to legend, as he left the trial, he muttered under his breath: "And yet it moves"—meaning the Earth does indeed move, regardless of what he was forced to say.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Galileo was sentenced to house arrest in his home in Arcetri, near Florence. He was forbidden to talk about heliocentrism, forbidden to publish, forbidden to receive visitors without permission. For a man who had spent his life investigating, experimenting, and teaching, it was a kind of living death. Yet even in prison, Galileo continued to think and write. He was working on his greatest scientific work, the "Discourses and Mathematical Demonstrations Relating to Two New Sciences," which laid the foundation for modern physics.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'A Life of Discovery' },
      afbeelding: SCENE_IMAGES['galileo-galilei-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-7'],
          alt: { en: 'A blind scholar dictating to an assistant in a Tuscan villa garden room.' },
          bijschrift: { en: 'Blind and confined, he finished his best book on motion and had it smuggled to Holland.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Galileo spent his final years under house arrest, but his mind remained free. He had made discoveries in so many fields—motion, gravity, astronomy, mathematics. He understood that falling objects accelerate at a constant rate, a principle that would later be refined into Newton\'s laws of motion. He studied the behavior of projectiles and pendulums. He improved his telescopes and made new observations. Visitors who were allowed to see him reported that his mind remained sharp, his curiosity undiminished, even as his body grew frail.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Galileo died on January 8, 1642, at the age of seventy-seven. He was buried quietly, almost as if the Church wanted to minimize attention to his final resting place. Yet his work had already spread throughout Europe. Scientists and mathematicians built upon his discoveries. His commitment to observation and experiment over blind authority became the foundation of modern science. The telescope he had pointed at the sky had revealed not just new celestial objects but a new way of knowing.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'The Revolutionary Who Changed Everything' },
      afbeelding: SCENE_IMAGES['galileo-galilei-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['galileo-galilei-8'],
          alt: { en: 'Two antique telescopes on velvet in a museum vitrine.' },
          bijschrift: { en: 'The Church formally admitted the error in 1992 — 359 years after the trial.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Galileo\'s conflict with the Church was not simply about astronomy. It was about a fundamental question: How do we know what is true? For centuries, the answer had been: through ancient authorities, through logic, through Scripture. Galileo argued for something different: through observation, through experiment, through direct evidence from nature itself. This idea—that nature is the ultimate authority, not ancient texts or powerful institutions—became the foundation of modern science.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Today, we live in a world shaped by the scientific revolution that Galileo helped create. Every technology, every medical treatment, every understanding of how the universe works has roots in the idea that Galileo championed—that we can understand nature by carefully observing it and testing our ideas against reality. The remarkable thing is that he maintained this belief even when powerful forces tried to force him to abandon it. Galileo\'s life reminds us that the pursuit of truth sometimes requires courage, and that one person\'s determination to see clearly can change the world.' }
        }
      ]
    }
  ]
};

export const catherine: Verhaal = {
  id: 'catherine-the-great',
  beginJaar: 1729,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Catherine the Great' },
  ondertitel: { en: 'The Empress Who Transformed Russia' },
  teaser: { en: 'Born a princess in a small German state, she became ruler of the vast Russian Empire through intelligence, determination, and one of history\'s boldest power grabs.' },
  jaar: 1796,
  periodeLabel: '1729 - 1796',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['catherine-the-great'],
  portretKleur: '#9B6B4F',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['macht', 'rusland', 'vrouwen', 'bestuur', 'expansie'],
  leestijdMinuten: 6,
  personage: { naam: 'Catherine the Great' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Princess from Prussia' },
      afbeelding: SCENE_IMAGES['catherine-the-great-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-1'],
          alt: { en: 'A girl reading alone in a modest north German court chamber.' },
          bijschrift: { en: 'Sophie of Anhalt-Zerbst had a title, an education, and almost no money.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the year 1729, in the small German principality of Anhalt-Zerbst, a girl was born who would one day rule the largest empire in Europe. She was named Sophie Augusta Frederica, but the world would know her as Catherine the Great. She wasn\'t born to the Russian throne—in fact, she wasn\'t born Russian at all. She was the daughter of a minor German prince, growing up in a modest household without great wealth or exceptional status. Yet from her earliest years, Sophie showed a mind that reached beyond the narrow world she had been born into.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'As a child, Sophie was clever, ambitious, and restless. She taught herself languages and studied history and politics. She read Enlightenment philosophers who were challenging old ways of thinking across Europe. She dreamed of a larger life than what a minor German principality could offer. When she was fourteen, her dream suddenly became real. She received a proposal of marriage from Peter, the grandson of Peter the Great and the heir to the Russian throne. She was to become the future Empress of Russia.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'A Difficult Marriage' },
      afbeelding: SCENE_IMAGES['catherine-the-great-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-2'],
          alt: { en: 'A grand duchess sitting apart in a gilded Russian palace hall.' },
          bijschrift: { en: 'She spent eighteen years at court before she held any power — and read her way through them.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1745, Sophie married Peter in St. Petersburg and took a new name—Catherine. She became the wife of the heir to the Russian throne, but her new position was far from a fairy tale. Peter was immature and irresponsible, more interested in military drills and playing with toy soldiers than in the serious business of governing. Catherine quickly realized that her husband would not be a strong leader. Meanwhile, she worked tirelessly to make herself essential. She learned Russian fluently, studied Russian history and Orthodox Christianity, and made herself beloved by the court and the military.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'For years, Catherine played the role of the dutiful wife while building her own power base. She bore a son, Paul, securing the succession. She became close to the most powerful people at court. She understood that patience and strategy would serve her better than direct confrontation. As she watched her husband remain weak and irresponsible, Catherine prepared herself mentally for the possibility that she might need to take power herself. She wasn\'t content to be merely a queen—she wanted to be a great ruler.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Seizing Power' },
      afbeelding: SCENE_IMAGES['catherine-the-great-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-3'],
          alt: { en: 'A woman in a guards uniform on horseback before cheering Russian soldiers.' },
          bijschrift: { en: 'July 1762: she took the throne from her own husband, with the guards regiments behind her.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1762, when Catherine\'s husband became Tsar Peter III, his incompetence became immediately apparent. He made decisions that angered the military and the nobility. He alienated the Church. He showed favoritism to people no one respected. After just six months on the throne, Peter had managed to make enemies of almost everyone who mattered. Catherine sensed her moment. With the support of the military, the nobility, and the Church, she organized what was essentially a coup d\'état. She left the city with a military officer named Grigory Orlov, and together they raised an army loyal to her.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Peter, faced with a force he couldn\'t resist, was forced to abdicate. Catherine, now just thirty-three years old, became the Tsarina and Autocrat of All the Russias. What she had accomplished was almost without precedent—a woman, not born Russian, had seized the throne of the largest empire in the world. In a time when women had almost no power, Catherine had seized the ultimate power. She would keep that power for thirty-four years.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'A Modern Empress' },
      afbeelding: SCENE_IMAGES['catherine-the-great-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-4'],
          alt: { en: 'An empress presenting a bound legal code to nobles and clergy.' },
          bijschrift: { en: 'Her Nakaz quoted Montesquieu and Beccaria at length. Much of it was never enacted.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine understood that to maintain power, she needed to be more than just a competent ruler—she needed to be seen as a legitimate one. She surrounded herself with able advisors and ministers. She made careful reforms—not radical changes that would upset the nobility, but improvements that proved she could govern effectively. She improved the legal system, strengthened the administration, and encouraged education and culture. She brought the ideas of the Enlightenment, which she had read and admired, into Russian policy.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'I have a passion for Russia, and I am convinced that I shall succeed in rendering her a great country.' },
          bron: { en: 'Catherine the Great' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Expansion and War' },
      afbeelding: SCENE_IMAGES['catherine-the-great-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-5'],
          alt: { en: 'Russian ships off a Black Sea shore as an empress studies a map on a bluff.' },
          bijschrift: { en: 'Two Ottoman wars and three partitions of Poland later, Russia had its warm-water coast.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine believed that Russia\'s greatness lay in its territory and influence. During her reign, she pursued an aggressive foreign policy that expanded Russian power considerably. She fought wars against the Ottoman Empire, the kingdom that controlled the southern territories Russia wanted to reach. Through these wars, Russia gained access to the Black Sea, opening new trade routes and increasing Russian influence in Europe. She also expanded Russian territory eastward and gained control of lands that had been contested by various powers.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine also orchestrated the partition of Poland, working with the rulers of Prussia and Austria to divide that kingdom among themselves. This was one of the most controversial acts of her reign, but it reflected the political realities of the time—weaker nations were absorbed by stronger ones. By the end of Catherine\'s reign, Russia was significantly larger and more powerful than when she had taken the throne. She had made Russia a major European power, respected and feared by other nations.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Patron of Culture' },
      afbeelding: SCENE_IMAGES['catherine-the-great-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-6'],
          alt: { en: 'A palace gallery hung with old master paintings, crates being opened.' },
          bijschrift: { en: 'Her private collection became the Hermitage — some 4,000 paintings bought in thirty years.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'While Catherine was building Russian military and political power, she was also building Russian culture. She was a patron of the arts, bringing famous architects, musicians, and artists to her court. She supported writers and philosophers. She built libraries and established schools. She wanted Russia to be seen not just as a military power but as a center of civilization and learning. The Winter Palace in St. Petersburg became one of the most magnificent palaces in the world, filled with art and architecture that reflected Catherine\'s refined taste.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine herself was remarkably educated and cultured. She corresponded with famous philosophers like Voltaire and Diderot. She read voraciously and understood the intellectual movements transforming Europe. She wanted to share this learning with Russia. She founded schools and academies. She encouraged the study of science and literature. In many ways, Catherine was trying to bring the Enlightenment to Russia, to make her empire not just powerful but also modern and sophisticated.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'The Costs of Power' },
      afbeelding: SCENE_IMAGES['catherine-the-great-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-7'],
          alt: { en: 'Serfs harvesting a vast estate field under a mounted overseer.' },
          bijschrift: { en: 'She called herself an Enlightenment ruler. Under her, serfdom reached its widest extent.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine\'s achievements came at a cost. The expansionist wars required massive expenditures. The military grew and became ever more powerful. To pay for all this, Catherine relied heavily on the nobility and the wealth that came from serfdom—a system in which peasants were essentially enslaved to landowners. Though Catherine considered herself an Enlightenment ruler, she actually strengthened serfdom during her reign. This contradiction—a ruler who admired progressive ideas but maintained feudal systems—was one of the great paradoxes of her rule.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine also faced rebellions and discontent. A massive peasant rebellion led by Cossack leader Emelian Pugachev shook her rule in the 1770s. Though she defeated it, the rebellion reminded her that not everyone was happy with her government. As she grew older, Catherine became more conservative, more concerned with maintaining stability than with progressive reforms. By her final years, she was seen by some as having abandoned the Enlightenment ideals she had once championed.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'A Life of Ambition' },
      afbeelding: SCENE_IMAGES['catherine-the-great-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['catherine-the-great-8'],
          alt: { en: 'An empty gilded throne room with a state portrait of an empress.' },
          bijschrift: { en: 'Thirty-four years on the throne — longer than any other woman in Russian history.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine the Great died in 1796 at the age of sixty-seven. She had ruled Russia for thirty-four years, longer than most monarchs. She had expanded the empire, reformed the government, encouraged culture, and established Russia as a major European power. She had done something that seemed nearly impossible—a woman without a strong hereditary claim to the throne had seized power and kept it for decades. She had proven that intelligence, determination, and political skill could matter more than the circumstances of your birth.' },
      },
        {
          type: 'tekst',
          inhoud: { en: 'Catherine remains one of history\'s most remarkable rulers precisely because she understood that power isn\'t just about military strength or inherited position. It\'s about making people believe you deserve to rule, about creating alliances, about presenting yourself as a capable leader. She was shrewd, ambitious, and willing to do what was necessary to maintain her authority. She made mistakes—her handling of serfdom being perhaps the most significant—but she fundamentally transformed Russia from a secondary power into a major player on the world stage. The woman born as a minor princess in Prussia had become one of the most powerful rulers in European history.' }
        }
      ]
    }
  ]
};

export const henryVIII: Verhaal = {
  id: 'henry-viii',
  beginJaar: 1491,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Henry VIII' },
  ondertitel: { en: 'The king with six wives who broke with the Pope' },
  teaser: { en: 'A golden young prince who became a feared and bloated tyrant. To get a son, Henry VIII tore England away from Rome and went through six queens.' },
  jaar: 1547,
  periodeLabel: '1491 - 1547',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['henry-viii'],
  portretKleur: '#7C2D3A',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['engeland', 'koning', 'reformatie', 'huwelijk', 'tudors'],
  leestijdMinuten: 7,
  personage: { naam: 'Henry VIII' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Spare Heir' },
      afbeelding: SCENE_IMAGES['henry-viii-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-1'],
          alt: { en: 'A teenage prince in black mourning clothes standing beside a coffin in a royal chapel.' },
          bijschrift: { en: '1502: the death of Prince Arthur changes everything for his younger brother.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry was born on 28 June 1491 at Greenwich Palace, the second son of King Henry VII, the first king of the Tudor dynasty. His father had won the crown on the battlefield only six years earlier, ending decades of civil war known as the Wars of the Roses. A secure succession, with healthy sons to inherit, was the most important thing in the world to the Tudors.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As a second son, Henry was not expected to become king. His elder brother Arthur was the heir, and in 1501 Arthur married a Spanish princess, Catherine of Aragon, daughter of Ferdinand and Isabella. Five months later, in April 1502, Arthur died, probably of an illness. Henry, aged ten, was suddenly the heir to the throne.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Golden Prince' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The young Henry was tall, handsome, athletic and clever. He loved hunting, jousting, tennis and dancing, played several instruments and composed music. He spoke French and Latin and enjoyed debating religion with scholars. Visitors to the court were dazzled by him.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The song \'Pastime with Good Company\' is believed to have been written by Henry himself. It is still performed today.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A King at Seventeen' },
      afbeelding: SCENE_IMAGES['henry-viii-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-2'],
          alt: { en: 'A young king and a Spanish queen crowned side by side in Westminster Abbey.' },
          bijschrift: { en: '1509: Henry VIII and Catherine of Aragon are crowned together.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry VII died in April 1509, and his son became Henry VIII, aged seventeen. Within weeks he married his brother\'s widow, Catherine of Aragon, who was five years older than him. The Church normally did not allow a man to marry his brother\'s widow, so a special permission had been obtained from the Pope. It would matter a great deal later.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1509,
          tekst: { en: 'Henry VIII becomes king at seventeen and marries Catherine of Aragon.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The early years were glamorous. Henry spent his father\'s carefully saved fortune on palaces, feasts, tournaments and wars against France. In 1520 he met the French king Francis I in a camp so splendid, with tents of gold cloth and fountains of wine, that it became known as the Field of the Cloth of Gold.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Defender of the Faith' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry was a devout Catholic. When a German monk named Martin Luther began attacking the Church, Henry wrote a book defending the Pope and the seven sacraments. In 1521 the grateful Pope gave him the title Defender of the Faith. Ironically, British monarchs still carry that title today, although it was Henry who would break with the Pope.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The letters \'F.D.\' or \'Fid. Def.\', short for Fidei Defensor, Defender of the Faith, still appear on British coins.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The King\'s Great Matter' },
      afbeelding: SCENE_IMAGES['henry-viii-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-3'],
          alt: { en: 'A dark-haired young woman in a French hood walking in a palace garden while the king watches her.' },
          bijschrift: { en: 'Around 1526: Henry falls in love with Anne Boleyn.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Catherine was pregnant at least six times, but almost all her children were stillborn or died soon after birth. Only a daughter, Mary, born in 1516, survived. Henry believed England needed a male heir. Without one, he feared, the country could slide back into civil war.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1526 Henry fell in love with Anne Boleyn, a witty, well-educated lady at court who had spent years at the French court. Anne refused to become his mistress. She would only be his wife. Henry became convinced that his marriage to Catherine was cursed, quoting a verse from the Bible that said a man who married his brother\'s wife would be childless.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Pope in a Trap' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry asked Pope Clement VII to annul the marriage, to declare that it had never been valid. In normal times a Pope might have agreed. But in 1527 the army of the emperor Charles V had sacked Rome, and the Pope was in his power. Charles V was Catherine of Aragon\'s nephew. The Pope delayed for years.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Sir, I beseech you for all the loves that hath been between us, let me have justice and right.' },
          bron: { en: 'Catherine of Aragon, kneeling before Henry at the court that was to decide on their marriage, 1529' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry blamed his chief minister, Cardinal Wolsey, for the failure. Wolsey lost his power and died in 1530 on his way to face charges of treason.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Breaking with Rome' },
      afbeelding: SCENE_IMAGES['henry-viii-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-4'],
          alt: { en: 'A crowded English Parliament in a timbered hall voting as the king looks on from a throne.' },
          bijschrift: { en: '1534: the king becomes head of the Church of England.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Since the Pope would not give him what he wanted, Henry decided to do without the Pope. With the help of a brilliant new adviser, Thomas Cromwell, and a sympathetic archbishop of Canterbury, Thomas Cranmer, Parliament passed a series of laws that cut England\'s ties with Rome step by step.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In January 1533 Henry secretly married Anne, who was already pregnant. In May, Archbishop Cranmer declared the marriage to Catherine invalid. Anne was crowned queen. In September she gave birth, not to the longed-for son, but to a daughter: Elizabeth.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1534,
          tekst: { en: 'The Act of Supremacy makes Henry VIII Supreme Head of the Church of England.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1534 the Act of Supremacy declared the king to be Supreme Head of the Church of England. Anyone who refused to accept it could be executed for treason. Henry\'s former friend and chancellor, the scholar Thomas More, refused to swear the oath, and was beheaded in 1535.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The End of the Monasteries' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Between 1536 and 1541 Henry closed every monastery, abbey and convent in England and Wales, around 800 in total. Monks and nuns were sent away, and the land, buildings, gold and silver passed to the crown, which sold much of it to nobles and gentry. The ruins of many great abbeys can still be seen across the English countryside.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Anne\'s Fall' },
      afbeelding: SCENE_IMAGES['henry-viii-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-5'],
          alt: { en: 'A dignified queen in grey walking towards a scaffold on a green inside a castle at dawn.' },
          bijschrift: { en: 'Tower of London, 19 May 1536.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Anne Boleyn had won Henry\'s love, but she did not give him a son. She had miscarriages, and Henry\'s affection turned into suspicion and anger. In January 1536 Henry was thrown from his horse at a joust and badly injured; a few days later Anne lost a baby boy.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By the spring Henry had fallen for one of Anne\'s ladies-in-waiting, Jane Seymour. Thomas Cromwell gathered accusations against Anne: adultery with five men, including her own brother, and plotting the king\'s death. Historians widely believe the charges were invented. All the accused were found guilty.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1536,
          tekst: { en: 'Anne Boleyn is beheaded at the Tower of London. Eleven days later Henry marries Jane Seymour.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 19 May 1536 Anne was beheaded inside the Tower of London. Henry had ordered an expert swordsman from Calais rather than an axeman, perhaps as a last mercy. Eleven days later he married Jane Seymour.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'At Last, a Son' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 1537 Jane gave birth to a boy, Edward. Henry was overjoyed. But twelve days later Jane died of complications from the birth. She was the only one of his wives to be given a queen\'s funeral, and Henry later chose to be buried beside her.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Three More Queens' },
      afbeelding: SCENE_IMAGES['henry-viii-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-6'],
          alt: { en: 'A disappointed king meeting a German princess for the first time in a palace room.' },
          bijschrift: { en: '1540: Henry meets Anne of Cleves and is not pleased.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cromwell next arranged a marriage with a German princess, Anne of Cleves, to make an alliance with the Protestant states of Germany. Henry chose her after seeing a flattering portrait by the court painter Hans Holbein. When they met, he was bitterly disappointed. The marriage was annulled after six months, and Anne, wisely, accepted a generous settlement and lived comfortably in England as the \'king\'s beloved sister\'.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cromwell paid with his head for the failure, in July 1540. On the same day Henry married Catherine Howard, a teenage cousin of Anne Boleyn and perhaps thirty years younger than him. In 1541 it emerged that she had had lovers before her marriage and had met another man in secret since. She was beheaded in February 1542.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1543,
          tekst: { en: 'Henry VIII marries his sixth and last wife, Catherine Parr.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry\'s last wife was Catherine Parr, an intelligent, twice-widowed woman who wrote religious books and helped bring his children together at court. She came close to being arrested once for arguing about religion with the king, but she cleverly apologised, saying she had only argued to distract him from the pain in his leg.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'English schoolchildren remember the fate of the six wives with a rhyme: divorced, beheaded, died; divorced, beheaded, survived. Strictly speaking, though, Henry\'s marriages were annulled, not ended by divorce.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Tyrant' },
      afbeelding: SCENE_IMAGES['henry-viii-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-7'],
          alt: { en: 'A warship heeling over and sinking in a harbour while an enormous king watches from the shore.' },
          bijschrift: { en: 'Portsmouth, 1545: the Mary Rose sinks before the king\'s eyes.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The handsome young king had become a different man. His leg had been injured, probably at a joust, and the wound became an ulcer that never healed and caused him terrible pain. He could no longer exercise but kept eating huge meals. His last suits of armour show a waist of about 130 centimetres. By the end he had to be moved around his palaces in a kind of chair.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His temper grew worse too. Many of those who had served him were executed: two wives, his chief ministers, nobles who might have a claim to the throne, monks who refused to accept him as head of the Church, and Protestants who went further than he liked. Henry had broken with the Pope, but he never became a true Protestant himself.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Mary Rose' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry was proud of his navy, and built forts all along the south coast. In July 1545, as a French fleet approached Portsmouth, he watched from the shore as his favourite warship, the Mary Rose, heeled over and sank. Hundreds of men drowned. The wreck was raised from the seabed in 1982 and can now be visited in a museum in Portsmouth.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Three Children, Three Monarchs' },
      afbeelding: SCENE_IMAGES['henry-viii-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['henry-viii-8'],
          alt: { en: 'A young boy, a serious woman and a red-haired girl standing together in a palace gallery.' },
          bijschrift: { en: 'Henry\'s three children would all wear the crown.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry VIII died at the Palace of Whitehall on 28 January 1547, aged fifty-five. His death was kept secret for a few days while his advisers prepared for the new reign. He was buried at Windsor Castle beside Jane Seymour, the mother of his son.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1547,
          tekst: { en: 'Henry VIII dies. His nine-year-old son becomes King Edward VI.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'All three of his children became monarchs. Edward VI, aged nine, made England firmly Protestant, but he died at fifteen. Mary I, Catherine of Aragon\'s daughter, tried to bring England back to Rome and had nearly three hundred Protestants burned. Then came Elizabeth I, Anne Boleyn\'s daughter, whose long reign became one of the most famous in English history.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Changed Country' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry did not intend to start a religious revolution. He wanted a son and a free hand. But by cutting England off from Rome, closing the monasteries and making the king head of the Church, he set in motion changes that could not be reversed. The Church of England that grew from his break still exists today, with the British monarch at its head.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Henry VIII owned more than 50 palaces and houses, more than any other English monarch, including Hampton Court, which he took over from Cardinal Wolsey.' },
        },
      ],
    },
  ],
};

export const columbus: Verhaal = {
  id: 'christopher-columbus',
  beginJaar: 1451,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Christopher Columbus' },
  ondertitel: { en: 'The sailor who set out for Asia and reached the Americas' },
  teaser: { en: 'He was sure he could reach Asia by sailing west, and he was wrong about almost everything. His mistake changed the history of two worlds.' },
  jaar: 1506,
  periodeLabel: '1451 - 1506',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['christopher-columbus'],
  portretKleur: '#2B4F6E',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['ontdekking', 'zee', 'amerika', 'spanje', 'kolonialisme'],
  leestijdMinuten: 7,
  personage: { naam: 'Christopher Columbus' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Weaver\'s Son from Genoa' },
      afbeelding: SCENE_IMAGES['christopher-columbus-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-1'],
          alt: { en: 'A young sailor clinging to a wooden oar in a stormy sea with a burning ship behind him.' },
          bijschrift: { en: '1476: shipwrecked off the coast of Portugal.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Christopher Columbus, in Italian Cristoforo Colombo, was born in 1451 in the port city of Genoa, the son of a wool weaver. Genoa was a city of sailors and merchants, and as a teenager Columbus went to sea. He sailed around the Mediterranean and later as far as England, Ireland and perhaps even Iceland.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1476 the ship he was sailing on was attacked and sunk off the coast of Portugal. Columbus, according to his son, grabbed an oar and swam about ten kilometres to shore. He made his way to Lisbon, where his brother Bartholomew worked as a mapmaker.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Age of Discovery' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Lisbon was the best place in Europe for an ambitious sailor. Portuguese ships were exploring further and further down the coast of Africa, hoping to sail around it to reach India and its spices. Columbus married Filipa Moniz Perestrelo, the daughter of a nobleman who had governed the Atlantic island of Porto Santo, and studied maps, books and sailors\' tales about the ocean.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Columbus never called himself Columbus. In Spain he signed as Cristóbal Colón. The Latin form, Columbus, means dove.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Enterprise of the Indies' },
      afbeelding: SCENE_IMAGES['christopher-columbus-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-2'],
          alt: { en: 'A sailor presenting a globe and maps to a king and queen on their thrones.' },
          bijschrift: { en: '1492: Ferdinand and Isabella finally say yes.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Columbus came up with a bold plan he called the Enterprise of the Indies: to reach Asia, with its gold and spices, not by sailing around Africa but by sailing west across the Atlantic. Educated Europeans knew that the earth was round. The question was how big it was, and how far Asia lay to the west.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Columbus believed the distance was small, perhaps only about 4,000 kilometres from the Canary Islands to Japan. He was badly wrong. The real distance is closer to 19,000 kilometres, and he did not know that two continents and the Pacific Ocean lay in between. The experts who rejected his plan were right about the distances. They simply did not know about America either.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Years of Rejection' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The king of Portugal turned him down. Columbus moved to Spain and spent years following the court of King Ferdinand and Queen Isabella. A royal commission rejected his plan. But in January 1492 the Spanish monarchs conquered Granada, the last Muslim kingdom in Spain, and at last they had time and money for something new. In April they agreed to his demands: he would be Admiral of the Ocean Sea, governor of any lands he found, and receive a tenth of the riches.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The idea that people in Columbus\'s time thought the earth was flat is a myth that became popular in the nineteenth century. Educated people had known it was round since ancient Greek times.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Three Ships' },
      afbeelding: SCENE_IMAGES['christopher-columbus-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-3'],
          alt: { en: 'Three small sailing ships leaving a Spanish harbour at dawn, their sails filling with wind.' },
          bijschrift: { en: 'Palos, 3 August 1492.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 3 August 1492 three ships left the small port of Palos in southern Spain: the Santa María, the largest, commanded by Columbus himself, and two smaller caravels, the Pinta and the Niña. Together they carried about ninety men. After stopping in the Canary Islands for repairs, they sailed into the open ocean on 6 September.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1492,
          tekst: { en: 'On 3 August Columbus sets sail from Palos with three ships and about ninety men.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'No one had ever sailed so far west into the open Atlantic and come back. According to a summary of his logbook, Columbus told his crew each day that they had sailed a shorter distance than he really believed, so that they would not be frightened by how far from home they were. Ironically, the \'false\' figures were closer to the truth than his own estimates.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Close to Mutiny' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Weeks passed with nothing but water. Birds and floating seaweed raised hopes, then disappointed them. By early October the crew was close to mutiny. Columbus is said to have promised to turn back if they did not see land within a few days.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Land!' },
      afbeelding: SCENE_IMAGES['christopher-columbus-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-4'],
          alt: { en: 'Spanish sailors kneeling on a white beach with banners as curious islanders watch from the trees.' },
          bijschrift: { en: '12 October 1492: an island in the Bahamas.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At about two o\'clock in the morning of 12 October 1492, a sailor on the Pinta named Rodrigo de Triana saw white sand gleaming in the moonlight and shouted \'Land! Land!\'. At dawn the ships anchored off a small island in what is now the Bahamas. Its people called it Guanahani. Columbus named it San Salvador, holy saviour, and claimed it for Spain.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1492,
          tekst: { en: 'On 12 October Columbus lands on an island in the Bahamas, believing he has reached Asia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The islanders were Taíno people, who lived on the islands of the Caribbean. They came to the beach, curious and friendly, and traded cotton, parrots and spears for glass beads and little bells. Columbus wrote about them in his log, and his words already show what was to come.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'They ought to be good servants and of good skill, for I see that they repeat very quickly whatever was said to them. And I believe that they would easily be made Christians.' },
          bron: { en: 'Columbus\'s log, 12 October 1492, in a summary by Bartolomé de las Casas' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Columbus was sure he had reached islands off the coast of Asia, and he called the people Indians. The name stuck for centuries. He sailed on to Cuba, which he thought might be part of China, and to a large island he named Hispaniola, today shared by Haiti and the Dominican Republic.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Christmas Shipwreck' },
      afbeelding: SCENE_IMAGES['christopher-columbus-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-5'],
          alt: { en: 'A large wooden ship stuck on a reef at night, sailors and islanders carrying cargo through the surf.' },
          bijschrift: { en: 'Christmas Eve 1492: the Santa María runs aground.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On Christmas Eve 1492, while Columbus slept, the Santa María ran aground on a reef off Hispaniola. A local chief named Guacanagarí sent his people in canoes to help unload the ship. Columbus noted that not a single thing was stolen.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'With only two small ships left, Columbus could not take everyone home. He used the wood of the wreck to build a small fort, which he called La Navidad, Christmas, and left 39 men there to look for gold. Then he sailed back to Spain, through storms so violent that he wrote an account of his discoveries, sealed it in a barrel and threw it overboard in case his ship sank.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Hero\'s Welcome' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In March 1493 he reached Spain. Ferdinand and Isabella received him in Barcelona with great honour. He brought them gold, parrots, plants and several Taíno people he had taken with him. Europe was thrilled by the news of a western route to the Indies. Almost no one yet understood that he had found a world Europeans had not known existed.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Columbus was not the first European to reach the Americas. Norse Vikings led by Leif Erikson had reached Newfoundland around the year 1000, but their settlement did not last.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Governor of Hispaniola' },
      afbeelding: SCENE_IMAGES['christopher-columbus-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-6'],
          alt: { en: 'Spanish soldiers forcing Taíno people to work in a river panning for gold.' },
          bijschrift: { en: 'The 1490s: the search for gold turns into forced labour.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1493 Columbus returned with 17 ships and about 1,200 men, ready to found a colony. At La Navidad he found the fort burned and all 39 men dead. They had seized gold and women from the islanders, who had fought back.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1493,
          tekst: { en: 'Columbus returns to the Caribbean with 17 ships and about 1,200 settlers to found a colony.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As governor of Hispaniola, Columbus was a disaster, both for the Taíno and for the Spanish. He demanded that every Taíno over the age of fourteen bring a fixed amount of gold every three months; those who failed could be brutally punished. He also sent hundreds of Taíno to Spain to be sold as slaves. Queen Isabella later ordered many of them freed.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Population Destroyed' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Violence, forced labour, hunger and above all European diseases such as smallpox, against which the islanders had no immunity, destroyed the Taíno. Within a few decades of Columbus\'s arrival, the native population of Hispaniola had almost disappeared. It was the first chapter in a catastrophe that would spread across the Americas.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Many Taíno words entered European languages, including hammock, canoe, hurricane, barbecue and tobacco.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Sent Home in Chains' },
      afbeelding: SCENE_IMAGES['christopher-columbus-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-7'],
          alt: { en: 'An old admiral in iron chains standing on the deck of a ship, refusing to let a sailor remove them.' },
          bijschrift: { en: '1500: the Admiral of the Ocean Sea returns as a prisoner.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On his third voyage, in 1498, Columbus reached the coast of South America near the mouth of the Orinoco River in what is now Venezuela. The river poured so much fresh water into the sea that he realised it must come from a vast land. He thought he might be near the Garden of Eden.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Meanwhile, the Spanish settlers on Hispaniola rebelled against him and his brothers, complaining that they ruled harshly and unfairly. In 1500 the Spanish monarchs sent a royal official, Francisco de Bobadilla, to investigate. He arrested Columbus and sent him back to Spain in chains.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1500,
          tekst: { en: 'Columbus is arrested on Hispaniola and sent back to Spain in chains.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The ship\'s captain offered to remove the chains during the voyage. Columbus refused. He wanted to appear before the king and queen in them. Ferdinand and Isabella set him free, but they did not give him back his position as governor.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Saved by an Eclipse' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On his fourth and final voyage, in 1502, his worm-eaten ships had to be beached on Jamaica, where he and his men were stranded for a year. When the islanders stopped bringing them food, Columbus, who knew from an almanac that a lunar eclipse was coming on 29 February 1504, warned them that God would darken the moon as a sign of his anger. When the moon turned red and dark, the frightened islanders brought food again.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'A New World Named After Someone Else' },
      afbeelding: SCENE_IMAGES['christopher-columbus-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['christopher-columbus-8'],
          alt: { en: 'A mapmaker in a German workshop drawing a new continent on a large map of the world.' },
          bijschrift: { en: '1507: a mapmaker gives the new continent a name.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Columbus returned to Spain in 1504, ill and bitter, fighting to win back his titles and his share of the profits. He died in Valladolid on 20 May 1506, aged about fifty-four. To the end, it seems, he believed that the lands he had reached were part of Asia.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1506,
          tekst: { en: 'Columbus dies in Valladolid, still believing he reached Asia.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Others realised the truth sooner. The Italian navigator Amerigo Vespucci, who sailed along the coast of South America, wrote letters describing it as a \'New World\'. In 1507 the German mapmaker Martin Waldseemüller drew a world map showing the new continent and named it after Vespucci: America.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Complicated Legacy' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For centuries Columbus was celebrated as a heroic discoverer, with statues, cities and a national holiday in the United States. Today many people see him differently, as the man who began the conquest, enslavement and destruction of the original peoples of the Americas. Both sides are part of the story. His voyages connected two halves of the world that had been separate for thousands of years, exchanging plants, animals, people, diseases and ideas, and the world has never been the same.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Columbus\'s remains were moved several times, from Spain to Hispaniola, to Cuba and back to Seville. DNA tests in 2006 showed that at least some of the bones in Seville Cathedral are his.' },
        },
      ],
    },
  ],
};

export const martinLuther: Verhaal = {
  id: 'martin-luther',
  beginJaar: 1483,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Martin Luther' },
  ondertitel: { en: 'The monk whose 95 Theses split the Church' },
  teaser: { en: 'A frightened monk who could not find peace with God. When he challenged the sale of forgiveness, he set off a revolution that tore Europe in two.' },
  jaar: 1546,
  periodeLabel: '1483 - 1546',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['martin-luther'],
  portretKleur: '#3F3A34',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['reformatie', 'religie', 'kerk', 'duitsland', 'boekdrukkunst'],
  leestijdMinuten: 7,
  personage: { naam: 'Martin Luther' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Thunderstorm' },
      afbeelding: SCENE_IMAGES['martin-luther-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-1'],
          alt: { en: 'A young student on a country road throwing himself to the ground as lightning strikes nearby.' },
          bijschrift: { en: 'Near Stotternheim, 2 July 1505.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Martin Luther was born on 10 November 1483 in Eisleben in Saxony, Germany. His father Hans had worked his way up from peasant to owner of copper mines and smelters, and wanted his clever son to become a lawyer. Martin went to the University of Erfurt, one of the best in Germany, and began studying law in 1505.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Like most people of his time, Luther was deeply afraid of death and of what came after it: God\'s judgement, purgatory and hell. On 2 July 1505, returning to Erfurt after visiting his parents, he was caught in a violent thunderstorm. A lightning bolt struck close to him and threw him to the ground.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Help, Saint Anne! I will become a monk!' },
          bron: { en: 'Luther\'s vow in the thunderstorm, as he later recalled it' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saint Anne was the patron saint of miners. Luther kept his promise. Two weeks later, to his father\'s fury, he entered the monastery of the Augustinian friars in Erfurt.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Luther\'s family name was originally Luder. He changed it around 1517 to Luther, perhaps inspired by the Greek word eleutherios, which means free.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Monk Without Peace' },
      afbeelding: SCENE_IMAGES['martin-luther-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-2'],
          alt: { en: 'A young monk kneeling alone on the cold stone floor of a monastery cell at night.' },
          bijschrift: { en: 'Erfurt: the more he tried, the more afraid he became.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther threw himself into monastic life. He fasted, prayed for hours, slept in the cold and went to confession so often and for so long that his confessor grew exasperated. But nothing gave him peace. However hard he tried, he felt he could never be good enough for a righteous God.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1510 he travelled to Rome on business for his order. He climbed the holy staircase on his knees, saying a prayer on every step, as pilgrims did to free a soul from purgatory. Later he said that when he reached the top he wondered: who knows whether it is true? He was also shocked by the worldliness and wealth of the Church in Rome.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Discovery in the Bible' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His superior sent him to the new university at Wittenberg to study and teach the Bible. Sometime in these years, while reading Paul\'s letter to the Romans, Luther came to a new understanding: people are not saved by their own good deeds, but only by faith, as a free gift from God. He later said it felt as if the gates of paradise had opened.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1512,
          tekst: { en: 'Luther becomes a doctor of theology and professor of the Bible at the University of Wittenberg.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Selling Forgiveness' },
      afbeelding: SCENE_IMAGES['martin-luther-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-3'],
          alt: { en: 'A preacher in a crowded town square selling indulgence letters from a chest full of coins.' },
          bijschrift: { en: '1517: Johann Tetzel sells indulgences near Wittenberg.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1517 a Dominican friar named Johann Tetzel came preaching near Wittenberg. He was selling indulgences. The Church taught that sinners faced punishment in purgatory after death, and that an indulgence, granted by the Church, could reduce it. People could now obtain one for themselves, or even for dead relatives, in return for a payment.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The money was meant for rebuilding St Peter\'s Basilica in Rome, and part of it would help the archbishop of Mainz pay off a huge debt he owed for his appointment. Tetzel was a brilliant salesman. A rhyme was associated with his preaching: as soon as the coin in the coffer rings, the soul from purgatory springs.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Ninety-five Theses' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To Luther, this was dangerous nonsense. It taught people that forgiveness could be bought, and made them stop truly repenting. On 31 October 1517 he sent a letter to the archbishop of Mainz with 95 theses, statements for academic debate, criticising the sale of indulgences. According to tradition, he also nailed them to the door of the Castle Church in Wittenberg, which served as the university\'s notice board.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1517,
          tekst: { en: 'On 31 October Luther sends his 95 Theses against the sale of indulgences to the archbishop of Mainz.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'No one who was there mentions the nailing. The story was first told by Luther\'s colleague Philip Melanchthon after Luther\'s death, and historians still argue about whether it happened.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Press Spreads the Word' },
      afbeelding: SCENE_IMAGES['martin-luther-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-4'],
          alt: { en: 'Printers working at wooden presses as crowds buy fresh pamphlets at the door of the shop.' },
          bijschrift: { en: '1518: Luther becomes Europe\'s first bestselling author.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther had written his theses in Latin for scholars. But others translated them into German and printed them, and within weeks they were being read all over Germany. The printing press, invented in Mainz about sixty years earlier, turned a local academic dispute into a European sensation.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther quickly understood the power of print. He began writing short, punchy pamphlets in German that ordinary people could understand, often illustrated with woodcuts by his friend, the painter Lucas Cranach. In the years that followed, Luther\'s writings made up a large share of everything printed in German.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'From Indulgences to the Pope' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Church leaders tried to make Luther take back what he had said. Instead, he went further. In a public debate at Leipzig in 1519 he declared that popes and Church councils could be wrong, and that only the Bible had final authority. In 1520 he wrote three famous books calling on German princes to reform the Church, attacking most of its sacraments and arguing that a Christian is free through faith.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1520,
          tekst: { en: 'Luther publicly burns the papal bull that threatens him with excommunication.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1520 Pope Leo X issued a bull, an official decree, giving Luther sixty days to recant or be excommunicated. On 10 December Luther threw it into a bonfire outside Wittenberg, together with books of Church law, while students cheered.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Here I Stand' },
      afbeelding: SCENE_IMAGES['martin-luther-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-5'],
          alt: { en: 'A monk standing before an emperor and a great assembly of princes and bishops in a crowded hall.' },
          bijschrift: { en: 'The Diet of Worms, April 1521.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther was excommunicated in January 1521. The new emperor, Charles V, ruler of Spain, the Netherlands and the Holy Roman Empire, summoned him to appear before the Diet, the great assembly of the empire, at the city of Worms. He was promised safe conduct, but everyone remembered that a century earlier the reformer Jan Hus had been promised the same, and burned at the stake.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 17 April 1521, Luther was shown a pile of his books and asked whether he would take back what they said. He asked for a day to think. The next day he gave his answer: unless he was convinced by Scripture and plain reason, he could not and would not recant, because to act against conscience was neither safe nor right.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Here I stand, I can do no other. God help me. Amen.' },
          bron: { en: 'Luther at the Diet of Worms, 18 April 1521, as printed shortly afterwards' },
        },
        {
          type: 'sleutelmoment',
          jaar: 1521,
          tekst: { en: 'At the Diet of Worms Luther refuses to recant before the emperor Charles V and is declared an outlaw.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Historians are not sure he spoke the famous first words; they appear in the earliest printed versions but not in the official record. Either way, the emperor declared him an outlaw. Anyone could now kill him without punishment, and his books were to be burned.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Knight George at the Wartburg' },
      afbeelding: SCENE_IMAGES['martin-luther-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-6'],
          alt: { en: 'A bearded man in plain clothes writing at a desk in a small wooden room of a castle.' },
          bijschrift: { en: 'The Wartburg, 1521: translating the New Testament in hiding.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On his way home from Worms, Luther\'s carriage was stopped in a forest by armed horsemen, and he was carried off. His followers feared he was dead. In fact the \'kidnapping\' had been arranged by his protector, Elector Frederick the Wise of Saxony, to hide him. Luther was taken to the Wartburg, a castle high on a hill near Eisenach.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'There he lived for ten months under a false name, Junker Jörg, Knight George. He let his hair and beard grow and wore a knight\'s clothes. He was lonely and often ill, and felt tormented by the devil. But he also did one of the most important pieces of work of his life.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Bible for Everyone' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In about eleven weeks Luther translated the entire New Testament from Greek into German. He wanted it to sound like ordinary people spoke, so he said he listened to the mother at home, the children in the street and the common man at the market. Published in September 1522, it sold thousands of copies within months. His complete Bible appeared in 1534.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Luther\'s Bible helped shape the modern German language. Before it, Germans spoke many different dialects; his translation gave them a common written form.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Katharina' },
      afbeelding: SCENE_IMAGES['martin-luther-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-7'],
          alt: { en: 'Nuns climbing out of empty herring barrels from a covered cart outside a town at dawn.' },
          bijschrift: { en: 'Easter 1523: twelve nuns escape in a fish merchant\'s wagon.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther\'s ideas spread fast, and many monks and nuns left their monasteries. In April 1523 a merchant who delivered herring to a convent helped twelve nuns escape, hidden in his wagon, reportedly among empty fish barrels. Luther found husbands or homes for most of them. One, Katharina von Bora, refused every match he suggested. She said she would marry only Luther himself.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1525 Luther, then forty-one, married the twenty-six-year-old Katharina. It shocked his enemies: a former monk marrying a former nun. But the marriage was a happy one. Katharina ran their household in the old Wittenberg monastery, with its brewery, gardens, animals and dozens of students and guests, and Luther called her \'my lord Katie\'. They had six children.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1525,
          tekst: { en: 'Luther marries Katharina von Bora, a former nun. In the same year the German Peasants\' War is crushed.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Peasants\' War' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But 1525 was also a year of blood. Inspired partly by Luther\'s talk of Christian freedom, peasants across southern and central Germany rose up against their lords. Luther, who believed rulers were appointed by God, turned on them and urged the princes to strike them down. The rebellion was crushed, and around 100,000 peasants were killed.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'We Are Beggars' },
      afbeelding: SCENE_IMAGES['martin-luther-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['martin-luther-8'],
          alt: { en: 'An old man lying in bed surrounded by friends praying in a dim room.' },
          bijschrift: { en: 'Eisleben, February 1546.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In his later years Luther was famous, cranky and often ill. His conversations at dinner were written down by students and published as his Table Talk. He wrote hymns, including \'A Mighty Fortress Is Our God\', and organised the new Protestant churches, many of which took his name as Lutherans.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'There was also a dark side. In 1543 Luther wrote a vicious pamphlet against the Jews, calling for their synagogues to be burned and their homes destroyed. It was ignored by most at the time, but centuries later the Nazis used his words in their propaganda. Lutheran churches today have formally rejected these writings.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 1546 Luther travelled to his birthplace, Eisleben, to settle a quarrel between two counts. There he fell ill and died on 18 February, aged sixty-two. After his death a note was found in his pocket. Its last words were these.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'We are beggars. This is true.' },
          bron: { en: 'The last words of a note found on Luther after his death' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Divided Church' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Luther had wanted to reform the Church, not to divide it. But the Reformation he started split Western Christianity permanently into Catholics and Protestants, led to a century of religious wars and changed politics, education and languages across Europe. Today hundreds of millions of Protestants around the world trace their faith back to the monk from Wittenberg.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1546,
          tekst: { en: 'Martin Luther dies in Eisleben, the town where he was born.' },
        },
      ],
    },
  ],
};

export const cortes: Verhaal = {
  id: 'hernan-cortes',
  beginJaar: 1485,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Hernán Cortés' },
  ondertitel: { en: 'The conquistador who toppled the Aztec Empire' },
  teaser: { en: 'He landed in Mexico with a few hundred men and brought down an empire of millions. But he did not do it alone, and the real story is darker than the legend.' },
  jaar: 1547,
  periodeLabel: '1485 - 1547',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['hernan-cortes'],
  portretKleur: '#8C4A1E',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['azteken', 'mexico', 'verovering', 'spanje', 'kolonialisme'],
  leestijdMinuten: 7,
  personage: { naam: 'Hernán Cortés' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Restless Young Man' },
      afbeelding: SCENE_IMAGES['hernan-cortes-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-1'],
          alt: { en: 'A young Spaniard stepping off a ship onto a tropical island harbour full of colonists.' },
          bijschrift: { en: 'Hispaniola, 1504: a nineteen-year-old seeks his fortune.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hernán Cortés was born in 1485 in Medellín, a small town in Extremadura, a poor and dry region of western Spain. His family were minor nobles with little money. He studied for a while at the University of Salamanca but left without a degree. He was clever, charming, restless and hungry for glory and wealth.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Columbus\'s voyages had opened up a new world, and young Spaniards like Cortés saw their chance. In 1504, aged nineteen, he sailed to Hispaniola. He received land and native labourers, and in 1511 he took part in the conquest of Cuba under Diego Velázquez, who became governor of the island and made Cortés his secretary.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Rumours of a Golden Land' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Spanish expeditions to the coast of Mexico brought back reports of large cities, stone temples and gold. In 1518 Velázquez chose Cortés to lead a new expedition. Then he changed his mind, fearing that Cortés was too ambitious. Before the order to stop him could arrive, Cortés hurried his ships out of Cuba.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1519,
          tekst: { en: 'Cortés sails from Cuba to Mexico with eleven ships and around 500 soldiers, defying the governor\'s orders.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Malintzin' },
      afbeelding: SCENE_IMAGES['hernan-cortes-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-2'],
          alt: { en: 'A young Indigenous woman translating between Spanish soldiers and Aztec envoys on a beach.' },
          bijschrift: { en: '1519: the woman who made the conquest possible.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 1519 Cortés landed on the island of Cozumel. There he found a Spaniard named Gerónimo de Aguilar, who had been shipwrecked years earlier and had learned the Maya language. Sailing on, the Spaniards fought a battle against the Maya of Potonchán. After their defeat, the Maya gave them gifts, including twenty young women.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'One of them was a young woman the Spanish called Doña Marina, and who is known in Mexico as Malintzin or La Malinche. She had been born into a Nahuatl-speaking family, the language of the Aztecs, but had been sold or given away as a child to the Maya. She spoke both languages. Together with Aguilar she formed a translation chain: Nahuatl to Maya, Maya to Spanish. Soon she learned Spanish herself.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'More Than a Translator' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Malintzin became one of the most important people in the conquest. She advised Cortés on local customs and politics, negotiated with leaders and warned him of plots. Indigenous artists drew her standing at the centre of meetings, often more prominent than Cortés himself. She later had a son with him, Martín, one of the first children of mixed Spanish and Indigenous descent in Mexico.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In Mexico the word \'malinchista\' came to mean someone who prefers foreign things to their own. Today many historians see Malintzin instead as a survivor in an impossible situation.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'No Way Back' },
      afbeelding: SCENE_IMAGES['hernan-cortes-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-3'],
          alt: { en: 'Spanish ships being run aground on a beach while soldiers watch from the shore.' },
          bijschrift: { en: 'Veracruz, 1519: Cortés destroys his own ships.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the coast, Cortés founded a town he called Villa Rica de la Vera Cruz. Its new town council, filled with his supporters, appointed him their leader and declared that he answered directly to the king of Spain, not to the governor of Cuba. It was a clever legal trick to escape Velázquez\'s authority.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Some of his men still wanted to return to Cuba. To make sure no one could, Cortés had his ships run aground and stripped. The famous story that he burned them is a later legend, but the effect was the same: there was no way back.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Empire with Many Enemies' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cortés soon learned that the mighty Aztec Empire, ruled from the city of Tenochtitlan by the emperor Moctezuma II, had many enemies. The Aztecs, or Mexica, demanded heavy tribute from conquered peoples, including captives for human sacrifice. The Totonac people of Cempoala welcomed the Spaniards as allies against them.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marching inland, Cortés fought the fierce Tlaxcalans, longtime enemies of the Aztecs. After several battles, the Tlaxcalans decided that the strangers would make better allies than enemies. Thousands of Tlaxcalan warriors joined the march. Without them, the conquest would have been impossible.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The City on the Lake' },
      afbeelding: SCENE_IMAGES['hernan-cortes-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-4'],
          alt: { en: 'Spanish soldiers and Indigenous allies on a long causeway approaching a vast city of temples in a lake.' },
          bijschrift: { en: '8 November 1519: the Spaniards enter Tenochtitlan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 8 November 1519 the Spaniards marched along a great causeway across the lake into Tenochtitlan. It was one of the largest cities in the world, with perhaps 200,000 people or more, bigger than any city in Spain. It was built on an island, crossed by canals, with temples, palaces, gardens, a zoo and a huge market where tens of thousands of people traded every day.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'And when we saw all those cities and villages built in the water, we were amazed, and said that it was like the enchantments they tell of in the book of Amadis. And some of our soldiers even asked whether the things that we saw were not a dream.' },
          bron: { en: 'Bernal Díaz del Castillo, one of Cortés\'s soldiers' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Moctezuma came out to meet Cortés on the causeway, carried in a litter, and welcomed him into the city. Why he let the Spaniards in is still debated. He may have been following diplomatic custom, or trying to learn more about the strangers before deciding what to do.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1519,
          tekst: { en: 'On 8 November Cortés meets the Aztec emperor Moctezuma II and enters Tenochtitlan.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'The old story that the Aztecs believed Cortés was the returning god Quetzalcoatl appears only in accounts written decades later. Many historians now doubt it.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Sad Night' },
      afbeelding: SCENE_IMAGES['hernan-cortes-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-5'],
          alt: { en: 'Spanish soldiers fleeing along a dark causeway at night under attack from warriors in canoes.' },
          bijschrift: { en: '30 June 1520: La Noche Triste.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Within a week, fearing a trap, Cortés took Moctezuma prisoner in his own palace and ruled through him. The Spaniards searched the city for gold and melted down beautiful works of art into bars. Then Cortés had to leave Tenochtitlan to fight a Spanish force sent by Velázquez to arrest him. He defeated it and persuaded most of its soldiers to join him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'While he was away, his lieutenant Pedro de Alvarado attacked Aztec nobles during a religious festival in the great temple, killing hundreds of unarmed people. The city rose in fury. When Cortés returned, the Spaniards were besieged. Moctezuma was brought out to calm his people and was killed; Spanish accounts say by stones thrown by his own people, Aztec accounts say by the Spaniards.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1520,
          tekst: { en: 'On the night of 30 June the Spaniards flee Tenochtitlan and lose hundreds of men.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the rainy night of 30 June 1520, the Spaniards tried to escape across a causeway. They were discovered, and Aztec warriors attacked from canoes on both sides. Hundreds of Spaniards and many more of their allies died; some drowned because they would not let go of their gold. The Spanish called it La Noche Triste, the Sad Night.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'According to legend, Cortés sat down under a tree after the escape and wept. A tree in Mexico City called the Árbol de la Noche Triste is said to be the one.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Invisible Enemy' },
      afbeelding: SCENE_IMAGES['hernan-cortes-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-6'],
          alt: { en: 'A grieving Aztec family in a city house, a sick figure lying on a mat, the city quiet.' },
          bijschrift: { en: '1520: smallpox reaches Tenochtitlan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Spaniards retreated to Tlaxcala, and the Aztecs might have hoped they were rid of them. But the Spaniards had brought something far deadlier than swords. One man on the Spanish ships had carried smallpox, a disease the peoples of the Americas had never encountered and against which they had no immunity.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the autumn of 1520 the epidemic swept through Tenochtitlan. Huge numbers died, including Moctezuma\'s successor, the emperor Cuitláhuac, after only eighty days on the throne. An Aztec account written later describes people unable to move or turn in their beds, covered in sores, dying of the disease or of hunger because no one could care for them.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Disease and Conquest' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Over the following century, smallpox, measles, typhus and other diseases killed a very large part of the population of Mexico; some estimates speak of millions of deaths. This catastrophe, more than Spanish weapons, explains how so few Europeans could conquer such large and powerful societies.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Fall of Tenochtitlan' },
      afbeelding: SCENE_IMAGES['hernan-cortes-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-7'],
          alt: { en: 'Small Spanish sailing boats with cannon attacking war canoes on a lake around a burning city.' },
          bijschrift: { en: '1521: the siege of Tenochtitlan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cortés rebuilt his forces with new Spanish arrivals and tens of thousands of Indigenous allies, above all Tlaxcalans, who wanted to destroy their old enemy. He had thirteen small sailing ships, called brigantines, built in Tlaxcala, carried in pieces over the mountains and assembled on the lake.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In May 1521 the siege began. The brigantines controlled the lake and cut off food and fresh water. The new emperor, the young Cuauhtémoc, led a fierce defence, street by street. To advance, the attackers demolished the city building by building. The siege lasted about three months, and the starving defenders fought to the end.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1521,
          tekst: { en: 'On 13 August Tenochtitlan falls after a siege of about three months. The emperor Cuauhtémoc is captured.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 13 August 1521 Cuauhtémoc was captured as he tried to escape in a canoe, and the city fell. Tenochtitlan was in ruins. On top of it, the Spaniards built a new capital: Mexico City. The cathedral of Mexico City stands close to where the great temple of the Aztecs once rose.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The ruins of the Aztec great temple, the Templo Mayor, were rediscovered in 1978 when electricity workers dug up a huge carved stone in the centre of Mexico City.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Conqueror Forgotten' },
      afbeelding: SCENE_IMAGES['hernan-cortes-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hernan-cortes-8'],
          alt: { en: 'An ageing man in black waiting alone in the corridor of a Spanish royal palace.' },
          bijschrift: { en: 'Spain, 1540s: the conqueror of Mexico waits for an audience.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For a few years Cortés was governor of New Spain, as Mexico was now called, and one of the richest men in the Spanish world. But the Spanish crown did not trust powerful conquerors. In 1524 he led a disastrous expedition to Honduras, during which he had Cuauhtémoc, still his prisoner, hanged on a charge of plotting. When he returned, his enemies had taken power.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'King Charles V made him a marquis and gave him huge estates, but never again let him govern Mexico. Cortés explored the Pacific coast, and the Gulf of California was for a time called the Sea of Cortés. In 1540 he returned to Spain to press his claims at court and was largely ignored.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1547,
          tekst: { en: 'Hernán Cortés dies near Seville, aged sixty-two.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He died near Seville on 2 December 1547. At his own request his remains were later taken to Mexico, where today they lie in a church in Mexico City, marked only by a small plaque. Mexico has almost no statues of him.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Two Peoples, One Nation' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The conquest destroyed the Aztec Empire, but not its people. Millions of Nahua, Maya and other Indigenous people survived, and their languages are still spoken today. Modern Mexico sees itself as the child of both worlds, Indigenous and Spanish. Its flag shows an eagle on a cactus, the sign that, according to legend, told the Aztecs where to build Tenochtitlan.',
          },
        },
      ],
    },
  ],
};

export const suleiman: Verhaal = {
  id: 'suleiman-the-magnificent',
  beginJaar: 1494,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Suleiman the Magnificent' },
  ondertitel: { en: 'The sultan who led the Ottoman Empire at its peak' },
  teaser: { en: 'Europe called him Magnificent, his own people called him the Lawgiver. He besieged Vienna, married a slave and wrote love poems, yet he had two of his sons killed.' },
  jaar: 1566,
  periodeLabel: '1494 - 1566',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['suleiman-the-magnificent'],
  portretKleur: '#1F5F5B',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['ottomanen', 'sultan', 'istanbul', 'oorlog', 'architectuur'],
  leestijdMinuten: 7,
  personage: { naam: 'Suleiman the Magnificent' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Prince in Trabzon' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-1'],
          alt: { en: 'A young Ottoman prince practising archery in the courtyard of a palace by the Black Sea.' },
          bijschrift: { en: 'Trabzon, around 1510: a sultan\'s son learns to govern.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman was born in 1494 in Trabzon, on the Black Sea coast of what is now Turkey, where his father Selim was governor. The Ottoman Empire was already one of the great powers of the world. Its sultans ruled from Constantinople, which they had conquered in 1453 and which the Ottomans called Istanbul.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ottoman princes did not grow up idly in the palace. They were sent to govern provinces, with experienced advisers at their side, to learn how to rule. Suleiman studied history, literature, science and theology, and was trained as a goldsmith, as was the custom for Ottoman princes, who each learned a craft.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Brutal Rules of Succession' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Ottomans had no fixed rule about which son inherited the throne. When a sultan died, his sons often fought for it, and the winner commonly had his brothers killed to prevent civil war. Suleiman\'s father Selim had forced his own father to give up the throne and had his brothers and nephews killed. Suleiman was lucky: he was Selim\'s only surviving son.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1520,
          tekst: { en: 'Suleiman becomes sultan of the Ottoman Empire at the age of twenty-five.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Selim, known as the Grim, died in September 1520. He had doubled the size of the empire by conquering Syria, Egypt and the holy cities of Mecca and Medina. Suleiman, aged twenty-five, inherited a huge, rich empire and a superb army.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Belgrade and Rhodes' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-2'],
          alt: { en: 'Knights in armour marching out of a fortress harbour with their banners as Ottoman soldiers stand aside.' },
          bijschrift: { en: 'Rhodes, 1523: the Knights of St John leave with honour.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman quickly showed he was a formidable military leader. In 1521 he captured Belgrade, a powerful fortress on the Danube that had resisted earlier sultans. It opened the way into Hungary and central Europe.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1522 he turned to the island of Rhodes, held by the Knights of St John, a Christian military order whose ships raided Ottoman shipping. Suleiman besieged their fortress with a huge army for nearly six months. Both sides suffered terrible losses. In the end, the knights agreed to surrender.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1522,
          tekst: { en: 'Suleiman captures Rhodes after a six-month siege and allows the Knights of St John to leave with honour.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman gave them generous terms. The knights were allowed to leave with their weapons and possessions, and the inhabitants who stayed were promised freedom of religion. Legend says Suleiman remarked that it saddened him to force such a brave old man, the grand master of the order, out of his home.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Knights of St John later settled on the island of Malta, where they became known as the Knights of Malta. Suleiman tried to take Malta too, in 1565, but failed.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Battle of Mohács' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-3'],
          alt: { en: 'Ottoman cavalry and cannons crushing a Hungarian army of knights on a marshy plain.' },
          bijschrift: { en: '29 August 1526: the kingdom of Hungary falls in two hours.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1526 Suleiman invaded Hungary. The young Hungarian king, Louis II, gathered an army, but it was much smaller than the sultan\'s and badly divided. On 29 August the two armies met on a marshy plain near Mohács, beside the Danube.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Hungarian heavy cavalry charged bravely, but they ran into the Ottoman cannons and the disciplined janissaries, the elite infantry of the empire. Within about two hours the Hungarian army was destroyed. King Louis fled the battlefield and drowned when his horse fell in a flooded stream.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1526,
          tekst: { en: 'At the Battle of Mohács the Ottomans destroy the Hungarian army. King Louis II dies fleeing.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Janissaries' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The janissaries were the backbone of the Ottoman army. They were recruited as boys, mostly from Christian families in the Balkans, through a system called the devshirme, converted to Islam and trained for years. They were professional soldiers, paid by the state, at a time when most European armies were made up of temporary recruits and hired mercenaries.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In Hungary the Battle of Mohács is still remembered as a national tragedy. There is a saying: \'more was lost at Mohács\', used when something has gone badly wrong.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'At the Gates of Vienna' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-4'],
          alt: { en: 'An Ottoman army camped in heavy rain before the walls of Vienna, tents and siege guns in the mud.' },
          bijschrift: { en: 'Autumn 1529: the siege of Vienna.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Mohács, Hungary was disputed between Suleiman and the Habsburg archduke Ferdinand, brother of the emperor Charles V. In 1529 Suleiman marched up the Danube to strike at the heart of Habsburg power: Vienna.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But that summer was extremely wet. Rain turned the roads to mud, and Suleiman had to leave most of his heavy siege cannons behind. When his army reached Vienna in late September, the city had been reinforced. The Ottomans dug tunnels to blow holes in the walls, but the defenders dug counter-tunnels.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1529,
          tekst: { en: 'Suleiman besieges Vienna but is forced to withdraw as winter approaches.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After about three weeks, with winter approaching and supplies running short, Suleiman lifted the siege and marched home. The Ottomans would not threaten Vienna again for more than 150 years. For Europe, the high tide of Ottoman expansion had been reached at its walls.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Unlikely Ally' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman\'s enemies were the Habsburgs, and the enemy of his enemy was France. To the horror of many Christians, the French king Francis I made an alliance with the Muslim sultan. Ottoman and French fleets even worked together in the Mediterranean, and in the winter of 1543 an Ottoman fleet stayed in the French port of Toulon.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Hürrem' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-5'],
          alt: { en: 'A red-haired woman in rich silks writing a letter at a window in the harem of a palace.' },
          bijschrift: { en: 'Hürrem Sultan: from captive to the sultan\'s wife.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the harem of Suleiman\'s palace was a young woman known as Hürrem, \'the joyful one\', in the West called Roxelana. She had been born in what is now Ukraine, probably as the daughter of a priest, and had been captured by Tatar raiders and sold as a slave. She became the sultan\'s favourite.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ottoman sultans did not normally marry. Their sons were born to concubines, women of the harem. But Suleiman broke every rule for Hürrem. He freed her and, around 1534, married her in a public ceremony, something that shocked his court. He wrote her passionate poems, and she wrote him letters when he was away on campaign.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Power Behind the Throne' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hürrem became one of the most powerful women in Ottoman history. She advised the sultan, corresponded with foreign rulers and paid for mosques, schools, a hospital and a soup kitchen for the poor in Istanbul. Her enemies at court accused her of witchcraft and plotting, and blamed her for some of the darkest events of Suleiman\'s reign.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Suleiman wrote poetry under the pen name Muhibbi, which means lover or affectionate friend. Hundreds of his poems survive.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Lawgiver' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-6'],
          alt: { en: 'A sultan in a council chamber listening to judges and scholars, books of law on a low table.' },
          bijschrift: { en: 'Istanbul: the sultan Turks remember as Kanuni.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Europeans called him Suleiman the Magnificent, because of his wealth, his armies and his splendid court. His own people called him Kanuni, the Lawgiver. Ottoman law combined Islamic religious law with kanun, laws made by the sultan. Suleiman and his scholars collected and organised these laws for the whole empire, on taxes, land, crime and the rights of subjects.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The empire he ruled was vast and diverse: Turks, Arabs, Greeks, Armenians, Serbs, Hungarians, Kurds and many more, Muslims, Christians and Jews. Non-Muslims paid an extra tax but could practise their religion and run many of their own affairs. When Jews were expelled from Spain and Portugal, many found refuge in Ottoman cities.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Great Architect' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman\'s reign was a golden age for the arts. His chief architect, Mimar Sinan, designed hundreds of buildings across the empire. His masterpiece in Istanbul is the Süleymaniye Mosque, built between 1550 and 1557 on one of the city\'s hills, surrounded by schools, a hospital, a library, baths and kitchens for the poor.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1557,
          tekst: { en: 'The Süleymaniye Mosque, designed by the architect Mimar Sinan, is completed in Istanbul.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'People think of wealth and power as the greatest fate, but in this world a spell of health is the best state.' },
          bron: { en: 'From a poem by Suleiman, written under his pen name Muhibbi' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Death of a Prince' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-7'],
          alt: { en: 'A sultan\'s tent on a plain at dawn, guards standing silently outside.' },
          bijschrift: { en: '1553: the execution of Prince Mustafa.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman\'s eldest surviving son, Mustafa, was the child of another consort. He was popular with the army and widely expected to be the next sultan. But Hürrem had sons of her own. As Suleiman grew older, rumours spread that Mustafa was planning to seize the throne.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1553, during a campaign against Persia, Suleiman summoned Mustafa to his tent. When the prince entered, he was strangled by the sultan\'s executioners while, according to one account, his father watched from behind a curtain. The army was furious. Whether Mustafa had really plotted, or whether Hürrem and the grand vizier had turned the sultan against him, is still debated.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1553,
          tekst: { en: 'Suleiman has his eldest son, Prince Mustafa, executed on suspicion of plotting against him.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'It was not the only tragedy. Years earlier, Suleiman had executed his closest friend and grand vizier, Ibrahim Pasha. Hürrem died in 1558. Afterwards two of her sons, Selim and Bayezid, fought for the succession. Bayezid lost, fled to Persia and was handed over and executed with his sons in 1561.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Lonely Old Man' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Suleiman had lost his wife, his best friend and three sons. In his last years he became more serious and religious, gave up wine and music, and ate from simple clay dishes instead of gold and silver.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Death at Szigetvár' },
      afbeelding: SCENE_IMAGES['suleiman-the-magnificent-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['suleiman-the-magnificent-8'],
          alt: { en: 'A fortress burning at night during a siege, with an old sultan\'s tent in the foreground.' },
          bijschrift: { en: 'September 1566: the sultan dies before the walls of a Hungarian fortress.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1566, aged about seventy-one and suffering from gout, Suleiman went on campaign one last time, into Hungary. He was too ill to ride and was carried in a carriage. His army besieged the small fortress of Szigetvár, defended by the Croatian-Hungarian nobleman Nikola Zrinski.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During the night of 6 to 7 September 1566, before the fortress fell, Suleiman died in his tent. His grand vizier, Sokollu Mehmed Pasha, kept the death secret for weeks so that the army would not panic or riot before the new sultan, Selim, was safely on the throne. Messages were issued in the sultan\'s name, and a servant who looked like him was said to sit in his carriage.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1566,
          tekst: { en: 'Suleiman dies during the siege of Szigetvár. His death is kept secret for weeks.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was buried in a tomb beside the Süleymaniye Mosque. Hürrem lies in a tomb close by. He had ruled for 46 years, longer than any other Ottoman sultan.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Height of an Empire' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Under Suleiman the Ottoman Empire stretched from Hungary to the Persian Gulf and from Algeria to the Caspian Sea, ruling perhaps 15 to 20 million people. His navy, led by the famous admiral Hayreddin Barbarossa, dominated the Mediterranean. The empire would last until 1922, but it was never again as powerful as in the age of Suleiman.',
          },
        },
      ],
    },
  ],
};

export const elizabethI: Verhaal = {
  id: 'elizabeth-i',
  beginJaar: 1533,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Elizabeth I' },
  ondertitel: { en: 'The Virgin Queen who defeated the Spanish Armada' },
  teaser: { en: 'Her mother was beheaded when she was two, and her own sister locked her in the Tower. She survived it all to become one of England\'s greatest rulers.' },
  jaar: 1603,
  periodeLabel: '1533 - 1603',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['elizabeth-i'],
  portretKleur: '#9E2A2B',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['engeland', 'koningin', 'tudors', 'armada', 'renaissance'],
  leestijdMinuten: 7,
  personage: { naam: 'Elizabeth I' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Disappointing Daughter' },
      afbeelding: SCENE_IMAGES['elizabeth-i-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-1'],
          alt: { en: 'A small red-haired girl in a too-small dress sitting alone in a large empty room of a country house.' },
          bijschrift: { en: 'Hatfield, 1536: a princess who is no longer a princess.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth was born on 7 September 1533 at Greenwich Palace. Her father, Henry VIII, had broken with the Pope and turned England upside down to marry her mother, Anne Boleyn, because he wanted a son. A daughter was a bitter disappointment. The celebrations that had been planned were quietly cancelled.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Elizabeth was two years and eight months old, her mother was beheaded on the king\'s orders. Elizabeth was declared illegitimate and lost her title of princess. Her governess later wrote to the king\'s minister that the little girl had grown out of all her clothes and had nothing to wear.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Brilliant Student' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth was given an excellent education by some of the best scholars in England, including Roger Ascham. She learned Latin, Greek, French and Italian, studied history, theology and philosophy, played music and danced well. Ascham praised her as the brightest of his students. By her teens she could write in an elegant, careful hand and translate difficult religious works.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'At the age of eleven, Elizabeth translated a French religious poem into English as a New Year\'s gift for her stepmother Catherine Parr, writing it out by hand and embroidering the cover herself.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Through the Traitors\' Gate' },
      afbeelding: SCENE_IMAGES['elizabeth-i-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-2'],
          alt: { en: 'A young woman in black stepping from a boat onto stone steps beneath the walls of a fortress in the rain.' },
          bijschrift: { en: 'March 1554: Elizabeth is brought to the Tower of London.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Henry VIII died in 1547. Elizabeth\'s younger half-brother became Edward VI and made England strongly Protestant, but he died at fifteen. In 1553 their elder half-sister Mary, the daughter of Catherine of Aragon, became queen. Mary was a devout Catholic who restored the Pope\'s authority in England. Elizabeth, raised a Protestant, was dangerous to her simply by being alive.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1554 a Protestant nobleman, Thomas Wyatt, led a rebellion against Mary\'s plan to marry Philip of Spain. Elizabeth was suspected of being involved. She was arrested and taken by boat to the Tower of London, where her mother had been executed. She is said to have sat down on the wet steps in the rain and refused to go in, declaring she was no traitor.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1554,
          tekst: { en: 'After Wyatt\'s rebellion, Elizabeth is imprisoned in the Tower of London, suspected of treason.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'No proof was found against her. After two months she was released into house arrest at Woodstock. She learned a lesson she never forgot: be careful what you say and write, keep your opinions to yourself and never give your enemies a weapon.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Bloody Mary' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During Mary\'s reign nearly three hundred Protestants were burned at the stake as heretics, which earned her the name Bloody Mary. Her marriage to Philip of Spain was unhappy and childless.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Queen at Twenty-Five' },
      afbeelding: SCENE_IMAGES['elizabeth-i-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-3'],
          alt: { en: 'A young woman kneeling under an oak tree in a park as lords on horseback ride up to her.' },
          bijschrift: { en: 'Hatfield, 17 November 1558: the news arrives.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 17 November 1558, Mary I died. Elizabeth was at Hatfield House, north of London. According to tradition, she was sitting under an oak tree in the park when the lords came to tell her she was queen. She is said to have fallen to her knees and spoken a verse from the Psalms: \'This is the Lord\'s doing, and it is marvellous in our eyes\'.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1558,
          tekst: { en: 'Mary I dies, and Elizabeth becomes queen of England at twenty-five.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She was twenty-five. England was poor, divided by religion and recently defeated in a war with France. Many doubted that a young unmarried woman could rule. Elizabeth chose her advisers carefully, above all William Cecil, who served her loyally for forty years.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Middle Way in Religion' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1559 Elizabeth\'s Parliament made England Protestant again, with the queen as Supreme Governor of the Church. But she tried to find a middle way that most people could accept. In a phrase later attributed to her, she did not want to make windows into men\'s souls: as long as people outwardly obeyed the law, she did not want to know what they privately believed.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The date of Elizabeth\'s coronation, 15 January 1559, was chosen with the help of the astrologer and mathematician John Dee.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Marriage Question' },
      afbeelding: SCENE_IMAGES['elizabeth-i-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-4'],
          alt: { en: 'A queen dancing with a tall handsome courtier while ambassadors watch from the edges of the hall.' },
          bijschrift: { en: 'Elizabeth and Robert Dudley.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Everyone expected Elizabeth to marry. A queen needed a husband to help her rule, it was thought, and above all an heir. Kings and princes from across Europe proposed: Philip II of Spain, Austrian archdukes, the king of Sweden, French princes. Elizabeth kept them all hoping for years, using the possibility of marriage as a tool of diplomacy.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The man she seemed to love was Robert Dudley, her childhood friend and Master of the Horse. But Dudley was married. In 1560 his wife, Amy Robsart, was found dead at the bottom of a staircase with a broken neck. It was probably an accident, but the scandal made it impossible for Elizabeth to marry him.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Married to England' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the end Elizabeth never married. She had seen what marriage had done to her mother and her sister, and a husband would have threatened her power. She presented herself as married to her kingdom, and later as the Virgin Queen. The English colony of Virginia, founded in her reign, was named after her.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'When Elizabeth caught smallpox in 1562 and nearly died, it left scars on her face. She covered them with a white make-up made of lead, which was poisonous.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Two Queens' },
      afbeelding: SCENE_IMAGES['elizabeth-i-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-5'],
          alt: { en: 'A queen in black kneeling at a block in a great hall, her ladies weeping.' },
          bijschrift: { en: 'Fotheringhay, 8 February 1587: the execution of Mary, Queen of Scots.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The greatest threat to Elizabeth was her cousin, Mary, Queen of Scots. Mary was a Catholic, and many Catholics believed she, not Elizabeth, was the rightful queen of England. In 1568, driven out of Scotland by rebellious nobles, Mary fled to England and asked Elizabeth for help.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth kept her prisoner for nineteen years. Mary became the centre of Catholic plots to kill Elizabeth and put Mary on the throne. In 1586 Elizabeth\'s spymaster, Francis Walsingham, intercepted secret letters, hidden in beer barrels, in which Mary approved a plot to assassinate the queen.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1587,
          tekst: { en: 'Mary, Queen of Scots, is executed at Fotheringhay Castle for plotting against Elizabeth.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mary was tried and sentenced to death. Elizabeth hesitated for months before signing the death warrant; executing an anointed queen set a dangerous example. Mary was beheaded on 8 February 1587. Elizabeth then claimed the warrant had been sent off against her wishes and punished the secretary who had done it.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Pirates for the Queen' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Meanwhile English sea captains like Francis Drake attacked Spanish treasure ships and ports in the Americas. Officially Elizabeth disapproved. Secretly she invested in their voyages and shared the profits. Between 1577 and 1580 Drake sailed around the world, and Elizabeth knighted him on the deck of his ship, the Golden Hind.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Armada' },
      afbeelding: SCENE_IMAGES['elizabeth-i-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-6'],
          alt: { en: 'Burning fireships drifting towards a tightly packed Spanish fleet at anchor at night.' },
          bijschrift: { en: 'Off Calais, 7 August 1588: the fireships.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Philip II of Spain, the most powerful ruler in Europe, had had enough. Elizabeth supported Protestant rebels against him in the Netherlands, her captains raided his treasure fleets, and she had executed a Catholic queen. In 1588 he sent a great fleet, the Armada, of about 130 ships, to escort a Spanish army from the Netherlands across the Channel to invade England.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Armada sailed up the Channel in a tight crescent formation, harassed by faster English ships. It anchored off Calais to meet the army. On the night of 7 August the English sent eight burning fireships drifting towards it. In panic, the Spanish ships cut their anchor cables and scattered. The next day, at the Battle of Gravelines, the English attacked.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1588,
          tekst: { en: 'The Spanish Armada is defeated off Gravelines and scattered by storms around Scotland and Ireland.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Heart of a King' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Not knowing yet that the danger had passed, Elizabeth went to her army at Tilbury, near London, rode among the soldiers and gave one of the most famous speeches in English history.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I know I have the body of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too.' },
          bron: { en: 'Elizabeth I to her troops at Tilbury, August 1588' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Strong winds drove the Armada into the North Sea, and it had to sail home around Scotland and Ireland. Storms wrecked dozens of ships on the rocky coasts. Only about half the fleet returned to Spain. The English celebrated it as a sign that God was on their side.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'A Golden Age' },
      afbeelding: SCENE_IMAGES['elizabeth-i-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-7'],
          alt: { en: 'A crowded round wooden theatre with actors performing on a stage open to the sky.' },
          bijschrift: { en: 'London, 1599: the Globe Theatre opens.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth\'s reign is often called a golden age, especially for literature and theatre. Public theatres were built in London for the first time, and playwrights like Christopher Marlowe and William Shakespeare wrote for them. Shakespeare\'s company opened the Globe Theatre in 1599. Poets like Edmund Spenser wrote works in praise of the queen.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth herself was a master of image. Her portraits were carefully controlled, showing her ageless and covered in pearls, symbols of purity. She travelled around the country on summer journeys called progresses, staying in nobles\' houses, so that her people could see her.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Not So Golden for Everyone' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For many, life was hard. There were bad harvests, rising prices, plague and harsh punishments for the poor. Catholic priests were hunted down and executed. In Ireland, English armies fought brutal wars against Irish rebellions. And the last years of the reign were troubled, including a failed rebellion in 1601 by her former favourite, the Earl of Essex, who was beheaded.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Though God hath raised me high, yet this I count the glory of my crown, that I have reigned with your loves.' },
          bron: { en: 'Elizabeth I, from her \'Golden Speech\' to Parliament, 1601' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Last Tudor' },
      afbeelding: SCENE_IMAGES['elizabeth-i-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-i-8'],
          alt: { en: 'An old queen sitting on cushions on the floor of a dim palace room, refusing to go to bed.' },
          bijschrift: { en: 'Richmond Palace, March 1603.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In early 1603 Elizabeth, now sixty-nine, fell into a deep sadness after the death of a close friend. She refused to eat or to go to bed. For days, according to witnesses, she sat or lay on cushions on the floor, saying little. She died at Richmond Palace on 24 March 1603.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1603,
          tekst: { en: 'Elizabeth I dies after 44 years on the throne. The Tudor dynasty ends with her.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She had reigned for 44 years. With her the Tudor dynasty ended. The crown passed to James VI of Scotland, the son of Mary, Queen of Scots, whom she had executed. He became James I of England, and for the first time England and Scotland shared a king.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Gloriana' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth had survived her mother\'s execution, her own imprisonment, plots, wars and endless pressure to marry. She left England stronger, more confident and firmly Protestant. Her poets called her Gloriana, and to later generations she became the symbol of a golden age.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'When she died, Elizabeth\'s wardrobe was said to contain more than 2,000 dresses.' },
        },
      ],
    },
  ],
};

export const louisXIV: Verhaal = {
  id: 'louis-xiv',
  beginJaar: 1638,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Louis XIV' },
  ondertitel: { en: 'The Sun King who built Versailles' },
  teaser: { en: 'King at four, he ruled France for 72 years and made his court the most dazzling in Europe. At Versailles, even getting out of bed was a royal ceremony.' },
  jaar: 1715,
  periodeLabel: '1638 - 1715',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['louis-xiv'],
  portretKleur: '#B8892F',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['frankrijk', 'koning', 'versailles', 'macht', 'barok'],
  leestijdMinuten: 7,
  personage: { naam: 'Louis XIV' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Gift of God' },
      afbeelding: SCENE_IMAGES['louis-xiv-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-1'],
          alt: { en: 'A royal baby in a gilded cradle surrounded by joyful courtiers and a happy queen.' },
          bijschrift: { en: 'Saint-Germain-en-Laye, 1638: a long-awaited heir.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 5 September 1638 a son was born to King Louis XIII of France and his Spanish queen, Anne of Austria. They had been married for twenty-three years without a living child, and the birth seemed like a miracle. The boy was named Louis-Dieudonné, Louis the God-given.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When he was four years old, in May 1643, his father died, and the little boy became King Louis XIV. His mother ruled as regent, but real power lay with her chief minister, an Italian-born cardinal named Jules Mazarin, who was clever, rich and deeply unpopular.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1643,
          tekst: { en: 'Louis XIV becomes king of France at the age of four.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Fronde' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'From 1648 France was torn by a series of revolts known as the Fronde, named after a slingshot children used in the streets of Paris. Nobles and judges rose against Mazarin and the crown. In 1649 the royal family had to flee Paris at night. In 1651 a mob forced its way into the palace to make sure the king had not left again; the twelve-year-old Louis had to lie in bed pretending to sleep while strangers filed past to look at him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis never forgot the humiliation. He came to distrust Paris, the great nobles and anyone who might challenge royal power.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Rising Sun' },
      afbeelding: SCENE_IMAGES['louis-xiv-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-2'],
          alt: { en: 'A teenage king dancing on a stage dressed as the sun in a costume of gold rays.' },
          bijschrift: { en: '1653: Louis dances as the rising sun.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis loved dancing, and as a young man he performed in lavish court ballets. In 1653, aged fourteen, he appeared in the Ballet of the Night, which lasted twelve hours. At the end, as dawn arrived, the young king appeared as the rising sun, in a costume covered in golden rays, driving away the darkness.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The sun became his personal symbol. Like the sun, the king was to be the centre of everything, giving light and life to his kingdom. He took the motto \'Nec pluribus impar\', roughly \'not unequal to many\', and the image of the sun appears everywhere on his buildings, from gates to ceilings to door handles.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'I Will Rule Myself' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cardinal Mazarin died in March 1661. The next morning, according to the story, the ministers asked the twenty-two-year-old king to whom they should now report. Louis replied: to me. He would have no chief minister. He would rule himself, and he did so for the next fifty-four years, working several hours a day on the business of government.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1661,
          tekst: { en: 'After Cardinal Mazarin\'s death, Louis XIV decides to rule France himself, without a chief minister.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Louis married the Spanish princess Maria Theresa in 1660 as part of a peace treaty. She was his cousin twice over.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Too Beautiful a Party' },
      afbeelding: SCENE_IMAGES['louis-xiv-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-3'],
          alt: { en: 'A spectacular evening fête in the gardens of a château with fireworks above.' },
          bijschrift: { en: 'Vaux-le-Vicomte, August 1661.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'France\'s finance minister, Nicolas Fouquet, was enormously rich, and he had built himself a magnificent château at Vaux-le-Vicomte, near Paris, with the best architect, the best painter and the best garden designer in the country. In August 1661 he invited the king to a spectacular party there, with a banquet, a new comedy by Molière and fireworks.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'It was a terrible mistake. Louis saw a minister living more splendidly than his king, very likely with money taken from the treasury. Three weeks later, Fouquet was arrested by a musketeer named d\'Artagnan. He spent the rest of his life in prison.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1661,
          tekst: { en: 'Finance minister Fouquet is arrested after a lavish party at his château of Vaux-le-Vicomte.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis took Fouquet\'s team: the architect Louis Le Vau, the painter Charles Le Brun and the garden designer André Le Nôtre. He would set them to work on a project far bigger than Vaux-le-Vicomte.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The musketeer who arrested Fouquet, Charles de Batz de Castelmore, Count d\'Artagnan, was a real person. Alexandre Dumas later made him the hero of The Three Musketeers.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Building Versailles' },
      afbeelding: SCENE_IMAGES['louis-xiv-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-4'],
          alt: { en: 'Thousands of workers building a huge palace and gardens on marshy ground.' },
          bijschrift: { en: 'The 1670s: an army of workers builds Versailles.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis\'s father had built a small hunting lodge at Versailles, a village about twenty kilometres from Paris. From the 1660s Louis began to transform it. Over the following decades it grew into the largest and most splendid palace in Europe, surrounded by enormous gardens with canals, fountains, statues and avenues stretching to the horizon.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The work was gigantic. At times tens of thousands of workers and soldiers were employed. Hills were levelled, marshes drained and forests planted. Water was the hardest problem: the fountains needed huge amounts, so a gigantic pumping machine was built on the Seine, and an attempt was made to divert a whole river, which cost thousands of lives through disease and accidents and was finally abandoned.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1682,
          tekst: { en: 'Louis XIV moves his court and government permanently to Versailles.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Hall of Mirrors' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In May 1682 Louis moved his court and government permanently to Versailles. Its most famous room, the Hall of Mirrors, was completed in 1684: a gallery 73 metres long with 357 mirrors facing seventeen great windows overlooking the gardens. Mirrors were then extremely expensive, and the French made them themselves, to show that France no longer needed Venetian glass.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Versailles had no proper toilets for most of its thousands of inhabitants and visitors. Visitors complained about the smell in its corridors and staircases.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Life at Court' },
      afbeelding: SCENE_IMAGES['louis-xiv-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-5'],
          alt: { en: 'Nobles crowding around a king\'s bed in a gilded bedchamber during the morning ceremony.' },
          bijschrift: { en: 'The lever: watching the king get up.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Versailles the king\'s day was a performance. In the morning ceremony called the lever, nobles crowded into his bedroom to watch him get up and dress. Handing the king his shirt was a great honour that went to the highest-ranking person present. Every meal, every walk and the evening ceremony of going to bed, the coucher, followed a strict etiquette.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This was not just vanity. It was a way of controlling the nobility, who had rebelled during the Fronde. The great nobles were expected to live at Versailles, close to the king, competing for his attention and favour. A nobleman who stayed away on his estates risked being forgotten. Louis is said to have remarked of such a man: he is someone I never see.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Love and Poison' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis had many mistresses, including Louise de La Vallière and the proud and witty Madame de Montespan, with whom he had seven children. In the late 1670s a scandal called the Affair of the Poisons revealed a network of fortune-tellers selling poisons and love potions to people at court. Madame de Montespan was rumoured to be involved, and fell from favour.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the queen died in 1683, Louis secretly married Madame de Maintenon, a devout widow who had been governess to his children. She was a strong influence on his later, more religious years.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Wars of Glory' },
      afbeelding: SCENE_IMAGES['louis-xiv-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-6'],
          alt: { en: 'French soldiers in blue coats besieging a star-shaped fortress with cannons firing.' },
          bijschrift: { en: 'Louis\'s wars: glory, fortresses and enormous costs.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis wanted glory, and in his time glory meant war. For much of his reign France was at war, against Spain, the Dutch Republic, the Holy Roman Empire and England, often against all of them together. France won territory along its northern and eastern borders, and the engineer Vauban built a ring of star-shaped fortresses to defend it.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The wars were fought with huge armies, sometimes more than 300,000 French soldiers, and were extremely expensive. His brilliant finance minister Jean-Baptiste Colbert tried to make France richer through trade, manufacturing and a strong navy, but the wars swallowed everything.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Huguenots Driven Out' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis believed in one king, one law, one faith. In 1685 he cancelled the Edict of Nantes, which had given French Protestants, called Huguenots, the right to practise their religion. Protestant churches were destroyed and soldiers were billeted in Protestant homes to force conversions. Around 200,000 Huguenots fled, many of them skilled craftsmen, to the Netherlands, England, Prussia and beyond.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1685,
          tekst: { en: 'Louis XIV revokes the Edict of Nantes. Around 200,000 French Protestants flee abroad.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Many Huguenot refugees settled in the Dutch Republic, where their French surnames can still be found today.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Spanish Inheritance' },
      afbeelding: SCENE_IMAGES['louis-xiv-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-7'],
          alt: { en: 'An old king presenting his teenage grandson to the court as the new king of Spain.' },
          bijschrift: { en: '1700: Louis\'s grandson becomes king of Spain.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1700 the sickly, childless king of Spain, Charles II, died. In his will he left his entire empire, Spain, much of Italy, the southern Netherlands and the Americas, to Louis XIV\'s grandson, Philip of Anjou. Louis accepted, and presented his grandson to the court as the new king of Spain.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The rest of Europe was alarmed. If France and Spain were joined under one family, they could dominate the world. England, the Dutch Republic and Austria formed a Grand Alliance, and the War of the Spanish Succession began in 1701. It lasted more than a decade and brought France terrible defeats, as at Blenheim in 1704, as well as famine at home.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1713,
          tekst: { en: 'The Peace of Utrecht ends the War of the Spanish Succession. Louis\'s grandson keeps the Spanish throne.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the end, at the Peace of Utrecht in 1713, Philip kept the Spanish throne on condition that the crowns of France and Spain would never be united. His descendants still sit on the Spanish throne today. But France was exhausted and deep in debt.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Deaths in the Family' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis\'s last years were filled with grief. Between 1711 and 1712 his son, his grandson and one of his great-grandsons all died, mostly of illnesses such as smallpox and measles. The heir to the throne was now a sickly great-grandson, only two years old.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'I Have Loved War Too Much' },
      afbeelding: SCENE_IMAGES['louis-xiv-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['louis-xiv-8'],
          alt: { en: 'A dying old king in a great canopied bed speaking to a small boy held by his governess.' },
          bijschrift: { en: 'Versailles, August 1715.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In August 1715, a few days before his seventy-seventh birthday, Louis fell ill with gangrene in his leg. He knew he was dying and prepared for it with great calm. He called his five-year-old great-grandson, the future Louis XV, to his bedside and gave him advice.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I have loved war too much; do not imitate me in that, nor in my too great spending.' },
          bron: { en: 'Louis XIV to his five-year-old great-grandson, as recorded at his deathbed in 1715' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He died on 1 September 1715. He had reigned for 72 years and 110 days, longer than any other monarch of a major European country in history. Few of his subjects could remember any other king.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1715,
          tekst: { en: 'Louis XIV dies at Versailles after a reign of 72 years.' },
        },
        {
          type: 'kop',
          tekst: { en: 'L\'État, c\'est moi' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Louis is famous for supposedly saying \'L\'État, c\'est moi\', I am the state. There is no evidence that he ever said it. But it sums up the idea of absolute monarchy that he made famous: a king answerable only to God. Kings across Europe copied his palace, his court and his style. But he also left France with huge debts and a system that his successors could not reform, problems that would explode in the French Revolution seventy-four years after his death.',
          },
        },
      ],
    },
  ],
};

export const marieAntoinette: Verhaal = {
  id: 'marie-antoinette',
  beginJaar: 1755,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Marie Antoinette' },
  ondertitel: { en: 'The queen who lost her head in the French Revolution' },
  teaser: { en: 'Sent to France at fourteen to marry a stranger, she became the most hated woman in the country. But did she really say \'let them eat cake\'?' },
  jaar: 1793,
  periodeLabel: '1755 - 1793',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['marie-antoinette'],
  portretKleur: '#B5697A',
  uitgelicht: false,
  volgorde: 11,
  tijdperkId: 'vroegmoderne-tijd',
  themas: ['frankrijk', 'koningin', 'revolutie', 'versailles', 'oostenrijk'],
  leestijdMinuten: 7,
  personage: { naam: 'Marie Antoinette' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Youngest Daughter' },
      afbeelding: SCENE_IMAGES['marie-antoinette-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-1'],
          alt: { en: 'A small blonde girl playing with her siblings in a grand palace garden in Vienna.' },
          bijschrift: { en: 'Vienna, around 1762: an archduchess of Austria.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Maria Antonia was born in Vienna on 2 November 1755, the fifteenth of sixteen children of Empress Maria Theresa of Austria and her husband, Emperor Francis I. Her mother was one of the most powerful rulers in Europe, and she used her daughters as pieces in the game of diplomacy, marrying them to kings and princes to make alliances.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Antonia, as her family called her, was charming, lively and kind, but she was not a keen student. Her teachers found she could hardly concentrate, and at the age of twelve she could barely write correctly in German or French. She loved music, dancing and playing outdoors.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Marriage for Peace' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Austria and France had been enemies for centuries, but they had recently become allies. To seal the alliance, Maria Theresa arranged for Antonia to marry the grandson and heir of the French king Louis XV, the future Louis XVI. A tutor was sent to Vienna to turn her into a French princess, and a dentist straightened her teeth.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'As a small child, Maria Antonia is said to have met the six-year-old Mozart, who performed at her mother\'s court. According to a family story, he slipped on the polished floor, she helped him up, and he announced that he would marry her.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Handed Over on an Island' },
      afbeelding: SCENE_IMAGES['marie-antoinette-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-2'],
          alt: { en: 'A teenage girl stepping out of a pavilion in a French gown, leaving her Austrian attendants behind.' },
          bijschrift: { en: 'The Rhine, May 1770: Antonia becomes Marie Antoinette.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 1770, aged fourteen, Antonia left Vienna forever. Her journey ended at the French border, on an island in the Rhine near Strasbourg, where a special pavilion had been built. According to the memoirs of her lady-in-waiting, Madame Campan, she had to leave behind everything Austrian, her clothes, her attendants, even her little dog, and was dressed in French clothes before she stepped into France.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 16 May 1770 she married the fifteen-year-old dauphin Louis in the chapel at Versailles. He was shy, awkward and more interested in hunting and making locks than in his new wife. The marriage was not consummated for seven years. All of Europe gossiped about it, and Marie Antoinette, as she was now called, was blamed for not producing an heir.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1770,
          tekst: { en: 'Fourteen-year-old Marie Antoinette marries the future Louis XVI at Versailles.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Letters from Mother' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her mother wrote to her constantly, giving advice and scolding her, and received secret reports from the Austrian ambassador about everything she did. Maria Theresa warned her to be careful, to please the French, to read more and to stop gambling.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Queen at Eighteen' },
      afbeelding: SCENE_IMAGES['marie-antoinette-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-3'],
          alt: { en: 'A young king and queen kneeling and praying together beside a window as courtiers rush in.' },
          bijschrift: { en: 'May 1774: Louis XV is dead.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In May 1774 Louis XV died of smallpox. When the young couple heard the courtiers rushing towards their rooms to greet them as the new king and queen, they are said to have fallen to their knees and cried out that they were too young to reign. Louis was nineteen, Marie Antoinette eighteen.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1774,
          tekst: { en: 'Louis XVI becomes king of France. Marie Antoinette is queen at eighteen.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The young queen found the stiff etiquette of Versailles unbearable. She escaped into parties, opera, balls in Paris and gambling for high stakes. She set fashions, working with the dressmaker Rose Bertin, and wore enormous hairstyles called poufs, decorated with feathers, flowers and even model ships.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Petit Trianon' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The king gave her the Petit Trianon, a small château in the park of Versailles. There she created her own private world, where she could live more simply with a small circle of friends. She later had a model village built nearby, the Hameau, with cottages, a mill and a dairy, where she could play at country life. To the French people, it all looked like wasteful luxury.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Hameau was a working farm with real cows and farmers. The idea that the queen dressed up as a shepherdess and milked cows herself is largely a later legend.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Madame Deficit' },
      afbeelding: SCENE_IMAGES['marie-antoinette-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-4'],
          alt: { en: 'A queen in a simple white muslin dress in a garden with her small children around her.' },
          bijschrift: { en: 'The 1780s: a mother, and the most hated woman in France.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1778, after eight years of marriage, Marie Antoinette at last had a daughter, Marie-Thérèse. A son, Louis-Joseph, followed in 1781, then another son, Louis-Charles, in 1785, and a daughter, Sophie, who died as a baby. She became a devoted mother and grew more serious.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But her reputation was being destroyed. France was deep in debt, partly because of its support for the American Revolution. Pamphlets, many of them obscene, portrayed the queen as a wasteful, immoral foreigner who was ruining the country. People called her \'l\'Autrichienne\', the Austrian woman, which in French sounds like \'the Austrian bitch\', and \'Madame Déficit\'.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Affair of the Necklace' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1785 a scandal made everything worse. A con woman named Jeanne de la Motte persuaded a cardinal that the queen secretly wanted to buy an extremely expensive diamond necklace, and used a woman disguised as the queen to meet him at night in the gardens. The necklace was stolen and broken up. The queen was entirely innocent, but many people believed she was involved.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1785,
          tekst: { en: 'The Affair of the Diamond Necklace ruins Marie Antoinette\'s reputation, although she was innocent.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Women March on Versailles' },
      afbeelding: SCENE_IMAGES['marie-antoinette-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-5'],
          alt: { en: 'A huge crowd of women armed with pikes and kitchen tools marching in the rain towards a palace.' },
          bijschrift: { en: '5 October 1789: the march on Versailles.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1789 the French Revolution began. On 14 July crowds in Paris stormed the Bastille, a royal fortress and prison. A few weeks earlier, the queen\'s eldest son, the seven-year-old dauphin Louis-Joseph, had died of tuberculosis.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 5 October 1789, thousands of women from the markets of Paris, angry about the price of bread, marched about twenty kilometres in the rain to Versailles, followed by the National Guard. Early the next morning a mob broke into the palace and reached the queen\'s rooms. She escaped through a hidden door to the king\'s apartments just in time.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1789,
          tekst: { en: 'Thousands of Parisians march on Versailles and force the royal family to move to Paris.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The crowd demanded that the royal family come to Paris. Marie Antoinette stood on a balcony to face the crowd, which had been shouting for her death, and bowed. The royal family was taken to Paris and installed in the old Tuileries Palace, effectively as prisoners. They never saw Versailles again.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Let Them Eat Cake?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Marie Antoinette is famous for supposedly saying, when told that the people had no bread, \'let them eat cake\'. She almost certainly never said it. The philosopher Jean-Jacques Rousseau wrote a similar line about \'a great princess\' in a book he wrote when Marie Antoinette was still a child in Vienna.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Flight to Varennes' },
      afbeelding: SCENE_IMAGES['marie-antoinette-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-6'],
          alt: { en: 'A large coach stopped at night in a small town by townspeople with lanterns and muskets.' },
          bijschrift: { en: 'Varennes, 21 June 1791: the royal family is recognised.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 1791 the royal family tried to escape. Disguised as servants and a governess, they slipped out of the Tuileries at night and set off in a large coach towards the eastern border, where loyal troops waited. The plan had been organised by the queen\'s close friend, the Swedish count Axel von Fersen.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Everything went wrong. They left late, the coach was slow and heavy, and the soldiers who were meant to escort them gave up waiting. At the town of Sainte-Menehould a postmaster, Jean-Baptiste Drouet, recognised the king. He rode ahead and raised the alarm in the small town of Varennes, where the family was stopped.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1791,
          tekst: { en: 'The royal family\'s attempt to flee France ends in the town of Varennes.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'They were brought back to Paris through silent crowds who had been told to keep their hats on, a sign of contempt. The flight convinced many French people that the king could not be trusted and was plotting with foreign enemies. According to one story, the queen\'s hair turned white during the terrible journey home.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'According to tradition, Drouet recognised the king from his portrait on the banknotes he had seen.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Widow Capet' },
      afbeelding: SCENE_IMAGES['marie-antoinette-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-7'],
          alt: { en: 'A woman in a black dress sitting in a bare prison cell, praying, a guard behind a screen.' },
          bijschrift: { en: 'The Conciergerie, 1793.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 1792 France went to war with Austria. Marie Antoinette, who saw the Revolution as her enemy, did send secret information to the Austrians. On 10 August 1792 a crowd stormed the Tuileries Palace. The monarchy was abolished, and the royal family was imprisoned in the Temple, a medieval tower in Paris.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In September her close friend, the Princesse de Lamballe, was murdered by a mob, and her head was carried on a pike to the window of the Temple. On 21 January 1793 Louis XVI, now called simply Citizen Louis Capet, was executed by guillotine. Marie Antoinette was now \'the Widow Capet\'.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1793,
          tekst: { en: 'Louis XVI is executed on 21 January. In July his eight-year-old son is taken away from Marie Antoinette.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Mother Separated' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In July 1793 her eight-year-old son, whom royalists considered King Louis XVII, was taken from her. He was placed with a shoemaker who was told to turn him into a good republican. In August she was moved to the Conciergerie prison, known as the antechamber of the guillotine. Her son died in prison in 1795, aged ten.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Last Journey' },
      afbeelding: SCENE_IMAGES['marie-antoinette-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['marie-antoinette-8'],
          alt: { en: 'A woman with cropped grey hair in a white dress sitting upright in an open cart passing through crowds.' },
          bijschrift: { en: 'Paris, 16 October 1793.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 1793 Marie Antoinette was tried before the Revolutionary Tribunal. She was accused of treason and of sending money and secrets to the enemy, and also, shockingly, of abusing her own son. She did not answer the last accusation at first. When pressed, she turned to the women in the audience and said that nature refused to answer such a charge against a mother, and she appealed to all the mothers present. Many were moved.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The verdict had been decided beforehand. At four in the morning of 16 October she was sentenced to death. She wrote a last letter to her sister-in-law, Madame Élisabeth, which never reached her. Her hair was cut short, and she was taken through the streets in an open cart, with her hands tied, unlike the king, who had been taken in a closed carriage.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Pardon me, sir, I did not do it on purpose.' },
          bron: { en: 'Marie Antoinette\'s last words, to the executioner, after stepping on his foot' },
        },
        {
          type: 'sleutelmoment',
          jaar: 1793,
          tekst: { en: 'On 16 October Marie Antoinette is executed by guillotine in Paris, aged thirty-seven.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She climbed the scaffold in the Place de la Révolution, now the Place de la Concorde, without help. She was thirty-seven. The painter Jacques-Louis David sketched her as she passed in the cart: an upright, worn woman, very different from the glittering young queen of Versailles. In 1815, after the monarchy was restored, her remains and those of Louis XVI were reburied in the royal basilica of Saint-Denis.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Of her four children, only her daughter Marie-Thérèse survived the Revolution. She was released in 1795 and lived until 1851.' },
        },
      ],
    },
  ],
};

export const vroegmoderneTijd: Verhaal[] = [leonardo, galileo, catherine, henryVIII, columbus, martinLuther, cortes, suleiman, elizabethI, louisXIV, marieAntoinette];

