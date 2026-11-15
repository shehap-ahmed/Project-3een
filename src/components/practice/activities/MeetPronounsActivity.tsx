import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playArabicAudio, stopAudio } from '../../../utils/audioPlayer';
import { Volume2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export interface PronounItem {
  id: string;
  arabic: string;
  name: string;
  transliteration: string;
  meaning: string;
  category: string; // e.g. "1st Person", "2nd Person (M)", etc.
  audio?: string;
  example: {
    sentence: string;
    transliteration: string;
    meaning: string;
    audio?: string;
  };
}

export interface PronounGroup {
  groupNumber: number;
  title: string;
  pronouns: PronounItem[];
}

interface MeetPronounsActivityProps {
  groups: PronounGroup[];
  onComplete: () => void;
  isCompleted?: boolean;
  itemLabel?: string;
}

export const MeetPronounsActivity: React.FC<MeetPronounsActivityProps> = ({
  groups,
  onComplete,
  isCompleted = false,
  itemLabel = 'Pronoun',
}) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentPronounIndex, setCurrentPronounIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingExampleAudio, setIsPlayingExampleAudio] = useState(false);

  const currentGroup = groups[currentGroupIndex] || groups[0];
  const currentPronoun: PronounItem =
    currentGroup.pronouns[currentPronounIndex] || currentGroup.pronouns[0];

  const totalGroups = groups.length;
  const isLastInGroup = currentPronounIndex === currentGroup.pronouns.length - 1;
  const isFirstInGroup = currentPronounIndex === 0;
  const isFirstOverall = currentGroupIndex === 0 && isFirstInGroup;
  const isLastOverall = currentGroupIndex === totalGroups - 1 && isLastInGroup;

  // Play pronoun pronunciation audio
  const handlePlayPronounAudio = () => {
    if (!currentPronoun.audio) return;
    setIsPlayingAudio(true);
    playArabicAudio(
      currentPronoun.audio,
      currentPronoun.arabic,
      () => setIsPlayingAudio(true),
      () => setIsPlayingAudio(false)
    );
  };

  // Play example sentence pronunciation audio
  const handlePlayExampleAudio = () => {
    if (!currentPronoun.example.audio) return;
    setIsPlayingExampleAudio(true);
    playArabicAudio(
      currentPronoun.example.audio,
      currentPronoun.example.sentence,
      () => setIsPlayingExampleAudio(true),
      () => setIsPlayingExampleAudio(false)
    );
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleNext = () => {
    if (!isLastInGroup) {
      setCurrentPronounIndex((prev) => prev + 1);
    } else if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
      setCurrentPronounIndex(0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (!isFirstInGroup) {
      setCurrentPronounIndex((prev) => prev - 1);
    } else if (currentGroupIndex > 0) {
      const prevGroup = groups[currentGroupIndex - 1];
      setCurrentGroupIndex((prev) => prev - 1);
      setCurrentPronounIndex(prevGroup.pronouns.length - 1);
    }
  };

  const handleSelectGroup = (idx: number) => {
    setCurrentGroupIndex(idx);
    setCurrentPronounIndex(0);
  };

  const handleSelectPronoun = (idx: number) => {
    setCurrentPronounIndex(idx);
    const target = currentGroup.pronouns[idx];
    if (target?.audio) {
      playArabicAudio(
        target.audio,
        target.arabic,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 1. Group Selector & Progress */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {groups.map((grp, idx) => (
            <button
              key={grp.groupNumber}
              onClick={() => handleSelectGroup(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                idx === currentGroupIndex
                  ? 'bg-primary text-black font-semibold'
                  : 'bg-surface text-text-muted hover:text-text-main hover:bg-surface-hover border border-border/60'
              }`}
            >
              {grp.title}
            </button>
          ))}
        </div>

        <span className="text-xs text-text-muted">
          {itemLabel} {currentPronounIndex + 1} of {currentGroup.pronouns.length} in Group {currentGroupIndex + 1}
        </span>
      </div>

      {/* 2. Group Pronoun Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {currentGroup.pronouns.map((pronoun, idx) => {
          const isSelected = idx === currentPronounIndex;
          return (
            <button
              key={pronoun.id}
              onClick={() => handleSelectPronoun(idx)}
              className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl flex items-center justify-center text-lg sm:text-xl font-serif transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-primary/15 text-primary border-2 border-primary shadow-sm scale-105'
                  : 'bg-surface hover:bg-surface-hover text-text-main border border-border/80'
              }`}
              title={`${pronoun.arabic} (${pronoun.meaning})`}
            >
              {pronoun.arabic}
            </button>
          );
        })}
      </div>

      {/* 3. Main Pronoun Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPronoun.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          {/* Large Focused Pronoun & Audio */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border text-center flex flex-col items-center">
            <button
              onClick={handlePlayPronounAudio}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to hear pronunciation"
            >
              <span className="text-7xl sm:text-8xl font-serif text-text-main group-hover:text-primary transition-colors leading-none mb-3">
                {currentPronoun.arabic}
              </span>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-border/80 text-text-main group-hover:border-primary/50 transition-colors">
                <Volume2
                  size={16}
                  className={`text-primary transition-transform ${
                    isPlayingAudio ? 'scale-125' : ''
                  }`}
                />
                <span className="text-sm font-semibold">{currentPronoun.name}</span>
                <span className="text-xs text-text-muted">({currentPronoun.transliteration})</span>
              </div>
            </button>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Meaning: {currentPronoun.meaning}
              </span>
              <span className="text-xs text-text-muted bg-surface-hover px-2.5 py-1 rounded-full border border-border/60">
                {currentPronoun.category}
              </span>
            </div>
          </div>

          {/* 4. Example in Sentence Card */}
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="flex items-center justify-between text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
              <span>Example Sentence</span>
              <span className="text-[11px] font-normal text-text-muted lowercase">Short and clear</span>
            </div>

            <button
              onClick={handlePlayExampleAudio}
              className="w-full p-4 rounded-xl bg-background/80 border border-border/60 hover:border-primary/50 text-center transition-all flex flex-col items-center justify-center group cursor-pointer"
              title={`Listen to ${currentPronoun.example.sentence}`}
            >
              <div className="w-full flex items-center justify-between text-xs text-text-muted mb-2">
                <span className="font-mono text-primary font-bold">{itemLabel} + Example Sentence</span>
                <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                  <Volume2
                    size={15}
                    className={`transition-transform ${
                      isPlayingExampleAudio ? 'scale-125' : 'opacity-80 group-hover:opacity-100'
                    }`}
                  />
                  <span>Listen</span>
                </div>
              </div>

              <div className="my-2" dir="rtl">
                <span className="font-serif text-3xl sm:text-4xl text-text-main group-hover:text-primary transition-colors tracking-wide leading-relaxed">
                  {currentPronoun.example.sentence}
                </span>
              </div>

              <div className="text-sm text-text-muted mt-2 space-y-0.5">
                <div className="font-semibold text-text-main font-mono text-xs sm:text-sm">
                  {currentPronoun.example.transliteration}
                </div>
                <div className="text-xs sm:text-sm text-text-muted">
                  "{currentPronoun.example.meaning}"
                </div>
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 5. Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={isFirstOverall}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border text-sm font-medium text-text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div className="text-xs text-text-muted font-medium">
          {currentPronoun.arabic} — {currentPronoun.meaning}
        </div>

        <button
          onClick={handleNext}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            isLastOverall
              ? 'bg-primary text-black hover:bg-primary-hover shadow-sm'
              : 'bg-primary text-black hover:bg-primary-hover'
          }`}
        >
          {isLastOverall ? (
            <>
              <span>Complete</span>
              <Check size={18} />
            </>
          ) : isLastInGroup ? (
            <>
              <span>Next Group</span>
              <ChevronRight size={18} />
            </>
          ) : (
            <>
              <span>Next Pronoun</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
