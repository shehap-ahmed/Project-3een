import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useCallback } from 'react';
import { COURSE_DATA } from '../constants';
import { Play, CheckCircle2, ChevronRight, FileText, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import confetti from 'canvas-confetti';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function CourseContent() {
  const location = useLocation();
  const [activeLesson, setActiveLesson] = useState(COURSE_DATA.lessons[0]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_progress_${COURSE_DATA.id}`);
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  const toggleLessonComplete = useCallback((lessonId: number) => {
    const isCompleting = !completedLessons.includes(lessonId);
    const newCompleted = isCompleting
      ? [...completedLessons, lessonId]
      : completedLessons.filter(id => id !== lessonId);
    
    setCompletedLessons(newCompleted);
    localStorage.setItem(`course_progress_${COURSE_DATA.id}`, JSON.stringify(newCompleted));

    if (isCompleting) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#006837', '#f9b233', '#e9a6b3']
      });

      // Show success state briefly
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  }, [completedLessons]);

  const progressPercentage = Math.round((completedLessons.length / COURSE_DATA.lessons.length) * 100);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="section-padding space-y-12 pb-24"
    >
      <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/courses" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{COURSE_DATA.title}</h1>
            <p className="text-gray-500 text-sm">Instructor: {COURSE_DATA.instructor}</p>
          </div>
        </div>

        {/* Progress Bar Header */}
        <div className="bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2 min-w-[240px] relative overflow-hidden">
          <AnimatePresence>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute inset-0 bg-primary/5 flex items-center justify-center z-10 backdrop-blur-sm"
              >
                <span className="text-primary font-bold text-xs flex items-center gap-2">
                  <Sparkles size={14} /> Progress Saved!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-gray-700">Course Progress</span>
            <span className="text-primary font-bold">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="h-full bg-primary transition-all duration-700 ease-out"
            />
          </div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
            {completedLessons.length} of {COURSE_DATA.lessons.length} lessons completed
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Player Area */}
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-black rounded-3xl overflow-hidden relative flex items-center justify-center group cursor-pointer border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="absolute bottom-8 left-8 text-left">
              <p className="text-white font-bold text-xl">{activeLesson.title}</p>
              <p className="text-white/60 text-sm">Lesson {activeLesson.id} of {COURSE_DATA.lessons.length}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-900">Lesson Overview</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLessonComplete(activeLesson.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  completedLessons.includes(activeLesson.id)
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {completedLessons.includes(activeLesson.id) ? (
                  <motion.span 
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} /> Completed
                  </motion.span>
                ) : (
                  'Mark as Complete'
                )}
              </motion.button>
            </div>
            <p className="text-gray-500 leading-relaxed">
              In this lesson, we cover the fundamentals of {activeLesson.title.toLowerCase()}. This structured session includes live examples, practice exercises, and direct feedback from the instructor.
            </p>
          </div>
        </motion.div>

        {/* Sidebar Lesson List */}
        <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Course Content</h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {COURSE_DATA.lessons.length} Lessons
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {COURSE_DATA.lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full p-6 flex items-center gap-4 text-left transition-all hover:bg-gray-50 ${
                    activeLesson.id === lesson.id ? 'bg-primary/5 border-l-4 border-primary' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative transition-all duration-300 ${
                    activeLesson.id === lesson.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {completedLessons.includes(lesson.id) ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
                      >
                        <CheckCircle2 size={14} className="text-green-500" />
                      </motion.div>
                    ) : null}
                    {lesson.id}
                  </div>
                  <div className="flex-grow">
                    <p className={`text-sm font-bold ${activeLesson.id === lesson.id ? 'text-primary' : 'text-gray-900'}`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-gray-400">Video Lesson</p>
                  </div>
                  {activeLesson.id === lesson.id ? (
                    <Play size={14} className="text-primary" fill="currentColor" />
                  ) : (
                    <ChevronRight size={14} className="text-gray-300" />
                  )}
                </button>
              ))}
              <div className="p-6 bg-gray-50/50">
                <div className="flex items-center gap-4 text-left opacity-60">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                    <FileText size={14} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-gray-900">Final Exam</p>
                    <p className="text-xs text-gray-400">Quiz Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 p-6 rounded-3xl border border-accent/20 space-y-4">
            <h4 className="font-bold text-accent">Need Help?</h4>
            <p className="text-sm text-accent/80 leading-relaxed">
              Join our Discord community to ask questions and get feedback on your homework.
            </p>
            <a
              href={COURSE_DATA.id} // Placeholder for discord link
              className="inline-block text-sm font-bold text-accent hover:underline"
            >
              Go to Discord →
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
