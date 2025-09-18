"use client"

import { useState, useEffect } from "react"

export function useLoading() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasVisited')
    }
    return true
  })

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true')
    } else {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, setIsLoading }
}