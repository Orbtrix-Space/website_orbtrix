import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypewriterText } from "@/components/TypewriterText";
import { SpinningEarth } from "@/components/SpinningEarth";

function useResponsiveEarthSize() {
  const [size, setSize] = useState(380);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1920) setSize(560);
      else if (w >= 1440) setSize(480);
      else if (w >= 1024) setSize(360);
      else if (w >= 768) setSize(320);
      else if (w >= 480) setSize(260);
      else setSize(200);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return size;
}

export default function Home() {
  const earthSize = useResponsiveEarthSize();

  return (
    <div className="w-full bg-white">
      {/* ===== HERO ===== */}
      <section className="relative w-full min-h-[calc(100dvh-4rem)] flex items-center overflow-hidden bg-white">
        {/* Ambient teal orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-[400px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.1, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="
            w-full max-w-[1800px] mx-auto
            px-5 md:px-8 lg:px-12 min-[1440px]:px-24
            py-10 md:py-[60px] lg:py-[90px] min-[1440px]:py-[120px]
            relative z-10
          "
        >
          <div
            className="
              grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]
              gap-10 md:gap-12 lg:gap-16
              items-center
            "
          >
            {/* ===== Left: Copy ===== */}
            <div className="order-1 text-center lg:text-left">
              <motion.div
                className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-teal-700 mb-5 flex items-center gap-3 justify-center lg:justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-8 h-px bg-teal-600/60" />
                <span>Space Systems &amp; Autonomy</span>
              </motion.div>

              <motion.h1
                className="
                  text-[32px] sm:text-[40px] md:text-[44px]
                  lg:text-[56px] xl:text-[64px]
                  min-[1440px]:text-[80px] min-[1920px]:text-[96px]
                  font-medium tracking-tight leading-[1.05] text-gradient-teal
                  break-words
                "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Every orbit.<br />
                Every planet.<br />
                Absolute autonomy.
              </motion.h1>

              <motion.div
                className="mt-6 md:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-neutral-600 text-sm md:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-3">
                  We build the software that makes spacecraft think for themselves,
                  from ground operations to onboard decision making.
                </p>
                <div className="h-6">
                  <TypewriterText
                    texts={[
                      "Autonomous operations in orbit",
                      "Software defined spacecraft",
                      "DISHA. Ground operations platform",
                      "Rigel OS. Onboard flight software",
                    ]}
                    className="text-teal-600 text-xs md:text-sm"
                  />
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 mt-8 md:mt-10 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Link
                  href="/products"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-sm font-semibold tracking-wide hover:bg-teal-600 transition-all duration-300 uppercase"
                >
                  Our Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-teal-600/60 text-neutral-900 text-sm font-medium hover:bg-teal-600/5 hover:border-teal-500/70 transition-all duration-300 uppercase"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>

            {/* ===== Right: Earth visualization ===== */}
            <motion.div
              className="order-2 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <SpinningEarth size={earthSize} />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-teal-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent" />

      {/* ===== Vision Path ===== */}
      <section className="py-16 md:py-20 lg:py-24 min-[1440px]:py-28 px-5 md:px-8 lg:px-12 min-[1440px]:px-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <span className="text-[11px] uppercase tracking-[0.3em] text-teal-700 block mb-3 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/60" />
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900">
                A staged platform roadmap
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: "Now",
                title: "Software for autonomous LEO",
                desc: "Building and validating our ground and onboard software with early operator partners running commercial Earth observation programs.",
              },
              {
                step: "Near term",
                title: "Constellation-scale platform",
                desc: "DISHA and Rigel OS adopted across operators managing multi-spacecraft fleets. Replacing manual workflows with intelligent automation.",
              },
              {
                step: "Long term",
                title: "Beyond Earth orbit",
                desc: "Our autonomous operations stack extending to support missions in higher orbits and the wider off-Earth software ecosystem.",
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="border border-black/10 bg-white/40 backdrop-blur-sm p-6 md:p-8 h-full hover:border-teal-500/60 transition-all duration-500">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-teal-700 block mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 pulse-dot" />
                    {item.step}
                  </span>
                  <h3 className="text-lg md:text-xl font-medium mb-3 tracking-tight text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent" />

      {/* ===== Products Preview ===== */}
      <section className="py-16 md:py-20 lg:py-24 min-[1440px]:py-28 px-5 md:px-8 lg:px-12 min-[1440px]:px-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-[1800px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-teal-700 block mb-3 flex items-center gap-3">
                  <span className="w-5 h-px bg-teal-600/60" />
                  Core Systems
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900">
                  The software stack
                </h2>
              </div>
              <Link
                href="/products"
                className="group text-sm md:text-base text-teal-700 hover:text-teal-900 transition-colors flex items-center gap-1.5 self-start md:self-auto"
              >
                View all products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal delay={0.05}>
              <Link href="/products/disha" className="block group h-full">
                <div className="border border-black/10 bg-white/40 backdrop-blur-sm p-8 md:p-10 h-full flex flex-col hover:border-teal-500/70 transition-all duration-500">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-teal-700 block mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 pulse-dot" />
                    Ground
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2 text-neutral-900">DISHA</h3>
                  <p className="text-xs md:text-sm text-teal-600 mb-4">
                    AI Native Ground Ops
                  </p>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base flex-grow">
                    Automated monitoring, AI based anomaly detection, mission
                    planning, and fleet management.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-teal-700 group-hover:text-teal-900 transition-colors">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Link href="/products/rigel-os" className="block group h-full">
                <div className="border border-black/10 bg-white/40 backdrop-blur-sm p-8 md:p-10 h-full flex flex-col hover:border-teal-500/70 transition-all duration-500">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-teal-700 block mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 pulse-dot" />
                    Onboard
                  </span>
                  <h3 className="text-2xl md:text-3xl font-medium mb-2 text-neutral-900">Rigel OS</h3>
                  <p className="text-xs md:text-sm text-teal-600 mb-4">
                    Autonomous OS
                  </p>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base flex-grow">
                    Onboard GNC, FDIR, data processing, and autonomous mission
                    execution.
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-teal-700 group-hover:text-teal-900 transition-colors">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent" />

      {/* ===== Stats ===== */}
      <section className="py-16 md:py-20 px-5 md:px-8 lg:px-12 min-[1440px]:px-24 bg-white">
        <div className="max-w-[1800px] mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 text-center">
              {[
                { value: "2025", label: "Founded" },
                { value: "4", label: "Core Engineers" },
                { value: "2027", label: "First Deployment" },
                { value: "LEO → Cislunar", label: "Target Orbits" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="border border-black/10 p-5 md:p-8 hover:border-teal-500/60 transition-all duration-500"
                >
                  <div className="text-xl md:text-2xl lg:text-3xl font-medium text-gradient-teal mb-2 break-words leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-neutral-600 uppercase tracking-widest break-words">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-teal-600/30 to-transparent" />

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-20 lg:py-24 min-[1440px]:py-28 px-5 md:px-8 lg:px-12 min-[1440px]:px-24 bg-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <ScrollReveal>
          <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 relative z-10">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight mb-3 text-neutral-900">
                Interested in what we are building?
              </h2>
              <p className="text-neutral-600 max-w-xl text-sm md:text-base lg:text-lg">
                Whether it is payload hosting, technology collaboration, or
                joining the team, we would like to hear from you.
              </p>
            </div>

            <Link
              href="/contact"
              className="group px-6 py-3 border border-teal-600 text-neutral-900 text-sm font-medium hover:bg-teal-600/10 hover:border-teal-700 transition-all duration-300 flex items-center gap-2 flex-shrink-0 uppercase whitespace-nowrap"
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
