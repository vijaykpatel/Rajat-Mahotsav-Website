"use client"

import { motion } from "framer-motion"
import { MobileSectionCarousel } from "@/components/mobile-section-carousel"
import { getCommunityServiceImage, getCloudflareImage } from "@/lib/cdn-assets"

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
  { id: 1, src: getCloudflareImage("2ac2c4ad-0b7b-47ff-80fd-a16fc5559900"), alt: "Swamibapa Feeding the Community" },
  { id: 2, src: getCommunityServiceImage("swamibapa_school_opening.jpeg"), alt: "Swamibapa School Opening Ceremony" },
  { id: 3, src: getCommunityServiceImage("swamiji_blessing_sick.jpeg"), alt: "Swamiji Blessing the Sick" }
]

const missionImages = [
  { id: 1, src: getCloudflareImage("5e3b21b6-aadb-434e-4d86-4905b7bffb00"), alt: "Impact Image 1" },
  { id: 2, src: getCloudflareImage("50b7856b-1a5a-4663-64db-29bd69a35300"), alt: "Impact Image 2" },
  { id: 3, src: getCloudflareImage("0d8fe1b3-c4ed-4486-2950-163ba08ff100"), alt: "Impact Image 3" }
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
              {whyWeServeImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageVariants}
                  custom={index}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
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
                  Service to humanity is service to God. As we celebrate 25 years together, we've learned that true spiritual growth happens when we open our hearts and extend our hands to those in need. It's in these moments of giving that we find ourselves most deeply connected—to each other, to our faith, and to something greater than ourselves.
                </motion.p>
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
                  className="text-xl community-text-secondary leading-relaxed"
                >
                  Service to humanity is service to God. As we celebrate 25 years together, we've learned that true spiritual growth happens when we open our hearts and extend our hands to those in need. It's in these moments of giving that we find ourselves most deeply connected—to each other, to our faith, and to something greater than ourselves.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Our 25-Year Mission */}
      <section className="min-h-screen">
        <div className="min-h-screen">
          {/* Desktop Layout - Images Top, Text Bottom */}
          <div className="hidden md:block">
            {/* Top Half - Images */}
            <div className="h-[50vh] grid grid-cols-3 gap-0">
              {missionImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={imageVariants}
                  custom={index}
                  className="relative overflow-hidden group cursor-pointer"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Half - Text Content */}
            <div className="h-[50vh] flex items-center justify-center px-4">
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
                  As we reach this milestone of 25 years, we look back with gratitude and forward with hope. We've set meaningful goals—not because we have all the answers, but because we believe in the power of trying, of showing up, and of doing what we can. These commitments honor the journey we've shared and invite us to grow even deeper in our faith and service to others.
                </motion.p>

                <motion.p
                  variants={textVariants}
                  custom={2}
                  className="text-xl lg:text-2xl font-bold text-orange-600 pt-4"
                >
                  This is our Silver Jubilee. This is seva in action. This is who we are, and this is how we build our tomorrow, together.
                </motion.p>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Layout - Carousel top, text bottom */}
          <div className="md:hidden">
            {/* Image Carousel */}
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
            
            {/* Text Content */}
            <div className="px-4 pt-16">
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
                  className="text-xl community-text-secondary leading-relaxed"
                >
                  As we reach this milestone of 25 years, we look back with gratitude and forward with hope. We've set meaningful goals—not because we have all the answers, but because we believe in the power of trying, of showing up, and of doing what we can. These commitments honor the journey we've shared and invite us to grow even deeper in our faith and service to others.
                </motion.p>

                <motion.p
                  variants={textVariants}
                  custom={2}
                  className="text-xl font-bold text-orange-600 pt-4"
                >
                  This is our Silver Jubilee. This is seva in action. This is who we are, and this is how we build our tomorrow, together.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}