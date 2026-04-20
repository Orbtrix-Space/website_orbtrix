import { Link } from "wouter";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Check, ArrowRight } from "lucide-react";

const PRODUCT_META: Record<string, { segment: string; subtitle: string; href: string }> = {
  disha: {
    segment: "Ground Segment",
    subtitle: "Ground Operations Platform",
    href: "/products/disha",
  },
  "rigel-os": {
    segment: "Onboard",
    subtitle: "Autonomous Onboard Operating Suite",
    href: "/products/rigel-os",
  },
};

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
        <text x="150" y="112" textAnchor="middle" fill="#9ca3af" fontSize="11" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Ground
        </text>
        <text x="150" y="150" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="500">
          DISHA
        </text>
        <text x="150" y="175" textAnchor="middle" fill="#71717a" fontSize="12">
          Operations Platform
        </text>
      </g>

      {/* Onboard node */}
      <g>
        <rect x="540" y="80" width="220" height="120" fill="url(#arch-node)" stroke="#2dd4bf" strokeOpacity="0.4" strokeWidth="1.2" />
        <text x="650" y="112" textAnchor="middle" fill="#9ca3af" fontSize="11" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          Onboard
        </text>
        <text x="650" y="150" textAnchor="middle" fill="#ffffff" fontSize="26" fontWeight="500">
          Rigel OS
        </text>
        <text x="650" y="175" textAnchor="middle" fill="#71717a" fontSize="12">
          Flight Software
        </text>
      </g>

      {/* Commands link */}
      <g>
        <line x1="260" y1="120" x2="540" y2="120" stroke="url(#arch-line)" strokeWidth="1.2" />
        <text x="400" y="108" textAnchor="middle" fill="#2dd4bf" fillOpacity="0.85" fontSize="11" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>
          Commands
        </text>
      </g>

      {/* Telemetry link */}
      <g>
        <line x1="540" y1="160" x2="260" y2="160" stroke="url(#arch-line)" strokeWidth="1.2" />
        <text x="400" y="180" textAnchor="middle" fill="#2dd4bf" fillOpacity="0.85" fontSize="11" letterSpacing="1.5" style={{ textTransform: "uppercase" }}>
          Telemetry
        </text>
      </g>
    </svg>
  );
}

export default function Products() {
  return (
    <div className="bg-black relative overflow-hidden">
      {/* Earth from space backdrop on header */}
      <div
        className="absolute top-0 left-0 right-0 h-[600px] opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-black/40 via-black/70 to-black pointer-events-none" />

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
          <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-teal-400/40" />
            Our Software
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight mb-6 text-gradient-teal">
            Products
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl break-words">
            The autonomous operations stack. Ground software and onboard
            intelligence that redefine how spacecraft are operated and scaled.
          </p>
          <div className="mt-8 w-16 h-px bg-teal-400/40" />
        </div>

        {/* Product Cards — strict symmetry between DISHA and Rigel OS */}
        <div className="space-y-8">
          {PRODUCTS.map((product, idx) => {
            const meta = PRODUCT_META[product.id];
            return (
              <ScrollReveal key={product.id} delay={idx * 0.1}>
                <article className="border border-teal-400/15 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-teal-400/45 transition-all duration-500 flex flex-col">
                  {/* Body — matching two-column grid with items-stretch */}
                  <div className="flex-1 p-8 md:p-10 xl:p-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
                    {/* Left: description column — flex so footer pins to bottom */}
                    <div className="lg:col-span-3 flex flex-col">
                      <span className="text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2 text-teal-400/70">
                        <span className="w-1.5 h-1.5 rounded-full pulse-dot bg-teal-400" />
                        {meta.segment}
                      </span>

                      <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium mb-2 text-white break-words">
                        {product.name}
                      </h2>
                      <p className="text-sm md:text-base text-teal-400/60 mb-6 break-words">
                        {meta.subtitle}
                      </p>

                      <p className="text-base md:text-lg text-neutral-400 leading-relaxed mb-8 break-words">
                        {product.description}
                      </p>

                      {/* Footer row — pinned to bottom via mt-auto */}
                      <div className="mt-auto flex items-center gap-4 flex-wrap">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/25 text-yellow-400/80 text-xs uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full pulse-dot" />
                          {product.status}
                        </span>

                        <Link
                          href={meta.href}
                          className="group inline-flex items-center gap-1.5 text-sm md:text-base text-teal-400/80 hover:text-teal-300 transition-colors"
                        >
                          View full details
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    {/* Right: capabilities column */}
                    <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-10 border-teal-400/15">
                      <span className="text-xs uppercase tracking-[0.3em] text-teal-400/60 block mb-5">
                        Capabilities
                      </span>
                      <ul className="space-y-3.5">
                        {product.features.map((feature, fidx) => (
                          <li
                            key={fidx}
                            className="flex items-start gap-3 text-sm md:text-base"
                          >
                            <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-teal-400/70" />
                            <span className="text-neutral-400 break-words">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* System Architecture — real SVG diagram */}
        <div className="mt-20 pt-16 border-t border-teal-400/15">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-400/70 block mb-4">
                System Architecture
              </span>
              <h3 className="text-3xl md:text-4xl font-medium text-white mb-3 break-words">
                One system, two halves
              </h3>
              <p className="text-sm md:text-base text-neutral-500 max-w-xl mx-auto break-words">
                Ground and onboard software, designed to work as one system.
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
