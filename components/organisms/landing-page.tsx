"use client"

import { motion } from "framer-motion"
import { useLoading } from "@/hooks/use-loading"
import CountdownTimer from "@/components/molecules/countdown-timer"
import Link from "next/link"
import { Skiper53 } from "@/components/ui/skiper-ui/skiper53"

interface TitleSectionProps {
  targetDate?: string
}

export default function TitleSection({ targetDate = "2026-08-02T00:00:00" }: TitleSectionProps) {
  const { isLoading } = useLoading()

  return (
    <div className="h-full flex items-end justify-center relative overflow-hidden pb-8 sm:pb-12 lg:pb-16">
      {/* Dark base gradient - using slate colors like sihasanRef */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      />

      {/* Skiper53 as FULL BACKGROUND - maintains hover animations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-[1]"
      >
        <Skiper53 fullscreen className="bg-transparent" />
      </motion.div>

      {/* Refined overlay - using slate colors for consistency with sihasanRef */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 150% 50% at 50% 30%, transparent 25%, rgba(15, 23, 42, 0.6) 60%, rgba(15, 23, 42, 0.95) 100%),
            linear-gradient(to bottom, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.7) 8%, transparent 25%, transparent 75%, rgba(15, 23, 42, 0.7) 92%, rgba(15, 23, 42, 1) 100%)
          `
        }}
      />

      {/* MAIN CONTENT - Positioned at bottom with liquid glass card */}
      <motion.div
        initial={{ y: 60 }}
        animate={!isLoading ? { y: 0 } : { y: 60 }}
        transition={{ duration: 1.2, delay: !isLoading ? 0.6 : 0, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pointer-events-none"
      >
        {/* Liquid Glass Card Container */}
        <div className="relative">
          {/* Subtle ambient glow effect behind card */}
          <motion.div
            animate={{
              opacity: [0.15, 0.25, 0.15],
              scale: [1, 1.01, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -inset-1 rounded-3xl blur-2xl opacity-30"
            style={{
              background: "linear-gradient(135deg, rgba(255, 180, 50, 0.15) 0%, rgba(255, 140, 0, 0.1) 50%, rgba(212, 175, 55, 0.15) 100%)"
            }}
          />

          {/* Main glass card - subtle blend with background */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.03) 100%)",
              backdropFilter: "blur(12px) saturate(130%)",
              WebkitBackdropFilter: "blur(12px) saturate(130%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow: `
                0 4px 20px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.02),
                inset 0 1px 0 rgba(255, 255, 255, 0.04)
              `
            }}
          >

            {/* Card content */}
            <div className="relative px-6 py-6 sm:px-8 sm:py-6 lg:px-8 lg:py-6">
              {/* Top row: Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: !isLoading ? 0.8 : 0 }}
                className="flex justify-center mb-3 sm:mb-4"
              >
                <span
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border"
                  style={{
                    borderColor: "rgba(255, 180, 50, 0.4)",
                    background: "rgba(255, 180, 50, 0.12)",
                    color: "#FFB832",
                    boxShadow: "0 4px 20px rgba(255, 180, 50, 0.15)"
                  }}
                >
                  ✦ Celebrating 25 Years ✦
                </span>
              </motion.div>

              {/* Main title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: !isLoading ? 1 : 0, ease: "easeOut" }}
                className="text-center mb-3 sm:mb-4"
              >
                <h1
                  className="font-instrument-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FF8C00 60%, #D4AF37 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 20px rgba(255, 165, 0, 0.4))"
                  }}
                >
                  Shree Ghanshyam Maharaj
                </h1>
              </motion.div>

              {/* Event name */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: !isLoading ? 1.2 : 0, ease: "easeOut" }}
                className="text-center text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-instrument-serif tracking-wide mb-3 sm:mb-4"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)"
                }}
              >
                Rajat Pratishtha Mahotsav
              </motion.p>

              {/* Location - single line on larger screens */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: !isLoading ? 1.3 : 0, ease: "easeOut" }}
                className="text-center text-xl sm:text-2xl lg:text-4xl font-instrument-serif tracking-wide mb-3 sm:mb-4"
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                }}
              >
                Shree Swaminarayan Temple Secaucus, New Jersey
              </motion.p>

              {/* Countdown timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: !isLoading ? 1.4 : 0, ease: "easeOut" }}
                className="flex justify-center mb-6 sm:mb-8"
              >
                <CountdownTimer targetDate={targetDate} />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: !isLoading ? 1.5 : 0, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pointer-events-auto"
              >
                <Link
                  href="/registration"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 font-sans font-bold text-sm sm:text-base text-slate-900 overflow-hidden transition-all rounded-full border duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{
                    borderColor: "rgba(255, 180, 50, 0.4)",
                    background: "rgba(255, 180, 50, 0.12)",
                    color: "#FFB832",
                    boxShadow: "0 4px 20px rgba(255, 180, 50, 0.15)"
                  }}
                >
                  <span className="relative z-10">Register Now</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>

                <Link
                  href="/latest-events"
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 font-sans font-bold text-sm sm:text-base text-slate-900 overflow-hidden transition-all rounded-full border duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
                  style={{
                    borderColor: "rgba(255, 180, 50, 0.4)",
                    background: "rgba(255, 180, 50, 0.12)",
                    color: "#FFB832",
                    boxShadow: "0 4px 20px rgba(255, 180, 50, 0.15)"
                  }}
                >
                  <span className="relative z-10">View Events</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
