"use client"

import { useState, useEffect } from "react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { Calendar, Heart, Users, Sparkles } from "lucide-react"

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

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
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
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
          </div>

          {/* Event Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Celebration Timeline</h3>
              <p className="text-gray-700 leading-relaxed">
                Join us from July 27 through August 2, 2026 for seven days of divine programs, including daily aarti, katha, prasad, cultural performances, and special ceremonies commemorating 25 years of spiritual service.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-red-100 p-3 rounded-lg w-fit mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Service</h3>
              <p className="text-gray-700 leading-relaxed">
                Throughout 2025 and 2026, we've engaged in numerous seva activities including food distribution, healthcare outreach, environmental care, and community events, touching thousands of lives with compassion and service.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Unity</h3>
              <p className="text-gray-700 leading-relaxed">
                The Rajat Mahotsav brings together devotees from USA, Canada, England, India, Kenya, Australia, and beyond, uniting our global Swaminarayan community in celebration, devotion, and brotherhood.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md p-6">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Divine Experience</h3>
              <p className="text-gray-700 leading-relaxed">
                Experience the divine presence through sacred rituals, devotional music, inspiring discourses, and the darshan of our beloved deities in the beautifully decorated temple adorned for this special celebration.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Spiritual Growth</h3>
                  <p className="text-gray-700">Fostering devotion to Lord Shree Swaminarayan and spiritual development through daily worship, scripture study, and satsang.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Community Service</h3>
                  <p className="text-gray-700">Serving humanity with compassion through charitable programs, disaster relief, healthcare initiatives, and support for those in need.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Cultural Preservation</h3>
                  <p className="text-gray-700">Preserving and sharing our rich Indian spiritual heritage, traditions, language, and values with future generations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Righteous Living</h3>
                  <p className="text-gray-700">Promoting ethical conduct, family values, and living according to dharma in alignment with Swaminarayan teachings.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Unity & Brotherhood</h3>
                  <p className="text-gray-700">Building bridges across communities, fostering interfaith dialogue, and creating an inclusive environment welcoming all who seek spiritual growth.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Celebration</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Be part of this historic milestone. Register today to experience the divine joy, spiritual upliftment, and community unity of the NJ Rajat Mahotsav 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/registration"
                className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-md"
              >
                Register Now
              </a>
              <a
                href="/schedule"
                className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
              >
                View Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
