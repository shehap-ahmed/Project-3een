import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, LogOut, LogIn } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import { NAV_LINKS, CONTACT_INFO, NavLinkItem } from '../constants';
import { supabase } from '../lib/supabase';
import { getSafeUserRole, clearCachedRole } from '../lib/authUtils';
import { User } from '@supabase/supabase-js';

import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  const fetchRole = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setUserRole(null);
      return;
    }
    const role = await getSafeUserRole(currentUser);
    setUserRole(role);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Check current auth state
    supabase.auth.getUser()
      .then((res) => {
        const currentUser = res?.data?.user ?? null;
        setUser(currentUser);
        fetchRole(currentUser);
      })
      .catch(() => {
        setUser(null);
        setUserRole(null);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchRole(currentUser);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, [fetchRole]);

  const navigate = useNavigate();

  const isLinkVisible = (link: NavLinkItem) => {
    if (!link.requiresAuth && !link.requiredRole) {
      return true;
    }
    // If not logged in, hide protected links
    if (!user) {
      return false;
    }
    // If role required, check that current user has required role or is admin
    if (link.requiredRole) {
      const normalizedCurrentRole = (userRole || '').toLowerCase().trim();
      const normalizedRequiredRole = link.requiredRole.toLowerCase().trim();
      return normalizedCurrentRole === normalizedRequiredRole || normalizedCurrentRole === 'admin';
    }
    return true;
  };

  const visibleLinks = NAV_LINKS.filter(isLinkVisible);

  const getInitials = (user: User | null) => {
    if (!user) return '?';
    const name = user.user_metadata?.display_name || user.user_metadata?.name || user.email || '';
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    if (user?.email) clearCachedRole(user.email);
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <Link 
          to="/" 
          className="flex items-center gap-3 group"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              scrollToTop();
            }
          }}
        >
          <Logo className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight text-text-main transition-colors">
            Project 3een
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {visibleLinks.map((link) => {
            const isActive = location.pathname === link.path || 
              (link.path === '/msa-class-7' && (
                location.pathname === '/resources/msa-class-7' || 
                location.pathname === '/practice/msa-class-7'
              ));

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-[13px] font-semibold tracking-wide transition-all duration-300 hover:text-primary relative group ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
          
          {user ? (
            <div className="flex items-center gap-6">
              <Link
                to="/profile"
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 ${
                  location.pathname === '/profile' ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
              >
                {getInitials(user)}
              </Link>
            </div>
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

          <a
            href={CONTACT_INFO.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/10"
          >
            <DiscordIcon size={16} className="hidden lg:block" />
            Join Discord
          </a>
        </div>

        {/* Mobile Toggle & Profile */}
        <div className="flex md:hidden items-center gap-3">
          {user && (
            <Link
              to="/profile"
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-[10px] transition-all active:scale-95 shadow-lg shadow-primary/20 ${
                location.pathname === '/profile' ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              {getInitials(user)}
            </Link>
          )}
          <button
            className="text-text-main p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
            {visibleLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                (link.path === '/msa-class-7' && (
                  location.pathname === '/resources/msa-class-7' || 
                  location.pathname === '/practice/msa-class-7'
                ));

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold tracking-tight ${
                    isActive ? 'text-primary' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-primary"
            >
              Join Discord
            </a>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold tracking-tight ${
                    location.pathname === '/profile' ? 'text-primary' : 'text-text-main'
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xl font-bold tracking-tight text-red-500 text-left"
                >
                  Logout
                </button>
              </>
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
