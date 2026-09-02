import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArabicLetter, LetterGroup } from '../../../types/practice';
import { playAudio } from '../../../utils/audioPlayer';
import { Volume2, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface MeetLettersActivityProps {
  groups: LetterGroup[];
  onComplete: () => void;
  isCompleted?: boolean;
}

export const MeetLettersActivity: React.FC<MeetLettersActivityProps> = ({
  groups,
  onComplete,
  isCompleted = false,
}) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingWordId, setPlayingWordId] = useState<string | null>(null);

  const currentGroup = groups[currentGroupIndex] || groups[0];
  const currentLetter: ArabicLetter =
    currentGroup.letters[currentLetterIndex] || currentGroup.letters[0];

  const totalGroups = groups.length;
  const isLastLetterInGroup = currentLetterIndex === currentGroup.letters.length - 1;
  const isFirstLetterInGroup = currentLetterIndex === 0;
  const isFirstOverall = currentGroupIndex === 0 && isFirstLetterInGroup;
  const isLastOverall = currentGroupIndex === totalGroups - 1 && isLastLetterInGroup;

  // Play letter pronunciation
  const handlePlayLetterAudio = () => {
    if (currentLetter.audio) {
      setIsPlayingAudio(true);
      playAudio(currentLetter.audio);
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  // Play word example pronunciation
  const handlePlayWordAudio = (audioUrl?: string, wordKey?: string) => {
    if (!audioUrl) return;
    if (wordKey) setPlayingWordId(wordKey);
    playAudio(audioUrl);
    setTimeout(() => setPlayingWordId(null), 1000);
  };

  // Auto-play letter audio on letter switch
  useEffect(() => {
    if (currentLetter.audio) {
      playAudio(currentLetter.audio);
    }
  }, [currentLetter.id]);

  const handleNext = () => {
    if (!isLastLetterInGroup) {
      setCurrentLetterIndex((prev) => prev + 1);
    } else if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex((prev) => prev + 1);
      setCurrentLetterIndex(0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (!isFirstLetterInGroup) {
      setCurrentLetterIndex((prev) => prev - 1);
    } else if (currentGroupIndex > 0) {
      const prevGroup = groups[currentGroupIndex - 1];
      setCurrentGroupIndex((prev) => prev - 1);
      setCurrentLetterIndex(prevGroup.letters.length - 1);
    }
  };

  const handleSelectGroup = (idx: number) => {
    setCurrentGroupIndex(idx);
    setCurrentLetterIndex(0);
  };

  const handleSelectLetter = (idx: number) => {
    setCurrentLetterIndex(idx);
  };

  // Render Arabic word connected naturally
  const renderConnectedArabicWord = (word: string) => {
    return (
      <span className="font-serif text-2xl sm:text-3xl text-text-main group-hover:text-primary transition-colors tracking-normal" dir="rtl">
        {word}
      </span>
    );
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                idx === currentGroupIndex
                  ? 'bg-primary text-black font-semibold'
                  : 'bg-surface text-text-muted hover:text-text-main hover:bg-surface-hover border border-border/60'
              }`}
            >
              Group {grp.groupNumber}
            </button>
          ))}
        </div>

        <span className="text-xs text-text-muted">
          Letter {currentLetterIndex + 1} of {currentGroup.letters.length} in Group {currentGroupIndex + 1}
        </span>
      </div>

      {/* 2. Group Letter Chips (Click any letter in the group) */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {currentGroup.letters.map((letter, idx) => {
          const isSelected = idx === currentLetterIndex;
          return (
            <button
              key={letter.id}
              onClick={() => handleSelectLetter(idx)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-serif transition-all duration-200 ${
                isSelected
                  ? 'bg-primary/15 text-primary border-2 border-primary shadow-sm scale-105'
                  : 'bg-surface hover:bg-surface-hover text-text-main border border-border/80'
              }`}
              title={letter.name}
            >
              {letter.arabic}
            </button>
          );
        })}
      </div>

      {/* 3. Main Letter Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLetter.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="space-y-6"
        >
          {/* Large Focused Letter & Audio */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-border text-center flex flex-col items-center">
            <button
              onClick={handlePlayLetterAudio}
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              title="Click to hear sound"
            >
              <span className="text-7xl sm:text-8xl font-serif text-text-main group-hover:text-primary transition-colors leading-none mb-3">
                {currentLetter.arabic}
              </span>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-border/80 text-text-main group-hover:border-primary/50 transition-colors">
                <Volume2
                  size={16}
                  className={`text-primary transition-transform ${
                    isPlayingAudio ? 'scale-125' : ''
                  }`}
                />
                <span className="text-sm font-semibold">{currentLetter.name}</span>
                <span className="text-xs text-text-muted">({currentLetter.transliteration})</span>
              </div>
            </button>

            {currentLetter.isNonConnector && (
              <span className="mt-3 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
                Non-connector: does not connect to the left
              </span>
            )}
          </div>

          {/* 4. Connections (Beginning, Middle, End) */}
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 text-center sm:text-left">
              How it connects
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-3 rounded-xl bg-background/80 border border-border/60 text-center">
                <span className="text-xs text-text-muted block mb-1">Beginning</span>
                <span className="text-2xl sm:text-3xl font-serif text-text-main font-medium">
                  {currentLetter.initial}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-background/80 border border-border/60 text-center">
                <span className="text-xs text-text-muted block mb-1">Middle</span>
                <span className="text-2xl sm:text-3xl font-serif text-text-main font-medium">
                  {currentLetter.medial}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-background/80 border border-border/60 text-center">
                <span className="text-xs text-text-muted block mb-1">End</span>
                <span className="text-2xl sm:text-3xl font-serif text-text-main font-medium">
                  {currentLetter.final}
                </span>
              </div>
            </div>
          </div>

          {/* 5. Word Examples (3 Positions) */}
          <div className="p-5 rounded-2xl bg-surface border border-border">
            <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 text-center sm:text-left">
              Examples in words
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentLetter.examples.map((example, idx) => {
                const wordKey = `${currentLetter.id}-${example.position}-${idx}`;
                const isWordPlaying = playingWordId === wordKey;

                return (
                  <button
                    key={idx}
                    onClick={() => handlePlayWordAudio(example.audio, wordKey)}
                    className="p-3.5 rounded-xl bg-background/80 border border-border/60 hover:border-primary/50 text-center transition-all flex flex-col items-center justify-between group cursor-pointer"
                    title={`Listen to ${example.word}`}
                  >
                    <div className="w-full flex items-center justify-between text-xs text-text-muted mb-1.5">
                      <span className="capitalize">{example.position}</span>
                      <Volume2
                        size={14}
                        className={`text-primary transition-transform ${
                          isWordPlaying ? 'scale-125' : 'opacity-60 group-hover:opacity-100'
                        }`}
                      />
                    </div>

                    <div className="my-1">
                      {renderConnectedArabicWord(example.word)}
                    </div>

                    <div className="text-xs text-text-muted mt-1">
                      {example.transliteration && (
                        <span className="font-medium text-text-main block">
                          {example.transliteration}
                        </span>
                      )}
                      <span>{example.meaning}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 6. Bottom Navigation Bar */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={isFirstOverall}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-hover border border-border text-sm font-medium text-text-main disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div className="text-xs text-text-muted font-medium">
          {currentLetter.name} ({currentLetter.arabic})
        </div>

        <button
          onClick={handleNext}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
          ) : isLastLetterInGroup ? (
            <>
              <span>Next Group</span>
              <ChevronRight size={18} />
            </>
          ) : (
            <>
              <span>Next Letter</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
