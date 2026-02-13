import { Link, useLocation } from "wouter";
import { NAV_ITEMS } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarField } from "@/components/StarField";
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-foreground">
      <StarField />
      <ScrollProgress />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img
              src="/logo-white.png"
              alt="Orbtrix Space"
              className="h-7 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 xl:gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[13px] tracking-wide transition-colors ${
                  location === item.href
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {item.label}
                {location === item.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
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
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-5 py-8 gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl tracking-tight ${
                    location === item.href
                      ? "text-white"
                      : "text-neutral-500"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-grow pt-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <img
                src="/logo-mark.png"
                alt="Orbtrix"
                className="h-7 w-auto opacity-70 mb-4"
              />
              <p className="text-neutral-600 text-sm leading-relaxed max-w-xs">
                Autonomous spacecraft systems — from LEO to the Moon.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-700 mb-4 block">
                Pages
              </span>
              <div className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-neutral-500 hover:text-neutral-300 transition-colors text-sm w-fit"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-700 mb-4 block">
                Connect
              </span>
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:info@orbtrix.space"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors text-sm w-fit"
                >
                  info@orbtrix.space
                </a>
                <a
                  href="https://www.linkedin.com/company/orbtrix-space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors text-sm w-fit"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.04] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-neutral-700 text-xs font-mono">
              &copy; {new Date().getFullYear()} Orbtrix Space Pvt Ltd
            </span>
            <span className="text-neutral-800 text-xs font-mono">
              Bengaluru, India
            </span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
