"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CountdownTimerProps {
    targetDate: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, staggerChildren: 0.1 }}
            className="flex w-full justify-between sm:w-auto sm:justify-start sm:gap-3 text-white"
        >
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </motion.div>
    )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="relative flex justify-center items-center w-[50px] h-[40px] sm:w-[70px] sm:h-[50px] lg:w-[90px] lg:h-[65px] xl:w-[110px] xl:h-[80px] 2xl:w-[130px] 2xl:h-[100px]">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="block font-semibold text-white drop-shadow-lg font-instrument-serif leading-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                    >
                        {value.toString().padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-xs sm:text-base font-medium tracking-wider uppercase text-white/80 drop-shadow-sm font-instrument-serif text-center w-full">{label}</span>
        </div>
    )
}
