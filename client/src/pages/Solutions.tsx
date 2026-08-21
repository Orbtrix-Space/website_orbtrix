import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { SectionHeading, ItemCard, ClosingCTA } from "@/components/ProductParts";
import { DATA_PROCESSING, GROUND_SOLUTIONS, RIGEL, PLATFORM } from "@/data/products";

/**
 * Solutions = how the platform is applied. Two families, each an anchor the
 * nav dropdown jumps to: onboard (data processing + Rigel OS) and ground.
 */
export default function Solutions() {
  usePageMeta(
    "Solutions",
    "Onboard and ground solutions: data processing at the sensor, autonomous mission planning, and fleet-wide monitoring.",
  );

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <section className="relative overflow-hidden">

        <div className="container-page relative z-10 pb-16 pt-40 md:pt-48">
          <Reveal>
            <p className="eyebrow">Solutions</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-4xl text-balance text-[clamp(1.95rem,4.8vw,3.5rem)] leading-[1.08]">
              Autonomy from the spacecraft to the ground
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl">
              The same platform, applied in two places: onboard the spacecraft, and across the
              ground segment that runs the fleet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== ONBOARD SOLUTIONS ===================== */}
      <section className="section container-page pt-0">
        <SectionHeading
          id="onboard"
          eyebrow="Onboard solutions"
          title="Autonomy that travels with the spacecraft"
          lead="Processing and decision-making at the sensor, so the downlink carries answers rather than raw frames."
        />

        {/* ---- Data Processing (sub-section) ---- */}
        <div className="mt-20">
          <Reveal id="data-processing">
            <h3 className="text-2xl md:text-3xl">Data processing</h3>
            <p className="mt-4 max-w-2xl leading-relaxed">
              Turning sensor data into products before it ever reaches the ground.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DATA_PROCESSING.map((item, i) => (
              <ItemCard key={item.id} item={item} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* ---- Rigel OS (onboard flight software) ---- */}
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

      {/* ===================== GROUND SOLUTIONS ===================== */}
      <section className="section container-page pt-0">
        <SectionHeading
          id="ground"
          eyebrow="Ground solutions"
          title="One operator, one fleet"
          lead="Team size decoupled from fleet size. Hours of manual work become minutes of review."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {GROUND_SOLUTIONS.map((item, i) => (
            <ItemCard key={item.id} item={item} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ===================== CLOSING ===================== */}
      <ClosingCTA heading={PLATFORM.vision} />
    </>
  );
}
