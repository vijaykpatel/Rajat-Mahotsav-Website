import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Shree Swaminarayan Temple Secaucus collects, uses, and protects your personal information for the NJ Rajat Mahotsav 2026 celebration. Our privacy policy outlines your rights, data security measures, and how we handle event registration information.",
  alternates: {
    canonical: "/privacy"
  }
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
