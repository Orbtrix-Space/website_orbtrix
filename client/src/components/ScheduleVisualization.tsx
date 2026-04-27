import { motion } from "framer-motion";

interface ScheduleVisualizationProps {
  size?: number;
  className?: string;
}

interface Task {
  sat: string;
  start: number;
  end: number;
  type: "image" | "downlink" | "maneuver" | "calibration";
  delay: number;
}

const TASKS: Task[] = [
  { sat: "SAT-01", start: 30, end: 90, type: "image", delay: 0.1 },
  { sat: "SAT-01", start: 110, end: 150, type: "downlink", delay: 0.3 },
  { sat: "SAT-01", start: 170, end: 210, type: "image", delay: 0.5 },
  { sat: "SAT-01", start: 230, end: 280, type: "downlink", delay: 0.7 },
  { sat: "SAT-02", start: 50, end: 100, type: "image", delay: 0.2 },
  { sat: "SAT-02", start: 130, end: 180, type: "calibration", delay: 0.4 },
  { sat: "SAT-02", start: 200, end: 260, type: "image", delay: 0.6 },
  { sat: "SAT-03", start: 40, end: 80, type: "image", delay: 0.3 },
  { sat: "SAT-03", start: 100, end: 130, type: "maneuver", delay: 0.5 },
  { sat: "SAT-03", start: 150, end: 200, type: "image", delay: 0.7 },
  { sat: "SAT-03", start: 220, end: 270, type: "downlink", delay: 0.9 },
  { sat: "SAT-04", start: 60, end: 120, type: "image", delay: 0.4 },
  { sat: "SAT-04", start: 140, end: 200, type: "image", delay: 0.6 },
  { sat: "SAT-04", start: 220, end: 280, type: "downlink", delay: 0.8 },
];

const TYPE_COLOR: Record<Task["type"], string> = {
  image: "#14b8a6",
  downlink: "#0f766e",
  maneuver: "#f59e0b",
  calibration: "#6366f1",
};

const ROW_Y: Record<string, number> = {
  "SAT-01": 70,
  "SAT-02": 110,
  "SAT-03": 150,
  "SAT-04": 190,
};

export function ScheduleVisualization({ size, className = "" }: ScheduleVisualizationProps) {
  const style = size
    ? { width: size, height: size, maxWidth: "100%" }
    : { width: "100%", aspectRatio: "1 / 1" };

  return (
    <div className={`relative ${className}`} style={style}>
      <svg viewBox="0 0 420 380" className="w-full h-full" role="img" aria-label="Schedule view across the fleet">
        <defs>
          <linearGradient id="sched-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
            <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Header */}
        <text x="20" y="28" fill="#0f766e" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Schedule · 24 hr horizon
        </text>
        <text x="400" y="28" textAnchor="end" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">
          Conflict-free
        </text>

        {/* Time axis */}
        <line x1="80" y1="46" x2="400" y2="46" stroke="url(#sched-line)" strokeWidth="0.8" />
        {[80, 160, 240, 320, 400].map((x, i) => (
          <g key={`tick-${x}`}>
            <line x1={x} y1="44" x2={x} y2="220" stroke="#14b8a6" strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="2 3" />
            <text x={x} y="40" textAnchor="middle" fill="#525252" fontSize="8" fontFamily="ui-monospace, monospace">
              {String(i * 6).padStart(2, "0")}:00
            </text>
          </g>
        ))}

        {/* Row labels and task bars */}
        {Object.entries(ROW_Y).map(([sat, y]) => (
          <g key={sat}>
            {/* Label */}
            <text x="20" y={y + 4} fill="#0a0a0a" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="500">
              {sat}
            </text>
            {/* Row baseline */}
            <line x1="80" y1={y} x2="400" y2={y} stroke="#14b8a6" strokeOpacity="0.08" strokeWidth="0.5" />
          </g>
        ))}

        {/* Task bars */}
        {TASKS.map((t, i) => {
          const y = ROW_Y[t.sat];
          const color = TYPE_COLOR[t.type];
          const x = 80 + t.start;
          const width = t.end - t.start;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: t.delay, ease: "easeOut" }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <rect x={x} y={y - 6} width={width} height={12} fill={color} fillOpacity="0.18" stroke={color} strokeOpacity="0.55" strokeWidth="1" rx="1.5" />
              {width > 35 && (
                <text x={x + 4} y={y + 3} fill={color} fontSize="8" fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                  {t.type.toUpperCase()}
                </text>
              )}
            </motion.g>
          );
        })}

        {/* Live cursor */}
        <motion.line
          x1={210}
          y1={50}
          x2={210}
          y2={220}
          stroke="#14b8a6"
          strokeWidth="1.2"
          animate={{ x1: [210, 220, 210], x2: [210, 220, 210] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={210}
          cy={50}
          r="3"
          fill="#14b8a6"
          animate={{ cx: [210, 220, 210] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Status bar */}
        <g transform="translate(20, 254)">
          <text x="0" y="0" fill="#0f766e" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="2" style={{ textTransform: "uppercase" }}>
            Resource utilization
          </text>
        </g>

        {/* Capacity bars */}
        {[
          { label: "Power", value: 0.72, y: 274 },
          { label: "Downlink", value: 0.58, y: 294 },
          { label: "Imaging window", value: 0.84, y: 314 },
        ].map((b, i) => (
          <g key={i}>
            <text x="20" y={b.y + 3} fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">
              {b.label}
            </text>
            <rect x="120" y={b.y - 4} width="280" height="8" fill="#14b8a6" fillOpacity="0.06" rx="1" />
            <motion.rect
              x="120"
              y={b.y - 4}
              height="8"
              fill="#14b8a6"
              fillOpacity="0.5"
              rx="1"
              initial={{ width: 0 }}
              animate={{ width: 280 * b.value }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
            />
            <text x="408" y={b.y + 3} textAnchor="end" fill="#0a0a0a" fontSize="9" fontFamily="ui-monospace, monospace">
              {Math.round(b.value * 100)}%
            </text>
          </g>
        ))}

        {/* Footer legend */}
        <g transform="translate(20, 358)">
          {[
            { label: "Image", color: "#14b8a6" },
            { label: "Downlink", color: "#0f766e" },
            { label: "Maneuver", color: "#f59e0b" },
            { label: "Calibration", color: "#6366f1" },
          ].map((l, i) => (
            <g key={i} transform={`translate(${i * 90}, 0)`}>
              <rect x="0" y="-6" width="8" height="6" fill={l.color} fillOpacity="0.5" stroke={l.color} strokeOpacity="0.7" />
              <text x="14" y="0" fill="#525252" fontSize="9" fontFamily="ui-monospace, monospace">
                {l.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
