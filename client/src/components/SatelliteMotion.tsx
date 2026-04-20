import { motion } from "framer-motion";

interface SatelliteMotionProps {
  size?: number;
  className?: string;
}

/**
 * A real satellite drifting and rotating in space, surrounded by
 * subtle orbit lines and stars. Teal accent.
 */
export function SatelliteMotion({ size, className = "" }: SatelliteMotionProps) {
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
        aria-label="Satellite in orbit"
      >
        <defs>
          <radialGradient id="sat-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#14b8a6" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sat-panel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#042f2e" />
          </linearGradient>
          <linearGradient id="sat-orbit" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient glow */}
        <circle cx="210" cy="210" r="140" fill="url(#sat-glow)" />

        {/* Outer orbit ring */}
        <motion.ellipse
          cx="210"
          cy="210"
          rx="180"
          ry="60"
          fill="none"
          stroke="url(#sat-orbit)"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          initial={{ rotate: -15 }}
          animate={{ rotate: [-15, 345] }}
          style={{ originX: "210px", originY: "210px" }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* Second orbit ring, steeper */}
        <ellipse
          cx="210"
          cy="210"
          rx="195"
          ry="45"
          fill="none"
          stroke="#2dd4bf"
          strokeOpacity="0.1"
          strokeWidth="0.6"
          transform="rotate(25 210 210)"
        />

        {/* Faint background stars */}
        {[
          [40, 60, 0.5],
          [70, 140, 0.3],
          [100, 50, 0.4],
          [340, 70, 0.4],
          [370, 150, 0.5],
          [380, 260, 0.3],
          [60, 300, 0.4],
          [330, 340, 0.3],
          [150, 35, 0.3],
          [260, 380, 0.4],
        ].map(([x, y, o], i) => (
          <circle key={`s-${i}`} cx={x} cy={y} r="0.8" fill="#ffffff" opacity={o as number} />
        ))}

        {/* Satellite — centered, drifts gently, slow yaw */}
        <motion.g
          animate={{
            x: [-6, 6, -6],
            y: [-3, 3, -3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.g
            style={{ transformOrigin: "210px 210px" }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <g transform="translate(210, 210)">
              {/* Left solar panel */}
              <rect x="-96" y="-14" width="70" height="28" fill="url(#sat-panel)" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="0.8" />
              {[-78, -60, -42].map((x, i) => (
                <line key={`lp-${i}`} x1={x} y1="-14" x2={x} y2="14" stroke="#14b8a6" strokeOpacity="0.4" strokeWidth="0.4" />
              ))}
              <line x1="-96" y1="0" x2="-26" y2="0" stroke="#14b8a6" strokeOpacity="0.3" strokeWidth="0.3" />

              {/* Connector left */}
              <rect x="-26" y="-2" width="6" height="4" fill="#e5e7eb" />

              {/* Body */}
              <rect x="-20" y="-18" width="40" height="36" fill="#e5e7eb" stroke="#2dd4bf" strokeOpacity="0.8" strokeWidth="1" />
              {/* Body detail */}
              <rect x="-16" y="-14" width="32" height="8" fill="#14b8a6" fillOpacity="0.85" />
              <rect x="-16" y="-4" width="18" height="3" fill="#0f172a" />
              <rect x="-16" y="1" width="14" height="2" fill="#0f172a" />
              <circle cx="12" cy="8" r="2" fill="#14b8a6" />
              <circle cx="6" cy="8" r="1.2" fill="#0f172a" stroke="#14b8a6" strokeWidth="0.4" />

              {/* Connector right */}
              <rect x="20" y="-2" width="6" height="4" fill="#e5e7eb" />

              {/* Right solar panel */}
              <rect x="26" y="-14" width="70" height="28" fill="url(#sat-panel)" stroke="#2dd4bf" strokeOpacity="0.6" strokeWidth="0.8" />
              {[44, 62, 80].map((x, i) => (
                <line key={`rp-${i}`} x1={x} y1="-14" x2={x} y2="14" stroke="#14b8a6" strokeOpacity="0.4" strokeWidth="0.4" />
              ))}
              <line x1="26" y1="0" x2="96" y2="0" stroke="#14b8a6" strokeOpacity="0.3" strokeWidth="0.3" />

              {/* Antenna */}
              <line x1="0" y1="-18" x2="0" y2="-28" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="1" />
              <circle cx="0" cy="-28" r="1.8" fill="#2dd4bf">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Thruster glow (subtle) */}
              <motion.circle
                cx="0"
                cy="22"
                r="3"
                fill="#2dd4bf"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>
          </motion.g>
        </motion.g>

        {/* Link beacon — a small dot slowly traveling along the outer orbit */}
        <motion.g
          style={{ originX: "210px", originY: "210px" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <g transform="rotate(-15 210 210)">
            <circle cx="390" cy="210" r="2" fill="#2dd4bf">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
