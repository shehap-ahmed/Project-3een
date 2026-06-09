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
      description: "In this first lesson, we break down Arabic harakat (vowel marks), what they are, and why they completely change how words are spoken."
    },
    { 
      id: 2, 
      title: 'Pronouns', 
      videoId: 'https://www.youtube.com/embed/M6n1WLmMaPY',
      description: "Let's learn pronouns. They are the key building blocks for making real sentences and speaking comfortably with others."
    },
    { 
      id: 3, 
      title: 'Sentence Types', 
      videoId: 'https://www.youtube.com/embed/aalV5RQ5SQ8',
      description: "We look at basic nominal and verbal sentence structures so you can start putting your vocabulary together."
    },
    { 
      id: 4, 
      title: 'Verb Types', 
      videoId: 'https://www.youtube.com/embed/BTPTF0sTh7I',
      description: "Verbs are the engine of speech. We'll show you how past and present verbs behave in daily conversations."
    },
    { 
      id: 5, 
      title: 'Masculine & Feminine', 
      videoId: 'https://www.youtube.com/embed/Hy1QXDDyZlM',
      description: "Gender and negation. How masculine and feminine words work, and how to say 'no' or deny an action in Arabic."
    },
    { id: 6, title: 'Full Review', videoId: 'placeholder6' },
  ],
};
