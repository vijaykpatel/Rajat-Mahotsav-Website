import { forwardRef } from "react"
import { InfoCard } from "./info-card"

interface AttractionCardProps {
  attraction: {
    name: string
    distance: string
    description: string
  }
  delay?: number
}

const AttractionCard = forwardRef<HTMLDivElement, AttractionCardProps>(
  ({ attraction, delay = 0 }, ref) => {
    return (
      <InfoCard ref={ref} delay={delay}>
        <div className="mb-3">
          <h3 className="text-xl font-bold text-brand-green-600">{attraction.name}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{attraction.description}</p>
      </InfoCard>
    )
  }
)

AttractionCard.displayName = "AttractionCard"

export { AttractionCard }