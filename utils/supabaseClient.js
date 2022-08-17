import { createClient } from "@supabase/supabase-js";

const supabasePublicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabasePublicUrl, supabaseAnonKey, {
    db: {
        schema: 'public',
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    }
})