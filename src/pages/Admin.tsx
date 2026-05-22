import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  User, 
  AlignLeft, 
  Globe,
  LayoutDashboard,
  Video,
  ListOrdered,
  Play,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

interface Course {
  id: string;
  title: string;
}

interface Lesson {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  order: number;
}

export default function Admin() {
  // Course Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [dialect, setDialect] = useState('MSA');
  const [isPublished, setIsPublished] = useState(false);
  
  // Lesson Form State
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [lessonOrder, setLessonOrder] = useState('');
  
  // Data State
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  // Status State
  const [loading, setLoading] = useState(false);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lessonSuccess, setLessonSuccess] = useState(false);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch lessons when course changes
  useEffect(() => {
    if (selectedCourseId) {
      fetchLessons(selectedCourseId);
    } else {
      setLessons([]);
    }
  }, [selectedCourseId]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCourses(data || []);
    } catch (err: any) {
      console.error('Error fetching courses:', err);
      setError(err.message === 'Failed to fetch' 
        ? 'Network error: Supabase unreachable.' 
        : err.message);
    }
  };

  const fetchLessons = async (courseId: string) => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order', { ascending: true });
      
      if (error) throw error;
      setLessons(data || []);
    } catch (err: any) {
      console.error('Error fetching lessons:', err);
      setError(err.message === 'Failed to fetch' 
        ? 'Network error: Supabase unreachable.' 
        : err.message);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('courses')
        .insert([
          {
            title,
            description,
            instructor,
            dialect,
            is_published: isPublished,
            created_at: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setTitle('');
      setDescription('');
      setInstructor('');
      setDialect('MSA');
      setIsPublished(false);
      
      fetchCourses(); // Refresh course list
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error creating course:', err);
      setError(err.message || 'Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    
    setLessonLoading(true);
    setError(null);
    setLessonSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('lessons')
        .insert([
          {
            course_id: selectedCourseId,
            title: lessonTitle,
            description: lessonDescription,
            video_url: videoUrl,
            order: parseInt(lessonOrder) || 0
          }
        ]);

      if (insertError) throw insertError;

      setLessonSuccess(true);
      setLessonTitle('');
      setLessonDescription('');
      setVideoUrl('');
      setLessonOrder('');
      
      fetchLessons(selectedCourseId); // Refresh lesson list
      setTimeout(() => setLessonSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error adding lesson:', err);
      setError(err.message || 'Failed to add lesson. Please try again.');
    } finally {
      setLessonLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background py-8 md:py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-main flex items-center gap-3">
              <BookOpen className="text-primary" />
              Content Management
            </h1>
            <p className="text-text-muted">Manage your Arabic courses and content.</p>
          </div>
          <Link 
            to="/courses" 
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Back to Courses
          </Link>
        </div>

        {/* Course Creation Form */}
        <motion.div
          {...fadeInUp}
          className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-main">Create New Course</h2>
          </div>

          <form onSubmit={handleCourseSubmit} className="space-y-6">
            {error && !lessonLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm"
              >
                <CheckCircle2 size={18} />
                Course created successfully!
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Course Title</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Standard Arabic"
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Instructor</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    required
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="Instructor Name"
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Dialect</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <select
                    value={dialect}
                    onChange={(e) => setDialect(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main appearance-none"
                  >
                    <option value="MSA">MSA</option>
                    <option value="Egyptian">Egyptian</option>
                    <option value="Levantine">Levantine</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-2xl">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-text-main">Publish Course</p>
                  <p className="text-[10px] text-primary font-bold">Required to show on Courses page</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Description</label>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-6 text-text-muted" size={18} />
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Course description..."
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full flex items-center justify-center gap-2 py-5 group disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Course'}
            </button>
          </form>
        </motion.div>

        {/* Lessons Management Section */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Video size={24} />
            </div>
            <h2 className="text-xl font-bold text-text-main">Lessons Management</h2>
          </div>

          <form onSubmit={handleLessonSubmit} className="space-y-6">
            {error && lessonLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            {lessonSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-3 text-green-600 dark:text-green-400 text-sm"
              >
                <CheckCircle2 size={18} />
                Lesson added successfully!
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Select Course</label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <select
                    required
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main appearance-none"
                  >
                    <option value="">Choose a course...</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Lesson Title</label>
                <div className="relative">
                  <Play className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    required
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Lesson title"
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Lesson Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-4 text-text-muted" size={18} />
                  <textarea
                    rows={2}
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    placeholder="Briefly describe what this lesson covers..."
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Video URL</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Order</label>
                <div className="relative">
                  <ListOrdered className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="number"
                    required
                    value={lessonOrder}
                    onChange={(e) => setLessonOrder(e.target.value)}
                    placeholder="1, 2, 3..."
                    className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={lessonLoading || !selectedCourseId}
              className="btn-premium w-full flex items-center justify-center gap-2 py-5 group disabled:opacity-70"
            >
              {lessonLoading ? <Loader2 className="animate-spin" size={20} /> : 'Add Lesson'}
            </button>
          </form>

          {/* Lessons List */}
          {selectedCourseId && (
            <div className="mt-12 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-main">Lessons in this Course</h3>
                <span className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                  {lessons.length} Lessons
                </span>
              </div>
              
              <div className="space-y-3">
                {lessons.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-2xl">
                    <p className="text-text-muted text-sm">No lessons found for this course.</p>
                  </div>
                ) : (
                  lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-4 bg-background border border-border rounded-2xl group hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xs font-bold">
                          {lesson.order}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-main">{lesson.title}</p>
                          <p className="text-[10px] text-text-muted truncate max-w-[200px] md:max-w-md">{lesson.video_url}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
