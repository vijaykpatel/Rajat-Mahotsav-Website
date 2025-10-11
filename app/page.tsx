"use client"

import { useState, useEffect, useRef } from "react"
import Countdown from "@/components/countdown"
import RegularLogo from "@/components/regular_logo"
import LoadingScreen from "@/components/loading-screen"
import VideoSection from "@/components/video-section"
import TitleSection from "@/components/title-section"
import ShaderBackground from "@/components/shader-background"
import { useDeviceType } from "@/hooks/use-device-type"

import { useLoading } from "@/hooks/use-loading"

export default function ShaderShowcase() {
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  const { isLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <div className="bg-gradient-to-br from-orange-50 via-white to-red-50">
          {/* Full background image section */}
          <div className="h-screen w-screen relative overflow-hidden">
            {/* Desktop: Static Image */}
            <img
              src="https://imagedelivery.net/vdFY6FzpM3Q9zi31qlYmGA/5aeb6c7e-f6ea-45b1-da4a-823279172400/biggest?format=auto&width=1920&quality=90"
              alt="Background"
              className="hidden md:block absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            
            {/* Mobile: Panning Image */}
            <img
              src="https://imagedelivery.net/vdFY6FzpM3Q9zi31qlYmGA/5aeb6c7e-f6ea-45b1-da4a-823279172400/biggest?format=auto&width=1920&quality=90"
              alt="Background"
              className="md:hidden absolute inset-0 mix-blend-multiply opacity-90 animate-pan-right"
            />
          </div>
          
          {/* Title section */}
          <TitleSection />
          
          {/* Video section */}
          <VideoSection />
        </div>
      )}
    </>
  )
}
