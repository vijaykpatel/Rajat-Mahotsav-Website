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
  const isLocalEnv = process.env.NODE_ENV === "development"

  const redirectUrl = isLocalEnv
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set("rm-auth-next", "", { path: "/", maxAge: 0 })
  return response
}
