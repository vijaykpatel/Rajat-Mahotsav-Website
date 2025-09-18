"use client"

import { useState, useEffect } from "react"
import OptimizedElectricBorder from "./optimized-electric-border"
import { Instagram, Youtube } from "lucide-react"
import Image from "next/image"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function StickyFooter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const targetDate = '2026-07-28T17:00:00-05:00'

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const borderProps = {
    color: "#E8E8E8",
    thickness: 2,
    style: { 
      borderRadius: 16,
      width: 'fit-content',
      height: 'auto'
    },
    className: "flex items-center justify-center py-2 px-4"
  }

  const countdownContent = (
    <div className="flex items-center justify-center gap-1 font-noto-music">
      <span className="text-lg font-black text-white tracking-tight">{timeLeft.days.toString().padStart(3, '0')}d</span>
      <span className="text-sm font-black text-white tracking-tight">-</span>
      <span className="text-lg font-black text-white tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}h</span>
      <span className="text-sm font-black text-white tracking-tight">-</span>
      <span className="text-lg font-black text-white tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
      <span className="text-sm font-black text-white tracking-tight">-</span>
      <span className="text-lg font-black text-white tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
    </div>
  )

  return (
    <footer className="bg-black h-32">
      <div className="grid grid-cols-3 items-center h-20 px-4">
        {/* Left - Shreejibapa */}
        <div className="flex justify-start">
          <span className="text-sm font-medium text-white">Shreejibapa</span>
        </div>

        {/* Center - Countdown */}
        <div className="flex justify-center">
          <OptimizedElectricBorder
            {...borderProps}
            speed={0.8}
            chaos={0.7}
          >
            {countdownContent}
          </OptimizedElectricBorder>
        </div>

        {/* Right - Swamibapa */}
        <div className="flex justify-end">
          <span className="text-sm font-medium text-white">Swamibapa</span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 items-center h-12 px-4 border-t border-gray-600">
        {/* Left - Empty */}
        <div></div>

        {/* Center - Social Links */}
        <div className="flex justify-center items-center gap-4">
          <a 
            href="https://www.instagram.com/sgadinewjersey/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.youtube.com/@SwaminarayanGadi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <Youtube size={20} />
          </a>
          <a 
            href="https://www.swaminarayangadi.com/newjersey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <Image 
              src="/maninagar_logo.png" 
              alt="Maninagar Logo" 
              width={20} 
              height={20} 
              className="filter brightness-0 invert"
            />
          </a>
        </div>

        {/* Right - Address */}
        <div className="flex justify-end">
          <span className="text-xs text-white text-right">
            200 Swamibapa Way<br />
            Secaucus, NJ 07094
          </span>
        </div>
      </div>
    </footer>
  )
}