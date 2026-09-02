import { useState } from "react";
import { EARLY_ADOPTER, type Capability } from "@/data/disha";
import {
  Panel,
  Readout,
  Terminal,
  polylineLength,
  step,
  toPath,
} from "@/components/tech/TechParts";

/* ==========================================================================
   DISHA page — the four module instruments.

   One per module screen, and each is a different instrument on purpose: a
   control log, a flight-dynamics plate, an operational picture, and a
   schedule. Four copies of the same chart would say the four modules are the
   same thing.

   What none of them do is invent data. There is not a single altitude,
   velocity, timestamp, count or percentage anywhere in this file. The plots
   carry shape, the readouts carry word states, and the one place a value
   would normally sit is left as a dash. That constraint is what keeps the
   page from claiming a spacecraft it does not have.
   ========================================================================== */

/* ==========================================================================
   01 — DISHA_C3
   ========================================================================== */

const C3_LINES = [
  { kind: "cmd" as const, text: "mission.execute()" },
  { kind: "ack" as const, text: "procedure loaded" },
  { kind: "ack" as const, text: "commands validated" },
  { kind: "ack" as const, text: "uplink scheduled" },
  { kind: "ack" as const, text: "execution confirmed" },
];

/* Deliberately different vocabulary from the log above it. The log says what
   just happened; the readout says how the layer is configured — which is the
   part that distinguishes a control layer from a command console. */
const C3_STATE = [
  { label: "LAYER", value: "COMMAND & CONTROL" },
  { label: "VALIDATION", value: "BEFORE EXECUTION", tone: "accent" as const },
  { label: "SEQUENCING", value: "ORDERED" },
  { label: "GROUND LINK", value: "SCHEDULED" },
  { label: "OPERATOR", value: "IN THE LOOP" },
];

export function C3Console() {
  return (
    <Panel tag="DISHA_C3 / control" meta="execution path">
      <Terminal lines={C3_LINES} />

      <div className="mt-7 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <Readout rows={C3_STATE} />
      </div>
    </Panel>
  );
}

/* ==========================================================================
   02 — DISHA_FLIGHT

   The one module screen whose right-hand half is a photograph rather than a
   drawing, so it does not get a <Panel> instrument at all: the spacecraft IS
   the instrument, and the capabilities move into the reading column beside it.

   What was here before was a drawn orbit plate — a tilted ellipse sliced into
   flown, propagated and planned arcs. It was replaced rather than kept
   alongside, because two orbits on one screen is one orbit too many. It is in
   the history if the photograph ever needs to come back out.
   ========================================================================== */

/** A module screen's photographic ground. */
export interface ModuleHero {
  image: string;
  imageWebp: string;
  alt: string;
  /** The asset's own pixel dimensions. They differ per photograph, and a
      hardcoded pair here would be wrong for one of them. */
  width: number;
  height: number;
  /** Flip on one axis. Only for frames with no readable content in them. */
  mirrored: boolean;
  /** Which side of the screen the photograph occupies. */
  side: "left" | "right";
}

/**
 * The photograph, its mask and its scrim.
 *
 * Absolutely positioned to fill the screen behind the reading column; all of
 * the composition lives in the .dsh-hero-* CSS, which is where the mask
 * geometry is documented.
 *
 * `side` is written to the wrapper as a data attribute and the CSS mirrors the
 * mask and the scrim from there — one set of rules, two layouts. It exists
 * because the two module photographs are composed as mirrors of each other and
 * only one of them can safely be flipped in software.
 */
export function ModuleHeroMedia({ hero }: { hero: ModuleHero }) {
  return (
    <div className="dsh-hero-media" data-side={hero.side}>
      <picture>
        <source srcSet={hero.imageWebp} type="image/webp" />
        <img
          src={hero.image}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          loading="lazy"
          decoding="async"
          className="dsh-hero-img"
          data-mirrored={hero.mirrored ? "true" : undefined}
        />
      </picture>
      <span className="dsh-hero-veil" aria-hidden="true" />
    </div>
  );
}

/**
 * A module's key features.
 *
 * Every module screen renders its capabilities through this, and that is the
 * point of it existing. Flight had this block treatment and the other three
 * had a hairline specification list, which made one module look like a product
 * and three look like a datasheet — the same four layers of the same platform
 * should not disagree about what a feature looks like.
 *
 * Each block carries an index, an optional notation token, a rule and a
 * sentence. The token is aria-hidden because "☉ ⊕" read aloud is noise, not
 * information.
 *
 * `columns` is the only thing that varies: Flight sits in a 40% column beside
 * a photograph and takes two, the other three run full width under their
 * instrument and take three.
 */
export function ModuleFeatures({
  title,
  cmd,
  items,
  columns = 3,
}: {
  title: string;
  cmd: string;
  items: Capability[];
  columns?: 2 | 3;
}) {
  return (
    <div>
      <div
        className="flex items-baseline justify-between gap-4 border-b pb-3"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="dsh-mono text-ink" style={{ fontSize: "0.66rem", letterSpacing: "0.14em" }}>
          <span className="dsh-sigil" aria-hidden="true">
            #{" "}
          </span>
          {title}
        </h3>
        <span className="dsh-mono" style={{ fontSize: "0.6rem", color: "var(--accent)" }}>
          <span className="dsh-sigil" aria-hidden="true" style={{ color: "rgba(167, 139, 250, 0.5)" }}>
            ${" "}
          </span>
          {cmd}
        </span>
      </div>

      <ul
        className={`mt-4 grid gap-2.5 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
      >
        {items.map((item, i) => (
          <li key={item.code} className="dsh-feat" style={step(i)}>
            <div className="dsh-feat-head">
              <span className="dsh-feat-i">
                <span className="dsh-feat-mark" aria-hidden="true" />
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.symbol && (
                <span className="dsh-feat-sym" aria-hidden="true">
                  {item.symbol}
                </span>
              )}
            </div>

            <p className="dsh-feat-code">{item.code}</p>
            <div className="dsh-feat-rule" aria-hidden="true" />
            <p className="dsh-feat-desc">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   03 — DISHA_MONITOR

   The drill-down is the section's argument made operable: the visitor moves
   CONSTELLATION → SPACECRAFT → SUBSYSTEM → PARAMETER themselves and watches
   the readout follow, which is the "bring the information to them" claim
   demonstrated rather than asserted.
   ========================================================================== */

interface Level {
  code: string;
  scope: string;
  rows: { label: string; value: string; tone?: "accent" | "idle" }[];
}

const LEVELS: Level[] = [
  {
    code: "CONSTELLATION",
    scope: "Fleet-level operational awareness.",
    rows: [
      { label: "SCOPE", value: "FLEET" },
      { label: "VIEW", value: "ALL SPACECRAFT" },
      { label: "SURFACED", value: "EVENTS & ALERTS", tone: "accent" },
      { label: "STATE", value: "AGGREGATED" },
    ],
  },
  {
    code: "SPACECRAFT",
    scope: "One spacecraft, in operational detail.",
    rows: [
      { label: "SCOPE", value: "SPACECRAFT" },
      { label: "MODE", value: "OPERATING" },
      { label: "CONTACT", value: "ACTIVE", tone: "accent" },
      { label: "HEALTH", value: "NOMINAL" },
    ],
  },
  {
    code: "SUBSYSTEM",
    scope: "Power, thermal, comms, attitude, storage.",
    rows: [
      { label: "SCOPE", value: "SUBSYSTEM" },
      { label: "STATE", value: "NOMINAL" },
      { label: "EVENTS", value: "TRACKED" },
      { label: "HISTORY", value: "RETAINED", tone: "accent" },
    ],
  },
  {
    code: "PARAMETER",
    scope: "A single telemetry parameter, over time.",
    rows: [
      { label: "SCOPE", value: "PARAMETER" },
      { label: "SOURCE", value: "TELEMETRY" },
      { label: "LIMITS", value: "MONITORED", tone: "accent" },
      { label: "VALUE", value: "—", tone: "idle" },
    ],
  },
];

/* A trend line with no axis and no values: the SHAPE of a parameter over time
   is the honest part of this picture, and it is also the only part an operator
   reads at a glance. Built from a fixed sum of sines so it is deterministic —
   a random walk would redraw differently on every render. */
const TRACE = Array.from({ length: 61 }, (_, i) => {
  const t = i / 60;
  const y = 30 + 12 * Math.sin(t * 7.5) + 6 * Math.sin(t * 19 + 1.2) + 3 * Math.sin(t * 41);
  return [i * (300 / 60), y] as [number, number];
});
const TRACE_PATH = toPath(TRACE);
const TRACE_LEN = polylineLength(TRACE);

export function MonitorPicture() {
  const [active, setActive] = useState(1);

  return (
    <Panel tag="DISHA_Monitor / picture" meta="mission state">
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- Drill-down ---- */}
        <div>
          {LEVELS.map((level, i) => (
            <div key={level.code}>
              {i > 0 && <div className="dsh-drop" aria-hidden="true" />}
              <button
                type="button"
                className="dsh-drill"
                data-on={active === i}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span className="dsh-drill-mark" aria-hidden="true" />
                <span className="dsh-mono text-[0.63rem]">{level.code}</span>
              </button>
            </div>
          ))}
        </div>

        {/* ---- Readout for the selected level ---- */}
        <div className="flex flex-col">
          <p className="dsh-cap-desc mt-0">{LEVELS[active].scope}</p>
          <Readout rows={LEVELS[active].rows} className="mt-4" />

          <div className="mt-6 border-t pt-4" style={{ borderColor: "var(--border)" }}>
            <p className="dsh-panel-tag">Parameter trend</p>
            <svg
              viewBox="0 0 300 60"
              className="mt-3 block h-auto w-full"
              role="img"
              aria-label="An illustrative telemetry trend line. No values are shown."
            >
              <g className="dsh-fig-grid">
                <line x1="0" y1="14" x2="300" y2="14" strokeDasharray="2 6" />
                <line x1="0" y1="46" x2="300" y2="46" strokeDasharray="2 6" />
              </g>
              <path
                d={TRACE_PATH}
                className="dsh-fig-arc dsh-draw"
                style={{ "--len": TRACE_LEN, "--i": 2 } as React.CSSProperties}
              />
            </svg>
          </div>
        </div>
      </div>
    </Panel>
  );
}


/* ==========================================================================
   Early Adopter Programme — its backdrop.
   ========================================================================== */

/**
 * The section's ground.
 *
 * The photograph IS the section rather than an illustration inside it, so it
 * is an absolutely-positioned layer behind the content and the section is
 * sized to the viewport around it.
 *
 * object-fit: cover with a left anchor, because the composition is not
 * symmetrical: the spacecraft, Earth and console occupy the left, and the
 * right is near-black. Anchoring left means a narrow viewport crops the empty
 * side rather than the subject — the opposite of what a centred crop does.
 *
 * The scrim is ONE flat layer at low opacity. The copy sits over the part of
 * the frame that is already dark, so heavy darkening would be solving a
 * problem the composition does not have.
 */
export function InviteBackdrop() {
  return (
    <div className="dsh-invite-bg" aria-hidden="true">
      <picture>
        <source srcSet={EARLY_ADOPTER.imageWebp} type="image/webp" />
        <img
          src={EARLY_ADOPTER.image}
          alt=""
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="dsh-invite-img"
        />
      </picture>
      <span className="dsh-invite-scrim" />
    </div>
  );
}
