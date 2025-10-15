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
      
      // Transparent at top, then transition to beige
      const threshold = windowHeight * 2.5
      
      const color = scrollY < threshold ? 'transparent' : 'rgb(235, 232, 219)'
      meta?.setAttribute('content', color)
    }

    updateThemeColor()
    window.addEventListener('scroll', updateThemeColor, { passive: true })
    
    return () => window.removeEventListener('scroll', updateThemeColor)
  }, [])
}
