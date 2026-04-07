import { motion } from 'motion/react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <motion.div 
      className={`${className} relative flex items-center justify-center`}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src="/learnarabic-logo_1.png" 
        alt="Project 3een Logo" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to a stylized placeholder if logo.png is not found
          e.currentTarget.style.display = 'none';
          const parent = e.currentTarget.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = "w-full h-full bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg";
            fallback.innerText = "ع";
            parent.appendChild(fallback);
          }
        }}
      />
    </motion.div>
  );
}
