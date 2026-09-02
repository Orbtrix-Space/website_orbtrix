import type { CSSProperties } from "react";
import {
  Chain,
  Panel,
  Readout,
  polylineLength,
  step,
  toPath,
} from "@/components/tech/TechParts";

/* ==========================================================================
   Solutions — the page-specific figures.

   Each page gets its own plates. That is the point: NETRA, NEXUS and Onboard
   Optical share a design language, not a layout, and three pages carrying the
   same chart would say the three capabilities are the same capability.

   Nothing here invents data. Every plate carries shape, structure or a word
   state; there is not one altitude, timestamp, count, percentage or bandwidth
   figure in this file. Where a figure is conceptual it is labelled as such on
   the page that renders it.
   ========================================================================== */

const draw = (len: number, i: number) => ({ "--len": len, "--i": i }) as CSSProperties;

/* ==========================================================================
   NETRA
   ========================================================================== */

/** A deterministic trace. Sines, not noise — a random walk would redraw
    differently on every render and stop being a design. */
function trace(width: number, mid: number, amp: number, phase: number, ripple: number) {
  return Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const x = t * width;
    const y =
      mid +
      amp * Math.sin(t * 6.2 + phase) +
      amp * 0.4 * Math.sin(t * 15.5 + phase * 2) +
      ripple * Math.sin(t * 34 + phase);
    return [x, y] as [number, number];
  });
}

const NETRA_TRACES = [
  { pts: trace(440, 26, 9, 0.4, 1.6), lead: false },
  { pts: trace(440, 62, 11, 2.1, 1.2), lead: true },
  { pts: trace(440, 98, 8, 3.6, 1.8), lead: false },
  { pts: trace(440, 134, 10, 5.2, 1.1), lead: false },
];

/**
 * NETRA's opening plate: four parameters on one set of axes, one of them lit.
 * The argument of the whole page in one picture — the data is not the problem,
 * knowing which line matters is.
 */
export function TelemetryPlate() {
  return (
    <Panel tag="NETRA / telemetry" meta="spacecraft state">
      <svg
        viewBox="0 0 440 160"
        className="sol-fig block h-auto w-full"
        role="img"
        aria-label="Four spacecraft parameters plotted together, with one highlighted. Illustrative: no values are shown."
      >
        <g className="dsh-fig-grid">
          {[26, 62, 98, 134].map((y) => (
            <line key={y} x1="0" y1={y} x2="440" y2={y} strokeDasharray="2 6" />
          ))}
        </g>

        {NETRA_TRACES.map((t, i) => {
          const d = toPath(t.pts);
          return (
            <path
              key={i}
              d={d}
              className={`${t.lead ? "dsh-fig-arc" : "sol-fig-faint"} dsh-draw`}
              style={draw(polylineLength(t.pts), i)}
            />
          );
        })}
      </svg>

      <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <Readout
          rows={[
            { label: "PARAMETERS", value: "OBSERVED" },
            { label: "STATE", value: "NOMINAL" },
            { label: "EVENTS", value: "TRACKED", tone: "accent" },
            { label: "ALERTS", value: "SURFACED" },
          ]}
        />
      </div>
    </Panel>
  );
}

/* An expected band and an observed parameter that leaves it. The band is a
   shape, not a tolerance: no limits are stated anywhere. */
const BASE = (t: number) => 74 + 20 * Math.sin(t * 5.1) + 7 * Math.sin(t * 12.7);
const BAND_TOP = Array.from({ length: 61 }, (_, i) => {
  const t = i / 60;
  return [t * 440, BASE(t) - 16] as [number, number];
});
const BAND_BOTTOM = Array.from({ length: 61 }, (_, i) => {
  const t = 1 - i / 60;
  return [t * 440, BASE(t) + 16] as [number, number];
});
const OBSERVED = Array.from({ length: 61 }, (_, i) => {
  const t = i / 60;
  // Departs the band beyond ~62% and keeps going. A deviation, not a spike.
  const departure = t > 0.62 ? Math.pow((t - 0.62) / 0.38, 1.7) * 46 : 0;
  return [t * 440, BASE(t) + 4 * Math.sin(t * 23) - departure] as [number, number];
});
const DEVIATION_X = 0.62 * 440;

/** NETRA's anomaly plate: expected, observed, and the point they separate. */
export function AnomalyPlate() {
  return (
    <Panel tag="NETRA / anomaly" meta="expected vs observed">
      <svg
        viewBox="0 0 440 150"
        className="sol-fig block h-auto w-full"
        role="img"
        aria-label="An expected band, an observed parameter, and the point at which the observed value departs from the band. Illustrative: no values are shown."
      >
        <path d={`${toPath(BAND_TOP)} L ${toPath(BAND_BOTTOM).slice(2)} Z`} className="sol-fig-band" />
        <path d={toPath(BAND_TOP)} className="sol-fig-faint" />
        <path d={toPath(BAND_BOTTOM)} className="sol-fig-faint" />

        <path
          d={toPath(OBSERVED)}
          className="dsh-fig-arc dsh-draw"
          style={draw(polylineLength(OBSERVED), 1)}
        />

        <line
          x1={DEVIATION_X}
          y1="8"
          x2={DEVIATION_X}
          y2="142"
          className="dsh-fig-plan"
        />
        <circle cx={DEVIATION_X} cy={BASE(0.62) + 4 * Math.sin(0.62 * 23)} r="3.5" className="sol-fig-mark" />

        <text x="8" y="18" className="dsh-fig-label">EXPECTED</text>
        <text x={DEVIATION_X + 8} y="18" className="dsh-fig-label" data-on="true">
          DEVIATION
        </text>
        <text x="8" y="142" className="dsh-fig-label" data-on="true">OBSERVED</text>
      </svg>
    </Panel>
  );
}

/** NETRA's fleet plate: word states only, then the drill-down beneath them. */
export function FleetPlate({
  craft,
  drill,
}: {
  craft: { id: string; state: string }[];
  drill: string[];
}) {
  return (
    <Panel tag="NETRA / fleet" meta="conceptual">
      <ul>
        {craft.map((c) => (
          <li
            key={c.id}
            className="sol-row"
            data-state={c.state === "ATTENTION" ? "attention" : "nominal"}
          >
            <span className="sol-row-id">
              <span className="sol-row-dot" aria-hidden="true" />
              {c.id}
            </span>
            <span className="sol-row-state">{c.state}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-6" style={{ borderColor: "var(--border)" }}>
        <Chain steps={drill} />
      </div>
    </Panel>
  );
}

/**
 * NETRA's integration plate. Six interfaces, one hub. The rails are the claim:
 * NETRA is designed to sit around what a mission already runs, not to replace
 * it — so nothing here points outward from NETRA into someone else's system.
 */
export function IntegrationPlate({ nodes }: { nodes: string[] }) {
  const left = nodes.slice(0, 3);
  const right = nodes.slice(3);
  const rowY = [56, 130, 204];

  return (
    <svg
      viewBox="0 0 560 260"
      className="sol-fig block h-auto w-full"
      role="img"
      aria-label={`NETRA connects to ${nodes.join(", ")}.`}
    >
      {left.map((label, i) => (
        <g key={label}>
          <path
            d={`M 196 ${rowY[i]} Q 232 ${rowY[i]} 232 130`}
            className="dsh-fig-rail"
          />
          <circle cx="196" cy={rowY[i]} r="3" className="dsh-fig-node" />
          <text x="184" y={rowY[i] + 3.5} textAnchor="end" className="dsh-fig-label">
            {label}
          </text>
        </g>
      ))}

      {right.map((label, i) => (
        <g key={label}>
          <path
            d={`M 364 ${rowY[i]} Q 328 ${rowY[i]} 328 130`}
            className="dsh-fig-rail"
          />
          <circle cx="364" cy={rowY[i]} r="3" className="dsh-fig-node" />
          <text x="376" y={rowY[i] + 3.5} className="dsh-fig-label">
            {label}
          </text>
        </g>
      ))}

      <rect x="232" y="106" width="96" height="48" rx="8" className="dsh-fig-node" data-on="true" />
      <text
        x="280"
        y="134"
        textAnchor="middle"
        className="dsh-fig-label"
        data-on="true"
        style={{ fontSize: 12, letterSpacing: "0.14em" }}
      >
        NETRA
      </text>
    </svg>
  );
}

/* ==========================================================================
   NEXUS
   ========================================================================== */

/**
 * NEXUS's opening plate: activities above, the passes they have to fit into
 * below. Deliberately NOT the DISHA_Task multi-resource timeline — this is one
 * band, and the point it makes is the drop from a wanted activity to the
 * contact that can actually carry it.
 *
 * Percentages are proportions of a picture. There is no clock on this axis.
 */
const NEXUS_TASKS = [
  { label: "OBSERVATION", from: 6, to: 24, pass: 0 },
  { label: "DOWNLINK", from: 38, to: 56, pass: 1 },
  { label: "MANEUVER", from: 70, to: 88, pass: 2 },
];
const NEXUS_PASSES = [
  { from: 8, to: 26 },
  { from: 42, to: 62 },
  { from: 72, to: 90 },
];

export function TaskingPlate() {
  const x = (pct: number) => (pct / 100) * 440;

  return (
    <Panel tag="NEXUS / tasking" meta="conceptual">
      <svg
        viewBox="0 0 440 176"
        className="sol-fig block h-auto w-full"
        role="img"
        aria-label="Requested activities above, the ground-contact windows they are scheduled into below. Conceptual: the axis carries no times."
      >
        <text x="0" y="14" className="dsh-fig-label">TASKS</text>

        {NEXUS_TASKS.map((t, i) => (
          <g key={t.label}>
            <rect
              x={x(t.from)}
              y="28"
              width={x(t.to) - x(t.from)}
              height="26"
              rx="4"
              className="dsh-fig-node"
              data-on="true"
            />
            <text
              x={x(t.from) + 8}
              y="45"
              className="dsh-fig-label"
              data-on="true"
              style={{ fontSize: 8 }}
            >
              {t.label}
            </text>
            <path
              d={`M ${x(t.from) + 10} 54 L ${x(NEXUS_PASSES[i].from) + 10} 120`}
              className="dsh-fig-rail"
              data-on="true"
            />
          </g>
        ))}

        {/* The axis. Ticks mark structure; structure is all it claims. */}
        <line x1="0" y1="82" x2="440" y2="82" className="dsh-fig-grid" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1={i * 40} y1="82" x2={i * 40} y2="88" className="dsh-fig-grid" />
        ))}

        {/* Row label ABOVE its row, as TASKS is — beside the row it collides
            with whichever window happens to start furthest left. */}
        <text x="0" y="110" className="dsh-fig-label">PASSES</text>
        {NEXUS_PASSES.map((p, i) => (
          <rect
            key={i}
            x={x(p.from)}
            y="120"
            width={x(p.to) - x(p.from)}
            height="22"
            rx="3"
            className="sol-fig-faint"
          />
        ))}

        <text x="0" y="164" className="dsh-fig-label">
          GROUND-CONTACT WINDOWS
        </text>
      </svg>
    </Panel>
  );
}

/**
 * NEXUS's problem plate: everything on the left depends on everything on the
 * right. Twelve hairlines for seven concepts — the picture IS the argument
 * that this is what stops fitting in a spreadsheet.
 */
export function DependencyPlate({ nodes }: { nodes: string[] }) {
  const left = nodes.slice(0, 3);
  const right = nodes.slice(3);
  const leftY = [40, 100, 160];
  const rightY = [26, 78, 130, 182];

  return (
    <svg
      viewBox="0 0 560 210"
      className="sol-fig block h-auto w-full"
      role="img"
      aria-label={`Operational dependencies between ${left.join(", ")} and ${right.join(", ")}.`}
    >
      {leftY.map((y1) =>
        rightY.map((y2) => (
          <line key={`${y1}-${y2}`} x1="212" y1={y1} x2="348" y2={y2} className="sol-fig-faint" />
        )),
      )}

      {left.map((label, i) => (
        <g key={label}>
          <circle cx="212" cy={leftY[i]} r="3" className="dsh-fig-node" data-on="true" />
          <text x="200" y={leftY[i] + 3.5} textAnchor="end" className="dsh-fig-label" data-on="true">
            {label}
          </text>
        </g>
      ))}

      {right.map((label, i) => (
        <g key={label}>
          <circle cx="348" cy={rightY[i]} r="3" className="dsh-fig-node" />
          <text x="360" y={rightY[i] + 3.5} className="dsh-fig-label">
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/**
 * NEXUS's scheduling plate: six kinds of input, one schedule. The convergence
 * is the whole point — a schedule is what is left once they agree.
 */
export function ConvergePlate({ inputs, output }: { inputs: string[]; output: string }) {
  const y = (i: number) => 26 + i * 42;

  return (
    <svg
      viewBox="0 0 620 262"
      className="sol-fig block h-auto w-full"
      role="img"
      aria-label={`${inputs.join(", ")} converge into an ${output.toLowerCase()}.`}
    >
      {inputs.map((label, i) => (
        <g key={label}>
          <path d={`M 268 ${y(i)} C 340 ${y(i)} 360 131 424 131`} className="dsh-fig-rail" />
          <circle cx="268" cy={y(i)} r="3" className="dsh-fig-node" />
          <text x="256" y={y(i) + 3.5} textAnchor="end" className="dsh-fig-label">
            {label}
          </text>
        </g>
      ))}

      <rect x="424" y="107" width="180" height="48" rx="8" className="dsh-fig-node" data-on="true" />
      <text
        x="514"
        y="135"
        textAnchor="middle"
        className="dsh-fig-label"
        data-on="true"
        style={{ letterSpacing: "0.13em" }}
      >
        {output}
      </text>
    </svg>
  );
}

/** NEXUS's scale row: the same architecture, more spacecraft in it. */
export function ScalePlate({ stages }: { stages: string[] }) {
  const counts = [1, 3, 12];

  return (
    <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
      {stages.map((stage, i) => (
        <li key={stage} className="sol-spec" style={step(i)}>
          <span className="sol-spec-i">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <svg viewBox="0 0 120 34" className="h-7 w-[7.5rem]" aria-hidden="true">
              {Array.from({ length: counts[i] }, (_, n) => {
                const col = n % 6;
                const row = Math.floor(n / 6);
                const cx = 6 + col * 18;
                const cy = counts[i] > 6 ? 10 + row * 15 : 17;
                return (
                  <rect
                    key={n}
                    x={cx - 3.5}
                    y={cy - 3.5}
                    width="7"
                    height="7"
                    transform={`rotate(45 ${cx} ${cy})`}
                    fill="var(--accent-mark)"
                  />
                );
              })}
            </svg>
            <p className="sol-spec-code mt-3">{stage}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ==========================================================================
   ONBOARD OPTICAL PROCESSING
   ========================================================================== */

/**
 * Optical's opening plate: collected frames on the left, one mission product
 * on the right. The tile count is a picture of "many frames", not a claim
 * about a capture rate.
 */
export function ProductPlate() {
  const cols = 4;
  const rows = 3;

  return (
    <Panel tag="ONBOARD_OPTICAL / pipeline" meta="raw → product">
      <svg
        viewBox="0 0 440 176"
        className="sol-fig block h-auto w-full"
        role="img"
        aria-label="Collected frames on the left, reduced onboard to a single mission product on the right. Illustrative."
      >
        <text x="0" y="12" className="dsh-fig-label">RAW FRAMES</text>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 38}
              y={26 + r * 38}
              width="30"
              height="30"
              rx="2"
              className="sol-fig-faint"
            />
          )),
        )}

        {/* The reduction. Four rails in, one out. */}
        {[41, 79, 117].map((y, i) => (
          <path key={i} d={`M 158 ${y} C 210 ${y} 214 79 262 79`} className="dsh-fig-rail" />
        ))}

        <text x="290" y="12" className="dsh-fig-label" data-on="true">
          MISSION PRODUCT
        </text>
        <rect x="290" y="45" width="68" height="68" rx="4" className="dsh-fig-node" data-on="true" />
        <path d="M 300 96 L 316 74 L 328 88 L 340 70 L 348 96 Z" className="sol-fig-mark" opacity="0.75" />

        <path d="M 372 79 L 428 79" className="dsh-fig-rail" data-on="true" />
        <path d="M 420 74 L 428 79 L 420 84" className="dsh-fig-rail" data-on="true" />
        <text x="372" y="104" className="dsh-fig-label">DOWNLINK</text>
      </svg>
    </Panel>
  );
}

/**
 * Optical's problem plate: the payload collects across the orbit, the link
 * opens for a fraction of it. Structurally true — collection is continuous,
 * contacts are discrete — and it states no ratio, because the ratio is a
 * property of a specific mission.
 */
export function DownlinkPlate() {
  const passes = [
    { from: 14, to: 23 },
    { from: 48, to: 58 },
    { from: 79, to: 88 },
  ];
  const x = (pct: number) => (pct / 100) * 480;

  return (
    <svg
      viewBox="0 0 480 132"
      className="sol-fig block h-auto w-full"
      role="img"
      aria-label="The payload collects continuously; ground contacts open for part of the orbit. Illustrative: the axis carries no times."
    >
      <text x="0" y="12" className="dsh-fig-label" data-on="true">COLLECTION</text>
      {/* Filled, not outlined: an empty outline here reads as a form field
          rather than as a band of collected data. */}
      <rect x="0" y="24" width="480" height="22" rx="3" className="sol-fig-band" />
      <rect x="0" y="24" width="480" height="22" rx="3" className="dsh-fig-arc" />

      <text x="0" y="76" className="dsh-fig-label">GROUND CONTACT</text>
      <line x1="0" y1="98" x2="480" y2="98" className="dsh-fig-grid" strokeDasharray="2 6" />
      {passes.map((p, i) => (
        <rect
          key={i}
          x={x(p.from)}
          y="88"
          width={x(p.to) - x(p.from)}
          height="22"
          rx="3"
          className="sol-fig-faint"
        />
      ))}

      <text x="0" y="128" className="dsh-fig-label">
        THE CONSTRAINT IS THE PASS, NOT THE SENSOR
      </text>
    </svg>
  );
}
