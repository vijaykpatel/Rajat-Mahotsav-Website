import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"

/** Explicit columns only – avoid SELECT * per query best practices (data-pagination) */
const REGISTRATION_COLUMNS = [
  "id",
  "first_name",
  "middle_name",
  "last_name",
  "email",
  "mobile_number",
  "phone_country_code",
  "country",
  "ghaam",
  "mandal",
  "arrival_date",
  "departure_date",
  "age",
] as const

const PAGE_SIZES = [25, 50, 100] as const
type PageSize = (typeof PAGE_SIZES)[number]

function parsePageSize(val: string | null): PageSize {
  const n = val ? parseInt(val, 10) : 25
  if (PAGE_SIZES.includes(n as PageSize)) return n as PageSize
  return 25
}

/**
 * Paginated registrations endpoint.
 * Uses keyset pagination (cursor-based) ordered by id DESC – O(1) per page per data-pagination best practices.
 * Requires authenticated session with @nj.sgadi.us domain.
 *
 * Query params:
 * - page_size: 25 | 50 | 100 (default 25)
 * - cursor: id for keyset (optional; omit for first page)
 * - direction: "next" | "prev" (default "next")
 *
 * @see .agents/skills/supabase-postgres-best-practices/references/data-pagination.md
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
  const pageSize = parsePageSize(searchParams.get("page_size"))
  const cursorRaw = searchParams.get("cursor")
  const cursor = cursorRaw ? parseInt(cursorRaw, 10) : null
  const direction = searchParams.get("direction") === "prev" ? "prev" : "next"

  const columns = REGISTRATION_COLUMNS.join(", ")

  let query = supabase
    .from("registrations")
    .select(columns)

  if (direction === "next") {
    query = query.order("id", { ascending: false }).limit(pageSize)
    if (cursor != null && !Number.isNaN(cursor)) {
      query = query.lt("id", cursor)
    }
  } else {
    query = query.order("id", { ascending: true }).limit(pageSize)
    if (cursor != null && !Number.isNaN(cursor)) {
      query = query.gt("id", cursor)
    }
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json(
      { error: "Query failed", details: error.message },
      { status: 500, headers }
    )
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>
  if (direction === "prev" && rows.length > 0) {
    rows.reverse()
  }

  const minId = rows.length > 0 ? Math.min(...rows.map((r) => Number(r.id))) : null
  const maxId = rows.length > 0 ? Math.max(...rows.map((r) => Number(r.id))) : null

  return NextResponse.json(
    {
      success: true,
      rows,
      pageSize,
      nextCursor: direction === "next" ? minId : maxId,
      prevCursor: direction === "next" ? maxId : minId,
      hasMore: rows.length === pageSize,
      hasPrev: direction === "next" && cursor != null && !Number.isNaN(cursor),
    },
    { status: 200, headers }
  )
}
