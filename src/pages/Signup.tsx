import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import DiscordIcon from '../components/DiscordIcon';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/courses';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate(from, { replace: true });
        }
      } catch (err) {
        console.error('Auth check error:', err);
      }
    };
    checkAuth();
  }, [navigate, from]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Insert into user table
        // We omit 'id' because it's a bigint in the DB, while Supabase Auth ID is a UUID string.
        const { error: dbError } = await supabase
          .from('user')
          .insert([{ name, email: email.toLowerCase().trim() }]);

        if (dbError) throw dbError;

        // 3. Redirect to original destination or course
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const isProduction = window.location.origin.includes('project-3een.vercel.app');
      const redirectToUrl = isProduction 
        ? 'https://project-3een.vercel.app/auth/callback' 
        : `${window.location.origin}/auth/callback`;
      const isIframe = window.self !== window.top;

      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectToUrl,
          skipBrowserRedirect: isIframe,
        }
      });

      if (authError) throw authError;

      if (isIframe && data?.url) {
        const authWindow = window.open(data.url, 'google_auth_popup', 'width=600,height=700,status=no,resizable=yes');
        
        if (!authWindow) {
          setError('Popup blocked! Please allow popups for this site, or open the app in a new tab.');
          setLoading(false);
          return;
        }

        const checkSessionInterval = setInterval(async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            clearInterval(checkSessionInterval);
            authWindow.close();
            navigate(from, { replace: true });
          }
          if (authWindow.closed) {
            clearInterval(checkSessionInterval);
            setLoading(false);
          }
        }, 1500);
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setError(err.message || 'An error occurred during Google Sign In');
      setLoading(false);
    }
  };

  const handleDiscordSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const isProduction = window.location.origin.includes('project-3een.vercel.app');
      const redirectToUrl = isProduction 
        ? 'https://project-3een.vercel.app/auth/callback' 
        : `${window.location.origin}/auth/callback`;
      const isIframe = window.self !== window.top;

      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: redirectToUrl,
          skipBrowserRedirect: isIframe,
        }
      });

      if (authError) throw authError;

      if (isIframe && data?.url) {
        const authWindow = window.open(data.url, 'discord_auth_popup', 'width=600,height=700,status=no,resizable=yes');
        
        if (!authWindow) {
          setError('Popup blocked! Please allow popups for this site, or open the app in a new tab.');
          setLoading(false);
          return;
        }

        const checkSessionInterval = setInterval(async () => {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            clearInterval(checkSessionInterval);
            authWindow.close();
            navigate(from, { replace: true });
          }
          if (authWindow.closed) {
            clearInterval(checkSessionInterval);
            setLoading(false);
          }
        }, 1500);
      }
    } catch (err: any) {
      console.error('Discord Auth Error:', err);
      setError(err.message || 'An error occurred during Discord Sign In');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center section-padding"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-text-main">Join Project 3een</h1>
          <p className="text-text-muted">Create an account to track your progress and practice with us.</p>
        </div>

        <form onSubmit={handleSignup} className="bg-surface p-8 rounded-[2.5rem] border border-border shadow-xl space-y-6 transition-colors duration-300">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
            {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative px-4 text-xs font-bold uppercase tracking-wider text-text-muted bg-surface">
              or continue with
            </span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 px-6 bg-background border border-border hover:bg-surface hover:border-text-muted/30 text-text-main font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group relative cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-105 duration-300 shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span className="text-sm tracking-wide">Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleDiscordSignIn}
            disabled={loading}
            className="w-full py-4 px-6 bg-background border border-border hover:bg-surface hover:border-text-muted/30 text-text-main font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 group relative cursor-pointer active:scale-[0.98] shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <DiscordIcon size={20} className="text-[#5865F2] transition-transform group-hover:scale-105 duration-300 shrink-0" />
            <span className="text-sm tracking-wide">Continue with Discord</span>
          </button>

          <p className="text-center text-sm text-gray-500 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
