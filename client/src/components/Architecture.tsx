import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * Our Architecture — DISHA, MiSync, Rigel OS as three faces of one stack.
 *
 * The interaction model is deliberately split in two:
 *
 *   - Everything a reader needs is rendered at full opacity from the start.
 *     Hover only *emphasises* — it lifts, lights, and staggers what is already
 *     on screen. Nothing is hidden behind a pointer, because that would strand
 *     touch and keyboard users and hide the copy from crawlers.
 *   - Per-frame pointer values (the radial highlight and the tilt) are written
 *     straight to CSS custom properties inside a rAF. Routing them through
 *     React state would re-render three cards on every mousemove.
 *
 * All the presentation lives in the `.arch-*` rules in index.css.
 */

interface Card {
  name: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  diagram: "disha" | "misync" | "rigel";
}

/* Copy is cut to one sentence and three pills per card. The whole section has
   to clear a single viewport, and card height is what that budget is spent on
   — every extra line here costs the fit. */
const CARDS: Card[] = [
  {
    name: "DISHA",
    subtitle: "Ground Intelligence Platform",
    description:
      "Mission control rebuilt for autonomy. Ingests telemetry, orbital dynamics, and spacecraft health to generate decisions, not dashboards.",
    capabilities: ["Command & Control", "Fleet Telemetry", "Anomaly Detection"],
    diagram: "disha",
  },
  {
    name: "MiSync",
    subtitle: "Ground–Orbit Synchronisation",
    description:
      "Keeps spacecraft and ground operationally consistent, moving state, context, and model updates whenever a link opens.",
    capabilities: ["State Sync", "Model Distribution", "Secure Checkpoints"],
    diagram: "misync",
  },
  {
    name: "Rigel OS",
    subtitle: "Onboard Autonomy",
    description:
      "Runs the full Observe–Decide–Act loop onboard, holding the mission through communication blackouts without ground intervention.",
    capabilities: ["Decision Engine", "Fault Recovery", "Command Execution"],
    diagram: "rigel",
  },
];

/* -------------------------------------------------------------------------- */
/* Technical diagrams. Stroke-only, drawn on a 320×88 field, inheriting colour
   from the card so they shift with the accent on hover. The dashed paths carry
   `.arch-flow`, which is defined as a paused animation and only set running
   while the card is active — an idle card costs nothing.

   The stroke/fill alphas below are tuned for the black surface these now sit
   on: the purple is unchanged, but the low values that read as "faint" on
   white read as "absent" on black, so each one is lifted while the hierarchy
   between them (rail < flow < node) is preserved.                             */

function DishaDiagram() {
  return (
    <svg viewBox="0 0 320 88" fill="none" className="h-full w-full" aria-hidden="true">
      {/* Three telemetry streams converging on the decision core */}
      {[18, 44, 70].map((y) => (
        <path
          key={y}
          d={`M4 ${y} H132`}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.6"
          className="arch-flow"
        />
      ))}
      <rect
        x="140"
        y="28"
        width="34"
        height="32"
        rx="4"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.85"
      />
      {/* Decision graph fanning out of the core */}
      <path d="M174 44 H214 L250 18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M174 44 H250" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M174 44 H214 L250 70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      {[18, 44, 70].map((y) => (
        <circle key={y} cx="252" cy={y} r="3.5" fill="currentColor" fillOpacity="0.8" />
      ))}
    </svg>
  );
}

function MisyncDiagram() {
  return (
    <svg viewBox="0 0 320 88" fill="none" className="h-full w-full" aria-hidden="true">
      {/* Orbit rail above, ground rail below */}
      <path d="M4 16 H300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" />
      <path d="M4 72 H300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" />
      {/* Synchronisation arcs crossing the gap in both directions */}
      <path
        d="M60 16 C 100 16, 100 72, 140 72"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
        className="arch-flow"
      />
      <path
        d="M164 72 C 204 72, 204 16, 244 16"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
        className="arch-flow"
      />
      {[60, 140, 164, 244].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={i === 0 || i === 3 ? 16 : 72}
          r="3.5"
          fill="currentColor"
          fillOpacity="0.8"
        />
      ))}
    </svg>
  );
}

function RigelDiagram() {
  return (
    <svg viewBox="0 0 320 88" fill="none" className="h-full w-full" aria-hidden="true">
      {/* The Observe–Decide–Act loop, closed onboard */}
      <circle
        cx="160"
        cy="44"
        r="33"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
        className="arch-flow"
      />
      {[
        [160, 11],
        [189, 61],
        [131, 61],
      ].map(([cx, cy]) => (
        <circle key={`${cx}`} cx={cx} cy={cy} r="4" fill="currentColor" fillOpacity="0.85" />
      ))}
      {/* Ground link, dropped — the loop keeps turning without it */}
      <path
        d="M4 44 H112"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.42"
        strokeDasharray="3 5"
      />
      <path
        d="M208 44 H316"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.42"
        strokeDasharray="3 5"
      />
    </svg>
  );
}

const DIAGRAMS = {
  disha: DishaDiagram,
  misync: MisyncDiagram,
  rigel: RigelDiagram,
};

/* -------------------------------------------------------------------------- */

/** Tilt ceiling, in degrees. Kept low on purpose — past ~3° this reads as a toy. */
const TILT = 2.5;

function ArchCard({
  card,
  active,
  dimmed,
  onEnter,
  onLeave,
}: {
  card: Card;
  active: boolean;
  dimmed: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pending = useRef({ rx: 0, ry: 0 });
  const Diagram = DIAGRAMS[card.diagram];

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    pending.current = {
      // Tilt away from the cursor: pushing right lifts the left edge.
      ry: (px - 0.5) * 2 * TILT,
      rx: (0.5 - py) * 2 * TILT,
    };

    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const p = pending.current;
      el.style.setProperty("--rx", `${p.rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${p.ry.toFixed(2)}deg`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      // Unwind the tilt so the card settles level rather than snapping flat
      // when the hover class drops off.
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
    onLeave();
  }, [onLeave]);

  return (
    <div
      ref={ref}
      // `h-full`: the grid stretches the <Reveal> wrapper to the row height,
      // but this card must fill that wrapper before `mt-auto` below has any
      // free space to push the capability pills into.
      className="arch-card flex h-full flex-col"
      data-hover={active ? "true" : "false"}
      data-dimmed={dimmed ? "true" : "false"}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={handleLeave}
    >
      {/* Diagram, with the drifting telemetry dots behind it */}
      <div className="arch-figure relative h-[58px] w-full" style={{ color: "var(--accent-mark)" }}>
        <span className="arch-particle" style={{ left: "12%", top: "22%" }} aria-hidden="true" />
        <span className="arch-particle" style={{ left: "63%", top: "68%" }} aria-hidden="true" />
        <span className="arch-particle" style={{ left: "84%", top: "31%" }} aria-hidden="true" />
        <Diagram />
      </div>

      <h3
        className="arch-stage arch-accent mt-7 text-[clamp(1.35rem,1.9vw,1.7rem)] font-semibold leading-none tracking-tight"
        style={{ "--stage-delay": "0ms" } as CSSProperties}
      >
        {card.name}
      </h3>

      <p
        className="arch-stage mt-2.5 text-[0.78rem] font-normal"
        style={{ color: "var(--text-muted)", "--stage-delay": "60ms" } as CSSProperties}
      >
        {card.subtitle}
      </p>

      <p
        className="arch-stage mt-5 text-pretty text-[0.88rem] font-light leading-relaxed"
        style={{ color: "var(--text-muted)", "--stage-delay": "120ms" } as CSSProperties}
      >
        {card.description}
      </p>

      {/* `mt-auto` floats the pills to the foot of the tallest card, so the
          three capability blocks line up despite unequal description lengths. */}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-7">
        {card.capabilities.map((cap, i) => (
          <li
            key={cap}
            className="arch-cap rounded-pill border px-2.5 py-1.5 text-[10.5px] leading-none"
            style={
              {
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                backgroundColor: "var(--accent-wash)",
                "--cap-delay": `${i * 50}ms`,
              } as CSSProperties
            }
          >
            {cap}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Architecture() {
  const [active, setActive] = useState<number | null>(null);

  return (
    // Not `.section`: that pads 144px top and bottom at desktop, which alone
    // eats a third of the viewport this has to fit inside.
    <section>
      <div className="container-page py-[clamp(3.5rem,7vh,5.5rem)]">
        {/* Split header: the label holds the left margin as a marker, the
            statement sits out in the right-hand column and carries the section.
            Collapses to stacked below md, where two columns would leave the
            statement in a gutter too narrow to read. */}
        <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-10">
          <Reveal className="md:col-span-4 md:pt-1.5">
            <h2 className="eyebrow uppercase">Our Architecture</h2>
          </Reveal>

          <Reveal delay={70} className="md:col-span-8">
            <p className="text-pretty text-[clamp(1.1rem,1.9vw,1.6rem)] font-light leading-snug text-ink">
              One operational stack connecting{" "}
              <span className="arch-accent">ground intelligence</span>, continuous synchronization,
              and onboard autonomy.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.name} delay={i * 90}>
              <ArchCard
                card={card}
                active={active === i}
                dimmed={active !== null && active !== i}
                onEnter={() => setActive(i)}
                onLeave={() => setActive((cur) => (cur === i ? null : cur))}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
