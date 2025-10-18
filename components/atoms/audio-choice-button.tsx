"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface AudioChoiceButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  delay: number
}

export function AudioChoiceButton({ icon: Icon, label, onClick, delay }: AudioChoiceButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        background: 'bg-preset-navy/40',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 50px rgba(220, 38, 38, 0.4)'
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl w-20 h-20 md:w-28 md:h-28"
      style={{
        background: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
        boxShadow: '0 0 20px rgba(13, 19, 45, 0.6), 0 0 40px rgba(13, 19, 45, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <Icon className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={2.5} />
      <span className="font-medium text-xs md:text-sm text-white drop-shadow-lg">{label}</span>
    </motion.button>
  )
}
