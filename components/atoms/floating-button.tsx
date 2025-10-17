"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDarkBackground: boolean
  isVisible: boolean
}

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  ({ isDarkBackground, isVisible, className, children, ...props }, ref) => {
    const bgClass = isDarkBackground ? 'bg-black/10 hover:bg-black/20' : 'bg-white/10 hover:bg-white/20'
    const textClass = isDarkBackground ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'

    return (
      <button
        ref={ref}
        className={cn(
          "p-3 rounded-full backdrop-blur-sm transition-all duration-300",
          bgClass,
          textClass,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

FloatingButton.displayName = "FloatingButton"
