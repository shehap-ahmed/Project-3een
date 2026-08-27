/**
 * Master Audio Registry and File Linking for MSA Class 7
 * 
 * This file maps all audio recordings for questions and answers
 * across all pages (Q1–Q20 / Q1–Q25).
 */

export interface AudioEntry {
  id: number;
  type: 'question' | 'answer';
  key: string;
  audioPath: string;
  arabicText: string;
  englishText: string;
}

export interface QuestionAudioPair {
  id: number;
  page: number;
  question: {
    key: string;
    audioPath: string;
    arabic: string;
    english: string;
  };
  answer: {
    key: string;
    audioPath: string;
    arabic: string;
    english: string;
  };
}

/**
 * Mapping of all audio files for MSA Class 7 Questions & Answers
 */
export const MSA_CLASS_7_AUDIO_MAP: Record<string, string> = {
  // Page 1 (Questions 1 - 5)
  'q1': '/audio/msa-class-7/q1.mp3',
  'a1': '/audio/msa-class-7/a1.mp3',
  'q2': '/audio/msa-class-7/q2.mp3',
  'a2': '/audio/msa-class-7/a2.mp3',
  'q3': '/audio/msa-class-7/q3.mp3',
  'a3': '/audio/msa-class-7/a3.mp3',
  'q4': '/audio/msa-class-7/q4.mp3',
  'a4': '/audio/msa-class-7/a4.mp3',
  'q5': '/audio/msa-class-7/q5.mp3',
  'a5': '/audio/msa-class-7/a5.mp3',

  // Page 2 (Questions 6 - 10)
  'q6': '/audio/msa-class-7/q6.mp3',
  'a6': '/audio/msa-class-7/a6.mp3',
  'q7': '/audio/msa-class-7/q7.mp3',
  'a7': '/audio/msa-class-7/a7.mp3',
  'q8': '/audio/msa-class-7/q8.mp3',
  'a8': '/audio/msa-class-7/a8.mp3',
  'q9': '/audio/msa-class-7/q9.mp3',
  'a9': '/audio/msa-class-7/a9.mp3',
  'q10': '/audio/msa-class-7/q10.mp3',
  'a10': '/audio/msa-class-7/a10.mp3',

  // Page 3 (Questions 11 - 15)
  'q11': '/audio/msa-class-7/q11.mp3',
  'a11': '/audio/msa-class-7/a11.mp3',
  'q12': '/audio/msa-class-7/q12.mp3',
  'a12': '/audio/msa-class-7/a12.mp3',
  'q13': '/audio/msa-class-7/q13.mp3',
  'a13': '/audio/msa-class-7/a13.mp3',
  'q14': '/audio/msa-class-7/q14.mp3',
  'a14': '/audio/msa-class-7/a14.mp3',
  'q15': '/audio/msa-class-7/q15.mp3',
  'a15': '/audio/msa-class-7/a15.mp3',

  // Page 4 (Questions 16 - 20)
  'q16': '/audio/msa-class-7/q16.mp3',
  'a16': '/audio/msa-class-7/a16.mp3',
  'q17': '/audio/msa-class-7/q17.mp3',
  'a17': '/audio/msa-class-7/a17.mp3',
  'q18': '/audio/msa-class-7/q18.mp3',
  'a18': '/audio/msa-class-7/a18.mp3',
  'q19': '/audio/msa-class-7/q19.mp3',
  'a19': '/audio/msa-class-7/a19.mp3',
  'q20': '/audio/msa-class-7/q20.mp3',
  'a20': '/audio/msa-class-7/a20.mp3',

  // Page 5 (Questions 21 - 25)
  'q21': '/audio/msa-class-7/q21.mp3',
  'a21': '/audio/msa-class-7/a21.mp3',
  'q22': '/audio/msa-class-7/q22.mp3',
  'a22': '/audio/msa-class-7/a22.mp3',
  'q23': '/audio/msa-class-7/q23.mp3',
  'a23': '/audio/msa-class-7/a23.mp3',
  'q24': '/audio/msa-class-7/q24.mp3',
  'a24': '/audio/msa-class-7/a24.mp3',
  'q25': '/audio/msa-class-7/q25.mp3',
  'a25': '/audio/msa-class-7/a25.mp3',

  // Page 6 (Questions 26 - 30)
  'q26': '/audio/msa-class-7/q26.mp3',
  'a26': '/audio/msa-class-7/a26.mp3',
  'q27': '/audio/msa-class-7/q27.mp3',
  'a27': '/audio/msa-class-7/a27.mp3',
  'q28': '/audio/msa-class-7/q28.mp3',
  'a28': '/audio/msa-class-7/a28.mp3',
  'q29': '/audio/msa-class-7/q29.mp3',
  'a29': '/audio/msa-class-7/a29.mp3',
  'q30': '/audio/msa-class-7/q30.mp3',
  'a30': '/audio/msa-class-7/a30.mp3',

  // Page 7 (Questions 31 - 35)
  'q31': '/audio/msa-class-7/q31.mp3',
  'a31': '/audio/msa-class-7/a31.mp3',
  'q32': '/audio/msa-class-7/q32.mp3',
  'a32': '/audio/msa-class-7/a32.mp3',
  'q33': '/audio/msa-class-7/q33.mp3',
  'a33': '/audio/msa-class-7/a33.mp3',
  'q34': '/audio/msa-class-7/q34.mp3',
  'a34': '/audio/msa-class-7/a34.mp3',
  'q35': '/audio/msa-class-7/q35.mp3',
  'a35': '/audio/msa-class-7/a35.mp3',
};

/**
 * Full Structured Audio Registry with Arabic & English metadata
 */
export const MSA_CLASS_7_AUDIO_REGISTRY: QuestionAudioPair[] = [
  // Page 1
  {
    id: 1,
    page: 1,
    question: {
      key: 'q1',
      audioPath: '/audio/msa-class-7/q1.mp3',
      arabic: 'هَلْ تَسْتَيْقِظُ بَاكِراً؟',
      english: 'Do you wake up early?',
    },
    answer: {
      key: 'a1',
      audioPath: '/audio/msa-class-7/a1.mp3',
      arabic: 'نَعَمْ، أَسْتَيْقِظُ دَائِماً فِي السَّادِسَةِ صَبَاحاً.',
      english: 'Yes, I always wake up at 6 AM.',
    },
  },
  {
    id: 2,
    page: 1,
    question: {
      key: 'q2',
      audioPath: '/audio/msa-class-7/q2.mp3',
      arabic: 'مَاذَا تَشْرَبُ فِي الصَّبَاحِ؟',
      english: 'What do you drink in the morning?',
    },
    answer: {
      key: 'a2',
      audioPath: '/audio/msa-class-7/a2.mp3',
      arabic: 'أَشْرَبُ كُوباً مِنَ القَهْوَةِ الدَّافِئَةِ.',
      english: 'I drink a cup of warm coffee.',
    },
  },
  {
    id: 3,
    page: 1,
    question: {
      key: 'q3',
      audioPath: '/audio/msa-class-7/q3.mp3',
      arabic: 'هَلْ تُفَضِّلُ الشَّايَ أَمِ القَهْوَةَ؟',
      english: 'Do you prefer tea or coffee?',
    },
    answer: {
      key: 'a3',
      audioPath: '/audio/msa-class-7/a3.mp3',
      arabic: 'أُفَضِّلُ الشَّايَ الأَخْضَرَ.',
      english: 'I prefer green tea.',
    },
  },
  {
    id: 4,
    page: 1,
    question: {
      key: 'q4',
      audioPath: '/audio/msa-class-7/q4.mp3',
      arabic: 'أَيْنَ تَتَنَاوَلُ الغَدَاءَ؟',
      english: 'Where do you eat lunch?',
    },
    answer: {
      key: 'a4',
      audioPath: '/audio/msa-class-7/a4.mp3',
      arabic: 'أَتَنَاوَلُهُ فِي مَطْعَمِ الجَامِعَةِ.',
      english: 'I eat it at the university restaurant.',
    },
  },
  {
    id: 5,
    page: 1,
    question: {
      key: 'q5',
      audioPath: '/audio/msa-class-7/q5.mp3',
      arabic: 'مَتَى يَبْدَأُ دَوَامُكَ؟',
      english: 'When does your shift/work start?',
    },
    answer: {
      key: 'a5',
      audioPath: '/audio/msa-class-7/a5.mp3',
      arabic: 'يَبْدَأُ دَوَامِي فِي السَّاعَةِ الثَّامِنَةِ.',
      english: 'My shift starts at 8:00.',
    },
  },

  // Page 2
  {
    id: 6,
    page: 2,
    question: {
      key: 'q6',
      audioPath: '/audio/msa-class-7/q6.mp3',
      arabic: 'كَيْفَ تَذْهَبُ إِلَى العَمَلِ؟',
      english: 'How do you go to work?',
    },
    answer: {
      key: 'a6',
      audioPath: '/audio/msa-class-7/a6.mp3',
      arabic: 'أَذْهَبُ بِالسَّيَّارَةِ يَوْمِيّاً.',
      english: 'I go by car daily.',
    },
  },
  {
    id: 7,
    page: 2,
    question: {
      key: 'q7',
      audioPath: '/audio/msa-class-7/q7.mp3',
      arabic: 'هَلْ تُحِبُّ القِرَاءَةَ قَبْلَ النَّوْمِ؟',
      english: 'Do you like reading before sleeping?',
    },
    answer: {
      key: 'a7',
      audioPath: '/audio/msa-class-7/a7.mp3',
      arabic: 'نَعَمْ، أَقْرَأُ صَفَحَاتٍ قَلِيلَةً.',
      english: 'Yes, I read a few pages.',
    },
  },
  {
    id: 8,
    page: 2,
    question: {
      key: 'q8',
      audioPath: '/audio/msa-class-7/q8.mp3',
      arabic: 'مَاذَا تَفْعَلُ فِي وَقْتِ الفَرَاغِ؟',
      english: 'What do you do in your free time?',
    },
    answer: {
      key: 'a8',
      audioPath: '/audio/msa-class-7/a8.mp3',
      arabic: 'أُحِبُّ الرَّسْمَ.',
      english: 'I like drawing / painting.',
    },
  },
  {
    id: 9,
    page: 2,
    question: {
      key: 'q9',
      audioPath: '/audio/msa-class-7/q9.mp3',
      arabic: 'هَلْ تُنَظِّفُ غُرْفَتَكَ يَوْمِيّاً؟',
      english: 'Do you clean your room daily?',
    },
    answer: {
      key: 'a9',
      audioPath: '/audio/msa-class-7/a9.mp3',
      arabic: 'لَا، أُنَظِّفُهَا مَرَّتَيْنِ فِي الأُسْبُوعِ.',
      english: 'No, I clean it twice a week.',
    },
  },
  {
    id: 10,
    page: 2,
    question: {
      key: 'q10',
      audioPath: '/audio/msa-class-7/q10.mp3',
      arabic: 'أَيْنَ تَتَسَوَّقُ عَادَةً؟',
      english: 'Where do you usually shop?',
    },
    answer: {
      key: 'a10',
      audioPath: '/audio/msa-class-7/a10.mp3',
      arabic: 'أَتَسَوَّقُ مِنْ مَرْكَزٍ تِجَارِيٍّ.',
      english: 'I shop at a shopping mall / commercial center.',
    },
  },

  // Page 3
  {
    id: 11,
    page: 3,
    question: {
      key: 'q11',
      audioPath: '/audio/msa-class-7/q11.mp3',
      arabic: 'هَلْ تَخْرُجُ مَعَ أَصْدِقَائِكَ؟',
      english: 'Are you going out with your friends?',
    },
    answer: {
      key: 'a11',
      audioPath: '/audio/msa-class-7/a11.mp3',
      arabic: 'نَعَمْ، سَنَذْهَبُ لِلْمُتَنَزَّهِ.',
      english: 'Yes, we will go to the park.',
    },
  },
  {
    id: 12,
    page: 3,
    question: {
      key: 'q12',
      audioPath: '/audio/msa-class-7/q12.mp3',
      arabic: 'مَتَى تَغْسِلُ مَلَابِسَكَ؟',
      english: 'When do you wash your clothes?',
    },
    answer: {
      key: 'a12',
      audioPath: '/audio/msa-class-7/a12.mp3',
      arabic: 'أَغْسِلُهَا يَوْمَ السَّبْتِ.',
      english: 'I wash them on Saturday.',
    },
  },
  {
    id: 13,
    page: 3,
    question: {
      key: 'q13',
      audioPath: '/audio/msa-class-7/q13.mp3',
      arabic: 'هَلْ تَرْكَبُ الحَافِلَةَ؟',
      english: 'Do you take the bus?',
    },
    answer: {
      key: 'a13',
      audioPath: '/audio/msa-class-7/a13.mp3',
      arabic: 'نَعَمْ، الحَافِلَةُ وَسِيلَةٌ سَهْلَةٌ.',
      english: 'Yes, the bus is an easy way.',
    },
  },
  {
    id: 14,
    page: 3,
    question: {
      key: 'q14',
      audioPath: '/audio/msa-class-7/q14.mp3',
      arabic: 'مَا هُوَ طَبَقُكَ المُفَضَّلُ؟',
      english: 'What is your favorite dish?',
    },
    answer: {
      key: 'a14',
      audioPath: '/audio/msa-class-7/a14.mp3',
      arabic: 'طَبَقِي المُفَضَّلُ هُوَ المَنْسَفُ.',
      english: 'My favorite dish is Mansaf.',
    },
  },
  {
    id: 15,
    page: 3,
    question: {
      key: 'q15',
      audioPath: '/audio/msa-class-7/q15.mp3',
      arabic: 'هَلْ تُحِبُّ طَهْيَ الطَّعَامِ؟',
      english: 'Do you like cooking food?',
    },
    answer: {
      key: 'a15',
      audioPath: '/audio/msa-class-7/a15.mp3',
      arabic: 'نَعَمْ، أُحِبُّ التَّجْرِبَةَ.',
      english: 'Yes, I love experimenting.',
    },
  },

  // Page 4
  {
    id: 16,
    page: 4,
    question: {
      key: 'q16',
      audioPath: '/audio/msa-class-7/q16.mp3',
      arabic: 'هَلْ حَقِيبَتُكَ ثَقِيلَةٌ؟',
      english: 'Is your bag heavy?',
    },
    answer: {
      key: 'a16',
      audioPath: '/audio/msa-class-7/a16.mp3',
      arabic: 'لَا، هِيَ خَفِيفَةٌ جِدّاً.',
      english: 'No, it is very light.',
    },
  },
  {
    id: 17,
    page: 4,
    question: {
      key: 'q17',
      audioPath: '/audio/msa-class-7/q17.mp3',
      arabic: 'مَا لَوْنُ قَمِيصِكَ؟',
      english: 'What is the color of your shirt?',
    },
    answer: {
      key: 'a17',
      audioPath: '/audio/msa-class-7/a17.mp3',
      arabic: 'لَوْنُهُ أَزْرَقُ فَاتِحٌ.',
      english: 'It is light blue.',
    },
  },
  {
    id: 18,
    page: 4,
    question: {
      key: 'q18',
      audioPath: '/audio/msa-class-7/q18.mp3',
      arabic: 'هَلِ الشَّارِعُ مُزْدَحِمٌ؟',
      english: 'Is the street crowded?',
    },
    answer: {
      key: 'a18',
      audioPath: '/audio/msa-class-7/a18.mp3',
      arabic: 'نَعَمْ، هُنَاكَ سَيَّارَاتٌ كَثِيرَةٌ.',
      english: 'Yes, there are many cars.',
    },
  },
  {
    id: 19,
    page: 4,
    question: {
      key: 'q19',
      audioPath: '/audio/msa-class-7/q19.mp3',
      arabic: 'كَيْفَ هُوَ الطَّقْسُ؟',
      english: 'How is the weather?',
    },
    answer: {
      key: 'a19',
      audioPath: '/audio/msa-class-7/a19.mp3',
      arabic: 'جَوٌّ مُشْمِسٌ وَجَمِيلٌ.',
      english: 'The weather is sunny and beautiful.',
    },
  },
  {
    id: 20,
    page: 4,
    question: {
      key: 'q20',
      audioPath: '/audio/msa-class-7/q20.mp3',
      arabic: 'هَلْ غُرْفَتُكَ مُرَتَّبَةٌ؟',
      english: 'Is your room tidy?',
    },
    answer: {
      key: 'a20',
      audioPath: '/audio/msa-class-7/a20.mp3',
      arabic: 'نَعَمْ، هِيَ مُنَظَّمَةٌ جِدّاً.',
      english: 'Yes, it is very organized.',
    },
  },
];

/**
 * Helper to get question audio file path by question ID
 */
export function getQuestionAudio(questionId: number): string | undefined {
  return MSA_CLASS_7_AUDIO_MAP[`q${questionId}`];
}

/**
 * Helper to get answer audio file path by question ID
 */
export function getAnswerAudio(questionId: number): string | undefined {
  return MSA_CLASS_7_AUDIO_MAP[`a${questionId}`];
}

/**
 * Helper to get audio file path by generic key (e.g. 'q1', 'a1')
 */
export function getAudioByKey(key: string): string | undefined {
  return MSA_CLASS_7_AUDIO_MAP[key];
}
