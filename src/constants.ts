export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'About', path: '/about' },
];

export const CONTACT_INFO = {
  email: 'learnarabic2021disc@gmail.com',
  discord: 'https://discord.gg/x52dtrhp3Y',
  instagram: 'https://www.instagram.com/learnarabic.dc',
};

export const COURSE_DATA = {
  id: 'msa-beginner-pilot',
  title: 'MSA Beginner Pilot Course',
  instructor: 'Angelo',
  structure: '5 main live lectures + 1 full review lecture',
  students: 'Tested with 2 students in a live demo',
  topics: [
    'Arabic Letters & Harakat',
    'Pronouns',
    'Sentence Types',
    'Verb Types',
    'Masculine & Feminine',
    'Review',
    'Final Exam',
  ],
  lessons: [
    { 
      id: 1, 
      title: 'Arabic Letters & Harakat', 
      videoId: 'https://www.youtube.com/embed/9biUuD5hmsA',
      description: "In this first lesson, we break down one of the most important basics in learning Arabic: Ḥarakāt (الحركات).\n\nYou’ll learn what ḥarakāt are, why they matter, and how they completely change the pronunciation and meaning of words. This lesson is perfect for beginners who want to build a strong foundation in reading and speaking Arabic correctly."
    },
    { 
      id: 2, 
      title: 'Pronouns', 
      videoId: 'https://www.youtube.com/embed/M6n1WLmMaPY',
      description: "In this lesson, we dive into pronouns in Modern Standard Arabic (MSA) — a key building block for forming sentences and speaking naturally.\n\nYou’ll learn how to refer to yourself and others correctly, whether you’re speaking, reading, or writing. This lesson is designed for beginners who want to start constructing real Arabic sentences with confidence."
    },
    { 
      id: 3, 
      title: 'Sentence Types', 
      videoId: 'https://www.youtube.com/embed/aalV5RQ5SQ8',
      description: "In this lesson, we dive into pronouns in Modern Standard Arabic (MSA) — a key building block for forming sentences and speaking naturally."
    },
    { 
      id: 4, 
      title: 'Verb Types', 
      videoId: 'https://www.youtube.com/embed/BTPTF0sTh7I',
      description: "In this lesson, we break down the different types of verbs in Arabic and how they are used in everyday language. Understanding verb types is essential for building correct sentences and expressing actions clearly."
    },
    { 
      id: 5, 
      title: 'Masculine & Feminine', 
      videoId: 'https://www.youtube.com/embed/Hy1QXDDyZlM',
      description: "In this lesson, we cover three essential concepts in Arabic: masculine and feminine forms, and how to negate sentences correctly.\n\nUnderstanding gender in Arabic is key to forming accurate sentences, while negation allows you to express what is not happening — a crucial part of real communication."
    },
    { id: 6, title: 'Full Review', videoId: 'placeholder6' },
  ],
};
