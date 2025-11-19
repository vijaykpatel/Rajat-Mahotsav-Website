"use client"

import { motion } from "framer-motion"

import { useLoading } from "@/hooks/use-loading"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { timelineData } from "@/lib/timeline-data"
import { getCloudflareImage } from "@/lib/cdn-assets"
import CountdownTimer from "@/components/molecules/countdown-timer"
import Link from "next/link"

const allImages = Array.from(new Set([
  ...timelineData.map(item => item.image),
  getCloudflareImage("07f0293e-f384-4a9e-4364-4f7131263100"),
  getCloudflareImage("f8a344b2-8045-4273-ceb7-bcd0a4f4de00"),
  getCloudflareImage("1ea74bd4-3867-4016-8010-07622468a800"),
  getCloudflareImage("dfea2296-fa83-4bdc-6b23-bb28434a5a00"),
  getCloudflareImage("a8f9e2cb-feec-4bb0-15a5-29dd83648b00"),
  getCloudflareImage("7e9de524-cfc3-49ca-96cf-105fba01ce00"),
  getCloudflareImage("694c7ad0-74f9-4c2a-8b30-eb4dce7f8000"),
  getCloudflareImage("b7160132-914d-4d1f-d6c4-48418b6aa000"),
  getCloudflareImage("d1b8a1af-abfc-4a8c-b7e2-d4b1377ebf00"),
  getCloudflareImage("bdf8f682-7bd3-4838-46c4-fe7ba1358b00"),
  getCloudflareImage("a494c6be-02eb-4fc2-d6eb-9df81b294600"),
  getCloudflareImage("8c1c0405-0c48-4f49-606b-a4260e2c5900"),
  getCloudflareImage("001591ef-616d-40ae-7102-30f4bad78b00"),
  getCloudflareImage("79c313ad-200d-448f-4609-0b70f44ac500"),
  getCloudflareImage("944138d2-cc15-45f5-6eec-f4a6a3e30800"),
  getCloudflareImage("1a01f892-a3ab-4715-496c-bd570de83b00"),
  getCloudflareImage("428174c3-965c-4055-f941-381562cf8000"),
  getCloudflareImage("b8af526f-08f9-4a68-9280-466597ed7400"),
]))

const columnImages = [
  allImages.slice(0, 6),
  allImages.slice(6, 12),
  allImages.slice(12, 18),
]

interface TitleSectionProps {
  targetDate?: string
}

export default function TitleSection({ targetDate = "2026-08-02T00:00:00" }: TitleSectionProps) {
  const { isLoading } = useLoading()

  return (
    <div className="bg-title-section-bg h-full flex items-end justify-end relative pb-16 sm:pb-28 md:pb-28 lg:pb-28 xl:pb-28">
      {/* Slider columns on left side - Desktop only (>1280px) */}
      <div className="hidden xl:flex absolute left-4 top-0 w-auto xl:max-w-[45vw] 2xl:max-w-[50vw] h-full z-20 gap-4">
        {columnImages.map((images, col) => (
          <div key={col} className="w-64 lg:w-72 xl:w-80 h-full overflow-hidden">
            <div className={`flex flex-col gap-4 ${col === 1 ? 'animate-scroll-vertical-reverse' : 'animate-scroll-vertical-slower'}`} style={{ animationDelay: `${-col * 10}s` }}>
              {images.concat(images).concat(images).map((image, idx) => (
                <div key={`${col}-${idx}`} className="w-full h-64 sm:h-72 md:h-80 bg-white/10 backdrop-blur-sm rounded-lg flex-shrink-0 border border-white/20 overflow-hidden">
                  <img src={image} alt="Gallery" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 1, delay: !isLoading ? 0.8 : 0, ease: "easeOut" }}
        className="pr-4 z-10 text-right sm:pr-8 w-full xl:max-w-[52vw] 2xl:max-w-[48vw] flex flex-col items-end"
      >
        <div className="font-instrument-serif leading-tight">
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            Shree
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.2 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            Ghanshyam Maharaj
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.4 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            Rajat Pratishtha Mahotsav
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.6 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            Shree Swaminarayan Temple
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.8 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            Secaucus, New Jersey
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: !isLoading ? 1.8 : 0, ease: "easeOut" }}
            className="leading-tight text-3xl font-semibold text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl"
          >
            celebrates 25 years
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: !isLoading ? 2.2 : 0, ease: "easeOut" }}
            className="mt-4 flex w-full sm:w-auto justify-end"
          >
            <CountdownTimer targetDate={targetDate} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: !isLoading ? 2.4 : 0, ease: "easeOut" }}
            className="mt-4 mb-4 flex justify-end"
          >
            <Link
              href="/registration"
              className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/90 hover:bg-white text-slate-900 rounded-full font-bold font-instrument-serif text-lg sm:text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Register Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div >
  )
}
