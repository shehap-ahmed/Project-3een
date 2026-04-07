import { motion } from 'motion/react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.div 
      className={`${className} relative flex items-center justify-center`}
      whileHover={{ scale: 1.05 }}
    >
      {/* Outer Circle with Logo Background Colors */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-soft-pink via-soft-purple to-accent opacity-20 blur-[2px]" />
      
      {/* Main Green Emblem Circle */}
      <div className="relative w-full h-full bg-primary rounded-full flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden">
        {/* Simplified Wreath Pattern (SVG) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-40 p-1">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
          <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10" fill="none" stroke="white" strokeWidth="1" strokeDasharray="1 3" />
        </svg>
        
        {/* Arabic Letter 'Ain' */}
        <span className="relative z-10 text-white font-bold text-xl select-none">
          ع
        </span>
      </div>
    </motion.div>
  );
}
