import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import { DishaBg } from "@/components/DishaBg";
import {
  Activity,
  Shield,
  Layers,
  Brain,
  ArrowRight,
  Satellite,
  CalendarClock,
  BarChart3,
  Users,
  Building2,
  Rocket,
  Globe,
  Radio,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Shield,
    title: "AI-Based Anomaly Detection",
    desc: "Continuously monitors telemetry streams to detect abnormal patterns before they escalate into failures. Machine learning models identify subtle deviations across spacecraft subsystems that human operators would miss.",
    details: [
      "Automatically detect abnormal telemetry patterns",
      "Identify subtle deviations before failures occur",
      "Reduce manual monitoring workload by orders of magnitude",
      "Continuous model refinement from mission data",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced Flight Data Analysis",
    desc: "Transforms raw telemetry into actionable intelligence. DISHA analyzes historical and real-time flight data to surface trends, correlations, and behavioral patterns across the entire spacecraft fleet.",
    details: [
      "Analyze historical and real-time telemetry",
      "Identify trends in spacecraft behavior over time",
      "Generate actionable insights for operations teams",
      "Automated reporting and data visualization",
    ],
  },
  {
    icon: CalendarClock,
    title: "Mission Planning and Tasking",
    desc: "Intelligent scheduling that optimizes imaging windows, downlink contacts, power budgets, and payload operations. Constraint-aware planning eliminates operational conflicts and maximizes mission throughput.",
    details: [
      "Plan satellite operations and payload tasks efficiently",
      "Optimize mission timelines across the constellation",
      "Reduce operational conflicts and resource contention",
      "Dynamic re-planning in response to orbit anomalies",
    ],
  },
  {
    icon: Layers,
    title: "Unified Operations Interface",
    desc: "A single pane of glass that brings together telemetry monitoring, analytics, anomaly detection, and mission planning. No more switching between fragmented tools — DISHA provides a centralized operational view of the entire fleet.",
    details: [
      "Integrates telemetry, analytics, and mission planning",
      "Centralized operational view of the spacecraft fleet",
      "Configurable dashboards for different operator roles",
      "Real-time alerts and decision support workflows",
    ],
  },
];

const DIFFERENTIATORS = [
  {
    label: "Traditional software",
    desc: "Focuses on monitoring — displaying telemetry and waiting for operators to react.",
  },
  {
    label: "DISHA",
    desc: "Focuses on understanding spacecraft behavior — predicting issues, surfacing insights, and recommending actions before problems escalate.",
  },
];

const ADVANTAGES = [
  "AI-driven telemetry intelligence, not just visualization",
  "Built specifically for constellation-scale operations",
  "Modular architecture that adapts to any mission profile",
  "Designed for autonomous future missions from day one",
];

const TARGET_USERS = [
  {
    icon: Radio,
    title: "Satellite Operators",
    desc: "Reduce monitoring workload and shift from reactive to predictive operations. DISHA handles routine anomaly detection so your team can focus on mission-critical decisions.",
  },
  {
    icon: Globe,
    title: "Constellation Operators",
    desc: "Manage growing fleets without linearly scaling your operations team. DISHA is built for the complexity of multi-satellite operations from the ground up.",
  },
  {
    icon: Users,
    title: "Mission Operations Teams",
    desc: "Streamline planning, reduce manual analysis, and get actionable insights faster. DISHA integrates every operational workflow into a single platform.",
  },
  {
    icon: Building2,
    title: "Satellite Manufacturers",
    desc: "Offer intelligent operations as part of your platform. DISHA integrates with any spacecraft bus, providing a turnkey operations intelligence layer.",
  },
  {
    icon: Rocket,
    title: "Space Agencies",
    desc: "Modernize operations infrastructure for next-generation missions. DISHA brings AI-native tooling to institutional missions without replacing proven workflows.",
  },
];

export default function Disha() {
  return (
    <div>
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden py-20 md:py-28 xl:py-36 px-5 md:px-8 xl:px-12 2xl:px-24 min-h-[80vh] flex items-center">
        <DishaBg />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-white/20" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              Ground Operations Platform
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08] mb-6 max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Autonomous Operations for the Next Generation of Satellite Constellations
          </motion.h1>

          <motion.p
            className="text-neutral-400 text-lg md:text-xl xl:text-2xl max-w-3xl leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DISHA is a unified platform for AI-based telemetry anomaly detection,
            mission planning and tasking, flight data analysis, and operational
            intelligence — because traditional satellite operations do not scale
            for large constellations.
          </motion.p>

          <motion.p
            className="text-base font-mono text-neutral-500 opacity-60 mb-10 uppercase tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Digital Infrastructure for Spacecraft Handling & Analytics
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-base font-semibold tracking-wide hover:bg-neutral-200 transition-all duration-300 uppercase"
            >
              Request Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white text-base font-medium hover:bg-white/5 transition-all duration-300 uppercase"
            >
              Join Early Adopter Program
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. THE PROBLEM ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-6">
                Operations workflows built for a different era
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed">
                The space industry is entering the constellation era, but ground
                operations have not kept pace. The tools and processes that worked
                for single-satellite missions are fundamentally incompatible with
                the scale, speed, and complexity of modern constellations.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Constellations are growing exponentially",
                desc: "Satellite fleets are scaling from tens to hundreds of spacecraft. Every additional satellite multiplies operational complexity.",
              },
              {
                title: "Operations teams cannot scale linearly",
                desc: "Hiring more operators for every new satellite is unsustainable. Ground teams are already stretched thin managing existing assets.",
              },
              {
                title: "Manual telemetry monitoring",
                desc: "Operators manually review telemetry streams and investigate anomalies one by one — a process that does not scale beyond a handful of spacecraft.",
              },
              {
                title: "Fragmented mission planning tools",
                desc: "Scheduling, tasking, and resource management happen across disconnected tools, leading to conflicts and inefficiency.",
              },
              {
                title: "Slow, reactive insights",
                desc: "Operational intelligence is generated after the fact. By the time trends are identified, the window for action has already passed.",
              },
              {
                title: "No unified operational picture",
                desc: "Critical data lives in silos. Operators lack a single view of fleet health, mission status, and decision-relevant context.",
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-white/8 p-8 h-full hover-lift">
                  <h3 className="text-base font-semibold mb-3 tracking-tight">
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

      {/* ===== 3. THE SOLUTION ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                The Solution
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-6">
                DISHA — Operations intelligence, unified
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                DISHA is a next-generation operations intelligence platform that
                integrates mission planning, telemetry analysis, and anomaly
                detection into one system. It replaces fragmented tools and manual
                workflows with a single, AI-native platform purpose-built for
                constellation-scale operations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Brain, label: "Autonomous monitoring" },
                  { icon: Activity, label: "AI-assisted operations" },
                  { icon: BarChart3, label: "Real-time operational insight" },
                  { icon: Shield, label: "Decision support for operators" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-neutral-300">
                    <item.icon className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    <span className="text-base">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 4. KEY CAPABILITIES ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                Key Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                Core modules
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {CAPABILITIES.map((cap, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-white/8 p-8 md:p-10 xl:p-12 hover-lift">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                          <cap.icon className="w-5 h-5 text-neutral-400" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-neutral-400 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>

                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/8 pt-6 lg:pt-0 lg:pl-8">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block mb-4">
                        Details
                      </span>
                      <div className="space-y-3">
                        {cap.details.map((detail, didx) => (
                          <div key={didx} className="flex items-start gap-3 text-sm">
                            <span className="w-1 h-1 rounded-full bg-white/30 mt-2 flex-shrink-0" />
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

      {/* ===== 5. WHY DISHA IS DIFFERENT ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                Differentiation
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                Why DISHA is different
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {DIFFERENTIATORS.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className={`border border-white/8 p-8 md:p-10 h-full ${idx === 1 ? "bg-white/[0.02]" : ""}`}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-600 block mb-4">
                    {item.label}
                  </span>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="border border-white/8 p-8 md:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-600 block mb-6">
                Key Advantages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ADVANTAGES.map((adv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 flex-shrink-0" />
                    <span className="text-neutral-400 text-base">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 6. WHO IT IS FOR ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="mb-14">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                Built For
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                Who DISHA is for
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_USERS.map((user, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08}>
                <div className="border border-white/8 p-8 h-full hover-lift">
                  <user.icon className="w-6 h-6 text-neutral-500 mb-4" />
                  <h3 className="text-base font-semibold mb-3 tracking-tight">
                    {user.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {user.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. VISION ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-500 block mb-6">
                Vision
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-8">
                The intelligence layer for satellite operations
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-6">
                Space missions are moving toward fully autonomous operations.
                The volume of data, the speed of decision-making, and the scale
                of constellations demand a fundamentally different approach to
                ground operations.
              </p>
              <p className="text-neutral-400 text-lg leading-relaxed">
                DISHA aims to become that intelligence layer — enabling operators
                to manage large constellations with minimal manual intervention,
                shifting the role of ground teams from monitoring to oversight,
                and laying the foundation for fully autonomous mission operations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 8. CALL TO ACTION ===== */}
      <ScrollColorLine />
      <section className="py-16 md:py-24 xl:py-28 px-5 md:px-8 xl:px-12 2xl:px-24">
        <ScrollReveal>
          <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-4">
              Ready to transform your operations?
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg mb-10">
              We are working with early partners to validate DISHA on real
              mission data. Whether you want a demo, early access, or to
              collaborate on future mission operations — we want to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-base font-semibold tracking-wide hover:bg-neutral-200 transition-all duration-300 uppercase"
              >
                Request a Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white text-base font-medium hover:bg-white/5 transition-all duration-300 uppercase"
              >
                Join Early Adopter Program
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white text-base font-medium hover:bg-white/5 transition-all duration-300 uppercase"
              >
                Collaborate With Us
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
