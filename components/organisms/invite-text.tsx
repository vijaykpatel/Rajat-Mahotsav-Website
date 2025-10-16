"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

export default function InviteText() {
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
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
          className="text-lg md:text-xl max-w-4xl text-center leading-relaxed relative z-10 text-slate-800"
        >
          This Rajat Mahotsav (Silver Jubilee), which will take place from July 25 through August 2, 2026, will celebrate the 25th anniversary, the silver anniversary, of the murti pratishtha of Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa, and the opening of Shree Swaminarayan Temple - Secaucus, New Jersey. This grand occasion will celebrate twenty-five years of faith, community, and fellowship at Shree Swaminarayan Temple - Secaucus, New Jersey, with scripture recitals, divine blessings from Acharya Swamiji Maharaj, cultural programs, special women's events, and a sports shibir. As this temple holds a special place in the hearts of devotees all throughout North America and the world, and has been home to some of the most blissful memories and divine episodes over the last twenty-five years, the members of Shree Swaminarayan Temple - Secaucus, New Jersey, invite you all to be part of this Rajat Mahotsav. Please join us as we celebrate the strength of gold, now with the glow of silver.
        </motion.p>
      </div>
      
      {/* Bottom 50% - Video Player */}
      <div className="flex-1 w-full flex items-start justify-center px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl relative" style={{ paddingTop: "56.42633228840125%" }}>
            {!videoLoaded ? (
              <div 
                className="absolute inset-0 bg-black flex items-center justify-center cursor-pointer group"
                onClick={() => setVideoLoaded(true)}
                style={{ 
                  backgroundImage: 'url(https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/thumbnails/thumbnail.gif?time=95s&duration=4s)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                  <Play size={40} className="text-black ml-1" fill="currentColor" />
                </div>
              </div>
            ) : (
              <iframe
                src="https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/6f4c127cc7b339c9b1b7875c1dc8e745/iframe?autoplay=true"
                style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
