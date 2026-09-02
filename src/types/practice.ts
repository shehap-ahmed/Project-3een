export type ActivityStatus = 'locked' | 'available' | 'completed';

export type ActivityType = 
  | 'meet-letters'
  | 'letter-connections'
  | 'harakat'
  | 'hear-recognize'
  | 'final-challenge'
  | 'custom';

export interface LetterExample {
  position: 'beginning' | 'middle' | 'end' | 'isolated';
  positionLabel: string; // e.g. "Beginning (بـ...)", "Middle (ـبـ...)", "End (...ـب)"
  word: string;
  transliteration?: string;
  meaning: string;
  audio?: string;
  targetLetter: string;
}

export interface ArabicLetter {
  id: string;
  arabic: string;
  name: string;
  transliteration: string;
  audio?: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  isNonConnector?: boolean; // e.g. ا, د, ذ, ر, ز, و
  examples: LetterExample[];
}

export interface LetterGroup {
  groupNumber: number;
  title: string;
  letters: ArabicLetter[];
}

export interface ConnectionExample {
  id: string;
  letter: string;
  letterName: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  notes?: string;
  isNonConnector?: boolean;
}

export interface WordBuildExample {
  id: string;
  letters: string[];
  connectedWord: string;
  transliteration: string;
  meaning: string;
  audio?: string;
  explanation: string;
}

export interface HarakaItem {
  id: string;
  symbol: string;
  name: string;
  arabicName: string;
  sound: string;
  placement: string;
  description: string;
  audio?: string;
  examples: {
    letter: string;
    letterWithHaraka: string;
    pronunciation: string;
    audio?: string;
  }[];
}

export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
  audio?: string;
  subtext?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  promptArabic?: string;
  audioPrompt?: string;
  category: 'letters' | 'harakat' | 'listening' | 'connections';
  categoryLabel: string;
  options: QuizOption[];
  explanation?: string;
}

export interface PracticeActivity {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  description: string;
  type: ActivityType;
  estimatedMinutes?: number;
  placement?: 'inline' | 'sidebar';
  data: any;
}

export interface PracticePathData {
  courseId: string;
  lessonId: number | string;
  lessonTitle: string;
  title: string;
  description: string;
  activities: PracticeActivity[];
}
