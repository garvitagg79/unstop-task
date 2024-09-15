// supabase.ts

import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and API key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key must be defined');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
