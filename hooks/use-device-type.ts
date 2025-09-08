"use client"

import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const ua = navigator.userAgent;
    if (/iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile';
    if (/iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const checkDevice = () => {
      const ua = navigator.userAgent;
      
      // Mobile devices (phones)
      if (/iPhone|iPod|Android.*Mobile|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        setDeviceType('mobile');
      }
      // Tablets
      else if (/iPad|Android(?!.*Mobile)|Tablet|PlayBook|Silk/i.test(ua)) {
        setDeviceType('tablet');
      }
      // Desktop/laptop
      else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
  }, []);

  return deviceType;
}