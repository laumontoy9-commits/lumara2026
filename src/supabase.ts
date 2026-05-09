import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? 'https://tmnvetugnhmcclvdjnyw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnZldHVnbmhtY2NsdmRqbnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzM3MjksImV4cCI6MjA5Mzg0OTcyOX0.zWaDwCrtqbrYfUABxdixvAkC_NkeRNgMHO0LD1HT5sQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
