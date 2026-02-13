import { TEAM } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-10 md:py-14 xl:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
            The Team
          </h1>
          <p className="text-lg xl:text-xl text-neutral-400 leading-relaxed max-w-2xl xl:max-w-3xl">
            A small, focused team with hands-on experience in mission design,
            spacecraft operations, and autonomous systems engineering.
          </p>
          <div className="mt-8 w-16 h-px bg-white/20" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className="group border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                {member.photo ? (
                  <div className="overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[4/5] bg-neutral-900 flex items-center justify-center text-4xl font-bold font-mono text-neutral-700">
                    {member.name.charAt(0)}
                  </div>
                )}

                <div className="p-5 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{member.name}</h3>
                    <p className="text-neutral-500 text-xs font-mono mt-1 uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-white transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Vision + Company */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/[0.06] pt-12">
          <ScrollReveal>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-4">
                Our Vision
              </span>
              <h2 className="text-3xl xl:text-4xl font-bold tracking-tight mb-6">
                Building toward lunar infrastructure
              </h2>
              <div className="space-y-5 text-neutral-400 leading-relaxed">
                <p>
                  We believe the next leap in space won't come from bigger
                  rockets — it'll come from spacecraft that can think, decide,
                  and operate on their own.
                </p>
                <p>
                  Our long-term vision is to build the infrastructure layer for
                  sustained lunar operations. We start by proving this technology
                  in LEO — autonomous Earth observation missions that deliver raw
                  intelligence at dramatically lower costs.
                </p>
                <p>Every mission we fly brings us closer to the Moon.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-600 block mb-6">
                Company
              </span>
              <div className="space-y-0">
                {[
                  ["Founded", "2025"],
                  ["Location", "Bengaluru, India"],
                  ["Focus", "Autonomous Space Systems"],
                  ["Team", "4 Founding Members"],
                  ["Stage", "Product Development"],
                ].map(([label, value], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-white/[0.04] py-4"
                  >
                    <span className="text-sm text-neutral-500 font-mono">
                      {label}
                    </span>
                    <span className="text-sm text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Join Us */}
        <ScrollReveal>
          <div className="mt-14 pt-10 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Join Us</h3>
              <p className="text-neutral-500 max-w-lg text-sm leading-relaxed">
                We're looking for engineers, researchers, and operators who want
                to build the future of autonomous spacecraft operations.
              </p>
            </div>
            <a
              href="https://your-notion-hiring-page-link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all flex-shrink-0"
            >
              View Open Roles
            </a>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
