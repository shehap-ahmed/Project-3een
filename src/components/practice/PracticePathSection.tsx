import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PracticePathData, PracticeActivity, ActivityStatus } from '../../types/practice';
import { ActivityViewModal } from './ActivityViewModal';
import {
  BookOpen,
  Layers,
  Volume2,
  Sparkles,
  Award,
  Lock,
  CheckCircle2,
  ChevronRight,
  Play,
  Check,
  Headphones,
  ArrowRight,
  Trophy
} from 'lucide-react';

interface PracticePathSectionProps {
  practicePath: PracticePathData;
  courseId: string;
  lessonId: number | string;
  userId?: string | null;
  completedIds?: string[];
  onCompleteActivity?: (activityId: string) => void;
  selectedActivity?: PracticeActivity | null;
  onSelectActivity?: (activity: PracticeActivity | null) => void;
}

export const PracticePathSection: React.FC<PracticePathSectionProps> = ({
  practicePath,
  courseId,
  lessonId,
  userId,
  completedIds: propCompletedIds,
  onCompleteActivity: propOnCompleteActivity,
  selectedActivity: propSelectedActivity,
  onSelectActivity: propOnSelectActivity,
}) => {
  const storageKey = `practice_progress_${courseId}_${lessonId}`;

  const [localCompletedIds, setLocalCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [localSelectedActivity, setLocalSelectedActivity] = useState<PracticeActivity | null>(null);

  const completedIds = propCompletedIds !== undefined ? propCompletedIds : localCompletedIds;
  const selectedActivity = propSelectedActivity !== undefined ? propSelectedActivity : localSelectedActivity;

  const setSelectedActivity = (act: PracticeActivity | null) => {
    if (propOnSelectActivity) {
      propOnSelectActivity(act);
    } else {
      setLocalSelectedActivity(act);
    }
  };

  // Sync state if course or lesson changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setLocalCompletedIds(saved ? JSON.parse(saved) : []);
    } catch {
      setLocalCompletedIds([]);
    }
  }, [storageKey]);

  const handleCompleteActivity = (activityId: string) => {
    if (propOnCompleteActivity) {
      propOnCompleteActivity(activityId);
    }
    setLocalCompletedIds((prev) => {
      if (prev.includes(activityId)) return prev;
      const next = [...prev, activityId];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save practice progress locally:', e);
      }
      return next;
    });
  };

  // Visible activities on the lesson page below the video (Activities 1 & 2: Letters & Harakat)
  const visibleActivities = practicePath.activities.filter(
    (act) => act.placement !== 'sidebar' && (act.order <= 2 || !act.placement)
  );

  const getActivityStatus = (activity: PracticeActivity, index: number): ActivityStatus => {
    if (completedIds.includes(activity.id)) {
      return 'completed';
    }
    // Activity 1 is always unlocked. Later activities unlock if previous is completed.
    if (index === 0) {
      return 'available';
    }
    const allActivities = practicePath.activities;
    const currentActivityIndex = allActivities.findIndex((a) => a.id === activity.id);
    if (currentActivityIndex > 0) {
      const prevActivity = allActivities[currentActivityIndex - 1];
      if (prevActivity && completedIds.includes(prevActivity.id)) {
        return 'available';
      }
    }
    return 'locked';
  };

  const getActivityIcon = (type: string, status: ActivityStatus) => {
    if (status === 'completed') {
      return <CheckCircle2 size={20} className="text-emerald-400" />;
    }
    if (status === 'locked') {
      return <Lock size={18} className="text-text-muted opacity-60" />;
    }

    switch (type) {
      case 'meet-letters':
        return <BookOpen size={18} className="text-primary" />;
      case 'letter-connections':
        return <Layers size={18} className="text-primary" />;
      case 'harakat':
        return <Sparkles size={18} className="text-primary" />;
      case 'hear-recognize':
        return <Volume2 size={18} className="text-primary" />;
      case 'final-challenge':
        return <Award size={18} className="text-primary" />;
      default:
        return <Play size={18} className="text-primary" />;
    }
  };

  const totalActivities = visibleActivities.length;
  const completedCount = visibleActivities.filter((a) =>
    completedIds.includes(a.id)
  ).length;
  const progressPct = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  return (
    <section className="bg-surface p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border space-y-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-bold text-text-main">
              {practicePath.title}
            </h2>
            <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
              {completedCount}/{totalActivities} Completed
            </span>
          </div>
          <p className="text-text-muted text-xs md:text-sm mt-1">
            {practicePath.description}
          </p>
        </div>

        {/* Mini progress bar */}
        <div className="flex items-center gap-3 self-start sm:self-auto min-w-[160px]">
          <div className="flex-1 h-2 bg-background rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs font-bold font-mono text-text-muted">
            {progressPct}%
          </span>
        </div>
      </div>

      {/* Activity Learning Path Cards */}
      <div className="space-y-3">
        {visibleActivities.map((activity, index) => {
          const status = getActivityStatus(activity, index);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';

          return (
            <div
              key={activity.id}
              onClick={() => {
                if (!isLocked) {
                  setSelectedActivity(activity);
                }
              }}
              className={`p-4 md:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 select-none ${
                isLocked
                  ? 'bg-background/40 border-border/60 opacity-60 cursor-not-allowed'
                  : 'bg-background hover:bg-surface border-border hover:border-primary/40 cursor-pointer shadow-sm group'
              }`}
            >
              {/* Left Side: Number, Icon, Title, Description */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Number / Status Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 border transition-colors ${
                    isCompleted
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isLocked
                      ? 'bg-surface border-border text-text-muted'
                      : 'bg-primary/10 border-primary/30 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}
                >
                  {getActivityIcon(activity.type, status)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-text-muted">
                      0{activity.order}
                    </span>
                    <span className="text-xs text-text-muted">•</span>
                    <h3
                      className={`text-sm md:text-base font-bold truncate transition-colors ${
                        isLocked
                          ? 'text-text-muted'
                          : 'text-text-main group-hover:text-primary'
                      }`}
                    >
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-0.5 max-w-md sm:max-w-xl">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* Right Side: Status Badge & Navigation Arrow */}
              <div className="flex items-center gap-3 shrink-0">
                {isCompleted ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <Check size={13} /> Completed
                  </span>
                ) : isLocked ? (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border text-text-muted text-xs font-medium">
                    <Lock size={12} /> Complete previous
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                    Available
                  </span>
                )}

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                    isLocked
                      ? 'text-text-muted opacity-40'
                      : 'text-text-muted group-hover:text-primary group-hover:translate-x-1'
                  }`}
                >
                  <ChevronRight size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal View for Active Activity */}
      <AnimatePresence>
        {selectedActivity && (
          <ActivityViewModal
            activity={selectedActivity}
            allActivities={practicePath.activities}
            completedActivityIds={completedIds}
            onClose={() => setSelectedActivity(null)}
            onCompleteActivity={handleCompleteActivity}
            onSelectActivity={(act) => setSelectedActivity(act)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
