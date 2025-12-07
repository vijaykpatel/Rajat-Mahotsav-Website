"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    opacity: number
}

interface FloatingParticlesProps {
    className?: string
    count?: number
}

export default function FloatingParticles({
    className = "",
    count = 35,
}: FloatingParticlesProps) {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        const generatedParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100 + 10,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 12 + 15,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.15,
        }))
        setParticles(generatedParticles)
    }, [count])

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        top: [`${particle.y}%`, `${particle.y - 25}%`],
                        opacity: [0, particle.opacity, particle.opacity * 0.5, 0],
                        scale: [0, 1, 0.8, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 250, 220, 0.9) 0%,
              rgba(255, 215, 0, 0.7) 50%,
              rgba(212, 175, 55, 0.4) 100%)`,
                        boxShadow: `0 0 ${particle.size * 3}px rgba(255, 215, 0, 0.5)`,
                    }}
                />
            ))}
        </div>
    )
}
