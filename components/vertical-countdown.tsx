"use client"

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface VerticalCountdownProps {
  targetDate: string;
}

export default function VerticalCountdown({ targetDate }: VerticalCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  return (
    <div className="flex flex-col items-start justify-center text-left space-y-1">
      <div className="font-antonio font-bold text-white tracking-tight whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', lineHeight: '0.9' }}>
        {timeLeft.days.toString().padStart(3, '0')} days
      </div>
      <div className="font-antonio font-bold text-white tracking-tight whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', lineHeight: '0.9' }}>
        {timeLeft.hours.toString().padStart(2, '0')} hours
      </div>
      <div className="font-antonio font-bold text-white tracking-tight whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', lineHeight: '0.9' }}>
        {timeLeft.minutes.toString().padStart(2, '0')} minutes
      </div>
      <div className="font-antonio font-bold text-white tracking-tight whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', lineHeight: '0.9' }}>
        {timeLeft.seconds.toString().padStart(2, '0')} seconds
      </div>
    </div>
  );
}