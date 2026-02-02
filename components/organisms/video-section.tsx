"use client"

import { Play } from "lucide-react"
import { useState, useEffect } from "react"
import { useAudioContext } from '@/contexts/audio-context'

interface VideoCardProps {
  videoId: string
  title: string
  thumbnail: string
  onPlay?: () => void
  isPlaying?: boolean
}

function VideoCard({ videoId, title, thumbnail, onPlay, isPlaying: externalIsPlaying }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (externalIsPlaying === false && isPlaying) {
      setIsPlaying(false)
    }
  }, [externalIsPlaying, isPlaying])

  const { pause } = useAudioContext()

  const handleClick = () => {
    pause()
    setIsPlaying(true)
    onPlay?.()
  }

  if (isPlaying) {
    return (
      <div className="relative bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl p-2 border-2 border-gray-200">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="aspect-video relative">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <p className="text-center text-[10px] text-gray-600 mt-2 line-clamp-1">
          {title}
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative cursor-pointer group bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl p-4 border-2 border-gray-200 hover:border-orange-500/30 transition-all duration-300"
      onClick={handleClick}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden">
        <div className="aspect-video relative overflow-hidden rounded-2xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          <div className="absolute bottom-4 right-4 transition-transform duration-200 group-hover:scale-110">
            <Play className="w-8 h-8 text-white fill-white ml-0.5 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))' }} />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 leading-relaxed mt-4">
        {title}
      </p>
    </div>
  )
}

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

export default function VideoSection() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen pb-20 flex flex-col justify-center">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-6 md:px-8 lg:px-16 xl:px-20">
        <div className="text-center mb-10 md:mb-12 lg:mb-12 xl:mb-16 px-4">
          <h2 className="section-title">
            Follow our celebration
          </h2>
          <p className="text-slate-300 text-transition text-left md:text-center space-y-6 md:space-y-8" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.6rem)', lineHeight: 'clamp(1.4, 1.3 + 0.5vw, 1.6)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Follow our celebrations throughout the year leading up to the Mahotsav.
          </p>
        </div>

        {/* YouTube Playlist Link */}
        <div className="mb-8 text-center px-4">
          <a
            href="https://www.youtube.com/playlist?list=PLqKpGEY54C-1OklTqKwLh6JWYCDQpn5MC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 sm:gap-4 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg sm:text-2xl rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span>Check out our Youtube Playlist!</span>
          </a>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[110rem] mx-auto">
          {videos.map((video, index) => (
            <VideoCard
              key={video.videoId}
              {...video}
              onPlay={() => setPlayingVideoIndex(index)}
              isPlaying={playingVideoIndex === index}
            />
          ))}
        </div>
      </div>

      {/* Registration CTA
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mt-20 text-center max-w-4xl mx-auto"
      >
        <h3 className="text-4xl md:text-5xl leading-[1.2] font-bold mb-6 reg-title">
          Join Us for the Rajat Mahotsav
        </h3>
        <p className="text-lg md:text-xl reg-text-primary mb-8 leading-relaxed">
          Be a part of the Shree Ghanshyam Maharaj Rajat Pratishta Mahotsav New Jersey. Register now for this momentous occasion from July 2 through August 2, 2026.
        </p>
        <a
          href="/registration"
          className="inline-block px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          Register Now
        </a>
      </motion.div> */}
    </div>
  )
}
