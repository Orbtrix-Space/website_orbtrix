import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TelemetryStream } from "@/components/TelemetryStream";
import { GroundStationAnimation } from "@/components/GroundStationAnimation";
import {
  Shield,
  Layers,
  ArrowRight,
  CalendarClock,
  BarChart3,
  Globe,
  Building2,
  Orbit,
  Eye,
  Check,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Shield,
    title: "Telemetry Anomaly Detection",
    desc: "Continuously watches telemetry across the fleet and flags deviations before they escalate. Every alert comes with a recommended recovery action drawn from prior mission experience.",
    details: [
      "Multivariate detection across subsystems",
      "Recovery recommendations with every alert",
      "Operator-in-the-loop or autonomous response",
      "Continuous refinement from operational data",
    ],
  },
  {
    icon: Orbit,
    title: "Orbit Determination and Tracking",
    desc: "Maintains accurate orbital state for every spacecraft in the fleet. Predicts ground station passes, imaging windows, and conjunction events, and updates automatically as new tracking data arrives.",
    details: [
      "Live orbital state estimation",
      "Pass prediction for ground contacts",
      "Conjunction awareness and risk assessment",
      "Automatic updates from tracking data",
    ],
  },
  {
    icon: CalendarClock,
    title: "Mission Planning and Scheduling",
    desc: "Builds conflict-free schedules that respect power, thermal, and attitude constraints. Re-plans automatically when something changes. One operator can manage planning for the entire constellation.",
    details: [
      "Constraint-aware scheduling",
      "Automatic conflict resolution",
      "Fleet-wide planning from one console",
      "Re-planning on anomalies or new tasking",
    ],
  },
  {
    icon: BarChart3,
    title: "Flight Data Analysis",
    desc: "Live and archived telemetry queried together. Surface drift, degradation, and cross-satellite patterns without writing custom scripts. Answers, not dashboards to assemble.",
    details: [
      "Live and historical telemetry unified",
      "Cross-satellite trend comparison",
      "Automated drift and degradation reports",
      "Export for post-mission review",
    ],
  },
  {
    icon: Layers,
    title: "Unified Fleet Operations",
    desc: "Planning, monitoring, command and control, analysis, and response in one console. Role-based views for operators, engineers, and managers, with a full audit trail of every action.",
    details: [
      "One console for all operational workflows",
      "Single-spacecraft and fleet-wide commanding",
      "Role-based dashboards and shared awareness",
      "Full audit trail of automated and manual actions",
    ],
  },
];

const TARGET_USERS = [
  {
    icon: Globe,
    title: "Constellation Operators",
    desc: "Teams running 5 to 50 spacecraft today, scaling toward more. DISHA reduces operational overhead per satellite so growth does not require a proportional growth in ops headcount.",
  },
  {
    icon: Building2,
    title: "Satellite Manufacturers",
    desc: "Manufacturers offering ground operations as part of a turnkey delivery. Integrates with any spacecraft bus and gives customers a modern operations layer out of the box.",
  },
];

const VALUE_STATEMENTS = [
  {
    title: "One operator, one fleet",
    desc: "Team size decoupled from fleet size.",
  },
  {
    title: "Oversee, not operate",
    desc: "Hours of manual work become minutes of review.",
  },
  {
    title: "Continuous coverage",
    desc: "Monitoring without shift handoffs.",
  },
  {
    title: "Single source of truth",
    desc: "Every spacecraft, every workflow, in one console.",
  },
];

const MODULES = [
  {
    name: "NETRA",
    tagline: "Fleet-wide intelligent monitoring.",
    icon: Eye,
    description:
      "NETRA gives your operations team continuous visibility across every spacecraft in the fleet, with anomaly detection that learns from operational data and surfaces issues with context, not just alerts.",
    bullets: [
      "Multivariate anomaly detection across subsystems",
      "Recovery recommendations with every alert",
      "Fleet-wide telemetry visibility in one console",
      "Continuous learning from operational data",
    ],
    href: "/products#netra",
    titleHint: "NETRA, Sanskrit for eye. The perception layer of DISHA.",
  },
  {
    name: "KALPANA",
    tagline: "Mission planning and command for constellations.",
    icon: CalendarClock,
    description:
      "KALPANA builds conflict-free schedules, sends commands across your fleet, and re-plans automatically when conditions change. One operator can manage tasking for the entire constellation.",
    bullets: [
      "Constraint-aware scheduling across the fleet",
      "Automatic conflict resolution and re-planning",
      "Command execution with full audit trail",
      "Single console for fleet-wide tasking",
    ],
    href: "/products#kalpana",
    titleHint:
      "KALPANA, meaning instruction or directive in Malayalam. The action layer of DISHA.",
  },
];

function TealAmbient() {
  return (
    <>
      <motion.div
        className="absolute top-0 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function TealDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent" />
  );
}

export default function Disha() {
  return (
    <div className="bg-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden py-16 md:py-20 xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[70vh] flex items-center bg-teal-gradient">
        <TealAmbient />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-px bg-teal-600/50" />
                <span className="text-xs uppercase tracking-[0.3em] text-teal-700">
                  Ground Operations Platform
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.08] mb-6 text-gradient-teal break-words"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Autonomous operations for the next generation of satellite constellations
              </motion.h1>

              <motion.p
                className="text-neutral-700 text-base md:text-lg lg:text-xl leading-relaxed mb-4 break-words"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                DISHA is a ground operations platform built for constellation-scale
                missions. Anomaly detection, orbit determination, mission planning,
                and flight data analysis in one system. Designed to give a small
                operations team the reach of a much larger one.
              </motion.p>

              <motion.p
                className="text-xs md:text-sm text-teal-700 mb-8 uppercase tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Digital Infrastructure for Spacecraft Handling &amp; Analytics
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="https://forms.office.com/r/btRMdhuk4E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black text-white text-sm font-semibold tracking-wide hover:bg-teal-600 transition-all duration-300 uppercase"
                >
                  Join Early Adopter Program
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-teal-600 text-neutral-900 text-sm font-medium hover:bg-teal-600/10 hover:border-teal-700 transition-all duration-300 uppercase"
                >
                  Talk to Our Team
                </Link>
              </motion.div>

              <motion.p
                className="text-xs text-neutral-500 mt-4 max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Early adopters get co-development access and founding-customer terms.
              </motion.p>
            </div>

            {/* Right: ground station visual */}
            <motion.div
              className="flex justify-center items-center order-first lg:order-last"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              aria-hidden="true"
            >
              <div className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[420px]">
                <GroundStationAnimation />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== LIVE MISSION CONSOLE (compressed copy) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 lg:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-center">
            <ScrollReveal>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                  <span className="w-5 h-px bg-teal-600/50" />
                  How DISHA handles anomalies
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-5 text-neutral-900">
                  Detect. Diagnose. Rectify.
                </h2>
                <p className="text-neutral-700 text-base md:text-lg leading-relaxed mb-3">
                  An illustrative event flow, not a screenshot of the product.
                  It shows how DISHA approaches operational events end to end,
                  from anomaly detection to recommendation to resolution, with
                  the operator in the loop.
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  The real interface is built for mission operators, not
                  marketing pages. We will share more when partner deployments
                  begin.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <TelemetryStream />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== MODULES (NEW) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Modules
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-neutral-900">
                NETRA and KALPANA. Available now.
              </h2>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Two modules of DISHA, available standalone or together. Adopt
                what you need now, integrate the rest as you scale.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {MODULES.map((m, idx) => (
              <ScrollReveal key={m.name} delay={idx * 0.1}>
                <div className="border border-black/10 bg-white p-7 md:p-9 h-full flex flex-col hover:border-teal-500/60 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 border border-teal-600/40 flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-900"
                      title={m.titleHint}
                    >
                      {m.name}
                    </h3>
                  </div>

                  <p className="text-sm md:text-base text-teal-700 mb-4 break-words">
                    {m.tagline}
                  </p>

                  <p className="text-neutral-700 text-base leading-relaxed mb-6 break-words">
                    {m.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {m.bullets.map((b, bidx) => (
                      <li key={bidx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-600" />
                        <span className="text-neutral-600 break-words">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={m.href}
                    className="group inline-flex items-center gap-1.5 text-sm md:text-base text-teal-700 hover:text-teal-900 transition-colors font-medium"
                  >
                    Learn more about {m.name}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROBLEM (3 items) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-neutral-900">
                Ground operations stuck in a different era
              </h2>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                Constellations are scaling faster than the tools that run them.
                Operators are hitting the same structural limits.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Constellations outpace ground tools",
                desc: "Fleets are growing from tens to hundreds of spacecraft. The ground side is the bottleneck, not the bus.",
              },
              {
                title: "Ops teams cannot scale linearly",
                desc: "Hiring one more operator for every new satellite is not a business model. Trained mission operators are not hired at that pace.",
              },
              {
                title: "Critical information sits in silos",
                desc: "Planning in one tool, telemetry in another, analytics elsewhere. Operators spend real time reconciling views instead of running missions.",
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-black/10 bg-white p-7 h-full hover:border-teal-500/60 transition-all duration-500">
                  <h3 className="text-base font-semibold mb-3 tracking-tight text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY DISHA (collapsed) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Why DISHA
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-neutral-900">
                From reactive monitoring to intelligent oversight
              </h2>
              <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
                DISHA shifts the operator role from watching telemetry and
                reacting to alerts, to overseeing a system that detects,
                diagnoses, and responds with context. The fleet stays in nominal
                operations. Humans focus on decisions that matter.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUE_STATEMENTS.map((v, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-black/10 bg-white p-6 h-full hover:border-teal-500/60 transition-all duration-500">
                  <div className="text-xl md:text-2xl font-medium text-gradient-teal mb-3 break-words leading-snug">
                    {v.title}
                  </div>
                  <div className="text-sm text-neutral-600 leading-relaxed break-words">
                    {v.desc}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY CAPABILITIES ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900">
                Across the platform
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {CAPABILITIES.map((cap, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="border border-black/10 bg-white p-7 md:p-9 hover:border-teal-500/70 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 border border-teal-600/40 flex items-center justify-center flex-shrink-0">
                          <cap.icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900 break-words">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-black/10 pt-5 lg:pt-0 lg:pl-8">
                      <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-3">
                        Details
                      </span>
                      <div className="space-y-2.5">
                        {cap.details.map((detail, didx) => (
                          <div key={didx} className="flex items-start gap-3 text-sm">
                            <span className="w-1 h-1 rounded-full bg-teal-600 mt-2 flex-shrink-0" />
                            <span className="text-neutral-600">{detail}</span>
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

      {/* ===== BUILT FOR (2 items) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Built For
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900">
                Who DISHA is for
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {TARGET_USERS.map((user, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-black/10 bg-white p-8 md:p-10 h-full hover:border-teal-500/60 transition-all duration-500">
                  <div className="w-10 h-10 border border-teal-600/40 flex items-center justify-center mb-5">
                    <user.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium mb-3 tracking-tight text-neutral-900 break-words">
                    {user.title}
                  </h3>
                  <p className="text-neutral-700 text-base leading-relaxed break-words">
                    {user.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION (one sentence) ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[140px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #14b8a6 0%, transparent 70%)" }}
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-5">
                Vision
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-8 text-gradient-teal">
                Intelligent ground operations as the foundation for autonomous space systems.
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://forms.office.com/r/btRMdhuk4E"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-black text-white text-sm font-semibold tracking-wide hover:bg-teal-600 transition-all duration-300 uppercase"
                >
                  Join Early Adopter Program
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-teal-600 text-neutral-900 text-sm font-medium hover:bg-teal-600/10 hover:border-teal-700 transition-all duration-300 uppercase"
                >
                  Talk to Our Team
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
