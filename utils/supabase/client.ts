import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co"
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "placeholder-key-for-build"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !supabaseKey) {
  if (typeof window !== "undefined") {
    console.error("Missing Supabase environment variables:", {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: !!supabaseKey,
    })
  }
}

/** Browser Supabase client; uses cookies for auth (SSR-compatible). */
export const supabase = createBrowserClient(supabaseUrl, supabaseKey)