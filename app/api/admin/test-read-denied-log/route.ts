import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"
import { isAdminDomainUser } from "@/lib/admin-auth"

/**
 * Read-only test endpoint for admin_access_denied table and admin client.
 * Returns 1 row when authenticated with @nj.sgadi.us.
 * DO NOT WRITE TO ANY TABLE.
 */
export async function GET() {
  const headers = new Headers()
  headers.set("Cache-Control", "no-store, max-age=0")

  let supabase
  try {
    supabase = await createClient()
  } catch (err) {
    return NextResponse.json(
      { error: "Supabase not configured", details: String(err) },
      { status: 500, headers }
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized", message: "Sign in required" },
      { status: 401, headers }
    )
  }

  if (!isAdminDomainUser(user)) {
    return NextResponse.json(
      { error: "Forbidden", message: "Admin domain (@nj.sgadi.us) required" },
      { status: 403, headers }
    )
  }

  let adminSupabase
  try {
    adminSupabase = createAdminClient()
  } catch (err) {
    return NextResponse.json(
      {
        error: "Admin client not configured",
        details: String(err),
        hint: "Set SUPABASE_SERVICE_ROLE_KEY in .env.local",
      },
      { status: 500, headers }
    )
  }

  const { data, error } = await adminSupabase
    .from("admin_access_denied")
    .select("id, email, full_name, provider, attempted_at, user_agent, ip")
    .order("id", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    return NextResponse.json(
      { error: "Query failed", details: error.message },
      { status: 500, headers }
    )
  }

  return NextResponse.json(
    {
      success: true,
      message: "Read-only test: 1 row from admin_access_denied",
      row: data,
      rowCount: data ? 1 : 0,
    },
    { status: 200, headers }
  )
}
