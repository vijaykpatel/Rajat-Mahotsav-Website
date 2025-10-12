"use client"

import { useRef, useEffect } from "react";

const galleryData = [
  { title: "Funambulist", number: "01", tags: ["#house", "#green", "#chair"], speed: 2 },
  { title: "Omophagy", number: "02", tags: ["#love", "#hug", "#people"], speed: -2 },
  { title: "Conniption", number: "03", tags: ["#hike", "#nature", "#rain"], speed: 2 },
  { title: "Xenology", number: "04", tags: ["#free", "#wood", "#fire"], speed: -2 },
  { title: "Lycanthropy", number: "05", tags: ["#cloud", "#lake", "#frog"], speed: 2 },
  { title: "Mudlark", number: "06", tags: ["#tent", "#flower", "#love"], speed: -2 },
  { title: "Illywhacker", number: "07", tags: ["#water", "#bottle", "#hand"], speed: 2 },
  { title: "Disenthral", number: "08", tags: ["#night", "#stars", "#moon"], speed: -2 },
  { title: "Abaya", number: "09", tags: ["#sun", "#light", "#air"], speed: 2 },
  { title: "Hallux", number: "10", tags: ["#vital", "#fog", "#close"], speed: -2 },
  { title: "Lablab", number: "11", tags: ["#cover", "#bed", "#window"], speed: 2 },
  { title: "Momisom", number: "12", tags: ["#sad", "#mouth", "#tear"], speed: -2 },
];

export default function TimelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: any;

    const initScroll = async () => {
      if (typeof window === "undefined" || !scrollRef.current) return;

      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        direction: "horizontal",
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });

      scroll.on("scroll", (obj: any) => {
        for (const key of Object.keys(obj.currentElements)) {
          if (obj.currentElements[key].el.classList.contains("gallery__item-imginner")) {
            const progress = obj.currentElements[key].progress;
            const saturateVal = progress < 0.5 
              ? Math.max(0, Math.min(1, (progress / 0.5)))
              : Math.max(0, Math.min(1, ((1 - progress) / 0.5)));
            const brightnessVal = progress < 0.5
              ? Math.max(0, Math.min(1, (progress / 0.5)))
              : Math.max(0, Math.min(1, ((1 - progress) / 0.5)));
            obj.currentElements[key].el.style.filter = `saturate(${saturateVal}) brightness(${brightnessVal})`;
          }
        }
      });
    };

    initScroll();

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4/dist/locomotive-scroll.min.css" />
      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend overflow-hidden">
        <div data-scroll-container ref={scrollRef}>
          <div className="flex ml-[12vw] pr-[12vw]">
            <div className="flex-shrink-0 mx-[10vw] ml-[2vw] text-orange-900/20 [text-stroke:1px_#463832] [-webkit-text-stroke:1px_#463832] [-webkit-text-fill-color:transparent]">
              <span className="block text-[20vw] leading-[0.8] font-serif font-extrabold italic lowercase" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">Ariel</span>
              <span className="block text-[20vw] leading-[0.8] font-serif font-extrabold italic lowercase" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">Croze</span>
            </div>

            {galleryData.map((item, index) => (
              <figure
                key={index}
                className={`flex-shrink-0 mx-[3vw] ${index % 2 === 0 ? 'pt-[10vh]' : ''}`}
                data-scroll
                data-scroll-speed={item.speed}
                data-scroll-direction="vertical"
              >
                <div className="grid grid-cols-[8rem_21vmax] grid-rows-[8rem_28vmax_3rem] gap-0">
                  <div className="col-start-1 row-start-1 flex items-center justify-end pr-8">
                    <span className="text-[clamp(2.5rem,9vw,6.5rem)] font-serif font-extrabold italic text-white">
                      {item.number}
                    </span>
                  </div>
                  <div className="col-start-2 row-start-1 flex items-center">
                    <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-extrabold italic text-orange-900" data-scroll data-scroll-speed="1">
                      {item.title}
                    </h2>
                  </div>
                  <div className="col-start-2 row-start-2 overflow-hidden relative">
                    <div className="gallery__item-imginner w-full h-[calc(100%+14vh)] -mt-[7vh] bg-gray-300 flex items-center justify-center bg-cover bg-center" data-scroll data-scroll-speed="1" data-scroll-direction="vertical">
                      <span className="text-gray-500 text-sm">Image {item.number}</span>
                    </div>
                  </div>
                  <div className="col-start-1 row-start-3 flex items-end">
                    <a className="w-[120px] h-[120px] rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl underline hover:bg-orange-400 hover:no-underline transition-colors cursor-pointer">
                      explore
                    </a>
                  </div>
                  <div className="col-start-2 row-start-3 flex items-end justify-end gap-4 text-xl">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-gray-600 cursor-pointer hover:text-orange-600 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </figure>
            ))}

            <div className="flex-shrink-0 mx-[10vw] text-orange-900/20 [text-stroke:1px_#463832] [-webkit-text-stroke:1px_#463832] [-webkit-text-fill-color:transparent]">
              <span className="block text-[20vw] leading-[0.8] font-serif font-extrabold italic lowercase" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">Daria</span>
              <span className="block text-[20vw] leading-[0.8] font-serif font-extrabold italic lowercase" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">Gaita</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
