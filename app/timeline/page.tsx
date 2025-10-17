"use client"

import { useRef, useEffect, useState } from "react";
import { FloatingMenuButton } from "@/components/organisms/floating-menu-button";
import { FloatingButton } from "@/components/atoms/floating-button";
import { ArrowLeft } from "lucide-react";
import MobileTimeline from "@/components/organisms/MobileTimeline";
import { timelineData } from "@/lib/timeline-data";
import { TimelineGridTile } from "@/components/molecules/TimelineGridTile";

export default function TimelinePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>();
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const scrollToStart = () => {
    if (locomotiveScrollRef.current) {
      locomotiveScrollRef.current.scrollTo(0, { duration: 1000, disableLerp: false });
    }
  };

  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging.current || !scrollbarRef.current || !locomotiveScrollRef.current) return;
    const rect = scrollbarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const maxScroll = locomotiveScrollRef.current.scroll.instance.limit.x;
    const targetScroll = (percentage / 100) * maxScroll;
    locomotiveScrollRef.current.scrollTo(targetScroll, { duration: 600, disableLerp: false });
  };

  const handleScrollbarDrag = (e: MouseEvent) => {
    if (!isDragging.current || !scrollbarRef.current || !locomotiveScrollRef.current) return;
    e.preventDefault();
    const rect = scrollbarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    const maxScroll = locomotiveScrollRef.current.scroll.instance.limit.x;
    const targetScroll = (percentage / 100) * maxScroll;
    locomotiveScrollRef.current.scrollTo(targetScroll, { duration: 100, disableLerp: false });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        handleScrollbarDrag(e);
      }
    };
    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
        const maxScroll = obj.limit.x;
        const progress = maxScroll > 0 ? (obj.scroll.x / maxScroll) * 100 : 0;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
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
      <FloatingButton
        onClick={scrollToStart}
        isDarkBackground={isDarkBackground}
        isVisible={isScrolled}
        className="fixed bottom-6 right-6 z-40"
        aria-label="Back to start"
      >
        <ArrowLeft size={24} />
      </FloatingButton>
      
      {/* Custom Scrollbar */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-6xl select-none">
        <div
          ref={scrollbarRef}
          onClick={handleScrollbarClick}
          onMouseDown={(e) => { 
            e.preventDefault();
            isDragging.current = true;
            document.body.style.userSelect = 'none';
          }}
          className="relative h-4 bg-preset-bluish-gray/40 backdrop-blur-sm rounded-full cursor-pointer shadow-lg"
        >
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full pointer-events-none"
            style={{ width: `${scrollProgress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ left: `calc(${scrollProgress}% - 20px)` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              isDragging.current = true;
              document.body.style.userSelect = 'none';
            }}
          >
            <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend overflow-hidden">
        <div data-scroll-container ref={scrollRef}>
          <div className="flex ml-[12vw] pr-[12vw]">
            <div className="flex-shrink-0 mx-[10vw] ml-[2vw]">
              <span className="block text-[12vw] pl-12 leading-[1.5] tracking-wider font-instrument-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-1" data-scroll-direction="vertical">Our</span>
              <span className="block text-[12vw] pl-12 leading-[1.5] tracking-wider font-instrument-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="2" data-scroll-direction="vertical"> Journey</span>
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
              <span className="block text-[12vw] pl-12 leading-[1.1] tracking-wider font-instrument-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">Let's continue</span>
              <span className="block text-[12vw] pl-12 leading-[1.2] tracking-wider font-instrument-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">making history</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
