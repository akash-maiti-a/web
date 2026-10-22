import { useState } from 'react';

const STORAGE_KEY = 'bg-motion';
const BELT_ITEM_COLORS = ['#fa9549', '#b8bec7', '#d06a3a', '#ffc832', '#8fd0d8'];

function prefersStill() {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData;
  return Boolean(reduceMotion || saveData);
}

// Animated by default unless the visitor prefers reduced motion or data saving
export function useBackgroundMotion() {
  const [animated, setAnimated] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved === 'on';
    } catch (e) {
      // Storage unavailable
    }
    return !prefersStill();
  });

  const toggle = () => {
    setAnimated(prev => {
      try {
        localStorage.setItem(STORAGE_KEY, prev ? 'off' : 'on');
      } catch (e) {
        // Not persisted
      }
      return !prev;
    });
  };

  return [animated, toggle];
}

function BeltItems({ y, count, spacing, size }) {
  return Array.from({ length: count }).map((_, i) => (
    <rect
      key={i}
      x={i * spacing}
      y={y - size}
      width={size}
      height={size}
      rx="2"
      fill={BELT_ITEM_COLORS[i % BELT_ITEM_COLORS.length]}
    />
  ));
}

// Each chimney emits puffs
const PUFFS = 6;
const PUFF_DURATION = 6;

function Smoke({ x, y, offset = 0, scale = 1 }) {
  return (
    <g className="smoke">
      {Array.from({ length: PUFFS }).map((_, i) => (
        <circle
          key={i}
          className="puff"
          cx={x}
          cy={y}
          r={12 * scale}
          style={{
            animationDelay: `${-(offset + (i * PUFF_DURATION) / PUFFS)}s`,
            animationDuration: `${PUFF_DURATION + (i % 3) * 0.7}s`,
            '--drift': `${50 + (i % 3) * 25}px`,
            '--rise': `${-(190 + (i % 2) * 50) * scale}px`,
          }}
        />
      ))}
    </g>
  );
}

function Factory({ dimmed, animated }) {
  const classes = [dimmed && 'dimmed', !animated && 'still'].filter(Boolean).join(' ');

  return (
    <div id="factory" className={classes} aria-hidden="true">
      <svg className="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#081a21" />
            <stop offset="0.45" stopColor="#163f47" />
            <stop offset="0.75" stopColor="#7a5a45" />
            <stop offset="0.9" stopColor="#d58648" />
          </linearGradient>
          <radialGradient id="smoke">
            <stop offset="0" stopColor="#c9d4d6" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#a9b7ba" stopOpacity="0.5" />
            <stop offset="1" stopColor="#a9b7ba" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="planet" cx="0.35" cy="0.35" r="0.75">
            <stop offset="0" stopColor="#9fd3cf" />
            <stop offset="1" stopColor="#2c5f66" />
          </radialGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#sky)" />

        {/* Stars */}
        <g fill="#cfe9e6" opacity="0.6">
          {[[120, 80], [300, 150], [520, 60], [760, 120], [980, 50], [1180, 170], [1420, 90], [220, 260], [660, 220], [1500, 240]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
          ))}
        </g>

        {/* Ringed planet */}
        <g opacity="0.85">
          <circle cx="1240" cy="200" r="90" fill="url(#planet)" />
          <ellipse cx="1240" cy="200" rx="170" ry="28" fill="none" stroke="#cfe9e6" strokeOpacity="0.45" strokeWidth="5" transform="rotate(-14 1240 200)" />
        </g>

        {/* Rock arches and alien flora */}
        <path
          fill="#16343a"
          d="M0 640 L0 560 C80 520 140 540 180 500 C220 460 260 470 300 520 C320 470 380 380 470 390 C560 400 600 480 610 560 L640 560 C660 500 720 470 780 500 C840 530 860 600 880 600 C940 540 1000 520 1060 540 C1120 420 1240 400 1300 470 C1340 520 1350 560 1380 560 C1440 520 1520 530 1600 560 L1600 640 Z"
        />
        <path fill="#2a4f50" opacity="0.7" d="M380 560 C390 470 520 460 540 560 Z M1180 560 C1190 490 1270 480 1290 560 Z" />
        <g fill="#1d4146">
          <rect x="88" y="470" width="8" height="90" />
          <ellipse cx="92" cy="470" rx="46" ry="18" />
          <rect x="1488" y="480" width="8" height="80" />
          <ellipse cx="1492" cy="480" rx="40" ry="16" />
          <rect x="720" y="510" width="6" height="60" />
          <ellipse cx="723" cy="510" rx="30" ry="12" />
        </g>

        {/* Mid layer: factory */}
        <g fill="#0f1a1f">
          {/* Space Elevator */}
          <path d="M1020 640 L1040 300 L1050 120 L1060 300 L1080 640 Z" />
          <rect x="1012" y="290" width="76" height="14" />
          <rect x="1000" y="560" width="100" height="80" />
          {/* Smelter block with chimneys */}
          <rect x="180" y="520" width="200" height="120" />
          <rect x="210" y="450" width="26" height="80" />
          <rect x="300" y="430" width="26" height="100" />
          {/* Constructor halls */}
          <path d="M420 640 L420 540 L500 500 L580 540 L580 640 Z" />
          <rect x="600" y="555" width="160" height="85" />
          <rect x="700" y="505" width="18" height="55" />
          <rect x="780" y="520" width="190" height="120" />
          <rect x="860" y="470" width="30" height="60" />
          {/* Storage silos */}
          <rect x="1140" y="540" width="60" height="100" rx="24" />
          <rect x="1210" y="560" width="60" height="80" rx="24" />
          {/* Power poles */}
          <rect x="1330" y="470" width="6" height="170" />
          <rect x="1310" y="480" width="46" height="5" />
          <rect x="1480" y="500" width="6" height="140" />
          <rect x="1460" y="510" width="46" height="5" />
        </g>
        <path d="M1333 482 Q1407 520 1483 512" stroke="#0f1a1f" strokeWidth="2" fill="none" />

        {/* Lit windows */}
        <g fill="#fa9549" className="windows">
          {[[200, 560], [240, 560], [280, 560], [320, 560], [620, 580], [660, 580], [700, 580], [800, 550], [840, 550], [920, 550], [1030, 590], [1060, 590], [460, 580], [520, 580]].map(([x, y], i) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="14" height="8" style={{ animationDelay: `${(i % 5) * 0.9}s` }} />
          ))}
        </g>
        <circle cx="1050" cy="122" r="5" fill="#ff5a3c" className="beacon" />

        <Smoke x={223} y={444} offset={0} scale={1} />
        <Smoke x={313} y={424} offset={2.3} scale={1.15} />
        <Smoke x={709} y={500} offset={1.1} scale={0.8} />
        <Smoke x={875} y={464} offset={3.4} scale={1.05} />

        {/* Ground */}
        <rect y="640" width="1600" height="260" fill="#0a1014" />

        {/* Near layer: conveyor belts */}
        <g>
          <rect x="0" y="700" width="1600" height="16" fill="#1c232a" />
          <rect x="0" y="700" width="1600" height="3" fill="#3a4550" />
          {Array.from({ length: 17 }).map((_, i) => (
            <rect key={i} x={i * 100 + 40} y="716" width="8" height="60" fill="#151b21" />
          ))}
          <g className="belt-items belt-fast">
            <BeltItems y={700} count={26} spacing={80} size={14} />
          </g>
        </g>
        <g>
          <rect x="0" y="800" width="1600" height="22" fill="#1a2027" />
          <rect x="0" y="800" width="1600" height="3" fill="#3a4550" />
          <g className="belt-items belt-slow">
            <BeltItems y={800} count={23} spacing={90} size={20} />
          </g>
        </g>
      </svg>
      <div className="scene-shade" />
    </div>
  );
}

export default Factory;
