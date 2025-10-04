"use client"

import { useState, useEffect } from "react"

interface StandardPageHeaderProps {
  title: string
  subtitle?: string
  description: string
  isLoaded?: boolean
}

export function StandardPageHeader({ title, subtitle, description, isLoaded = true }: StandardPageHeaderProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const descriptionWords = description.split(" ")

  useEffect(() => {
    if (isLoaded && wordIndex < descriptionWords.length) {
      const timer = setTimeout(() => {
        setWordIndex(prev => prev + 1)
      }, 20)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, wordIndex, descriptionWords.length])

  return (
    <div className="container mx-auto px-4 text-center page-header-spacing">
      <h1 className={`standard-page-title ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        {title}
      </h1>
      {subtitle && (
        <div className={`standard-page-subtitle ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          {subtitle}
        </div>
      )}
      <p className="standard-page-description">
        {descriptionWords.map((word, index) => (
          <span
            key={index}
            className={`animated-word ${
              index < wordIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${400 + index * 20}ms` }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  )
}
