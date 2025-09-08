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
  const deviceType = useDeviceType()

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
      case 'mobile': return { primary: 0.10, secondary: 0.05 }
      case 'tablet': return { primary: 0.10, secondary: 0.05 }
      default: return { primary: 0.35, secondary: 0.3 }
    }
  }

  const speeds = getShaderSpeed()
  const showSecondaryShader = deviceType !== 'mobile' // Remove secondary shader on mobile

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Simplified SVG Filters for mobile/tablet */}
      {deviceType === 'desktop' && (
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.1" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.6" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                        0 1 0 0 0.02
                        0 0 1 0 0.05
                        0 0 0 0.9 0"
                result="tint"
              />
            </filter>
            <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Primary Background Shader */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#644a40", "#582d1d", "#202020", "#e8e8e8"]}
        speed={speeds.primary}
      />
      
      {/* Secondary Shader - Hidden on mobile for performance */}
      {showSecondaryShader && (
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#ffdfb5", "#644a40", "#582d1d", "#ffffff"]}
          speed={speeds.secondary}
          wireframe="true"
        />
      )}

      {children}
    </div>
  )
}
