import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        {/* Abstract Grid Background */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Badge */}
            <span className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-xs font-mono text-neutral-400 mb-8 tracking-wider uppercase">
              Operational Autonomy
            </span>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight mb-8">
              AUTONOMOUS
              <br />
              <span className="text-neutral-500">SPACECRAFT &</span>
              <br />
              OPERATIONS
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Designing space systems that operate independently, respond faster,
              and scale sustainably. By shifting intelligence onboard, we reduce
              ground dependency, lower operational overhead, and enable resilient
              missions built for long-term performance.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="group px-8 py-4 bg-white text-black font-semibold tracking-wide hover:bg-neutral-200 transition-colors flex items-center gap-2"
              >
                View Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/mission"
                className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
              >
                2028 Demonstration Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          <div className="border-t border-white/20 pt-8">
            <h3 className="text-xl font-semibold mb-4 tracking-tight">
              01. Software-Defined Missions
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Mission behavior is driven by software, with hardware architected and
              optimized to support adaptability. This enables in-orbit updates,
              evolving capabilities, and extended mission lifetimes without
              physical intervention.
            </p>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-xl font-semibold mb-4 tracking-tight">
              02. Onboard Decision Making
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Critical decisions are executed directly on the spacecraft,
              reducing latency, improving responsiveness, and enabling faster
              reaction to dynamic conditions without waiting for ground commands.
            </p>
          </div>

          <div className="border-t border-white/20 pt-8">
            <h3 className="text-xl font-semibold mb-4 tracking-tight">
              03. Sustainable Scale
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              By minimizing continuous ground intervention, missions consume less
              energy, require smaller operations teams, and scale efficiently
              while supporting environmentally and economically sustainable
              space infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="border-y border-white/10 bg-neutral-900/20">
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Build missions that operate themselves
            </h2>
            <p className="text-neutral-400">
              Discover how autonomous operations can reduce cost, increase
              speed, and unlock sustainable mission growth.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors font-medium flex items-center gap-2"
          >
            Get in Touch <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
