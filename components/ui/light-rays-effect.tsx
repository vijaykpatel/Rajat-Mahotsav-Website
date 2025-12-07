"use client"

import { motion } from "framer-motion"

interface LightRaysEffectProps {
    className?: string
    intensity?: number
}

export default function LightRaysEffect({
    className = "",
    intensity = 1,
}: LightRaysEffectProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Soft ambient golden glow from top - no harsh center line */}
            <motion.div
                animate={{
                    opacity: [0.3 * intensity, 0.5 * intensity, 0.3 * intensity],
                }}
                transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                    width: "120%",
                    height: "70%",
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, 
            rgba(255, 215, 0, 0.15) 0%, 
            rgba(212, 175, 55, 0.08) 30%, 
            transparent 60%)`,
                }}
            />

            {/* Soft side glows */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 2
                }}
                className="absolute top-0 left-0 w-1/3 h-full"
                style={{
                    background: `radial-gradient(ellipse 100% 80% at 0% 30%, 
            rgba(212, 175, 55, 0.12) 0%, 
            transparent 50%)`,
                }}
            />

            <motion.div
                animate={{
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 4
                }}
                className="absolute top-0 right-0 w-1/3 h-full"
                style={{
                    background: `radial-gradient(ellipse 100% 80% at 100% 30%, 
            rgba(212, 175, 55, 0.12) 0%, 
            transparent 50%)`,
                }}
            />

            {/* Subtle shimmer sweep - gentle, not harsh */}
            <motion.div
                animate={{
                    x: ["-100%", "200%"],
                    opacity: [0, 0.15 * intensity, 0]
                }}
                transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 5
                }}
                className="absolute top-0 left-0 w-1/3 h-full"
                style={{
                    background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 215, 0, 0.2) 50%, 
            transparent 100%)`,
                    filter: "blur(60px)",
                }}
            />
        </div>
    )
}
