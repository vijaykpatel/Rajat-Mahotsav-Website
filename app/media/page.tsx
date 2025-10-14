"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { IPhoneMock } from "@/components/molecules/iphone-mock"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import "@/styles/community-service-theme.css"

const wallpapers = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=800&fit=crop",
    fullRes: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1170&h=2532&fit=crop",
    title: "Gradient Sunset"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=800&fit=crop",
    fullRes: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1170&h=2532&fit=crop",
    title: "Abstract Gradient"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop",
    fullRes: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1170&h=2532&fit=crop",
    title: "Abstract Art"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=800&fit=crop",
    fullRes: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1170&h=2532&fit=crop",
    title: "Blue Gradient"
  },
]

export default function MediaPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const currentWallpaper = wallpapers[currentIndex]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + wallpapers.length) % wallpapers.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % wallpapers.length)
  }

  const handleDownload = async () => {
    const link = document.createElement("a")
    link.href = currentWallpaper.fullRes
    link.download = `rajat-mahotsav-${currentWallpaper.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen community-page-bg page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing">
        <StandardPageHeader
          title="Media"
          subtitle="Download exclusive Rajat Mahotsav wallpapers"
          isLoaded={isLoaded}
        />

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8 max-w-5xl mx-auto"
        >
          {/* iPhone Preview */}
          <motion.div
            className="flex-shrink-0 mb-4 scale-100"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handlePrevious()
              else if (info.offset.x < -100) handleNext()
            }}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <IPhoneMock wallpaperUrl={currentWallpaper.thumbnail} />
            </motion.div>
          </motion.div>

          {/* Pagination Dots */}
          <div className="flex gap-2">
            {wallpapers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="transition-all duration-300"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-2 bg-gradient-to-r from-orange-500 to-pink-500"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-8">
            <motion.button
              onClick={handlePrevious}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg z-10 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <Download className="w-5 h-5" />
            Download Wallpaper
          </button>
        </motion.section>
      </div>
    </div>
  )
}
