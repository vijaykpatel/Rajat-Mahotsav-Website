"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getCloudflareImage } from "@/lib/cdn-assets"

const placeholderImages = [
  { src: getCloudflareImage("001591ef-616d-40ae-7102-30f4bad78b00"), alt: "Community Service Event 1", isReal: true },
  { src: getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"), alt: "Community Service Event 2", isReal: true },
  { src: getCloudflareImage("8f4a9f33-1626-4af6-9fa0-232fcaaf5400"), alt: "Community Service Event 3", isReal: true },
  { src: getCloudflareImage("428174c3-965c-4055-f941-381562cf8000"), alt: "Community Service Event 4", isReal: true },
  { src: getCloudflareImage("8711b5e8-0ce7-44e5-2f3f-6f5abdb6db00"), alt: "Community Service Event 5", isReal: true },
  { src: getCloudflareImage("c80899d2-8dcb-4420-90ea-bea0c4b7fa00"), alt: "Community Service Event 6", isReal: true },
  { src: getCloudflareImage("79fbc010-6b11-47be-e0af-e5d073711500"), alt: "Community Service Event 7", isReal: true },
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
              {image.isReal ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
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
              )}
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {placeholderImages.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              {image.isReal ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
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
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}