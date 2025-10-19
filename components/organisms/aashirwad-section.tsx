"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function AashirwadSection() {
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
    <section ref={sectionRef} className="min-h-screen w-full py-16 md:py-24 px-4 bg-page-bg flex items-center">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Aashirwad from His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src="https://customer-kss5h1dwt4mkz0x3.cloudflarestream.com/7ef05b327338f7548d1a7b678f40a4db/iframe?poster=https%3A%2F%2Fcustomer-kss5h1dwt4mkz0x3.cloudflarestream.com%2F7ef05b327338f7548d1a7b678f40a4db%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D78s%26height%3D600&defaultQuality=1080p"
              loading="lazy"
              style={{ border: "none", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
