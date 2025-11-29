"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Image as ImageIcon, Play } from "lucide-react"
import { EventData } from "@/lib/events-data"
import { TagBadge } from "@/components/atoms/tag-badge"

interface EventDetailsModalProps {
  event: EventData | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onPhotoClick: (photoIndex: number) => void
}

export function EventDetailsModal({
  event,
  open,
  onOpenChange,
  onPhotoClick
}: EventDetailsModalProps) {
  if (!event) return null

  // Parse date as local date (not UTC) to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number)
  const localDate = new Date(year, month - 1, day)

  const formattedDate = localDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal sliding from bottom */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-hidden"
          >
            <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-br from-orange-50 to-red-50 border-b border-orange-100 px-6 md:px-8 py-5 flex items-start justify-between z-10">
                <div className="flex-1 min-w-0 pr-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                    {event.title}
                  </h2>
                  <div className="flex items-center gap-2 text-base text-orange-600 font-semibold">
                    <Calendar className="w-5 h-5" />
                    {formattedDate}
                  </div>
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="flex-shrink-0 p-2 hover:bg-white rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] overscroll-contain">
                <div className="p-6 md:p-8 space-y-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>

                  {/* Two Column Layout: Description + Video */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left Column: Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {event.description}
                      </p>
                    </div>

                    {/* Right Column: YouTube Video */}
                    {event.youtubeVideoId && (
                      <div className="w-full">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg sticky top-4">
                          <iframe
                            src={`https://www.youtube.com/embed/${event.youtubeVideoId}`}
                            title={event.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo Gallery */}
                  {event.photos.length > 0 && (
                    <div className="border-t border-gray-200 pt-8">
                      <div className="flex items-center gap-2 mb-5">
                        <ImageIcon className="w-6 h-6 text-orange-600" />
                        <h3 className="text-xl font-bold text-gray-900">
                          Photo Gallery ({event.photos.length})
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {event.photos.map((photo, index) => (
                          <motion.div
                            key={photo.url}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                            onClick={() => onPhotoClick(index)}
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption || `Photo ${index + 1}`}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white/90 rounded-full p-2">
                                  <ImageIcon className="w-5 h-5 text-gray-800" />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bottom Spacing for Mobile */}
                  <div className="h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
