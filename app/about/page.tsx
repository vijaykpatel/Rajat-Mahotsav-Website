"use client"

import { useState, useEffect } from "react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { Calendar, Heart, Users, Sparkles, MapPin, Phone, Clock, Globe, ChevronDown, ChevronUp } from "lucide-react"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isStoryExpanded, setIsStoryExpanded] = useState(false)
  const [expandedHighlights, setExpandedHighlights] = useState({
    timeline: false,
    community: false,
    unity: false,
    experience: false,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const toggleHighlight = (key: keyof typeof expandedHighlights) => {
    setExpandedHighlights((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing max-w-5xl">
        <StandardPageHeader
          title="About the Rajat Mahotsav"
          description="Celebrating 25 years of spiritual service, community devotion, and divine blessings at Shree Swaminarayan Temple Secaucus. Join us for this historic Silver Jubilee celebration from July 27 - August 2, 2026."
          isLoaded={isLoaded}
        />

        <div className="space-y-8">
          {/* Main Story */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div
              className={`relative overflow-hidden transition-[max-height] duration-300 sm:max-h-none ${
                isStoryExpanded ? "max-h-[2000px]" : "max-h-[22rem]"
              }`}
            >
              <div className="prose prose-xl max-w-none text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  Shree Swaminarayan Temple Secaucus has been a beacon of spiritual light and community service for 25 years. Founded in 2001, our temple has grown from humble beginnings into a vibrant center of worship, culture, and compassion serving the greater New Jersey community.
                </p>
                <p className="leading-relaxed">
                  The Rajat Mahotsav (Silver Jubilee) marks this historic milestone with a week-long celebration honoring Lord Shree Ghanshyam Maharaj and the divine guidance of Jeevanpran Shree Muktajeevan Swamibapa. This momentous occasion brings together devotees from around the world to celebrate our shared faith, values, and the countless blessings we have received.
                </p>
                <p className="leading-relaxed">
                  Our temple follows the teachings of the Swaminarayan Sampraday, emphasizing devotion to God, service to humanity, and living a life of dharma (righteousness). Through daily worship, community programs, and charitable initiatives, we strive to create a positive impact while preserving and sharing our rich spiritual heritage.
                </p>
              </div>
              {!isStoryExpanded && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsStoryExpanded((current) => !current)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50 transition-colors sm:hidden"
              aria-expanded={isStoryExpanded}
            >
              {isStoryExpanded ? "See less" : "See more"}
              {isStoryExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Event Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Celebration Timeline</h3>
              <div
                className={`relative overflow-hidden transition-[max-height] duration-300 sm:max-h-none ${
                  expandedHighlights.timeline ? "max-h-96" : "max-h-28"
                }`}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Join us from July 27 through August 2, 2026 for seven days of divine programs, including daily aarti, katha, prasad, cultural performances, and special ceremonies commemorating 25 years of spiritual service.
                </p>
                {!expandedHighlights.timeline && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleHighlight("timeline")}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange-300 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100/70 transition-colors sm:hidden"
                aria-expanded={expandedHighlights.timeline}
              >
                {expandedHighlights.timeline ? "See less" : "See more"}
                {expandedHighlights.timeline ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Service</h3>
              <div
                className={`relative overflow-hidden transition-[max-height] duration-300 sm:max-h-none ${
                  expandedHighlights.community ? "max-h-96" : "max-h-28"
                }`}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Throughout 2025 and 2026, we've engaged in numerous seva activities including food distribution, healthcare outreach, environmental care, and community events, touching thousands of lives with compassion and service.
                </p>
                {!expandedHighlights.community && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleHighlight("community")}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100/70 transition-colors sm:hidden"
                aria-expanded={expandedHighlights.community}
              >
                {expandedHighlights.community ? "See less" : "See more"}
                {expandedHighlights.community ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Unity</h3>
              <div
                className={`relative overflow-hidden transition-[max-height] duration-300 sm:max-h-none ${
                  expandedHighlights.unity ? "max-h-96" : "max-h-28"
                }`}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Rajat Mahotsav brings together devotees from USA, Canada, England, India, Kenya, Australia, and beyond, uniting our global Swaminarayan community in celebration, devotion, and brotherhood.
                </p>
                {!expandedHighlights.unity && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleHighlight("unity")}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100/70 transition-colors sm:hidden"
                aria-expanded={expandedHighlights.unity}
              >
                {expandedHighlights.unity ? "See less" : "See more"}
                {expandedHighlights.unity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Divine Experience</h3>
              <div
                className={`relative overflow-hidden transition-[max-height] duration-300 sm:max-h-none ${
                  expandedHighlights.experience ? "max-h-96" : "max-h-28"
                }`}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Experience the divine presence through sacred rituals, devotional music, inspiring discourses, and the darshan of our beloved deities in the beautifully decorated temple adorned for this special celebration.
                </p>
                {!expandedHighlights.experience && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/90 to-transparent sm:hidden" />
                )}
              </div>
              <button
                type="button"
                onClick={() => toggleHighlight("experience")}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-purple-300 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100/70 transition-colors sm:hidden"
                aria-expanded={expandedHighlights.experience}
              >
                {expandedHighlights.experience ? "See less" : "See more"}
                {expandedHighlights.experience ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Temple and Navigation Resources */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Temple Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">200 Swamibapa Way, Secaucus, NJ 07094</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-lg text-gray-700">(201) 325-0510</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Event Dates</h3>
                    <p className="text-lg text-gray-700">July 27 - August 2, 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Globe className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Website</h3>
                    <a
                      href="https://sgadi.com/northamerica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm:hidden text-lg text-orange-600 hover:text-orange-700 underline break-all"
                    >
                      sgadi.com/northamerica
                    </a>
                    <a
                      href="https://www.swaminarayangadi.com/northamerica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline text-lg text-orange-600 hover:text-orange-700 underline break-all"
                    >
                      swaminarayangadi.com/northamerica
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-white mb-3">Quick Links</h2>
              <p className="text-xl text-white/95 mb-6">
                Jump to the most important pages for registration, schedule, invitation, and event support.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="/registration"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">Event Registration</h3>
                  <p className="text-base text-white/90">Register for the Rajat Mahotsav celebration</p>
                </a>

                <a
                  href="/schedule"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">Event Schedule</h3>
                  <p className="text-base text-white/90">View the complete program timeline</p>
                </a>

                <a
                  href="/invitation"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">View Invitation</h3>
                  <p className="text-base text-white/90">Open the invitation in English and Gujarati</p>
                </a>

                <a
                  href="/timeline"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">Trace our History</h3>
                  <p className="text-base text-white/90">Explore photos and visual highlights from the timeline</p>
                </a>

                <a
                  href="/guest-services"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">Guest Services</h3>
                  <p className="text-base text-white/90">Accommodation and travel information</p>
                </a>

                <a
                  href="/latest-events"
                  className="block h-full p-4 rounded-lg bg-white/15 border border-white/25 hover:bg-white/25 transition-all"
                >
                  <h3 className="font-semibold text-white mb-1">Latest Events</h3>
                  <p className="text-base text-white/90">Browse recent temple activities and photos</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
