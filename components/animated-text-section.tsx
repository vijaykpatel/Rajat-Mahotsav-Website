"use client"

import { motion } from "framer-motion"
import { MobileSectionCarousel } from "@/components/mobile-section-carousel"

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}

const imageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut"
    }
  })
}

const whyWeServeImages = [
  { id: 1, title: "Mission Image 1", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-orange-200 to-red-200" },
  { id: 2, title: "Mission Image 2", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-orange-200 to-red-200" },
  { id: 3, title: "Mission Image 3", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-orange-200 to-red-200" }
]

const missionImages = [
  { id: 1, title: "Impact Image 1", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-blue-200 to-purple-200" },
  { id: 2, title: "Impact Image 2", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-blue-200 to-purple-200" },
  { id: 3, title: "Impact Image 3", subtitle: "Upload your image here", bgColor: "bg-gradient-to-br from-blue-200 to-purple-200" }
]

export function AnimatedTextSection() {
  return (
    <>
      {/* Section 2: Why We Serve */}
      <section className="min-h-screen">
        <div className="min-h-screen">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            {/* Top Half - Images */}
            <div className="h-[50vh] grid grid-cols-3 gap-0">
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageVariants}
                  custom={index - 1}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-white/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <span className="text-4xl">📸</span>
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        Mission Image {index}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Upload your image here
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Half - Text Content */}
            <div className="h-[50vh] flex items-center justify-center px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl mx-auto text-center space-y-8"
              >
                <motion.h2
                  variants={textVariants}
                  custom={0}
                  className="text-4xl lg:text-5xl font-bold community-text-primary"
                >
                  Why We Serve
                </motion.h2>
                
                <motion.p
                  variants={textVariants}
                  custom={1}
                  className="text-xl lg:text-2xl community-text-secondary leading-relaxed max-w-4xl mx-auto"
                >
                  Service to humanity is service to God. As we celebrate 25 years of our community, we recognize that 
                  true spiritual growth comes through selfless action and compassionate service to those in need.
                </motion.p>
                
                <motion.div
                  variants={textVariants}
                  custom={2}
                  className="grid md:grid-cols-2 gap-12 pt-8 max-w-4xl mx-auto"
                >
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold community-text-primary">Our Foundation</h4>
                    <ul className="space-y-3 community-text-secondary text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Divine Teachings
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Community Unity
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Spiritual Growth
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold community-text-primary">Our Calling</h4>
                    <ul className="space-y-3 community-text-secondary text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Serve the Needy
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Spread Compassion
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Build Bridges
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Layout - Carousel top, text bottom */}
          <div className="md:hidden min-h-screen">
            {/* Top Half - Image Carousel */}
            <div className="h-[50vh] px-4 py-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <MobileSectionCarousel images={whyWeServeImages} />
              </motion.div>
            </div>
            
            {/* Bottom Half - Text Content */}
            <div className="h-[50vh] flex items-center justify-center px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-lg text-center space-y-6"
              >
                <motion.h2
                  variants={textVariants}
                  custom={0}
                  className="text-2xl font-bold community-text-primary"
                >
                  Why We Serve
                </motion.h2>
                
                <motion.p
                  variants={textVariants}
                  custom={1}
                  className="text-sm community-text-secondary leading-relaxed"
                >
                  Service to humanity is service to God. Through our community initiatives, we embody the teachings of 
                  compassion, selflessness, and unity that form the foundation of our faith.
                </motion.p>
                
                <motion.div
                  variants={textVariants}
                  custom={2}
                  className="grid grid-cols-2 gap-4 pt-4 text-xs"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold community-text-primary">Our Foundation</h4>
                    <ul className="space-y-1 community-text-secondary">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Divine Teachings
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Community Unity
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Spiritual Growth
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold community-text-primary">Our Calling</h4>
                    <ul className="space-y-1 community-text-secondary">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Serve the Needy
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Spread Compassion
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Build Bridges
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Our 25-Year Mission */}
      <section className="min-h-screen">
        <div className="min-h-screen">
          {/* Desktop Layout - Flipped Section - Text Top, Images Bottom */}
          <div className="hidden md:block">
            {/* Top Half - Text Content */}
            <div className="h-[50vh] flex items-center justify-center px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-6xl mx-auto text-center space-y-8"
              >
                <motion.h2
                  variants={textVariants}
                  custom={0}
                  className="text-4xl lg:text-5xl font-bold community-text-primary"
                >
                  Our 25-Year Mission
                </motion.h2>
                
                <motion.p
                  variants={textVariants}
                  custom={1}
                  className="text-xl lg:text-2xl community-text-secondary leading-relaxed max-w-4xl mx-auto"
                >
                  As we mark 25 years of faith and fellowship, we set ambitious goals that honor our past while 
                  building a legacy of service. These targets reflect our commitment to expanding our impact 
                  and deepening our spiritual connection through selfless action.
                </motion.p>
                
                <motion.div
                  variants={textVariants}
                  custom={2}
                  className="grid md:grid-cols-2 gap-12 pt-8 max-w-4xl mx-auto"
                >
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold community-text-primary">25-Year Goals</h4>
                    <ul className="space-y-3 community-text-secondary text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        25,000 Meals Served
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        2,500 Volunteer Hours
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        2,000 Lives Touched
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-2xl font-semibold community-text-primary">Legacy Connection</h4>
                    <ul className="space-y-3 community-text-secondary text-lg">
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Honor Our Journey
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Strengthen Faith
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Inspire Future
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Bottom Half - Images */}
            <div className="h-[50vh] grid grid-cols-3 gap-0">
              {[4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageVariants}
                  custom={index - 4}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-white/30 rounded-full mx-auto mb-6 flex items-center justify-center">
                        <span className="text-4xl">📸</span>
                      </div>
                      <p className="text-lg font-medium text-gray-700">
                        Impact Image {index - 3}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Upload your image here
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Mobile Layout - Carousel top, text bottom */}
          <div className="md:hidden min-h-screen">
            {/* Top Half - Image Carousel */}
            <div className="h-[50vh] px-4 py-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <MobileSectionCarousel images={missionImages} />
              </motion.div>
            </div>
            
            {/* Bottom Half - Text Content */}
            <div className="h-[50vh] flex items-center justify-center px-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-lg text-center space-y-6"
              >
                <motion.h2
                  variants={textVariants}
                  custom={0}
                  className="text-2xl font-bold community-text-primary"
                >
                  Our 25-Year Mission
                </motion.h2>
                
                <motion.p
                  variants={textVariants}
                  custom={1}
                  className="text-sm community-text-secondary leading-relaxed"
                >
                  As we mark 25 years of faith and fellowship, we set ambitious goals that honor our past while 
                  building a legacy of service.
                </motion.p>
                
                <motion.div
                  variants={textVariants}
                  custom={2}
                  className="grid grid-cols-2 gap-4 pt-4 text-xs"
                >
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold community-text-primary">25-Year Goals</h4>
                    <ul className="space-y-1 community-text-secondary">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        25,000 Meals Served
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        2,500 Volunteer Hours
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        2,000 Lives Touched
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold community-text-primary">Legacy Connection</h4>
                    <ul className="space-y-1 community-text-secondary">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Honor Our Journey
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Strengthen Faith
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                        Inspire Future
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}