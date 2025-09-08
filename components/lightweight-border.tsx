"use client"

import { useDeviceType } from '@/hooks/use-device-type';

interface LightweightBorderProps {
  children: React.ReactNode;
  color?: string;
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}

const LightweightBorder = ({ 
  children, 
  color = '#E8E8E8', 
  thickness = 3, 
  className, 
  style 
}: LightweightBorderProps) => {
  const deviceType = useDeviceType();

  const inheritRadius = {
    borderRadius: style?.borderRadius ?? 'inherit'
  };

  // Simple static border for mobile/tablet
  const simpleBorderStyle = {
    ...inheritRadius,
    border: `${thickness}px solid ${color}`,
    boxShadow: deviceType === 'mobile' 
      ? `0 0 8px ${color}40` // Minimal glow on mobile
      : `0 0 12px ${color}60, inset 0 0 8px ${color}20` // Slightly more glow on tablet
  };

  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      <div 
        className="relative" 
        style={simpleBorderStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default LightweightBorder;