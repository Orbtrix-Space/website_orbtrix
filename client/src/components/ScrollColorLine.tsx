import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollColorLineProps {
  className?: string;
  color?: "indigo" | "teal" | "mixed";
}

export function ScrollColorLine({ className = "", color = "mixed" }: ScrollColorLineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const gradientMap = {
    indigo: "from-transparent via-[var(--neon-cyan)]/40 to-transparent",
    teal: "from-transparent via-[var(--neon-purple)]/40 to-transparent",
    mixed: "from-[var(--neon-cyan)]/0 via-[var(--neon-cyan)]/30 to-[var(--neon-purple)]/0",
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className={`h-px bg-gradient-to-r ${gradientMap[color]}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ transformOrigin: "left center" }}
      />
      <motion.div
        className="absolute top-0 left-0 h-px w-20 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "500%" } : { x: "-100%" }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
      />
    </div>
  );
}
