"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { getCloudflareImage } from "@/lib/cdn-assets"

const firstRowImages = [
  { src: getCloudflareImage("001591ef-616d-40ae-7102-30f4bad78b00"), alt: "Community Service Event 1" },
  { src: getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"), alt: "Community Service Event 2" },
  { src: getCloudflareImage("8f4a9f33-1626-4af6-9fa0-232fcaaf5400"), alt: "Community Service Event 3" },
  { src: getCloudflareImage("428174c3-965c-4055-f941-381562cf8000"), alt: "Community Service Event 4" },
  { src: getCloudflareImage("8711b5e8-0ce7-44e5-2f3f-6f5abdb6db00"), alt: "Community Service Event 5" },
]

const secondRowImages = [
  { src: getCloudflareImage("c80899d2-8dcb-4420-90ea-bea0c4b7fa00"), alt: "Community Service Event 6" },
  { src: getCloudflareImage("79fbc010-6b11-47be-e0af-e5d073711500"), alt: "Community Service Event 7" },
  { src: getCloudflareImage("1a01f892-a3ab-4715-496c-bd570de83b00"), alt: "Community Service Event 8" },
  { src: getCloudflareImage("a1ec5573-6e43-4499-79be-2028ebce6200"), alt: "Community Service Event 9" },
  { src: getCloudflareImage("2f2f3c0b-c371-41c5-3e94-043fad0da700"), alt: "Community Service Event 10" },
]

export function ImageMarquee() {
  return (
    <div className="w-full overflow-hidden space-y-3 md:space-y-6">
      {/* First Row - Left to Right */}
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
          {firstRowImages.map((image, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {firstRowImages.map((image, index) => (
            <div
              key={`first-dup-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative h-[30vh] md:h-[40vh] overflow-hidden">
        <motion.div
          className="flex gap-3 md:gap-6 absolute"
          animate={{
            x: ["-50%", "-0%"]
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
          {secondRowImages.map((image, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {secondRowImages.map((image, index) => (
            <div
              key={`second-dup-${index}`}
              className="flex-shrink-0 w-[20rem] md:w-[40rem] h-[30vh] md:h-[40vh] relative rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}