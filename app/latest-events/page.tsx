"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { EventsFilterBar } from "@/components/organisms/events-filter-bar"
import { EventsGrid } from "@/components/organisms/events-grid"
import { PhotoAlbumModal } from "@/components/organisms/photo-album-modal"
import { EventDetailsModal } from "@/components/organisms/event-details-modal"
import { eventsData, EventPhoto, EventData } from "@/lib/events-data"

function EventsPageContent() {
  const searchParams = useSearchParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  })
  const [photoModalOpen, setPhotoModalOpen] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<EventPhoto[]>([])
  const [selectedEventTitle, setSelectedEventTitle] = useState("")
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [photoModalInitialIndex, setPhotoModalInitialIndex] = useState(0)

  // Initialize filters from URL parameters
  useEffect(() => {
    const tagsParam = searchParams.get('tags')
    if (tagsParam) {
      const tags = tagsParam.split(',').map(tag => tag.trim())
      setSelectedTags(tags)
    }
  }, [searchParams])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    eventsData.forEach(event => event.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags).sort()
  }, [])

  // Filter events based on selected tags and date range
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      // Tag filter (OR logic - show if ANY selected tag matches)
      const tagMatch = selectedTags.length === 0 ||
        event.tags.some(tag => selectedTags.includes(tag))

      // Date range filter (inclusive)
      const eventDate = new Date(event.date)
      const dateMatch =
        (!dateRange.start || eventDate >= dateRange.start) &&
        (!dateRange.end || eventDate <= dateRange.end)

      return tagMatch && dateMatch
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort newest first
  }, [selectedTags, dateRange])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setSelectedTags([])
    setDateRange({ start: null, end: null })
  }

  const handlePhotoClick = (photos: EventPhoto[], eventTitle: string) => {
    setSelectedPhotos(photos)
    setSelectedEventTitle(eventTitle)
    setPhotoModalOpen(true)
  }

  const handleCardClick = (event: EventData) => {
    setSelectedEvent(event)
    setDetailsModalOpen(true)
  }

  const handlePhotoClickFromDetails = (photoIndex: number) => {
    if (selectedEvent) {
      setPhotoModalInitialIndex(photoIndex)
      setSelectedPhotos(selectedEvent.photos)
      setSelectedEventTitle(selectedEvent.title)
      setPhotoModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing">
        {/* Header */}
        <StandardPageHeader
          title="Latest Events"
          subtitle="Celebrating 25 Years Together"
          description="Throughout 2025 and 2026, we're celebrating our 25th anniversary with community service events, religious programs, and temple gatherings. Catch up on our latest activities."
          isLoaded={isLoaded}
        />

        {/* Filter Bar */}
        <EventsFilterBar
          allTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={handleClearFilters}
        />

        {/* Events Grid */}
        <EventsGrid
          events={filteredEvents}
          onPhotoClick={handlePhotoClick}
          onCardClick={handleCardClick}
        />

        {/* Event Details Modal (slides from bottom) */}
        <EventDetailsModal
          event={selectedEvent}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          onPhotoClick={handlePhotoClickFromDetails}
        />

        {/* Photo Album Modal (fullscreen carousel) */}
        <PhotoAlbumModal
          photos={selectedPhotos}
          title={selectedEventTitle}
          open={photoModalOpen}
          onOpenChange={setPhotoModalOpen}
          initialIndex={photoModalInitialIndex}
        />
      </div>
    </div>
  )
}

export default function CurrentEventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading events...</p>
      </div>
    </div>}>
      <EventsPageContent />
    </Suspense>
  )
}
