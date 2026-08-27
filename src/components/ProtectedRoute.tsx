import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getSafeUserRole } from '../lib/authUtils';
import { Loader2, Lock, ArrowRight } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requiredRole?: string | string[];
}

export default function ProtectedRoute({ children, requireAdmin = false, requiredRole }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Normalize allowed roles list
  const allowedRoles: string[] = React.useMemo(() => {
    if (requireAdmin) return ['admin'];
    if (!requiredRole) return [];
    if (Array.isArray(requiredRole)) return requiredRole.map((r) => r.toLowerCase().trim());
    return [requiredRole.toLowerCase().trim()];
  }, [requireAdmin, requiredRole]);

  const needsRoleCheck = allowedRoles.length > 0;

  useEffect(() => {
    let mounted = true;

    const evaluateRole = async (user: any): Promise<{ allowed: boolean; role: string }> => {
      const email = user?.email || '';
      if (mounted) setUserEmail(email);

      const resolvedRole = await getSafeUserRole(user);
      if (mounted) {
        setCurrentRole(resolvedRole);
      }

      // Allow if role is in allowed roles OR user is admin (admin has full access)
      const isAllowed = allowedRoles.includes(resolvedRole) || resolvedRole === 'admin';
      return { allowed: isAllowed, role: resolvedRole };
    };

    const initAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (!mounted) return;

        if (session?.user) {
          setAuthenticated(true);
          
          if (needsRoleCheck) {
            const { allowed, role } = await evaluateRole(session.user);
            if (mounted) {
              setHasPermission(allowed);
              setCurrentRole(role);
            }
          } else {
            setHasPermission(true);
          }
        } else {
          setAuthenticated(false);
          setHasPermission(false);
          setCurrentRole(null);
        }
      } catch {
        if (mounted) {
          setAuthenticated(false);
          setHasPermission(false);
          setCurrentRole(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (!mounted) return;

        if (session?.user) {
          setAuthenticated(true);
          if (needsRoleCheck) {
            const { allowed, role } = await evaluateRole(session.user);
            if (mounted) {
              setHasPermission(allowed);
              setCurrentRole(role);
            }
          } else {
            setHasPermission(true);
          }
        } else {
          setAuthenticated(false);
          setHasPermission(false);
          setCurrentRole(null);
        }
      } catch {
        // Silently handle
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [requireAdmin, requiredRole, allowedRoles, needsRoleCheck, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-text-muted text-sm animate-pulse">Checking permissions...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (needsRoleCheck && !hasPermission) {
    const roleTitle = allowedRoles.includes('aeen') ? 'Role "aeen" Required' : 'Access Denied';
    const roleDescription = allowedRoles.includes('aeen')
      ? `You are logged in as "${userEmail}", but this page is only accessible by accounts with the "aeen" role in Supabase.`
      : `You are logged in as "${userEmail}", but this account does not have the required permissions (${allowedRoles.join(', ')}).`;

    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-surface border border-border p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mx-auto">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-main">{roleTitle}</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              {roleDescription}
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-4 text-left border border-border">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Access Diagnostic</p>
            <div className="space-y-1.5 font-mono text-[11px] text-text-main">
              <div className="flex justify-between"><span>User:</span> <span className="text-text-muted truncate max-w-[180px]">{userEmail}</span></div>
              <div className="flex justify-between"><span>Authenticated:</span> <span className="text-green-500 font-bold">Yes</span></div>
              <div className="flex justify-between"><span>Required Role:</span> <span className="text-primary font-bold">{allowedRoles.join(' / ')}</span></div>
              <div className="flex justify-between"><span>Current Role:</span> <span className="text-amber-500 font-bold">{currentRole || 'student'}</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/90 group transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
            >
              Back to Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                navigate('/login', { state: { from: location } });
              }}
              className="w-full text-text-muted text-xs font-bold hover:text-text-main py-2 transition-colors cursor-pointer"
            >
              Sign out and switch account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
