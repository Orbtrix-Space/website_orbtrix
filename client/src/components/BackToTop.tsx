import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * True while the control is sitting over the white footer.
 *
 * The button is fixed, so it has no idea what is behind it — and the site has
 * exactly one light surface, which the button would otherwise sit on as a
 * dark-grey disc with a white-at-14% border: invisible edge, invisible arrow.
 * So it asks.
 *
 * The test is geometric rather than a scroll threshold: the footer's height
 * varies with the viewport, and "am I past 90% of the page" would be wrong on
 * a short page and late on a tall one. This measures the actual overlap.
 */
function useOverFooter() {
  const [over, setOver] = useState(false);

  useEffect(() => {
    let frame = 0;

    const check = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const footer = document.querySelector<HTMLElement>("[data-footer]");
        if (!footer) {
          setOver(false);
          return;
        }
        /* The button's own band: 2rem from the bottom, 3rem tall. Anything
           finer would be measuring the button against itself. */
        const band = window.innerHeight - 32 - 48;
        setOver(footer.getBoundingClientRect().top < band);
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
  }, []);

  return over;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const overFooter = useOverFooter();

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
      data-light={overFooter ? "true" : "false"}
      className={`btt ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
