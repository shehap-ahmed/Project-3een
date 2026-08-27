import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * Safely resolves the user's role from metadata or the database table
 * with non-blocking fallbacks and resilient timeout handling.
 */
export async function getSafeUserRole(user: User | null | undefined): Promise<string> {
  if (!user) return 'student';

  // 1. Check user metadata or app metadata first
  const metaRole = user.user_metadata?.role || user.app_metadata?.role;
  if (metaRole && typeof metaRole === 'string' && metaRole.trim().length > 0) {
    return metaRole.toLowerCase().trim();
  }

  // If no email, fallback to default
  const email = user.email?.toLowerCase().trim();
  if (!email) return 'student';

  // 2. Try fetching from Supabase database with a short non-throwing timeout
  try {
    const fetchPromise = supabase
      .from('user')
      .select('role')
      .eq('email', email)
      .maybeSingle();

    const timeoutPromise = new Promise<{ data: null; error: null }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: null }), 1800)
    );

    const result = await Promise.race([fetchPromise, timeoutPromise]);
    const { data } = result as { data?: { role?: string } | null; error?: any };

    if (data?.role && typeof data.role === 'string' && data.role.trim().length > 0) {
      return data.role.toLowerCase().trim();
    }
  } catch {
    // Silently continue to fallback
  }

  // 3. Fallback
  return 'student';
}

/**
 * Helper to check if a given role has admin privileges
 */
export function checkIsAdmin(role: string | null | undefined): boolean {
  return role?.toLowerCase().trim() === 'admin';
}
