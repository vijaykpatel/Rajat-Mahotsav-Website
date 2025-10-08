"use client"

import { motion } from "framer-motion"

interface IPhoneMockProps {
  wallpaperUrl: string
}

export function IPhoneMock({ wallpaperUrl }: IPhoneMockProps) {
  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20" />
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
          <motion.img
            key={wallpaperUrl}
            src={wallpaperUrl}
            alt="Wallpaper preview"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/40 to-transparent z-10 flex items-start justify-between px-8 pt-3 text-white text-xs font-semibold">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-3 border border-white rounded-sm" />
              <div className="w-1 h-2 bg-white rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
