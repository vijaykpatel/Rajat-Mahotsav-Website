"use client"

import { motion } from "framer-motion"
import { MobileSectionCarousel } from "@/components/organisms/mobile-section-carousel"

interface ImageData {
  id: number
  src: string
  alt: string
}

interface ResponsiveImageGalleryProps {
  images: [ImageData, ImageData, ImageData]
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

export function ResponsiveImageGallery({ images }: ResponsiveImageGalleryProps) {
  return (
    <div className="h-[50vh]">
      <div className="hidden md:grid grid-cols-3 gap-0 h-full">
        {images.map((image, index) => (
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
          <MobileSectionCarousel images={images} />
        </motion.div>
      </div>
    </div>
  )
}
