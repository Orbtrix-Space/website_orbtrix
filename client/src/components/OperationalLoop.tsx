import { Activity, Satellite, CalendarClock, Crosshair, TriangleAlert, Terminal } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Notation } from "@/components/tech/TechParts";

/**
 * The Challenge — one compact statement, read in about fifteen seconds.
 *
 * Problem → why autonomy → ground and onboard together. Nothing more: this is
 * a section, not a page, so the conventional-vs-autonomous workflow comparison
 * that used to live here is gone rather than shortened.
 *
 * The Earth plate is a background, not a picture. It is anchored left, where
 * the image already puts the planet, and its right two-thirds fall to near
 * black in the source — so the scrims below only have to finish a blend the
 * artwork starts, never paint over a visible rectangle. Both scrims resolve to
 * #000, which is exactly --bg, so there is no seam at any edge.
 *
 * Icons are lucide, which the project already depends on. Material Symbols
 * would mean a second Google Fonts request and another dependency for six
 * glyphs; these are the same six concepts from a library already in the
 * bundle and tree-shaken to what is used.
 */

/* The operational burden, one word each. No descriptions — the labels are the
   content, and a sentence under each would turn a glance into a read. */
const BURDEN = [
  { Icon: Activity, label: "Monitor" },
  { Icon: Satellite, label: "Understand" },
  { Icon: CalendarClock, label: "Plan" },
  { Icon: Crosshair, label: "Task" },
  { Icon: TriangleAlert, label: "Respond" },
  { Icon: Terminal, label: "Command" },
];

/** What that burden costs. Four terms, one line, no elaboration. */
const CONSEQUENCES = [
  "Operational workload",
  "Communication dependency",
  "Delayed decisions",
  "Scaling complexity",
];

const SPLIT = [
  { title: "Ground intelligence", items: ["Mission context", "Planning", "Oversight"] },
  { title: "Onboard autonomy", items: ["Immediate decisions", "Response", "Verification"] },
];

export function OperationalLoop() {
  return (
    <section
      className="relative isolate overflow-hidden"
      id="the-challenge"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ---- Earth plate ---------------------------------------------------
          Dimmed hard on small screens: at phone widths the planet sits under
          the copy rather than beside it, and at full strength the headline
          stops being readable over the terminator. */}
      <img
        src="/Images/earth_website.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-left opacity-40 md:opacity-100"
      />

      {/* Horizontal scrim: clears the right-hand column for type. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.62) 38%, #000 74%)",
        }}
      />
      {/* Vertical scrim: dissolves the top and bottom edges into the sections
          above and below, so the plate has no horizon line. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 78%, #000 100%)",
        }}
      />

      <div className="container-page py-[clamp(5rem,12vh,9rem)]">
        <div className="grid md:grid-cols-12">
          {/* Content holds the right-hand columns, off the planet. */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <Notation ident="CHALLENGE" cmd="operations.scale()" />
            </Reveal>

            <Reveal delay={70}>
              <h2 className="mt-6 text-balance text-[clamp(1.9rem,4vw,3.1rem)] font-light leading-[1.05] text-ink">
                Space is still operated with a{" "}
                <span style={{ color: "var(--accent)" }}>human-in-the-loop bottleneck</span>.
              </h2>
            </Reveal>

            <Reveal delay={130}>
              <p className="measure mt-7 text-pretty leading-relaxed">
                Ground will always be essential to space missions. But too much of the operational
                loop still depends on it.
              </p>
            </Reveal>

            {/* ---- The burden ---- */}
            <Reveal delay={190}>
              <ul className="mt-12 grid grid-cols-3 gap-x-4 sm:grid-cols-6">
                {BURDEN.map(({ Icon, label }) => (
                  <li key={label} className="challenge-cell border-t pt-4" style={{ borderColor: "var(--border)" }}>
                    <Icon
                      className="challenge-icon h-[18px] w-[18px]"
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <span
                      className="mt-3 block text-[11px] uppercase tracking-[0.1em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-8 text-[11.5px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {CONSEQUENCES.join("  ·  ")}
              </p>
            </Reveal>

            {/* ---- Why autonomy ---- */}
            <Reveal delay={300}>
              <div className="mt-14 border-t pt-10" style={{ borderColor: "var(--border)" }}>
                <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  Why autonomy?
                </p>
                <p className="mt-4 text-pretty text-[clamp(1.05rem,1.7vw,1.4rem)] font-light leading-snug text-ink">
                  Because not every decision should have to wait for the next contact.
                </p>
              </div>
            </Reveal>

            {/* ---- Ground + onboard ---- */}
            <Reveal delay={360}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-stretch">
                {SPLIT.map((col, i) => (
                  <div key={col.title} className="flex flex-1 items-stretch gap-4">
                    <div
                      className="challenge-cell flex-1 border p-5"
                      style={{ borderColor: "var(--border)", borderRadius: "var(--radius-lg)" }}
                    >
                      <p className="text-[0.95rem] leading-none" style={{ color: "var(--accent)" }}>
                        {col.title}
                      </p>
                      <p
                        className="mt-3 text-[11.5px] leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {col.items.join("  ·  ")}
                      </p>
                    </div>

                    {/* The join. Present on desktop only — stacked, the two
                        blocks already read as a pair. */}
                    {i === 0 && (
                      <span
                        className="hidden shrink-0 select-none items-center text-lg font-light sm:flex"
                        style={{ color: "var(--text-muted)" }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={410}>
              <p className="measure mt-8 text-pretty text-[0.95rem] font-light leading-relaxed text-ink">
                Autonomy doesn&apos;t replace the ground. It makes the mission work better with it.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
