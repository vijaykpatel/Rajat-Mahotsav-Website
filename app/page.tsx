"use client"

import ShaderBackground from "@/components/shader-background"
import Countdown from "@/components/countdown"
import Logo from "@/components/logo"
import { ChevronRight } from "lucide-react"
import { useDeviceType } from "@/hooks/use-device-type"

export default function ShaderShowcase() {
  // Set target date to July 28, 2026 at 5 PM EST
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  return (
    <ShaderBackground>
      <div className="h-screen w-screen flex flex-col items-center justify-center p-4 pt-32 md:pt-24 relative z-20 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center space-y-[2vh] relative z-30 max-h-[80vh] portrait:max-h-[60vh]">
          <div className="max-h-[45vh] landscape:max-h-[45vh] flex items-center justify-start">
            <Logo />
          </div>
          <div className="max-h-[25vh] landscape:max-h-[20vh] landscape:max-w-[80vw] flex items-center justify-start">
            <Countdown targetDate={targetDate} />
          </div>
        </div>
        
        {/* Enter Site Button */}
        {/* <div className={`flex justify-center z-40 mb-4 landscape:mb-2 ${deviceType === 'mobile' ? 'px-4 landscape:px-0' : ''}`}>
          <button className={`flex items-center justify-center px-4 py-2 text-white/90 hover:text-white transition-colors duration-200 bg-transparent backdrop-blur-md rounded-xl border-2 border-white/30 shadow-[0_0_20px_rgba(232,232,232,0.3)] hover:shadow-[0_0_30px_rgba(232,232,232,0.5)] hover:border-white/50 ${deviceType === 'mobile' ? 'w-full landscape:w-auto landscape:max-w-[80vw]' : 'w-auto'}`}>
            Enter Site
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div> */}
        
        <div className="flex justify-center relative z-30 items-end pb-4 portrait:pb-8">
          <p className="text-white/80 text-[2.5vw] md:text-[1.5vw] lg:text-[1.2vw] xl:text-base font-lato text-center max-w-4xl leading-tight">
            Inspirator: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
          </p>
        </div>
      </div>
      {/* <HeroContent /> */}
      {/* <PulsingCircle /> */}
    </ShaderBackground>
  )
}
