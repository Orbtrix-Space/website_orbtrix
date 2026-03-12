import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import {
  Shield,
  Radio,
  Battery,
  Cpu,
  Orbit,
  ArrowRight,
  Satellite,
  Brain,
  Zap,
  Rocket,
} from "lucide-react";

const CORE_CAPABILITIES = [
  {
    icon: Shield,
    title: "FDIR Engine",
    subtitle: "Predict and Prevent Failures",
    desc: "SuperSat's onboard FDIR engine continuously monitors every subsystem, predicting failures before they happen. Using behavioral baselines and machine learning, it isolates faults in milliseconds and autonomously executes recovery — keeping the mission alive when things go wrong.",
    details: [
      "Predictive failure detection across all subsystems",
      "Autonomous fault isolation and recovery",
      "Behavioral baseline anomaly detection",
      "Zero-downtime failover for critical systems",
    ],
    accent: "cyan",
  },
  {
    icon: Radio,
    title: "Autonomous Communications",
    subtitle: "Intelligent Link Management",
    desc: "Every ground contact window is precious. SuperSat's communication system intelligently prioritizes what gets downlinked based on mission value, compresses data adaptively, and manages link budgets in real time — maximizing intelligence delivered per pass, regardless of the payload type.",
    details: [
      "Value-based data prioritization for downlink",
      "Adaptive compression and bandwidth management",
      "Autonomous ground station handover",
      "Store-and-forward with intelligent queuing",
    ],
    accent: "purple",
  },
  {
    icon: Battery,
    title: "Power and Fuel",
    subtitle: "Extend Mission Lifetime",
    desc: "Mission lifetime is defined by power and propellant. SuperSat continuously optimizes both — dynamically scheduling subsystem power, planning propellant-optimal maneuvers, and managing battery health to extend operations far beyond nominal design life.",
    details: [
      "Dynamic power budgeting across mission phases",
      "Propellant-optimal orbit maintenance",
      "Battery cycle management and health monitoring",
      "Eclipse-aware thermal and power scheduling",
    ],
    accent: "cyan",
  },
  {
    icon: Cpu,
    title: "Onboard Processing",
    subtitle: "Edge Compute in Orbit",
    desc: "SuperSat carries a flight-qualified compute module capable of running ML inference, data compression, and mission-specific algorithms at the edge. Whether it's image classification, signal processing, or scientific analysis — the heavy lifting happens in orbit, not on the ground.",
    details: [
      "Flight-qualified edge compute for any payload type",
      "Onboard ML inference and data reduction",
      "Configurable processing pipelines per mission",
      "Real-time alert generation for critical events",
    ],
    accent: "purple",
  },
  {
    icon: Orbit,
    title: "Autonomous GNC",
    subtitle: "Adaptive Orbit Management",
    desc: "SuperSat navigates itself. Onboard guidance, navigation, and control computes optimal trajectories, executes station-keeping, and handles attitude determination without ground commands — maintaining precise pointing even during communication gaps.",
    details: [
      "Autonomous orbit determination and propagation",
      "Station-keeping with collision avoidance",
      "Multi-mode attitude control for payload precision",
      "Real-time trajectory optimization",
    ],
    accent: "cyan",
  },
];

const MISSION_PROFILES = [
  {
    icon: Satellite,
    label: "Earth Observation",
    desc: "Multispectral imaging, change detection, and autonomous target acquisition",
  },
  {
    icon: Radio,
    label: "Communications",
    desc: "Relay services, IoT connectivity, and store-and-forward messaging",
  },
  {
    icon: Cpu,
    label: "Technology Demo",
    desc: "In-orbit validation of experimental payloads and new subsystems",
  },
  {
    icon: Shield,
    label: "Defense & ISR",
    desc: "Autonomous surveillance, maritime tracking, and rapid tasking",
  },
];

const STACK_NODES = [
  {
    icon: Brain,
    label: "DISHA",
    sublabel: "Ground",
    desc: "Plans, monitors, and commands from the ground",
    accent: "cyan",
  },
  {
    icon: Satellite,
    label: "SuperSat",
    sublabel: "Platform",
    desc: "The hardware that flies, computes, and survives",
    accent: "purple",
    featured: true,
  },
  {
    icon: Zap,
    label: "Rigel OS",
    sublabel: "Onboard",
    desc: "The brain that decides, executes, and adapts",
    accent: "cyan",
  },
];

const STACK_STATS = [
  { label: "Mission Autonomy", value: "95%+", sub: "End-to-end autonomous operation" },
  { label: "Ops Overhead Reduction", value: "60%", sub: "Vs. traditional mission ops" },
  { label: "Onboard Decision Speed", value: "<100ms", sub: "Fault to response, in orbit" },
];

export default function SuperSat() {
  return (
    <div className="scan-lines">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20 xl:py-28 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 -left-48 w-[700px] h-[700px] bg-[var(--neon-purple)] rounded-full opacity-[0.04] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 -right-48 w-[600px] h-[600px] bg-[var(--neon-cyan)] rounded-full opacity-[0.035] blur-[160px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[var(--neon-purple)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-70">
              Satellite Platform · Mission Agnostic
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold font-display tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">SUPERSAT</span>
          </motion.h1>

          <motion.p
            className="text-base font-mono text-[var(--neon-purple)] opacity-50 mb-6 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            One Platform. Any Mission.
          </motion.p>

          <motion.p
            className="text-neutral-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            SuperSat is a mission-agnostic autonomous satellite platform
            designed to support any payload and any orbit. Powered by Rigel OS
            and managed by DISHA, it provides the autonomous infrastructure
            that lets mission operators focus on their objectives — not on
            keeping a spacecraft alive. From Earth observation to
            communications to deep space, SuperSat adapts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 neon-edge-purple text-sm font-mono uppercase tracking-wider text-[var(--neon-purple)] opacity-70">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full pulse-dot" />
              In Development
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--neon-cyan)] opacity-50">
              Powered by Rigel OS
            </span>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <ScrollColorLine color="teal" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="teal">
            <div className="neon-edge-purple p-10 md:p-14 2xl:p-20 text-center hover-lift relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/40 to-transparent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-50 block mb-6">
                The Vision
              </span>
              <h2 className="text-3xl md:text-5xl xl:text-6xl font-bold font-display tracking-tight mb-8 leading-tight">
                <span className="gradient-text">What if satellites could think on their own?</span>
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                Today's satellites are expensive hardware waiting for instructions.
                They orbit in silence until a ground station tells them what to do,
                when to do it, and how. SuperSat changes everything. A satellite
                that perceives its environment, reasons about its mission, and acts
                on its own judgment — in real time, in orbit. No waiting. No
                dependency. No bottleneck.{" "}
                <span className="neon-text-purple font-semibold">
                  This is a spacecraft that thinks for itself.
                </span>
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/40 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission Profiles */}
      <ScrollColorLine color="indigo" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-cyan)]" />
                Mission Profiles
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
                Built for Every Mission Type
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MISSION_PROFILES.map((profile, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} glow={idx % 2 === 0 ? "indigo" : "teal"}>
                <div className={`${idx % 2 === 0 ? "neon-edge" : "neon-edge-purple"} p-6 2xl:p-10 h-full hover-lift`}>
                  <profile.icon className={`w-6 h-6 ${idx % 2 === 0 ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-60 mb-3`} />
                  <h3 className="font-display text-base font-semibold mb-2 tracking-tight">
                    {profile.label}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {profile.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <ScrollColorLine color="indigo" />
      <section className="relative py-12 md:py-18 xl:py-20 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-cyan)]" />
                Platform Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold font-display tracking-tight">
                What SuperSat Delivers
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {CORE_CAPABILITIES.map((cap, idx) => {
              const isCyan = cap.accent === "cyan";
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.08}
                  glow={isCyan ? "indigo" : "teal"}
                >
                  <div
                    className={`${isCyan ? "neon-edge" : "neon-edge-purple"} p-6 md:p-8 2xl:p-12 hover-lift`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-3 mb-1">
                          <div
                            className={`w-10 h-10 border ${isCyan ? "border-[var(--neon-cyan)]/20" : "border-[var(--neon-purple)]/20"} flex items-center justify-center flex-shrink-0`}
                          >
                            <cap.icon
                              className={`w-5 h-5 ${isCyan ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-60`}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-bold tracking-tight leading-tight">
                              {cap.title}
                            </h3>
                            <p
                              className={`font-mono text-[11px] uppercase tracking-[0.2em] ${isCyan ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-50 mt-0.5`}
                            >
                              {cap.subtitle}
                            </p>
                          </div>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed mt-3">
                          {cap.desc}
                        </p>
                      </div>

                      <div
                        className={`lg:col-span-2 border-t lg:border-t-0 lg:border-l ${isCyan ? "border-[var(--neon-cyan)]/8" : "border-[var(--neon-purple)]/8"} pt-4 lg:pt-0 lg:pl-6`}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block mb-3">
                          Key Capabilities
                        </span>
                        <div className="space-y-2">
                          {cap.details.map((detail, didx) => (
                            <div
                              key={didx}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span
                                className={`w-1 h-1 rounded-full ${isCyan ? "bg-[var(--neon-cyan)]" : "bg-[var(--neon-purple)]"} opacity-50 mt-1.5 flex-shrink-0`}
                              />
                              <span className="text-neutral-500">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Stack */}
      <ScrollColorLine color="teal" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="teal">
            <div className="text-center mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-50 block mb-3">
                Integrated Stack
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3">
                Everything Working as One
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base">
                SuperSat doesn't operate in isolation. DISHA directs from the
                ground. Rigel OS thinks onboard. Together, they form a closed loop
                of autonomous intelligence that no legacy architecture can match.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal glow="teal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-8">
              {STACK_NODES.map((node, idx) => {
                const isCyan = node.accent === "cyan";
                return (
                  <div
                    key={idx}
                    className={`${node.featured ? "neon-edge-purple md:scale-105 md:shadow-[0_0_60px_-10px_var(--neon-purple)]" : isCyan ? "neon-edge" : "neon-edge-purple"} p-8 2xl:p-12 text-center hover-lift flex flex-col items-center justify-center gap-2`}
                  >
                    <div
                      className={`${isCyan ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-50 mb-1 flex justify-center`}
                    >
                      <node.icon className={`${node.featured ? "w-12 h-12" : "w-9 h-9"}`} />
                    </div>
                    <div>
                      <div
                        className={`${node.featured ? "text-2xl" : "text-xl"} font-display font-bold mb-0.5 ${node.featured ? "gradient-text" : ""}`}
                      >
                        {node.label}
                      </div>
                      <div
                        className={`font-mono text-[10px] uppercase tracking-[0.3em] ${isCyan ? "text-[var(--neon-cyan)]" : "text-[var(--neon-purple)]"} opacity-40 mb-2`}
                      >
                        {node.sublabel}
                      </div>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
                      {node.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal glow="teal">
            <div className="hidden md:flex items-center mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/20 to-[var(--neon-purple)]/20" />
              <span className="font-mono text-[10px] text-[var(--neon-purple)] opacity-40 uppercase tracking-widest px-4">
                Closed-loop autonomy
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[var(--neon-purple)]/20 to-[var(--neon-purple)]/20" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STACK_STATS.map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} glow="teal">
                <div className="neon-edge-purple p-6 2xl:p-10 text-center hover-lift">
                  <div className="text-3xl md:text-4xl font-display font-bold neon-text-purple mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-display text-white mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-600 font-mono">{stat.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* First Mission */}
      <ScrollColorLine color="mixed" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="indigo">
            <div className="neon-edge p-8 md:p-12 2xl:p-16 hover-lift">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Rocket className="w-6 h-6 text-[var(--neon-cyan)] opacity-60" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50">
                      First Flight · 2028
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight mb-2">
                    SuperSat EO-1
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
                    The first mission on the SuperSat platform — an autonomous
                    Earth observation satellite in Sun-Synchronous Orbit. SuperSat
                    EO-1 will validate the full autonomy stack with a multispectral
                    imaging payload, proving that one platform can deliver
                    constellation-level output from a single spacecraft.
                  </p>
                </div>
                <Link
                  href="/mission"
                  className="group inline-flex items-center gap-2 px-6 py-3 neon-edge text-white text-sm font-medium hover:bg-[var(--neon-cyan)]/5 transition-all duration-300 flex-shrink-0 font-display uppercase tracking-wide"
                >
                  View Mission
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <ScrollColorLine color="teal" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <ScrollReveal glow="teal">
          <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold font-display tracking-tight mb-2">
                Have a mission that needs a platform?
              </h2>
              <p className="text-neutral-500 max-w-lg text-sm md:text-base">
                We're engaging with agencies, commercial operators, and research
                institutions looking for an autonomous satellite platform —
                regardless of the mission profile.
              </p>
            </div>
            <Link
              href="/contact"
              className="group px-7 py-3.5 bg-[var(--neon-purple)] text-white text-base font-semibold hover:bg-[var(--neon-purple)]/80 transition-all duration-300 flex items-center gap-2 flex-shrink-0 font-display uppercase tracking-wide"
            >
              Discuss Your Mission
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
