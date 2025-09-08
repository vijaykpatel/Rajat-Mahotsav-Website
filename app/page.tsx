"use client"

import ShaderBackground from "@/components/shader-background"
import Countdown from "@/components/countdown"
import Logo from "@/components/logo"

export default function ShaderShowcase() {
  // Set target date to July 28, 2026 at 5 PM EST
  const targetDate = new Date('2026-07-28T17:00:00-05:00');

  return (
    <ShaderBackground>
      <div className="h-screen w-screen flex flex-col items-center justify-between p-4 relative z-20 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center space-y-[2vh] relative z-30 max-h-[80vh]">
          <div className="max-h-[45vh] landscape:max-h-[45vh] flex items-center justify-center">
            <Logo />
          </div>
          <div className="max-h-[30vh] landscape:max-h-[25vh] landscape:max-w-[80vw] flex items-center justify-center">
            <Countdown targetDate={targetDate} />
          </div>
        </div>
        <div className="flex justify-center relative z-30 items-end pb-2">
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
