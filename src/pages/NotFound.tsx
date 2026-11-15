import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding text-center">
      <SEO
        title="Page Not Found – Project 3een"
        description="The page you are looking for could not be found on Project 3een."
        noindex={true}
        nofollow={true}
      />
      <div className="max-w-lg w-full bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 space-y-6 shadow-xl">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen size={30} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-text-main tracking-tight">
            Page Not Found
          </h1>
          <p className="text-text-muted text-sm md:text-base leading-relaxed">
            The link may have moved or does not exist. Explore our Arabic learning home page or beginner courses below.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link to="/" className="btn-premium px-6 py-3 text-sm group">
            Back to Home
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/courses" className="btn-premium-outline px-6 py-3 text-sm">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
