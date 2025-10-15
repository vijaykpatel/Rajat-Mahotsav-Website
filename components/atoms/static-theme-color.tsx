"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function StaticThemeColor() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Skip homepage - it has its own dynamic theme color
    if (pathname === "/") return
    
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', 'rgba(248, 248, 248, 0.85)')
    
    // Cleanup not needed - homepage will take over when navigating back
  }, [pathname])
  
  return null
}
