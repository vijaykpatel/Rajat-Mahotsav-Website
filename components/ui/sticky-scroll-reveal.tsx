"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    subtitle?: string;
    quote?: string;
    additionalContent?: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldMount = entry.isIntersecting && entry.intersectionRatio > 0.5;
        setIsMounted(shouldMount);
        setIsScrollEnabled(shouldMount);
      },
      { threshold: [0.5, 0.8] }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMounted) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (isAtTop && e.deltaY < 0) {
        setIsMounted(false);
        setIsScrollEnabled(false);
        return;
      }
      
      if (isAtBottom && e.deltaY > 0) {
        setIsMounted(false);
        setIsScrollEnabled(false);
        return;
      }
      
      e.preventDefault();
      container.scrollTop += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isMounted]);
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div ref={ref}>
      <div
        ref={containerRef}
        className="relative flex h-[50rem] justify-center overflow-y-auto py-10 px-10 scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          pointerEvents: isScrollEnabled ? 'auto' : 'none',
          overscrollBehavior: 'contain'
        }}
      >
      <div className="relative flex items-start px-4 max-w-4xl w-full">
        <div className="w-full relative">
          
          {content.map((item, index) => (
            <div key={(item.title || item.subtitle) + index} className="my-20">
              {item.title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6 text-center leading-tight">
                  {item.title}
                </h2>
              )}
              
              {item.subtitle && (
                <h3 className="standard-page-subtitle">
                  {item.subtitle}
                </h3>
              )}
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                {item.description}
              </p>

              {item.quote && (
                <blockquote className="border-l-4 border-orange-500 pl-6 py-4 my-8 italic text-xl text-gray-800 bg-orange-50/50 rounded-r-lg">
                  "{item.quote}"
                </blockquote>
              )}

              {item.additionalContent && (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {item.additionalContent}
                </p>
              )}
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      </div>
    </div>
  );
};
