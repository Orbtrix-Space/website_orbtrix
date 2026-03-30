import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import { DishaBg } from "@/components/DishaBg";
import {
  Activity,
  Shield,
  Orbit,
  Layers,
  Brain,
  ArrowRight,
  Satellite,
  AlertTriangle,
  Radar,
  CalendarClock,
} from "lucide-react";

const CORE_FEATURES = [
  {
    icon: Activity,
    title: "Real-Time Spacecraft Monitoring",
    desc: "Continuous telemetry ingestion, parsing, and visualization across all spacecraft subsystems. DISHA processes thousands of telemetry parameters in real time, presenting operators with an intelligent, context-aware dashboard that highlights what matters — not just raw data.",
    details: [
      "Live housekeeping and payload telemetry streams",
      "Subsystem health scoring and trend analysis",
      "Configurable alert thresholds and anomaly flagging",
      "Historical data replay and comparison",
    ],
  },
  {
    icon: Shield,
    title: "AI-Based FDIR",
    desc: "Fault Detection, Isolation, and Recovery powered by machine learning models trained on spacecraft behavioral patterns. DISHA doesn't just detect faults — it isolates root causes and recommends or autonomously executes recovery sequences.",
    details: [
      "Pattern-based anomaly detection across subsystems",
      "Automated fault isolation using causal reasoning",
      "Pre-computed recovery action libraries",
      "Continuous model refinement from mission data",
    ],
  },
  {
    icon: Radar,
    title: "Real-Time Collision Avoidance",
    desc: "Automated conjunction assessment and maneuver planning integrated with space surveillance data. DISHA continuously evaluates orbital threats and generates optimal avoidance maneuvers with minimal propellant expenditure.",
    details: [
      "Automated CDM processing and risk assessment",
      "Monte Carlo-based collision probability computation",
      "Optimal maneuver planning with constraints",
      "Integration with space surveillance networks",
    ],
  },
  {
    icon: Layers,
    title: "Multi-Satellite Fleet Management",
    desc: "Unified operations interface for managing heterogeneous satellite constellations from a single pane of glass. DISHA scales from a single spacecraft to an entire fleet without linear growth in operations overhead.",
    details: [
      "Constellation-wide health overview and alerting",
      "Cross-satellite resource optimization",
      "Fleet-level pass scheduling and contact planning",
      "Standardized command interfaces across bus types",
    ],
  },
  {
    icon: CalendarClock,
    title: "AI-Based Mission Planning & Scheduling",
    desc: "Intelligent mission planning that optimizes imaging schedules, downlink windows, and power budgets using constraint-based AI. DISHA generates conflict-free mission timelines that maximize data collection while respecting all spacecraft constraints.",
    details: [
      "Constraint-aware automated scheduling engine",
      "Multi-objective optimization for imaging and downlink",
      "Dynamic re-planning on orbit anomalies or new tasking",
      "Ground station contact scheduling and optimization",
    ],
  },
];

const PLATFORM_PILLARS = [
  {
    icon: Brain,
    label: "AI-Native Architecture",
    desc: "Built from the ground up with machine learning at every layer — not bolted on as an afterthought.",
  },
  {
    icon: Satellite,
    label: "Mission-Proven Design",
    desc: "Designed for real flight operations with deterministic fallbacks and human-in-the-loop override.",
  },
  {
    icon: AlertTriangle,
    label: "Zero-Trust Safety",
    desc: "Every AI recommendation is validated against flight rules before execution. Autonomous, not unsupervised.",
  },
  {
    icon: Orbit,
    label: "Scalable by Design",
    desc: "Horizontally scalable architecture that handles one satellite or a hundred with the same operational team.",
  },
];

export default function Disha() {
  return (
    <div className="scan-lines">
      {/* Hero with animated background */}
      <section className="relative overflow-hidden py-16 md:py-24 xl:py-32 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[70vh] flex items-center">
        <DishaBg />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-white rounded-full opacity-[0.03] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-white/20 rounded-full opacity-[0.025] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-px bg-white" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-70">
              Ground Segment · AI-Native Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold font-display tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text-cyan">DISHA</span>
          </motion.h1>

          <motion.p
            className="text-base font-mono text-neutral-400 opacity-40 mb-8 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Digital Infrastructure for Spacecraft Handling & Analytics
          </motion.p>

          <motion.p
            className="text-neutral-400 text-xl md:text-2xl max-w-3xl leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            DISHA is an AI-native ground operations platform that transforms how
            spacecraft are monitored, managed, and operated. It replaces
            traditional manual ground operations with intelligent automation —
            enabling a small team to operate an entire constellation with the
            precision and speed of a mission control center ten times its size.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 neon-edge text-sm font-mono uppercase tracking-wider text-neutral-400 opacity-70">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full pulse-dot" />
              In Development
            </span>
          </motion.div>
        </div>
      </section>

      {/* AI-Native Pillars */}
      <ScrollColorLine color="indigo" />
      <section className="py-16 md:py-24 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white" />
                Platform Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
                AI-Native from Day One
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLATFORM_PILLARS.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} glow="indigo">
                <div className="neon-edge p-8 2xl:p-12 h-full hover-lift">
                  <pillar.icon className="w-7 h-7 text-neutral-400 opacity-60 mb-4" />
                  <h3 className="font-display text-base font-semibold mb-3 tracking-tight">
                    {pillar.label}
                  </h3>
                  <p className="text-neutral-500 text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <ScrollColorLine color="indigo" />
      <section className="relative py-16 md:py-24 xl:py-24 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white" />
                Core Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold font-display tracking-tight">
                What DISHA Does
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {CORE_FEATURES.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} glow="indigo">
                <div className="neon-edge p-10 md:p-10 2xl:p-14 hover-lift">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-neutral-400 opacity-60" />
                        </div>
                        <h3 className="text-2xl font-display font-bold tracking-tight">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-neutral-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/8 pt-6 lg:pt-0 lg:pl-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block mb-4">
                        Key Capabilities
                      </span>
                      <div className="space-y-3">
                        {feature.details.map((detail, didx) => (
                          <div
                            key={didx}
                            className="flex items-start gap-3 text-base"
                          >
                            <span className="w-1 h-1 rounded-full bg-white opacity-50 mt-2 flex-shrink-0" />
                            <span className="text-neutral-500">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <ScrollColorLine color="indigo" />
      <section className="py-16 md:py-24 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="text-center mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4">
                System Architecture
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
                How DISHA Connects
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">
                DISHA sits at the heart of ground operations, bridging raw
                spacecraft data and intelligent decision-making.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal glow="indigo">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="neon-edge p-10 2xl:p-14 text-center hover-lift">
                <div className="text-neutral-400 opacity-50 mb-3 flex justify-center">
                  <Satellite className="w-10 h-10" />
                </div>
                <div className="text-xl font-display font-bold mb-2">Spacecraft</div>
                <p className="text-base text-neutral-500">
                  Telemetry downlink, command uplink, payload data
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="font-mono text-[10px] text-neutral-400 opacity-40 uppercase tracking-widest">
                  Data Flow
                </span>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              <div className="neon-edge p-10 2xl:p-14 text-center hover-lift">
                <div className="text-neutral-400 opacity-50 mb-3 flex justify-center">
                  <Brain className="w-10 h-10" />
                </div>
                <div className="text-xl font-display font-bold mb-2">DISHA AI Engine</div>
                <p className="text-base text-neutral-500">
                  Monitoring, FDIR, planning, collision avoidance
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal glow="indigo">
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Telemetry Parameters", value: "10,000+", sub: "Processed in real time" },
                { label: "Fault Response", value: "<2s", sub: "Detection to recommendation" },
                { label: "Fleet Scale", value: "100+", sub: "Satellites per instance" },
              ].map((stat, idx) => (
                <div key={idx} className="neon-edge p-8 2xl:p-12 text-center hover-lift">
                  <div className="text-3xl md:text-4xl font-display font-bold neon-text-cyan mb-1">
                    {stat.value}
                  </div>
                  <div className="text-base font-display text-white mb-1">{stat.label}</div>
                  <div className="text-sm text-neutral-600 font-mono">{stat.sub}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ScrollColorLine color="indigo" />
      <section className="py-16 md:py-24 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24">
        <ScrollReveal glow="indigo">
          <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-3">
                Want to see DISHA in action?
              </h2>
              <p className="text-neutral-500 max-w-lg">
                We're working with early partners to validate DISHA on real
                mission data. Reach out if you're interested in a demonstration
                or collaboration.
              </p>
            </div>
            <Link
              href="/contact"
              className="group px-7 py-3.5 bg-white text-white text-base font-semibold hover:bg-white/80 transition-all duration-300 flex items-center gap-2 flex-shrink-0 font-display uppercase tracking-wide"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
