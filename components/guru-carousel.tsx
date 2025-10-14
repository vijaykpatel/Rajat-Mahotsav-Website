"use client"

import { useEffect, useState, useRef } from "react"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './video-carousel-dots'
import GuruCard from "./guru-card"

interface Guru {
  imageId: string
  name: string
}

interface GuruCarouselProps {
  gurus: Guru[]
}

export default function GuruCarousel({ gurus }: GuruCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const [resetKey, setResetKey] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!emblaApi || !isVisible) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [emblaApi, resetKey, isVisible])

  useEffect(() => {
    if (!emblaApi) return
    const onPointerDown = () => setResetKey(k => k + 1)
    emblaApi.on('pointerDown', onPointerDown)
    return () => { emblaApi.off('pointerDown', onPointerDown) }
  }, [emblaApi])

  return (
    <div ref={carouselRef} className="w-full flex flex-col items-center">
      <div className="overflow-hidden w-full max-w-md" ref={emblaRef}>
        <div className="flex">
          {gurus.map((guru, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 flex justify-center">
              <GuruCard imageId={guru.imageId} name={guru.name} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => { onDotButtonClick(index); setResetKey(k => k + 1) }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === selectedIndex ? 'bg-orange-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
