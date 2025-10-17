"use client"

import { CDN_ASSETS } from "@/lib/cdn-assets"

export default function StickyFooter() {
  return (
    <footer className="backdrop-blur-xl border-t-4 border-orange-500/60 md:shadow-[0_0_40px_rgba(255,255,255,0.3)] bg-title-section-bg">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 items-start py-1 px-6 gap-4">
        {/* Left Column */}
        <div className="space-y-1">
          <span className="text-sm text-white">Shree Swaminarayan Temple Secaucus, NJ</span>
          <div className="text-sm text-white">
            200 Swamibapa Way, Secaucus, NJ 07094
          </div>
        </div>

        {/* Center Column */}
        <div className="text-center pt-1">
          <span className="text-base text-white">
            Inspired by His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
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
              <img 
                src={CDN_ASSETS.maningarLogo} 
                alt="Maninagar Logo" 
                width="38"
                height="38"
                className="w-[38px] h-[38px]"
              />
            </a>
            <a 
              href="https://www.youtube.com/@SwaminarayanGadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <img 
                src={CDN_ASSETS.youtubeIcon} 
                alt="YouTube" 
                width="44"
                height="44"
                className="w-[44px] h-[44px]"
              />
            </a>
            <a 
              href="https://www.instagram.com/sgadinewjersey/?hl=en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-75 transition-opacity"
            >
              <img 
                src={CDN_ASSETS.instagramIcon} 
                alt="Instagram" 
                width="38"
                height="38"
                className="w-[38px] h-[38px]"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center py-4 px-6 space-y-6">
        {/* Inspired By Text */}
        <div className="text-center">
          <span className="text-sm text-white">
            Inspired By: His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
          </span>
        </div>

        {/* Temple Name */}
        <div className="text-center">
          <span className="text-sm text-white">Shree Swaminarayan Temple Secaucus, NJ</span>
        </div>

        {/* Address */}
        <div className="text-center">
          <div className="text-sm text-white">
            200 Swamibapa Way, Secaucus, NJ 07094
          </div>
        </div>

        {/* Logos */}
        <div className="flex justify-center items-center gap-3">
          <a 
            href="https://www.swaminarayangadi.com/newjersey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img 
              src={CDN_ASSETS.maningarLogo} 
              alt="Maninagar Logo" 
              width="38"
              height="38"
              className="w-[38px] h-[38px]"
            />
          </a>
          <a 
            href="https://www.youtube.com/@SwaminarayanGadi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img 
              src={CDN_ASSETS.youtubeIcon} 
              alt="YouTube" 
              width="44"
              height="38"
              className="w-[44px] h-[38px]"
            />
          </a>
          <a 
            href="https://www.instagram.com/sgadinewjersey/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <img 
              src={CDN_ASSETS.instagramIcon} 
              alt="Instagram" 
              width="38"
              height="38"
              className="w-[38px] h-[38px]"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}