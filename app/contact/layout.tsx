import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Shree Swaminarayan Temple Secaucus for questions about the NJ Rajat Mahotsav 2026 celebration. Find our contact information, temple address, event dates, and quick links to registration, schedules, and guest services.",
  alternates: {
    canonical: "/contact"
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
