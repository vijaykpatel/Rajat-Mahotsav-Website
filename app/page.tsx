"use client"

import ShaderBackground from "@/components/shader-background"
import Countdown from "@/components/countdown"
import Logo from "@/components/logo"
// import HeroContent from "@/components/hero-content"
import { ChevronRight } from "lucide-react"
import { useDeviceType } from "@/hooks/use-device-type"

export default function ShaderShowcase() {
  // Set target date to July 28, 2026 at 5 PM EST
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  return (
    <ShaderBackground>
      <div className="h-screen w-screen flex flex-col items-center justify-center p-4 pt-20 md:pt-24 relative z-20 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center relative z-30 max-h-[80vh] portrait:max-h-[60vh]">
          <div className="max-h-[45vh] landscape:max-h-[45vh] flex items-center justify-start mb-[2vh]">
            <Logo />
          </div>
          <div className="h-[25vh] landscape:h-[20vh] landscape:max-w-[80vw] flex items-center justify-center">
            <Countdown targetDate={targetDate} />
          </div>
          <div className="mt-8 flex justify-center z-30">
            <p className="text-white/80 text-[2.2vw] md:text-[2vw] lg:text-[1.8vw] xl:text-xl font-lato text-center max-w-4xl leading-tight px-4">
              Inspired By: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
            </p>
          </div>
        </div>
      </div>
      {/* <HeroContent /> */}
      {/* <PulsingCircle /> */}
    </ShaderBackground>
  )
}
