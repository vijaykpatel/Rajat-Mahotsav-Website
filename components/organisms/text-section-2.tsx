"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Skiper54 } from "@/components/templates/skiper54"

export default function TextSection2() {
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
    <div ref={sectionRef} className="w-full px-4 flex flex-col items-center justify-start">
      <div className="min-h-[50vh] flex items-center justify-center w-full py-16 md:py-20">
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-lg md:text-xl max-w-4xl text-center leading-relaxed relative z-10 text-slate-800"
      >
        What unfolded afterwards was a golden era of the growth of the faith and the flourishing of the supreme teachings and philosophy of Lord Shree Swaminarayanbapa Swamibapa, not only in New Jersey, but all throughout North America. Over a dozen new temples and mandals have sprouted from coast to coast, and the initial seeds planted by Jeevanpran Shree Muktajeevan Swamibapa, were lovingly and tirelessly sowed by His beloved heir, Acharya Shree Purushottampriya Swamishree Maharaj, all throughout North America. This garden bloomed by Acharya Swamishree Maharaj is now being devotedly tended to in the same manner by Acharya Shree Jitendriyapriyadasji Swamiji Maharaj, the inspirer of the Shree Ghanshyam Maharaj Rajat Pratishtha Mahotsav at Shree Swaminarayan Temple, New Jersey.
      </motion.p>
      </div>
      <div className="w-full flex items-center justify-center">
        <Skiper54 />
      </div>
    </div>
  )
}
