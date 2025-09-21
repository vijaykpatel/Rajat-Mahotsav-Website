"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from 'react'
import { useNavbarHeight } from '@/hooks/use-navbar-height'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TitleSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = '2026-07-28T17:00:00-05:00';
  const { dynamicPadding } = useNavbarHeight();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-[#4B9CD3] flex flex-col items-center justify-start px-4 pt-16" style={{ paddingTop: dynamicPadding }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h1 className="w-full font-black text-white uppercase leading-none text-center">
          <div className="text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] tracking-tight">Maninagar Shree</div>
          <div className="text-[11vw] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] tracking-tight">Swaminarayan</div>
          <div className="text-[11vw] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] tracking-tight">Gadi Sansthan</div>
          <div className="text-[11vw] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] tracking-tight">Secaucus, NJ</div>
          <div className="text-[13vw] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight">Rajat Mahotsav</div>
        </h1>
        {/* <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black text-white uppercase tracking-wider leading-none">
          Suvarana Tula Murti<br />
          Pratishta Rajat<br />
          Mahotosav
        </h1> */}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <div className="font-noto-music">
          {/* Mobile: Two lines */}
          <div className="flex flex-col gap-2 sm:hidden">
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl font-black text-white tracking-tight">{timeLeft.days.toString().padStart(3, '0')}d</span>
              <span className="text-5xl font-black text-white tracking-tight">-</span>
              <span className="text-6xl font-black text-white tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}h</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl font-black text-white tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
              <span className="text-5xl font-black text-white tracking-tight">-</span>
              <span className="text-6xl font-black text-white tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
            </div>
          </div>
          {/* Desktop: Single line */}
          <div className="hidden sm:flex items-center justify-center gap-4">
            <span className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight">{timeLeft.days.toString().padStart(3, '0')}d</span>
            <span className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight">-</span>
            <span className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}h</span>
            <span className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight">-</span>
            <span className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
            <span className="text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight">-</span>
            <span className="text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}