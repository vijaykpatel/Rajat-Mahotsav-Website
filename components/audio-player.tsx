'use client'

import { useAudio } from '@/hooks/use-audio'
import { Play, Pause } from 'lucide-react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AudioPlayer() {
  const { play, pause, fadeOut, isPlaying, isLoaded } = useAudio(
    'https://cdn.njrajatmahotsav.com/audio_files/prathna_audio.mp3'
  )
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sihasanSection = document.querySelector('[data-section="sihasan"]')
    if (!sihasanSection) return

    const trigger = ScrollTrigger.create({
      trigger: sihasanSection,
      start: 'bottom center',
      onEnter: () => fadeOut(2000),
      onEnterBack: () => fadeOut(2000),
    })

    return () => trigger.kill()
  }, [fadeOut])

  return (
    <>
      <div ref={triggerRef} />
      <button
        onClick={isPlaying ? pause : play}
        disabled={!isLoaded}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </button>
    </>
  )
}

export function AudioPlayButton() {
  const { play, isLoaded } = useAudio(
    'https://cdn.njrajatmahotsav.com/audio_files/prathna_audio.mp3'
  )

  return (
    <button
      onClick={play}
      disabled={!isLoaded}
      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      aria-label="Play background audio"
    >
      <Play className="w-6 h-6" />
      <span>Play Audio</span>
    </button>
  )
}
