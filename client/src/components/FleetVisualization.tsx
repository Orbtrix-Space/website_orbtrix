import { motion } from "framer-motion";

interface FleetVisualizationProps {
  size?: number;
  className?: string;
}

interface Sat {
  x: number;
  y: number;
  status: "nominal" | "warning" | "alert";
  delay: number;
}

const SATS: Sat[] = [
  { x: 80, y: 90, status: "nominal", delay: 0 },
  { x: 160, y: 60, status: "nominal", delay: 0.2 },
  { x: 240, y: 110, status: "warning", delay: 0.4 },
  { x: 320, y: 75, status: "nominal", delay: 0.6 },
  { x: 100, y: 180, status: "nominal", delay: 0.8 },
  { x: 200, y: 200, status: "alert", delay: 1.0 },
  { x: 290, y: 190, status: "nominal", delay: 1.2 },
  { x: 360, y: 160, status: "nominal", delay: 1.4 },
  { x: 60, y: 270, status: "nominal", delay: 1.6 },
  { x: 150, y: 300, status: "nominal", delay: 1.8 },
  { x: 250, y: 290, status: "nominal", delay: 2.0 },
  { x: 340, y: 270, status: "warning", delay: 2.2 },
];

const STATUS_COLOR: Record<Sat["status"], string> = {
  nominal: "#14b8a6",
  warning: "#f59e0b",
  alert: "#ef4444",
};

export function FleetVisualization({ size, className = "" }: FleetVisualizationProps) {
  const style = size
    ? { width: size, height: size, maxWidth: "100%" }
    : { width: "100%", aspectRatio: "1 / 1" };

  return (
    <div className={`relative ${className}`} style={style}>
      <svg viewBox="0 0 420 380" className="w-full h-full" role="img" aria-label="Fleet visualization with anomaly highlights">
        <defs>
          <radialGradient id="fleet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fleet-grid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="420" height="380" fill="url(#fleet-glow)" />

        {/* Grid lines */}
        {[60, 130, 200, 270, 340].map((y) => (
          <line key={`h-${y}`} x1="20" y1={y} x2="400" y2={y} stroke="url(#fleet-grid)" strokeWidth="0.6" />
        ))}
        {[80, 160, 240, 320].map((x) => (
          <line key={`v-${x}`} x1={x} y1="40" x2={x} y2="340" stroke="#14b8a6" strokeOpacity="0.06" strokeWidth="0.6" />
        ))}

        {/* Connection lines between adjacent satellites */}
        {SATS.slice(0, -1).map((s, i) => (
          <line
            key={`conn-${i}`}
            x1={s.x}
            y1={s.y}
            x2={SATS[i + 1].x}
            y2={SATS[i + 1].y}
            stroke="#14b8a6"
            strokeOpacity="0.08"
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
        ))}

        {/* Satellites */}
        {SATS.map((s, i) => {
          const color = STATUS_COLOR[s.status];
          const isAlert = s.status === "alert";
          const isWarning = s.status === "warning";
          return (
            <g key={i}>
              {/* Outer pulse ring for non-nominal */}
              {(isAlert || isWarning) && (
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r={6}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  initial={{ r: 6, opacity: 0.6 }}
                  animate={{ r: [6, 18], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeOut" }}
                />
              )}
              {/* Halo */}
              <circle cx={s.x} cy={s.y} r={isAlert ? 6 : 4} fill={color} fillOpacity={isAlert ? 0.18 : 0.12} />
              {/* Dot */}
              <motion.circle
                cx={s.x}
                cy={s.y}
                r={3}
                fill={color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: s.delay * 0.3 }}
              />
              {/* Label tag for alert */}
              {isAlert && (
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <rect x={s.x + 10} y={s.y - 16} width="58" height="14" rx="2" fill="#ef4444" fillOpacity="0.9" />
                  <text x={s.x + 39} y={s.y - 6} textAnchor="middle" fill="#ffffff" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                    ANOMALY
                  </text>
                </motion.g>
              )}
              {isWarning && (
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <rect x={s.x + 10} y={s.y - 16} width="44" height="14" rx="2" fill="#f59e0b" fillOpacity="0.85" />
                  <text x={s.x + 32} y={s.y - 6} textAnchor="middle" fill="#0a0a0a" fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                    DRIFT
                  </text>
                </motion.g>
              )}
            </g>
          );
        })}

        {/* Header label */}
        <text x="20" y="28" fill="#0f766e" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Fleet · 12 spacecraft
        </text>
        <text x="400" y="28" textAnchor="end" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">
          Live
        </text>

        {/* Footer legend */}
        <g transform="translate(20, 366)">
          <circle cx="4" cy="-2" r="3" fill="#14b8a6" />
          <text x="14" y="2" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">Nominal</text>
          <circle cx="84" cy="-2" r="3" fill="#f59e0b" />
          <text x="94" y="2" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">Warning</text>
          <circle cx="160" cy="-2" r="3" fill="#ef4444" />
          <text x="170" y="2" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">Alert</text>
        </g>
      </svg>
    </div>
  );
}
