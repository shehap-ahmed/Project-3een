import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Users, 
  Sparkles, 
  Mail,
  X,
  ChevronUp,
  Sliders
} from 'lucide-react';

const SECTIONS = [
  { id: 'hero-section', label: 'Journey', icon: Compass, desc: 'Intro & Origins' },
  { id: 'timeline-section', label: 'Chronology', icon: Calendar, desc: 'Interactive Timeline' },
  { id: 'insights-section', label: 'Insights', icon: BarChart3, desc: 'Community Poll Data' },
  { id: 'model-section', label: 'Blueprint', icon: BookOpen, desc: 'Ecosystem & Path' },
  { id: 'team-section', label: 'The Team', icon: Users, desc: 'Core Organizers & Teachers' },
  { id: 'mission-section', label: 'Our Creed', icon: Sparkles, desc: 'Mission & Focus' },
  { id: 'contact-section', label: 'Reach Out', icon: Mail, desc: 'Get in Touch' },
];

export default function AboutNav() {
  const [activeSection, setActiveSection] = useState('hero-section');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor element intersection to update active button indicator
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Helps isolate section center
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    // Monitor scroll for Top-scroll visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe cast for Icon components
  const renderIcon = (IconComponent: any, size = 16) => {
    return <IconComponent size={size} />;
  };

  return (
    <>
      {/* 1. DESKTOP FLOATING NAVIGATION PANEL (Right Screen Edge) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 select-none">
        <div className="relative flex flex-col items-end gap-3.5 bg-background/40 dark:bg-zinc-950/40 backdrop-blur-lg border border-border/40 dark:border-white/5 p-4 py-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          {/* Timeline progress line background */}
          <div className="absolute right-[29px] top-8 bottom-8 w-[2px] bg-border/20 dark:bg-white/5 -z-10" />
          
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="group relative flex items-center justify-end gap-3">
                {/* Expandable Label Overlay */}
                <span className="absolute right-12 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-black tracking-wider bg-background/90 dark:bg-zinc-900/95 border border-border/40 dark:border-white/10 text-primary dark:text-emerald-400 shadow-md">
                  {section.label}
                </span>

                {/* Bubble button */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer relative ${
                    isActive
                      ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20 dark:shadow-emerald-500/20'
                      : 'bg-background hover:bg-surface-dark/20 text-text-muted hover:text-text-main border border-border/40 dark:border-white/5'
                  }`}
                  aria-label={`Scroll to ${section.label}`}
                >
                  {renderIcon(section.icon, 13)}
                  
                  {/* Subtle active pulse halo */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-60 pointer-events-none" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Scroll To Top Pin */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md text-primary hover:text-white hover:bg-primary flex items-center justify-center transition-all cursor-pointer shadow-md"
              title="Return to top"
            >
              <ChevronUp size={13} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 2. MOBILE FLOATING ACTION BUTTON & BOTTOM COMPACT SHEET PANEL */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2">
        {/* Floating Scroll To Top for mobile */}
        <AnimatePresence>
          {showScrollTop && !isMobileMenuOpen && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-background/90 dark:bg-zinc-900 border border-border/65 dark:border-white/10 text-primary flex items-center justify-center shadow-lg cursor-pointer"
            >
              <ChevronUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Index Menu Trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
            isMobileMenuOpen 
              ? 'bg-red-500 text-white' 
              : 'bg-primary text-white shadow-primary/15 hover:scale-[1.05]'
          }`}
          aria-label="Toggle section index menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Sliders size={18} />}
        </button>

        {/* Full Interactive Menu Overlay Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backing screen lock blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 dark:bg-black/80 backdrop-blur-sm z-30"
              />

              {/* Centered Panel Drawer Container */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="fixed bottom-24 right-6 left-6 max-w-sm md:max-w-md mx-auto z-40 bg-background dark:bg-zinc-950 border border-border/80 dark:border-white/10 rounded-[2rem] p-6 shadow-2xl text-left"
              >
                <div className="flex items-center justify-between border-b border-border/40 dark:border-white/5 pb-3.5 mb-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary dark:text-emerald-400">Project 3een Index</span>
                    <h3 className="text-base font-black text-text-main">Navigation Map</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-full hover:bg-surface/50 text-text-muted"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                  {SECTIONS.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                          isActive
                            ? 'bg-primary/5 dark:bg-emerald-500/5 border-primary/20 text-primary dark:text-emerald-400'
                            : 'bg-surface-dark/10 hover:bg-surface/30 border-transparent text-text-muted'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                          isActive
                            ? 'bg-primary text-white border-primary/20'
                            : 'bg-background dark:bg-zinc-900 border-border/40 dark:border-white/5 text-text-muted'
                        }`}>
                          {renderIcon(section.icon, 15)}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs md:text-sm font-black tracking-tight">{section.label}</h4>
                          <p className="text-[10px] text-text-muted font-normal leading-none">{section.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
