"use client"

import { motion } from "framer-motion"

export default function TitleSection() {
  return (
    <div className="fixed inset-0 h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(30,58,138,0.1),transparent_50%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center space-y-8 w-full relative z-10"
      >
        {/* Desktop */}
        <h1 className="hidden md:block font-serif italic font-bold text-white leading-tight drop-shadow-2xl space-y-6">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wide whitespace-nowrap">
            Suvarna Yug no
          </div>
          {/* <div className="w-80 h-1 bg-white mx-auto" /> */}
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wider whitespace-nowrap">
            Rajat Mahotsav
          </div>
        </h1>
        
        {/* Mobile */}
        <h1 className="md:hidden font-serif italic font-bold text-white leading-tight drop-shadow-2xl space-y-3">
          <div className="text-7xl tracking-wide">Suvarna</div>
          <div className="text-7xl tracking-wide">Yug no</div>
          {/* <div className="w-64 h-1 bg-white mx-auto" /> */}
          <div className="text-7xl tracking-wider">Rajat</div>
          <div className="text-7xl tracking-wider">Mahotsav</div>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
        className="text-center mt-12 max-w-4xl relative z-10"
      >
        {/* Desktop */}
        <div className="hidden md:block">
          <div className="w-80 h-1 bg-white mx-auto mb-8" />
          <p className="sm:text-3xl md:text-4xl lg:text-5xl text-white font-serif italic font-medium tracking-wider leading-relaxed">
            A silver celebration of a golden era
          </p>
          <div className="w-80 h-1 bg-white mx-auto my-6" />
          <p className="sm:text-2xl md:text-3xl lg:text-4xl text-white font-serif italic font-medium tracking-wider">
            Shree Swaminarayan Temple New Jersey Celebrates 25 years
          </p>
        </div>
        
        {/* Mobile */}
        <div className="md:hidden space-y-4">
          <div className="w-64 h-1 bg-white mx-auto" />
          <p className="text-3xl text-white font-serif italic font-medium tracking-wide leading-relaxed">
            A silver celebration<br/>of a golden era
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p className="text-2xl text-white font-serif italic font-medium tracking-wide leading-relaxed">
            Shree Swaminarayan Temple<br/>New Jersey Celebrates 25 years
          </p>
        </div>
      </motion.div>
    </div>
  )
}