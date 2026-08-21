import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Scroll to the top on route change — unless the URL carries a hash, in which
 * case scroll that section into view instead (`/product#ground`).
 *
 * `scroll-padding-top` in index.css keeps the sticky nav off the heading.
 */
export function scrollToHashOrTop() {
  const hash = window.location.hash;

  if (hash.length > 1) {
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Wait for the incoming page to paint before measuring the anchor.
    const raf = requestAnimationFrame(scrollToHashOrTop);
    return () => cancelAnimationFrame(raf);
  }, [location]);

  return null;
}
