import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Check, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { playArabicAudio, stopAudio } from '../../../utils/audioPlayer';

export interface PronounOption {
  id: string;
  arabic: string;
  name: string;
  gender: 'masculine' | 'feminine' | 'common';
  number: 'singular' | 'plural' | 'dual';
  transliteration: string;
  audio?: string;
}

export interface AdjectiveBase {
  id: string;
  rootArabic: string; // e.g. طويل
  english: string; // e.g. "Tall"
  masculine: {
    arabic: string; // طَوِيلٌ
    transliteration: string; // ṭawīl
    audio?: string;
  };
  feminine: {
    arabic: string; // طَوِيلَةٌ
    transliteration: string; // ṭawīlah
    audio?: string;
  };
  pluralMasc?: {
    arabic: string; // طِوَالٌ
    transliteration: string;
    audio?: string;
  };
  pluralFem?: {
    arabic: string; // طَوِيلَاتٌ
    transliteration: string;
    audio?: string;
  };
}

export const PRONOUNS_FOR_AGREEMENT: PronounOption[] = [
  { id: 'huwa', arabic: 'هُوَ', name: 'Huwa', gender: 'masculine', number: 'singular', transliteration: 'He', audio: '/audio/msa-class-7/q102.mp3' },
  { id: 'hiya', arabic: 'هِيَ', name: 'Hiya', gender: 'feminine', number: 'singular', transliteration: 'She', audio: '/audio/msa-class-7/q101.mp3' },
  { id: 'anta', arabic: 'أَنْتَ', name: 'Anta', gender: 'masculine', number: 'singular', transliteration: 'You (m)', audio: '/audio/msa-class-7/q103.mp3' },
  { id: 'anti', arabic: 'أَنْتِ', name: 'Anti', gender: 'feminine', number: 'singular', transliteration: 'You (f)', audio: '/audio/msa-class-7/q104.mp3' },
  { id: 'ana_m', arabic: 'أَنَا (مذكر)', name: 'Ana (m)', gender: 'masculine', number: 'singular', transliteration: 'I (m)', audio: '/audio/msa-class-7/q105.mp3' },
  { id: 'ana_f', arabic: 'أَنَا (مؤنث)', name: 'Ana (f)', gender: 'feminine', number: 'singular', transliteration: 'I (f)', audio: '/audio/msa-class-7/q105.mp3' },
  { id: 'hum', arabic: 'هُمْ', name: 'Hum', gender: 'masculine', number: 'plural', transliteration: 'They (m)', audio: '/audio/msa-class-7/q106.mp3' },
  { id: 'hunna', arabic: 'هُنَّ', name: 'Hunna', gender: 'feminine', number: 'plural', transliteration: 'They (f)', audio: '/audio/msa-class-7/q107.mp3' },
];

export const ADJECTIVES_FOR_AGREEMENT: AdjectiveBase[] = [
  {
    id: 'taweel',
    rootArabic: 'طَوِيل',
    english: 'Tall',
    masculine: { arabic: 'طَوِيلٌ', transliteration: 'ṭawīl', audio: '/audio/msa-class-7/q108.mp3' },
    feminine: { arabic: 'طَوِيلَةٌ', transliteration: 'ṭawīlah', audio: '/audio/msa-class-7/q109.mp3' },
  },
  {
    id: 'saeed',
    rootArabic: 'سَعِيد',
    english: 'Happy',
    masculine: { arabic: 'سَعِيدٌ', transliteration: 'saʻīd', audio: '/audio/msa-class-7/q110.mp3' },
    feminine: { arabic: 'سَعِيدَةٌ', transliteration: 'saʻīdah', audio: '/audio/msa-class-7/q111.mp3' },
  },
  {
    id: 'kabeer',
    rootArabic: 'كَبِير',
    english: 'Big / Old',
    masculine: { arabic: 'كَبِيرٌ', transliteration: 'kabīr', audio: '/audio/msa-class-7/q112.mp3' },
    feminine: { arabic: 'كَبِيرَةٌ', transliteration: 'kabīrah', audio: '/audio/msa-class-7/q113.mp3' },
  },
  {
    id: 'jadeed',
    rootArabic: 'جَدِيد',
    english: 'New',
    masculine: { arabic: 'جَدِيدٌ', transliteration: 'jadīd', audio: '/audio/msa-class-7/q114.mp3' },
    feminine: { arabic: 'جَدِيدَةٌ', transliteration: 'jadīdah', audio: '/audio/msa-class-7/q115.mp3' },
  },
  {
    id: 'dhaki',
    rootArabic: 'ذَكِيّ',
    english: 'Smart',
    masculine: { arabic: 'ذَكِيٌّ', transliteration: 'dhakīy', audio: '/audio/msa-class-7/q116.mp3' },
    feminine: { arabic: 'ذَكِيَّةٌ', transliteration: 'dhakīyah', audio: '/audio/msa-class-7/q117.mp3' },
  },
  {
    id: 'nasheet',
    rootArabic: 'نَشِيط',
    english: 'Active',
    masculine: { arabic: 'نَشِيطٌ', transliteration: 'nashīṭ', audio: '/audio/msa-class-7/q118.mp3' },
    feminine: { arabic: 'نَشِيطَةٌ', transliteration: 'nashīṭah', audio: '/audio/msa-class-7/q119.mp3' },
  },
];

interface PronounsAdjectivesActivityProps {
  data?: any;
  onComplete: () => void;
  isCompleted?: boolean;
}

export const PronounsAdjectivesActivity: React.FC<PronounsAdjectivesActivityProps> = ({
  data,
  onComplete,
  isCompleted = false,
}) => {
  const subjectsList: PronounOption[] = data?.subjects || PRONOUNS_FOR_AGREEMENT;
  const adjectivesList: AdjectiveBase[] = data?.predicates || ADJECTIVES_FOR_AGREEMENT;

  const [selectedPronounId, setSelectedPronounId] = useState<string>(() => subjectsList[0]?.id || 'huwa');
  const [selectedAdjectiveId, setSelectedAdjectiveId] = useState<string>(() => adjectivesList[0]?.id || 'taweel');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Quick Practice State
  const [quizPronounIndex, setQuizPronounIndex] = useState(0);
  const [quizSelectedChoice, setQuizSelectedChoice] = useState<string | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);

  const selectedPronoun =
    subjectsList.find((p) => p.id === selectedPronounId) || subjectsList[0];
  const selectedAdjective =
    adjectivesList.find((a) => a.id === selectedAdjectiveId) || adjectivesList[0];

  const isFeminine = selectedPronoun.gender === 'feminine';
  const adjectiveForm = isFeminine ? selectedAdjective.feminine : selectedAdjective.masculine;

  // Clean Arabic pronoun text without extra annotation (like removing '(مذكر)')
  const cleanPronounArabic = selectedPronoun.arabic.replace(/\s*\(.*?\)/g, '');
  const combinedArabic = `${cleanPronounArabic} ${adjectiveForm.arabic}`;
  const combinedTranslation = `${selectedPronoun.transliteration} is ${selectedAdjective.english.toLowerCase()}.`;

  const handlePlaySound = () => {
    setIsPlaying(true);
    playArabicAudio(
      adjectiveForm.audio,
      combinedArabic,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    handlePlaySound();
    return () => {
      stopAudio();
    };
  }, [selectedPronounId, selectedAdjectiveId]);

  // Interactive Quiz data
  const defaultQuizItems = [
    {
      pronoun: 'هِيَ',
      pronounMeaning: 'She',
      gender: 'feminine',
      adjectiveBase: 'طويل (Tall)',
      correct: 'طَوِيلَةٌ',
      wrong: 'طَوِيلٌ',
      sentence: 'هِيَ طَوِيلَةٌ',
      meaning: 'She is tall.',
    },
    {
      pronoun: 'هُوَ',
      pronounMeaning: 'He',
      gender: 'masculine',
      adjectiveBase: 'سعيد (Happy)',
      correct: 'سَعِيدٌ',
      wrong: 'سَعِيدَةٌ',
      sentence: 'هُوَ سَعِيدٌ',
      meaning: 'He is happy.',
    },
    {
      pronoun: 'أَنْتِ',
      pronounMeaning: 'You (f)',
      gender: 'feminine',
      adjectiveBase: 'سعيد (Happy)',
      correct: 'سَعِيدَةٌ',
      wrong: 'سَعِيدٌ',
      sentence: 'أَنْتِ سَعِيدَةٌ',
      meaning: 'You (feminine) are happy.',
    },
    {
      pronoun: 'أَنْتَ',
      pronounMeaning: 'You (m)',
      gender: 'masculine',
      adjectiveBase: 'طويل (Tall)',
      correct: 'طَوِيلٌ',
      wrong: 'طَوِيلَةٌ',
      sentence: 'أَنْتَ طَوِيلٌ',
      meaning: 'You (masculine) are tall.',
    },
  ];

  const quizItems = data?.quizItems || defaultQuizItems;
  const currentQuiz = quizItems[quizPronounIndex % quizItems.length];

  return (
    <div className="max-w-2xl mx-auto space-y-7 pb-2 select-none">
      {/* Step 1: Choose a Subject / Pronoun */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-muted uppercase tracking-wider">
            {data?.step1Title || '1. Choose a Pronoun'}
          </span>
          {selectedPronoun && (
            <span className="text-primary font-medium">
              {selectedPronoun.arabic} ({selectedPronoun.transliteration})
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-surface/60 border border-border/70">
          {subjectsList.map((pronoun) => {
            const isSelected = pronoun.id === selectedPronounId;
            return (
              <button
                key={pronoun.id}
                onClick={() => setSelectedPronounId(pronoun.id)}
                className={`py-2 px-3 sm:px-3.5 rounded-xl flex items-center justify-center text-sm sm:text-base font-serif transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-black font-bold shadow-md scale-105'
                    : 'bg-background hover:bg-surface-hover text-text-main border border-border/80 hover:border-border'
                }`}
                title={`${pronoun.arabic} (${pronoun.transliteration})`}
              >
                {pronoun.arabic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Choose Predicate / Adjective */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-muted uppercase tracking-wider">
            {data?.step2Title || '2. Choose an Adjective Root'}
          </span>
          {selectedAdjective && (
            <span className="text-primary font-medium">
              {selectedAdjective.rootArabic} ({selectedAdjective.english})
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {adjectivesList.map((adj) => {
            const isSelected = adj.id === selectedAdjectiveId;
            return (
              <button
                key={adj.id}
                onClick={() => setSelectedAdjectiveId(adj.id)}
                className={`py-3 px-3 sm:px-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-black border-primary shadow-md scale-[1.02]'
                    : 'bg-surface hover:bg-surface-hover text-text-main border-border hover:border-border/80'
                }`}
              >
                <span className="text-xl sm:text-2xl font-serif leading-tight font-bold">
                  {adj.rootArabic}
                </span>
                <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-black' : 'text-text-main'}`}>
                  {adj.english}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Combined Focus & Audio Output */}
      <div className="p-7 sm:p-9 rounded-2xl bg-surface border border-border text-center flex flex-col items-center justify-center min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedPronounId}-${selectedAdjectiveId}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center space-y-4 w-full"
          >
            {/* Equation preview */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted font-serif">
              <span className="text-base sm:text-lg text-text-main font-bold">{cleanPronounArabic}</span>
              <span>+</span>
              <span className="text-base sm:text-lg text-text-main font-bold">{adjectiveForm.arabic}</span>
              <span>→</span>
              <span className="text-primary font-semibold text-base sm:text-lg">{combinedArabic}</span>
            </div>

            {/* Large Combined Sentence */}
            <div className="text-5xl sm:text-7xl font-serif text-text-main leading-tight py-2 drop-shadow-sm" dir="rtl">
              {combinedArabic}
            </div>

            {/* English Meaning */}
            <div className="text-base font-semibold text-text-main">
              "{combinedTranslation}"
            </div>

            {/* Agreement Rule Pill */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {isFeminine ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  Feminine Agreement: Adjective adds Tāʼ Marbūṭah (ـة / ة)
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Masculine Agreement: Adjective stays in base form without (ة)
                </span>
              )}
            </div>

            {/* Audio Button */}
            <button
              onClick={handlePlaySound}
              className={`mt-2 inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-150 cursor-pointer ${
                isPlaying
                  ? 'bg-primary/20 text-primary border border-primary scale-95 shadow-sm'
                  : 'bg-primary text-black hover:bg-primary-hover shadow-sm active:scale-95'
              }`}
              title="Play pronunciation sound"
            >
              <Volume2
                size={18}
                className={`transition-transform duration-200 ${
                  isPlaying ? 'scale-125 text-primary' : 'text-black'
                }`}
              />
              <span>{isPlaying ? 'Playing...' : 'Play Sound'}</span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Quick Practice: Agreement Check */}
      <div className="p-5 rounded-2xl bg-surface border border-border space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-primary" />
            {data?.quizTitle || 'Quick Practice: Choose the Correct Agreement'}
          </span>
          <span className="text-text-muted">
            Question {quizPronounIndex + 1} of {quizItems.length}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-background/80 border border-border/80 text-center space-y-3">
          <div className="text-xs text-text-muted">
            {data?.quizPrompt || 'Choose the correct form for:'}{' '}
            <strong className="text-text-main text-sm font-serif">{currentQuiz.pronoun}</strong>{' '}
            ({currentQuiz.pronounMeaning})
          </div>

          <div className="text-2xl font-serif text-text-main" dir="rtl">
            {currentQuiz.pronoun} _______
          </div>

          <div className="flex items-center justify-center gap-3">
            {[currentQuiz.correct, currentQuiz.wrong].sort().map((choice, idx) => {
              const isChosen = quizSelectedChoice === choice;
              const isCorrectChoice = choice === currentQuiz.correct;

              let btnClass = 'bg-surface hover:bg-surface-hover text-text-main border-border';
              if (quizAnswerChecked) {
                if (isCorrectChoice) {
                  btnClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold';
                } else if (isChosen && !isCorrectChoice) {
                  btnClass = 'bg-red-500/20 text-red-400 border-red-500/40';
                }
              } else if (isChosen) {
                btnClass = 'bg-primary/20 text-primary border-primary';
              }

              return (
                <button
                  key={idx}
                  disabled={quizAnswerChecked}
                  onClick={() => {
                    setQuizSelectedChoice(choice);
                    setQuizAnswerChecked(true);
                  }}
                  className={`px-5 py-2.5 rounded-xl border text-lg font-serif transition-all cursor-pointer ${btnClass}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {quizAnswerChecked && (
            <div className="pt-2 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold">
                {quizSelectedChoice === currentQuiz.correct ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Correct! {currentQuiz.sentence} ({currentQuiz.meaning})
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <XCircle size={14} /> Correct form is {currentQuiz.correct}: {currentQuiz.sentence}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setQuizPronounIndex((prev) => (prev + 1) % quizItems.length);
                  setQuizSelectedChoice(null);
                  setQuizAnswerChecked(false);
                }}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                Next Example →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <span className="text-xs text-text-muted">
          Activity 2 of 4 • Pronouns &amp; Adjectives
        </span>

        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-black hover:bg-primary-hover text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <span>{isCompleted ? 'Finished • Next' : 'Complete Activity'}</span>
          <Check size={16} />
        </button>
      </div>
    </div>
  );
};
