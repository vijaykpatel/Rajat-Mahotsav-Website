"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Home, ScrollText, ClipboardPen, CalendarDays, Hotel, Menu, X } from "lucide-react"
import { useDeviceType } from "@/hooks/use-device-type"
import { motion, AnimatePresence } from "framer-motion"
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
    label: "Guest Services",
    href: "/guest-services",
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
      <div 
        data-navbar
        className={`absolute top-0 left-0 right-0 z-50 pt-3 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          paddingLeft: 'var(--nav-padding)', 
          paddingRight: 'var(--nav-padding)' 
        }}
      >
        <style jsx>{`
          div[data-navbar] {
            --nav-padding: 3vw;
          }
          @media (min-width: 1024px) {
            div[data-navbar] {
              --nav-padding: 2vw;
            }
          }
        `}</style>
        <div className="flex items-center justify-between w-full">

          {/* Left Side - Hamburger Menu */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 rounded-xl bg-black/20 backdrop-blur-md border-2 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6 text-white" />
          </motion.button>

          {/* Center - Empty space for better balance */}
          <div className="flex-1"></div>

                  {/* oild Center - Main Logo */}
          {/* <div className="flex justify-center px-4">
            <Image
              src="/main_logo.png"
              alt="Main Logo"
              width={200}
              height={200}
              className="max-h-30 max-w-full w-auto h-auto sm:max-h-36 md:max-h-42 lg:max-h-48 xl:max-h-54 object-contain"
              priority
            />
          </div> */}

          {/* Right Side - Both Logos */}
          <div className="flex items-center gap-3">
            <Image
              src="/main_logo.png"
              alt="Main Logo"
              width={80}
              height={80}
              className="h-16 w-auto sm:h-20 md:h-30 lg:h-40 object-contain"
              priority
            />
            <div className="h-10 w-px bg-white/40 sm:h-14 md:h-24 lg:h-30 "></div>
            <Image
              src="/maninagar_logo.png"
              alt="Maninagar Logo"
              width={80}
              height={80}
              className="h-16 w-auto sm:h-20 md:h-30 lg:h-40 object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full backdrop-blur-xl bg-white/10 border-r-4 border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] z-50 p-6"
            >
              {/* Close Button */}
              <div className="flex justify-start mb-8">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-black/20 backdrop-blur-md border-2 border-white/40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.button>
              </div>

              {/* Vertical Menu Items */}
              <nav className="space-y-4">
                {menuItems.map((item, index) => {
                  const Icon = item.icon
                  const isActive = item.label === activeItem

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.button
                        onClick={() => handleItemClick(item.label, item.href)}
                        className="w-full block rounded-xl overflow-visible group relative"
                        style={{ perspective: "600px" }}
                        whileHover="hover"
                        initial="initial"
                      >
                        <motion.div
                          className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          style={{
                            background: item.gradient,
                          }}
                        />
                        <div className="flex items-center gap-4 px-6 py-4 relative z-10 bg-transparent transition-colors rounded-xl font-bold text-lg antialiased text-white/90 group-hover:text-white group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          <span className={`transition-colors duration-300 ${isActive ? item.iconColor : "text-foreground"} group-hover:${item.iconColor}`}>
                            <Icon className="h-6 w-6" />
                          </span>
                          <span>{item.label}</span>
                        </div>
                      </motion.button>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}