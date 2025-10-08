"use client"

import { Home, ScrollText, ClipboardPen, CalendarDays, Hotel, Heart, Image as ImageIcon } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Timeline", url: "/timeline", icon: ScrollText },
  { name: "Registration", url: "/registration", icon: ClipboardPen },
  { name: "Accommodations", url: "/accommodations", icon: Hotel },
  { name: "Schedule", url: "/schedule", icon: CalendarDays },
  { name: "Community Service", url: "/community-service", icon: Heart },
  { name: "Media", url: "/media", icon: ImageIcon },
]

export function TubelightNavigation() {
  return <NavBar items={navItems} />
}
