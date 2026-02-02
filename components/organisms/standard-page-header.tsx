"use client"

import { motion } from "framer-motion"

interface StandardPageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  isLoaded?: boolean
}

export function StandardPageHeader({ title, subtitle, description, isLoaded = true }: StandardPageHeaderProps) {
  return (
    <div className="text-center page-header-spacing">
      <motion.h1
        className="standard-page-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.div
          className="standard-page-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {subtitle}
        </motion.div>
      )}
      {description && (
        <motion.div
          className="flex justify-center px-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <p className="standard-page-description text-center">
            {description}
          </p>
        </motion.div>
      )}
    </div>
  )
}
