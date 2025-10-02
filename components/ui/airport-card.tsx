import { forwardRef } from "react"
import { Clock, Car, Navigation } from "lucide-react"
import { InfoCard } from "./info-card"

interface AirportCardProps {
  airport: {
    name: string
    driveTime: string
    uberPrice: string
    taxiPrice: string
  }
  delay?: number
}

const AirportCard = forwardRef<HTMLDivElement, AirportCardProps>(
  ({ airport, delay = 0 }, ref) => {
    return (
      <InfoCard ref={ref} delay={delay}>
        <h3 className="text-xl font-bold mb-3 text-brand-blue-400">{airport.name}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-blue-400" />
            <span className="text-sm font-medium">{airport.driveTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-brand-blue-400" />
            <span className="text-sm">Uber/Lyft: {airport.uberPrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-brand-blue-400" />
            <span className="text-sm">Taxi: {airport.taxiPrice}</span>
          </div>
        </div>
      </InfoCard>
    )
  }
)

AirportCard.displayName = "AirportCard"

export { AirportCard }