"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { Input } from "@/components/ui/input"

const PhoneInput = lazy(() => import("@/components/ui/phone-input").then(module => ({ default: module.PhoneInput })))

interface LazyPhoneInputProps {
  value?: string
  onChange: (value?: string) => void
  placeholder?: string
  defaultCountry?: string
  id?: string
}

export default function LazyPhoneInput({ value, onChange, placeholder, defaultCountry, id }: LazyPhoneInputProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <Input
        id={id}
        type="tel"
        placeholder={placeholder}
        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
      />
    )
  }

  return (
    <Suspense fallback={
      <Input
        id={id}
        type="tel"
        placeholder={placeholder}
        className="h-14 text-base bg-white/20 border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm"
      />
    }>
      <PhoneInput
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        defaultCountry={defaultCountry as any}
      />
    </Suspense>
  )
}