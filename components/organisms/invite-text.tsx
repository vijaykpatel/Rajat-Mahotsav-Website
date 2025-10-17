"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function InviteText() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])



  return (
    <div ref={sectionRef} className="min-h-screen w-full flex flex-col">
      {/* Top 50% - Text Content */}
      <div className="flex-1 px-4 flex flex-col items-center justify-center py-16 md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl max-w-4xl text-center leading-relaxed relative z-10 text-main-text"
        >
          This Rajat Mahotsav (Silver Jubilee), which will take place from July 25 through August 2, 2026, will celebrate the 25th anniversary, the silver anniversary, of the murti pratishtha of Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa, and the opening of Shree Swaminarayan Temple - Secaucus, New Jersey. This grand occasion will celebrate twenty-five years of faith, community, and fellowship at Shree Swaminarayan Temple - Secaucus, New Jersey, with scripture recitals, divine blessings from Acharya Swamiji Maharaj, cultural programs, special women's events, and a sports shibir. As this temple holds a special place in the hearts of devotees all throughout North America and the world, and has been home to some of the most blissful memories and divine episodes over the last twenty-five years, the members of Shree Swaminarayan Temple - Secaucus, New Jersey, invite you all to be part of this Rajat Mahotsav. Please join us as we celebrate the strength of gold, now with the glow of silver.
        </motion.p>
      </div>
      

    </div>
  )
}
