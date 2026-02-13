import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="min-h-[calc(100dvh-5rem)] flex items-center relative">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 w-full py-16">
          <motion.span
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 block mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Space Systems & Autonomy
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08] max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Autonomous spacecraft.
            <br />
            <span className="text-neutral-500">From LEO to the Moon.</span>
          </motion.h1>

          <motion.p
            className="text-neutral-400 text-base md:text-lg xl:text-xl max-w-xl xl:max-w-2xl mt-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            We build software-defined satellite systems — starting with
            commercial LEO missions that deliver Earth intelligence at radically
            lower economics, building toward lunar infrastructure.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold tracking-wide hover:bg-neutral-100 transition-colors"
            >
              Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/mission"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-sm font-medium text-white hover:border-white/40 hover:bg-white/[0.03] transition-all"
            >
              2028 Mission
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision Path */}
      <section className="py-14 md:py-20 xl:py-24 px-5 md:px-8 xl:px-12 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                The path to the Moon starts in LEO
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              {
                step: "Now",
                title: "Autonomous LEO Missions",
                desc: "Commercial Earth observation missions with onboard decision-making — delivering raw intelligence at a fraction of traditional costs.",
              },
              {
                step: "Near-term",
                title: "Scaled Operations",
                desc: "Multiple concurrent missions powered by DISHA and Rigel OS — our ground and onboard software stack that eliminates manual operations overhead.",
              },
              {
                step: "Long-term",
                title: "Lunar Infrastructure",
                desc: "Extending our autonomous operations framework to support sustained lunar missions — communications, navigation, and surface operations.",
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="bg-black p-8 md:p-10 h-full">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-400/60 block mb-6">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-14 md:py-20 xl:py-24 px-5 md:px-8 xl:px-12 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
                  Go-to-Market
                </span>
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight">
                  The software stack
                </h2>
              </div>
              <Link
                href="/products"
                className="group text-sm text-neutral-500 hover:text-white transition-colors flex items-center gap-1.5"
              >
                View all products
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0.05}>
              <Link href="/products" className="block group h-full">
                <div className="border border-white/[0.08] p-8 md:p-10 xl:p-12 hover:border-white/[0.15] transition-colors h-full flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-400/50 block mb-6">
                    Ground Segment
                  </span>
                  <h3 className="text-2xl font-bold mb-2">DISHA</h3>
                  <p className="text-sm text-neutral-600 font-mono mb-4">
                    Digital Infrastructure for Spacecraft Handling & Analytics
                  </p>
                  <p className="text-neutral-500 leading-relaxed text-sm flex-grow">
                    Automated ground operations — command sequencing, telemetry
                    analysis, and anomaly triage with minimal human intervention.
                  </p>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-neutral-600 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <Link href="/products" className="block group h-full">
                <div className="border border-white/[0.08] p-8 md:p-10 xl:p-12 hover:border-white/[0.15] transition-colors h-full flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-purple-400/50 block mb-6">
                    Space Segment
                  </span>
                  <h3 className="text-2xl font-bold mb-2">Rigel OS</h3>
                  <p className="text-sm text-neutral-600 font-mono mb-4">
                    Autonomous Onboard Operating Suite
                  </p>
                  <p className="text-neutral-500 leading-relaxed text-sm flex-grow">
                    Onboard spacecraft intelligence — real-time GNC, mission
                    execution, and autonomous decision-making without ground
                    dependency.
                  </p>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-neutral-600 group-hover:text-white transition-colors">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-14 md:py-20 xl:py-24 px-5 md:px-8 xl:px-12">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight mb-3">
                Interested in what we're building?
              </h2>
              <p className="text-neutral-500 max-w-lg">
                Whether it's payload hosting, technology collaboration, or
                joining the team — we'd like to hear from you.
              </p>
            </div>

            <Link
              href="/contact"
              className="group px-7 py-3.5 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all flex items-center gap-2 flex-shrink-0"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
