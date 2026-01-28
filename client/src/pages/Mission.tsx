import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "wouter";

export default function Mission() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <SectionHeader
          title="Validation Mission"
          subtitle="A flight demonstration of autonomous Earth observation operations in Low Earth Orbit."
          align="left"
        />

        <div className="border border-white/10 bg-neutral-900/20 p-10 md:p-16">
          {/* Mission Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Mission Narrative */}
            <div>
              <div className="inline-block mb-6 px-4 py-1 border border-white/30 rounded-full text-sm text-white/80">
                TARGET LAUNCH · 2028
              </div>

              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Autonomous Earth Observation Mission
              </h3>

              <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
                <p>
                  The Orbtrix Validation Mission is a Low Earth Orbit Earth
                  observation mission designed to validate autonomous spacecraft
                  operations under real orbital conditions.
                </p>

                <p>
                  The mission features a 6U-class satellite equipped with a
                  multispectral imaging payload and an in-house autonomous flight
                  computing system executing onboard decision-making.
                </p>

                <p>
                  Core mission functions including mission planning, spacecraft
                  health management, and operational decision logic are executed
                  onboard, significantly reducing dependence on continuous
                  ground commanding.
                </p>

                <p>
                  This mission establishes a flight-proven operational model
                  where spacecraft intelligence is shifted onboard, enabling
                  scalable, resilient, and energy-efficient mission execution.
                </p>
              </div>
            </div>

            {/* Right: Mission Panels */}
            <div className="space-y-10">
              {/* Mission Profile */}
              <div className="border border-white/10 bg-black p-8 md:p-10">
                <h4 className="text-2xl font-semibold mb-6">
                  Mission Profile
                </h4>

                <div className="space-y-5 text-neutral-400">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Mission Type</span>
                    <span className="text-white">Earth Observation</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Orbit Class</span>
                    <span className="text-white">Low Earth Orbit (LEO)</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Mission Class</span>
                    <span className="text-white">6U Small Satellite</span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Primary Payload</span>
                    <span className="text-white">
                      Multispectral Imager (MSI)
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Flight Compute</span>
                    <span className="text-white">
                      In-house Autonomous Compute
                    </span>
                  </div>
                </div>
              </div>

              {/* Mission Impact */}
              <div className="border border-white/10 bg-black p-8 md:p-10">
                <h4 className="text-2xl font-semibold mb-6">
                  Mission Impact
                </h4>

                <div className="space-y-4 text-neutral-400 leading-relaxed">
                  <p>
                    Designed to demonstrate a 50–60% reduction in ground
                    operations workload through onboard autonomy and intelligent
                    mission execution.
                  </p>
                  <p>
                    Optimized power usage and reduced communication overhead
                    enable improved component utilization and extended mission
                    lifetime.
                  </p>
                  <p>
                    Validates a scalable operational model suitable for future
                    Earth observation and hosted payload missions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payload Hosting CTA */}
          <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h4 className="text-2xl font-semibold mb-3">
                Payload Hosting & Collaboration
              </h4>
              <p className="text-neutral-400 max-w-xl leading-relaxed">
                Orbtrix is engaging with organizations interested in hosting Earth
                observation or experimental payloads on its 2028 validation
                mission. Discussions focus on payload compatibility and
                autonomous operations integration.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors font-medium"
            >
              Register Interest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
