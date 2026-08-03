import React from 'react';

interface AloDiariaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

export const AloDiariaLogo: React.FC<AloDiariaLogoProps> = ({ 
  size = 'md', 
  variant = 'light',
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: { title: 'text-base', sub: 'text-[9px]' },
    md: { title: 'text-2xl', sub: 'text-xs' },
    lg: { title: 'text-4xl', sub: 'text-sm' }
  };

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* House Icon with Phone Handset Inside */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {/* SVG House Outline with Phone Inside */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4C1D95] fill-none stroke-current" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {/* House Roof & Body */}
          <path d="M 15 45 L 50 15 L 85 45 L 85 80 C 85 86 80 90 74 90 L 26 90 C 20 90 15 86 15 80 Z" />
          {/* Chimney */}
          <path d="M 72 28 L 72 18 L 80 18 L 80 34" strokeWidth="6" />
          {/* Phone Handset inside house */}
          <path 
            d="M 38 42 C 38 42 42 40 45 44 C 47 47 45 50 48 53 C 51 56 54 54 57 56 C 61 59 59 63 59 63 C 55 68 46 64 40 58 C 34 52 32 44 38 42 Z" 
            className="fill-[#4C1D95] stroke-none" 
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${textSizes[size].title} flex items-center`}>
          <span className="text-[#4C1D95]">Alô</span>
          <span className="text-[#EC4899] ml-1">Diária</span>
        </div>
        <span className={`font-serif italic font-semibold text-[#EC4899] ${textSizes[size].sub} tracking-wide -mt-0.5`}>
          chama a Dona Maria <span className="not-italic text-[#E11D48]">♡</span>
        </span>
      </div>
    </div>
  );
};
