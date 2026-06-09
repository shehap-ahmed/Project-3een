import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { Instagram, Mail } from 'lucide-react';
import DiscordIcon from './DiscordIcon';

import Logo from './Logo';

export default function Footer() {
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
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
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
