"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ScrollText, ClipboardPen, CalendarDays, Hotel, Heart, Image } from "lucide-react"
import { PiHandsPraying } from "react-icons/pi"
import { useRouter, usePathname } from "next/navigation"

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ScrollText, label: "Timeline", href: "/timeline" },
  { icon: ClipboardPen, label: "Registration", href: "/registration" },
  { icon: Hotel, label: "Accommodations", href: "/accommodations" },
  { icon: CalendarDays, label: "Schedule", href: "/schedule" },
  { icon: Heart, label: "Community Service", href: "/community-service" },
  { icon: PiHandsPraying, label: "Spiritual Seva", href: "/spiritual-seva" },
  { icon: Image, label: "Media", href: "/media" },
]

export function FloatingMenuButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const rafRef = useRef<number>()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            const element = document.elementFromPoint(50, window.innerHeight - 100)
            if (element) {
              const styles = window.getComputedStyle(element)
              const bgColor = styles.backgroundColor
              
              if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                const rgb = bgColor.match(/\d+/g)
                if (rgb) {
                  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
                  setIsDarkBackground(brightness < 128)
                }
              }
            }
          })
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleMenuItemClick = (href: string) => {
    setIsMenuOpen(false)
    router.push(href)
  }

  const bgClass = isDarkBackground ? 'bg-black/20 hover:bg-black/30' : 'bg-white/20 hover:bg-white/30'
  const textClass = isDarkBackground ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed bottom-20 left-6 z-40 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${bgClass} ${textClass} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isMenuOpen && isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-39"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className={`fixed bottom-36 left-6 z-40 rounded-2xl backdrop-blur-sm ${bgClass} p-2 shadow-lg`}
            >
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = item.href === pathname
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleMenuItemClick(item.href)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${textClass} ${
                        isActive ? 'bg-white/20' : 'hover:bg-white/15 hover:scale-105'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                    </button>
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
