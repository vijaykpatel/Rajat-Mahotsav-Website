"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const placeholderImages = [
  { src: "/placeholder-community-1.jpg", alt: "Community Service Event 1" },
  { src: "/placeholder-community-2.jpg", alt: "Community Service Event 2" },
  { src: "/placeholder-community-3.jpg", alt: "Community Service Event 3" },
  { src: "/placeholder-community-4.jpg", alt: "Community Service Event 4" },
  { src: "/placeholder-community-5.jpg", alt: "Community Service Event 5" },
  { src: "/placeholder-community-6.jpg", alt: "Community Service Event 6" },
]

export function ImageMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        <motion.div
          className="flex gap-3 md:gap-6 absolute"
          animate={{
            x: ["-0%", "-50%"]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* First set of images */}
          {placeholderImages.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                <div className="text-center p-4 md:p-8">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/30 rounded-full mx-auto mb-3 md:mb-6 flex items-center justify-center">
                    <span className="text-2xl md:text-4xl">📸</span>
                  </div>
                  <p className="text-sm md:text-xl font-medium text-gray-700">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {placeholderImages.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                <div className="text-center p-4 md:p-8">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/30 rounded-full mx-auto mb-3 md:mb-6 flex items-center justify-center">
                    <span className="text-2xl md:text-4xl">📸</span>
                  </div>
                  <p className="text-sm md:text-xl font-medium text-gray-700">
                    {image.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}