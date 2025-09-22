"use client"

import { useState, useEffect } from "react"
import Countdown from "@/components/countdown"
import RegularLogo from "@/components/regular_logo"
import LoadingScreen from "@/components/loading-screen"
import VideoSection from "@/components/video-section"
import TitleSection from "@/components/title-section"
import ShaderBackground from "@/components/shader-background"
import { useDeviceType } from "@/hooks/use-device-type"
import { useNavbarHeight } from "@/hooks/use-navbar-height"
import { useLoading } from "@/hooks/use-loading"

export default function ShaderShowcase() {
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();
  const { dynamicPadding } = useNavbarHeight();
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
        <>
          {/* First page with shader background - countdown */}
          <ShaderBackground>
            <div className="h-vh w-screen flex flex-col items-center justify-center p-4 relative z-20" style={{ paddingTop: dynamicPadding }}>
              <div className={`flex-1 flex flex-col items-center justify-center relative z-30 max-h-[80vh] portrait:max-h-[60vh] transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="max-h-[45vh] landscape:max-h-[45vh] flex items-center justify-start mb-[2vh]">
                <RegularLogo />
              </div>
              <div className="h-[25vh] landscape:h-[20vh] landscape:max-w-[80vw] flex items-center justify-center">
                <Countdown targetDate={targetDate} />
              </div>

              </div>
            </div>
          </ShaderBackground>
          
          {/* Title section */}
          <TitleSection />
          
          {/* Video section */}
          <VideoSection />
        </>
      )}
    </>
  )
}
