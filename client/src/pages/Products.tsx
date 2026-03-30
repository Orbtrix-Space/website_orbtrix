import { Link } from "wouter";
import { PRODUCTS } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import { Check, ArrowRight } from "lucide-react";

export default function Products() {
  return (
    <>
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 md:py-14 xl:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-white/20" />
            Our Software
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 font-display">
            Products
          </h1>
          <p className="text-xl xl:text-2xl text-neutral-400 leading-relaxed max-w-2xl xl:max-w-3xl">
            The autonomous operations stack — ground software and onboard intelligence
            that redefine how spacecraft are operated and scaled.
          </p>
          <div className="mt-8 w-16 h-px bg-white/20/20" />
        </div>

        {/* Product Cards */}
        <div className="space-y-12">
          {PRODUCTS.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 0.1} glow={idx === 1 ? "teal" : "indigo"}>
              <div className={`${idx === 1 ? "neon-edge-purple" : "neon-edge"} p-10 md:p-12 xl:p-14 2xl:p-16 hover-lift`}>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-8 2xl:gap-10">
                  {/* Left: Info */}
                  <div className="lg:col-span-3">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.3em] block mb-4 flex items-center gap-2 opacity-50 ${
                        idx === 1 ? "text-neutral-400" : "text-neutral-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full pulse-dot ${
                        idx === 1 ? "bg-white/20" : "bg-white/20"
                      } opacity-60`} />
                      {idx === 0 ? "Ground Segment" : "Onboard"}

                    </span>

                    <h2 className="text-4xl xl:text-5xl font-bold mb-1 font-display">{product.name}</h2>
                    <p className="text-base text-neutral-600 font-mono mb-6">
                      {product.name === "DISHA"
                        ? "AI-Native Ground Operations Platform"
                        : product.name === "Rigel OS"
                          ? "Autonomous Onboard Operating Suite"
                          : ""}
                    </p>

                    <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/20 text-yellow-400/70 text-sm font-mono uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-yellow-400/50 rounded-full pulse-dot" />
                        {product.status}
                      </span>

                      <Link
                        href={idx === 0 ? "/products/disha" : "/products/rigel-os"}
                        className={`group inline-flex items-center gap-1.5 text-base opacity-60 hover:opacity-100 transition-opacity font-mono ${
                          idx === 1 ? "text-neutral-400" : "text-neutral-400"
                        }`}
                      >
                        View full details
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right: Capabilities */}
                  <div className={`lg:col-span-2 border-t lg:border-t-0 lg:border-l pt-8 lg:pt-0 lg:pl-10 ${
                    idx === 1 ? "border-white/10" : "border-white/10"
                  }`}>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-600 block mb-6">
                      Capabilities
                    </span>
                    <div className="space-y-4">
                      {product.features.map((feature, fidx) => (
                        <div
                          key={fidx}
                          className="flex items-start gap-3 text-base"
                        >
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 opacity-40 ${
                              idx === 1
                                ? "text-neutral-400"
                                : "text-neutral-400"
                            }`}
                          />
                          <span className="text-neutral-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Architecture */}
        <ScrollColorLine />
        <ScrollReveal glow="indigo">
          <div className="mt-14 pt-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 text-center">
              System Architecture
            </span>
            <h3 className="text-3xl font-bold text-center mb-14 font-display">
              The Complete Autonomous Stack
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr] gap-4 2xl:gap-6 items-center text-center max-w-3xl mx-auto">
              <div className="neon-edge p-8 2xl:p-12 hover-lift">
                <div className="text-2xl font-bold font-display mb-2 neon-text-cyan">DISHA</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 mb-3">
                  Ground
                </div>
                <p className="text-sm text-neutral-500">
                  AI-driven mission control
                </p>
              </div>

              <div className="flex items-center justify-center py-2 md:py-0">
                <div className="w-full h-px bg-white/10" />
              </div>

              <div className="neon-edge-purple p-8 2xl:p-12 hover-lift">
                <div className="text-2xl font-bold font-display mb-2 neon-text-purple">Rigel OS</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-600 mb-3">
                  Onboard
                </div>
                <p className="text-sm text-neutral-500">
                  Autonomous decision engine
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
