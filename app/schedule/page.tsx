"use client"

import { useState, useEffect } from "react"
import { useNavbarHeight } from "@/hooks/use-navbar-height"

interface Event {
  time: string
  title: string
  description?: string
}

interface ScheduleDay {
  date: string
  dayName: string
  month: string
  events: Event[]
  isHighlight?: boolean
}

const scheduleData: ScheduleDay[] = [
  {
    date: "25",
    dayName: "Saturday",
    month: "July",
    events: [{ time: "All Day", title: "Sports Program" }]
  },
  {
    date: "26",
    dayName: "Sunday", 
    month: "July",
    events: [{ time: "All Day", title: "Sports Program" }]
  },
  {
    date: "27",
    dayName: "Monday",
    month: "July", 
    events: [{ time: "All Day", title: "Sports Program" }]
  },
  {
    date: "28",
    dayName: "Tuesday",
    month: "July",
    events: [
      { time: "Morning", title: "Swagat Kariakram" },
      { time: "Evening", title: "Opening Ceremony" }
    ],
    isHighlight: true
  },
  {
    date: "29", 
    dayName: "Wednesday",
    month: "July",
    events: [
      { time: "Morning", title: "Gurupoornima" },
      { time: "Evening", title: "Bhakti Sandhya" }
    ],
    isHighlight: true
  },
  {
    date: "30",
    dayName: "Thursday", 
    month: "July",
    events: [
      { time: "Morning", title: "Statue of Liberty", description: "Planning phase" },
      { time: "2pm - 4pm", title: "Mahila Program" },
      { time: "4pm - 6pm", title: "Program" },
      { time: "Evening", title: "Samuh Raas" }
    ],
    isHighlight: true
  },
  {
    date: "31",
    dayName: "Friday",
    month: "July", 
    events: [
      { time: "Morning", title: "Katha Varta and Ashiwaad", description: "at mandir" },
      { time: "2pm - 4pm", title: "Mahila Program" },
      { time: "4pm - 6pm", title: "Program" },
      { time: "Evening", title: "Bhakti Nrutya" }
    ],
    isHighlight: true
  },
  {
    date: "1",
    dayName: "Saturday",
    month: "August",
    events: [
      { time: "Morning", title: "Nagaryatra" },
      { time: "4pm - 6pm", title: "Program" },
      { time: "Evening", title: "Naatika" }
    ],
    isHighlight: true
  },
  {
    date: "2", 
    dayName: "Sunday",
    month: "August",
    events: [
      { time: "Morning", title: "Patotsav" }
    ],
    isHighlight: true
  }
]

export default function SchedulePage() {
  const { dynamicPadding } = useNavbarHeight()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50" style={{ paddingTop: dynamicPadding }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Calendar of Events: July 25 - August 2, 2026
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Please join us and don't miss out on any of the fun. We are organizing events for everyone and people of all ages.
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {scheduleData.map((day, index) => (
            <div
              key={`${day.month}-${day.date}`}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer overflow-hidden ${
                day.isHighlight ? 'ring-2 ring-orange-200' : ''
              } ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: hoveredCard === index ? 'translateY(-8px) scale(1.02)' : undefined
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient overlay for highlight days */}
              {day.isHighlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-red-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              
              {/* Date Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-right">
                    <div className={`text-4xl font-bold transition-colors duration-300 ${
                      day.isHighlight ? 'text-orange-600' : 'text-gray-800'
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {day.month}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-semibold text-gray-800">
                      {day.dayName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Events */}
              <div className="relative px-6 pb-6">
                <div className="space-y-3">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        day.isHighlight 
                          ? 'bg-gradient-to-r from-orange-50 to-red-50 group-hover:from-orange-100 group-hover:to-red-100' 
                          : 'bg-gray-50 group-hover:bg-gray-100'
                      }`}
                      style={{
                        transform: hoveredCard === index ? `translateX(${eventIndex * 2}px)` : undefined,
                        transitionDelay: `${eventIndex * 50}ms`
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`text-xs font-medium mb-1 ${
                            day.isHighlight ? 'text-orange-600' : 'text-gray-500'
                          }`}>
                            {event.time}
                          </div>
                          <div className="text-sm font-semibold text-gray-800 leading-tight">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-xs text-gray-600 mt-1 italic">
                              {event.description}
                            </div>
                          )}
                        </div>
                        <div className={`w-2 h-2 rounded-full ml-3 mt-1 transition-all duration-300 ${
                          day.isHighlight 
                            ? 'bg-orange-400 group-hover:bg-orange-500' 
                            : 'bg-gray-300 group-hover:bg-gray-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
                hoveredCard === index 
                  ? day.isHighlight 
                    ? 'border-orange-300' 
                    : 'border-gray-300'
                  : 'border-transparent'
              }`} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className={`text-center mt-12 transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-gray-500 text-sm">
            * Highlighted days indicate major ceremony events
          </p>
        </div>
      </div>
    </div>
  )
}