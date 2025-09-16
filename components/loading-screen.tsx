"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Spotlight Shader Background */}
          <div className="absolute inset-0 bg-black">
            <div 
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    circle at 50% 50%,
                    rgba(255, 165, 0, 0.3) 0%,
                    rgba(255, 69, 0, 0.2) 25%,
                    rgba(139, 69, 19, 0.1) 50%,
                    rgba(0, 0, 0, 0.9) 70%,
                    rgba(0, 0, 0, 1) 100%
                  )
                `
              }}
            />
            {/* Animated spotlight effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(
                    circle at 50% 50%,
                    rgba(255, 215, 0, 0.4) 0%,
                    rgba(255, 140, 0, 0.2) 30%,
                    transparent 60%
                  )
                `
              }}
            />
          </div>

          {/* Logo with buzzing and glowing effects */}
          <div className="relative z-10">
            <motion.div
              animate={{
                x: [0, -2, 2, -1, 1, 0],
                y: [0, 1, -1, 2, -2, 0],
                rotate: [0, -0.5, 0.5, -0.3, 0.3, 0],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="relative"
            >
              {/* Glow effect layers */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500"
                style={{ transform: 'scale(1.2)' }}
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full blur-lg bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400"
                style={{ transform: 'scale(1.1)' }}
              />

              {/* Logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10"
              >
                <Image
                  src="/liquid_logo.png"
                  alt="Loading Logo"
                  width={200}
                  height={200}
                  className="drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Loading dots */}
            {/* <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full shadow-lg"
                />
              ))}
            </div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}