"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ImageGridBackgroundProps {
    className?: string
}

// Temple/event photos for the mosaic
const gridImages = [
    { id: 1, src: "/temple-1.jpg", alt: "Temple celebration" },
    { id: 2, src: "/temple-2.jpg", alt: "Ceremony" },
    { id: 3, src: "/temple-3.jpg", alt: "Festival lights" },
    { id: 4, src: "/temple-4.jpg", alt: "Devotees" },
    { id: 5, src: "/temple-5.jpg", alt: "Temple interior" },
    { id: 6, src: "/temple-6.jpg", alt: "Evening celebration" },
    { id: 7, src: "/temple-7.jpg", alt: "Community gathering" },
    { id: 8, src: "/temple-8.jpg", alt: "Prayer ceremony" },
    { id: 9, src: "/temple-9.jpg", alt: "Festival decorations" },
    { id: 10, src: "/temple-10.jpg", alt: "Temple silhouette" },
    { id: 11, src: "/temple-11.jpg", alt: "Celebration" },
    { id: 12, src: "/temple-12.jpg", alt: "Sacred moments" },
]

export default function ImageGridBackground({ className = "" }: ImageGridBackgroundProps) {
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        }
    }

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Dark base */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, #0a0e1a 0%, #0d1225 50%, #080b14 100%)"
                }}
            />

            {/* Image grid container */}
            <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-6 gap-2 p-4 opacity-40">
                {gridImages.map((image, index) => {
                    const isHovered = hoveredId === image.id
                    const row = Math.floor(index / 6)
                    const col = index % 6

                    // Calculate distance from mouse for spread effect
                    const imgCenterX = (col + 0.5) * (100 / 6)
                    const imgCenterY = (row + 0.5) * (100 / 2)
                    const containerWidth = containerRef.current?.offsetWidth || 1
                    const containerHeight = containerRef.current?.offsetHeight || 1
                    const mousePctX = (mousePos.x / containerWidth) * 100
                    const mousePctY = (mousePos.y / containerHeight) * 100

                    const distX = imgCenterX - mousePctX
                    const distY = imgCenterY - mousePctY
                    const spreadFactor = 0.15
                    const translateX = distX * spreadFactor
                    const translateY = distY * spreadFactor

                    return (
                        <motion.div
                            key={image.id}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: isHovered ? 1.15 : 1,
                                x: translateX,
                                y: translateY,
                                zIndex: isHovered ? 20 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                opacity: { duration: 0.8, delay: index * 0.05 }
                            }}
                            whileHover={{
                                scale: 1.2,
                                zIndex: 30,
                                transition: { duration: 0.2 }
                            }}
                            onHoverStart={() => setHoveredId(image.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            style={{
                                filter: isHovered ? "brightness(1.3) saturate(1.2)" : "brightness(0.7) saturate(0.8)",
                            }}
                        >
                            {/* Placeholder gradient for images */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(${135 + index * 30}deg, 
                    hsl(${30 + index * 20}, 70%, ${25 + (index % 3) * 10}%) 0%,
                    hsl(${50 + index * 15}, 60%, ${15 + (index % 4) * 8}%) 100%)`
                                }}
                            />

                            {/* Glow effect on hover */}
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        boxShadow: "inset 0 0 30px rgba(255, 200, 100, 0.3)",
                                    }}
                                />
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Gradient overlay to fade images and make text readable */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(ellipse at center, 
              rgba(10, 14, 26, 0.4) 0%, 
              rgba(10, 14, 26, 0.7) 50%,
              rgba(10, 14, 26, 0.95) 100%
            )
          `
                }}
            />

            {/* Subtle animated gradient overlay for color interest */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 15,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                    background: `linear-gradient(135deg, 
            transparent 0%, 
            rgba(255, 153, 51, 0.1) 25%, 
            transparent 50%, 
            rgba(212, 175, 55, 0.1) 75%, 
            transparent 100%)`,
                    backgroundSize: "200% 200%",
                }}
            />
        </div>
    )
}
