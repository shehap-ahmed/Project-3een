import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  ArrowRight, 
  HelpCircle, 
  Compass, 
  BarChart3, 
  Layers, 
  Users, 
  Heart, 
  Sparkles,
  BookOpen,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import HomeNav from '../components/HomeNav';

const fadeInUp = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15
    }
  },
  viewport: { once: true, margin: '-10% 0px' }
};

export default function Home() {
  const navigate = useNavigate();
  const [widgetData, setWidgetData] = useState<any>(null);

  useEffect(() => {
    let active = true;
    fetch('https://discord.com/api/guilds/823889299325714462/widget.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load Discord widget');
        return res.json();
      })
      .then((data) => {
        if (active) {
          setWidgetData(data);
        }
      })
      .catch((err) => {
        console.error('Failed to resolve Discord guild status dynamically:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const checkOAuthRedirect = async () => {
      if (window.location.hash.includes('access_token=') || window.location.hash.includes('id_token=')) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && active) {
          navigate('/courses', { replace: true });
        } else if (active) {
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
            if (currentSession && active) {
              subscription.unsubscribe();
              navigate('/courses', { replace: true });
            }
          });
          return () => {
            active = false;
            subscription.unsubscribe();
          };
        }
      }
    };
    checkOAuthRedirect();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="relative overflow-hidden bg-background text-text-main pb-24 md:pb-36 space-y-24 md:space-y-36 lg:space-y-48">
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-x-0 top-0 h-[1000px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-primary/10 via-accent/5 to-transparent rounded-full blur-[130px] opacity-70" />
        <div className="absolute top-[400px] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] opacity-40" />
        <div className="absolute top-[800px] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] opacity-30" />
      </div>

      {/* 1. HERO GATEWAY INTRO */}
      <section id="hero-section" className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col items-center justify-center section-padding text-center">
        <div className="space-y-8 max-w-5xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4.5 py-2 bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400"
          >
            <Sparkles size={14} className="animate-pulse" />
            Learn Arabic with a community
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-[1.05]"
          >
            Start learning Arabic <br />
            <span className="font-serif italic text-primary dark:text-emerald-500 font-normal font-serif text-3xl md:text-5xl lg:text-7xl">step by step.</span>
          </motion.h1>

          {/* Subheading Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="text-base md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Learn Arabic with clear lessons, live classes, and a community that actually helps. No boring textbooks, no complicated marketing hype.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4.5 justify-center pt-4"
          >
            <Link to="/courses" className="btn-premium px-10 py-5 group shadow-[0_12px_30px_rgba(0,104,55,0.25)]">
              View our courses
              <ArrowRight size={18} className="ml-2.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a 
              href={CONTACT_INFO.discord} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-premium-outline px-10 py-5 group flex items-center justify-center cursor-pointer"
            >
              Join our Discord
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY PROJECT 3EEN EXISTS (Problem vs Solution) */}
      <section id="challenge-section" className="section-padding py-12 md:py-20 bg-surface/20 border-y border-border/40 relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent">The Arabic Challenge</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
              Learning on your own is hard.
            </h2>
            <p className="text-sm md:text-base text-text-muted">
              Most apps just show you gamified flashcards. We focus on real lessons, live practice, and getting actual feedback.
            </p>
          </motion.div>

          {/* Grid comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* PROBLEM BLOCK */}
            <motion.div 
              {...fadeInUp}
              className="bg-surface/50 dark:bg-zinc-950/40 border border-red-500/10 dark:border-red-500/5 rounded-3xl p-8 md:p-10 space-y-8 hover:shadow-[0_10px_40px_rgba(239,68,68,0.02)] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                  <TrendingDown size={18} />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">Why traditional apps fail</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2 border-l-2 border-red-500/15 pl-4">
                  <h4 className="text-sm font-bold text-text-main opacity-90">Boring textbooks</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Archaic grammar exercises don't prepare you for real-world conversations or hearing natural flow.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-red-500/15 pl-4">
                  <h4 className="text-sm font-bold text-text-main opacity-90">Lonely app games</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Tapping buttons on an app is fun, but it won't help you construct real sentences or form spoken habits.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-red-500/15 pl-4">
                  <h4 className="text-sm font-bold text-text-main opacity-90">No one to correct you</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Without actual feedback from real teachers, it’s hard to know if you're pronouncing or writing things right.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SOLUTION BLOCK */}
            <motion.div 
              {...fadeInUp}
              className="bg-surface/80 dark:bg-zinc-900/60 border border-primary/20 dark:border-white/5 rounded-3xl p-8 md:p-10 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="text-xl font-extrabold tracking-tight">How we do things</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2 border-l-2 border-primary/45 pl-4">
                  <h4 className="text-sm font-bold text-primary dark:text-emerald-400">Step-by-step lessons</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Every lesson builds on the last one, from learning raw letters to building complete sentences correctly.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-primary/45 pl-4">
                  <h4 className="text-sm font-bold text-primary dark:text-emerald-400">A Discord community of 21,000+</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    You don't have to learn alone. Chat with study partners, ask questions, and practice with native speakers.
                  </p>
                </div>
                <div className="space-y-2 border-l-2 border-primary/45 pl-4">
                  <h4 className="text-sm font-bold text-primary dark:text-emerald-400">Real homework feedback</h4>
                  <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                    Send in your homework worksheets or voice notes, and our team will check them to help you improve.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. TEASER SECTION 1: OUR STORY */}
      <section id="story-section" className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div {...fadeInUp} className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/5 border border-accent/10 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent">
              <Compass size={13} />
              Our story
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
              From a private study group <br />
              <span className="font-serif italic text-primary dark:text-emerald-500 font-normal">to a global project</span>
            </h2>
            <p className="text-sm md:text-base text-text-muted leading-relaxed max-w-xl">
              Project 3een started in 2021 as a private study group. We just wanted a better, more structured way to learn Arabic together. Since then, we've grown into an international community of thousands of people learning and teaching together.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-surface border border-border/80 p-4 rounded-2xl min-w-[120px]">
                <span className="block text-xl md:text-2xl font-black text-primary dark:text-emerald-400">2021</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Started</span>
              </div>
              <div className="bg-surface border border-border/80 p-4 rounded-2xl min-w-[120px]">
                <span className="block text-xl md:text-2xl font-black text-primary dark:text-emerald-400">21,000+</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Members</span>
              </div>
              <div className="bg-surface border border-border/80 p-4 rounded-2xl min-w-[120px]">
                <span className="block text-xl md:text-2xl font-black text-primary dark:text-emerald-400">100%</span>
                <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Community Run</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about#timeline-section" className="btn-premium group shadow-lg">
                Read our story
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="lg:col-span-5 relative group hidden lg:block"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-primary/8 transition-all" />
            <div className="relative bg-surface border border-border/60 p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <div className="w-12 h-12 bg-accent/15 text-accent rounded-2xl flex items-center justify-center font-bold">
                “
              </div>
              <p className="text-sm italic leading-relaxed text-text-muted">
                "We didn't set out to build an industry product. We set out to build a home where students aren't learning in isolation, but growing together in a genuine, high-standard digital family."
              </p>
              <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-text-main">Horus</span>
                  <span className="block text-[10px] text-text-muted font-mono">The Founder</span>
                </div>
                <span className="text-[10px] px-3 py-1 bg-surface-dark/10 rounded-full font-bold uppercase tracking-widest text-text-muted">Project 3een</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TEASER SECTION 2: COMMUNITY INSIGHTS & DISCORD WIDGET */}
      <section id="insights-section" className="section-padding bg-surface/35 border-y border-border/40 relative overflow-hidden">
        {/* Ambient premium lights */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="space-y-16 max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
                <Users size={13} />
                Community stats
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
                A human way to learn
              </h2>
              <p className="text-sm md:text-base text-text-muted leading-relaxed">
                Learning a language is all about practice and talking to real people. Behind our lessons is a friendly community helper network checking homework and chatting in voice channels every day.
              </p>

              {/* General Status Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                <div className="bg-background dark:bg-zinc-950/40 border border-border/50 p-5 rounded-2xl space-y-1 hover:border-primary/20 transition-colors">
                  <span className="text-2xl md:text-3xl font-black text-primary dark:text-emerald-400 tracking-tight block">
                    +21,000
                  </span>
                  <span className="text-[10px] font-extrabold text-text-main uppercase tracking-widest block leading-snug">
                    Discord members
                  </span>
                  <p className="text-[11px] text-text-muted leading-tight pt-1">
                    Students from all over the world learning together.
                  </p>
                </div>

                <div className="bg-background dark:bg-zinc-950/40 border border-border/50 p-5 rounded-2xl space-y-1 hover:border-primary/20 transition-colors">
                  <span className="text-2xl md:text-3xl font-black text-primary dark:text-emerald-400 tracking-tight block">
                    1
                  </span>
                  <span className="text-[10px] font-extrabold text-text-main uppercase tracking-widest block leading-snug">
                    Beginner course
                  </span>
                  <p className="text-[11px] text-text-muted leading-tight pt-1">
                    A friendly, step-by-step introduction to Arabic letters & grammar.
                  </p>
                </div>

                <div className="bg-background dark:bg-zinc-950/40 border border-border/50 p-5 rounded-2xl space-y-1 hover:border-primary/20 transition-colors">
                  <span className="text-2xl md:text-3xl font-black text-[#f9b233] tracking-tight block">
                    24/7
                  </span>
                  <span className="text-[10px] font-extrabold text-text-main uppercase tracking-widest block leading-snug">
                    Everyday practice
                  </span>
                  <p className="text-[11px] text-text-muted leading-tight pt-1">
                    Chat rooms, volunteer voice sessions, and help with homework rules.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={CONTACT_INFO.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/95 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 text-xs font-black uppercase tracking-wider rounded-full shadow-[0_4px_20px_rgba(0,104,55,0.2)] transition-all group cursor-pointer"
                >
                  Join our Discord
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            {/* Real Live Discord IFrame Widget */}
            <motion.div 
              {...fadeInUp}
              className="relative w-full max-w-sm md:max-w-md mx-auto"
            >
              {/* Premium backing ambient glow matching the active Discord brand colors */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#5865F2]/20 to-primary/10 rounded-[2.2rem] blur-2xl pointer-events-none opacity-80 animate-pulse duration-[8000ms]" />
              <div className="relative bg-[#2f3136] dark:bg-[#1a1b1e] p-1.5 border border-border/50 dark:border-white/5 rounded-[2.1rem] shadow-2xl overflow-hidden">
                <iframe 
                  id="discord-widget"
                  src="https://discord.com/widget?id=823889299325714462&theme=dark" 
                  className="w-full h-[480px] rounded-[1.8rem] block border-0" 
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  title="Project 3een Discord Community Live Status"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TEASER SECTION 4: MEET THE TEAM */}
      <section id="team-teaser-section" className="section-padding bg-surface/20 border-y border-border/40 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="space-y-16 max-w-6xl mx-auto position-relative">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.div {...fadeInUp} className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-accent">
                <Compass size={13} />
                Core team
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text-main">
                Who is building this?
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl">
                We are a group of volunteers, native speakers, and developers from around the world working together to make Arabic easier to learn.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="lg:col-span-4 lg:text-right">
              <Link to="/about#team-section" className="btn-premium group shadow-md">
                Meet the team
                <ArrowRight size={18} className="ml-2.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Teaser Team Cards Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { name: 'schoolboy', role: 'Founder of the community', flags: '🇮🇩' },
              { name: 'Horus', role: 'Founder of Project 3een', flags: '🇪🇬' },
              { name: 'Jelly', role: 'Administrator', flags: '🇺🇿' }
            ].map((member, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="bg-surface border border-border/60 rounded-3xl p-6 text-center space-y-4 hover:border-primary/20 hover:scale-[1.02] transition-all"
              >
                {/* Avatar Initial */}
                <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-primary/20 border border-border text-primary dark:text-emerald-400 font-serif italic text-2xl font-black flex items-center justify-center mx-auto shadow-sm relative">
                  {member.name.charAt(0).toUpperCase()}
                  <span className="absolute bottom-1 right-1 text-xs">{member.flags}</span>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-text-main tracking-tight leading-none">{member.name}</h4>
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block pt-1.5">{member.role}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. TEASER SECTION 5: BECOME A CONTRIBUTOR */}
      <section id="contributor-teaser-section" className="section-padding">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 lg:p-20 text-center space-y-8 md:space-y-10 relative overflow-hidden"
        >
          {/* Subtle light leak decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              <Heart size={13} fill="currentColor" />
              Want to help us?
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
              Help us build Project 3een
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Project 3een is run mostly by volunteers. If you're a native speaker, developer, teacher, or designer who wants to help make language learning accessible, we'd love to have you.
            </p>
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 max-w-4xl mx-auto text-left relative z-10">
            {[
              { title: "Native speakers", desc: "Help lead voice practice sessions and review student voice notes." },
              { title: "Developers", desc: "Help improve our website, learning portal, and student tools." },
              { title: "Content creators & teachers", desc: "Help design worksheets, write guides, or teach lessons." }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-1.5 backdrop-blur-md">
                <h4 className="text-white font-extrabold text-sm">{pillar.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="relative z-10 pt-4">
            <Link 
              to="/about#contact-section" 
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/25 hover:bg-gray-100 group"
            >
              Get involved
              <ArrowRight size={18} className="ml-2.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Dynamic Nav Map */}
      <HomeNav />
    </div>
  );
}
