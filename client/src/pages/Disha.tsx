import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TelemetryStream } from "@/components/TelemetryStream";
import { GroundStationAnimation } from "@/components/GroundStationAnimation";
import {
  Activity,
  Shield,
  Layers,
  Brain,
  ArrowRight,
  CalendarClock,
  BarChart3,
  Users,
  Building2,
  Rocket,
  Globe,
  Radio,
  Orbit,
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

const DIFFERENTIATORS = [
  {
    label: "Traditional tools",
    desc: "Built for an earlier era of space operations. Show telemetry, raise alerts, and wait for the operator to react. Scaling the fleet means scaling the ops team.",
  },
  {
    label: "DISHA",
    desc: "Understands spacecraft behavior, surfaces issues with context, and recommends or executes corrective action. Designed so one operator can oversee an entire fleet.",
  },
];

const ADVANTAGES = [
  "Fleet-wide visibility from a single console",
  "Intelligent detection, not static thresholds",
  "Recovery recommendations with every alert",
  "Designed to scale with your constellation",
];

const TARGET_USERS = [
  {
    icon: Radio,
    title: "Satellite Operators",
    desc: "Teams running 5 to 50 spacecraft today, scaling toward more. DISHA reduces operational overhead per satellite so growth does not require a proportional growth in ops headcount.",
  },
  {
    icon: Globe,
    title: "Constellation Operators",
    desc: "Operators of 50+ satellite fleets in Earth observation, communications, and technology demonstration. Designed for multi-spacecraft operations from day one.",
  },
  {
    icon: Users,
    title: "Mission Operations Teams",
    desc: "Mission control teams looking for a single pane of glass across planning, monitoring, and response. Replaces a stack of tools with one integrated workflow.",
  },
  {
    icon: Building2,
    title: "Satellite Manufacturers",
    desc: "Manufacturers offering ground operations as part of a turnkey delivery. Integrates with any spacecraft bus and gives customers a modern operations layer out of the box.",
  },
  {
    icon: Rocket,
    title: "Space Agencies",
    desc: "Institutional missions modernizing ground infrastructure. Introduces automation without forcing replacement of proven procedures.",
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
    <div className="h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent" />
  );
}

export default function Disha() {
  return (
    <div className="bg-black">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden py-16 md:py-20 xl:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[70vh] flex items-center bg-teal-gradient">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        />
        <TealAmbient />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="w-8 h-px bg-teal-400/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-teal-400/80">
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
                className="text-neutral-400 text-base md:text-lg lg:text-xl leading-relaxed mb-4 break-words"
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
                className="text-xs md:text-sm text-teal-400/60 mb-8 uppercase tracking-wider"
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
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold tracking-wide hover:bg-teal-300 transition-all duration-300 uppercase"
                >
                  Join Early Adopter Program
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/contact?message=I%20would%20like%20to%20talk%20to%20the%20DISHA%20team."
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-teal-400/40 text-white text-sm font-medium hover:bg-teal-400/10 hover:border-teal-400/60 transition-all duration-300 uppercase"
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
              className="hidden lg:flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              aria-hidden="true"
            >
              <GroundStationAnimation size={420} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. LIVE MISSION CONSOLE ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 lg:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-center">
            <ScrollReveal>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                  <span className="w-5 h-px bg-teal-400/40" />
                  Live Mission Console
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-5 text-white">
                  Detect. Diagnose. Rectify.
                </h2>
                <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-4">
                  DISHA does not just surface anomalies. It correlates telemetry,
                  retrieves the relevant recovery procedure, and executes or
                  recommends corrective action with a human in the loop when needed.
                </p>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  The stream on the right is a simulated console showing thermal
                  drift, communication loss, power imbalance, and conjunction
                  events. Each one resolved end to end.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { value: "Near real-time", label: "Anomaly detection" },
                    { value: "High auto-resolution", label: "Routine events" },
                    { value: "Low false-positive", label: "Operator confidence" },
                    { value: "Fleet-wide", label: "Operational view" },
                  ].map((s, i) => (
                    <div key={i} className="border border-teal-400/15 bg-black/40 p-4">
                      <div className="text-base md:text-lg font-medium text-gradient-teal mb-1 break-words">
                        {s.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-neutral-500 break-words">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <TelemetryStream />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== 3. THE PROBLEM ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white">
                Ground operations stuck in a different era
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                Constellations are scaling faster than the tools that run them.
                Operators are hitting the same structural limits, and there is
                no incremental path through them.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Constellations outpace ground operations",
                desc: "Fleets are growing from tens to hundreds of spacecraft. The ground side is the bottleneck, not the bus.",
              },
              {
                title: "Teams cannot scale linearly",
                desc: "Hiring one more operator for every new satellite is not a business model, and trained mission operators are not hired at that pace.",
              },
              {
                title: "Legacy tools, legacy workflows",
                desc: "Most mission control software was designed for single-spacecraft missions. Static rules, no cross-correlation, no learning from past events.",
              },
              {
                title: "Critical information in silos",
                desc: "Planning in one tool, telemetry in another, analytics elsewhere. Operators spend real time reconciling views instead of running missions.",
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-teal-400/15 bg-black/40 backdrop-blur-sm p-7 h-full hover:border-teal-400/40 transition-all duration-500">
                  <h3 className="text-base font-semibold mb-3 tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. WHY DISHA MATTERS ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black pointer-events-none" />
        <TealAmbient />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                Why DISHA Matters
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white">
                What DISHA unlocks
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                The shift from reactive operations to intelligent oversight.
                Here is what that looks like day to day.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                value: "One operator, one fleet",
                label: "Team size decoupled from fleet size",
              },
              {
                value: "Oversee, don't operate",
                label: "Hours of manual work become minutes of review",
              },
              {
                value: "Continuous coverage",
                label: "Monitoring without shift handoffs",
              },
              {
                value: "One fleet, one view",
                label: "Every spacecraft in a single console",
              },
            ].map((m, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-teal-400/15 bg-black/60 backdrop-blur-sm p-6 h-full hover:border-teal-400/40 transition-all duration-500">
                  <div className="text-xl md:text-2xl font-medium text-gradient-teal mb-3 break-words leading-snug">
                    {m.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500 leading-relaxed break-words">
                    {m.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. THE SOLUTION ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-15 pointer-events-none hidden lg:block">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #14b8a6 0%, transparent 70%)" }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                The Solution
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-5 text-gradient-teal">
                One platform for mission operations
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6">
                DISHA unifies the full ground operations workflow. Anomaly
                detection across the fleet. Orbit determination and tracking.
                Mission planning and scheduling. Flight data analysis.
                Command and control with automated event response and operator
                decision support. All from one console.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {[
                  { icon: Brain, label: "Continuous anomaly monitoring" },
                  { icon: Activity, label: "Operator decision support" },
                  { icon: BarChart3, label: "Fleet-wide visibility" },
                  { icon: Shield, label: "Automated event response" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-neutral-300">
                    <item.icon className="w-5 h-5 text-teal-400/80 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 6. KEY CAPABILITIES ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                Key Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                Core modules
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {CAPABILITIES.map((cap, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="border border-teal-400/15 bg-black/40 backdrop-blur-sm p-7 md:p-9 hover:border-teal-400/45 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
                          <cap.icon className="w-5 h-5 text-teal-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white break-words">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-teal-400/15 pt-5 lg:pt-0 lg:pl-8">
                      <span className="text-xs uppercase tracking-[0.3em] text-teal-400/60 block mb-3">
                        Details
                      </span>
                      <div className="space-y-2.5">
                        {cap.details.map((detail, didx) => (
                          <div key={didx} className="flex items-start gap-3 text-sm">
                            <span className="w-1 h-1 rounded-full bg-teal-400/60 mt-2 flex-shrink-0" />
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

      {/* ===== 7. DIFFERENTIATION ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                Differentiation
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                Why DISHA is different
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {DIFFERENTIATORS.map((item, idx) => {
              const isDisha = idx === 1;
              return (
                <ScrollReveal key={idx} delay={idx * 0.1}>
                  <div
                    className={`border p-8 md:p-10 h-full transition-all duration-500 ${
                      isDisha
                        ? "border-teal-400/50 bg-teal-400/[0.04]"
                        : "border-white/10 bg-black/40"
                    }`}
                  >
                    <span
                      className={`text-xs uppercase tracking-[0.3em] block mb-4 break-words ${
                        isDisha ? "text-teal-400" : "text-neutral-500"
                      }`}
                    >
                      {item.label}
                    </span>
                    <p className="text-neutral-300 text-base md:text-lg leading-relaxed break-words">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="border border-teal-400/15 bg-black/40 backdrop-blur-sm p-7 md:p-9">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-5">
                Key advantages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADVANTAGES.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/70 mt-2 flex-shrink-0" />
                    <span className="text-neutral-400 text-sm md:text-base break-words">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 8. BUILT FOR ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <TealAmbient />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-400/40" />
                Built For
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white">
                Who DISHA is for
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_USERS.map((user, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="border border-teal-400/15 bg-black/40 backdrop-blur-sm p-7 h-full hover:border-teal-400/40 transition-all duration-500">
                  <user.icon className="w-6 h-6 text-teal-400/80 mb-4" />
                  <h3 className="text-base font-semibold mb-3 tracking-tight text-white break-words">
                    {user.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed break-words">
                    {user.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. VISION ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-[140px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #14b8a6 0%, transparent 70%)" }}
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-5">
                Vision
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 text-gradient-teal">
                The ground layer for autonomous operations
              </h2>
              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                Space operations are moving toward greater autonomy. The ground
                side of that shift needs software that helps operators oversee
                rather than operate, and that scales with the fleet, not against
                it. DISHA is building that ground layer.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 10. CTA ===== */}
      <TealDivider />
      <section className="py-16 md:py-20 lg:py-24 px-5 md:px-8 xl:px-12 2xl:px-24 relative overflow-hidden bg-teal-gradient">
        <TealAmbient />
        <ScrollReveal>
          <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-white">
              Work with us on DISHA
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg mb-3">
              We are selecting a small set of partner operators for
              co-development and first deployment.
            </p>
            <p className="text-neutral-500 max-w-2xl mx-auto text-sm mb-8">
              Early adopters get co-development access and founding-customer terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://forms.office.com/r/btRMdhuk4E"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold tracking-wide hover:bg-teal-300 transition-all duration-300 uppercase"
              >
                Join Early Adopter Program
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact?message=I%20would%20like%20to%20talk%20to%20the%20DISHA%20team."
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-teal-400/40 text-white text-sm font-medium hover:bg-teal-400/10 hover:border-teal-400/60 transition-all duration-300 uppercase"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
