import { Link } from "wouter";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { SectionHeading, ClosingCTA } from "@/components/ProductParts";
import { Notation } from "@/components/tech/TechParts";
import { RIGEL, PLATFORM } from "@/data/products";
import { FAMILY_NOTE, SOLUTIONS } from "@/data/solutions";

/**
 * The Solutions index.
 *
 * Three capabilities Orbtrix can deliver today, each with its own page, plus
 * the onboard work that is not yet one of them. This page's only job is to say
 * what the three are and get out of the way — every word about what NETRA,
 * NEXUS or onboard optical processing actually does lives on its own page, and
 * repeating it here is how two pages start disagreeing.
 *
 * Rigel OS keeps its block: it is real, and it is not currently a deliverable
 * capability with a page of its own.
 */
export default function Solutions() {
  usePageMeta(
    "Solutions",
    "Three Orbtrix capabilities available today: NETRA telemetry intelligence, NEXUS mission tasking and ground operations, and onboard optical payload processing.",
  );

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <section className="container-page page-head">
        <Reveal>
          <Notation ident="SOLUTIONS" cmd="orbtrix.capabilities()" />
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 max-w-4xl text-balance text-[clamp(1.95rem,4.6vw,3.4rem)] leading-[1.08]">
            Capabilities we can deliver to your mission today
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="measure mt-8 text-pretty text-lg leading-relaxed">
            Three focused engineering capabilities, delivered around one mission's problem — and
            built toward DISHA, Orbtrix's unified mission operations platform.
          </p>
        </Reveal>
      </section>

      {/* ===================== THE THREE ===================== */}
      <section className="sol-section container-page pt-0">
        <ul>
          {SOLUTIONS.map((solution, i) => (
            <Reveal key={solution.slug} as="li" delay={i * 80}>
              <Link href={`/solutions/${solution.slug}`} className="sol-cross">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="dsh-mono text-[0.58rem]" style={{ color: "var(--accent)" }}>
                    <span className="dsh-sigil" aria-hidden="true">
                      #{" "}
                    </span>
                    {solution.ident}
                  </span>
                  <span className="text-[clamp(1.15rem,2.2vw,1.7rem)] font-medium leading-tight text-ink">
                    {solution.name}
                  </span>
                  <span className="sol-cross-role">{solution.role}</span>
                </span>
                <ArrowUpRight className="sol-cross-arrow h-5 w-5" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={240}>
          <p
            className="measure mt-10 border-l pl-6 text-[0.85rem] font-light leading-relaxed"
            style={{ borderColor: "var(--border-accent)" }}
          >
            {FAMILY_NOTE}
          </p>
        </Reveal>
      </section>

      {/* ===================== ONBOARD (NOT YET A SOLUTION PAGE) ===================== */}
      <section className="sol-section container-page pt-0">
        <SectionHeading
          id="onboard"
          eyebrow="Onboard"
          title="Autonomy that travels with the spacecraft"
          lead="Processing and decision-making at the sensor, so the downlink carries answers rather than raw frames. Onboard optical processing is available today; the flight software below is earlier work."
        />

        {/* ---- Rigel OS ----
            The only thing in this section now. It used to sit under a card
            grid; with that gone it carries the section on its own, so it no
            longer needs the small gap that separated it from the cards. */}
        <div className="mt-16">
          <Reveal id="rigel-os">
            <div className="card p-8 md:p-14">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div>
                  <p className="eyebrow">Onboard flight software</p>
                  <h3 className="mt-5 text-[clamp(1.5rem,3.15vw,2.4rem)]">{RIGEL.literalName}</h3>
                  <p className="mt-2 text-[13px]" style={{ color: "var(--accent)" }}>
                    {RIGEL.tagline}
                  </p>

                  <span
                    className="mt-6 inline-flex items-center gap-2 rounded-pill border px-4 py-1.5 text-[11px]"
                    style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-pill"
                      style={{ backgroundColor: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    {RIGEL.status}
                  </span>

                  <p className="mt-8 leading-relaxed">{RIGEL.description}</p>
                </div>

                <ul className="flex flex-col justify-center gap-4">
                  {RIGEL.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0"
                        style={{ color: "var(--accent)" }}
                        aria-hidden="true"
                      />
                      <span className="text-[13px] leading-relaxed text-ink-muted">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCTA heading={PLATFORM.vision} />
    </>
  );
}
