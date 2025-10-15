"use client"

import { motion } from "framer-motion"
import { getR2Image } from "@/lib/cdn-assets"
import { useEffect, useRef, useState } from "react"

const content = [
  {
    title: "In August 2001",
    description:
      "History was made and forever forged in gold. During the installation of the divine murtis of Lord Shree Swaminarayan, Jeevanpran Shree Abji Bapashree, and Jeevanpran Shree Muktajeevan Swamibapa at Shree Swaminarayan Temple in Secaucus, New Jersey, the first shikhar-bandh mandir of Maninagar Shree Swaminarayan Gadi Sansthan in North America.",
    image: getR2Image("/main/gold_tula_hugging.JPG"),
  },
  {
    title: "750 Kilograms of Pure Gold",
    description:
      "Our beloved Prem Murti Acharya Shree Purushottampriya Swamishree Maharaj weighed all three divine idols with 750 kilograms of pure gold. This Suvarna Tula during the Murti Pratishtha Mahotsav of Shree Swaminarayan Temple - Secaucus, New Jersey, was a magnificent ceremony witnessed by thousands.",
    image: getR2Image("/main/golden_tula_sants.JPG"),
  },
  {
    title: "A Historic Moment",
    description:
      "This was the first time such a magnificent ceremony was ever done, and it was the last time such a magnificent ceremony would ever be witnessed. The Suvarna Tula remains a testament to the devotion and dedication of our beloved Acharya Swamishree Maharaj and the entire Swaminarayan community.",
    image: getR2Image("/main/gold_tula_placing.JPG"),
  },
]

export default function TextSection1() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="w-full bg-slate-900 py-32 pb-40">
      <div className="max-w-[90rem] mx-auto px-8 space-y-24 mb-20">
        {content.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex-1 order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 md:mb-6">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="w-full md:w-[45%] order-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}
