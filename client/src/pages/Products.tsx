import { PRODUCTS } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Check } from "lucide-react";

export default function Products() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-10 md:py-14 xl:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
            Our Software
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            Products
          </h1>
          <p className="text-lg xl:text-xl text-neutral-400 leading-relaxed max-w-2xl xl:max-w-3xl">
            Two software systems that form the autonomous operations stack — one
            on the ground, one in orbit. Together, they enable spacecraft to
            operate with minimal human intervention.
          </p>
          <div className="mt-8 w-16 h-px bg-white/20" />
        </div>

        {/* Product Cards */}
        <div className="space-y-12">
          {PRODUCTS.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 border border-white/[0.08] p-8 md:p-12 xl:p-14 hover:border-white/[0.12] transition-colors">
                {/* Left: Info */}
                <div className="lg:col-span-3">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.2em] block mb-4 ${
                      idx === 0 ? "text-cyan-400/50" : "text-purple-400/50"
                    }`}
                  >
                    {idx === 0 ? "Ground Segment" : "Space Segment"}
                  </span>

                  <h2 className="text-3xl xl:text-4xl font-bold mb-1">{product.name}</h2>
                  <p className="text-sm text-neutral-600 font-mono mb-6">
                    {product.name === "DISHA"
                      ? "Digital Infrastructure for Spacecraft Handling & Analytics"
                      : "Autonomous Onboard Operating Suite"}
                  </p>

                  <p className="text-neutral-400 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/20 text-yellow-400/70 text-xs font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 bg-yellow-400/50 rounded-full" />
                    {product.status}
                  </span>
                </div>

                {/* Right: Capabilities */}
                <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-8 lg:pt-0 lg:pl-10">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-6">
                    Capabilities
                  </span>
                  <div className="space-y-4">
                    {product.features.map((feature, fidx) => (
                      <div
                        key={fidx}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                            idx === 0
                              ? "text-cyan-400/40"
                              : "text-purple-400/40"
                          }`}
                        />
                        <span className="text-neutral-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Architecture */}
        <ScrollReveal>
          <div className="mt-14 pt-14 border-t border-white/[0.06]">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4 text-center">
              System Architecture
            </span>
            <h3 className="text-2xl font-bold text-center mb-14">
              Ground + Space Integration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              <div>
                <div className="text-2xl font-bold font-mono mb-2">DISHA</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 mb-3">
                  Ground Segment
                </div>
                <p className="text-sm text-neutral-500">
                  Command, telemetry, and operator decision support
                </p>
              </div>

              <div className="flex items-center justify-center py-4 md:py-0">
                <div className="w-full h-px bg-gradient-to-r from-cyan-400/15 via-white/[0.06] to-purple-400/15" />
              </div>

              <div>
                <div className="text-2xl font-bold font-mono mb-2">
                  Rigel OS
                </div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 mb-3">
                  Space Segment
                </div>
                <p className="text-sm text-neutral-500">
                  Autonomous GNC, mission logic, and onboard execution
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
