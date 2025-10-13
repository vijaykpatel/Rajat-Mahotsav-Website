"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const HorizontalTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(data.length - 1) * 100}%`]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${data.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        <motion.div
          style={{ x }}
          className="flex flex-1 items-center pb-20"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="min-w-full h-full flex items-center justify-center px-4 md:px-8"
            >
              <div className="max-w-5xl w-full">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Year/Title Section */}
                  <div className="flex-shrink-0 md:w-48">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mb-4">
                        <div className="w-6 h-6 rounded-full bg-white" />
                      </div>
                      <h3 className="text-4xl md:text-6xl font-bold text-orange-600">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
                    {item.content}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                  {data.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-8 bg-orange-500" : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Connecting Line */}
        <div className="absolute bottom-32 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 mx-auto max-w-7xl" />
      </div>
    </div>
  );
};
