import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      // Kept mounted and hidden from AT when off-screen, so there's no
      // mount/unmount animation to coordinate.
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-8 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-pill border text-ink-muted transition-all duration-300 ease-brand hover:text-ink md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ backgroundColor: "var(--surface-raised)", borderColor: "var(--border)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
