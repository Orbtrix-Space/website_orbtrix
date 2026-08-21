import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_ITEMS, NAV_CTA, type NavLink } from "@/data/site";
import { scrollToHashOrTop } from "@/components/ScrollToTop";

/**
 * Navigating to `/product#ground` while already on `/product` doesn't change
 * wouter's location, so <ScrollToTop> never fires. Nudge it by hand.
 */
function onHashNav() {
  requestAnimationFrame(scrollToHashOrTop);
}

/**
 * Crisp white wordmark, masked from the logo asset.
 * This is the site's Home link — there is no separate "Home" nav item.
 */
function Logo({
  onClick,
  className = "h-7 w-28 md:h-8 md:w-32",
  dark = false,
}: {
  onClick?: () => void;
  className?: string;
  /** Rendered over dark media — the mark must invert to stay visible. */
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center"
      aria-label="Orbtrix Space, home"
    >
      <span
        className={`block transition-opacity duration-300 hover:opacity-80 ${className}`}
        style={{
          WebkitMaskImage: "url(/logo-white.png)",
          maskImage: "url(/logo-white.png)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "left center",
          maskPosition: "left center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          backgroundColor: dark ? "#ffffff" : "var(--text-primary)",
        }}
      />
    </Link>
  );
}

/**
 * True while a region marked `data-nav-dark` (the cinematic video block) is
 * still behind the header. The bar is white-on-black everywhere; over footage
 * it drops its frosted slab and lifts the type a step so it stays legible
 * against moving frames.
 */
function useOverDarkRegion() {
  const [overDark, setOverDark] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    let frame = 0;
    const check = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const region = document.querySelector<HTMLElement>("[data-nav-dark]");
        if (!region) {
          setOverDark(false);
          return;
        }
        // still dark while the region's bottom edge sits below the header
        setOverDark(region.getBoundingClientRect().bottom > 80);
      });
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location]);

  return overDark;
}

/** True when `href` addresses the page we're on (ignoring any #anchor). */
function isActive(href: string, location: string) {
  const path = href.split("#")[0];
  if (path === "/") return location === "/";
  return location === path || location.startsWith(`${path}/`);
}

/**
 * Highlight a submenu row only when it points at a distinct page. Anchor
 * children (/solutions#onboard) all share one path, so marking them by path
 * would light up every row at once.
 */
function isChildActive(href: string, location: string) {
  if (href.includes("#")) return false;
  return isActive(href, location);
}

/**
 * A dropdown parent is active when its own route matches, or when any of its
 * children does — otherwise "About" reads as inactive while you're on /team.
 */
function isBranchActive(item: NavLink, location: string) {
  return (
    isActive(item.href, location) ||
    (item.children ?? []).some((child) => isActive(child.href, location))
  );
}

/* -------------------------------------------------------------------------- */

function Dropdown({ item, location }: { item: NavLink; location: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>();

  // Close on outside click and on Escape — a dropdown you can't dismiss with
  // the keyboard is a trap.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // Small grace period so the pointer can cross the gap to the panel.
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={hoverOpen}
      onMouseLeave={hoverClose}
      onFocus={hoverOpen}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        className="nav-link inline-flex items-center gap-1.5 py-2 text-[13px]"
        data-active={isBranchActive(item, location)}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(false)}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ease-brand ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Link>

      <div
        className={`absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 transition-all duration-200 ease-brand ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div
          className="overflow-hidden rounded-lg border p-2"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border-strong)",
          }}
        >
          {item.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => {
                setOpen(false);
                onHashNav();
              }}
              tabIndex={open ? 0 : -1}
              className="block px-4 py-2.5 text-[13px] transition-colors duration-200 hover:bg-[var(--surface-hover)] hover:text-ink"
              style={{
                color: isChildActive(child.href, location) ? "var(--accent)" : "var(--text-muted)",
              }}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MobileMenu({
  open,
  onClose,
  location,
}: {
  open: boolean;
  onClose: () => void;
  location: string;
}) {
  // Open the group that contains the current page, so you can see where you are.
  const [expanded, setExpanded] = useState<string | null>(
    () => NAV_ITEMS.find((i) => i.children?.length && isBranchActive(i, location))?.label ?? null,
  );

  // Lock body scroll while the sheet is open, and always release on unmount.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Crossing to desktop while the sheet is open would strand the scroll lock.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[86vw] max-w-sm flex-col transition-transform duration-300 ease-brand md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "var(--surface)", borderLeft: "1px solid var(--border)" }}
        aria-hidden={!open}
      >
        <div className="flex h-20 items-center justify-between px-6">
          {/* The logo is the Home link, so the sheet keeps one too. */}
          <Logo onClick={onClose} className="h-6 w-24" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-ink transition-colors hover:bg-[var(--surface-hover)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 pb-8">
          {NAV_ITEMS.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = expanded === item.label;

            return (
              <div key={item.href} className="border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between">
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      className="flex-1 py-4 text-lg font-medium transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      className="flex-1 py-4 text-lg font-medium transition-colors"
                      style={{
                        color: isBranchActive(item, location)
                          ? "var(--accent)"
                          : "var(--text-primary)",
                      }}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasChildren && (
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} links`}
                      tabIndex={open ? 0 : -1}
                      className="rounded-pill p-2 text-ink-muted transition-colors hover:text-ink"
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ease-brand ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {hasChildren && (
                  <div
                    className="grid transition-all duration-300 ease-brand"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 pb-4 pl-4">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              onClose();
                              onHashNav();
                            }}
                            tabIndex={open && isOpen ? 0 : -1}
                            className="py-2 text-[13px] text-ink-muted transition-colors hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href={NAV_CTA.href}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="btn btn-outline mt-8 h-12 w-full px-6 text-[13px]"
          >
            {NAV_CTA.label}
          </Link>
        </nav>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function Nav() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overDark = useOverDarkRegion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over the cinematic video the bar stays clear — an opaque slab would break
  // the shot. Everywhere else it frosts to black once you scroll.
  const solid = scrolled && !overDark;

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary sr-only left-4 top-4 z-[60] px-5 py-2 focus:not-sr-only focus:fixed"
      >
        Skip to content
      </a>

      {/* `absolute`, not `fixed`: the bar belongs to the top of the page and
          scrolls away with it, rather than riding down the viewport and
          overlapping section content. With no positioned ancestor this
          resolves against the initial containing block, so it lands at the
          document top and simply leaves as you scroll. */}
      <header
        data-dark={overDark ? "true" : "false"}
        className="absolute inset-x-0 top-0 z-40 transition-all duration-500 ease-brand"
        style={{
          backgroundColor: solid ? "rgba(0, 0, 0, 0.85)" : "transparent",
          backdropFilter: solid ? "blur(16px)" : "none",
          WebkitBackdropFilter: solid ? "blur(16px)" : "none",
          borderBottom: `1px solid ${solid ? "var(--border)" : "transparent"}`,
        }}
      >
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Logo dark={overDark} />

          <nav className="hidden items-center gap-10 md:flex lg:gap-12" aria-label="Primary">
            {NAV_ITEMS.map((item) =>
              item.children?.length ? (
                <Dropdown key={item.href} item={item} location={location} />
              ) : item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link py-2 text-[13px]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link py-2 text-[13px]"
                  data-active={isActive(item.href, location)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={NAV_CTA.href} className="btn btn-outline hidden h-10 px-6 text-[13px] md:inline-flex">
              {NAV_CTA.label}
            </Link>

            <button
              className="rounded-pill p-2 transition-colors hover:bg-[var(--surface-hover)] md:hidden"
              style={{ color: overDark ? "#ffffff" : "var(--text-primary)" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} location={location} />
    </>
  );
}
