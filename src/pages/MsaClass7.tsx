import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { MSA_CLASS_7_DATA, SECTIONS_META } from '../data/msaClass7Data';
import { getAudioByKey } from '../data/msaClass7Audio';
import { supabase } from '../lib/supabase';
import { getSafeUserRole } from '../lib/authUtils';
import { User } from '@supabase/supabase-js';

export default function MsaClass7() {
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [arabicFontSize, setArabicFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null); // e.g. "q1", "a1"
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSectionSelector, setShowSectionSelector] = useState<boolean>(false);
  const [visitedSections, setVisitedSections] = useState<Set<number>>(new Set([1]));
  const [userRole, setUserRole] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchRole = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setUserRole(null);
      return;
    }
    const role = await getSafeUserRole(currentUser);
    setUserRole(role);
  }, []);

  useEffect(() => {
    // Check initial user and role
    supabase.auth.getUser()
      .then((res) => {
        const currentUser = res?.data?.user ?? null;
        fetchRole(currentUser);
      })
      .catch(() => {
        setUserRole(null);
      });

    // Listen for auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      fetchRole(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchRole]);

  // Total sections and role-based lock configuration
  const totalSections = SECTIONS_META.length;
  const isAdmin = userRole === 'admin';
  const isAeen = userRole === 'aeen' || userRole === '3een';
  
  // All 24 sections are fully open and unlocked for role: aeen (and admin)
  const maxUnlockedSection = 24;
  const isSectionLocked = (_secId: number) => false;
  const isCurrentLocked = false;
  
  // Filter questions for the active section (5 per section)
  const currentQuestions = MSA_CLASS_7_DATA.filter(
    (item) => item.sectionId === currentSection
  );

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update visited sections when section changes
  useEffect(() => {
    setVisitedSections((prev) => new Set(prev).add(currentSection));
    stopAudio();
    window.scrollTo({ top: 180, behavior: 'smooth' });
  }, [currentSection]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveAudioKey(null);
  };

  const handlePlayAudio = async (rawKey: string, audioPath?: string, _arabicText?: string) => {
    // If user clicks the currently playing item, toggle pause/stop
    if (activeAudioKey === rawKey && isPlaying) {
      stopAudio();
      return;
    }

    stopAudio();

    const targetAudioPath = audioPath || getAudioByKey(rawKey);

    if (!targetAudioPath || targetAudioPath.trim() === '') {
      return;
    }

    try {
      const audio = new Audio(targetAudioPath);
      audioRef.current = audio;
      setActiveAudioKey(rawKey);
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        setActiveAudioKey(null);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        setActiveAudioKey(null);
      };

      await audio.play();
    } catch (e) {
      setIsPlaying(false);
      setActiveAudioKey(null);
    }
  };

  const handleNextSection = () => {
    if (currentSection < totalSections) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const arabicSizeClasses = {
    md: 'text-lg md:text-xl leading-relaxed',
    lg: 'text-xl md:text-2xl lg:text-3xl leading-loose',
    xl: 'text-2xl md:text-3xl lg:text-4xl leading-loose',
  };

  const currentMeta = SECTIONS_META.find((s) => s.id === currentSection) || SECTIONS_META[0];

  return (
    <div className="min-h-screen bg-background text-text-main py-8 md:py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      {/* Header Banner */}
      <div className="space-y-6 mb-8 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-emerald-400 rounded-full text-xs font-mono font-semibold tracking-wide">
              <Sparkles size={13} className="text-emerald-400" />
              MSA Beginners Course
            </span>
            <span className="text-text-muted text-xs font-mono">/</span>
            <span className="text-text-muted text-xs font-mono">Class 7 Practice</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted">
                {isAdmin ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full text-[11px]">
                    <ShieldCheck size={13} className="text-emerald-400" />
                    Admin Access • Page <strong className="text-white">{currentSection}</strong> of 24
                  </span>
                ) : (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full text-[11px]">
                    <Sparkles size={12} className="text-emerald-400" />
                    3een Access • Page <strong className="text-white">{currentSection}</strong> of 24
                  </span>
                )}
              </span>
              <div className="w-24 h-2 bg-surface rounded-full overflow-hidden border border-border flex">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ 
                    width: `${(currentSection / totalSections) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Title and Description */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text-main">
              MSA Class 7: Q&A Review
            </h1>
            <p className="text-sm md:text-base font-serif text-primary text-right" dir="rtl">
              تدريبات الدرس السابع — الأسئلة والأجوبة اليومية
            </p>
          </div>
          <p className="text-text-muted text-xs md:text-sm max-w-2xl leading-relaxed">
            Practice MSA Class 7 dialogues and questions. Click any Arabic question or answer card to listen to its native audio pronunciation.
          </p>
        </div>
      </div>

      {/* Control Bar & Learning Utilities */}
      <div className="bg-surface/80 backdrop-blur-md rounded-2xl border border-border p-4 mb-8 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Section Selector Dropdown Button */}
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setShowSectionSelector(!showSectionSelector)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background border border-border hover:border-primary/40 text-xs font-semibold text-text-main transition-all duration-200"
              title="Click to jump to any page"
            >
              <Layers size={14} className="text-primary" />
              <span>{currentMeta.title} ({currentMeta.questionRange})</span>
              <span className="text-[10px] text-text-muted font-mono bg-surface px-1.5 py-0.5 rounded border border-border/60">
                ▾ Jump
              </span>
            </button>

            {/* Section Selector Dropdown Menu */}
            <AnimatePresence>
              {showSectionSelector && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowSectionSelector(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-surface border border-border rounded-2xl p-3 shadow-2xl z-50 max-h-80 overflow-y-auto space-y-1"
                  >
                    <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-border/40 text-[11px] font-mono text-text-muted uppercase">
                      <span>Select Page (Pages 1–24 • All Open)</span>
                      <span>5 Q&A / Page</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {SECTIONS_META.map((meta) => {
                        const isCurrent = meta.id === currentSection;
                        return (
                          <button
                            key={meta.id}
                            onClick={() => {
                              setCurrentSection(meta.id);
                              setShowSectionSelector(false);
                            }}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                              isCurrent
                                ? 'bg-primary text-white font-bold shadow-sm'
                                : 'hover:bg-background/80 text-text-main'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                                isCurrent 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-surface border border-border text-text-muted'
                              }`}>
                                {meta.id}
                              </span>
                              <span>{meta.title}</span>
                            </div>
                            <span className={`text-[10px] font-mono ${isCurrent ? 'text-white/80' : 'text-text-muted'}`}>
                              {meta.questionRange}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Display Preferences: Translations & Font Sizing */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle English Translation */}
            <button
              onClick={() => setShowTranslations(!showTranslations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                showTranslations
                  ? 'bg-background border-border text-text-main hover:border-primary/40'
                  : 'bg-surface/50 border-border/50 text-text-muted hover:text-text-main'
              }`}
              title="Toggle English translations"
            >
              {showTranslations ? <Eye size={14} className="text-primary" /> : <EyeOff size={14} />}
              <span>{showTranslations ? 'Hide English' : 'Show English'}</span>
            </button>

            {/* Arabic Font Size Selector */}
            <div className="flex items-center bg-background border border-border rounded-xl p-1 gap-1">
              {(['md', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setArabicFontSize(size)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                    arabicFontSize === size
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {size === 'md' ? 'A' : size === 'lg' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Section Content: 5 Interactive Q&A Cards (All 24 Pages Unlocked) */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
              {currentQuestions.map((qa, index) => {
                const qKey = `q${qa.id}`;
                const aKey = `a${qa.id}`;
                const isQuestionPlaying = activeAudioKey === qKey && isPlaying;
                const isAnswerPlaying = activeAudioKey === aKey && isPlaying;

                return (
                  <div
                    key={qa.id}
                    id={`qa-card-${qa.id}`}
                    className="bg-surface rounded-3xl border border-border hover:border-border/80 p-5 sm:p-7 shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Subtle Card Background Accent */}
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

                    {/* Card Header: Number and Tag */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-background border border-border text-xs font-mono font-bold text-primary">
                          #{qa.id < 10 ? `0${qa.id}` : qa.id}
                        </span>
                        <span className="text-xs font-mono text-text-muted">
                          Item {index + 1} of 5
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                          <span>Click Arabic to Listen</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Split Grid: Question on Top, Answer on Bottom */}
                    <div className="grid grid-cols-1 gap-4">
                      
                      {/* --- QUESTION BLOCK --- */}
                      <div className="relative group/q">
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(qKey, qa.questionAudio, qa.questionArabic)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isQuestionPlaying
                              ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(0,104,55,0.25)]'
                              : 'bg-background/80 hover:bg-background border-border/80 hover:border-primary/50'
                          }`}
                          aria-label={`Play question ${qa.id}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            {/* Audio Status Icon Badge */}
                            <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                              isQuestionPlaying
                                ? 'bg-primary text-white scale-105 shadow-md'
                                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover/q:bg-primary group-hover/q:text-white'
                            }`}>
                              {isQuestionPlaying ? (
                                <div className="flex items-center gap-0.5">
                                  <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              ) : (
                                <Volume2 size={18} />
                              )}
                            </div>

                            {/* Arabic Text (Right-aligned, prominent) */}
                            <div className="flex-grow space-y-1.5 text-right" dir="rtl">
                              <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-text-muted mb-1" dir="ltr">
                                <div className="flex items-center gap-2">
                                  <span className="text-primary font-bold tracking-wider uppercase">Question</span>
                                  <span className="text-[10px] text-text-muted font-mono">
                                    #{qa.id}
                                  </span>
                                </div>
                                
                                <span className={`text-[10px] font-sans ${isQuestionPlaying ? 'text-primary font-bold' : 'text-emerald-400'}`}>
                                  {isQuestionPlaying ? 'Playing audio...' : '▶ Listen'}
                                </span>
                              </div>
                              
                              <p className={`font-serif text-text-main font-bold tracking-wide transition-colors ${arabicSizeClasses[arabicFontSize]}`}>
                                {qa.questionArabic}
                              </p>
                              
                              {/* English Translation */}
                              {showTranslations && (
                                <p className="text-xs sm:text-sm text-text-muted font-sans font-normal pt-1 text-left" dir="ltr">
                                  {qa.questionEnglish}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* --- ANSWER BLOCK --- */}
                      <div className="relative group/a">
                        <button
                          type="button"
                          onClick={() => handlePlayAudio(aKey, qa.answerAudio, qa.answerArabic)}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            isAnswerPlaying
                              ? 'bg-accent/10 border-accent/60 shadow-[0_0_20px_rgba(249,178,51,0.25)]'
                              : 'bg-background/80 hover:bg-background border-border/80 hover:border-accent/40'
                          }`}
                          aria-label={`Play answer ${qa.id}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            {/* Audio Status Icon Badge */}
                            <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                              isAnswerPlaying
                                ? 'bg-accent text-black scale-105 font-bold shadow-md'
                                : 'bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover/a:bg-accent group-hover/a:text-black'
                            }`}>
                              {isAnswerPlaying ? (
                                <div className="flex items-center gap-0.5">
                                  <span className="w-1 h-3 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                  <span className="w-1 h-4 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                  <span className="w-1 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                              ) : (
                                <Volume2 size={18} />
                              )}
                            </div>

                            {/* Arabic Text (Right-aligned, prominent) */}
                            <div className="flex-grow space-y-1.5 text-right" dir="rtl">
                              <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-text-muted mb-1" dir="ltr">
                                <div className="flex items-center gap-2">
                                  <span className="text-accent font-bold tracking-wider uppercase">Answer</span>
                                  <span className="text-[10px] text-text-muted font-mono">
                                    #{qa.id}
                                  </span>
                                </div>

                                <span className={`text-[10px] font-sans ${isAnswerPlaying ? 'text-accent font-bold' : 'text-amber-400'}`}>
                                  {isAnswerPlaying ? 'Playing audio...' : '▶ Listen'}
                                </span>
                              </div>

                              <p className={`font-serif text-text-main font-bold tracking-wide transition-colors ${arabicSizeClasses[arabicFontSize]}`}>
                                {qa.answerArabic}
                              </p>

                              {/* English Translation */}
                              {showTranslations && (
                                <p className="text-xs sm:text-sm text-text-muted font-sans font-normal pt-1 text-left" dir="ltr">
                                  {qa.answerEnglish}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Bottom Navigation */}
      <div className="mt-12 pt-6 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Previous Section Button */}
          <button
            onClick={handlePrevSection}
            disabled={currentSection === 1}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border font-semibold text-xs sm:text-sm transition-all duration-200 ${
              currentSection === 1
                ? 'opacity-40 cursor-not-allowed border-border/40 text-text-muted bg-surface/30'
                : 'border-border bg-surface hover:bg-surface/80 text-text-main hover:border-primary/40 active:scale-98 shadow-sm'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Previous Page</span>
          </button>

          {/* Center Progress Pill */}
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span>Page</span>
            <span className="px-2.5 py-1 rounded-lg border font-bold bg-surface border-border text-text-main">
              {currentSection} / {totalSections}
            </span>
            <span>({currentMeta.questionRange})</span>
          </div>

          {/* Next Section Button */}
          {currentSection < totalSections ? (
            <button
              onClick={handleNextSection}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 active:scale-98 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(0,104,55,0.3)] hover:shadow-[0_0_25px_rgba(0,104,55,0.5)]"
            >
              <span>Next Page</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs sm:text-sm">
              <ShieldCheck size={16} />
              <span>Page 24 of 24 (Course Complete)</span>
            </div>
          )}
        </div>

        {/* Section Quick Jump Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 p-3 rounded-2xl bg-surface/40 border border-border/30">
          <span className="text-[10px] font-mono text-text-muted uppercase mr-2">Quick Jump:</span>
          {SECTIONS_META.map((meta) => {
            const isCurrent = meta.id === currentSection;
            const isVisited = visitedSections.has(meta.id);
            return (
              <button
                key={meta.id}
                onClick={() => setCurrentSection(meta.id)}
                className={`min-w-[28px] h-7 px-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-0.5 ${
                  isCurrent
                    ? 'bg-primary text-white shadow-md scale-105'
                    : isVisited
                    ? 'bg-surface border border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60'
                    : 'bg-surface/60 border border-border/50 text-text-muted hover:text-text-main hover:border-border'
                }`}
                title={`${meta.title} (${meta.questionRange})`}
              >
                <span>{meta.id}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
