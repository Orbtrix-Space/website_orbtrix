import { useEffect } from "react";
import { motion } from "framer-motion";
import { SatelliteMotion } from "@/components/SatelliteMotion";

export default function RigelOS() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Rigel OS — Orbtrix Space";

    const descContent =
      "Rigel OS is Orbtrix's long-term vision for autonomous onboard flight software. Currently in research and development.";
    let metaDesc = document.querySelector('meta[name="description"]');
    const hadMeta = !!metaDesc;
    const prevDesc = metaDesc?.getAttribute("content") ?? null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", descContent);

    return () => {
      document.title = prevTitle;
      if (hadMeta && prevDesc !== null) {
        metaDesc?.setAttribute("content", prevDesc);
      } else if (!hadMeta && metaDesc?.parentNode) {
        metaDesc.parentNode.removeChild(metaDesc);
      }
    };
  }, []);

  return (
    <div className="bg-white min-h-[calc(100dvh-5rem)] relative overflow-hidden flex items-center">
      {/* Subtle teal ambient */}
      <motion.div
        className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
        animate={{ opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <section className="relative z-10 w-full px-5 md:px-8 lg:px-12 2xl:px-24 py-16 md:py-20">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-px bg-teal-600/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-teal-700">
                  Onboard Flight Software
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-medium tracking-tight mb-4 text-gradient-teal break-words"
                style={{ lineHeight: 1.15, paddingBottom: "0.15em" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Rigel OS
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-teal-600 mb-8 break-words"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                Real-time Intelligence for Guidance, Execution &amp; Logic
              </motion.p>

              <motion.div
                className="mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-500/40 text-xs uppercase tracking-wider text-red-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-dot" />
                  In Research &amp; Development
                </span>
              </motion.div>

              <motion.p
                className="text-neutral-700 text-base md:text-lg leading-relaxed mb-10 break-words"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                Rigel OS is part of Orbtrix&apos;s long-term vision for end-to-end
                autonomous mission stacks. An onboard flight software layer
                designed to give spacecraft the ability to execute mission logic
                independently. The project is currently in early research and
                development. We are building it quietly, alongside our ground
                operations platform, and will share more when the work is ready
                to be shared.
              </motion.p>

              <motion.div
                className="pt-6 border-t border-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-sm md:text-base text-neutral-500 leading-relaxed break-words">
                  Engineers, researchers, or mission partners interested in the
                  future of autonomous flight software are welcome to reach out:{" "}
                  <a
                    href="mailto:info@orbtrix.space"
                    className="text-teal-700 hover:text-teal-800 transition-colors"
                  >
                    info@orbtrix.space
                  </a>
                </p>
              </motion.div>
            </div>

            {/* Right: real satellite in orbit */}
            <motion.div
              className="flex justify-center items-center order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              aria-hidden="true"
            >
              <div className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]">
                <SatelliteMotion />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
