"use client"

import { useState, useEffect, useRef } from "react"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

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
      { time: "Morning", title: "Patriotic Ceremony" },
      { time: "2pm - 4pm", title: "Mahila Program" },
      { time: "4pm - 6pm", title: "Afternoon Katha" },
      { time: "Evening", title: "Samuh Raas" }
    ],
    isHighlight: true
  },
  {
    date: "31",
    dayName: "Friday",
    month: "July", 
    events: [
      { time: "Morning", title: "Katha Varta and Ashiwaad" },
      { time: "2pm - 4pm", title: "Mahila Program" },
      { time: "4pm - 6pm", title: "Afternoon Katha" },
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
      { time: "4pm - 6pm", title: "Afternoon Katha" },
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

  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const titleWords = "Calendar of Events".split(" ")
  const descriptionWords = "Come celebrate 25 years of community, faith, and fellowship! Join us for this special milestone event designed for all ages.".split(" ")

  // Theme constants for easy customization
  const theme = {
    gradients: {
      title: 'bg-gradient-to-r from-orange-600 to-red-600',
      subtitle: 'bg-gradient-to-r from-orange-500 to-red-500',
      background: 'bg-gradient-to-br from-orange-50 via-white to-red-50',
      cardOverlay: 'bg-gradient-to-br from-orange-100/20 to-red-100/20',
      eventHighlight: 'bg-gradient-to-r from-orange-100 to-red-100',
      eventHighlightStatic: 'bg-gradient-to-r from-orange-50 to-red-50'
    },
    colors: {
      highlight: 'text-orange-600',
      ring: 'ring-orange-200',
      border: 'border-orange-300'
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
      setShowTitle(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, index]))
          }
        },
        { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
      )
      
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [isMobile, isLoaded])

  useEffect(() => {
    if (isLoaded && wordIndex < titleWords.length + descriptionWords.length) {
      const timer = setTimeout(() => {
        setWordIndex(prev => prev + 1)
      }, wordIndex < titleWords.length ? 100 : 20)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, wordIndex, titleWords.length, descriptionWords.length])

  return (
    <div className={`min-h-screen ${theme.gradients.background} page-bg-extend`}>
      <div className="container mx-auto px-4 page-bottom-spacing">
        {/* Header */}
        <div className="text-center page-header-spacing">
          <h1 className={`page-title-size font-bold ${theme.gradients.title} bg-clip-text text-transparent mb-2 leading-tight transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            Calendar of Events
          </h1>
          <div className={`text-2xl md:text-3xl font-semibold ${theme.gradients.subtitle} bg-clip-text text-transparent mb-6 leading-relaxed transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            July 25 - August 2, 2026
          </div>
          <p className="text-gray-600 page-description-size leading-relaxed max-w-4xl mx-auto">
            {descriptionWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 transition-all duration-500 ease-out ${
                  index < wordIndex - titleWords.length ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 20}ms` }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {scheduleData.map((day, index) => {
            const isCardVisible = isMobile ? visibleCards.has(index) : false
            const shouldAnimate = !isMobile ? hoveredCard === index : isCardVisible
            
            return (
            <div
              key={`${day.month}-${day.date}`}
              ref={el => cardRefs.current[index] = el}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer overflow-hidden ${
                day.isHighlight ? `ring-2 ${theme.colors.ring}` : ''
              } ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${800 + index * 100}ms`,
                transform: shouldAnimate ? 'translateY(-8px)' : undefined
              }}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
            >
              {/* Gradient overlay for highlight days */}
              {day.isHighlight && (
                <div className={`absolute inset-0 ${theme.gradients.cardOverlay} transition-opacity duration-200 ${
                  shouldAnimate ? 'opacity-100' : 'opacity-0'
                }`} />
              )}
              
              {/* Date Header */}
              <div className="relative p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className={`text-5xl font-bold transition-colors duration-300 ${
                      day.isHighlight ? theme.colors.highlight : 'text-gray-800'
                    }`}>
                      {day.date}
                    </div>
                    <div className="text-base text-gray-500 font-medium">
                      {day.month}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-gray-800">
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
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        day.isHighlight 
                          ? shouldAnimate
                            ? theme.gradients.eventHighlight
                            : theme.gradients.eventHighlightStatic
                          : shouldAnimate
                            ? 'bg-gray-100'
                            : 'bg-gray-50'
                      }`}
                      style={{
                        transform: shouldAnimate ? `translateX(${eventIndex * 2}px)` : undefined,
                        transitionDelay: `${eventIndex * 30}ms`
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`text-sm font-medium mb-1 ${
                            day.isHighlight ? theme.colors.highlight : 'text-gray-500'
                          }`}>
                            {event.time}
                          </div>
                          <div className="text-base font-semibold text-gray-800 leading-tight">
                            {event.title}
                          </div>
                          {event.description && (
                            <div className="text-sm text-gray-600 mt-1 italic">
                              {event.description}
                            </div>
                          )}
                        </div>
                        <div className={`w-2 h-2 rounded-full ml-3 mt-1 transition-all duration-200 ${
                          day.isHighlight 
                            ? shouldAnimate ? 'bg-orange-500' : 'bg-orange-400'
                            : shouldAnimate ? 'bg-gray-400' : 'bg-gray-300'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-200 pointer-events-none ${
                shouldAnimate
                  ? day.isHighlight 
                    ? theme.colors.border 
                    : 'border-gray-300'
                  : 'border-transparent'
              }`} />
            </div>
          )})}
        </div>

        {/* Footer note */}
        <div className={`text-center mt-8 transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <p className="text-gray-500 text-md">
            * Highlighted days indicate major ceremony events
          </p>
        </div>
      </div>
    </div>
  )
}