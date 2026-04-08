import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail, ArrowLeft, AlertCircle, CheckCircle2, Timer } from 'lucide-react';
import Logo from '../components/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedEmail)) {
        throw new Error('Please enter a valid email address.');
      }

      // 1. Check if email exists using RPC function
      const { data: exists, error: rpcError } = await supabase.rpc('check_user_exists', { 
        email_to_check: sanitizedEmail 
      });

      if (rpcError) throw rpcError;

      if (!exists) {
        throw new Error('This email is not registered.');
      }

      // 2. Send reset email
      const { error } = await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Success! Password reset link sent. Please check your email inbox.' 
      });
      setCountdown(50); // Start 50 second timer
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to send reset link. Please try again.' 
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
          <Link to="/" className="group">
            <Logo className="w-12 h-12" />
          </Link>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-text-main">Forgot Password?</h1>
            <p className="text-text-muted">Enter your email and we'll send you a link to reset your password.</p>
          </div>
        </div>

        <div className="bento-card p-8">
          <form onSubmit={handleResetRequest} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
              disabled={loading || countdown > 0}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : countdown > 0 ? (
                <div className="flex items-center gap-2">
                  <Timer size={18} />
                  Resend in {countdown}s
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
