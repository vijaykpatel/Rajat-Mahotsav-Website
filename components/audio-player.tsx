'use client'

import { useAudioContext } from '@/contexts/audio-context'
import { Play, Pause } from 'lucide-react'

export function AudioPlayer() {
  const { toggle, isPlaying, isLoaded } = useAudioContext()

  return (
    <button
      onClick={toggle}
      disabled={!isLoaded}
      className="fixed bottom-[6.5rem] md:bottom-[9rem] right-6 z-40 p-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/30 outline-none focus:outline-none focus:ring-0"
      style={{ backgroundColor: '#0D132D' }}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? (
        <Pause size={28} className="text-white" strokeWidth={2.5} />
      ) : (
        <Play size={28} className="ml-0.5 text-white" strokeWidth={2.5} />
      )}
    </button>
  )
}
