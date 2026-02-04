import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"

/**
 * Read-only test endpoint for Supabase connectivity and RLS.
 * Returns 1 row from public.registrations when authenticated with @nj.sgadi.us.
 * DO NOT WRITE TO ANY TABLE.
 *
 * @see docs/TASK_3_VERIFICATION.md
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

  const { data, error } = await supabase
    .from("registrations")
    .select("id, first_name, last_name, email, ghaam, mandal, arrival_date, departure_date")
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
      message: "Read-only test: 1 row from registrations",
      row: data,
      rowCount: data ? 1 : 0,
    },
    { status: 200, headers }
  )
}
