"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from '@/components/molecules/video-carousel-buttons'
import { DotButton, useDotButton } from '@/components/molecules/video-carousel-dots'

interface VideoCardProps {
  videoId: string
  title: string
  thumbnail: string
  onPlay?: () => void
  isPlaying?: boolean
  onPause?: () => void
}

function VideoCard({ videoId, title, thumbnail, onPlay, isPlaying: externalIsPlaying, onPause }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (externalIsPlaying === false && isPlaying) {
      setIsPlaying(false)
    }
  }, [externalIsPlaying, isPlaying])

  const handleClick = () => {
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden"
        transition={{ duration: 0.3 }}
      >
        <div className="aspect-video relative overflow-hidden rounded-2xl">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, slidesToScroll: 1 })
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({ loop: true })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null)
  const [resetKey, setResetKey] = useState(0)
  const [videoSectionVisible, setVideoSectionVisible] = useState(false)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApiMobile)

  useEffect(() => {
    if (!emblaApi || isVideoPlaying) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4500)
    return () => clearInterval(interval)
  }, [emblaApi, isVideoPlaying, resetKey])

  useEffect(() => {
    if (!emblaApiMobile || isVideoPlaying) return
    const interval = setInterval(() => {
      emblaApiMobile.scrollNext()
    }, 4500)
    return () => clearInterval(interval)
  }, [emblaApiMobile, isVideoPlaying, resetKey])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setPlayingVideoIndex(null)
      setIsVideoPlaying(false)
    }
    const onPointerDown = () => setResetKey(k => k + 1)
    emblaApi.on('select', onSelect).on('pointerDown', onPointerDown)
    return () => { emblaApi.off('select', onSelect).off('pointerDown', onPointerDown) }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApiMobile) return
    const onSelect = () => {
      setPlayingVideoIndex(null)
      setIsVideoPlaying(false)
    }
    const onPointerDown = () => setResetKey(k => k + 1)
    emblaApiMobile.on('select', onSelect).on('pointerDown', onPointerDown)
    return () => { emblaApiMobile.off('select', onSelect).off('pointerDown', onPointerDown) }
  }, [emblaApiMobile])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVideoSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={videoSectionRef} className="min-h-screen pb-20 px-4 flex flex-col justify-center">
      <div className="max-w-[90rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12 lg:mb-12 xl:mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6 md:mb-12 relative z-10 reg-title leading-tight">
            Follow our celebration
          </h2>
          <p className="reg-text-primary font-semibold text-xl lg:text-2xl mb-4 mx-auto">
            We hope you are as excited as we are and look forward to having you celebrate such a major milestone with us!
          </p>
        </motion.div>

        {/* YouTube Playlist Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8 text-center"
        >
          <a
            href="https://www.youtube.com/playlist?list=PLqKpGEY54C-1OklTqKwLh6JWYCDQpn5MC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-2xl rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Check out our Youtube Playlist!</span>
          </a>
        </motion.div>

        {/* Desktop: 2-card layout with arrows below */}
        <div className="hidden xl:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {videos.map((video, index) => (
                <div key={video.videoId} className="flex-[0_0_50%] min-w-0 px-6">
                  <VideoCard 
                    {...video} 
                    onPlay={() => {
                      setIsVideoPlaying(true)
                      setPlayingVideoIndex(index)
                    }}
                    isPlaying={playingVideoIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <PrevButton onClick={() => { onPrevButtonClick(); setResetKey(k => k + 1) }} disabled={prevBtnDisabled} />
            <NextButton onClick={() => { onNextButtonClick(); setResetKey(k => k + 1) }} disabled={nextBtnDisabled} />
          </div>
        </div>

        {/* Mobile & Tablet: Single card layout with swipe */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={videoSectionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="xl:hidden"
        >
          <div className="overflow-hidden w-full max-w-2xl md:max-w-3xl mx-auto mb-8" ref={emblaRefMobile}>
            <div className="flex">
              {videos.map((video, index) => (
                <div key={video.videoId} className="flex-[0_0_100%] min-w-0">
                  <VideoCard 
                    {...video} 
                    onPlay={() => {
                      setIsVideoPlaying(true)
                      setPlayingVideoIndex(index)
                    }}
                    isPlaying={playingVideoIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile dots navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => { onDotButtonClick(index); setResetKey(k => k + 1) }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Registration CTA */}
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
          Be a part of the Shree Ghanshyam Maharaj Rajat Pratishta Mahotsav New Jersey. Register now for this momentous occasion from July 25 through August 2, 2026.
        </p>
        <a
          href="/registration"
          className="inline-block px-12 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
        >
          Register Now
        </a>
      </motion.div>
    </div>
  )
}
