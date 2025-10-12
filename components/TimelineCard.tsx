interface TimelineCardProps {
  imageSrc: string;
  description: string;
}

export default function TimelineCard({ imageSrc, description }: TimelineCardProps) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-full h-[85%]">
        <img
          src={imageSrc}
          alt={description}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-[15%] flex items-center justify-center px-4 bg-gradient-to-r from-orange-50 to-white">
        <p className="text-sm text-gray-700 text-center line-clamp-2 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}
