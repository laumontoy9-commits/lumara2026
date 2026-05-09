import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://tmnvetugnhmcclvdjnyw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnZldHVnbmhtY2NsdmRqbnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNzM3MjksImV4cCI6MjA5Mzg0OTcyOX0.zWaDwCrtqbrYfUABxdixvAkC_NkeRNgMHO0LD1HT5sQ'
);
