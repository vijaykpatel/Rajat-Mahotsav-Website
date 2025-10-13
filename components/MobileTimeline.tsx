"use client"

import { useEffect, useState } from "react";
import { FloatingMenuButton } from "@/components/floating-menu-button";
import { timelineData } from "@/lib/timeline-data";
import { TimelineGridTile } from "@/components/TimelineGridTile";

export default function MobileTimeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('[data-timeline-item]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <FloatingMenuButton />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 page-bg-extend overflow-x-hidden">
        <div className="px-6 py-12 pb-32">
          <h1 className="text-6xl leading-[1.2] pl-4 font-serif italic font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-16">
            Our Journey
          </h1>
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={index}
                data-timeline-item
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.has(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <TimelineGridTile item={item} variant="mobile" />
              </div>
            ))}
          </div>
          <div className="mt-24 pl-4">
            <span className="block text-5xl leading-[1.2] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Let's continue</span>
            <span className="block text-5xl leading-[1.2] font-serif font-extrabold italic bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">making history</span>
          </div>
        </div>
      </div>
    </>
  );
}
