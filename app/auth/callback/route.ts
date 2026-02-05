import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/utils/supabase/server"

/**
 * OAuth callback route. Exchanges auth code for session and redirects.
 * Add these to Supabase Auth redirect allow list (wildcard for query params):
 * - http://localhost:3000/auth/callback** (local)
 * - https://njrajatmahotsav.com/auth/callback** (prod)
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const queryNext = searchParams.get("next")
  let next = queryNext ?? "/"
  if (!queryNext) {
    const cookieStore = await cookies()
    const cookieNext = cookieStore.get("rm-auth-next")?.value
    if (cookieNext) next = decodeURIComponent(cookieNext)
  }
  if (!next.startsWith("/") || next.includes("//") || next.includes(":")) {
    next = "/"
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error("[auth/callback] exchangeCodeForSession error:", error.message)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  const forwardedHost = request.headers.get("x-forwarded-host")
  const requestHost = request.headers.get("host")
  const effectiveHost = forwardedHost ?? requestHost ?? new URL(request.url).host
  const isLocalEnv = process.env.NODE_ENV === "development"

  const redirectUrl = isLocalEnv
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`

  // Diagnostics for "falls back to /" cases: usually missing cookie due to host mismatch (www vs apex)
  // or query param not present. Avoid logging the auth code.
  if (process.env.NODE_ENV !== "production") {
    console.info("[auth/callback] redirect decision", {
      origin,
      effectiveHost,
      hasQueryNext: !!queryNext,
      next,
    })
  }

  const response = NextResponse.redirect(redirectUrl)
  const clearCookieOptions: Parameters<typeof response.cookies.set>[2] = {
    path: "/",
    maxAge: 0,
  }
  if (effectiveHost.endsWith("njrajatmahotsav.com")) {
    clearCookieOptions.domain = ".njrajatmahotsav.com"
  }
  response.cookies.set("rm-auth-next", "", clearCookieOptions)
  return response
}
