import { motion } from "framer-motion";
import { Satellite } from "lucide-react";

interface SatelliteOrbitProps {
  className?: string;
  size?: number;
}

/**
 * Animated satellites orbiting around an invisible center.
 * Lightweight decorative background element.
 */
export function SatelliteOrbit({ className = "", size = 600 }: SatelliteOrbitProps) {
  const rings = [
    { radius: size * 0.25, duration: 28, satellites: 1, tilt: 0 },
    { radius: size * 0.38, duration: 45, satellites: 2, tilt: 20 },
    { radius: size * 0.5, duration: 70, satellites: 1, tilt: -15 },
  ];

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, perspective: "1200px" }}
    >
      {/* Central glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30"
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.4) 0%, transparent 70%)",
        }}
      />

      {rings.map((ring, ringIdx) => (
        <div
          key={ringIdx}
          className="absolute left-1/2 top-1/2"
          style={{
            width: 0,
            height: 0,
            transform: `translate(-50%, -50%) rotateX(70deg) rotateZ(${ring.tilt}deg)`,
          }}
        >
          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-teal-400/10"
            style={{
              width: ring.radius * 2,
              height: ring.radius * 2,
              left: -ring.radius,
              top: -ring.radius,
            }}
          />

          {/* Satellites on this ring */}
          {Array.from({ length: ring.satellites }).map((_, satIdx) => (
            <motion.div
              key={satIdx}
              className="absolute"
              style={{ left: 0, top: 0 }}
              initial={{ rotate: (360 / ring.satellites) * satIdx }}
              animate={{
                rotate: [
                  (360 / ring.satellites) * satIdx,
                  (360 / ring.satellites) * satIdx + 360,
                ],
              }}
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className="absolute"
                style={{
                  left: ring.radius,
                  top: -8,
                  transform: `rotateZ(${-ring.tilt}deg) rotateX(-70deg)`,
                }}
              >
                <div className="relative">
                  <div
                    className="absolute -inset-2 rounded-full blur-md"
                    style={{ background: "rgba(45, 212, 191, 0.5)" }}
                  />
                  <Satellite
                    className="w-4 h-4 text-teal-300 relative"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}
