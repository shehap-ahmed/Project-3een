import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { COURSE_DATA } from '../constants';
import { User, Layers, Users, CheckCircle2, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Courses() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="section-padding space-y-24 pb-32"
    >
      <motion.div {...fadeInUp} className="text-center space-y-6">
        <div className="inline-block px-4 py-1 bg-primary/5 text-primary rounded-full text-[11px] font-bold uppercase tracking-[0.2em]">
          Curriculum
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
          Our <span className="font-serif italic text-primary">Courses</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          Structured programs designed to take you from absolute zero to confident speaker.
        </p>
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.04)] grid lg:grid-cols-2"
      >
        <div className="p-10 md:p-20 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1 h-1 bg-accent rounded-full" />
              Pilot Program
            </div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">{COURSE_DATA.title}</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold text-gray-400">
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                <span>{COURSE_DATA.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-primary" />
                <span>{COURSE_DATA.structure}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary" />
                <span>{COURSE_DATA.students}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest">What you'll master:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COURSE_DATA.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600 group">
                  <div className="w-6 h-6 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <CheckCircle2 size={12} />
                  </div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/course-content" className="btn-premium w-full group">
            View Course Content
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="bg-gray-50 relative overflow-hidden flex items-center justify-center p-12 lg:p-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-soft-purple/5 to-transparent" />
          <div className="relative z-10 w-full aspect-square bg-white rounded-[2.5rem] shadow-2xl flex items-center justify-center text-primary font-bold text-[10rem] select-none hover:scale-105 transition-transform duration-700">
            ع
            <div className="absolute inset-0 rounded-[2.5rem] border-4 border-primary/5 m-4" />
            <div className="absolute inset-0 rounded-[2.5rem] border border-accent/20 m-8" />
          </div>
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-soft-pink/10 rounded-full blur-[80px]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
