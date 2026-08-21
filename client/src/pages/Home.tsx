import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CinematicHero } from "@/components/CinematicHero";
import { Architecture } from "@/components/Architecture";
import { TrustedBy } from "@/components/TrustedBy";
import { MissionClasses } from "@/components/MissionClasses";
import { usePageMeta } from "@/lib/usePageMeta";

/* ---- Why Orbtrix ---- */
/* Three columns of near-equal length on purpose — the grid reads as ragged the
   moment one entry runs long, so the copy is kept to roughly 210–240
   characters each. */
const WHY: { title: string; body: string }[] = [
  {
    title: "Autonomy, not dashboards",
    body: "Most mission ops software gives you better screens to stare at. Orbtrix makes decisions and acts on them. Ground-side through DISHA. Onboard through Rigel OS. Synchronized through MiSync. Your ops team shrinks. Your spacecraft gets smarter.",
  },
  {
    title: "One proprietary stack, ground to orbit",
    body: "A single synchronized architecture connects ground decision-making and onboard autonomy. DISHA plans. Rigel OS executes. MiSync keeps them aligned. When comms go dark, your spacecraft doesn’t stop thinking.",
  },
  {
    title: "Intelligence that evolves with the mission",
    body: "Our proprietary models don’t ship frozen. They learn the behavior of each spacecraft you fly, orbit by orbit. Months in, your anomaly detection catches what generic models never would. The longer you fly with Orbtrix, the wider the gap.",
  },
];

export default function Home() {
  usePageMeta(
    "",
    "Orbtrix builds the intelligence layer for space operations, from ground control to onboard decision-making.",
  );

  return (
    <>
      {/* ===================== CINEMATIC OPENING =====================
          The hero AND the "what we do" narrative now live here as one
          continuous scene over a single pinned video. There is no separate
          white section — the story doesn't break. */}
      <CinematicHero />

      {/* ===================== OUR ARCHITECTURE =====================
          DISHA / MiSync / Rigel OS as three faces of one stack. */}
      <Architecture />

      {/* ===================== WHY ORBTRIX ===================== */}
      <section className="section container-page pt-0">
        <Reveal>
          <h2 className="text-balance text-[clamp(1.63rem,3.5vw,2.6rem)]">Why Orbtrix</h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {WHY.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div>
                <span
                  className="text-sm tabular-nums"
                  style={{ color: "var(--accent)" }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="mt-4 border-t pt-6 text-xl leading-snug"
                  style={{ borderColor: "var(--border)" }}
                >
                  {item.title}
                </h3>
                <p className="measure mt-4 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===================== CREDIBILITY STRIP ===================== */}
      <TrustedBy />

      {/* ===================== CLOSING ===================== */}
      <section className="section container-page pt-0">
        <Reveal>
          <p className="max-w-3xl text-balance text-[clamp(1.3rem,2.8vw,2.15rem)] font-normal leading-snug text-ink">
            We start with software that fits how missions run today. Over time, Orbtrix becomes
            the <span style={{ color: "var(--accent)" }}>autonomy layer</span> beneath them all.
          </p>
        </Reveal>

        {/* The mission classes the sentence above used to list inline. */}
        <MissionClasses />

        <Reveal delay={120}>
          <div
            className="mt-20 flex flex-col items-start justify-between gap-8 border-t pt-16 md:flex-row md:items-center"
            style={{ borderColor: "var(--border)" }}
          >
            <h2 className="max-w-xl text-balance text-[clamp(1.3rem,2.6vw,1.95rem)]">
              Building or flying a mission that needs autonomy?
            </h2>
            <Link
              href="/contact"
              className="btn btn-primary group shrink-0 px-7 py-3.5 text-base"
            >
              Let&apos;s talk
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
