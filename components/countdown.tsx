"use client"

import { useState, useEffect } from 'react';
import ElectricBorder from './electric-border';
import OptimizedElectricBorder from './optimized-electric-border';
import LightweightBorder from './lightweight-border';
import { useDeviceType } from '@/hooks/use-device-type';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const deviceType = useDeviceType();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
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

  const borderProps = {
    color: "#E8E8E8",
    thickness: 3,
    style: { 
      borderRadius: 24, 
      width: 'fit-content',
      height: 'auto',
      maxWidth: '100%'
    },
    className: "flex items-center justify-center py-4 px-3 sm:py-5 sm:px-4 md:py-6 md:px-6 lg:py-7 lg:px-8 xl:py-8 xl:px-10 max-sm:landscape:py-3 max-sm:landscape:px-3 sm:landscape:py-4 md:landscape:py-5 lg:landscape:py-7 xl:landscape:py-8"
  };

  const mobileCountdownContent = (
    <div className="flex items-center justify-center gap-1 sm:gap-2 font-noto-music -mt-2">
      <span className="text-3xl sm:text-4xl landscape:text-3xl font-black text-white tracking-tight">{timeLeft.days.toString().padStart(3, '0')}d</span>
      <span className="text-2xl sm:text-3xl landscape:text-2xl font-black text-white tracking-tight">-</span>
      <span className="text-3xl sm:text-4xl landscape:text-3xl font-black text-white tracking-tight">{timeLeft.hours.toString().padStart(2, '0')}h</span>
      <span className="text-2xl sm:text-3xl landscape:text-2xl font-black text-white tracking-tight">-</span>
      <span className="text-3xl sm:text-4xl landscape:text-3xl font-black text-white tracking-tight">{timeLeft.minutes.toString().padStart(2, '0')}m</span>
      <span className="text-2xl sm:text-3xl landscape:text-2xl font-black text-white tracking-tight">-</span>
      <span className="text-3xl sm:text-4xl landscape:text-3xl font-black text-white tracking-tight">{timeLeft.seconds.toString().padStart(2, '0')}s</span>
    </div>
  );

  const desktopCountdownContent = (
    <div className="flex items-center justify-center gap-[0.5vw] font-noto-music -mt-2">
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 6vw, 8rem)' }}>{timeLeft.days.toString().padStart(3, '0')}d</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.5rem, 5vw, 7rem)' }}>-</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 6vw, 8rem)' }}>{timeLeft.hours.toString().padStart(2, '0')}h</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.5rem, 5vw, 7rem)' }}>-</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 6vw, 8rem)' }}>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(1.5rem, 5vw, 7rem)' }}>-</span>
      <span className="font-black text-white tracking-tight" style={{ fontSize: 'clamp(2rem, 6vw, 8rem)' }}>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
    </div>
  );

  return (
    <div className="w-full h-full flex justify-center items-center px-4 sm:px-6 md:px-8">
      {deviceType === 'desktop' ? (
        // <ElectricBorder
        //   {...borderProps}
        //   speed={0.8}
        //   chaos={0.7}
        // >
          // {desktopCountdownContent}
        // </ElectricBorder>
        <OptimizedElectricBorder
          {...borderProps}
          speed={0.8}
          chaos={0.7}
        >
          {desktopCountdownContent}
        </OptimizedElectricBorder>
      ) : (
        <LightweightBorder {...borderProps}>
          {mobileCountdownContent}
        </LightweightBorder>
      )}
    </div>
  );
}