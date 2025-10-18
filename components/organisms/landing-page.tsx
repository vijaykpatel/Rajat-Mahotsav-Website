"use client"

import { motion } from "framer-motion"
import { AudioPlayButton } from "@/components/audio-player"

export default function TitleSection() {
  return (
    <div className="bg-title-section-bg h-full flex items-center justify-end relative">
      {/* Commented out original text */}
      {/* <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-8 w-full relative z-10"
      >
        <h1 className="hidden md:block font-bold text-white leading-tight drop-shadow-2xl my-6 font-instrument-serif">
          <div className="tracking-wide whitespace-nowrap" style={{ fontSize: 'clamp(7rem, 15vw, 12rem)' }}>
            Suvarna Yug no
          </div>
          <div className="tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(7rem, 15vw, 12rem)' }}>
            Rajat Mahotsav
          </div>
        </h1>
        
        <h1 className="md:hidden font-bold text-white leading-tight drop-shadow-2xl my-6 font-instrument-serif">
          <div style={{ fontSize: 'clamp(2.5rem, 15vw, 12rem)' }} className="tracking-wide">Suvarna Yug no</div>
          <div style={{ fontSize: 'clamp(2.5rem, 15vw, 12rem)' }} className="tracking-wide">Rajat Mahotsav</div>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <div className="hidden md:block">
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium leading-relaxed font-instrument-serif" style={{ fontSize: 'clamp(4rem, 5vw, 6rem)' }}>
            A silver celebration of a golden era
          </p>
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium tracking-wider leading-relaxed font-instrument-serif" style={{ fontSize: 'clamp(3rem, 3vw, 4.5rem)' }}>
            Shree Swaminarayan Temple New Jersey<br/>Celebrates 25 years
          </p>
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium leading-relaxed font-instrument-serif" style={{ fontSize: 'clamp(2.75rem, 3vw, 4rem)' }}>
            07.25.26 - 08.02.26
          </p>
        </div>
        
        <div className="md:hidden space-y-2 px-4">
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)' }} className="text-white font-medium tracking-wide leading-relaxed font-instrument-serif">
            A silver celebration<br/>of a golden era
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }} className="text-white font-medium tracking-wide leading-relaxed font-instrument-serif">
            Shree Swaminarayan Temple<br/>New Jersey Celebrates 25 years
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(2rem, 5.5vw, 2.5rem)' }} className="text-white font-medium tracking-wide leading-relaxed font-instrument-serif">
            07.25.26 - 08.02.26
          </p>
        </div>
      </motion.div> */}

      {/* New text layout */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        >
          <AudioPlayButton />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pr-4 z-10 text-right sm:pr-8"
      >
        <div className="font-instrument-serif leading-tight">
          <motion.h1 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="leading-wide text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Shree
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="leading-tight text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Ghanshyam Maharaj
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="leading-tight text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Rajat Pratishta Mahotsav
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Shree Swaminarayan Temple
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            Secaucus, New Jersey
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold text-white drop-shadow-lg sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            celebrates 25 years
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="mt-2 text-4xl font-semibold italic text-white drop-shadow-lg sm:text-7xl lg:text-8xl xl:text-9xl"
          >
            07.25.26 - 08.02.26
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
