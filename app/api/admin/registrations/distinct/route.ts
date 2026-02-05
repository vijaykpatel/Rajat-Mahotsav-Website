import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"

const headers = new Headers()
headers.set("Cache-Control", "no-store, max-age=0")

/**
 * Returns distinct ghaam and country values for filter dropdowns.
 * Requires authenticated session with @nj.sgadi.us domain.
 */
export async function GET() {
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

  const { data, error } = await supabase.rpc("get_registrations_distinct_values")

  if (error) {
    return NextResponse.json(
      { error: "Query failed", details: error.message },
      { status: 500, headers }
    )
  }

  return NextResponse.json(
    { success: true, ...(data as object) },
    { status: 200, headers }
  )
}
