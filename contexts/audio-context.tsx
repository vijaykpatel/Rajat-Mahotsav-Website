'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'

interface AudioContextType {
  play: () => void
  pause: () => void
  fadeOut: (duration?: number) => void
  toggle: () => void
  isPlaying: boolean
  isLoaded: boolean
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.njrajatmahotsav.com/audio_files/prathna_audio.mp3')
    audioRef.current.preload = 'auto'
    audioRef.current.volume = 1

    const audio = audioRef.current

    const handleCanPlayThrough = () => setIsLoaded(true)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('ended', handleEnded)

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      audio.pause()
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const play = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const fadeOut = (duration = 1000) => {
    if (!audioRef.current || !isPlaying) return

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)

    const audio = audioRef.current
    const startVolume = audio.volume
    const steps = 50
    const stepTime = duration / steps
    const volumeStep = startVolume / steps

    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume = Math.max(0, audio.volume - volumeStep)
      } else {
        audio.volume = 0
        audio.pause()
        setIsPlaying(false)
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
      }
    }, stepTime)
  }

  const toggle = () => {
    if (isPlaying) pause()
    else play()
  }

  return (
    <AudioContext.Provider value={{ play, pause, fadeOut, toggle, isPlaying, isLoaded }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudioContext() {
  const context = useContext(AudioContext)
  if (!context) throw new Error('useAudioContext must be used within AudioProvider')
  return context
}
