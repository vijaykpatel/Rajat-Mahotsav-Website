"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
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
  { id: 1, src: getCloudflareImage("383a1d37-90bd-4af2-bf75-90bdc5101f00"), alt: "Impact Image 1" },
  { id: 2, src: getCloudflareImage("50b7856b-1a5a-4663-64db-29bd69a35300"), alt: "Impact Image 2" },
  { id: 3, src: getCloudflareImage("0d8fe1b3-c4ed-4486-2950-163ba08ff100"), alt: "Impact Image 3" }
]

const whyWeServeContent = {
  title: "Why We Serve",
  text: (
    <>
      In the Swaminarayan faith, "seva" or selfless service is central to spiritual development and the path to liberation (moksha). Seva is more than a simple act of charity, as it is performed without any expectation of personal gain, reward, or recognition, with the sole intention of pleasing Swaminarayan Bhagwan and our Guru.<br/><br/>
      <span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Swaminarayan Bhagwan teaches that when service is performed with this pure intent, it purifies the soul and helps to transcend ego, anger, and other negative emotions.</span> This makes seva an essential form of devotion (bhakti) and is considered a powerful spiritual practice (sadhana). By serving humanity, and particularly the devotees of Swaminarayan Bhagwan, one is serving Swaminarayan Bhagwan directly, bringing one closer to the divine.
    </>
  )
}

const missionContent = {
  title: "Our 25-Year Mission",
  text1: "As we reach this milestone of 25 years, we look back with gratitude and forward with hope. We've set meaningful goals—not because we have all the answers, but because we believe in the power of trying, of showing up, and of doing what we can. These commitments honor the journey we've shared and invite us to grow even deeper in our faith and service to others.",
  text2: "This is our Silver Jubilee. This is seva in action. This is who we are, and this is how we build our tomorrow, together."
}

export function AnimatedTextSection({ progressCounters }: { progressCounters?: React.ReactNode }) {
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" })

  return (
    <>
      {/* Section 2: Why We Serve */}
      <section className="min-h-screen">
        <div className="min-h-screen">
          {/* Images - Desktop: Grid, Mobile: Carousel */}
          <div className="h-[50vh]">
            <div className="hidden md:grid grid-cols-3 gap-0 h-full">
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
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden h-full px-4 py-4">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <MobileSectionCarousel images={whyWeServeImages} />
              </motion.div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="flex items-center justify-center px-4 md:px-8 py-20 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-xl md:max-w-5xl mx-auto text-center space-y-6 md:space-y-8"
            >
              <motion.h2 variants={textVariants} custom={0} className="text-2xl md:text-4xl lg:text-5xl font-bold community-text-primary">
                {whyWeServeContent.title}
              </motion.h2>
              <motion.p variants={textVariants} custom={1} className="text-xl md:text-xl lg:text-2xl community-text-secondary leading-relaxed">
                {whyWeServeContent.text}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Our 25-Year Mission */}
      <section className="min-h-screen">
        <div>
          {/* Images - Desktop: Grid, Mobile: Carousel */}
          <div className="h-[50vh]">
            <div className="hidden md:grid grid-cols-3 gap-0 h-full">
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
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden h-full px-4 py-4">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <MobileSectionCarousel images={missionImages} />
              </motion.div>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="flex items-center justify-center px-4 md:px-8 pt-20 pb-12 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-xl md:max-w-5xl mx-auto text-center space-y-6 md:space-y-8"
            >
              <motion.h2 variants={textVariants} custom={0} className="text-2xl md:text-4xl lg:text-5xl font-bold community-text-primary">
                {missionContent.title}
              </motion.h2>
              <motion.p variants={textVariants} custom={1} className="text-xl md:text-xl lg:text-2xl community-text-secondary leading-relaxed">
                {missionContent.text1}
              </motion.p>
              <motion.p variants={textVariants} custom={2} className="text-xl md:text-xl lg:text-2xl font-bold text-orange-600 pt-4">
                {missionContent.text2}
              </motion.p>
            </motion.div>
          </div>
          
          {/* Progress Statistics */}
          {progressCounters && (
            <div className="px-4 md:px-8 pb-16 mt-8">
              <div ref={statsRef} className="max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0 }} animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {progressCounters}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
