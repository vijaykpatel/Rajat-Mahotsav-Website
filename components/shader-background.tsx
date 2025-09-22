"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import { useDeviceType } from "@/hooks/use-device-type"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [mounted, setMounted] = useState(false)
  const deviceType = useDeviceType()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container && deviceType === 'desktop') {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [deviceType])

  // Performance-optimized speeds based on device
  const getShaderSpeed = () => {
    switch (deviceType) {
      case 'mobile': return { primary: 0.20, secondary: 0.15 }
      case 'tablet': return { primary: 0.20, secondary: 0.15 }
      default: return { primary: 0.55, secondary: 0.35 }
    }
  }

  const speeds = getShaderSpeed()
  const showSecondaryShader = deviceType !== 'mobile' // Remove secondary shader on mobile

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Simplified SVG Filters for mobile/tablet */}
      {mounted && deviceType === 'desktop' && (
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.2" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                        0 1 0 0 0.02
                        0 0 1 0 0.05
                        0 0 0 0 0"
                result="tint"
              />
            </filter>
            <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0 -9"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
        
      )}

      {/* 
        ORIGINAL COLOR SCHEME (stored for reference):
        Primary: ["#644a40", "#582d1d", "#202020", "#e8e8e8"]
        Secondary: ["#ffdfb5", "#644a40", "#582d1d", "#ffffff"]
      */}

      {/* <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#FFD700", "#C0C0C0", "#DC143C", "#72b8d3ff"]}
        speed={speeds.primary}
      />
      
      {mounted && showSecondaryShader && (
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-50"
          colors={["#FFA500", "#E5E5E5", "#B22222","#4682B4"]}
          speed={speeds.secondary}
          wireframe="true"
        />
      )} */}
      
      {/* Primary Background Shader - Elegant Red/Blue/White/Silver Theme */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#8B1538", "#2E4A8B", "#F8F9FA", "#B8BCC8"]}
        speed={speeds.primary}
      />
      
      {/* Secondary Shader - Hidden on mobile for performance */}
      {mounted && showSecondaryShader && (
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-35"
          colors={["#A0304E", "#4A6FA5", "#FEFEFE", "#D1D5DB"]}
          speed={speeds.secondary}
          wireframe="true"
        />
      )}

      {children}
    </div>
  )
}
