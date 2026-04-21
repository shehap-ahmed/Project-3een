import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { Mail, MessageSquare, Instagram, Target, Heart, Globe, User, MapPin, Hash, Home, Cake, Sparkles, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export default function About() {
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
      {/* About Hero */}
      <section className="section-padding text-center space-y-6 md:space-y-8 pt-12 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase"
        >
          Our Story
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-main max-w-4xl mx-auto leading-[1.2] md:leading-[1.1]"
        >
          Making Arabic Education <br className="hidden lg:block" />
          <span className="font-serif italic text-primary">Accessible to All.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed px-4 md:px-0"
        >
          Founded in 2025, Project 3een is a community-driven initiative dedicated to helping students worldwide master the Arabic language through structure and support.
        </motion.p>
      </section>

      {/* Mission Section - 2 Columns on Tablet */}
      <section className="bg-surface py-16 md:py-20 lg:py-32 transition-colors duration-300">
        <div className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide a structured, clear, and affordable path for absolute beginners to learn Arabic.' },
            { icon: Heart, title: 'Our Values', desc: 'We believe in community-driven learning, where every student feels supported and encouraged.' },
            { icon: Globe, title: 'Our Vision', desc: 'To become the leading platform for affordable Arabic education, bridging cultures through language.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className={`bento-card space-y-4 md:space-y-6 text-center group hover:-translate-y-2 transition-transform duration-500 ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/5 dark:bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary mx-auto transition-colors group-hover:bg-primary group-hover:text-white">
                <item.icon size={24} lg:size={32} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-text-main tracking-tight">{item.title}</h3>
              <p className="text-text-muted text-xs md:text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="section-padding space-y-16 md:space-y-24">
        <div className="text-center space-y-4">
          <motion.div
            {...fadeInUp}
            className="inline-block px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase"
          >
            The Team
          </motion.div>
          <motion.h2
            {...fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-text-main"
          >
            Meet the Team
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-text-muted max-w-2xl mx-auto"
          >
            The people behind Learn Arabic and Project 3een
          </motion.p>
        </div>

        {[
          {
            title: 'Core Team',
            members: [
              {
                name: 'Schoolboy',
                role: 'Founder of Learn Arabic Community',
                initials: 'SB',
                details: [
                  { icon: User, text: 'Real Name: Redacted' },
                  { icon: Cake, text: 'Age: Redacted' },
                  { icon: Home, text: 'Born in: Indonesia' },
                  { icon: MapPin, text: 'Lives in: Indonesia' },
                  { icon: Hash, text: 'schoolboy' }
                ]
              },
              {
                name: 'Horus',
                role: 'founder of project 3een & Admin',
                initials: 'H',
                details: [
                  { icon: User, text: 'Real Name: Redacted' },
                  { icon: Cake, text: '21 years old' },
                  { icon: Home, text: 'Born in: Minya, Egypt' },
                  { icon: MapPin, text: 'Lives in: Cairo, Egypt' },
                  { icon: Hash, text: 'horus123' }
                ]
              },
              {
                name: 'Jelly',
                role: 'Admin',
                initials: 'J',
                details: [
                  { icon: Sparkles, text: 'Real Name: Jasmina' },
                  { icon: Cake, text: '23 years old' },
                  { icon: Home, text: 'Born in: Tashkent, Uzbekistan' },
                  { icon: MapPin, text: 'Lives in: New York, USA' },
                  { icon: Hash, text: 'jellyfish.j' },
                  { icon: Mail, text: 'jellyfishjt7@gmail.com' }
                ]
              }
            ]
          },
          {
            title: 'Teachers and Content Creators',
            members: [
              {
                name: 'Angelo',
                role: 'MSA teacher',
                initials: 'A',
                details: [
                  { icon: User, text: 'Real Name: Aiham' },
                  { icon: Home, text: 'Born in: Iraq, Baghdad' },
                  { icon: MapPin, text: 'Lives in: Iraq, Baghdad' },
                  { icon: Hash, text: 'angelo_8808' },
                  { icon: Mail, text: 'aiham.88.iq@gmail.com' }
                ]
              },
              {
                name: 'Falcon',
                role: 'community mod & video editor',
                initials: 'F',
                details: [
                  { icon: User, text: 'Real Name: Nasr' },
                  { icon: Cake, text: '22 years old' },
                  { icon: Home, text: 'Born in: Alexandria, Egypt' },
                  { icon: MapPin, text: 'Lives in: Alexandria, Egypt' },
                  { icon: Hash, text: 'falcon76444' }
                ]
              }
            ]
          }
        ].map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-8 md:space-y-12">
            <motion.h3 
              {...fadeInUp}
              className="text-xl md:text-2xl font-bold text-text-main border-l-4 border-primary pl-4"
            >
              {group.title}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {group.members.map((member, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="bg-surface border border-border rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 space-y-6 lg:space-y-8 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors hidden lg:block" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-text-main tracking-tight group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[9px] md:text-[10px] font-medium text-primary/80 tracking-wide uppercase">
                        {member.role}
                      </p>
                    </div>
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg lg:text-xl group-hover:scale-110 transition-transform duration-500">
                      {member.initials}
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4 pt-4 border-t border-border/50 relative z-10">
                    {member.details.slice(0, member.details.length > 4 ? 4 : undefined).map((detail, j) => (
                      <div key={j} className="flex items-center gap-3 text-text-muted group/item">
                        <detail.icon size={14} className="text-primary/40 group-hover/item:text-primary transition-colors" />
                        <span className="text-xs lg:text-sm font-medium truncate">{detail.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Discord Community Section */}
      <section className="section-padding">
        <motion.div 
          {...fadeInUp}
          className="bg-surface border border-border rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center gap-8 md:gap-12 p-6 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-primary/20 transition-all duration-500"
        >
          <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/5 text-green-600 dark:text-green-400 rounded-full text-[10px] md:text-[13px] font-bold tracking-wider uppercase border border-green-500/10">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Active Community
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-text-main">
                Join 21,000+ <br className="hidden md:block" />
                <span className="font-serif italic text-primary text-4xl md:text-7xl">learners</span>
              </h2>
              <p className="text-text-muted text-base md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Practice Arabic, ask questions, and connect with others in our vibrant Discord server.
              </p>
            </div>
            <div className="pt-4">
              <a 
                href="https://discord.gg/x52dtrhp3Y" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-full md:w-auto px-10 py-4 md:py-5 bg-[#22C55E] hover:bg-[#16A34A] text-white rounded-xl md:rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-500/20 group"
              >
                Join Server
                <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-auto flex justify-center hidden md:flex">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-border/50">
                <iframe 
                  src="https://discord.com/widget?id=823889299325714462&theme=dark" 
                  width="350" 
                  height="500" 
                  allowtransparency="true" 
                  frameBorder="0" 
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  className="max-w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <motion.div
          {...fadeInUp}
          className="bg-gray-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 text-center space-y-12 md:space-y-16 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-30" />
          
          <div className="space-y-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Get in Touch</h2>
            <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">Have questions? We'd love to hear from you. Reach out through any of our channels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
            {[
              { icon: Mail, label: 'Email Us', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
              { icon: MessageSquare, label: 'Discord', value: 'Join our community', href: CONTACT_INFO.discord },
              { icon: Instagram, label: 'Instagram', value: '@learnarabic.dc', href: CONTACT_INFO.instagram },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <item.icon className="text-white mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform" size={24} md:size={32} />
                <p className="text-white font-bold text-xs md:text-sm mb-1 md:mb-2 tracking-widest uppercase">{item.label}</p>
                <p className="text-white/40 text-[10px] md:text-xs truncate font-medium">{item.value}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
