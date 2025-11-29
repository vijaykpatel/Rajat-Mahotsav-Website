"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { EventData, EventPhoto } from "@/lib/events-data"
import { TagBadge } from "@/components/atoms/tag-badge"

interface EventCardProps {
  event: EventData
  index: number
  onPhotoClick: (photos: EventPhoto[], eventTitle: string) => void
  onCardClick: (event: EventData) => void
}

export function EventCard({ event, index, onPhotoClick, onCardClick }: EventCardProps) {
  // Parse date as local date (not UTC) to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number)
  const localDate = new Date(year, month - 1, day)

  const formattedDate = localDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onPhotoClick(event.photos, event.title)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
      onClick={() => onCardClick(event)}
    >
      {/* YouTube Video Embed or Photo Thumbnail */}
      {event.youtubeVideoId ? (
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${event.youtubeVideoId}`}
            title={event.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : event.photos.length > 0 ? (
        <div
          className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 relative group"
          onClick={handlePhotoClick}
        >
          <img
            src={event.photos[0].url}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {event.photos.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {event.photos.length} photos
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100" />
      )}

      {/* Card Content */}
      <div className="p-6">
        {/* Date Badge */}
        <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold mb-3">
          <Calendar className="w-4 h-4" />
          {formattedDate}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map(tag => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
