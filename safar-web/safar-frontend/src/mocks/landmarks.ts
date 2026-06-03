import type { Landmark } from "@/types";

// Real Uzbekistan imagery from Wikimedia Commons
export const mockLandmarks: Landmark[] = [
  // Samarkand
  {
    uuid: "lm-001",
    citySlug: "samarkand",
    slug: "registan",
    name: "Registan Square",
    shortDescription:
      "Three majestic madrasas surround the public square at the heart of Timurid Samarkand.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Registan_square_Samarkand.jpg/1280px-Registan_square_Samarkand.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sher-Dor_Madrasa_02.jpg/1280px-Sher-Dor_Madrasa_02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Tilya-Kori_Madrasa_01.jpg/1280px-Tilya-Kori_Madrasa_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Registan_02.jpg/1280px-Registan_02.jpg",
    ],
    lat: 39.6547,
    lng: 66.9758,
    audioUrl: "/audio/registan-en.wav",
    durationSec: 245,
  },
  {
    uuid: "lm-002",
    citySlug: "samarkand",
    slug: "shah-i-zinda",
    name: "Shah-i-Zinda",
    shortDescription:
      "A necropolis of dazzling tile work, where the saints of Timurid Samarkand rest.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Shah-i-Zinda_03.jpg/1280px-Shah-i-Zinda_03.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Tuman_Aka_complex.jpg/1280px-Tuman_Aka_complex.jpg",
    ],
    lat: 39.6657,
    lng: 66.985,
    audioUrl: "/audio/shah-i-zinda-en.wav",
    durationSec: 190,
  },
  {
    uuid: "lm-003",
    citySlug: "samarkand",
    slug: "gur-e-amir",
    name: "Gur-e-Amir",
    shortDescription: "The mausoleum of Amir Timur, conqueror of the East.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/ShrineofAmirTimur.jpg/1280px-ShrineofAmirTimur.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Gur-e_Amir_01.jpg/1280px-Gur-e_Amir_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Gur-e_Amir_03.jpg/1280px-Gur-e_Amir_03.jpg",
    ],
    lat: 39.6483,
    lng: 66.9692,
    audioUrl: "/audio/gur-e-amir-en.wav",
    durationSec: 215,
  },
  // Bukhara
  {
    uuid: "lm-004",
    citySlug: "bukhara",
    slug: "po-i-kalyan",
    name: "Po-i-Kalyan Complex",
    shortDescription:
      "The Kalyan Minaret, mosque, and Mir-i-Arab madrasa form Bukhara's spiritual heart.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Inner_courtyard_of_Kalyan_Mosque.jpg/1280px-Inner_courtyard_of_Kalyan_Mosque.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Closeup_of_Mir-i-Arab_Madrasa.jpg/1280px-Closeup_of_Mir-i-Arab_Madrasa.jpg",
    ],
    lat: 39.7758,
    lng: 64.4145,
    audioUrl: "/audio/po-i-kalyan-en.wav",
    durationSec: 280,
  },
  {
    uuid: "lm-005",
    citySlug: "bukhara",
    slug: "ark-fortress",
    name: "Ark Fortress",
    shortDescription:
      "Two thousand years of rulers walked these walls — until the Bolshevik bombardment of 1920.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ark_Of_Bukhara.jpg/1280px-Ark_Of_Bukhara.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ark_of_Bukhara_2023.9.jpg/1280px-Ark_of_Bukhara_2023.9.jpg",
    ],
    lat: 39.7779,
    lng: 64.4087,
    audioUrl: "/audio/ark-fortress-en.wav",
    durationSec: 200,
  },
  // Khiva
  {
    uuid: "lm-006",
    citySlug: "khiva",
    slug: "itchan-kala",
    name: "Itchan Kala",
    shortDescription:
      "The walled inner city of Khiva — UNESCO heritage frozen in time.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Islam_Khodja_Madrasa_01.jpg/1280px-Islam_Khodja_Madrasa_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Konya_Ark_gate.jpg/1280px-Konya_Ark_gate.jpg",
    ],
    lat: 41.3783,
    lng: 60.3635,
    audioUrl: "/audio/itchan-kala-en.wav",
    durationSec: 260,
  },
  {
    uuid: "lm-007",
    citySlug: "khiva",
    slug: "kalta-minor",
    name: "Kalta Minor",
    shortDescription:
      "The unfinished turquoise minaret — meant to be the tallest in the Islamic world.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Kalta_Minor_01.jpg/1280px-Kalta_Minor_01.jpg",
    ],
    lat: 41.378,
    lng: 60.362,
    audioUrl: "/audio/kalta-minor-en.wav",
    durationSec: 165,
  },
  // Tashkent
  {
    uuid: "lm-008",
    citySlug: "tashkent",
    slug: "khast-imam",
    name: "Khast Imam Complex",
    shortDescription:
      "Home to the world's oldest Quran — penned in the 7th century.",
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hazrat_imam_complex_panoramic_view.jpg/1280px-Hazrat_imam_complex_panoramic_view.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Hazrati_Imam_Mosque_01.jpg/1280px-Hazrati_Imam_Mosque_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Barakhan_Madrasah_Tashkent.jpg/1280px-Barakhan_Madrasah_Tashkent.jpg",
    ],
    lat: 41.3258,
    lng: 69.2401,
    audioUrl: "/audio/khast-imam-en.wav",
    durationSec: 230,
  },
];

// Full transcripts — used by AudioPlayer for transcript panel AND TTS generation
export const mockTranscripts: Record<string, Record<string, string>> = {
  registan: {
    en: "The Registan is an ensemble of three madrasas that stand at the heart of medieval Samarkand. The square's very name means sandy place in Persian, recalling the ground that once covered it. The oldest madrasa, Ulugh Beg's, was completed in 1420. The astronomer-king himself is said to have lectured here on mathematics and the heavens. Two centuries later, the Sher-Dor madrasa was raised opposite it, its facade boldly decorated with tigers chasing deer — a striking break with the Islamic tradition against depicting living creatures. Between them stands the Tilya-Kori, the gilded one, its mosque interior covered in pure gold leaf. Stand in the centre at sunset and you understand why this square was the heart of an empire that stretched from Anatolia to India.",
    uz: "Registon — uchta madrasadan iborat ansambl bo'lib, o'rta asr Samarqandining yuragida joylashgan. Maydon nomi forschadan qumloq joy ma'nosini bildiradi va bu yerni bir vaqtlar qoplab turgan tuproqni eslatadi. Eng qadimgi madrasa — Ulug'bek madrasasi 1420-yilda qurib bitkazilgan. Astronom-podshohning o'zi bu yerda matematika va falakkiyot ilmidan dars bergan deyiladi. Ikki asr o'tib, uning ro'parasida Sher-Dor madrasasi qurildi: peshtoqida kiyikni quvayotgan yo'lbarslar tasvirlangan — bu islom an'anasidagi tirik mavjudotni tasvirlash taqiqi bilan jasur xilof edi. Ular orasida Tilla-Kori — oltinkori — turadi, masjid ichi sof oltin barg bilan qoplangan. Quyosh botishi paytida markazda turing va bu maydon nima uchun Anatoliyadan Hindistongacha cho'zilgan saltanat yuragi bo'lganini his etasiz.",
    ru: "Регистан — это ансамбль из трёх медресе в самом сердце средневекового Самарканда. Само название площади означает по-персидски песчаное место, напоминая о земле, некогда покрывавшей её. Старейшее медресе, Улугбека, было завершено в 1420 году. Сам астроном-правитель, как рассказывают, преподавал здесь математику и науку о небесах. Двумя веками позже напротив него поднялось медресе Шер-Дор, чей фасад смело украшен тиграми, преследующими ланей — поразительный разрыв с исламской традицией не изображать живых существ. Между ними стоит Тилля-Кори, позолоченное, чьи интерьеры мечети покрыты чистым сусальным золотом. Постойте в центре на закате и поймёте, почему эта площадь была сердцем империи, простиравшейся от Анатолии до Индии.",
  },
  "shah-i-zinda": {
    en: "Shah-i-Zinda means the living king in Persian, a name that points to its founding legend: the burial place of Qusam ibn Abbas, a cousin of the Prophet Muhammad, who is said to have brought Islam to Samarkand in the seventh century. According to local tradition, Qusam was beheaded yet continued to live underground, hence the living king. The necropolis grew over a thousand years, with the most spectacular tile work created under the Timurids. The narrow lane between turquoise domes is a corridor through time — every mausoleum a different century of Samarkand's history, glittering in geometric and floral mosaics that have lost none of their colour.",
    uz: "Shohi Zinda — forschadan tirik shoh ma'nosini bildiradi. Bu nom uning poydevor afsonasini eslatadi: payg'ambar Muhammadning amakivachchasi Qusam ibn Abbosning dafn joyi. Mahalliy rivoyatga ko'ra, Qusam boshini kesib tashlanganidan keyin ham yer ostida yashashda davom etgan — shu sababli tirik shoh deyiladi. Nekropol ming yil davomida o'sgan, eng go'zal koshinkorlik Temuriylar davrida bunyod etilgan. Feruza gumbazlar orasidagi tor ko'cha — vaqt yo'lagi. Har bir maqbara Samarqand tarixining boshqa asrini ifodalaydi, geometrik va gulli mozaikalar bilan jilolanib, rangini bir zarradan ham yo'qotmagan.",
    ru: "Шахи-Зинда означает по-персидски живой царь. Это имя связано с легендой основания: здесь похоронен Кусам ибн Аббас, двоюродный брат пророка Мухаммеда, которому приписывают принесение ислама в Самарканд в седьмом веке. По преданию, Кусам был обезглавлен, но продолжал жить под землёй — отсюда живой царь. Некрополь рос на протяжении тысячи лет, самые поразительные изразцовые работы созданы при Тимуридах. Узкий коридор между бирюзовыми куполами — это путь сквозь время. Каждый мавзолей — другой век истории Самарканда, сверкающий геометрическими и растительными мозаиками, не потерявшими ни капли своего цвета.",
  },
  "gur-e-amir": {
    en: "Gur-e-Amir, the tomb of the king, holds the remains of Amir Timur — the founder of the Timurid empire and one of history's most formidable conquerors. The mausoleum was originally built for Timur's grandson, who died young; Timur himself was added when he died in 1405 on his way to invade Ming China. The interior is a study in azure and gold: the inner dome appears to float over stalactite muqarnas, and a black jade slab covers Timur's grave. In 1941, Soviet archaeologists opened the tomb to verify the historical record. The very next day, Hitler invaded the Soviet Union — a coincidence that gave new life to the curse said to be inscribed on the tomb: whoever disturbs my rest will unleash an invader more terrible than I.",
    uz: "Go'ri Amir — shoh qabri — Amir Temurning, Temuriylar saltanatining asoschisi va tarixning eng dahshatli bosqinchilaridan birining qoldiqlarini saqlaydi. Maqbara dastlab yosh vafot etgan Temurning nevarasi uchun qurilgan; Temurning o'zi 1405-yilda Min Xitoyiga yurish chog'ida vafot etganda shu yerga qo'shilgan. Ichkari — azure va oltin tilsimi: ichki gumbaz sastalaktit muqarnaslar ustida suzayotgandek ko'rinadi, qora yashma tosh esa Temurning qabrini qoplaydi. 1941-yilda sovet arxeologlari maqbarani ochib, tarixni tasdiqladilar. Ertasi kuni — Gitler Sovet Ittifoqiga bostirib kirdi. Bu tasodif maqbaradagi yozuvga yangi hayot bag'ishladi: kim mening tinchligimni buzsa, mendan ham dahshatli bosqinchini ozod qiladi.",
    ru: "Гур-Эмир — гробница царя — хранит останки Амира Тимура, основателя Тимуридской империи и одного из самых грозных завоевателей в истории. Мавзолей был построен для внука Тимура, умершего молодым; сам Тимур был добавлен сюда после своей смерти в 1405 году на пути к завоеванию минского Китая. Интерьер — этюд в лазури и золоте: внутренний купол словно парит над сталактитовыми мукарнами, плита из чёрного нефрита покрывает могилу Тимура. В 1941 году советские археологи вскрыли гробницу для проверки исторических данных. На следующий день Гитлер вторгся в Советский Союз — совпадение, давшее новую жизнь надписи на гробнице: кто потревожит мой покой, выпустит завоевателя страшнее меня.",
  },
  "po-i-kalyan": {
    en: "The Po-i-Kalyan, foot of the great one, is an ensemble of three buildings around the towering Kalyan Minaret, which has stood since 1127. The minaret was so striking that Genghis Khan, when he sacked Bukhara in 1220, ordered it spared while everything else was destroyed. Beside it stands the Kalyan Mosque, large enough for twelve thousand worshippers, and the Mir-i-Arab Madrasa, which has trained Islamic scholars continuously for nearly five centuries. The complex remains the spiritual heart of Bukhara — once known as the Pillar of Islam, a city where every street corner held a working mosque.",
    uz: "Po-i Kalyan — buyukning poyi — Kalon minorasi atrofidagi uchta inshootdan iborat ansambl. Minora 1127-yildan beri tik turibdi. U shu darajada hayratlanarli ediki, 1220-yilda Buxoroni vayron qilgan Chingizxon hamma narsa buzilayotganda uni tegmaslikni buyurgan. Yonida Kalon masjidi turadi — o'n ikki ming kishini sig'dira oladi — va Miri Arab madrasasi, qariyb besh asr davomida islom olimlarini tarbiyalab kelmoqda. Ansambl Buxoroning ruhoniy yuragi bo'lib qolmoqda. Buxoro bir vaqtlar Islom ustuni deb atalgan — har ko'cha burchagida ishlovchi masjid bo'lgan shahar.",
    ru: "По-и-Калян — у подножия великого — это ансамбль из трёх зданий вокруг возвышающегося минарета Калян, стоящего с 1127 года. Минарет был столь поразителен, что Чингисхан, разграбивший Бухару в 1220 году, приказал пощадить его, тогда как всё остальное было разрушено. Рядом стоит мечеть Калян, вмещающая двенадцать тысяч молящихся, и медресе Мири-Араб, обучающее исламских учёных непрерывно почти пять веков. Комплекс остаётся духовным сердцем Бухары — города, некогда известного как Столп Ислама, где на каждом углу была действующая мечеть.",
  },
  "ark-fortress": {
    en: "The Ark of Bukhara is a city within a city. For two thousand years it served as the residence of the emirs, with mosques, treasuries, a harem, a prison, and stables all enclosed within massive earthen walls. The current structure dates largely to the eighteenth century, though the foundations are far older. In 1920, the Bolshevik general Frunze bombarded the Ark from the air, and most of the interior was destroyed. The last emir fled to Afghanistan with the treasury on horseback. Today the ruins house a museum where you can still see the throne room, the mint, and a small portion of what was once a self-contained royal city.",
    uz: "Buxoro Arki — shahar ichidagi shahar. Ikki ming yil davomida amirlar qarorgohi bo'lib xizmat qildi — masjidlar, xazinalar, harem, qamoqxona va otxonalar barchasi katta loy devorlar ichida edi. Hozirgi inshoot asosan o'n sakkizinchi asrga oid, ammo poydevorlar ancha qadimgi. 1920-yilda bolshevik generali Frunze Arkni havodan bombardimon qildi, ichki qismi katta qismi vayron bo'ldi. Oxirgi amir xazina bilan otda Afg'onistonga qochdi. Bugun xarobalar muzey bo'lib xizmat qiladi — taxt zalini, zarbxonani va bir vaqtlar yopiq qirol shahri bo'lgan joyning kichik qismini ko'rishingiz mumkin.",
    ru: "Арк Бухары — город внутри города. Две тысячи лет он служил резиденцией эмиров — мечети, сокровищницы, гарем, тюрьма и конюшни заключены в массивных земляных стенах. Нынешнее сооружение в основном относится к восемнадцатому веку, хотя фундамент гораздо древнее. В 1920 году большевистский генерал Фрунзе бомбардировал Арк с воздуха, и большая часть интерьера была разрушена. Последний эмир бежал в Афганистан с казной верхом на коне. Сегодня в руинах располагается музей, где ещё можно увидеть тронный зал, монетный двор и небольшую часть того, что когда-то было замкнутым царским городом.",
  },
  "itchan-kala": {
    en: "Itchan Kala is the inner walled city of Khiva — a UNESCO World Heritage site since 1990 and arguably the best-preserved oasis-city on the Silk Road. Within its mud-brick walls, which rise ten metres high and stretch over two kilometres, you find more than fifty historic monuments packed into just twenty-six hectares. Unlike Samarkand or Bukhara, Khiva preserved its medieval form because of its remoteness. Caravans crossing the Karakum desert paused here for water and shelter; in the nineteenth century, Khiva was a slave market and a feared khanate. Walking these lanes at dawn, before the tour groups arrive, you can still hear the silence the caravans heard.",
    uz: "Ichan Qal'a — Xivaning ichki devorli shahri — 1990-yildan UNESCO Jahon merosi obyekti va bo'lishi mumkin Ipak Yo'lidagi eng yaxshi saqlangan voha-shahar. Uning loy g'ishtli devorlari — o'n metr balandlikda va ikki kilometrdan oshiq cho'zilgan — ichida ellikdan ortiq tarixiy yodgorliklar bor, faqat yigirma olti gektarda zich joylashgan. Samarqand yoki Buxorodan farqli o'laroq, Xiva o'zining olis joylashuvi tufayli o'rta asr qiyofasini saqlab qolgan. Qoraqum cho'lini kesib o'tgan karvonlar bu yerda suv va boshpana uchun to'xtaganlar; o'n to'qqizinchi asrda Xiva qul bozori va qo'rqinchli xonlik edi. Sahar paytida — turistlar guruhlari kelishidan oldin — bu ko'chalarda yurib, karvonlar eshitgan sukunatni eshitishingiz mumkin.",
    ru: "Ичан-Кала — внутренний обнесённый стенами город Хивы. С 1990 года объект Всемирного наследия ЮНЕСКО и, пожалуй, лучше всего сохранившийся город-оазис Шёлкового пути. В его глинобитных стенах высотой десять метров и протяжённостью более двух километров находится более пятидесяти исторических памятников, плотно расположенных всего на двадцати шести гектарах. В отличие от Самарканда или Бухары, Хива сохранила свой средневековый облик благодаря отдалённости. Караваны, пересекавшие пустыню Каракумы, останавливались здесь для воды и приюта; в девятнадцатом веке Хива была невольничьим рынком и грозным ханством. Прогуливаясь по этим улочкам на рассвете, до прихода туристов, вы ещё можете услышать тишину, которую слышали караваны.",
  },
  "kalta-minor": {
    en: "Kalta Minor means short minaret in Uzbek — and it was never meant to be short. Begun in 1851 by Khan Muhammad Amin, it was intended to be the tallest minaret in the Islamic world, perhaps a hundred metres high, from which one could see all the way to Bukhara. But the Khan died in 1855 and construction halted, leaving the tower at just twenty-nine metres. The result is unique: a stubby, perfectly cylindrical minaret entirely covered in glazed turquoise, green, and white tiles — the only minaret in Central Asia to be fully clad in ceramic. What was meant to be an architectural disappointment became Khiva's most photographed landmark.",
    uz: "Kalta Minor — o'zbekchada kalta minora ma'nosini bildiradi, ammo u kalta bo'lishi mo'ljallanmagan edi. 1851-yilda Muhammad Amin Xon tomonidan boshlangan minora islom olamidagi eng baland minora bo'lishi rejalashtirilgan — taxminan yuz metr balandlikda, undan Buxorogacha ko'rinardi. Lekin xon 1855-yilda vafot etdi va qurilish to'xtab qoldi, minora atigi yigirma to'qqiz metrda qoldi. Natija o'ziga xos: kalta, mukammal silindr shaklidagi minora butunlay sirlangan feruza, yashil va oq koshinlarda — Markaziy Osiyodagi yagona to'liq koshindor minora. Arxitektura quvonchsizligi bo'lishi kerak edi — Xivaning eng ko'p suratga olinadigan yodgorligiga aylandi.",
    ru: "Кальта-Минор означает по-узбекски короткий минарет — но коротким он быть не был задуман. Начатый в 1851 году ханом Мухаммад Амином, он должен был стать высочайшим минаретом исламского мира — около ста метров, с которого было бы видно до самой Бухары. Но хан умер в 1855 году, строительство остановилось, и башня осталась высотой всего двадцать девять метров. Результат уникален: коренастый, идеально цилиндрический минарет, полностью покрытый глазурованной бирюзой, зеленью и белой плиткой — единственный минарет в Центральной Азии, полностью облицованный керамикой. То, что должно было стать архитектурной неудачей, стало самым фотографируемым памятником Хивы.",
  },
  "khast-imam": {
    en: "The Khast Imam Complex in Tashkent is the spiritual heart of the city — a courtyard of mosques and madrasas built around the tomb of Kaffal Shashi, a tenth-century poet, scholar, and Islamic philosopher. The complex's most precious treasure lies in its library: the Uthman Quran, written in the seventh century — only two decades after the Prophet Muhammad's death. According to tradition, this is the very Quran being read by the Caliph Uthman when he was assassinated, and dark stains on its pages are said to be his blood. Whatever the truth, paleographers confirm the manuscript is among the oldest surviving Qurans in the world. UNESCO listed it as a Memory of the World document in 1997.",
    uz: "Toshkentdagi Hazrati Imom kompleksi — shaharning ruhoniy yuragi. Masjidlar va madrasalar bilan o'rab olingan hovli, X asr shoiri, olimi va islom faylasufi Qaffol Shoshiy maqbarasi atrofida qurilgan. Kompleksning eng qimmatli xazinasi kutubxonasida saqlanadi: VII asrda — payg'ambar Muhammad vafotidan atigi yigirma yil keyin yozilgan Usmon Qur'oni. Rivoyatga ko'ra, bu Xalifa Usmon o'ldirilgan paytda o'qiyotgan Qur'on, sahifalardagi qora dog'lar uning qoni ekan deyiladi. Haqiqat qanday bo'lsa ham, paleograflar qo'lyozma dunyodagi eng qadimgi saqlanib qolgan Qur'onlardan biri ekanligini tasdiqladilar. 1997-yilda UNESCO uni Jahon Xotirasi hujjati sifatida ro'yxatga oldi.",
    ru: "Комплекс Хазрати-Имам в Ташкенте — духовное сердце города. Двор мечетей и медресе, построенный вокруг гробницы Каффаля Шаши, поэта, учёного и исламского философа десятого века. Самое драгоценное сокровище комплекса хранится в его библиотеке: Коран Усмана, написанный в седьмом веке — всего через два десятилетия после смерти пророка Мухаммеда. По преданию, это тот самый Коран, который читал халиф Усман в момент своего убийства, и тёмные пятна на страницах — его кровь. Каким бы ни была правда, палеографы подтверждают, что рукопись — одна из старейших сохранившихся Коранов в мире. ЮНЕСКО внесло её в список документального наследия Память мира в 1997 году.",
  },
};
