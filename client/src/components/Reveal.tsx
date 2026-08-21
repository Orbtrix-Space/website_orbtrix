import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Gentle fade-and-rise as a section enters the viewport.
 *
 * IntersectionObserver + two CSS custom properties. No animation library.
 * Reveals once, then disconnects. Honours prefers-reduced-motion via CSS
 * (see the [data-reveal] block in index.css), so nothing is hidden from
 * users who opt out — and nothing is hidden if JS never runs, because the
 * observer marks the element revealed on first paint if it is already visible.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in milliseconds. Keep it under ~200ms per item. */
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    // No IntersectionObserver (old browser, SSR-ish env) → show immediately.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      data-revealed={revealed ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
