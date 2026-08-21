import { Reveal } from "@/components/Reveal";

/**
 * Mission classes the stack is built for.
 *
 * The marks are hand-authored inline SVG rather than sourced imagery. Stock
 * photography — even "free" — carries attribution or model-release terms that
 * have to be tracked, and none of it matches a site whose entire visual
 * language is 1px line work on white. Inline paths cost no request, inherit
 * the accent colour, and stay sharp at any density.
 *
 * The four classes are exactly the ones the site already claims. Adding
 * others would be inventing capability claims.
 */

/* Marks are drawn on a 40×40 field, stroke-only, so they sit at the same
   weight as the hairline borders they live among. */

function DefenceMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9" aria-hidden="true">
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
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9" aria-hidden="true">
      <circle cx="20" cy="24" r="11" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9 24 H31" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
      <path
        d="M20 13 C 25 18, 25 30, 20 35 C 15 30, 15 18, 20 13 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.6"
      />
      {/* Imaging cone from the sensor above */}
      <path d="M20 3 L14 11 M20 3 L26 11" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function OrbitalServicesMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9" aria-hidden="true">
      <rect x="4" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <rect x="24" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
      {/* Capture arm bridging the two bodies */}
      <path d="M16 20 H24" stroke="currentColor" strokeWidth="1.25" />
      <path d="M20 17 V23" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.6" />
    </svg>
  );
}

function DeepSpaceMark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9" aria-hidden="true">
      {/* Long transfer trajectory, the probe still on its way */}
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

/* Descriptors name the mission type, not what Orbtrix does inside it — the
   product claims live in the Architecture section, and duplicating them here
   would be asserting coverage nobody has signed off on. */
const CLASSES: { name: string; note: string; Mark: () => JSX.Element }[] = [
  { name: "Defense", note: "ISR and tactical response", Mark: DefenceMark },
  { name: "Earth Observation", note: "Imaging and monitoring fleets", Mark: EarthObservationMark },
  { name: "Orbital Services", note: "Servicing, inspection, debris", Mark: OrbitalServicesMark },
  { name: "Deep Space", note: "High-latency, low-contact missions", Mark: DeepSpaceMark },
];

export function MissionClasses() {
  return (
    <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {CLASSES.map(({ name, note, Mark }, i) => (
        <Reveal key={name} delay={i * 80} as="li">
          <div style={{ color: "var(--accent)" }}>
            <Mark />
          </div>
          <h3
            className="mt-5 border-t pt-5 text-base leading-snug"
            style={{ borderColor: "var(--border)" }}
          >
            {name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed">{note}</p>
        </Reveal>
      ))}
    </ul>
  );
}
