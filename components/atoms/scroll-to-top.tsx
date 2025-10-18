"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"
import { FloatingButton } from "./floating-button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <FloatingButton
      onClick={scrollToTop}
      isDarkBackground={isDarkBackground}
      isVisible={isVisible}
      className="fixed bottom-6 right-24 z-40"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </FloatingButton>
  )
}