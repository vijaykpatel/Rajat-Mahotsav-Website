import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"

/** Chunk size for keyset pagination – avoids memory spikes per data-pagination best practices */
const CHUNK_SIZE = 500

/** Explicit columns only – avoid SELECT * per query best practices */
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

type RegistrationRow = Record<(typeof REGISTRATION_COLUMNS)[number], unknown>

/**
 * Escape a CSV field per RFC 4180.
 * Wrap in quotes if contains comma, newline, or double quote; escape quotes by doubling.
 */
function escapeCsvField(value: unknown): string {
  const s = value == null ? "" : String(value)
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

/**
 * Convert a row to a CSV line.
 */
function rowToCsvLine(row: RegistrationRow): string {
  return REGISTRATION_COLUMNS.map((col) => escapeCsvField(row[col])).join(",")
}

/**
 * CSV export endpoint for registrations.
 * Requires authenticated session with @nj.sgadi.us domain.
 * Streams data in chunks using keyset pagination (no large offsets).
 *
 * @see docs/TASK_8_VERIFICATION.md
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

  const filename = `registrations-${new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)}.csv`
  headers.set("Content-Type", "text/csv; charset=utf-8")
  headers.set("Content-Disposition", `attachment; filename="${filename}"`)

  const encoder = new TextEncoder()
  const headerLine = REGISTRATION_COLUMNS.join(",") + "\n"

  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode("\uFEFF"))
      controller.enqueue(encoder.encode(headerLine))

      let lastId: number | null = null
      let hasMore = true

      while (hasMore) {
        let query = supabase
          .from("registrations")
          .select(REGISTRATION_COLUMNS.join(", "))
          .order("id", { ascending: true })
          .limit(CHUNK_SIZE)

        if (lastId != null) {
          query = query.gt("id", lastId)
        }

        const { data, error } = await query

        if (error) {
          controller.error(new Error(error.message))
          return
        }

        if (!data || data.length === 0) {
          hasMore = false
          break
        }

        const rows = data as RegistrationRow[]
        const csvChunk = rows.map(rowToCsvLine).join("\n") + (rows.length > 0 ? "\n" : "")
        controller.enqueue(encoder.encode(csvChunk))

        const lastRow = rows[rows.length - 1]
        lastId = typeof lastRow.id === "number" ? lastRow.id : Number(lastRow.id)
        hasMore = rows.length === CHUNK_SIZE
      }

      controller.close()
    },
  })

  return new Response(stream, { headers })
}
