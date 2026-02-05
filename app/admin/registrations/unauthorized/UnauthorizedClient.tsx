"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { Button } from "@/components/atoms/button"
import { ArrowLeft } from "lucide-react"

const REDIRECT_SECONDS = 5

export function UnauthorizedClient() {
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.replace("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="page-bg-extend reg-page-bg min-h-screen">
      <div className="section-shell landing-section">
        <StandardPageHeader
          title="Access Denied"
          description="Admin access is restricted to @nj.sgadi.us accounts. You will be redirected to the home page shortly."
        />
        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="rounded-2xl admin-card shadow-lg p-8 max-w-md text-center">
            <p className="reg-text-primary text-lg mb-4">
              Redirecting in{" "}
              <span className="font-bold text-[rgb(13,19,45)] tabular-nums">
                {secondsLeft}
              </span>{" "}
              second{secondsLeft !== 1 ? "s" : ""}…
            </p>
            <Button
              onClick={() => router.replace("/")}
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold admin-btn-outline"
              aria-label="Return to home page"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Return home now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
