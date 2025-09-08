"use client"

import { useState, useEffect } from 'react';
import ElectricBorder from './electric-border';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center px-6 sm:px-8 md:px-12">
      <ElectricBorder
        color="#E8E8E8"
        speed={0.8}
        chaos={0.7}
        thickness={3}
        style={{ 
          borderRadius: 24, 
          width: 'fit-content',
          height: 'auto'
        }}
        className="flex items-center justify-center py-3 px-4 sm:py-4 sm:px-6"
      >
        <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 font-noto-music whitespace-nowrap -mt-2">
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight">{timeLeft.days.toString().padStart(3, '0')}d</span>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">-</span>
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}h</span>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">-</span>
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
          <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">-</span>
          <span className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
        </div>
      </ElectricBorder>
    </div>
  );
}