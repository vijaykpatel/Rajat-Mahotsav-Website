import { TimelineItem } from "@/lib/timeline-data";

interface TimelineGridTileProps {
  item: TimelineItem;
  variant?: "mobile" | "desktop";
}

export function TimelineGridTile({ item, variant = "mobile" }: TimelineGridTileProps) {
  if (variant === "mobile") {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-serif font-extrabold italic text-orange-900">{item.number}</h2>
        <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
          <img
            src={item.image}
            alt={item.description}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-xs text-white font-medium">{item.description}</p>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center text-lg font-serif font-bold self-start mt-1">
          {item.number}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[6rem_20vmax] grid-rows-[6rem_20vmax_2rem] gap-0">
      <div className="col-start-2 row-start-1 flex items-center">
        <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-serif font-extrabold italic text-orange-900" data-scroll data-scroll-speed="1">
          {item.number}
        </h2>
      </div>
      <div className="col-start-2 row-start-2 overflow-hidden relative rounded-2xl">
        <div className="gallery__item-imginner w-full h-[calc(100%+14vh)] -mt-[7vh]" data-scroll data-scroll-speed="1" data-scroll-direction="vertical">
          <img
            src={item.image}
            alt={item.description}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-xs text-white font-medium">{item.description}</p>
        </div>
      </div>
      <div className="col-start-1 row-start-3 flex items-end">
        <a className="w-[90px] h-[90px] rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-serif font-bold hover:bg-orange-400 transition-colors cursor-pointer">
          {item.number}
        </a>
      </div>
    </div>
  );
}
