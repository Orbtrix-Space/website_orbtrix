import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { CAREERS_URL } from "@/data/site";

/** Preserved from the previous About page. */
const COMPANY_FACTS: [string, string][] = [
  ["Founded", "2025"],
  ["Location", "Bengaluru, India"],
  ["Focus", "Autonomous space systems"],
  ["Stage", "Product development"],
];

export default function About() {
  usePageMeta("About", "Orbtrix is building the infrastructure layer for autonomous spacecraft operations.");

  return (
    <>
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-16 pt-40 md:pt-48">
          <Reveal>
            <p className="eyebrow">About</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-balance text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.08]">
              Building toward lunar infrastructure
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ===================== VISION ===================== */}
      <section className="container-page pb-24 md:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <Reveal>
            {/* Preserved verbatim from the previous site. */}
            <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed">
              <p>
                We believe the next leap in space will not come from bigger rockets. It will
                come from spacecraft that can think, decide, and operate on their own.
              </p>
              <p>
                Our long term vision is to build the infrastructure layer for sustained lunar
                operations. We start by proving this technology in LEO — autonomous Earth
                observation missions that deliver raw intelligence at dramatically lower costs.
              </p>
              <p className="text-ink">Every mission we fly brings us closer to the Moon.</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="sr-only">Company facts</h2>
            <dl className="card overflow-hidden p-0">
              {COMPANY_FACTS.map(([label, value], i) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-6 px-7 py-5"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid var(--border)",
                  }}
                >
                  <dt className="text-sm text-ink-muted">{label}</dt>
                  <dd className="text-right text-[13px] text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ===================== JOIN US ===================== */}
      <section className="container-page pb-32">
        <Reveal>
          <div className="card flex flex-col items-start justify-between gap-8 p-10 md:flex-row md:items-center md:p-14">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.3rem,2.6vw,1.95rem)]">Join us</h2>
              <p className="mt-4 leading-relaxed">
                We are looking for engineers, researchers, and operators who want to build the
                future of autonomous spacecraft operations.
              </p>
            </div>

            <a
              href={CAREERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary group h-14 shrink-0 px-8 text-base"
            >
              View open roles
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Link
            href="/team"
            className="btn btn-ghost group mt-10 h-11 text-base"
            style={{ color: "var(--accent)" }}
          >
            Meet the team
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
