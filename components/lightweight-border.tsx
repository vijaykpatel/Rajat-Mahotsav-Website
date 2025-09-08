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

  const borderStyle = {
    ...inheritRadius,
    border: `${thickness}px solid ${color}`,
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  return (
    <div className={`relative ${className ?? ''}`} style={style}>
      <div style={borderStyle}>
        {/* Static electric-like pattern using CSS gradients */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(45deg, transparent 30%, ${color}20 50%, transparent 70%),
              linear-gradient(-45deg, transparent 40%, ${color}15 60%, transparent 80%)
            `,
            opacity: 0.6
          }}
        />
        
        {/* Multiple glow layers */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            ...inheritRadius,
            boxShadow: `
              0 0 ${deviceType === 'mobile' ? '8px' : '12px'} ${color}60,
              inset 0 0 ${deviceType === 'mobile' ? '4px' : '8px'} ${color}30,
              0 0 ${deviceType === 'mobile' ? '16px' : '24px'} ${color}40,
              0 0 ${deviceType === 'mobile' ? '32px' : '48px'} ${color}20
            `
          }}
        />
        
        {/* Subtle shimmer effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            ...inheritRadius,
            background: `linear-gradient(90deg, transparent 0%, ${color}10 50%, transparent 100%)`,
            animation: 'shimmer 3s ease-in-out infinite alternate'
          }}
        />
        
        <div className="relative">
          {children}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { opacity: 0.3; transform: translateX(-100%); }
          100% { opacity: 0.7; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LightweightBorder;