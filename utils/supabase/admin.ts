import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase admin client using the service role key.
 * Bypasses RLS. Use ONLY for trusted server-side operations (e.g. audit logging).
 * NEVER expose this client or the service role key to the browser.
 *
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs#creating-a-supabase-client-with-the-service-role-key
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin env: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
