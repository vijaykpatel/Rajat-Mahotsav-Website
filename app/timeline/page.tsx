"use client"

import { useRef, useEffect, useState } from "react";
import TimelineCard from "@/components/TimelineCard";
import { FloatingMenuButton } from "@/components/floating-menu-button";
import { ArrowLeft } from "lucide-react";

const galleryData = [
  { number: "1970", description: "The beginning of our spiritual journey and community foundation.", speed: 3 },
  { number: "1987", description: "Growing together in faith and strengthening our bonds.", speed: -3 },
  { number: "1992", description: "Dedicated service to the community and devotion to our values.", speed: 3 },
  { number: "1995", description: "Celebrating our rich cultural heritage and traditions.", speed: -3 },
  { number: "1998", description: "Coming together in joy and celebration of our unity.", speed: 3 },
  { number: "2001", description: "Laying the foundation for our temple and spiritual home.", speed: -3 },
  { number: "2002", description: "Moving forward with hope and progress in our mission.", speed: 3 },
  { number: "2003", description: "Blessed with divine grace and spiritual growth.", speed: -3 },
  { number: "2004", description: "United in strength and unwavering faith.", speed: 3 },
  { number: "2005", description: "Continuing our devotion through selfless service.", speed: -3 },
  { number: "2006", description: "Community growth and unity in our shared values.", speed: 3 },
  { number: "2007", description: "Honoring our traditions and cultural heritage.", speed: -3 },
  { number: "2008", description: "Celebrating together in joy and togetherness.", speed: 3 },
  { number: "2009", description: "Building our foundation and spiritual home.", speed: -3 },
  { number: "2010", description: "A decade of growth, seva, and community service.", speed: 3 },
  { number: "2011", description: "Receiving divine blessings and grace.", speed: -3 },
  { number: "2012", description: "Strengthened by unity and faith in our journey.", speed: 3 },
  { number: "2013", description: "Devoted to service and love for our community.", speed: -3 },
  { number: "2014", description: "Growing together as a united community.", speed: 3 },
  { number: "2015", description: "Strengthening family bonds and community ties.", speed: -3 },
  { number: "2016", description: "Celebrating our journey together with joy.", speed: 3 },
  { number: "2017", description: "Our temple foundation and spiritual home.", speed: -3 },
  { number: "2018", description: "Progress and hope guiding our path forward.", speed: 3 },
  { number: "2019", description: "Blessed with divine grace and spiritual wisdom.", speed: -3 },
  { number: "2020", description: "Resilience and hope through challenging times together.", speed: 3 },
  { number: "2021", description: "United in strength and unwavering faith.", speed: -3 },
  { number: "2022", description: "Devoted service and love for our community.", speed: 3 },
  { number: "2023", description: "Growing together in unity and shared purpose.", speed: -3 },
  { number: "2024", description: "Honoring our traditions, culture, and heritage.", speed: 3 },
  { number: "2025", description: "Celebrating our Rajat Mahotsav - 25 years of silver jubilee.", speed: -3 },
];

export default function TimelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const rafRef = useRef<number>();

  const scrollToStart = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(0, { duration: 1000, disableLerp: false });
    }
  };

  useEffect(() => {
    let scroll: any;

    const initScroll = async () => {
      if (typeof window === "undefined" || !scrollRef.current) return;

      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        direction: "horizontal",
        multiplier: 0.5,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });

      locomotiveScrollRef.current = scroll;

      scroll.on("scroll", (obj: any) => {
        setIsScrolled(obj.scroll.x > 300);

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const element = document.elementFromPoint(50, window.innerHeight - 100);
          if (element) {
            const styles = window.getComputedStyle(element);
            const bgColor = styles.backgroundColor;
            
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
              const rgb = bgColor.match(/\d+/g);
              if (rgb) {
                const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
                setIsDarkBackground(brightness < 128);
              }
            }
          }
        });

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
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4/dist/locomotive-scroll.min.css" />
      <FloatingMenuButton />
      <button
        onClick={scrollToStart}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
          isDarkBackground ? 'bg-black/20 hover:bg-black/30 text-white/90 hover:text-white' : 'bg-white/20 hover:bg-white/30 text-black/90 hover:text-black'
        } ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to start"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend overflow-hidden">
        <div data-scroll-container ref={scrollRef}>
          <div className="flex ml-[12vw] pr-[12vw]">
            <div className="flex-shrink-0 mx-[10vw] ml-[2vw]">
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-1" data-scroll-direction="vertical">our</span>
                <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="2" data-scroll-direction="vertical"> journey</span>
            </div>

            {galleryData.map((item, index) => (
              <figure
                key={index}
                className={`flex-shrink-0 mx-[5vw] ${index % 2 === 0 ? 'pt-[10vh]' : ''}`}
                data-scroll
                data-scroll-speed={item.speed}
                data-scroll-direction="vertical"
              >
                <div className="grid grid-cols-[8rem_28vmax] grid-rows-[8rem_28vmax_3rem] gap-0">
                  <div className="col-start-2 row-start-1 flex items-center">
                    <h2 className="text-[clamp(2rem,5vw,4rem)] font-serif font-extrabold italic text-orange-900" data-scroll data-scroll-speed="1">
                      {item.number}
                    </h2>
                  </div>
                  <div className="col-start-2 row-start-2 overflow-hidden relative rounded-2xl">
                    <div className="gallery__item-imginner w-full h-[calc(100%+14vh)] -mt-[7vh]" data-scroll data-scroll-speed="1" data-scroll-direction="vertical">
                      <img
                        src="https://cdn.njrajatmahotsav.com/main_logo.png"
                        alt={item.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-gradient-to-t from-black/40 from-10% via-black/10 via-50% to-transparent backdrop-blur-sm flex items-center justify-center px-4">
                      <p className="text-sm text-white text-center line-clamp-2 font-medium drop-shadow-lg">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-start-1 row-start-3 flex items-end">
                    <a className="w-[120px] h-[120px] rounded-full bg-orange-600 text-white flex items-center justify-center text-3xl font-serif font-bold hover:bg-orange-400 transition-colors cursor-pointer">
                      {item.number}
                    </a>
                  </div>
                </div>
              </figure>
            ))}

            <div className="flex-shrink-0 mx-[10vw]">
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">Let's continue</span>
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">making history</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
