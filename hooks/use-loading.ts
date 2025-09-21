"use client"

import { useState, useEffect } from "react"

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if this is a new tab/window or first visit
    const hasVisited = sessionStorage.getItem('hasVisited')
    const navigationType = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const isDirectNavigation = navigationType?.type === 'navigate' && !document.referrer
    const isNewTab = !hasVisited && (isDirectNavigation || !document.referrer.includes(window.location.hostname))
    
    if (isNewTab) {
      setIsLoading(true)
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])
  
  return { isLoading, setIsLoading }
}