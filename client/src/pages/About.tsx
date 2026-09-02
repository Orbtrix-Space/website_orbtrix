import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { CLOSING, THESIS, WHO } from "@/data/company";
import { Notation, useLive } from "@/components/tech/TechParts";
import { ClosedLoopPlate } from "@/components/company/CompanyVisuals";

/**
 * The company page. Two sections and a CTA, and it is short on purpose.
 *
 *   who we are  →  IISc-incubated, full-stack autonomy
 *   the thesis  →  strategic on the ground, tactical onboard, in a closed loop
 *   the ask     →  build one with us
 *
 * Anything that expands on the architecture belongs on /disha or /solutions.
 * A visitor should have the whole company inside a minute; that constraint is
 * the design, so resist adding sections here.
 *
 * Copy lives in data/company.ts, including the reason the one number on this
 * page is framed the way it is.
 */
export default function About() {
  usePageMeta(
    "Company",
    "Orbtrix is an IISc-incubated space technology startup building enabling systems for full-scale autonomy in space missions — ground and onboard in a closed loop.",
  );

  const thesis = useLive<HTMLElement>();

  return (
    <>
      {/* ===================== 01 — WHO WE ARE ===================== */}
      <section className="container-page page-head">
        <Reveal>
          <Notation ident={WHO.mark.ident} cmd={WHO.mark.cmd} />
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-7 max-w-4xl text-balance text-[clamp(1.95rem,4.6vw,3.4rem)] leading-[1.06]">
            {WHO.heading}
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            {WHO.body.map((paragraph, i) => (
              <Reveal key={paragraph} delay={120 + i * 80}>
                <p
                  className={`measure text-pretty font-light leading-relaxed ${
                    i === 0 ? "text-[1.05rem] text-ink" : "mt-6 text-[0.95rem]"
                  }`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* The information panel, in the shape the page has always used. */}
          <Reveal delay={180}>
            <h2 className="sr-only">Company facts</h2>
            <dl className="card overflow-hidden p-0">
              {WHO.facts.map(([label, value], i) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 px-7 py-5"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
                >
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="dsh-mono text-right text-[0.68rem] text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ===================== 02 — THE THESIS ===================== */}
      <section
        id="autonomy"
        ref={thesis.ref}
        data-live={thesis.live ? "true" : "false"}
        className="sol-section container-page pt-0"
      >
        <div className="max-w-3xl">
          <Reveal>
            <Notation ident={THESIS.mark.ident} cmd={THESIS.mark.cmd} />
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-6 text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.08]">
              {THESIS.heading.map((line) => (
                <span key={line} className="block text-balance">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="measure mt-7 text-pretty text-[0.98rem] font-light leading-relaxed">
              {THESIS.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          {/* The two layers. Peers — same treatment, opposite ends of the link. */}
          <div className="flex flex-col gap-5">
            {THESIS.levels.map((level, i) => (
              <Reveal key={level.title} delay={140 + i * 70}>
                <div className="abt-level" data-side={level.side}>
                  <p className="abt-level-where">{level.where}</p>
                  <h3 className="mt-3 text-[clamp(1.15rem,2vw,1.5rem)] leading-tight">
                    {level.title}
                  </h3>
                  <p className="mt-4 text-pretty text-[0.9rem] font-light leading-relaxed">
                    {level.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <ClosedLoopPlate
              ground={THESIS.loop.ground}
              space={THESIS.loop.space}
              uplink={THESIS.loop.uplink}
              downlink={THESIS.loop.downlink}
            />
          </Reveal>
        </div>

        {/* The section lands on one statement, and the qualifier travels with
            it — the sentence under the headline is what keeps the number a
            target rather than a promise. */}
        <Reveal delay={260}>
          <div
            className="mt-16 border-t pt-12 md:mt-20 md:pt-14"
            style={{ borderColor: "var(--border)" }}
          >
            <h3 className="max-w-3xl text-balance text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.1]">
              {THESIS.statement}
            </h3>
            <p className="measure mt-6 text-pretty text-[0.92rem] font-light leading-relaxed">
              {THESIS.opex}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ===================== CLOSING ===================== */}
      <section className="sol-section container-page pt-0">
        <div
          className="border-t pt-16 text-center md:pt-20"
          style={{ borderColor: "var(--border)" }}
        >
          <Reveal>
            <div className="flex justify-center">
              <Notation ident={CLOSING.mark.ident} cmd={CLOSING.mark.cmd} className="text-left" />
            </div>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mx-auto mt-8 max-w-3xl text-balance text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.08]">
              {CLOSING.heading}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={CLOSING.primary.href} className="cta cta-primary">
                {CLOSING.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={CLOSING.secondary.href} className="cta cta-secondary">
                {CLOSING.secondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
