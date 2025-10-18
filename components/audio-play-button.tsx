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
      className="hidden lg:fixed top-20 left-4 z-40"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? <Pause size={22} strokeWidth={2.5} /> : <Play size={22} strokeWidth={2.5} className="ml-0.5" />}
    </FloatingButton>
  )
}
