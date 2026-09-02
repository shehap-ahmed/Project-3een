import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { COURSE_DATA } from '../constants';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  BookOpen, 
  Loader2, 
  ArrowRight, 
  AlertCircle, 
  Lock, 
  ShieldCheck,
  Headphones,
  Trophy,
  Volume2,
  Award
} from 'lucide-react';
import DiscordIcon from '../components/DiscordIcon';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';
import { getSafeUserRole, checkIsAdmin, clearCachedRole } from '../lib/authUtils';
import { getPracticePathForLesson } from '../data/practicePaths';
import { PracticeActivity } from '../types/practice';
import { PracticePathSection } from '../components/practice/PracticePathSection';
import { ActivityViewModal } from '../components/practice/ActivityViewModal';
import { HearRecognizeActivity } from '../components/practice/activities/HearRecognizeActivity';
import { FinalChallengeActivity } from '../components/practice/activities/FinalChallengeActivity';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

interface Course {
  id: string;
  slug?: string;
  title: string;
  instructor: string;
}

interface LessonItem {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  order: number;
}

export default function CourseContent() {
  const { id: urlId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const path = window.location.pathname;
  const manualCourseId = path.split("/course/")[1];
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [activeLesson, setActiveLesson] = useState<LessonItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<PracticeActivity | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showEnrolledMessage, setShowEnrolledMessage] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [completedActivities, setCompletedActivities] = useState<Record<string, string[]>>({});
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLessonListOpen, setIsLessonListOpen] = useState(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const isStatic = (!manualCourseId && !urlId) || manualCourseId === COURSE_DATA.id || urlId === COURSE_DATA.id;
  const effectiveCourseSlug = isStatic ? COURSE_DATA.id : (course?.slug || manualCourseId || urlId || COURSE_DATA.id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(null);
      const slug = manualCourseId || urlId || COURSE_DATA.id;
      let userIsAdmin = false;
      
      try {
        let fetchedCourse: Course | null = null;
        let fetchedLessons: LessonItem[] = [];
        let usedId: string | null = null;

        // Fetch current user and role
        const { data: { session } } = await supabase.auth.getSession();
        let role = 'student';
        if (session?.user) {
          setUserEmail(session.user.email || null);
          role = await getSafeUserRole(session.user);
          userIsAdmin = checkIsAdmin(role);
          setUserRole(role);
          setIsAdmin(userIsAdmin);
        } else {
          setUserEmail(null);
          setUserRole(null);
          setIsAdmin(false);
        }

        // Fetch from Supabase
        const { data: dbCourse } = await supabase
          .from('courses')
          .select('id, title, instructor, slug')
          .eq('slug', slug)
          .maybeSingle();

        if (dbCourse) {
          fetchedCourse = dbCourse;
          usedId = dbCourse.id;
        }

        if (isStatic) {
          if (!fetchedCourse) {
            fetchedCourse = {
              id: COURSE_DATA.id,
              title: COURSE_DATA.title,
              instructor: COURSE_DATA.instructor
            };
            usedId = COURSE_DATA.id;
          }

          const { data: lessonsData } = await supabase
            .from('lessons')
            .select('*')
            .eq('course_id', usedId)
            .order('order', { ascending: true });

          if (lessonsData && lessonsData.length > 0) {
            fetchedLessons = lessonsData;
          } else {
            fetchedLessons = COURSE_DATA.lessons.map(l => ({
              id: l.id.toString(),
              title: l.title,
              description: l.description,
              video_url: l.videoId,
              order: l.id
            }));
          }

          if (userIsAdmin) {
            setIsEnrolled(true);
          } else {
            setIsEnrolled(false);
          }
        } else {
          if (!fetchedCourse) {
            const { data: fallbackData } = await supabase
              .from('courses')
              .select('id, title, instructor, slug')
              .eq('id', slug)
              .maybeSingle();
            
            if (fallbackData) {
              fetchedCourse = fallbackData;
              usedId = fallbackData.id;
            } else {
              throw new Error("Course not found");
            }
          }

          const { data: lessonsData, error: lessonsError } = await supabase
            .from('lessons')
            .select('*')
            .eq('course_id', usedId)
            .order('order', { ascending: true });

          if (lessonsError) throw lessonsError;
          fetchedLessons = lessonsData || [];

          if (session && usedId) {
            const { data: enrollment } = await supabase
              .from('enrollments')
              .select('id')
              .eq('user_id', session.user.id)
              .eq('course_id', usedId)
              .maybeSingle();
            
            if (enrollment) {
              setIsEnrolled(true);
            } else {
              const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
              if (localEnrollments.includes(usedId)) {
                setIsEnrolled(true);
              } else {
                setIsEnrolled(false);
              }
            }
          }
        }

        setCourse(fetchedCourse);
        setCurrentCourseId(usedId);
        setLessons(fetchedLessons);
        
        if (fetchedLessons.length > 0) {
          setActiveLesson(fetchedLessons[0]);
        }
      } catch (err: any) {
        console.warn('Notice in CourseContent fetch:', err);
        if (isStatic) {
          setCourse({
            id: COURSE_DATA.id,
            title: COURSE_DATA.title,
            instructor: COURSE_DATA.instructor
          });
          const staticLessons = COURSE_DATA.lessons.map(l => ({
            id: l.id.toString(),
            title: l.title,
            description: l.description,
            video_url: l.videoId,
            order: l.id
          }));
          setLessons(staticLessons);
          if (staticLessons.length > 0) {
            setActiveLesson(staticLessons[0]);
          }
          if (userIsAdmin) {
            setIsEnrolled(true);
          }
        } else {
          setFetchError(err.message === 'Failed to fetch' 
            ? 'Unable to load course content. The database might be offline.' 
            : err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlId, manualCourseId, isStatic]);

  // Load progress from localStorage
  useEffect(() => {
    if (currentCourseId) {
      const savedCourseProg = localStorage.getItem(`course_progress_${currentCourseId}`);
      if (savedCourseProg) {
        setCompletedLessons(JSON.parse(savedCourseProg));
      } else {
        setCompletedLessons([]);
      }

      const savedVideos = localStorage.getItem(`completed_videos_${currentCourseId}`);
      if (savedVideos) {
        setCompletedVideos(JSON.parse(savedVideos));
      } else {
        setCompletedVideos([]);
      }

      const actsMap: Record<string, string[]> = {};
      lessons.forEach((l) => {
        const key = `practice_progress_${effectiveCourseSlug}_${l.order || l.id}`;
        const savedActs = localStorage.getItem(key);
        if (savedActs) {
          actsMap[l.id] = JSON.parse(savedActs);
        } else {
          actsMap[l.id] = [];
        }
      });
      setCompletedActivities(actsMap);
    }
  }, [currentCourseId, lessons, effectiveCourseSlug]);

  const handleLockedClick = (message: string) => {
    setLockedNotice(message);
    setTimeout(() => {
      setLockedNotice(null);
    }, 2500);
  };

  // Helper to mark a single practice activity as completed
  const handleCompleteActivity = useCallback((lessonId: string, activityId: string) => {
    setCompletedActivities((prev) => {
      const currentList = prev[lessonId] || [];
      if (currentList.includes(activityId)) return prev;
      const updated = [...currentList, activityId];
      
      const key = `practice_progress_${effectiveCourseSlug}_${activeLesson?.order || lessonId}`;
      localStorage.setItem(key, JSON.stringify(updated));

      // Check if all required activities and video for this lesson are completed
      const practicePath = getPracticePathForLesson(effectiveCourseSlug, activeLesson?.order || lessonId);
      const allRequired = practicePath?.activities.map(a => a.id) || [];
      const isVideoDone = completedVideos.includes(lessonId);

      const allActsDone = allRequired.every(reqId => updated.includes(reqId));
      if (allActsDone && isVideoDone && !completedLessons.includes(lessonId)) {
        const newCompletedLessons = [...completedLessons, lessonId];
        setCompletedLessons(newCompletedLessons);
        if (currentCourseId) {
          localStorage.setItem(`course_progress_${currentCourseId}`, JSON.stringify(newCompletedLessons));
        }
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#006837', '#f9b233', '#e9a6b3']
        });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2500);
      }

      return {
        ...prev,
        [lessonId]: updated,
      };
    });
  }, [effectiveCourseSlug, activeLesson, completedVideos, completedLessons, currentCourseId]);

  // Helper to mark a video lesson completed
  const toggleVideoComplete = useCallback((lessonId: string) => {
    const isVideoDone = completedVideos.includes(lessonId);
    const newCompletedVideos = isVideoDone
      ? completedVideos.filter(id => id !== lessonId)
      : [...completedVideos, lessonId];

    setCompletedVideos(newCompletedVideos);
    if (currentCourseId) {
      localStorage.setItem(`completed_videos_${currentCourseId}`, JSON.stringify(newCompletedVideos));
    }

    // Check if lesson is fully complete (all practice activities done)
    const lessonActs = completedActivities[lessonId] || [];
    const practicePath = getPracticePathForLesson(effectiveCourseSlug, activeLesson?.order || lessonId);
    const allRequired = practicePath?.activities.map(a => a.id) || [];
    const allActsDone = allRequired.length === 0 || allRequired.every(reqId => lessonActs.includes(reqId));

    if (!isVideoDone && allActsDone && !completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      if (currentCourseId) {
        localStorage.setItem(`course_progress_${currentCourseId}`, JSON.stringify(newCompleted));
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006837', '#f9b233', '#e9a6b3']
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [completedVideos, completedActivities, effectiveCourseSlug, activeLesson, completedLessons, currentCourseId]);

  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setEnrollError("Please log in to enroll.");
        return;
      }

      const { error } = await supabase
        .from('enrollments')
        .insert([{ 
          user_id: session.user.id, 
          course_id: currentCourseId
        }]);

      if (error) {
        setEnrollError(`DATABASE ERROR: ${error.message}`);
        const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
        if (!localEnrollments.includes(currentCourseId)) {
          localEnrollments.push(currentCourseId);
          localStorage.setItem('local_enrollments', JSON.stringify(localEnrollments));
        }
      } else {
        setIsEnrolled(true);
        setShowEnrolledMessage(true);
        setTimeout(() => setShowEnrolledMessage(false), 3000);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      setEnrollError(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const handleSelectLesson = (lesson: LessonItem) => {
    setActiveLesson(lesson);
    setSelectedActivity(null);
    setIsLessonListOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-text-muted font-medium">Loading course content...</p>
      </div>
    );
  }

  if (!course || fetchError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text-main">
            {fetchError ? 'Connection Error' : 'Course Not Found'}
          </h2>
          <p className="text-text-muted max-w-md">
            {fetchError || "The course you are looking for doesn't exist or has been removed."}
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/courses" className="btn-premium">
            Back to Courses
          </Link>
          {fetchError && (
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-background border border-border rounded-full font-bold text-sm hover:bg-surface transition-colors cursor-pointer"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // Restrict MSA Beginner Pilot Course to role 'admin' only
  if (isStatic && !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-surface border border-border p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mx-auto">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-main">Role "admin" Required</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              The <strong>MSA Beginner Pilot Course</strong> is currently restricted to administrators during early testing.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-4 text-left border border-border">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Access Diagnostic</p>
            <div className="space-y-1.5 font-mono text-[11px] text-text-main">
              <div className="flex justify-between"><span>User:</span> <span className="text-text-muted truncate max-w-[180px]">{userEmail || 'Guest'}</span></div>
              <div className="flex justify-between"><span>Authenticated:</span> <span className={userEmail ? "text-green-500 font-bold" : "text-amber-500 font-bold"}>{userEmail ? 'Yes' : 'No'}</span></div>
              <div className="flex justify-between"><span>Required Role:</span> <span className="text-primary font-bold">admin</span></div>
              <div className="flex justify-between"><span>Current Role:</span> <span className="text-amber-500 font-bold">{userRole || 'student'}</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 group transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
            >
              Back to Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            {userEmail && (
              <button 
                onClick={async () => {
                  if (userEmail) clearCachedRole(userEmail);
                  await supabase.auth.signOut();
                  navigate('/login', { state: { from: location } });
                }}
                className="w-full text-text-muted text-xs font-bold hover:text-text-main py-2 transition-colors cursor-pointer"
              >
                Sign out and switch account
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  };

  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const activePracticePath = activeLesson ? getPracticePathForLesson(effectiveCourseSlug, activeLesson.order || activeLesson.id) : null;
  const allActivities: PracticeActivity[] = activePracticePath?.activities || [];
  const lessonActsCompleted = activeLesson ? (completedActivities[activeLesson.id] || []) : [];
  const isVideoDone = activeLesson ? completedVideos.includes(activeLesson.id) : false;

  const currentLessonIndex = lessons.findIndex((l) => l.id === activeLesson?.id);
  const nextLesson = currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1 
    ? lessons[currentLessonIndex + 1] 
    : null;

  // Next Step / Button Progression Calculation
  const isArabicLettersDone = lessonActsCompleted.includes('c1-a1');
  const isHarakatDone = lessonActsCompleted.includes('c1-a2');
  const isHearDone = lessonActsCompleted.includes('c1-a3');
  const isFinalDone = lessonActsCompleted.includes('c1-a4');

  const getNextActionState = () => {
    if (!activeLesson) return null;

    if (activeLesson.order === 1) {
      if (!isArabicLettersDone) {
        const act = allActivities.find((a) => a.id === 'c1-a1');
        return {
          type: 'activity' as const,
          activity: act,
          label: !isVideoDone ? 'Start Practice: Meet the Arabic Letters' : 'Next: Meet the Arabic Letters',
        };
      }
      if (!isHarakatDone) {
        const act = allActivities.find((a) => a.id === 'c1-a2');
        return {
          type: 'activity' as const,
          activity: act,
          label: 'Next: Harakat',
        };
      }
      if (!isVideoDone) {
        return {
          type: 'video' as const,
          label: 'Mark Video as Watched',
        };
      }
      // Both practice activities and video are finished for Arabic Letters & Harakat -> Next is Hear & Recognize
      const hearAct = allActivities.find((a) => a.id === 'c1-a3');
      if (hearAct) {
        return {
          type: 'activity' as const,
          activity: hearAct,
          label: 'Next Lesson: Hear & Recognize',
        };
      }
    }

    if (nextLesson) {
      return {
        type: 'nextLesson' as const,
        lesson: nextLesson,
        label: `Next Lesson: ${nextLesson.title}`,
      };
    }

    return {
      type: 'completed' as const,
      label: 'Course Completed ✓',
    };
  };

  const nextAction = getNextActionState();

  const handleNextAction = () => {
    if (!nextAction) return;

    if (nextAction.type === 'activity' && nextAction.activity) {
      setSelectedActivity(nextAction.activity);
    } else if (nextAction.type === 'video') {
      if (activeLesson) toggleVideoComplete(activeLesson.id);
    } else if (nextAction.type === 'nextLesson') {
      handleSelectLesson(nextAction.lesson);
    }
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="section-padding space-y-6 md:space-y-10 pb-16 md:pb-24 lg:pb-32"
    >
      {/* Locked Notice Floating Toast */}
      <AnimatePresence>
        {lockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-surface/95 backdrop-blur-md border border-amber-500/30 text-text-main px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs md:text-sm font-semibold"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
              <Lock size={14} />
            </div>
            <span>{lockedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header & Course Progress */}
      <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/courses" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all border border-border">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-3xl font-bold text-text-main leading-tight">{course.title}</h1>
              {isStatic && isAdmin && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold">
                  <ShieldCheck size={12} /> Admin Pilot Access
                </span>
              )}
            </div>
            <p className="text-text-muted text-xs md:text-sm">Instructor: {course.instructor}</p>
          </div>
        </div>

        <div className="bg-surface px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-border shadow-sm flex flex-col gap-2 min-w-full md:min-w-[240px] relative overflow-hidden transition-colors duration-300">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-primary/5 flex items-center justify-center z-10 backdrop-blur-sm"
              >
                <span className="text-primary font-bold text-[10px] md:text-xs flex items-center gap-2">
                  <Sparkles size={14} /> Progress Saved!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between items-center text-xs md:text-sm">
            <span className="font-bold text-text-main opacity-80">Course Progress</span>
            <span className="text-primary font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full h-1.5 md:h-2 bg-background rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-full bg-primary transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </motion.div>

      {/* Main Grid: Left Lesson Area + Right Course Content Sidebar */}
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
          {!isEnrolled ? (
            <div className="aspect-video bg-surface rounded-2xl md:rounded-3xl border border-border flex flex-col items-center justify-center p-8 text-center space-y-6 shadow-xl relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
               <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                 <Play size={40} fill="currentColor" />
               </div>
               <div className="space-y-2 relative z-10">
                 <h2 className="text-2xl font-bold text-text-main">Start Your Arabic Journey</h2>
                 <p className="text-text-muted max-w-sm">Enroll now to access all lessons, track your progress, and join the community.</p>
               </div>
               
               <div className="w-full max-w-md space-y-4 relative z-10">
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="btn-premium w-full flex items-center justify-center gap-3 py-4 text-lg"
                  >
                    {enrolling ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        Start Course 
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                  {enrollError && <p className="text-red-500 text-xs font-medium">{enrollError}</p>}
               </div>

               <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-text-muted opacity-60">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    Full Access
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary" />
                    Progress Saving
                  </div>
               </div>
            </div>
          ) : selectedActivity && (selectedActivity.id === 'c1-a3' || selectedActivity.id === 'c1-a4') && activeLesson ? (
            <div className="space-y-6 md:space-y-8">
              {/* Dedicated Activity Interactive Container */}
              <div className="bg-surface p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border">
                {selectedActivity.type === 'hear-recognize' && (
                  <HearRecognizeActivity
                    data={selectedActivity.data}
                    onComplete={() => handleCompleteActivity(activeLesson.id, selectedActivity.id)}
                    isCompleted={lessonActsCompleted.includes(selectedActivity.id)}
                  />
                )}
                {selectedActivity.type === 'final-challenge' && (
                  <FinalChallengeActivity
                    data={selectedActivity.data}
                    onComplete={() => handleCompleteActivity(activeLesson.id, selectedActivity.id)}
                    isCompleted={lessonActsCompleted.includes(selectedActivity.id)}
                  />
                )}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    if (selectedActivity.id === 'c1-a3') {
                      setSelectedActivity(null); // Back to Arabic Letters & Harakat
                    } else if (selectedActivity.id === 'c1-a4') {
                      const hearAct = allActivities.find((a) => a.id === 'c1-a3');
                      if (hearAct) setSelectedActivity(hearAct);
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-surface hover:bg-background border border-border text-xs sm:text-sm font-bold text-text-muted hover:text-text-main transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>
                    {selectedActivity.id === 'c1-a3' ? 'Previous: Arabic Letters & Harakat' : 'Previous: Hear & Recognize'}
                  </span>
                </button>

                {selectedActivity.id === 'c1-a3' ? (
                  <button
                    onClick={() => {
                      if (lessonActsCompleted.includes('c1-a3') || isAdmin) {
                        const finalAct = allActivities.find((a) => a.id === 'c1-a4');
                        if (finalAct) setSelectedActivity(finalAct);
                      } else {
                        handleLockedClick("Complete Hear & Recognize to unlock the Final Challenge.");
                      }
                    }}
                    className={`btn-premium px-6 py-3 text-xs sm:text-sm flex items-center gap-2 ${
                      !lessonActsCompleted.includes('c1-a3') && !isAdmin ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Next: Final Challenge</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (lessonActsCompleted.includes('c1-a4') || isAdmin) {
                        setSelectedActivity(null);
                        if (lessons.length > 1) {
                          handleSelectLesson(lessons[1]);
                        }
                      } else {
                        handleLockedClick("Pass the Final Challenge with 75%+ score to unlock Pronouns.");
                      }
                    }}
                    className={`btn-premium px-6 py-3 text-xs sm:text-sm flex items-center gap-2 ${
                      !lessonActsCompleted.includes('c1-a4') && !isAdmin ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span>Next Lesson: Pronouns</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : activeLesson ? (
            <div className="space-y-8">
              {/* Video Player Box */}
              <motion.div 
                key={activeLesson.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl mx-[-1.5rem] md:mx-0 group"
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className="absolute inset-0 z-0">
                  {isYouTube(activeLesson.video_url) ? (
                    <>
                      <iframe
                        src={`${getEmbedUrl(activeLesson.video_url)}?modestbranding=1&rel=0`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={activeLesson.title}
                      ></iframe>
                      <div className="absolute inset-x-0 top-0 h-16 pointer-events-auto bg-transparent z-10" />
                      <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-auto bg-transparent z-10" />
                      <div className="absolute inset-0 pointer-events-none bg-transparent" />
                    </>
                  ) : (
                    <video 
                      src={activeLesson.video_url} 
                      controls 
                      controlsList="nodownload"
                      className="w-full h-full object-contain"
                      poster="/logo.png"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </motion.div>

              {/* Lesson Overview Box */}
              <div className="bg-surface p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border space-y-4 transition-colors duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      Lesson 0{activeLesson.order}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-text-main">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleVideoComplete(activeLesson.id)}
                    className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      isVideoDone
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-primary text-black hover:bg-primary-hover shadow-sm'
                    }`}
                  >
                    {isVideoDone ? (
                      <span className="flex items-center gap-1.5">
                        <Check size={16} /> Video Watched
                      </span>
                    ) : (
                      'Mark Video as Watched'
                    )}
                  </motion.button>
                </div>

                <p className="text-text-muted leading-relaxed text-sm md:text-base">
                  {activeLesson.description || `In this lesson, we cover the fundamentals of ${activeLesson.title.toLowerCase()}. Follow along with the video and practice with the interactive path below.`}
                </p>
              </div>

              {/* Practice Path Section (Meet the Arabic Letters & Harakat) */}
              {activePracticePath && (
                <PracticePathSection
                  practicePath={activePracticePath}
                  courseId={effectiveCourseSlug}
                  lessonId={activeLesson.order || activeLesson.id}
                  completedIds={lessonActsCompleted}
                  onCompleteActivity={(actId) => handleCompleteActivity(activeLesson.id, actId)}
                  selectedActivity={selectedActivity}
                  onSelectActivity={(act) => setSelectedActivity(act)}
                />
              )}

              {/* Lesson Progression Footer Bar */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    if (currentLessonIndex > 0) {
                      handleSelectLesson(lessons[currentLessonIndex - 1]);
                    }
                  }}
                  disabled={currentLessonIndex === 0}
                  className="px-5 py-3 rounded-2xl bg-surface hover:bg-background border border-border text-xs sm:text-sm font-bold text-text-muted hover:text-text-main disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  <span>Previous Lesson</span>
                </button>

                {nextAction && (
                  <button
                    onClick={handleNextAction}
                    className="btn-premium px-6 py-3 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <span>{nextAction.label}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-surface rounded-2xl md:rounded-3xl border-2 border-dashed border-border flex items-center justify-center">
              <p className="text-text-muted">No lessons available for this course.</p>
            </div>
          )}

          {/* Mobile Course Content Toggle Button */}
          <button 
            onClick={() => setIsLessonListOpen(!isLessonListOpen)}
            className="lg:hidden w-full p-4 bg-surface border border-border rounded-xl flex items-center justify-between font-bold text-text-main cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              Course Content Navigation
            </span>
            <ChevronRight size={18} className={`transition-transform duration-300 ${isLessonListOpen ? 'rotate-90' : ''}`} />
          </button>

          {/* Mobile Course Content Drawer */}
          <AnimatePresence>
            {isLessonListOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden space-y-1 bg-surface rounded-2xl border border-border p-2 mt-2"
              >
                {lessons.map((lesson, index) => {
                  const isSelected = activeLesson?.id === lesson.id;
                  const isVideoCompleted = completedVideos.includes(lesson.id);
                  const lesson1FinalDone = (completedActivities[lessons[0]?.id] || []).includes('c1-a4');
                  const lesson1VideoDone = completedVideos.includes(lessons[0]?.id);
                  const isLocked = !isAdmin && (
                    index === 0 ? false :
                    index === 1 ? (!lesson1FinalDone || !lesson1VideoDone) :
                    !completedLessons.includes(lessons[index - 1]?.id)
                  );

                  // Progression states for Lesson 1 exercises
                  const isArabicLettersDone = (completedActivities[lesson.id] || []).includes('c1-a1');
                  const isHarakatDone = (completedActivities[lesson.id] || []).includes('c1-a2');
                  const isHearUnlocked = isArabicLettersDone && isHarakatDone;
                  const isHearDone = (completedActivities[lesson.id] || []).includes('c1-a3');
                  const isHearSelected = selectedActivity?.id === 'c1-a3';

                  const isFinalUnlocked = isHearDone;
                  const isFinalDone = (completedActivities[lesson.id] || []).includes('c1-a4');
                  const isFinalSelected = selectedActivity?.id === 'c1-a4';

                  const isVideoActive = isSelected && !selectedActivity;

                  return (
                    <div key={lesson.id} className="space-y-0.5">
                      {/* Video Lesson Row */}
                      <div
                        onClick={() => {
                          if (!isLocked) {
                            handleSelectLesson(lesson);
                            setIsLessonListOpen(false);
                          } else {
                            handleLockedClick(
                              index === 1
                                ? "Pass the Final Challenge with 75%+ score to unlock Pronouns."
                                : "Complete previous lessons to unlock."
                            );
                          }
                        }}
                        className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                          isLocked
                            ? 'opacity-45 cursor-not-allowed'
                            : isVideoActive
                            ? 'bg-primary/10 text-text-main cursor-pointer'
                            : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                        }`}
                      >
                        {/* Video Single-stroke Line Icon in 32px Square */}
                        <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                          isVideoCompleted
                            ? 'bg-primary/20 text-primary'
                            : isVideoActive
                            ? 'bg-primary text-black font-semibold'
                            : isLocked
                            ? 'bg-surface-hover text-text-muted opacity-45'
                            : 'bg-surface-hover text-text-muted'
                        }`}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="6 3 20 12 6 21 6 3"/>
                          </svg>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className={`text-sm leading-snug truncate ${
                            isVideoActive ? 'text-text-main font-medium' : isLocked ? 'text-text-muted' : 'text-text-main/90 font-medium'
                          }`}>
                            {lesson.title}
                          </div>
                          {isVideoActive && (
                            <div className="text-xs text-primary mt-0.5 leading-none">
                              Video · in progress
                            </div>
                          )}
                        </div>

                        {isVideoCompleted ? (
                          <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        ) : isLocked ? (
                          <Lock size={14} className="text-text-muted shrink-0" />
                        ) : null}
                      </div>

                      {/* Standalone Exercises following Lesson 1 */}
                      {lesson.order === 1 && (
                        <>
                          {/* Standalone Lesson 2: Hear & Recognize */}
                          <div
                            onClick={() => {
                              if (isHearUnlocked || isAdmin) {
                                const act = allActivities.find((a) => a.id === 'c1-a3');
                                if (act) {
                                  setActiveLesson(lesson);
                                  setSelectedActivity(act);
                                  setIsLessonListOpen(false);
                                }
                              } else {
                                handleLockedClick("Complete Arabic Letters & Harakat below the video first.");
                              }
                            }}
                            className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                              !isHearUnlocked && !isAdmin
                                ? 'opacity-45 cursor-not-allowed'
                                : isHearSelected
                                ? 'bg-primary/10 text-text-main cursor-pointer'
                                : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                            }`}
                          >
                            {/* Target / Concentric Circles Line Icon */}
                            <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                              isHearDone
                                ? 'bg-primary/20 text-primary'
                                : isHearSelected
                                ? 'bg-primary text-black font-semibold'
                                : (!isHearUnlocked && !isAdmin)
                                ? 'bg-surface-hover text-text-muted opacity-45'
                                : 'bg-surface-hover text-text-muted'
                            }`}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="9"/>
                                <circle cx="12" cy="12" r="4.2"/>
                                <circle cx="12" cy="12" r="0.6" fill="currentColor"/>
                              </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className={`text-sm leading-snug truncate ${
                                isHearSelected ? 'text-text-main font-medium' : (!isHearUnlocked && !isAdmin) ? 'text-text-muted' : 'text-text-main/90 font-medium'
                              }`}>
                                Hear &amp; Recognize
                              </div>
                              <div className={`text-xs mt-0.5 leading-none ${isHearSelected ? 'text-primary' : 'text-text-muted'}`}>
                                {isHearSelected ? 'Exercise · in progress' : 'Exercise'}
                              </div>
                            </div>

                            {isHearDone ? (
                              <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (!isHearUnlocked && !isAdmin) ? (
                              <Lock size={14} className="text-text-muted shrink-0" />
                            ) : null}
                          </div>

                          {/* Standalone Lesson 3: Final Challenge */}
                          <div
                            onClick={() => {
                              if (isFinalUnlocked || isAdmin) {
                                const act = allActivities.find((a) => a.id === 'c1-a4');
                                if (act) {
                                  setActiveLesson(lesson);
                                  setSelectedActivity(act);
                                  setIsLessonListOpen(false);
                                }
                              } else {
                                handleLockedClick("Complete Hear & Recognize first.");
                              }
                            }}
                            className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                              !isFinalUnlocked && !isAdmin
                                ? 'opacity-45 cursor-not-allowed'
                                : isFinalSelected
                                ? 'bg-primary/10 text-text-main cursor-pointer'
                                : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                            }`}
                          >
                            {/* Shield with checkmark Line Icon */}
                            <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                              isFinalDone
                                ? 'bg-primary/20 text-primary'
                                : isFinalSelected
                                ? 'bg-primary text-black font-semibold'
                                : (!isFinalUnlocked && !isAdmin)
                                ? 'bg-surface-hover text-text-muted opacity-45'
                                : 'bg-surface-hover text-text-muted'
                            }`}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>
                                <polyline points="9 12 11 14 15 10"/>
                              </svg>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className={`text-sm leading-snug truncate ${
                                isFinalSelected ? 'text-text-main font-medium' : (!isFinalUnlocked && !isAdmin) ? 'text-text-muted' : 'text-text-main/90 font-medium'
                              }`}>
                                Final Challenge
                              </div>
                              <div className={`text-xs mt-0.5 leading-none ${isFinalSelected ? 'text-primary' : 'text-text-muted'}`}>
                                Test · 75% score
                              </div>
                            </div>

                            {isFinalDone ? (
                              <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            ) : (!isFinalUnlocked && !isAdmin) ? (
                              <Lock size={14} className="text-text-muted shrink-0" />
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right Sidebar: Course Content matching screenshot design */}
        <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="hidden lg:block space-y-6">
          <div className="bg-surface rounded-2xl md:rounded-3xl border border-border overflow-hidden shadow-xs transition-colors duration-300">
            <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-[15px] font-semibold text-text-main">
                <BookOpen size={17} className="text-text-muted stroke-[1.8]" />
                <span>Course Content</span>
              </div>
              <span className="text-[12.5px] text-text-muted font-normal">
                {lessons.length + 2} lessons
              </span>
            </div>

            <div className="p-2 space-y-0.5 max-h-[640px] overflow-y-auto custom-scrollbar">
              {lessons.map((lesson, index) => {
                const isSelected = activeLesson?.id === lesson.id;
                const isVideoCompleted = completedVideos.includes(lesson.id);
                const lesson1FinalDone = (completedActivities[lessons[0]?.id] || []).includes('c1-a4');
                const lesson1VideoDone = completedVideos.includes(lessons[0]?.id);
                const isLocked = !isAdmin && (
                  index === 0 ? false :
                  index === 1 ? (!lesson1FinalDone || !lesson1VideoDone) :
                  !completedLessons.includes(lessons[index - 1]?.id)
                );

                // Progression states for Lesson 1 exercises
                const isArabicLettersDone = (completedActivities[lesson.id] || []).includes('c1-a1');
                const isHarakatDone = (completedActivities[lesson.id] || []).includes('c1-a2');
                const isHearUnlocked = isArabicLettersDone && isHarakatDone;
                const isHearDone = (completedActivities[lesson.id] || []).includes('c1-a3');
                const isHearSelected = selectedActivity?.id === 'c1-a3';

                const isFinalUnlocked = isHearDone;
                const isFinalDone = (completedActivities[lesson.id] || []).includes('c1-a4');
                const isFinalSelected = selectedActivity?.id === 'c1-a4';

                const isVideoActive = isSelected && !selectedActivity;

                return (
                  <div key={lesson.id} className="space-y-0.5">
                    {/* Video Lesson Row */}
                    <div
                      onClick={() => {
                        if (!isLocked) {
                          handleSelectLesson(lesson);
                        } else {
                          handleLockedClick(
                            index === 1
                              ? "Pass the Final Challenge with 75%+ score to unlock Pronouns."
                              : "Complete previous lessons to unlock."
                          );
                        }
                      }}
                      className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                        isLocked
                          ? 'opacity-45 cursor-not-allowed'
                          : isVideoActive
                          ? 'bg-primary/10 text-text-main cursor-pointer'
                          : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                      }`}
                    >
                      {/* Video Single-stroke Line Icon in 32px Square */}
                      <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                        isVideoCompleted
                          ? 'bg-primary/20 text-primary'
                          : isVideoActive
                          ? 'bg-primary text-black font-semibold'
                          : isLocked
                          ? 'bg-surface-hover text-text-muted opacity-45'
                          : 'bg-surface-hover text-text-muted'
                      }`}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="6 3 20 12 6 21 6 3"/>
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className={`text-sm leading-snug truncate ${
                          isVideoActive ? 'text-text-main font-medium' : isLocked ? 'text-text-muted' : 'text-text-main/90 font-medium'
                        }`}>
                          {lesson.title}
                        </div>
                        {isVideoActive && (
                          <div className="text-xs text-primary mt-0.5 leading-none">
                            Video · in progress
                          </div>
                        )}
                      </div>

                      {isVideoCompleted ? (
                        <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : isLocked ? (
                        <Lock size={14} className="text-text-muted shrink-0" />
                      ) : null}
                    </div>

                    {/* Standalone Exercises following Lesson 1 */}
                    {lesson.order === 1 && (
                      <>
                        {/* Standalone Lesson 2: Hear & Recognize */}
                        <div
                          onClick={() => {
                            if (isHearUnlocked || isAdmin) {
                              const act = allActivities.find((a) => a.id === 'c1-a3');
                              if (act) {
                                setActiveLesson(lesson);
                                setSelectedActivity(act);
                                setIsLessonListOpen(false);
                              }
                            } else {
                              handleLockedClick("Complete Arabic Letters & Harakat below the video first.");
                            }
                          }}
                          className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                            !isHearUnlocked && !isAdmin
                              ? 'opacity-45 cursor-not-allowed'
                              : isHearSelected
                              ? 'bg-primary/10 text-text-main cursor-pointer'
                              : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                          }`}
                        >
                          {/* Target / Concentric Circles Line Icon */}
                          <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                            isHearDone
                              ? 'bg-primary/20 text-primary'
                              : isHearSelected
                              ? 'bg-primary text-black font-semibold'
                              : (!isHearUnlocked && !isAdmin)
                              ? 'bg-surface-hover text-text-muted opacity-45'
                              : 'bg-surface-hover text-text-muted'
                          }`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="9"/>
                              <circle cx="12" cy="12" r="4.2"/>
                              <circle cx="12" cy="12" r="0.6" fill="currentColor"/>
                            </svg>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-sm leading-snug truncate ${
                              isHearSelected ? 'text-text-main font-medium' : (!isHearUnlocked && !isAdmin) ? 'text-text-muted' : 'text-text-main/90 font-medium'
                            }`}>
                              Hear &amp; Recognize
                            </div>
                            <div className={`text-xs mt-0.5 leading-none ${isHearSelected ? 'text-primary' : 'text-text-muted'}`}>
                              {isHearSelected ? 'Exercise · in progress' : 'Exercise'}
                            </div>
                          </div>

                          {isHearDone ? (
                            <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (!isHearUnlocked && !isAdmin) ? (
                            <Lock size={14} className="text-text-muted shrink-0" />
                          ) : null}
                        </div>

                        {/* Standalone Lesson 3: Final Challenge */}
                        <div
                          onClick={() => {
                            if (isFinalUnlocked || isAdmin) {
                              const act = allActivities.find((a) => a.id === 'c1-a4');
                              if (act) {
                                setActiveLesson(lesson);
                                setSelectedActivity(act);
                                setIsLessonListOpen(false);
                              }
                            } else {
                              handleLockedClick("Complete Hear & Recognize first.");
                            }
                          }}
                          className={`w-full py-2 px-2.5 rounded-[10px] transition-all text-left flex items-center gap-3 ${
                            !isFinalUnlocked && !isAdmin
                              ? 'opacity-45 cursor-not-allowed'
                              : isFinalSelected
                              ? 'bg-primary/10 text-text-main cursor-pointer'
                              : 'hover:bg-surface-hover/60 text-text-muted hover:text-text-main cursor-pointer'
                          }`}
                        >
                          {/* Shield with checkmark Line Icon */}
                          <div className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
                            isFinalDone
                              ? 'bg-primary/20 text-primary'
                              : isFinalSelected
                              ? 'bg-primary text-black font-semibold'
                              : (!isFinalUnlocked && !isAdmin)
                              ? 'bg-surface-hover text-text-muted opacity-45'
                              : 'bg-surface-hover text-text-muted'
                          }`}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>
                              <polyline points="9 12 11 14 15 10"/>
                            </svg>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-sm leading-snug truncate ${
                              isFinalSelected ? 'text-text-main font-medium' : (!isFinalUnlocked && !isAdmin) ? 'text-text-muted' : 'text-text-main/90 font-medium'
                            }`}>
                              Final Challenge
                            </div>
                            <div className={`text-xs mt-0.5 leading-none ${isFinalSelected ? 'text-primary' : 'text-text-muted'}`}>
                              Test · 75% score
                            </div>
                          </div>

                          {isFinalDone ? (
                            <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          ) : (!isFinalUnlocked && !isAdmin) ? (
                            <Lock size={14} className="text-text-muted shrink-0" />
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Legend */}
            <div className="p-3 border-t border-border flex items-center justify-between text-xs text-text-muted px-4">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-[5px] bg-surface-hover flex items-center justify-center text-text-muted">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                </span>
                Video
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-[5px] bg-surface-hover flex items-center justify-center text-text-muted">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.2"/></svg>
                </span>
                Exercise
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-[5px] bg-surface-hover flex items-center justify-center text-text-muted">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/></svg>
                </span>
                Test
              </span>
            </div>
          </div>

          <div className="bg-accent/10 p-6 rounded-3xl border border-accent/20 space-y-4">
            <h4 className="font-bold text-accent">Need Help?</h4>
            <p className="text-sm text-accent/80 leading-relaxed">
              Join our Discord community to ask questions and get feedback on your homework.
            </p>
            <a
              href="https://discord.gg/x52dtrhp3Y"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
            >
              <DiscordIcon size={16} />
              Go to Discord →
            </a>
          </div>
        </motion.div>
      </div>

      {/* Global Activity View Modal for inline practice exercises (Letters & Harakat) */}
      <AnimatePresence>
        {selectedActivity && selectedActivity.id !== 'c1-a3' && selectedActivity.id !== 'c1-a4' && activeLesson && (
          <ActivityViewModal
            activity={selectedActivity}
            allActivities={allActivities.filter(a => a.id === 'c1-a1' || a.id === 'c1-a2')}
            completedActivityIds={lessonActsCompleted}
            onClose={() => setSelectedActivity(null)}
            onCompleteActivity={(actId) => handleCompleteActivity(activeLesson.id, actId)}
            onSelectActivity={(act) => setSelectedActivity(act)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEnrolledMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={24} />
            You are enrolled in this course
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
