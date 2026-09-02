import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import { Notation, useLive, step } from "@/components/tech/TechParts";
import {
  FAMILY_NOTE,
  SOLUTIONS,
  otherSolutions,
  type Entry,
  type Mark,
} from "@/data/solutions";

/* ==========================================================================
   Solutions — the shared kit.

   Three pages, one system. Everything a Solutions page is assembled from
   lives here, so NETRA, NEXUS and Onboard Optical cannot drift into three
   different websites. What they do NOT share is composition: each page
   arranges these pieces differently and adds its own figures, which is the
   difference between one design language and three copies of one page.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Section shell
   -------------------------------------------------------------------------- */

/**
 * A Solutions section: the `# IDENT` / `$ cmd` mark, a heading, an optional
 * lead, and whatever the section is actually made of.
 *
 * `data-live` is set on the <section>, so any flow, chain or figure inside it
 * powers up when the section arrives and then holds.
 */
export function SolutionSection({
  id,
  mark,
  heading,
  lead,
  children,
  className = "",
  headingClassName = "",
  narrow = false,
}: {
  id?: string;
  mark: Mark;
  /** One line per array entry, or a single string. */
  heading: string | string[];
  lead?: string;
  children?: ReactNode;
  className?: string;
  headingClassName?: string;
  /** Constrain the header block to a reading column. */
  narrow?: boolean;
}) {
  const { ref, live } = useLive<HTMLElement>();
  const lines = Array.isArray(heading) ? heading : [heading];

  /* Every section is addressable. The identifier is already the section's
     name, so deriving the anchor from it means /solutions/netra#anomaly works
     without anyone maintaining a second list of ids. */
  const anchor = id ?? mark.ident.toLowerCase().replace(/_/g, "-");

  return (
    <section
      id={anchor}
      ref={ref}
      data-live={live ? "true" : "false"}
      className={`sol-section container-page ${className}`}
    >
      <div className={narrow ? "max-w-3xl" : ""}>
        <Reveal>
          <Notation ident={mark.ident} cmd={mark.cmd} />
        </Reveal>

        <Reveal delay={60}>
          <h2
            className={`mt-6 text-[clamp(1.6rem,3.1vw,2.5rem)] leading-[1.1] ${headingClassName}`}
          >
            {lines.map((line) => (
              <span key={line} className="block text-balance">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        {lead && (
          <Reveal delay={120}>
            <p className="measure mt-6 text-pretty text-[0.95rem] font-light leading-relaxed">
              {lead}
            </p>
          </Reveal>
        )}
      </div>

      {children}
    </section>
  );
}

/* --------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------- */

/**
 * The page opener. The solution's name is the <h1> — it is what the page is,
 * and it has to be the indexable heading — with the approved statement as the
 * large line beneath it.
 */
export function SolutionHero({
  ident,
  cmd,
  name,
  role,
  heading,
  lead,
  primary,
  secondary,
  visual,
  backdrop,
}: {
  ident: string;
  cmd: string;
  name: string;
  role: string;
  heading: string;
  lead: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  /** The page's own opening figure. Right column on desktop. */
  visual?: ReactNode;
  /**
   * A photograph behind the whole hero instead of a figure beside it.
   *
   * Mutually exclusive with `visual`: the picture occupies the half the figure
   * would have used, so passing both would stack one on the other. NEXUS is
   * the only page using it — its image is composed empty-left, subject-right,
   * which is exactly the shape of this hero.
   */
  backdrop?: { image: string; imageWebp: string; width: number; height: number; alt: string };
}) {
  const { ref, live } = useLive<HTMLDivElement>();

  return (
    <section className={`page-head relative${backdrop ? " sol-hero-shot" : ""}`}>
      {backdrop && (
        <div className="sol-hero-bg" aria-hidden="true">
          <picture>
            <source srcSet={backdrop.imageWebp} type="image/webp" />
            <img
              src={backdrop.image}
              alt=""
              width={backdrop.width}
              height={backdrop.height}
              loading="eager"
              decoding="async"
              className="sol-hero-img"
            />
          </picture>
          <span className="sol-hero-scrim" />
        </div>
      )}

      <div
        ref={ref}
        data-live={live ? "true" : "false"}
        className={`container-page relative z-10 grid items-center gap-14 lg:gap-16${
          backdrop ? "" : " lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]"
        }`}
      >
        <div>
          <Reveal>
            <Notation ident={ident} cmd={cmd} />
          </Reveal>

          <Reveal delay={60}>
            <h1 className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-none tracking-tight">
                {name}
              </span>
              <span
                className="dsh-mono text-[0.68rem]"
                style={{ color: "var(--text-muted)" }}
              >
                {role}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-balance text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.16] text-ink">
              {heading}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="measure mt-7 text-pretty text-[0.95rem] font-light leading-relaxed">
              {lead}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={primary.href} className="cta cta-primary">
                {primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={secondary.href} className="cta cta-secondary">
                {secondary.label}
              </a>
            </div>
          </Reveal>
        </div>

        {visual && <Reveal delay={140}>{visual}</Reveal>}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Vertical process flow
   -------------------------------------------------------------------------- */

/**
 * The workhorse figure: a rail, a node per stage, a code and a sentence.
 *
 * Vertical rather than horizontal on purpose. Several of these run to eight
 * stages, and eight stages across a phone is either unreadable or a horizontal
 * scroll. Down the page it survives 375px unchanged, which is the only way a
 * technical workflow stays technical on a phone.
 */
export function FlowStack({
  steps,
  className = "",
}: {
  steps: Entry[];
  className?: string;
}) {
  return (
    <ol className={`sol-flow ${className}`}>
      {steps.map((entry, i) => (
        <li key={entry.code} className="sol-step" style={step(i)}>
          <span className="sol-step-node" aria-hidden="true" />
          <div className="sol-step-body">
            <p className="sol-step-code">{entry.code}</p>
            <p className="sol-step-desc">{entry.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The same rail with codes only — for a flow that needs no commentary. */
export function FlowCodes({ steps, className = "" }: { steps: string[]; className?: string }) {
  return (
    <ol className={`sol-flow ${className}`}>
      {steps.map((code, i) => (
        <li key={code} className="sol-step" style={step(i)}>
          <span className="sol-step-node" aria-hidden="true" />
          <div className="sol-step-body">
            <p className="sol-step-code">{code}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* --------------------------------------------------------------------------
   Listings
   -------------------------------------------------------------------------- */

/** Capabilities and service lines: an index, a rule, a code, a sentence. */
export function SpecList({
  items,
  columns = 2,
  className = "",
}: {
  items: Entry[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "";

  return (
    <ul className={`grid gap-x-10 ${cols} ${className}`}>
      {items.map((item, i) => (
        <li key={item.code} className="sol-spec">
          <span className="sol-spec-i">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="sol-spec-code">{item.code}</p>
            <p className="sol-spec-desc">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A list that is a list: audiences, task examples, potential applications. */
export function Chips({
  items,
  plain = false,
  className = "",
}: {
  items: string[];
  /** Audiences read as language, not as identifiers — no mono, no mark. */
  plain?: boolean;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="sol-chip" data-plain={plain ? "true" : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** A compact stage list for inside a comparison column. */
export function StageList({ steps, className = "" }: { steps: string[]; className?: string }) {
  return (
    <ol className={className}>
      {steps.map((code, i) => (
        <li key={code}>
          {i > 0 && (
            <span className="sol-stage-arrow" aria-hidden="true">
              &darr;
            </span>
          )}
          <span className="sol-stage">
            <span className="sol-stage-mark" aria-hidden="true" />
            {code}
          </span>
        </li>
      ))}
    </ol>
  );
}

/**
 * A footnote that qualifies the thing above it. Used wherever a page shows a
 * representative example or a capability that is mission-specific — which is
 * often, and deliberately so.
 */
export function Qualifier({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`measure border-l pl-5 text-[0.8rem] font-light leading-relaxed ${className}`}
      style={{ borderColor: "var(--border-accent)", color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

/* --------------------------------------------------------------------------
   Audience
   -------------------------------------------------------------------------- */

/**
 * Who the capability is for — a labelled row, NOT a section of its own.
 *
 * It used to be a full <SolutionSection>: an eyebrow, a two-word heading and
 * five chips, given the same structural weight as sections carrying diagrams
 * and three paragraphs. On a page that already ends with four consecutive
 * closing blocks it was the thinnest of them by a distance.
 *
 * It now sits at the foot of the section above it, which on every solution
 * page is the one about how the capability is delivered. "Here is how it is
 * deployed, and here is who it is deployed for" is one thought, and it reads
 * better as one.
 */
export function AudienceRow({ items }: { items: string[] }) {
  return (
    <Reveal delay={200}>
      <div className="mt-14 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <p className="dsh-panel-tag">Who it is for</p>
        <Chips items={items} plain className="mt-5" />
      </div>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
   The family band — where this page sits next to DISHA
   -------------------------------------------------------------------------- */

/**
 * Present on all three pages, understated on all three. It has one job: say
 * that this is a focused Orbtrix capability and DISHA is the platform those
 * capabilities are being built toward — without implying the page you are on
 * IS DISHA, and without turning into a second pitch.
 */
export function DishaBand({
  slug,
  mark,
  heading,
  body,
}: {
  slug: string;
  mark: Mark;
  heading: string[];
  body: string;
}) {
  return (
    <SolutionSection mark={mark} heading={heading} className="pt-0">
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
        <div>
          <p className="measure text-pretty text-[0.95rem] font-light leading-relaxed">{body}</p>

          <Reveal delay={80}>
            <Link
              href="/disha"
              className="btn btn-ghost group mt-8 h-11 px-0 text-[0.9rem]"
              style={{ color: "var(--accent)" }}
            >
              Explore the DISHA platform
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* OBSERVE / ORCHESTRATE / PROCESS, then UNIFY + AUTOMATE. The page you
            are on is the lit row. */}
        <Reveal delay={100}>
          <div className="sol-family">
            <p className="dsh-panel-tag">Orbtrix / capability map</p>

            <div className="mt-5">
              {SOLUTIONS.map((solution) => (
                <div
                  key={solution.slug}
                  className="sol-family-cell"
                  data-self={solution.slug === slug ? "true" : undefined}
                >
                  <p className="sol-family-name">{solution.name}</p>
                  <p className="sol-family-verb">{solution.verb}</p>
                </div>
              ))}

              <div className="sol-family-cell" style={{ borderColor: "var(--border-strong)" }}>
                <p className="sol-family-name" style={{ color: "var(--text-primary)" }}>
                  DISHA
                </p>
                <p className="sol-family-verb">UNIFY + AUTOMATE</p>
              </div>
            </div>

            <p className="mt-6 text-[0.8rem] font-light leading-relaxed">{FAMILY_NOTE}</p>
          </div>
        </Reveal>
      </div>
    </SolutionSection>
  );
}

/* --------------------------------------------------------------------------
   Closing
   -------------------------------------------------------------------------- */

export function SolutionClosing({
  mark,
  heading,
  lead,
  cta,
}: {
  mark: Mark;
  heading: string;
  lead: string;
  cta: string;
}) {
  return (
    <section className="sol-section container-page pt-0">
      <div
        className="border-t pt-16 text-center md:pt-20"
        style={{ borderColor: "var(--border)" }}
      >
        <Reveal>
          <div className="flex justify-center">
            <Notation ident={mark.ident} cmd={mark.cmd} className="text-left" />
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h2 className="mx-auto mt-8 max-w-3xl text-balance text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.08]">
            {heading}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-[0.95rem] font-light leading-relaxed">
            {lead}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-10 flex justify-center">
            <Link href="/contact" className="cta cta-primary">
              {cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Cross-links
   -------------------------------------------------------------------------- */

/**
 * The other two solutions. Deliberately quiet — a way out of the page, not a
 * second call to action, so it is two hairline rows rather than two cards.
 */
export function SolutionCrossLinks({ slug }: { slug: string }) {
  const others = otherSolutions(slug);

  return (
    <section className="container-page pb-20 md:pb-24">
      <Reveal>
        <p className="dsh-panel-tag">Explore other solutions</p>
      </Reveal>

      <ul className="mt-5">
        {others.map((solution, i) => (
          <Reveal key={solution.slug} as="li" delay={i * 70}>
            <Link href={`/solutions/${solution.slug}`} className="sol-cross">
              <span>
                <span className="sol-cross-name">{solution.name}</span>
                <span className="sol-cross-role block">{solution.role}</span>
              </span>
              <ArrowUpRight className="sol-cross-arrow h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Small helpers shared by the page-specific figures
   -------------------------------------------------------------------------- */

/** Per-item animation index, re-exported so page figures need one import. */
export { step };
export type { CSSProperties };
