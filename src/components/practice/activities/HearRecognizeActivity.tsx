import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../../../types/practice';
import { playArabicAudio } from '../../../utils/audioPlayer';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Check } from 'lucide-react';

interface HearRecognizeActivityProps {
  data: {
    questions: QuizQuestion[];
  };
  onComplete: () => void;
  isCompleted?: boolean;
}

export const HearRecognizeActivity: React.FC<HearRecognizeActivityProps> = ({
  data,
  onComplete,
  isCompleted = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentQ = data.questions[currentIdx] || data.questions[0];
  const totalQuestions = data.questions.length;

  const handlePlaySound = () => {
    setIsPlayingAudio(true);
    playArabicAudio(
      currentQ.audioPrompt,
      currentQ.promptArabic || currentQ.options.find(o => o.isCorrect)?.label,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!chosen?.isCorrect;

    if (isCorrect) {
      setUserScore((prev) => prev + 1);
    }

    // Auto replay the audio on check
    handlePlaySound();
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setIsFinished(false);
  };

  const chosenOption = currentQ.options.find((o) => o.id === selectedOptionId);
  const isCorrect = chosenOption?.isCorrect ?? false;
  const correctOption = currentQ.options.find((o) => o.isCorrect);

  if (isFinished) {
    const percentage = Math.round((userScore / totalQuestions) * 100);
    return (
      <div className="max-w-md mx-auto text-center p-6 sm:p-8 space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
          <CheckCircle2 size={36} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-text-main">Listening Complete!</h3>
          <p className="text-sm text-text-muted">
            You scored <strong className="text-primary font-semibold">{userScore}</strong> out of {totalQuestions} ({percentage}%)
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-hover/80 border border-border text-xs text-text-muted">
          {percentage >= 75 ? (
            <p className="text-primary font-semibold">
              Excellent ear! You clearly distinguish between Arabic letters and vowel marks.
            </p>
          ) : (
            <p className="text-text-muted font-medium">
              Good effort! Arabic vowels can take a little practice to differentiate quickly.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Check size={18} />
            <span>{isCompleted ? 'Finished • Continue' : 'Complete Exercise'}</span>
          </button>
          <button
            onClick={handleRestart}
            className="w-full py-3 rounded-xl bg-surface-hover hover:bg-surface border border-border text-text-muted hover:text-text-main font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={14} /> Practice Again
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = ((currentIdx + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* 1. Header: Single compact row without extra outer card box */}
      <div className="flex items-center gap-3.5">
        <span className="text-[12.5px] text-text-muted whitespace-nowrap font-medium">
          Question {currentIdx + 1} / {totalQuestions}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-surface-hover overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className="text-[12.5px] text-primary font-semibold whitespace-nowrap">
          Score {userScore}
        </span>
      </div>

      {/* 2. Audio prompt — visual focus */}
      <div className="flex flex-col items-center gap-3.5 py-6 sm:py-8 text-center">
        <p className="text-[15px] text-text-muted font-normal m-0">
          Select what you hear
        </p>

        <button
          type="button"
          onClick={handlePlaySound}
          aria-label="Play sound"
          className="w-[76px] h-[76px] rounded-full bg-primary text-[#06120c] flex items-center justify-center relative active:scale-95 transition-transform duration-150 cursor-pointer shadow-md my-1 focus:outline-none"
        >
          <span className="absolute -inset-2 rounded-full border border-primary/25 pointer-events-none" />
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4V5z"/>
            <path d="M15.5 8.5a5 5 0 0 1 0 7"/>
            <path d="M18 6a9 9 0 0 1 0 12"/>
          </svg>
        </button>

        <span className="text-[13px] text-text-muted font-normal">
          Tap to play the sound
        </span>
      </div>

      {/* 3. Answer options 2x2 grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          
          let cardStyle = 'bg-surface-hover/70 border-border text-text-main hover:border-[#3a4149]';

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              cardStyle = 'border-primary bg-primary/20 text-text-main ring-1 ring-primary/40';
            } else if (isSelected && !opt.isCorrect) {
              cardStyle = 'border-red-500/80 bg-red-500/10 text-red-400';
            } else {
              cardStyle = 'bg-surface-hover/40 border-border/40 text-text-muted opacity-40';
            }
          } else if (isSelected) {
            cardStyle = 'border-primary bg-primary/10 text-text-main';
          }

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              disabled={isAnswerSubmitted}
              className={`border rounded-[14px] p-5 sm:p-6 text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer select-none focus:outline-none ${cardStyle}`}
            >
              <div className="text-3xl sm:text-4xl font-serif font-medium text-text-main leading-none mb-2.5">
                {opt.label}
              </div>
              <div className={`text-[12.5px] leading-tight transition-colors ${
                isSelected && !isAnswerSubmitted
                  ? 'text-primary font-medium'
                  : isAnswerSubmitted && opt.isCorrect
                  ? 'text-primary font-medium'
                  : 'text-text-muted'
              }`}>
                {opt.subtext || opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback message when checked */}
      <AnimatePresence>
        {isAnswerSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              isCorrect
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'bg-red-500/10 border-red-500/25 text-red-400'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 size={16} className="shrink-0 text-primary" />
            ) : (
              <XCircle size={16} className="shrink-0 text-red-400" />
            )}
            <span className="font-medium">
              {isCorrect
                ? 'Correct answer!'
                : `Incorrect. The correct answer is: ${correctOption?.label}${correctOption?.subtext ? ` (${correctOption.subtext})` : ''}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Check Answer / Next Question button */}
      <div>
        {!isAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleCheckAnswer}
            disabled={!selectedOptionId}
            className={`w-full py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-150 ${
              selectedOptionId
                ? 'bg-primary text-black hover:bg-primary-hover cursor-pointer shadow-md'
                : 'bg-surface-hover text-text-muted cursor-not-allowed opacity-60'
            }`}
          >
            Check answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'View Results'}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

