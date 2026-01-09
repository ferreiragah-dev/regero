const SUPABASE_URL = "https://hvzxnuvxlfrqkisgubhr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2enhudXZ4bGZycWtpc2d1YmhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzczNTIwMiwiZXhwIjoyMDgzMzExMjAyfQ.-DJh2hTCq8wrIJ6QKIAhSGr4Bqb7HYHWouLFKQ34YTw";

window.supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
