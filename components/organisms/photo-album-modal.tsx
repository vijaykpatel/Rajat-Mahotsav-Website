"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/molecules/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { EventPhoto } from "@/lib/events-data"

interface PhotoAlbumModalProps {
  photos: EventPhoto[]
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex?: number
}

export function PhotoAlbumModal({
  photos,
  title,
  open,
  onOpenChange,
  initialIndex = 0
}: PhotoAlbumModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)

  // Reset to initial index when modal opens
  useEffect(() => {
    if (open) setCurrentIndex(initialIndex)
  }, [open, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, currentIndex])

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
      if (nextIndex < 0) nextIndex = photos.length - 1
      if (nextIndex >= photos.length) nextIndex = 0
      return nextIndex
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black/95 border-none">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={photos[currentIndex]?.url}
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
              alt={photos[currentIndex]?.caption || `${title} - Image ${currentIndex + 1}`}
            />
          </AnimatePresence>

          {/* Image Counter */}
          {photos.length > 1 && (
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold z-10">
              {currentIndex + 1} / {photos.length}
            </div>
          )}

          {/* Navigation Buttons */}
          {photos.length > 1 && (
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

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {photos.map((_, index) => (
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

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="p-4 overflow-x-auto">
            <div className="flex gap-2 justify-center min-w-max">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-orange-500 scale-110'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
