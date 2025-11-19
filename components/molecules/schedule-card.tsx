"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Calendar, Clock, MapPin, ChevronDown } from "lucide-react"

export interface Event {
    time: string
    title: string
    description?: string
    location?: string
    type?: "ceremony" | "social" | "food" | "other"
}

export interface ScheduleDay {
    date: string
    dayName: string
    month: string
    events: Event[]
    isHighlight?: boolean
}

interface ScheduleCardProps {
    day: ScheduleDay
    index: number
}

export function ScheduleCard({ day, index }: ScheduleCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    // Toggle expansion on click for mobile, hover for desktop could be annoying if it shifts layout too much.
    // Let's keep it simple: Hover effects for visual pop, Click for details if needed, or just show details nicely.
    // The user wants "revealing".

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "relative group rounded-3xl overflow-hidden cursor-pointer transition-all duration-500",
                "border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20",
                day.isHighlight ? "bg-gradient-to-br from-orange-50/90 to-red-50/90 backdrop-blur-xl" : "bg-white/80 backdrop-blur-md"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-purple-500/10 rounded-tr-full -ml-10 -mb-10 transition-transform duration-700 group-hover:scale-150" />

            <div className="relative p-6 md:p-8">
                {/* Date Header */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-widest text-gray-500 uppercase">{day.month}</span>
                        <span className={cn(
                            "text-5xl md:text-6xl font-black tracking-tighter transition-colors duration-300",
                            day.isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600" : "text-gray-800"
                        )}>
                            {day.date}
                        </span>
                        <span className="text-lg font-medium text-gray-600 mt-1">{day.dayName}</span>
                    </div>

                    {/* Event Count Badge */}
                    <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                        day.isHighlight
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                    )}>
                        {day.events.length} Events
                    </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {day.events.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.8, x: 0 }}
                            whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.5)" }}
                            className={cn(
                                "relative p-3 rounded-xl border border-transparent transition-all duration-300",
                                "hover:border-gray-200/50 hover:shadow-sm"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                {/* Time Indicator */}
                                <div className="flex-shrink-0 w-20 pt-1 flex items-center gap-1.5">
                                    <Clock className={cn("w-3.5 h-3.5", day.isHighlight ? "text-orange-600" : "text-blue-600")} />
                                    <span className={cn(
                                        "text-xs font-bold",
                                        day.isHighlight ? "text-orange-600" : "text-blue-600"
                                    )}>
                                        {event.time}
                                    </span>
                                </div>

                                {/* Event Details */}
                                <div className="flex-grow">
                                    <h4 className="text-base font-bold text-gray-800 leading-tight group-hover/event:text-orange-600 transition-colors">
                                        {event.title}
                                    </h4>

                                    {/* Location if available */}
                                    {event.location && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                            <MapPin className="w-3 h-3" />
                                            {event.location}
                                        </div>
                                    )}

                                    {/* Description - Revealed/Expanded */}
                                    <AnimatePresence>
                                        {(isHovered || isExpanded || day.isHighlight) && event.description && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 4 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <p className="text-sm text-gray-500 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Interactive Hint */}
                <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
                </div>
            </div>

            {/* Bottom Highlight Line */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left",
                day.isHighlight ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-blue-400 to-purple-500"
            )} />
        </motion.div>
    )
}
