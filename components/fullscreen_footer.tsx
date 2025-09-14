"use client"

import ShaderBackground from "@/components/shader-background"
import LoadingScreen from "@/components/loading-screen"
import VerticalCountdown from "@/components/vertical-countdown"
import WhiteLogo from "@/components/white_logo"
import { Youtube, Instagram, Facebook } from "lucide-react"
import { useDeviceType } from "@/hooks/use-device-type"

export default function FullscreenFooter() {
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  return (
    <>
      <LoadingScreen />
      <ShaderBackground>
        <div className="h-screen w-full flex flex-col relative z-20">
          
          {/* Top 40% - Tri Murti Image */}
          <div className="h-[40vh] flex items-center justify-center">
            <img 
              src="/tri_murti.png" 
              alt="Tri Murti" 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          
          {/* Middle 40% - Countdown and Logo Split 50-50 */}
          <div className="h-[40vh] flex">
            <div className="w-1/2 flex items-center justify-center">
              <VerticalCountdown targetDate={targetDate} />
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <WhiteLogo />
            </div>
          </div>
          
          {/* Bottom 20% - Text and Contact */}
          <div className="h-[20vh] flex flex-col">
            <div className="flex-1 flex items-center justify-center px-2">
              <p className="text-white font-bold text-lg md:text-xl lg:text-2xl font-lato text-center whitespace-nowrap">
                Inspired By: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
              </p>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm py-4 px-6">
              <div className="flex justify-center">
                <div className="flex space-x-6">
                  <a href="https://www.youtube.com/@SwaminarayanGadi" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                    <Youtube size={32} />
                  </a>
                  <a href="https://www.instagram.com/sgadinewjersey/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">
                    <Instagram size={32} />
                  </a>
                  <a href="#" className="text-white/80 hover:text-white">
                    <Facebook size={32} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </ShaderBackground>
    </>
  )
}