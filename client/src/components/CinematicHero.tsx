import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

/**
 * Cinematic opening — one continuous canvas, not two stacked sections.
 *
 * A single `sticky` video plate is pinned for the height of the whole block.
 * Everything that changes as you scroll — veil density, exposure, shadow lift,
 * blur, parallax, the fade of the headline — is interpolated from ONE scroll
 * progress value on that ONE plate. No per-section overlay exists, so there is
 * no seam, divider or hard cut anywhere: you simply move deeper into the scene.
 *
 * Styles are written straight to the DOM inside a rAF, deliberately bypassing
 * React state — routing per-frame scroll values through setState would
 * re-render the whole subtree every frame.
 */

/** The whole narrative, as one editorial paragraph. No bullets, no sub-headings —
 *  the story is continuous, like the scene behind it. */
const NARRATIVE =
  "Space operations still depend on human operators reacting to problems as they happen, an approach that does not scale as missions grow from a single spacecraft to entire constellations. Orbtrix closes the loop by bringing onboard autonomy and ground operations into one intelligent architecture, enabling spacecraft to observe, decide, and act with minimal human intervention while remaining continuously synchronized with ground systems. The result is a resilient operational layer that scales seamlessly from individual satellites to complex multi-spacecraft missions.";

/* --- The grade.
   Hero: closed, dark, sharp — the video carries it.
   Deeper in: frosted glass. Exposure up and contrast DOWN, which is what
   "lifting the shadows" actually means (a lower contrast raises the black
   point, so detail returns in the darks instead of the image washing out). --- */
const HERO = { veil: 0.4, brightness: 0.82, contrast: 1.0, blur: 0 };
const DEEP = { veil: 0.44, brightness: 1.07, contrast: 0.88, blur: 16 };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;

      // 0 at the top of the hero → 1 once we're fully into the second screen.
      const p = clamp01(y / vh);

      const video = videoRef.current;
      if (video) {
        const b = lerp(HERO.brightness, DEEP.brightness, p);
        const c = lerp(HERO.contrast, DEEP.contrast, p);
        const blur = lerp(HERO.blur, DEEP.blur, p);
        video.style.filter =
          `brightness(${b.toFixed(3)}) contrast(${c.toFixed(3)}) blur(${blur.toFixed(1)}px)`;

        // Scale grows with the blur: a blurred edge pulls in transparency, so
        // the plate must overscan enough to keep the frame edge off-screen.
        // The extra drift also gives the parallax.
        const scale = 1.06 + p * 0.08;
        video.style.transform =
          `translate3d(0, ${(p * 40).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      }

      const veil = veilRef.current;
      if (veil) {
        veil.style.backgroundColor = `rgba(0,0,0,${lerp(HERO.veil, DEEP.veil, p).toFixed(3)})`;
      }

      // Headline fades and lifts away — gone by ~55% of the first screen.
      const headline = headlineRef.current;
      if (headline) {
        const h = clamp01(y / (vh * 0.55));
        headline.style.opacity = String(1 - h);
        headline.style.transform = `translate3d(0, ${(h * -50).toFixed(1)}px, 0)`;
        // The block carries the hero CTAs. Once it has faded out they are
        // invisible but would still be clickable, so drop them out of hit
        // testing rather than leaving two dead targets over the scene.
        headline.style.pointerEvents = h > 0.9 ? "none" : "";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Autoplay. Reduced-motion users get a held frame, not looping footage.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
        return;
      }
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {
          /* first frame stays — nothing else to do */
        });
      });
    };

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="relative" data-nav-dark>
      {/* ---- The scene: one pinned plate for the whole experience ---- */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/opening-page.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          style={{ transform: "scale(1.06)", willChange: "transform, filter" }}
        />
        <div
          ref={veilRef}
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0,0,0,${HERO.veil})` }}
          aria-hidden="true"
        />
      </div>

      {/* ---- Copy, lifted back over the plate ---- */}
      <div className="relative -mt-[100svh]">
        {/* ===== Hero — headline alone, lower-left. Nothing else on screen. ===== */}
        <section className="flex h-[100svh] items-end">
          {/* Bottom padding eases off on short viewports: the hero now carries a
              positioning line and two CTAs under the headline, and 13vh of
              padding pushed that past the fold on a phone. */}
          <div className="w-full pb-[8vh] pl-[8vw] pr-6 md:pb-[12vh]">
            <div ref={headlineRef} style={{ willChange: "opacity, transform" }}>
              {/* One sentence now, so the line breaks are left to the browser
                  rather than hard-coded as blocks. `text-balance` evens the
                  rag out instead of leaving a short widow on the last line.

                  Sizing note: the root font-size is fluid (see index.css), so a
                  rem cap is NOT a fixed pixel ceiling — it grows with the
                  viewport. 5.1rem lands on ~95px at 1920px, which is where the
                  cap starts biting; 5.4vw carries every width below that.

                  The measure grows in step with the type (57→62rem alongside
                  5→5.4vw). Holding the container fixed while the glyphs get
                  bigger is what tips a balanced two-line headline into three. */}
              <h1
                className="max-w-[62rem] text-balance text-[clamp(2.75rem,5.4vw,5.1rem)] font-medium leading-[0.98] text-white/90"
                style={{ letterSpacing: "-0.02em", wordSpacing: "0.04em" }}
              >
                Intelligent, responsive and resilient space operations
              </h1>

              {/* The positioning line the headline does not carry: what Orbtrix
                  builds, and the operational economics it is aimed at. */}
              <p
                className="mt-8 max-w-[44rem] text-pretty text-[clamp(1rem,1.35vw,1.25rem)] font-light leading-relaxed"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Autonomous spacecraft, lower mission OpEx. Orbtrix builds intelligence and autonomy
                infrastructure that enables spacecraft to understand, plan, decide and act with less
                dependence on continuous ground intervention.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {/* Points at the approach console: it is where the architecture
                    is presented now that the separate section is gone. */}
                {/* Both use the on-media tone: a purple hairline vanishes
                    against the footage behind them. */}
                <a href="#approach" className="cta cta-on-media">
                  Explore the architecture
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                {/* Was Mission #1, which no longer exists. The platform is the
                    other thing a first-time visitor is here to find. */}
                <Link href="/disha" className="cta cta-on-media">
                  DISHA platform
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Deeper in — the story continues in the same scene.
             No overlay, no heading break, no card. Just the narrative. ===== */}
        <section className="flex min-h-[100svh] items-center py-32">
          <div className="w-full px-[8vw]">
            {/* Split: a short heading holds the left column, the narrative runs
                down the right at 7/12 — a little over half the measure, which
                is what lets it carry the screen. Stacks below md, where a
                5-column heading would break every two words. */}
            <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-14">
              <div className="md:col-span-5">
                <Reveal>
                  <h2 className="text-balance text-[clamp(1.5rem,2.6vw,2.4rem)] font-normal leading-[1.2] text-white">
                    Full-stack autonomy for{" "}
                    <span style={{ color: "var(--accent-on-dark)" }}>space</span>.
                  </h2>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal delay={140}>
                  <p
                    className="text-[clamp(1.05rem,1.6vw,1.5rem)] font-normal leading-[1.7]"
                    style={{ color: "rgba(255,255,255,0.84)" }}
                  >
                    {NARRATIVE}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
