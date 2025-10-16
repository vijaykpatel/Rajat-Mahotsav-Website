"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const currentItem = items.find(item => item.url === pathname)
    if (currentItem) setActiveTab(currentItem.name)
  }, [pathname, items])

  useEffect(() => {
    const saved = localStorage.getItem("navbar-expanded")
    if (saved !== null) setIsExpanded(saved === "true")
    setTimeout(() => setHasAnimated(true), 400)
  }, [])

  useEffect(() => {
    localStorage.setItem("navbar-expanded", String(isExpanded))
  }, [isExpanded])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {/* Backdrop - Mobile Only */}
      {isExpanded && isMobile && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsExpanded(false)}
        />
      )}

      <motion.div className={cn("relative p-4", className)}>
        {isMobile ? (
          /* Mobile: Overlay Menu */
          <>
            <motion.div
              className="flex items-center justify-center w-[60px] h-[56px] bg-navy-accent border-2 border-slate-700/60 backdrop-blur-md rounded-full shadow-lg text-white cursor-pointer z-50 relative"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isExpanded ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute top-20 left-4 z-50 bg-navy-accent border-2 border-slate-700/60 backdrop-blur-md shadow-lg rounded-3xl p-2 w-[240px]"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                <div className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => {
                  setActiveTab(item.name)
                  setIsExpanded(false)
                }}
                onMouseEnter={() => !isMobile && setHoveredTab(item.name)}
                onMouseLeave={() => !isMobile && setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-base font-semibold rounded-full transition-colors flex items-center",
                  "text-white/80 hover:text-white",
                  isActive && "text-white",
                  isMobile ? "px-4 py-3 w-full justify-start" : "px-5 py-3 whitespace-nowrap justify-center"
                )}
              >
                <Icon size={20} strokeWidth={2.5} className="mr-2" />
                <span>{item.name}</span>
                {(isActive || (!isMobile && isHovered)) && (
                  <motion.div
                    layoutId="lamp"
                    className={cn(
                      "absolute inset-0 w-full rounded-full -z-10",
                      isActive ? "bg-red-500/20" : "bg-red-500/10"
                    )}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-1.5 h-10 bg-red-500 rounded-l-full shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                      <div className="absolute h-16 w-8 bg-red-500/50 rounded-full blur-lg -left-3 -top-3" />
                      <div className="absolute h-12 w-8 bg-red-500/50 rounded-full blur-lg -left-2" />
                      <div className="absolute h-6 w-6 bg-red-500/60 rounded-full blur-md top-2 left-0" />
                    </div>
                  </motion.div>
                )}
              </Link>
            )
          })}
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Desktop: Inline Expanding Menu */
          <motion.div
            className="flex items-center gap-3 bg-navy-accent border-2 border-slate-700/60 backdrop-blur-md rounded-full shadow-lg"
            initial={false}
            animate={{ width: isExpanded ? "auto" : "60px", height: "56px" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="flex items-center justify-center min-w-[56px] h-full text-white cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                {isExpanded ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
              </motion.div>
            </motion.div>
            {isExpanded && (
              <motion.div
                className="flex flex-row items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.name
                  const isHovered = hoveredTab === item.name
                  return (
                    <Link
                      key={item.name}
                      href={item.url}
                      onClick={() => setActiveTab(item.name)}
                      onMouseEnter={() => setHoveredTab(item.name)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className="relative cursor-pointer text-base font-semibold px-5 py-3 rounded-full transition-colors whitespace-nowrap flex items-center justify-center text-white/80 hover:text-white"
                    >
                      <Icon size={20} strokeWidth={2.5} className="mr-2" />
                      <span>{item.name}</span>
                      {(isHovered || (!hoveredTab && isActive)) && (
                        <motion.div
                          layoutId="lamp"
                          className="absolute inset-0 w-full bg-red-500/35 rounded-full -z-10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={hasAnimated ? { type: "spring", stiffness: 300, damping: 30 } : { delay: 0.15, duration: 0.2 }}
                        >
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-red-500 rounded-t-full shadow-[0_0_10px_rgba(239,68,68,0.8)]">
                            <div className="absolute w-16 h-8 bg-red-500/50 rounded-full blur-lg -top-3 -left-3" />
                            <div className="absolute w-12 h-8 bg-red-500/50 rounded-full blur-lg -top-2" />
                            <div className="absolute w-6 h-6 bg-red-500/60 rounded-full blur-md top-0 left-2" />
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
