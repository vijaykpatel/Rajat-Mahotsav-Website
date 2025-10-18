"use client"

import { motion } from "framer-motion"
import { useDeviceType } from "@/hooks/use-device-type"
import { useState, useEffect, useRef } from "react"

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
  duration = { mobile: 55, desktop: 40 }
}: ImageMarqueeProps) {
  const deviceType = useDeviceType()
  const animationDuration = deviceType === 'mobile' ? duration.mobile : duration.desktop
  const [isVisible, setIsVisible] = useState(false)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
<<<<<<< HEAD
=======
    const allImages = [...firstRow, ...secondRow]
    allImages.forEach((image) => {
      const img = new Image()
      img.src = image.src
    })
  }, [firstRow, secondRow])

  useEffect(() => {
>>>>>>> fad1d91 (v1.01)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.4 }
    )

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])
  
  return (
    <div ref={marqueeRef} className="w-full overflow-hidden space-y-3 md:space-y-6">
      {/* First Row - Left to Right */}
      <div className={`relative ${imageHeight} overflow-hidden`}>
        <motion.div
          className={`flex ${gap} absolute`}
          animate={isVisible ? { x: ["-0%", "-50%"] } : { x: "-0%" }}
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
          animate={isVisible ? { x: ["-50%", "-0%"] } : { x: "-50%" }}
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