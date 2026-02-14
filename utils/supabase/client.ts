import { createBrowserClient } from "@supabase/ssr"

const hasSupabaseUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
const hasSupabaseKey = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const hasSupabaseClientEnv = hasSupabaseUrl && hasSupabaseKey

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "placeholder-key-for-build"

/** Browser Supabase client; uses cookies for auth (SSR-compatible). */
export const supabase = createBrowserClient(supabaseUrl, supabaseKey)
