import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { User, Layers, Users, CheckCircle2, ArrowRight, Globe, BookOpen, Loader2, AlertCircle, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

import Logo from '../components/Logo';

interface Lesson {
  id: string;
  title: string;
  order: number;
}

interface Course {
  id: string;
  slug?: string;
  title: string;
  description: string;
  instructor: string;
  dialect: string;
  is_published: boolean;
  lessons?: Lesson[];
}

export default function Courses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      console.log("Courses: fetchCourses started");
      try {
        setLoading(true);
        setError(null);
        
        // 1. Fetch courses (Always public if RLS allows)
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*')
          .eq('is_published', true);

        if (coursesError) {
          console.error("Courses fetch error:", coursesError);
          // If fetch fails (e.g. RLS), we'll stay with empty list or fallback
          setCourses([]);
        } else if (coursesData && coursesData.length > 0) {
          // Fetch all lessons for these courses
          const courseIds = coursesData.map(c => c.id);
          const { data: lessonsData, error: lessonsError } = await supabase
            .from('lessons')
            .select('id, title, order, course_id')
            .in('course_id', courseIds);

          if (lessonsError) console.warn("Lessons fetch error:", lessonsError);

          // Map lessons to courses
          const mappedCourses = coursesData.map(course => ({
            ...course,
            lessons: (lessonsData || [])
              .filter(l => l.course_id === course.id)
              .sort((a, b) => a.order - b.order)
          }));
          setCourses(mappedCourses);
        } else {
          setCourses([]);
        }

        // 2. Separately fetch session and enrollments
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            console.log("Fetching enrollments for user:", session.user.id);
            const { data: enrollData, error: enrollError } = await supabase
              .from('enrollments')
              .select('course_id')
              .eq('user_id', session.user.id);
            
            if (enrollError) console.warn("Enrollment fetch error:", enrollError);
            
            const dbEnrollments = enrollData ? enrollData.map(e => String(e.course_id)) : [];
            const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
            const castedLocal = localEnrollments.map((id: any) => String(id));
            setEnrollments([...new Set([...dbEnrollments, ...castedLocal])]);
          } else {
            // Fallback to local enrollments for guests
            const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
            setEnrollments(localEnrollments.map((id: any) => String(id)));
          }
        } catch (sessionErr: any) {
          console.warn("Session/Enrollment fetch error (non-critical):", sessionErr);
        }
      } catch (err: any) {
        console.error('Critical error in courses effect:', err);
        setError(err.message === 'Failed to fetch' 
          ? 'Unable to connect to the database. This usually means the Supabase project is inactive or your internet connection is down.'
          : `System error: ${err.message || 'Unknown network error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseIdOrSlug: string, slug?: string) => {
    console.log("handleEnroll STARTED for:", courseIdOrSlug);
    let resolvedId = courseIdOrSlug;
    
    // If it's the featured course slug, try to find its UUID in the fetched courses
    if (courseIdOrSlug === COURSE_DATA.id) {
       const matched = courses.find(c => c.slug === courseIdOrSlug || c.title === COURSE_DATA.title);
       if (matched) {
         resolvedId = matched.id;
       }
    }

    const stringId = String(resolvedId);
    console.log("handleEnroll Debug - Identifier:", courseIdOrSlug, "Resolved UUID:", stringId);
    
    try {
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.error("Auth Error:", authError.message);
        throw authError;
      }

      if (!session) {
        console.warn("No Session Found - Redirecting to Login");
        navigate('/login', { state: { from: location } });
        return;
      }

      console.log("Attempting DB Insert:", { user: session.user.id, course: stringId });
      setEnrollingId(String(courseIdOrSlug));

      // Try database insert
      const { error: insertError } = await supabase
        .from('enrollments')
        .insert([
          { user_id: session.user.id, course_id: stringId }
        ]);

      if (insertError) {
        console.error("Database insert error:", insertError);
        
        console.warn("Database enrollment failed, using localStorage fallback:", insertError.message);
        // Fallback to localStorage for the demo
        const localEnrollments = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
        if (!localEnrollments.map((id: any) => String(id)).includes(stringId)) {
          localEnrollments.push(stringId);
          localStorage.setItem('local_enrollments', JSON.stringify(localEnrollments));
        }
      } else {
        console.log("DB Enrollment SUCCESS");
      }

      console.log("Enrollment success (DB or Local), navigating...");
      setEnrollments(prev => [...new Set([...prev, String(courseIdOrSlug), stringId])]);
      
      // Force navigation using slug
      navigate(`/course/${slug || courseIdOrSlug}`);
      
    } catch (err: any) {
      console.error('Enrollment critical error:', err);
      alert(`Enrollment failed: ${err.message || 'Unknown error'}`);
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="section-padding space-y-12 md:space-y-16 lg:space-y-24 pb-16 md:pb-24 lg:pb-32"
    >
      <motion.div {...fadeInUp} className="text-center space-y-4 md:space-y-6 pt-12 md:pt-0">
        <div className="inline-block px-4 py-1 bg-primary/5 text-primary rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">
          Curriculum
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-main tracking-tight leading-tight">
          Our <span className="font-serif italic text-primary">Courses</span>
        </h1>
        <p className="text-text-muted max-w-xl mx-auto text-base md:text-lg px-4 md:px-0">
          Step-by-step lessons designed to help you start reading and speaking Arabic.
        </p>
      </motion.div>

      {/* Static Featured Course Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary whitespace-nowrap">Featured Course</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] border border-border overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-2 transition-colors duration-300"
        >
          <div className="p-6 md:p-12 lg:p-20 space-y-8 lg:space-y-10">
            <div className="space-y-4 md:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest mx-auto lg:mx-0">
                <span className="w-1 h-1 bg-accent rounded-full" />
                Pilot Program
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-main leading-tight">{COURSE_DATA.title}</h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-xs font-semibold text-text-muted">
                <div className="flex items-center gap-2">
                  <User size={14} md:size={16} className="text-primary" />
                  <span>{COURSE_DATA.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers size={14} md:size={16} className="text-primary" />
                  <span>{COURSE_DATA.structure}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} md:size={16} className="text-primary" />
                  <span>{COURSE_DATA.students}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h3 className="font-bold text-text-main uppercase text-[10px] md:text-xs tracking-widest text-center lg:text-left">What you'll learn:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 max-w-sm mx-auto lg:mx-0">
                {COURSE_DATA.lessons.slice(0, 6).map((lesson, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-medium text-text-main opacity-80 group">
                    <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <CheckCircle2 size={10} lg:size={12} />
                    </div>
                    <span>{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 text-text-main text-xs md:text-sm font-medium">
                <Lock size={16} className="text-accent shrink-0" />
                <span>This course will be available after the live course launches.</span>
              </div>
              
              <button 
                disabled
                className="w-full py-4 md:py-5 flex items-center justify-center gap-2 bg-text-muted/10 text-text-muted/50 font-bold rounded-full border border-border/80 cursor-not-allowed text-sm uppercase tracking-wider"
              >
                <Lock size={16} />
                <span>Locked</span>
              </button>
            </div>
          </div>

          <div className="bg-background relative overflow-hidden flex items-center justify-center p-8 md:p-24 transition-colors duration-300 hidden lg:flex">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-soft-purple/5 to-transparent" />
            <div className="relative z-10 w-full aspect-square bg-surface rounded-[2.5rem] shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-700 border border-border">
              <Logo className="w-2/3 h-2/3" />
              <div className="absolute inset-0 rounded-[2.5rem] border-4 border-primary/5 m-4" />
              <div className="absolute inset-0 rounded-[2.5rem] border border-accent/20 m-8" />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-48 h-48 bg-soft-pink/10 rounded-full blur-[80px]" />
          </div>
        </motion.div>
      </div>

      {/* Dynamic Courses Section */}
      <div className="space-y-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary whitespace-nowrap">Available Courses</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-text-muted font-medium">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-200 dark:border-red-900/20">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Connection Error</h3>
            <p className="text-red-500/80 mt-2 max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-full font-bold text-sm hover:bg-red-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-[2.5rem] border border-border border-dashed">
            <BookOpen className="mx-auto text-text-muted mb-4" size={48} />
            <h3 className="text-xl font-bold text-text-main">No courses available yet</h3>
            <p className="text-text-muted mt-2">Check back soon for new Arabic learning content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface border border-border rounded-[2rem] p-6 md:p-8 space-y-6 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Globe size={12} />
                      {course.dialect}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                      <User size={14} className="text-primary/60" />
                      {course.instructor}
                    </div>
                  </div>

                  <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  {/* What You Will Learn Section */}
                  {course.lessons && course.lessons.length > 0 && (
                    <div className="pt-4 space-y-3">
                      <h4 className="font-bold text-text-main uppercase text-[10px] tracking-widest opacity-60">What you'll learn:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {course.lessons.slice(0, 6).map((lesson) => (
                          <div key={lesson.id} className="flex items-center gap-2 text-[11px] font-medium text-text-main opacity-80">
                            <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <CheckCircle2 size={10} />
                            </div>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  {enrollments.includes(course.id) ? (
                    <Link to={`/course/${course.slug || course.id}`} className="btn-premium w-full group py-3 text-sm">
                      Go to Course
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        console.log("Button clicked for course:", course.id);
                        handleEnroll(course.id, course.slug);
                      }}
                      disabled={enrollingId === course.id}
                      className="btn-premium w-full group py-3 text-sm flex items-center justify-center gap-2"
                    >
                      {enrollingId === course.id ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="animate-spin" size={16} />
                          <span>Enrolling...</span>
                        </div>
                      ) : (
                        <>
                          Enroll Now
                          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
