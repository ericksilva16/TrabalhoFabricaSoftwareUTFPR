import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient('https://oikxkbgccealwjdanaeg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pa3hrYmdjY2VhbHdqZGFuYWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTcwNjksImV4cCI6MjA3MzczMzA2OX0.b6E_MIX0Riuvqp8yfVWicNiUxQQHWZiiR8f0dxecMeM');

function getSupabase() {
  return supabase;
}

export { getSupabase };