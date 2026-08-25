import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { COURSE_DATA } from '../constants';
import { Play, CheckCircle2, ChevronRight, FileText, ArrowLeft, Check, Sparkles, BookOpen, Loader2, ArrowRight, AlertCircle } from 'lucide-react';
import DiscordIcon from '../components/DiscordIcon';
import { Link, useLocation, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { supabase } from '../lib/supabase';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

interface Lesson {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  order: number;
}

interface Course {
  id: string;
  slug?: string;
  title: string;
  instructor: string;
}

export default function CourseContent() {
  const { id: urlId } = useParams();
  const location = useLocation();
  
  // Manual extraction as requested
  const path = window.location.pathname;
  const manualCourseId = path.split("/course/")[1];
  
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showEnrolledMessage, setShowEnrolledMessage] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLessonListOpen, setIsLessonListOpen] = useState(false);

  // Determine if we are viewing the static course or a dynamic one
  const isStatic = (!manualCourseId && !urlId) || manualCourseId === COURSE_DATA.id || urlId === COURSE_DATA.id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setFetchError(null);
      const slug = manualCourseId || urlId || COURSE_DATA.id;
      console.log("Loading course with identifier:", slug);
      
      try {
        let fetchedCourse: Course | null = null;
        let fetchedLessons: Lesson[] = [];
        let usedId: string | null = null;

        // Always try to fetch from Supabase to get the proper UUID
        const { data: dbCourse } = await supabase
          .from('courses')
          .select('id, title, instructor, slug')
          .eq('slug', slug)
          .maybeSingle();

        if (dbCourse) {
          fetchedCourse = dbCourse;
          usedId = dbCourse.id;
          console.log("Course found in DB with UUID:", usedId);
        }

        if (isStatic) {
          // For the static/featured course, provide hardcoded fallback if not in DB
          if (!fetchedCourse) {
            fetchedCourse = {
              id: COURSE_DATA.id,
              title: COURSE_DATA.title,
              instructor: COURSE_DATA.instructor
            };
            usedId = COURSE_DATA.id; // Still slug if missing from DB
            console.log("Course NOT in DB, using static slug as ID:", usedId);
          }

          // Use static lessons as fallback if DB has none
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
        } else {
          // Dynamic course logic
          if (!fetchedCourse) {
            // Try by UUID as fallback
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
        }

        setCourse(fetchedCourse);
        setCurrentCourseId(usedId);
        console.log("Final Course ID for enrollment:", usedId);
        setLessons(fetchedLessons);
        
        if (fetchedLessons.length > 0) {
          setActiveLesson(fetchedLessons[0]);
        }

        // Check if user is enrolled
        const { data: { session } } = await supabase.auth.getSession();
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
          setIsEnrolled(true);
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
      const savedProgress = localStorage.getItem(`course_progress_${currentCourseId}`);
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      } else {
        setCompletedLessons([]);
      }
    }
  }, [currentCourseId]);

  // Save progress to localStorage
  const toggleLessonComplete = useCallback((lessonId: string) => {
    const isCompleting = !completedLessons.includes(lessonId);
    const newCompleted = isCompleting
      ? [...completedLessons, lessonId]
      : completedLessons.filter(id => id !== lessonId);
    
    setCompletedLessons(newCompleted);
    if (currentCourseId) {
      localStorage.setItem(`course_progress_${currentCourseId}`, JSON.stringify(newCompleted));
    }

    if (isCompleting) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006837', '#f9b233', '#e9a6b3']
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [completedLessons, currentCourseId]);

  const progressPercentage = lessons.length > 0 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;

  const handleEnroll = async () => {
    console.log("CRITICAL: handleEnroll button clicked!");
    setEnrolling(true);
    setEnrollError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error("Enrollment error: No session");
        setEnrollError("Please log in to enroll.");
        return;
      }
      
      console.log("Enrollment target:", { user: session.user.id, course: currentCourseId });

      const { error } = await supabase
        .from('enrollments')
        .insert([{ 
          user_id: session.user.id, 
          course_id: currentCourseId
        }]);

      if (error) {
        console.error("Enrollment Database Error:", error);
        setEnrollError(`DATABASE ERROR: ${error.message}`);
        
        // Fallback
        const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
        if (!localEnrollments.includes(currentCourseId)) {
          localEnrollments.push(currentCourseId);
          localStorage.setItem('local_enrollments', JSON.stringify(localEnrollments));
        }
      } else {
        console.log("Enrollment Database SUCCESS");
        setIsEnrolled(true);
        setShowEnrolledMessage(true);
        setTimeout(() => setShowEnrolledMessage(false), 3000);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      console.error("Enrollment Catch Block:", err);
      setEnrollError(err.message);
    } finally {
      setEnrolling(false);
    }
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
              className="px-6 py-2 bg-background border border-border rounded-full font-bold text-sm hover:bg-surface transition-colors"
            >
              Retry
            </button>
          )}
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

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="section-padding space-y-6 md:space-y-12 pb-16 md:pb-24 lg:pb-32"
    >
      <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/courses" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all border border-border">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-text-main leading-tight">{course.title}</h1>
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

      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
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
          ) : activeLesson ? (
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
                    {/* Security Overlays */}
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
          ) : (
            <div className="aspect-video bg-surface rounded-2xl md:rounded-3xl border-2 border-dashed border-border flex items-center justify-center">
              <p className="text-text-muted">No lessons available for this course.</p>
            </div>
          )}

          <div className="bg-surface p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border space-y-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg md:text-xl font-bold text-text-main">Lesson Overview</h2>
              {activeLesson && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl md:rounded-full text-sm font-bold transition-all ${
                    completedLessons.includes(activeLesson.id)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {completedLessons.includes(activeLesson.id) ? (
                    <span className="flex items-center gap-2">
                      <Check size={16} /> Completed
                    </span>
                  ) : (
                    'Mark as Complete'
                  )}
                </motion.button>
              )}
            </div>
            <p className="text-text-muted leading-relaxed text-sm md:text-base">
              {activeLesson 
                ? (activeLesson.description || `In this lesson, we cover the fundamentals of ${activeLesson.title.toLowerCase()}. This structured session includes live examples, practice exercises, and direct feedback from the instructor.`)
                : 'Select a lesson from the list to start learning.'}
            </p>
          </div>

          <button 
            onClick={() => setIsLessonListOpen(!isLessonListOpen)}
            className="lg:hidden w-full p-4 bg-surface border border-border rounded-xl flex items-center justify-between font-bold text-text-main"
          >
            <span className="flex items-center gap-2">
              <BookOpen size={18} className="text-primary" />
              Course Content
            </span>
            <ChevronRight size={18} className={`transition-transform duration-300 ${isLessonListOpen ? 'rotate-90' : ''}`} />
          </button>

          <AnimatePresence>
            {isLessonListOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="bg-surface rounded-xl border border-border divide-y divide-border">
                  {lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setActiveLesson(lesson);
                        setIsLessonListOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full p-4 flex items-center gap-4 text-left transition-all ${
                        activeLesson?.id === lesson.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        activeLesson?.id === lesson.id ? 'bg-primary text-white' : 'bg-background text-text-muted'
                      }`}>
                        {lesson.order}
                      </div>
                      <div className="flex-grow">
                        <p className={`text-sm font-bold ${activeLesson?.id === lesson.id ? 'text-primary' : 'text-text-main'}`}>
                          {lesson.title}
                        </p>
                      </div>
                      {completedLessons.includes(lesson.id) && <CheckCircle2 size={16} className="text-green-500" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="hidden lg:block space-y-6">
          <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-sm transition-colors duration-300">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-text-main">Course Content</h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {lessons.length} Lessons
              </span>
            </div>
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto custom-scrollbar">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full p-6 flex items-center gap-4 text-left transition-all hover:bg-background ${
                    activeLesson?.id === lesson.id ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative transition-all duration-300 ${
                    activeLesson?.id === lesson.id ? 'bg-primary text-white' : 'bg-background text-text-muted'
                  }`}>
                    {completedLessons.includes(lesson.id) ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-1 -right-1 bg-surface rounded-full p-0.5 shadow-sm"
                      >
                        <CheckCircle2 size={14} className="text-green-500" />
                      </motion.div>
                    ) : null}
                    {lesson.order}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-bold ${activeLesson?.id === lesson.id ? 'text-primary' : 'text-text-main'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-text-muted">Video Lesson</p>
                  </div>
                  {activeLesson?.id === lesson.id ? (
                    <Play size={14} className="text-primary" fill="currentColor" />
                  ) : (
                    <ChevronRight size={14} className="text-border" />
                  )}
                </button>
              ))}
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
