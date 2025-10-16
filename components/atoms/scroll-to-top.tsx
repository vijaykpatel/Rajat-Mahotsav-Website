"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Fast visibility check
          setIsVisible(window.scrollY > 300)
          
          // Throttle expensive background sampling
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = requestAnimationFrame(() => {
            const element = document.elementFromPoint(window.innerWidth - 50, window.innerHeight - 100)
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
    <button
      onClick={scrollToTop}
      className={`fixed bottom-2 md:bottom-20 right-6 z-40 p-3 rounded-full transition-all duration-300 ${
        isDarkBackground ? 'text-white/90 hover:text-white bg-black/10 hover:bg-black/20' : 'text-black/90 hover:text-black bg-white/10 hover:bg-white/20'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  )
}