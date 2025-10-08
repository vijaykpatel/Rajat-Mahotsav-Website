"use client"

import { motion } from "framer-motion"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface VideoCardProps {
  videoId: string
  title: string
  thumbnail: string
}

function VideoCard({ videoId, title, thumbnail }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    setIsPlaying(true)
  }

  if (isPlaying) {
    return (
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-video relative">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="relative cursor-pointer group bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl shadow-xl p-6 border-2 border-gray-200 hover:border-orange-500/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-video relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          
          {/* Play triangle in bottom right */}
          <motion.div
            className="absolute bottom-4 right-4"
            animate={{
              scale: isHovered ? 1.2 : [1, 1.05, 1],
              opacity: isHovered ? 1 : [0.7, 0.9, 0.7],
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut",
              rotate: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Play className="w-8 h-8 text-white fill-white ml-0.5 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
          </motion.div>
        </div>
      </motion.div>
      <p className="text-center text-sm text-gray-600 leading-relaxed mt-4">
        {title}
      </p>
    </motion.div>
  )
}

export default function VideoSection() {
  const videos = [
    {
      videoId: "6rvGcN4wQCU",
      title: "Rajat Mahotsav Trailer #1",
      thumbnail: "https://img.youtube.com/vi/6rvGcN4wQCU/maxresdefault.jpg"
    },
    {
      videoId: "d0vT6cSVeCY",
      title: "Rajat Mahotsav Trailer #2",
      thumbnail: "https://img.youtube.com/vi/d0vT6cSVeCY/maxresdefault.jpg"
    },
    {
      videoId: "Jq_mvCRivaE",
      title: "Secaucus Temple Drone Footage",
      thumbnail: "https://img.youtube.com/vi/Jq_mvCRivaE/maxresdefault.jpg"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPaused])

  const nextVideos = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideos = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const getVisibleVideos = () => {
    const firstVideo = videos[currentIndex]
    const secondVideo = videos[(currentIndex + 1) % videos.length]
    return [firstVideo, secondVideo]
  }

  const getCurrentVideo = () => {
    return videos[currentIndex]
  }

  return (
    <div className="min-h-screen pt-30 md:pt-50 pb-20 px-4">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-26 lg:mb-36 xl:mb-46"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Rajat Mahotsav Celebrations have already begun!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We hope you are as excited as we are. We can't wait to celebrate with you!
          </p>
        </motion.div>

        {/* Desktop: 2-card layout with side arrows */}
        <div 
          className="hidden xl:block relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-2 gap-12 w-full max-w-5xl scale-130 mx-auto">
            {getVisibleVideos().map((video, index) => (
              <motion.div
                key={`${video.videoId}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full"
              >
                <VideoCard {...video} />
              </motion.div>
            ))}
          </div>
          
          <motion.button
            onClick={prevVideos}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg scale-130"
            whileHover={{ 
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 0 15px rgba(200, 200, 200, 0.4), 0 0 25px rgba(200, 200, 200, 0.2)"
            }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </motion.button>
          
          <motion.button
            onClick={nextVideos}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg scale-130"
            whileHover={{ 
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 0 15px rgba(200, 200, 200, 0.4), 0 0 25px rgba(200, 200, 200, 0.2)"
            }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </motion.button>
        </div>

        {/* Mobile & Tablet: Single card layout with swipe */}
        <div 
          className="xl:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="w-full max-w-2xl md:max-w-3xl mx-auto mb-8 cursor-grab active:cursor-grabbing"
            onTouchStart={(e) => {
              const startX = e.touches[0].clientX
              const handleTouchEnd = (endEvent: TouchEvent) => {
                const endX = endEvent.changedTouches[0].clientX
                const diff = startX - endX
                if (Math.abs(diff) > 50) {
                  if (diff > 0) nextVideos()
                  else prevVideos()
                }
                document.removeEventListener('touchend', handleTouchEnd)
              }
              document.addEventListener('touchend', handleTouchEnd)
            }}
          >
            <motion.div
              key={`${getCurrentVideo().videoId}-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <VideoCard {...getCurrentVideo()} />
            </motion.div>
          </div>
          
          {/* Mobile dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}