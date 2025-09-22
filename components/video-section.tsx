"use client"

import { motion } from "framer-motion"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

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
      className="relative cursor-pointer group"
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
        style={{
          boxShadow: isHovered 
            ? "0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15)"
            : "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)"
        }}
        animate={{
          boxShadow: isHovered 
            ? "0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.15)"
            : "0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)"
        }}
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
        <motion.div 
          className="p-6 relative overflow-hidden"
          animate={{
            background: isHovered 
              ? "linear-gradient(135deg, rgba(251, 146, 60, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)"
              : "rgba(255, 255, 255, 1)"
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="text-lg font-semibold text-gray-800 line-clamp-2 relative z-10"
            animate={{
              color: isHovered ? "rgb(55, 65, 81)" : "rgb(31, 41, 55)"
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </motion.div>
      </motion.div>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-48 pb-20 px-4">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Rajat Mahotsav Celebrations have already begun!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We hope you are as excited as we are. We can't wait to celebrate with you!
          </p>
        </motion.div>

        {/* Desktop: 2-card layout with side arrows */}
        <div className="hidden lg:block relative">
          <div className="grid grid-cols-2 gap-12 w-full max-w-5xl scale-130 mx-auto">
            {getVisibleVideos().map((video, index) => (
              <motion.div
                key={`${video.videoId}-${currentIndex}`}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <VideoCard {...video} />
              </motion.div>
            ))}
          </div>
          
          <button
            onClick={prevVideos}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors scale-130"
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>
          
          <button
            onClick={nextVideos}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-colors scale-130"
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>
        </div>

        {/* Tablet & Mobile: Single card layout with arrows below */}
        <div className="lg:hidden">
          <div className="w-full max-w-2xl mx-auto mb-8">
            <motion.div
              key={`${getCurrentVideo().videoId}-${currentIndex}`}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <VideoCard {...getCurrentVideo()} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}