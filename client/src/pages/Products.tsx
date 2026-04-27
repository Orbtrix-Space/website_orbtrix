import { Link } from "wouter";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Check,
  ArrowRight,
  Eye,
  CalendarClock,
  Cpu,
  Layers,
} from "lucide-react";

interface ProductCard {
  id: string;
  name: string;
  segment: string;
  tagline: string;
  description: string;
  features: string[];
  status: "Available" | "In Development" | "In Research & Development";
  detailHref?: string;
  titleHint?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRODUCT_LIST: ProductCard[] = [
  {
    id: "disha",
    name: "DISHA",
    segment: "Ground Operations Platform",
    tagline: "The full ground operations platform.",
    description:
      "Anomaly detection, orbit determination, mission planning, and flight data analysis in one system. Built so a small operations team can run a constellation that used to need a much larger one.",
    features: [
      "Telemetry anomaly detection with recovery context",
      "Orbit determination and pass prediction",
      "Constraint-aware mission planning across the fleet",
      "Live and historical flight data analysis",
      "Unified console with full audit trail",
    ],
    status: "In Development",
    detailHref: "/disha",
    icon: Layers,
  },
  {
    id: "netra",
    name: "NETRA",
    segment: "Module of DISHA",
    tagline: "Fleet-wide intelligent monitoring.",
    description:
      "NETRA gives your operations team continuous visibility across every spacecraft in the fleet. Anomaly detection that learns from operational data and surfaces issues with context, not just alerts. Available standalone or as part of DISHA.",
    features: [
      "Multivariate anomaly detection across subsystems",
      "Recovery recommendations with every alert",
      "Fleet-wide telemetry visibility in one console",
      "Continuous learning from operational data",
    ],
    status: "Available",
    titleHint: "NETRA, Sanskrit for eye. The perception layer of DISHA.",
    icon: Eye,
  },
  {
    id: "kalpana",
    name: "KALPANA",
    segment: "Module of DISHA",
    tagline: "Mission planning and command for constellations.",
    description:
      "KALPANA builds conflict-free schedules, sends commands across your fleet, and re-plans automatically when conditions change. One operator can manage tasking for the entire constellation. Available standalone or as part of DISHA.",
    features: [
      "Constraint-aware scheduling across the fleet",
      "Automatic conflict resolution and re-planning",
      "Command execution with full audit trail",
      "Single console for fleet-wide tasking",
    ],
    status: "Available",
    titleHint:
      "KALPANA, meaning instruction or directive in Malayalam. The action layer of DISHA.",
    icon: CalendarClock,
  },
  {
    id: "rigel-os",
    name: "Rigel OS",
    segment: "Onboard Flight Software",
    tagline: "Onboard intelligence for autonomous spacecraft.",
    description:
      "Rigel OS is part of Orbtrix's long-term vision for end-to-end autonomous mission stacks. An onboard flight software layer designed to give spacecraft the ability to execute mission logic independently. Currently in early research and development.",
    features: [
      "Onboard mission logic and decision making",
      "Autonomous response to operational conditions",
      "Designed to work alongside DISHA for end-to-end autonomy",
      "Quiet development phase, more to share when ready",
    ],
    status: "In Research & Development",
    detailHref: "/rigel-os",
    icon: Cpu,
  },
];

const STATUS_STYLES: Record<ProductCard["status"], string> = {
  Available: "border-teal-600/50 text-teal-700 bg-teal-50",
  "In Development": "border-red-500/40 text-red-600",
  "In Research & Development": "border-red-500/40 text-red-600",
};

const STATUS_DOT: Record<ProductCard["status"], string> = {
  Available: "bg-teal-600",
  "In Development": "bg-red-500",
  "In Research & Development": "bg-red-500",
};

export default function Products() {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Subtle teal radial wash on header */}
      <div
        className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(20, 184, 166, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Ambient teal orbs */}
      <motion.div
        className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-16 md:py-20 xl:py-24 relative z-10">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-teal-600/60" />
            Our Software
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight mb-6 text-gradient-teal">
            Products
          </h1>
          <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl break-words">
            DISHA is our ground operations platform. NETRA and KALPANA are
            standalone modules that also work together inside DISHA. Rigel OS
            is our onboard flight software, in early research and development.
          </p>
          <div className="mt-8 w-16 h-px bg-teal-600/60" />
        </div>

        {/* Product Cards */}
        <div className="space-y-6">
          {PRODUCT_LIST.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.08}>
              <article
                id={product.id}
                className="border border-black/10 bg-white overflow-hidden hover:border-teal-500/60 transition-all duration-500 flex flex-col scroll-mt-24"
              >
                <div className="p-8 md:p-10 xl:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
                  {/* Left: identity + description */}
                  <div className="lg:col-span-3 flex flex-col">
                    <span className="text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2 text-teal-700">
                      <span className="w-1.5 h-1.5 rounded-full pulse-dot bg-teal-600" />
                      {product.segment}
                    </span>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 border border-teal-600/40 flex items-center justify-center flex-shrink-0">
                        <product.icon className="w-5 h-5 text-teal-600" />
                      </div>
                      <h2
                        className="text-3xl md:text-4xl xl:text-5xl font-medium text-neutral-900 break-words"
                        title={product.titleHint}
                      >
                        {product.name}
                      </h2>
                    </div>
                    <p className="text-sm md:text-base text-teal-700 mb-6 break-words">
                      {product.tagline}
                    </p>

                    <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8 break-words">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center gap-4 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs uppercase tracking-wider ${STATUS_STYLES[product.status]}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full pulse-dot ${STATUS_DOT[product.status]}`}
                        />
                        {product.status}
                      </span>

                      {product.detailHref && (
                        <Link
                          href={product.detailHref}
                          className="group inline-flex items-center gap-1.5 text-sm md:text-base text-teal-700 hover:text-teal-900 transition-colors font-medium"
                        >
                          View full details
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right: capabilities */}
                  <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-10 border-black/10">
                    <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-5">
                      Capabilities
                    </span>
                    <ul className="space-y-3.5">
                      {product.features.map((feature, fidx) => (
                        <li
                          key={fidx}
                          className="flex items-start gap-3 text-sm md:text-base"
                        >
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-600" />
                          <span className="text-neutral-700 break-words">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Footnote about NETRA and KALPANA names */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 text-center">
            <p className="text-xs text-neutral-500 italic max-w-2xl mx-auto leading-relaxed">
              NETRA, Sanskrit for eye. The perception layer of DISHA. KALPANA,
              meaning instruction or directive in Malayalam. The action layer
              of DISHA.
            </p>
          </div>
        </ScrollReveal>

        {/* Architecture */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4">
                System Architecture
              </span>
              <h3 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-3 break-words">
                One stack, ground to onboard
              </h3>
              <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto break-words">
                DISHA on the ground. Rigel OS in flight. Designed to work as
                one system.
              </p>
            </div>

            <div className="px-4">
              <ArchitectureDiagram />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 800 260"
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Ground and onboard software connected by a bidirectional link"
    >
      <defs>
        <linearGradient id="arch-node" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="arch-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Ground node */}
      <g>
        <rect x="40" y="80" width="220" height="120" fill="url(#arch-node)" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="1.2" />
        <text x="150" y="112" textAnchor="middle" fill="#525252" fontSize="11" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Ground
        </text>
        <text x="150" y="150" textAnchor="middle" fill="#0a0a0a" fontSize="26" fontWeight="500">
          DISHA
        </text>
        <text x="150" y="175" textAnchor="middle" fill="#737373" fontSize="12">
          Operations Platform
        </text>
      </g>

      {/* Onboard node */}
      <g>
        <rect x="540" y="80" width="220" height="120" fill="url(#arch-node)" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="1.2" />
        <text x="650" y="112" textAnchor="middle" fill="#525252" fontSize="11" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Onboard
        </text>
        <text x="650" y="150" textAnchor="middle" fill="#0a0a0a" fontSize="26" fontWeight="500">
          Rigel OS
        </text>
        <text x="650" y="175" textAnchor="middle" fill="#737373" fontSize="12">
          Flight Software
        </text>
      </g>

      {/* Commands link */}
      <g>
        <line x1="260" y1="120" x2="540" y2="120" stroke="url(#arch-line)" strokeWidth="1.2" />
        <text x="400" y="108" textAnchor="middle" fill="#0f766e" fillOpacity="0.85" fontSize="11" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>
          Commands
        </text>
      </g>

      {/* Telemetry link */}
      <g>
        <line x1="540" y1="160" x2="260" y2="160" stroke="url(#arch-line)" strokeWidth="1.2" />
        <text x="400" y="180" textAnchor="middle" fill="#0f766e" fillOpacity="0.85" fontSize="11" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>
          Telemetry
        </text>
      </g>
    </svg>
  );
}
