import { Link } from "wouter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";

const MILESTONES = [
  { year: "2025", label: "Company Founded", status: "done" as const },
  { year: "2025-26", label: "DISHA & Rigel OS Development", status: "active" as const },
  { year: "2026-27", label: "System Integration & Testing", status: "upcoming" as const },
  { year: "2027-28", label: "Flight Model Build & Qualification", status: "upcoming" as const },
  { year: "2028", label: "Validation Mission Launch", status: "upcoming" as const },
];

export default function Mission() {
  return (
    <div>
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 md:py-14 xl:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-[var(--neon-cyan)]" />
            Validation Mission
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 font-display">
            2028 LEO Mission
          </h1>
          <p className="text-xl xl:text-2xl text-neutral-400 leading-relaxed max-w-2xl xl:max-w-3xl">
            A flight demonstration of autonomous Earth observation operations —
            validating onboard decision-making and software-defined mission
            execution in Low Earth Orbit.
          </p>
          <div className="mt-8 w-16 h-px bg-[var(--neon-cyan)]/20" />
        </div>

        {/* Timeline */}
        <ScrollReveal glow="indigo">
          <div className="mb-14">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--neon-cyan)] opacity-50 block mb-10 flex items-center gap-3">
              <span className="w-5 h-px bg-[var(--neon-cyan)]" />
              Timeline
            </span>

            {/* Desktop */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute top-[6px] left-0 right-0 h-px bg-[var(--neon-cyan)]/8" />
                <div className="grid grid-cols-5 gap-4">
                  {MILESTONES.map((m, i) => (
                    <div key={i} className="relative pt-8">
                      <div
                        className={`absolute top-0 left-0 w-3 h-3 rounded-full ${
                          m.status === "done"
                            ? "bg-[var(--neon-cyan)] shadow-[0_0_10px_rgba(99,102,241,0.4)] pulse-dot"
                            : m.status === "active"
                              ? "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)] pulse-dot"
                              : "bg-neutral-800 border border-neutral-700"
                        }`}
                      />
                      <span className={`font-mono text-sm block mb-1 ${
                        m.status === "done" ? "text-[var(--neon-cyan)]/60"
                        : m.status === "active" ? "text-yellow-400/60"
                        : "text-neutral-600"
                      }`}>
                        {m.year}
                      </span>
                      <span className={`text-base font-display ${m.status === "upcoming" ? "text-neutral-500" : "text-white"}`}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-6">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      m.status === "done" ? "bg-[var(--neon-cyan)] shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                      : m.status === "active" ? "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                      : "bg-neutral-700"
                    }`} />
                    {i < MILESTONES.length - 1 && <div className="w-px flex-1 bg-[var(--neon-cyan)]/8 mt-2" />}
                  </div>
                  <div className="pb-2">
                    <span className={`font-mono text-sm block mb-0.5 ${
                      m.status === "done" ? "text-[var(--neon-cyan)]/60"
                      : m.status === "active" ? "text-yellow-400/60"
                      : "text-neutral-600"
                    }`}>{m.year}</span>
                    <span className={`text-base font-display ${m.status === "upcoming" ? "text-neutral-500" : "text-white"}`}>
                      {m.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Mission Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <ScrollReveal direction="left" glow="indigo">
            <div>
              <span className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 neon-edge text-sm font-mono text-[var(--neon-cyan)] opacity-60 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-dot" />
                Target Launch · 2028
              </span>

              <h2 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-8 leading-tight tracking-tight font-display">
                Autonomous Earth
                <br />
                <span className="gradient-text-cyan">Observation Mission</span>
              </h2>

              <div className="space-y-5 text-neutral-400 leading-relaxed text-lg">
                <p>
                  A 6U-class satellite in Low Earth Orbit, equipped with a
                  multispectral imaging payload and in-house autonomous flight
                  computing.
                </p>
                <p>
                  Mission planning, spacecraft health management, and
                  operational decision logic execute onboard — significantly
                  reducing dependence on continuous ground commanding.
                </p>
                <p>
                  This mission validates the operational model for
                  software-defined spacecraft: intelligence shifts onboard,
                  enabling scalable and cost-efficient mission execution.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} glow="indigo">
            <div className="space-y-6">
              <div className="neon-edge p-10 2xl:p-12 hover-lift">
                <h3 className="text-xl font-semibold mb-6 font-display">Mission Profile</h3>
                <div className="space-y-4">
                  {[
                    ["Mission Type", "Earth Observation"],
                    ["Orbit", "Low Earth Orbit"],
                    ["Class", "6U Small Satellite"],
                    ["Payload", "Multispectral Imager"],
                    ["Compute", "In-house Autonomous"],
                  ].map(([label, value], i) => (
                    <div key={i} className="flex justify-between border-b border-[var(--neon-cyan)]/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-base text-neutral-500 font-mono">{label}</span>
                      <span className="text-base text-white font-medium font-display">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="neon-edge p-10 2xl:p-12 hover-lift">
                <h3 className="text-xl font-semibold mb-4 font-display">Expected Impact</h3>
                <p className="text-neutral-500 text-base leading-relaxed mb-6">
                  50-60% reduction in ground operations workload. Optimized
                  power usage and reduced communication overhead for extended
                  mission lifetime.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--neon-cyan)]/5">
                  <div>
                    <div className="text-3xl font-bold font-display neon-text-cyan">50-60%</div>
                    <div className="text-sm text-neutral-600 mt-1 font-mono">Ops Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-display neon-text-cyan">LEO</div>
                    <div className="text-sm text-neutral-600 mt-1 font-mono">Orbit Class</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CTA */}
        <ScrollColorLine color="mixed" />
        <ScrollReveal>
          <div className="mt-14 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-display">Payload Hosting & Collaboration</h3>
              <p className="text-neutral-500 max-w-lg text-base leading-relaxed">
                We're engaging with organizations interested in hosting Earth
                observation or experimental payloads on the 2028 validation mission.
              </p>
            </div>
            <Link href="/contact" className="px-7 py-3.5 neon-edge text-white text-base font-medium hover:bg-[var(--neon-cyan)]/5 transition-all duration-300 flex-shrink-0 font-display uppercase">
              Register Interest
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
