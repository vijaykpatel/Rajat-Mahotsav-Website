"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ResponsiveImageGallery } from "@/components/organisms/responsive-image-gallery"
import { getR2Image, getCloudflareImage } from "@/lib/cdn-assets"

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

const whyWeServeImages = [
  { id: 1, src: getCloudflareImage("2ac2c4ad-0b7b-47ff-80fd-a16fc5559900"), alt: "Swamibapa Feeding the Community" },
  { id: 2, src: getR2Image("/community_service/swamibapa_school_opening.jpeg"), alt: "Swamibapa School Opening Ceremony" },
  { id: 3, src: getR2Image("/community_service/swamiji_blessing_sick.jpeg"), alt: "Swamiji Blessing the Sick" }
]

const missionImages = [
  // { id: 1, src: getCloudflareImage("383a1d37-90bd-4af2-bf75-90bdc5101f00"), alt: "Impact Image 1" },
  { id: 1, src: getCloudflareImage("d7c6dca6-3fcf-40ca-dcc7-520f65591a00"), alt: "Impact Image 1" },
  { id: 2, src: getCloudflareImage("50b7856b-1a5a-4663-64db-29bd69a35300"), alt: "Impact Image 2" },
  { id: 3, src: getCloudflareImage("0d8fe1b3-c4ed-4486-2950-163ba08ff100"), alt: "Impact Image 3" }
]

const whyWeServeContent = {
  title: "Why We Serve",
  text: (
    <>
      In the Swaminarayan faith, seva is central to spiritual development and the path to liberation (moksha). Seva is more than a simple act of charity, as it is performed without any expectation of personal gain, reward, or recognition, with the sole intention of pleasing Swaminarayan Bhagwan and our Guru.<br/><br/>
      <span className="underline decoration-2 decoration-orange-600 text-orange-600 font-semibold">Swaminarayan Bhagwan teaches that when service is performed with this pure intent, it purifies the soul and helps to transcend ego, anger, and other negative emotions.</span> This makes seva an essential form of devotion (bhakti) and is considered a powerful spiritual practice (sadhana). By serving humanity, and particularly the devotees of Swaminarayan Bhagwan, one is serving Swaminarayan Bhagwan directly, bringing one closer to the divine.
    </>
  )
}

const missionContent = {
  title: "Our 25-Year Mission",
  text1: "On the occasion of our 25th anniversary, we reflect with deep gratitude on a quarter-century of selfless service in and outside our Mandir, a journey defined by the hands and hearts of dedicated volunteers committed to embodying their faith through action. The past years have established a rich legacy of community engagement, providing hope and assistance to numerous individuals, families, and communities, and demonstrating how spiritual principles can be translated into tangible, positive change.",
  text2: "Looking ahead, we are committed to building upon this solid foundation, aspiring to expand our reach by serving more people, addressing more diverse community needs, and championing more impactful causes. In doing so, we aim to create new avenues for volunteers to deepen their own spiritual journeys."
}

export function AnimatedTextSection() {
  return (
    <>
      {/* Section 2: Why We Serve */}
      <section className="min-h-screen">
        <div className="min-h-screen">
          {/* Images - Desktop: Grid, Mobile: Carousel */}
          <ResponsiveImageGallery images={whyWeServeImages} />
          
          {/* Text Content */}
          <div className="flex items-center justify-center px-4 md:px-8 py-20 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-xl md:max-w-5xl mx-auto text-center space-y-6 md:space-y-8"
            >
              <motion.h2 variants={textVariants} custom={0} className="text-3xl lg:text-4xl font-bold community-text-primary">
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
          <ResponsiveImageGallery images={missionImages} />
          
          {/* Text Content */}
          <div className="flex items-center justify-center px-4 md:px-8 pt-20 pb-12 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-xl md:max-w-5xl mx-auto text-center space-y-6 md:space-y-8"
            >
              <motion.h2 variants={textVariants} custom={0} className="text-3xl lg:text-4xl font-bold community-text-primary">
                {missionContent.title}
              </motion.h2>
              <motion.p variants={textVariants} custom={1} className="text-xl md:text-xl lg:text-2xl community-text-secondary leading-relaxed">
                {missionContent.text1}
              </motion.p>
              <motion.p variants={textVariants} custom={2} className="text-xl md:text-xl lg:text-2xl community-text-secondary leading-relaxed">
                {missionContent.text2}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
