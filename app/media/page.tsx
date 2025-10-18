"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { StandardPageHeader } from "@/components/organisms/standard-page-header"
import { getCloudflareImageMobileWp } from "@/lib/cdn-assets"
import "@/styles/community-service-theme.css"

const wallpapers = [
  {
    id: 1,
    imageId: "d9f5d758-e54c-41e8-279b-c976b1a9ba00",
    fullRes: "https://cdn.njrajatmahotsav.com/wallpapers/rajat_mobile_wallpaper_gm_1.jpeg",
    title: "GM Wallpaper 1"
  },
  {
    id: 2,
    imageId: "b87411e2-0009-418f-bdac-be04f3b05800",
    fullRes: "https://cdn.njrajatmahotsav.com/wallpapers/rajat_mobile_wallpaper_gm_2.jpeg",
    title: "GM Wallpaper 2"
  },
  {
    id: 3,
    imageId: "ba913755-0610-437a-35a8-00b7a5fd7a00",
    fullRes: "https://cdn.njrajatmahotsav.com/wallpapers/rajat_mobile_wallpaper_gm_3.jpeg",
    title: "GM Wallpaper 3"
  },
  {
    id: 4,
    imageId: "5fc49f26-e8ec-40e8-45f1-e7a1d8ca3600",
    fullRes: "https://cdn.njrajatmahotsav.com/wallpapers/rajat_mobile_wallpaper_prathna_1.jpeg",
    title: "Prathna Wallpaper 1"
  },
  {
    id: 5,
    imageId: "fa49d6f1-a249-44bb-805f-f55644188e00",
    fullRes: "https://cdn.njrajatmahotsav.com/wallpapers/rajat_mobile_wallpaper_pebbled_1.jpg",
    title: "Prathna Wallpaper 1"
  },
]

export default function MediaPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleDownload = (wallpaper: typeof wallpapers[0]) => {
    const filename = `rajat-mahotsav-${wallpaper.title.toLowerCase().replace(/\s+/g, "-")}.jpg`
    const downloadUrl = `/api/download?url=${encodeURIComponent(wallpaper.fullRes)}&filename=${encodeURIComponent(filename)}`
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen community-page-bg page-bg-extend">
      <div className="container mx-auto px-4 page-bottom-spacing">
        <StandardPageHeader
          title="Media"
          subtitle="Download exclusive Rajat Mahotsav wallpapers"
          isLoaded={isLoaded}
        />

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {wallpapers.map((wallpaper, index) => (
            <motion.div
              key={wallpaper.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="relative aspect-[9/19.5]">
                {wallpaper.imageId && (
                  <img
                    src={getCloudflareImageMobileWp(wallpaper.imageId)}
                    alt={wallpaper.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <button
                onClick={() => handleDownload(wallpaper)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </div>
  )
}
