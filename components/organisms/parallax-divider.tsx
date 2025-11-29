"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useDeviceType } from "@/hooks/use-device-type"
import { getCloudflareImage } from "@/lib/cdn-assets"

const QUOTE_TEXT = "An unforgettable Akshardham Mahasabha awaits"
const SUBTEXT = "The essence of The Rajat Mahotsav"
const IMAGE_ID = "c925a566-1921-4f49-0dd1-eda07012da00"

export default function ParallaxDivider() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const deviceType = useDeviceType()
  const isMobile = deviceType === "mobile" || deviceType === "tablet"

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height: isMobile ? "clamp(24rem, 50vh, 40vh)" : "clamp(24rem, 60vh, 70vh)",
        backgroundImage: `url('${getCloudflareImage(IMAGE_ID)}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 md:px-8">
        {/* Quote Icon */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 md:mb-6 text-4xl text-white/50"
        >
          "
        </motion.div> */}

        {/* Quote Text */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-instrument-serif italic text-white max-w-4xl leading-relaxed"
          style={{
            fontSize: "clamp(1.5rem, 10vw, 3rem)",
          }}
        >
          {QUOTE_TEXT}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 md:mt-8 uppercase tracking-widest text-xs md:text-sm text-orange-500"
        >
          {SUBTEXT}
        </motion.p>
      </div>
    </motion.div>
  )
}
