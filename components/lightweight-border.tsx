"use client"

function hexToRgba(hex: string, alpha = 1) {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
  const inheritRadius = {
    borderRadius: style?.borderRadius ?? 'inherit'
  };

  const strokeStyle = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color
  };

  const glow1Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: hexToRgba(color, 0.6),
    filter: 'blur(1px)'
  };

  const glow2Style = {
    ...inheritRadius,
    borderWidth: thickness,
    borderStyle: 'solid',
    borderColor: color,
    filter: 'blur(4px)'
  };

  const overlay1Style = {
    ...inheritRadius,
    opacity: 0.8,
    mixBlendMode: 'overlay' as const,
    transform: 'scale(1.05)',
    filter: 'blur(8px)',
    background: 'linear-gradient(-5deg, white, transparent 30%, transparent 70%, white)'
  };

  const overlay2Style = {
    ...inheritRadius,
    opacity: 0.4,
    mixBlendMode: 'overlay' as const,
    transform: 'scale(1.05)',
    filter: 'blur(8px)',
    background: 'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)'
  };

  const bgGlowStyle = {
    ...inheritRadius,
    transform: 'scale(1.1)',
    filter: 'blur(24px)',
    opacity: 0.25,
    zIndex: -1,
    background: `linear-gradient(-80deg, ${color}, transparent, ${color})`
  };

  return (
    <div className={`relative isolate ${className ?? ''}`} style={style}>
      <div className="absolute inset-0 pointer-events-none" style={inheritRadius}>
        <div className="absolute inset-0 box-border" style={strokeStyle} />
        <div className="absolute inset-0 box-border" style={glow1Style} />
        <div className="absolute inset-0 box-border" style={glow2Style} />
        <div className="absolute inset-0" style={overlay1Style} />
        <div className="absolute inset-0" style={overlay2Style} />
        <div className="absolute inset-0" style={bgGlowStyle} />
      </div>

      <div className="relative" style={inheritRadius}>
        {children}
      </div>
    </div>
  );
};

export default LightweightBorder;