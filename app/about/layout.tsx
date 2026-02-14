import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About the Mahotsav",
  description: "Learn about Shree Swaminarayan Temple Secaucus and the NJ Rajat Mahotsav 2026 Silver Jubilee celebration. Discover our 25-year history of spiritual service, community initiatives, mission, values, and the divine programs planned for July 27 - August 2, 2026.",
  alternates: {
    canonical: "/about"
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
