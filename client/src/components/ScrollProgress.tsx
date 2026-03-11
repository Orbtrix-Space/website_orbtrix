import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-[var(--neon-cyan)] origin-left z-[60] shadow-[0_0_8px_rgba(99,102,241,0.4)]"
      style={{ scaleX }}
    />
  );
}
