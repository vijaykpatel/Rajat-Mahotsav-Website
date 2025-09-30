"use client"

import { useState, useEffect, Suspense, lazy } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const RegistrationDatePicker = lazy(() => import("@/components/registration-date-picker"))

interface LazyDatePickerProps {
  value: any
  onChange: (value: any) => void
  error?: string
}

export default function LazyDatePicker({ value, onChange, error }: LazyDatePickerProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="space-y-2">
        <Label className="text-base font-medium text-gray-700">Travel Dates *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Arrival Date</Label>
            <Input
              type="text"
              placeholder="Select arrival date"
              className="h-14 text-base bg-white/60 border-orange-200 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm focus:ring-orange-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Departure Date</Label>
            <Input
              type="text"
              placeholder="Select departure date"
              className="h-14 text-base bg-white/60 border-orange-200 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm focus:ring-orange-200"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="space-y-2">
        <Label className="text-base font-medium text-gray-700">Travel Dates *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Arrival Date</Label>
            <Input
              type="text"
              placeholder="Loading..."
              className="h-14 text-base bg-white/60 border-orange-200 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm focus:ring-orange-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-600">Departure Date</Label>
            <Input
              type="text"
              placeholder="Loading..."
              className="h-14 text-base bg-white/60 border-orange-200 text-gray-800 placeholder:text-gray-400 backdrop-blur-sm focus:ring-orange-200"
            />
          </div>
        </div>
      </div>
    }>
      <RegistrationDatePicker
        value={value}
        onChange={onChange}
        error={error}
      />
    </Suspense>
  )
}