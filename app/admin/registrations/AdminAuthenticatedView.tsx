"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"
import { Button } from "@/components/atoms/button"
import { Database, BarChart3, Loader2, CheckCircle2, XCircle, LogOut } from "lucide-react"

interface AdminAuthenticatedViewProps {
  userEmail: string
}

export function AdminAuthenticatedView({ userEmail }: AdminAuthenticatedViewProps) {
  const router = useRouter()
  const [testResult, setTestResult] = useState<{
    status: "idle" | "loading" | "success" | "error"
    data?: unknown
    error?: string
  }>({ status: "idle" })
  const [statsResult, setStatsResult] = useState<{
    status: "idle" | "loading" | "success" | "error"
    data?: unknown
    error?: string
  }>({ status: "idle" })
  const [deniedLogResult, setDeniedLogResult] = useState<{
    status: "idle" | "loading" | "success" | "error"
    data?: unknown
    error?: string
  }>({ status: "idle" })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const runTest = async () => {
    setTestResult({ status: "loading" })
    try {
      const res = await fetch("/api/admin/test-read")
      const data = await res.json()
      if (!res.ok) {
        setTestResult({
          status: "error",
          error: data.error ?? data.message ?? `HTTP ${res.status}`,
        })
        return
      }
      setTestResult({ status: "success", data })
    } catch (err) {
      setTestResult({
        status: "error",
        error: err instanceof Error ? err.message : "Request failed",
      })
    }
  }

  const runDeniedLogTest = async () => {
    setDeniedLogResult({ status: "loading" })
    try {
      const res = await fetch("/api/admin/test-read-denied-log")
      const data = await res.json()
      if (!res.ok) {
        setDeniedLogResult({
          status: "error",
          error: data.error ?? data.message ?? data.hint ?? `HTTP ${res.status}`,
        })
        return
      }
      setDeniedLogResult({ status: "success", data })
    } catch (err) {
      setDeniedLogResult({
        status: "error",
        error: err instanceof Error ? err.message : "Request failed",
      })
    }
  }

  const runStatsTest = async () => {
    setStatsResult({ status: "loading" })
    try {
      const res = await fetch("/api/admin/stats")
      const data = await res.json()
      if (!res.ok) {
        setStatsResult({
          status: "error",
          error: data.error ?? data.message ?? `HTTP ${res.status}`,
        })
        return
      }
      setStatsResult({ status: "success", data })
    } catch (err) {
      setStatsResult({
        status: "error",
        error: err instanceof Error ? err.message : "Request failed",
      })
    }
  }

  return (
    <div className="mt-8 space-y-6 max-w-2xl mx-auto">
      <div className="p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-preset-charcoal font-medium">
            Authenticated as{" "}
            <span className="text-preset-deep-navy">{userEmail}</span>
          </p>
          <p className="text-sm text-preset-bluish-gray mt-2">
            OAuth flow verified. Server-side session is active.
          </p>
        </div>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-medium border-preset-deep-navy text-preset-deep-navy hover:bg-preset-deep-navy hover:text-white transition-colors"
        >
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>

      <div className="p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm">
        <h3 className="text-lg font-semibold text-preset-charcoal mb-2 flex items-center gap-2">
          <Database className="size-5 text-preset-deep-navy" />
          Supabase read test
        </h3>
        <p className="text-sm text-preset-bluish-gray mb-4">
          Verifies server client and RLS: reads 1 row from registrations (read-only).
        </p>
        <Button
          onClick={runTest}
          disabled={testResult.status === "loading"}
          className="rounded-full px-6 py-3 font-semibold bg-preset-deep-navy text-white hover:opacity-90 transition-opacity"
        >
          {testResult.status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Testing…
            </>
          ) : (
            "Test connection"
          )}
        </Button>

        {testResult.status === "success" && testResult.data !== undefined && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="flex items-center gap-2 text-green-800 font-medium mb-2">
              <CheckCircle2 className="size-4" />
              Read successful
            </p>
            <pre className="text-xs text-preset-charcoal overflow-x-auto">
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          </div>
        )}

        {testResult.status === "error" && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="flex items-center gap-2 text-red-800 font-medium">
              <XCircle className="size-4" />
              {testResult.error}
            </p>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm">
        <h3 className="text-lg font-semibold text-preset-charcoal mb-2 flex items-center gap-2">
          <Database className="size-5 text-preset-deep-navy" />
          Denied log read test
        </h3>
        <p className="text-sm text-preset-bluish-gray mb-4">
          Verifies admin client and admin_access_denied table: reads 1 row (read-only).
        </p>
        <Button
          onClick={runDeniedLogTest}
          disabled={deniedLogResult.status === "loading"}
          className="rounded-full px-6 py-3 font-semibold bg-preset-deep-navy text-white hover:opacity-90 transition-opacity"
        >
          {deniedLogResult.status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Testing…
            </>
          ) : (
            "Test denied log"
          )}
        </Button>

        {deniedLogResult.status === "success" && deniedLogResult.data !== undefined && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="flex items-center gap-2 text-green-800 font-medium mb-2">
              <CheckCircle2 className="size-4" />
              Read successful
            </p>
            <pre className="text-xs text-preset-charcoal overflow-x-auto">
              {JSON.stringify(deniedLogResult.data, null, 2)}
            </pre>
          </div>
        )}

        {deniedLogResult.status === "error" && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="flex items-center gap-2 text-red-800 font-medium">
              <XCircle className="size-4" />
              {deniedLogResult.error}
            </p>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm">
        <h3 className="text-lg font-semibold text-preset-charcoal mb-2 flex items-center gap-2">
          <BarChart3 className="size-5 text-preset-deep-navy" />
          Stats RPC test
        </h3>
        <p className="text-sm text-preset-bluish-gray mb-4">
          Verifies get_registrations_stats RPC: aggregated metrics (read-only).
        </p>
        <Button
          onClick={runStatsTest}
          disabled={statsResult.status === "loading"}
          className="rounded-full px-6 py-3 font-semibold bg-preset-deep-navy text-white hover:opacity-90 transition-opacity"
        >
          {statsResult.status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Loading stats…
            </>
          ) : (
            "Test stats"
          )}
        </Button>

        {statsResult.status === "success" && statsResult.data !== undefined && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="flex items-center gap-2 text-green-800 font-medium mb-2">
              <CheckCircle2 className="size-4" />
              Stats loaded
            </p>
            <pre className="text-xs text-preset-charcoal overflow-x-auto max-h-64 overflow-y-auto">
              {JSON.stringify(statsResult.data, null, 2)}
            </pre>
          </div>
        )}

        {statsResult.status === "error" && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="flex items-center gap-2 text-red-800 font-medium">
              <XCircle className="size-4" />
              {statsResult.error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
