'use client'

import { useState, useEffect, useRef } from 'react'
import { useAudioContext } from '@/contexts/audio-context'
import { Play, Pause } from 'lucide-react'
import { FloatingButton } from './atoms/floating-button'

export function AudioPlayer() {
  const { toggle, isPlaying, isLoaded } = useAudioContext()
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            const element = document.elementFromPoint(50, window.innerHeight - 100)
            if (element) {
              const styles = window.getComputedStyle(element)
              const bgColor = styles.backgroundColor
              
              if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                const rgb = bgColor.match(/\d+/g)
                if (rgb) {
                  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
                  setIsDarkBackground(brightness < 128)
                }
              }
            }
          })
          
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <FloatingButton
      onClick={toggle}
      disabled={!isLoaded}
      isDarkBackground={isDarkBackground}
      isVisible={isLoaded}
      className="fixed bottom-6 right-18 z-40"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
    </FloatingButton>
  )
}
