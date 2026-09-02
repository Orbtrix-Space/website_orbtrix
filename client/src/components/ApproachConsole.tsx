import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Notation } from "@/components/tech/TechParts";

/**
 * The Orbtrix Approach — the architecture as a mission console.
 *
 * This replaced a five-column walk through Observe → Understand → Decide → Act
 * → Verify. That copy is not lost: it lives in data/autonomyLoop.ts, ready for
 * a product or mission page where the detail earns its place. Here the section
 * answers one question — what are the two systems and how do they relate — and
 * it has to answer it in about five seconds.
 *
 * The console is a layout, not a skin. There are no traffic-light dots and no
 * fake shell output, because both would make it read as a developer window;
 * the chrome is a hairline bar, an identifier and three blank indicator cells.
 *
 * Motion is limited to two things:
 *   - the cursor blink, which is what makes a console read as a console;
 *   - a signal that travels a link ONLY while its module is hovered, which is
 *     also the hover affordance. Nothing animates on its own.
 * Both are CSS, and both are switched off under prefers-reduced-motion — the
 * section is designed to be complete when nothing moves at all.
 */

type ModuleId = "disha" | "rigel";

interface Module {
  id: ModuleId;
  index: string;
  name: string;
  role: string;
  desc: string;
  labels: string[];
}

const MODULES: Module[] = [
  {
    id: "disha",
    index: "SYS.01",
    name: "DISHA",
    role: "Ground Intelligence",
    desc: "Mission context, telemetry intelligence and operational awareness.",
    labels: ["Telemetry", "Mission Context", "Planning", "Command & Control"],
  },
  {
    id: "rigel",
    index: "SYS.02",
    name: "Rigel OS",
    role: "Onboard Autonomy",
    desc: "Onboard decision-making, response and recovery.",
    labels: ["Decision Engine", "FDIR", "Execution", "Autonomous Response"],
  },
];

/* -------------------------------------------------------------------------- */
/* Links. Fixed viewBoxes so the strokes stay hairline-crisp — the columns they
   sit in are fixed-width for exactly this reason.                            */

/** DISHA ↔ Rigel. Bidirectional: mission context down, state and outcome up. */
function BusLink({ active }: { active: boolean }) {
  return (
    <div className="cns-link hidden items-center lg:flex" data-active={active}>
      <svg viewBox="0 0 88 24" width="88" height="24" fill="none" aria-hidden="true">
        <line x1="4" y1="12" x2="84" y2="12" className="cns-rail" strokeWidth="1" />
        {/* Restrained heads: two short chevrons, not filled arrows. */}
        <path d="M9 8.5 L4.5 12 L9 15.5" className="cns-rail" strokeWidth="1" />
        <path d="M79 8.5 L83.5 12 L79 15.5" className="cns-rail" strokeWidth="1" />
        <rect x="41" y="9" width="6" height="6" className="cns-node" transform="rotate(45 44 12)" />
        <circle cx="8" cy="12" r="2" className="cns-signal" />
      </svg>
    </div>
  );
}

/** Vertical variant of the same link, for the stacked layout. */
function BusLinkStacked({ active }: { active: boolean }) {
  return (
    <div className="cns-link flex justify-center py-1 lg:hidden" data-active={active}>
      <svg viewBox="0 0 24 56" width="24" height="56" fill="none" aria-hidden="true">
        <line x1="12" y1="4" x2="12" y2="52" className="cns-rail" strokeWidth="1" />
        <path d="M8.5 9 L12 4.5 L15.5 9" className="cns-rail" strokeWidth="1" />
        <path d="M8.5 47 L12 51.5 L15.5 47" className="cns-rail" strokeWidth="1" />
        <rect x="9" y="25" width="6" height="6" className="cns-node" transform="rotate(45 12 28)" />
        <circle cx="12" cy="8" r="2" className="cns-signal cns-signal-v" />
      </svg>
    </div>
  );
}

/** Rigel → Spacecraft. One direction: commands go down. */
function DownLink({ active }: { active: boolean }) {
  return (
    <div className="cns-link flex justify-center" data-active={active}>
      <svg viewBox="0 0 24 44" width="24" height="44" fill="none" aria-hidden="true">
        <line x1="12" y1="0" x2="12" y2="40" className="cns-rail" strokeWidth="1" />
        <path d="M8.5 35 L12 39.5 L15.5 35" className="cns-rail" strokeWidth="1" />
        <circle cx="12" cy="4" r="2" className="cns-signal cns-signal-v" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function ModuleBlock({
  module,
  active,
  onEnter,
  onLeave,
}: {
  module: Module;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="cns-mod flex h-full flex-col p-6 md:p-8"
      data-active={active}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="flex items-center justify-between">
        <span className="cns-meta">{module.index}</span>
        <span className="cns-meta">{module.role}</span>
      </div>

      <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-none tracking-tight">
        {module.name}
      </h3>

      <p
        className="mt-4 text-[0.88rem] font-light leading-relaxed"
        style={{ color: "var(--text-muted)" }}
      >
        {module.desc}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-8">
        {module.labels.map((label) => (
          <li key={label} className="cns-chip">
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function ApproachConsole() {
  /* One discrete value, set on enter/leave only — no per-frame work. It drives
     which link is lit, which is both the architecture cue and the hover
     affordance the brief asks for. */
  const [hover, setHover] = useState<ModuleId | null>(null);

  return (
    <section className="section container-page pt-0" id="approach">
      <div className="grid gap-y-4 md:grid-cols-12 md:gap-x-10">
        <Reveal className="md:col-span-4 md:pt-1.5">
          <Notation ident="APPROACH" cmd="ground + onboard" />
        </Reveal>

        <Reveal delay={70} className="md:col-span-8">
          <h2 className="text-pretty text-[clamp(1.1rem,1.9vw,1.6rem)] font-light leading-snug text-ink">
            Ground intelligence meets{" "}
            <span style={{ color: "var(--accent)" }}>onboard autonomy</span>.
          </h2>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <div className="cns mt-12">
          {/* ---- Chrome ---- */}
          <div className="cns-chrome flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="cns-badge" aria-hidden="true" />
              <span className="cns-meta">ORBTRIX / APPROACH</span>
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="cns-indicator" />
              <span className="cns-indicator" />
              <span className="cns-indicator" />
            </div>
          </div>

          <div className="p-6 md:p-9">
            {/* ---- Command line ---- */}
            <p className="cns-cmd">
              <span style={{ color: "var(--accent)" }}>&gt;</span> architecture
              <span style={{ color: "var(--text-muted)" }}> --mission-autonomy</span>
              <span className="cns-caret" aria-hidden="true" />
            </p>

            {/* ---- Axis ---- */}
            <div
              className="mt-8 flex items-center justify-between gap-4 border-t pt-4"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="cns-meta">Ground Intelligence</span>
              <span className="cns-meta" style={{ color: "var(--accent)" }}>
                Mission Autonomy
              </span>
              <span className="cns-meta">Onboard Autonomy</span>
            </div>

            {/* ---- Modules ---- */}
            <div className="mt-6 grid items-stretch lg:grid-cols-[1fr_88px_1fr]">
              <ModuleBlock
                module={MODULES[0]}
                active={hover === "disha"}
                onEnter={() => setHover("disha")}
                onLeave={() => setHover(null)}
              />

              <BusLink active={hover !== null} />
              <BusLinkStacked active={hover !== null} />

              <ModuleBlock
                module={MODULES[1]}
                active={hover === "rigel"}
                onEnter={() => setHover("rigel")}
                onLeave={() => setHover(null)}
              />
            </div>

            {/* ---- Downlink to the spacecraft ----
                Sits under the Rigel column on desktop, because that is where
                the command actually originates. */}
            <div className="grid lg:grid-cols-[1fr_88px_1fr]">
              <div className="hidden lg:block" />
              <div className="hidden lg:block" />
              <DownLink active={hover === "rigel"} />
            </div>

            {/* ---- Spacecraft ---- */}
            <div className="cns-craft flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5">
              <span className="text-[0.95rem] leading-none">Spacecraft</span>
              <span className="cns-meta">Payload · GNC · ADCS · EPS</span>
            </div>
          </div>

          {/* ---- Micro-line ---- */}
          <div className="cns-foot px-6 py-4 md:px-9">
            <p className="text-[0.84rem] font-light leading-relaxed">
              Ground sets the mission. The spacecraft handles what should happen next.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
