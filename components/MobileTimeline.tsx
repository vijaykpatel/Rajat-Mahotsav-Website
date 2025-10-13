"use client"

import { useRef, useEffect, useState } from "react";
import { FloatingMenuButton } from "@/components/floating-menu-button";
import { ArrowLeft } from "lucide-react";
import { timelineData } from "@/lib/timeline-data";
import { TimelineGridTile } from "@/components/TimelineGridTile";

export default function MobileTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToStart = () => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setIsScrolled(scrollRef.current.scrollLeft > 100);
      }
    };
    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>

      <FloatingMenuButton />
      <button
        onClick={scrollToStart}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full backdrop-blur-sm transition-all duration-300 bg-white/20 hover:bg-white/30 text-black/90 hover:text-black ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to start"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend overflow-hidden">
        <div ref={scrollRef} className="h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full pr-8">
            <div className="flex-shrink-0 w-[45vw] flex justify-start items-start pt-12 pl-6">
              <span className="text-[14vw] leading-[1.2] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent whitespace-nowrap">our journey</span>
            </div>
            {timelineData.map((item, index) => (
              <div key={index} className={`flex-shrink-0 w-[70vw] flex items-center ${index % 2 === 0 ? 'pt-[15vh]' : 'pb-[15vh]'} ${index === 0 ? '' : 'ml-16'}`}>
                <TimelineGridTile item={item} variant="mobile" />
              </div>
            ))}
            <div className="flex-shrink-0 w-screen flex flex-col justify-center items-center">
              <span className="block text-[11vw] leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Let's continue</span>
              <span className="block text-[11vw] leading-[1.5] font-serif font-extrabold italic lowercase bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">making history</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
