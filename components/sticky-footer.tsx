"use client"

import Image from "next/image"

export default function StickyFooter() {
  return (
    <footer className="backdrop-blur-xl border-t-4 border-white/40 md:shadow-[0_0_40px_rgba(255,255,255,0.3)]" style={{backgroundColor: 'rgba(248, 248, 248, 0.85)'}}>
      <div className="grid grid-cols-3 items-start py-1 px-6 gap-4">
        {/* Left Column */}
        <div className="space-y-1">
          <span className="text-sm text-gray-800">Shree Swaminarayan Temple Secaucus, NJ</span>
          <div className="text-sm text-gray-800">
            200 Swamibapa Way, Secaucus, NJ 07094
          </div>
        </div>

        {/* Center Column */}
        <div className="text-center pt-1">
          <span className="text-base text-gray-800">
            Inspired By: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
          </span>
        </div>

        {/* Right Column */}
        <div className="space-y-1 text-right">
          <div className="flex justify-end items-center gap-3">
            <a 
              href="https://www.swaminarayangadi.com/newjersey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Image 
                src="/maninagar_logo.png" 
                alt="Maninagar Logo" 
                width={38} 
                height={38} 
              />
            </a>
            <a 
              href="https://www.youtube.com/@SwaminarayanGadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Image 
                src="/youtube_red_icon.png" 
                alt="YouTube" 
                width={44} 
                height={44} 
              />
            </a>
            <a 
              href="https://www.instagram.com/sgadinewjersey/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <Image 
                src="/Instagram_Glyph_Gradient.png" 
                alt="Instagram" 
                width={38} 
                height={38} 
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}