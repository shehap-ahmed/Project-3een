import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { Instagram, Mail, MessageSquare } from 'lucide-react';

import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-lg tracking-tight text-primary">
              Project 3een
            </span>
          </Link>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            A structured program designed for complete beginners to master the Arabic language from zero.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-4">Connect</h4>
          <div className="flex gap-4">
            <a
              href={CONTACT_INFO.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
            >
              <MessageSquare size={18} />
            </a>
            <a
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Learn Arabic – Project 3een. All rights reserved.
      </div>
    </footer>
  );
}
