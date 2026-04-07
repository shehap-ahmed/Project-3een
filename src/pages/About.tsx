import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { Mail, MessageSquare, Instagram, Target, Heart, Globe } from 'lucide-react';

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
      <section className="section-padding text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[11px] font-bold tracking-[0.2em] uppercase"
        >
          Our Story
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1]"
        >
          Making Arabic Education <br />
          <span className="font-serif italic text-primary">Accessible to All.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Founded in 2021, Project 3een is a community-driven initiative dedicated to helping students worldwide master the Arabic language through structure and support.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-32">
        <div className="section-padding grid md:grid-cols-3 gap-12">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide a structured, clear, and affordable path for absolute beginners to learn Modern Standard Arabic.' },
            { icon: Heart, title: 'Our Values', desc: 'We believe in community-driven learning, where every student feels supported and encouraged.' },
            { icon: Globe, title: 'Our Vision', desc: 'To become the leading platform for affordable Arabic education, bridging cultures through language.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="bento-card space-y-6 text-center group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mx-auto transition-colors group-hover:bg-primary group-hover:text-white">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <motion.div
          {...fadeInUp}
          className="bg-gray-900 rounded-[3rem] p-10 md:p-20 text-center space-y-16 overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-30" />
          
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Get in Touch</h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">Have questions? We'd love to hear from you. Reach out through any of our channels.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
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
                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group"
              >
                <item.icon className="text-white mx-auto mb-6 group-hover:scale-110 transition-transform" size={32} />
                <p className="text-white font-bold text-sm mb-2 tracking-widest uppercase">{item.label}</p>
                <p className="text-white/40 text-xs truncate font-medium">{item.value}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
