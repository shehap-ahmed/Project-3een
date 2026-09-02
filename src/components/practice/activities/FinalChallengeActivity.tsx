import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../../../types/practice';
import { AudioPlayButton } from '../AudioPlayButton';
import { playAudio } from '../../../utils/audioPlayer';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Check, Sparkles } from 'lucide-react';

interface FinalChallengeActivityProps {
  data: {
    questions: QuizQuestion[];
  };
  onComplete: () => void;
  isCompleted?: boolean;
}

export const FinalChallengeActivity: React.FC<FinalChallengeActivityProps> = ({
  data,
  onComplete,
  isCompleted = false,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<
    { questionId: string; category: string; isCorrect: boolean }[]
  >([]);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = data.questions[currentIdx] || data.questions[0];
  const totalQuestions = data.questions.length;

  const handleSelectOption = (optionId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isSubmitted) return;

    setIsSubmitted(true);
    const chosen = currentQ.options.find((o) => o.id === selectedOptionId);
    const isCorrect = !!chosen?.isCorrect;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        category: currentQ.category,
        isCorrect,
      },
    ]);

    if (currentQ.audioPrompt) {
      playAudio(currentQ.audioPrompt);
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsSubmitted(false);
    setAnswers([]);
    setIsFinished(false);
  };

  const chosenOption = currentQ.options.find((o) => o.id === selectedOptionId);
  const isCorrect = chosenOption?.isCorrect ?? false;
  const correctOption = currentQ.options.find((o) => o.isCorrect);

  if (isFinished) {
    const totalCorrect = answers.filter((a) => a.isCorrect).length;
    const scorePercentage = Math.round((totalCorrect / totalQuestions) * 100);
    const hasPassed = scorePercentage >= 75;

    // Compute category breakdown
    const categories = ['letters', 'harakat', 'listening', 'connections'] as const;
    const categoryLabels: Record<string, string> = {
      letters: 'Arabic Letters',
      harakat: 'Harakat (Short Vowels)',
      listening: 'Listening Comprehension',
      connections: 'Letter Connections',
    };

    const breakdown = categories.map((cat) => {
      const catAnswers = answers.filter((a) => a.category === cat);
      if (catAnswers.length === 0) return null;
      const catCorrect = catAnswers.filter((a) => a.isCorrect).length;
      const pct = Math.round((catCorrect / catAnswers.length) * 100);
      return {
        key: cat,
        label: categoryLabels[cat] || cat,
        correct: catCorrect,
        total: catAnswers.length,
        percentage: pct,
        needsPractice: pct < 75,
      };
    }).filter(Boolean);

    return (
      <div className="max-w-lg mx-auto bg-surface p-6 md:p-8 rounded-3xl border border-border space-y-6 shadow-xl text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          hasPassed 
            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
        }`}>
          <Award size={36} />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-text-main">
            {hasPassed ? 'Challenge Passed!' : 'Practice Needs Improvement'}
          </h3>
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">
            {hasPassed ? 'Great Job • Ready to Advance' : 'Score at least 75% to pass and unlock next lesson'}
          </p>
        </div>

        <div className={`rounded-2xl p-6 border space-y-2 ${
          hasPassed 
            ? 'bg-emerald-500/5 border-emerald-500/20' 
            : 'bg-amber-500/5 border-amber-500/20'
        }`}>
          <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Score</div>
          <div className={`text-4xl font-bold font-mono ${hasPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {scorePercentage}%
          </div>
          <div className="text-sm text-text-muted pt-1">
            Correct Answers: <strong className="text-text-main font-mono">{totalCorrect}/{totalQuestions}</strong>
          </div>
          {!hasPassed && (
            <div className="text-xs text-amber-400/90 font-medium pt-1">
              Minimum passing score is <strong>75%</strong> ({Math.ceil(totalQuestions * 0.75)} of {totalQuestions} correct)
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3 text-left">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Area Breakdown
          </h4>
          <div className="space-y-2">
            {breakdown.map((item) => (
              item && (
                <div
                  key={item.key}
                  className="p-3.5 rounded-xl bg-background border border-border flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-text-main">{item.label}</div>
                    <div className="text-[11px] text-text-muted">
                      {item.correct} / {item.total} correct ({item.percentage}%)
                    </div>
                  </div>

                  <div>
                    {item.needsPractice ? (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold text-[11px]">
                        Needs practice
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                        <Check size={12} /> Mastered
                      </span>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleRestart}
            className={`flex-1 py-3.5 rounded-xl border font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              !hasPassed 
                ? 'bg-primary hover:bg-primary-hover text-black shadow-md border-primary' 
                : 'bg-background hover:bg-surface border-border text-text-muted hover:text-text-main'
            }`}
          >
            <RotateCcw size={15} /> {hasPassed ? 'Practice Again' : 'Try Again (Retake Challenge)'}
          </button>
          {hasPassed && (
            <button
              onClick={onComplete}
              className="flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* 1. Progress Row: Single compact row */}
      <div className="flex items-center gap-3.5">
        <span className="text-[12.5px] text-text-muted whitespace-nowrap font-medium">
          Question {currentIdx + 1} / {totalQuestions}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-surface-hover overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-[12.5px] text-text-muted font-medium whitespace-nowrap">
          {currentQ.categoryLabel}
        </span>
      </div>

      {/* Question Prompt */}
      <div className="space-y-4 text-center sm:text-left pt-2">
        <h3 className="text-lg sm:text-xl font-bold text-text-main leading-snug">
          {currentQ.prompt}
        </h3>
        {currentQ.audioPrompt && (
          <div className="flex justify-center sm:justify-start">
            <AudioPlayButton
              audioUrl={currentQ.audioPrompt}
              label="Play Audio Clip"
              variant="primary"
            />
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let cardStyle = 'bg-surface-hover/70 border-border text-text-main hover:border-[#3a4149]';

          if (isSubmitted) {
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
              disabled={isSubmitted}
              className={`border rounded-[14px] p-4 sm:p-5 text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer select-none min-h-[84px] focus:outline-none ${cardStyle}`}
            >
              <div className="text-2xl sm:text-3xl font-serif font-medium text-text-main mb-1">
                {opt.label}
              </div>
              {opt.subtext && (
                <div className={`text-[12px] leading-tight transition-colors ${
                  isSelected && !isSubmitted
                    ? 'text-primary font-medium'
                    : isSubmitted && opt.isCorrect
                    ? 'text-primary font-medium'
                    : 'text-text-muted'
                }`}>
                  {opt.subtext}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Section */}
      <AnimatePresence>
        {isSubmitted && (
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

      {/* Action Button */}
      <div>
        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitAnswer}
            disabled={!selectedOptionId}
            className={`w-full py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-150 ${
              selectedOptionId
                ? 'bg-primary text-black hover:bg-primary-hover cursor-pointer shadow-md'
                : 'bg-surface-hover text-text-muted cursor-not-allowed opacity-60'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 sm:py-4 rounded-xl bg-primary hover:bg-primary-hover text-black font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>{currentIdx < totalQuestions - 1 ? 'Next Question' : 'Finish Challenge'}</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
