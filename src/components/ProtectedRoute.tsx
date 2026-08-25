import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, AlertCircle, Lock, ArrowRight } from 'lucide-react';

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
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
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

    const checkUserRole = async (email: string, userMetadata?: any): Promise<{ allowed: boolean; role: string | null }> => {
      console.log("Checking role for email:", email, "Required roles:", allowedRoles);
      if (!mounted) return { allowed: false, role: null };
      setUserEmail(email);
      setErrorStatus(null);
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Role check timed out after 5s - This usually means Supabase RLS policies are blocking the read.')), 5000)
      );

      try {
        const result: any = await Promise.race([
          supabase
            .from('user')
            .select('role')
            .eq('email', email.toLowerCase().trim())
            .maybeSingle(),
          timeoutPromise
        ]);
        
        const { data, error } = result;
        
        let foundRole: string | null = null;

        if (error) {
          console.error("Error fetching user role from database:", error);
          // Fallback to user metadata if DB query fails
          if (userMetadata?.role) {
            foundRole = userMetadata.role;
          } else {
            setErrorStatus(`Database Error: ${error.message} (Code: ${error.code})`);
            return { allowed: false, role: null };
          }
        } else if (data?.role) {
          foundRole = data.role;
        } else if (userMetadata?.role) {
          foundRole = userMetadata.role;
        }
        
        const normalizedRole = (foundRole || 'student').toLowerCase().trim();
        if (mounted) {
          setCurrentRole(normalizedRole);
        }

        // Allow if role is in allowed roles OR user is admin (admin has full access)
        const isAllowed = allowedRoles.includes(normalizedRole) || normalizedRole === 'admin';
        console.log("Found role:", normalizedRole, "Is allowed?", isAllowed);
        return { allowed: isAllowed, role: normalizedRole };
      } catch (err: any) {
        console.error("Catch in checkUserRole:", err);
        // Fallback to metadata if DB threw timeout/RLS error
        if (userMetadata?.role) {
          const metaRole = userMetadata.role.toLowerCase().trim();
          if (mounted) setCurrentRole(metaRole);
          return { allowed: allowedRoles.includes(metaRole) || metaRole === 'admin', role: metaRole };
        }
        setErrorStatus(err.message || "Connection to database failed.");
        return { allowed: false, role: null };
      }
    };

    const initAuth = async () => {
      console.log("ProtectedRoute: initAuth starting");
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (!mounted) return;

        if (session) {
          console.log("Session found for:", session.user.email);
          setAuthenticated(true);
          
          if (needsRoleCheck) {
            const { allowed, role } = await checkUserRole(session.user.email || '', session.user.user_metadata);
            if (mounted) {
              setHasPermission(allowed);
              setCurrentRole(role);
            }
          } else {
            setHasPermission(true);
          }
        } else {
          console.log("No session found");
          setAuthenticated(false);
          setHasPermission(false);
          setCurrentRole(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change event:", event);
      try {
        if (!mounted) return;

        if (session) {
          setAuthenticated(true);
          if (needsRoleCheck) {
            const { allowed, role } = await checkUserRole(session.user.email || '', session.user.user_metadata);
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
      } catch (err) {
        console.error("Error in onAuthStateChange handler:", err);
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

  if (errorStatus && needsRoleCheck && !hasPermission) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-surface border border-border p-8 rounded-3xl max-w-md w-full text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-text-main">Permission Check Failed</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            {errorStatus}
          </p>
          <div className="p-4 bg-background rounded-2xl text-[10px] font-mono text-left text-text-muted overflow-auto">
            <p className="font-bold mb-1 text-primary">Troubleshooting Tip:</p>
            1. Ensure Row Level Security (RLS) policies are active for the "user" table.<br/>
            2. Policy expression should be: auth.email() = email<br/>
            3. Make sure your account role is set to '{allowedRoles.join("' or '")}' in the database.
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all cursor-pointer"
          >
            Retry Check
          </button>
        </div>
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
              <div className="flex justify-between"><span>Current Role:</span> <span className="text-amber-500 font-bold">{currentRole || 'none'}</span></div>
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
