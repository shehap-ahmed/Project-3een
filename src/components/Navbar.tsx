import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, LogOut, LogIn } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import ThemeToggle from './ThemeToggle';

import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check current auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-6 left-0 right-0 z-50 transition-all duration-500 px-6`}
    >
      <div 
        className={`max-w-5xl mx-auto px-6 py-3 flex items-center justify-between transition-all duration-500 rounded-full ${
          scrolled ? 'glass shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <Logo className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight text-text-main transition-colors">
            Project 3een
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[13px] font-semibold tracking-wide transition-all duration-300 hover:text-primary relative group ${
                location.pathname === link.path ? 'text-primary' : 'text-gray-500'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
          
          {user ? (
            <button
              onClick={handleLogout}
              className="text-[13px] font-semibold tracking-wide text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`text-[13px] font-semibold tracking-wide transition-all duration-300 hover:text-primary relative group ${
                location.pathname === '/login' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Login
              <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                location.pathname === '/login' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          )}

          <ThemeToggle />

          <a
            href={CONTACT_INFO.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/10"
          >
            Join Discord
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-main p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 glass rounded-[2rem] p-8 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold tracking-tight ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <button
                onClick={handleLogout}
                className="text-xl font-bold tracking-tight text-red-500 flex items-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`text-xl font-bold tracking-tight ${
                  location.pathname === '/login' ? 'text-primary' : 'text-text-main'
                }`}
              >
                Login
              </Link>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-border">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Theme</span>
              <ThemeToggle />
            </div>

            <div className="h-px bg-gray-100 dark:bg-dark-border my-2" />
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-4 rounded-2xl font-bold"
            >
              <MessageSquare size={18} />
              Join Discord
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
