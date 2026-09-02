import { PARTNER_LOGOS, type PartnerLogo } from "virtual:partner-logos";
import { Reveal } from "@/components/Reveal";
import { Notation } from "@/components/tech/TechParts";
import { INCUBATOR } from "@/data/site";

/**
 * Ecosystem — the logo wall.
 *
 * The directory client/public/Logos_Partners/ is the only source of truth. The
 * list arrives from the `partner-logos` Vite plugin (see vite.config.ts); there
 * is no array here, and no filename appears anywhere in this file. Add a logo
 * to the folder and it shows up; remove it and it goes.
 *
 * ---- Why every mark is flattened to white -------------------------------
 * This used to measure each logo in a <canvas> — mean luminance and mean
 * chroma — and lighten only the ones that were both dark AND close to
 * greyscale, so coloured marks kept their own colours. It was careful, and on
 * this particular set of logos it failed: a dark navy seal and a near-black
 * wordmark both have enough chroma to be classified "coloured", so both were
 * left as they were, which on a black page means left invisible.
 *
 * A partner logo that cannot be seen is worse than no logo at all — it implies
 * a relationship while showing nothing, and it makes the row read as filler.
 * So every mark now gets the same monochrome treatment: brightness(0) collapses
 * the artwork to a black silhouette, invert(1) lifts that to white, and the
 * alpha channel is untouched so the shape stays exact. One rule, no
 * measurement, no per-logo exceptions, and every mark is legible at the same
 * weight — which is also what stops one brand's colour from shouting over the
 * others in a row that is supposed to read as a set.
 */

function LogoPlate({ logo, lead = false }: { logo: PartnerLogo; lead?: boolean }) {
  const img = (
    <img
      src={logo.src}
      alt={logo.name}
      loading="lazy"
      decoding="async"
      className="partner-logo"
      data-lead={lead || undefined}
    />
  );

  // The incubator plate is a single mark, not a list item.
  if (lead) return img;

  return <li className="flex items-center justify-center">{img}</li>;
}

export function PartnersBackers() {
  // An empty directory hides the section rather than leaving a stray heading.
  if (PARTNER_LOGOS.length === 0) return null;

  /* The one named relationship, split out of the wall. See INCUBATOR in
     data/site.ts for why this is the only one. A rename or a removal makes
     `incubator` undefined and everything simply falls back into `others`. */
  const incubator = PARTNER_LOGOS.find(
    (logo) => logo.name.toLowerCase() === INCUBATOR.toLowerCase(),
  );
  const others = PARTNER_LOGOS.filter((logo) => logo !== incubator);

  /* No top padding: the section above this one ends on a CTA and already
     carries a full section's worth of bottom padding. Adding this one's own on
     top of that put roughly 200px of black between a button and a heading. */
  return (
    <section className="container-page pb-[clamp(3.5rem,5vw,6rem)]">
      <Reveal>
        <Notation ident="ECOSYSTEM" cmd="partners()" />
      </Reveal>

      <div
        className="mt-9 grid gap-y-10 border-t pt-9 lg:grid-cols-12 lg:gap-x-16"
        style={{ borderColor: "var(--border)" }}
      >
        {incubator && (
          <Reveal className="lg:col-span-4">
            <p className="pw-label">Incubated by</p>
            {/* Given its own plate and a size the others do not get. It is the
                only mark on this page with a stated relationship behind it,
                and it should not have to compete with three that do not. */}
            <div className="pw-plate mt-5">
              <LogoPlate logo={incubator} lead />
            </div>
          </Reveal>
        )}

        <Reveal delay={90} className={incubator ? "lg:col-span-8" : "lg:col-span-12"}>
          <p className="pw-label">Partners &amp; backers</p>

          {/* auto-fit + minmax means the column count follows the logo count
              and the viewport on its own — nothing here changes when the
              directory does. */}
          <ul className="partner-wall mt-5">
            {others.map((logo) => (
              <LogoPlate key={logo.src} logo={logo} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
