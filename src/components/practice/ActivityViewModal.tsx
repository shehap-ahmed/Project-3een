import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PracticeActivity } from '../../types/practice';
import { MeetLettersActivity } from './activities/MeetLettersActivity';
import { HarakatIntroActivity } from './activities/HarakatIntroActivity';
import { HearRecognizeActivity } from './activities/HearRecognizeActivity';
import { FinalChallengeActivity } from './activities/FinalChallengeActivity';
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles, X, Check } from 'lucide-react';

interface ActivityViewModalProps {
  activity: PracticeActivity;
  allActivities: PracticeActivity[];
  completedActivityIds: string[];
  onClose: () => void;
  onCompleteActivity: (activityId: string) => void;
  onSelectActivity: (activity: PracticeActivity) => void;
}

export const ActivityViewModal: React.FC<ActivityViewModalProps> = ({
  activity,
  allActivities,
  completedActivityIds,
  onClose,
  onCompleteActivity,
  onSelectActivity,
}) => {
  const isCurrentCompleted = completedActivityIds.includes(activity.id);
  const [showCompleteBanner, setShowCompleteBanner] = useState(false);

  const currentIndex = allActivities.findIndex((a) => a.id === activity.id);
  const nextActivity =
    currentIndex >= 0 && currentIndex < allActivities.length - 1
      ? allActivities[currentIndex + 1]
      : null;

  const handleActivityCompleted = () => {
    onCompleteActivity(activity.id);
    setShowCompleteBanner(true);
  };

  const handleContinueNext = () => {
    if (nextActivity) {
      setShowCompleteBanner(false);
      onSelectActivity(nextActivity);
    } else {
      onClose();
    }
  };

  const renderActivityContent = () => {
    switch (activity.type) {
      case 'meet-letters':
        return (
          <MeetLettersActivity
            groups={activity.data.groups}
            onComplete={handleActivityCompleted}
            isCompleted={isCurrentCompleted}
          />
        );
      case 'harakat':
        return (
          <HarakatIntroActivity
            data={activity.data}
            onComplete={handleActivityCompleted}
            isCompleted={isCurrentCompleted}
          />
        );
      case 'hear-recognize':
        return (
          <HearRecognizeActivity
            data={activity.data}
            onComplete={handleActivityCompleted}
            isCompleted={isCurrentCompleted}
          />
        );
      case 'final-challenge':
        return (
          <FinalChallengeActivity
            data={activity.data}
            onComplete={handleActivityCompleted}
            isCompleted={isCurrentCompleted}
          />
        );
      default:
        return (
          <div className="p-8 text-center text-text-muted">
            Activity content coming soon.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto flex flex-col">
      {/* Top Sticky Header */}
      <div className="sticky top-0 z-20 bg-surface/95 backdrop-blur-lg border-b border-border px-4 md:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-text-muted hover:text-text-main hover:border-primary transition-all cursor-pointer"
              title="Return to Practice Path"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-primary tracking-wider uppercase font-mono">
                  Activity 0{activity.order}
                </span>
                {isCurrentCompleted && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 size={11} /> Completed
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-text-main leading-tight">
                {activity.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-text-muted hover:text-text-main hover:bg-background border border-transparent hover:border-border transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              Back to Course
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-background border border-border text-text-muted hover:text-text-main sm:hidden"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Activity Content Area */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Completion Celebration Overlay / Banner if triggered */}
        <AnimatePresence>
          {showCompleteBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-5 rounded-3xl bg-emerald-500/15 border border-emerald-500/40 text-text-main flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            >
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-emerald-400">
                    ✓ Activity Complete!
                  </h4>
                  <p className="text-xs text-text-muted">
                    Your progress has been recorded. Ready for the next step?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowCompleteBanner(false)}
                  className="px-4 py-2.5 rounded-xl bg-background text-text-muted hover:text-text-main border border-border text-xs font-bold transition-all w-full sm:w-auto"
                >
                  Review
                </button>
                <button
                  onClick={handleContinueNext}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md w-full sm:w-auto cursor-pointer"
                >
                  <span>{nextActivity ? 'Continue →' : 'Return to Course'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {renderActivityContent()}
      </div>
    </div>
  );
};
