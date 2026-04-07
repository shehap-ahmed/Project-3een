import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Video, MessageCircle, CheckCircle2, Play } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function Home() {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-32 pb-32"
    >
      {/* Hero Section */}
      <section className="section-padding relative min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[13px] font-bold tracking-wider uppercase mb-8 border border-primary/10"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          Enrollment Open for 2026
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900 max-w-5xl leading-[1.05] mb-8"
        >
          Master Arabic <br />
          <span className="font-serif italic text-primary">from the ground up.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed mb-12"
        >
          A structured, premium learning experience by Project 3een. Designed for absolute beginners who value clarity, structure, and community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <Link to="/courses" className="btn-premium group">
            Start Learning Now
            <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={CONTACT_INFO.discord} target="_blank" rel="noopener noreferrer" className="btn-premium-outline">
            Join the Community
          </a>
        </motion.div>

        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/5 via-soft-purple/5 to-transparent rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-soft-pink/5 rounded-full blur-[80px]" />
          
          {/* Abstract Dune-like shapes */}
          <svg className="absolute bottom-0 left-0 w-full h-64 opacity-[0.03] pointer-events-none" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="var(--color-accent)" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          {/* Large Feature */}
          <motion.div 
            {...fadeInUp}
            className="md:col-span-8 md:row-span-2 bento-card flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                <Video size={24} />
              </div>
              <h3 className="text-3xl font-bold tracking-tight">Interactive Live Sessions</h3>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Experience real-time learning with Angelo, our lead Iraqi instructor. Get direct feedback, participate in drills, and master pronunciation in a live environment.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-[4rem] transition-transform duration-700 group-hover:scale-110" />
            <div className="relative z-10 flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-400">
                    U{i}
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Join 500+ Students</span>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:row-span-1 bento-card flex flex-col justify-center gap-4 bg-primary text-white border-none"
          >
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <h3 className="text-xl font-bold">Structured Curriculum</h3>
            <p className="text-white/60 text-sm leading-relaxed">From letters to complex sentences, every step is planned.</p>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 bento-card flex flex-col justify-center gap-4"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
              <Users size={20} />
            </div>
            <h3 className="text-xl font-bold">Discord Hub</h3>
            <p className="text-gray-500 text-sm leading-relaxed">A vibrant community for 24/7 support and practice.</p>
          </motion.div>

          {/* Medium Feature */}
          <motion.div 
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="md:col-span-12 md:row-span-1 bento-card flex items-center justify-between group"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Homework & Direct Feedback</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl">We don't just teach; we ensure you learn. Regular assignments are reviewed by our team to keep you on track.</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                <MessageCircle size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Video Section */}
      <section className="bg-white py-32 relative overflow-hidden">
        <div className="section-padding grid lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <div className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest">
              Course Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Experience the <br />
              <span className="font-serif italic text-primary">Project 3een Method</span>
            </h2>
            <p className="text-gray-500 leading-relaxed text-lg">
              Our pilot course has been refined through live testing with real students. Watch how we break down complex Arabic concepts into simple, digestible lessons.
            </p>
            <div className="space-y-4">
              {['Live Iraqi Teacher', 'Modern Standard Arabic', 'Interactive Q&A'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 size={12} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            <div className="relative aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 group-hover:scale-[1.02] transition-transform duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </button>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-bold text-xl">MSA Beginner Pilot Course</p>
                <p className="text-white/60 text-sm">Live Demo Preview</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <motion.div 
          {...fadeInUp}
          className="bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
          
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Ready to start your journey?</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Join hundreds of students mastering Arabic with our structured program.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link to="/courses" className="bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
              Enroll in Course
            </Link>
            <a href={CONTACT_INFO.discord} target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-full font-bold hover:bg-white/20 transition-all">
              Join Discord
            </a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
