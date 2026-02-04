"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { Database, Loader2, CheckCircle2, XCircle } from "lucide-react"

interface AdminAuthenticatedViewProps {
  userEmail: string
}

export function AdminAuthenticatedView({ userEmail }: AdminAuthenticatedViewProps) {
  const [testResult, setTestResult] = useState<{
    status: "idle" | "loading" | "success" | "error"
    data?: unknown
    error?: string
  }>({ status: "idle" })

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

  return (
    <div className="mt-8 space-y-6 max-w-2xl mx-auto">
      <div className="p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm">
        <p className="text-preset-charcoal font-medium">
          Authenticated as{" "}
          <span className="text-preset-deep-navy">{userEmail}</span>
        </p>
        <p className="text-sm text-preset-bluish-gray mt-2">
          OAuth flow verified. Server-side session is active.
        </p>
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

        {testResult.status === "success" && testResult.data && (
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
    </div>
  )
}
