import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/**
 * Why Orbtrix — three specification rows, headline-only until you engage.
 *
 * This replaced three columns of body copy. The point is scanning: the visitor
 * reads three headlines, and the supporting text exists only for the one they
 * actually want. It behaves like a spec sheet, not an accordion — the rows
 * never leave their grid, and opening one does not push the others around any
 * more than the panel's own height.
 *
 * Pointer model: hover drives it where hover exists, tap where it does not,
 * decided by `(hover: hover) and (pointer: fine)` rather than by screen width —
 * a touchscreen laptop gets the right behaviour either way. Focus opens a row
 * too, so the whole thing is reachable from the keyboard; each headline is a
 * real <button> carrying aria-expanded.
 *
 * The open/close uses the grid-template-rows 0fr → 1fr technique already used
 * by the mobile nav in Nav.tsx, so height animates without hard-coding one.
 */

interface Reason {
  n: string;
  title: string;
  body: string;
  /** Compact technical line under the copy. */
  meta?: string;
  /**
   * A headline figure, shown large when present.
   *
   * DELIBERATELY EMPTY. The brief offered "UP TO 80%" for the OpEx row on the
   * condition that existing Orbtrix material substantiates it — and nothing in
   * this repository does. Presenting 80% here would assert a number nobody has
   * produced.
   *
   * This used to cite data/mission.ts, which recorded that no measured OpEx
   * saving existed yet. That file went with Mission #1. The conclusion did not
   * change with it: as of this writing there is still no substantiated figure
   * anywhere in the project, which is why /disha says "designed to
   * significantly reduce" rather than naming one.
   *
   * When a figure is substantiated, set it here and it renders — no layout
   * work needed.
   */
  metric?: string;
}

const REASONS: Reason[] = [
  {
    n: "01",
    title: "Autonomy for mission efficiency",
    body: "Orbtrix moves planning, interpretation, and time-critical decision-making closer to the spacecraft, increasing operational efficiency and mission capability without proportional growth in ground operations.",
    meta: "Observe → Decide → Act",
  },
  {
    n: "02",
    title: "Lower OpEx. Stronger unit economics.",
    body: "Reduce recurring mission operations through autonomous monitoring, decision-making, replanning, and response—reducing ground workload and improving the economics of every spacecraft deployed.",
  },
  {
    n: "03",
    title: "Modular by design. Built for your mission.",
    body: "Integrate Orbtrix capabilities into existing flight architectures, deploy mission-specific autonomy modules, and incorporate your own algorithms and models to match spacecraft, payload, and mission requirements.",
    meta: "Your architecture · Your algorithms · Your mission",
  },
];

/** True where a real pointer can hover. Not a width check — touchscreen laptops. */
function useCanHover() {
  const [can, setCan] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCan(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return can;
}

export function WhyOrbtrix() {
  const [open, setOpen] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ---- Satellite plate ------------------------------------------------
          Full-bleed background, not a framed picture. The asset carries the
          spacecraft right of centre against pure black, so anchoring it right
          puts the satellite opposite the copy and leaves its own black half
          under the text — the scrims then only have to finish a blend the
          artwork already starts.

          Dimmed hard below md: at phone widths cover crops to a narrow slice of
          the frame and the copy sits straight over the spacecraft, so it drops
          back to being purely atmospheric. */}
      <img
        src="/Images/Satellite_website.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-30 md:opacity-100"
      />

      {/* Horizontal scrim: solid black under the rows, clearing to nothing on
          the right so the spacecraft emerges rather than sitting on a panel. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to right, #000 0%, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Vertical scrim: dissolves the top and bottom edges into the sections
          either side, so the plate has no horizon line. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 76%, #000 100%)",
        }}
      />

      <div className="container-page pb-[clamp(5rem,10vw,9rem)] pt-[clamp(3rem,6vh,5rem)]">
        <Reveal>
          <h2 className="text-balance text-[clamp(1.63rem,3.5vw,2.6rem)]">Why Orbtrix</h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12">
          {/* ---- The rows ----
              Held to the left half so the right stays clear for the plate. */}
          <Reveal delay={80} className="lg:col-span-6">
          {/* Leaving the list closes whatever is open. Handling this here rather
              than per row means moving the pointer between rows swaps the open
              index directly, with no close-then-open flicker in between. */}
          <div
            onMouseLeave={() => canHover && setOpen(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
            }}
          >
            {REASONS.map((r, i) => {
              const isOpen = open === i;
              return (
                <div key={r.n} className="why-row" data-open={isOpen}>
                  <button
                    type="button"
                    className="why-head"
                    aria-expanded={isOpen}
                    onMouseEnter={() => canHover && setOpen(i)}
                    onFocus={() => setOpen(i)}
                    onClick={() => {
                      if (!canHover) setOpen(isOpen ? null : i);
                    }}
                  >
                    <span className="why-num">{r.n}</span>
                    <span className="why-title">{r.title}</span>
                    <ArrowRight className="why-arrow h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>

                  <div className="why-panel" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      <div className="why-panel-in">
                        {r.metric && <p className="why-metric">{r.metric}</p>}
                        <p className="why-body">{r.body}</p>
                        {r.meta && <p className="why-meta">{r.meta}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Gateway to the Solutions page. Aligned to the left edge of the
                rows rather than indented under the copy — it belongs to the
                whole list, not to row 03. Route is /solutions — see App.tsx. */}
            <Link href="/solutions" className="cta cta-primary mt-12">
              Explore the autonomy stack
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
