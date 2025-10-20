"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import ShaderBackground from "@/components/organisms/shader-background"
import { useLoading } from "@/hooks/use-loading"
import { useAudioContext } from "@/contexts/audio-context"
import { AudioChoiceButton } from "@/components/atoms/audio-choice-button"

export default function LoadingScreen() {
  const { isLoading, setIsLoading } = useLoading()
  const { play, grantConsent } = useAudioContext()

  const handleEnter = (withAudio: boolean) => {
    if (withAudio) {
      grantConsent()
      play()
    }
    setIsLoading(false)
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
          className="fixed"
          style={{
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 60
          }}
        >
          <ShaderBackground>
            <div className="h-screen w-screen flex items-center justify-center p-4">
              {/* Beige Rectangle with Text Cutout */}
              <motion.div
                className="relative w-[90vw] max-w-4xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                style={{
                  background: 'rgba(245, 245, 220, 0.85)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 25px rgba(0, 0, 0, 0.2)',
                  transform: 'translateY(-10px)'
                }}
              >
                <div className="flex flex-col justify-between items-stretch px-4 py-6 gap-4">
                  {/* Header Text */}
                  <h3
                    className="font-medium text-center"
                    style={{
                      fontSize: 'clamp(0.65rem, 1.5vw + 0.3vh, 1rem)',
                      lineHeight: '1.2',
                      letterSpacing: 'normal',
                      background: 'linear-gradient(45deg, #B50000, #0D132D)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Maninagar Shree Swaminarayan Gadi Sansthan - Shree Swaminarayan Temple New Jersey
                  </h3>

                  <div className="flex flex-col justify-center items-stretch gap-1">
                  {/* English Text */}
                  <h1
                    className="uppercase font-black text-center px-2"
                    style={{
                      fontSize: 'clamp(1.35rem, 4vw + 1.8vh, 4.5rem)',
                      lineHeight: '1.2',
                      letterSpacing: '-0.03em',
                      background: 'linear-gradient(45deg, #B50000, #0D132D)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    JAY SHREE SWAMINARAYAN
                  </h1>

                  {/* Loading Bar */}
                  <div className="w-full my-4 relative z-0">
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
                    className="font-bold text-center px-2"
                    style={{
                      fontSize: 'clamp(1.8rem, 5vw + 2.5vh, 6rem)',
                      lineHeight: '1.2',
                      letterSpacing: 'normal',
                      background: 'linear-gradient(45deg, #B50000, #0D132D)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    જય શ્રી સ્વામિનારાયણ
                  </h2>

                  {/* Audio Choice Buttons - Desktop Only */}
                  <div className="flex w-full flex-row pt-6 pb-2 gap-3 md:gap-6 justify-center mt-2">
                    <AudioChoiceButton
                      icon={Volume2}
                      label="Audio"
                      onClick={() => handleEnter(true)}
                      delay={0.5}
                    />
                    <AudioChoiceButton
                      icon={VolumeX}
                      label="Silent"
                      onClick={() => handleEnter(false)}
                      delay={0.6}
                    />
                  </div>
                  </div>

                  {/* Footer Text */}
                  <h4
                    className="font-medium text-center"
                    style={{
                      fontSize: 'clamp(0.65rem, 1.5vw + 0.3vh, 1rem)',
                      lineHeight: '1.2',
                      letterSpacing: 'normal',
                      background: 'linear-gradient(45deg, #B50000, #0D132D)',
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