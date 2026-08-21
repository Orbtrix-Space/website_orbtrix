import { TRUSTED_BY, TRUSTED_BY_LABEL, type TrustedByLogo } from "@/data/trustedBy";
import { Reveal } from "@/components/Reveal";

function LogoItem({ item }: { item: TrustedByLogo }) {
  const content = item.logo ? (
    <img
      src={item.logo}
      alt={item.name}
      loading="lazy"
      className="logo-plate h-8 w-auto object-contain md:h-9"
    />
  ) : (
    <span
      className={`logo-plate whitespace-nowrap text-lg font-medium tracking-tight ${
        item.placeholder ? "text-ink-muted" : "text-ink"
      }`}
    >
      {item.name}
    </span>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}

/**
 * Credibility strip — a seamless, grayscale logo marquee.
 *
 * The track is rendered twice and translated by exactly -50%, so the copy lands
 * where the original started and the loop never seams. The duplicate is hidden
 * from assistive tech to avoid announcing every logo twice. Hovering pauses it;
 * prefers-reduced-motion stops it and wraps the logos into a static row.
 */
export function TrustedBy() {
  if (TRUSTED_BY.length === 0) return null;

  return (
    <section className="section container-page pt-0">
      <Reveal>
        <p className="mb-12 text-center text-sm tracking-[0.02em] text-ink-muted">
          {TRUSTED_BY_LABEL}
        </p>

        <div className="marquee-viewport overflow-hidden">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center gap-x-16 pr-16 md:gap-x-24 md:pr-24"
                aria-hidden={copy === 1}
              >
                {TRUSTED_BY.map((item) => (
                  <li key={`${copy}-${item.name}`}>
                    <LogoItem item={item} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
