import React from 'react';

export const InteractiveBackground: React.FC = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#021026" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#bgGrad)" />

      {/* geometric shapes with very low opacity */}
      <g opacity="0.055">
        <circle cx="200" cy="150" r="140" fill="#7c3aed" />
        <rect x="320" y="50" width="200" height="200" rx="24" fill="#06b6d4" transform="rotate(12 420 150)" />
        <polygon points="800,600 900,520 980,600 900,680" fill="#f97316" />
        <circle cx="1000" cy="200" r="120" fill="#14b8a6" />
      </g>

      {/* subtle animated shapes (CSS animation via Tailwind utilities) */}
      <g className="animate-float" opacity="0.035">
        <circle cx="600" cy="100" r="200" fill="#a78bfa" />
        <rect x="900" y="400" width="220" height="220" rx="32" fill="#60a5fa" />
      </g>
    </svg>
  );
};

export default InteractiveBackground;
