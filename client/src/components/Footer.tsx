import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  FOOTER_COLUMNS,
  SOCIALS,
  LEGAL_LINKS,
  LEGAL_NAME,
  CONTACT,
  REGISTERED_OFFICE,
  CURRENT_LOCATION,
  INCUBATED_AT,
  type NavLink,
  type Social,
} from "@/data/site";
import { scrollToHashOrTop } from "@/components/ScrollToTop";

/**
 * The footer, and the only white surface on the site.
 *
 * That inversion is the point of it. Every page above is black, and a black
 * footer under a black page is not a footer — it is where the page stops
 * having content. Turning it over draws a hard line under the site and gives
 * the link layer a place that is visibly not the page.
 *
 * ---- Structure -----------------------------------------------------------
 * Three bands, and the split is by what the information IS, not by how much of
 * it there is:
 *
 *   1. Brand and navigation — who we are, and everywhere you can go.
 *   2. Incorporation — where the company legally is, and who it is incubated
 *      at. This gets its own band rather than being crammed into a fifth
 *      column: a four-line registered address in a 190px column wraps into a
 *      ragged block, and squeezing it there is what makes an address look like
 *      an afterthought. Full width, small type, its own hairline — present and
 *      readable without competing with the navigation above it.
 *   3. The legal bar.
 *
 * That order is also the mobile order, so the stack needs no reordering.
 *
 * ---- Colour --------------------------------------------------------------
 * Every value comes from the --*-invert tokens in theme.css, which exist for
 * exactly this. The accent is --accent-mark (#7c3aed) and NOT --accent
 * (#a78bfa): the light tone is chosen for contrast against black and washes
 * out to near-invisibility on white.
 *
 * The wordmark is masked rather than swapped for a dark asset — the same
 * /logo-white.png the nav uses, painted in --text-invert. One file, no second
 * export to keep in sync, and the silhouette is identical.
 */

const SOCIAL_ICONS: Record<Social["icon"], IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  x: FaXTwitter,
};

function FooterLink({ link, className }: { link: NavLink; className?: string }) {
  const base = className ?? "ft-link";

  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={base}>
        {link.label}
      </a>
    );
  }
  return (
    <Link
      href={link.href}
      className={base}
      // Same-page anchors don't change wouter's location; nudge the scroll.
      onClick={() => link.href.includes("#") && requestAnimationFrame(scrollToHashOrTop)}
    >
      {link.label}
    </Link>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.icon];
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="ft-social"
          >
            <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function Footer() {
  return (
    /* data-footer is read by <BackToTop> so the control can invert while it is
       over this surface. Nothing else depends on it. */
    <footer className="ft" data-footer="true">
      {/* ===== 1 · Brand and navigation ===== */}
      <div className="container-page pb-14 pt-[clamp(5rem,7vw,6.5rem)]">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Orbtrix Space, home" className="inline-block">
              <span
                className="ft-mark"
                style={{
                  WebkitMaskImage: "url(/logo-white.png)",
                  maskImage: "url(/logo-white.png)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
                role="img"
                aria-label="Orbtrix"
              />
            </Link>

            <p className="ft-tagline">
              AI-native mission operations software.
              <br />
              Ground autonomy today.
              <br />
              Full mission autonomy ahead.
            </p>

            <div className="mt-7">
              <SocialIcons />
            </div>
          </div>

          {/* Four link columns plus Contact, on a SIX-unit track where Contact
              takes two of them. The campus address is seven lines; in a
              one-unit column it wrapped into a ragged tower and set the height
              of the whole row. Two units gives it about 320px, which is enough
              for the supplied line breaks to hold.

              Two across on a phone, three at tablet — never one, which turns
              five short lists into a very long scroll for no gain. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {FOOTER_COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="ft-heading">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={`${link.label}-${link.href}`}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact is a column of facts rather than links, so it is built
                here rather than driven from FOOTER_COLUMNS. Two units wide —
                see the note on the grid above. */}
            <div className="col-span-2">
              <h2 className="ft-heading">Contact</h2>

              <a href={`mailto:${CONTACT.email}`} className="ft-link mt-5 block">
                {CONTACT.email}
              </a>

              {/* Where the team actually is. Set in the secondary tone and one
                  step down in size: it is reference information, not a link,
                  and it must not out-weigh the five columns beside it. */}
              <address className="ft-loc">
                {CURRENT_LOCATION.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 2 · Incorporation, and the way in =====
          Three blocks of deliberately unequal height: who incubates us, where
          we are registered, and how to start a conversation. The CTA is here
          rather than in a band of its own because this row already existed and
          was two-thirds empty — the space was going to be white either way, so
          it may as well do something. */}
      <div className="ft-rule">
        <div className="container-page grid gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <h2 className="ft-micro-heading">Incubated at</h2>
            {/* Text, not a mark. There is no FSID logo in the project and one
                will not be invented — see INCUBATED_AT in data/site.ts. */}
            <p className="ft-fsid">{INCUBATED_AT}</p>
          </div>

          <div className="lg:col-span-4">
            <h2 className="ft-micro-heading">Registered office</h2>
            <address className="ft-address">
              {REGISTERED_OFFICE.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {/* Small on purpose. The page above already ends on a full CTA; a
              second one at that weight would be the third ending in a row. */}
          <div className="sm:col-span-2 lg:col-span-5 lg:justify-self-end lg:text-left">
            <p className="ft-cta-mark">
              <span className="ft-sigil" aria-hidden="true"># </span>
              MISSION_CONNECT
            </p>

            <p className="ft-cta-line">Building or flying a mission that needs autonomy?</p>

            <Link href="/contact" className="ft-cta">
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===== 3 · Legal bar ===== */}
      <div className="ft-rule">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-7 sm:flex-row sm:items-center">
          <p className="ft-fine">
            © {new Date().getFullYear()} {LEGAL_NAME}
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <FooterLink key={link.href} link={link} className="ft-fine ft-fine-link" />
            ))}
            <span className="ft-fine">{CONTACT.city}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
