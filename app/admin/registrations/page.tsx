import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { isAdminDomainUser } from "@/lib/admin-auth"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { AdminSignIn } from "./AdminSignIn"

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
      redirect("/admin/registrations/unauthorized")
    }
    return (
      <div className="page-bg-extend bg-preset-light-gray min-h-screen">
        <div className="section-shell landing-section">
          <StandardPageHeader
            title="Registrations Admin"
            description="Dashboard and stats will be built in subsequent tasks."
          />
          <div className="mt-8 p-6 rounded-2xl bg-white/80 border border-preset-pale-gray shadow-sm max-w-2xl mx-auto">
            <p className="text-preset-charcoal font-medium">
              Authenticated as{" "}
              <span className="text-preset-deep-navy">{user.email}</span>
            </p>
            <p className="text-sm text-preset-bluish-gray mt-2">
              OAuth flow verified. Server-side session is active.
            </p>
          </div>
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
