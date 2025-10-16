"use client"

import { motion } from "framer-motion"

export default function TitleSection() {
  return (
    <div className="page-bg-extend min-h-screen" style={{ background: '#0D132D' }}>
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
          <p style={{ fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            A silver celebration<br/>of a golden era
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            Shree Swaminarayan Temple<br/>New Jersey Celebrates 25 years
          </p>
          <div className="w-64 h-1 bg-white mx-auto" />
          <p style={{ fontSize: 'clamp(2rem, 5.5vw, 2.5rem)', fontFamily: 'var(--font-instrument-serif)' }} className="text-white font-medium tracking-wide leading-relaxed">
            07.25.26 - 08.02.26
          </p>
        </div>
      </motion.div>

      {/* Video Player */}
      <div className="flex items-center justify-center px-4 py-60">
        <div className="w-full max-w-6xl">
          <div className="rounded-xl overflow-hidden" style={{ position: "relative", paddingTop: "56.42633228840125%" }}>
            <iframe
              src="https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/iframe?poster=https%3A%2F%2Fcustomer-kss5h1dwt4mkz0x3.cloudflarestream.com%2F6f4c127cc7b339c9b1b7875c1dc8e745%2Fthumbnails%2Fthumbnail.gif%3Ftime%3D95s%26duration%3D4s"
              style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}