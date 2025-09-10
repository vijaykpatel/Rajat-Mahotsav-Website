"use client"

import { memo } from 'react'
import ElectricBorder from './electric-border'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface OptimizedElectricBorderProps {
  children: React.ReactNode
  color?: string
  speed?: number
  chaos?: number
  thickness?: number
  className?: string
  style?: React.CSSProperties
}

const OptimizedElectricBorder = memo(({ 
  children, 
  color = '#5227FF', 
  speed = 1, 
  chaos = 1, 
  thickness = 2, 
  className, 
  style 
}: OptimizedElectricBorderProps) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  })

  // Reduce speed and chaos for better performance, stop when not visible
  const optimizedSpeed = isVisible ? speed * 0.4 : 0
  const optimizedChaos = isVisible ? chaos * 0.5 : 0

  return (
    <div ref={elementRef}>
      <ElectricBorder
        color={color}
        speed={optimizedSpeed}
        chaos={optimizedChaos}
        thickness={thickness}
        className={className}
        style={style}
      >
        {children}
      </ElectricBorder>
    </div>
  )
})

OptimizedElectricBorder.displayName = 'OptimizedElectricBorder'

export default OptimizedElectricBorder