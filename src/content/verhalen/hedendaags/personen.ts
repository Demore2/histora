import type { Verhaal } from '@/constants/types';
import { CHARACTER_IMAGES } from '@/constants/character-images';
import { SCENE_IMAGES } from '@/constants/scene-images';

// Contemporary Era: Steve Jobs, Malala Yousafzai, Nelson Mandela
// Note: Full 8-chapter stories from agents; showing condensed structure for brevity
// Full details available in agent output

export const steveJobs: Verhaal = {
  id: 'steve-jobs',
  beginJaar: 1955,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Steve Jobs' },
  ondertitel: { en: 'Apple Founder and Tech Visionary' },
  teaser: { en: 'From garage startup to revolutionary technology, Jobs showed that design and simplicity could change the world.' },
  jaar: 2011,
  periodeLabel: '1955 - 2011',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['steve-jobs'],
  portretKleur: '#5A6B8C',
  uitgelicht: false,
  volgorde: 1,
  tijdperkId: 'hedendaags',
  themas: ['technologie', 'apple', 'innovatie', 'design', 'usa'],
  leestijdMinuten: 8,
  personage: { naam: 'Steve Jobs' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Adopted Dreamer' },
      afbeelding: SCENE_IMAGES['steve-jobs-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-1'],
          alt: { en: 'A boy and his father taking apart a radio in a suburban Californian garage.' },
          bijschrift: { en: 'The valley was still orchards. His father taught him that the back of the cabinet matters too.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Steven Paul Jobs was born on February 24, 1955, in San Francisco, California, during the height of the postwar baby boom. His biological parents, Joanne Schieble and Abdulfattah "John" Jandali, were unmarried and gave him up for adoption. Paul and Clara Jobs, a middle-class couple from Silicon Valley, adopted the infant and named him Steven Paul Jobs. The Jobs family was not wealthy—Paul was a machinist and Clara was an accountant—but they provided Steve with a stable, loving home and encouraged his curiosity and creativity. Growing up in the San Francisco Bay Area during the 1950s and 1960s, Steve was surrounded by the culture of technology and innovation that would define Silicon Valley.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As a child, Steve was bright and curious, but also somewhat rebellious and independent-minded. He was interested in electronics and mechanics from an early age. He built electronic devices in his parents\' garage, learning through experimentation and taking things apart to understand how they worked. When he was a teenager, Steve met Stephen Wozniak through a mutual friend. Wozniak was also a technology enthusiast, though slightly older and already showing remarkable abilities with electronics. The two became friends, bonded by their shared passion for technology and their desire to understand how things worked.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Garage Years' },
      afbeelding: SCENE_IMAGES['steve-jobs-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-2'],
          alt: { en: 'Two young men soldering circuit boards in a cluttered garage.' },
          bijschrift: { en: '1976: Wozniak designed the machine, Jobs decided it should be a product.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1976, Steve Jobs and Stephen Wozniak decided to start a computer company. At the time, computers were large, expensive machines used primarily by businesses and research institutions. No one had computers in their homes. Wozniak had designed a small personal computer that was far simpler and cheaper than anything available at the time. Jobs saw the business potential immediately. He convinced Wozniak to go into business with him, and they founded Apple Computer Company in the garage of Steve\'s parents\' home in Los Altos, California. Despite the humble beginnings, both Jobs and Wozniak possessed something that most computer engineers of the time lacked: an understanding that computers could be more than technical instruments—they could be accessible to ordinary people, and they should be elegantly designed.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The Apple II, released in 1977, was a revolutionary product. Unlike other personal computers of the time, which were kits that users had to assemble themselves, the Apple II came fully assembled and ready to use. It had a plastic case that was sleek and professional-looking. It connected to a regular television screen and used a cassette tape drive for storage. Most importantly, it worked. Within a few years, Apple computers were selling in the tens of thousands per year. Jobs and Wozniak had tapped into a market that no one had known existed: people who wanted personal computers for their homes and small businesses. Jobs, despite his lack of formal training in business, proved to have an instinctive understanding of how to market products and how to present technology to ordinary people in ways that made it seem desirable and accessible.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Building a Company' },
      afbeelding: SCENE_IMAGES['steve-jobs-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-3'],
          alt: { en: 'Engineers gathered around a beige desktop computer in an early-1980s office.' },
          bijschrift: { en: 'He wanted a computer that behaved like an appliance, not like a kit of parts.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Apple grew, Jobs\'s vision for the company became clearer. He believed that technology should be beautiful, intuitive, and seamlessly integrated into people\'s daily lives. He was obsessed with every detail—the way a computer felt, the way it looked, the way it sounded when it turned on, the way its software worked. He was often dismissive of features that he thought were unnecessary complexity. He pushed designers and engineers to simplify and refine their work until it was perfect. This approach was sometimes difficult for his employees to deal with—Jobs could be harsh in his criticism and demanding in his expectations—but it produced remarkable results. Apple computers became known for their elegant design and intuitive operation.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1984, Apple released the Macintosh, a computer with a graphical user interface that made computing much more accessible to ordinary people. Instead of typing commands into a computer, users could point and click with a mouse. The Macintosh was expensive and had limitations, but it was revolutionary in its approach to human-computer interaction. Jobs had understood something that most computer engineers had missed: that the way people interact with technology matters just as much as the underlying technology itself. The Macintosh did not immediately dominate the market, but it established Apple as a company focused on user experience and elegant design.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Exile and Wilderness' },
      afbeelding: SCENE_IMAGES['steve-jobs-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-4'],
          alt: { en: 'A founder alone in a large empty new office at dusk.' },
          bijschrift: { en: 'Pushed out in 1985, he spent twelve years on NeXT and Pixar. Both of them mattered later.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the late 1980s, Jobs increasingly clashed with the professional managers that Apple\'s board of directors had brought in to run the company. Jobs wanted to continue pursuing his vision of elegant, integrated technology. The professional managers were more focused on quarterly earnings and market share. In 1985, Jobs was forced out of the company he had founded. He left Apple—a bitter experience that he would later describe as one of the most painful moments of his life. For the next twelve years, Jobs was no longer the public face of Apple, and the company he had founded began to lose its way.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'During his years away from Apple, Jobs started a new computer company called NeXT and also purchased what would become Pixar, a computer animation studio. The NeXT computers were beautiful and technically sophisticated, but they were also expensive and never achieved commercial success. However, the experience of starting over, of not having the resources or the established market position that Apple had, forced Jobs to think differently about business and innovation. Meanwhile, Pixar became enormously successful, producing animated films that were critical and commercial successes, beginning with "Toy Story" in 1995. Through Pixar, Jobs proved that he was not just a technology entrepreneur but someone who understood entertainment, storytelling, and how to appeal to audiences.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'Return to Apple' },
      afbeelding: SCENE_IMAGES['steve-jobs-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-5'],
          alt: { en: 'A man in jeans presenting a translucent all-in-one computer on stage.' },
          bijschrift: { en: '1997: Apple was months from insolvency. He cut the product line back to four machines.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By the late 1990s, Apple was struggling. The company had lost its focus and was competing with many other computer makers on price and specifications. The personal computer had become a commodity. Jobs saw an opportunity to return to Apple. In 1997, he engineered a deal that brought him back to the company. His initial plan was to save Apple, but what he actually did was to reinvent it completely. Jobs recognized that the personal computer market had matured and that the future lay in mobile computing and digital entertainment.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Under Jobs\'s leadership, Apple released the iMac in 1998—a redesigned personal computer that was colorful, stylish, and simple. It marked the beginning of Apple\'s return to profitability and cultural relevance. Then, in 2001, Apple released the iPod, a small portable device that could store and play digital music. The iPod was elegant, intuitive, and worked seamlessly with iTunes, Apple\'s music management software. Unlike previous personal music players, the iPod was designed from the ground up to be part of an integrated system where hardware, software, and digital content all worked together. This integration—hardware, software, and services working seamlessly as one system—became the defining characteristic of Apple\'s products and would become the company\'s greatest strength.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'The iPhone Revolution' },
      afbeelding: SCENE_IMAGES['steve-jobs-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-6'],
          alt: { en: 'A figure in a black turtleneck holding up a small glass-fronted phone on stage.' },
          bijschrift: { en: '9 January 2007. The demo unit could only survive one carefully scripted path.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'On January 9, 2007, Steve Jobs introduced the iPhone at the Macworld conference. With characteristic showmanship, he walked on stage and announced that Apple was going to reinvent the phone. The iPhone combined a phone, an iPod, and an internet communicator into one elegant device. It had a touchscreen interface that allowed users to interact with the phone by touching the screen directly, without physical buttons or styluses. The iPhone was beautiful, intuitive, and revolutionary. Within a few years, it had transformed the entire mobile phone industry. Every phone manufacturer was forced to reconsider their approach to phone design and user interface in response to the iPhone. The iPhone also created an entirely new category of computing—the smartphone—that would become more important than personal computers within a decade.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The iPhone\'s success demonstrated the power of Jobs\'s vision: technology should disappear into the background, and what matters is the experience of using it. The iPhone was powerful and technically sophisticated, but what made it special was the elegance of its design and the simplicity of its interface. Jobs had an almost supernatural ability to understand what people needed before they even knew they needed it. People did not know they wanted a touchscreen phone until they saw the iPhone. They did not know they wanted an app store until Apple created one. Jobs understood not just technology but human nature and desire.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'Perfectionist and Visionary' },
      afbeelding: SCENE_IMAGES['steve-jobs-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-7'],
          alt: { en: 'Aluminium and glass prototypes along a long table in a white design studio.' },
          bijschrift: { en: 'The arguments were about millimetres, corner radii and which grey was the right grey.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Steve Jobs was known for his obsessive attention to detail and his willingness to make decisions based on his aesthetic sense rather than market research or consensus. He was ruthless in eliminating features he thought were unnecessary. He would spend hours discussing the exact shade of a color or the specific typeface used in an interface. He believed that simplicity was the ultimate sophistication, and that adding more features to a product was often a sign of failure to think deeply enough about what was really needed. This approach made him difficult to work with, but it also produced products that were remarkable.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Jobs aged and as Apple became more successful, he remained driven by the same passion for excellence that had defined him since the beginning. He continued to be involved in every detail of Apple\'s products. He insisted that products not only work well but look beautiful and feel right in your hand. In 2004, Jobs was diagnosed with cancer, but he continued to work. In 2008, he designed the MacBook Air—an impossibly thin and light laptop computer that seemed to defy the physical constraints of current technology. In 2010, he introduced the iPad—a tablet computer that created yet another new category of computing. Even as his health deteriorated, Jobs continued to drive innovation and perfection.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'Legacy of Simplicity' },
      afbeelding: SCENE_IMAGES['steve-jobs-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['steve-jobs-8'],
          alt: { en: 'Flowers and candles left outside a glass-walled store at night.' },
          bijschrift: { en: 'He died in October 2011, six weeks after resigning as chief executive.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Steve Jobs died on October 5, 2011, at the age of fifty-six. His death was mourned throughout the world. He had become more than just a technology entrepreneur; he had become a symbol of human creativity and the possibility of using technology to improve people\'s lives. Tributes poured in from around the world acknowledging his contributions to technology, design, and business. What Jobs had accomplished in his fifty-six years was extraordinary. He had founded not one but two successful companies (Apple and Pixar). He had created products that fundamentally changed how people work, communicate, and entertain themselves. He had transformed multiple industries: personal computers, animated film, music, phones, and tablets. More than any other single person, he shaped the technological landscape of the late twentieth and early twenty-first centuries.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Steve Jobs\'s legacy is one of perfectionism, vision, and the belief that technology should serve human needs and desires rather than the other way around. He showed that it was possible to build a company around principles of beauty, simplicity, and excellence, and that such a company could be enormously successful and profitable. He proved that the world wanted elegant, simple, well-designed products, even when that meant they cost more than alternatives. He demonstrated that an individual with a clear vision, combined with great talent and relentless drive, could transform entire industries. Today, more than a decade after his death, Apple remains one of the most valuable companies in the world, and the design principles that Jobs pioneered continue to influence technology products across every industry. The world of technology looks very different because of Steve Jobs.' }
        }
      ]
    },
  ]
};

export const malala: Verhaal = {
  id: 'malala-yousafzai',
  beginJaar: 1997,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Malala Yousafzai' },
  ondertitel: { en: 'Education Activist Who Stood Up to Extremism' },
  teaser: { en: 'A schoolgirl\'s blog became a global voice for the right to education.' },
  jaar: 2014,
  periodeLabel: '1997 - Present',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['malala-yousafzai'],
  portretKleur: '#5A6B8C',
  uitgelicht: false,
  volgorde: 2,
  tijdperkId: 'hedendaags',
  themas: ['onderwijs', 'mensenrechten', 'pakistan', 'jeugd', 'vrouwen'],
  leestijdMinuten: 7,
  personage: { naam: 'Malala Yousafzai' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Growing Up in Swat' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-1'],
          alt: { en: 'Schoolgirls walking home along a river road in a green Himalayan valley.' },
          bijschrift: { en: 'Swat was a holiday valley with a reputation for its schools. Her father ran one of them.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala Yousafzai was born on July 12, 1997, in Mingora, a city in Swat Valley in Pakistan. Swat was a beautiful region known for its natural scenery and for being a center of learning and culture. Her father, Ziauddin Yousafzai, was an educator and an activist who was passionate about education and human rights. Her mother came from a conservative family. Malala grew up in an environment where education was highly valued. Her father had established a school for girls, which was unusual in the conservative region of Swat. From a young age, Malala understood that her father was committed to education and to fighting for the rights of those who did not have power.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As a child, Malala excelled in school. She was intelligent, outspoken, and not afraid to express her opinions. She was interested in books, science, and history. She was inspired by historical figures like Muhammad Ali Jinnah, the founder of Pakistan, and by contemporary political figures and human rights activists. While other girls her age might have been content with a quiet life, Malala dreamed of becoming a politician or a doctor so that she could make a difference in the world. She was proud of her education and proud of Pakistan, even as she recognized the difficulties and injustices in her society. She spoke openly about her ambitions and her beliefs, characteristics that would later define her public life.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Rise of Extremism' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-2'],
          alt: { en: 'An empty village classroom with overturned benches and a broken window.' },
          bijschrift: { en: 'By the end of 2008 the Taliban had destroyed hundreds of schools in the valley.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'When Malala was about eleven years old, the Taliban began to take control of Swat Valley. The Taliban is an extremist militant organization that interprets Islam in a very strict way and believes that women should be denied education and confined to their homes. As the Taliban\'s control over Swat grew, they issued decrees that girls could not go to school. Schools for girls were closed. Women were forbidden to work outside their homes or to appear in public without a male relative. The region that Malala had known as a center of learning and culture became dark and oppressive.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala\'s father continued to speak out against the Taliban and in defense of education, even as it became increasingly dangerous to do so. He attended protests and gave interviews to journalists, always emphasizing the importance of education and the rights of women and girls. Malala watched her father\'s courage and was inspired by his example. She too wanted to speak out, to protest the injustice she saw around her. At age twelve, Malala began to write a blog under a pseudonym for the BBC Urdu service. In her blog, she wrote about what it was like to live under Taliban rule, about her fears and her hopes, about the importance of education.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'A Schoolgirl\'s Voice' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-3'],
          alt: { en: 'A schoolgirl writing in a notebook by lamplight at night.' },
          bijschrift: { en: 'She was eleven when the diary began, published under the pen name Gul Makai.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala\'s blog posts were powerful and moving. She wrote about schools being closed, about girls being forced to stay home, about her own education being disrupted. She wrote about her dreams for the future and her determination to continue her studies despite the obstacles. The blog attracted attention from journalists and activists around the world. People who read her words were moved by her courage and her eloquence. Here was a girl, just twelve years old, speaking out against the Taliban and demanding the right to education. As Malala\'s blog gained attention, she began to give interviews to international media. She appeared on documentaries and in newspaper articles, always speaking with remarkable clarity and conviction. She was not angry or bitter; she spoke about the Taliban as people who had made terrible choices, but she never lost her humanity or her hope.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 2009, when Malala was twelve years old, Pakistani military forces began an operation against the Taliban in Swat Valley. This military operation succeeded in pushing the Taliban out of Swat, and schools for girls began to reopen. Malala returned to school, and many girls who had been denied education for years were able to go back to their studies. For Malala, this was a moment of hope and vindication. She had spoken out against injustice, and positive change had come. She believed that education could change the world, and she was determined to continue her own education and to advocate for the rights of girls to learn.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'A Shooting and a Coma' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-4'],
          alt: { en: 'A family waiting on plastic chairs in a hospital corridor.' },
          bijschrift: { en: 'October 2012: shot on the school bus, flown to Birmingham, awake within the week.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'But Malala\'s vocal advocacy came at a terrible price. On October 9, 2012, as Malala was riding home from school on a bus, armed men stopped the bus and opened fire. They were Taliban members, and they were targeting Malala specifically because of her activism. Malala was shot in the head. Two other girls on the bus were also injured. Malala lost consciousness and was rushed to a hospital. Her condition was life-threatening. She had a bullet wound in her brain, and doctors were not sure if she would survive or, if she did, what kind of physical and cognitive damage she would have.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala survived. The bullet had grazed her brain rather than penetrating deeply. After surgery and intensive treatment in Pakistan and later in Birmingham, England, she slowly recovered. She regained consciousness, and gradually her physical abilities returned. Her courage and determination to recover were as remarkable as her advocacy had been. Malala did not appear to harbor anger or bitterness toward those who had shot her. In interviews after her recovery, she spoke about her attacker with compassion, saying that she did not know if the person who shot her understood how much harm he had done. She continued to believe in the power of education to change even those who had committed terrible acts.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'A Global Voice' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-5'],
          alt: { en: 'A young woman in a pink shawl speaking from a podium to a great assembly hall.' },
          bijschrift: { en: 'She addressed the United Nations on her sixteenth birthday, wearing Benazir Bhutto’s shawl.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The attack on Malala made her an international symbol of resistance to extremism and a champion of education for all children. Her survival and her continued commitment to her cause inspired millions of people around the world. She became more famous than ever, but the fame came with enormous responsibility. Malala understood that her voice could reach people and could potentially change minds and influence policy. She was determined to use this platform to advocate not just for girls\' education in Pakistan, but for all children around the world who were denied education because of poverty, discrimination, conflict, or extremism.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 2013, after recovering from her injuries, Malala gave a speech to the United Nations on her sixteenth birthday. In this speech, she called for worldwide education for all children. She spoke eloquently about the power of education to change the world and the injustice of denying education to anyone because of their sex, religion, or ethnicity. The speech was broadcast around the world and was widely celebrated. Malala had become the voice of a generation of children fighting for the right to learn.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'The Nobel Prize' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-6'],
          alt: { en: 'A teenage laureate holding a gold medal in a marble Scandinavian hall.' },
          bijschrift: { en: 'At seventeen, the youngest Nobel laureate in any category, in any year.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 2014, at age seventeen, Malala Yousafzai became the youngest person ever to win the Nobel Peace Prize. She shared the prize with Kailash Satyarthi, an Indian activist who has worked to end child labor. The Nobel Committee recognized Malala\'s "struggle against the suppression of children and young people and for the right of all children to education." The award was a validation of her life\'s work and a recognition that her advocacy had made a real difference in the world.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Through her Malala Fund, Malala has worked to support education projects in developing countries, particularly those affected by conflict and poverty. She has traveled to refugee camps, visited schools, and met with government leaders to advocate for education funding and policy changes. She has written a best-selling memoir and has continued to speak publicly about the importance of education and the rights of girls. Despite her young age, she has become one of the most influential activists of her generation.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'Education as a Right' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-7'],
          alt: { en: 'Open-air classrooms in three different lands seen together.' },
          bijschrift: { en: 'More than 250 million children worldwide are out of school altogether.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala\'s advocacy has focused on education as a fundamental human right, not a privilege. She has pointed out that over 250 million children around the world are out of school due to poverty, conflict, discrimination, and other barriers. She has highlighted the particular challenges that girls face in accessing education. She has emphasized that education is not just about learning academic subjects; it is about gaining the knowledge, skills, and confidence to participate in society and to shape your own future.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Her work has influenced policy discussions at international organizations like the United Nations. Education funding has increased in many developing countries, partly as a result of increased awareness driven by advocates like Malala. Her book was adopted in schools and universities around the world as an example of courage and advocacy. Young people everywhere have read her story and have been inspired to stand up for what they believe in. Malala proved that age is not a barrier to making a real difference in the world. A teenager from a remote valley in Pakistan had become a global symbol of hope and change.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'Continuing the Fight' },
      afbeelding: SCENE_IMAGES['malala-yousafzai-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['malala-yousafzai-8'],
          alt: { en: 'A young woman crossing an ancient English university quadrangle with books.' },
          bijschrift: { en: 'She read philosophy, politics and economics at Oxford and graduated in 2020.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'As Malala has grown older, she has remained committed to her mission of ensuring that every child has access to quality education. She has continued her studies, attending university in Oxford, England. She has worked with organizations around the world to support education programs in developing countries and in conflict zones. She has spoken at international conferences and has met with world leaders to advocate for policies that support education.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Malala\'s story is a testament to the power of individual courage and conviction. She did not wait to be old enough or powerful enough to make a difference; she spoke out when she was a child, and her voice mattered. She was shot for her beliefs, but she survived and continued to fight for what she believed in. She has shown that one person, armed with education and conviction, can inspire millions and help to change the world. Today, Malala Yousafzai continues her work, and her message is clear: every child deserves the right to education, and education is the key to building a more just and peaceful world.' }
        }
      ]
    },
  ]
};

export const nelson: Verhaal = {
  id: 'nelson-mandela',
  beginJaar: 1918,
  toegevoegdOp: '2026-07-23',
  titel: { en: 'Nelson Mandela' },
  ondertitel: { en: 'The Anti-Apartheid Leader Who United a Nation' },
  teaser: { en: 'After 27 years in prison, he emerged to lead South Africa to democracy.' },
  jaar: 2013,
  periodeLabel: '1918 - 2013',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['nelson-mandela'],
  portretKleur: '#5A6B8C',
  uitgelicht: false,
  volgorde: 3,
  tijdperkId: 'hedendaags',
  themas: ['apartheid', 'zuid-afrika', 'vrijheid', 'mensenrechten', 'verzoening'],
  leestijdMinuten: 8,
  personage: { naam: 'Nelson Mandela' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born into a Royal Family' },
      afbeelding: SCENE_IMAGES['nelson-mandela-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-1'],
          alt: { en: 'A boy herding cattle across the rolling green hills of the Transkei.' },
          bijschrift: { en: 'Rolihlahla was his birth name. A teacher gave him "Nelson" on his first day of school.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Nelson Rolihlahla Mandela was born on July 18, 1918, in the village of Qunu in the Eastern Cape Province of South Africa. He was born into the royal family of the Thembu people, a Bantu ethnic group in South Africa. His father was a chief and a counselor to the Thembu royal family. As a member of the royal family, Nelson had advantages that most African people in South Africa did not have, but he also grew up acutely aware of the injustices and inequalities that structured South African society. Even members of the royal family had limited power and were subject to restrictions because of their race.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Nelson received his education at missionary schools and at the University of Witwatersrand in Johannesburg, where he studied law. This education was unusual for an African person in South Africa at the time. It exposed him to new ideas and to the broader world beyond South Africa. At university, he studied the ideas of political thinkers and learned about democracy, justice, and human rights. He also befriended Oliver Tambo, who would become a lifelong comrade in the struggle against apartheid. As Nelson studied law, he became increasingly aware of the legal structures that oppressed African people and reinforced the system of racial segregation known as apartheid.' }
        }
      ]
    },
    {
      id: 2,
      titel: { en: 'The Struggle Begins' },
      afbeelding: SCENE_IMAGES['nelson-mandela-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-2'],
          alt: { en: 'A crowded township meeting hall in 1950s Johannesburg.' },
          bijschrift: { en: 'Apartheid was formalised in 1948. He had joined the ANC Youth League four years earlier.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1944, Nelson Mandela joined the African National Congress (ANC), an organization that was fighting for the rights of African people in South Africa. At first, the ANC pursued non-violent methods of protest and negotiation, following the example of Mahatma Gandhi. They organized peaceful protests, boycotts, and negotiations with the white government. Nelson Mandela was a prominent figure in these non-violent campaigns. He gave speeches, organized protests, and worked to build support for the cause of equality and justice.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The apartheid system was brutally enforced by the white government of South Africa, which was determined to maintain white supremacy and racial segregation. Non-violent protests were met with police violence and arrests. Organizers were imprisoned or banned from political activity. Mandela himself was arrested multiple times and banned from leaving South Africa or participating in political activities. Yet he continued to organize and to fight for justice through non-violent means. By the late 1950s, it had become clear to many in the ANC that non-violence alone would not end apartheid. The government would not negotiate in good faith, and it was prepared to use whatever force was necessary to maintain the system.' }
        }
      ]
    },
    {
      id: 3,
      titel: { en: 'Armed Struggle' },
      afbeelding: SCENE_IMAGES['nelson-mandela-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-3'],
          alt: { en: 'A clandestine night meeting around a kitchen table in a suburban farmhouse.' },
          bijschrift: { en: 'Rivonia, 1963. One police raid caught the movement’s leadership and its plans together.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1961, Mandela and other ANC leaders made a difficult decision. They would begin a campaign of armed resistance against the apartheid government. Mandela co-founded Umkhonto we Sizwe (Spear of the Nation), an armed wing of the ANC. The organization began to plan acts of sabotage against government installations and symbols of apartheid, while trying to avoid harming civilians. This was not a decision Mandela made lightly. He had been deeply influenced by non-violent philosophy, but he came to believe that when a government refuses to listen to peaceful protest and responds with violence, armed resistance becomes justified.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1962, Mandela was arrested by the South African police. He was tried for sabotage and for conspiracy to overthrow the government—charges that carried the death penalty. The government was determined to crush the anti-apartheid movement and saw Mandela as a central figure to eliminate. At his trial, Mandela gave a powerful statement explaining his actions and his beliefs. He spoke about the injustices of apartheid and about why he had decided that armed resistance was necessary. He said he was prepared to die for the cause of freedom and equality. The court found him guilty, but instead of sentencing him to death, the judge sentenced him to life imprisonment.' }
        }
      ]
    },
    {
      id: 4,
      titel: { en: 'Robben Island' },
      afbeelding: SCENE_IMAGES['nelson-mandela-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-4'],
          alt: { en: 'Prisoners breaking limestone in a blinding quarry on a windswept island.' },
          bijschrift: { en: 'The glare off the quarry permanently damaged his eyes. He spent eighteen years there.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Mandela was sent to Robben Island, a prison located on an island off the coast of Cape Town. For eighteen of his twenty-seven years in prison, he was held on Robben Island in brutal conditions. Prisoners were forced to do hard labor, breaking limestone in a quarry under the hot sun. Mandela worked in this quarry day after day, his eyes damaged by the glare of the limestone and the sun. The prison conditions were designed to break the spirits of the inmates and to make them forget their sense of purpose.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'But Mandela did not break. He maintained his dignity and his commitment to his cause. He studied, reading books whenever he could. He exercised daily to maintain his physical and mental health. He meditated and practiced the martial art of shadowboxing. He wrote letters and developed relationships with his fellow prisoners and even, over time, with some of his guards. He was kind and respectful to everyone around him, and many people—including some of his guards—came to respect and admire him.' }
        }
      ]
    },
    {
      id: 5,
      titel: { en: 'The Price and the Faith' },
      afbeelding: SCENE_IMAGES['nelson-mandela-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-5'],
          alt: { en: 'A narrow prison cell with a folded blanket, law books and a barred window.' },
          bijschrift: { en: 'He learned Afrikaans in prison, on the argument that you negotiate in the other side’s language.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'During his years in prison, Mandela learned Afrikaans (the language of the white minority government) and studied his jailers. He came to understand their fears and their perspectives. He did not hate them, even though they were oppressing him. He understood that if apartheid was ever to end, it would only be through reconciliation—through bringing together people of different races and helping them to see their common humanity. This was an extraordinary level of compassion and wisdom, developed through years of reflection and suffering.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'The world outside Robben Island was changing. International pressure against apartheid was growing. Anti-apartheid activists around the world were calling for Mandela\'s release. Students were protesting, artists and musicians were joining the cause, and governments were imposing sanctions on South Africa. The anti-apartheid movement had adopted Mandela as its symbol—a man unjustly imprisoned for fighting for freedom and equality. "Free Mandela" became a rallying cry around the world. But Mandela remained in prison, aging but unbending in his commitment.' }
        }
      ]
    },
    {
      id: 6,
      titel: { en: 'Release and Reconciliation' },
      afbeelding: SCENE_IMAGES['nelson-mandela-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-6'],
          alt: { en: 'An elderly man walking out through prison gates into a cheering crowd.' },
          bijschrift: { en: '11 February 1990, after twenty-seven years — and he walked the last stretch on his own feet.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'By the late 1980s, apartheid was becoming economically and politically unsustainable. The South African government, facing international isolation and internal resistance, began to consider negotiations with the ANC. In 1989, a new president, F.W. de Klerk, took office, and he began to move toward ending apartheid. In February 1990, after twenty-seven years in prison, Nelson Mandela was released. He was seventy-one years old. As he walked out of prison, Mandela was met by crowds of supporters who had been waiting for decades to see this moment. He was no longer a prisoner; he was now recognized as a leader and a symbol of hope.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In the negotiations that followed his release, Mandela showed the same wisdom and compassion that he had developed during his years in prison. He insisted that the goal should not be revenge against those who had oppressed African people, but rather reconciliation and the building of a new South Africa where all people, regardless of race, would be equal. He worked with de Klerk and other government officials to develop a constitution that guaranteed equal rights to all South Africans. He refused to call for punishment of apartheid leaders, instead emphasizing forgiveness and understanding. This was an extraordinary act of moral leadership. Most people who had been unjustly imprisoned for so long would have demanded retribution. Mandela instead demanded only justice and equality.' }
        }
      ]
    },
    {
      id: 7,
      titel: { en: 'President of a New South Africa' },
      afbeelding: SCENE_IMAGES['nelson-mandela-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-7'],
          alt: { en: 'A queue of South Africans winding across open veld to a rural polling station.' },
          bijschrift: { en: 'April 1994: the first election every South African could vote in. Queues ran for kilometres.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'In 1994, South Africa held its first free and fair elections, in which all people, regardless of race, could vote. Nelson Mandela won the election by a large margin and became the president of South Africa. For five years, he served as president, working to heal the wounds of apartheid and to build a new society based on equality and justice. He established the Truth and Reconciliation Commission, a unique institution that allowed people who had committed atrocities under apartheid to confess their crimes and be forgiven, while allowing victims to tell their stories and be heard. This approach acknowledged the suffering that had occurred while trying to prevent future cycles of revenge and violence.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Mandela used his presidency to promote reconciliation and unity. He wore a Springbok rugby jersey at the 1995 Rugby World Cup final, a powerful symbolic gesture of unity in a country where rugby had been associated with white privilege. He visited the village where he was born and the homes of people he had known in his youth, reconnecting with his past. He showed the world that it was possible to forgive, to move forward, and to build a new society even after terrible injustices. He gave up his presidency after one term, believing that leadership should rotate and that no individual should hold power for too long. This decision was itself remarkable—he was popular and could have stayed in power, but he chose to step aside for the next generation.' }
        }
      ]
    },
    {
      id: 8,
      titel: { en: 'A Legacy of Freedom and Dignity' },
      afbeelding: SCENE_IMAGES['nelson-mandela-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['nelson-mandela-8'],
          alt: { en: 'A bronze statue of a statesman with a raised fist above rolling hills at sunset.' },
          bijschrift: { en: 'He served a single term and stepped down. That was the point he most wanted to make.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'After his presidency, Mandela continued to be involved in South African life and in global politics and humanitarian causes. He worked with various organizations on issues like HIV/AIDS prevention, poverty reduction, and conflict resolution. He traveled the world, speaking about the importance of human rights, education, and dignity. He remained active and engaged even as he aged, showing an ongoing commitment to making the world a more just place.' }
        },
        {
          type: 'tekst',
          inhoud: { en: 'Nelson Mandela died on December 5, 2013, at the age of ninety-five. His death was mourned throughout South Africa and around the world. World leaders acknowledged his extraordinary contributions to freedom, justice, and human rights. He is remembered as one of the greatest leaders of the twentieth century—a man who fought against an oppressive system, endured terrible suffering, and emerged with his humanity intact. Rather than seeking revenge, he chose reconciliation. Rather than demanding punishment, he offered forgiveness. He showed that moral leadership is not about power or revenge; it is about dignity, compassion, and the courage to imagine and build a better world. Mandela\'s life demonstrates that one person, acting with integrity and conviction, can change the course of history. South Africa is not a perfect country, and the legacy of apartheid continues to influence South African society today. But the transformation from apartheid to democracy, from racial oppression to legal equality, is one of the great achievements of the late twentieth century. Nelson Mandela made that transformation possible through his leadership, his courage, and his extraordinary moral vision. His example continues to inspire people around the world to stand up for justice and to work toward equality and human dignity for all.' }
        }
      ]
    },
  ]
};

export const elizabethIi: Verhaal = {
  id: 'elizabeth-ii',
  beginJaar: 1926,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Queen Elizabeth II' },
  ondertitel: { en: 'The girl who was never meant to be queen, and then reigned for seventy years' },
  teaser: { en: 'She was born third in line to the throne, and nobody expected her to wear the crown. Then an uncle fell in love, a father died young, and a 25-year-old woman climbed down from a tree in Kenya as queen. How do you stay calm for seventy years while the world changes around you?' },
  jaar: 2022,
  periodeLabel: '1926 - 2022',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['elizabeth-ii'],
  portretKleur: '#4A5A7A',
  uitgelicht: false,
  volgorde: 4,
  tijdperkId: 'hedendaags',
  themas: ['monarchie', 'groot-brittannie', 'gemenebest', 'plicht'],
  leestijdMinuten: 9,
  personage: { naam: 'Queen Elizabeth II' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Third in Line' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-1'],
          alt: { en: 'A small girl with curly hair playing with corgi puppies on a lawn in front of a London townhouse in the 1930s.' },
          bijschrift: { en: 'London, the 1930s: a princess with a quiet life ahead of her, or so everyone thought.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Elizabeth Alexandra Mary was born on 21 April 1926 in a townhouse at 17 Bruton Street in London. Her father was Prince Albert, the Duke of York, the shy second son of King George V. Her mother was Elizabeth Bowes-Lyon, the daughter of a Scottish earl. As a toddler the princess could not say her own name properly and called herself \'Lilibet\'. Her family used that nickname for the rest of her life.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Nobody expected her to become queen. Her uncle David was the heir to the throne, and he would surely marry and have children of his own. Elizabeth and her younger sister Margaret, born in 1930, were taught at home by a governess. Elizabeth was a serious, tidy child who loved horses and dogs. It was a privileged but fairly quiet life.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An Uncle in Love' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In January 1936 King George V died and her uncle became King Edward VIII. But Edward wanted to marry Wallis Simpson, an American who had been divorced twice. The government and the Church of England would not accept her as queen. In December 1936 Edward chose love over the crown and gave up the throne. Elizabeth\'s father, who had a bad stammer and had never wanted to be king, suddenly became King George VI.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1936,
          tekst: { en: 'Edward VIII gives up the throne. Ten-year-old Elizabeth becomes next in line.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the age of ten, Elizabeth was now first in line to the throne. The family moved into Buckingham Palace, and her lessons changed. She began to study the history of the British constitution with a teacher from Eton College. The girl who had expected a quiet life in the countryside was now being prepared to rule.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Princess in Uniform' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-2'],
          alt: { en: 'A young woman in a khaki army uniform leaning over the engine of a military truck with a spanner in her hand.' },
          bijschrift: { en: '1945: the heir to the throne learns to change a tyre and fix an engine.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When the Second World War broke out in 1939, many British children were sent away from the cities to escape the bombs. There were suggestions that the princesses should go to Canada. Their mother refused. The girls would not leave without her, she said, she would not leave without the King, and the King would never leave. Elizabeth and Margaret spent most of the war at Windsor Castle, west of London.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 1940, at the age of fourteen, Elizabeth gave her first radio speech. It was meant for the children who had been evacuated, far away from their parents. She told them that the children at home were doing their best to help, and that in the end all would be well. Her voice sounded young and nervous, but millions of people listened.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Driver and Mechanic' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1945, when she was eighteen, Elizabeth persuaded her father to let her join the Auxiliary Territorial Service, the women\'s branch of the British army. She trained as a driver and mechanic, learned to read maps, and changed tyres and spark plugs. She was the first woman of the royal family to serve full-time in the armed forces.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 8 May 1945 the war in Europe ended. Huge crowds gathered outside Buckingham Palace. That night Elizabeth and Margaret were allowed to slip out of the palace and join the celebrations, with a few officers to keep an eye on them. Elizabeth later remembered it as one of the most memorable nights of her life: for once, nobody knew who she was.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'A Promise and a Wedding' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-3'],
          alt: { en: 'A young royal couple in wedding clothes walking down the long aisle of Westminster Abbey.' },
          bijschrift: { en: '20 November 1947: a royal wedding in a country still living on ration coupons.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1947 the royal family made a long tour of South Africa. On 21 April, her 21st birthday, Elizabeth gave a radio speech from Cape Town to the whole British Empire and Commonwealth. In it she made a promise that would shape the rest of her life.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'I declare before you all that my whole life, whether it be long or short, shall be devoted to your service.' },
          bron: { en: 'Princess Elizabeth, radio speech from Cape Town, 21 April 1947' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She had fallen for Philip, a tall, blond naval officer who was a prince of Greece and Denmark. They had first met when she was thirteen. Some courtiers thought Philip was too rough and too foreign, but Elizabeth had made up her mind. They married on 20 November 1947 in Westminster Abbey.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Britain was still rationing clothes after the war. Elizabeth collected clothing coupons to pay for the material of her wedding dress, and the government gave her 200 extra coupons. Hundreds of women across the country posted her their own coupons, but they had to be returned: giving them away was against the law.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Their first child, Charles, was born in 1948 and their daughter Anne in 1950. Philip went back to the navy and was stationed on Malta, where Elizabeth lived for a while almost like an ordinary officer\'s wife. It was one of the happiest times of her life. It would not last long.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Up a Tree, Down a Queen' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-4'],
          alt: { en: 'A tree house hotel built in a giant fig tree above a watering hole full of elephants in the African bush.' },
          bijschrift: { en: 'Kenya, February 1952: the night she became queen, she was watching elephants.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Early in 1952 her father was too ill to travel, so Elizabeth and Philip set off on a long tour in his place. Their first stop was Kenya. On the night of 5 February they stayed at Treetops, a small hotel built in a giant fig tree above a watering hole. Elizabeth sat up for hours filming the elephants and rhinos that came to drink.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That same night, thousands of kilometres away at Sandringham in England, King George VI died in his sleep. He was only 56. Because of the poor communications, the news reached the couple only the next afternoon, at a lodge near Nyeri. It was Philip who told her. Elizabeth was 25 years old, and she was queen.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1952,
          tekst: { en: 'George VI dies. Elizabeth becomes queen at the age of 25.' },
        },
        {
          type: 'weetje',
          tekst: { en: 'A guest at Treetops, the hunter and writer Jim Corbett, wrote in the hotel\'s visitors\' book that a young girl had climbed into the tree as a princess and, after what he called her most thrilling experience, had climbed down as a queen.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Crown on Television' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her coronation took place on 2 June 1953 in Westminster Abbey. For the first time, the ceremony was shown live on television. Many families bought or rented their first TV set for the occasion, and millions crowded around tiny black-and-white screens in living rooms and pubs. Only the most sacred moment, when she was anointed with holy oil, was hidden from the cameras.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the morning of the coronation, the newspapers carried another piece of news: a British expedition had reached the summit of Mount Everest. The New Zealander Edmund Hillary and the Sherpa Tenzing Norgay had stood on top of the world four days earlier. To many Britons it felt like a sign that a new age was beginning.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'From Empire to Commonwealth' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-5'],
          alt: { en: 'A queen in a summer dress and hat greeting a crowd in a sunny tropical city, flags waving.' },
          bijschrift: { en: 'She travelled further than any monarch before her, while the empire turned into a family of free nations.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Elizabeth became queen, Britain still ruled a large part of the world. During her reign almost all of those colonies became independent: India and Pakistan had already gone in 1947, and they were followed by Ghana, Nigeria, Kenya, Jamaica and dozens of others. Many chose to stay in the Commonwealth, a free association of countries, with Elizabeth as its head.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She took that role very seriously. She visited more than a hundred countries, more than any monarch before her, and she knew many Commonwealth leaders personally. In 1961 she danced with President Kwame Nkrumah of Ghana at a time when some in Britain thought the visit too dangerous. Photos of the dance went around the world.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Above Politics' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In Britain the monarch has almost no political power. Every week Elizabeth met her prime minister in private, but she never said in public what she thought about politics. Over seventy years she worked with fifteen British prime ministers, from Winston Churchill to Liz Truss. Many of them later said she was a good listener who remembered everything.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Elizabeth never needed a driving licence or a passport. Licences and passports in Britain were issued in her name, so she did not need one herself. She still loved to drive, and she was known to take foreign guests for fast rides around her estate in Scotland.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'A Horrible Year' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-6'],
          alt: { en: 'Firefighters spraying water on a burning castle at night, flames rising from the roof.' },
          bijschrift: { en: 'Windsor Castle, November 1992: the end of a year she would rather forget.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1992 almost everything went wrong for the royal family. The marriages of three of the Queen\'s four children broke down: her son Andrew separated from his wife Sarah, her daughter Anne divorced, and at the end of the year Charles and his wife Diana announced that they were separating. The newspapers were full of scandals and secret recordings.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Then, on 20 November 1992, a fire broke out at Windsor Castle, her favourite home. It burned for fifteen hours and destroyed more than a hundred rooms. When it turned out that taxpayers would pay for the repairs, many people were angry. Soon afterwards the Queen agreed to pay income tax, and she opened Buckingham Palace to paying visitors to help cover the costs.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: '1992 is not a year on which I shall look back with undiluted pleasure. It has turned out to be an \'annus horribilis\'.' },
          bron: { en: 'Queen Elizabeth II, speech at the Guildhall in London, 24 November 1992' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Death of Diana' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 31 August 1997, Diana was killed in a car crash in Paris. A huge wave of grief swept across Britain. The Queen stayed at Balmoral in Scotland with Diana\'s two young sons, William and Harry, to shield them. But many people saw her silence as coldness, and the newspapers demanded that she come back and show her feelings.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 5 September she returned to London and spoke live on television, something she almost never did. She said that she was speaking \'as your Queen and as a grandmother\', and she paid tribute to Diana. The anger cooled. Elizabeth had learned that even a queen who stood above everything had to show the public that she shared their feelings.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Handshakes and Parachutes' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-7'],
          alt: { en: 'An Olympic stadium at night filled with lights and fireworks, a parachute drifting above it.' },
          bijschrift: { en: 'London 2012: the Queen, apparently, jumped out of a helicopter.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Some of her most important journeys came late in her life. In May 2011 she became the first British monarch to visit the Republic of Ireland since it became independent. At a state dinner in Dublin Castle she opened her speech with a few words in Irish. The Irish president, Mary McAleese, could be seen mouthing \'wow\'.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2012 she shook hands in Belfast with Martin McGuinness, a former commander of the IRA. The IRA had killed Lord Mountbatten, Philip\'s uncle, in 1979. For a Queen who had lost a family member to the violence, it was a gesture of reconciliation that would have been unthinkable a few years before.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Bond, James Bond' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'That same summer, London hosted the Olympic Games. At the opening ceremony, a short film showed the actor Daniel Craig, as James Bond, collecting the Queen from Buckingham Palace. The two flew off by helicopter, and moments later a figure in her pink dress jumped out above the stadium by parachute. Then the real Queen walked in. It was a stunt double in the air, but the Queen had played herself in the film, and she even said her own line: \'Good evening, Mr Bond.\'',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2015,
          tekst: { en: 'Elizabeth becomes the longest-reigning monarch in British history, passing Queen Victoria.' },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Seventy Years' },
      afbeelding: SCENE_IMAGES['elizabeth-ii-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['elizabeth-ii-8'],
          alt: { en: 'Crowds laying flowers outside the gates of a Scottish castle at dusk.' },
          bijschrift: { en: 'Balmoral, September 2022: the end of the longest reign in British history.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 2020, as the coronavirus pandemic shut down the country, the 93-year-old Queen spoke to the nation from Windsor. She remembered her first broadcast during the war and ended with words that echoed a famous wartime song: \'We will meet again.\' Many people found comfort in the calm voice of someone who had seen the country through so much before.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A year later, on 9 April 2021, Prince Philip died at the age of 99. They had been married for 73 years. Because of the pandemic rules, only thirty people were allowed at his funeral, and the Queen sat alone in the chapel, dressed in black. That photo moved people all over the world.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'For her Platinum Jubilee in June 2022, celebrating seventy years on the throne, the Queen filmed a sketch with Paddington Bear. Over tea, the bear offered her a marmalade sandwich from under his hat, and she revealed that she kept one in her handbag too, \'for later\'.' },
        },
        {
          type: 'kop',
          tekst: { en: 'The Last Duty' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 6 September 2022, frail and leaning on a walking stick, she welcomed Liz Truss to Balmoral and asked her to form a government. It was her fifteenth prime minister. Two days later, on 8 September 2022, Queen Elizabeth II died peacefully at Balmoral at the age of 96. She had reigned for seventy years and seven months.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2022,
          tekst: { en: 'Queen Elizabeth II dies at Balmoral. Her son becomes King Charles III.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hundreds of thousands of people queued for up to 24 hours to walk past her coffin in Westminster Hall. Most Britons alive had never known another monarch. She had kept the promise she made in Cape Town as a 21-year-old princess: her life, long as it turned out to be, had been devoted to service.',
          },
        },
      ],
    },
  ],
};

export const popeFrancis: Verhaal = {
  id: 'pope-francis',
  beginJaar: 1936,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Pope Francis' },
  ondertitel: { en: 'The archbishop who took the bus and became the first pope from the Americas' },
  teaser: { en: 'He had worked as a lab technician and a nightclub bouncer, lost part of a lung as a young man, and cooked his own dinner as archbishop. Then, in 2013, white smoke rose over the Vatican. What happens when a man who loves simplicity becomes the leader of 1.3 billion Catholics?' },
  jaar: 2025,
  periodeLabel: '1936 - 2025',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['pope-francis'],
  portretKleur: '#8A7A5C',
  uitgelicht: false,
  volgorde: 5,
  tijdperkId: 'hedendaags',
  themas: ['religie', 'argentinie', 'armoede', 'verzoening'],
  leestijdMinuten: 8,
  personage: { naam: 'Pope Francis' },
  chapters: [
    {
      id: 1,
      titel: { en: 'A Boy from Flores' },
      afbeelding: SCENE_IMAGES['pope-francis-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-1'],
          alt: { en: 'Boys playing football in a dusty street in Buenos Aires in the 1940s.' },
          bijschrift: { en: 'Buenos Aires, the 1940s: the son of Italian immigrants grows up in the barrio of Flores.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Jorge Mario Bergoglio was born on 17 December 1936 in Buenos Aires, the capital of Argentina. He was the eldest of five children. His father, Mario, had come from the north of Italy and worked as an accountant for the railways. His grandmother Rosa, who lived nearby, taught him to pray and told him stories about the old country in Italian dialect.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The family lived in Flores, an ordinary neighbourhood. Jorge loved football and became a lifelong fan of the club San Lorenzo. He also loved tango and literature. At secondary school he trained as a chemical technician and worked in a food laboratory. To earn money he also swept floors and, as he later told a parish audience, once worked as a bouncer at a club.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Day in Spring' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 21 September 1953, the first day of spring in Argentina, the sixteen-year-old Jorge was on his way to meet friends. On an impulse he walked into his parish church and went to confession. Something happened to him there that he could never fully explain. He felt that God had been waiting for him. He knew he would become a priest.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'One Lung and a Calling' },
      afbeelding: SCENE_IMAGES['pope-francis-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-2'],
          alt: { en: 'A young man in a black cassock reading in a sunlit stone cloister.' },
          bijschrift: { en: '1958: after a serious illness, Jorge joins the Jesuits.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the age of 21 he fell seriously ill with pneumonia. Doctors had to remove part of his right lung. For the rest of his life he breathed with less than two full lungs, and he later said that the pain of that illness had taught him something about the suffering of others.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1958 he joined the Society of Jesus, the Jesuits, a Catholic order known for its education and its missionaries. The training was long: years of prayer, study of philosophy and theology, and teaching. He was ordained a priest on 13 December 1969, just before his 33rd birthday.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'As a young teacher of literature at a Jesuit school in Santa Fe, Bergoglio invited the famous writer Jorge Luis Borges to talk to his pupils. Borges came, and he later wrote the introduction to a book of short stories written by the students.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Too Young to Lead' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1973, at only 36, he was made provincial, the leader of all Jesuits in Argentina. It was a heavy job for a young man, and he later admitted that he had made many mistakes. He said he had been too quick, too sure of himself and too authoritarian. He would need many years to learn to listen.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Dark Years' },
      afbeelding: SCENE_IMAGES['pope-francis-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-3'],
          alt: { en: 'Soldiers in a military truck driving through a quiet city street at night under streetlights.' },
          bijschrift: { en: 'Argentina under the dictatorship, 1976-1983: thousands of people disappeared.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1976 the army seized power in Argentina. The military dictatorship waged what it called a \'Dirty War\' against anyone it suspected of left-wing sympathies. Students, union members, journalists and priests were kidnapped, tortured and murdered. Thousands simply disappeared. Their families were never told what had happened to them.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In May 1976 two Jesuit priests who worked in a poor neighbourhood, Orlando Yorio and Francisco Jalics, were kidnapped by the navy and held for five months. Critics later accused Bergoglio of not protecting them enough. He said he had worked behind the scenes for their release, even meeting the leaders of the junta. Years later Jalics said he had made peace with Bergoglio and that he had not betrayed them.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Quiet Help' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Other people later told how Bergoglio had hidden people who were being hunted at a Jesuit college, and had helped some of them escape the country. According to one of them, he even gave a young man who looked like him his own identity papers. He did not talk about it for decades. The dictatorship collapsed in 1983, after Argentina lost the Falklands War.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After his time as leader, the Jesuits sent him away to a quiet house in Córdoba, almost an exile. He later called it a time of great inner crisis. He prayed, he heard confessions and he read. It was there, he said, that he learned humility.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'The Archbishop Who Took the Bus' },
      afbeelding: SCENE_IMAGES['pope-francis-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-4'],
          alt: { en: 'An elderly priest in a dark coat sitting among passengers on a crowded city bus.' },
          bijschrift: { en: 'Buenos Aires, around 2000: the archbishop travelled like everyone else.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1992 he was made a bishop in Buenos Aires, and in 1998 he became archbishop of the city. He could have lived in the grand archbishop\'s residence, with a driver and a cook. Instead he lived in a small flat, cooked his own meals and travelled by bus and underground like everyone else.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He spent much of his time in the villas miserias, the poor slums of the city. He sent more priests to live and work there, and he visited prisons, hospitals and drug rehabilitation centres. He was not a fiery speaker. People who met him described a quiet, serious man who listened more than he spoke.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Cardinal on a Budget' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2001 Pope John Paul II made him a cardinal. Many Argentinians wanted to travel to Rome for the ceremony. Bergoglio asked them to stay at home and give the money they would have spent on the trip to the poor instead.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'When he became a cardinal, Bergoglio did not order expensive new robes. Instead he had the old robes of his predecessor in Buenos Aires altered to fit him.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'White Smoke' },
      afbeelding: SCENE_IMAGES['pope-francis-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-5'],
          alt: { en: 'White smoke rising from a small chimney on the roof of the Sistine Chapel above a huge rainy crowd.' },
          bijschrift: { en: '13 March 2013: Habemus papam, we have a pope.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 2013 Pope Benedict XVI did something no pope had done for almost 600 years: he resigned, saying he was too old and weak to continue. The cardinals of the world gathered in the Sistine Chapel to choose his successor. Bergoglio was 76 and had already bought his return ticket to Buenos Aires.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On the evening of 13 March 2013, on the fifth vote, white smoke rose from the chimney of the chapel. Bergoglio had been elected. He was the first pope from the Americas, the first Jesuit pope, and the first pope from outside Europe in nearly 1,300 years.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2013,
          tekst: { en: 'Jorge Mario Bergoglio is elected pope and takes the name Francis.' },
        },
        {
          type: 'citaat',
          tekst: { en: 'Don\'t forget the poor.' },
          bron: { en: 'Cardinal Cláudio Hummes to Bergoglio as the votes were counted, as Francis later told journalists' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Those words made him think of Saint Francis of Assisi, the medieval saint who gave away everything to live among the poor. No pope had ever taken the name Francis. When he stepped onto the balcony of St Peter\'s, he did not wear the traditional red cape. He simply said \'Buonasera\', good evening, and before giving his blessing he asked the crowd to pray for him.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The next morning the new pope went back to the guesthouse where he had stayed before the vote, picked up his luggage and paid his own bill. He then chose not to live in the papal apartment, but in a simple room in the Vatican guesthouse Casa Santa Marta.' },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'Who Am I to Judge?' },
      afbeelding: SCENE_IMAGES['pope-francis-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-6'],
          alt: { en: 'A white-robed pope throwing a wreath of flowers into the sea from a small boat near an island harbour.' },
          bijschrift: { en: 'Lampedusa, July 2013: his first journey was to the migrants who reach Europe by sea.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His first trip outside Rome as pope was to Lampedusa, a tiny Italian island where thousands of migrants from Africa arrived in overcrowded boats, and where many drowned on the way. In July 2013 he threw a wreath into the sea for the dead and warned against what he called \'the globalisation of indifference\': getting used to the suffering of others.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On a flight back from Brazil that same month, a journalist asked him about gay priests. His answer went around the world: \'If someone is gay and he searches for the Lord and has good will, who am I to judge?\' He did not change the Church\'s official teaching, but no pope had ever spoken in that tone before.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Feet and Forests' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On Holy Thursday, popes traditionally wash the feet of twelve men, as Jesus did for his disciples. Francis went to a youth prison in Rome instead and washed the feet of young inmates, including two girls and a young Muslim. Traditionalists were shocked. In 2015 he wrote a long letter to the world, Laudato si\', about protecting the planet, calling it \'our common home\'.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Bridges, Not Walls' },
      afbeelding: SCENE_IMAGES['pope-francis-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-7'],
          alt: { en: 'A pope in white and an elderly imam in a dark robe and white turban signing a document together at a long table.' },
          bijschrift: { en: 'Abu Dhabi, February 2019: the first pope on the Arabian Peninsula.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Francis saw himself as a bridge-builder. Behind the scenes he helped the United States and Cuba to restore relations after more than fifty years of hostility, and both presidents thanked him publicly in December 2014. In 2015 he became the first pope to speak to the United States Congress.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2019 he became the first pope to visit the Arabian Peninsula, the birthplace of Islam. In Abu Dhabi he and Ahmed el-Tayeb, the Grand Imam of al-Azhar in Cairo, signed a joint document on human fraternity. In 2021, in the middle of the pandemic, he travelled to Iraq and met Grand Ayatollah Ali al-Sistani, one of the most important leaders of Shia Islam.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Grave Errors' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Not everything went well. The Church was shaken by scandals about priests who had abused children, and bishops who had covered it up. In 2018, in Chile, Francis at first defended a bishop who was accused of hiding abuse. After an investigation he admitted that he had made \'grave errors\', apologised to the victims and invited them to the Vatican. Critics said his reforms went too slowly; others felt he was changing far too much.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Last Easter' },
      afbeelding: SCENE_IMAGES['pope-francis-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['pope-francis-8'],
          alt: { en: 'An elderly pope in white sitting alone in an empty, rain-soaked St Peter\'s Square at dusk.' },
          bijschrift: { en: '27 March 2020: a pope prays alone for a world in lockdown.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 27 March 2020, as the coronavirus spread across the world, Francis prayed alone in the vast, empty, rain-soaked St Peter\'s Square. Millions watched on television. \'We are all in the same boat,\' he said, \'all of us fragile and disoriented.\' It became one of the defining images of the pandemic.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His health grew weaker. He had surgery, and from 2022 he often used a wheelchair. In February 2025 he was taken to hospital with pneumonia in both lungs and stayed there for more than five weeks. Doctors later said that at one point he had nearly died.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Easter Monday' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On Easter Sunday, 20 April 2025, the frail pope appeared on the balcony of St Peter\'s to bless the crowd, and then rode through the square in his open car to greet the people one last time. The next morning, Easter Monday, 21 April 2025, he died of a stroke at the age of 88.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2025,
          tekst: { en: 'Pope Francis dies on Easter Monday, a day after his last Easter blessing.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He had asked for a simple funeral. He was buried not in St Peter\'s but in the basilica of Santa Maria Maggiore in Rome, in a plain tomb with a single word on it: Franciscus. Among those who welcomed his coffin were the poor and homeless of the city. It was the kind of company he had always preferred.',
          },
        },
      ],
    },
  ],
};

export const wangariMaathai: Verhaal = {
  id: 'wangari-maathai',
  beginJaar: 1940,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Wangari Maathai' },
  ondertitel: { en: 'The woman who fought a dictator with tree seedlings' },
  teaser: { en: 'A president called her a madwoman. Police beat her unconscious. Her husband divorced her for being too strong. And all the while she kept planting trees, millions of them. How can a seedling become a weapon for democracy?' },
  jaar: 2011,
  periodeLabel: '1940 - 2011',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['wangari-maathai'],
  portretKleur: '#4F7A3A',
  uitgelicht: false,
  volgorde: 6,
  tijdperkId: 'hedendaags',
  themas: ['kenia', 'milieu', 'vrouwenrechten', 'democratie'],
  leestijdMinuten: 6,
  personage: { naam: 'Wangari Maathai' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Fig Tree' },
      afbeelding: SCENE_IMAGES['wangari-maathai-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-1'],
          alt: { en: 'A girl carrying a clay water pot walking past a huge fig tree beside a clear stream in green hills.' },
          bijschrift: { en: 'Ihithe, Kenya, the 1940s: a stream, a sacred tree and a girl who watched frogs.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Wangari Muta was born on 1 April 1940 in the village of Ihithe, in the green highlands of central Kenya, then a British colony. Her family were Kikuyu farmers. As a little girl she was sent to fetch water from a stream near a huge fig tree. Her mother told her never to pick up firewood near it or cut it: the fig tree was sacred.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Wangari loved that stream. She tried to catch the frogspawn, thinking the eggs were beads to make a necklace, and watched them turn into tadpoles. Years later she understood why the tree mattered: its roots held the soil together and helped to keep the water clean and flowing.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Brother\'s Question' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In those days few girls in rural Kenya went to school. When Wangari was about eight, her older brother asked their mother why his sister did not go to school like him. Her mother had no good answer and sent her. Wangari turned out to be an outstanding pupil and finished top of her class at a Catholic girls\' school.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Kennedy Airlift' },
      afbeelding: SCENE_IMAGES['wangari-maathai-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-2'],
          alt: { en: 'Young African students in their best clothes climbing the steps of a propeller plane in 1960.' },
          bijschrift: { en: '1960: hundreds of young Kenyans fly to America to study.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Kenya was on the road to independence, and it would need educated leaders. In 1960 a programme known as the \'Kennedy Airlift\', supported by a foundation of the Kennedy family, flew hundreds of promising young East Africans to American universities. Wangari was one of them.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She studied biology at a small Catholic college in Atchison, Kansas, and then took a master\'s degree at the University of Pittsburgh. America in the 1960s was full of protest: the civil rights movement was fighting for the rights of Black Americans. Wangari watched closely. She saw that ordinary people could organise themselves and change their country.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Job That Vanished' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1966 she returned to Kenya, which had become independent in 1963. A job at the university had been promised to her. When she arrived, it had been given to a man from another ethnic group. She was convinced it was because she was a woman and because of her background. It was not the last time she would run into that wall.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Doctor Maathai' },
      afbeelding: SCENE_IMAGES['wangari-maathai-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-3'],
          alt: { en: 'A young African woman scientist looking through a microscope in a 1970s university laboratory.' },
          bijschrift: { en: 'Nairobi, 1971: the first woman in East and Central Africa with a doctorate.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She found work at the University of Nairobi in veterinary anatomy, the study of the bodies of animals. She also studied in Germany. In 1971 she earned her doctorate. She was the first woman in East and Central Africa to do so.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1971,
          tekst: { en: 'Wangari Maathai becomes the first woman in East and Central Africa to earn a PhD.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She rose quickly. She became head of her department and later associate professor, again the first woman in those positions at the university. When she discovered that women on the staff received fewer benefits than men, she fought for equal treatment and won.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Family Life' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1969 she married Mwangi Mathai, a politician, and they had three children: Waweru, Wanjira and Muta. While she taught at the university, she went with her husband to his constituency and listened to the people there. What she heard from the women in the countryside would change her life.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Seven Trees' },
      afbeelding: SCENE_IMAGES['wangari-maathai-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-4'],
          alt: { en: 'Village women planting small tree seedlings in neat rows on a bare red-earth hillside.' },
          bijschrift: { en: 'From 1977: the Green Belt Movement, one seedling at a time.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The women told her about their problems. The streams were drying up. They had to walk further and further for firewood. Their soil was washing away, and there was not enough to eat. Wangari realised that it was all connected: the forests had been cut down, and without trees, the land was dying.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her answer was simple: plant trees. On 5 June 1977, World Environment Day, she planted seven trees in a park in Nairobi in honour of seven women and men who had served their communities. It was the start of what became the Green Belt Movement. Women grew seedlings in nurseries and planted them, and for every tree that survived they received a small payment.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Foresters Without Diplomas' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Government foresters said that planting trees was work for trained experts. Wangari disagreed. The women had been growing food all their lives; they could grow trees too. She called them \'foresters without diplomas\'. The idea spread from village to village, and later to other countries in Africa.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'According to the Green Belt Movement, its members have planted more than 50 million trees in Kenya since 1977.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Too Strong' },
      afbeelding: SCENE_IMAGES['wangari-maathai-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-5'],
          alt: { en: 'A determined woman in a 1970s dress walking out of a colonial-style courthouse past reporters.' },
          bijschrift: { en: '1979: she lost her marriage, her savings and briefly her freedom, but kept her name, with an extra a.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the late 1970s her marriage fell apart. In the divorce case, her husband said that she was too educated, too strong, too successful, too stubborn and too hard to control. The judge granted the divorce. When Wangari said in a magazine interview that the judge must have been either incompetent or corrupt, she was sent to prison for contempt of court.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She spent a few days behind bars. Afterwards her ex-husband\'s lawyer demanded that she stop using his surname. She refused to give up the name she was known by. Instead she added an extra \'a\': Mathai became Maathai.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Starting Over' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1982 she resigned from the university to stand for parliament. At the last moment she was disqualified on a technicality, and the university refused to give her job back. She had lost her income and the house that came with the job. With little money and three children, she threw herself completely into the Green Belt Movement.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Park and the Tower' },
      afbeelding: SCENE_IMAGES['wangari-maathai-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-6'],
          alt: { en: 'A green city park with a lake and trees in front of a skyline of office towers.' },
          bijschrift: { en: 'Uhuru Park, Nairobi, 1989: one woman against a 60-storey skyscraper.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Kenya was ruled by President Daniel arap Moi, who allowed only one political party and did not tolerate criticism. In 1989 his party announced a plan to build a 60-storey skyscraper in Uhuru Park, the biggest public park in the centre of Nairobi, with a giant statue of the president next to it.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Wangari wrote letters to the government, to the newspapers and to the foreign banks that were going to pay for it. In parliament, men stood up to mock her. They called her a madwoman and said that a proper African woman should respect men. The Green Belt Movement was thrown out of its government offices.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1990,
          tekst: { en: 'The foreign investors pull out and the skyscraper in Uhuru Park is cancelled.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But the publicity worked. The foreign investors withdrew, and the tower was never built. Uhuru Park is still a park today. For many Kenyans it was the first time they had seen someone stand up to the president and win.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Freedom Corner' },
      afbeelding: SCENE_IMAGES['wangari-maathai-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-7'],
          alt: { en: 'A group of elderly women sitting together under a tree in a city park, holding protest signs.' },
          bijschrift: { en: 'Nairobi, 1992: mothers on hunger strike for their imprisoned sons.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her fight for the environment became a fight for democracy. In 1992 she joined a group of mothers whose sons were in prison for their political views. They set up camp in a corner of Uhuru Park, which they named Freedom Corner, and went on hunger strike.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After a few days the police came to break up the protest. Wangari was beaten unconscious and taken to hospital. Some of the mothers stripped off their clothes in protest, a powerful traditional curse on the men who attacked them. The mothers moved into a nearby church and kept up their protest for months, and the prisoners were later released.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Into Parliament' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2002 Moi finally stepped down, and Kenya held free elections. Wangari stood in her home region and was elected to parliament with 98 percent of the vote. The new government made her deputy minister for the environment: the woman who had once been called a madwoman was now in charge of protecting Kenya\'s forests.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'The Hummingbird' },
      afbeelding: SCENE_IMAGES['wangari-maathai-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['wangari-maathai-8'],
          alt: { en: 'A tiny hummingbird hovering in front of a burning forest with a drop of water in its beak.' },
          bijschrift: { en: '2004: the first African woman to win the Nobel Peace Prize.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 8 October 2004 she received a phone call: she had been awarded the Nobel Peace Prize, \'for her contribution to sustainable development, democracy and peace\'. She was the first African woman to win it, and the first person to win it for work on the environment. She celebrated the way she knew best: by planting a tree.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2004,
          tekst: { en: 'Wangari Maathai wins the Nobel Peace Prize.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Doing the Best I Can' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She liked to tell a story. A great fire breaks out in the forest. All the animals flee and stand watching, feeling helpless. Only a little hummingbird flies to the stream again and again, carrying a single drop of water in its beak to drop on the fire. The other animals laugh: what can you do, you are so small? The hummingbird answers: \'I am doing the best I can.\' That, she said, was all anyone could do.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Wangari Maathai died of cancer on 25 September 2011, at the age of 71. She had asked that no tree be cut down for her coffin. She was cremated in a coffin woven from bamboo, papyrus and water hyacinth. The woman who had started with seven trees left behind a movement that had planted tens of millions.',
          },
        },
      ],
    },
  ],
};

export const stephenHawking: Verhaal = {
  id: 'stephen-hawking',
  beginJaar: 1942,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Stephen Hawking' },
  ondertitel: { en: 'The scientist who was given two years to live, and explored the universe for fifty more' },
  teaser: { en: 'At 21 he was told he had a disease that would kill him within two years. He could soon barely move or speak. Yet from a wheelchair he proved that black holes glow, wrote a bestseller and floated weightless at 65. How do you unlock the secrets of the universe when your own body is locked?' },
  jaar: 2018,
  periodeLabel: '1942 - 2018',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['stephen-hawking'],
  portretKleur: '#3A4A6A',
  uitgelicht: false,
  volgorde: 7,
  tijdperkId: 'hedendaags',
  themas: ['wetenschap', 'heelal', 'natuurkunde', 'doorzetten'],
  leestijdMinuten: 7,
  personage: { naam: 'Stephen Hawking' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Born on Galileo\'s Day' },
      afbeelding: SCENE_IMAGES['stephen-hawking-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-1'],
          alt: { en: 'Teenage boys building a home-made computer from old telephone parts on a cluttered table in the 1950s.' },
          bijschrift: { en: 'St Albans, 1958: a computer made from clock parts and an old telephone exchange.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stephen William Hawking was born on 8 January 1942 in Oxford, exactly 300 years after the death of Galileo Galilei. He liked to point that out, although he admitted that about 200,000 other babies were born on the same day. His father Frank was a researcher in tropical diseases, and his mother Isobel had studied at Oxford, which was unusual for a woman of her time.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The Hawkings were an eccentric family. They lived in a big, rather shabby house in St Albans, north of London. At dinner everyone read a book in silence. Stephen was not a star pupil; for a long time his marks were average and his handwriting was terrible. But his school friends gave him a nickname: \'Einstein\'.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'At sixteen, Stephen and his friends built a simple computer out of recycled parts, including pieces of a clock and an old telephone switchboard. They called it LUCE. It could solve basic mathematical problems.' },
        },
        {
          type: 'kop',
          tekst: { en: 'An Hour a Day' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At seventeen he went to University College, Oxford, to study physics. He found the work so easy that, by his own estimate, he studied about an hour a day. He spent much of his time with the rowing club, where he was the cox: the small person who sits at the back of the boat and steers.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Two Years to Live' },
      afbeelding: SCENE_IMAGES['stephen-hawking-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-2'],
          alt: { en: 'A young man with glasses sitting alone on a bench in a hospital corridor, staring at the floor.' },
          bijschrift: { en: '1963: a diagnosis that should have been the end of the story.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In his final exam at Oxford he scored on the border between a first-class and a second-class degree, so he had to face an oral exam. He told the examiners that with a first he would go to Cambridge, and with a second he would stay in Oxford. He got his first, and in 1962 he began a doctorate in cosmology at Cambridge: the study of the universe as a whole.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'But something was wrong. He became clumsy, tripped over and slurred his words. While ice-skating with his mother, he fell and could not get up. In 1963, just after his 21st birthday, doctors told him that he had motor neurone disease, also known as ALS. The nerves that control the muscles slowly die. They expected him to live for about two more years.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1963,
          tekst: { en: 'Stephen Hawking is diagnosed with motor neurone disease and given two years to live.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Reason to Work' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At first he sank into depression. Why finish a doctorate if you will not live to see it? Then two things happened. The disease progressed more slowly than expected. And he fell in love with Jane Wilde, a student of languages he had met at a party. They got engaged, and he later said that this gave him something to live for. To marry, he needed a job, and to get a job, he needed to finish his doctorate.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Beginning of Time' },
      afbeelding: SCENE_IMAGES['stephen-hawking-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-3'],
          alt: { en: 'An artist\'s view of the universe exploding outward from a single brilliant point of light.' },
          bijschrift: { en: 'If the universe is expanding, it must once have been squeezed into a single point.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Jane and Stephen married in July 1965. In his doctoral thesis, completed in 1966, Hawking took an idea from the mathematician Roger Penrose about collapsing stars and turned it around. Penrose had shown that a dying star can collapse into a point of infinite density: a singularity. Hawking reasoned that if you ran the film of our expanding universe backwards, the whole universe must have begun in such a point.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Together, Penrose and Hawking showed that, if Einstein\'s theory of gravity was correct, the universe had a beginning. It was strong support for what we now call the Big Bang. Time itself, Hawking argued, had begun at that moment.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Working in His Head' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As his hands weakened, writing out long equations became impossible. So he learned to think in pictures and shapes, holding entire calculations in his head. Colleagues were amazed at how he could see the answer to a problem before anyone had worked it out on paper. By the late 1960s he walked with crutches, and soon he needed a wheelchair.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Black Holes Are Not So Black' },
      afbeelding: SCENE_IMAGES['stephen-hawking-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-4'],
          alt: { en: 'A black hole surrounded by a glowing ring of light, faint particles escaping from its edge.' },
          bijschrift: { en: '1974: the discovery that made his name. Black holes slowly glow and evaporate.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A black hole is what remains when a huge star collapses. Its gravity is so strong that nothing can escape it, not even light. That is why it is black. For decades, physicists thought that black holes could only grow, swallowing everything that came too close.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hawking combined two great theories that usually did not work together: Einstein\'s relativity, which describes the very large, and quantum mechanics, which describes the very small. To his own surprise, his calculations showed that black holes should give off a faint glow of radiation. Slowly, over an unimaginably long time, they would lose energy and evaporate.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1974,
          tekst: { en: 'Hawking announces that black holes give off radiation, now called Hawking radiation.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When he presented his result at a conference in 1974, the chairman reportedly called it absolute nonsense. But other physicists checked the calculations and found that he was right. That same year, at 32, he was elected a Fellow of the Royal Society, one of the youngest ever. The radiation is now called Hawking radiation.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Hawking liked to bet on science. In 1975 he bet his friend, the physicist Kip Thorne, that a famous object in space called Cygnus X-1 was not a black hole, even though his own work depended on black holes existing. He called it an insurance policy. In 1990 he admitted he had lost.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Newton\'s Chair' },
      afbeelding: SCENE_IMAGES['stephen-hawking-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-5'],
          alt: { en: 'An old wood-panelled Cambridge lecture hall with tiered benches and a portrait of Isaac Newton on the wall.' },
          bijschrift: { en: 'Cambridge, 1979: the professorship once held by Isaac Newton.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1979 Hawking was appointed Lucasian Professor of Mathematics at Cambridge, one of the most famous academic posts in the world. Isaac Newton had held the same chair three centuries earlier. Hawking kept it for thirty years, until 2009.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By now he could hardly move. His speech had become so slurred that only his family and his closest students could understand him; they translated his words for others. His students took turns living with the family and helping him, in return for free lodging and the chance to work with one of the greatest minds in physics.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Never Giving In' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hawking refused to be treated as a patient. He drove his electric wheelchair at reckless speed through the streets of Cambridge, was said to run over the toes of people he did not like, and went to every conference he could. He had three children with Jane: Robert, Lucy and Tim. \'My goal is simple,\' he once said. \'It is a complete understanding of the universe.\'',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'A Voice from a Machine' },
      afbeelding: SCENE_IMAGES['stephen-hawking-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-6'],
          alt: { en: 'A man in a wheelchair with a small computer screen and a speaker attached, a hand clicker in his hand.' },
          bijschrift: { en: '1985: he lost his voice, and gained the most famous voice in science.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1985, during a visit to Geneva, Hawking caught a severe pneumonia. He was put on a breathing machine, and the doctors asked Jane whether they should switch it off. She refused. To save his life, the surgeons cut an opening in his windpipe. He survived, but he could never speak again.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At first he could only communicate by raising his eyebrows when someone pointed at the right letter on a card. Then an American computer expert sent him a program that let him choose words from a screen with a hand clicker, and a speech synthesizer that spoke them aloud. He could produce about fifteen words a minute.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'An American Accent' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The computer voice had an American accent and sounded like a robot. Later, much better voices became available, but Hawking refused to change. He said the voice had become part of his identity. When his cheek muscle was the last one he could still control, engineers built him a sensor in his glasses so he could keep typing with tiny twitches.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'A Brief History' },
      afbeelding: SCENE_IMAGES['stephen-hawking-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-7'],
          alt: { en: 'A shop window piled high with copies of a popular science book with a starry cover.' },
          bijschrift: { en: '1988: a book about the universe that millions of people bought.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Hawking wanted ordinary people to understand where the universe came from. He also needed money for his care and his children\'s school fees. In 1988 he published A Brief History of Time. His editor warned him that every equation in the book would halve the number of readers, so he included just one: Einstein\'s E = mc².',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The book was a sensation. It stayed on the British bestseller list for more than four years and sold more than ten million copies. Many people admitted they never finished it, but Hawking did not mind. He had become the most famous scientist in the world.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Star of Television' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He loved the fame and had a great sense of humour. He appeared as himself in The Simpsons and in Star Trek, where he played poker with holograms of Isaac Newton and Albert Einstein. His private life was harder: in 1990 he and Jane separated after 25 years of marriage, worn down by the strain of his illness.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Look Up at the Stars' },
      afbeelding: SCENE_IMAGES['stephen-hawking-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['stephen-hawking-8'],
          alt: { en: 'A man floating weightless inside the padded cabin of an aircraft, smiling, with helpers around him.' },
          bijschrift: { en: '2007: free of his wheelchair, for a few seconds at a time.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In April 2007, at the age of 65, Hawking flew on a special aircraft that climbs and dives to create short periods of weightlessness. For the first time in almost forty years he floated free of his wheelchair. He even did somersaults. \'Space, here I come!\' he said afterwards.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'In 2009 Hawking threw a party for time travellers, with champagne and balloons. He only sent out the invitations after the party had taken place. Nobody came, which he jokingly presented as experimental evidence that time travel is impossible.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Between Newton and Darwin' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Stephen Hawking died peacefully at his home in Cambridge on 14 March 2018, at the age of 76. He had lived more than fifty years longer than his doctors had predicted. By coincidence, it was the birthday of Albert Einstein.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His ashes were laid to rest in Westminster Abbey, between the graves of Isaac Newton and Charles Darwin. His memorial stone carries the formula for the temperature of a black hole: his discovery, engraved in stone. His words were beamed into space towards the nearest black hole.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Remember to look up at the stars and not down at your feet.' },
          bron: { en: 'Stephen Hawking, advice he often gave' },
        },
      ],
    },
  ],
};

export const angelaMerkel: Verhaal = {
  id: 'angela-merkel',
  beginJaar: 1954,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Angela Merkel' },
  ondertitel: { en: 'The physicist from East Germany who led Europe through sixteen years of crises' },
  teaser: { en: 'She grew up behind the Iron Curtain, studied quantum chemistry and went to the sauna on the night the Berlin Wall fell. Fifteen years later she was the most powerful woman in the world. How does a quiet scientist from a country that no longer exists end up running Europe\'s biggest economy?' },
  jaar: 2021,
  periodeLabel: '1954 - Present',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['angela-merkel'],
  portretKleur: '#5A6478',
  uitgelicht: false,
  volgorde: 8,
  tijdperkId: 'hedendaags',
  themas: ['duitsland', 'europa', 'politiek', 'koude-oorlog'],
  leestijdMinuten: 7,
  personage: { naam: 'Angela Merkel' },
  chapters: [
    {
      id: 1,
      titel: { en: 'The Pastor\'s Daughter' },
      afbeelding: SCENE_IMAGES['angela-merkel-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-1'],
          alt: { en: 'A small girl in a knitted cardigan standing in front of a brick village church in East Germany in the 1960s.' },
          bijschrift: { en: 'Templin, East Germany: a family that moved the wrong way across the border.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Angela Dorothea Kasner was born on 17 July 1954 in Hamburg, in West Germany. A few weeks later her family did something very unusual. While hundreds of thousands of people were fleeing from communist East Germany to the West, her father, a Lutheran pastor named Horst Kasner, moved his family the other way. The church needed pastors in the East.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Angela grew up in Templin, a small town north of Berlin, in the German Democratic Republic (GDR). Her mother was an English teacher, but the communist state would not let a pastor\'s wife teach in its schools. In 1961, when Angela was seven, the GDR built the Berlin Wall. The border was closed. She would spend the next 28 years behind it.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Top of the Class' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Children of pastors were viewed with suspicion by the state, so Angela learned early to be careful about what she said. At school she was brilliant, especially in mathematics and Russian. She won a national Russian-language competition, and the prize was a trip to Moscow. Like most young people, she joined the official communist youth organisation, the FDJ.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'The Physicist' },
      afbeelding: SCENE_IMAGES['angela-merkel-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-2'],
          alt: { en: 'A young woman scientist working at a desk covered with papers and formulas in a plain 1980s East German laboratory.' },
          bijschrift: { en: 'East Berlin, the 1980s: a quantum chemist at the Academy of Sciences.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In the GDR, science was one of the few fields where you could work without constantly having to repeat the party line. Angela studied physics at the University of Leipzig from 1973. There she met a fellow student, Ulrich Merkel. They married in 1977 and divorced a few years later, but she kept his surname.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'She went to work at the Academy of Sciences in East Berlin and earned her doctorate in 1986 with a study in quantum chemistry: how atoms behave during chemical reactions. Colleagues remembered her as clever and hard-working. At the Academy she met the chemist Joachim Sauer, whom she married in 1998.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Merkel has told the story of a swimming lesson at school when she climbed onto the three-metre diving board and could not make herself jump. She stood there for almost the whole lesson, and only jumped just before the bell rang. She later joked that it showed she was not very brave, but that she got there in the end.' },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Night the Wall Fell' },
      afbeelding: SCENE_IMAGES['angela-merkel-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-3'],
          alt: { en: 'Crowds of people climbing on top of the Berlin Wall at night, cheering and waving.' },
          bijschrift: { en: '9 November 1989: first the sauna, then the West.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1989 the people of East Germany began to protest in their thousands. On the evening of 9 November, a government spokesman announced by mistake that the border was open, \'immediately\'. Angela Merkel heard the news and did what she always did on Thursday evenings: she went to the sauna with a friend.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Afterwards she joined the crowds streaming towards the border crossing at Bornholmer Strasse and walked into West Berlin. She ended up in the flat of a family she did not know, drinking a can of beer. Then she went home, because she had to work the next morning.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1989,
          tekst: { en: 'The Berlin Wall falls. Merkel walks into West Berlin for the first time.' },
        },
        {
          type: 'kop',
          tekst: { en: 'From Lab to Politics' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Within weeks she joined a new political group, Democratic Awakening, and became its spokesperson. In 1990 she worked as deputy spokesperson for the last government of the GDR, the only one ever chosen in a free election. On 3 October 1990 East and West Germany were reunited, and in December she was elected to the parliament of the new, united Germany.',
          },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Kohl\'s Girl' },
      afbeelding: SCENE_IMAGES['angela-merkel-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-4'],
          alt: { en: 'A tall heavy-set older chancellor and a young woman minister standing side by side at a press conference in the 1990s.' },
          bijschrift: { en: 'The 1990s: the chancellor\'s protégée, until she turned against him.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Chancellor Helmut Kohl, the man who had reunited Germany, wanted a woman from the East in his government. In 1991 he made the 36-year-old Merkel minister for women and youth. He called her \'mein Mädchen\', my girl. Many people underestimated her: she was quiet, she wore no make-up, and she did not like long speeches.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1994 she became minister for the environment. In 1995 she chaired the first United Nations climate conference in Berlin, where countries agreed to start negotiating limits on greenhouse gases. It was hard, slow work, and Merkel was good at it: she read every document, knew every detail and kept talking until there was a deal.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Breaking with Her Mentor' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1999 a scandal broke: Kohl\'s party, the Christian Democratic Union (CDU), had accepted secret donations, and Kohl refused to name the donors. While other party leaders kept silent, Merkel wrote an article in a major newspaper saying that the party had to move on without him. It was a shock. A few months later, in April 2000, she was elected leader of the CDU, the first woman in that position.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Madam Chancellor' },
      afbeelding: SCENE_IMAGES['angela-merkel-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-5'],
          alt: { en: 'A woman taking the oath of office in the modern glass-domed German parliament building.' },
          bijschrift: { en: '22 November 2005: the first woman to lead Germany.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'After the election of 2005, Merkel became chancellor at the head of a coalition with her party\'s great rivals, the Social Democrats. On 22 November 2005 she was sworn in. She was the first woman to lead Germany, the first chancellor from the former East, and at 51 the youngest chancellor the country had ever had.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2005,
          tekst: { en: 'Angela Merkel becomes Germany\'s first female chancellor.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her style was the opposite of dramatic. She thought problems through step by step, like a scientist, and rarely made big promises. Germans began to call her \'Mutti\', mum, half in affection and half in mockery. In 2008, when the global financial crisis struck, she and her finance minister went on television to promise that Germans\' savings were safe, to prevent a run on the banks.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Euro Crisis' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'From 2010, Greece and other countries that used the euro could no longer pay their debts. As the leader of Europe\'s largest economy, Merkel was at the centre of every negotiation. Germany helped to lend hundreds of billions, but only on condition of harsh budget cuts. In Greece, protesters burned her picture. Others credited her with saving the euro.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'We Can Do This' },
      afbeelding: SCENE_IMAGES['angela-merkel-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-6'],
          alt: { en: 'Refugees with backpacks arriving at a busy train station platform, greeted by volunteers holding signs.' },
          bijschrift: { en: 'Munich, September 2015: trains full of refugees, and crowds waiting to welcome them.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2015 hundreds of thousands of people fled the war in Syria and conflicts in Afghanistan, Iraq and elsewhere, many of them walking across the Balkans towards Germany. On 31 August Merkel told a press conference that Germany was strong enough to handle it.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Wir schaffen das. (We can do this.)' },
          bron: { en: 'Angela Merkel, press conference in Berlin, 31 August 2015' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'A few days later, thousands of refugees were stuck at the main railway station in Budapest. Merkel decided not to close the border. Trains carried them to Germany, where crowds at Munich station welcomed them with food and toys. In 2015 alone, around 890,000 asylum seekers arrived in Germany.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Praise and Anger' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Time magazine named her Person of the Year. But the decision also divided Germany and Europe. Critics said she had acted alone, and that the country could not cope. A new anti-immigration party, the AfD, grew rapidly. Merkel did not change her mind, but her government later made the asylum rules stricter and struck a deal with Turkey to reduce the number of arrivals.',
          },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'The Crisis Manager' },
      afbeelding: SCENE_IMAGES['angela-merkel-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-7'],
          alt: { en: 'World leaders around a negotiating table late at night, coffee cups and papers everywhere.' },
          bijschrift: { en: 'Nuclear power, Russia, a pandemic: one crisis after another.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In March 2011 an earthquake and tsunami caused a nuclear disaster at Fukushima in Japan. Merkel, a physicist who had long supported nuclear power, changed course within days. Germany would close all its nuclear power stations. The last three were switched off in 2023.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'When Russia seized Crimea from Ukraine in 2014, Merkel, who spoke Russian, became the Western leader who talked most often with President Vladimir Putin. She pushed for sanctions and helped to negotiate the Minsk agreements to stop the fighting in eastern Ukraine. At the same time Germany kept buying large amounts of Russian gas. After Russia invaded all of Ukraine in 2022, many people criticised that choice sharply.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'The Scientist Explains' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In March 2020, as the coronavirus spread, Merkel gave a rare television address and called the pandemic the greatest challenge for Germany since the Second World War. In a press conference she calmly explained the mathematics of infection rates: if each sick person infected just a few more people, hospitals would quickly be overwhelmed. Clips of the physicist explaining the numbers went around the world.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Sixteen Years' },
      afbeelding: SCENE_IMAGES['angela-merkel-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['angela-merkel-8'],
          alt: { en: 'A military band with torches playing at night in a courtyard during a farewell ceremony.' },
          bijschrift: { en: 'December 2021: a torchlight farewell, with a punk song from the GDR.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2018 Merkel announced that she would not stand for chancellor again. When she left office on 8 December 2021, she had led Germany for sixteen years, almost exactly as long as her old mentor Helmut Kohl. She had worked with four American presidents, four French presidents and five British prime ministers.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'At her farewell ceremony with the army, Merkel was allowed to choose the music. One of her choices was \'Du hast den Farbfilm vergessen\' (\'You forgot the colour film\'), a cheeky 1970s punk-pop song by the East German singer Nina Hagen, about a holiday that can only be remembered in black and white.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Mixed Legacy' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Her admirers saw her as a steady, honest leader who kept Europe together through one crisis after another. Her critics said she managed problems instead of solving them, left Germany too dependent on Russian gas, and avoided necessary reforms. In 2024 she published her memoirs under a one-word title: Freedom. It was the thing, she wrote, that she had longed for most behind the Wall.',
          },
        },
      ],
    },
  ],
};

export const timBernersLee: Verhaal = {
  id: 'tim-berners-lee',
  beginJaar: 1955,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Tim Berners-Lee' },
  ondertitel: { en: 'The man who invented the World Wide Web, and gave it away for free' },
  teaser: { en: 'His boss wrote two words on his proposal: \'vague but exciting\'. Two years later the first website went online from a computer with a handwritten note saying DO NOT POWER IT DOWN. He could have become one of the richest people on Earth. Why did he give his invention away?' },
  jaar: 2017,
  periodeLabel: '1955 - Present',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['tim-berners-lee'],
  portretKleur: '#2F5D7A',
  uitgelicht: false,
  volgorde: 9,
  tijdperkId: 'hedendaags',
  themas: ['technologie', 'internet', 'uitvindingen', 'vrijheid'],
  leestijdMinuten: 6,
  personage: { naam: 'Tim Berners-Lee' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Parents Who Built Computers' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-1'],
          alt: { en: 'A boy building a model railway with homemade electronic switches on the floor of a 1960s living room.' },
          bijschrift: { en: 'London, the 1960s: a model railway, a soldering iron and a curious boy.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Timothy John Berners-Lee was born on 8 June 1955 in London. Computers were in his family from the start. His parents, Conway Berners-Lee and Mary Lee Woods, were mathematicians who had worked on the Ferranti Mark 1, one of the first computers that was ever sold. At the dinner table, they talked about how computers might one day help people think.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As a boy Tim loved trains. He built a model railway and made electronic gadgets to control it. That was how he first learned about electronics. At Queen\'s College, Oxford, he studied physics and graduated with first-class honours in 1976.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'As a student at Oxford, Berners-Lee built his own computer from a soldering iron, some electronic parts, a microprocessor and an old television set as the screen.' },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'A Program Called Enquire' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-2'],
          alt: { en: 'The vast underground tunnel of a particle accelerator lined with blue and red magnets.' },
          bijschrift: { en: 'CERN, near Geneva: thousands of scientists, and nobody could find anything.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1980 Berners-Lee went to work for a few months at CERN, the European laboratory for particle physics near Geneva in Switzerland. Thousands of scientists from all over the world worked there, on different computers that could not talk to each other. Finding out who was working on what, and where the information was, was a constant struggle.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'To help his own memory, he wrote a program called Enquire. In it he could make pages about people, projects and programs and connect them with links, a bit like the way the brain connects ideas. Enquire only ran on one computer. But the idea of linking pieces of information stayed with him.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Back to CERN' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1984 he returned to CERN for a permanent job. By now there was the internet: a network that connected computers at universities and laboratories around the world. You could send files and messages over it, but it was hard to use and you had to know exactly where everything was. Berners-Lee wondered: what if every document on every computer could be linked to every other?',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'Vague but Exciting' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-3'],
          alt: { en: 'A typed document on a desk with a short handwritten note scribbled across the top.' },
          bijschrift: { en: 'March 1989: the proposal that started the Web.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In March 1989 Berners-Lee wrote a proposal with the dull title \'Information Management: A Proposal\'. In it he described a system of documents connected by links, which anyone could read and add to, from any computer. It was full of diagrams with circles and arrows.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'Vague but exciting.' },
          bron: { en: 'Mike Sendall, his boss at CERN, in a note on the cover of the proposal, 1989' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His boss, Mike Sendall, did not officially approve the project, but he did not reject it either. A year later he let Berners-Lee buy a new computer and gave him time to experiment. It was enough.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1989,
          tekst: { en: 'Tim Berners-Lee proposes the system that will become the World Wide Web.' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Do Not Power It Down' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-4'],
          alt: { en: 'A black cube-shaped computer on a desk with a small handwritten sticker on its side.' },
          bijschrift: { en: 'CERN, 1990: the first web server in the world.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The computer he bought was a NeXT, a sleek black cube made by the company that Steve Jobs had started after he was pushed out of Apple. In the autumn of 1990 Berners-Lee wrote, almost on his own, everything the Web needed: a language for writing pages (HTML), a way for computers to send them (HTTP), an address for every page (the URL), the first web server, and the first web browser, which he called WorldWideWeb.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'By Christmas 1990 the first website was running at CERN. It explained what the World Wide Web was and how to use it. That NeXT computer was the entire Web. On its side was a sticker with a handwritten warning in red: \'This machine is a server. DO NOT POWER IT DOWN!!\'',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Out Into the World' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 6 August 1991 Berners-Lee posted a short message on an online discussion group, explaining the project and inviting people to try it. Slowly, scientists at other universities set up their own web servers. By the end of 1992 there were a few dozen websites in the world.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The first website ever made, at the address info.cern.ch, still exists. CERN restored it in 2013 so that people can see what the Web looked like at the very beginning: plain black text on a white background, with blue links.' },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'Giving It Away' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-5'],
          alt: { en: 'A crowded 1990s computer room full of people at beige computers, all looking at web pages.' },
          bijschrift: { en: '1993: CERN makes the Web free for everyone, forever.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Berners-Lee could have patented his invention and charged money for every web server or browser. Some other systems at the time did exactly that. He believed that would kill the Web: if people had to pay to use it, it would never grow into something that connected everyone.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He persuaded CERN to give the Web away. On 30 April 1993 CERN published a statement putting the Web\'s software in the public domain: anyone could use it, change it and build on it, for free, without asking permission. The same year, a browser called Mosaic made it easy to show pictures on web pages. The Web exploded.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 1993,
          tekst: { en: 'CERN makes the World Wide Web free for anyone to use.' },
        },
        {
          type: 'kop',
          tekst: { en: 'Guardian of the Rules' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1994 he moved to the Massachusetts Institute of Technology in the United States and founded the World Wide Web Consortium, W3C. Its job was to agree on common standards, so that a web page would work in every browser and on every computer, and no single company could take the Web over. In 2004 Queen Elizabeth II made him a knight: Sir Tim.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Web Takes Over' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-6'],
          alt: { en: 'A busy late-1990s office full of young people at computers, cardboard boxes and a dog under a desk.' },
          bijschrift: { en: 'The late 1990s: suddenly everyone wanted a website.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'At the start of 1993 there were around fifty websites in the world. By the end of the decade there were millions. Shops, newspapers, governments and ordinary people raced to get online. In 1995 a small online bookshop called Amazon opened; in 1998 two students started a search engine called Google; in 2001 an encyclopedia that anyone could edit, Wikipedia, went live.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'All of them were built on the free rules that Berners-Lee had written at CERN. None of them had to ask him or anyone else for permission. That was exactly what he had hoped for: a Web where anyone with a good idea could start something new.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Two Slashes Too Many' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He kept working on the Web itself. He dreamed of a \'semantic web\', in which computers would not only show pages but also understand what was in them, so they could help people find and combine information. Parts of that idea now power the little information boxes you see next to search results.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Berners-Lee has said that if he could change one thing, it would be the two slashes after \'http:\' in every web address. They were not really needed, and he once joked about how much ink, paper and time people had wasted typing them.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'This Is for Everyone' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-7'],
          alt: { en: 'A man typing at a desk on a stage in the middle of an Olympic stadium, giant glowing letters in the stands.' },
          bijschrift: { en: 'London 2012: a message to the whole world, typed live in the stadium.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'During the opening ceremony of the London Olympic Games in July 2012, a house appeared in the middle of the stadium. Its walls lifted away to reveal Tim Berners-Lee, sitting at a NeXT computer. He typed a message that appeared in giant letters made of lights held by the audience in the stands.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'This is for everyone.' },
          bron: { en: 'Tim Berners-Lee, message during the opening ceremony of the London Olympic Games, 27 July 2012' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Many viewers had no idea who he was. That was perhaps the strangest thing about him: billions of people used his invention every day without knowing his name. In 2017 he received the Turing Award, often called the Nobel Prize of computing.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Not a Billionaire' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Others became billionaires by building companies on top of the Web: search engines, online shops and social networks. Berners-Lee never did. When people asked whether he regretted giving it away, he said no: if he had tried to own it, there would have been no Web to build on.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'Fixing What He Made' },
      afbeelding: SCENE_IMAGES['tim-berners-lee-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['tim-berners-lee-8'],
          alt: { en: 'A man in his sixties looking thoughtfully at a wall of screens full of social media feeds.' },
          bijschrift: { en: 'The Web at thirty: its inventor is worried.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'As the Web turned thirty, its inventor grew worried. A few giant companies controlled much of what people saw online and collected huge amounts of data about them. False information spread faster than the truth. In open letters around the Web\'s thirtieth birthday, he warned that it was dividing people instead of bringing them together.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He did not give up on it. He started a project called Solid, in which people keep their own personal data in a kind of digital safe, called a pod, and decide for themselves which apps may use it. He also campaigned for a \'contract for the web\', asking governments, companies and users to protect it.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Still for Everyone' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Today, more than five billion people use the internet, and almost all of them use the Web. It began with one man, one black computer and a proposal his boss called vague. Its inventor still believes what he believed in 1989: that the Web should belong to everyone who uses it.',
          },
        },
      ],
    },
  ],
};

export const barackObama: Verhaal = {
  id: 'barack-obama',
  beginJaar: 1961,
  toegevoegdOp: '2026-11-03',
  titel: { en: 'Barack Obama' },
  ondertitel: { en: 'The skinny kid with a funny name who became the first Black president of the United States' },
  teaser: { en: 'His father came from a village in Kenya, his mother from Kansas. He grew up in Hawaii and Indonesia, unsure where he belonged. In 2008 he stood before a cheering crowd of a quarter of a million people in Chicago. How did a boy everyone called Barry become president?' },
  jaar: 2017,
  periodeLabel: '1961 - Present',
  soort: 'persoon',
  afbeelding: CHARACTER_IMAGES['barack-obama'],
  portretKleur: '#3D4F6E',
  uitgelicht: false,
  volgorde: 10,
  tijdperkId: 'hedendaags',
  themas: ['verenigde-staten', 'politiek', 'burgerrechten', 'democratie'],
  leestijdMinuten: 6,
  personage: { naam: 'Barack Obama' },
  chapters: [
    {
      id: 1,
      titel: { en: 'Barry from Hawaii' },
      afbeelding: SCENE_IMAGES['barack-obama-1'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-1'],
          alt: { en: 'A boy with a surfboard on a sunny Hawaiian beach, palm trees and mountains behind him.' },
          bijschrift: { en: 'Honolulu, the 1970s: a boy who did not quite fit anywhere.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Barack Hussein Obama II was born on 4 August 1961 in Honolulu, Hawaii. His mother, Ann Dunham, was a white student from Kansas. His father, Barack Obama Sr., was a student from Kenya, from the Luo people. They met at the University of Hawaii. When Barack was very young, his father left to study at Harvard and later went back to Kenya. Barack would see him only once more, at the age of ten.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His mother married again, to an Indonesian student, and in 1967 they moved to Jakarta. For four years Barack went to school in Indonesia, played in the streets and ate everything from dog meat to grasshoppers, as he later wrote. At ten he was sent back to Hawaii to live with his grandparents and go to a good school.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Who Am I?' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Everyone called him Barry. He loved basketball and was a decent player. But as one of the few Black students at his school, raised by white grandparents, he often felt that he did not fully belong in either world. He later wrote that as a teenager he drifted, and even experimented with drugs, before he started taking his future seriously.',
          },
        },
      ],
    },
    {
      id: 2,
      titel: { en: 'Chicago Streets' },
      afbeelding: SCENE_IMAGES['barack-obama-2'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-2'],
          alt: { en: 'A young man in a jacket talking with residents on the steps of a run-down apartment building in Chicago.' },
          bijschrift: { en: 'Chicago, 1985: a community organiser on the South Side.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He studied in Los Angeles and New York, and in 1985 he moved to Chicago to work as a community organiser on the South Side, where many Black families had lost their jobs when the steel mills closed. He earned about 10,000 dollars a year. He knocked on doors, listened to people\'s problems and helped them demand better schools, job training and the removal of asbestos from their homes.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He decided that to change things he needed to understand the law. In 1988 he went to Harvard Law School, and in 1990 he became the first Black president of the Harvard Law Review, the school\'s famous legal journal. It made the newspapers, and a publisher asked him to write a book. It became Dreams from My Father, about his search for his identity.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'Michelle' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1989, during a summer job at a Chicago law firm, he was assigned a mentor: a young lawyer named Michelle Robinson. At first she refused to go out with a colleague. Eventually she agreed. On their first date they went to an art museum, saw a film and ate ice cream. They married in 1992 and had two daughters, Malia and Sasha.',
          },
        },
      ],
    },
    {
      id: 3,
      titel: { en: 'The Skinny Kid with a Funny Name' },
      afbeelding: SCENE_IMAGES['barack-obama-3'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-3'],
          alt: { en: 'A young politician speaking at a podium in a huge convention hall full of waving signs and confetti.' },
          bijschrift: { en: 'Boston, July 2004: the speech that made him famous overnight.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 1996 he was elected to the Illinois state senate. In 2000 he tried to win a seat in the national Congress and lost badly. For a while he wondered whether politics was the right path. Then, in 2004, he ran for the United States Senate, and the Democratic Party asked the little-known candidate to give the main speech at its national convention in Boston.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He called himself \'a skinny kid with a funny name\' who believed that America had a place for him too. His message was that the country was less divided than its politicians claimed. When he finished, the hall erupted. The next morning he was famous across the nation, and that November he was elected to the Senate.',
          },
        },
        {
          type: 'citaat',
          tekst: { en: 'There is not a liberal America and a conservative America; there is the United States of America.' },
          bron: { en: 'Barack Obama, speech at the Democratic National Convention, 27 July 2004' },
        },
      ],
    },
    {
      id: 4,
      titel: { en: 'Yes We Can' },
      afbeelding: SCENE_IMAGES['barack-obama-4'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-4'],
          alt: { en: 'An enormous crowd at night in a city park, cheering in front of a stage lit up in red, white and blue.' },
          bijschrift: { en: 'Grant Park, Chicago, 4 November 2008: election night.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In February 2007, on a cold morning in Springfield, Illinois, he announced that he would run for president. He chose the spot on purpose: the old state capitol where Abraham Lincoln had once warned that \'a house divided against itself cannot stand\'. Few experts gave him a chance against the favourite of his party, Hillary Clinton.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'His campaign used the internet in a way no one had before, raising money from millions of small donors and organising volunteers online. His slogan was \'Yes we can\'. After a long and fierce battle he beat Clinton for the nomination, and on 4 November 2008 he defeated the Republican John McCain.',
          },
        },
        {
          type: 'sleutelmoment',
          jaar: 2008,
          tekst: { en: 'Barack Obama is elected the first African-American president of the United States.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Night in Grant Park' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'About 240,000 people gathered in Grant Park in Chicago to hear him speak. Many were in tears, including the civil rights leader Jesse Jackson, who had marched with Martin Luther King. Less than fifty years earlier, Black Americans in parts of the country had still been prevented from voting. Now one of them had been elected president.',
          },
        },
      ],
    },
    {
      id: 5,
      titel: { en: 'A Crisis on Day One' },
      afbeelding: SCENE_IMAGES['barack-obama-5'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-5'],
          alt: { en: 'A vast crowd stretching along the National Mall in Washington on a cold winter day, the Capitol in the distance.' },
          bijschrift: { en: '20 January 2009: a new president, and the worst economy in decades.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 20 January 2009 he was sworn in as the 44th president in front of a crowd estimated at nearly two million people, stretching along the National Mall in Washington. It was freezing cold. But the mood was hopeful, even though the country he took over was in deep trouble.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'The world was in the worst economic crisis since the 1930s. Banks had collapsed, and the American economy was losing hundreds of thousands of jobs every month. Within weeks Congress passed his rescue plan of about 800 billion dollars for roads, schools, tax cuts and support for the states. He also rescued the car makers General Motors and Chrysler from bankruptcy.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Surprising Prize' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In October 2009, after less than nine months in office, he was awarded the Nobel Peace Prize. Many people, including Obama himself, were surprised. He said he did not see it as a reward for what he had done, but as a call to action. In his speech in Oslo he spoke openly about the wars his country was still fighting in Iraq and Afghanistan.',
          },
        },
      ],
    },
    {
      id: 6,
      titel: { en: 'The Situation Room' },
      afbeelding: SCENE_IMAGES['barack-obama-6'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-6'],
          alt: { en: 'A small crowded room with officials in suits and uniforms staring tensely at a screen.' },
          bijschrift: { en: '1 May 2011: watching the raid on Osama bin Laden\'s hideout.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Obama wanted every American to have health insurance; tens of millions had none. After a year of bitter political fighting, he signed the Affordable Care Act on 23 March 2010. Supporters called it the biggest change to American healthcare in decades. Opponents called it \'Obamacare\' and tried for years to tear it down. He began to use the nickname himself.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 1 May 2011, he and his advisers crowded into a small room in the White House to follow a secret operation in Pakistan. American special forces flew by helicopter to a walled compound in the town of Abbottabad, where they believed Osama bin Laden, the leader of al-Qaeda behind the attacks of 11 September 2001, was hiding. After a tense forty minutes, the message came: bin Laden was dead.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'The night before the raid, Obama attended the White House Correspondents\' Dinner, an evening of jokes with journalists. He told funny stories for twenty minutes, and nobody in the room guessed that he had just given the order for one of the most dangerous missions of his presidency.' },
        },
      ],
    },
    {
      id: 7,
      titel: { en: 'Four More Years' },
      afbeelding: SCENE_IMAGES['barack-obama-7'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-7'],
          alt: { en: 'A grieving congregation in a church, a president singing at a pulpit with his eyes closed.' },
          bijschrift: { en: 'Charleston, June 2015: a president sings Amazing Grace.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2012 he was re-elected, defeating the Republican Mitt Romney. But Washington had become deeply divided, and the Republican majority in Congress blocked many of his plans. Critics also attacked his use of armed drones abroad and his decision not to intervene more strongly in the civil war in Syria.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In June 2015 a white gunman murdered nine Black worshippers during a Bible study at a church in Charleston, South Carolina. At the funeral of the church\'s pastor, Clementa Pinckney, Obama spoke about racism and grace. Then he paused, and began to sing \'Amazing Grace\'. The whole church rose and sang with him.',
          },
        },
        {
          type: 'kop',
          tekst: { en: 'A Busy Last Year' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'In 2015 he helped to secure the Paris climate agreement, in which almost every country in the world promised to limit global warming, and a deal that limited Iran\'s nuclear programme. In March 2016 he became the first sitting American president to visit Cuba in almost ninety years.',
          },
        },
      ],
    },
    {
      id: 8,
      titel: { en: 'After the White House' },
      afbeelding: SCENE_IMAGES['barack-obama-8'],
      blokken: [
        {
          type: 'afbeelding',
          bron: SCENE_IMAGES['barack-obama-8'],
          alt: { en: 'A former president and his wife waving goodbye from the steps of a helicopter on a winter day.' },
          bijschrift: { en: '20 January 2017: eight years end with a helicopter ride.' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'On 20 January 2017 he handed over the presidency to Donald Trump, a fierce critic who would try to undo much of his work. After the ceremony, Barack and Michelle Obama walked to a helicopter, turned to wave, and flew away from Washington.',
          },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'He was 55 years old. He and Michelle each wrote memoirs, hers called Becoming and his called A Promised Land, and both became enormous bestsellers. They started a foundation in Chicago to train young leaders, and even a company that makes films and series.',
          },
        },
        {
          type: 'weetje',
          tekst: { en: 'Obama has won two Grammy Awards, for the audiobook versions of his own books: Dreams from My Father and The Audacity of Hope.' },
        },
        {
          type: 'kop',
          tekst: { en: 'A Place in History' },
        },
        {
          type: 'tekst',
          inhoud: {
            en: 'Historians still argue about his presidency: about what he achieved, and about what he could not get done in a divided country. But one thing is beyond argument. The skinny kid with a funny name, the son of a Kenyan father and a mother from Kansas, became the first Black president of the United States.',
          },
        },
      ],
    },
  ],
};

export const hedendaags: Verhaal[] = [steveJobs, malala, nelson, elizabethIi, popeFrancis, wangariMaathai, stephenHawking, angelaMerkel, timBernersLee, barackObama];
