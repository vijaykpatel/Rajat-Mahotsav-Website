"use client"

import { motion } from "framer-motion"
import { AudioPlayButton } from "@/components/audio-player"
import { useLoading } from "@/hooks/use-loading"

export default function TitleSection() {
  const { isLoading } = useLoading()

  return (
    <div className="bg-title-section-bg h-full flex items-center justify-end relative">
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: !isLoading ? 0.8 : 0, ease: "easeOut" }}
        className="pr-4 z-10 text-right sm:pr-8"
      >
        <div className="font-instrument-serif leading-tight">
          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1 : 0, ease: "easeOut" }}
            className="leading-wide text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Shree
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.2 : 0, ease: "easeOut" }}
            className="leading-tight text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Ghanshyam Maharaj
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.4 : 0, ease: "easeOut" }}
            className="leading-tight text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Rajat Pratishta Mahotsav
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.6 : 0, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Shree Swaminarayan Temple
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.8 : 0, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Secaucus, New Jersey
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.8 : 0, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            celebrates 25 years
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: !isLoading ? 2 : 0, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold italic text-white drop-shadow-lg sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            07.25.26 - 08.02.26
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
