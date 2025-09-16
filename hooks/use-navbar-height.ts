"use client"

import { useState, useEffect } from "react"

export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [dynamicPadding, setDynamicPadding] = useState("0px")

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('[data-navbar]')
      if (navbar) {
        const rect = navbar.getBoundingClientRect()
        const navbarBottom = rect.bottom // This includes the top-6 offset
        const viewportHeight = window.innerHeight
        const additionalPadding = viewportHeight * 0.015 // 2% of viewport height
        const totalPadding = navbarBottom + additionalPadding
        
        setNavbarHeight(rect.height)
        setDynamicPadding(`${totalPadding}px`)
      }
    }

    // Initial calculation
    updateNavbarHeight()

    // Update on resize
    window.addEventListener('resize', updateNavbarHeight)
    
    // Update when navbar content changes (logo loads, etc.)
    const observer = new MutationObserver(updateNavbarHeight)
    const navbar = document.querySelector('[data-navbar]')
    if (navbar) {
      observer.observe(navbar, { childList: true, subtree: true, attributes: true })
    }

    return () => {
      window.removeEventListener('resize', updateNavbarHeight)
      observer.disconnect()
    }
  }, [])

  return { navbarHeight, dynamicPadding }
}