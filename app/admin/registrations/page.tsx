import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"
import { logAdminAccessDenied } from "@/lib/admin-access-log"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { AdminSignIn } from "./AdminSignIn"
import { AdminDashboardStats } from "./AdminDashboardStats"
import { REGISTRATION_DATE_RANGE } from "@/lib/registration-date-range"
import type { RegistrationsStats } from "./types"

export const dynamic = "force-dynamic"

export default async function AdminRegistrationsPage() {
  let supabase
  try {
    supabase = await createClient()
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Supabase is not configured."
    return (
      <div className="page-bg-extend bg-preset-light-gray min-h-screen">
        <div className="section-shell landing-section">
          <StandardPageHeader
            title="Admin Access"
            description={message}
          />
          <p className="text-sm text-preset-bluish-gray mt-4 text-center max-w-lg mx-auto">
            Ensure .env.local is in the project root (where you run npm run dev)
            and restart the dev server after changes.
          </p>
        </div>
      </div>
    )
  }
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    if (!isAdminDomainUser(user)) {
      const headersList = await headers()
      await logAdminAccessDenied(user, {
        userAgent: headersList.get("user-agent"),
        ip:
          headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          headersList.get("x-real-ip"),
      })
      redirect("/admin/registrations/unauthorized")
    }

    // Fetch stats server-side (single RPC, no client refetch)
    let stats: RegistrationsStats | null = null
    const { data: statsData, error: statsError } = await supabase.rpc(
      "get_registrations_stats",
      {
        p_start_date: REGISTRATION_DATE_RANGE.start,
        p_end_date: REGISTRATION_DATE_RANGE.end,
      }
    )
    if (!statsError && statsData) {
      stats = statsData as RegistrationsStats
    }

    return (
      <div className="page-bg-extend bg-preset-light-gray min-h-screen">
        <div className="section-shell landing-section">
          <StandardPageHeader
            title="Registrations Admin"
            description="Insights and registration statistics for NJ Rajat Mahotsav."
          />
          {stats ? (
            <AdminDashboardStats stats={stats} userEmail={user.email ?? ""} />
          ) : (
            <div className="mt-8 p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm text-center">
              <p className="text-preset-charcoal">
                {statsError
                  ? `Unable to load stats: ${statsError.message}`
                  : "No stats data available."}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page-bg-extend bg-preset-light-gray min-h-screen">
      <div className="section-shell landing-section">
        <StandardPageHeader
          title="Admin Access"
          description="Sign in with your @nj.sgadi.us Google account to view registrations."
        />
        <div className="mt-12 flex justify-center">
          <AdminSignIn />
        </div>
      </div>
    </div>
  )
}
