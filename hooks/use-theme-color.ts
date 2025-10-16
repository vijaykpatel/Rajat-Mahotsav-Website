"use client"

import { useEffect } from "react"

export function useThemeColor() {
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }

    const updateThemeColor = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Period 1-3: Dark slate (#0f172a) - from start to text section 2
      // Period 4+: Warm beige (rgb(235, 232, 219)) - from text section 2 onwards
      const threshold = windowHeight * 2.5 // Approximate transition point
      
      const color = scrollY < threshold ? '#0f172a' : 'rgb(235, 232, 219)'
      meta?.setAttribute('content', color)
    }

    updateThemeColor()
    window.addEventListener('scroll', updateThemeColor, { passive: true })
    
    return () => window.removeEventListener('scroll', updateThemeColor)
  }, [])
}
