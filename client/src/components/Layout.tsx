import { Link, useLocation } from "wouter";
import { NAV_ITEMS } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Close mobile menu + release body scroll lock on viewport crossing to desktop.
  // Prevents stale overlay / scroll-lock when toggling "Request Desktop Site".
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    // Safari < 14 fallback
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  // Always release scroll lock on unmount.
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-foreground bg-black">
      <ScrollProgress />

      {/* Floating pill header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-3 md:top-5 left-0 right-0 z-50 flex justify-center px-3 md:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-5xl xl:max-w-6xl flex items-center justify-between gap-3 md:gap-4 pl-4 md:pl-6 pr-1.5 md:pr-2 h-14 md:h-16 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-white/10 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
              : "bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
          }`}
        >
          <Link href="/" className="hover:opacity-80 transition-opacity group flex items-center shrink-0">
            <div
              className="h-7 md:h-8 lg:h-9 w-28 md:w-32 lg:w-36 transition-all duration-300"
              style={{
                WebkitMaskImage: "url(/logo-white.png)",
                maskImage: "url(/logo-white.png)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #2dd4bf 60%, #14b8a6 100%)",
              }}
              aria-label="Orbtrix Space"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide transition-colors font-display ${
                  location === item.href
                    ? "text-teal-300"
                    : "text-neutral-300 hover:text-white"
                }`}
              >
                {item.label}
                {location === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-teal-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-teal-300 transition-all duration-300"
            >
              Talk to us
            </Link>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col px-5 py-8 gap-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl tracking-tight font-display uppercase ${
                      location === item.href
                        ? "text-teal-300"
                        : "text-neutral-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 + 0.05 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-white text-black text-base font-semibold"
                >
                  Talk to us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20 md:pt-24">{children}</main>

      {/* Footer */}
      <footer className="border-t border-teal-400/15 mt-10 bg-black">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 2xl:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 2xl:gap-16">
            <div>
              <div
                className="h-10 md:h-11 2xl:h-12 w-10 md:w-11 2xl:w-12 mb-4 opacity-80"
                style={{
                  WebkitMaskImage: "url(/logo-mark.png)",
                  maskImage: "url(/logo-mark.png)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #2dd4bf 60%, #14b8a6 100%)",
                }}
                aria-label="Orbtrix"
              />
              <p className="text-neutral-500 text-sm 2xl:text-base leading-relaxed max-w-sm">
                Autonomous spacecraft systems. From LEO to the Moon.
              </p>
            </div>

            <div>
              <span className="text-xs 2xl:text-sm font-display uppercase tracking-widest text-teal-400/70 mb-4 block">
                Pages
              </span>
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs 2xl:text-sm font-display uppercase tracking-widest text-teal-400/70 mb-4 block">
                Connect
              </span>
              <div className="flex flex-col gap-3">
                <a href="mailto:info@orbtrix.space" className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                  info@orbtrix.space
                </a>
                <a href="https://www.linkedin.com/company/orbtrix/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/orbtrix_space/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                  Instagram
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                  X (Twitter)
                </a>
                <a href="https://www.notion.so/Careers-at-Orbtrix-Space-3135b581cdb7809ea3ccc510b9325b9b" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-teal-300 transition-colors text-sm 2xl:text-base w-fit">
                  Careers
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-teal-400/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-neutral-700 text-sm 2xl:text-base font-mono">&copy; {new Date().getFullYear()} Orbtrix Space Pvt Ltd</span>
            <span className="text-neutral-800 text-sm 2xl:text-base font-mono">Bengaluru, India</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
