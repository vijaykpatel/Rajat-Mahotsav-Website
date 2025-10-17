"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import ShaderBackground from "@/components/organisms/shader-background"
import { useLoading } from "@/hooks/use-loading"

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading()
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const skipTimer = setTimeout(() => {
        setCanSkip(true)
      }, 1000)

      const autoTimer = setTimeout(() => {
        setIsLoading(false)
      }, 2800)

      return () => {
        clearTimeout(skipTimer)
        clearTimeout(autoTimer)
      }
    }
  }, [isLoading, setIsLoading])

  const handleSkip = () => {
    if (canSkip) {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            filter: 'blur(10px)',
            rotateY: 15
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.7 },
            scale: { duration: 0.9 },
            filter: { duration: 0.5 },
            rotateY: { duration: 0.8 }
          }}
          className="fixed cursor-pointer"
          style={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 60
          }}
          onClick={handleSkip}
        >
          <ShaderBackground>
            <div className="h-screen w-screen flex items-center justify-center p-4">
              {canSkip && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-6 right-6 p-3 rounded-full backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white/90 hover:text-white transition-all duration-300 animate-pulse"
                  onClick={handleSkip}
                  aria-label="Skip loading"
                >
                  <ArrowRight size={20} />
                </motion.button>
              )}
              {/* Beige Rectangle with Text Cutout */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                style={{
                  width: '75vw',
                  height: '55vh',
                  background: '#F5F5DC',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-10px)'
                }}
              >
                <div className="h-full flex flex-col justify-between items-stretch px-0 py-4">
                  {/* Header Text */}
                  <h3
                    className="font-medium text-center px-4"
                    style={{
                      fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                      lineHeight: '1.3',
                      letterSpacing: '0.02em',
                      background: 'linear-gradient(45deg, #FFD700, #C0C0C0, #DC143C, #72b8d3)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Maninagar Shree Swaminarayan Gadi Sansthan - Shree Swaminarayan Temple New Jersey
                  </h3>

                  <div className="flex flex-col justify-center items-stretch">
                  {/* English Text */}
                  <h1
                    className="uppercase font-black text-center px-2 relative"
                    style={{
                      fontSize: 'clamp(2.3rem, 9vw, 7.5rem)',
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      lineHeight: '1.0',
                      letterSpacing: '0.09em',
                      textAlign: 'center',
                      background: 'linear-gradient(45deg, #FFD700, #C0C0C0, #DC143C, #72b8d3)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    JAY SHREE SWAMINARAYAN
                  </h1>

                  {/* Loading Bar */}
                  <div className="w-full mt-6 mb-6 relative z-0">
                    <div className="h-px bg-gray-200 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gray-400 to-gray-600"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.5, ease: 'linear' }}
                      />
                    </div>
                  </div>

                  {/* Gujarati Text */}
                  <h2
                    className="font-bold text-center px-2 relative"
                    style={{
                      fontSize: 'clamp(2.5rem, 9vw, 8rem)',
                      lineHeight: '1.2',
                      letterSpacing: '0.05em',
                      background: 'linear-gradient(45deg, #FFD700, #C0C0C0, #DC143C, #72b8d3)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    જય શ્રી સ્વામિનારાયણ
                  </h2>
                  </div>

                  {/* Footer Text */}
                  <h4
                    className="font-medium text-center px-4"
                    style={{
                      fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
                      lineHeight: '1.3',
                      letterSpacing: '0.02em',
                      background: 'linear-gradient(45deg, #FFD700, #C0C0C0, #DC143C, #72b8d3)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Inspired by His Divine Holiness Acharya Shree Jitendriyapriyadasji Swamiji Maharaj
                  </h4>
                </div>
              </motion.div>
            </div>
          </ShaderBackground>
        </motion.div>
      )}
    </AnimatePresence>
  )
}