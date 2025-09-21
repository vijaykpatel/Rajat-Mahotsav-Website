"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
      
      // Sample background color at button position
      const element = document.elementFromPoint(window.innerWidth - 50, window.innerHeight - 100)
      if (element) {
        const styles = window.getComputedStyle(element)
        const bgColor = styles.backgroundColor
        
        // Check if background is light or dark
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          const rgb = bgColor.match(/\d+/g)
          if (rgb) {
            const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
            setIsDarkBackground(brightness < 128)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 z-40 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
        isDarkBackground ? 'text-white/90 hover:text-white bg-black/20 hover:bg-black/30' : 'text-black/90 hover:text-black bg-white/20 hover:bg-white/30'
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  )
}