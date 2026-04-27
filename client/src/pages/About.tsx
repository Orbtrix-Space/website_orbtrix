import { TEAM } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white relative overflow-hidden">
      {/* Subtle teal radial wash on top */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(20, 184, 166, 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Ambient teal orbs */}
      <motion.div
        className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #14b8a6 0%, transparent 70%)" }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10 blur-[130px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-16 md:py-20 xl:py-24 relative z-10">
        {/* ===== HEADER ===== */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-teal-600/50" />
            About Us
          </span>
          <h1
            className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight mb-6 text-gradient-teal break-words"
            style={{ lineHeight: 1.15, paddingBottom: "0.15em" }}
          >
            Building autonomy for space
          </h1>
          <p className="text-xl text-neutral-700 leading-relaxed max-w-3xl">
            We are a small, focused team building the ground and onboard
            software that makes autonomous space operations practical.
          </p>
          <div className="mt-8 w-16 h-px bg-teal-600/50" />
        </div>

        {/* ===== VISION + COMPANY ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium tracking-tight mb-6 text-neutral-900">
                Building toward lunar infrastructure
              </h2>
              <div className="space-y-5 text-neutral-700 leading-relaxed">
                <p>
                  We believe the next leap in space will not come from bigger
                  rockets. It will come from spacecraft that can think, decide,
                  and operate on their own.
                </p>
                <p>
                  Our long term vision is to build the infrastructure layer for
                  sustained lunar operations. We start by proving this technology
                  in LEO. Autonomous Earth observation missions that deliver raw
                  intelligence at dramatically lower costs.
                </p>
                <p>Every mission we fly brings us closer to the Moon.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-6 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                Company
              </span>
              <div className="border border-black/10 bg-white/40 backdrop-blur-sm">
                {[
                  ["Founded", "2025"],
                  ["Location", "Bengaluru, India"],
                  ["Focus", "Autonomous Space Systems"],
                  ["Team", "4 Founding Members"],
                  ["Stage", "Product Development"],
                ].map(([label, value], idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 border-b border-black/8 last:border-0 py-4 px-6 sm:px-8"
                  >
                    <span className="text-xs sm:text-base text-neutral-500 uppercase sm:normal-case tracking-wider sm:tracking-normal shrink-0">
                      {label}
                    </span>
                    <span className="text-base text-neutral-900 sm:text-right break-words">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ===== TEAM ===== */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <ScrollReveal>
            <div className="mb-10">
              <span className="text-xs uppercase tracking-[0.3em] text-teal-700 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-teal-600/50" />
                The Team
              </span>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium tracking-tight mb-4 text-neutral-900">
                The people building it
              </h2>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                Hands-on experience in mission design, spacecraft operations,
                and autonomous systems engineering.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {TEAM.map((member, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.06}>
                <div className="group border border-black/10 bg-white/40 backdrop-blur-sm hover:border-teal-600 transition-all duration-500">
                  {member.photo ? (
                    <div className="overflow-hidden">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full aspect-square object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-neutral-900 flex items-center justify-center text-3xl font-medium text-neutral-700">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div className="p-3 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-xs text-neutral-900 leading-tight break-words">
                        {member.name}
                      </h3>
                      <p
                        className="text-teal-700 text-[10px] mt-1 uppercase leading-snug break-words"
                        style={{ hyphens: "auto", letterSpacing: "0.02em" }}
                      >
                        {member.role}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-teal-600 transition-colors flex-shrink-0"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ===== JOIN US ===== */}
        <div className="mt-16 pt-12 border-t border-black/10">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-neutral-900">Join Us</h3>
                <p className="text-neutral-700 max-w-lg text-base leading-relaxed">
                  We are looking for engineers, researchers, and operators who
                  want to build the future of autonomous spacecraft operations.
                </p>
              </div>
              <a
                href="https://www.notion.so/Careers-at-Orbtrix-Space-3135b581cdb7809ea3ccc510b9325b9b"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-teal-600 text-neutral-900 text-base font-medium hover:bg-teal-50 hover:border-teal-700 transition-all duration-300 flex-shrink-0 uppercase"
              >
                View Open Roles
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
