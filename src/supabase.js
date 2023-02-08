import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xfnezcnpquaiukteuzgn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmbmV6Y25wcXVhaXVrdGV1emduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU4NDAyNjcsImV4cCI6MTk5MTQxNjI2N30.6obFtT2a8XTMZzgDQSUD08rbc0EGeKvWlW3_MUyup7Y";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
