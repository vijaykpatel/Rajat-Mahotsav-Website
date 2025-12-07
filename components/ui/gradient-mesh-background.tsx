"use client"

import { motion } from "framer-motion"

interface GradientMeshBackgroundProps {
    className?: string
}

export default function GradientMeshBackground({ className = "" }: GradientMeshBackgroundProps) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, 
            #0d1330 0%, 
            #1a1f4e 30%, 
            #0f1535 60%, 
            #0a0e20 100%)`
                }}
            />

            {/* Animated gradient blob 1 - Top left, saffron/orange */}
            <motion.div
                animate={{
                    x: [0, 50, 0, -30, 0],
                    y: [0, -30, 20, 0, 0],
                    scale: [1, 1.1, 0.95, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                className="absolute"
                style={{
                    top: "-20%",
                    left: "-10%",
                    width: "60%",
                    height: "70%",
                    background: `radial-gradient(ellipse at center, 
            rgba(255, 153, 51, 0.35) 0%, 
            rgba(255, 120, 50, 0.2) 30%, 
            transparent 70%)`,
                    filter: "blur(80px)",
                }}
            />

            {/* Animated gradient blob 2 - Center right, gold */}
            <motion.div
                animate={{
                    x: [0, -40, 20, 0],
                    y: [0, 40, -20, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 3,
                }}
                className="absolute"
                style={{
                    top: "10%",
                    right: "-15%",
                    width: "55%",
                    height: "60%",
                    background: `radial-gradient(ellipse at center, 
            rgba(255, 200, 50, 0.3) 0%, 
            rgba(212, 175, 55, 0.15) 40%, 
            transparent 70%)`,
                    filter: "blur(100px)",
                }}
            />

            {/* Animated gradient blob 3 - Bottom left, deep purple/blue */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -20, 30, 0],
                    scale: [1, 1.15, 0.9, 1],
                }}
                transition={{
                    duration: 22,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 6,
                }}
                className="absolute"
                style={{
                    bottom: "-10%",
                    left: "5%",
                    width: "50%",
                    height: "55%",
                    background: `radial-gradient(ellipse at center, 
            rgba(100, 80, 180, 0.25) 0%, 
            rgba(80, 60, 150, 0.15) 40%, 
            transparent 70%)`,
                    filter: "blur(90px)",
                }}
            />

            {/* Animated gradient blob 4 - Bottom right, warm gold */}
            <motion.div
                animate={{
                    x: [0, -30, 40, 0],
                    y: [0, 30, -10, 0],
                    scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                    duration: 18,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 9,
                }}
                className="absolute"
                style={{
                    bottom: "5%",
                    right: "0%",
                    width: "45%",
                    height: "50%",
                    background: `radial-gradient(ellipse at center, 
            rgba(255, 180, 80, 0.25) 0%, 
            rgba(255, 150, 50, 0.12) 45%, 
            transparent 70%)`,
                    filter: "blur(80px)",
                }}
            />

            {/* Subtle center glow - golden accent */}
            <motion.div
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: "80%",
                    height: "60%",
                    background: `radial-gradient(ellipse at center, 
            rgba(255, 215, 0, 0.08) 0%, 
            transparent 50%)`,
                    filter: "blur(60px)",
                }}
            />

            {/* Very subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    )
}
