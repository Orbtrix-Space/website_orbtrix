import { TEAM } from "@/data/content";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollColorLine } from "@/components/ScrollColorLine";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <>
      <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 md:py-14 xl:py-20">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 flex items-center gap-3">
            <span className="w-5 h-px bg-white/20" />
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight mb-6 font-display">
            The Team
          </h1>
          <p className="text-xl xl:text-2xl text-neutral-400 leading-relaxed max-w-2xl xl:max-w-3xl">
            A small, focused team with hands-on experience in mission design,
            spacecraft operations, and autonomous systems engineering.
          </p>
          <div className="mt-8 w-16 h-px bg-white/20/20" />
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.08}>
              <div className="group neon-edge hover-lift">
                {member.photo ? (
                  <div className="overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full aspect-[3/4] object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[3/4] bg-neutral-900 flex items-center justify-center text-5xl font-bold font-display text-neutral-700">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="p-6 2xl:p-8 flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-base font-display">{member.name}</h3>
                    <p className="text-neutral-500 text-sm font-mono mt-1 uppercase tracking-wider">
                      {member.role}
                    </p>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-700 hover:text-neutral-400 transition-colors"
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
        <ScrollColorLine color="indigo" />
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
          <ScrollReveal glow="indigo">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-4 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                Our Vision
              </span>
              <h2 className="text-4xl xl:text-5xl font-bold tracking-tight mb-6 font-display">
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

          <ScrollReveal delay={0.1} glow="teal">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-neutral-400 opacity-50 block mb-6 flex items-center gap-3">
                <span className="w-5 h-px bg-white/20" />
                Company
              </span>
              <div className="neon-edge">
                {[
                  ["Founded", "2025"],
                  ["Location", "Bengaluru, India"],
                  ["Focus", "Autonomous Space Systems"],
                  ["Team", "4 Founding Members"],
                  ["Stage", "Product Development"],
                ].map(([label, value], idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 last:border-0 py-4 px-8 2xl:px-10">
                    <span className="text-base text-neutral-500 font-mono">{label}</span>
                    <span className="text-base text-white font-display">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Join Us */}
        <ScrollColorLine color="indigo" />
        <ScrollReveal>
          <div className="mt-14 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-3 font-display">Join Us</h3>
              <p className="text-neutral-500 max-w-lg text-base leading-relaxed">
                We're looking for engineers, researchers, and operators who want
                to build the future of autonomous spacecraft operations.
              </p>
            </div>
            <a
              href="https://www.notion.so/Careers-at-Orbtrix-Space-3135b581cdb7809ea3ccc510b9325b9b"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 neon-edge text-white text-base font-medium hover:bg-white/20/5 transition-all duration-300 flex-shrink-0 font-display uppercase"
            >
              View Open Roles
            </a>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
