# Vertaalde YouTube-titels en -beschrijvingen voor de lange video's.
# Talen gekozen op de kijkers (2026-11-19): Arabisch (VAE/Saoedi/Irak), Perzisch (Iran),
# Hindi (India), Urdu (Pakistan), Maleis (Maleisie), Turks.
# `python vertalingen.py` schrijft vertalingen.json (invoer voor YouTube Studio → Talen).
import json, pathlib

HASHTAGS = {
    "caesar": "#juliuscaesar #history #ancientrome #rome #cleopatra #romanempire",
    "saladin": "#saladin #history #crusades #jerusalem #richardthelionheart #islamichistory",
    "napoleon": "#napoleon #history #napoleonbonaparte #napoleonhistory #frenchrevolution #waterloo #historyexplained",
}
TIJDEN = {
    "caesar": ["0:00", "0:17", "0:59", "1:48", "2:35", "3:35", "4:45", "5:46", "6:42", "7:35"],
    "saladin": ["0:00", "0:21", "1:36", "2:58", "3:53", "5:20", "6:45", "8:03", "9:06"],
    "napoleon": ["0:00", "0:15", "0:48", "1:24", "2:03", "2:36", "3:11", "3:45", "4:25"],
}
VIDEO_ID = {"caesar": "dVwHUOQrxSg", "saladin": "NW6It7-_wu0", "napoleon": "DbLH1zzDYJE"}
ROMEINS = ["", "I · ", "II · ", "III · ", "IV · ", "V · ", "VI · ", "VII · ", "VIII · ", "IX · "]

# per taal: (titel, haak, hoofdstukken, bronnen/kaarten, vraag, "video in het Engels")
V = {
 "caesar": {
  "ar": ("ماذا لو كنتَ يوليوس قيصر؟",
   "وُلدتَ فقيرًا في أزقة روما الخلفية. يخطفك القراصنة فتضحك في وجوههم. تغزو بلاد الغال، وتعبر نهر الروبيكون، وتلتقي بكليوباترا، وتصبح دكتاتورًا مدى الحياة. ثم يطعنك أصدقاؤك ثلاثًا وعشرين طعنة. حياة يوليوس قيصر كاملة، تُروى كأنها حياتك.",
   ["ماذا لو كنتَ يوليوس قيصر؟", "فتى حي السوبورا", "مطارَد من دكتاتور", "مخطوف لدى القراصنة", "غارق في الديون", "بلاد الغال", "الروبيكون", "كليوباترا", "الدكتاتور", "منتصف مارس"],
   "الخرائط تُظهر الحدود الحديثة وهي تقريبية. المصادر الرئيسية: سويتونيوس (حياة يوليوس المؤلَّه)، وبلوتارخ (حياة قيصر)، وكتاب قيصر نفسه «حرب الغال». عبارة «حتى أنت يا بروتوس؟» من شكسبير، لذلك ليست في هذا الفيديو.",
   "مَن يجب أن يولد في المرة القادمة؟ أخبرنا في التعليقات.", "الفيديو باللغة الإنجليزية."),
  "fa": ("اگر تو ژولیوس سزار بودی چه می‌شد؟",
   "بی‌پول در کوچه‌پس‌کوچه‌های رم به دنیا می‌آیی. دزدان دریایی تو را می‌ربایند و تو به آن‌ها می‌خندی. گل را فتح می‌کنی، از رود روبیکون می‌گذری، با کلئوپاترا دیدار می‌کنی و دیکتاتور مادام‌العمر می‌شوی. سپس دوستان خودت بیست‌وسه ضربه چاقو به تو می‌زنند. تمام زندگی ژولیوس سزار، طوری روایت شده که انگار زندگی خود توست.",
   ["اگر تو ژولیوس سزار بودی چه می‌شد؟", "پسری از محلهٔ سوبورا", "تحت تعقیب یک دیکتاتور", "در چنگ دزدان دریایی", "غرق در بدهی", "گل", "روبیکون", "کلئوپاترا", "دیکتاتور", "ایدز مارس"],
   "نقشه‌ها مرزهای امروزی را نشان می‌دهند و تقریبی هستند. منابع اصلی: سوئتونیوس (زندگی ژولیوس خدای‌گونه)، پلوتارک (زندگی سزار) و کتاب خود سزار، «جنگ گل». جملهٔ «تو هم، بروتوس؟» از شکسپیر است و به همین دلیل در این ویدیو نیامده.",
   "نفر بعدی چه کسی باشد؟ در نظرات بگو.", "ویدیو به زبان انگلیسی است."),
  "hi": ("अगर आप जूलियस सीज़र होते तो?",
   "आप रोम की पिछली गलियों में गरीबी में पैदा होते हैं। समुद्री डाकू आपको अगवा कर लेते हैं, और आप उन पर हँसते हैं। आप गॉल जीतते हैं, रूबिकॉन पार करते हैं, क्लियोपेट्रा से मिलते हैं और जीवन भर के लिए तानाशाह बन जाते हैं। फिर आपके अपने ही दोस्त आपको तेईस बार छुरा घोंपते हैं। जूलियस सीज़र की पूरी ज़िंदगी, ऐसे सुनाई गई जैसे वह आपकी अपनी हो।",
   ["अगर आप जूलियस सीज़र होते तो?", "सुबुरा का लड़का", "एक तानाशाह के निशाने पर", "समुद्री डाकुओं की कैद में", "कर्ज़ में डूबे", "गॉल", "रूबिकॉन", "क्लियोपेट्रा", "तानाशाह", "मार्च की आइड्स"],
   "नक्शे आज की सीमाएँ दिखाते हैं और अनुमानित हैं। मुख्य स्रोत: सुएटोनियस (दिव्य जूलियस का जीवन), प्लूटार्क (सीज़र का जीवन) और सीज़र की अपनी किताब \"गैलिक युद्ध\"। \"एट तू, ब्रूटे?\" शेक्सपियर की पंक्ति है, इसलिए यह इस वीडियो में नहीं है।",
   "अगला कौन पैदा हो? कमेंट में बताइए।", "वीडियो अंग्रेज़ी में है।"),
  "ur": ("اگر آپ جولیس سیزر ہوتے تو کیا ہوتا؟",
   "آپ روم کی پچھلی گلیوں میں غربت میں پیدا ہوتے ہیں۔ بحری قزاق آپ کو اغوا کر لیتے ہیں اور آپ ان پر ہنستے ہیں۔ آپ گال فتح کرتے ہیں، دریائے روبیکون پار کرتے ہیں، قلوپطرہ سے ملتے ہیں اور تاحیات ڈکٹیٹر بن جاتے ہیں۔ پھر آپ کے اپنے دوست آپ کو تئیس بار خنجر مارتے ہیں۔ جولیس سیزر کی پوری زندگی، ایسے سنائی گئی جیسے یہ آپ کی اپنی ہو۔",
   ["اگر آپ جولیس سیزر ہوتے تو؟", "سبورا کا لڑکا", "ایک ڈکٹیٹر کے نشانے پر", "قزاقوں کی قید میں", "قرض میں ڈوبے ہوئے", "گال", "روبیکون", "قلوپطرہ", "ڈکٹیٹر", "مارچ کے آئیڈز"],
   "نقشے آج کی سرحدیں دکھاتے ہیں اور تخمینی ہیں۔ اہم ماخذ: سویتونیس (الوہی جولیس کی زندگی)، پلوٹارک (سیزر کی زندگی) اور سیزر کی اپنی کتاب \"جنگِ گال\"۔ \"ایت تو، بروتے؟\" شیکسپیئر کا جملہ ہے، اس لیے یہ اس ویڈیو میں نہیں ہے۔",
   "اگلا کون پیدا ہو؟ کمنٹس میں بتائیں۔", "ویڈیو انگریزی میں ہے۔"),
  "ms": ("Bagaimana Jika Anda Dilahirkan Sebagai Julius Caesar?",
   "Anda dilahirkan miskin di lorong-lorong belakang Rom. Lanun menculik anda, dan anda mentertawakan mereka. Anda menakluk Gaul, menyeberangi Rubicon, bertemu Cleopatra dan menjadi diktator seumur hidup. Kemudian kawan-kawan anda sendiri menikam anda dua puluh tiga kali. Seluruh kehidupan Julius Caesar, diceritakan seolah-olah ia kehidupan anda.",
   ["Bagaimana jika anda Julius Caesar?", "Budak dari Subura", "Diburu seorang diktator", "Diculik lanun", "Terbelenggu hutang", "Gaul", "Rubicon", "Cleopatra", "Diktator", "Ides Mac"],
   "Peta menunjukkan sempadan moden dan hanya anggaran. Sumber utama: Suetonius (Kehidupan Julius yang Didewakan), Plutarch (Kehidupan Caesar) dan buku Caesar sendiri, Perang Gaul. \"Et tu, Brute?\" ialah ciptaan Shakespeare, jadi ia tiada dalam video ini.",
   "Siapa patut dilahirkan seterusnya? Beritahu kami di ruangan komen.", "Video dalam bahasa Inggeris."),
  "tr": ("Jül Sezar Olarak Doğsaydın Ne Olurdu?",
   "Roma'nın arka sokaklarında yoksul doğuyorsun. Korsanlar seni kaçırıyor, sen de onlara gülüyorsun. Galya'yı fethediyor, Rubikon'u geçiyor, Kleopatra ile tanışıyor ve ömür boyu diktatör oluyorsun. Sonra kendi dostların seni yirmi üç kez bıçaklıyor. Jül Sezar'ın tüm hayatı, sanki senin hayatınmış gibi.",
   ["Jül Sezar olsaydın?", "Subura'lı çocuk", "Diktatörün hedefinde", "Korsanlara esir", "Borç batağında", "Galya", "Rubikon", "Kleopatra", "Diktatör", "Mart'ın İdus'u"],
   "Haritalar bugünkü sınırları gösterir ve yaklaşıktır. Başlıca kaynaklar: Suetonius (Tanrılaştırılmış Julius'un Hayatı), Plutarkhos (Sezar'ın Hayatı) ve Sezar'ın kendi eseri Galya Savaşları. \"Sen de mi Brütüs?\" Shakespeare'e aittir, bu yüzden bu videoda yok.",
   "Sırada kim doğsun? Yorumlarda yaz.", "Video İngilizcedir."),
 },
 "saladin": {
  "ar": ("حياة صلاح الدين الأيوبي كاملة في 10 دقائق",
   "وُلد في الليلة التي فرّت فيها عائلته. وبعد أربعين عامًا سحق جيشًا صليبيًا في حطين، ودخل القدس دون مذبحة، وصمد أمام ريتشارد قلب الأسد حتى توقف القتال. وحين مات، لم يكن في خزانته سوى دينار ذهبي واحد. هذه حياة صلاح الدين الأيوبي، من تكريت إلى القدس.",
   ["ماذا لو كنتَ صلاح الدين؟", "فتى من تكريت", "سيد مصر", "الملك المجذوم", "العطش في حطين", "القدس", "قلب الأسد", "هدية من الخيول", "دينار ذهبي واحد"],
   "الخرائط تُظهر الحدود الحديثة وهي تقريبية. المصادر الرئيسية: بهاء الدين بن شداد (كاتب سيرة صلاح الدين)، وعماد الدين الأصفهاني، وابن الأثير، ومؤرخو الحملات الصليبية.",
   "مَن يجب أن يكون التالي؟ أخبرنا في التعليقات.", "الفيديو باللغة الإنجليزية."),
  "fa": ("تمام زندگی صلاح‌الدین ایوبی در ۱۰ دقیقه",
   "او در شبی به دنیا آمد که خانواده‌اش می‌گریختند. چهل سال بعد سپاه صلیبیان را در حطین نابود کرد، بیت‌المقدس را بدون کشتار گرفت و ریچارد شیردل را متوقف کرد. وقتی درگذشت، در خزانه‌اش تنها یک سکهٔ طلا مانده بود. این زندگی صلاح‌الدین ایوبی است، از تکریت تا بیت‌المقدس.",
   ["اگر تو صلاح‌الدین بودی چه می‌شد؟", "پسری از تکریت", "فرمانروای مصر", "پادشاه جذامی", "تشنگی در حطین", "بیت‌المقدس", "شیردل", "هدیه‌ای از اسب‌ها", "یک سکهٔ طلا"],
   "نقشه‌ها مرزهای امروزی را نشان می‌دهند و تقریبی هستند. منابع اصلی: بهاءالدین ابن شداد (زندگی‌نامه‌نویس صلاح‌الدین)، عمادالدین اصفهانی، ابن اثیر و وقایع‌نگاران صلیبی.",
   "نفر بعدی چه کسی باشد؟ در نظرات بگو.", "ویدیو به زبان انگلیسی است."),
  "hi": ("सलाहुद्दीन अय्यूबी की पूरी ज़िंदगी 10 मिनट में",
   "उनका जन्म उसी रात हुआ जिस रात उनका परिवार भागा था। चालीस साल बाद उन्होंने हत्तीन में क्रूसेडर सेना को तबाह किया, बिना कत्लेआम के यरूशलम जीता और रिचर्ड द लायनहार्ट को आगे बढ़ने नहीं दिया। जब उनकी मौत हुई, तो उनके खज़ाने में सिर्फ़ एक सोने का सिक्का था। यह है सलाहुद्दीन अय्यूबी की ज़िंदगी, तिकरित से यरूशलम तक।",
   ["अगर आप सलाहुद्दीन होते तो?", "तिकरित का एक लड़का", "मिस्र का मालिक", "कोढ़ी राजा", "हत्तीन की प्यास", "यरूशलम", "लायनहार्ट", "घोड़ों का तोहफ़ा", "एक सोने का सिक्का"],
   "नक्शे आज की सीमाएँ दिखाते हैं और अनुमानित हैं। मुख्य स्रोत: बहाउद्दीन इब्न शद्दाद (सलाहुद्दीन के जीवनीकार), इमादुद्दीन अल-इस्फ़हानी, इब्न अल-असीर और क्रूसेडर इतिहासकार।",
   "अगला कौन हो? कमेंट में बताइए।", "वीडियो अंग्रेज़ी में है।"),
  "ur": ("صلاح الدین ایوبی کی پوری زندگی 10 منٹ میں",
   "وہ اسی رات پیدا ہوئے جس رات ان کا خاندان فرار ہوا۔ چالیس سال بعد انہوں نے حطین میں صلیبی فوج کو تباہ کیا، قتلِ عام کے بغیر بیت المقدس فتح کیا اور رچرڈ شیر دل کو آگے بڑھنے نہیں دیا۔ جب ان کا انتقال ہوا تو ان کے خزانے میں صرف ایک سونے کا سکہ تھا۔ یہ ہے صلاح الدین ایوبی کی زندگی، تکریت سے بیت المقدس تک۔",
   ["اگر آپ صلاح الدین ہوتے تو؟", "تکریت کا ایک لڑکا", "مصر کا حاکم", "کوڑھی بادشاہ", "حطین کی پیاس", "بیت المقدس", "شیر دل", "گھوڑوں کا تحفہ", "ایک سونے کا سکہ"],
   "نقشے آج کی سرحدیں دکھاتے ہیں اور تخمینی ہیں۔ اہم ماخذ: بہاء الدین ابن شداد (صلاح الدین کے سوانح نگار)، عماد الدین اصفہانی، ابن الاثیر اور صلیبی مؤرخین۔",
   "اگلا کون ہو؟ کمنٹس میں بتائیں۔", "ویڈیو انگریزی میں ہے۔"),
  "ms": ("Seluruh Kehidupan Salahuddin al-Ayyubi dalam 10 Minit",
   "Dia dilahirkan pada malam keluarganya melarikan diri. Empat puluh tahun kemudian dia memusnahkan tentera Salib di Hattin, membebaskan Baitulmaqdis tanpa pembunuhan beramai-ramai, dan menahan Richard si Hati Singa. Apabila dia wafat, perbendaharaannya hanya ada satu syiling emas. Inilah kehidupan Salahuddin al-Ayyubi, dari Tikrit ke Baitulmaqdis.",
   ["Bagaimana jika anda Salahuddin?", "Budak dari Tikrit", "Penguasa Mesir", "Raja berpenyakit kusta", "Dahaga di Hattin", "Baitulmaqdis", "Si Hati Singa", "Hadiah kuda", "Satu syiling emas"],
   "Peta menunjukkan sempadan moden dan hanya anggaran. Sumber utama: Baha ad-Din ibn Shaddad (penulis biografi Salahuddin), Imad ad-Din al-Isfahani, Ibn al-Athir dan penulis kronik tentera Salib.",
   "Siapa seterusnya? Beritahu kami di ruangan komen.", "Video dalam bahasa Inggeris."),
  "tr": ("Selahaddin Eyyubi'nin Tüm Hayatı 10 Dakikada",
   "Ailesinin kaçtığı gece doğdu. Kırk yıl sonra Hıttin'de bir Haçlı ordusunu yok etti, Kudüs'ü katliam yapmadan aldı ve Aslan Yürekli Richard'ı durdurdu. Öldüğünde hazinesinde tek bir altın sikke vardı. Tikrit'ten Kudüs'e Selahaddin Eyyubi'nin hayatı.",
   ["Selahaddin olsaydın?", "Tikritli bir çocuk", "Mısır'ın hâkimi", "Cüzamlı kral", "Hıttin'de susuzluk", "Kudüs", "Aslan Yürekli", "Bir at hediyesi", "Tek bir altın sikke"],
   "Haritalar bugünkü sınırları gösterir ve yaklaşıktır. Başlıca kaynaklar: Bahaeddin İbn Şeddad (Selahaddin'in biyografi yazarı), İmadeddin el-İsfahani, İbnü'l-Esir ve Haçlı vakanüvisleri.",
   "Sırada kim olsun? Yorumlarda yaz.", "Video İngilizcedir."),
 },
 "napoleon": {
  "ar": ("حياة نابليون كاملة في 5 دقائق",
   "ماذا لو كنتَ نابليون؟ ستضع التاج على رأسك بيدك، وتحكم أوروبا كلها تقريبًا، ثم تزحف إلى روسيا وتخسر كل شيء تقريبًا. سخروا منك في المدرسة وأنت في التاسعة، وصرتَ إمبراطورًا في الخامسة والثلاثين، ومتَّ على صخرة في جنوب المحيط الأطلسي في الحادية والخمسين. هذه حياة نابليون بونابرت كاملة في خمس دقائق: كورسيكا، والثورة، وطولون، وإيطاليا ومصر، وعبور جبال الألب على بغل، وأوسترليتز، وروسيا، وإلبا، وواترلو، وسانت هيلينا.",
   ["ماذا لو كنتَ نابليون؟", "فتى من كورسيكا", "الثورة", "إيطاليا ومصر", "القنصل الأول", "الإمبراطور", "روسيا", "إلبا وواترلو", "سانت هيلينا"],
   "الخرائط تُظهر الحدود الحديثة وهي تقريبية.",
   "مَن يجب أن يكون التالي؟ أخبرنا في التعليقات.", "الفيديو باللغة الإنجليزية."),
  "fa": ("تمام زندگی ناپلئون در ۵ دقیقه",
   "اگر تو ناپلئون بودی چه می‌شد؟ تاج را با دست خودت بر سرت می‌گذاشتی، تقریباً بر تمام اروپا حکومت می‌کردی، بعد به روسیه لشکر می‌کشیدی و تقریباً همه‌چیز را از دست می‌دادی. در نُه‌سالگی در مدرسه مسخره‌ات می‌کردند، در سی‌وپنج‌سالگی امپراتور شدی و در پنجاه‌ویک‌سالگی روی صخره‌ای در جنوب اقیانوس اطلس مردی. تمام زندگی ناپلئون بناپارت در پنج دقیقه: کرس، انقلاب، تولون، ایتالیا و مصر، گذر از آلپ سوار بر قاطر، آسترلیتز، روسیه، الب، واترلو و سنت هلنا.",
   ["اگر تو ناپلئون بودی چه می‌شد؟", "پسری از کرس", "انقلاب", "ایتالیا و مصر", "کنسول اول", "امپراتور", "روسیه", "الب و واترلو", "سنت هلنا"],
   "نقشه‌ها مرزهای امروزی را نشان می‌دهند و تقریبی هستند.",
   "نفر بعدی چه کسی باشد؟ در نظرات بگو.", "ویدیو به زبان انگلیسی است."),
  "hi": ("नेपोलियन की पूरी ज़िंदगी 5 मिनट में",
   "अगर आप नेपोलियन होते तो? आप अपने ही हाथों से अपने सिर पर ताज रखते, लगभग पूरे यूरोप पर राज करते, फिर रूस पर चढ़ाई करते और लगभग सब कुछ खो देते। नौ साल की उम्र में स्कूल में मज़ाक, पैंतीस में सम्राट, और इक्यावन में दक्षिण अटलांटिक की एक चट्टान पर मौत। पाँच मिनट में नेपोलियन बोनापार्ट की पूरी ज़िंदगी: कोर्सिका, क्रांति, तूलों, इटली और मिस्र, खच्चर पर आल्प्स, ऑस्टरलिट्ज़, रूस, एल्बा, वॉटरलू और सेंट हेलेना।",
   ["अगर आप नेपोलियन होते तो?", "कोर्सिका का लड़का", "क्रांति", "इटली और मिस्र", "प्रथम कौंसल", "सम्राट", "रूस", "एल्बा और वॉटरलू", "सेंट हेलेना"],
   "नक्शे आज की सीमाएँ दिखाते हैं और अनुमानित हैं।",
   "अगला कौन हो? कमेंट में बताइए।", "वीडियो अंग्रेज़ी में है।"),
  "ur": ("نپولین کی پوری زندگی 5 منٹ میں",
   "اگر آپ نپولین ہوتے تو؟ آپ اپنے ہی ہاتھوں سے اپنے سر پر تاج رکھتے، تقریباً پورے یورپ پر حکومت کرتے، پھر روس پر چڑھائی کرتے اور تقریباً سب کچھ کھو دیتے۔ نو سال کی عمر میں اسکول میں مذاق، پینتیس میں شہنشاہ، اور اکیاون میں جنوبی بحرِ اوقیانوس کی ایک چٹان پر موت۔ پانچ منٹ میں نپولین بوناپارٹ کی پوری زندگی: کورسیکا، انقلاب، طولون، اٹلی اور مصر، خچر پر ایلپس، آسٹرلٹز، روس، ایلبا، واٹرلو اور سینٹ ہیلینا۔",
   ["اگر آپ نپولین ہوتے تو؟", "کورسیکا کا لڑکا", "انقلاب", "اٹلی اور مصر", "پہلا قونصل", "شہنشاہ", "روس", "ایلبا اور واٹرلو", "سینٹ ہیلینا"],
   "نقشے آج کی سرحدیں دکھاتے ہیں اور تخمینی ہیں۔",
   "اگلا کون ہو؟ کمنٹس میں بتائیں۔", "ویڈیو انگریزی میں ہے۔"),
  "ms": ("Seluruh Kehidupan Napoleon dalam 5 Minit",
   "Bagaimana jika anda Napoleon? Anda akan meletakkan mahkota di atas kepala sendiri, memerintah hampir seluruh Eropah, kemudian mara ke Rusia dan kehilangan hampir segala-galanya. Diejek di sekolah pada usia sembilan tahun, maharaja pada usia tiga puluh lima, dan mati di atas sebuah batu di Atlantik Selatan pada usia lima puluh satu. Seluruh kehidupan Napoleon Bonaparte dalam lima minit: Corsica, Revolusi, Toulon, Itali dan Mesir, Alps di atas seekor baghal, Austerlitz, Rusia, Elba, Waterloo dan Saint Helena.",
   ["Bagaimana jika anda Napoleon?", "Budak dari Corsica", "Revolusi", "Itali dan Mesir", "Konsul Pertama", "Maharaja", "Rusia", "Elba dan Waterloo", "Saint Helena"],
   "Peta menunjukkan sempadan moden dan hanya anggaran.",
   "Siapa seterusnya? Beritahu kami di ruangan komen.", "Video dalam bahasa Inggeris."),
  "tr": ("Napolyon'un Tüm Hayatı 5 Dakikada",
   "Napolyon olsaydın? Tacı kendi başına kendin koyardın, neredeyse tüm Avrupa'yı yönetirdin, sonra Rusya'ya yürür ve neredeyse her şeyi kaybederdin. Dokuz yaşında okulda alay konusu, otuz beşinde imparator, elli bir yaşında Güney Atlantik'te bir kayanın üstünde ölüm. Napolyon Bonapart'ın tüm hayatı beş dakikada: Korsika, Devrim, Toulon, İtalya ve Mısır, katırla Alpler, Austerlitz, Rusya, Elba, Waterloo ve Saint Helena.",
   ["Napolyon olsaydın?", "Korsikalı çocuk", "Devrim", "İtalya ve Mısır", "Birinci Konsül", "İmparator", "Rusya", "Elba ve Waterloo", "Saint Helena"],
   "Haritalar bugünkü sınırları gösterir ve yaklaşıktır.",
   "Sırada kim olsun? Yorumlarda yaz.", "Video İngilizcedir."),
 },
}

uit = {}
for video, talen in V.items():
    uit[video] = {"id": VIDEO_ID[video], "talen": {}}
    for taal, (titel, haak, hfst, bron, vraag, engels) in talen.items():
        tijden = TIJDEN[video]
        assert len(hfst) == len(tijden), (video, taal)
        assert len(titel) <= 100, (video, taal)
        pre = ROMEINS if video == "caesar" else [""] * len(tijden)
        regels = "\n".join(f"{t} {pre[i]}{h}" for i, (t, h) in enumerate(zip(tijden, hfst)))
        if video == "napoleon":
            beschr = f"{haak}\n\n{regels}\n\n{vraag}\n\n{bron}\n\n{engels}\n\n{HASHTAGS[video]}"
        else:
            beschr = f"{haak}\n\n{regels}\n\n{bron}\n\n{vraag}\n\n{engels}\n\n{HASHTAGS[video]}"
        assert len(beschr) <= 5000
        uit[video]["talen"][taal] = {"titel": titel, "beschrijving": beschr}

pad = pathlib.Path(__file__).with_name("vertalingen.json")
pad.write_text(json.dumps(uit, ensure_ascii=False, indent=1), encoding="utf-8")
print("ok", {v: list(d["talen"]) for v, d in uit.items()})
