"use client"

import { Home, ScrollText, ClipboardPen, CalendarDays, Hotel, Heart, Image as ImageIcon, FileText } from "lucide-react"
import { NavBar } from "@/components/organisms/tubelight-navbar"

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "Timeline", url: "/timeline", icon: ScrollText },
  { name: "Registration", url: "/registration", icon: ClipboardPen },
  { name: "Invitation", url: "/invitation", icon: FileText },
  { name: "Guest Services", url: "/guest-services", icon: Hotel },
  { name: "Schedule", url: "/schedule", icon: CalendarDays },
  { name: "Community Seva", url: "/community-seva", icon: Heart },
  { name: "Media", url: "/media", icon: ImageIcon },
]

export function TubelightNavigation() {
  return <NavBar items={navItems} />
}
