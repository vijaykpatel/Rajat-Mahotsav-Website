"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ScrollText, ClipboardPen, CalendarDays, Hotel, Heart, Image as ImageIcon, Menu, X } from "lucide-react"
import { PiHandsPraying } from "react-icons/pi"
import { useDeviceType } from "@/hooks/use-device-type"
import { motion, AnimatePresence } from "framer-motion"
import { NavBar } from "@/components/ui/tubelight-navbar"
import { CDN_ASSETS } from "@/lib/cdn-assets"

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
    label: "Timeline",
    href: "/timeline",
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
    icon: Hotel,
    label: "Accommodations",
    href: "/accommodations",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: CalendarDays,
    label: "Schedule",
    href: "/schedule",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
  {
    icon: Heart,
    label: "Community Service",
    href: "/community-service",
    gradient:
      "radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(249,115,22,0.06) 50%, rgba(234,88,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: PiHandsPraying,
    label: "Spiritual Seva",
    href: "/spiritual-seva",
    gradient:
      "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: ImageIcon,
    label: "Media",
    href: "/media",
    gradient:
      "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
    iconColor: "text-pink-500",
  },
]

export function Navigation() {
  const [activeItem, setActiveItem] = useState<string>("Home")
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const deviceType = useDeviceType()
  const router = useRouter()
  const pathname = usePathname()



  useEffect(() => {
    setMounted(true)
    const currentItem = menuItems.find(item => item.href === pathname)
    if (currentItem) {
      setActiveItem(currentItem.label)
    }
  }, [pathname])



  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label)
    setIsMobileMenuOpen(false)
    if (href !== "#") {
      router.push(href)
    }
  }

  const isMobile = mounted && deviceType !== 'desktop'

  return (
    <>
      <nav 
        data-navbar
        className={`relative w-full z-50 py-3 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          paddingLeft: 'var(--nav-padding)', 
          paddingRight: 'var(--nav-padding)' 
        }}
      >
        <style jsx>{`
          nav[data-navbar] {
            --nav-padding: 2vw;
          }
          @media (min-width: 1024px) {
            nav[data-navbar] {
              --nav-padding: 2vw;
            }
          }
        `}</style>
        <div className="flex items-center justify-between w-full">

          {/* Left Side - Tubelight Navbar */}
          <NavBar items={menuItems.map(item => ({ name: item.label, url: item.href, icon: item.icon }))} />

          {/* Center - Empty space for better balance */}
          <div className="flex-1"></div>

          {/* Right Side - Both Logos */}
          <div className="flex items-center gap-3">
            <img
              src={CDN_ASSETS.mainLogoNoText}
              alt="Main Logo"
              width="144"
              height="144"
              className="h-22 w-auto sm:h-26 md:h-30 lg:h-36 object-contain"
            />
            <div className="h-16 w-px bg-white/40 sm:h-20 md:h-24 lg:h-30 "></div>
            <img
              src={CDN_ASSETS.maningarLogo}
              alt="Maninagar Logo"
              width="144"
              height="144"
              className="h-22 w-auto sm:h-26 md:h-30 lg:h-36 object-contain"
            />
          </div>
        </div>
      </nav>
    </>
  )
}