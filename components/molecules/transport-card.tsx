import { forwardRef } from "react"
import { InfoCard } from "./info-card"

interface TransportCardProps {
  transport: {
    type: string
    routes: string
    info: string
  }
  delay?: number
}

const TransportCard = forwardRef<HTMLDivElement, TransportCardProps>(
  ({ transport, delay = 0 }, ref) => {
    return (
      <InfoCard ref={ref} delay={delay}>
        <h3 className="text-xl font-bold mb-3 text-brand-blue-400">{transport.type}</h3>
        <p className="text-gray-600 mb-2"><strong>Routes:</strong> {transport.routes}</p>
        <p className="text-gray-500 text-sm">{transport.info}</p>
      </InfoCard>
    )
  }
)

TransportCard.displayName = "TransportCard"

export { TransportCard }