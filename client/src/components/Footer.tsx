import { Link } from "wouter";
import { FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";
import {
  FOOTER_COLUMNS,
  SOCIALS,
  LEGAL_LINKS,
  LEGAL_NAME,
  CONTACT,
  type NavLink,
  type Social,
} from "@/data/site";
import { scrollToHashOrTop } from "@/components/ScrollToTop";

const SOCIAL_ICONS: Record<Social["icon"], IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  x: FaXTwitter,
};

function FooterLink({ link, className }: { link: NavLink; className?: string }) {
  const base =
    className ??
    "inline-block text-[13px] text-ink-muted transition-colors duration-300 hover:text-ink";

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

/** Sharp white social icons, no glow. */
function SocialIcons({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <div className="flex items-center gap-4">
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.icon];
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-ink transition-colors duration-300 hover:text-brand"
          >
            <Icon className={size} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      {/* ---- Link columns: the site's link surface ---- */}
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,1fr)] md:gap-8">
          {/* Brand */}
          <div className="max-w-xs sm:col-span-2 md:col-span-3 lg:col-span-1">
            <span
              className="mb-5 block h-9 w-9"
              style={{
                WebkitMaskImage: "url(/logo-mark.png)",
                maskImage: "url(/logo-mark.png)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                backgroundColor: "var(--text-primary)",
              }}
              aria-label="Orbtrix"
              role="img"
            />
            <p className="text-[13px] leading-relaxed">
              AI-native mission operations software. Ground autonomy today, full mission
              autonomy ahead.
            </p>

            <div className="mt-6">
              <SocialIcons size="h-[18px] w-[18px]" />
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-muted">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ---- Utilitarian bottom bar: dark slate, tiny precise text, no glow ---- */}
      <div style={{ backgroundColor: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex flex-col items-center gap-x-6 gap-y-1 text-center sm:flex-row sm:text-left">
            <p className="text-xs tracking-wide text-ink-muted">
              © Copyright {LEGAL_NAME} {new Date().getFullYear()}
            </p>
            <nav aria-label="Legal" className="flex items-center gap-5">
              {LEGAL_LINKS.map((link) => (
                <FooterLink
                  key={link.href}
                  link={link}
                  className="text-xs tracking-wide text-ink-muted transition-colors duration-300 hover:text-ink"
                />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-xs tracking-wide text-ink-muted">{CONTACT.city}</span>
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
