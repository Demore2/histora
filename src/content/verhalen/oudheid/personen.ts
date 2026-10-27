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

export const oudheidPersonen: Verhaal[] = [juliusCaesar, spartacus, ashoka, alexander];
