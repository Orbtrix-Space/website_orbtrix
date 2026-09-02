import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  INTEGRATION,
  MODULES,
  DISHA_MONITOR,
  DISHA_MONITOR_WEBP,
  DISHA_LOGO,
} from "@/data/disha";
import { Notation } from "@/components/tech/TechParts";
import { step } from "@/components/tech/TechParts";

/* ==========================================================================
   DISHA page — the system-level pieces.

   Everything here is about the four modules as ONE thing: the diagram that
   connects them, the loop they run, the autonomy ladder that loop makes
   possible, the fleet it scales to, the photograph of it running, and the
   rail that tells you where in the architecture you currently are.
   ========================================================================== */

/* ==========================================================================
   The product photograph

   Three layers, and the middle one is the trick: ambient purple laid down
   behind the hardware, then black of the same footprint laid over that
   ambient light, occluding it exactly where the object is. What survives is a
   rim of atmosphere and a dark contact shadow — depth, from two flat fills and
   no gradient. See the .dsh-monitor block in index.css.
   ========================================================================== */

const MONITOR_ALT =
  "The DISHA operator interface on a mission-control workstation: spacecraft hierarchy, orbital view, subsystem health and a ground-contact timeline in a single window.";

export function MonitorVisual({
  tilt = false,
  eager = false,
  className = "",
}: {
  /** A few degrees of perspective. Hero only — the showcase is for reading. */
  tilt?: boolean;
  /** The hero copy is above the fold and must not lazy-load. */
  eager?: boolean;
  className?: string;
}) {
  return (
    <div className={`dsh-monitor ${tilt ? "dsh-tilt" : ""} ${className}`}>
      <span className="dsh-monitor-bounce" aria-hidden="true" />
      <span className="dsh-monitor-shade" aria-hidden="true" />
      {/* <picture>, so the 158KB WebP is what actually ships and the 1.7MB PNG
          is only ever fetched by a browser that cannot decode WebP. width and
          height stay on the <img>: they are what reserve the box, and without
          them this photograph shifts the whole hero as it arrives. */}
      <picture>
        <source srcSet={DISHA_MONITOR_WEBP} type="image/webp" />
        <img
          src={DISHA_MONITOR}
          alt={MONITOR_ALT}
          width={1536}
          height={1024}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="dsh-monitor-img"
        />
      </picture>
    </div>
  );
}

/**
 * The DISHA wordmark. The asset is the brand purple on transparency, so it
 * needs no treatment on black — only room, and a height that keeps it a mark
 * rather than a banner.
 */
export function DishaMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={DISHA_LOGO}
      alt="DISHA"
      width={1071}
      height={367}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}

/* ==========================================================================
   Four modules, one mission

   A diagram of the real relationship rather than an org chart of it: DISHA
   over C3, Flight and Monitor; those three into Task; Task into execution.
   Hovering either a node or its line in the text column lights the whole path
   that module owns, which is the part a static picture cannot say.

   All coordinates are viewBox units, laid out on a 720 x 400 plate.
   ========================================================================== */

const NODE = { w: 152, h: 54 };
const COLS = { c3: 150, flight: 360, monitor: 570 };

/** A labelled node box, centred on `cx`. */
function DiagramNode({
  cx,
  y,
  w = NODE.w,
  h = NODE.h,
  label,
  sub,
  on,
  onEnter,
  onLeave,
}: {
  cx: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  on?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  return (
    <g
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={onEnter ? { cursor: "default" } : undefined}
    >
      <rect
        x={cx - w / 2}
        y={y}
        width={w}
        height={h}
        rx="8"
        className="dsh-fig-node"
        data-on={on ? "true" : undefined}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        className="dsh-fig-label"
        data-on={on ? "true" : undefined}
        style={{ fontSize: 11, letterSpacing: "0.1em" }}
      >
        {label}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 14} textAnchor="middle" className="dsh-fig-label">
          {sub}
        </text>
      )}
    </g>
  );
}

function IntegrationDiagram({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (id: string | null) => void;
}) {
  const lit = (id: string) => (active === id ? "true" : undefined);
  /* Task sits downstream of all three, so it is lit by any of them as well as
     by itself — that IS the relationship the diagram exists to show. */
  const taskLit = active ? "true" : undefined;

  return (
    <svg
      viewBox="0 0 720 400"
      className="block h-auto w-full"
      role="img"
      aria-label="DISHA connects command and control, flight dynamics and mission monitoring into tasking, and tasking into mission execution."
    >
      {/* DISHA → the bus that feeds the three layers */}
      <DiagramNode cx={360} y={4} w={132} h={38} label="DISHA" />
      <path d="M 360 42 L 360 88" className="dsh-fig-rail" />
      <path d="M 150 88 L 570 88" className="dsh-fig-rail" />

      {/* Bus → each module */}
      <path d={`M ${COLS.c3} 88 L ${COLS.c3} 124`} className="dsh-fig-rail" data-on={lit("c3")} />
      <path d={`M ${COLS.flight} 88 L ${COLS.flight} 124`} className="dsh-fig-rail" data-on={lit("flight")} />
      <path d={`M ${COLS.monitor} 88 L ${COLS.monitor} 124`} className="dsh-fig-rail" data-on={lit("monitor")} />

      <DiagramNode
        cx={COLS.c3}
        y={124}
        label="C3"
        sub="COMMAND & CONTROL"
        on={active === "c3"}
        onEnter={() => setActive("c3")}
        onLeave={() => setActive(null)}
      />
      <DiagramNode
        cx={COLS.flight}
        y={124}
        label="FLIGHT"
        sub="FLIGHT DYNAMICS"
        on={active === "flight"}
        onEnter={() => setActive("flight")}
        onLeave={() => setActive(null)}
      />
      <DiagramNode
        cx={COLS.monitor}
        y={124}
        label="MONITOR"
        sub="OPERATIONAL AWARENESS"
        on={active === "monitor"}
        onEnter={() => setActive("monitor")}
        onLeave={() => setActive(null)}
      />

      {/* Each module → the tasking bus */}
      <path d={`M ${COLS.c3} 178 L ${COLS.c3} 214`} className="dsh-fig-rail" data-on={lit("c3")} />
      <path d={`M ${COLS.flight} 178 L ${COLS.flight} 214`} className="dsh-fig-rail" data-on={lit("flight")} />
      <path d={`M ${COLS.monitor} 178 L ${COLS.monitor} 214`} className="dsh-fig-rail" data-on={lit("monitor")} />
      <path d="M 150 214 L 570 214" className="dsh-fig-rail" data-on={taskLit} />
      <path d="M 360 214 L 360 246" className="dsh-fig-rail" data-on={taskLit} />

      <DiagramNode
        cx={360}
        y={246}
        label="TASK"
        sub="TASKING & AUTOMATION"
        on={active === "task"}
        onEnter={() => setActive("task")}
        onLeave={() => setActive(null)}
      />

      <path d="M 360 300 L 360 340" className="dsh-fig-rail" data-on={lit("task")} />
      <path d="M 353 332 L 360 340 L 367 332" className="dsh-fig-rail" data-on={lit("task")} />
      <DiagramNode cx={360} y={340} w={224} h={44} label="MISSION EXECUTION" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   The operational loop, as a ring. A loop drawn as a row of boxes with an
   arrow curling back is a diagram of a loop; a ring simply is one — and this
   is the one element on the page permitted to move continuously, because a
   loop that has stopped is not a loop.
   -------------------------------------------------------------------------- */

/**
 * The architecture section's figure: the diagram, and the four sentences that
 * read it. Hovering either a node or its line lights the whole path that
 * module owns, which is the part a static picture cannot say.
 *
 * It used to carry a second row — the operational loop drawn as a ring. That
 * ring is gone (the loop is now told by the combined story section further
 * down, against a photograph rather than as an animated diagram), so this is
 * back to one row and one claim: how the four modules are wired.
 */
export function IntegrationVisual() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
      <IntegrationDiagram active={active} setActive={setActive} />

      <ul>
        {INTEGRATION.relations.map((relation, i) => (
          <li key={relation.id}>
            {i > 0 && <div className="dsh-drop" aria-hidden="true" />}
            <button
              type="button"
              className="dsh-drill"
              data-on={active === relation.id}
              onMouseEnter={() => setActive(relation.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(relation.id)}
              onBlur={() => setActive(null)}
              onClick={() => {
                document
                  .getElementById(relation.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <span className="dsh-drill-mark" aria-hidden="true" />
              <span className="min-w-0">
                <span className="dsh-mono text-[0.63rem]">{relation.label}</span>{" "}
                <span className="text-[0.8rem] font-light" style={{ color: "var(--text-muted)" }}>
                  {relation.says}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Scroll rail

   Fixed to the left edge while the four module screens are in play, and gone
   the rest of the time — an indicator that floats over the hero and the
   closing statement is chrome, not navigation. It answers one question:
   which subsystem am I in, and how far through the architecture.

   Desktop only. On a phone the rail would eat the margin the screens are
   built around, and the section headings already do this job at that width.

   PORTALLED TO <body>, and that is not optional. <PageTransition> wraps every
   page in .page-enter, whose `animation-fill-mode: both` leaves a filled
   `transform` on the element forever — an identity matrix, but a transform all
   the same, and any transform makes an element the containing block for its
   fixed-position descendants. Rendered in place, the rail would therefore
   resolve `top: 50%` against the full height of the page instead of the
   viewport and sit thousands of pixels down it. <BackToTop> avoids this by
   living outside the transition in <Layout>; the rail belongs to this page, so
   it escapes by portal instead.
   ========================================================================== */

export function ModuleRail({ regionRef }: { regionRef: React.RefObject<HTMLElement> }) {
  const [active, setActive] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const region = regionRef.current;
      if (!region) return;

      const box = region.getBoundingClientRect();
      const viewport = window.innerHeight;
      const mid = viewport / 2;

      // Visible only while the middle of the viewport is inside the region.
      setShow(box.top < mid && box.bottom > mid);

      // The screen the middle of the viewport is standing in.
      let current: string | null = null;
      for (const module of MODULES) {
        const el = document.getElementById(module.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) current = module.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [regionRef]);

  const activeIndex = MODULES.findIndex((m) => m.id === active);

  const rail = (
    <nav
      className="dsh-rail hidden xl:block"
      data-show={show ? "true" : "false"}
      aria-label="DISHA modules"
      aria-hidden={!show}
    >
      <span className="dsh-rail-line" aria-hidden="true" />

      {/* The travelling indicator. One element that slides between fixed-height
          rows, rather than four that light and unlight — a bar that MOVES says
          the four modules are positions in one system, which is the entire
          claim the rail is making. It is the reason every row is a fixed
          height; measuring them would work too and would break the moment a
          role string wrapped. */}
      <span
        className="dsh-rail-mark"
        aria-hidden="true"
        data-on={activeIndex >= 0}
        style={{ "--rail-index": Math.max(0, activeIndex) } as CSSProperties}
      />

      {MODULES.map((module) => (
        <a
          key={module.id}
          href={`#${module.id}`}
          className="dsh-rail-item"
          data-on={active === module.id}
          tabIndex={show ? 0 : -1}
          aria-current={active === module.id ? "true" : undefined}
        >
          <span className="dsh-rail-dot" aria-hidden="true" />
          <span className="dsh-rail-index">{module.index}</span>

          {/* Collapsed to nothing until the rail is engaged. Spelled out at
              rest it was wider than the page's left gutter and sat on the body
              copy; hidden entirely it was four anonymous dots. Revealing it on
              hover is the only version that is both readable and out of the
              way — and the accessible name is on the row at all times either
              way, so nothing here depends on a pointer. */}
          <span className="dsh-rail-text">
            <span className="dsh-rail-name">DISHA_{module.short}</span>
            <span className="dsh-rail-role">{module.role}</span>
          </span>
        </a>
      ))}
    </nav>
  );

  // Portals run on the client only; during any pre-render there is no body to
  // portal into, so render nothing rather than throwing.
  return typeof document === "undefined" ? null : createPortal(rail, document.body);
}
