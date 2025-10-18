'use client'

import { useAudioContext } from '@/contexts/audio-context'
import { Play, Pause } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FloatingButton } from './atoms/floating-button'

gsap.registerPlugin(ScrollTrigger)

export function AudioPlayer() {
  const { toggle, isPlaying, isLoaded, fadeOut } = useAudioContext()
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const rafRef = useRef<number>()

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: '[data-section="sihasan"]',
      start: 'bottom center',
      onEnter: () => fadeOut(2000),
      onEnterBack: () => fadeOut(2000),
    })

    return () => trigger.kill()
  }, [fadeOut])

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            const element = document.elementFromPoint(50, window.innerHeight - 180)
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
      isVisible={true}
      className="fixed bottom-[6.5rem] md:bottom-[9rem] right-6 z-40"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? (
        <Pause size={24} />
      ) : (
        <Play size={24} className="ml-0.5" />
      )}
    </FloatingButton>
  )
}

export function AudioPlayButton() {
  const { play, isLoaded } = useAudioContext()
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            const element = document.elementFromPoint(50, window.innerHeight - 240)
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <FloatingButton
      onClick={play}
      disabled={!isLoaded}
      isDarkBackground={isDarkBackground}
      isVisible={true}
      className="fixed bottom-[6.5rem] md:bottom-[9rem] right-[4.5rem] z-40"
      aria-label="Play background audio"
    >
      <Play size={24} className="ml-0.5" />
    </FloatingButton>
  )
}
