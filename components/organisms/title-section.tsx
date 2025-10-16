"use client"

import { motion } from "framer-motion"

export default function TitleSection() {
  return (
    <div className="fixed inset-0 h-screen flex flex-col items-center justify-center overflow-hidden z-0" style={{ background: '#0D132D' }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-8 w-full relative z-10"
      >
        {/* Desktop */}
        <h1 className="hidden md:block font-bold text-white leading-tight drop-shadow-2xl my-6" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          <div className="tracking-wide whitespace-nowrap" style={{ fontSize: 'clamp(7rem, 15vw, 12rem)' }}>
            Suvarna Yug no
          </div>
          {/* <div className="w-80 h-1 bg-white mx-auto" /> */}
          <div className="tracking-wider whitespace-nowrap" style={{ fontSize: 'clamp(7rem, 15vw, 12rem)' }}>
            Rajat Mahotsav
          </div>
        </h1>
        
        {/* Mobile */}
        <h1 className="md:hidden font-bold text-white leading-tight drop-shadow-2xl my-6" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
          <div style={{ fontSize: 'clamp(2.5rem, 15vw, 12rem)' }} className="tracking-wide">Suvarna Yug no</div>
          <div style={{ fontSize: 'clamp(2.5rem, 15vw, 12rem)' }} className="tracking-wide">Rajat Mahotsav</div>
          {/* <div style={{ fontSize: 'clamp(2.5rem, 15vw, 9rem)' }} className="tracking-wider">Rajat</div>
          <div style={{ fontSize: 'clamp(2.5rem, 15vw, 9rem)' }} className="tracking-wider">Mahotsav</div> */}
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium leading-relaxed" style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(4rem, 5vw, 6rem)' }}>
            A silver celebration of a golden era
          </p>
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium  tracking-wider leading-relaxed" style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(3rem, 3vw, 4.5rem)' }}>
            Shree Swaminarayan Temple New Jersey<br/>Celebrates 25 years
          </p>
          <div className="w-80 h-1 bg-white mx-auto my-2" />
          <p className="text-white font-medium leading-relaxed" style={{ fontFamily: 'var(--font-instrument-serif)', fontSize: 'clamp(2.75rem, 3vw, 4rem)' }}>
            07.25.26 - 08.02.26
          </p>
        </div>
        
        {/* Mobile */}
        <div className="md:hidden space-y-2 px-4">
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(1.5rem, 7vw, 2.25rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            A silver celebration<br/>of a golden era
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(1.25rem, 6vw, 1.875rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            Shree Swaminarayan Temple<br/>New Jersey Celebrates 25 years
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(1.125rem, 5.5vw, 1.5rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            07.25.26 - 08.02.26
          </p>
        </div>
      </motion.div>
    </div>
  )
}