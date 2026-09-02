import { useEffect, useState } from "react";

/**
 * The launch transition.
 *
 * Black, the wordmark, a short settle, gone. It exists to cover the gap
 * between the document painting and the application being ready to use, and it
 * is sized to that job and no larger — roughly a second, which is about how
 * long a spacecraft bus takes to report itself healthy and about as long as
 * anyone will forgive a website for.
 *
 * Two rules govern it:
 *
 *   1. IT NEVER DELAYS ANYTHING. The app mounts and renders underneath this
 *      overlay from the first frame. Nothing waits on the animation; the
 *      overlay waits on the app. If the page is already loaded when this
 *      mounts, the timer is the only thing left to run, and once it is done
 *      the element unmounts completely rather than lingering as a transparent
 *      layer over the page swallowing clicks.
 *
 *   2. IT NEVER OUTLASTS ITS WELCOME. MIN_MS is a floor, not a duration — the
 *      overlay leaves at max(load, MIN_MS), so a slow connection does not add
 *      the animation to its wait, and a warm cache still gets a deliberate
 *      transition rather than a flicker.
 *
 * Under prefers-reduced-motion both numbers collapse to a brief fade with no
 * movement, which is handled entirely in CSS — see .boot-* in index.css.
 */

/** Floor for how long the mark is visible. Long enough to read, and no longer. */
const MIN_MS = 900;
/** Must match the .boot[data-phase="out"] transition in index.css. */
const FADE_MS = 420;

type Phase = "in" | "out" | "done";

export function BootScreen() {
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    const started = performance.now();
    let leaveTimer = 0;
    let doneTimer = 0;

    const leave = () => {
      const remaining = Math.max(0, MIN_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        setPhase("out");
        doneTimer = window.setTimeout(() => setPhase("done"), FADE_MS);
      }, remaining);
    };

    /* readyState is checked first because this component can easily mount
       AFTER the load event has already fired — on a warm cache it usually
       does — and a listener added at that point never runs. */
    if (document.readyState === "complete") {
      leave();
    } else {
      window.addEventListener("load", leave, { once: true });
    }

    return () => {
      window.removeEventListener("load", leave);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  // Unmounted, not hidden: a spent overlay must not stay in the tree.
  if (phase === "done") return null;

  return (
    <div
      className="boot"
      data-phase={phase}
      // Decorative. The page underneath is the content, it is already
      // rendered, and a screen reader should be reading that instead.
      aria-hidden="true"
    >
      <div className="boot-in">
        <span
          className="boot-mark"
          style={{
            WebkitMaskImage: "url(/logo-white.png)",
            maskImage: "url(/logo-white.png)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />

        <p className="boot-note">
          <span className="dsh-sigil">#</span> ORBTRIX
          <span className="boot-cmd">
            <span className="dsh-sigil">$</span> system.initialize()
          </span>
        </p>

        {/* One hairline that draws across as the mark settles. The only moving
            part, and it is the reason the sequence reads as a system coming up
            rather than as a logo fading in. */}
        <span className="boot-rule" />
      </div>
    </div>
  );
}
