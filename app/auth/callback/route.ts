import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

/**
 * OAuth callback route. Exchanges auth code for session and redirects.
 * Add this URL to Supabase Auth redirect allow list:
 * - http://localhost:3000/auth/callback (local)
 * - https://njrajatmahotsav.com/auth/callback (prod)
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

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

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`)
  }
  if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`)
  }
  return NextResponse.redirect(`${origin}${next}`)
}
