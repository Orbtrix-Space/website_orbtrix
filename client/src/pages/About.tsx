import { TEAM } from "@/data/content";
import { SectionHeader } from "@/components/SectionHeader";
import { Linkedin } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Team */}
      <SectionHeader
        title="The Team"
        subtitle="A multidisciplinary team with hands-on experience in mission design, spacecraft operations, and autonomous systems."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member, idx) => (
          <div
            key={idx}
            className="group border border-white/10 bg-neutral-900/10 p-8 hover:border-white/30 hover:bg-neutral-900/30 transition-all duration-300"
          >
            {/* Photo + LinkedIn */}
            <div className="mb-6 flex items-center justify-between">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-16 h-16 object-cover rounded-sm border border-white/20"
                />
              ) : (
                <div className="w-16 h-16 bg-white text-black flex items-center justify-center font-bold text-xl font-mono">
                  {member.name.charAt(0)}
                </div>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-white transition-colors"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>

            <h3 className="text-xl font-bold mb-2">{member.name}</h3>
            <p className="text-neutral-400 font-mono text-sm uppercase tracking-wide">
              {member.role}
            </p>
          </div>
        ))}
      </div>

      {/* Vision & Company Info */}
      <div className="mt-24 border-t border-white/10 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Vision */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Vision</h3>

            <p className="text-neutral-400 leading-relaxed text-lg">
              Orbtrix exists to enable autonomy across every layer of space missions.
              We believe the next leap in space capability will not come from larger
              launch vehicles or more hardware, but from spacecraft that can think,
              decide, and operate independently.
            </p>

            <p className="text-neutral-400 leading-relaxed text-lg mt-6">
              By embedding intelligence directly into spacecraft and mission operations,
              we aim to make space systems scalable, resilient, and accessible without
              the burden of continuous human supervision.
            </p>
          </div>

          {/* Company Facts — aligned parallel */}
          <div className="space-y-6 font-mono text-sm text-neutral-500">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span>FOUNDED</span>
              <span className="text-white">2025</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span>LOCATION</span>
              <span className="text-white">INDIA</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span>FOCUS</span>
              <span className="text-white">AUTONOMOUS SPACE SYSTEMS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="mt-24 border-t border-white/10 pt-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Join Us</h3>
            <p className="text-neutral-400 max-w-xl leading-relaxed text-lg">
              We are building autonomous systems for space missions and are always
              interested in working with engineers, researchers, and operators who
              want to shape the future of spacecraft operations.
            </p>
          </div>

          <a
            href="https://your-notion-hiring-page-link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-colors font-medium"
          >
            View Open Roles
          </a>
        </div>
      </div>
    </div>
  );
}
