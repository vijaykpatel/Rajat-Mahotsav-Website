"use client"

import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobileDevice = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTabletDevice = /iPad|Android.*(?!.*Mobile)/i.test(navigator.userAgent);
      
      if (width < 768 || isMobileDevice) {
        setDeviceType('mobile');
      } else if (width < 1024 || isTabletDevice) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    
    // Debounce resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const debouncedCheckDevice = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkDevice, 150);
    };

    window.addEventListener('resize', debouncedCheckDevice);
    return () => {
      window.removeEventListener('resize', debouncedCheckDevice);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceType;
}