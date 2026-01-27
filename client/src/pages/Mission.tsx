import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";

export default function Mission() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeader
          title="Validation Mission"
          subtitle="Establishing Orbtrix as a mission operator through autonomous spacecraft operations."
          align="left"
        />

        <div className="border border-white/10 bg-neutral-900/20 p-10 md:p-16">
          {/* Mission Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left: Mission Narrative */}
            <div>
              <div className="inline-block mb-6 px-4 py-1 border border-white/30 rounded-full font-mono text-sm text-white/80">
                TARGET LAUNCH · 2028
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Autonomous Earth Observation Mission
              </h3>

              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                <p>
                  The Orbtrix Validation Mission is a dedicated Low Earth Orbit
                  satellite mission designed to establish Orbtrix as a full
                  mission operator, not merely a software provider.
                </p>

                <p>
                  This mission represents the first end-to-end deployment of
                  Orbtrix’s standardized satellite bus integrated with its
                  onboard autonomy software stack, operated under a unified
                  mission architecture.
                </p>

                <p>
                  The objective is to validate a new operational paradigm where
                  spacecraft execute routine mission planning, system
                  management, and decision-making onboard, while Orbtrix
                  maintains centralized mission oversight.
                </p>

                <p>
                  This mission serves as the foundation for Orbtrix’s transition
                  into a Mission-as-a-Service model, enabling customers to
                  deploy space missions without building or maintaining
                  dedicated ground operations infrastructure.
                </p>
              </div>
            </div>

            {/* Right: Mission Objectives */}
            <div className="border border-white/10 bg-black p-8 md:p-10">
              <h4 className="text-2xl font-semibold mb-6">
                Mission Objectives
              </h4>

              <ul className="space-y-4 text-neutral-400 leading-relaxed">
                <li>• Validate Orbtrix’s autonomous satellite bus in orbit</li>
                <li>
                  • Demonstrate end-to-end mission execution under Orbtrix
                  operational control
                </li>
                <li>
                  • Establish a repeatable architecture for hosted payload
                  missions
                </li>
                <li>
                  • Lay the operational groundwork for Mission-as-a-Service
                  deployments
                </li>
                <li>
                  • Enable future commercial missions built on a standardized
                  spacecraft platform
                </li>
              </ul>
            </div>
          </div>

          {/* Payload Hosting CTA */}
          <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-semibold mb-3">
                Payload Hosting Opportunities
              </h4>
              <p className="text-neutral-400 max-w-xl leading-relaxed">
                Orbtrix is engaging with organizations interested in hosting
                payloads on its 2028 validation mission as part of its transition
                toward a Mission-as-a-Service offering. Discussions focus on
                mission alignment, system compatibility, and long-term
                operational integration.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors font-medium"
            >
              Explore Payload Hosting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
