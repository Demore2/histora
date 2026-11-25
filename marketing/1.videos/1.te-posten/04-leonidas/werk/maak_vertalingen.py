"""Schrijft upload/vertalingen.json (vorm van 08-willem) voor Leonidas lang: de vaste 14 talen + Grieks.
ar/fa/hi/ur/ms/tr komen uit kanaal/vertalingen.py, de rest staat hieronder.
Gebruik: python -X utf8 maak_vertalingen.py "0:00,0:24,..."  (10 tijden: 0:00 + I-IX)"""
import importlib.util
import json
import pathlib
import sys

HIER = pathlib.Path(__file__).parent
tijden = sys.argv[1].split(",")
assert len(tijden) == 10, tijden

spec = importlib.util.spec_from_file_location("vt", HIER.parents[2] / "kanaal" / "vertalingen.py")
src = (HIER.parents[2] / "kanaal" / "vertalingen.py").read_text(encoding="utf8")
src = src.split("\nuit = {}")[0]  # alleen de data, niet het schrijven
ns: dict = {}
exec(src, ns)
ROM = ["", "I · ", "II · ", "III · ", "IV · ", "V · ", "VI · ", "VII · ", "VIII · ", "IX · "]
STUDIO = {"nl": "Nederlands", "de": "Duits", "fr": "Frans", "es": "Spaans", "pt": "Portugees (Brazilië)", "it": "Italiaans",
          "ru": "Russisch", "tr": "Turks", "ar": "Arabisch", "fa": "Perzisch", "hi": "Hindi", "ur": "Urdu",
          "id": "Indonesisch", "ms": "Maleis", "el": "Grieks"}

talen = {}
for k, (titel, haak, hfst, bron, vraag, engels) in ns["V"]["leonidas"].items():
    talen[k] = {"titel": titel, "haak": f"{haak}\n\n{bron}", "hoofdstukken": [ROM[i] + h for i, h in enumerate(hfst)],
                "vraag": vraag, "engels": engels, "tags": "#leonidas #sparta #thermopylae #history"}

NIEUW = {
 "nl": ("Wat als jij als Leonidas was geboren?",
  "Je wordt geboren in Sparta, een derde zoon van wie niemand verwacht dat hij ooit regeert. Op je zevende word je bij je moeder weggehaald en expres uitgehongerd. Per ongeluk word je koning. Dan trekt het grootste leger dat de wereld ooit zag op Griekenland af, en jij gaat het tegemoet met driehonderd man. Het echte verhaal van Leonidas en Thermopylae, verteld alsof het het jouwe is, inclusief het deel dat de films weglaten.",
  ["Wat als jij Leonidas was?", "Geboren in Sparta", "De agoge", "Per ongeluk koning", "Aarde en water", "Het orakel", "De hete poorten", "Vechten in de schaduw", "Het geitenpad", "Ga de Spartanen vertellen"],
  "Wie moet er als volgende geboren worden? Zeg het in de reacties.", "De video is in het Engels.", "#leonidas #sparta #thermopylae #geschiedenis"),
 "de": ("Was wäre, wenn du als Leonidas geboren wärst?",
  "Du wirst in Sparta geboren, als dritter Sohn, von dem niemand erwartet, dass er je regiert. Mit sieben wirst du deiner Mutter weggenommen und absichtlich ausgehungert. Durch Zufall wirst du König. Dann zieht das größte Heer, das die Welt je gesehen hat, gegen Griechenland, und du stellst dich ihm mit dreihundert Mann entgegen. Die wahre Geschichte von Leonidas und den Thermopylen, so erzählt, als wäre es deine, mit dem Teil, den die Filme weglassen.",
  ["Was wäre, wenn du Leonidas wärst?", "Geboren in Sparta", "Die Agoge", "König durch Zufall", "Erde und Wasser", "Das Orakel", "Die heißen Tore", "Kampf im Schatten", "Der Ziegenpfad", "Sag den Spartanern"],
  "Wer soll als Nächstes geboren werden? Schreib es in die Kommentare.", "Das Video ist auf Englisch.", "#leonidas #sparta #thermopylen #geschichte"),
 "fr": ("Et si tu étais né Léonidas ?",
  "Tu nais à Sparte, troisième fils dont personne n'attend qu'il règne un jour. À sept ans, on t'arrache à ta mère et on t'affame exprès. Par accident, tu deviens roi. Puis la plus grande armée que le monde ait jamais vue marche sur la Grèce, et tu vas à sa rencontre avec trois cents hommes. La vraie histoire de Léonidas et des Thermopyles, racontée comme si c'était la tienne, y compris ce que les films oublient.",
  ["Et si tu étais Léonidas ?", "Né à Sparte", "L'agogè", "Roi par accident", "La terre et l'eau", "L'oracle", "Les Portes chaudes", "Combattre à l'ombre", "Le sentier des chèvres", "Va dire aux Spartiates"],
  "Qui devrait naître la prochaine fois ? Dis-le dans les commentaires.", "La vidéo est en anglais.", "#leonidas #sparte #thermopyles #histoire"),
 "es": ("¿Y si hubieras nacido como Leónidas?",
  "Naces en Esparta, el tercer hijo, el que nadie espera que gobierne. A los siete años te separan de tu madre y te hacen pasar hambre a propósito. Por accidente te conviertes en rey. Entonces el mayor ejército que el mundo ha visto marcha sobre Grecia, y tú sales a su encuentro con trescientos hombres. La verdadera historia de Leónidas y las Termópilas, contada como si fuera la tuya, incluida la parte que las películas omiten.",
  ["¿Y si fueras Leónidas?", "Nacido en Esparta", "La agogé", "Rey por accidente", "Tierra y agua", "El oráculo", "Las Puertas Calientes", "Luchar a la sombra", "El sendero de las cabras", "Id a decir a los espartanos"],
  "¿Quién debería nacer la próxima vez? Dínoslo en los comentarios.", "El vídeo está en inglés.", "#leonidas #esparta #termopilas #historia"),
 "pt": ("E se você tivesse nascido como Leônidas?",
  "Você nasce em Esparta, o terceiro filho, aquele que ninguém espera que governe. Aos sete anos, é tirado da sua mãe e deixado com fome de propósito. Por acaso, você vira rei. Então o maior exército que o mundo já viu marcha sobre a Grécia, e você vai ao encontro dele com trezentos homens. A verdadeira história de Leônidas e das Termópilas, contada como se fosse a sua, incluindo a parte que os filmes deixam de fora.",
  ["E se você fosse Leônidas?", "Nascido em Esparta", "A agogê", "Rei por acaso", "Terra e água", "O oráculo", "Os Portões Quentes", "Lutar à sombra", "O caminho das cabras", "Vá dizer aos espartanos"],
  "Quem deve nascer da próxima vez? Conte nos comentários.", "O vídeo está em inglês.", "#leonidas #esparta #termopilas #historia"),
 "it": ("E se fossi nato Leonida?",
  "Nasci a Sparta, terzo figlio, quello che nessuno si aspetta salga al trono. A sette anni ti portano via da tua madre e ti fanno patire la fame di proposito. Per caso diventi re. Poi il più grande esercito che il mondo abbia mai visto marcia sulla Grecia, e tu gli vai incontro con trecento uomini. La vera storia di Leonida e delle Termopili, raccontata come se fosse la tua, compresa la parte che i film tralasciano.",
  ["E se fossi Leonida?", "Nato a Sparta", "L'agoghé", "Re per caso", "Terra e acqua", "L'oracolo", "Le Porte Calde", "Combattere all'ombra", "Il sentiero delle capre", "Va' a dire agli Spartani"],
  "Chi dovrebbe nascere la prossima volta? Scrivilo nei commenti.", "Il video è in inglese.", "#leonida #sparta #termopili #storia"),
 "ru": ("Что, если бы ты родился Леонидом?",
  "Ты рождаешься в Спарте третьим сыном, от которого никто не ждёт, что он будет править. В семь лет тебя забирают у матери и нарочно морят голодом. Случайно ты становишься царём. А потом величайшая армия, какую когда-либо видел мир, идёт на Грецию, и ты выходишь ей навстречу с тремя сотнями воинов. Настоящая история Леонида и Фермопил, рассказанная так, будто она твоя, включая то, о чём молчат фильмы.",
  ["Что, если бы ты был Леонидом?", "Рождённый в Спарте", "Агогэ", "Царь по случайности", "Земля и вода", "Оракул", "Горячие ворота", "Битва в тени", "Козья тропа", "Пойди и скажи спартанцам"],
  "Кто должен родиться следующим? Напиши в комментариях.", "Видео на английском языке.", "#леонид #спарта #фермопилы #история"),
 "id": ("Bagaimana Jika Kamu Lahir sebagai Leonidas?",
  "Kamu lahir di Sparta, anak ketiga yang tak seorang pun mengira akan memerintah. Di usia tujuh tahun kamu dipisahkan dari ibumu dan sengaja dibuat kelaparan. Secara kebetulan kamu menjadi raja. Lalu pasukan terbesar yang pernah dilihat dunia menyerbu Yunani, dan kamu menghadapinya dengan tiga ratus orang. Kisah nyata Leonidas dan Thermopylae, diceritakan seolah-olah itu kisahmu, termasuk bagian yang tidak ada di film.",
  ["Bagaimana jika kamu Leonidas?", "Lahir di Sparta", "Agoge", "Raja secara kebetulan", "Tanah dan air", "Orakel", "Gerbang Panas", "Bertarung di bawah naungan", "Jalur kambing", "Sampaikan kepada orang Sparta"],
  "Siapa yang harus lahir berikutnya? Tulis di kolom komentar.", "Video dalam bahasa Inggris.", "#leonidas #sparta #thermopylae #sejarah"),
 "el": ("Κι αν είχες γεννηθεί Λεωνίδας;",
  "Γεννιέσαι στη Σπάρτη, τρίτος γιος, αυτός που κανείς δεν περιμένει να βασιλέψει. Στα επτά σε παίρνουν από τη μητέρα σου και σε αφήνουν να πεινάς επίτηδες. Κατά τύχη γίνεσαι βασιλιάς. Ύστερα ο μεγαλύτερος στρατός που είδε ποτέ ο κόσμος βαδίζει κατά της Ελλάδας, και βγαίνεις να τον συναντήσεις με τριακόσιους άνδρες. Η αληθινή ιστορία του Λεωνίδα και των Θερμοπυλών, σαν να ήταν δική σου, μαζί με όσα παραλείπουν οι ταινίες.",
  ["Κι αν ήσουν ο Λεωνίδας;", "Γεννημένος στη Σπάρτη", "Η αγωγή", "Βασιλιάς κατά τύχη", "Γη και ύδωρ", "Το μαντείο", "Οι Θερμοπύλες", "Μάχη στη σκιά", "Το μονοπάτι των κατσικιών", "Πες στους Σπαρτιάτες"],
  "Ποιος να γεννηθεί την επόμενη φορά; Πες το στα σχόλια.", "Το βίντεο είναι στα αγγλικά.", "#λεωνίδας #σπάρτη #θερμοπύλες #ιστορία"),
}
for k, (titel, haak, hfst, vraag, engels, tags) in NIEUW.items():
    talen[k] = {"titel": titel, "haak": haak, "hoofdstukken": [ROM[i] + h for i, h in enumerate(hfst)],
                "vraag": vraag, "engels": engels, "tags": tags}

uit = {"tijden": tijden, "talen": {}}
for k in STUDIO:
    t = talen[k]
    assert len(t["titel"]) <= 100 and len(t["hoofdstukken"]) == 10, k
    uit["talen"][k] = {"studio": STUDIO[k], **t}
pad = HIER.parent / "upload" / "vertalingen.json"
pad.write_text(json.dumps(uit, ensure_ascii=False, indent=1), encoding="utf8")
print("ok", list(uit["talen"]))
