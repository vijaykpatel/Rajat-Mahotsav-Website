import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Latest Events",
  description: "Explore our latest community events, religious programs, and temple gatherings as we celebrate 25 years of Shree Swaminarayan Temple Secaucus. View photos, videos, and highlights from recent seva activities, festivals, spiritual programs, cultural celebrations, charity initiatives, health camps, environmental projects, and interfaith events throughout 2025 and 2026. Join us as we build towards the historic Rajat Mahotsav Silver Jubilee celebration from July 27 to August 2, 2026.",
  openGraph: {
    title: "Latest Events | NJ Rajat Mahotsav 2026",
    description: "Explore our latest community events, religious programs, and temple gatherings as we celebrate 25 years of Shree Swaminarayan Temple Secaucus. View photos, videos, and highlights from recent seva activities, festivals, spiritual programs, cultural celebrations, charity initiatives, health camps, environmental projects, and interfaith events throughout 2025 and 2026.",
  },
  alternates: {
    canonical: "/latest-events"
  }
}

export default function LatestEventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
