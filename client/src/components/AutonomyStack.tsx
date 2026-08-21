import { Reveal } from "@/components/Reveal";

/**
 * The autonomy stack — Observe, Decide, Act, read side by side.
 *
 * These were three pinned full-screen chapters that replaced each other on
 * scroll. As a triptych the three read in parallel instead: the sequence is
 * still legible left to right, but the whole model is visible at once rather
 * than costing three viewports of scrolling to take in.
 *
 * One consequence of going side by side: the panels used to alternate light
 * and dark, which cannot survive as columns without reading as stripes. The
 * whole section now sits on the page canvas, and the numerals — previously
 * oversized corner watermarks sized for a full screen — step down to markers.
 */

/** A paragraph as segments, so keywords can be marked without parsing markup. */
type Segment = { text: string; accent?: boolean };

interface Panel {
  numeral: string;
  title: string;
  subtitle: string;
  body: Segment[];
  labels: string[];
}

const PANELS: Panel[] = [
  {
    numeral: "01",
    title: "Observe",
    subtitle: "Mission Awareness Layer",
    body: [
      { text: "Turn raw telemetry, sensor feeds, and orbital context into a " },
      { text: "live operational picture", accent: true },
      { text: " of each spacecraft and its environment." },
    ],
    labels: ["Telemetry ingestion", "Orbital context", "Environment awareness"],
  },
  {
    numeral: "02",
    title: "Decide",
    subtitle: "Autonomous Intelligence Layer",
    body: [
      { text: "Detect anomalies early and plan responses using " },
      { text: "models tuned to the behavior", accent: true },
      { text: " of each spacecraft you fly." },
    ],
    labels: ["Anomaly detection", "Decision models", "Mission reasoning"],
  },
  {
    numeral: "03",
    title: "Act",
    subtitle: "Execution Layer",
    body: [
      { text: "Carry mission and recovery procedures through execution across ground and orbit, turning decisions into actions " },
      { text: "without waiting for a human in the loop", accent: true },
      { text: "." },
    ],
    labels: ["Command execution", "Autonomous recovery", "Ground-orbit sync"],
  },
];

function Chapter({ panel }: { panel: Panel }) {
  return (
    // `h-full` matters: grid stretches the <Reveal> wrapper to the row height,
    // but this column has to fill that wrapper before `mt-auto` below has any
    // free space to push the label list into.
    <div className="flex h-full flex-col">
      {/* Numeral and layer name share a line — at column width the numeral no
          longer has room to be a watermark, so it becomes a marker instead. */}
      <div className="flex items-center gap-3">
        <span
          className="text-[11px] tabular-nums"
          style={{ color: "var(--accent)" }}
          aria-hidden="true"
        >
          {panel.numeral}
        </span>
        <span
          className="h-px w-6 shrink-0"
          style={{ backgroundColor: "var(--border-strong)" }}
          aria-hidden="true"
        />
        <p className="text-[11px] tracking-[0.02em]" style={{ color: "var(--accent)" }}>
          {panel.subtitle}
        </p>
      </div>

      {/* 3.2vw where the pinned version used 6.4vw: the heading now has to sit
          inside a third of the measure, not the full page. */}
      <h2
        id={`chapter-${panel.numeral}`}
        className="mt-7 text-[clamp(1.75rem,3.2vw,2.6rem)] font-normal uppercase leading-[0.95] tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {panel.title}
      </h2>

      <p className="mt-7 text-pretty text-base font-light leading-relaxed">
        {panel.body.map((seg, i) =>
          seg.accent ? (
            <span key={i} style={{ color: "var(--accent)" }}>
              {seg.text}
            </span>
          ) : (
            <span key={i}>{seg.text}</span>
          ),
        )}
      </p>

      {/* `mt-auto` pins the label list to the bottom of the tallest column, so
          the three rules line up even though the paragraphs differ in length. */}
      <ul className="mt-auto pt-12">
        {panel.labels.map((label) => (
          <li
            key={label}
            className="border-t py-3.5 text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AutonomyStack() {
  return (
    <section className="section container-page">
      <div className="grid gap-x-12 gap-y-20 md:grid-cols-3 lg:gap-x-16">
        {PANELS.map((panel, i) => (
          <Reveal key={panel.numeral} delay={i * 90}>
            <Chapter panel={panel} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
