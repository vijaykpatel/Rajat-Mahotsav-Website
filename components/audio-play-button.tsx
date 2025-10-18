'use client'

import { useAudioContext } from '@/contexts/audio-context'
import { Play, Pause } from 'lucide-react'
import { FloatingButton } from './atoms/floating-button'

export function AudioPlayButton() {
  const { toggle, isPlaying, isLoaded } = useAudioContext()

  if (!isLoaded) return null

  return (
    <FloatingButton
      onClick={toggle}
      isDarkBackground={true}
      isVisible={true}
      className="fixed top-[calc(1.5rem+56px+2.5rem)] left-[max(1rem,2vw)] z-40"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
    </FloatingButton>
  )
}
