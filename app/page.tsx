"use client"

import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import Countdown from "@/components/countdown"
import Title from "@/components/stay-tuned-text"
import Logo from "@/components/logo"

export default function ShaderShowcase() {
  // Set target date to July 28, 2026 at 5 PM EST
  const targetDate = new Date('2026-07-28T17:00:00-05:00');

  return (
    <ShaderBackground>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 -mt-16 lg:-mt-24">
        <Title />
        <Logo />
        <Countdown targetDate={targetDate} />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 px-4">
        <p className="text-white/80 text-[10px] sm:text-sm font-lato text-center max-w-4xl leading-tight">
          Inspirator: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
        </p>
      </div>
      {/* <HeroContent /> */}
      {/* <PulsingCircle /> */}
    </ShaderBackground>
  )
}
