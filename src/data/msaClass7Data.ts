export interface QAItem {
  id: number;
  sectionId: number;
  questionArabic: string;
  questionEnglish: string;
  questionAudio?: string;
  answerArabic: string;
  answerEnglish: string;
  answerAudio?: string;
}

export interface SectionMeta {
  id: number;
  title: string;
  arabicTitle: string;
  questionRange: string;
}

// 24 Sections metadata (5 questions each = 120 Q&A pairs)
export const SECTIONS_META: SectionMeta[] = Array.from({ length: 24 }, (_, i) => {
  const sectionId = i + 1;
  const start = (sectionId - 1) * 5 + 1;
  const end = sectionId * 5;
  return {
    id: sectionId,
    title: `Section ${sectionId}`,
    arabicTitle: `القسم ${sectionId}`,
    questionRange: `Questions ${start}–${end}`,
  };
});

export const MSA_CLASS_7_DATA: QAItem[] = [
  // SECTION 1: Questions 1 - 5
  {
    id: 1,
    sectionId: 1,
    questionArabic: "هَلْ تَسْتَيْقِظُ بَاكِراً؟",
    questionEnglish: "Do you wake up early?",
    questionAudio: "/audio/msa-class-7/q1.mp3",
    answerArabic: "نَعَمْ، أَسْتَيْقِظُ دَائِماً فِي السَّادِسَةِ صَبَاحاً.",
    answerEnglish: "Yes, I always wake up at 6 AM.",
    answerAudio: "/audio/msa-class-7/a1.mp3",
  },
  {
    id: 2,
    sectionId: 1,
    questionArabic: "مَاذَا تَشْرَبُ فِي الصَّبَاحِ؟",
    questionEnglish: "What do you drink in the morning?",
    questionAudio: "/audio/msa-class-7/q2.mp3",
    answerArabic: "أَشْرَبُ كُوباً مِنَ القَهْوَةِ الدَّافِئَةِ.",
    answerEnglish: "I drink a cup of warm coffee.",
    answerAudio: "/audio/msa-class-7/a2.mp3",
  },
  {
    id: 3,
    sectionId: 1,
    questionArabic: "هَلْ تُفَضِّلُ الشَّايَ أَمِ القَهْوَةَ؟",
    questionEnglish: "Do you prefer tea or coffee?",
    questionAudio: "/audio/msa-class-7/q3.mp3",
    answerArabic: "أُفَضِّلُ الشَّايَ الأَخْضَرَ.",
    answerEnglish: "I prefer green tea.",
    answerAudio: "/audio/msa-class-7/a3.mp3",
  },
  {
    id: 4,
    sectionId: 1,
    questionArabic: "أَيْنَ تَتَنَاوَلُ الغَدَاءَ؟",
    questionEnglish: "Where do you eat lunch?",
    questionAudio: "/audio/msa-class-7/q4.mp3",
    answerArabic: "أَتَنَاوَلُهُ فِي مَطْعَمِ الجَامِعَةِ.",
    answerEnglish: "I eat it at the university restaurant.",
    answerAudio: "/audio/msa-class-7/a4.mp3",
  },
  {
    id: 5,
    sectionId: 1,
    questionArabic: "مَتَى يَبْدَأُ دَوَامُكَ؟",
    questionEnglish: "When does your shift/work start?",
    questionAudio: "/audio/msa-class-7/q5.mp3",
    answerArabic: "يَبْدَأُ دَوَامِي فِي السَّاعَةِ الثَّامِنَةِ.",
    answerEnglish: "My shift starts at 8:00.",
    answerAudio: "/audio/msa-class-7/a5.mp3",
  },

  // SECTION 2: Questions 6 - 10
  {
    id: 6,
    sectionId: 2,
    questionArabic: "كَيْفَ تَذْهَبُ إِلَى العَمَلِ؟",
    questionEnglish: "How do you go to work?",
    questionAudio: "/audio/msa-class-7/q6.mp3",
    answerArabic: "أَذْهَبُ بِالسَّيَّارَةِ يَوْمِيّاً.",
    answerEnglish: "I go by car daily.",
    answerAudio: "/audio/msa-class-7/a6.mp3",
  },
  {
    id: 7,
    sectionId: 2,
    questionArabic: "هَلْ تُحِبُّ القِرَاءَةَ قَبْلَ النَّوْمِ؟",
    questionEnglish: "Do you like reading before sleeping?",
    questionAudio: "/audio/msa-class-7/q7.mp3",
    answerArabic: "نَعَمْ، أَقْرَأُ صَفَحَاتٍ قَلِيلَةً.",
    answerEnglish: "Yes, I read a few pages.",
    answerAudio: "/audio/msa-class-7/a7.mp3",
  },
  {
    id: 8,
    sectionId: 2,
    questionArabic: "مَاذَا تَفْعَلُ فِي وَقْتِ الفَرَاغِ؟",
    questionEnglish: "What do you do in your free time?",
    questionAudio: "/audio/msa-class-7/q8.mp3",
    answerArabic: "أُحِبُّ الرَّسْمَ.",
    answerEnglish: "I like drawing / painting.",
    answerAudio: "/audio/msa-class-7/a8.mp3",
  },
  {
    id: 9,
    sectionId: 2,
    questionArabic: "هَلْ تُنَظِّفُ غُرْفَتَكَ يَوْمِيّاً؟",
    questionEnglish: "Do you clean your room daily?",
    questionAudio: "/audio/msa-class-7/q9.mp3",
    answerArabic: "لَا، أُنَظِّفُهَا مَرَّتَيْنِ فِي الأُسْبُوعِ.",
    answerEnglish: "No, I clean it twice a week.",
    answerAudio: "/audio/msa-class-7/a9.mp3",
  },
  {
    id: 10,
    sectionId: 2,
    questionArabic: "أَيْنَ تَتَسَوَّقُ عَادَةً؟",
    questionEnglish: "Where do you usually shop?",
    questionAudio: "/audio/msa-class-7/q10.mp3",
    answerArabic: "أَتَسَوَّقُ مِنْ مَرْكَزٍ تِجَارِيٍّ.",
    answerEnglish: "I shop at a shopping mall / commercial center.",
    answerAudio: "/audio/msa-class-7/a10.mp3",
  },

  // SECTION 3: Questions 11 - 15
  {
    id: 11,
    sectionId: 3,
    questionArabic: "هَلْ تَخْرُجُ مَعَ أَصْدِقَائِكَ؟",
    questionEnglish: "Are you going out with your friends?",
    questionAudio: "/audio/msa-class-7/q11.mp3",
    answerArabic: "نَعَمْ، سَنَذْهَبُ لِلْمُتَنَزَّهِ.",
    answerEnglish: "Yes, we will go to the park.",
    answerAudio: "/audio/msa-class-7/a11.mp3",
  },
  {
    id: 12,
    sectionId: 3,
    questionArabic: "مَتَى تَغْسِلُ مَلَابِسَكَ؟",
    questionEnglish: "When do you wash your clothes?",
    questionAudio: "/audio/msa-class-7/q12.mp3",
    answerArabic: "أَغْسِلُهَا يَوْمَ السَّبْتِ.",
    answerEnglish: "I wash them on Saturday.",
    answerAudio: "/audio/msa-class-7/a12.mp3",
  },
  {
    id: 13,
    sectionId: 3,
    questionArabic: "هَلْ تَرْكَبُ الحَافِلَةَ؟",
    questionEnglish: "Do you take the bus?",
    questionAudio: "/audio/msa-class-7/q13.mp3",
    answerArabic: "نَعَمْ، الحَافِلَةُ وَسِيلَةٌ سَهْلَةٌ.",
    answerEnglish: "Yes, the bus is an easy way.",
    answerAudio: "/audio/msa-class-7/a13.mp3",
  },
  {
    id: 14,
    sectionId: 3,
    questionArabic: "مَا هُوَ طَبَقُكَ المُفَضَّلُ؟",
    questionEnglish: "What is your favorite dish?",
    questionAudio: "/audio/msa-class-7/q14.mp3",
    answerArabic: "طَبَقِي المُفَضَّلُ هُوَ المَنْسَفُ.",
    answerEnglish: "My favorite dish is Mansaf.",
    answerAudio: "/audio/msa-class-7/a14.mp3",
  },
  {
    id: 15,
    sectionId: 3,
    questionArabic: "هَلْ تُحِبُّ طَهْيَ الطَّعَامِ؟",
    questionEnglish: "Do you like cooking food?",
    questionAudio: "/audio/msa-class-7/q15.mp3",
    answerArabic: "نَعَمْ، أُحِبُّ التَّجْرِبَةَ.",
    answerEnglish: "Yes, I love experimenting.",
    answerAudio: "/audio/msa-class-7/a15.mp3",
  },

  // SECTION 4: Questions 16 - 20
  {
    id: 16,
    sectionId: 4,
    questionArabic: "هَلْ حَقِيبَتُكَ ثَقِيلَةٌ؟",
    questionEnglish: "Is your bag heavy?",
    questionAudio: "/audio/msa-class-7/q16.mp3",
    answerArabic: "لَا، هِيَ خَفِيفَةٌ جِدّاً.",
    answerEnglish: "No, it is very light.",
    answerAudio: "/audio/msa-class-7/a16.mp3",
  },
  {
    id: 17,
    sectionId: 4,
    questionArabic: "مَا لَوْنُ قَمِيصِكَ؟",
    questionEnglish: "What is the color of your shirt?",
    questionAudio: "/audio/msa-class-7/q17.mp3",
    answerArabic: "لَوْنُهُ أَزْرَقُ فَاتِحٌ.",
    answerEnglish: "It is light blue.",
    answerAudio: "/audio/msa-class-7/a17.mp3",
  },
  {
    id: 18,
    sectionId: 4,
    questionArabic: "هَلِ الشَّارِعُ مُزْدَحِمٌ؟",
    questionEnglish: "Is the street crowded?",
    questionAudio: "/audio/msa-class-7/q18.mp3",
    answerArabic: "نَعَمْ، هُنَاكَ سَيَّارَاتٌ كَثِيرَةٌ.",
    answerEnglish: "Yes, there are many cars.",
    answerAudio: "/audio/msa-class-7/a18.mp3",
  },
  {
    id: 19,
    sectionId: 4,
    questionArabic: "كَيْفَ هُوَ الطَّقْسُ؟",
    questionEnglish: "How is the weather?",
    questionAudio: "/audio/msa-class-7/q19.mp3",
    answerArabic: "جَوٌّ مُشْمِسٌ وَجَمِيلٌ.",
    answerEnglish: "The weather is sunny and beautiful.",
    answerAudio: "/audio/msa-class-7/a19.mp3",
  },
  {
    id: 20,
    sectionId: 4,
    questionArabic: "هَلْ غُرْفَتُكَ مُرَتَّبَةٌ؟",
    questionEnglish: "Is your room tidy?",
    questionAudio: "/audio/msa-class-7/q20.mp3",
    answerArabic: "نَعَمْ، هِيَ مُنَظَّمَةٌ جِدّاً.",
    answerEnglish: "Yes, it is very organized.",
    answerAudio: "/audio/msa-class-7/a20.mp3",
  },

  // SECTION 5: Questions 21 - 25
  {
    id: 21,
    sectionId: 5,
    questionArabic: "هَلْ هَذَا الكِتَابُ مُفِيدٌ؟",
    questionEnglish: "Is this book useful?",
    questionAudio: "/audio/msa-class-7/q21.mp3",
    answerArabic: "نَعَمْ، تَعَلَّمْتُ مِنْهُ الكَثِيرَ.",
    answerEnglish: "Yes, I learned a lot from it.",
    answerAudio: "/audio/msa-class-7/a21.mp3",
  },
  {
    id: 22,
    sectionId: 5,
    questionArabic: "هَلْ هَاتِفُكَ حَدِيثٌ؟",
    questionEnglish: "Is your phone modern?",
    questionAudio: "/audio/msa-class-7/q22.mp3",
    answerArabic: "نَعَمْ، اشْتَرَيْتُهُ مُؤَخَّراً.",
    answerEnglish: "Yes, I bought it recently.",
    answerAudio: "/audio/msa-class-7/a22.mp3",
  },
  {
    id: 23,
    sectionId: 5,
    questionArabic: "هَلِ الغُرْفَةُ وَاسِعَةٌ؟",
    questionEnglish: "Is the room spacious?",
    questionAudio: "/audio/msa-class-7/q23.mp3",
    answerArabic: "نَعَمْ، مِسَاحَتُهَا كَبِيرَةٌ.",
    answerEnglish: "Yes, its area is large.",
    answerAudio: "/audio/msa-class-7/a23.mp3",
  },
  {
    id: 24,
    sectionId: 5,
    questionArabic: "هَلِ القَهْوَةُ سَاخِنَةٌ؟",
    questionEnglish: "Is the coffee hot?",
    questionAudio: "/audio/msa-class-7/q24.mp3",
    answerArabic: "نَعَمْ، انْتَظِرْ حَتَّى تَبْرُدَ.",
    answerEnglish: "Yes, wait until it cools down.",
    answerAudio: "/audio/msa-class-7/a24.mp3",
  },
  {
    id: 25,
    sectionId: 5,
    questionArabic: "هَلِ الطَّرِيقُ طَوِيلٌ؟",
    questionEnglish: "Is the road long?",
    questionAudio: "/audio/msa-class-7/q25.mp3",
    answerArabic: "لَا، سَنَصِلُ قَرِيباً.",
    answerEnglish: "No, we will arrive soon.",
    answerAudio: "/audio/msa-class-7/a25.mp3",
  },

  // SECTION 6: Questions 26 - 30
  {
    id: 26,
    sectionId: 6,
    questionArabic: "هَلِ المَلَابِسُ مُبَلَّلَةٌ؟",
    questionEnglish: "Are the clothes wet?",
    questionAudio: "/audio/msa-class-7/q26.mp3",
    answerArabic: "نَعَمْ، بِسَبَبِ المَطَرِ.",
    answerEnglish: "Yes, because of the rain.",
    answerAudio: "/audio/msa-class-7/a26.mp3",
  },
  {
    id: 27,
    sectionId: 6,
    questionArabic: "هَلِ السَّرِيرُ مُرِيحٌ؟",
    questionEnglish: "Is the bed comfortable?",
    questionAudio: "/audio/msa-class-7/q27.mp3",
    answerArabic: "جِدّاً، نِمْتُ عَلَيْهِ بِعُمْقٍ.",
    answerEnglish: "Very, I slept deeply on it.",
    answerAudio: "/audio/msa-class-7/a27.mp3",
  },
  {
    id: 28,
    sectionId: 6,
    questionArabic: "هَلِ الطَّعَامُ مَالِحٌ؟",
    questionEnglish: "Is the food salty?",
    questionAudio: "/audio/msa-class-7/q28.mp3",
    answerArabic: "قَلِيلاً، سَأَزِيدُ المَاءَ.",
    answerEnglish: "A little, I will increase the water.",
    answerAudio: "/audio/msa-class-7/a28.mp3",
  },
  {
    id: 29,
    sectionId: 6,
    questionArabic: "هَلِ الحَائِطُ نَظِيفٌ؟",
    questionEnglish: "Is the wall clean?",
    questionAudio: "/audio/msa-class-7/q29.mp3",
    answerArabic: "نَعَمْ، قُمْنَا بِطِلَائِهِ.",
    answerEnglish: "Yes, we painted it.",
    answerAudio: "/audio/msa-class-7/a29.mp3",
  },
  {
    id: 30,
    sectionId: 6,
    questionArabic: "هَلِ الشُّبَّاكُ مَفْتُوحٌ؟",
    questionEnglish: "Is the window open?",
    questionAudio: "/audio/msa-class-7/q30.mp3",
    answerArabic: "لَا، أَغْلَقْتُهُ الآنَ.",
    answerEnglish: "No, I closed it now.",
    answerAudio: "/audio/msa-class-7/a30.mp3",
  },

  // SECTION 7: Questions 31 - 35
  {
    id: 31,
    sectionId: 7,
    questionArabic: "هَلْ تُجِيدُ السِّبَاحَةَ؟",
    questionEnglish: "Are you good at swimming?",
    questionAudio: "/audio/msa-class-7/q31.mp3",
    answerArabic: "نَعَمْ، تَعَلَّمْتُهَا مُنْذُ الصِّغَرِ.",
    answerEnglish: "Yes, I learned it since childhood.",
    answerAudio: "/audio/msa-class-7/a31.mp3",
  },
  {
    id: 32,
    sectionId: 7,
    questionArabic: "مَا هِيَ مَوْهِبَتُكَ؟",
    questionEnglish: "What is your talent?",
    questionAudio: "/audio/msa-class-7/q32.mp3",
    answerArabic: "مَوْهِبَتِي هِيَ العَزْفُ.",
    answerEnglish: "My talent is playing music.",
    answerAudio: "/audio/msa-class-7/a32.mp3",
  },
  {
    id: 33,
    sectionId: 7,
    questionArabic: "هَلْ تُحِبُّ التَّصْوِيرَ؟",
    questionEnglish: "Do you like photography?",
    questionAudio: "/audio/msa-class-7/q33.mp3",
    answerArabic: "نَعَمْ، أُحِبُّ صُوَرَ الطَّبِيعَةِ.",
    answerEnglish: "Yes, I like nature photos.",
    answerAudio: "/audio/msa-class-7/a33.mp3",
  },
  {
    id: 34,
    sectionId: 7,
    questionArabic: "أَيَّ رِيَاضَةٍ تُمَارِسُ؟",
    questionEnglish: "What sport do you practice?",
    questionAudio: "/audio/msa-class-7/q34.mp3",
    answerArabic: "أُمَارِسُ كُرَةَ القَدَمِ.",
    answerEnglish: "I practice football.",
    answerAudio: "/audio/msa-class-7/a34.mp3",
  },
  {
    id: 35,
    sectionId: 7,
    questionArabic: "هَلْ تُشَاهِدُ الأَفْلَامَ؟",
    questionEnglish: "Do you watch movies?",
    questionAudio: "/audio/msa-class-7/q35.mp3",
    answerArabic: "نَعَمْ، أُفَضِّلُ الأَفْلَامَ القَصِيرَةَ.",
    answerEnglish: "Yes, I prefer short movies.",
    answerAudio: "/audio/msa-class-7/a35.mp3",
  },

  // SECTIONS 8 to 24 (Questions 36 - 120 Placeholders)
  ...Array.from({ length: 85 }, (_, idx) => {
    const qId = idx + 36;
    const secId = Math.floor((qId - 1) / 5) + 1;
    return {
      id: qId,
      sectionId: secId,
      questionArabic: `سؤال ${qId} (قيد الإضافة)`,
      questionEnglish: `Question ${qId} (Placeholder)`,
      questionAudio: `/audio/msa-class-7/q${qId}.mp3`,
      answerArabic: `إجابة ${qId} (قيد الإضافة)`,
      answerEnglish: `Answer ${qId} (Placeholder)`,
      answerAudio: `/audio/msa-class-7/a${qId}.mp3`,
    };
  })
];
