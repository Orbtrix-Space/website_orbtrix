import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import {
  Workflow,
  ShieldCheck,
  Timer,
  Blocks,
  RefreshCcw,
  ArrowRight,
  Layers,
  GitBranch,
  AlertTriangle,
  Settings2,
  Cpu,
} from "lucide-react";

const CORE_FEATURES = [
  {
    icon: Workflow,
    title: "Real-Time Task Scheduler",
    desc: "Rigel OS runs a deterministic, priority-driven task scheduler that orchestrates every onboard process — from sensor polling to actuator commands. Tasks execute within strict timing guarantees, ensuring the spacecraft never misses a deadline even under computational load.",
    details: [
      "Hard real-time execution with microsecond-level scheduling",
      "Priority preemption across mission-critical and routine tasks",
      "Dynamic task reallocation during anomaly events",
      "Watchdog-monitored execution with automatic recovery",
    ],
  },
  {
    icon: Blocks,
    title: "Hardware Abstraction Layer",
    desc: "Rigel OS decouples mission software from hardware specifics through a modular abstraction layer. Swap sensors, change processors, upgrade actuators — the mission logic never needs to know. This makes Rigel OS portable across satellite buses without rewriting a single line of flight code.",
    details: [
      "Unified API for heterogeneous sensor and actuator interfaces",
      "Hot-swappable driver modules for rapid hardware integration",
      "Bus-agnostic architecture supporting CAN, SpaceWire, I2C, SPI",
      "Standardized telemetry pipeline regardless of hardware vendor",
    ],
  },
  {
    icon: RefreshCcw,
    title: "State Machine Engine",
    desc: "Every spacecraft mode — safe, nominal, science, maneuver, eclipse — is governed by a finite state machine that Rigel OS manages with deterministic transitions. The engine evaluates hundreds of conditions per second and ensures the spacecraft is always in the right operational state.",
    details: [
      "Configurable mission modes with guarded transitions",
      "Multi-level state hierarchy from subsystem to spacecraft level",
      "Automated mode transitions based on onboard telemetry",
      "Full state history logging for post-flight analysis",
    ],
  },
  {
    icon: Timer,
    title: "Onboard Mission Sequencer",
    desc: "Rigel OS doesn't just follow commands — it executes entire mission plans autonomously. The onboard sequencer interprets high-level objectives from DISHA, breaks them into executable action chains, and adapts execution in real time based on spacecraft state and environmental conditions.",
    details: [
      "Time-tagged and event-driven command execution",
      "Conditional branching based on live telemetry evaluation",
      "Autonomous re-planning when preconditions change",
      "Ground-uploadable mission scripts with onboard validation",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Software-Defined Resilience",
    desc: "Rigel OS treats fault tolerance as a first-class software concern. Every subsystem module runs with redundancy-aware logic, health scoring, and automated failover. If a component degrades, the OS reconfigures the spacecraft around it — no ground intervention needed.",
    details: [
      "Per-module health scoring with trend analysis",
      "Automated failover to redundant hardware paths",
      "Software-defined safe mode with configurable triggers",
      "Over-the-air software update capability for in-orbit patching",
    ],
  },
];

const DESIGN_PILLARS = [
  {
    icon: Cpu,
    label: "Deterministic Execution",
    desc: "Every computation completes within bounded time. No garbage collection pauses, no non-deterministic memory allocation. Flight-certified predictability.",
  },
  {
    icon: ShieldCheck,
    label: "Autonomous, Not Unsupervised",
    desc: "Human operators retain strategic oversight. Rigel OS handles tactical decisions at machine speed with full audit trails.",
  },
  {
    icon: AlertTriangle,
    label: "Graceful Degradation",
    desc: "If any subsystem fails, Rigel OS reconfigures and falls back autonomously. Designed for the worst day in orbit, not the best.",
  },
  {
    icon: Settings2,
    label: "Mission-Agnostic Core",
    desc: "The same OS powers Earth observation, deep space, and lunar missions. Mission logic is configurable — the execution engine is universal.",
  },
];

export default function RigelOS() {
  return (
    <div className="scan-lines">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 md:py-20 xl:py-28 2xl:py-32 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-[var(--neon-purple)] rounded-full opacity-[0.04] blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-[var(--neon-purple)] rounded-full opacity-[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-[var(--neon-purple)]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-70">
              Space Segment · Onboard Operating System
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold font-display tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">RIGEL OS</span>
          </motion.h1>

          <motion.p
            className="text-base font-mono text-[var(--neon-purple)] opacity-40 mb-6 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Real-time Intelligence for Guidance, Execution & Logic
          </motion.p>

          <motion.p
            className="text-neutral-400 text-xl md:text-2xl max-w-3xl leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Rigel OS is the flight software that turns spacecraft hardware into
            autonomous systems. A real-time onboard operating suite that manages
            every subsystem, schedules every task, and executes mission logic
            independently — giving satellites the ability to think, adapt, and
            operate without ground dependency.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 neon-edge-purple text-sm font-mono uppercase tracking-wider text-[var(--neon-purple)] opacity-70">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full pulse-dot" />
              In Development
            </span>
          </motion.div>
        </div>
      </section>

      {/* Design Philosophy */}
      <ScrollColorLine color="teal" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="teal">
            <div className="mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-50 block mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-purple)]" />
                Design Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
                Software Built for Space
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESIGN_PILLARS.map((pillar, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} glow="teal">
                <div className="neon-edge-purple p-6 2xl:p-10 h-full hover-lift">
                  <pillar.icon className="w-6 h-6 text-[var(--neon-purple)] opacity-60 mb-3" />
                  <h3 className="font-display text-base font-semibold mb-2 tracking-tight">
                    {pillar.label}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <ScrollColorLine color="teal" />
      <section className="relative py-12 md:py-18 xl:py-20 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="teal">
            <div className="mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-50 block mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-[var(--neon-purple)]" />
                Core Modules
              </span>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold font-display tracking-tight">
                The Operating System Stack
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {CORE_FEATURES.map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} glow="teal">
                <div className="neon-edge-purple p-6 md:p-8 2xl:p-12 hover-lift">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 lg:gap-6">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 border border-[var(--neon-purple)]/20 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-[var(--neon-purple)] opacity-60" />
                        </div>
                        <h3 className="text-xl font-display font-bold tracking-tight">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed mt-3">
                        {feature.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-[var(--neon-purple)]/8 pt-4 lg:pt-0 lg:pl-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block mb-3">
                        Technical Details
                      </span>
                      <div className="space-y-2">
                        {feature.details.map((detail, didx) => (
                          <div
                            key={didx}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="w-1 h-1 rounded-full bg-[var(--neon-purple)] opacity-50 mt-1.5 flex-shrink-0" />
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
      <ScrollColorLine color="teal" />
      <section className="py-12 md:py-18 2xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal glow="teal">
            <div className="text-center mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-purple)] opacity-50 block mb-3">
                Software Architecture
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-3">
                Layered for Reliability
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
                Rigel OS is structured in layers — hardware drivers at the bottom,
                mission logic at the top, and a real-time execution engine
                orchestrating everything in between.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal glow="teal">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr_auto_2fr] gap-4 items-center">
              <div className="neon-edge-purple p-8 2xl:p-12 text-center hover-lift">
                <div className="text-[var(--neon-purple)] opacity-50 mb-2 flex justify-center">
                  <Layers className="w-8 h-8" />
                </div>
                <div className="text-lg font-display font-bold mb-1">
                  Hardware Abstraction
                </div>
                <p className="text-sm text-neutral-500">
                  Drivers, bus interfaces, sensor/actuator APIs
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 py-3 md:py-0 md:px-2">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/25 to-transparent" />
                <span className="font-mono text-[10px] text-[var(--neon-purple)] opacity-40 uppercase tracking-widest">
                  RTOS
                </span>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/25 to-transparent" />
              </div>

              <div className="neon-edge-purple p-8 2xl:p-12 text-center hover-lift border-[var(--neon-purple)]/40">
                <div className="text-[var(--neon-purple)] opacity-70 mb-2 flex justify-center">
                  <Cpu className="w-8 h-8" />
                </div>
                <div className="text-lg font-display font-bold mb-1">
                  Execution Engine
                </div>
                <p className="text-sm text-neutral-500">
                  Scheduler, state machine, sequencer, FDIR
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 py-3 md:py-0 md:px-2">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/25 to-transparent" />
                <span className="font-mono text-[10px] text-[var(--neon-purple)] opacity-40 uppercase tracking-widest">
                  API
                </span>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/25 to-transparent" />
              </div>

              <div className="neon-edge-purple p-8 2xl:p-12 text-center hover-lift">
                <div className="text-[var(--neon-purple)] opacity-50 mb-2 flex justify-center">
                  <GitBranch className="w-8 h-8" />
                </div>
                <div className="text-lg font-display font-bold mb-1">
                  Mission Logic
                </div>
                <p className="text-sm text-neutral-500">
                  Configurable objectives, scripts, and constraints
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal glow="teal">
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Scheduling Latency",
                  value: "<1ms",
                  sub: "Task dispatch to execution",
                },
                {
                  label: "Subsystems Managed",
                  value: "12+",
                  sub: "Concurrent autonomous control",
                },
                {
                  label: "Uptime Target",
                  value: "99.99%",
                  sub: "Designed for multi-year missions",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="neon-edge-purple p-6 2xl:p-10 text-center hover-lift"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold neon-text-purple mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-display text-white mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-600 font-mono">
                    {stat.sub}
                  </div>
                </div>
              ))}
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
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-2">
                Want to integrate Rigel OS?
              </h2>
              <p className="text-neutral-500 max-w-lg text-sm">
                We're working with spacecraft manufacturers and mission
                integrators to bring Rigel OS to flight. Reach out to discuss
                integration or licensing.
              </p>
            </div>
            <Link
              href="/contact"
              className="group px-7 py-3.5 bg-[var(--neon-purple)] text-white text-base font-semibold hover:bg-[var(--neon-purple)]/80 transition-all duration-300 flex items-center gap-2 flex-shrink-0 font-display uppercase tracking-wide"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
