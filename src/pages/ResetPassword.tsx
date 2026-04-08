import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, AlertCircle, CheckCircle2, Save } from 'lucide-react';
import Logo from '../components/Logo';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session (Supabase automatically handles the recovery token from the URL)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // If no session, they might have accessed this page directly without a valid recovery link
        // However, Supabase often sets the session automatically when clicking the link.
        // We'll let them try to update, and if it fails, we'll show an error.
      }
    };
    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      setMessage({ 
        type: 'success', 
        text: 'Password updated successfully! Redirecting to login...' 
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update password. The link may have expired.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div 
        {...fadeInUp}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <Logo className="w-12 h-12" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-main">Set New Password</h1>
            <p className="text-text-muted">Please enter your new password below.</p>
          </div>
        </div>

        <div className="bento-card p-8">
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-2xl flex items-start gap-3 ${
                message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {message.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
                <span className="text-sm font-medium leading-relaxed">{message.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  Update Password
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
