import { useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import {
  EARLY_ADOPTER,
  FLIGHT_HERO,
  HERO,
  INTEGRATION,
  MODULES,
  PLATFORM_INTRO,
  TASK_HERO,
  type DishaModule,
} from "@/data/disha";
import { Chain, Notation, useCanHover, useLive } from "@/components/tech/TechParts";
import {
  C3Console,
  InviteBackdrop,
  ModuleFeatures,
  ModuleHeroMedia,
  MonitorPicture,
  type ModuleHero,
} from "@/components/disha/DishaVisuals";
import {
  DishaMark,
  IntegrationVisual,
  ModuleRail,
  MonitorVisual,
} from "@/components/disha/DishaSystem";

/**
 * DISHA — Orbtrix's unified, autonomous mission operations platform.
 *
 * The page has one job, and it is structural rather than persuasive: someone
 * who only scrolls should come away knowing that DISHA is one system with four
 * operational layers, and roughly what each layer does. So the architecture is
 * the layout —
 *
 *     DISHA → C3 → FLIGHT → MONITOR → TASK → the loop they run together
 *
 * — with one full screen per module, the same furniture on each (identifier,
 * heading, chain, instrument, capabilities), and a rail down the left edge
 * saying which subsystem you are currently standing in.
 *
 * Copy lives in data/disha.ts. Visual grammar lives in the .dsh-* block of
 * index.css. This file is sequence and rhythm.
 */

/* -------------------------------------------------------------------------- */

/**
 * The furniture every module screen shares: identifier, section number,
 * heading, lead, and the operational chain. Extracted because Flight's screen
 * has a different SHAPE — a photograph where the others have an instrument —
 * and the one thing that must not vary with the shape is how a module
 * introduces itself. Change this and all four change together.
 */
function ModuleIntro({
  module,
  note = true,
  tight = false,
}: {
  module: DishaModule;
  /** Flight drops the chain's caption: its column has the features under it. */
  note?: boolean;
  /** Flight again: the same rhythm, one step closer, to buy the features room. */
  tight?: boolean;
}) {
  return (
    <>
      <div
        className="flex items-start justify-between gap-6 border-b pb-5"
        style={{ borderColor: "var(--border)" }}
      >
        <Notation ident={module.ident} cmd={module.cmd} />
        <span className="dsh-mono shrink-0 text-[0.6rem]" style={{ color: "var(--text-muted)" }}>
          {module.index} / {String(MODULES.length).padStart(2, "0")}
        </span>
      </div>

      <h2
        id={`${module.id}-heading`}
        className={`${tight ? "mt-6" : "mt-8"} text-[clamp(1.7rem,3.2vw,2.7rem)] leading-[1.08]`}
      >
        {module.heading.map((line) => (
          <span key={line} className="block text-balance">
            {line}
          </span>
        ))}
      </h2>

      <p
        className={`measure ${tight ? "mt-5" : "mt-7"} text-pretty text-[0.98rem] font-light leading-relaxed`}
      >
        {module.lead}
      </p>

      <Chain steps={module.chain} className={tight ? "mt-6" : "mt-10"} />

      {note && (
        <p
          className="measure mt-5 text-[0.85rem] font-light leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {module.chainNote}
        </p>
      )}
    </>
  );
}

/**
 * The default module screen: intro on the left, instrument on the right, key
 * features across the bottom. C3, Monitor and Task.
 *
 * The features use the same block treatment Flight uses, at three columns
 * instead of two. That was the one place the four modules disagreed about what
 * they were — three specification lists and one product — and it is the reason
 * <ModuleFeatures> exists.
 */
function ModuleScreen({ module, instrument }: { module: DishaModule; instrument: ReactNode }) {
  const { ref, live } = useLive<HTMLElement>();

  return (
    <section
      id={module.id}
      ref={ref}
      data-live={live ? "true" : "false"}
      className="dsh-screen"
      aria-labelledby={`${module.id}-heading`}
    >
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col">
            <ModuleIntro module={module} />
          </div>

          <div className="lg:pt-2">{instrument}</div>
        </div>

        <div className="mt-12">
          <ModuleFeatures
            title={module.featuresTitle}
            cmd={module.featuresCmd}
            items={module.capabilities}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * A module screen whose instrument is a photograph.
 *
 * Two modules use it. Flight, because a spacecraft in orbit IS the flight
 * dynamics instrument; and Task, because a mission operations floor is what
 * tasking and orchestration actually look like. In both the capabilities move
 * out of the full-width row at the bottom and into the reading column, as
 * ORBIT / TASKING KEY FEATURES, because the other half of the screen is the
 * picture.
 *
 * The reading column is the full height of the screen rather than a block at
 * the top of it — that column is the only part of the composition that is
 * black, and a black column with a headline floating in it reads as unfinished
 * next to a photograph.
 *
 * `hero.side` says which half the photograph takes. Flight's asset is composed
 * subject-left and is flipped to sit on the right; Task's is composed the same
 * way but CANNOT be flipped (its wall displays carry a world map and readable
 * labels), so its column moves to the right instead. Same treatment, mirrored.
 */
function HeroScreen({ module, hero }: { module: DishaModule; hero: ModuleHero }) {
  const { ref, live } = useLive<HTMLElement>();
  const mediaRight = hero.side === "right";

  const column = (
    <div className="flex flex-col">
      <ModuleIntro module={module} note={false} tight />

      <div className="mt-7">
        <ModuleFeatures
          title={module.featuresTitle}
          cmd={module.featuresCmd}
          items={module.capabilities}
          columns={2}
        />
      </div>
    </div>
  );

  /* The photograph's half is an empty cell — nothing is drawn into it. */
  const empty = <div aria-hidden="true" />;

  return (
    <section
      id={module.id}
      ref={ref}
      data-live={live ? "true" : "false"}
      className="dsh-screen dsh-hero"
      aria-labelledby={`${module.id}-heading`}
    >
      <ModuleHeroMedia hero={hero} />

      <div className="container-page relative z-10">
        <div
          className={
            mediaRight
              ? "grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
              : "grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16"
          }
        >
          {mediaRight ? column : empty}
          {mediaRight ? empty : column}
        </div>
      </div>
    </section>
  );
}

/**
 * The platform strip: four modules on one hairline, each revealing what it does
 * when you engage it.
 *
 * ---- Why the description is always in the flow --------------------------
 * On a pointer device every panel is rendered at full height at all times and
 * only its INK animates. That looks wasteful and is not: the four items share
 * a grid row, so if the panel collapsed the row would resize every time the
 * pointer crossed a column, and the whole page below would jump. Reserving the
 * space costs about three lines once; collapsing it costs a layout shift on
 * every hover.
 *
 * On touch there is no hover to protect against, so the panel genuinely
 * collapses (0fr → 1fr) and only the tapped module is open. Four reserved
 * panels stacked in a single column would have been a screen of empty space.
 *
 * ---- Why the first tap does not navigate --------------------------------
 * These are still links to the module screens further down, and on a desktop
 * a click should go there. On a touch device the same click is the only way to
 * ask "what is this?", so the first tap reveals and the second follows the
 * link. Nothing is unreachable either way.
 */
function ModuleStrip() {
  const [open, setOpen] = useState<string | null>(null);
  const canHover = useCanHover();

  return (
    <nav
      className="dsh-strip mt-14 grid sm:grid-cols-2 xl:grid-cols-4"
      aria-label="DISHA modules"
      /* Handled on the container so sliding between columns swaps the open
         module with no flicker in between. */
      onMouseLeave={() => canHover && setOpen(null)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
      }}
    >
      {MODULES.map((module) => {
        const isOpen = open === module.id;

        return (
          <a
            key={module.id}
            href={`#${module.id}`}
            className="dsh-strip-item"
            data-open={isOpen}
            onMouseEnter={() => canHover && setOpen(module.id)}
            onFocus={() => setOpen(module.id)}
            onClick={(e) => {
              // Touch only: reveal first, navigate on the second tap.
              if (!canHover && !isOpen) {
                e.preventDefault();
                setOpen(module.id);
              }
            }}
          >
            <span className="dsh-strip-i">{module.index}</span>

            <span className="dsh-strip-name">DISHA_{module.short}</span>
            <span className="dsh-strip-role">{module.role}</span>

            <span className="dsh-strip-panel">
              <span className="dsh-strip-panel-in">
                {/* The module's own `$` line, held back until engagement so the
                    resting strip stays four names and four roles. It is the
                    same string the module screen and the nav dropdown use. */}
                <span className="dsh-strip-cmd" aria-hidden="true">
                  <span className="dsh-sigil">$ </span>
                  {module.cmd}
                </span>
                <span className="dsh-strip-desc">{module.blurb}</span>
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */

export default function Disha() {
  usePageMeta(
    "DISHA",
    "DISHA is Orbtrix's unified mission operations platform: command and control, flight dynamics, spacecraft monitoring and mission tasking in one operational environment.",
  );

  /* The rail measures itself against this region, so it appears with the first
     module screen and is gone by the integration section. */
  const modules = useRef<HTMLDivElement>(null);

  return (
    <>
      <ModuleRail regionRef={modules} />

      {/* ===================== HERO ===================== */}
      <section className="container-page page-head">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div>
            <Reveal>
              <Notation ident={HERO.ident} cmd={HERO.cmd} />
            </Reveal>

            {/* The wordmark IS the h1. Rendering the logo and a text "DISHA"
                heading beside it would say the name twice; the alt text keeps
                the heading indexable and gives the same string to a screen
                reader. */}
            <Reveal delay={60}>
              <h1 className="mt-7">
                <DishaMark className="h-11 w-auto md:h-14" />
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-9 max-w-2xl text-balance text-[clamp(1.5rem,3vw,2.3rem)] font-light leading-[1.14] text-ink">
                {HERO.statement}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="measure mt-8 text-pretty text-[0.98rem] font-light leading-relaxed">
                {HERO.lead}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row">
                <a href="#modules" className="cta cta-primary">
                  Explore DISHA
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href="/contact" className="cta cta-secondary">
                  Talk to our team
                </Link>
              </div>
            </Reveal>
          </div>

          {/* The workstation. Tilted a few degrees so it stands on a desk
              rather than lying on the page — and no further, because the
              screen inside it is the argument. */}
          <Reveal delay={140}>
            <MonitorVisual tilt eager />
          </Reveal>
        </div>
      </section>

      {/* ===================== PLATFORM ===================== */}
      <section id="modules" className="section container-page pt-0">
        <Reveal>
          <Notation ident={PLATFORM_INTRO.ident} cmd={PLATFORM_INTRO.cmd} />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-7 text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.08]">
            {PLATFORM_INTRO.heading.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="measure mt-7 text-pretty text-[0.98rem] font-light leading-relaxed">
            {PLATFORM_INTRO.lead}
          </p>
        </Reveal>

        {/* The four layers, strung on one hairline. The line is the section's
            whole argument: these are stops on a system, not four tiles.

            Engaging one reveals its `$` identifier and a single sentence. The
            point is that a visitor can learn what all four modules do without
            leaving this section — so the reveal must not navigate, must not
            open anything, and must not move the page. */}
        <Reveal delay={180}>
          <ModuleStrip />
        </Reveal>
      </section>

      {/* ===================== THE FOUR MODULES ===================== */}
      <div ref={modules}>
        <ModuleScreen module={MODULES[0]} instrument={<C3Console />} />
        <HeroScreen module={MODULES[1]} hero={FLIGHT_HERO} />
        <ModuleScreen module={MODULES[2]} instrument={<MonitorPicture />} />
        <HeroScreen module={MODULES[3]} hero={TASK_HERO} />
      </div>

      {/* ===================== ARCHITECTURE ===================== */}
      <section id="architecture" className="section container-page" style={{ borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <Notation ident={INTEGRATION.ident} cmd={INTEGRATION.cmd} />
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mt-7 text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.08]">
            {INTEGRATION.heading.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-16">
            <IntegrationVisual />
          </div>
        </Reveal>
      </section>

      {/* ===================== EARLY ADOPTER =====================
          One screen, one statement, and it used to be most of a page: an
          operational-loop half with a maturity progression, an adoption model,
          a three-point commercial case, a mission-to-fleet ladder and a
          separate closing CTA.

          What is left is the offer and two ways to take it. The photograph is
          the section rather than an illustration inside it — content sits in
          the left half, over the part of the frame that is already dark, which
          is why no heavy scrim is needed to read it. */}
      <section id="early-adopter" className="dsh-invite" aria-labelledby="invite-heading">
        <InviteBackdrop />

        <div className="container-page relative z-10">
          <div className="dsh-invite-body">
            <Reveal>
              <Notation ident={EARLY_ADOPTER.ident} cmd={EARLY_ADOPTER.cmd} bright />
            </Reveal>

            <Reveal delay={60}>
              <h2
                id="invite-heading"
                className="mt-7 text-[clamp(1.75rem,3.1vw,2.75rem)] leading-[1.06]"
              >
                {EARLY_ADOPTER.heading.map((line) => (
                  <span key={line} className="block text-balance">
                    {line}
                  </span>
                ))}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-7 max-w-xl text-pretty text-[1rem] font-light leading-relaxed">
                {EARLY_ADOPTER.lead}
              </p>
            </Reveal>

            {/* The adoption model, compressed to the one line that survived it. */}
            <Reveal delay={180}>
              <p
                className="mt-7 border-l pl-5 text-[clamp(1.05rem,1.8vw,1.35rem)] font-light leading-snug text-ink"
                style={{ borderColor: "var(--border-accent)" }}
              >
                {EARLY_ADOPTER.note}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
                <Link href={EARLY_ADOPTER.primary.href} className="cta cta-primary">
                  {EARLY_ADOPTER.primary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={EARLY_ADOPTER.secondary.href} className="cta cta-on-media">
                  {EARLY_ADOPTER.secondary.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
