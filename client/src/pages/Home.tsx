import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Notation } from "@/components/tech/TechParts";
import { CinematicHero } from "@/components/CinematicHero";
import { OperationalLoop } from "@/components/OperationalLoop";
import { ApproachConsole } from "@/components/ApproachConsole";
import { WhyOrbtrix } from "@/components/WhyOrbtrix";
import { WhoWeServe } from "@/components/WhoWeServe";
import { PartnersBackers } from "@/components/PartnersBackers";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Home() {
  usePageMeta(
    "",
    "Orbtrix builds intelligence and autonomy infrastructure for spacecraft: DISHA for ground mission operations, and onboard autonomy for the spacecraft itself.",
  );

  /* The homepage is one argument, in order:
       01 hero            — what Orbtrix does
       02 the challenge   — why operations still run through the ground
       03 the approach    — DISHA + Rigel OS, as one architecture console
       04 why Orbtrix     — what makes that architecture different
       05 who we serve    — the commercial framing, and the four domains
       06 company         — credibility
       07 contact         — the CTA
     Solutions has no homepage section of its own: Nexus, Netra and Rigel OS
     are reached through the small gateway CTA at the foot of 04, and live in
     full on /solutions. A second large product block here duplicated that
     page without adding to the argument.
     Mission #1 has been removed from the site; /mission-1 and its two older
     aliases redirect to /disha.

     The separate "Our Architecture" section that used to sit between 03 and 04
     is gone: the approach console covers the same two systems, and the pair
     back to back said the same thing twice. DISHA and Rigel OS are unaffected
     everywhere else — /disha, /solutions and the nav all still carry them.

     Sections 02–06 are plain page canvas; the scene belongs to the hero. */
  return (
    <>
      {/* ===================== 01 · CINEMATIC OPENING =====================
          The hero AND the "what we do" narrative live here as one continuous
          scene over a single pinned video. The narrative screen doubles as the
          statement of the problem, which is why 02 opens on the comparison
          rather than restating it. */}
      <CinematicHero />

      {/* ===================== 02 · THE CHALLENGE ===================== */}
      <OperationalLoop />

      {/* ===================== 03 · THE ORBTRIX APPROACH ===================== */}
      <ApproachConsole />

      {/* ===================== 04 · WHY ORBTRIX ===================== */}
      <WhyOrbtrix />

      {/* ===================== 05 · WHO WE SERVE =====================
          The old "For mission providers" section and the mission-class strip,
          merged: the positioning now leads straight into the four domains, and
          the four abstract benefit blocks are gone — each of those claims now
          lives inside the domain it actually applies to. */}
      <WhoWeServe />

      {/* ===================== 06 · PARTNERS & BACKERS =====================
          Driven entirely by client/public/Logos_Partners/ — see the
          partner-logos plugin in vite.config.ts. */}
      <PartnersBackers />

      {/* ===================== 07 · CLOSING & CONTACT =====================
          The last black thing on the page, and it hands off directly to the
          white footer. Compact on purpose: a tall CTA immediately above a
          substantial footer reads as two endings. */}
      <section className="container-page pb-[clamp(4rem,6vw,5.5rem)] pt-0">
        <Reveal>
          <p className="max-w-5xl text-balance text-[clamp(1.3rem,2.8vw,2.15rem)] font-normal leading-snug text-ink">
            We start with software that fits how missions run today. Over time, Orbtrix becomes
            the <span style={{ color: "var(--accent)" }}>autonomy layer</span> beneath them all.
          </p>
        </Reveal>

        {/* The mission classes moved up into Who We Serve, where each one now
            carries the reason a mission in that class would use Orbtrix. */}
        <Reveal delay={120}>
          <div
            className="mt-12 border-t pt-12"
            style={{ borderColor: "var(--border)" }}
          >
            <Notation ident="ORBTRIX" cmd="mission.connect()" />

            <div className="mt-7 flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
              <h2 className="max-w-xl text-balance text-[clamp(1.3rem,2.6vw,1.95rem)]">
                Building or flying a mission that needs autonomy?
              </h2>
              <Link href="/contact" className="cta cta-primary shrink-0">
                Let&apos;s talk
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
