import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"

const PAGE_SIZES = [25, 50, 100] as const
type PageSize = (typeof PAGE_SIZES)[number]

function parsePageSize(val: string | null): PageSize {
  const n = val ? parseInt(val, 10) : 25
  if (PAGE_SIZES.includes(n as PageSize)) return n as PageSize
  return 25
}

function parseOptionalInt(val: string | null): number | null {
  if (!val || val.trim() === "") return null
  const n = parseInt(val, 10)
  return Number.isNaN(n) ? null : n
}

function parseOptionalDate(val: string | null): string | null {
  if (!val || val.trim() === "") return null
  const d = new Date(val)
  return Number.isNaN(d.getTime()) ? null : val.trim()
}

/**
 * Paginated registrations endpoint with filters and search.
 * Uses keyset pagination (cursor-based) ordered by id DESC.
 * Requires authenticated session with @nj.sgadi.us domain.
 *
 * Query params:
 * - page_size, cursor, direction (pagination)
 * - ghaam, mandal, country (exact)
 * - age, age_min, age_max
 * - arrival_from, arrival_to, departure_from, departure_to (ISO dates)
 * - search (text across name, email, mobile; min 2 chars per word)
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

  const ghaam = searchParams.get("ghaam")?.trim() || null
  const mandal = searchParams.get("mandal")?.trim() || null
  const country = searchParams.get("country")?.trim() || null
  const age = parseOptionalInt(searchParams.get("age"))
  const ageMin = parseOptionalInt(searchParams.get("age_min"))
  const ageMax = parseOptionalInt(searchParams.get("age_max"))
  const arrivalFrom = parseOptionalDate(searchParams.get("arrival_from"))
  const arrivalTo = parseOptionalDate(searchParams.get("arrival_to"))
  const departureFrom = parseOptionalDate(searchParams.get("departure_from"))
  const departureTo = parseOptionalDate(searchParams.get("departure_to"))
  const searchRaw = searchParams.get("search")?.trim() || null
  const search = searchRaw && searchRaw.length >= 2 ? searchRaw : null

  if (ageMin != null && ageMax != null && ageMin > ageMax) {
    return NextResponse.json(
      { error: "age_min must be <= age_max" },
      { status: 400, headers }
    )
  }

  const { data, error } = await supabase.rpc("get_registrations_filtered", {
    p_page_size: pageSize,
    p_cursor: cursor,
    p_direction: direction,
    p_ghaam: ghaam,
    p_mandal: mandal,
    p_country: country,
    p_age: age,
    p_age_min: ageMin,
    p_age_max: ageMax,
    p_arrival_from: arrivalFrom,
    p_arrival_to: arrivalTo,
    p_departure_from: departureFrom,
    p_departure_to: departureTo,
    p_search: search,
  })

  if (error) {
    return NextResponse.json(
      { error: "Query failed", details: error.message },
      { status: 500, headers }
    )
  }

  const result = data as {
    success?: boolean
    error?: string
    rows?: unknown[]
    pageSize?: number
    nextCursor?: number | null
    prevCursor?: number | null
    hasMore?: boolean
    hasPrev?: boolean
  }

  if (result.success === false && result.error) {
    return NextResponse.json(
      { error: result.error },
      { status: 400, headers }
    )
  }

  return NextResponse.json(
    {
      success: true,
      rows: result.rows ?? [],
      pageSize: result.pageSize ?? pageSize,
      nextCursor: result.nextCursor ?? null,
      prevCursor: result.prevCursor ?? null,
      hasMore: result.hasMore ?? false,
      hasPrev: result.hasPrev ?? false,
    },
    { status: 200, headers }
  )
}
