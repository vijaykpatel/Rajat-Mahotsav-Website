"use client"

import { motion } from "framer-motion"
import Link from "next/link"

import { useLoading } from "@/hooks/use-loading"
import CountdownTimer from "@/components/molecules/countdown-timer"

interface TitleSectionMobileProps {
  targetDate?: string
}

export default function TitleSectionMobile({ targetDate = "2026-08-02T00:00:00" }: TitleSectionMobileProps) {
  const { isLoading } = useLoading()

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/92 to-slate-900 hero-grain" style={{ paddingTop: "calc(var(--navbar-height) - 28px)" }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="hero-orb-base hero-orb-1" />
        <div className="hero-orb-base hero-orb-2" />
      </div>
      <div className="hero-ambient" />
      <div className="hero-lines" />
      <div className="hero-noise" />

      <div className="relative z-20 flex h-full items-start pt-0 pb-8 sm:pb-10 lg:pb-12">
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.9, delay: !isLoading ? 0.5 : 0, ease: "easeOut" }}
          className="w-full"
        >
          <div className="hero-shell z-10">
            <div className="relative w-full max-w-5xl mx-auto rounded-[32px] border border-white/15 bg-white/[0.04] shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl px-3 py-3 sm:px-4 sm:py-4">
              <div className="relative w-full max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-white/12 px-6 py-8 sm:px-10 sm:py-10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-lg text-center flex flex-col gap-5 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{ duration: 0.7, delay: !isLoading ? 0.7 : 0, ease: "easeOut" }}
                  className="flex flex-col gap-1.5 sm:gap-2 font-instrument-serif leading-tight"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: !isLoading ? 0.9 : 0, ease: "easeOut" }}
                    className="leading-tight text-4xl sm:text-5xl font-semibold text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    Shree Ghanshyam Maharaj
                  </motion.h1>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: !isLoading ? 1.05 : 0, ease: "easeOut" }}
                    className="leading-tight text-4xl sm:text-5xl font-semibold text-amber-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    Rajat Pratishtha Mahotsav
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: !isLoading ? 1.2 : 0, ease: "easeOut" }}
                    className="leading-tight text-3xl sm:text-4xl font-semibold text-slate-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    Shree Swaminarayan Temple
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: !isLoading ? 1.35 : 0, ease: "easeOut" }}
                    className="leading-tight text-3xl sm:text-4xl font-semibold text-slate-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    Secaucus, New Jersey
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: !isLoading ? 1.5 : 0, ease: "easeOut" }}
                    className="leading-tight text-3xl sm:text-4xl font-semibold text-slate-200 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                  >
                    Celebrates 25 years
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={!isLoading ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.8, delay: !isLoading ? 1.8 : 0, ease: "easeOut" }}
                  className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center w-full"
                >
                  <Link
                    href="/registration"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 sm:px-7 sm:py-4 font-semibold text-white border border-white/35 bg-gradient-to-r from-white/25 via-white/12 to-white/10 backdrop-blur-xl shadow-[0_16px_50px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    <span>Register Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 translate-x-[1px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/latest-events"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 sm:px-7 sm:py-4 font-semibold text-white border border-white/30 bg-gradient-to-r from-amber-200/12 via-white/8 to-white/6 backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.35)] hover:border-white/45 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5"
                  >
                    <span>View Latest Events</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 translate-x-[1px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.8, delay: !isLoading ? 2 : 0, ease: "easeOut" }}
                  className="w-full flex justify-center mt-1"
                >
                  <div className="inline-flex items-center gap-4 sm:gap-6 rounded-2xl border border-amber-200/25 bg-slate-900/70 px-4 py-4 sm:px-8 sm:py-5 shadow-[0_18px_50px_rgba(0,0,0,0.4)] backdrop-blur-md w-full max-w-[calc(100%-1.5rem)] sm:max-w-[720px] justify-center">
                    <CountdownTimer targetDate={targetDate} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
