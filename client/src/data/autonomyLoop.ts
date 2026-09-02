/* ==========================================================================
   THE FIVE-STAGE AUTONOMY LOOP — Observe → Understand → Decide → Act → Verify
   --------------------------------------------------------------------------
   PRESERVED, NOT IN USE.

   This copy was the homepage "Orbtrix Approach" section, rendered as five
   columns. That section is now the architecture console, which is deliberately
   a five-second read — the pipeline below is too much information for it.

   Observe / Decide / Act are the original approved wording from the pinned
   full-screen chapters the section grew out of. Understand and Verify were
   written when the loop went from three stages to five.

   It is kept here rather than deleted because the detail belongs somewhere —
   the DISHA page or a dedicated technology page — and
   rewriting it from scratch later would lose the approved originals. Import
   PANELS wherever that lands.
   ========================================================================== */

/** A paragraph as segments, so keywords can be marked without parsing markup. */
export type Segment = { text: string; accent?: boolean };

export interface LoopStage {
  numeral: string;
  title: string;
  subtitle: string;
  body: Segment[];
  labels: string[];
}

export const PANELS: LoopStage[] = [
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
    title: "Understand",
    subtitle: "Interpretation Layer",
    body: [
      { text: "Resolve that picture into an assessment of spacecraft state, health, and " },
      { text: "mission context", accent: true },
      { text: " — what is actually happening, not just what the numbers read." },
    ],
    labels: ["State assessment", "Health evaluation", "Mission context"],
  },
  {
    numeral: "03",
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
    numeral: "04",
    title: "Act",
    subtitle: "Execution Layer",
    body: [
      { text: "Carry mission and recovery procedures through execution across ground and orbit, turning decisions into actions " },
      { text: "without waiting for a human in the loop", accent: true },
      { text: "." },
    ],
    labels: ["Command execution", "Autonomous recovery", "Ground-orbit sync"],
  },
  {
    numeral: "05",
    title: "Verify",
    subtitle: "Assurance Layer",
    body: [
      { text: "Check the outcome of each action against what was intended, and " },
      { text: "feed the result back into the loop", accent: true },
      { text: " so the next decision is made on what happened, not what was planned." },
    ],
    labels: ["Outcome assessment", "Loop closure", "Operational record"],
  },
];
