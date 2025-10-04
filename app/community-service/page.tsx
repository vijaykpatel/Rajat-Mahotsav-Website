"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, Clock, MapPin, Mail, Phone, Send } from "lucide-react"
import { useNavbarHeight } from "@/hooks/use-navbar-height"
import { useDeviceType } from "@/hooks/use-device-type"
import Typewriter from "@/components/typewriter"
import BackgroundPaths from "@/components/floating-paths"
import { ImageMarquee } from "@/components/image-marquee"
import { MobileImageCarousel } from "@/components/mobile-image-carousel"
import { ProgressCounter } from "@/components/progress-counter"
import { BentoInitiatives } from "@/components/bento-initiatives"
import { AnimatedTextSection } from "@/components/animated-text-section"
import { useToast } from "@/hooks/use-toast"
import "@/styles/community-service-theme.css"

const communityStats = [
  {
    icon: Clock,
    label: "Volunteer Hours",
    current: 2350,
    target: 2500,
    suffix: "hrs"
  },
  {
    icon: Users,
    label: "Meals Served",
    current: 23500,
    target: 25000,
    suffix: ""
  },
  {
    icon: MapPin,
    label: "Distance Walked",
    current: 24200,
    target: 25000,
    suffix: "km"
  },
  {
    icon: Heart,
    label: "Lives Touched",
    current: 1850,
    target: 2000,
    suffix: ""
  }
]

export default function CommunityServicePage() {
  const { toast } = useToast()
  const { dynamicPadding } = useNavbarHeight()
  const deviceType = useDeviceType()
  const [isLoaded, setIsLoaded] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldShow = scrollTop < 100
      setNavbarVisible(shouldShow)
      
      // Update navbar opacity
      const navbar = document.querySelector('[data-navbar]')
      if (navbar) {
        navbar.style.opacity = shouldShow ? '1' : '0'
        navbar.style.pointerEvents = shouldShow ? 'auto' : 'none'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoaded])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Thank you for your interest!",
      description: "We'll be in touch soon about volunteer opportunities.",
      className: "bg-green-500 text-white border-green-400 shadow-xl font-medium",
    })
    
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div 
      className={`w-full community-page-bg community-scroll-container transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      data-page="community-service"
    >
      <style jsx>{`
        [data-navbar] {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
      {deviceType !== 'mobile' && <BackgroundPaths />}
      
      {/* Section 1: Hero + Our Community in Action */}
      <section className="min-h-screen" style={{ paddingTop: dynamicPadding }}>
        <div className="relative z-10">
          {/* Hero Content */}
          <div className="text-center px-4 sm:px-6 lg:px-8 page-header-spacing">
            <h1 className={`page-title-size font-bold community-title mb-6 leading-tight transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Community Service - Seva in Action
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-36 max-w-4xl mx-auto"
            >
              <p className="page-description-size community-text-secondary leading-relaxed">
                Service to humanity is service to God. Through our community initiatives, we embody the teachings of compassion, 
                selflessness, and unity that form the foundation of our faith.
              </p>
            </motion.div>
          </div>
          

          {/* Image Marquee - Full Width */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="w-full"
          >
            <ImageMarquee />
          </motion.div>
        </div>
      </section>

      {/* Sections 2 & 3: Why We Serve + Our 25-Year Mission - With snap */}
      <AnimatedTextSection />
      
      {/* Section 4: Community Initiatives */}
      <section className="min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-20">
          <BentoInitiatives />
        </div>
      </section>
      
      {/* Normal scrolling content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Progress Statistics */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
            >
              Our Impact This Year
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg community-text-secondary"
            >
              Together, we're making a difference in our community
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <ProgressCounter
                key={stat.label}
                {...stat}
                delay={index * 0.2}
                inView={isStatsInView}
              />
            ))}
          </div>
        </motion.div>

        {/* Get Involved Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                
                {/* Information Card */}
                <Card className="community-card rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl lg:text-3xl font-semibold community-text-primary">
                      Get Involved
                    </CardTitle>
                    <CardDescription className="community-text-secondary">
                      Join us in making a positive impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-justify community-text-secondary leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 community-text-accent" />
                        <span className="community-text-secondary">volunteer@temple.org</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 community-text-accent" />
                        <span className="community-text-secondary">(555) 123-4567</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Form */}
                <Card className="community-card rounded-3xl overflow-hidden">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-semibold community-text-primary">
                      Volunteer Interest Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="community-label">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="community-input rounded-md"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="community-label">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="community-input rounded-md"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="community-label">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="community-input rounded-md"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="community-label">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your interests and availability..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="community-input rounded-md min-h-[100px]"
                          rows={4}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="community-button w-full h-12 rounded-lg"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Send className="w-4 h-4" />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </div>
                      </Button>
                    </form>
                  </CardContent>
                </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}