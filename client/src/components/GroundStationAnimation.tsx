import { motion } from "framer-motion";

interface GroundStationAnimationProps {
  size?: number;
  className?: string;
}

/**
 * Teal-themed ground-station visual.
 * Parabolic dish tracking a satellite overhead with an animated uplink/downlink beam.
 * Pure SVG. Responsive via viewBox + aspect-square wrapper.
 */
export function GroundStationAnimation({
  size,
  className = "",
}: GroundStationAnimationProps) {
  const style = size
    ? { width: size, height: size, maxWidth: "100%" }
    : { width: "100%", aspectRatio: "1 / 1" };
  return (
    <div
      className={`relative ${className}`}
      style={style}
    >
      <svg
        viewBox="0 0 420 420"
        className="w-full h-full"
        role="img"
        aria-label="Ground station tracking a satellite"
      >
        <defs>
          <radialGradient id="gs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#14b8a6" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gs-beam" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gs-horizon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient sky glow */}
        <circle cx="210" cy="200" r="180" fill="url(#gs-glow)" opacity="0.6" />

        {/* Horizon line */}
        <line x1="20" y1="330" x2="400" y2="330" stroke="url(#gs-horizon)" strokeWidth="1" />

        {/* Satellite up top, drifting slightly */}
        <motion.g
          animate={{ x: [-10, 10, -10], y: [0, -4, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="translate(270, 80)">
            {/* Solar panels */}
            <rect x="-30" y="-4" width="18" height="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="0.6" />
            <line x1="-26" y1="-4" x2="-26" y2="4" stroke="#14b8a6" strokeWidth="0.3" />
            <line x1="-22" y1="-4" x2="-22" y2="4" stroke="#14b8a6" strokeWidth="0.3" />
            <line x1="-18" y1="-4" x2="-18" y2="4" stroke="#14b8a6" strokeWidth="0.3" />

            <rect x="12" y="-4" width="18" height="8" fill="#0f766e" stroke="#2dd4bf" strokeWidth="0.6" />
            <line x1="16" y1="-4" x2="16" y2="4" stroke="#14b8a6" strokeWidth="0.3" />
            <line x1="20" y1="-4" x2="20" y2="4" stroke="#14b8a6" strokeWidth="0.3" />
            <line x1="24" y1="-4" x2="24" y2="4" stroke="#14b8a6" strokeWidth="0.3" />

            {/* Body */}
            <rect x="-10" y="-6" width="20" height="12" fill="#e5e7eb" stroke="#2dd4bf" strokeWidth="0.6" />
            <rect x="-8" y="-4" width="16" height="3" fill="#14b8a6" />
            <circle cx="0" cy="2" r="1.5" fill="#14b8a6" />

            {/* Antenna */}
            <line x1="0" y1="-6" x2="0" y2="-10" stroke="#2dd4bf" strokeWidth="0.8" />
            <circle cx="0" cy="-10" r="1.2" fill="#2dd4bf" />
          </g>
        </motion.g>

        {/* Uplink beam — scanning from dish to satellite */}
        <motion.g
          style={{ transformOrigin: "170px 300px" }}
          animate={{ rotate: [-2, 3, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Beam cone (subtle) */}
          <path
            d="M 160 295 L 262 82 L 278 82 L 178 295 Z"
            fill="url(#gs-beam)"
            opacity="0.18"
          />
          {/* Beam centerline */}
          <line x1="170" y1="295" x2="270" y2="80" stroke="#2dd4bf" strokeOpacity="0.5" strokeWidth="0.8" strokeDasharray="3 4" />
        </motion.g>

        {/* Animated data packets travelling up the beam */}
        {[0, 0.33, 0.66].map((delay, i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#2dd4bf"
            initial={{ cx: 170, cy: 295, opacity: 0 }}
            animate={{
              cx: [170, 270],
              cy: [295, 80],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: delay * 3,
              ease: "linear",
            }}
          />
        ))}

        {/* Ground station dish (parabolic) */}
        <g>
          {/* Base pedestal */}
          <rect x="160" y="300" width="20" height="30" fill="#0f172a" stroke="#2dd4bf" strokeOpacity="0.5" strokeWidth="0.8" />
          <rect x="152" y="325" width="36" height="6" fill="#0f172a" stroke="#2dd4bf" strokeOpacity="0.5" strokeWidth="0.8" />

          {/* Dish — parabolic curve */}
          <g>
            <path
              d="M 130 295 Q 170 240 210 295"
              fill="#0f172a"
              stroke="#2dd4bf"
              strokeOpacity="0.7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Dish surface mesh lines */}
            <path
              d="M 142 287 Q 170 258 198 287"
              fill="none"
              stroke="#2dd4bf"
              strokeOpacity="0.25"
              strokeWidth="0.5"
            />
            <path
              d="M 154 280 Q 170 268 186 280"
              fill="none"
              stroke="#2dd4bf"
              strokeOpacity="0.2"
              strokeWidth="0.5"
            />
            {/* Vertical struts */}
            <line x1="170" y1="247" x2="170" y2="300" stroke="#2dd4bf" strokeOpacity="0.35" strokeWidth="0.6" />
            {/* Sub-reflector */}
            <line x1="170" y1="247" x2="170" y2="240" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="0.8" />
            <circle cx="170" cy="240" r="2" fill="#2dd4bf" fillOpacity="0.8" />
          </g>
        </g>

        {/* Pulsing signal rings emanating from dish feed */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`ring-${i}`}
            cx="170"
            cy="247"
            r="8"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="0.8"
            initial={{ r: 6, opacity: 0 }}
            animate={{ r: [6, 26], opacity: [0.6, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Faint background stars */}
        {[
          [60, 60, 0.4],
          [110, 40, 0.3],
          [330, 50, 0.5],
          [360, 130, 0.3],
          [80, 180, 0.4],
          [340, 200, 0.3],
          [380, 90, 0.5],
          [40, 130, 0.3],
        ].map(([x, y, o], i) => (
          <circle key={`s-${i}`} cx={x} cy={y} r="0.8" fill="#ffffff" opacity={o as number} />
        ))}

        {/* Status LEDs at the base */}
        <motion.circle
          cx="157"
          cy="315"
          r="1.2"
          fill="#2dd4bf"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="183"
          cy="315"
          r="1.2"
          fill="#2dd4bf"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
