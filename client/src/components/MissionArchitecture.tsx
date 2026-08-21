import { useEffect, useState, type CSSProperties } from "react";
import { Plus } from "lucide-react";

/**
 * Single-screen mission architecture visual.
 *
 * Left: a 2D CAD-style line diagram — Spacecraft (top-right), Ground station
 * (centre), Mission operator (bottom-left) — linked by thin purple lines that
 * ARE the Orbtrix autonomy layer, with subtle data packets moving along them.
 * Right: a stack of expandable cards. Opening a card highlights its system in
 * the diagram; clicking a system opens its card. Black CAD line-art; purple
 * only for the Orbtrix layer and active states.
 *
 * The CAD nodes are placeholders for real 2D CAD assets — drop an <image> into
 * each group's slot and remove the vector stand-in.
 */

type NodeId = "sat" | "gnd" | "opr";

interface Card {
  n: string;
  title: string;
  body: string;
  node: NodeId;
}

const CARDS: Card[] = [
  {
    n: "01",
    title: "Onboard Autonomy",
    body: "Spacecraft observes its state, detects anomalies, makes decisions, and executes actions when ground contact is unavailable.",
    node: "sat",
  },
  {
    n: "02",
    title: "Ground Intelligence",
    body: "Orbtrix processes telemetry, predicts issues, plans operations, and keeps spacecraft behavior synchronized.",
    node: "gnd",
  },
  {
    n: "03",
    title: "Mission Execution",
    body: "Operators approve high-level objectives while Orbtrix handles routine monitoring and operational workflows.",
    node: "opr",
  },
];

/* -------------------------------------------------------------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/* ---- Node anchor points (SVG user units) ---- */
const POS: Record<NodeId, { x: number; y: number }> = {
  sat: { x: 495, y: 120 },
  gnd: { x: 325, y: 285 },
  opr: { x: 150, y: 450 },
};

const INK = "var(--text-primary)";
const ACCENT = "var(--accent)";

/* ---- CAD line-art, drawn at origin then translated to each node ---- */

function Satellite({ active }: { active: boolean }) {
  const c = active ? ACCENT : INK;
  return (
    <g stroke={c} strokeWidth="1.4" fill="none" strokeLinejoin="round">
      {/* body */}
      <rect x="-18" y="-18" width="36" height="36" fill="var(--bg)" />
      <line x1="-18" y1="-6" x2="18" y2="-6" />
      <line x1="-18" y1="6" x2="18" y2="6" />
      {/* panel arms */}
      <line x1="-18" y1="0" x2="-26" y2="0" />
      <line x1="18" y1="0" x2="26" y2="0" />
      {/* solar panels with cells */}
      <rect x="-64" y="-14" width="38" height="28" fill="var(--bg)" />
      <rect x="26" y="-14" width="38" height="28" fill="var(--bg)" />
      {[-52, -40].map((x) => (
        <line key={`l${x}`} x1={x} y1="-14" x2={x} y2="14" />
      ))}
      {[38, 50].map((x) => (
        <line key={`r${x}`} x1={x} y1="-14" x2={x} y2="14" />
      ))}
      <line x1="-64" y1="0" x2="-26" y2="0" />
      <line x1="26" y1="0" x2="64" y2="0" />
      {/* dish */}
      <circle cx="0" cy="-30" r="7" fill="var(--bg)" />
      <line x1="0" y1="-23" x2="0" y2="-18" />
    </g>
  );
}

function GroundStation({ active }: { active: boolean }) {
  const c = active ? ACCENT : INK;
  return (
    <g stroke={c} strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round">
      {/* parabolic dish (tilted) */}
      <g transform="rotate(-28)">
        <ellipse cx="0" cy="-18" rx="30" ry="19" fill="var(--bg)" />
        <ellipse cx="0" cy="-18" rx="18" ry="11" />
        {/* feed arm */}
        <line x1="0" y1="-18" x2="0" y2="2" />
        <circle cx="0" cy="4" r="2.5" fill={c} stroke="none" />
      </g>
      {/* mount + base */}
      <line x1="-2" y1="6" x2="-14" y2="34" />
      <line x1="6" y1="2" x2="16" y2="34" />
      <line x1="-20" y1="34" x2="22" y2="34" />
    </g>
  );
}

function Operator({ active }: { active: boolean }) {
  const c = active ? ACCENT : INK;
  return (
    <g stroke={c} strokeWidth="1.4" fill="none" strokeLinejoin="round">
      {/* monitor */}
      <rect x="-34" y="-26" width="68" height="46" rx="3" fill="var(--bg)" />
      {/* mission-control wireframe on screen */}
      <line x1="-26" y1="-16" x2="-6" y2="-16" />
      <line x1="-26" y1="-8" x2="12" y2="-8" />
      <rect x="-26" y="0" width="24" height="12" />
      <path d="M6,12 L14,2 L22,8 L28,-2" strokeWidth="1.2" />
      {/* stand + desk */}
      <line x1="0" y1="20" x2="0" y2="30" />
      <line x1="-16" y1="30" x2="16" y2="30" />
    </g>
  );
}

function NodeLabel({ id, active, children }: { id: NodeId; active: boolean; children: string }) {
  const { x, y } = POS[id];
  return (
    <text
      x={x}
      y={y + 62}
      textAnchor="middle"
      fontFamily="var(--font-sans)"
      fontSize="12"
      letterSpacing="0.5"
      fill={active ? ACCENT : "var(--text-muted)"}
      style={{ transition: "fill 240ms var(--ease)" }}
    >
      {children}
    </text>
  );
}

/* ---- A link line with two counter-flowing packets (telemetry ↓ / commands ↑) ---- */
function Link({ from, to, animate }: { from: NodeId; to: NodeId; animate: boolean }) {
  const a = POS[from];
  const b = POS[to];
  const d = `M${a.x},${a.y} L${b.x},${b.y}`;
  const rd = `M${b.x},${b.y} L${a.x},${a.y}`;
  return (
    <g>
      <path d={d} stroke={ACCENT} strokeWidth="1" opacity="0.55" fill="none" />
      {animate && (
        <>
          <circle r="3" fill={ACCENT}>
            <animateMotion dur="3.2s" repeatCount="indefinite" path={d} />
          </circle>
          <circle r="2.5" fill={ACCENT} opacity="0.6">
            <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path={rd} />
          </circle>
        </>
      )}
    </g>
  );
}

/* -------------------------------------------------------------------------- */

function Diagram({
  active,
  onPick,
  animate,
}: {
  active: NodeId | null;
  onPick: (id: NodeId) => void;
  animate: boolean;
}) {
  const node = (id: NodeId, label: string, Art: (p: { active: boolean }) => JSX.Element) => {
    const { x, y } = POS[id];
    const on = active === id;
    return (
      <g
        transform={`translate(${x},${y})`}
        onClick={() => onPick(id)}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={on}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPick(id)}
      >
        {/* generous invisible hit target */}
        <rect x="-70" y="-45" width="140" height="120" fill="transparent" />
        <Art active={on} />
      </g>
    );
  };

  return (
    <svg
      viewBox="0 0 640 540"
      className="h-auto w-full"
      style={{ maxHeight: "72svh" }}
      role="group"
      aria-label="Mission architecture: spacecraft, ground station and operator linked by the Orbtrix autonomy layer"
    >
      {/* Orbtrix autonomy layer: the purple links + a label tapping the hub. */}
      <Link from="sat" to="gnd" animate={animate} />
      <Link from="gnd" to="opr" animate={animate} />

      <g>
        <line x1="150" y1="168" x2="300" y2="270" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <rect x="66" y="120" width="150" height="44" rx="6" fill="var(--bg)" stroke={ACCENT} strokeWidth="1" />
        <text x="141" y="139" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="10.5" fontWeight="500" letterSpacing="1" fill={ACCENT}>
          ORBTRIX
        </text>
        <text x="141" y="153" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="9" letterSpacing="1.5" fill="var(--accent-deep)">
          AUTONOMY LAYER
        </text>
      </g>

      {node("sat", "Spacecraft", Satellite)}
      {node("gnd", "Ground station", GroundStation)}
      {node("opr", "Mission operator", Operator)}

      <NodeLabel id="sat" active={active === "sat"}>Spacecraft</NodeLabel>
      <NodeLabel id="gnd" active={active === "gnd"}>Ground station</NodeLabel>
      <NodeLabel id="opr" active={active === "opr"}>Mission operator</NodeLabel>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export function MissionArchitecture() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const activeNode = active === null ? null : CARDS[active].node;
  const pickNode = (id: NodeId) => {
    const idx = CARDS.findIndex((c) => c.node === id);
    setActive((cur) => (cur === idx ? null : idx));
  };

  return (
    <section className="flex min-h-[100svh] items-center py-24">
      <div className="container-page w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Diagram */}
          <div>
            <p className="eyebrow">Mission architecture</p>
            <h2 className="mt-4 text-[clamp(1.5rem,2.95vw,2.15rem)]">One system, ground to orbit</h2>
            <div className="mt-8">
              <Diagram active={activeNode} onPick={pickNode} animate={!reduced} />
            </div>
          </div>

          {/* Expandable cards */}
          <div className="flex flex-col gap-3">
            {CARDS.map((card, i) => {
              const open = active === i;
              return (
                <div
                  key={card.n}
                  className="border transition-colors duration-300"
                  style={{
                    borderColor: open ? "var(--accent)" : "var(--border)",
                    borderLeftWidth: "2px",
                    borderLeftColor: open ? "var(--accent)" : "var(--border)",
                    borderRadius: "var(--radius)",
                    backgroundColor: open ? "var(--accent-wash)" : "var(--bg)",
                  }}
                >
                  <button
                    onClick={() => setActive(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className="text-sm tabular-nums"
                      style={{ color: open ? "var(--accent)" : "var(--text-muted)" }}
                    >
                      {card.n}
                    </span>
                    <span
                      className="flex-1 text-base"
                      style={{ color: open ? "var(--accent-deep)" : "var(--text-primary)" }}
                    >
                      {card.title}
                    </span>
                    <Plus
                      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-brand"
                      style={{
                        color: open ? "var(--accent)" : "var(--text-muted)",
                        transform: open ? "rotate(45deg)" : "none",
                      }}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    className="grid transition-all duration-300 ease-brand"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-12 text-[0.9rem] leading-relaxed">{card.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
