import { createAdminClient } from "@/utils/supabase/admin"
import type { User } from "@supabase/supabase-js"

export interface AdminAccessDeniedPayload {
  email: string
  full_name?: string | null
  provider?: string | null
  user_agent?: string | null
  ip?: string | null
}

/**
 * Logs a denied admin access attempt to the audit table.
 * Server-only. Uses service role to bypass RLS.
 * Fails silently to avoid blocking the redirect; errors are logged to console.
 */
export async function logAdminAccessDenied(
  user: User,
  requestContext?: { userAgent?: string | null; ip?: string | null }
): Promise<void> {
  try {
    const supabase = createAdminClient()
    const payload: AdminAccessDeniedPayload = {
      email: user.email ?? "",
      full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
      provider: user.app_metadata?.provider ?? null,
      user_agent: requestContext?.userAgent ?? null,
      ip: requestContext?.ip ?? null,
    }

    const { error } = await supabase.from("admin_access_denied").insert(payload)

    if (error) {
      console.error("[admin_access_log] Insert failed:", error.message)
    }
  } catch (err) {
    console.error("[admin_access_log] Error:", err)
  }
}
