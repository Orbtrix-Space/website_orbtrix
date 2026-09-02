import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { EARLY_ACCESS_URL, itemName, itemHint, type ProductItem } from "@/data/products";

/** Shared building blocks for the Products and Solutions pages. */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id?: string;
}) {
  return (
    <Reveal id={id}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 max-w-3xl text-balance text-[clamp(1.5rem,3.15vw,2.4rem)]">{title}</h2>
      {lead && <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed">{lead}</p>}
    </Reveal>
  );
}


/** Closing block: a headline plus the early-adopter / contact CTAs. */
export function ClosingCTA({ heading }: { heading: string }) {
  return (
    <section className="section container-page pt-0 text-center">
      <Reveal>
        <h2 className="mx-auto max-w-3xl text-balance text-[clamp(1.5rem,3.15vw,2.4rem)]">
          {heading}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={EARLY_ACCESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-primary"
          >
            Join the early adopter programme
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link href="/contact" className="cta cta-secondary">
            Get in touch
          </Link>
        </div>
        <p className="mt-6 text-sm">
          Early adopters get co-development access and founding-customer terms.
        </p>
      </Reveal>
    </section>
  );
}
