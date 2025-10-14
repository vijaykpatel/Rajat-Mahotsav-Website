"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ResponsiveImageGallery } from "@/components/responsive-image-gallery"
import { getR2Image, getCloudflareImage } from "@/lib/cdn-assets"

// TODO: Replace with actual image URLs
const galleryImages = [
  { id: 1, src: getR2Image("/main/gold_tula_hugging.JPG"), alt: "Image 1" },
  { id: 2, src: getR2Image("/main/golden_tula_sants.JPG"), alt: "Image 2" },
  { id: 3, src: getR2Image("/main/gold_tula_placing.JPG"), alt: "Image 3" }
] as const

export default function TextSection1() {
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
    <div ref={sectionRef} className="w-full flex flex-col">
      {/* Top 50% - Text Content */}
      <div className="min-h-[50vh] px-4 flex flex-col items-center justify-center py-16 md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-2xl max-w-4xl text-center leading-relaxed relative z-10 text-slate-800"
        >
          <span className="font-bold text-orange-600 text-2xl md:text-3xl">In August 2001</span>, history was made and forever forged in gold. During the installation of the divine murtis of <span className="font-bold text-orange-600 text-2xl md:text-3xl">Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa</span> at Shree Swaminarayan Temple in Secaucus, New Jersey, the <span className="font-bold text-orange-600 text-2xl md:text-3xl">first shikhar-bandh mandir of Maninagar Shree Swaminarayan Gadi Sansthan in North America</span>, our beloved <span className="font-bold text-orange-600 text-2xl md:text-3xl">Prem Murti Acharya Shree Purushottampriya Swamishree Maharaj weighed all three divine idols with 750 kilograms of pure gold</span>. This Suvarna Tula during the Murti Pratishtha Mahotsav of Shree Swaminarayan Temple - Secaucus, New Jersey, was <span className="font-bold text-orange-600 text-2xl md:text-3xl">the first time such a magnificent ceremony was ever done</span>, and it was the last time such a magnificent ceremony would ever be witnessed.
        </motion.p>
      </div>
      
      {/* Bottom 50% - Image Gallery */}
      <ResponsiveImageGallery images={galleryImages} />
    </div>
  )
}
