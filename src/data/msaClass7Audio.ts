/**
 * Master Audio Registry and File Linking for MSA Class 7
 * 
 * This file maps all audio recordings for questions and answers
 * across all pages.
 */

import { MSA_CLASS_7_DATA } from './msaClass7Data';

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
 * Mapping of all audio files for MSA Class 7 Questions & Answers (Pages 1 to 24, Q1 to Q120)
 */
export const MSA_CLASS_7_AUDIO_MAP: Record<string, string> = MSA_CLASS_7_DATA.reduce((acc, item) => {
  acc['q' + item.id] = item.questionAudio || ('/audio/msa-class-7/q' + item.id + '.mp3');
  acc['a' + item.id] = item.answerAudio || ('/audio/msa-class-7/a' + item.id + '.mp3');
  return acc;
}, {} as Record<string, string>);

/**
 * Full Structured Audio Registry with Arabic & English metadata
 */
export const MSA_CLASS_7_AUDIO_REGISTRY: QuestionAudioPair[] = MSA_CLASS_7_DATA.map((item) => ({
  id: item.id,
  page: item.sectionId,
  question: {
    key: 'q' + item.id,
    audioPath: item.questionAudio || ('/audio/msa-class-7/q' + item.id + '.mp3'),
    arabic: item.questionArabic,
    english: item.questionEnglish,
  },
  answer: {
    key: 'a' + item.id,
    audioPath: item.answerAudio || ('/audio/msa-class-7/a' + item.id + '.mp3'),
    arabic: item.answerArabic,
    english: item.answerEnglish,
  },
}));

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
