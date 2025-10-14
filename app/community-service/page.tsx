"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"
import { Textarea } from "@/components/atoms/textarea"
import { Heart, Users, Clock, MapPin, DollarSign, Mail, Phone, Send } from "lucide-react"

import { useDeviceType } from "@/hooks/use-device-type"
import { ImageMarquee } from "@/components/organisms/image-marquee"
import { getCloudflareImage } from "@/lib/cdn-assets"
import { ProgressCounter } from "@/components/molecules/progress-counter"
import { BentoInitiatives } from "@/components/organisms/bento-initiatives"
import { AnimatedTextSection } from "@/components/organisms/animated-text-section"
import { useToast } from "@/hooks/use-toast"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { PathOfServiceStory } from "@/components/organisms/path-of-service-story"
import "@/styles/community-service-theme.css"

const firstRowImages = [
  { src: getCloudflareImage("001591ef-616d-40ae-7102-30f4bad78b00"), alt: "Community Service Event 1" },
  { src: getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"), alt: "Community Service Event 2" },
  { src: getCloudflareImage("1a01f892-a3ab-4715-496c-bd570de83b00"), alt: "Community Service Event 3" },
  { src: getCloudflareImage("428174c3-965c-4055-f941-381562cf8000"), alt: "Community Service Event 4" },
  { src: getCloudflareImage("8711b5e8-0ce7-44e5-2f3f-6f5abdb6db00"), alt: "Community Service Event 5" },
]

const secondRowImages = [
  { src: getCloudflareImage("c80899d2-8dcb-4420-90ea-bea0c4b7fa00"), alt: "Community Service Event 6" },
  { src: getCloudflareImage("79fbc010-6b11-47be-e0af-e5d073711500"), alt: "Community Service Event 7" },
  { src: getCloudflareImage("239db829-530a-4543-4a7d-4f795d8d9900"), alt: "Community Service Event 8" },
  { src: getCloudflareImage("a1ec5573-6e43-4499-79be-2028ebce6200"), alt: "Community Service Event 9" },
  { src: getCloudflareImage("2f2f3c0b-c371-41c5-3e94-043fad0da700"), alt: "Community Service Event 10" },
]

const communityStats = [
  {
    icon: Clock,
    label: "Volunteer Hours",
    current: 50,
    target: 2500,
    suffix: "hrs"
  },
  {
    icon: Users,
    label: "Meals Served",
    current: 0,
    target: 25000,
    suffix: ""
  },
  {
    icon: MapPin,
    label: "Distance Walked",
    current: 80,
    target: 2500,
    suffix: "km"
  },
  {
    icon: Heart,
    label: "Community Events",
    current: 5,
    target: 25,
    suffix: ""
  },
  {
    icon: DollarSign,
    label: "Funds Raised",
    current: 1200,
    target: 25000,
    prefix: "$",
    suffix: "",
    formatWithComma: true
  }
]

export default function CommunityServicePage() {
  const { toast } = useToast()

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
      className={`w-full community-page-bg page-bg-extend transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
      data-page="community-service"
    >
      <style jsx>{`
        [data-navbar] {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
      
      {/* Section 1: Hero + Our Community in Action */}
      <section className="min-h-screen">
        <div className="relative z-10">
          {/* Hero Content */}
          <div className="mb-36">
            <StandardPageHeader
              title="Community Service"
              subtitle="Seva in Action"
              description=""
              isLoaded={isLoaded}
            />
            
            {/* Custom Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center px-4"
            >
              <div className="text-left text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed space-y-1">
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Devotion.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Compassion.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Community.</p>
                <p><span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Twenty-Five Years</span> of Selfless Service.</p>
              </div>
            </motion.div>
            
            {/* Additional Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex justify-center px-4 mt-8"
            >
              <p className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-5xl">
                Inspired by the core teachings of Swaminarayan Bhagwan, the countless examples of compassion and selflessness from Acharya Shree Purushottampriyadasji Swamishree Maharaj, and the guiding vision of unity from Acharya Shree Jitendriyapriyadasji Swamiji Maharaj, we celebrate our Rajat Mahotsav (25th Anniversary) by doing what Swaminarayan Bhagwan held near and dear; seva, selfless service.
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
            <ImageMarquee firstRow={firstRowImages} secondRow={secondRowImages} />
          </motion.div>

          {/* Path of Service Story - Sticky Scroll Sections */}
          <div>
            <PathOfServiceStory />
          </div>
        </div>
      </section>

      {/* Sections 2 & 3: Why We Serve + Our 25-Year Mission - With snap */}
      <AnimatedTextSection />
      
      {/* Section 4: Community Initiatives + Impact Statistics + Mission in Action */}
      <section className="min-h-screen">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center pb-20 space-y-20">
          {/* <BentoInitiatives /> */}
          
          {/* Progress Statistics */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
              >
                Our Impact So Far
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg community-text-secondary"
              >
                Together, we're making a difference in our community. Here's a live tracker of us on our way to meeting our Rajat Mahotsav Community Service Goals!
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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

          {/* Support Our Mission - Donations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
              >
                Support Our Mission
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-2xl font-bold text-orange-600"
              >
                Your Gift, Doubled
              </motion.p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl p-8 border-2 border-orange-200"
              >
                <div className="space-y-6 text-lg community-text-secondary leading-relaxed">
                  <p>
                    A few generous donors have stepped forward to match every dollar donated, up to $10,000. That means your $50 becomes $100. Your $250 becomes $500. Every contribution you make will have twice the impact in feeding the hungry, sheltering the homeless, and caring for our community.
                  </p>
                  <p className="font-semibold text-orange-600">
                    Together, we can turn $10,000 into $20,000—and reach our full goal of $25,000 to fund a year of transformative service.
                  </p>
                  <p>
                    Your financial support helps us purchase supplies, organize events, and reach more people in need. Every dollar goes directly toward feeding, sheltering, and caring for our community.
                  </p>
                  <p className="font-semibold">
                    This is your chance to double your impact. Will you help us unlock this match?
                  </p>
                </div>
                
                <div className="flex justify-center mt-8">
                  <a
                    href="https://ssssmusa.breezechms.com/give/online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-orange-700 hover:to-red-700"
                  >
                    <Heart className="w-6 h-6 mr-3" />
                    DONATE NOW - DOUBLE YOUR IMPACT
                  </a>
                </div>
                
                <div className="mt-8 pt-8 border-t-2 border-orange-200">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 text-center">
                    Where Your Support Goes
                  </h3>
                  <ul className="space-y-2 text-lg community-text-secondary">
                    <li className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Homeless shelter care kits with essential hygiene items</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Hot meals for families facing food insecurity</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Health camps and wellness programs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Environmental restoration projects</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span>Educational support for underserved youth</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-base community-text-secondary text-center mt-8 italic">
                  All donations are tax-deductible. The matching gift is available on a first-come, first-served basis until we reach the $10,000 match limit. We're grateful for any amount you can share.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission in Action - YouTube Shorts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold community-text-primary mb-4"
              >
                Our Mission in Action
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg community-text-secondary"
              >
                Highlights from our recent community service events
              </motion.p>
            </div>
            
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-3xl shadow-xl p-6 max-w-sm flex flex-col items-center border-2 border-gray-200 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg mb-4 aspect-[9/16] max-h-[560px] w-full max-w-[315px]">
                  <iframe
                    src="https://www.youtube.com/embed/_sRpl5rM-M8?rel=0&modestbranding=1"
                    title="Community Service Event"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-center text-sm community-text-secondary leading-relaxed">
                  Shree Swaminarayan Gadi Secaucus Temple celebrates 25 years while supporting the local Secaucus PD fundraiser for Special Olympics NJ with a 5k run.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Get Involved - COMMENTED OUT FOR NOW */}
      {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                
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
      </div> */}
    </div>
  )
}