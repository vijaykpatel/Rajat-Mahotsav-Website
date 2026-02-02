import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Registration",
  description: "Register for the NJ Rajat Mahotsav 2026 celebration at Shree Swaminarayan Temple Secaucus. Join us July 27 - August 2, 2026 for this historic Silver Jubilee event. Submit your registration details including arrival dates, contact information, and mandal affiliation to participate in this divine celebration.",
  openGraph: {
    title: "Event Registration | NJ Rajat Mahotsav 2026",
    description: "Register for the NJ Rajat Mahotsav 2026 celebration at Shree Swaminarayan Temple Secaucus. Join us July 27 - August 2, 2026 for this historic Silver Jubilee event. Submit your registration details including arrival dates, contact information, and mandal affiliation to participate in this divine celebration.",
  },
  alternates: {
    canonical: "/registration"
  }
}

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
