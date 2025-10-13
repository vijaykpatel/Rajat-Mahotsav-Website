import { getCloudflareImage } from "@/lib/cdn-assets"

interface GuruCardProps {
  imageId: string
  name: string
  className?: string
}

export default function GuruCard({ imageId, name, className = "" }: GuruCardProps) {
  return (
    <div className={`relative w-96 h-[32rem] rounded-2xl overflow-hidden group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/60 via-primary/20 to-transparent p-[3px]">
        <div className="w-full h-full bg-background rounded-2xl overflow-hidden relative">
          <img
            src={getCloudflareImage(imageId)}
            alt={name}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white text-xl font-semibold text-center">{name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
