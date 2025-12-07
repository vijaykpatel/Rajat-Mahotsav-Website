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
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {/* Dark base gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #050508 0%, #0a0a12 50%, #08080f 100%)"
        }}
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

      {/* Overlay gradient to ensure text readability */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(5, 5, 8, 0.6) 60%, rgba(5, 5, 8, 0.9) 100%),
            linear-gradient(to bottom, rgba(5, 5, 8, 0.3) 0%, transparent 20%, transparent 80%, rgba(5, 5, 8, 0.5) 100%)
          `
        }}
      />

      {/* MAIN CONTENT - Centered, overlaid on top */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, delay: !isLoading ? 0.6 : 0, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl pointer-events-none"
      >
        {/* Celebrating 25 Years tag - LARGER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: !isLoading ? 0.8 : 0 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold tracking-[0.25em] uppercase px-8 py-3.5 rounded-full border backdrop-blur-sm"
            style={{
              borderColor: "rgba(255, 180, 50, 0.5)",
              background: "rgba(255, 180, 50, 0.15)",
              color: "#FFB832",
              boxShadow: "0 6px 30px rgba(255, 180, 50, 0.2)"
            }}
          >
            Celebrating 25 Years
          </span>
        </motion.div>

        {/* Main title - Single line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: !isLoading ? 1 : 0, ease: "easeOut" }}
          className="mb-6"
        >
          <h1
            className="font-instrument-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FF8C00 60%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 30px rgba(255, 165, 0, 0.3))"
            }}
          >
            Shree Ghanshyam Maharaj
          </h1>
        </motion.div>

        {/* Event name - LARGER */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: !isLoading ? 1.3 : 0, ease: "easeOut" }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-instrument-serif tracking-wide mb-4"
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)"
          }}
        >
          Rajat Pratishtha Mahotsav
        </motion.p>

        {/* Location - 2 lines with same font */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: !isLoading ? 1.4 : 0, ease: "easeOut" }}
          className="mb-10 flex flex-col items-center gap-3"
        >
          <p
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-instrument-serif tracking-wide text-white/85"
            style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)" }}
          >
            Shree Swaminarayan Temple
          </p>
          <p
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-instrument-serif tracking-wide text-white/85"
            style={{ textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)" }}
          >
            Secaucus, New Jersey
          </p>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: !isLoading ? 1.5 : 0, ease: "easeOut" }}
          className="mb-10"
        >
          <CountdownTimer targetDate={targetDate} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: !isLoading ? 1.6 : 0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 pointer-events-auto"
        >
          <Link
            href="/registration"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-4 font-sans font-bold text-lg text-slate-900 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)",
              backgroundSize: "200% 200%",
              boxShadow: "0 15px 50px rgba(255, 165, 0, 0.4), 0 0 60px rgba(255, 165, 0, 0.15)"
            }}
          >
            <span className="relative z-10">Register Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>

          <Link
            href="/latest-events"
            className="group inline-flex items-center justify-center gap-3 rounded-full px-10 py-4 font-sans font-semibold text-lg text-white/90 border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-white/30"
            style={{
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
            }}
          >
            <span>View Events</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
