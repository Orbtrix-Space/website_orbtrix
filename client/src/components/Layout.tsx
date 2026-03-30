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
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen flex flex-col text-foreground">
      <StarField />
      <ScrollProgress />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 h-16 2xl:h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity group">
            <img
              src="/logo-white.png"
              alt="Orbtrix Space"
              className="h-8 2xl:h-10 w-auto group-hover:opacity-90 transition-all duration-300"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 xl:gap-10 2xl:gap-14">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm 2xl:text-base tracking-wider transition-colors font-display uppercase ${
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 top-16 z-40 bg-black/95 backdrop-blur-xl md:hidden"
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
                        ? "text-white text-white"
                        : "text-neutral-500"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-16 2xl:pt-20">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/8 mt-10">
        <div className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 2xl:px-24 py-10 2xl:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 2xl:gap-16">
            <div>
              <img src="/logo-mark.png" alt="Orbtrix" className="h-8 2xl:h-10 w-auto opacity-70 mb-4" />
              <p className="text-neutral-500 text-sm 2xl:text-base leading-relaxed max-w-sm">
                Autonomous spacecraft systems — from LEO to the Moon.
              </p>
            </div>

            <div>
              <span className="text-xs 2xl:text-sm font-display uppercase tracking-widest text-white opacity-60 mb-4 block">
                Pages
              </span>
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs 2xl:text-sm font-display uppercase tracking-widest text-white opacity-60 mb-4 block">
                Connect
              </span>
              <div className="flex flex-col gap-3">
                <a href="mailto:info@orbtrix.space" className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                  info@orbtrix.space
                </a>
                <a href="https://www.linkedin.com/company/orbtrix/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                  LinkedIn
                </a>
                <a href="https://www.instagram.com/orbtrix_space/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                  Instagram
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                  X (Twitter)
                </a>
                <a href="https://www.notion.so/Careers-at-Orbtrix-Space-3135b581cdb7809ea3ccc510b9325b9b" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors text-sm 2xl:text-base w-fit">
                  Careers
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-neutral-700 text-sm 2xl:text-base font-mono">&copy; {new Date().getFullYear()} Orbtrix Space Pvt Ltd</span>
            <span className="text-neutral-800 text-sm 2xl:text-base font-mono">Bengaluru, India</span>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
