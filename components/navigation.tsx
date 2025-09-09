"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Home, ScrollText, ClipboardPen, CalendarDays} from "lucide-react"
import { MenuBar } from "@/components/ui/glow-menu"
import { useDeviceType } from "@/hooks/use-device-type"

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: ScrollText,
    label: "History",
    href: "/history",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: ClipboardPen,
    label: "Registration",
    href: "#",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: CalendarDays,
    label: "Schedule",
    href: "#",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

export function Navigation() {
  const [activeItem, setActiveItem] = useState<string>("Home")
  const [mounted, setMounted] = useState(false)
  const deviceType = useDeviceType()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label)
    if (href !== "#") {
      router.push(href)
    }
  }

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <MenuBar
        items={menuItems}
        activeItem={activeItem}
        onItemClick={(label) => {
          const item = menuItems.find(item => item.label === label)
          if (item) {
            handleItemClick(label, item.href)
          }
        }}
        showLabels={mounted ? deviceType === 'desktop' : true}
      />
    </div>
  )
}