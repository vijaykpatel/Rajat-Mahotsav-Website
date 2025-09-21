"use client"

import { useState, useEffect } from "react"
import { useNavbarHeight } from "@/hooks/use-navbar-height"

export default function SchedulePage() {
  const { dynamicPadding } = useNavbarHeight()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`scroll-smooth relative transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
      {/* White screen with centered text */}
      <div className="h-screen w-screen bg-white flex items-center justify-center" style={{ paddingTop: dynamicPadding }}>
        <h1 className="text-black text-4xl md:text-6xl lg:text-7xl font-bold text-center">
          Jay Shree Swaminarayan
        </h1>
      </div>
    </div>
  )
}