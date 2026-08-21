import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { SectionHeading, ClosingCTA } from "@/components/ProductParts";
import { PLATFORM, CAPABILITIES, EARLY_ACCESS_URL, productName } from "@/data/products";

/**
 * Products = the platform itself. Solutions (onboard / ground) live on their
 * own page; this one is the flagship product overview.
 */
export default function Products() {
  const platform = productName(PLATFORM.nameKey);

  usePageMeta(
    "Products",
    "One platform for constellation-scale missions: anomaly detection, orbit determination, mission planning, and flight data analysis.",
  );

  return (
    <>
      {/* ===================== PLATFORM INTRO ===================== */}
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-24 pt-40 md:pt-48">
          <Reveal>
            <p className="eyebrow">{PLATFORM.eyebrow}</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(1.95rem,4.8vw,3.7rem)] leading-[1.08]">
              {PLATFORM.headline}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
              {PLATFORM.intro}
            </p>
          </Reveal>

          {/* Only rendered once USE_REAL_NAMES is on — it glosses the real name. */}
          {PLATFORM.realNameHint && (
            <Reveal delay={200}>
              <p className="mt-4 text-sm">{PLATFORM.realNameHint}</p>
            </Reveal>
          )}

          <Reveal delay={240}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href={EARLY_ACCESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary group h-14 px-8 text-base"
              >
                Join the early adopter programme
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
              </a>
              <Link href="/solutions" className="btn btn-secondary h-14 px-8 text-base">
                Explore solutions
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CAPABILITIES ===================== */}
      <section className="section container-page">
        <SectionHeading
          id="capabilities"
          eyebrow="Capabilities"
          title="From reactive monitoring to intelligent oversight"
          lead="The operator stops watching telemetry and reacting to alerts, and starts overseeing a system that detects, diagnoses, and responds with context."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={cap.title} delay={i * 60}>
                <article className="card flex h-full gap-5 p-8">
                  <span className="shrink-0" style={{ color: "var(--accent)" }}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl">{cap.title}</h3>
                    <p className="measure mt-3 leading-relaxed">{cap.desc}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <Link
            href="/solutions"
            className="btn btn-ghost group mt-12 h-11 text-base"
            style={{ color: "var(--accent)" }}
          >
            See onboard and ground solutions
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ===================== CLOSING ===================== */}
      <ClosingCTA heading={PLATFORM.vision} />
    </>
  );
}
