"use client"

import { useRef, useEffect, useState } from "react";
import { FloatingMenuButton } from "@/components/floating-menu-button";
import { ArrowLeft } from "lucide-react";
import MobileTimeline from "@/components/MobileTimeline";
import { timelineData } from "@/lib/timeline-data";
import { TimelineGridTile } from "@/components/TimelineGridTile";

export default function TimelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();

  const scrollToStart = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(0, { duration: 1000, disableLerp: false });
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let scroll: any;
    const initScroll = async () => {
      if (typeof window === "undefined" || !scrollRef.current) return;
      await new Promise(resolve => setTimeout(resolve, 100));
      if (!scrollRef.current) return;
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
  }, [isMobile]);

  if (isMobile) {
    return <MobileTimeline />;
  }

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
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-1" data-scroll-direction="vertical">Our</span>
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="2" data-scroll-direction="vertical"> Journey</span>
            </div>
            {timelineData.map((item, index) => (
              <figure
                key={index}
                className={`flex-shrink-0 mx-[5vw] ${index % 2 === 0 ? 'pt-[10vh]' : ''}`}
                data-scroll
                data-scroll-speed={item.speed}
                data-scroll-direction="vertical"
              >
                <TimelineGridTile item={item} variant="desktop" />
              </figure>
            ))}
            <div className="flex-shrink-0 mx-[10vw]">
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">Let's continue</span>
              <span className="block text-[10vw] pl-12 leading-[1.5] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">making history</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
