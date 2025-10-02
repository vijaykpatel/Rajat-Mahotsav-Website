import { forwardRef } from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  icon: LucideIcon
  iconColor?: "orange" | "purple" | "blue" | "green"
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, icon: Icon, iconColor = "orange", ...props }, ref) => {
    const iconClasses = {
      orange: "icon-orange",
      purple: "icon-purple", 
      blue: "icon-blue",
      green: "icon-green"
    }

    return (
      <div ref={ref} className={cn("section-header", className)} {...props}>
        <Icon className={iconClasses[iconColor]} />
        <h2 className="section-title">{title}</h2>
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

export { SectionHeader }