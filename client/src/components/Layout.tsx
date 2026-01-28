import { Link, useLocation } from "wouter";
import { NAV_ITEMS } from "@/data/content";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-foreground selection:bg-white selection:text-black overflow-hidden">
      {/* Background Gradient Layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 10% 10%, rgba(56,189,248,0.08), transparent 40%), radial-gradient(800px 500px at 90% 20%, rgba(168,85,247,0.06), transparent 45%), radial-gradient(1000px 600px at 50% 90%, rgba(30,58,138,0.10), transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo-white.png"
              alt="Orbtrix Space"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm tracking-wide text-neutral-400 hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                {location === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-6 py-10 gap-8 border-b border-white/10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl tracking-tight ${
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

      {/* Main Content */}
      <main className="flex-grow pt-20">{children}</main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-20">
        {/* Footer glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            <img
              src="/logo-mark.png"
              alt="Orbtrix Space"
              className="h-8 w-auto opacity-90"
            />
            <span className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} Orbtrix Space Pvt Ltd.
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Jobs
            </Link>

            <Link
              href="/press"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              Press
            </Link>

            <a
              href="https://www.linkedin.com/company/orbtrix-space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
