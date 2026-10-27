import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

export const juliusCaesar: Verhaal = {
  id: 'julius-caesar',
  beginJaar: -100,
  toegevoegdOp: '2026-07-22',
  titel: { en: 'Julius Caesar' },
  ondertitel: { en: 'Roman military commander and statesman' },
  teaser: { en: 'From modest origins to the most powerful man in Rome—a story of ambition, genius, and tragedy.' },
  jaar: -44,
  periodeLabel: '100 BC - 44 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['julius-caesar'],
  portretKleur: '#8B4513',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'oudheid',
  themas: ['macht', 'rome', 'ambitie', 'militair', 'politiek'],
  leestijdMinuten: 8,
  personage: { naam: 'Julius Caesar' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Rise of an Ambitious Youth' },
      afbeelding: SCENE_IMAGES['julius-caesar-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-1'],
          alt: { en: 'A young Roman patrician studying rhetoric among the columns of the Forum.' },
          bijschrift: { en: 'Rome, around 80 BC: the Forum was where careers were made and unmade.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the heart of the Roman Republic, where power was contested and ambition drove men to extraordinary deeds, one figure would reshape the course of history: Gaius Julius Caesar. Born into a patrician family in 100 BC, Caesar was not destined for greatness from birth, yet through cunning, military genius, and an unrelenting appetite for power, he would transform Rome from a republic into an empire under his rule. His life was a tale of triumph and tragedy, of alliances forged and betrayed, and of a man who dared to challenge the very foundations of Roman democracy.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Name Without Power' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar was born into privilege, but not into power. His family, the Julii, traced their lineage back to Venus herself, according to Roman mythology, yet in his youth, Caesar lacked the wealth and influence that defined true power in Rome. His uncle Marius was a renowned general, and the young Caesar watched and learned, absorbing lessons about military strategy and political maneuvering. As a teenager, he served as a priest and studied rhetoric—the art of persuasion—which would become one of his greatest weapons. Rome in this era was tumultuous, torn between the interests of the Senate, the people, and ambitious generals who saw the state as a ladder to personal glory.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -60,
          tekst: { en: 'Caesar, Pompey and Crassus form the First Triumvirate — a private deal that quietly ran the Republic.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar\'s early career was marked by careful calculation. He allied himself with Pompey, one of Rome\'s greatest generals, and Crassus, one of Rome\'s wealthiest men. Together, they formed the First Triumvirate—not an official alliance, but a private agreement to support each other\'s political ambitions. Through this partnership, Caesar secured the position of consul in 59 BC, the highest office in the republic. With the consulship achieved, Caesar\'s eyes turned toward greater prizes: military glory and wealth that would cement his position as Rome\'s most powerful man.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Conquest of Gaul' },
      afbeelding: SCENE_IMAGES['julius-caesar-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-2'],
          alt: { en: 'Roman legions besieging a Gallic hill fort behind timber palisades.' },
          bijschrift: { en: 'Eight years of campaigning turned Gaul into a province — and Caesar into a legend.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 58 BC, Caesar was appointed governor of Gaul—the vast region that corresponds to modern-day France and parts of surrounding territories. What followed was eight years of relentless military campaigns that would make Caesar a legend. Gaul was not conquered; it had to be taken from a coalition of fierce Celtic tribes who fiercely resisted Roman expansion. Caesar proved to be a tactical genius, adapting his strategies to the terrain and the enemy he faced. He built fortifications, engineered siege weapons, and coordinated his legions with precision that earned the admiration of his soldiers.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Cost of Glory' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The conquest was brutal. Caesar estimated that he killed over one million Gauls and enslaved another million—though modern historians consider these figures inflated. Regardless, the campaign was devastating to the Gallic people and their way of life. For Caesar, however, it was transformative. His legions grew loyal to him personally, not to Rome. They saw him as a leader who would reward their loyalty with gold and glory. Caesar wrote dispatches describing his victories, which were read aloud in the Senate and published throughout Rome. His reputation grew with each campaign, and so did his wealth and the devotion of his soldiers—a combination that would prove decisive in the years to come.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Veni, vidi, vici was not about Gaul at all: Caesar used it in 47 BC to report a war in Asia Minor that took him five days.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'Veni, vidi, vici' },
          bron: { en: 'Julius Caesar (Latin: "I came, I saw, I conquered")' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Return and the Rubicon' },
      afbeelding: SCENE_IMAGES['julius-caesar-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-3'],
          alt: { en: 'A general halting his horse at a shallow river at dawn, his legion waiting in the mist.' },
          bijschrift: { en: 'The Rubicon was a modest stream. Its power was entirely legal.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By 50 BC, Caesar\'s enemies in the Senate, led by Pompey and the conservative faction, demanded that he disband his armies. Caesar, aware that returning to Rome without military power would leave him vulnerable to prosecution for his actions in Gaul, was in an impossible position. He was a military genius in the field, but in Rome\'s political arena, his rivals controlled the Senate. Negotiations broke down, and it became clear that his enemies intended to destroy him. In January 49 BC, the Senate voted to revoke Caesar\'s command.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Point of No Return' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar faced a choice: surrender and face certain ruin, or march on Rome. The Rubicon River marked the boundary between Gaul and Italy. Roman law forbade any general from bringing an army across the Rubicon into Italy itself. Caesar paused at the river\'s edge, fully aware of the gravity of his decision. To cross meant civil war. To turn back meant the destruction of everything he had built. With a mixture of resolve and resignation, Caesar gave the order: his legions would cross the Rubicon. The die was cast, and Rome would never be the same.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -49,
          tekst: { en: 'Caesar crosses the Rubicon with a single legion, and the Republic is at war with itself.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Civil War and Victory' },
      afbeelding: SCENE_IMAGES['julius-caesar-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-4'],
          alt: { en: 'Two Roman armies facing each other across a dusty plain at Pharsalus.' },
          bijschrift: { en: 'Pharsalus, 48 BC: Romans against Romans, with the Republic as the prize.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The civil war between Caesar and Pompey lasted from 49 to 45 BC. Caesar, with the loyalty of his seasoned legions and his superior strategic mind, moved swiftly. Pompey, despite his legendary status, was outmaneuvered. Caesar defeated him at the Battle of Pharsalus in Greece in 48 BC, a decisive engagement that shattered Pompey\'s army. Pompey fled to Egypt, where he was assassinated, leaving Caesar without a rival of equal stature.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Chasing the Last Resistance' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar pursued any remaining resistance in Africa and Spain, consolidating his power. By 45 BC, all opposition had been crushed. Caesar returned to Rome not as a consul, but as a dictator—a title that granted him absolute power. The Senate, controlled by Caesar\'s supporters, voted him dictator for life. Yet Caesar\'s victory was complete and overwhelming. He had achieved what no one before him had done: he had taken Rome through force of arms and made himself supreme.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -48,
          tekst: { en: 'Pompey flees to Egypt after Pharsalus and is murdered as he steps ashore.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Dictator\'s Reforms' },
      afbeelding: SCENE_IMAGES['julius-caesar-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-5'],
          alt: { en: 'A Roman dictator surrounded by scrolls, maps and surveying instruments in a sunlit basilica.' },
          bijschrift: { en: 'Caesar governed like an engineer: calendars, debts, land, citizenship.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'With power consolidated, Caesar implemented sweeping reforms. He reformed the calendar, creating what we know today as the Julian calendar (the basis of our modern calendar, with Julius Caesar\'s name immortalized in the month of July). He reformed the land distribution system, providing property to his soldiers. He expanded Roman citizenship to non-Italians, strengthening the empire\'s unity. He reduced corruption and reorganized the provinces.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Popular Below, Feared Above' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'These reforms were popular with the common people and the middle classes, who saw Caesar as a champion against the corrupt old aristocracy. However, the traditional Senate aristocrats—the very class from which Caesar came—viewed his reforms with alarm. They saw their power and privilege slipping away. Caesar\'s vision of Rome was fundamentally different from theirs: more centralized, more meritocratic, and above all, dependent on the power and will of a single man rather than the distributed power of aristocratic families.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'To drag the seasons back into place, 46 BC was stretched to 445 days. The calendar Caesar then installed ran until 1582.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Ides of March' },
      afbeelding: SCENE_IMAGES['julius-caesar-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-6'],
          alt: { en: 'Senators in white togas closing in on a lone figure in a marble portico.' },
          bijschrift: { en: 'The Senate met that morning in the portico of Pompey’s theatre.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By 44 BC, Caesar\'s position seemed unassailable. He held the title of dictator for life. He had vanquished all his enemies. Yet the seeds of his destruction were sown among his closest allies. Senators who felt threatened by his power—including men he considered friends—began to plot. Among the conspirators was Brutus, a senator Caesar had treated with particular favor and affection. On the 15th of March (the Ides of March in the Roman calendar), Caesar attended a Senate meeting, ignoring warnings from a soothsayer who had cautioned him to "beware the Ides of March."',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Sixty Men, One Morning' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As Caesar took his seat, the conspirators surrounded him. One by one, they struck. Over sixty senators participated in the assassination, each stabbing Caesar to assert their commitment to the plot. Caesar tried to fight back, but overwhelmed by numbers, he fell. As he recognized Brutus among his attackers, Caesar supposedly uttered his final words: "Et tu, Brute?"—"And you, Brutus?" With that, one of history\'s most powerful men lay dead, victim not to an external enemy, but to the very men who governed beside him.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Caesar was struck twenty-three times, but the physician who examined him concluded that only one of the wounds was fatal.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Legacy Unfolds' },
      afbeelding: SCENE_IMAGES['julius-caesar-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-7'],
          alt: { en: 'A funeral pyre burning in the Roman Forum at night as a huge crowd presses forward.' },
          bijschrift: { en: 'The crowd built the pyre in the Forum itself, then turned on the assassins.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar\'s assassination did not restore the Republic as the conspirators had hoped. Instead, it triggered another round of civil war. Caesar\'s ally Mark Antony and Caesar\'s adopted heir Octavian (later Augustus) defeated the assassins and took control of Rome. Over the following years, Octavian consolidated power and became the first emperor of Rome, creating the system that would last for centuries. In a sense, Caesar\'s dream of centralized power under a single leader was realized through his successors.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Name That Became a Title' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar\'s name became synonymous with power itself. The word "Caesar" was used as a title by Roman emperors and echoed through history—the German Kaiser, the Russian Tsar, and countless other rulers borrowed the name and the concept of absolute authority it represented. Julius Caesar transformed Rome from a republic into an empire. He changed the nature of power itself, showing that with sufficient ambition, military genius, and political skill, one man could reshape an entire civilization.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -27,
          tekst: { en: 'Octavian becomes Augustus. The Republic the conspirators killed for is formally over.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'A Man Who Changed History' },
      afbeelding: SCENE_IMAGES['julius-caesar-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['julius-caesar-8'],
          alt: { en: 'A marble bust of a Roman statesman in a hall of statuary, lit by shafts of dusty light.' },
          bijschrift: { en: 'Caesar, Kaiser, Tsar: the name outlived the man by two thousand years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar died at fifty-six years old, his life cut short just as his power reached its absolute peak. Yet in his fifty-six years, he accomplished more than most men achieve in a century. He conquered Gaul, expanded Rome\'s territory by millions of square miles. He defeated his rivals and took control of the greatest state the world had yet known. He implemented reforms that would influence governance for centuries to come.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'What He Left Behind' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Julius Caesar\'s story is one of ambition, genius, and the dangers of concentrated power. He showed that Rome could be ruled by one man, that a single individual with talent and determination could reshape history. Yet his story also reveals the fragility of power maintained through force alone, and the deep human need for shared governance and accountability. His name lives on in history, in the calendar we use, and in the very concept of empire itself. From a youth of modest privilege to the most powerful man in the world, Julius Caesar walked a path few mortals have ever dared to tread.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'July carries his name. The month of his birth was renamed from Quintilis in 44 BC and never changed back.' },
        },
      ],
    },
  ],
};

export const spartacus: Verhaal = {
  id: 'spartacus',
  beginJaar: -109,
  toegevoegdOp: '2026-07-22',
  titel: { en: 'Spartacus' },
  ondertitel: { en: 'Gladiator and leader of the greatest slave revolt in Roman history' },
  teaser: { en: 'From the arena to freedom—a man who dared to challenge an empire.' },
  jaar: -71,
  periodeLabel: '109 BC - 71 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['spartacus'],
  portretKleur: '#CD853F',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'oudheid',
  themas: ['vrijheid', 'opstand', 'rome', 'verzet', 'slavernij'],
  leestijdMinuten: 8,
  personage: { naam: 'Spartacus' },
  chapters: [
    { id: 1, titel: { en: 'Forged in Chains' }, afbeelding: SCENE_IMAGES['spartacus-1'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-1'], alt: { en: 'A Thracian captive in chains among a column of prisoners on a Roman road.' }, bijschrift: { en: 'Rome’s wars supplied Rome’s slave markets.' } }, { type: 'tekst', inhoud: { en: 'In the Roman province of Thrace, a man whose name would echo through history as a symbol of resistance was born into slavery. Spartacus possessed a spirit that chains could not break. Around 109 BC, he entered the world as a slave, stripped of freedom by military defeat. For much of his life, he remained bound to masters who saw him as nothing more than property—a tool to be used and discarded.' } }, { type: 'kop', tekst: { en: 'A City Built on Slaves' } }, { type: 'tekst', inhoud: { en: 'The institution of slavery in Rome was vast and brutal. Millions labored in mines, fields, and households across the empire. But it was in the gladiatorial arenas where Spartacus found his purpose. Sold to Batiatus, a lanista who trained fighters for combat, Spartacus excelled. He possessed strength, speed, and intelligence. He survived the arena when so many others perished, earning a reputation as an exceptional fighter.' } }, { type: 'weetje', tekst: { en: 'At the height of the Republic perhaps one in three people in Italy was enslaved. Rome ran on them.' } }, { type: 'tekst', inhoud: { en: 'Yet even as Spartacus defeated opponent after opponent, something burned within him. The roar of crowds and the blood did not dull his desire for freedom. Unlike many who accepted their fate, Spartacus never resigned himself to slavery. In 73 BC, at approximately thirty-six years old, Spartacus was housed in the gladiatorial school at Capua, Italy. It was here that Spartacus would ignite a flame that would shake Rome to its foundations.' } }] },
    { id: 2, titel: { en: 'The Slave Pits' }, afbeelding: SCENE_IMAGES['spartacus-2'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-2'], alt: { en: 'The sandy training yard of a gladiator school, with barred cells around the edge.' }, bijschrift: { en: 'Capua: a school that produced fighters and, by accident, an army.' } }, { type: 'tekst', inhoud: { en: 'The gladiatorial school at Capua was organized horror. Men were treated as expendable commodities, fed minimal rations and beaten for infractions. The training was intense—designed to produce fighters who would fight regardless of wounds or fear. Spartacus trained alongside warriors like Crixus and Gannicus. Among them, Spartacus began to organize, speaking of freedom not as an impossible dream, but as something that could be seized.' } }, { type: 'kop', tekst: { en: 'Trained to Die Well' } }, { type: 'tekst', inhoud: { en: 'In the arena, gladiators were forced to fight to the death before crowds demanding blood. Yet before games began, they took an oath binding them as warriors and men. It was this oath Spartacus invoked. He spoke to his fellow fighters about escape, about taking their weapons and breaking free. Most dismissed him as a dreamer. Others, worn down by years of servitude, began to believe. Word spread quietly—there was a plan.' } }, { type: 'weetje', tekst: { en: 'A trained gladiator was an expensive investment, so most bouts ended in surrender rather than death.' } }, { type: 'tekst', inhoud: { en: 'The guards and masters were confident in their control. They did not see these broken men as a threat, did not see the spark of rebellion Spartacus had kindled. In 73 BC, that spark was about to become a fire.' } }] },
    { id: 3, titel: { en: 'The Spark Ignites' }, afbeelding: SCENE_IMAGES['spartacus-3'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-3'], alt: { en: 'Gladiators escaping a barracks at night with kitchen knives and torches.' }, bijschrift: { en: 'The first weapons of the revolt came out of the kitchen.' } }, { type: 'tekst', inhoud: { en: 'In 73 BC, Spartacus and followers made their move. Approximately seventy or eighty gladiators fled, leaving behind the walls of their prison. They fled to Mount Vesuvius, a desperate refuge where they might hide from pursuing Romans. But here, Spartacus began to gather recruits. Word spread among the enslaved: a gladiator had broken free and was gathering followers. Field workers, servants, miners—all began to seek him out.' } }, { type: 'kop', tekst: { en: 'From Fugitives to an Army' } }, { type: 'tekst', inhoud: { en: 'Spartacus transformed this growing mass into an army. He organized them into units, trained them to fight, and gave them hope. Within months, approximately 70,000 followers had gathered. They were not professional soldiers, but they were fighting for their lives, for their freedom. This hunger for liberty proved a powerful motivator. Spartacus declared that his followers would no longer be slaves—they would fight their way to freedom or die trying.' } }, { type: 'sleutelmoment', jaar: -73, tekst: { en: 'Around seventy gladiators break out of Capua and take refuge on the slopes of Vesuvius.' } }, { type: 'tekst', inhoud: { en: 'For the first time, Rome would face a slave revolt of unprecedented scale. The mountain that would later destroy Pompeii was now the birthplace of a rebellion that would shake Rome to its core.' } }] },
    { id: 4, titel: { en: 'First Victories' }, afbeelding: SCENE_IMAGES['spartacus-4'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-4'], alt: { en: 'A ragged slave army overrunning a Roman marching camp at dawn.' }, bijschrift: { en: 'Rome sent militia against what it called a nuisance, and lost.' } }, { type: 'tekst', inhoud: { en: 'Rome sent relatively small forces to crush what they viewed as a minor nuisance. This proved a grave mistake. The Roman forces, confident in their superiority, advanced into Spartacus\'s territory. What followed were stunning defeats for Rome. Spartacus, with tactical brilliance and knowledge of terrain, outmaneuvered the Roman legions. One by one, Roman commanders fell in battle or retreated in humiliation.' } }, { type: 'kop', tekst: { en: 'Word Spreads' } }, { type: 'tekst', inhoud: { en: 'The early victories had a profound effect throughout Italy. The enslaved population, witnessing that their Roman masters were not invincible, flocked to join his cause. Entire estates were liberated, entire communities rose up against their oppressors. Spartacus\'s army grew exponentially. These victories gave the slave army confidence. They were no longer just refugees hiding in mountains; they were a force that could defeat Roman armies.' } }, { type: 'weetje', tekst: { en: 'Trapped on Vesuvius, the rebels climbed down the cliffs on ropes braided from wild vines and attacked the Roman camp from behind.' } }, { type: 'citaat', tekst: { en: 'I am not a slave, and I will never again be a slave' }, bron: { en: 'Spartacus' } }] },
    { id: 5, titel: { en: 'The March Through Italy' }, afbeelding: SCENE_IMAGES['spartacus-5'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-5'], alt: { en: 'A vast column of freed slaves with carts and livestock crossing the Italian countryside.' }, bijschrift: { en: 'By 72 BC the revolt was less an army than a nation on the move.' } }, { type: 'tekst', inhoud: { en: 'Having defeated multiple Roman forces, Spartacus faced a crucial decision. He could escape Rome, seeking safety beyond the empire\'s borders, or continue marching through Italy, liberating more slaves. For a time, he marched north toward the Alps, perhaps hoping to lead his people to freedom in Gaul. Yet his followers had other ideas. Many had families still enslaved in the south. Others believed they could actually challenge Rome, could overthrow the system that had enslaved them.' } }, { type: 'kop', tekst: { en: 'North, Then South Again' } }, { type: 'tekst', inhoud: { en: 'Spartacus decided to turn his army around and march south, toward Rome itself. It was a bold, perhaps reckless decision. As they moved through Italy, more and more joined his cause. The wealthy estates that had built Rome\'s prosperity were attacked and burned. The slaveholders who had lived off enslaved labor were killed or fled. For a brief, glorious moment, it seemed possible that the slave revolt could actually succeed.' } }, { type: 'sleutelmoment', jaar: -72, tekst: { en: 'Spartacus reaches the foot of the Alps, and turns back instead of crossing into freedom.' } }, { type: 'tekst', inhoud: { en: 'Rome\'s rulers watched with alarm. A slave was marching through their territory with an army that ancient writers put at between seventy and a hundred and twenty thousand. The Senate took action. They recalled their best general from Spain and gave him command against Spartacus. His name was Marcus Licinius Crassus, one of Rome\'s richest men and a brilliant military commander.' } }] },
    { id: 6, titel: { en: 'Alliance Tested' }, afbeelding: SCENE_IMAGES['spartacus-6'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-6'], alt: { en: 'Legionaries digging an enormous ditch and rampart across a narrow neck of land.' }, bijschrift: { en: 'Crassus did not chase Spartacus. He walled him in.' } }, { type: 'tekst', inhoud: { en: 'Crassus proved a far more formidable opponent than previous generals. He was disciplined, strategic, and merciless. He understood that Spartacus\'s army, though numerous, was not a true military force but desperate individuals. Crassus implemented encirclement and containment, cutting off escape routes and fragmenting forces. The slave army, which had seemed so powerful months earlier, began to come apart. Internal divisions emerged—some wanted to continue fighting, others wanted to escape, still others wanted to negotiate.' } }, { type: 'kop', tekst: { en: 'Cracks in the Ranks' } }, { type: 'tekst', inhoud: { en: 'Among Spartacus\'s followers were different factions with different goals. Some, like Crixus, believed in fighting to the end. Others questioned whether they could defeat Rome. Spartacus held his fractured army together through force of personality, but the unity that had made early victories possible was crumbling. The reality of facing a professional Roman military machine was sobering. Each battle with Crassus ate away at numbers and resources.' } }, { type: 'weetje', tekst: { en: 'Crassus revived decimation to restore discipline: one man in ten of a unit that had broken, chosen by lot, killed by his own comrades.' } }, { type: 'tekst', inhoud: { en: 'By 71 BC, Spartacus was cornered in southern Italy. Crassus had cut off his escape routes. Behind him was the sea; ahead and on all sides were Roman legions. Spartacus\'s great dream had reached its final moment. He had achieved something no slave before him had—gathered hundreds of thousands, defeated Rome\'s generals, proven the enslaved could fight back. But Rome\'s military machine had proven too powerful.' } }] },
    { id: 7, titel: { en: 'Final Stand' }, afbeelding: SCENE_IMAGES['spartacus-7'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-7'], alt: { en: 'A last battle in the hills of southern Italy, a slave army breaking against Roman lines.' }, bijschrift: { en: 'Cornered in the south, the revolt made its stand in 71 BC.' } }, { type: 'tekst', inhoud: { en: 'In 71 BC, in Lucania in the south of Italy, probably near the Silarus river, Spartacus and his remaining forces made their final stand. The exact battle details are unclear—ancient sources vary—but what is certain is that it was devastating. Crassus brought Rome\'s full military might to bear. Spartacus, knowing the end was near, fought with the courage of a man with nothing left to lose but his chains. He died in battle, though it is not entirely clear how.' } }, { type: 'kop', tekst: { en: 'The Price of Rebellion' } }, { type: 'tekst', inhoud: { en: 'The aftermath was brutal. Crassus wanted to make an example, to ensure no one would ever dare rise up again. He crucified 6,000 of Spartacus\'s followers along the Appian Way, the great road connecting Rome to the provinces. The crucified slaves were left hanging, a terrible warning to anyone who might consider rebellion. Yet in doing this, Rome\'s rulers admitted something: they feared the enslaved. They recognized that beneath their empire\'s surface existed a vast population that resented their bondage.' } }, { type: 'sleutelmoment', jaar: -71, tekst: { en: 'Six thousand captured rebels are crucified along the Appian Way, from Capua to the gates of Rome.' } }, { type: 'tekst', inhoud: { en: 'Spartacus died as he lived—a warrior fighting for freedom. He never achieved his ultimate goal of liberating all Rome\'s enslaved. But he proved something Rome\'s rulers had hoped to keep hidden: that the enslaved were not content to remain in chains, that they could organize, could fight, and could challenge even the greatest military power the world had yet known.' } }] },
    { id: 8, titel: { en: 'Legacy of Freedom' }, afbeelding: SCENE_IMAGES['spartacus-8'], blokken: [{ type: 'afbeelding', bron: SCENE_IMAGES['spartacus-8'], alt: { en: 'Broken iron shackles lying in the dust of an empty Roman road at sunset.' }, bijschrift: { en: 'His body was never found, which is part of why the story never died.' } }, { type: 'tekst', inhoud: { en: 'Spartacus died in 71 BC, but his memory lived on. For the enslaved masses, he became a symbol of resistance—proof that freedom was not impossible, that slaves could fight back. For Rome\'s rulers, he was a cautionary tale—a reminder that power built on slavery could never be entirely stable. In centuries that followed, Spartacus\'s name was remembered and retold. Philosophers, historians, and modern revolutionaries invoked his spirit as evidence that the oppressed could rise up against their oppressors.' } }, { type: 'kop', tekst: { en: 'What Rome Refused to Learn' } }, { type: 'tekst', inhoud: { en: 'While Rome continued relying on slavery for centuries after Spartacus\'s death, his revolt exposed deep contradictions of the slave system. Subsequent slave wars were fewer and less successful. Yet Spartacus demonstrated something no military power could fully suppress: the human desire for freedom is stronger than the chains that bind us. In the end, Spartacus did not fail—he succeeded in proving that the enslaved were not mere property, but men and women capable of fighting for their own destiny.' } }, { type: 'weetje', tekst: { en: 'Two thousand years on, his name has been borrowed by a German revolutionary league, a Soviet sports club and a Hollywood epic.' } }, { type: 'tekst', inhoud: { en: 'His name echoes through history as a symbol of resistance, of the courage it takes to defy an empire, and of the belief that freedom is worth any price. Spartacus remains one of history\'s most inspiring figures—a man who dared to dream of liberation and inspired millions to do the same.' } }] },
  ],
};

export const ashoka: Verhaal = {
  id: 'ashoka-maurya',
  beginJaar: -304,
  toegevoegdOp: '2026-08-19',
  titel: { en: 'Ashoka' },
  ondertitel: { en: 'The emperor who renounced conquest' },
  teaser: { en: 'He drenched Kalinga in blood, then carved his remorse into rock across half a subcontinent. How did India\'s most ruthless conqueror become its most famous preacher of mercy?' },
  jaar: -261,
  periodeLabel: '304 BC - 232 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['ashoka-maurya'],
  portretKleur: '#A0522D',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'oudheid',
  themas: ['macht', 'india', 'oorlog', 'religie', 'rijk'],
  leestijdMinuten: 16,
  personage: { naam: 'Ashoka' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Dynasty Forged in War' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-1'],
          alt: { en: 'War elephants and massed infantry drawn up before the timber ramparts of a city on the Ganges plain.' },
          bijschrift: { en: 'Magadha, fourth century BCE: iron, rice and elephants made it the richest prize in India.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the fourth century BCE, the richest prize in India lay along the middle Ganges: the kingdom of Magadha, with its iron mines, its rice surplus, its war elephants and its river highways. Whoever held Magadha could feed and arm more soldiers than any rival on the plain. For generations it had been ruled by the Nandas, a dynasty so wealthy and so hated that when Alexander of Macedon reached the Beas river in 326 BCE, his exhausted troops heard rumours of the Nanda army waiting beyond it — thousands of chariots, tens of thousands of horse, and elephants beyond counting — and refused to march another step. Alexander turned back. The subcontinent was left to settle its own future.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -321,
          tekst: { en: 'A young adventurer named Chandragupta Maurya overthrows the Nanda king and seizes the throne of Magadha, founding the dynasty that will rule most of India.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Chandragupta was a conqueror of extraordinary appetite. Within two decades he had swept westward across northern India and confronted Seleucus Nicator, Alexander\'s former general, who was trying to reclaim the Macedonian holdings beyond the Indus. Around 303 BCE the two men made a bargain: Seleucus ceded the eastern satrapies — the lands of Gandhara, Arachosia and the Kabul valley — and received in exchange five hundred war elephants. A Greek ambassador, Megasthenes, was despatched to the Mauryan court and wrote an account of what he saw there that later Greek and Roman authors mined for centuries.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Those five hundred Indian elephants did not stay idle. Seleucus led them into the battle of Ipsus in Anatolia in 301 BCE, where their charge helped decide the fate of Alexander\'s empire. A treaty signed on the Indus reshaped the politics of the Aegean.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Chandragupta\'s son Bindusara inherited this machine around 297 BCE and pushed it further south, earning — if the later tradition is right — the nickname Amitraghata, \'slayer of enemies\'. Somewhere in his crowded palace at Pataliputra, in about 304 BCE, a son was born who would be called Ashoka: \'without sorrow\'. Buddhist legend, written down centuries afterwards, insists his mother was a woman of modest family, that his skin was rough and unlovely, and that his father found him distasteful. Whether any of this is true is impossible to say. What is certain is that he was one of many royal sons, and not the obvious heir.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This is the fundamental problem of Ashoka\'s life. Two kinds of evidence survive, and they barely speak to each other. On one side stand his own inscriptions, cut into rock faces and polished sandstone pillars during his lifetime — the earliest deciphered writing of historical India, the voice of the man himself. On the other stand devotional biographies composed hundreds of years later in Sri Lanka and northern India, full of miracles, monstrous cruelties and edifying conversions. The historian\'s task is to hold the two apart without discarding either, because between them lies one of antiquity\'s strangest transformations.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Prince Who Should Not Have Been King' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-2'],
          alt: { en: 'A young prince in white cotton walking through a northwestern city of scholars and traders.' },
          bijschrift: { en: 'Taxila, where Persian, Greek and Indian worlds overlapped - and where a Mauryan prince served his apprenticeship as viceroy.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Mauryan princes were not raised in idleness. The empire was divided into great provinces, each governed by a royal son acting as viceroy, and the young Ashoka was sent to Taxila in the far northwest — a cosmopolitan city of scholars and traders where Persian, Greek and Indian worlds overlapped. Tradition says the city had risen in revolt against the oppression of imperial officials and that Ashoka was sent to restore order, entering without a fight because the citizens declared their quarrel was with the bureaucrats, not the prince. Later he governed the western province from Ujjain, a hub of the trade routes running down to the Arabian Sea.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Vidisha, near Ujjain, he is said to have taken as a companion the daughter of a local merchant, called Devi in the chronicles. Their children — a son, Mahinda, and a daughter, Sanghamitta — would matter enormously later, when Buddhism crossed the sea to Sri Lanka. But that lay decades ahead. For now Ashoka was a competent provincial administrator with no clear claim to the throne.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Bindusara died, around 273 BCE, the succession was disputed. Something violent happened. We know this because of a curious gap in Ashoka\'s own record: he counts the years of his reign not from his accession but from his consecration, and four years separate the two. An emperor who waited four years for his coronation was an emperor still fighting for it.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -268,
          tekst: { en: 'After a struggle of roughly four years, Ashoka is formally consecrated as emperor at Pataliputra; from this year he dates every event of his reign.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Buddhist tradition fills the gap with slaughter. The Ashokavadana claims he killed ninety-nine half-brothers to clear his path, sparing only one. The Sri Lankan chronicles tell a similar tale. Yet Ashoka\'s own edicts, carved while he ruled, speak warmly of the households of his brothers and sisters in Pataliputra and the provinces, and instruct his officials to look after them. Ninety-nine murders is the arithmetic of legend, not of government. Some killing there almost certainly was; a war of succession in a dynasty three generations old is not surprising. The wholesale massacre is the pious storyteller\'s way of making the later conversion shine brighter.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Later Buddhist writers gave the young ruler the nickname Chandashoka, \'Ashoka the Fierce\', and told of a torture chamber he built outside his capital, disguised as a beautiful pavilion, from which no visitor emerged alive. After his conversion the same writers renamed him Dharmashoka, \'Ashoka the Righteous\'. The two names are a moral device, not a biography.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For the first eight years after his consecration, Ashoka behaved exactly as a Mauryan emperor was expected to behave. He hunted. He held pleasure tours. His kitchens killed hundreds of animals daily for the royal table. And he looked at the map of his inheritance and saw a hole in it — a stubborn, wealthy, unconquered country on the eastern coast that his father and grandfather had never taken.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Machine of Empire' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-3'],
          alt: { en: 'A vast capital of teak palisades and moats along a wide river, clerks crossing timber bridges.' },
          bijschrift: { en: 'Pataliputra: a capital of wood and water, and the largest city its world had ever built.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The empire Ashoka now commanded was the largest political structure the subcontinent had ever known, and one of the largest anywhere on earth at the time. Its writ ran from the Hindu Kush and the valleys of modern Afghanistan, across the Punjab and the Gangetic plain to the Bay of Bengal, and southward through the Deccan into what is now Karnataka. Only the far south stayed outside it: in his own inscriptions Ashoka names the Cholas, Pandyas, Satiyaputras and Keralaputras as neighbours rather than subjects, along with the Sri Lankans across the strait.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A capital of wood and water' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At its heart stood Pataliputra, on the Ganges near modern Patna. Megasthenes, the Greek envoy who had lived there under Chandragupta, described a city stretching some fifteen kilometres along the river, defended by a moat and an enormous timber palisade pierced by sixty-four gates and studded with hundreds of towers. For a long time this sounded like traveller\'s exaggeration — until excavations at Bulandi Bagh and Kumrahar in the twentieth century turned up the waterlogged remains of massive wooden walls and a great pillared hall, and the Greek account began to look sober.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Holding such a territory together required paperwork as much as spears. The Arthashastra, the ruthless manual of statecraft associated with Chandragupta\'s minister Kautilya, describes the ideal Mauryan state: a king who never sleeps unguarded, a treasury fed by a share of every harvest, superintendents for mines, forests, weights, ships, brothels, liquor and gambling, and a web of informers reporting on officials and citizens alike. Even if the text as we have it was compiled later, it reflects a real ambition — government as an engineering problem, with revenue as the fuel.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Four great provinces radiated from the centre, each under a prince of the blood: Taxila in the northwest, Ujjain in the west, Suvarnagiri in the south, and Tosali on the eastern coast. Royal roads linked them, planted with shade trees and dotted with wells and rest houses. Along them moved grain, tribute, elephants, soldiers and — later — the emperor\'s officials carrying a new kind of message. The state was already in the habit of speaking to its subjects; Ashoka would change only what it said.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Mauryan craftsmen achieved a mirror-bright polish on hard sandstone that has never been convincingly reproduced. Pillars raised more than two thousand two hundred years ago still gleam where the surface is undamaged, and the technique remains unexplained.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This was the apparatus Ashoka turned eastward in the ninth year of his reign. Kalinga, roughly the coast of modern Odisha and northern Andhra Pradesh, was rich, populous, proud and awkwardly placed — a wedge of independence between the Mauryan heartland and the southern provinces, commanding the sea route down the eastern seaboard. Its conquest was not a whim. It was the logical completion of his grandfather\'s work.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Kalinga' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-4'],
          alt: { en: 'The aftermath of a battle on the eastern coast, abandoned shields and long lines of captives.' },
          bijschrift: { en: 'Kalinga, about 261 BCE. No general is named and no battle described - only the reckoning, in the conqueror\'s own words.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'We know almost nothing about how the Kalinga war was fought. No general is named, no battle described, no siege recorded. There is no account from the Kalinga side at all. What survives is the aftermath, and it survives in the most unexpected place imaginable: in the conqueror\'s own official proclamation, cut into rock in a dozen locations across his empire, listing the human cost of his victory as though it were an indictment.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -261,
          tekst: { en: 'In the eighth year after his consecration, Ashoka invades and conquers Kalinga on the eastern coast.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'One hundred and fifty thousand were deported, one hundred thousand were killed and many more died from other causes.' },
          bron: { en: 'Ashoka, Major Rock Edict XIII, trans. Ven. S. Dhammika' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Read those numbers slowly. They are not the boasts of a triumphal arch; the edict presents them as a wound. And the deportations may have been the worse half. Uprooting a hundred and fifty thousand people meant emptying villages, breaking up families and marching civilians hundreds of kilometres to clear and settle land elsewhere — a standard tool of ancient statecraft, used from Assyria to Persia, and one that killed by exhaustion, hunger and disease long after the fighting stopped. The \'many more\' who died from other causes were the famine and epidemic that follow armies everywhere.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The same inscription reaches beyond the body count towards something rarer in ancient writing: an attempt to imagine other people\'s grief. It observes that when a country is conquered, brahmins and ascetics and householders who have done no wrong suffer alongside the soldiers, that men see their friends, relatives and companions killed or carried off, and that even those who survive untouched are wounded by the misfortune of those they love. This is a state document explaining, at public expense, why the state\'s greatest military achievement was a catastrophe.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Local tradition, much later, would say that Ashoka walked the battlefield the morning after and found the Daya river running red, and that the sight broke him. There is no evidence for the scene, and the transformation was probably slower and less cinematic than a single dawn. But something did happen in the mind of a man who had spent eight years behaving like an ordinary king. Whatever it was — political calculation, exhaustion, genuine horror, or all three — it produced a decision without parallel in the ancient world. Kalinga was the last territory Ashoka ever conquered. He held it, garrisoned it, and never went to war again.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Remorse of the Beloved of the Gods' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-5'],
          alt: { en: 'An emperor sitting alone on a palace terrace at dusk, his crown and weapons set aside beside him.' },
          bijschrift: { en: '\'Beloved-of-the-Gods felt remorse.\' No other ancient ruler put that sentence in an official proclamation.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'After the Kalingas had been conquered, Beloved-of-the-Gods came to feel a strong inclination towards the Dhamma, a love for the Dhamma and for instruction in Dhamma.' },
          bron: { en: 'Ashoka, Major Rock Edict XIII, trans. Ven. S. Dhammika' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The emperor never calls himself Ashoka in most of his inscriptions. He is Devanampiya Piyadasi — \'Beloved of the Gods, He Who Looks On With Affection\' — a royal title, formal and slightly remote. In one of his earliest surviving proclamations he admits, with disarming frankness, that his religious life began badly: he had been a lay follower for more than two and a half years without exerting himself, and only then drew close to the community of monks and became serious. Conversion, in his own telling, was not a thunderbolt but a slow gathering of resolve.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'What Ashoka meant by dhamma' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Dhamma — dharma in Sanskrit — is usually translated as \'the law\' or \'the teaching\', and it is tempting to read Ashoka\'s edicts as Buddhist sermons. They are not, or not only. Almost none of them mention the Buddha\'s central doctrines: no four noble truths, no eightfold path, no nirvana. What Ashoka preached to his subjects was a public ethic that any of them could accept: obedience to parents and elders, respect for teachers, generosity to brahmins and ascetics of every persuasion, kindness to slaves and servants, truthfulness, moderation in spending, and above all restraint from injuring living beings. He was a Buddhist in private devotion and something broader in public — the ruler of a religiously plural empire proposing a common moral language for it.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The great confession of Rock Edict XIII was inscribed all around the empire — but not in Kalinga itself. There, two entirely different edicts were carved instead, addressed to the local administrators. Even a repentant emperor was careful about what the conquered were told.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In place of conquest by arms, the edicts announce dhamma-vijaya: victory by righteousness. Ashoka claimed to have won such victories not only among the forest peoples and border tribes of his own realm, but far beyond it — and he named the foreign kings he had reached, a roll-call that reads like a map of the Hellenistic world after Alexander: Antiochus in Syria, and beyond him Ptolemy in Egypt, Antigonus in Macedon, Magas in Cyrene and Alexander in Epirus. No Greek source records receiving these missions. But the list proves that an Indian emperor in the third century BCE knew exactly who ruled the Mediterranean, and thought his message worth sending there.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -257,
          tekst: { en: 'Ashoka begins having his proclamations carved into rock faces and cave walls across the empire — the earliest deciphered inscriptions in Indian history.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Words in Stone' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-6'],
          alt: { en: 'A tall polished stone pillar crowned with sculpted lions, standing beside an earth road on an empty plain.' },
          bijschrift: { en: 'Roughly thirty-three inscriptions survive, cut into cliffs and pillars from Afghanistan to the Deccan.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'No ancient ruler talked to his subjects quite like this. Roughly thirty-three distinct inscriptions survive, scattered over dozens of sites from Afghanistan to the Deccan. Major rock edicts were cut into boulders and cliff faces near the frontiers and along trade routes; minor edicts appear on outcrops in the south; and in the heartland Ashoka raised monolithic sandstone pillars, quarried at Chunar near Varanasi, dragged hundreds of kilometres, polished to a glassy sheen and topped with carved animals. Most are written in Prakrit, the everyday speech of northern India, in the Brahmi script — but in the northwest they switch to Kharoshthi, and at Kandahar to Greek and Aramaic, so that the local populations could read them in their own tongues.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 1958 workmen at Kandahar in Afghanistan uncovered a slab bearing the same royal message in flawless Greek and in Aramaic. An Indian emperor was preaching self-restraint and abstention from killing to the descendants of Alexander\'s soldiers, in the language of Plato.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The edicts are not only sermons. They report public works with the pride of a modern infrastructure ministry: wells dug along the roads at regular intervals, rest houses built, banyan trees planted to shade travellers and cattle, mango groves laid out, and medicinal herbs imported and cultivated for the treatment of humans and animals alike. Ashoka claims to have provided medical care throughout his dominions and even in the lands of his neighbours. He restricted the slaughter of animals, published lists of protected species, and announced that his own kitchen, which had once killed hundreds of creatures daily, was now down to two peacocks and a deer — and that even these would eventually cease.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'One should not honour only one\'s own religion and condemn the religions of others, but one should honour others\' religions for this or that reason.' },
          bron: { en: 'Ashoka, Major Rock Edict XII, trans. Ven. S. Dhammika' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To carry all this out he created a new class of official, the dhamma-mahamatas — \'officers of righteousness\' — charged with promoting moral conduct, inspecting prisons, relieving hardship among the old and the dependent, and looking after the interests of every religious community, Buddhist, brahmin, Jain and Ajivika alike. He replaced the traditional royal pleasure tours, with their hunting and feasting, by tours of dhamma, on which he visited ascetics and elders, distributed gold, and questioned people about the teaching. Provincial governors were ordered to send out inspection circuits every few years so that the message did not stop at the palace gate.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Yet Ashoka was still an emperor, and the edicts admit it. He did not abolish capital punishment; he granted the condemned three days\' respite so that their relatives could plead for them and they could prepare their minds. He did not return Kalinga. And in the very inscription where he mourns the dead, he warns the forest tribes on his borders that although he is patient with them, they should not push him, for he has the power to punish and they would do well to repent. Mercy, in the third century BCE, was still delivered from the top of a very tall throne.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Emperor and the Sangha' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-7'],
          alt: { en: 'A great brick stupa under construction, bamboo scaffolding on the mound and monks in ochre robes.' },
          bijschrift: { en: 'Sanchi began as a Mauryan brick core. Imperial patronage gave a wandering movement its architecture.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ashoka\'s patronage transformed Buddhism from one of many ascetic movements in the Ganges valley into a religion with imperial architecture. He is credited with enlarging and encasing the earliest stupas — the great mound at Sanchi began as a Mauryan brick core — and with erecting pillars at the sites of the Buddha\'s life. At Lumbini, where tradition placed the Buddha\'s birth, he raised a pillar recording that he had come in person in the twentieth year of his reign, worshipped there, and reduced the village\'s tax burden in honour of the site. It is the closest thing we have to a receipt for an ancient pilgrimage.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -250,
          tekst: { en: 'According to Sri Lankan tradition, a great Buddhist council meets at Pataliputra under Ashoka\'s patronage to settle doctrine and purge the monastic order of impostors.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That the emperor concerned himself with the internal discipline of the monastic community is not merely legend. In several inscriptions — the so-called schism edicts — he orders that any monk or nun who divides the order be made to put on white lay clothing and be expelled from the monastery. It is a startling document: the imperial state, in writing, taking responsibility for the unity of a religion. Rulers had long paid for temples. Ashoka was policing a creed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His most consequential act may have been an export. Tradition holds that he sent his son Mahinda as a missionary to the island of Lanka, where King Devanampiya Tissa was converted, and that his daughter Sanghamitta followed with a cutting of the Bodhi tree under which the Buddha had gained enlightenment. Whether or not the details are exact, Buddhism took root in Sri Lanka in precisely this period and was preserved there in a written canon while it faded in the land of its birth. Missions are also recorded to the Himalayan regions, to Gandhara and to the western Deccan. A regional teaching began its journey towards becoming a world religion.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The last years' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The final decade is thinly documented. One inscription on a pillar records donations made by his queen Karuvaki, mother of the prince Tivara — a rare glimpse of the imperial household. The Buddhist tradition tells a poignant and probably invented tale of an aged, sidelined Ashoka giving away the contents of the treasury to the monks until his ministers cut off his access to it, leaving him with a single half-eaten myrobalan fruit to donate. Even as fiction it captures a real anxiety: what happens to a state whose ruler has poured its wealth into piety?',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -232,
          tekst: { en: 'Ashoka dies after some forty years on the throne, leaving an empire without an obvious successor of his stature.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Star That Shines Almost Alone' },
      afbeelding: SCENE_IMAGES['ashoka-maurya-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['ashoka-maurya-8'],
          alt: { en: 'A weathered stone pillar standing alone in an overgrown landscape, fallen masonry half buried in grass.' },
          bijschrift: { en: 'The empire outlived him by barely fifty years. The pillars outlived the empire by two thousand.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The empire did not survive him by long. Within half a century the Mauryan provinces were splintering, the northwest was slipping away to Greek kings from Bactria, and the centre had contracted to Magadha and its immediate surroundings. In about 185 BCE the last Mauryan, Brihadratha, was killed by his own commander-in-chief, Pushyamitra Shunga, at a review of the army. Later Buddhist writers blamed Ashoka\'s pacifism for the collapse: an empire that stops conquering, they implied, starts dying. Modern historians are more sceptical. Ashoka never disbanded his army, and vast ancient empires held together by personal authority and a slow-moving bureaucracy rarely outlived two or three weak successors, whatever their religious policy.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -185,
          tekst: { en: 'The murder of Brihadratha by his general Pushyamitra Shunga ends the Mauryan dynasty roughly fifty years after Ashoka\'s death.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Then Ashoka vanished. Buddhists in Sri Lanka, Tibet, China and Southeast Asia remembered a legendary king of that name, the model of the pious world-ruler. But in India itself the historical emperor faded into a story, and his inscriptions became unreadable stone. In the 1350s the Delhi sultan Firuz Shah Tughluq was so taken with two polished pillars he found in the countryside that he had them transported to his capital on carts and river barges and re-erected them; he summoned scholars to interpret the elegant characters running around them, and nobody in his realm could read a word.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1837,
          tekst: { en: 'James Prinsep, working in Calcutta, cracks the Brahmi script and the edicts speak again after nearly two thousand years of silence.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'What Prinsep read was the voice of a king called Devanampiya Piyadasi, and at first nobody knew who that was. The identification came from Sri Lanka, where the chronicles applied the same title to Ashoka. Confirmation arrived only in 1915, when an inscription at Maski in Karnataka turned up bearing both the title and the personal name together. Piece by piece, an emperor who had left no statue, no tomb and no chronicle was reassembled out of his own public announcements — which may be the most honest form of survival any ruler has ever managed.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Amidst the tens of thousands of names of monarchs that crowd the columns of history, their majesties and graciousnesses and serenities and royal highnesses and the like, the name of Asoka shines, and shines almost alone, a star.' },
          bron: { en: 'H. G. Wells, The Outline of History, 1920' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When India became independent, it reached back past every intervening empire to this one. The four-lion capital that had crowned Ashoka\'s pillar at Sarnath was adopted as the state emblem in 1950, and the wheel from its base — the chakra of dhamma — was placed at the centre of the national flag in 1947. It is a deliberate choice, and an uncomfortable one to live up to. The man commemorated there was a mass killer who told the world what he had done, in writing, on stone, in the languages of everyone he ruled. His remorse is the only ancient confession of its kind, and we have it because he insisted on carving it where it could not be quietly forgotten.',
          },
        },
      ],
    },
  ],
};

export const alexander: Verhaal = {
  id: 'alexander-the-great',
  beginJaar: -356,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Alexander the Great' },
  ondertitel: { en: 'The king who marched to the edge of the known world' },
  teaser: { en: 'King at twenty, master of an empire from Greece to India by thirty. What drove a Macedonian prince to march further than anyone before him?' },
  jaar: -323,
  periodeLabel: '356 BC - 323 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['alexander-the-great'],
  portretKleur: '#9C6B30',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'oudheid',
  themas: ['macht', 'oorlog', 'rijk', 'griekenland', 'militair'],
  leestijdMinuten: 12,
  personage: { naam: 'Alexander the Great' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Prince of Macedon' },
      afbeelding: SCENE_IMAGES['alexander-the-great-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-1'],
          alt: { en: 'A boy calmly holding the bridle of a huge black stallion in a palace courtyard, turning its head towards the sun.' },
          bijschrift: { en: 'Pella, around 344 BC: the horse no one else could ride.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the summer of 356 BC, in the royal city of Pella in northern Greece, a son was born to King Philip II of Macedon and his queen Olympias. They named him Alexander. Macedon was a rough, horse-breeding kingdom on the edge of the Greek world, and many Athenians sneered at its people as half-barbarians. But Philip was turning it into the strongest military power the Greeks had ever seen, with a professional army and a new infantry formation, the phalanx, bristling with pikes nearly six metres long.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander grew up between two fierce personalities. His father was a brilliant soldier and a cunning diplomat, often away at war. His mother was proud and intensely religious, and she told her son that his true father was not Philip at all but Zeus, king of the gods. Whether Alexander believed it as a child is unknown, but the idea that he was meant for something more than a mortal life never left him.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Horse No One Could Ride' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Plutarch tells a story from Alexander\'s boyhood. A trader brought a magnificent black stallion to Philip\'s court, but the animal reared and kicked at every rider. The king ordered it taken away. Alexander protested, bet the price of the horse that he could tame it, and noticed what the grown men had missed: the horse was frightened of its own shadow. He turned it to face the sun, calmed it, and rode off. Philip is said to have told him to find a kingdom worthy of himself, because Macedon was too small. The horse was Bucephalus, and it carried Alexander for most of his life.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -343,
          tekst: { en: 'Philip hires the philosopher Aristotle to teach the thirteen-year-old Alexander at Mieza, away from the noise of the court.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For about three years Aristotle taught Alexander and a group of noble boys, among them his closest friend Hephaestion. They studied philosophy, medicine, politics and above all Homer. Alexander came to see himself in Achilles, the hero of the Iliad, who chose a short and glorious life over a long and quiet one. He is said to have kept a copy of the poem, annotated by Aristotle, with him on campaign for the rest of his life.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Aristotle and Alexander are one of history\'s most famous teacher-and-pupil pairs, yet they later drifted apart. The philosopher thought non-Greeks were natural subjects; his pupil would end up marrying into the Persian nobility.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Sword and the Throne' },
      afbeelding: SCENE_IMAGES['alexander-the-great-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-2'],
          alt: { en: 'Young cavalry commander leading a charge of horsemen through a line of hoplites on a dusty plain.' },
          bijschrift: { en: 'Chaeronea, 338 BC: the battle that made Macedon master of Greece.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At sixteen, while Philip was away fighting, Alexander was left in charge of Macedon. When a tribe on the northern frontier rebelled, he marched out, crushed the revolt and founded a settlement named after himself. Two years later he fought beside his father in the battle that decided the fate of Greece.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -338,
          tekst: { en: 'At Chaeronea, Philip defeats the combined armies of Athens and Thebes. Alexander, aged eighteen, commands the cavalry on the left wing.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Chaeronea Alexander led the heavy cavalry against the Sacred Band of Thebes, an elite unit that had not been beaten in decades. The Band was destroyed. After the battle Philip became the leader of an alliance of Greek cities and announced his next goal: a war against the Persian Empire, the enormous state that stretched from the Aegean to the borders of India and had invaded Greece more than a century before.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Knife at a Wedding' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Philip never fought that war. In 336 BC, at the wedding of his daughter in the old capital Aegae, he walked into the theatre and was stabbed to death by Pausanias, one of his own bodyguards. The killer was caught and killed on the spot, so his motive was never fully explained. Rumours soon pointed at Olympias, and even at Alexander, but nothing was ever proved.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander was twenty years old. The army proclaimed him king, and he moved fast. Rivals for the throne were killed. The Greek cities, which had cheered the news of Philip\'s death, were stunned when the new king appeared at the head of his army before they had time to organise. When Thebes revolted the following year on a false rumour that Alexander had died, he took the city by storm and razed it to the ground, sparing only the temples and the house of the poet Pindar. The message to the rest of Greece was unmistakable.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Philip\'s tomb was probably found in 1977 at Vergina in northern Greece, the site of ancient Aegae. Inside lay a golden chest with cremated bones and a gold wreath of oak leaves and acorns.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Across the Hellespont' },
      afbeelding: SCENE_IMAGES['alexander-the-great-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-3'],
          alt: { en: 'A young king hurling a spear from the bow of a warship towards the shore of Asia.' },
          bijschrift: { en: 'The Hellespont, 334 BC: Alexander claims Asia before he sets foot on it.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the spring of 334 BC Alexander led about 37,000 soldiers across the Hellespont, the narrow strait that separates Europe from Asia. According to one ancient account, he flung a spear from his ship into the beach before he landed, as a sign that he would win Asia by the spear. He then went to Troy, laid a wreath on the tomb of Achilles, and took from the temple of Athena a shield said to date from the Trojan War.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -334,
          tekst: { en: 'At the river Granicus, Alexander defeats the Persian governors of Asia Minor in his first battle against the Persian Empire.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The first battle came almost at once, at the river Granicus. Alexander led his cavalry straight across the water and up the steep far bank, conspicuous in a helmet with white plumes. In the fighting a Persian noble\'s axe split his helmet, and a second attacker was about to strike when Cleitus, one of Alexander\'s officers, cut off the man\'s arm. The Persians broke. Over the next months the Greek cities of the coast opened their gates one by one.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Knot of Gordium' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the winter of 334 BC the army reached Gordium in central Anatolia. In the town stood an ancient ox-cart, its yoke tied to the pole with a knot so complicated that no one could see where it began. A prophecy said that whoever untied it would rule Asia. Alexander studied the knot. In the most famous version he drew his sword and cut straight through it; another early writer says he simply pulled out the peg that held the knot together. Either way, he claimed the prophecy for himself.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The story may be partly legend, but it captures how Alexander worked. When a problem would not yield to patience, he looked for a bolder solution than anyone else would dare. To this day, a hard problem solved by one decisive stroke is called cutting the Gordian knot.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Issus and the Siege of Tyre' },
      afbeelding: SCENE_IMAGES['alexander-the-great-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-4'],
          alt: { en: 'A Persian king in a royal chariot fleeing across a battlefield as Macedonian horsemen charge towards him.' },
          bijschrift: { en: 'Issus, 333 BC: the Great King turns his chariot and flees.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Persian king, Darius III, now came west himself with a huge army. In November 333 BC the two armies met near Issus, on a narrow coastal plain where the sea on one side and the mountains on the other meant that Persian numbers counted for little. Alexander charged with his cavalry straight at the centre, where Darius stood in his chariot. The Great King turned and fled, leaving behind his army, his treasure and his family.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darius\'s mother, wife and children were captured in the royal camp. Alexander treated them with great courtesy and let them keep their royal titles and servants. Ancient writers admired this restraint, and it was also good politics: Alexander was beginning to present himself not as a raider but as the rightful successor to the Persian throne.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -332,
          tekst: { en: 'After a seven-month siege, Alexander captures the island city of Tyre, the greatest naval base on the eastern Mediterranean.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Road Built Across the Sea' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Instead of chasing Darius east, Alexander turned south along the coast to take away Persia\'s fleet by capturing its ports. Most surrendered, but Tyre, a rich Phoenician city on an island about 800 metres offshore, refused. Alexander\'s answer was to build a causeway of stones and timber across the sea to reach it. The Tyrians attacked the work with fire ships and divers, and the siege dragged on for seven months before Alexander\'s engineers and a newly assembled fleet broke through the walls.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The punishment was terrible. Thousands of defenders were killed, and many of the survivors were sold into slavery. The causeway was never removed. Sand gathered against it over the centuries, and today the old island of Tyre is joined permanently to the mainland.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Alexander\'s causeway changed the map for good. The sandy isthmus that grew around it is why modern Tyre, in Lebanon, sits on a peninsula instead of an island.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Pharaoh and Son of Ammon' },
      afbeelding: SCENE_IMAGES['alexander-the-great-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-5'],
          alt: { en: 'A small caravan of horsemen crossing golden dunes towards a palm-fringed oasis temple.' },
          bijschrift: { en: 'The Siwa oasis, 331 BC: a long ride through the desert to consult a famous oracle.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Late in 332 BC Alexander entered Egypt. The country had been under Persian rule and had rebelled against it more than once, and the Persian governor surrendered without a fight. The Egyptians welcomed Alexander as a liberator, and he was recognised as pharaoh, the living son of the gods in Egyptian belief.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -331,
          tekst: { en: 'Alexander founds Alexandria on the Mediterranean coast of Egypt. It will become the greatest city of the Greek world.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On a strip of land between the sea and a lake, Alexander marked out the plan of a new city. According to Plutarch, there was no chalk to draw the lines, so the builders used barley meal, and birds came down to eat it, which the seers read as a sign that the city would one day feed many people. They were right. Alexandria grew into the largest city of the Mediterranean, home of a famous lighthouse and the greatest library of the ancient world.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Oracle in the Desert' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander then did something his officers found puzzling. He rode hundreds of kilometres west through the desert to the oasis of Siwa, where an oracle of the god Ammon was famous across the Greek world. The journey was dangerous; ancient writers say the party lost its way and was guided by birds, or by snakes. What the oracle told Alexander in private he never revealed, but afterwards he let it be known that the god had greeted him as his son.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For Greeks, Ammon was the same god as Zeus. The visit fed the story Olympias had told him as a boy. After his death, coins struck by his successors showed him with the curling ram\'s horns of Ammon. Whether he truly believed he was the son of a god, or used the idea because it was useful, is still debated.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Alexander never saw Alexandria grow. He left Egypt a few months after founding it and did not return alive. His body, though, would be brought back and buried there.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Gaugamela and Persepolis' },
      afbeelding: SCENE_IMAGES['alexander-the-great-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-6'],
          alt: { en: 'Vast armies clashing on a flat plain, with scythed chariots charging and a dust cloud rising.' },
          bijschrift: { en: 'Gaugamela, 331 BC: the battle that ended the Persian Empire.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darius raised a new army, larger than the last, and chose his ground carefully: a wide, flat plain at Gaugamela, in what is now northern Iraq, where he had the ground levelled so his chariots, armed with blades on their wheels, could charge freely. Alexander\'s army was heavily outnumbered.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -331,
          tekst: { en: 'On 1 October, Alexander defeats Darius III at Gaugamela. The Persian Empire, the largest the world had seen, collapses.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander drifted his line to the right, pulling the Persian army after him until a gap opened in its centre. Then he drove his cavalry into that gap, straight towards Darius. For the second time the Great King fled. The chariots had done little damage; the Macedonians had simply opened lanes and let the horses run through. After Gaugamela, the great cities of the empire surrendered one after another: Babylon, Susa, and finally the royal capital of Persepolis.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Fire in the Palace' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Persepolis Alexander\'s soldiers found treasure on a scale that is hard to imagine; ancient writers say it took thousands of pack animals to carry it away. Then, in the spring of 330 BC, the great palace was set on fire. Some sources say it was deliberate revenge for the Persians burning Athens a century and a half earlier; others claim it began at a drunken feast. Its blackened ruins still stand in Iran today.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Darius did not live to see the end. As Alexander chased him east, the king\'s own nobles turned against him. In the summer of 330 BC Bessus, one of his governors and a kinsman, had him stabbed and left dying in a wagon. Alexander gave Darius a royal burial and hunted Bessus down. He now called himself King of Asia.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Persian Empire Alexander conquered stretched across parts of three continents. Its royal road ran about 2,700 kilometres, from Sardis near the Aegean to Susa in Iran.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'To the Edge of the World' },
      afbeelding: SCENE_IMAGES['alexander-the-great-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-7'],
          alt: { en: 'War elephants and soldiers clashing on the muddy bank of a wide river under a monsoon sky.' },
          bijschrift: { en: 'The Hydaspes, 326 BC: Alexander\'s last great battle, against King Porus and his elephants.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The years that followed were the hardest of the campaign. In Bactria and Sogdiana, the mountainous lands of modern Afghanistan and Uzbekistan, there were no great battles to win, only a long and brutal guerrilla war. And the strain began to show inside his own camp.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander was adopting Persian dress and court customs, and many Macedonians hated it. At a banquet in Maracanda, the city now called Samarkand, the officer Cleitus, the same man who had saved his life at the Granicus, mocked him in front of everyone. Both men were drunk. Alexander seized a spear and killed him. Afterwards he shut himself away in grief for days.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -326,
          tekst: { en: 'At the river Hydaspes in the Punjab, Alexander defeats King Porus and his war elephants in his last great battle.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 327 BC Alexander married Roxana, the daughter of a Sogdian nobleman, partly to win over the region. The next year the army crossed into India. At the Hydaspes, swollen by monsoon rain, King Porus waited on the far bank with an army and war elephants. Alexander slipped across upstream at night in a thunderstorm and won a hard battle. When the wounded Porus was brought before him and asked how he wished to be treated, he answered: like a king. Alexander gave him back his kingdom, and more land besides. Soon after the battle Bucephalus died, and Alexander founded a city in his honour, named Bucephala.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Treat me, Alexander, as a king.' },
          bron: { en: 'King Porus, as recorded by Arrian' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Army Says No' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Alexander wanted to push on to the Ganges and, he believed, the great ocean at the edge of the world. But at the river Hyphasis his soldiers refused. They had marched for eight years and thousands of kilometres. For three days Alexander sulked in his tent; then, when the omens for a crossing turned out unfavourable, he agreed to turn back. It was the only defeat of his life, and it came from his own men.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Last Years of a Legend' },
      afbeelding: SCENE_IMAGES['alexander-the-great-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['alexander-the-great-8'],
          alt: { en: 'A grand royal tent in Babylon at night, officers gathered in silence around a bed.' },
          bijschrift: { en: 'Babylon, June 323 BC: the king is dying at thirty-two.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The return was a disaster. Part of the army marched back through the Gedrosian desert in what is now southern Pakistan, and thousands died of heat, thirst and flash floods. Ancient writers called it worse than all the battles in Asia put together. Some suggested Alexander chose the route to rival legendary kings who had crossed it before him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Back in Persia, Alexander tried to bind his two peoples together. At Susa in 324 BC he held a mass wedding: he married a daughter of Darius, and around eighty of his officers took Persian brides on the same day. Thousands of soldiers who had already married local women had their marriages recognised. Many Macedonians resented it, and the army mutinied again before being won back.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Loss and an Empty Throne' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Late in 324 BC Hephaestion, Alexander\'s closest friend since childhood, died of a fever. Alexander was devastated and ordered a funeral of extraordinary size. The following spring he was in Babylon, planning new campaigns, when he fell ill after a banquet. The fever grew worse day by day. Soldiers filed past his bed in silence, and he could only lift his head and move his eyes to greet them.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -323,
          tekst: { en: 'Alexander dies in Babylon in June, aged thirty-two. The cause, whether fever or poison, has never been settled.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Asked who should inherit his empire, he is said to have answered: to the strongest. No single successor proved strong enough. His generals fought over the empire for decades and divided it into kingdoms, among them the Ptolemies in Egypt and the Seleucids in Asia. Roxana\'s son, born after his death, was murdered as a boy.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Yet Alexander\'s world outlived him. Greek became a common language from Egypt to Afghanistan, and Greek cities, art and ideas mixed with Persian, Egyptian and Indian ones for centuries. Historians call it the Hellenistic age. In thirteen years he had never lost a major battle, and for generations of rulers, from Julius Caesar onwards, he would be the measure against which they judged themselves.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Alexander\'s body was taken to Egypt and displayed in a magnificent tomb in Alexandria. Julius Caesar and Augustus both visited it. Its location has been lost, and archaeologists are still looking for it.' },
        },
      ],
    },
  ],
};

export const tutankhamun: Verhaal = {
  id: 'tutankhamun',
  beginJaar: -1341,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Tutankhamun' },
  ondertitel: { en: 'The boy-king the world forgot, until 1922' },
  teaser: { en: 'He ruled for barely ten years and died before he was twenty. So why is a minor pharaoh the most famous of them all?' },
  jaar: -1323,
  periodeLabel: 'c. 1341 BC - 1323 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['tutankhamun'],
  portretKleur: '#C9A227',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'oudheid',
  themas: ['egypte', 'farao', 'archeologie', 'religie', 'graf'],
  leestijdMinuten: 7,
  personage: { naam: 'Tutankhamun' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born in a Revolution' },
      afbeelding: SCENE_IMAGES['tutankhamun-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-1'],
          alt: { en: 'A pharaoh and his family raising their hands towards a sun disc whose rays end in small hands.' },
          bijschrift: { en: 'Amarna, around 1340 BC: one king, one god, and a new capital in the desert.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Around 1341 BC a boy was born into the royal family of Egypt and named Tutankhaten, \'the living image of the Aten\'. The name tells you about the strange world he arrived in. His father, almost certainly the pharaoh Akhenaten, had turned Egyptian religion upside down. For two thousand years Egyptians had worshipped hundreds of gods, led by Amun of Thebes. Akhenaten declared that there was really only one that mattered: the Aten, the disc of the sun.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He closed temples, sent workmen to chisel the name of Amun off monuments, and built a brand-new capital on an empty stretch of the Nile, a city called Akhetaten, \'horizon of the Aten\'. Today the site is known as Amarna. Art changed too: instead of stiff, idealised kings, the royal family was shown with long faces, round bellies and their children on their knees.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -1346,
          tekst: { en: 'Akhenaten founds his new capital at Amarna and devotes it to the Aten, the sun disc.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Who exactly Tutankhaten\'s mother was is still uncertain. In 2010, DNA tests on royal mummies suggested that his parents were brother and sister, both children of the previous pharaoh. Marriages like that were not unusual in Egypt\'s royal family, but they could leave children with weak health, and that may have shaped the boy\'s short life.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Akhenaten\'s chief wife was Nefertiti, whose painted bust in Berlin is one of the most famous faces from the ancient world. She was probably Tutankhamun\'s stepmother.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Boy on the Throne' },
      afbeelding: SCENE_IMAGES['tutankhamun-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-2'],
          alt: { en: 'A small boy wearing a tall crown seated on a golden throne beside a young queen, officials bowing.' },
          bijschrift: { en: 'Around 1332 BC: an eight-year-old becomes king of the richest country on earth.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Akhenaten died around 1336 BC, and after a short and confusing period in which one or two other rulers held the throne, the crown passed to Tutankhaten. He was about eight or nine years old. He was married to Ankhesenpaaten, a daughter of Akhenaten and Nefertiti, which probably made her his half-sister. She was a few years older than he was.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A child cannot run a kingdom, and real power lay with two older men. Ay was an experienced courtier who had served Akhenaten. Horemheb was the commander of the army. Between them they guided the young king\'s decisions, and both would later wear the crown themselves.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Richest Country on Earth' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The country they governed was at the height of its wealth. Egypt controlled gold mines in Nubia to the south and trading routes reaching deep into Asia. Foreign kings wrote letters to the pharaoh asking for gold, which they said was \'as common as dust\' in Egypt. But Akhenaten\'s revolution had left the country divided, and many priests and officials wanted the old gods back.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Tutankhamun is often called the boy-king, but by the end of his reign he was a young man of about eighteen or nineteen, married and old enough to have expected children.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Bringing Back the Gods' },
      afbeelding: SCENE_IMAGES['tutankhamun-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-3'],
          alt: { en: 'Priests carrying a golden shrine on poles back into a vast temple of stone columns.' },
          bijschrift: { en: 'Thebes: the old gods return to their temples.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Early in his reign the young king did something that announced a complete change of direction: he changed his name. Tutankhaten, \'living image of the Aten\', became Tutankhamun, \'living image of Amun\'. His wife became Ankhesenamun. The court left Akhenaten\'s city in the desert, which was slowly abandoned to the sand.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -1330,
          tekst: { en: 'Around this time Tutankhamun sets up the Restoration Stela at Karnak, promising to repair the temples of the old gods.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the great temple of Karnak, a carved stone slab, now known as the Restoration Stela, records what the king found when he came to the throne. The temples of the gods were in ruins, it says, their shrines overgrown, and the gods had turned their backs on Egypt. The king promised to rebuild them, appoint new priests and make new statues of gold.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'It is unlikely that a young boy wrote this himself. The words were almost certainly chosen by Ay, Horemheb and the priests of Amun. But it is in his name, and it marks the moment when Egypt turned away from Akhenaten\'s experiment for good.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'A Short and Fragile Life' },
      afbeelding: SCENE_IMAGES['tutankhamun-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-4'],
          alt: { en: 'A young king walking with a carved cane through a garden, a servant close behind him.' },
          bijschrift: { en: 'A king who needed a walking stick.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Modern scans of Tutankhamun\'s mummy have revealed a young man in poor health. He had a deformed left foot and a bone disease that would have made walking painful. Inside his tomb archaeologists found around 130 walking sticks, some of them visibly worn from use. DNA tests also found traces of the parasite that causes malaria, a serious and sometimes deadly disease.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'How Did He Die?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Tutankhamun died around 1323 BC, aged about eighteen or nineteen. For decades a damaged area of his skull fuelled a theory that he had been murdered, perhaps by an ambitious official. Later scans showed that the damage most likely happened after death, when the mummy was handled roughly. His left thigh bone had been broken shortly before he died, perhaps in a fall or an accident.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many researchers now think a combination of things killed him: a broken leg that became infected, in a body already weakened by illness and malaria. But we cannot be certain, and the debate continues.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Two tiny mummified babies were buried in the king\'s tomb. DNA suggests they were his daughters, born too early to survive. Tutankhamun left no living heir.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Hasty Burial' },
      afbeelding: SCENE_IMAGES['tutankhamun-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-5'],
          alt: { en: 'Workers lowering a golden coffin into a small tomb chamber by torchlight.' },
          bijschrift: { en: 'The Valley of the Kings: a king buried in a hurry.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A pharaoh normally spent years preparing his tomb. Tutankhamun died young and unexpectedly, and his burial had to be organised in about seventy days, the time it took to mummify a body. He was laid to rest in a small tomb in the Valley of the Kings, probably one intended for someone else.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Signs of hurry are everywhere. The paint on the walls of the burial chamber was still wet when the tomb was sealed, and mould grew on it. Some of the objects buried with him were made for other people and had their names altered. Yet even this rushed burial was packed with treasure: furniture, chariots, weapons, jewellery, food, and nested coffins, the innermost of them made of solid gold.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -1323,
          tekst: { en: 'Tutankhamun dies aged about nineteen. The elderly courtier Ay becomes pharaoh.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the wall of the burial chamber, Ay is shown performing the \'opening of the mouth\', a ceremony that allowed the dead king to eat and speak in the afterlife. It was a job for the heir. By painting himself there, Ay was announcing that he was the new pharaoh.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Erased from History' },
      afbeelding: SCENE_IMAGES['tutankhamun-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-6'],
          alt: { en: 'Stonemasons chiselling a royal name off a temple wall, dust drifting in the sunlight.' },
          bijschrift: { en: 'A king written out of the lists.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ay ruled for only four years. When he died, the general Horemheb took the throne, and he set out to erase the whole Amarna period from memory. Akhenaten\'s city was pulled down and its stones reused. The names of Akhenaten, Ay and Tutankhamun were left out of the official lists of kings, as if Egypt had gone straight from Akhenaten\'s father to Horemheb.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Horemheb even claimed some of Tutankhamun\'s monuments as his own, carving his name over the boy-king\'s. For more than three thousand years, Tutankhamun was almost entirely forgotten.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Robbed, then Buried' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His tomb did not escape completely. Not long after the burial, thieves broke in at least twice and took small valuables such as jewellery and perfumed oils. The officials who discovered the break-ins tidied up hastily and resealed the tomb. About two centuries later, workmen digging the tomb of a later pharaoh, Ramesses VI, dumped their rubble and built their huts right over its entrance. The tomb vanished beneath them.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Being forgotten saved Tutankhamun. Almost every other royal tomb in the Valley of the Kings was emptied by robbers in ancient times. His was hidden too well to be found.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Wonderful Things' },
      afbeelding: SCENE_IMAGES['tutankhamun-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-7'],
          alt: { en: 'An archaeologist holding a candle to a small hole in a sealed doorway, gold glinting beyond.' },
          bijschrift: { en: '26 November 1922: the first glimpse inside.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the early twentieth century, most archaeologists believed the Valley of the Kings had nothing left to give. The Englishman Howard Carter disagreed. Funded by a wealthy aristocrat, Lord Carnarvon, he dug in the valley season after season and found almost nothing. Carnarvon agreed to pay for one last attempt.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1922,
          tekst: { en: 'On 4 November, Howard Carter\'s workmen uncover a stone step cut into the rock beneath the old workmen\'s huts.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The step led down to a sealed doorway. Carter covered it again and telegraphed Carnarvon in England, who hurried out to Egypt. On 26 November they reached a second sealed door. Carter made a small hole, pushed a candle through and peered in. For a long moment he said nothing. Carnarvon asked whether he could see anything.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Yes, wonderful things.' },
          bron: { en: 'Howard Carter, as he later told the story' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the flickering light Carter saw strange animals, statues and gold, gold everywhere. It was the antechamber of Tutankhamun\'s tomb, crammed with gilded couches, chariots, chests and statues. And beyond another sealed door lay the burial chamber, which no one had entered for more than three thousand years.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Golden Boy' },
      afbeelding: SCENE_IMAGES['tutankhamun-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tutankhamun-8'],
          alt: { en: 'A golden funerary mask with blue stripes glowing in a dark museum case.' },
          bijschrift: { en: 'The mask that made a forgotten king the most famous pharaoh of all.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'It took Carter about ten years to empty the tomb. He and his team recorded more than five thousand objects, from the king\'s golden throne to boxes of underwear and baskets of fruit. In February 1923 they opened the burial chamber. Inside a series of shrines and coffins lay the king\'s mummy, wearing a mask of solid gold weighing about ten kilograms.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Curse of the Pharaoh' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 1923 Lord Carnarvon died in Cairo after an infected mosquito bite. Newspapers soon spread the story that a curse struck anyone who disturbed the boy-king. There was never any curse written in the tomb, and most of the people who worked there lived long lives. Howard Carter himself died in 1939, sixteen years after entering the burial chamber.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The discovery made Tutankhamun the most famous pharaoh in history, more famous than mighty kings who ruled for decades. His treasures are now displayed in the Grand Egyptian Museum near the pyramids of Giza. His mummy still lies in his small tomb in the Valley of the Kings, where it was laid more than three thousand years ago.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Tutankhamun\'s innermost coffin is made of solid gold and weighs about 110 kilograms, more than most adults.' },
        },
      ],
    },
  ],
};

export const socrates: Verhaal = {
  id: 'socrates',
  beginJaar: -470,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Socrates' },
  ondertitel: { en: 'The philosopher who would rather die than stop asking questions' },
  teaser: { en: 'He never wrote a word and claimed to know nothing. Athens put him to death for it, and he could have walked away.' },
  jaar: -399,
  periodeLabel: '470 BC - 399 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['socrates'],
  portretKleur: '#7A6A58',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'oudheid',
  themas: ['filosofie', 'griekenland', 'athene', 'democratie', 'rechtspraak'],
  leestijdMinuten: 7,
  personage: { naam: 'Socrates' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Stonemason\'s Son' },
      afbeelding: SCENE_IMAGES['socrates-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-1'],
          alt: { en: 'A boy watching a stonemason carve a marble block in a dusty workshop in Athens.' },
          bijschrift: { en: 'Athens, around 460 BC: a city full of new buildings and new ideas.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Socrates was born in Athens around 470 BC. His father, Sophroniscus, was a stonemason or sculptor, and his mother, Phaenarete, was a midwife. They were ordinary citizens, not rich aristocrats. Later Socrates would joke that he had taken up his mother\'s trade: he helped other people give birth, not to babies, but to ideas.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He grew up in the most exciting city in the Greek world. Athens had helped defeat the Persian invasions, and under its leader Pericles it was becoming rich and powerful. Its citizens governed themselves in an assembly where any adult male citizen could speak and vote. It was one of the first democracies in history.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Ugliest Man in Athens' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Ancient writers agree that Socrates was strikingly ugly: short and stocky, with a broad snub nose, bulging eyes and thick lips. He walked barefoot in all weathers and wore the same rough cloak summer and winter. Yet people who spent time with him found him fascinating. His friend Alcibiades compared him to a cheap statue of a satyr that opened up to reveal golden figures of gods inside.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Socrates never wrote a single book. Almost everything we know about him comes from his students, especially Plato and Xenophon, and from a comedy that mocked him.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Soldier Who Stood His Ground' },
      afbeelding: SCENE_IMAGES['socrates-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-2'],
          alt: { en: 'A bearded hoplite calmly walking away from a lost battle while others flee in panic.' },
          bijschrift: { en: 'Delium, 424 BC: the calmest man on a battlefield in chaos.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Like every Athenian citizen, Socrates served in the army when he was needed. Athens was fighting a long and bitter war against Sparta, the Peloponnesian War, and Socrates fought as a hoplite, a heavily armed infantryman who paid for his own bronze armour.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stories of his toughness spread. During a siege in northern Greece he walked barefoot on ice while other soldiers wrapped their feet in felt. In one battle he saved the life of the young and wounded Alcibiades, then insisted that the prize for bravery should go to Alcibiades rather than to himself.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -424,
          tekst: { en: 'At the battle of Delium, Athens is defeated. Socrates retreats so calmly that the enemy leaves him alone.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At Delium, when the Athenian army broke and ran, Socrates walked steadily away from the battlefield, looking around him so coolly that, according to Plato, the enemy decided not to attack him and went after the panicking soldiers instead. He showed the same calm under pressure for the rest of his life.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Oracle\'s Riddle' },
      afbeelding: SCENE_IMAGES['socrates-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-3'],
          alt: { en: 'A priestess seated on a tripod in a smoky temple at Delphi, a visitor kneeling before her.' },
          bijschrift: { en: 'Delphi: the god says no one is wiser than Socrates.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The most famous oracle in the Greek world was at Delphi, where a priestess called the Pythia gave answers that were believed to come from the god Apollo. One day Socrates\' friend Chaerephon travelled there and asked a bold question: was anyone wiser than Socrates? The answer came back: no one.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Socrates was baffled. He was sure he knew nothing important. So he set out to prove the oracle wrong by finding someone wiser. He questioned politicians, poets and craftsmen, people with great reputations for wisdom. Again and again he found that they believed they understood things they did not, and could not explain what they claimed to know.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Knowing That You Do Not Know' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Slowly Socrates understood the riddle. He was wiser than the others in only one way: he did not think he knew what he did not know. Everyone else was confident and wrong. He was uncertain, and honest about it. This became the heart of his philosophy. Real wisdom begins when you admit how much you do not understand.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The famous line "I know that I know nothing" is a later summary. What Plato actually has Socrates say is closer to: I am wiser only because I do not think I know what I do not know.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Gadfly of Athens' },
      afbeelding: SCENE_IMAGES['socrates-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-4'],
          alt: { en: 'An old bearded man talking to a crowd of young men in a busy marketplace among stalls.' },
          bijschrift: { en: 'The agora of Athens: a classroom without walls.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Socrates spent his days in the agora, the busy marketplace of Athens, and in the gymnasiums where young men exercised. He did not lecture or take money for teaching, as many teachers of the time did. Instead he asked questions. What is courage? What is justice? What does it mean to live a good life?',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Someone would offer a confident answer. Socrates would ask another question, and another, until the person found that their answer contradicted itself. This way of reaching the truth through careful questioning is still called the Socratic method, and teachers and lawyers use it today.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'The unexamined life is not worth living.' },
          bron: { en: 'Socrates, in Plato\'s Apology' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Young men loved to follow him and watch important people being tied in knots. The important people were less amused. Socrates compared himself to a gadfly, an insect that stings a big, lazy horse to keep it awake, and said the god had attached him to Athens for exactly that purpose. In 423 BC the playwright Aristophanes mocked him in a comedy called The Clouds, which showed him as a ridiculous trickster hanging in a basket in the air.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Saying No to Power' },
      afbeelding: SCENE_IMAGES['socrates-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-5'],
          alt: { en: 'An old man walking home alone through a dark street while four others hurry the other way.' },
          bijschrift: { en: '404 BC: an order Socrates refused to obey.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Socrates took no interest in political office, but twice he was put in a position where he had to choose between his conscience and the crowd. In 406 BC Athens won a sea battle but failed to rescue the sailors in the water. The furious assembly wanted to condemn the generals together in a single vote, which was against the law. Socrates happened to be serving on the council that day, and he refused to allow it, even when people threatened him.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -404,
          tekst: { en: 'Athens loses the war to Sparta. A brutal regime known as the Thirty Tyrants takes over the city.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Two years later the danger came from the other side. The Thirty Tyrants, a small group installed after Athens lost the war, killed hundreds of citizens and seized their property. They ordered Socrates and four others to arrest an innocent man, Leon of Salamis, so that he could be executed. The other four went. Socrates simply went home.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was risking his life. Only the fall of the Thirty, shortly afterwards, saved him. But one problem would come back to haunt him: some of the Thirty, including their leader Critias, had once been among the young men who followed Socrates around the agora.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Socrates on Trial' },
      afbeelding: SCENE_IMAGES['socrates-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-6'],
          alt: { en: 'An old man speaking calmly before a large jury of citizens seated on wooden benches.' },
          bijschrift: { en: '399 BC: five hundred citizens decide the fate of a philosopher.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 399 BC, when Socrates was about seventy, three citizens brought him to court. The charges were that he did not believe in the gods of the city, that he introduced new gods, and that he corrupted the young. Behind the charges lay real anger. Athens had lost the war and suffered under the Thirty, and some citizens blamed people like Socrates for teaching young men to question everything.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -399,
          tekst: { en: 'Socrates is tried before a jury of 500 Athenian citizens and found guilty by a narrow majority.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Socrates did not beg for mercy, as defendants usually did. He did not bring his weeping children to court to soften the jury. Instead he explained that the god had given him his mission, and that he would rather die than stop questioning. He was found guilty by a margin of about sixty votes.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Very Cheeky Penalty' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Athens, the accuser and the accused each proposed a punishment, and the jury chose between them. The prosecution asked for death. Socrates, perhaps half joking, said that what he really deserved was free meals for life at the city\'s expense, an honour given to Olympic champions. In the end he offered a fine. The jury, irritated, voted for death by an even bigger majority.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Way Out' },
      afbeelding: SCENE_IMAGES['socrates-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-7'],
          alt: { en: 'Two men talking quietly in a dim prison cell lit by the grey light of dawn.' },
          bijschrift: { en: 'The prison: an escape is ready, and Socrates says no.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Executions in Athens were normally carried out at once. But a sacred ship had just left for the island of Delos, and no one could be put to death until it returned. Socrates waited in prison for about a month. His friends visited him every day.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'One of them, a wealthy man named Crito, came at dawn with a plan. Guards could be bribed, and friends abroad would take Socrates in. Everyone expected him to escape; even his enemies might have been relieved. Socrates refused.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Plato\'s dialogue Crito, he explains why. All his life he had lived under the laws of Athens and benefited from them. If he ran away now, he would be breaking his agreement with the city just because a decision had gone against him, and he would prove his accusers right. It is better, he said, to suffer an injustice than to commit one.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Plato wrote a series of dialogues about these last days: the trial, the conversation with Crito, and Socrates\' final hours. They are still among the most widely read works of philosophy.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Cup of Hemlock' },
      afbeelding: SCENE_IMAGES['socrates-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['socrates-8'],
          alt: { en: 'An old man calmly lifting a cup while friends weep around his prison bed at sunset.' },
          bijschrift: { en: 'The last evening: Socrates drinks the poison.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the last day his friends gathered in the prison from early morning. According to Plato, Socrates spent the hours discussing whether the soul survives death, and argued calmly that a philosopher has no reason to fear it. His wife Xanthippe was sent home with their youngest child when she began to weep.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Towards sunset the jailer brought a cup of hemlock, a poisonous plant. Socrates asked how to take it, then drank it down cheerfully. When his friends broke into tears, he told them off for making a fuss. He walked about until his legs grew heavy, then lay down. The numbness crept up his body.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Debt to the Gods' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His last words, as Plato records them, were to his old friend: Crito, we owe a cockerel to Asclepius. Pay it, and do not forget. Asclepius was the god of healing. Some readers think Socrates meant that death was a cure for the illness of life; others think he was simply tidying up a debt. Either way, he died as calmly as he had lived.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Athens had silenced Socrates, but it could not silence his questions. His student Plato founded a school, the Academy, and Plato\'s student Aristotle taught Alexander the Great. Almost every philosopher in the West since then has, in some way, continued the conversation Socrates began in the marketplace.',
          },
        },
      ],
    },
  ],
};

export const qinShiHuang: Verhaal = {
  id: 'qin-shi-huang',
  beginJaar: -259,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Qin Shi Huang' },
  ondertitel: { en: 'China\'s first emperor and his army of clay' },
  teaser: { en: 'He united China, standardised its writing and built roads and walls. Then he spent his last years trying never to die.' },
  jaar: -210,
  periodeLabel: '259 BC - 210 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['qin-shi-huang'],
  portretKleur: '#4A3B2A',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'oudheid',
  themas: ['china', 'keizer', 'macht', 'archeologie', 'rijk'],
  leestijdMinuten: 7,
  personage: { naam: 'Qin Shi Huang' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Hostage\'s Son' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-1'],
          alt: { en: 'A small boy and his mother in a guarded courtyard of a foreign palace, soldiers at the gate.' },
          bijschrift: { en: 'Handan, 259 BC: a prince born far from home.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 259 BC a boy named Ying Zheng was born in Handan, the capital of the state of Zhao. His father was a prince of Qin, a rival state far to the west, who was living in Zhao as a hostage. Sending royal sons to live with your enemies was a common way of guaranteeing peace treaties in those days, and hostages lived in constant danger.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'China at that time was not one country. For more than two centuries seven powerful states had been fighting each other in what is now called the Warring States period. Armies of hundreds of thousands of men clashed, and whole populations suffered. Qin, in the rugged west, was the toughest of them all, run by strict laws and rewards for soldiers who brought back enemy heads.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Merchant\'s Gamble' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A rich merchant named Lü Buwei saw an opportunity in the hostage prince. He spent a fortune helping him become heir to the throne of Qin. According to the historian Sima Qian, the merchant even gave the prince one of his own concubines, who became Zheng\'s mother, and some whispered that Lü Buwei was the boy\'s real father. The story may have been invented later by the emperor\'s enemies, but it followed him all his life.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Most of what we know about Qin Shi Huang comes from Sima Qian, a historian of the Han dynasty who wrote about a century after his death and had good reasons to show him as a tyrant.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'King at Thirteen' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-2'],
          alt: { en: 'A boy king seated on a high throne while a powerful minister speaks for him to kneeling officials.' },
          bijschrift: { en: 'Xianyang, 246 BC: a child on the throne of Qin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Zheng\'s father became king of Qin but died after only three years. In 246 BC the thirteen-year-old Zheng became king. For the first years Lü Buwei ruled for him as chief minister, the most powerful man in the state.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As the young king grew up, he became determined to rule alone. In 238 BC, at the age of about twenty-two, he crushed a rebellion led by a favourite of his mother\'s, executed the rebels and sent his mother away. Lü Buwei, who was connected to the scandal, was banished and later took poison.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -238,
          tekst: { en: 'Aged about twenty-two, King Zheng takes full control of the state of Qin.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Zheng surrounded himself with ruthless advisers. The most important was Li Si, a minister who believed that people should be governed by strict laws and harsh punishments, not by tradition or kindness. Together they turned Qin into a machine for war.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Dagger in the Map' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-3'],
          alt: { en: 'An assassin lunging with a dagger at a king who runs around a pillar in a palace hall.' },
          bijschrift: { en: '227 BC: the assassination attempt that almost changed history.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The other states watched Qin\'s power grow with terror. In 227 BC the crown prince of Yan, one of the threatened states, sent an assassin named Jing Ke to the Qin court. He brought two gifts to win an audience with the king: the head of a Qin general who had fled to Yan, and a map of valuable Yan territory.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the great hall, Jing Ke slowly unrolled the map before the king. At the end of the scroll lay a poisoned dagger. He seized it and lunged. The king leapt back, tearing his sleeve, and ran. By law, no one in the hall was allowed to carry weapons, and the guards outside could not enter without being summoned. The king fled around a pillar with the assassin behind him.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A doctor threw his medicine bag at Jing Ke. Courtiers shouted to the king to draw the long sword on his back. At last he pulled it free and struck the assassin down. The attempt made Zheng more determined than ever to destroy his enemies, and within a few years Yan was conquered.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The story of Jing Ke is one of the most famous in Chinese history and has inspired many films, including the epic Hero.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Seven States Become One' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-4'],
          alt: { en: 'A vast army in black armour advancing through a mountain pass towards a walled city.' },
          bijschrift: { en: '230 to 221 BC: the conquest of China.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Between 230 and 221 BC Qin conquered the other six states one after another: Han, Zhao, Wei, Chu, Yan and finally Qi. It was a war on a colossal scale. Qin\'s armies were huge, disciplined and well supplied, and its soldiers used mass-produced crossbows and weapons made to the same pattern so that parts could be swapped.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -221,
          tekst: { en: 'The last independent state, Qi, surrenders. For the first time, China is ruled by a single emperor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The king of Qin now ruled more land and people than any Chinese ruler before him. The old title of king was no longer enough. He created a new one: Shi Huangdi, \'First Emperor\'. He expected his descendants to be the second, third and so on, for ten thousand generations.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Where China Got Its Name' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The dynasty he founded lasted only fifteen years, but its name may have lasted far longer. Many historians think that the word China, used in the West, comes from Qin, which is pronounced roughly \'chin\'.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'One Script, One Measure' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-5'],
          alt: { en: 'Officials unrolling bamboo strips covered in characters while scribes copy them out at long tables.' },
          bijschrift: { en: 'A new empire, made the same everywhere.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Conquering China was one thing; holding it together was another. The six conquered states had their own laws, their own coins, their own measures and even their own ways of writing Chinese characters. The First Emperor and Li Si set out to make everything the same.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Writing was standardised, so that an official in the far south could read an order written in the capital. Weights and measures were fixed, and bronze standards were sent around the empire. Coins were replaced by round bronze coins with a square hole in the middle, a design used in China for the next two thousand years. Even the distance between cart wheels was fixed, so that carts could run in the same ruts on every road.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Roads Across the Empire' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The old states were abolished and replaced with provinces run by officials appointed by the emperor, who could be moved or dismissed at will. Thousands of kilometres of roads were built to link them to the capital, Xianyang. The weapons of the conquered states were collected, melted down and cast into twelve giant bronze statues.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The standard script of the Qin is the ancestor of the Chinese characters used today, which is why a reader of modern Chinese can still recognise much of it.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Walls and Burning Books' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-6'],
          alt: { en: 'Soldiers throwing bamboo books onto a great fire while scholars watch in despair.' },
          bijschrift: { en: '213 BC: the burning of the books.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the north lay the lands of the Xiongnu, nomadic horsemen who raided Chinese farms. The emperor sent his general Meng Tian with a huge army to drive them back, and to join up the defensive walls that the old northern states had built into a single long barrier. Hundreds of thousands of soldiers, convicts and forced labourers worked on it, and many died.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'This was an early version of the Great Wall of China, mostly made of packed earth. The stone and brick wall that tourists visit today was built much later, mainly in the Ming dynasty, more than 1,500 years after the First Emperor\'s death.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -213,
          tekst: { en: 'On the advice of Li Si, the emperor orders the burning of books that could be used to criticise his rule.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The emperor would not tolerate opposition. When scholars praised the old ways of ancient kings and criticised the new order, Li Si advised drastic action. Histories of the conquered states and many works of philosophy were to be burned; only books on medicine, farming and fortune-telling, and the official records of Qin, were spared. Sima Qian also records that some 460 scholars were buried alive the following year, although many modern historians think this part of the story was exaggerated.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Search for Immortality' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-7'],
          alt: { en: 'A fleet of ships setting sail into a misty sea at dawn, an emperor watching from the shore.' },
          bijschrift: { en: 'Ships sent across the eastern sea in search of the elixir of life.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The man who had conquered everything feared only one thing: death. He survived several more assassination attempts and became increasingly suspicious, moving secretly between his many palaces so that no one knew where he slept. And he became obsessed with finding a way to live forever.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Magicians promised him an elixir of immortality. One of them, Xu Fu, was sent across the eastern sea with ships and, according to legend, thousands of young men and women, to find the mountain islands where immortals were said to live. He never came back.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Deadly Medicine' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The emperor also took medicines that his alchemists believed would extend his life. Some of these may have contained mercury, which was thought to be magical because it is a liquid metal, but which is actually poisonous. In 210 BC, while on a tour of the eastern provinces, the First Emperor fell ill and died, aged forty-nine.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -210,
          tekst: { en: 'The First Emperor dies on a journey through his empire. His ministers keep his death secret.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Li Si and a powerful official named Zhao Gao feared chaos if the news got out. They hid the body in the emperor\'s carriage, brought him meals as usual, and placed carts of rotting salted fish around it to disguise the smell on the journey back to the capital. Then they forged orders that forced the rightful heir to kill himself and put a weaker son on the throne.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Army Underground' },
      afbeelding: SCENE_IMAGES['qin-shi-huang-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['qin-shi-huang-8'],
          alt: { en: 'Rows of life-size clay soldiers standing in long earth trenches, a few with traces of colour.' },
          bijschrift: { en: 'Xi\'an: an army of clay buried for more than two thousand years.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The First Emperor\'s dynasty collapsed almost immediately. Rebellions broke out across the empire, and in 206 BC, only four years after his death, the Qin dynasty was overthrown. The Han dynasty that replaced it kept many of his reforms, but its historians painted him as a cruel tyrant.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He had been building his tomb at Mount Li, near the modern city of Xi\'an, almost since he became king. Sima Qian describes a vast underground palace with a ceiling of stars and a map of the empire with rivers of flowing mercury. The burial mound has never been opened. Tests of the soil around it have found unusually high levels of mercury.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1974,
          tekst: { en: 'Farmers digging a well near Xi\'an break into a pit full of broken clay soldiers.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Eight Thousand Silent Soldiers' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1974 farmers digging a well struck fragments of life-size clay figures. Archaeologists discovered pits containing an entire army: an estimated eight thousand soldiers, with horses, chariots and real bronze weapons, standing in battle formation to guard the emperor in the afterlife. Every face seems to be different. Originally the figures were brightly painted, but most of the colour faded within minutes of being exposed to the air.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Archaeologists have decided not to open the emperor\'s own tomb until they can be sure of protecting what is inside. It may remain closed for many more years.' },
        },
      ],
    },
  ],
};

export const hannibal: Verhaal = {
  id: 'hannibal',
  beginJaar: -247,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Hannibal' },
  ondertitel: { en: 'The general who crossed the Alps with elephants' },
  teaser: { en: 'He marched an army and its elephants over the Alps and destroyed Rome\'s legions in Italy. Then why didn\'t he win the war?' },
  jaar: -183,
  periodeLabel: '247 BC - 183 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['hannibal'],
  portretKleur: '#6B4E3D',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'oudheid',
  themas: ['oorlog', 'carthago', 'rome', 'militair', 'strategie'],
  leestijdMinuten: 8,
  personage: { naam: 'Hannibal' },
  chapters: [
    {
      id: 1,
      titel: { en: 'An Oath at the Altar' },
      afbeelding: SCENE_IMAGES['hannibal-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-1'],
          alt: { en: 'A boy with his hand on a burning altar, his father in armour standing beside him.' },
          bijschrift: { en: 'Carthage, around 237 BC: a nine-year-old swears eternal hostility to Rome.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hannibal was born in 247 BC in Carthage, a great trading city on the coast of North Africa, in what is now Tunisia. Carthage had been founded by Phoenicians, a seafaring people from the eastern Mediterranean, and it controlled trade routes and colonies across the western Mediterranean. Its great rival was Rome.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Hannibal was a small child, Carthage lost its first long war against Rome, and with it the island of Sicily. His father, Hamilcar Barca, had been one of Carthage\'s best generals and had never been beaten in Sicily. He did not accept the defeat.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -237,
          tekst: { en: 'Hamilcar Barca leaves for Spain to build a new empire for Carthage, taking his young son Hannibal with him.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many years later, Hannibal told the story himself. Before leaving for Spain, his father made a sacrifice and asked the nine-year-old boy whether he wanted to come. When Hannibal eagerly said yes, Hamilcar led him to the altar and made him place his hand on it and swear that he would never be a friend of Rome.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Hannibal\'s family name, Barca, probably means lightning. His father was famous for striking fast.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Commander in Spain' },
      afbeelding: SCENE_IMAGES['hannibal-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-2'],
          alt: { en: 'A young general riding at the head of his army past the walls of a besieged hilltop city.' },
          bijschrift: { en: 'Saguntum, 219 BC: the siege that started a war.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hannibal grew up in military camps in Spain, where his father built a Carthaginian empire rich in silver mines. After Hamilcar drowned in battle, his son-in-law Hasdrubal took command. When Hasdrubal was murdered in 221 BC, the army chose Hannibal, then about twenty-six, as its leader.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The soldiers loved him. Ancient writers say he ate what they ate, slept on the ground wrapped in his cloak among the guards, and was always first into battle and last to leave. His army was a mixture of Africans, Spaniards, Numidian horsemen from North Africa and, later, Gauls, held together by loyalty to him.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -219,
          tekst: { en: 'Hannibal besieges and captures Saguntum, a Spanish city allied with Rome. The Second Punic War begins.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Saguntum, a city on the east coast of Spain, was allied with Rome. Hannibal besieged it for eight months and took it. Roman ambassadors went to Carthage and demanded that Hannibal be handed over. The Carthaginians refused. Rome declared war, and expected to fight it in Spain and Africa. Hannibal had other plans.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Over the Alps' },
      afbeelding: SCENE_IMAGES['hannibal-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-3'],
          alt: { en: 'War elephants and soldiers struggling along a narrow snowy mountain path above a precipice.' },
          bijschrift: { en: 'Autumn 218 BC: an army crosses the Alps.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 218 BC Hannibal led his army out of Spain, across the Pyrenees and through southern Gaul, now France. Rome\'s navy controlled the sea, so he would attack Italy from the one direction no one expected: over the Alps. He took with him around 37 war elephants.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Getting the elephants across the river Rhône was a problem in itself. His engineers built huge rafts covered with earth so that the animals would think they were still on land. Some panicked and fell into the river, but they swam across.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Snow, Rocks and Ambushes' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The crossing of the Alps, in late autumn, was a nightmare. Mountain tribes ambushed the column and rolled boulders down on it. Snow had already fallen on the high passes, and men and animals slipped on the ice and fell into the ravines. A rockfall blocked the path, and the soldiers had to break up the rock to clear it; one Roman historian claims they heated it with fire and poured vinegar on it to make it crack.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After about fifteen days in the mountains, Hannibal came down into northern Italy. He had lost a huge part of his army; ancient writers say about 26,000 men were left. But he was in Italy, and Rome was not ready.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Exactly which pass Hannibal used has been argued about for two thousand years. Scientists studying ancient horse dung and soil layers in the high Alps have tried to settle it, but historians still disagree.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Trap in the Fog' },
      afbeelding: SCENE_IMAGES['hannibal-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-4'],
          alt: { en: 'Roman soldiers marching along a lakeshore in thick morning fog, enemy shapes on the hills above.' },
          bijschrift: { en: 'Lake Trasimene, 217 BC: an army ambushed in the fog.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Rome sent two armies to stop him. In December 218 BC, at the river Trebia, Hannibal tempted the Romans to wade across the freezing water before breakfast, then attacked them with fresh, well-fed troops and a hidden force led by his brother Mago. The Romans were crushed. Almost all of Hannibal\'s elephants died in the bitter winter that followed.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the spring he crossed the marshes of the Arno river, wading for days through floodwater. Riding on his last surviving elephant, Hannibal caught an eye infection and lost the sight of one eye.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -217,
          tekst: { en: 'At Lake Trasimene, Hannibal ambushes and destroys a Roman army. The consul Flaminius is killed.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Roman consul Flaminius chased him. Hannibal hid his army on the hills above the northern shore of Lake Trasimene. Early one morning the Roman column marched along the narrow lakeside path in thick fog, unable to see anything. Hannibal\'s troops charged down from all sides. Trapped between the hills and the water, around fifteen thousand Romans were killed, Flaminius among them.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Romans then gave command to Quintus Fabius Maximus, who refused to fight Hannibal in open battle and instead followed him around, cutting off his supplies. Romans mocked him as the Delayer. But his method was working.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Cannae' },
      afbeelding: SCENE_IMAGES['hannibal-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-5'],
          alt: { en: 'A huge Roman army surrounded on all sides on a dusty plain, cavalry closing in from behind.' },
          bijschrift: { en: 'Cannae, 216 BC: the worst defeat in Roman history.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 216 BC the Romans grew tired of waiting. They raised the largest army in their history, about eighty thousand men, and sent it to destroy Hannibal near the village of Cannae in southern Italy. Hannibal had perhaps fifty thousand.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -216,
          tekst: { en: 'On 2 August, at Cannae, Hannibal surrounds and destroys a Roman army twice as large as his own.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hannibal placed his weakest troops, Gauls and Spaniards, in a curved line in the centre, bulging towards the enemy, with his best African infantry hidden on either side. As the massive Roman army pushed forward, the centre slowly gave way, drawing the Romans deeper and deeper in. Then the African troops turned inwards from both sides, and Hannibal\'s cavalry, having driven off the Roman horsemen, attacked from behind.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Romans were completely surrounded, packed so tightly they could barely lift their swords. By the end of the day, ancient writers say, around fifty thousand Romans lay dead, including one of the two consuls and dozens of senators. It was one of the bloodiest single days of battle in history.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Victory Without Using It' },
        },
        {
          type: 'citaat',
          tekst: { en: 'You know how to win a victory, Hannibal, but you do not know how to use it.' },
          bron: { en: 'Maharbal, Hannibal\'s cavalry commander, according to Livy' },
        },
        {
          type: 'weetje',
          tekst: { en: 'Military academies still study Cannae as the perfect example of a double envelopment, in which an army is surrounded on both sides at once.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Fifteen Years in Italy' },
      afbeelding: SCENE_IMAGES['hannibal-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-6'],
          alt: { en: 'A general in a dark tent looking at a severed head brought in by Roman horsemen.' },
          bijschrift: { en: '207 BC: news of his brother reaches Hannibal\'s camp.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Cannae, many expected Hannibal to march on Rome. He did not. Rome was a heavily walled city, and he had no siege engines and no way of supplying a long siege so far from home. Instead he hoped that Rome\'s allies in Italy would desert it. Some did, including the great city of Capua. But most of Rome\'s allies in central Italy stayed loyal.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Rome refused to make peace, raised new armies and never again fought Hannibal in a big open battle. Instead it fought his allies, recaptured the cities that had changed sides and slowly wore him down. Carthage, ruled by a council of rich merchants, sent him very little help.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -207,
          tekst: { en: 'Hannibal\'s brother Hasdrubal crosses the Alps with reinforcements but is defeated and killed at the river Metaurus.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His last real hope was his brother Hasdrubal, who followed his route across the Alps with a second army. The Romans intercepted Hasdrubal\'s messengers and destroyed his army at the river Metaurus before the brothers could meet. Roman horsemen then rode to Hannibal\'s camp and threw his brother\'s head over the fortifications. Hannibal is said to have recognised in it the fate of Carthage.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'For fifteen years Hannibal remained in Italy, undefeated in any major battle, holding out in the south. But he was no longer winning the war.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Zama' },
      afbeelding: SCENE_IMAGES['hannibal-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-7'],
          alt: { en: 'War elephants charging through gaps left open in a Roman battle line.' },
          bijschrift: { en: 'Zama, 202 BC: Hannibal meets his match.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Rome finally found a general who had learned from Hannibal. Publius Cornelius Scipio, whose father had been killed fighting the Carthaginians in Spain, conquered Spain and then took the war to Africa, landing near Carthage itself. The terrified Carthaginian council recalled Hannibal from Italy.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -202,
          tekst: { en: 'At Zama in North Africa, Scipio defeats Hannibal in the final battle of the Second Punic War.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 202 BC the two greatest generals of the age met at Zama. According to the historians, they even held a face-to-face meeting before the battle, but could not agree. Hannibal opened the battle with a charge of about eighty war elephants. Scipio had arranged his troops in columns with open lanes between them; his trumpeters frightened the elephants, and many simply ran through the lanes or turned back on their own side.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The fighting between the infantry was long and fierce, and for a while it was even. Then Scipio\'s Numidian cavalry, provided by a former ally of Carthage, returned and fell on Hannibal\'s rear, just as Hannibal\'s cavalry had done at Cannae. Hannibal\'s army was destroyed. Scipio received the honorary name Africanus.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Carthage had to give up its fleet, its empire outside Africa and its right to make war without Rome\'s permission, and pay a huge sum of silver over fifty years.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Exile and Poison' },
      afbeelding: SCENE_IMAGES['hannibal-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['hannibal-8'],
          alt: { en: 'An old general in a dark room holding a small ring, soldiers forcing the door outside.' },
          bijschrift: { en: 'Bithynia, around 183 BC: Rome catches up with its greatest enemy.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Surprisingly, Hannibal\'s career did not end at Zama. He was elected suffete, one of Carthage\'s two chief magistrates, and turned out to be a gifted reformer. He tackled corruption among the ruling families and reorganised the city\'s finances so well that Carthage could pay Rome its war debt without raising taxes.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His enemies in Carthage told Rome that he was plotting a new war. When Roman envoys arrived to demand him, Hannibal slipped out of the city at night and sailed east. He joined the court of Antiochus III, a powerful king in the eastern Mediterranean who was about to fight Rome. Antiochus lost, and one of Rome\'s conditions for peace was that Hannibal be handed over.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Last Escape' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hannibal fled again and found refuge with the king of Bithynia, in what is now Turkey. Around 183 BC Roman envoys arrived there too, and soldiers surrounded his house. Every exit was blocked. Rather than be taken to Rome in chains, Hannibal took poison, which he is said to have carried with him for years, perhaps hidden in a ring. He was about sixty-four.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Thirty-seven years later, in 146 BC, Rome destroyed Carthage completely. But the general who had nearly brought Rome to its knees was never forgotten, not even by the Romans. Roman mothers, it was said, frightened their children with the words: Hannibal is at the gates.',
          },
        },
      ],
    },
  ],
};

export const cleopatra: Verhaal = {
  id: 'cleopatra',
  beginJaar: -69,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Cleopatra' },
  ondertitel: { en: 'The last pharaoh of Egypt' },
  teaser: { en: 'Clever, ruthless and fluent in many languages, she fought to keep Egypt free between the two most powerful men in Rome.' },
  jaar: -30,
  periodeLabel: '69 BC - 30 BC',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['cleopatra'],
  portretKleur: '#1F5F5B',
  uitgelicht: false,
  volgorde: 11,
  tijdperkId: 'oudheid',
  themas: ['egypte', 'rome', 'macht', 'liefde', 'politiek'],
  leestijdMinuten: 7,
  personage: { naam: 'Cleopatra' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Greek Queen of Egypt' },
      afbeelding: SCENE_IMAGES['cleopatra-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-1'],
          alt: { en: 'A young princess reading scrolls in a vast library with marble columns and shelves of papyrus.' },
          bijschrift: { en: 'Alexandria, around 60 BC: a princess in the greatest library in the world.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cleopatra was born in 69 BC in Alexandria, the city Alexander the Great had founded in Egypt. She belonged to the Ptolemies, a family descended from Ptolemy, one of Alexander\'s generals, who had seized Egypt after Alexander\'s death. For almost three hundred years the Ptolemies had ruled Egypt as pharaohs, but they were Macedonian Greeks, spoke Greek and married within the family to keep power in their own hands.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cleopatra was different. According to Plutarch she spoke many languages, including the languages of the Ethiopians, Hebrews, Arabs, Syrians, Medes and Parthians, and she was the first of her family to learn Egyptian, the language of the people she ruled. She grew up in a city with the greatest library in the ancient world and was highly educated in mathematics, philosophy and rhetoric.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Kingdom in Rome\'s Shadow' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her father, Ptolemy XII, was a weak king who depended on Rome. Egypt was the richest country in the Mediterranean, and powerful Romans were eager to control its grain and its gold. Ptolemy paid enormous bribes to Roman politicians to keep his throne and was once driven out of Alexandria by his own subjects.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Cleopatra lived closer in time to the first Moon landing than to the building of the Great Pyramid of Giza.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Queen at Eighteen' },
      afbeelding: SCENE_IMAGES['cleopatra-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-2'],
          alt: { en: 'A young queen standing alone on a palace balcony above a harbour, a hostile crowd below.' },
          bijschrift: { en: '51 BC: a young queen and a dangerous brother.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When her father died in 51 BC, Cleopatra, aged eighteen, became queen together with her younger brother Ptolemy XIII, who was about ten. By family custom they were expected to marry. In practice, the boy was controlled by a group of powerful advisers who wanted Cleopatra out of the way.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cleopatra tried to rule alone, and the court turned against her. Around 49 BC she was forced to flee from Alexandria. She went to Syria, raised an army and marched back towards Egypt. Her brother\'s army waited for her on the border. A civil war seemed certain.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -48,
          tekst: { en: 'The Roman general Pompey, defeated by Julius Caesar, flees to Egypt and is murdered on the orders of Ptolemy XIII\'s advisers.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Then Rome\'s own civil war arrived on Egypt\'s shore. Pompey the Great, beaten by Julius Caesar in Greece, sailed to Egypt hoping for help. Ptolemy\'s advisers decided to win Caesar\'s favour by having Pompey stabbed to death as he stepped ashore. Days later Caesar arrived in Alexandria, and they presented him with Pompey\'s head. Caesar is said to have wept.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Caesar' },
      afbeelding: SCENE_IMAGES['cleopatra-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-3'],
          alt: { en: 'A servant carrying a large rolled bundle into a lamp-lit palace room where a Roman general waits.' },
          bijschrift: { en: 'Alexandria, 48 BC: the queen enters the palace in secret.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar settled into the royal palace and announced that he would settle the quarrel between the young king and queen. Cleopatra knew that her brother\'s men would kill her if she tried to reach the palace openly. So, according to Plutarch, she had a loyal friend named Apollodorus row her into the harbour at dusk, wrap her in a bedding sack, and carry her into the palace on his shoulder to Caesar\'s room.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Caesar was in his fifties; Cleopatra was twenty-one. He was charmed by her boldness and her intelligence, and they became lovers. He backed her claim to the throne. Ptolemy XIII\'s supporters, furious, besieged Caesar and Cleopatra inside the palace quarter for months.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'War in Alexandria' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During the fighting, Caesar set fire to ships in the harbour, and the fire spread to buildings near the docks. Ancient writers say that books were burned, perhaps warehouses of scrolls belonging to the great library. When Roman reinforcements arrived in 47 BC, Ptolemy XIII\'s army was defeated and the young king drowned in the Nile while fleeing. Cleopatra was queen again, now with an even younger brother as her official partner.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The famous image of Cleopatra being unrolled from a carpet comes from later retellings. Plutarch, the main ancient source, says she was hidden in a sack for bedding.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'A Son and a Visit to Rome' },
      afbeelding: SCENE_IMAGES['cleopatra-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-4'],
          alt: { en: 'A queen with a small boy arriving at a garden villa beside the Tiber, Roman senators watching coldly.' },
          bijschrift: { en: 'Rome, 46 BC: a foreign queen in Caesar\'s gardens.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 47 BC Cleopatra gave birth to a son. She named him Ptolemy Caesar, but the people of Alexandria called him Caesarion, \'little Caesar\'. Cleopatra claimed that Caesar was his father, and although Caesar never officially recognised the boy, he did not deny it.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -46,
          tekst: { en: 'Cleopatra travels to Rome with Caesarion and stays at Caesar\'s villa across the Tiber.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 46 BC Cleopatra came to Rome and lived for about two years in Caesar\'s villa across the river Tiber. Caesar even placed a golden statue of her in the temple of Venus he had built. Many Romans were scandalised. Caesar was married, and the idea of a foreign queen with a child by Rome\'s most powerful man frightened the senators, who already suspected that Caesar wanted to become a king.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the Ides of March, 44 BC, Caesar was stabbed to death in the Senate. Cleopatra was still in Rome. With her protector gone and her son in danger, she left the city quickly and sailed home to Egypt. Soon afterwards her younger brother and co-ruler died, and she made the three-year-old Caesarion her co-ruler instead.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Antony at Tarsus' },
      afbeelding: SCENE_IMAGES['cleopatra-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-5'],
          alt: { en: 'A golden barge with purple sails and silver oars gliding up a river, a crowd watching from the banks.' },
          bijschrift: { en: 'Tarsus, 41 BC: the queen arrives dressed as a goddess.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Caesar\'s murder, power in Rome was divided between his great-nephew and heir Octavian and his loyal general Mark Antony. Antony took charge of the eastern Mediterranean. In 41 BC he summoned Cleopatra to meet him in the city of Tarsus, in what is now Turkey, to explain why she had not helped him in the recent war.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cleopatra took her time. When she arrived, she came sailing up the river on a barge with a gilded stern, purple sails and silver oars that rowed to the music of flutes. According to Plutarch, she lay under a canopy of gold, dressed as Aphrodite, the goddess of love, while boys dressed as cupids fanned her. The crowd rushed to the riverbank, and the word spread that Aphrodite had come to feast with Dionysus.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Alliance and a Love Affair' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Antony was won over. He spent the following winter with her in Alexandria, where the two of them formed a drinking and dining club called the Inimitable Livers. In 40 BC Cleopatra gave birth to twins, Alexander Helios and Cleopatra Selene, the Sun and the Moon. For Cleopatra the relationship was about love and politics at once: Antony had the armies she needed to protect Egypt.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Plutarch says Cleopatra was not overwhelmingly beautiful. What made her irresistible, he writes, was her conversation, her charm and the sweetness of her voice.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Queen of Kings' },
      afbeelding: SCENE_IMAGES['cleopatra-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-6'],
          alt: { en: 'A queen and a Roman general enthroned on a silver platform before a vast crowd in a stadium.' },
          bijschrift: { en: 'Alexandria, 34 BC: the Donations of Alexandria.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 37 BC Antony returned to the east and to Cleopatra, although he had meanwhile married Octavian\'s sister Octavia to seal a peace with Rome. Antony gave Cleopatra large territories in the eastern Mediterranean, including parts of Syria, Lebanon and Cyprus. Egypt grew almost as large as it had been under the greatest pharaohs.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -34,
          tekst: { en: 'At a ceremony called the Donations of Alexandria, Antony grants lands across the East to Cleopatra and her children.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 34 BC the couple staged a spectacular ceremony in Alexandria. Seated on golden thrones, Antony declared Cleopatra Queen of Kings and Caesarion King of Kings, and divided kingdoms, some of them not yet conquered, among her children. To many Romans it looked as if a Roman general was giving away Rome\'s empire to a foreign queen.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Rome, Octavian made the most of it. He presented Antony as a man bewitched by a dangerous Eastern seductress, and he read out in public a document he claimed was Antony\'s will, which said Antony wished to be buried in Alexandria. It was a powerful piece of propaganda, and it worked.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Actium' },
      afbeelding: SCENE_IMAGES['cleopatra-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-7'],
          alt: { en: 'Warships burning and colliding on a stormy sea while a fleet with purple sails escapes in the distance.' },
          bijschrift: { en: 'Actium, 31 BC: the sea battle that decided the fate of Egypt.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 32 BC Rome declared war, not on Antony but on Cleopatra. It was a clever move: Octavian could present the conflict as a war against a foreign enemy rather than another Roman civil war. Antony and Cleopatra gathered their fleets and armies on the western coast of Greece.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -31,
          tekst: { en: 'On 2 September, Octavian\'s fleet, led by Agrippa, defeats Antony and Cleopatra off Actium in Greece.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The two sides met at sea off Actium. Octavian\'s admiral Agrippa had already cut off Antony\'s supplies, and many of Antony\'s men had deserted. In the middle of the battle, Cleopatra\'s squadron of sixty ships raised its sails and broke away to the open sea. Antony followed her in a small ship, leaving his fleet and army behind. Most of them surrendered.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Historians still argue about what happened. Some ancient writers say Cleopatra simply panicked and Antony abandoned his men for love. Others think the escape was planned all along, a breakout to save the treasury and fight on from Egypt. Either way, the battle was lost.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Last Pharaoh' },
      afbeelding: SCENE_IMAGES['cleopatra-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['cleopatra-8'],
          alt: { en: 'A queen in royal robes lying still on a golden couch in a tomb, a basket of figs beside her.' },
          bijschrift: { en: 'Alexandria, August 30 BC: the end of Egypt\'s pharaohs.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the summer of 30 BC Octavian\'s army reached Alexandria. Antony\'s remaining troops went over to the enemy. Hearing a false report that Cleopatra was dead, Antony stabbed himself. He was carried, dying, to the mausoleum where Cleopatra had locked herself in, and he died in her arms.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Cleopatra was captured. Octavian wanted to take her to Rome and parade her in chains in his triumph. She refused to give him that satisfaction. In August 30 BC, aged thirty-nine, she died together with two of her maidservants. The traditional story is that she let herself be bitten by an asp, a venomous snake, smuggled in a basket of figs.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: -30,
          tekst: { en: 'Cleopatra dies in Alexandria. Egypt becomes a province of the Roman Empire.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Fact and Legend' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Even the ancient writers were not sure how she died; Plutarch says nobody knows the truth. Whatever the method, the result was the same. Octavian had Caesarion killed, saying that two Caesars were one too many. Egypt became a Roman province, ruled by Octavian personally, and three thousand years of rule by pharaohs came to an end.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her enemies wrote her story, and for two thousand years she was remembered mainly as a seductress who destroyed great men. Today historians see a different figure: a highly educated ruler who spent her whole life trying to keep the richest kingdom of the ancient world independent from the most powerful empire it had ever faced.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Cleopatra\'s daughter Cleopatra Selene survived. She married the king of Mauretania in North Africa and ruled there as queen for many years.' },
        },
      ],
    },
  ],
};

export const nero: Verhaal = {
  id: 'nero',
  beginJaar: 37,
  toegevoegdOp: '2026-10-27',
  titel: { en: 'Nero' },
  ondertitel: { en: 'The emperor blamed for the Great Fire of Rome' },
  teaser: { en: 'An emperor at sixteen who wanted to be an artist, not a ruler. When Rome burned, the city blamed him, and he blamed someone else.' },
  jaar: 68,
  periodeLabel: 'AD 37 - AD 68',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['nero'],
  portretKleur: '#6E2A3A',
  uitgelicht: false,
  volgorde: 12,
  tijdperkId: 'oudheid',
  themas: ['rome', 'keizer', 'macht', 'kunst', 'brand'],
  leestijdMinuten: 7,
  personage: { naam: 'Nero' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy from Augustus\'s Family' },
      afbeelding: SCENE_IMAGES['nero-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-1'],
          alt: { en: 'A determined Roman noblewoman with her young son in an elegant villa by the sea.' },
          bijschrift: { en: 'Antium, AD 37: a boy born into Rome\'s ruling family.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 15 December AD 37, in the seaside town of Antium near Rome, a boy was born called Lucius Domitius Ahenobarbus. His father came from an old noble family with a reputation for violence. His mother, Agrippina the Younger, was a great-granddaughter of Augustus, the first Roman emperor, and the sister of the reigning emperor, Caligula.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'It was a dangerous family to be born into. Agrippina\'s own mother and two of her brothers had died in exile or prison under the previous emperor. When Lucius was a small child, Caligula banished Agrippina, and the boy\'s father died. Lucius was raised for a time by an aunt, apparently with a dancer and a barber as his tutors.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Mother Who Wanted Everything' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After Caligula was murdered in AD 41, the new emperor Claudius allowed Agrippina to return. Ancient writers describe her as clever, ambitious and ruthless, and from the start her goal was clear: her son would be emperor. A famous story says an astrologer once told her that Lucius would rule but would kill his mother. She is said to have answered: let him kill me, as long as he rules.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The name Ahenobarbus means bronze-beard. Family legend said that two gods had once stroked an ancestor\'s black beard and turned it red.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Agrippina\'s Plan' },
      afbeelding: SCENE_IMAGES['nero-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-2'],
          alt: { en: 'An old emperor at a banquet reaching for a dish of mushrooms while a woman watches closely.' },
          bijschrift: { en: 'AD 54: a dish of mushrooms and a new emperor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In AD 49 Agrippina married the emperor Claudius, who was also her uncle; the Senate passed a special law to allow it. A year later Claudius adopted her son, who took the name Nero Claudius Caesar. Nero was now in line for the throne, ahead of Claudius\'s own son Britannicus, who was three years younger.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Agrippina surrounded Nero with powerful allies. She brought back the famous philosopher Seneca from exile to be his tutor, and made sure the commander of the Praetorian Guard, the emperor\'s bodyguard, was a man named Burrus who was loyal to her. Nero was married to Claudius\'s daughter Octavia.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 54,
          tekst: { en: 'The emperor Claudius dies suddenly. At sixteen, Nero becomes emperor of Rome.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October AD 54 Claudius died after a meal. Ancient historians almost all say that Agrippina poisoned him with a dish of mushrooms, although we cannot be sure. Burrus presented Nero to the Praetorian Guard, who proclaimed him emperor. He was sixteen years old.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Emperor at Sixteen' },
      afbeelding: SCENE_IMAGES['nero-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-3'],
          alt: { en: 'A young emperor addressing the Senate while an older philosopher stands at his side.' },
          bijschrift: { en: 'The good years: Nero guided by Seneca and Burrus.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The first years of Nero\'s reign went surprisingly well. Seneca wrote his speeches and Burrus ran the army. Nero promised the Senate he would respect its rights, cut some taxes and was praised for his mercy. Later Romans remembered this period as a time of good government.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Behind the scenes, there was a struggle for power. Agrippina expected to rule through her son and even appeared on coins beside him. Seneca and Burrus worked to push her aside. When Agrippina threatened to support Britannicus instead, the boy collapsed and died at a family dinner in AD 55. The historian Tacitus says he was poisoned on Nero\'s orders.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Young Man Who Wanted Fun' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nero was not very interested in government. He liked chariot racing, poetry, music and wild nights out. According to the ancient writers, he roamed the streets of Rome in disguise with his friends, picking fights and breaking into shops. He fell in love with a freedwoman named Acte, to his mother\'s fury, and later with Poppaea Sabina, a beautiful and ambitious noblewoman.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Collapsing Boat' },
      afbeelding: SCENE_IMAGES['nero-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-4'],
          alt: { en: 'A boat breaking apart at night on a dark bay, a woman swimming towards the lights on the shore.' },
          bijschrift: { en: 'The Bay of Naples, AD 59: a murder disguised as an accident.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Agrippina stood in Nero\'s way, and by AD 59 he had decided to get rid of her. Openly killing his mother would horrify the Romans, so a plan was made to disguise it as an accident. After a friendly dinner near the Bay of Naples, Agrippina was sent home in a specially built boat designed to collapse at sea.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The plan failed. The heavy canopy fell in, killing one of her companions, but Agrippina slipped into the water with only a wounded shoulder and swam until fishermen picked her up. Realising what had happened, she sent a messenger to Nero pretending she believed it had been an accident.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 59,
          tekst: { en: 'Nero has his mother, Agrippina, killed at her villa near the Bay of Naples.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nero panicked. He sent soldiers to her villa, and Agrippina was killed. Nero told the Senate that she had plotted against him and taken her own life. The Senate, terrified, congratulated him on his escape. But according to Tacitus, the emperor was haunted for the rest of his life by the memory of what he had done.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'The Emperor on Stage' },
      afbeelding: SCENE_IMAGES['nero-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-5'],
          alt: { en: 'An emperor singing with a lyre on the stage of a crowded theatre, guards blocking the exits.' },
          bijschrift: { en: 'Nero the performer: an audience that was not allowed to leave.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nero\'s real passion was performing. He took singing lessons, practised the lyre, wrote poetry and raced chariots. To Roman aristocrats this was shocking. Actors and charioteers were among the lowest people in society, and an emperor performing in public was a scandal.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nero did not care. From AD 64 he sang in public theatres. According to the historian Suetonius, no one was allowed to leave while he was performing: women gave birth in the audience, and some men pretended to be dead so that they could be carried out. Soldiers watched the crowd to make sure everyone applauded properly.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Champion of Greece' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In AD 66 and 67 Nero toured Greece, the home of the arts he loved, and competed in its great festivals. The Olympic Games were even moved by a year so that he could take part. In the chariot race he drove a team of ten horses, fell out of his chariot and failed to finish, but the judges still awarded him first prize. He came home with more than 1,800 victory crowns.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Nero was so pleased with the Greeks that he declared the province of Greece free from Roman taxes. The emperor Vespasian later cancelled it.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Rome Burns' },
      afbeelding: SCENE_IMAGES['nero-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-6'],
          alt: { en: 'Flames sweeping through the crowded streets of ancient Rome at night, people fleeing with their belongings.' },
          bijschrift: { en: 'July AD 64: the Great Fire of Rome.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the night of 18 to 19 July AD 64, a fire broke out in shops near the Circus Maximus, the great racetrack of Rome. Fanned by the wind, it raced through narrow streets of crowded wooden apartment blocks. It burned for six days, died down, and then broke out again. Of the fourteen districts of Rome, three were completely destroyed and seven badly damaged.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 64,
          tekst: { en: 'The Great Fire of Rome burns for six days and destroys or damages ten of the city\'s fourteen districts.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nero was at Antium when the fire began. He hurried back to Rome and organised relief: he opened public buildings and his own gardens to the homeless, built emergency shelters and lowered the price of grain. He also introduced new building rules, with wider streets and stone walls, to stop it happening again.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Did Nero Fiddle While Rome Burned?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But a rumour spread that while the city burned, Nero had climbed onto a private stage and sung about the fall of Troy. Tacitus reports it only as a rumour. The famous saying that Nero fiddled while Rome burned cannot be true: the violin had not been invented yet. Some Romans went further and claimed Nero had started the fire himself, to clear space for a new palace.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To stop the rumours, Nero needed someone to blame. He chose the Christians, a small and unpopular new religious group. According to Tacitus, many were arrested and put to death in horrific ways; some were burned as human torches in Nero\'s gardens. Christian tradition holds that the apostles Peter and Paul were executed in Rome during Nero\'s reign.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Golden House' },
      afbeelding: SCENE_IMAGES['nero-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-7'],
          alt: { en: 'A vast palace hall with a rotating dome ceiling, gold walls and gemstones, built on the ruins.' },
          bijschrift: { en: 'The Domus Aurea: a palace on the ashes of Rome.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the land cleared by the fire, Nero built an enormous new palace, the Domus Aurea or Golden House. It covered a huge area in the heart of Rome, with gardens, vineyards, pastures and an artificial lake. Walls were covered in gold and gemstones; according to Suetonius, a dining room had a ceiling that turned like the heavens, and ivory panels that showered guests with flowers and perfume.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the entrance stood a colossal bronze statue of Nero himself, about 35 metres tall. When it was finished, Nero is reported to have said: at last I can live like a human being. To many Romans who had lost their homes, the palace seemed like proof that the rumours about the fire were true.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 65,
          tekst: { en: 'A conspiracy to murder Nero is discovered. Many senators, and his old tutor Seneca, are forced to kill themselves.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In AD 65 a group of senators, officers and writers plotted to murder Nero and replace him with a nobleman named Piso. The plot was betrayed. Nero struck back savagely, and his former tutor Seneca, although probably innocent, was ordered to kill himself. That same year Nero\'s wife Poppaea died; ancient writers say he kicked her in a rage while she was pregnant.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The Colosseum was later built on the site of Nero\'s artificial lake. It may even take its name from the colossal statue of Nero that stood nearby.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Death of an Artist' },
      afbeelding: SCENE_IMAGES['nero-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nero-8'],
          alt: { en: 'A desperate emperor in a small dark villa at night, hoofbeats of approaching horsemen outside.' },
          bijschrift: { en: 'June AD 68: the last night of the emperor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By AD 68 Nero had lost the support of almost everyone who mattered. The governor of Gaul, Vindex, rebelled, and the elderly governor of Spain, Galba, declared himself the representative of the Senate and the Roman people. Nero did little to stop them. He talked about going to the rebels and simply weeping until they forgave him, then writing victory songs.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Praetorian Guard, bribed with promises of money, abandoned him. The Senate declared him an enemy of the state, which meant he could be executed in the old, brutal Roman way. Nero fled the city at night with a few servants to a freedman\'s villa outside Rome.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 68,
          tekst: { en: 'On 9 June, abandoned by his guards and declared a public enemy, Nero takes his own life at the age of thirty.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As horsemen approached to arrest him, Nero, with the help of his secretary Epaphroditus, stabbed himself in the throat. He was thirty years old. With him the family of Augustus, which had ruled Rome for nearly a century, came to an end.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'What an artist dies in me!' },
          bron: { en: 'Nero\'s last words, according to Suetonius' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Rome fell into a year of civil war, the Year of the Four Emperors. But many ordinary people had liked Nero, with his games and his generosity, and for years flowers appeared on his tomb. Some refused to believe he was dead at all. Several men appeared in the East claiming to be Nero, and attracted followers.',
          },
        },
      ],
    },
  ],
};

export const oudheidPersonen: Verhaal[] = [juliusCaesar, spartacus, ashoka, alexander, tutankhamun, socrates, qinShiHuang, hannibal, cleopatra, nero];
