import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project URL and anon key
const supabaseUrl = 'https://kzgpjjrigxbagmgimnjj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6Z3BqanJpZ3hiYWdtZ2ltbmpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MjQwMDcsImV4cCI6MjA3MzQwMDAwN30.TqvUiJVGAEhrh7YIfujJFF6bhCbn1qojnnV-xH7VtIk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
});
