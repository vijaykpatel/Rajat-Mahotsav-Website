import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"
import { REGISTRATION_DATE_RANGE } from "@/lib/registration-date-range"

/**
 * Registration stats endpoint for admin dashboard.
 * Calls get_registrations_stats RPC - read-only, no table writes.
 * Requires authenticated session with @nj.sgadi.us domain.
 *
 * Date range: start and end are both inclusive.
 * Defaults (when no query params): match registration form options (lib/registration-date-range.ts).
 *
 * @see docs/TASK_4_VERIFICATION.md
 */
export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url)
  const startDate = searchParams.get("start_date") ?? REGISTRATION_DATE_RANGE.start
  const endDate = searchParams.get("end_date") ?? REGISTRATION_DATE_RANGE.end

  const { data, error } = await supabase.rpc("get_registrations_stats", {
    p_start_date: startDate,
    p_end_date: endDate,
  })

  if (error) {
    return NextResponse.json(
      { error: "Stats query failed", details: error.message },
      { status: 500, headers }
    )
  }

  return NextResponse.json(
    {
      success: true,
      stats: data,
    },
    { status: 200, headers }
  )
}
