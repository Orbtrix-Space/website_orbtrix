import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import { TypewriterText } from "@/components/TypewriterText";

export default function Home() {
  return (
    <div className="w-full scan-lines">
      {/* Hero */}
      <section className="min-h-[calc(100dvh-5rem)] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Ambient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--neon-cyan)] rounded-full opacity-[0.025] blur-[130px] animate-float pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--neon-purple)] rounded-full opacity-[0.02] blur-[130px] animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 w-full py-16">
          <motion.div
            className="font-mono text-xs 2xl:text-sm uppercase tracking-[0.3em] text-[var(--neon-cyan)] block mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-[var(--neon-cyan)]" />
            <span className="neon-text-cyan opacity-70">Space Systems & Autonomy</span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight leading-[1.08] max-w-6xl font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="gradient-text-cyan">Autonomous spacecraft.</span>
          </motion.h1>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight leading-[1.08] max-w-6xl mt-2 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="gradient-text-cyan">From LEO to the Moon.</span>
          </motion.h2>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-neutral-400 text-lg md:text-xl xl:text-2xl 2xl:text-3xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-relaxed mb-3">
              We engineer intelligent, autonomous satellites capable of in-orbit decision-making, 
              designed to maximize mission sustainability while drastically reducing operational workload.
            </div>
            <div className="h-7">
              <TypewriterText
                texts={[
                  "// Autonomous operations in orbit",
                  "// Software-defined spacecraft",
                  "// From LEO to lunar infrastructure",
                  "// Mission autonomy redefined",
                ]}
                className="text-[var(--neon-cyan)] text-base 2xl:text-lg opacity-50"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-14"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-base 2xl:text-lg font-semibold tracking-wide hover:bg-[var(--neon-cyan)] hover:text-white transition-all duration-300 font-display uppercase"
            >
              Our Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/mission"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 neon-edge text-base 2xl:text-lg font-medium text-white hover:bg-[var(--neon-cyan)]/5 transition-all duration-300 font-display uppercase"
            >
              2028 Mission
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-[var(--neon-cyan)] opacity-30" />
          </motion.div>
        </motion.div>
      </section>

      {/* Color line divider */}
      <ScrollColorLine color="indigo" />

      {/* Vision Path */}
      <section className="py-16 md:py-24 xl:py-28 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs 2xl:text-sm uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-cyan)]" />
                Our Approach
              </span>
              <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight font-display">
                The path to the Moon starts in LEO
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8">
            {[
              {
                step: "Now",
                title: "Autonomous LEO Missions",
                desc: "Commercial Earth observation missions with onboard decision-making, delivering raw intelligence at a fraction of traditional costs.",
                variant: "neon-edge",
                glow: "indigo" as const,
              },
              {
                step: "Near-term",
                title: "Scaled Operations",
                desc: "Multiple concurrent missions powered by DISHA and Rigel OS, our ground and onboard software stack that eliminates manual operations overhead.",
                variant: "neon-edge",
                glow: "indigo" as const,
              },
              {
                step: "Long-term",
                title: "Building Lunar Infrastructure",
                desc: "Extending our autonomous operations framework to build sustained lunar infrastructure: communications relays, precision navigation, and surface operations systems.",
                variant: "neon-edge-purple",
                glow: "teal" as const,
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15} glow={item.glow}>
                <div className={`${item.variant} bg-black p-8 md:p-10 2xl:p-12 h-full hover-lift`}>
                  <span className={`font-mono text-xs uppercase tracking-[0.3em] ${idx < 2 ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-50 block mb-6 flex items-center gap-2`}>
                    <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${idx < 2 ? "bg-[var(--neon-cyan)]" : "bg-[var(--neon-purple)]"} opacity-60`} />
                    {item.step}
                  </span>
                  <h3 className="text-xl 2xl:text-2xl font-semibold mb-4 tracking-tight font-display">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-base 2xl:text-lg">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Color line divider */}
      <ScrollColorLine color="mixed" />

      {/* Products Preview */}
      <section className="py-16 md:py-24 xl:py-28 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="font-mono text-xs 2xl:text-sm uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-4 flex items-center gap-3">
                  <span className="w-5 h-px bg-[var(--neon-cyan)]" />
                  Core Systems
                </span>
                <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight font-display">
                  The software stack
                </h2>
              </div>
              <Link
                href="/products"
                className="group text-base 2xl:text-lg text-neutral-500 hover:text-[var(--neon-cyan)] transition-colors flex items-center gap-1.5 font-mono"
              >
                View all products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-8">
            <ScrollReveal delay={0.05} glow="indigo">
              <Link href="/products/disha" className="block group h-full">
                <div className="neon-edge p-8 md:p-10 xl:p-12 2xl:p-14 h-full flex flex-col hover-lift">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-40 block mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] opacity-50 pulse-dot" />
                    Ground
                  </span>
                  <h3 className="text-2xl 2xl:text-3xl font-bold mb-2 font-display">DISHA</h3>
                  <p className="text-sm 2xl:text-base text-neutral-600 font-mono mb-4">
                    AI-Native Ground Ops
                  </p>
                  <p className="text-neutral-500 leading-relaxed text-sm 2xl:text-base flex-grow">
                    Automated monitoring, AI-based FDIR, collision avoidance, and fleet management.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 group-hover:text-[var(--neon-cyan)] transition-colors font-mono">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1} glow="indigo">
              <Link href="/products/supersat" className="block group h-full">
                <div className="neon-edge p-8 md:p-10 xl:p-12 2xl:p-14 h-full flex flex-col hover-lift">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-40 block mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] opacity-50 pulse-dot" />
                    Platform
                  </span>
                  <h3 className="text-2xl 2xl:text-3xl font-bold mb-2 font-display">SuperSat</h3>
                  <p className="text-sm 2xl:text-base text-neutral-600 font-mono mb-4">
                    Autonomous Satellite
                  </p>
                  <p className="text-neutral-500 leading-relaxed text-sm 2xl:text-base flex-grow">
                    Mission-agnostic autonomous satellite platform with in-orbit decision-making.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 group-hover:text-[var(--neon-cyan)] transition-colors font-mono">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.15} glow="teal">
              <Link href="/products/rigel-os" className="block group h-full">
                <div className="neon-edge-purple p-8 md:p-10 xl:p-12 2xl:p-14 h-full flex flex-col hover-lift">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-40 block mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-purple)] opacity-50 pulse-dot" />
                    Onboard
                  </span>
                  <h3 className="text-2xl 2xl:text-3xl font-bold mb-2 font-display">Rigel OS</h3>
                  <p className="text-sm 2xl:text-base text-neutral-600 font-mono mb-4">
                    Autonomous OS
                  </p>
                  <p className="text-neutral-500 leading-relaxed text-sm 2xl:text-base flex-grow">
                    Onboard GNC, FDIR, data processing, and autonomous mission execution.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 group-hover:text-[var(--neon-purple)] transition-colors font-mono">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Color line divider */}
      <ScrollColorLine color="indigo" />

      {/* Stats */}
      <section className="py-16 md:py-20 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 2xl:gap-8 text-center">
              {[
                { value: "2025", label: "Founded" },
                { value: "6U", label: "Satellite Class" },
                { value: "LEO", label: "First Orbit" },
                { value: "2028", label: "Launch Target" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="neon-edge p-8 2xl:p-10 hover-lift stat-card-glow"
                >
                  <div className="text-3xl md:text-4xl 2xl:text-5xl font-bold font-display neon-text-cyan mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm 2xl:text-base text-neutral-600 font-mono uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Color line divider */}
      <ScrollColorLine color="teal" />

      {/* CTA */}
      <section className="py-16 md:py-24 xl:py-28 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <ScrollReveal glow="indigo">
          <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight mb-3 font-display">
                Interested in what we're building?
              </h2>
              <p className="text-neutral-500 max-w-xl 2xl:max-w-2xl text-lg 2xl:text-xl">
                Whether it's payload hosting, technology collaboration, or
                joining the team, we'd like to hear from you.
              </p>
            </div>

            <Link
              href="/contact"
              className="group px-8 py-4 neon-edge text-white text-base 2xl:text-lg font-medium hover:bg-[var(--neon-cyan)]/5 transition-all duration-300 flex items-center gap-2 flex-shrink-0 font-display uppercase"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
