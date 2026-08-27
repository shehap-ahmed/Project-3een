import { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

const ROLE_CACHE_KEY_PREFIX = 'p3een_cached_role_';
const memoryRoleCache = new Map<string, { role: string; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Reads the cached role from localStorage and in-memory cache
 */
function getCachedRole(email: string): string | null {
  const normalizedEmail = email.toLowerCase().trim();
  
  // 1. Check memory cache first
  const mem = memoryRoleCache.get(normalizedEmail);
  if (mem && (Date.now() - mem.timestamp < CACHE_TTL_MS)) {
    return mem.role;
  }

  // 2. Check localStorage
  try {
    const raw = localStorage.getItem(`${ROLE_CACHE_KEY_PREFIX}${normalizedEmail}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.role && (Date.now() - (parsed.timestamp || 0) < CACHE_TTL_MS)) {
        memoryRoleCache.set(normalizedEmail, { role: parsed.role, timestamp: parsed.timestamp });
        return parsed.role;
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  return null;
}

/**
 * Saves the role to localStorage and in-memory cache
 */
export function setCachedRole(email: string, role: string): void {
  const normalizedEmail = email.toLowerCase().trim();
  const normalizedRole = role.toLowerCase().trim();
  const timestamp = Date.now();

  memoryRoleCache.set(normalizedEmail, { role: normalizedRole, timestamp });

  try {
    localStorage.setItem(
      `${ROLE_CACHE_KEY_PREFIX}${normalizedEmail}`,
      JSON.stringify({ role: normalizedRole, timestamp })
    );
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Safely resolves the user's role with robust caching (localStorage + memory).
 * When backgrounded, offline, or experiencing network latency, it uses the cached role
 * and NEVER downgrades an authorized role due to network timeouts.
 */
export async function getSafeUserRole(user: User | null | undefined): Promise<string> {
  if (!user) return 'student';

  const email = user.email?.toLowerCase().trim();

  // 1. Check user metadata or app metadata first
  const metaRole = user.user_metadata?.role || user.app_metadata?.role;
  if (metaRole && typeof metaRole === 'string' && metaRole.trim().length > 0) {
    const cleanMetaRole = metaRole.toLowerCase().trim();
    if (email) setCachedRole(email, cleanMetaRole);
    return cleanMetaRole;
  }

  // 2. Check cached role from localStorage / memory
  const cached = email ? getCachedRole(email) : null;

  if (!email) return cached || 'student';

  // 3. Query Supabase database in background with graceful fallback
  try {
    const fetchPromise = supabase
      .from('user')
      .select('role')
      .eq('email', email)
      .maybeSingle();

    // If we have a cached role, use a shorter timeout so UI remains snappy.
    // If we have no cache, give it more time (4s) to resolve.
    const timeoutDuration = cached ? 2000 : 4000;
    const timeoutPromise = new Promise<{ data: null; error: null }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: null }), timeoutDuration)
    );

    const result = await Promise.race([fetchPromise, timeoutPromise]);
    const { data } = result as { data?: { role?: string } | null; error?: any };

    if (data?.role && typeof data.role === 'string' && data.role.trim().length > 0) {
      const dbRole = data.role.toLowerCase().trim();
      setCachedRole(email, dbRole);
      return dbRole;
    }
  } catch {
    // If DB fails (e.g. background tab throttling, network glitch), fall back to cached role
  }

  // 4. Return existing cached role if available, otherwise default to student
  if (cached) {
    return cached;
  }

  return 'student';
}

/**
 * Helper to check if a given role has admin privileges
 */
export function checkIsAdmin(role: string | null | undefined): boolean {
  return role?.toLowerCase().trim() === 'admin';
}

/**
 * Clears the role cache for a user on sign-out
 */
export function clearCachedRole(email?: string | null): void {
  if (email) {
    const normalizedEmail = email.toLowerCase().trim();
    memoryRoleCache.delete(normalizedEmail);
    try {
      localStorage.removeItem(`${ROLE_CACHE_KEY_PREFIX}${normalizedEmail}`);
    } catch {
      // Ignore
    }
  } else {
    memoryRoleCache.clear();
  }
}
