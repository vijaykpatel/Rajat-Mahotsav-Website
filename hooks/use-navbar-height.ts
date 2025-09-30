"use client"

import { useState, useEffect } from "react"

export function useNavbarHeight() {
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [dynamicPadding, setDynamicPadding] = useState("120px")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('[data-navbar]')
      if (navbar) {
        const rect = navbar.getBoundingClientRect()
        const navbarBottom = rect.bottom
        const viewportHeight = window.innerHeight
        const additionalPadding = viewportHeight * 0.04
        const totalPadding = navbarBottom + additionalPadding
        
        setNavbarHeight(rect.height)
        setDynamicPadding(`${totalPadding}px`)
      }
    }

    updateNavbarHeight()
    window.addEventListener('resize', updateNavbarHeight)
    
    const observer = new MutationObserver(updateNavbarHeight)
    const navbar = document.querySelector('[data-navbar]')
    if (navbar) {
      observer.observe(navbar, { childList: true, subtree: true, attributes: true })
    }

    return () => {
      window.removeEventListener('resize', updateNavbarHeight)
      observer.disconnect()
    }
  }, [mounted])

  return { navbarHeight, dynamicPadding: mounted ? dynamicPadding : "120px" }
}