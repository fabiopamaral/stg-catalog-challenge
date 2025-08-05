import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseAnonKey || !supabaseUrl)
  throw new Error("supabase env variables not defined");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
