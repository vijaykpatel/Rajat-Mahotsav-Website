"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { ImageCarouselModal } from "@/components/organisms/image-carousel-modal"
import { PinContainer } from "@/components/molecules/3d-pin"
import { Hotel, Car, MapPin, Phone, Globe, Clock, Navigation, ExternalLink, Calendar, Hash, MapPin as Walk, Copy, ToggleLeft, ToggleRight, DollarSign, Plane, Check, ArrowRight } from "lucide-react"
import { getCloudflareImage } from "@/lib/cdn-assets"
import "@/styles/community-service-theme.css"
import "@/styles/registration-theme.css"

export default function GuestServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const venueRef = useRef<HTMLDivElement>(null)

  const [isStreetView, setIsStreetView] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [copiedHotelField, setCopiedHotelField] = useState<{ index: number; field: 'code' | 'group' } | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('nyc')

  // const { scrollYProgress } = useScroll()
  // const scale = useTransform(scrollYProgress, [0, 0.4], [1, 2])
  // const blur = useTransform(scrollYProgress, [0.2, 0.4], [0, 15])
  // const blurFilter = useTransform(blur, (b) => `blur(${b}px)`)
  // const opacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0.3])
  // const imageY = useTransform(scrollYProgress, [0, 0.25], [0, -150])

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    const timer = setTimeout(() => setIsLoaded(true), 300)
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const hotels = [
    {
      name: "Aloft Secaucus Meadowlands",
      address: "460 Harmon Meadow Blvd., Secaucus, NJ 07094",
      phone: "(201) 809-1000",
      bookingLink: "https://app.marriott.com/reslink?id=1763738659091&key=GRP&app=resvlink",
      blockDates: "July 25 - Aug 2, 2026",
      travelTime: "8 min drive",
      directionsLink: "https://maps.app.goo.gl/CVaAykRG1HQRv9hA9",
      lastDay: "Friday, June 26, 2026",
      pricePerNight: "$189 - $199",
      images: [
        "https://cdn.njrajatmahotsav.com/hotels/aloft/IMG_6217.jpg",
        "https://cdn.njrajatmahotsav.com/hotels/aloft/IMG_6218.jpg",
        "https://cdn.njrajatmahotsav.com/hotels/aloft/IMG_6219.jpg",
        "https://cdn.njrajatmahotsav.com/hotels/aloft/IMG_6220.jpg",
      ]
    },
    {
      name: "Courtyard by Marriott Secaucus Meadowlands",
      address: "455 Harmon Meadow Blvd., Secaucus, NJ 07094",
      phone: "(201) 617-8888",
      bookingLink: "https://app.marriott.com/reslink?id=1763076780024&key=GRP&app=resvlink",
      blockDates: "July 25 - Aug 2, 2026",
      travelTime: "8 min drive",
      directionsLink: "https://maps.app.goo.gl/CVaAykRG1HQRv9hA9",
      lastDay: "Friday, June 12, 2026",
      pricePerNight: "$198",
      images: [
        "https://cdn.njrajatmahotsav.com/hotels/courtyard/IMG_6229.jpg",
        "https://cdn.njrajatmahotsav.com/hotels/courtyard/IMG_6230.jpg",
        "https://cdn.njrajatmahotsav.com/hotels/courtyard/IMG_6231.jpg"
      ]
    },
    {
      name: "Wyndham Garden North Bergen",
      address: "1706 Paterson Plank Road, North Bergen, New Jersey 07047",
      phone: "(201) 389-4100",
      bookingLink: "https://www.wyndhamhotels.com/wyndham-garden/north-bergen-new-jersey/wyndham-garden-north-bergen-near-secaucus/rooms-rates?brand_id=GN&checkInDate=7/25/2026&checkOutDate=8/2/2026&useWRPoints=false&children=0&groupCode=072526SWA&adults=1&rooms=1&loc=ChIJVzsp1ARYwokRgZOfuykm_l4&sessionId=1764948634",
      blockDates: "July 25 - Aug 2, 2026",
      travelTime: "8 min drive",
      directionsLink: "https://maps.app.goo.gl/LyRPx9vKaqS2iy1x9",
      lastDay: "Friday, June 12, 2026",
      pricePerNight: "$150 - $160",
    },
    {
      name: "Ramada by Wyndham North Bergen",
      address: "2750 Tonnelle Ave, North Bergen, NJ 07047",
      phone: "(201) 442-2424",
      bookingLink: "",
      reservationCode: "072526SWA",
      groupName: "Swaminarayan Temple 2026",
      blockDates: "July 25 - Aug 2, 2026",
      travelTime: "8 min drive",
      directionsLink: "https://maps.app.goo.gl/vCjZHXt5UcwZsxvb8",
      lastDay: "Friday, May 1, 2026",
      pricePerNight: "$149",
      images: [
        "https://cdn.njrajatmahotsav.com/hotels/ramada/Screenshot%202025-12-14%20at%205.13.48%E2%80%AFPM.png",
        "https://cdn.njrajatmahotsav.com/hotels/ramada/Screenshot%202025-12-14%20at%205.14.41%E2%80%AFPM.png",
      ]
    },
    // {
    //   name: "Residence Inn by Marriott Secaucus Meadowlands",
    //   address: "800 Plaza Dr, Secaucus, NJ 07094", 
    //   phone: "(201) 223-9901",
    //   hotelCode: "RI-SEC",
    //   bookingLink: "https://www.marriott.com/hotels/travel/ewrrs-residence-inn-secaucus-meadowlands/",
    //   blockDates: "July 28 - Aug 3, 2026",
    //   travelTime: "8 min drive",
    //   directionsLink: "https://maps.app.goo.gl/Rjs8h1mmprAywhrM8",
    //   lastDay: "Friday, June 26, 2026",
    //   pricePerNight: "$179",
    //   amenities: ["Free Breakfast", "Kitchen"],
    //   images: [
    //     "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    //     "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
    //   ]
    // },
    // {
    //   name: "Renaissance Meadowlands Hotel",
    //   address: "801 Rutherford Ave, Rutherford, NJ 07070",
    //   phone: "(201) 231-3100", 
    //   hotelCode: "REN-MDW",
    //   bookingLink: "https://www.marriott.com/hotels/travel/ewrrn-renaissance-meadowlands-hotel/",
    //   blockDates: "July 28 - Aug 3, 2026",
    //   travelTime: "13 min drive",
    //   directionsLink: "https://maps.app.goo.gl/kB48Wc8kxTHA61ns9",
    //   lastDay: "Friday, June 26, 2026",
    //   pricePerNight: "$189",
    //   amenities: ["Restaurant", "Fitness Center", "Business Center"],
    //   images: [
    //     "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    //     "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    //     "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"
    //   ]
    // }
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

  const sightseeingData = {
    shopping: [
      {
        name: "The Mills at Jersey Gardens",
        distance: "30 min",
        description: "Shopping mall near Secaucus, NJ"
      },
      {
        name: "American Dream",
        distance: "15 min",
        description: "Mega-entertainment complex with shopping, entertainment, and a waterpark"
      },
      {
        name: "Woodbury Common Premium Outlets",
        distance: "1 hour",
        description: "World Class outdoor outlets for luxury brands"
      }
    ],
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
        name: "Empire State Building",
        distance: "30 min",
        description: "Most famous skyscraper in the world"
      },
      {
        name: "Central Park",
        distance: "40 min",
        description: "NYC's premier urban park"
      },
      {
        name: "The High Line",
        distance: "30 min",
        description: "Urban Park through the Manhattan west side, featuring urban city scenery"
      },
      {
        name: "9/11 Memorial & Museum",
        distance: "50 min",
        description: "Moving tribute to September 11th victims"
      },
      {
        name: "The Vessel & Hudson Yards",
        distance: "30 min",
        description: "Honeycomb like structure and luxury shopping in NYC"
      },
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
      },
      {
        name: "The White House",
        distance: "4 hours",
        description: "Residence of the President of the United States"
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
    shopping: 'Shopping',
    nyc: 'NYC',
    hoboken: 'Hoboken',
    dc: 'Washington D.C.',
    niagara: 'Niagara Falls'
  }

  return (
    <div className="min-h-screen reg-page-bg page-bg-extend w-full relative text-gray-900">
      <div className="container mx-auto px-4 relative z-10">
        <StandardPageHeader
          title="Guest Services"
          description="Prepare for the Rajat Mahotsav with complete peace of mind. This Guest Services guide will help you with accommodations, travel logistics, and important onsite instructions for the event, so you can focus entirely on the celebration and create lasting spiritual memories."
          isLoaded={isLoaded}
        />
      </div>

      <motion.div
        className="container mx-auto px-4 mb-20 mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={getCloudflareImage('05d7e7c8-ba90-476f-4881-0c1f0d190c00')}
          alt="Accommodations Hero"
          width="1200"
          height="800"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto h-auto object-cover rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      {/* DESKTOP SCROLL ANIMATION - COMMENTED OUT */}
      {/* {isMobile ? (
        <motion.div 
          className="container mx-auto px-4 mb-8 mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src={getCloudflareImageBiggest('05d7e7c8-ba90-476f-4881-0c1f0d190c00')}
            alt="Accommodations Hero"
            width="672"
            height="448"
            className="w-full max-w-2xl mx-auto h-auto object-cover rounded-2xl shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </motion.div>
      ) : (
        <>
          <motion.div 
            className="fixed left-0 w-full h-screen flex items-center justify-center overflow-hidden mb-8 mt-36"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              top: '10vh',
              filter: blurFilter,
              opacity,
              y: imageY,
              zIndex: 0
            }}
          >
            <motion.img
              src={getCloudflareImageBiggest('05d7e7c8-ba90-476f-4881-0c1f0d190c00')}
              alt="Accommodations Hero"
              width="896"
              height="597"
              className="max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full h-auto object-cover shadow-lg rounded-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              style={{
                scale
              }}
            />
          </motion.div>
          <div className="relative min-h-[120vh] lg:min-h-[100vh]" />
        </>
      )} */}

      <div className="relative z-20 bg-transparent">
        <div className="container mx-auto px-4 page-bottom-spacing">
          {/* Venue Location Section */}
          <motion.section
            ref={venueRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Navigation className="h-8 w-8 text-orange-500" />
              <h2 className="text-3xl font-bold">Event Venue</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              {!isMobile ? (
                <PinContainer
                  title="Shree Swaminarayan Temple"
                  href="https://maps.app.goo.gl/CVaAykRG1HQRv9hA9"
                >
                  <div className="flex basis-full flex-col tracking-tight text-slate-100/50 w-full max-w-[50rem] min-h-[35rem]">
                    <div className="mb-4 relative">
                      <div className="absolute top-0 right-0 flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
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
                          onClick={(e) => {
                            e.preventDefault()
                            setIsStreetView(!isStreetView)
                          }}
                          className="flex items-center gap-2 p-1.5 md:p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                          title={isStreetView ? "Switch to Map View" : "Switch to Satellite View"}
                        >
                          {isStreetView ? <ToggleRight className="h-4 w-4 text-orange-500" /> : <ToggleLeft className="h-4 w-4 text-orange-500" />}
                          <span className="text-xs text-orange-500">{isStreetView ? "Satellite" : "Map"}</span>
                        </button>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2 pr-20 md:pr-32">Shree Swaminarayan Temple Secaucus, NJ</h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-5 md:mt-0">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        200 Swamibapa Way, Secaucus, NJ 07094
                      </p>
                    </div>
                    <div className="relative overflow-hidden rounded-lg w-full h-[400px] md:h-[500px] bg-gray-100">
                      <iframe
                        src={isStreetView
                          ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e1!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&loading=eager"
                          : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&loading=eager"
                        }
                        className="w-full h-full absolute inset-0"
                        style={{ border: 0, contentVisibility: 'auto' }}
                        allowFullScreen
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </PinContainer>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-orange-200">
                  <div className="mb-4 relative">
                    <div className="absolute top-0 right-0 flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-2 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
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
                        onClick={(e) => {
                          e.preventDefault()
                          setIsStreetView(!isStreetView)
                        }}
                        className="flex items-center gap-2 p-1.5 md:p-2 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
                        title={isStreetView ? "Switch to Map View" : "Switch to Satellite View"}
                      >
                        {isStreetView ? <ToggleRight className="h-4 w-4 text-orange-500" /> : <ToggleLeft className="h-4 w-4 text-orange-500" />}
                        <span className="text-xs text-orange-500">{isStreetView ? "Satellite" : "Map"}</span>
                      </button>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-2 pr-20 md:pr-32">Shree Swaminarayan Temple Secaucus, NJ</h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-5 md:mt-0">
                      <MapPin className="h-4 w-4 text-orange-400" />
                      200 Swamibapa Way, Secaucus, NJ 07094
                    </p>
                  </div>
                  <div className="relative overflow-hidden rounded-lg h-[500px] bg-gray-100">
                    <iframe
                      src={isStreetView
                        ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e1!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&loading=eager"
                        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d755.45!2d-74.0567890!3d40.7894567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17.5!3m3!1m2!1s0x89c2f0a1b2c3d4e5%3A0x1234567890abcdef!2s200%20Swamibapa%20Way%2C%20Secaucus%2C%20NJ%2007094!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&loading=eager"
                      }
                      className="w-full h-full absolute inset-0"
                      style={{ border: 0, contentVisibility: 'auto' }}
                      allowFullScreen
                      loading="eager"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.section>

          {/* Hotels Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-16 mt-24"
          >
            <div className="flex items-center gap-3 mb-8">
              <Hotel className="h-8 w-8 text-purple-500" />
              <h2 className="text-3xl font-bold">Hotel Group Rates</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 ease-out p-6 border-2 border-purple-200 hover:-translate-y-1 relative"
                >
                  <h3 className="acc-card-title mb-3 min-h-[3.5rem]">{hotel.name}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-purple-400" />
                      <span className="acc-card-base">{hotel.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-400" />
                      <span className="acc-card-base">{hotel.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span className="acc-card-base font-medium">{hotel.travelTime}</span>
                      <a
                        href={hotel.directionsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="acc-card-caption text-blue-600 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        (Directions)
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="acc-card-base">{hotel.blockDates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span className="acc-card-base">Last Day to Book: {hotel.lastDay}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-purple-400" />
                      <span className="acc-card-base font-semibold">{hotel.pricePerNight}/night</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-purple-400" />
                      {hotel.bookingLink ? (
                        <a
                          href={hotel.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="acc-card-base text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Now
                        </a>
                      ) : "reservationCode" in hotel && hotel.reservationCode ? (
                        <span className="acc-card-base">Call to book — see details below</span>
                      ) : (
                        <span className="acc-card-base text-gray-500 italic">Not available yet</span>
                      )}
                    </div>
                    {"reservationCode" in hotel && hotel.reservationCode && (
                      <div className="mt-3 space-y-2 rounded-xl bg-purple-50 border border-purple-200 p-3">
                        <p className="acc-card-caption text-gray-700">
                          <span className="font-semibold">Reserve by phone:</span> Call the number above and provide the reservation code and group name below.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <Hash className="h-4 w-4 text-purple-400" />
                            <span className="acc-card-caption font-medium">Code:</span>
                            <span className="acc-card-base font-mono font-semibold">{hotel.reservationCode}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault()
                                navigator.clipboard.writeText(hotel.reservationCode as string)
                                setCopiedHotelField({ index, field: 'code' })
                                setTimeout(() => setCopiedHotelField(null), 2000)
                              }}
                              className="p-1 rounded hover:bg-purple-200/60 transition-colors"
                              title="Copy code"
                            >
                              <Copy className="h-4 w-4 text-purple-600" />
                            </button>
                            {copiedHotelField?.index === index && copiedHotelField?.field === 'code' && <span className="acc-card-caption text-green-600">Copied!</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="acc-card-caption font-medium">Group name:</span>
                          <span className="acc-card-base font-semibold">{hotel.groupName}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault()
                              navigator.clipboard.writeText(hotel.groupName as string)
                              setCopiedHotelField({ index, field: 'group' })
                              setTimeout(() => setCopiedHotelField(null), 2000)
                            }}
                            className="p-1 rounded hover:bg-purple-200/60 transition-colors"
                            title="Copy group name"
                          >
                            <Copy className="h-4 w-4 text-purple-600" />
                          </button>
                        {copiedHotelField?.index === index && copiedHotelField?.field === 'group' && <span className="acc-card-caption text-green-600 ml-1">Copied!</span>}
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      {/* <div className="flex flex-wrap gap-1">
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className="acc-card-caption bg-purple-500/20 text-black px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div> */}
                    </div>
                    {hotel.images && hotel.images.length > 0 && (
                      <button
                        onClick={() => setSelectedHotel(index)}
                        className="mt-4 w-full flex items-center justify-center gap-1 bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-3 py-2 rounded-full acc-card-caption font-medium transition-all border-2 border-purple-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/50"
                      >
                        <span>View Photos</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedHotel !== null && (
              <ImageCarouselModal
                images={hotels[selectedHotel].images}
                title={hotels[selectedHotel].name}
                open={selectedHotel !== null}
                onOpenChange={(open) => !open && setSelectedHotel(null)}
              />
            )}
            {/* <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl shadow-lg p-6"
            >
              <p className="acc-card-base text-gray-700 leading-relaxed">
                <span className="font-semibold">Note:</span> We are still working on securing the <span className="font-semibold">Ramada Hotel</span> group rate. We will update this page as soon as the information is ready.
              </p>
            </motion.div> */}
          </motion.section>

          {/* Airport Transportation Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Plane className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold">Airport Transportation</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-blue-200"
              >
                <h3 className="acc-card-title mb-3">Newark Liberty International (EWR)</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base font-medium">25-35 min drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Uber/Lyft: $35-50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Taxi: $45-60</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-blue-200"
              >
                <h3 className="acc-card-title mb-3">LaGuardia Airport (LGA)</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base font-medium">35-45 min drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Uber/Lyft: $45-65</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Taxi: $55-75</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-blue-200"
              >
                <h3 className="acc-card-title mb-3">John F. Kennedy International (JFK)</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base font-medium">45-60 min drive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Uber/Lyft: $60-85</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-blue-400" />
                    <span className="acc-card-base">Taxi: $70-95</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6"
            >
              <p className="acc-card-base text-gray-700 leading-relaxed">
                <span className="font-semibold">Note:</span> The Temple is currently exploring transportation options from Newark airport for our international guests.
                We will update this page with detailed information as arrangements are finalized. Travelling to/from Newark airport is the preferred method due it's proximity to the temple.
              </p>
            </motion.div>
          </motion.section>

          {/* Transportation Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <Car className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold">Local Transportation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {transportation.map((transport, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-yellow-200"
                >
                  <h3 className="acc-card-title mb-3">{transport.type}</h3>
                  <p className="acc-card-base text-gray-600 mb-2"><strong>Routes:</strong> {transport.routes}</p>
                  <p className="acc-card-base text-gray-500">{transport.info}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Sightseeing Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="h-8 w-8 text-green-500" />
              <h2 className="text-3xl font-bold">Tourism</h2>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {Object.entries(tabLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${activeTab === key
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
                      activeTab === 'shopping' ? 'Drive 15 min - 1 hour' :
                        activeTab === 'hoboken' ? 'Drive 20-30 min' :
                          activeTab === 'dc' ? 'Drive 4-5 hours' :
                            'Drive 5-6 hours'}
                  </span>
                </div>
              </div>

              <motion.div
                key={activeTab}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-8 border-2 border-green-200"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {sightseeingData[activeTab as keyof typeof sightseeingData].map((attraction, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="bg-white rounded-2xl shadow-lg transition-all duration-200 ease-out cursor-pointer p-6 border-2 border-green-200"
                    >
                      <div className="mb-3">
                        <h3 className="text-xl font-bold">{attraction.name}</h3>
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
    </div>
  )
}
