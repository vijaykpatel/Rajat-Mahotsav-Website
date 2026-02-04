"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Table2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
} from "lucide-react"
import { Button } from "@/components/atoms/button"
import { format } from "date-fns"

type RegistrationRow = {
  id: number
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  email: string | null
  mobile_number: string | null
  phone_country_code: string | null
  country: string | null
  ghaam: string | null
  mandal: string | null
  arrival_date: string | null
  departure_date: string | null
  age: number | null
}

type PaginatedResponse = {
  success?: boolean
  rows?: RegistrationRow[]
  pageSize?: number
  nextCursor?: number | null
  prevCursor?: number | null
  hasMore?: boolean
  hasPrev?: boolean
  error?: string
  details?: string
}

const PAGE_SIZE_OPTIONS = [25, 50, 100] as const

function formatDate(val: string | null): string {
  if (!val || val === "Unknown") return val ?? "—"
  try {
    const d = new Date(val + "T12:00:00")
    if (Number.isNaN(d.getTime())) return val
    return format(d, "MMM d, yyyy")
  } catch {
    return val
  }
}

export function AdminRegistrationsTable() {
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<RegistrationRow[]>([])
  const [pageSize, setPageSize] = useState<25 | 50 | 100>(25)
  const [nextCursor, setNextCursor] = useState<number | null>(null)
  const [prevCursor, setPrevCursor] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const fetchPage = useCallback(
    async (cursor: number | null, direction: "next" | "prev" = "next") => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          page_size: String(pageSize),
          direction,
        })
        if (cursor != null) params.set("cursor", String(cursor))

        const res = await fetch(`/api/admin/registrations?${params}`)
        const data: PaginatedResponse = await res.json()

        if (!res.ok) {
          setError(data.error ?? data.details ?? `HTTP ${res.status}`)
          return
        }

        setRows(data.rows ?? [])
        setNextCursor(data.nextCursor ?? null)
        setPrevCursor(data.prevCursor ?? null)
        setHasMore(data.hasMore ?? false)
        setHasPrev(data.hasPrev ?? false)
        setLoaded(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Request failed")
      } finally {
        setLoading(false)
      }
    },
    [pageSize]
  )

  const handleLoadRegistrations = () => {
    fetchPage(null, "next")
  }

  const handleNext = () => {
    if (nextCursor == null || !hasMore) return
    fetchPage(nextCursor, "next")
  }

  const handlePrev = () => {
    if (!hasPrev || prevCursor == null) return
    fetchPage(prevCursor, "prev")
  }

  const handlePageSizeChange = (newSize: 25 | 50 | 100) => {
    if (newSize === pageSize) return
    setPageSize(newSize)
    if (loaded) {
      fetchPage(null, "next")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="p-6 rounded-2xl bg-white/90 border border-preset-pale-gray shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-preset-charcoal flex items-center gap-2">
          <Table2 className="size-5 text-preset-deep-navy" />
          Registrations Table
        </h3>
        <div className="flex items-center gap-3">
          {loaded && (
            <select
              value={pageSize}
              onChange={(e) =>
                handlePageSizeChange(Number(e.target.value) as 25 | 50 | 100)
              }
              className="h-10 rounded-lg border border-preset-pale-gray bg-white px-3 text-sm text-preset-charcoal focus:outline-none focus:ring-2 focus:ring-preset-deep-navy/30"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} per page
                </option>
              ))}
            </select>
          )}
          <a
            href="/api/registrations/export"
            download
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium bg-preset-deep-navy text-white hover:opacity-90 transition-opacity text-sm"
          >
            <Download className="size-4" />
            Export CSV
          </a>
        </div>
      </div>

      {!loaded && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-preset-light-gray/60 border border-preset-pale-gray/50">
          <Database className="size-12 text-preset-bluish-gray mb-4" />
          <p className="text-preset-charcoal font-medium mb-2">
            Table data loads on demand
          </p>
          <p className="text-sm text-preset-bluish-gray mb-6 max-w-sm text-center">
            Click below to fetch the first page of registrations. Stats above
            remain unchanged.
          </p>
          <Button
            onClick={handleLoadRegistrations}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold bg-preset-deep-navy text-white hover:opacity-90 transition-opacity"
          >
            {loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Table2 className="size-5" />
            )}
            {loading ? "Loading…" : "Load registrations"}
          </Button>
        </div>
      )}

      {error && (
        <div className="py-4 px-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {loaded && rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto -mx-2"
          >
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-preset-pale-gray">
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    ID
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Name
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Email
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Ghaam
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Mandal
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Arrival
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Departure
                  </th>
                  <th className="text-left py-3 px-3 font-semibold text-preset-charcoal">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-preset-pale-gray/60 hover:bg-preset-light-gray/40 transition-colors"
                  >
                    <td className="py-3 px-3 text-preset-charcoal font-mono text-xs">
                      {row.id}
                    </td>
                    <td className="py-3 px-3 text-preset-charcoal">
                      {[row.first_name, row.middle_name, row.last_name]
                        .filter(Boolean)
                        .join(" ") || "—"}
                    </td>
                    <td className="py-3 px-3 text-preset-charcoal truncate max-w-[180px]">
                      {row.email ?? "—"}
                    </td>
                    <td className="py-3 px-3 text-preset-charcoal">
                      {row.ghaam ?? "—"}
                    </td>
                    <td className="py-3 px-3 text-preset-charcoal">
                      {row.mandal ?? "—"}
                    </td>
                    <td className="py-3 px-3 text-preset-bluish-gray">
                      {formatDate(row.arrival_date)}
                    </td>
                    <td className="py-3 px-3 text-preset-bluish-gray">
                      {formatDate(row.departure_date)}
                    </td>
                    <td className="py-3 px-3 text-preset-charcoal">
                      {row.age ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-preset-pale-gray">
              <p className="text-sm text-preset-bluish-gray">
                Showing {rows.length} row{rows.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={!hasPrev || loading}
                  className="rounded-full px-4 py-2 border-preset-deep-navy text-preset-deep-navy hover:bg-preset-deep-navy hover:text-white"
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={!hasMore || loading}
                  className="rounded-full px-4 py-2 border-preset-deep-navy text-preset-deep-navy hover:bg-preset-deep-navy hover:text-white"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {loaded && rows.length === 0 && !loading && (
          <p className="py-8 text-center text-preset-bluish-gray">
            No registrations found.
          </p>
        )}
      </AnimatePresence>

      {loaded && loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="size-8 animate-spin text-preset-deep-navy" />
        </div>
      )}
    </motion.div>
  )
}
