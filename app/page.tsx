"use client"

import { useState, useEffect, useRef } from "react"
import LoadingScreen from "@/components/loading-screen"
import VideoSection from "@/components/video-section"
import TitleSection from "@/components/title-section"
import GuruCard from "@/components/guru-card"
import GuruCarousel from "@/components/guru-carousel"
import { useDeviceType } from "@/hooks/use-device-type"
import { getCloudflareImageBiggest } from "@/lib/cdn-assets"
import "@/styles/registration-theme.css"

import { useLoading } from "@/hooks/use-loading"

const gurus = [
  {
    imageId: "dc885005-1573-4b68-9b7d-8d21f2ae8b00",
    name: "Jeevanpran Shree Muktajeevan Swamibapa"
  },
  {
    imageId: "b148858a-2ce9-4ac7-71e9-5bd5e076de00",
    name: "Acharya Shree Purushottampriyadasji Swamishree Maharaj"
  },
  {
    imageId: "e2881864-b5d1-4e12-d289-63add00d1400",
    name: "Acharya Shree Jitendriyapriyadasji Swamiji Maharaj"
  }
]

export default function ShaderShowcase() {
  const targetDate = '2026-07-28T17:00:00-05:00';
  const deviceType = useDeviceType();

  const { isLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false)
  
  const backgroundImageUrl = `${getCloudflareImageBiggest("5aeb6c7e-f6ea-45b1-da4a-823279172400")}&width=1920`

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen />
      {!isLoading && (
        <>
          {/* Title section */}
          <TitleSection />
          <div className="relative z-10">
          <div className="h-screen" />
          <div className="reg-page-bg page-bg-extend">
          
          {/* Full background Sihasan image section */}
          <div className="h-screen w-screen relative overflow-hidden">
            {/* Desktop: Static Image */}
            <img
              src={backgroundImageUrl}
              alt="Background"
              className="hidden md:block absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
            />
            
            {/* Mobile: Panning Sihasan Image */}
            <img
              src={backgroundImageUrl}
              alt="Background"
              className="md:hidden absolute inset-0 mix-blend-multiply opacity-90"
            />
          </div>
          
          {/* Staggered Image Cards */}
          <div className="w-full pb-40 px-4 flex flex-col items-center mt-40">
            <h2 className="text-7xl md:text-7xl text-5xl font-bold mb-12 md:mb-24 relative z-10 reg-title">Our Beloved Gurus</h2>
            
            {/* Desktop: Staggered layout */}
            <div className="hidden md:flex gap-12 items-end">
              <GuruCard imageId={gurus[0].imageId} name={gurus[0].name} />
              <GuruCard imageId={gurus[1].imageId} name={gurus[1].name} className="translate-y-16" />
              <GuruCard imageId={gurus[2].imageId} name={gurus[2].name} className="translate-y-32" />
            </div>
            
            {/* Mobile: Carousel */}
            <div className="md:hidden w-full">
              <GuruCarousel gurus={gurus} />
            </div>
          </div>
          
          {/* Video section */}
          <VideoSection />
          </div>
          </div>
        </>
      )}
    </>
  )
}
