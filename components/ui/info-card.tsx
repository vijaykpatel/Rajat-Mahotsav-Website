import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
  variant?: "default" | "venue"
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  ({ className, children, delay = 0, variant = "default", ...props }, ref) => {
    const baseClasses = variant === "venue" 
      ? "card-interactive ring-2 ring-brand-orange-200" 
      : "card-interactive"

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

InfoCard.displayName = "InfoCard"

export { InfoCard }