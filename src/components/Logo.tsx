import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'xl' }) => {
  const containerSizes = {
    sm: 'max-w-[160px]',
    md: 'max-w-[220px]',
    lg: 'max-w-[300px]',
    xl: 'max-w-[380px]',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none w-full ${containerSizes} mx-auto group`}>
      {/* Gold Luxury SVG Artwork based on QRTelas Brand Image */}
      <div className="relative w-full aspect-[16/9] flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
        <svg
          viewBox="0 0 520 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-contain overflow-visible"
        >
          <defs>
            {/* Rich Gold Gradient Fills */}
            <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8D6" />
              <stop offset="25%" stopColor="#FACC15" />
              <stop offset="60%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>

            <linearGradient id="goldGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#854D0E" />
              <stop offset="40%" stopColor="#EAB308" />
              <stop offset="80%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
            </radialGradient>

            <filter id="shadowGold" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#713F12" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Soft background golden aura */}
          <ellipse cx="260" cy="140" rx="220" ry="110" fill="url(#goldGlow)" />

          {/* === 1. GOLD FABRIC ROLL (LEFT) === */}
          <g filter="url(#shadowGold)">
            {/* Cylinder face */}
            <ellipse cx="65" cy="120" rx="22" ry="38" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="2.5" />
            <ellipse cx="65" cy="120" rx="14" ry="24" fill="#451A03" stroke="url(#goldGrad2)" strokeWidth="2" />
            <ellipse cx="65" cy="120" rx="6" ry="10" fill="#1C0A00" />

            {/* Cylinder Body */}
            <path
              d="M 65 82 L 180 65 C 190 65, 195 75, 190 90 L 175 148 C 170 158, 160 160, 145 158 L 65 158 Z"
              fill="url(#goldGrad1)"
              stroke="#713F12"
              strokeWidth="2.5"
            />

            {/* Folds and texture lines */}
            <path d="M 85 88 Q 130 110, 175 90" stroke="#713F12" strokeWidth="2" fill="none" opacity="0.8" />
            <path d="M 80 105 Q 125 125, 170 108" stroke="#FEF08A" strokeWidth="1.5" fill="none" opacity="0.9" />
            <path d="M 75 125 Q 120 145, 165 125" stroke="#713F12" strokeWidth="2" fill="none" opacity="0.8" />

            {/* Unrolled drape trailing to right */}
            <path
              d="M 65 158 C 90 170, 130 185, 170 170 C 210 155, 260 180, 310 185 L 290 200 C 240 195, 190 170, 150 188 C 110 205, 75 178, 65 158 Z"
              fill="url(#goldGrad2)"
              stroke="#854D0E"
              strokeWidth="2"
            />
          </g>

          {/* === 2. SPOOL OF THREAD & NEEDLE (CENTER-LEFT) === */}
          <g filter="url(#shadowGold)">
            {/* Spool Caps */}
            <ellipse cx="140" cy="120" rx="26" ry="10" fill="url(#goldGrad1)" stroke="#713F12" strokeWidth="2" />
            <path d="M 114 120 L 114 165 C 114 172, 166 172, 166 165 L 166 120 Z" fill="url(#goldGrad2)" />
            <ellipse cx="140" cy="165" rx="26" ry="10" fill="url(#goldGrad1)" stroke="#713F12" strokeWidth="2" />

            {/* Thread Wrapping */}
            <rect x="118" y="126" width="44" height="34" rx="4" fill="url(#goldGrad1)" stroke="#854D0E" strokeWidth="1.5" />
            <path d="M 118 132 H 162 M 118 138 H 162 M 118 144 H 162 M 118 150 H 162 M 118 156 H 162" stroke="#FEF08A" strokeWidth="1.5" />

            {/* Tailor Needle */}
            <path
              d="M 195 90 L 128 185"
              stroke="url(#goldGrad2)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <ellipse cx="190" cy="97" rx="2" ry="4" transform="rotate(-35 190 97)" fill="#451A03" stroke="#FEF08A" strokeWidth="1" />

            {/* Golden Thread Strand */}
            <path
              d="M 190 97 C 220 80, 210 130, 180 145 C 150 160, 110 180, 90 205 C 70 220, 150 230, 220 225"
              stroke="#FEF08A"
              strokeWidth="2.5"
              fill="none"
            />
          </g>

          {/* === 3. GOLDEN SCISSORS (CENTER) === */}
          <g transform="translate(160, 75) rotate(-15)" filter="url(#shadowGold)">
            <circle cx="20" cy="20" r="14" fill="none" stroke="url(#goldGrad1)" strokeWidth="6" />
            <circle cx="20" cy="50" r="14" fill="none" stroke="url(#goldGrad1)" strokeWidth="6" />
            <path d="M 30 22 L 95 32 C 100 33, 98 28, 90 25 L 30 18 Z" fill="url(#goldGrad2)" stroke="#713F12" strokeWidth="1" />
            <path d="M 30 48 L 95 33 C 100 32, 98 37, 90 40 L 30 52 Z" fill="url(#goldGrad1)" stroke="#713F12" strokeWidth="1" />
            <circle cx="42" cy="35" r="3.5" fill="#451A03" stroke="#FEF08A" strokeWidth="1.5" />
          </g>

          {/* === 4. FLOATING GOLDEN QR CODE PATTERN (TOP RIGHT) === */}
          <g transform="translate(230, 75)" filter="url(#shadowGold)">
            <rect x="0" y="0" width="22" height="22" rx="4" stroke="url(#goldGrad1)" strokeWidth="3.5" fill="none" />
            <rect x="5" y="5" width="12" height="12" rx="2" fill="url(#goldGrad2)" />

            <rect x="60" y="0" width="22" height="22" rx="4" stroke="url(#goldGrad1)" strokeWidth="3.5" fill="none" />
            <rect x="65" y="5" width="12" height="12" rx="2" fill="url(#goldGrad2)" />

            <rect x="0" y="38" width="22" height="22" rx="4" stroke="url(#goldGrad1)" strokeWidth="3.5" fill="none" />
            <rect x="5" y="43" width="12" height="12" rx="2" fill="url(#goldGrad2)" />

            <rect x="30" y="2" width="6" height="6" rx="1.5" fill="url(#goldGrad2)" />
            <rect x="42" y="2" width="10" height="6" rx="1.5" fill="url(#goldGrad1)" />
            <rect x="30" y="12" width="18" height="6" rx="1.5" fill="url(#goldGrad2)" />
            <rect x="30" y="24" width="8" height="8" rx="1.5" fill="url(#goldGrad1)" />
            <rect x="44" y="24" width="16" height="8" rx="1.5" fill="url(#goldGrad2)" />
            <rect x="66" y="28" width="12" height="14" rx="2" fill="url(#goldGrad1)" />
            <rect x="30" y="38" width="12" height="6" rx="1.5" fill="url(#goldGrad2)" />
            <rect x="48" y="38" width="8" height="18" rx="1.5" fill="url(#goldGrad1)" />
            <rect x="60" y="46" width="18" height="10" rx="1.5" fill="url(#goldGrad2)" />
          </g>

          {/* === 5. GRAND GOLD BRAND TEXT "QRTELAS" & UNDERLINE === */}
          <g transform="translate(195, 200)">
            <text
              x="60"
              y="32"
              fontFamily="'Playfair Display', 'Georgia', serif"
              fontSize="52"
              fontWeight="900"
              letterSpacing="2.5"
              fill="url(#goldGrad1)"
              stroke="#713F12"
              strokeWidth="1.2"
              filter="url(#shadowGold)"
            >
              QRTELAS
            </text>

            {/* Underline Flourish */}
            <path
              d="M -90 44 Q 50 48, 190 42 T 270 48"
              stroke="url(#goldGrad2)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
