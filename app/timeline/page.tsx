"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import { useNavbarHeight } from "@/hooks/use-navbar-height";
import ShaderBackground from "@/components/shader-background";

export default function TimelinePage() {
  const { dynamicPadding } = useNavbarHeight()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])
  const data = [
    {
      title: "2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Celebrating our Silver Jubilee - 25 years of spiritual service and community building
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">Rajat Mahotsav Image</span>
            </div>
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">Community Celebration</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2001",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Foundation of Shree Swaminarayan Temple Secaucus - A new spiritual home established
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            The temple was established with the blessings of His Divine Holiness, marking the beginning of our spiritual journey in New Jersey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">Temple Foundation</span>
            </div>
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">First Devotees</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Milestones",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Key achievements and memorable moments in our temple&apos;s journey
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Annual festivals and celebrations
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Community service initiatives
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Youth programs and activities
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Cultural preservation efforts
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Spiritual education programs
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">Festival Celebrations</span>
            </div>
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] flex items-center justify-center">
              <span className="text-neutral-500 text-sm">Community Service</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  
  return (
    <>
      <ShaderBackground>
        <div className="min-h-screen w-full" style={{ paddingTop: dynamicPadding }}>
          <div className={`relative transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <Timeline data={data} />
          </div>
        </div>
      </ShaderBackground>
    </>
  );
}
