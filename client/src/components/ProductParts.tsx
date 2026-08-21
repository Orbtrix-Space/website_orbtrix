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

export function ItemCard({ item, delay = 0 }: { item: ProductItem; delay?: number }) {
  const Icon = item.icon;
  const hint = itemHint(item);

  return (
    <Reveal delay={delay}>
      <article className="card h-full p-8 md:p-10">
        <span
          className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-sm"
          style={{ backgroundColor: "var(--surface-hover)", color: "var(--accent)" }}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>

        <h3 className="text-2xl">{itemName(item)}</h3>
        <p className="mt-2 text-[13px]" style={{ color: "var(--accent)" }}>
          {item.tagline}
        </p>
        <p className="measure mt-5 leading-relaxed">{item.description}</p>

        {hint && <p className="mt-5 text-sm italic">{hint}</p>}
      </article>
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
            className="btn btn-primary group h-14 px-8 text-base"
          >
            Join the early adopter programme
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" />
          </a>
          <Link href="/contact" className="btn btn-secondary h-14 px-8 text-base">
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
