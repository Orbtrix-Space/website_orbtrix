import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  glow?: "indigo" | "teal" | "none";
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  glow = "none",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const { x, y } = directionMap[direction];

  const glowClass =
    glow === "indigo"
      ? "scroll-glow-indigo"
      : glow === "teal"
        ? "scroll-glow-teal"
        : "";

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isInView && glowClass ? glowClass : ""}`}
      initial={{ opacity: 0, x, y, filter: glow !== "none" ? "brightness(0.6)" : undefined }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: glow !== "none" ? "brightness(1)" : undefined }
          : { opacity: 0, x, y, filter: glow !== "none" ? "brightness(0.6)" : undefined }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
