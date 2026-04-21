import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, AlertCircle, Lock, ArrowRight } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkUserRole = async (email: string) => {
      console.log("Checking role for email:", email);
      if (!mounted) return false;
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
        
        if (error) {
          console.error("Error fetching user role:", error);
          setErrorStatus(`Database Error: ${error.message} (Code: ${error.code})`);
          return false;
        }
        
        console.log("Role fetch result data:", data);
        if (!data) {
          console.warn("No user record found in 'user' table for this email.");
          setErrorStatus(`No user record found in 'user' table for "${email}". Please ensure you have signed up.`);
          return false;
        }
        
        const isUserAdmin = data?.role?.toLowerCase() === 'admin';
        console.log("Is user admin?", isUserAdmin);
        return isUserAdmin;
      } catch (err: any) {
        console.error("Catch in checkUserRole:", err);
        setErrorStatus(err.message || "Connection to database failed.");
        return false;
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
          
          if (requireAdmin) {
            console.log("Admin check required");
            const adminStatus = await checkUserRole(session.user.email || '');
            if (mounted) {
              console.log("Admin status determined:", adminStatus);
              setIsAdmin(adminStatus);
            }
          }
        } else {
          console.log("No session found");
          setAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setAuthenticated(false);
          setIsAdmin(false);
        }
      } finally {
        if (mounted) {
          console.log("initAuth finally: Setting loading to false");
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
          if (requireAdmin) {
            const adminStatus = await checkUserRole(session.user.email || '');
            if (mounted) setIsAdmin(adminStatus);
          }
        } else {
          setAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error in onAuthStateChange handler:", err);
      } finally {
        if (mounted) {
          console.log("onAuthStateChange finally: Setting loading to false");
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [requireAdmin, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-text-muted text-sm animate-pulse">Checking permissions...</p>
      </div>
    );
  }

  if (errorStatus && requireAdmin && !isAdmin) {
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
            3. Make sure your account role is set to 'admin' in the database.
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-white py-3 rounded-2xl font-bold hover:bg-primary/90 transition-all"
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

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <div className="bg-surface border border-border p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mx-auto">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-text-main">Access Denied</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              You are logged in as <span className="text-primary font-bold">{userEmail}</span>, but this account does not have administrator privileges.
            </p>
          </div>
          
          <div className="bg-background rounded-2xl p-4 text-left border border-border">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Diagnostic Data</p>
            <div className="space-y-1 font-mono text-[10px] text-text-main">
              <div className="flex justify-between"><span>Authenticated:</span> <span className="text-green-500">true</span></div>
              <div className="flex justify-between"><span>Required Role:</span> <span className="text-primary">admin</span></div>
              <div className="flex justify-between"><span>Your Role Found:</span> <span className="text-amber-500">student/none</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:bg-primary/9 group transition-all flex items-center justify-center gap-2"
            >
              Back to Courses
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                navigate('/login');
              }}
              className="w-full text-text-muted text-xs font-bold hover:text-text-main py-2 transition-colors"
            >
              Sign out and change account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
