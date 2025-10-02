import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface TabNavigationProps {
  tabs: Record<string, string>
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const TabNavigation = forwardRef<HTMLDivElement, TabNavigationProps>(
  ({ tabs, activeTab, onTabChange, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-wrap gap-2 mb-8 justify-center", className)}>
        {Object.entries(tabs).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={cn(
              "btn-tab",
              activeTab === key ? "btn-tab-active" : "btn-tab-inactive"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }
)

TabNavigation.displayName = "TabNavigation"

export { TabNavigation }