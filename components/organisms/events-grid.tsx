"use client"

import { EventData, EventPhoto } from "@/lib/events-data"
import { EventCard } from "@/components/molecules/event-card"

interface EventsGridProps {
  events: EventData[]
  onPhotoClick: (photos: EventPhoto[], eventTitle: string) => void
  onCardClick: (event: EventData) => void
}

export function EventsGrid({ events, onPhotoClick, onCardClick }: EventsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            index={index}
            onPhotoClick={onPhotoClick}
            onCardClick={onCardClick}
          />
        ))
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-gray-500 text-lg">No events found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
