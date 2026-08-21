import { Linkedin } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { TEAM_GROUPS, type TeamMember } from "@/data/team";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="card group h-full overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            className="aspect-square w-full object-cover object-top grayscale transition-all duration-700 ease-brand group-hover:grayscale-0"
          />
        ) : (
          // No photo yet → initials, same footprint so the grid never jumps.
          <div
            className="flex aspect-square w-full items-center justify-center text-4xl font-medium"
            style={{ backgroundColor: "var(--surface-raised)", color: "var(--text-muted)" }}
            aria-hidden="true"
          >
            {initials(member.name)}
          </div>
        )}

        <div className="flex items-start justify-between gap-3 p-6">
          <div className="min-w-0">
            <h3 className="text-lg leading-snug">{member.name}</h3>
            <p className="mt-1 text-sm leading-snug">{member.title}</p>
            {member.bio && <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>}
          </div>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="shrink-0 rounded-sm p-1 text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export default function Team() {
  usePageMeta("Team", "The people building autonomous mission operations software at Orbtrix.");

  return (
    <>
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-16 pt-40 md:pt-48">
          <Reveal>
            <h1 className="max-w-3xl text-balance text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.08]">
              The people building it
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
              Hands-on experience in mission design, spacecraft operations, and autonomous
              systems engineering.
            </p>
          </Reveal>
        </div>
      </section>

      {TEAM_GROUPS.map((group) => (
        <section key={group.id} id={group.id} className="container-page pb-20 md:pb-28">
          <Reveal>
            <h2 className="mb-10 text-[clamp(1.3rem,2.6vw,1.95rem)]">{group.title}</h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {group.members.map((member, i) => (
              <MemberCard key={member.name} member={member} delay={i * 70} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
