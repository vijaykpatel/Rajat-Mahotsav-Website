"use client"

import { useState, useEffect, useRef } from "react"
import LoadingScreen from "@/components/loading-screen"
import VideoSection from "@/components/video-section"
import TitleSection from "@/components/title-section"
import { useDeviceType } from "@/hooks/use-device-type"
import { getCloudflareImage } from "@/lib/cdn-assets"
import "@/styles/registration-theme.css"

import { useLoading } from "@/hooks/use-loading"

export default function ShaderShowcase() {
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  const { isLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false)
  
  const backgroundImageUrl = `${getCloudflareImage("5aeb6c7e-f6ea-45b1-da4a-823279172400")}&width=1920`

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <div className="reg-page-bg page-bg-extend">
          {/* Title section */}
          <TitleSection />
          
          {/* Full background Sihasan image section */}
          <div className="h-screen w-screen relative overflow-hidden">
            {/* Desktop: Static Image */}
            <img
              src={backgroundImageUrl}
              alt="Background"
              className="hidden md:block absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            
            {/* Mobile: Panning Sihasan Image */}
            <img
              src={backgroundImageUrl}
              alt="Background"
              className="md:hidden absolute inset-0 mix-blend-multiply opacity-90 animate-pan-right"
            />
          </div>
          
          {/* Video section */}
          <VideoSection />
        </div>
      )}
    </>
  )
}
