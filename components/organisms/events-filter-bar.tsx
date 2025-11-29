"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import { TagBadge } from "@/components/atoms/tag-badge"
import { EventsDatePicker } from "@/components/molecules/events-date-picker"

interface EventsFilterBarProps {
  allTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  dateRange: { start: Date | null; end: Date | null }
  onDateRangeChange: (range: { start: Date | null; end: Date | null }) => void
  onClearFilters: () => void
}

export function EventsFilterBar({
  allTags,
  selectedTags,
  onTagToggle,
  dateRange,
  onDateRangeChange,
  onClearFilters
}: EventsFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 mb-8"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-800">Filter Events</h3>
          {(selectedTags.length > 0 || dateRange.start || dateRange.end) && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
              {selectedTags.length + (dateRange.start || dateRange.end ? 1 : 0)} active
            </span>
          )}
        </div>
        <button
          onClick={onClearFilters}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Tag Filters */}
      <div className="mb-4">
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Filter by Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <TagBadge
              key={tag}
              tag={tag}
              onClick={() => onTagToggle(tag)}
              isActive={selectedTags.includes(tag)}
            />
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <EventsDatePicker
        value={dateRange}
        onChange={onDateRangeChange}
      />
    </motion.div>
  )
}
