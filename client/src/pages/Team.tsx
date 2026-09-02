import { useState } from "react";
import { Link } from "wouter";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Linkedin, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";
import { PEOPLE, PEOPLE_CLOSING, PEOPLE_INTRO, type Person } from "@/data/team";
import { Notation } from "@/components/tech/TechParts";

/**
 * People.
 *
 * One grid, one card treatment, nine people — no "leadership / founding
 * engineers / advisory board" split. That split ranked the advisors below the
 * engineers and made a nine-person company read as three smaller ones; the
 * role under each name does the same job without the hierarchy.
 *
 * A card opens a profile dialog rather than navigating: the page is the
 * group portrait, and leaving it to read one biography loses that.
 *
 * Copy and the rules on what may be written into a biography live in
 * data/team.ts.
 */

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/* -------------------------------------------------------------------------- */

function PersonCard({ person, onOpen }: { person: Person; onOpen: () => void }) {
  return (
    <button type="button" className="ppl-card" onClick={onOpen}>
      {person.photo ? (
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          decoding="async"
          className="ppl-photo"
        />
      ) : (
        <span className="ppl-initials" aria-hidden="true">
          {initials(person.name)}
        </span>
      )}

      <span className="ppl-body">
        <span className="min-w-0">
          <span className="ppl-label block">{person.label}</span>
          <span className="ppl-name block">{person.name}</span>
          <span className="ppl-role block">{person.role}</span>
        </span>

        <span className="ppl-cue">$ profile.view()</span>
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

function ProfileDialog({
  person,
  open,
  onOpenChange,
}: {
  /** Held after close so the exit animation still has something to draw. */
  person: Person | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    /* Radix gives the focus trap, Escape, the outside click and the scroll
       lock. Rendering the dialog only while a person is selected keeps the
       content out of the tree the rest of the time; the exit animation still
       plays because Radix keeps the node mounted for its duration. */
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="ppl-overlay" />

        <Dialog.Content className="ppl-dialog" aria-describedby={undefined}>
          {person && (
            <div className="p-6 md:p-9">
              <div className="flex items-start justify-between gap-6">
                <Notation ident="BACKGROUND" cmd="profile()" />

                <Dialog.Close className="ppl-close">
                  <X className="h-3 w-3" aria-hidden="true" />
                  CLOSE
                </Dialog.Close>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
                <div>
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      loading="lazy"
                      decoding="async"
                      className="ppl-dialog-photo"
                    />
                  ) : (
                    <span className="ppl-initials rounded" aria-hidden="true">
                      {initials(person.name)}
                    </span>
                  )}

                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dsh-mono mt-4 inline-flex items-center gap-2 text-[0.6rem] text-ink-muted transition-colors hover:text-ink"
                    >
                      <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                      LINKEDIN
                    </a>
                  )}
                </div>

                <div>
                  <p className="ppl-label">{person.label}</p>

                  <Dialog.Title className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] leading-tight">
                    {person.name}
                  </Dialog.Title>

                  <p className="mt-2 text-[0.88rem] font-light" style={{ color: "var(--accent)" }}>
                    {person.role}
                  </p>

                  <div className="mt-7 border-t pt-7" style={{ borderColor: "var(--border)" }}>
                    <p className="text-pretty text-[0.92rem] font-light leading-relaxed">
                      {person.bio}
                    </p>
                  </div>

                  <p className="dsh-panel-tag mt-8">Expertise</p>
                  <ul className="mt-3 flex flex-wrap gap-2.5">
                    {person.expertise.map((tag) => (
                      <li key={tag} className="sol-chip">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* -------------------------------------------------------------------------- */

export default function Team() {
  usePageMeta(
    "People",
    "The people building Orbtrix: spacecraft operations, astrodynamics, systems engineering, AI/ML and decades of aerospace experience.",
  );

  /* Two pieces of state, not one: `open` drives the dialog, `selected`
     survives the close so Radix has content to animate out. */
  const [selected, setSelected] = useState<Person | null>(null);
  const [open, setOpen] = useState(false);

  const openProfile = (person: Person) => {
    setSelected(person);
    setOpen(true);
  };

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <section className="container-page page-head">
        <Reveal>
          <Notation ident={PEOPLE_INTRO.mark.ident} cmd={PEOPLE_INTRO.mark.cmd} />
        </Reveal>

        <Reveal delay={60}>
          <h1 className="mt-7 max-w-3xl text-balance text-[clamp(1.95rem,4.4vw,3.2rem)] leading-[1.08]">
            {PEOPLE_INTRO.heading}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="measure mt-7 text-pretty text-[0.98rem] font-light leading-relaxed">
            {PEOPLE_INTRO.lead}
          </p>
        </Reveal>
      </section>

      {/* ===================== THE GRID =====================
          Three columns, so nine people fill it exactly. Four would leave one
          card alone on the last row, which reads as an afterthought. */}
      <section className="container-page pb-20 md:pb-24">
        {/* Capped, but NOT centred. Alignment on this site means every page starts
            at the same left edge — it does not mean every element has to fill the
            container. Uncapped, three columns of a 1400px container gave each
            portrait a 440px square and turned nine people into a very long page;
            centred, the grid's left edge missed the heading above it. Capped and
            left-aligned is both. */}
        <ul className="grid max-w-[74rem] gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {PEOPLE.map((person, i) => (
            <Reveal key={person.name} as="li" delay={(i % 3) * 70}>
              <PersonCard person={person} onOpen={() => openProfile(person)} />
            </Reveal>
          ))}
        </ul>
      </section>

      <ProfileDialog person={selected} open={open} onOpenChange={setOpen} />

      {/* ===================== CLOSING ===================== */}
      <section className="container-page pb-20 md:pb-24">
        <div className="border-t pt-16 md:pt-20" style={{ borderColor: "var(--border)" }}>
          <Reveal>
            <Notation ident={PEOPLE_CLOSING.mark.ident} cmd={PEOPLE_CLOSING.mark.cmd} />
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-7 text-[clamp(1.6rem,3.2vw,2.5rem)] leading-[1.1]">
              {PEOPLE_CLOSING.heading.map((line) => (
                <span key={line} className="block text-balance">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="measure mt-7 text-pretty text-[0.95rem] font-light leading-relaxed">
              {PEOPLE_CLOSING.lead}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href={PEOPLE_CLOSING.primary.href} className="cta cta-primary">
                {PEOPLE_CLOSING.primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={PEOPLE_CLOSING.secondary.href} className="cta cta-secondary">
                {PEOPLE_CLOSING.secondary.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
