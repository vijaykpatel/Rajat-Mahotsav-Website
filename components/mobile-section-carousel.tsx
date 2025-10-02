"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselImage {
  id: number
  title: string
  subtitle: string
  bgColor: string
}

interface MobileSectionCarouselProps {
  images: CarouselImage[]
}

export function MobileSectionCarousel({ images }: MobileSectionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative w-full h-[50vh] overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className={`w-full h-full ${images[currentIndex].bgColor} flex items-center justify-center`}>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">📸</span>
              </div>
              <p className="text-lg font-medium text-gray-700">
                {images[currentIndex].title}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {images[currentIndex].subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}