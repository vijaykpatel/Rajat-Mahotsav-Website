"use client"

import { motion } from "framer-motion"
import { ImageMarquee } from "@/components/image-marquee"
import { AnimatedTextSection } from "@/components/animated-text-section"
import Typewriter from "@/components/typewriter"

interface ScrollSnapSectionsProps {
  dynamicPadding: string
}

export function ScrollSnapSections({ dynamicPadding }: ScrollSnapSectionsProps) {
  return (
    <div className="scroll-snap-container">
      {/* Section 1: Hero + Our Community in Action */}
      <section className="scroll-snap-section" style={{ paddingTop: dynamicPadding }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="flex justify-center min-h-[6rem] lg:min-h-[6rem] xl:min-h-[6rem]">
              <Typewriter 
                text="Community Service - Seva in Action"
                speed={50}
                className="page-title-size font-bold community-title xl:whitespace-nowrap"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              <p className="text-lg lg:text-xl community-text-secondary leading-relaxed">
                Service to humanity is service to God. Through our community initiatives, we embody the teachings of compassion, 
                selflessness, and unity that form the foundation of our faith.
              </p>
            </motion.div>
          </div>

          {/* Our Community in Action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold community-text-primary mb-4">
                Our Community in Action
              </h2>
            </div>
            <ImageMarquee />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Why We Serve */}
      <section className="scroll-snap-section">
        <div className="h-full">
          <AnimatedTextSection />
        </div>
      </section>
    </div>
  )
}