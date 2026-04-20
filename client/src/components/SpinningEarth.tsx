import { motion } from "framer-motion";

interface SpinningEarthProps {
  size?: number;
  className?: string;
}

const EARTH_TEXTURE =
  "https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-blue-marble.jpg";

function SatelliteIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(0 0 8px rgba(45, 212, 191, 0.8))",
      }}
    >
      <rect x="2" y="11" width="20" height="10" fill="#0f766e" stroke="#2dd4bf" strokeWidth="0.6" />
      <line x1="7" y1="11" x2="7" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <line x1="12" y1="11" x2="12" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <line x1="17" y1="11" x2="17" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <rect x="42" y="11" width="20" height="10" fill="#0f766e" stroke="#2dd4bf" strokeWidth="0.6" />
      <line x1="47" y1="11" x2="47" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <line x1="52" y1="11" x2="52" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <line x1="57" y1="11" x2="57" y2="21" stroke="#14b8a6" strokeWidth="0.3" />
      <rect x="24" y="8" width="16" height="16" fill="#e5e7eb" stroke="#ffffff" strokeWidth="0.6" />
      <rect x="26" y="10" width="12" height="3" fill="#14b8a6" />
      <circle cx="32" cy="18" r="1.5" fill="#14b8a6" />
      <line x1="32" y1="8" x2="32" y2="3" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="32" cy="3" r="1" fill="#2dd4bf" />
    </svg>
  );
}

export function SpinningEarth({ size = 380, className = "" }: SpinningEarthProps) {
  const satelliteSize = Math.max(20, size * 0.09);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size, maxWidth: "100%" }}
    >
      {/* Atmospheric outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.45) 0%, rgba(20, 184, 166, 0.15) 50%, transparent 75%)",
          transform: "scale(1.2)",
        }}
      />

      {/* Orbit ring */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-teal-400/15"
        style={{
          width: size * 1.3,
          height: size * 1.3,
          transform: "translate(-50%, -50%) rotateX(72deg)",
        }}
      />

      {/* Orbiting satellite */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ width: 0, height: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute"
          style={{
            left: size * 0.65,
            top: -satelliteSize / 2,
          }}
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <SatelliteIcon size={satelliteSize} />
        </motion.div>
      </motion.div>

      {/* Earth sphere */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow: `
            inset -40px -40px 90px rgba(0, 0, 0, 0.75),
            inset 30px 30px 80px rgba(45, 212, 191, 0.1),
            0 0 80px rgba(20, 184, 166, 0.25)
          `,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${EARTH_TEXTURE})`,
            backgroundSize: `${size * 2}px ${size}px`,
            backgroundRepeat: "repeat-x",
          }}
          animate={{
            backgroundPositionX: [`0px`, `-${size * 2}px`],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, transparent 40%, rgba(0, 0, 0, 0.55) 90%)",
          }}
        />

        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(45, 212, 191, 0.4) 0%, transparent 60%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "inset 0 0 40px rgba(45, 212, 191, 0.35)",
        }}
      />
    </div>
  );
}
