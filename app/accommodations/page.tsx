"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { StandardPageHeader } from "@/components/standard-page-header"
import { Hotel, Car, MapPin, Phone, Globe, Clock, Navigation, ExternalLink, Calendar, Hash, MapPin as Walk, Copy, ToggleLeft, ToggleRight, DollarSign, Plane, Check } from "lucide-react"

export default function AccommodationsPage() {

  const [isStreetView, setIsStreetView] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const hotels = [
    {
      name: "Hyatt House Jersey City",
      address: "3 Second St, Jersey City, NJ 07302",
      phone: "(201) 626-9000",
      hotelCode: "HYT-JC",
      bookingLink: "https://hyatt.com/book",
      blockDates: "July 28 - Aug 3, 2026",
      travelTime: "15 min drive",
      walkable: false,
      pricePerNight: "$189",
      amenities: ["Free WiFi", "Fitness Center"]
    },
    {
      name: "DoubleTree by Hilton Fort Lee",
      address: "2117 Route 4 E, Fort Lee, NJ 07024", 
      phone: "(201) 461-9000",
      hotelCode: "DT-FL",
      bookingLink: "https://hilton.com/book",
      blockDates: "July 28 - Aug 3, 2026",
      travelTime: "20 min drive",
      walkable: false,
      pricePerNight: "$159",
      amenities: ["Business Center"]
    },
    {
      name: "Hampton Inn & Suites Secaucus Meadowlands",
      address: "300 Harmon Cove Tower, Secaucus, NJ 07094",
      phone: "(201) 348-2000", 
      hotelCode: "HI-SEC",
      bookingLink: "https://hilton.com/hampton",
      blockDates: "July 28 - Aug 3, 2026",
      travelTime: "5 min drive",
      walkable: true,
      pricePerNight: "$149",
      amenities: ["Free Breakfast", "Pool", "Shuttle Service to New York"]
    }
  ]

  const transportation = [
    {
      type: "NJ Transit Bus",
      routes: "Route 3, 85, 89",
      info: "Direct service to NYC and local areas"
    },
    {
      type: "NJ Transit Train", 
      routes: "Secaucus directly to Penn Station",
      info: "10 minute train ride. Secaucus station is a 5 minute drive from mandir!"
    },
    {
      type: "NYC Subway Access", 
      routes: "Penn Station or Port Authority has access to local NYC subway",
      info: "30 min via NJ Transit bus"
    },
    // {
    //   type: "Parking",
    //   routes: "Temple Parking Lot",
    //   info: "Free parking available on-site"
    // }
  ]

  const [activeTab, setActiveTab] = useState('nyc')

  const sightseeingData = {
    nyc: [
      {
        name: "Statue of Liberty & Ellis Island",
        distance: "45 min",
        description: "Iconic NYC landmarks accessible by ferry"
      },
      {
        name: "Times Square",
        distance: "35 min", 
        description: "Heart of NYC entertainment district"
      },
      {
        name: "Central Park",
        distance: "40 min",
        description: "NYC's premier urban park"
      },
      {
        name: "9/11 Memorial & Museum", 
        distance: "50 min",
        description: "Moving tribute to September 11th victims"
      }
    ],
    hoboken: [
      {
        name: "Hoboken Waterfront Walkway",
        distance: "20 min",
        description: "Beautiful views of Manhattan skyline"
      },
      {
        name: "Frank Sinatra Park",
        distance: "25 min",
        description: "Waterfront park with stunning city views"
      },
      {
        name: "Washington Street",
        distance: "22 min",
        description: "Historic shopping and dining district"
      }
    ],
    dc: [
      {
        name: "National Mall",
        distance: "4 hours",
        description: "Iconic monuments and museums"
      },
      {
        name: "Smithsonian Museums",
        distance: "4 hours",
        description: "World-class museum complex"
      },
      {
        name: "Capitol Building",
        distance: "4 hours",
        description: "Historic seat of US government"
      }
    ],
    niagara: [
      {
        name: "Niagara Falls State Park",
        distance: "5 hours",
        description: "Breathtaking waterfalls and scenic views"
      },
      {
        name: "Maid of the Mist",
        distance: "5 hours",
        description: "Boat tour to the base of the falls"
      },
      {
        name: "Cave of the Winds",
        distance: "5 hours",
        description: "Walk behind the falls experience"
      }
    ]
  }

  const tabLabels = {
    nyc: 'NYC',
    hoboken: 'Hoboken',
    dc: 'Washington D.C.',
    niagara: 'Niagara Falls'
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-white to-red-50 relative text-gray-900 page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing relative z-10">
        <StandardPageHeader
          title="Accommodations"
          subtitle="Your Home Away From Home"
          description="Everything you need for your stay during the Rajat Mahotsav celebration"
          isLoaded={isLoaded}
        />

        {/* Venue Location Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Navigation className="h-8 w-8 text-orange-500" />
            <h2 className="text-3xl font-bold">Event Venue</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 ring-2 ring-orange-200 hover:-translate-y-2 hover:scale-[1.02]">
                <div className="mb-4 relative">
                  <div className="absolute top-0 right-0 flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('200 Swamibapa Way, Secaucus, NJ 07094')
                        setIsCopied(true)
                        setTimeout(() => setIsCopied(false), 1000)
                      }}
                      className="p-1.5 md:p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                      title="Copy address"
                    >
                      <motion.div
                        initial={false}
                        animate={isCopied ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isCopied ? (
                          <Check className="h-4 w-4 text-orange-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-orange-500" />
                        )}
                      </motion.div>
                    </button>
                    <button
                      onClick={() => setIsStreetView(!isStreetView)}
                      className="flex items-center gap-2 p-1.5 md:p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                      title={isStreetView ? "Switch to Map View" : "Switch to Satellite View"}
                    >
                      {isStreetView ? <ToggleRight className="h-4 w-4 text-orange-500" /> : <ToggleLeft className="h-4 w-4 text-orange-500" />}
                      <span className="text-xs text-orange-500">{isStreetView ? "Satellite" : "Map"}</span>
                    </button>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-2 pr-20 md:pr-32">Shree Swaminarayan Temple Secaucaus, NJ</h3>
                  <p className="text-gray-600 flex items-center gap-2 mt-5 md:mt-0">
                    <MapPin className="h-4 w-4 text-orange-400" />
                    200 Swamibapa Way, Secaucus, NJ 07094
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-lg">
                  <iframe
                    src={isStreetView 
                      ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e1!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" 
                      : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    }
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Airport Transportation Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Plane className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold">Airport Transportation</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-400">Newark Liberty International (EWR)</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">25-35 min drive</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Uber/Lyft: $35-50</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Taxi: $45-60</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-400">LaGuardia Airport (LGA)</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">35-45 min drive</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Uber/Lyft: $45-65</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Taxi: $55-75</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Hotels Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Hotel className="h-8 w-8 text-purple-500" />
            <h2 className="text-3xl font-bold">Recommended Hotels</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold mb-3">{hotel.name}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{hotel.hotelCode}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 text-purple-400" />
                    <span className="text-sm">{hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">{hotel.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">{hotel.travelTime}</span>
                    {hotel.walkable && <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded">Walkable</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">{hotel.blockDates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-semibold">{hotel.pricePerNight}/night</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-purple-400" />
                    <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Book Now</a>
                  </div>
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {hotel.amenities.map((amenity, i) => (
                        <span key={i} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Transportation Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold">Transportation</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {transportation.map((transport, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold mb-3 text-blue-400">{transport.type}</h3>
                <p className="text-gray-600 mb-2"><strong>Routes:</strong> {transport.routes}</p>
                <p className="text-gray-500 text-sm">{transport.info}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sightseeing Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="h-8 w-8 text-green-500" />
            <h2 className="text-3xl font-bold">Sight-seeing</h2>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {Object.entries(tabLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                    : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content Container */}
          <div className="relative">
            {/* Travel Time Info */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  From Secaucus, NJ: {activeTab === 'nyc' ? 'Train 15 min | Drive 20 min - 1 hour' : 
                    activeTab === 'hoboken' ? 'Drive 20-30 min' :
                    activeTab === 'dc' ? 'Drive 4-5 hours' :
                    'Drive 5-6 hours'}
                </span>
              </div>
            </div>
            
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-8 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {sightseeingData[activeTab as keyof typeof sightseeingData].map((attraction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out cursor-pointer p-6 hover:-translate-y-2 hover:scale-[1.02]"
                  >
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-green-600">{attraction.name}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}