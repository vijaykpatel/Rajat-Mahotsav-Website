"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/molecules/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageCarouselModalProps {
  images: string[]
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageCarouselModal({ images, title, open, onOpenChange }: ImageCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = images.length - 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-[95vw] sm:w-[90vw] p-0 bg-transparent border-none shadow-none">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute inset-0 w-full h-full object-contain cursor-grab active:cursor-grabbing select-none"
              alt={`${title} - Image ${currentIndex + 1}`}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 sm:p-3 rounded-full transition-all shadow-lg z-10 touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 sm:p-3 rounded-full transition-all shadow-lg z-10 touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`h-2 rounded-full transition-all touch-manipulation ${
                      index === currentIndex 
                        ? "bg-white w-8" 
                        : "bg-white/50 w-2 hover:bg-white/75"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
