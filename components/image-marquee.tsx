"use client"

import { motion } from "framer-motion"
import { useDeviceType } from "@/hooks/use-device-type"

interface MarqueeImage {
  src: string
  alt: string
}

interface ImageMarqueeProps {
  firstRow: MarqueeImage[]
  secondRow: MarqueeImage[]
  imageWidth?: string
  imageHeight?: string
  gap?: string
  duration?: { mobile: number; desktop: number }
}

export function ImageMarquee({
  firstRow,
  secondRow,
  imageWidth = "w-[20rem] md:w-[30rem]",
  imageHeight = "h-[30vh] md:h-[30vh]",
  gap = "gap-3 md:gap-6",
  duration = { mobile: 45, desktop: 35 }
}: ImageMarqueeProps) {
  const deviceType = useDeviceType()
  const animationDuration = deviceType === 'mobile' ? duration.mobile : duration.desktop
  
  return (
    <div className="w-full overflow-hidden space-y-3 md:space-y-6">
      {/* First Row - Left to Right */}
      <div className={`relative ${imageHeight} overflow-hidden`}>
        <motion.div
          className={`flex ${gap} absolute`}
          animate={{ x: ["-0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            },
          }}
        >
          {[...firstRow, ...firstRow].map((image, index) => (
            <div
              key={`first-${index}`}
              className={`flex-shrink-0 ${imageWidth} ${imageHeight} relative rounded-lg overflow-hidden shadow-xl`}
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
      <div className={`relative ${imageHeight} overflow-hidden`}>
        <motion.div
          className={`flex ${gap} absolute`}
          animate={{ x: ["-50%", "-0%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: animationDuration,
              ease: "linear",
            },
          }}
        >
          {[...secondRow, ...secondRow].map((image, index) => (
            <div
              key={`second-${index}`}
              className={`flex-shrink-0 ${imageWidth} ${imageHeight} relative rounded-lg overflow-hidden shadow-xl`}
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