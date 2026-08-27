import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { getSafeUserRole, checkIsAdmin } from '../lib/authUtils';
import { User } from '@supabase/supabase-js';
import { User as UserIcon, Mail, Calendar, Shield, LogOut, Save, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userRole, setUserRole] = useState<string>('student');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setDisplayName(user.user_metadata?.display_name || '');
        
        const role = await getSafeUserRole(user);
        setUserRole(role);
        setIsAdmin(checkIsAdmin(role));
      } else {
        navigate('/login');
      }
      setLoading(false);
    }
    getProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { display_name: displayName }
      });

      if (error) throw error;
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <motion.div {...fadeInUp} className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-text-main">User Profile</h1>
          <p className="text-text-muted">Manage your account settings and preferences.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Info */}
          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.1 }}
            className="md:col-span-4 space-y-6"
          >
            <div className="bento-card p-8 flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
                <UserIcon size={48} />
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1.5 rounded-full shadow-lg border-2 border-background">
                    <Shield size={14} />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-main">{displayName || (isAdmin ? 'Administrator' : userRole === 'aeen' ? '3een Member' : 'Student')}</h2>
                <p className="text-sm text-text-muted">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  Role: {userRole}
                </div>
              </div>
              <div className="w-full h-px bg-border my-2" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 py-2 rounded-xl transition-colors font-semibold"
              >
                <LogOut size={18} />
                Sign Out
              </button>

              {isAdmin && (
                <div className="w-full pt-4 border-t border-border mt-2">
                  <button
                    onClick={() => navigate('/admin')}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 py-3 rounded-xl transition-colors font-bold text-sm"
                  >
                    <Shield size={18} />
                    Admin Dashboard
                  </button>
                </div>
              )}
            </div>

            <div className="bento-card p-6 space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted">Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-primary" />
                  <span className="text-text-main">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-primary" />
                  <span className="text-text-main">Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={16} className="text-primary" />
                  <span className="text-text-main">Verified Account</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Settings */}
          <motion.div 
            {...fadeInUp} 
            transition={{ delay: 0.2 }}
            className="md:col-span-8 space-y-6"
          >
            <div className="bento-card p-8">
              <h3 className="text-2xl font-bold text-text-main mb-6">General Settings</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-background border border-border rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-text-main"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main ml-1">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-gray-50 dark:bg-white/5 border border-border rounded-2xl px-5 py-4 text-text-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-text-muted ml-1 italic">Email cannot be changed at this time.</p>
                </div>

                {message && (
                  <div className={`p-4 rounded-2xl flex items-center gap-3 ${
                    message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {message.type === 'error' && <AlertCircle size={18} />}
                    <span className="text-sm font-medium">{message.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {updating ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="bento-card p-8 bg-red-500/5 border-red-500/20">
              <h3 className="text-xl font-bold text-red-500 mb-2">Danger Zone</h3>
              <p className="text-sm text-text-muted mb-6">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="text-red-500 font-bold text-sm hover:underline">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
