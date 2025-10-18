"use client"

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0,
  rootMargin = '0px',
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = elementRef.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !element) return

    const observerParams = { threshold, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      setIsVisible(entry.isIntersecting)
    }, observerParams)

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, frozen])

  return { elementRef, isVisible, entry }
}