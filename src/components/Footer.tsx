import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CONTACT_INFO, NAV_LINKS, NavLinkItem } from '../constants';
import { Instagram, Mail } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

import Logo from './Logo';

export default function Footer() {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async (currentUser: User | null) => {
      if (!currentUser?.email) {
        setUserRole(null);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('user')
          .select('role')
          .eq('email', currentUser.email.toLowerCase().trim())
          .maybeSingle();

        if (!error && data?.role) {
          setUserRole(data.role.toLowerCase().trim());
        } else if (currentUser.user_metadata?.role) {
          setUserRole(String(currentUser.user_metadata.role).toLowerCase().trim());
        } else {
          setUserRole('student');
        }
      } catch {
        const metaRole = currentUser.user_metadata?.role || 'student';
        setUserRole(String(metaRole).toLowerCase().trim());
      }
    };

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchRole(currentUser);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isLinkVisible = (link: NavLinkItem) => {
    if (!link.requiresAuth && !link.requiredRole) {
      return true;
    }
    if (!user) {
      return false;
    }
    if (link.requiredRole) {
      const normalizedCurrentRole = (userRole || '').toLowerCase().trim();
      const normalizedRequiredRole = link.requiredRole.toLowerCase().trim();
      return normalizedCurrentRole === normalizedRequiredRole || normalizedCurrentRole === 'admin';
    }
    return true;
  };

  const visibleLinks = NAV_LINKS.filter(isLinkVisible);

  return (
    <footer className="bg-surface border-t border-border py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight text-primary">
              Project 3een
            </span>
          </Link>
          <p className="text-text-muted text-sm max-w-xs leading-relaxed">
            A community-run project helping complete beginners learn Arabic, step by step.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-text-main mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            {visibleLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-text-main mb-4">Connect</h4>
          <div className="flex gap-4">
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all border border-border"
            >
              <DiscordIcon size={18} />
            </a>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all border border-border"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all border border-border"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-border text-center text-text-muted opacity-60 text-xs">
        © {new Date().getFullYear()} Learn Arabic – Project 3een. All rights reserved.
      </div>
    </footer>
  );
}
