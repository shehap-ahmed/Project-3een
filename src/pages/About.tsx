import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';
import AboutNav from '../components/AboutNav';
import { CONTACT_INFO } from '../constants';
import DiscordIcon from '../components/DiscordIcon';
import { 
  Globe, 
  MessageSquare, 
  BookOpen, 
  Sparkles, 
  Compass, 
  ArrowRight, 
  Heart, 
  GraduationCap,
  Mail,
  Instagram,
  Calendar,
  Users,
  BarChart3,
  Check,
  X,
  Layers,
  TrendingUp,
  User,
  MapPin,
  Home,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function About() {
  const location = useLocation();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Implement smooth scrolling to URL hashes
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);
  
  // Track scroll position across the timeline container to drive the vertical line growth
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  // Smooth the scroll progress tracking
  const scaleYProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Timeline Milestone events corresponding exactly to user specs
  const timelineEvents = [
    {
      year: "2021",
      title: "Where it all started",
      description: "We started in 2021 as a private Discord server for Indonesian friends learning Arabic together.",
      icon: MessageSquare,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-500",
      tag: "The beginning"
    },
    {
      year: "2022",
      title: "Opening our doors",
      description: "We opened our Discord to anyone looking for a friendly place to learn and ask questions.",
      icon: Globe,
      color: "from-blue-500/20 to-indigo-500/20 text-blue-500",
      tag: "Going global"
    },
    {
      year: "2023",
      title: "Time for real structure",
      description: "Instead of just sharing random vocabulary or worksheets, we realized learners needed actual structured lessons.",
      icon: BookOpen,
      color: "from-amber-500/20 to-orange-500/20 text-amber-500",
      tag: "Building paths"
    },
    {
      year: "2025",
      title: "Project 3een is born",
      description: "After years of growing as a community, we officially launched Project 3een to offer complete beginner courses.",
      icon: Sparkles,
      color: "from-accent/20 to-amber-400/20 text-accent",
      tag: "Launching"
    },
    {
      year: "Tomorrow",
      title: "Where we're going",
      description: "We're working on structured Arabic learning paths for multiple dialects and deeper conversational levels.",
      icon: Compass,
      color: "from-rose-500/20 to-purple-500/20 text-rose-500",
      tag: "Next steps"
    }
  ];

  // States for the interactive storytelling dashboard charts
  const [hoveredDialect, setHoveredDialect] = useState<string | null>(null);
  const [activeMilestone, setActiveMilestone] = useState<number>(2);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredCommit, setHoveredCommit] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'strategy' | 'pipeline' | 'standing'>('strategy');
  const [currTeamIdx, setCurrTeamIdx] = useState<number>(0);
  const [teamTab, setTeamTab] = useState<'all' | 'core' | 'content'>('all');

  const teamMembers = [
    {
      id: "schoolboy",
      name: "Schoolboy",
      avatar: "SB",
      role: "Founder / Est. 2021",
      officialTitle: "Founder of Learn Arabic Community",
      category: "Core Team",
      realName: "Redacted",
      age: "Redacted",
      bornIn: "Indonesia",
      livesIn: "Indonesia",
      discord: "schoolboy",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accentColor: "emerald",
      colorClass: "text-emerald-400",
      bgGradient: "from-emerald-500/5 to-teal-500/5",
      borderHover: "hover:border-emerald-500/30",
      avatarBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      impact: "Created our initial Discord server in 2021. Helps and manage the community and makes sure everything runs smoothly behind the scenes.",
      isCore: true
    },
    {
      id: "horus",
      name: "Horus",
      avatar: "H",
      role: "Platform Lead / Organizer",
      officialTitle: "Founder of Project 3een & Admin",
      category: "Core Team",
      realName: "Redacted",
      age: "21 years old",
      bornIn: "Minya, Egypt",
      livesIn: "Cairo, Egypt",
      discord: "horus123",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      accentColor: "blue",
      colorClass: "text-blue-400",
      bgGradient: "from-blue-500/5 to-indigo-500/5",
      borderHover: "hover:border-blue-500/30",
      avatarBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      impact: "Founder of project 3een. Horus founded project 3een in 2025 to help arabic learners from all over the world and make arabic more accessible.",
      isCore: true
    },
    {
      id: "jelly",
      name: "Jelly",
      avatar: "J",
      role: "Operations Admin",
      officialTitle: "Community Administrator",
      category: "Core Team",
      realName: "Jasmina",
      age: "23 years old",
      bornIn: "Tashkent, Uzbekistan",
      livesIn: "New York, USA",
      discord: "jellyfish.j",
      email: "jellyfishjt7@gmail.com",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      accentColor: "purple",
      colorClass: "text-purple-400",
      bgGradient: "from-purple-500/5 to-pink-500/5",
      borderHover: "hover:border-purple-500/30",
      avatarBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
      impact: "Keeps our server friendly and organized. Jelly helps onboard new students and coordinates our volunteer practice guides.",
      isCore: true
    },
    {
      id: "angelo",
      name: "Angelo",
      avatar: "A",
      role: "Lead MSA Educator",
      officialTitle: "Modern Standard Arabic Teacher",
      category: "Content & Teaching",
      realName: "Aiham",
      age: "Redacted",
      bornIn: "Iraq, Baghdad",
      livesIn: "Iraq, Baghdad",
      discord: "angelo_8808",
      email: "aiham.88.iq@gmail.com",
      badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      accentColor: "amber",
      colorClass: "text-amber-500",
      bgGradient: "from-amber-500/5 to-orange-500/5",
      borderHover: "hover:border-amber-500/30",
      avatarBg: "bg-amber-500/10 border-amber-500/20 text-amber-500",
      impact: "Our MSA teacher. Angelo designs the worksheets, plans our core grammar lessons, and teaches our MSA courses.",
      isCore: false
    },
    {
      id: "falcon",
      name: "Falcon",
      avatar: "F",
      role: "Content Developer / Moderator",
      officialTitle: "Community Mod & Video Editor",
      category: "Content & Teaching",
      realName: "Nasr",
      age: "22 years old",
      bornIn: "Alexandria, Egypt",
      livesIn: "Alexandria, Egypt",
      discord: "falcon76444",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      accentColor: "cyan",
      colorClass: "text-cyan-400",
      bgGradient: "from-cyan-500/5 to-teal-500/5",
      borderHover: "hover:border-cyan-500/30",
      avatarBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
      impact: "Our editor and moderator. Falcon edits our class videos and helps run our daily voice chats on Discord.",
      isCore: false
    }
  ];

  const handleTabChange = (tab: 'all' | 'core' | 'content') => {
    setTeamTab(tab);
    const firstMatch = teamMembers.findIndex(m => {
      if (tab === 'all') return true;
      if (tab === 'core') return m.isCore;
      return !m.isCore;
    });
    if (firstMatch !== -1) {
      setCurrTeamIdx(firstMatch);
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    if (teamTab === 'all') return true;
    if (teamTab === 'core') return member.isCore;
    return !member.isCore;
  });

  const activeFilteredIndex = filteredMembers.findIndex(m => m.id === teamMembers[currTeamIdx]?.id);

  const handlePrevFiltered = () => {
    if (filteredMembers.length === 0) return;
    const nextFilterIdx = activeFilteredIndex <= 0 ? filteredMembers.length - 1 : activeFilteredIndex - 1;
    const originalIdx = teamMembers.findIndex(m => m.id === filteredMembers[nextFilterIdx].id);
    if (originalIdx !== -1) setCurrTeamIdx(originalIdx);
  };

  const handleNextFiltered = () => {
    if (filteredMembers.length === 0) return;
    const nextFilterIdx = activeFilteredIndex >= filteredMembers.length - 1 ? 0 : activeFilteredIndex + 1;
    const originalIdx = teamMembers.findIndex(m => m.id === filteredMembers[nextFilterIdx].id);
    if (originalIdx !== -1) setCurrTeamIdx(originalIdx);
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="pb-16 md:pb-24 lg:pb-32 space-y-0 relative"
    >
      <AboutNav />
      {/* SECTION 1: HERO SECTION */}
      <section id="hero-section" className="relative min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center section-padding text-center overflow-hidden">
        {/* Ambient artistic lights */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse duration-5000" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse duration-7000" />

        <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight text-text-main leading-[1.1]"
          >
            How we <span className="font-serif italic text-primary dark:text-emerald-400 drop-shadow-sm select-none">got here</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed px-4 md:px-0"
          >
            We started off in 2021 as a tiny Indonesian Discord study group. Now, we’re a community of thousands from all over the world learning Arabic together.
          </motion.p>
        </div>

        {/* Subtle scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer transition-colors hover:text-primary"
          onClick={() => {
            document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted/60">See our story</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border border-border rounded-full flex justify-center p-1.5"
          >
            <div className="w-1.5 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: INTERACTIVE TIMELINE */}
      <section 
        id="timeline-section" 
        className="relative section-padding overflow-hidden py-20 md:py-32 bg-surface/35 border-t border-border/50" 
        ref={timelineRef}
      >
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-28 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-text-main">
            Our timeline
          </h2>
          <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-normal">
            How we grew from a private group of friends into a structured, open Arabic learning project.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Track Growth Line */}
          {/* Static Background track */}
          <div className="absolute left-[20px] lg:left-1/2 w-[3px] bg-border/30 dark:bg-border/20 h-[95%] -translate-x-1/2 rounded-full top-[10px]" />
          
          {/* Dynamic Scroll-linked accent grows on scroll */}
          <motion.div 
            style={{ scaleY: scaleYProgress, originY: 0 }}
            className="absolute left-[20px] lg:left-1/2 w-[3px] bg-gradient-to-b from-primary via-emerald-500 to-accent h-[95%] -translate-x-1/2 rounded-full top-[10px] shadow-[0_0_8px_rgba(0,104,55,0.3)]" 
          />

          <div className="space-y-12 lg:space-y-20">
            {timelineEvents.map((element, index) => {
              const Icon = element.icon;
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col lg:flex-row relative items-start lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Hub Pin (Icon circle) */}
                  <div className="absolute left-[20px] lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary shadow-lg"
                    >
                      <Icon size={18} className="md:size-20" />
                    </motion.div>
                  </div>

                  {/* Empty block on one side for tablet/desktop centering layout */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Visual Content Card block */}
                  <div className={`w-full lg:w-1/2 text-left ${isEven ? 'pl-12 lg:pl-0 lg:pr-12' : 'pl-12 lg:pr-0 lg:pl-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-125px" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="bento-card relative group overflow-hidden border-border/80 dark:border-border/50 hover:border-primary/20 dark:hover:border-primary/30 hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-500"
                    >
                      {/* Gradient aura ornament */}
                      <div className={`absolute -right-12 -bottom-12 w-28 h-28 rounded-full bg-gradient-to-br ${element.color} blur-2xl opacity-10 group-hover:opacity-20 transition-all duration-500`} />
                      
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-[10px] font-bold text-primary dark:text-emerald-400 bg-primary/5 px-2.5 py-1 rounded-full uppercase tracking-wider border border-primary/10">
                          {element.tag}
                        </span>
                        <span className="font-mono text-xs md:text-sm font-bold text-text-muted">
                          {element.year}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-text-main group-hover:text-primary transition-colors duration-300">
                        {element.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-text-muted leading-relaxed font-normal pt-1">
                        {element.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: COMMUNITY INSIGHTS */}
      <section id="insights-section" className="bg-surface/50 py-20 md:py-32 border-t border-border/30 relative overflow-hidden">
        {/* Ambient premium backlights */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="section-padding space-y-16 md:space-y-24 max-w-6xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase">
              What learners want
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
              We asked, our community answered
            </h2>
            <p className="text-sm md:text-base text-text-muted max-w-2xl mx-auto font-normal leading-relaxed">
              Before building our lessons, we ran a survey in our Discord to see what people actually struggle with when learning Arabic. Here is what we found.
            </p>
          </div>

          {/* Interactive Bento Dashboard - Chart + Story side-by-side grids */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Modern Survey Data Visualizers */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dialect preferences block */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background/50 border border-border/60 hover:border-primary/20 rounded-[2rem] p-6 md:p-8 transition-all duration-300 shadow-xl dark:shadow-primary/5 space-y-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-border/40 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                      <BarChart3 className="text-primary size-5" />
                      What dialect do you want to learn?
                    </h3>
                    <p className="text-xs text-text-muted">Which dialects are you interested in?</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold shrink-0">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary" /> Yes</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-400/40" /> No</span>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { key: "MSA", name: "Fusha / Modern Standard Arabic", yes: 47, no: 39, pct: 55, desc: "The foundation for reading, classical texts, and writing." },
                    { key: "EGY", name: "Egyptian Dialect", yes: 14, no: 19, pct: 42, desc: "Our team found a lot of interest in spoken Egyptian, which is widely understood." },
                    { key: "LEV", name: "Levantine Dialect", yes: 12, no: 20, pct: 38, desc: "Very popular for daily conversations in Jordan, Palestine, Lebanon, and Syria." },
                    { key: "DAR", name: "Moroccan Darija", yes: 12, no: 7, pct: 63, desc: "A highly unique and vibrant dialect spoken in Northwest Africa." },
                    { key: "GUL", name: "Gulf Dialect", yes: 2, no: 8, pct: 20, desc: "Common and practical for work and travel in the Gulf region." }
                  ].map((item) => {
                    const total = item.yes + item.no;
                    const yesPct = Math.round((item.yes / total) * 100);
                    const noPct = 100 - yesPct;
                    const isHovered = hoveredDialect === item.key;
                    
                    return (
                      <div 
                        key={item.key}
                        className="space-y-2 group/item cursor-pointer"
                        onMouseEnter={() => setHoveredDialect(item.key)}
                        onMouseLeave={() => setHoveredDialect(null)}
                      >
                        <div className="flex items-center justify-between font-bold text-xs select-none">
                          <span className={`transition-colors duration-300 ${isHovered ? "text-primary hover:text-emerald-500" : "text-text-main"}`}>
                            {item.name}
                          </span>
                          <span className="font-mono text-primary text-xs">{yesPct}% Selected</span>
                        </div>
                        
                        {/* Custom Double-filled comparative progress bar */}
                        <div className="h-4 w-full bg-slate-200/50 dark:bg-border/20 rounded-lg overflow-hidden flex relative">
                          <motion.div 
                            className="bg-gradient-to-r from-primary to-emerald-500 h-full text-[9px] font-mono text-white flex items-center pl-2 font-bold transition-all duration-300"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${yesPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                          >
                            {yesPct >= 20 ? `${yesPct}%` : ""}
                          </motion.div>
                          <motion.div 
                            className="bg-slate-350 dark:bg-border/60 h-full text-[9px] font-mono text-text-muted flex items-center pl-2 transition-all duration-300"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${noPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                          >
                            {noPct >= 20 ? `${noPct}%` : ""}
                          </motion.div>
                        </div>

                        {/* Interactive insight tooltip explanation */}
                        <p className={`text-[11px] text-text-muted mt-1 transition-all duration-300 overflow-hidden leading-relaxed pl-1 border-l-2 border-primary/20 ${isHovered ? "max-h-16 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Course Duration / Deep Path Preferences */}
              <motion.div 
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-background/50 border border-border/60 hover:border-primary/20 rounded-[2rem] p-6 md:p-8 transition-all duration-300 shadow-xl dark:shadow-primary/5 space-y-6"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                    <Calendar className="text-emerald-500 size-5" />
                    How much time can you spend?
                  </h3>
                  <p className="text-xs text-text-muted">We asked how long a course should be, and longer series won by a mile.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: 8 Weeks */}
                  <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl text-left space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">Longer series</span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded">8 Weeks</span>
                    </div>
                    <div>
                      <span className="text-4xl font-extrabold text-text-main font-mono">74%</span>
                      <span className="text-xs text-text-muted font-normal block mt-1">Voted by the majority</span>
                    </div>
                    <div className="text-[11px] text-text-muted font-normal leading-normal">
                      Most students want a deep, multi-week format that helps them build a real habit.
                    </div>
                  </div>

                  {/* Option 2: 4 Weeks */}
                  <div className="p-4 border border-border/40 bg-surface-dark/40 rounded-2xl text-left space-y-3 hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-text-muted uppercase tracking-widest font-mono font-bold">Shorter overview</span>
                      <span className="text-[10px] font-mono bg-border/40 text-text-muted px-2.5 py-1 rounded">4 Weeks</span>
                    </div>
                    <div>
                      <span className="text-4xl font-extrabold text-text-main/80 font-mono">26%</span>
                      <span className="text-xs text-text-muted font-normal block mt-1">For a quick start</span>
                    </div>
                    <div className="text-[11px] text-text-muted font-normal leading-normal">
                      Some learners want a faster overview before committing to longer lesson lists.
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: Modern Responsive Grid of 5 Insight Cards */}
            <div className="lg:col-span-5 space-y-4 md:space-y-6">
              
              <div className="space-y-1 text-left">
                <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider">What stood out</span>
                <h3 className="text-xl font-black text-text-main">Key thoughts</h3>
              </div>

              {/* CARD 1: Most Requested Learning Path */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group p-5 bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg rounded-2.5xl transition-all duration-300 text-left flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-primary/5 text-primary border border-primary/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <GraduationCap size={20} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">Fusha is the priority</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Modern Standard Arabic (MSA) was by far the most requested starting point from our community.
                  </p>
                </div>
              </motion.div>

              {/* CARD 2: Multiple Dialects Matter */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group p-5 bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg rounded-2.5xl transition-all duration-300 text-left flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-primary/5 text-primary border border-primary/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Globe size={20} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">Spoken dialect interest</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Students also wanted to learn spoken dialects like Egyptian, Levantine, Moroccan Darija, and Gulf Arabic.
                  </p>
                </div>
              </motion.div>

              {/* CARD 3: Structure Over Random Resources */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group p-5 bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg rounded-2.5xl transition-all duration-300 text-left flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-primary/5 text-primary border border-primary/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Compass size={20} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">Lessons need clear structure</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Everyone wanted structured lessons and path lists rather than just picking up scattered vocabulary notes.
                  </p>
                </div>
              </motion.div>

              {/* CARD 4: Long-Term Learning */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group p-5 bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg rounded-2.5xl transition-all duration-300 text-left flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-primary/5 text-primary border border-primary/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Calendar size={20} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">Ready for a real commitment</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    A huge majority preferred step-by-step courses spread over weeks rather than quick, light overviews.
                  </p>
                </div>
              </motion.div>

              {/* CARD 5: Community Demand */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group p-5 bg-background/50 border border-border/50 hover:border-primary/20 hover:shadow-lg rounded-2.5xl transition-all duration-300 text-left flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 bg-primary/5 text-primary border border-primary/10 rounded-xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <Users size={20} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors">Happy to help out</h4>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    Many students said they’d love to help support the project as helper group moderators, worksheets list checkers, or audio reviewers.
                  </p>
                </div>
              </motion.div>

            </div>

          </div>

          {/* BOTTOM SECTION Highlighted Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:pt-8"
          >
            <div className="p-8 md:p-12 bg-gradient-to-r from-primary/5 via-emerald-500/5 to-accent/5 hover:from-primary/10 hover:via-emerald-500/10 hover:to-accent/10 border border-primary/10 hover:border-primary/25 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 shadow-xl max-w-4xl mx-auto space-y-4 text-center">
              {/* Decorative design elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[40px] pointer-events-none animate-pulse" />
              
              <p className="text-base md:text-xl font-bold text-text-main leading-relaxed tracking-tight max-w-3xl mx-auto italic">
                "We took this feedback and built Project 3een around it: structured courses, support for spoken dialects, and an active Discord server so you never have to learn alone."
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <span className="w-12 h-[1px] bg-primary/30" />
                <span className="text-[10px] uppercase tracking-widest font-mono font-extrabold text-primary">Project 3een Vision</span>
                <span className="w-12 h-[1px] bg-primary/30" />
              </div>
            </div>

            {/* Visual transition bridge connecting survey insights to the roadmap model */}
            <div className="flex flex-col items-center justify-center mt-12 gap-2 text-center">
              <span className="text-[11px] font-mono font-bold tracking-[0.15em] text-emerald-500/80 uppercase animate-pulse">
                Our roadmap
              </span>
              <p className="text-xs text-text-muted max-w-md mx-auto px-4">
                See how we plan to build out our lessons and study resources:
              </p>
              <motion.a 
                href="#model-section"
                className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 mt-2 transition-all duration-300 shadow-lg cursor-pointer"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <span className="text-sm font-bold">↓</span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION: THE PROJECT 3EEN MODEL */}
      <section className="bg-background py-20 md:py-28 border-t border-border/30 relative overflow-hidden" id="model-section">
        {/* Ambient Glow Elements */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-primary/3 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-emerald-500/3 rounded-full blur-[110px] pointer-events-none" />

        <div className="section-padding space-y-12 max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
              Our educational model
            </h2>
            <p className="text-xs md:text-sm text-text-muted max-w-xl mx-auto font-normal leading-relaxed">
              This interactive guide shows how we connect structured lessons with live practice, peer feedback, and community chat.
            </p>
          </div>

          {/* Tab Selection Bar with premium styling */}
          <div className="flex justify-center p-1 bg-surface-dark/40 border border-border/40 rounded-full max-w-sm md:max-w-md mx-auto relative z-10 shadow-inner">
            {[
              { id: 'strategy', label: '1. Our Roadmap', icon: Compass },
              { id: 'pipeline', label: '2. Our Approach', icon: GraduationCap },
              { id: 'standing', label: '3. Comparison', icon: Users }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-[10px] md:text-xs font-black tracking-tight transition-all duration-305 cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-white shadow-md shadow-primary/10' 
                      : 'text-text-muted hover:text-text-main hover:bg-surface/30'
                  }`}
                >
                  <IconComponent size={12} className="shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Tab Contents */}
          <div className="relative z-10 min-h-[460px]">
            {activeTab === 'strategy' && (
              <motion.div
                key="strategy"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Phases Dashboard Controls */}
                <div className="bg-background/50 border border-border/50 rounded-[2rem] p-6 md:p-8 space-y-8 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
                    <div className="text-left space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">Evolution timeline</span>
                      <h3 className="text-xl font-black text-text-main">Our three phases</h3>
                    </div>
                    {/* Phase timeline tabs */}
                    <div className="flex items-center gap-2 bg-surface/30 p-1 rounded-xl border border-border/30 max-w-max">
                      {[1, 2, 3].map((val) => (
                        <button
                          key={val}
                          onClick={() => setActivePhase(val)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activePhase === val 
                              ? 'bg-primary/15 text-primary border border-primary/20' 
                              : 'text-text-muted hover:text-text-main'
                          }`}
                        >
                          Phase {val === 1 ? '1 (Now)' : val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Phase Output */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* LEFT info column */}
                    <div className="lg:col-span-5 text-left space-y-5">
                      <div className="space-y-2">
                        <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-mono font-bold uppercase">
                          {activePhase === 1 ? 'Non-profit' : activePhase === 2 ? 'Freemium + Professional' : 'Scale'}
                        </span>
                        <h4 className="text-2xl font-black text-text-main">
                          {activePhase === 1 ? 'Phase 1 — now' : activePhase === 2 ? 'Phase 2' : 'Phase 3'}
                        </h4>
                        <p className="text-xs md:text-sm text-text-muted font-normal leading-relaxed font-sans">
                          {activePhase === 1 
                            ? "free content + live courses with symbolic fees" 
                            : activePhase === 2 
                            ? "professional teachers" 
                            : "scale , all dialects for profit option"}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT mapping details card */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Dialects Card */}
                      <div className="p-4 rounded-2.5xl bg-surface/30 border border-border/30 hover:border-primary/20 transition-all text-left space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-primary">
                          <span>DIALECTS</span>
                          <Compass size={12} />
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 1
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between font-bold text-[10px]">
                              <span>MSA</span>
                              <span className="text-[8px] px-1 bg-emerald-500/15 rounded text-emerald-400 uppercase font-mono font-black">LIVE NOW</span>
                            </div>
                          </div>
                          
                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 2
                              ? 'bg-primary/10 text-primary border-primary/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px] font-semibold">
                              <span>Egyptian</span>
                              <span className="text-[8px] opacity-75">coming soon</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 2
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Levantine</span>
                              <span className="text-[8px] opacity-75 font-medium">after egyptian</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 3
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Others</span>
                              <span className="text-[8px] opacity-75 text-purple-400 font-mono">long term</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Levels Card */}
                      <div className="p-4 rounded-2.5xl bg-surface/30 border border-border/30 hover:border-primary/20 transition-all text-left space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-primary">
                          <span>LEVELS</span>
                          <GraduationCap size={12} />
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 1
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px] font-semibold">
                              <span>Beginners</span>
                              <span className="text-[8px] opacity-75 animate-pulse">focus now</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 2
                              ? 'bg-primary/10 text-primary border-primary/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Intermediate</span>
                              <span className="text-[8px] opacity-75">phase 2+</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 3
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Advanced</span>
                              <span className="text-[8px] opacity-75">phase 3, long term</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Teachers Card */}
                      <div className="p-4 rounded-2.5xl bg-surface/30 border border-border/30 hover:border-primary/20 transition-all text-left space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-primary">
                          <span>TEACHERS</span>
                          <Users size={12} />
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 1
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px] font-semibold">
                              <span>Community teachers</span>
                              <span className="text-[8px] opacity-75">phase 1</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 2
                              ? 'bg-primary/10 text-primary border-primary/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Professional teachers</span>
                              <span className="text-[8px] opacity-75">phase 2</span>
                            </div>
                          </div>

                          <div className={`p-2 rounded-xl transition-all border ${
                            activePhase === 3
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 font-bold'
                              : 'bg-background/20 text-text-muted border-transparent'
                          }`}>
                            <div className="flex justify-between text-[10px]">
                              <span>Mixed model</span>
                              <span className="text-[8px] opacity-75">phase 2+, long term</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Section: Content Streams */}
                  <div className="lg:col-span-6 bg-background/50 border border-border/50 rounded-[2rem] p-6 space-y-6 text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">01. Content Types</span>
                      <h3 className="text-lg font-black text-text-main">How we share lessons</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: 'live courses', badge: 'main revenue -- phase 1+', active: 'Phase 1+', price: 'paid (symboic price)', color: 'border-orange-500/20 bg-orange-500/5 text-orange-400' },
                        { title: 'recorded courses', badge: 'premium paywall later', active: 'Free on website now', price: 'free on website now', color: 'border-blue-500/20 bg-blue-500/5 text-blue-400' },
                        { title: 'articles and text', badge: 'community accessible', active: 'Free, always', price: 'free always', color: 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 border border-border/30 bg-surface/30 rounded-xl space-y-2">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-xs text-text-main uppercase tracking-tight">{item.title}</h4>
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                              {item.active}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-muted font-sans font-normal leading-relaxed">
                            {item.badge}. Access level: <span className="font-semibold text-text-main font-sans">{item.price}</span>.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Section: Revenue Streams */}
                  <div className="lg:col-span-6 bg-background/50 border border-border/50 rounded-[2rem] p-6 space-y-6 text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">02. Revenue Model</span>
                      <h3 className="text-lg font-black text-text-main">How we keep going</h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        { title: 'free tier', detail: 'drives community growth', purpose: 'recorded content +articles', color: 'border-lime-500/20 bg-lime-500/5 text-lime-400' },
                        { title: 'paid live courses', detail: 'primary income phase 1+', purpose: 'symboic price , covers costs', color: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' },
                        { title: 'premium subscription', detail: 'phase 2 onwards', purpose: 'recorded content paywall', color: 'border-purple-500/20 bg-purple-500/5 text-purple-400' }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 border border-border/30 bg-surface/30 rounded-xl space-y-2 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold text-xs text-text-main uppercase tracking-tight">{item.title}</h4>
                            <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${item.color}`}>
                              {item.purpose}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-muted font-sans font-normal leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {activeTab === 'standing' && (
              <motion.div
                key="standing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Comparative standing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Traditional Apps Card */}
                  <div className="p-6 border border-border/40 bg-[#0C1221]/45 rounded-2.5xl text-left flex flex-col justify-between min-h-[230px]">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">LIMITATION</span>
                      <h4 className="font-black text-base text-text-main">apps like duolingo</h4>
                      <p className="text-xs text-text-muted leading-relaxed font-sans font-normal leading-[1.6]">
                        structured , no community
                      </p>
                    </div>
                    <div className="text-[10px] text-red-400/80 font-mono font-bold border-t border-border/20 pt-2 flex items-center gap-1.5 mt-auto">
                      <X size={12} className="shrink-0" />
                      free and paid
                    </div>
                  </div>

                  {/* Project 3een Card */}
                  <div className="p-6 border-2 border-primary bg-primary/5 rounded-2.5xl text-left flex flex-col justify-between min-h-[230px] relative overflow-hidden shadow-xl shadow-primary/5">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-3 relative z-10">
                      <span className="text-[10px] font-mono font-bold text-primary uppercase">THE ECOSYSTEM</span>
                      <h4 className="font-black text-base text-primary">project 3een</h4>
                      <p className="text-xs text-text-main leading-relaxed font-sans font-normal leading-[1.6]">
                        structured + community
                      </p>
                    </div>
                    <div className="text-[10px] text-primary font-mono font-bold border-t border-primary/25 pt-2 flex items-center gap-1.5 mt-auto relative z-10">
                      <Check size={12} className="shrink-0 animate-bounce" />
                      free and paid
                    </div>
                  </div>

                  {/* Discord Communities Card */}
                  <div className="p-6 border border-border/40 bg-[#0C1221]/45 rounded-2.5xl text-left flex flex-col justify-between min-h-[230px]">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">LIMITATION</span>
                      <h4 className="font-black text-base text-text-main">discord servers</h4>
                      <p className="text-xs text-text-muted leading-relaxed font-sans font-normal leading-[1.6]">
                        community , no structure
                      </p>
                    </div>
                    <div className="text-[10px] text-red-400/85 font-mono font-bold border-t border-border/20 pt-2 flex items-center gap-1.5 mt-auto">
                      <X size={12} className="shrink-0 text-red-400/80" />
                      free
                    </div>
                  </div>

                </div>

                {/* Slogan Statement callout */}
                <div className="p-5 border border-primary/10 rounded-2xl bg-primary/5 text-center max-w-2xl mx-auto">
                  <p className="text-xs md:text-sm text-text-muted font-medium leading-relaxed italic font-sans">
                    "Our goal right now: build the best beginner resources in the world. Once that is done, we'll keep expanding."
                  </p>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* SECTION: OUR TEAM */}
      <section className="bg-surface/30 py-16 md:py-24 border-t border-border/30 relative overflow-hidden" id="team-section">
        {/* Ambient premium lights */}
        <div className="absolute top-1/4 left-1/4 w-[320px] h-[320px] bg-primary/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] bg-emerald-500/3 rounded-full blur-[110px] pointer-events-none" />

        <div className="section-padding space-y-12 max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
              Meet the Team
            </h2>
            <p className="text-xs md:text-sm text-text-muted max-w-xl mx-auto font-normal leading-relaxed">
              The people behind Learn Arabic and Project 3een
            </p>
          </div>

          {/* CATEGORY SELECTOR CHIPS - INSPIRED BY ROADMAP (MODEL SECTION) */}
          <div className="flex justify-center p-1 bg-surface-dark/40 border border-border/40 rounded-full max-w-sm md:max-w-md mx-auto relative z-10 shadow-inner">
            {[
              { id: 'all', label: 'All Team', icon: Users },
              { id: 'core', label: 'Core Team', icon: Check },
              { id: 'content', label: 'Teachers & Editors', icon: GraduationCap }
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isSelected = teamTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[10px] md:text-xs font-black tracking-tight transition-all duration-305 cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10' 
                      : 'text-text-muted hover:text-text-main hover:bg-surface/30'
                  }`}
                >
                  <IconComponent size={12} className="shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* MINI MEMBERS SELECTOR BAR GRID */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto relative z-10 p-1 bg-[#101625]/25 border border-border/20 rounded-2xl">
            {filteredMembers.map((member) => {
              const isActive = member.id === teamMembers[currTeamIdx]?.id;
              
              const dotColors = {
                emerald: 'bg-emerald-400',
                blue: 'bg-blue-400',
                purple: 'bg-purple-400',
                amber: 'bg-amber-400',
                cyan: 'bg-cyan-400'
              };
              const activeTexts = {
                emerald: 'text-emerald-400',
                blue: 'text-blue-400',
                purple: 'text-purple-400',
                amber: 'text-amber-500',
                cyan: 'text-cyan-400'
              };

              const activeText = activeTexts[member.accentColor as keyof typeof activeTexts] || 'text-emerald-400';
              const dotColor = dotColors[member.accentColor as keyof typeof dotColors] || 'bg-emerald-400';

              return (
                <button
                  key={member.id}
                  onClick={() => {
                    const originalIdx = teamMembers.findIndex(m => m.id === member.id);
                    if (originalIdx !== -1) setCurrTeamIdx(originalIdx);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[10px] md:text-xs font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                    isActive 
                      ? `bg-[#0C1221] ${activeText} border-primary/40 shadow-sm` 
                      : 'bg-[#000000]/0 text-text-muted border-transparent hover:text-text-main hover:bg-surface/30'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? `${dotColor} animate-pulse scale-110` : 'bg-text-muted/30'}`} />
                  {member.name}
                </button>
              );
            })}
          </div>

          {/* SLIDER CAROUSEL WITH SIDE NAVIGATION ARROWS */}
          <div className="flex items-center justify-between gap-4 md:gap-8 max-w-4xl mx-auto relative z-10">
            
            {/* LEFT ARROW BUTTON */}
            <button 
              onClick={handlePrevFiltered}
              className="w-10 h-10 md:w-12 md:h-12 bg-[#0C1221]/80 hover:bg-[#0C1221] border border-border/50 rounded-full flex items-center justify-center text-text-muted hover:text-text-main transition-all cursor-pointer shadow-lg hover:border-emerald-500/30 shrink-0 select-none"
              title="Previous Team Member"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* SLIDE CARD VISUAL */}
            <div className="flex-1 w-full min-h-[380px] md:min-h-[290px]">
              <AnimatePresence mode="wait">
                {(() => {
                  const currentMember = teamMembers[currTeamIdx] || teamMembers[0];
                  
                  const themeConfig = {
                    emerald: {
                      accentText: 'text-emerald-400',
                      avatarGlow: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-emerald-500/10',
                      glowingRing: 'ring-emerald-500/20 group-hover:ring-emerald-500/40',
                      iconColor: 'text-emerald-400',
                      badgeClass: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10',
                      bannerLeft: 'border-emerald-500',
                      buttonColor: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                    },
                    blue: {
                      accentText: 'text-blue-400',
                      avatarGlow: 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-blue-500/10',
                      glowingRing: 'ring-blue-500/20 group-hover:ring-blue-500/40',
                      iconColor: 'text-blue-400',
                      badgeClass: 'bg-blue-500/5 text-blue-400 border-blue-500/10',
                      bannerLeft: 'border-blue-500',
                      buttonColor: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20'
                    },
                    purple: {
                      accentText: 'text-purple-400',
                      avatarGlow: 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-purple-500/10',
                      glowingRing: 'ring-purple-500/20 group-hover:ring-purple-500/40',
                      iconColor: 'text-purple-400',
                      badgeClass: 'bg-purple-500/5 text-purple-400 border-purple-500/10',
                      bannerLeft: 'border-purple-500',
                      buttonColor: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/20'
                    },
                    amber: {
                      accentText: 'text-amber-500',
                      avatarGlow: 'bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-amber-500/10',
                      glowingRing: 'ring-amber-500/20 group-hover:ring-amber-500/40',
                      iconColor: 'text-amber-500',
                      badgeClass: 'bg-amber-500/5 text-amber-500 border-amber-500/10',
                      bannerLeft: 'border-amber-500',
                      buttonColor: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border-amber-500/20'
                    },
                    cyan: {
                      accentText: 'text-cyan-400',
                      avatarGlow: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 shadow-cyan-500/10',
                      glowingRing: 'ring-cyan-500/20 group-hover:ring-cyan-500/40',
                      iconColor: 'text-cyan-400',
                      badgeClass: 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10',
                      bannerLeft: 'border-cyan-500',
                      buttonColor: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/20'
                    }
                  };

                  const currentCfg = themeConfig[currentMember.accentColor as keyof typeof themeConfig] || themeConfig.emerald;

                  return (
                    <motion.div
                      key={currentMember.id}
                      initial={{ opacity: 0, scale: 0.98, x: 8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: -8 }}
                      transition={{ duration: 0.22 }}
                      className="bento-card group relative p-6 md:p-8 bg-[#0C1221]/60 border border-border/40 hover:border-emerald-500/20 rounded-[2rem] text-left shadow-2xl flex flex-col justify-between"
                    >
                      {/* Interactive glow highlight reflecting active theme */}
                      <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/2 rounded-full blur-[80px] pointer-events-none" />

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          
                          {/* Left core identifier details */}
                          <div className="col-span-1 md:col-span-5 space-y-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black font-sans shrink-0 border shadow-md relative group-hover:scale-105 transition-all duration-300 ring-4 ${currentCfg.avatarGlow} ${currentCfg.glowingRing}`}>
                                {currentMember.avatar}
                              </div>
                              <div>
                                <span className={`text-[9px] font-mono font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-md ${currentCfg.badgeClass}`}>
                                  {currentMember.role}
                                </span>
                                <h3 className="font-extrabold text-lg md:text-xl text-text-main leading-tight mt-1 group-hover:text-primary transition-colors duration-300">
                                  {currentMember.name}
                                </h3>
                              </div>
                            </div>

                            {/* Attributes List */}
                            <div className="space-y-2 bg-[#0C1221]/35 rounded-xl p-3 border border-border/10 text-xs text-text-muted">
                              <div className="flex items-center gap-2.5">
                                <User size={13} className={`${currentCfg.iconColor} shrink-0`} />
                                <span>Real Name: <span className="text-text-main font-medium">{currentMember.realName}</span></span>
                              </div>
                              {currentMember.age !== "Redacted" && (
                                <div className="flex items-center gap-2.5">
                                  <Calendar size={13} className={`${currentCfg.iconColor} shrink-0`} />
                                  <span>Age: <span className="text-text-main font-medium">{currentMember.age}</span></span>
                                </div>
                              )}
                              <div className="flex items-center gap-2.5">
                                <Home size={13} className={`${currentCfg.iconColor} shrink-0`} />
                                <span>Born in: <span className="text-text-main font-medium">{currentMember.bornIn}</span></span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <MapPin size={13} className={`${currentCfg.iconColor} shrink-0`} />
                                <span>Lives in: <span className="text-text-main font-medium">{currentMember.livesIn}</span></span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <MessageSquare size={13} className={`${currentCfg.iconColor} shrink-0`} />
                                <span className="font-mono text-text-main">{currentMember.discord}</span>
                              </div>
                            </div>
                          </div>

                          {/* Right descriptive impact details */}
                          <div className="col-span-1 md:col-span-7 flex flex-col justify-between h-full space-y-4 md:space-y-0 md:min-h-[220px] md:border-l border-border/10 md:pl-6">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                                <span className="text-text-muted">DIRECT IMPACT CONTRIBUTION</span>
                                <span className={`${currentCfg.accentText}`}>{currentMember.category}</span>
                              </div>
                              <h4 className="font-extrabold text-sm text-text-main">
                                {currentMember.officialTitle}
                              </h4>
                              <p className={`p-4 border-l-4 rounded-r-2xl bg-surface/30 text-xs md:text-sm text-text-main leading-relaxed font-normal ${currentCfg.bannerLeft}`}>
                                "{currentMember.impact}"
                              </p>
                            </div>




                            <div className="pt-4 border-t border-border/10 flex justify-between items-center gap-4">
                              <span className="text-[10px] font-mono text-text-muted">
                                Active Member
                              </span>
                              
                              {currentMember.id === "schoolboy" && (
                                <a
                                  href={CONTACT_INFO.discord}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${currentCfg.buttonColor}`}
                                >
                                  Join Discord
                                  <ArrowRight size={13} />
                                </a>
                              )}
                              {currentMember.id === "horus" && (
                                <a
                                  href="/courses"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${currentCfg.buttonColor}`}
                                >
                                  Platform Courses
                                  <ArrowRight size={13} />
                                </a>
                              )}
                              {currentMember.id === "jelly" && (
                                <a
                                  href="mailto:jellyfishjt7@gmail.com"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${currentCfg.buttonColor}`}
                                >
                                  Email Support
                                  <ArrowRight size={13} />
                                </a>
                              )}
                              {currentMember.id === "angelo" && (
                                <a
                                  href="/courses"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${currentCfg.buttonColor}`}
                                >
                                  Start Course
                                  <ArrowRight size={13} />
                                </a>
                              )}
                              {currentMember.id === "falcon" && (
                                <a
                                  href="https://discord.gg/learnarabic"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${currentCfg.buttonColor}`}
                                >
                                  Join Talking Room
                                  <ArrowRight size={13} />
                                </a>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            {/* RIGHT ARROW BUTTON */}
            <button 
              onClick={handleNextFiltered}
              className="w-10 h-10 md:w-12 md:h-12 bg-[#0C1221]/80 hover:bg-[#0C1221] border border-border/50 rounded-full flex items-center justify-center text-text-muted hover:text-text-main transition-all cursor-pointer shadow-lg hover:border-emerald-500/30 shrink-0 select-none"
              title="Next Team Member"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Unified Statement that bridges the founders and content creators together */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <div className="p-5 border border-primary/10 rounded-2xl bg-primary/5 max-w-2xl mx-auto text-center">
              <p className="text-xs text-text-muted font-medium leading-relaxed">
                By maintaining a direct line between community administrators (Schoolboy, Horus, Jelly) and content creators (Angelo, Falcon), we combine peer practice circles with rich, structural learning material completely for free.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 4: MISSION STATEMENT */}
      <section id="mission-section" className="relative py-24 md:py-36 overflow-hidden bg-surface/20 border-t border-border/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary)/0.03,_transparent)] pointer-events-none" />
        
        <div className="section-padding text-center relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Centered statement matching exact text requested */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl font-black text-text-main leading-snug md:leading-normal tracking-tight px-4"
          >
            "Making Arabic learning <span className="text-primary italic font-serif">structured</span>, accessible, and <span className="bg-gradient-to-r from-emerald-500 to-accent bg-clip-text text-transparent">community-driven</span>."
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 72 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[2px] bg-primary/20 mx-auto"
          />
        </div>
      </section>



      {/* SECTION 6: GET IN TOUCH */}
      <section id="contact-section" className="section-padding py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0B1224] border border-white/5 rounded-[2.5rem] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden shadow-2xl space-y-12"
        >
          {/* Aesthetic backing blur shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-24 -mt-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />

          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight select-none">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
              Have questions? We'd love to hear from you. Reach out through any of our channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-6xl mx-auto relative z-10">
            {/* EMAIL US */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="bg-[#131F35]/30 hover:bg-[#131F35]/50 border border-white/[0.05] hover:border-white/[0.15] rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer min-h-[180px]"
            >
              <div className="text-white group-hover:text-primary transition-all duration-300 transform group-hover:scale-110 mb-5">
                <Mail size={32} className="stroke-[1.5]" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest text-white uppercase select-none">
                EMAIL US
              </span>
              <span className="text-xs md:text-sm text-gray-400 mt-2 break-all max-w-[200px] md:max-w-full">
                {CONTACT_INFO.email}
              </span>
            </a>

            {/* DISCORD */}
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#131F35]/30 hover:bg-[#131F35]/50 border border-white/[0.05] hover:border-white/[0.15] rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer min-h-[180px]"
            >
              <div className="text-white group-hover:text-primary transition-all duration-300 transform group-hover:scale-110 mb-5">
                <DiscordIcon size={32} className="stroke-[1.5]" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest text-white uppercase select-none">
                DISCORD
              </span>
              <span className="text-xs md:text-sm text-gray-400 mt-2">
                Join our community
              </span>
            </a>

            {/* INSTAGRAM */}
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#131F35]/30 hover:bg-[#131F35]/50 border border-white/[0.05] hover:border-white/[0.15] rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group cursor-pointer min-h-[180px]"
            >
              <div className="text-white group-hover:text-primary transition-all duration-300 transform group-hover:scale-110 mb-5">
                <Instagram size={32} className="stroke-[1.5]" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest text-white uppercase select-none">
                INSTAGRAM
              </span>
              <span className="text-xs md:text-sm text-gray-400 mt-2">
                @learnarabic.dc
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
