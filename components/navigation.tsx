"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ScrollText, ClipboardPen, CalendarDays} from "lucide-react"
import { MenuBar } from "@/components/ui/glow-menu"
import { useDeviceType } from "@/hooks/use-device-type"
import Image from "next/image"

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
    href: "/registration",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: CalendarDays,
    label: "Schedule",
    href: "/schedule",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

export function Navigation() {
  const [activeItem, setActiveItem] = useState<string>("Home")
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const deviceType = useDeviceType()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    // Set active item based on current pathname
    const currentItem = menuItems.find(item => item.href === pathname)
    if (currentItem) {
      setActiveItem(currentItem.label)
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label)
    if (href !== "#") {
      router.push(href)
    }
  }

  return (
    <div className={`fixed top-6 left-0 right-0 z-50 px-4 transition-all duration-300 ease-in-out ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Tilak Logo - Left */}
        <div className="flex-shrink-0">
          <Image
            src="/Tilak.png"
            alt="Tilak Chandlo"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            priority
          />
        </div>

        {/* Center Menu */}
        <div className="flex-1 flex justify-center mx-4">
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

        {/* Maninagar Logo - Right */}
        <div className="flex-shrink-0">
          <Image
            src="/maninagar_logo.png"
            alt="Maninagar Logo"
            width={60}
            height={60}
            className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-18 object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}