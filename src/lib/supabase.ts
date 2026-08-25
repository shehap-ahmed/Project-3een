import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hwkaiwlqplovjacepsfs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_kEocMzMoMs1Ou2dzR_1z8w_K10469rb';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Auth features may not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'arabic-learning-auth-token'
  }
});
