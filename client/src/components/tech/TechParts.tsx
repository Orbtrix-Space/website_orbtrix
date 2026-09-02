import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ==========================================================================
   Orbtrix technical primitives.

   The engineering notation mark, the operational chain, the instrument panel,
   the terminal lines inside it, and the readout rows. Built for the DISHA
   page; now the site's shared technical language, used by the Solutions pages
   too — which is why they live here rather than under components/disha.

   Their CSS still carries the .dsh- prefix. That is historical, not a scope:
   the classes were written for DISHA and renaming a working stylesheet to
   match a folder move buys nothing.

   Keeping these in one place is what stops each page from drifting into its
   own visual language. Every page composes them differently; none of them
   redefines what a notation mark or an operational chain looks like.
   ========================================================================== */

/**
 * True once the element has been on screen. Same contract as <Reveal>: it
 * latches, it disconnects, and it fails OPEN — no IntersectionObserver means
 * live immediately, so the page is never blank in an environment without one.
 *
 * The returned flag is written to `data-live` on a container; every animation
 * in the .dsh-* CSS keys off that attribute rather than off a class, so an
 * element that never receives the attribute renders finished instead of
 * hidden.
 */
export function useLive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || live) return;

    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          observer.disconnect();
        }
      },
      // 18%: enough of the screen has arrived that the console coming up reads
      // as a response to the scroll, not as something that already happened.
      { threshold: 0.18 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [live]);

  return { ref, live };
}

/**
 * True where a real pointer can hover.
 *
 * A width check is the wrong test and gets this wrong in both directions: a
 * touchscreen laptop is wide and cannot hover, and a stylus tablet is narrow
 * and can. The media query asks the actual question.
 *
 * Every reveal-on-hover control on the site needs it, because each one has to
 * do something different on a touch device — WhoWeServe opens on tap, the
 * module strip reveals on the first tap and navigates on the second. Shared so
 * there is one definition of "can this visitor hover" rather than one per
 * component.
 */
export function useCanHover() {
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

/* --------------------------------------------------------------------------
   Polyline geometry, shared by every hand-drawn figure on the site.
   -------------------------------------------------------------------------- */

/** A polyline as an SVG path. */
export const toPath = (pts: [number, number][], close = false) =>
  `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}${close ? " Z" : ""}`;

/**
 * Polyline length in user units, so a `--len` passed to .dsh-draw matches the
 * path and the draw-in actually completes. Do NOT combine this with
 * vectorEffect="non-scaling-stroke": that makes the browser measure dashes in
 * screen units instead, and the stroke stops part-way along.
 */
export const polylineLength = (pts: [number, number][]) =>
  pts.reduce(
    (sum, p, i) => (i === 0 ? 0 : sum + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1])),
    0,
  );

/** Per-item animation index. The CSS turns it into a stagger delay. */
export function step(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/* -------------------------------------------------------------------------- */

/**
 * The page's identifier mark:
 *
 *     # DISHA_C3
 *     $ command_and_control
 *
 * The sigils are decoration, not content — they are aria-hidden so a screen
 * reader hears "DISHA_C3, command_and_control" rather than a stream of
 * punctuation.
 */
export function Notation({
  ident,
  cmd,
  bright = false,
  className = "",
}: {
  ident: string;
  /** One command line, or several stacked under the identifier. */
  cmd: string | string[];
  /** Set over the product photograph, where muted gray loses to the lit screen. */
  bright?: boolean;
  className?: string;
}) {
  const lines = Array.isArray(cmd) ? cmd : [cmd];

  return (
    <p className={`dsh-note ${className}`} data-tone={bright ? "bright" : undefined}>
      <span className="block">
        <span className="dsh-sigil" aria-hidden="true">
          #{" "}
        </span>
        {ident}
      </span>
      {lines.map((line) => (
        <span key={line} className="dsh-note-cmd">
          <span className="dsh-sigil" aria-hidden="true">
            ${" "}
          </span>
          {line}
        </span>
      ))}
    </p>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * An operational chain — INTENT → PROCEDURE → COMMAND → … Every module owns
 * one, and it is the actual argument of the page: these are stages of a single
 * flow, not a list of features. It lights left to right once the screen is
 * live, then holds.
 *
 * An ordered list, because the order is the meaning.
 */
export function Chain({ steps, className = "" }: { steps: string[]; className?: string }) {
  return (
    <ol className={`dsh-chain ${className}`}>
      {steps.map((label, i) => (
        // The arrow LEADS its node rather than trailing the previous one. A
        // trailing arrow that lands at a wrap point dangles at the end of the
        // line with nothing after it; a leading one starts the next line, which
        // is how a wrapped flow is supposed to read.
        <li key={label} className="flex items-center gap-2" style={step(i)}>
          {i > 0 && (
            <span className="dsh-chain-arrow" aria-hidden="true">
              &rarr;
            </span>
          )}
          <span className="dsh-chain-node">{label}</span>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The instrument panel every module visual sits in. Hairline box, chrome bar
 * carrying an identifier and three blank indicator cells — window indicators
 * that are careful not to pretend to be window controls, because the moment
 * they do the page reads as a developer tool rather than as an instrument.
 */
export function Panel({
  tag,
  meta,
  children,
  flush = false,
  className = "",
}: {
  tag: string;
  meta?: string;
  children: ReactNode;
  /** Visuals that manage their own padding (the timeline) opt out. */
  flush?: boolean;
  className?: string;
}) {
  return (
    <div className={`dsh-panel ${className}`}>
      <div className="dsh-panel-bar">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="dsh-tick" aria-hidden="true" />
          <span className="dsh-panel-tag">{tag}</span>
        </div>
        {meta && <span className="dsh-panel-tag">{meta}</span>}
      </div>
      <div className={flush ? "" : "p-5 md:p-7"}>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export interface TerminalLine {
  /** `$` — an operator action. `>` — the system acknowledging it. */
  kind: "cmd" | "ack";
  text: string;
}

/**
 * Terminal notation. This is emphatically NOT a shell: there is no fake
 * output, no invented value, and no line that claims an API which may not
 * exist. Each line names something the module actually does, in the syntax an
 * operator would recognise.
 */
export function Terminal({
  lines,
  caret = true,
  className = "",
}: {
  lines: TerminalLine[];
  /** A blinking caret after the last line — what makes a console read live. */
  caret?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <p key={line.text} className="dsh-line" data-kind={line.kind} style={step(i)}>
          <span className="dsh-sigil" aria-hidden="true">
            {line.kind === "cmd" ? "$" : ">"}
            {" "}
          </span>
          {line.text}
          {caret && i === lines.length - 1 && <span className="dsh-caret" aria-hidden="true" />}
        </p>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * A readout row: a label and a word state. Word states ONLY — nothing in this
 * component ever renders a number, because a number here would be a claim
 * about a real spacecraft on a page that has none to point at.
 */
export function Readout({
  rows,
  className = "",
}: {
  rows: { label: string; value: string; tone?: "accent" | "idle" }[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {rows.map((row) => (
        <div key={row.label} className="dsh-read">
          <dt>{row.label}</dt>
          <dd data-tone={row.tone}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

