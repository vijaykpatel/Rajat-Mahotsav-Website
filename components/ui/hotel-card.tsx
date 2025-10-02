import { forwardRef } from "react"
import { Hash, MapPin, Phone, Clock, Calendar, DollarSign, ExternalLink } from "lucide-react"
import { InfoCard } from "./info-card"

interface HotelCardProps {
  hotel: {
    name: string
    address: string
    phone: string
    hotelCode: string
    bookingLink: string
    blockDates: string
    travelTime: string
    walkable: boolean
    pricePerNight: string
    amenities: string[]
  }
  delay?: number
}

const HotelCard = forwardRef<HTMLDivElement, HotelCardProps>(
  ({ hotel, delay = 0 }, ref) => {
    return (
      <InfoCard ref={ref} delay={delay}>
        <h3 className="text-xl font-bold mb-3">{hotel.name}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-brand-purple-400" />
            <span className="text-sm font-medium">{hotel.hotelCode}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 mt-1 text-brand-purple-400" />
            <span className="text-sm">{hotel.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-brand-purple-400" />
            <span className="text-sm">{hotel.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-purple-400" />
            <span className="text-sm font-medium">{hotel.travelTime}</span>
            {hotel.walkable && <span className="badge-success">Walkable</span>}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brand-purple-400" />
            <span className="text-sm">{hotel.blockDates}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-brand-purple-400" />
            <span className="text-sm font-semibold">{hotel.pricePerNight}/night</span>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-brand-purple-400" />
            <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">Book Now</a>
          </div>
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {hotel.amenities.map((amenity, i) => (
                <span key={i} className="badge-info">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </InfoCard>
    )
  }
)

HotelCard.displayName = "HotelCard"

export { HotelCard }