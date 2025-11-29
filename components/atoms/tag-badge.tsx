"use client"

import { tagColors } from "@/lib/events-data"

interface TagBadgeProps {
  tag: string
  onClick?: () => void
  isActive?: boolean
}

export function TagBadge({ tag, onClick, isActive = false }: TagBadgeProps) {
  const colors = tagColors[tag] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300"
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
        isActive
          ? `${colors.bg} ${colors.text} ${colors.border} ring-2 ring-offset-1`
          : `${colors.bg} ${colors.text} ${colors.border} hover:shadow-md`
      }`}
      disabled={!onClick}
    >
      {tag}
    </button>
  )
}
