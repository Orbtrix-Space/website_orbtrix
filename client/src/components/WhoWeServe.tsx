import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Notation, useCanHover } from "@/components/tech/TechParts";

/**
 * Who We Serve — the merge of two sections that were saying half an argument
 * each: "For mission providers" carried the positioning but listed four
 * abstract benefits, and the mission-class strip listed four domains with no
 * reason attached to any of them.
 *
 * Joining them puts the benefit where it belongs — inside the domain it
 * applies to. "Reduced operational workload" as a standalone card says nothing;
 * the same idea under Deep Space, phrased as mission continuity across long
 * communication delays, is a claim a mission engineer can evaluate.
 *
 * The four marks are the originals from MissionClasses: hand-authored inline
 * SVG on a 40×40 field, stroke-only, inheriting colour so they light with the
 * row. No icon dependency, no request, sharp at any density.
 */

/* ---- Marks. Preserved verbatim from the mission-class strip. ------------- */

function DefenceMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M20 4 L33 9 V20 C33 28 27 34 20 36 C13 34 7 28 7 20 V9 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M20 14 V26" stroke="currentColor" strokeWidth="1.25" />
      <path d="M14 20 H26" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function EarthObservationMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
      <circle cx="20" cy="24" r="11" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 24 H31" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <path
        d="M20 13 C 25 18, 25 30, 20 35 C 15 30, 15 18, 20 13 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.6"
      />
      <path d="M20 3 L14 11 M20 3 L26 11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function OrbitalServicesMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
      <rect x="4" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <rect x="24" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 20 H24" stroke="currentColor" strokeWidth="1.25" />
      <path d="M20 17 V23" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
    </svg>
  );
}

function DeepSpaceMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-8 w-8" aria-hidden="true">
      <path
        d="M3 33 C 12 8, 28 4, 37 17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />
      <circle cx="30" cy="28" r="6" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="14" cy="14" r="2.5" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------------- */

interface Domain {
  n: string;
  name: string;
  /** The always-visible descriptor. Original wording from the strip. */
  note: string;
  /** Revealed on engage. Two lines at most — this is a claim, not a pitch. */
  detail: string;
  /** Mission-state metadata. Reads as a telemetry label, not a tagline. */
  chain: string[];
  Mark: () => JSX.Element;
}

const DOMAINS: Domain[] = [
  {
    n: "01",
    name: "Defense",
    note: "ISR and tactical response",
    detail:
      "Autonomous observation, anomaly response and tactical replanning when communication latency matters.",
    chain: ["Observe", "Assess", "Respond"],
    Mark: DefenceMark,
  },
  {
    n: "02",
    name: "Earth Observation",
    note: "Imaging and monitoring fleets",
    detail:
      "Process imagery closer to acquisition, prioritize observations and adapt collection plans without waiting for ground intervention.",
    chain: ["Acquire", "Process", "Prioritize"],
    Mark: EarthObservationMark,
  },
  {
    n: "03",
    name: "Orbital Services",
    note: "Servicing, inspection, debris",
    detail:
      "Support autonomous inspection, proximity operations and mission replanning across intermittent communication windows.",
    chain: ["Observe", "Plan", "Execute"],
    Mark: OrbitalServicesMark,
  },
  {
    n: "04",
    name: "Deep Space",
    note: "High-latency, low-contact missions",
    detail:
      "Maintain mission continuity and autonomous decision-making across long communication delays and low-contact operations.",
    chain: ["Sense", "Decide", "Act"],
    Mark: DeepSpaceMark,
  },
];

export function WhoWeServe() {
  const [open, setOpen] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section className="section container-page pt-0" id="who-we-serve">
      {/* ---- Positioning ----
          Two columns rather than a stacked hero, and that is the whole fix:
          this block used to run a full screen tall — an eyebrow, then a lot
          of black, then a headline — before reaching the four domains that
          are the actual content. Setting the mark beside the copy instead of
          above it removes roughly a viewport of empty page and loses nothing,
          because the mark was never the thing being read. */}
      <div className="grid gap-y-7 md:grid-cols-12 md:gap-x-10">
        <Reveal className="md:col-span-4 md:pt-1.5">
          <Notation ident="FOR MISSION PROVIDERS" cmd="autonomy.layer()" />
        </Reveal>

        <div className="md:col-span-8">
          <Reveal delay={70}>
            <h2 className="text-pretty text-[clamp(1.35rem,2.6vw,2.1rem)] font-light leading-[1.15] text-ink">
              Deploy autonomy without rebuilding your{" "}
              <span style={{ color: "var(--accent)" }}>mission architecture</span>.
            </h2>
            <p className="measure mt-6 leading-relaxed">
              Orbtrix provides the autonomy layer for mission providers, spacecraft
              manufacturers, satellite operators, payload companies and system integrators.
            </p>

            {/* Set apart because it is the promise, not the description. The
                hairline does the work a second heading would otherwise do. */}
            <p
              className="measure mt-6 border-l pl-5 text-[0.95rem] font-light leading-relaxed text-ink"
              style={{ borderColor: "var(--border-accent)" }}
            >
              Your mission architecture stays yours. We provide the intelligence and
              automation layer around it.
            </p>
          </Reveal>
        </div>
      </div>
      {/* ---- Who we serve ---- */}
      <Reveal delay={120}>
        <p
          className="mt-12 border-t pt-7 text-[11px] uppercase tracking-[0.16em]"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          Who we serve
        </p>
      </Reveal>

      {/* Leaving the row closes whatever is open; handling it on the container
          means sliding between domains swaps the index with no flicker. */}
      <ul
        className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4"
        onMouseLeave={() => canHover && setOpen(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
        }}
      >
        {DOMAINS.map((d, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={d.name} delay={i * 80} as="li">
              <div className="wws-item h-full" data-open={isOpen}>
                <button
                  type="button"
                  className="wws-head"
                  aria-expanded={isOpen}
                  onMouseEnter={() => canHover && setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => {
                    if (!canHover) setOpen(isOpen ? null : i);
                  }}
                >
                  <span className="wws-mark">
                    <d.Mark />
                  </span>

                  <span className="wws-n">{d.n}</span>
                  <span className="wws-name">{d.name}</span>
                  <span className="wws-note">{d.note}</span>

                  {/* Space is reserved at lg so revealing never moves the CTA
                      below — see .wws-panel in index.css. */}
                  <span className="wws-panel">
                    <span className="wws-panel-in">
                      <span className="wws-detail">{d.detail}</span>
                      <span className="wws-chain">
                        {d.chain.map((step, k) => (
                          <span key={step}>
                            {k > 0 && <span className="wws-arrow">→</span>}
                            {step}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={200}>
        <div className="mt-10 border-t pt-9" style={{ borderColor: "var(--border)" }}>
          <Link href="/contact" className="cta cta-primary">
            Talk to Orbtrix
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
