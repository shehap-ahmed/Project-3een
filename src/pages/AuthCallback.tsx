import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const handleCallback = async () => {
      try {
        // 1. Retrieve current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          // If no session is returned immediately, subscribe to auth state changes to detect the event
          const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
            if (active && currentSession) {
              subscription.unsubscribe();
              await ensureUserRecordAndRedirect(currentSession);
            }
          });

          // Wait a brief moment to see if state changes, otherwise timeout to login
          setTimeout(() => {
            if (active && !error) {
              subscription.unsubscribe();
              setError('Authentication timed out or no active session found. Please try logging in again.');
            }
          }, 6000);
          return;
        }

        await ensureUserRecordAndRedirect(session);
      } catch (err: any) {
        console.error('Callback error:', err);
        if (active) {
          setError(err?.message || 'An unexpected error occurred during auth callback.');
        }
      }
    };

    const ensureUserRecordAndRedirect = async (session: any) => {
      if (!active) return;
      
      const email = session?.user?.email;
      if (!email) {
        throw new Error('No email address provided by your authentication provider.');
      }

      try {
        // Ensure user record exists in the local 'user' table
        const { data: userRecord, error: fetchError } = await supabase
          .from('user')
          .select('*')
          .eq('email', email.toLowerCase().trim())
          .maybeSingle();

        if (fetchError) {
          console.warn('Non-critical fetch user record error:', fetchError);
        }

        if (!userRecord) {
          // Extract a name based on provider metadata
          const fullName = session.user.user_metadata?.full_name || 
                           session.user.user_metadata?.name || 
                           session.user.user_metadata?.user_name || 
                           email.split('@')[0];

          console.log('Inserting new OAuth user into local database:', email);
          const { error: dbError } = await supabase
            .from('user')
            .insert([{ 
              name: fullName, 
              email: email.toLowerCase().trim(),
              role: 'student' 
            }]);

          if (dbError) {
            console.error('Failed to create local user database record:', dbError);
          }
        }

        // Successfully authenticated! Redirect to courses with persistent state
        if (active) {
          navigate('/courses', { replace: true });
        }
      } catch (err: any) {
        console.error('Database linking error:', err);
        // We still redirect since auth is successful, but log the error
        if (active) {
          navigate('/courses', { replace: true });
        }
      }
    };

    handleCallback();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center section-padding text-center">
      <div className="max-w-md w-full p-8 bg-surface border border-border rounded-[2.5rem] shadow-xl space-y-6">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mx-auto">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-main">Authentication Error</h2>
              <p className="text-text-muted text-sm leading-relaxed">{error}</p>
            </div>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="btn-premium w-full py-4 text-sm"
            >
              Back to Login
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <Loader2 className="animate-spin text-primary" size={48} />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-text-main">Completing Sign In</h3>
                <p className="text-text-muted text-sm animate-pulse">Syncing your secure account session...</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
